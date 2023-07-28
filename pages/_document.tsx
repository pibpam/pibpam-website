import { Html, Head, Main, NextScript } from 'next/document'
import Spinner from "../components/Spinner";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
      </Head>
      <body>
          <div id="globalLoader">
              <Spinner/>
          </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
