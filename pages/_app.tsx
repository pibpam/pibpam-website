import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Contexts from "../contexts";
import Loading from "../components/Loading";
import React, {useEffect} from "react";

function MyApp({Component, pageProps}: AppProps) {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const loader = document.getElementById('globalLoader');
            if (loader) {
                loader.remove();
            }
        }
    }, []);

    return (
        <Contexts>
            <>
                <Loading/>
                <Component {...pageProps} />
            </>
        </Contexts>
    )
}

export default MyApp
