import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import axios from "../lib/axios";
import Editor from "@monaco-editor/react";
import ReactLoading from "react-loading";
import { useRouter } from "next/router";
import LZUTF8 from "lzutf8";
import debounce from "debounce";

const Home: NextPage = () => {
    const router = useRouter();

    const [code, setCode] = useState(`println("Hello, Wind!");`);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<{
        duration: number;
        output: string;
    } | null>({
        output: "Hello, Wind!\n",
        duration: 0,
    });

    useEffect(() => {
        if (router.isReady) {
            if (router.query.code) {
                const decompressed = LZUTF8.decompress(router.query.code, {
                    inputEncoding: "Base64",
                    outputEncoding: "String",
                    useWebWorker: true,
                });

                setCode(decompressed);
            }
        }
    }, [router.query.code, router.isReady]);

    const saveCode = useCallback(
        debounce((code: string) => {
            if (router.isReady) {
                const compressed = LZUTF8.compress(code, {
                    inputEncoding: "String",
                    outputEncoding: "Base64",
                    useWebWorker: true,
                });

                window.history.pushState(null, "", `?code=${compressed}`);
            }
        }, 500),
        [router.isReady]
    );

    const run = useCallback(async () => {
        setIsLoading(true);

        axios
            .post("/exec", {
                code,
            })
            .then((res) => {
                setResult(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                setResult(err.response?.data);
                setIsLoading(false);
            });
    }, [code]);

    return (
        <div className="container xl:px-32">
            <div className="flex flex-col">
                <div className="flex justify-end">
                    <div
                        className="w-full my-4 tooltip lg:w-auto"
                        data-tip="Run Wind script"
                    >
                        <button
                            className="w-full space-x-1 text-lg font-bold btn btn-success lg:btn-wide"
                            onClick={run}
                            disabled={isLoading}
                        >
                            <span>Run</span>
                            <span
                                className="text-xl iconify"
                                data-icon="codicon:debug-start"
                            ></span>
                        </button>
                    </div>
                </div>
                <div className="relative">
                    <Editor
                        height="500px"
                        defaultLanguage="rust"
                        value={code}
                        defaultValue={code}
                        theme="vs-dark"
                        onChange={(e) => {
                            setCode(e || "");
                            saveCode(e || "");
                        }}
                        className="font-mono"
                        options={{
                            fontSize: 18,
                            fontFamily: "Fira Code",
                            fontLigatures: true,
                        }}
                    />
                    {isLoading && (
                        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full backdrop-blur-sm bg-primary bg-opacity-10">
                            <ReactLoading type="cylon" />
                        </div>
                    )}
                </div>
                {result && (
                    <p className="p-4 whitespace-pre-wrap bg-base-300">
                        {result.output}
                        <br />
                        {`[Duration ${result.duration}ms]`}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Home;
