import Link from "next/link";
import WindLogo from "../components/SVG/WindLogo";

const Index = () => {
    return (
        <>
            <div className="container flex flex-col justify-center flex-1">
                <div className="flex flex-col items-center space-y-8">
                    <div className="md:w-[24rem] w-full">
                        <WindLogo />
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-5xl font-bold text-center md:text-6xl">
                            WindLang
                        </h1>
                        <p className="text-2xl text-center sm:text-3xl lg:text-4xl">
                            A simple programming language built with golang 🍃
                        </p>
                    </div>
                    <div className="grid w-full gap-4 lg:w-auto lg:grid-cols-2">
                        <Link href="/playground">
                            <a className="w-full text-lg font-bold btn btn-primary lg:btn-wide">
                                Playground
                            </a>
                        </Link>
                        <a
                            className="w-full space-x-2 text-lg font-bold btn btn-outline lg:btn-wide"
                            href="https://github.com/joetifa2003/windlang"
                        >
                            <span>Github</span>
                            <span
                                className="iconify"
                                data-icon="akar-icons:github-fill"
                            ></span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Index;
