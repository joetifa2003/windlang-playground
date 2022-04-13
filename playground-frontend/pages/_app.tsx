import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Navbar />
            <Component {...pageProps} />
            <Script src="https://code.iconify.design/2/2.2.1/iconify.min.js" />
            <Script
                data-goatcounter="https://windlang.goatcounter.com/count"
                async
                src="//gc.zgo.at/count.js"
            ></Script>
        </>
    );
}

export default MyApp;
