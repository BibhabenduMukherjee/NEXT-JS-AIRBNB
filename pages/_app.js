import 'tailwindcss/tailwind.css'
import '../styles/global.css'
import ProgressBar from '@badrap/bar-of-progress'
import Router from 'next/router'

const progress = new ProgressBar({
  size: 4,
  className: "z-50",
  color:"#FE595E",
  delay:100,

})

Router.events.on("routeChangeStart" , progress.start);
Router.events.on("routeChangeComplete" , progress.finish);
Router.events.on("routeChangeError" , progress.finish);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
