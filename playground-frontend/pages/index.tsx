import type { NextPage } from "next";
import { useCallback, useState } from "react";
import axios from "../lib/axios";
import Editor from "@monaco-editor/react";

const Home: NextPage = () => {
    const [code, setCode] = useState(`println("Hello, Wind!");`);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<{
        duration: number;
        output: string;
    } | null>(null);

    const run = useCallback(async () => {
        axios
            .post("/exec", {
                code,
            })
            .then((res) => {
                setResult(res.data);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    }, [code]);

    return (
        <div className="container mt-4">
            <div className="flex flex-col space-y-4">
                <div>
                    <Editor
                        height="500px"
                        defaultLanguage="rust"
                        value={code}
                        theme="vs-dark"
                        onChange={(e) => setCode(e || "")}
                        className="font-mono"
                        options={{
                            fontFamily: "Fira Code",
                            fontLigatures: true,
                        }}
                    />
                </div>
                {result && (
                    <p>
                        {result.output}
                        <br />
                        {`[Duration ${result.duration}ms]`}
                    </p>
                )}
                <div>
                    <button className="btn btn-primary btn-wide" onClick={run}>
                        Run
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
