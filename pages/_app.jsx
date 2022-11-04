import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Layout from "../components/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pathAuth = router.pathname.indexOf('/auth');

  if (pathAuth !== -1) return <Component {...pageProps} />

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false
});
