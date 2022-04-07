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
        </>
    );
}

export default MyApp;
