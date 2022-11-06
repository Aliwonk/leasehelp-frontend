import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Layout from "../components/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pathAuth = router.pathname.indexOf('/auth');
  const pathAdmin = router.pathname.indexOf('/admin');

  if (pathAuth !== -1 || pathAdmin !== -1) return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false
});
