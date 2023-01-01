import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import {SessionProvider} from 'next-auth/react'
import { MantineProvider } from '@mantine/core'
import Header from "../component/Header"
export default function App({ Component, pageProps }: AppProps) {
  


  return(
  <SessionProvider session={pageProps.session}>
<MantineProvider withGlobalStyles withNormalizeCSS    theme={{
      /** Put your mantine theme override here */
      colorScheme: 'dark',
    }}>
    <Header />
    <Component {...pageProps} />
   
    </MantineProvider>
     </SessionProvider>
    )
}
