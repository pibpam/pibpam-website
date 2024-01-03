import { Html, Head, Main, NextScript } from 'next/document'
import Spinner from "../components/Spinner";

// export default function Document() {
//   return (
//     <Html>
//       <Head>
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
//         <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
//         <meta name="viewport"
//           content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
//       </Head>
//       <body>
//         <div id="globalLoader">
//           <Spinner />
//         </div>
//         <Main />
//         <NextScript />
//       </body>
//     </Html>
//   )
// }


import type { DocumentContext, DocumentInitialProps } from 'next/document'
import Document from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
          <meta name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        </Head>
        <body>
          <div id="globalLoader">
            <Spinner />
          </div>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}