import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Contexts from "../contexts";
import Loading from "../components/Loading";
import React, { useEffect } from "react";
import Script from "next/script";
import Modal from '../components/ModalDesktopWarn';
import ModalGetApp from '../components/ModalGetApp';
import { clarity } from 'react-microsoft-clarity';

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    if (typeof window !== 'undefined') {
      clarity.init('ifcbvo85r0')
      const loader = document.getElementById('globalLoader');
      if (loader) {
        loader.remove();
      }
    }
  }, []);

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-7HTJQHF1X6"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){window.dataLayer.push(arguments);}
                  gtag('js', new Date());
        
                  gtag('config', 'G-7HTJQHF1X6');
                `}
      </Script>
      <Contexts>
        <>
          <Loading />
          <Component {...pageProps} />
          {/* <Modal /> */}
          <ModalGetApp/>
        </>
      </Contexts>
    </>
  )
}

export default MyApp
