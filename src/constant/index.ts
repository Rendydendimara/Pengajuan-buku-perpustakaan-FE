export const BACKEND_LOCAL_URL = 'http://localhost:8080/api/v1';
export const BACKEND_STAGING_URL = '';
export const BACKEND_PRODUCTION_URL = '';

export const BACKEND_URL: string =
  process.env.NEXT_PUBLIC_BACKEND_ENDPOINT ?? '';

export const APP_NAME = 'APLIKASI PENGAJUAN BUKU';
export const IS_SHOW_DEVELOP_INFO = false;
export const LOCAL_USER_TYPE = 'USER_TYPE_PENGAJUAN_BUKU';
export const LOCAL_USER_ID = 'USER_PENGEJUAN_BUKU_ID';

export const TOKEN_AUTH_LOCAL = 'kepokepoaja';
export const LOCAL_CART_PRODI = 'cartProdi@pengajuanbuku';
