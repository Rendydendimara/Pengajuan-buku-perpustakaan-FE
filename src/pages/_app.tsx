import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { localCookieLoadToken } from '@/lib/Cookies/token';
import { LOCAL_USER_TYPE } from '@/constant';
import { getLocal } from '@/lib/LocalStorage/localStorage';
import { Provider } from 'react-redux';
import { store } from '@/provider/redux/store';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [pageLoading, setLoadingPage] = useState(true);

  const getUserInfo = async (userType: 'admin' | 'prodi', token: string) => {
    // if (userType === 'penjual') {
    //   const responseGetUserInfo = await ApiCheckPenjualLogin(token);
    //   if (responseGetUserInfo.status === 200) {
    //     store.dispatch({
    //       type: 'SET_USER',
    //       user: {
    //         _id: responseGetUserInfo.data.data._id,
    //         fullname: responseGetUserInfo.data.data.fullname,
    //         email: responseGetUserInfo.data.data.email,
    //         gender: responseGetUserInfo.data.data.gender,
    //         noTelfon: responseGetUserInfo.data.data.noTelfon,
    //         profileImage: responseGetUserInfo.data.data.profileImage,
    //         prodi: responseGetUserInfo.data.data.prodi,
    //         createdAt: responseGetUserInfo.data.data.createdAt,
    //         updatedAt: responseGetUserInfo.data.data.updatedAt,
    //         userType: 'penjual',
    //       },
    //     });
    //     localCookieSaveToken(responseGetUserInfo.data.data.token);
    //   } else {
    //     // handle error fetch
    //     store.dispatch({
    //       type: 'RESET_USER',
    //     });
    //     localCookieClearToken();
    //     if (token) {
    //       router.replace('/access-type');
    //     }
    //   }
    // } else if (userType === 'adminProdi') {
    //   const responseGetUserInfo = await ApiCheckAdminProdiLogin(token);
    //   if (responseGetUserInfo.status === 200) {
    //     store.dispatch({
    //       type: 'SET_USER',
    //       user: {
    //         _id: responseGetUserInfo.data.data._id,
    //         fullname: responseGetUserInfo.data.data.fullname,
    //         email: responseGetUserInfo.data.data.email,
    //         gender: responseGetUserInfo.data.data.gender,
    //         noTelfon: responseGetUserInfo.data.data.noTelfon,
    //         profileImage: responseGetUserInfo.data.data.profileImage,
    //         prodi: responseGetUserInfo.data.data.prodi,
    //         createdAt: responseGetUserInfo.data.data.createdAt,
    //         updatedAt: responseGetUserInfo.data.data.updatedAt,
    //         userType: 'adminProdi',
    //       },
    //     });
    //     localCookieSaveToken(responseGetUserInfo.data.data.token);
    //   } else {
    //     // handle error fetch
    //     store.dispatch({
    //       type: 'RESET_USER',
    //     });
    //     localCookieClearToken();
    //     if (token) {
    //       router.replace('/access-type');
    //     }
    //   }
    // } else if (userType === 'adminUmum') {
    //   const responseGetUserInfo = await ApiCheckAdminUmumLogin(token);
    //   if (responseGetUserInfo.status === 200) {
    //     store.dispatch({
    //       type: 'SET_USER',
    //       user: {
    //         _id: responseGetUserInfo.data.data._id,
    //         fullname: responseGetUserInfo.data.data.fullname,
    //         email: responseGetUserInfo.data.data.email,
    //         gender: responseGetUserInfo.data.data.gender,
    //         noTelfon: responseGetUserInfo.data.data.noTelfon,
    //         profileImage: responseGetUserInfo.data.data.profileImage,
    //         prodi: responseGetUserInfo.data.data.prodi,
    //         createdAt: responseGetUserInfo.data.data.createdAt,
    //         updatedAt: responseGetUserInfo.data.data.updatedAt,
    //         userType: 'adminUmum',
    //       },
    //     });
    //     localCookieSaveToken(responseGetUserInfo.data.data.token);
    //   } else {
    //     // handle error fetch
    //     store.dispatch({
    //       type: 'RESET_USER',
    //     });
    //     localCookieClearToken();
    //     if (token) {
    //       router.replace('/access-type');
    //     }
    //   }
    // }

    setLoadingPage(false);
  };

  useEffect(() => {
    async function funcAsyncDefault() {
      const token = localCookieLoadToken() ?? '';

      const userType = getLocal(LOCAL_USER_TYPE);
      if (userType) {
        router.replace(`/${userType}/beranda`);
        await getUserInfo(userType, token);
      } else {
        router.replace(`/login`);
      }
    }
    funcAsyncDefault();
  }, []);

  return (
    <Provider store={store}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}
