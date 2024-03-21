
import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import Script from 'next/script'
// import "Script" from "next/script"

export default function App({ Component,  pageProps: { session, ...pageProps }  }) {
  return (
    <div>

<Script id="my-script"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script id="my-script2" strategy="lazyOnload">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>
    <SessionProvider session={session}>
      {/* <Navbar/> */}
  <Component {...pageProps} />
  </SessionProvider>
    </div>
  )
}
