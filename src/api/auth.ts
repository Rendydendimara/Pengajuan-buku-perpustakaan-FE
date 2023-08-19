import Axios from 'axios';
import { BACKEND_URL } from '../constant';
import { AxiosWithToken } from '../lib/axios';

export const ApiLogin = async (dataLogin: {
  type: string;
  nidn: string;
  password: string;
  email: string;
}) => {
  const response = await Axios.post(`${BACKEND_URL}/auth/login`, dataLogin)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  if (response) {
    return response;
  } else {
    return {
      status: 500,
      data: {
        message: 'Server error.',
      },
    };
  }
};

export const ApiLogout = async (data: { userId: string; type: string }) => {
  const response = await AxiosWithToken()
    .post(`${BACKEND_URL}/auth/logout`, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  if (response) {
    return response;
  } else {
    return {
      status: 500,
      data: {
        message: 'Server error.',
      },
    };
  }
};

export const ApiCheckLogin = async (data: { token: string; type: string }) => {
  const response = await Axios.post(`${BACKEND_URL}/auth/check-login`, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });

  if (response) {
    return response;
  } else {
    return {
      status: 500,
      data: {
        message: 'Server error.',
      },
    };
  }
};
