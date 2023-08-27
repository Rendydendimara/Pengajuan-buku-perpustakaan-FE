import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  localCookieLoadToken,
  localCookieSaveToken,
} from '@/lib/Cookies/token';
import { LOCAL_USER_TYPE } from '@/constant';
import { getLocal } from '@/lib/LocalStorage/localStorage';
import { Provider } from 'react-redux';
import { store } from '@/provider/redux/store';
import { ApiCheckLogin } from '@/api/auth';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [pageLoading, setLoadingPage] = useState(false);

  const getUserInfo = async (userType: string, token: string) => {
    const res = await ApiCheckLogin({ token, type: userType });
    if (res.status === 200) {
      store.dispatch({
        type: 'SET_USER',
        user: {
          ...res.data.data,
          type: userType,
        },
      });
      localCookieSaveToken(res.data.data.token);
    } else {
      router.replace('/login');
    }
    setLoadingPage(false);
  };

  useEffect(() => {
    async function funcAsyncDefault() {
      const token = localCookieLoadToken() ?? '';
      const userType = getLocal(LOCAL_USER_TYPE);

      if (token) {
        await getUserInfo(userType, token);
      } else {
        router.replace(`/login`);
        setLoadingPage(false);
      }
    }
    funcAsyncDefault();
  }, []);

  if (pageLoading) {
    return <></>;
  }

  return (
    <Provider store={store}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}
