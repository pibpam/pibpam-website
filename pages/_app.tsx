import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Contexts from "../contexts";
import Loading from "../components/Loading";
import React, {useEffect} from "react";

function MyApp({Component, pageProps}: AppProps) {
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
