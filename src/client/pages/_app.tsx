import type { AppProps } from 'next/app'

import '../styles/styles.css'

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default App
