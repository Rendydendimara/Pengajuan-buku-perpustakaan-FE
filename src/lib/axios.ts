import Axios from 'axios';
import { localCookieClearToken, localCookieLoadToken } from './Cookies/token';

//ini request axios tapi kita upgrade dengan masang token di header buat otentifikasi user di server
//ditambah fitur auto refresh token kalo misal sudah expired token yang dipakai
//lalu otomatis logout jika token sudah ga valid

export const AxiosWithToken = (options = {}) => {
  const token = localCookieLoadToken();
  const config = token
    ? {
        headers: {
          'pengajuanbukuperpustakaan-token': token,
        },
      }
    : {};
  const instance = Axios.create(config);

  instance.interceptors.response.use(
    function (response) {
      // console.log("response axiosWithToken", response);
      // let newtoken = get(response, "headers.authorization");
      // if (newtoken) {
      //   localSaveToken(newtoken);
      //   console.log("Token telah direfresh");
      // }
      return response;
    },
    function (error) {
      // console.log('error.response?.status', error.response?.status);
      // console.log('error.response', error.response);
      switch (error.response?.status) {
        case 401:
        case 403:
          if (
            !error.response.data.success &&
            (error.response.data.message ===
              'A token is required for authentication' ||
              error.response.data.message === 'Invalid Token')
          ) {
            localCookieClearToken();
            window.location.href = '/login';
          }
          break;
        default:
      }
      return Promise.reject(error);
    }
  );
  return instance;
};
export {};
