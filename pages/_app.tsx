import SimpleReactLightbox from 'simple-react-lightbox'
import './styles.css'

export function reportWebVitals(metric) {
  // console.log(metric);
}

export default function MyApp({ Component, pageProps }) {
  return (
    <SimpleReactLightbox>
      <Component {...pageProps} />
    </SimpleReactLightbox>
  )
}
