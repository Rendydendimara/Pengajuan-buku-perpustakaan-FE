import Cookies from 'js-cookie';
import Router from 'next/router';
import { AuthToken } from './authToken';

export const CheckIsUserLogin = async () => {
  // const token = Cookies.get(SEMNASUNKRISWINASUMBA_TOKEN_AUTH_LOCAL);
  // const responseGetUserInfo = await ApiCheckUserLogin(token ?? '');
  // if (responseGetUserInfo.status === 200) {
  //   store.dispatch({ type: 'SET_USER', user: responseGetUserInfo.data.data });
  //   localCookieSaveToken(responseGetUserInfo.data.data.token);
  return true;
  // }
  return false;
};

export const LogoutUser = () => {
  // // Cookies.remove(SEMNASUNKRISWINASUMBA_TOKEN_AUTH_LOCAL);
  // // store.dispatch({ type: 'RESET_USER' });
  // Router.replace('/signin');
};
