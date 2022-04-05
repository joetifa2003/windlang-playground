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
    } | null>(null);

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
        <div className="container mt-4 xl:px-32">
            <div className="flex flex-col space-y-4">
                <div>
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
                            fontFamily: "Fira Code",
                            fontLigatures: true,
                        }}
                    />
                </div>
                {isLoading ? (
                    <div className="mx-auto">
                        <ReactLoading type="cylon" />
                    </div>
                ) : result ? (
                    <p className="p-4 whitespace-pre bg-base-300">
                        {result.output}
                        <br />
                        {`[Duration ${result.duration}ms]`}
                    </p>
                ) : null}
                <button className="w-full btn btn-primary" onClick={run}>
                    Run
                </button>
            </div>
        </div>
    );
};

export default Home;
