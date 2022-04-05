package main

import (
	"io/ioutil"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joetifa2003/windlang/evaluator"
	"github.com/joetifa2003/windlang/lexer"
	"github.com/joetifa2003/windlang/parser"
)

type RequestBody struct {
	Code string `json:"code" xml:"code" form:"code" binding:"required"`
}

func main() {
	r := gin.Default()
	corsConf := cors.DefaultConfig()
	corsConf.AllowAllOrigins = true
	r.Use(cors.New(corsConf))

	r.POST("/exec", func(c *gin.Context) {
		rb := new(RequestBody)
		if err := c.ShouldBind(rb); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		file := rb.Code
		filePath := "<playground>.wind"

		timeStart := time.Now()

		input := string(file)
		lexer := lexer.New(input)
		parser := parser.New(lexer, filePath)
		program := parser.ParseProgram()
		parser.ReportErrors()

		envManager := evaluator.NewEnvironmentManager()
		env, _ := envManager.Get(filePath)
		ev := evaluator.New(envManager, filePath)

		rescueStdout := os.Stdout
		r, w, _ := os.Pipe()
		os.Stdout = w

		_, evErr := ev.Eval(program, env)

		w.Close()
		out, _ := ioutil.ReadAll(r)
		os.Stdout = rescueStdout

		timeEnd := time.Since(timeStart)

		if evErr != nil {
			c.JSON(200, gin.H{
				"output":   evErr.Inspect(),
				"duration": timeEnd.Milliseconds(),
			})

			return
		}

		c.JSON(200, gin.H{
			"output":   string(out),
			"duration": timeEnd.Milliseconds(),
		})
	})

	r.Run()
}
