import Axios from 'axios';
import { BACKEND_URL } from '../constant';
import { AxiosWithToken } from '../lib/axios';

export const ApiCreateDosenProdi = async (data: {
  nidn: string;
  kelamin: string;
  password: string;
  namaLengkap: string;
  noTelfon: string;
  programStudi: string;
}) => {
  const response = await Axios.post(`${BACKEND_URL}/dosen-prodi/create`, data)
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

export const ApiGetListDosenProdi = async () => {
  const response = await AxiosWithToken()
    .get(`${BACKEND_URL}/dosen-prodi/list`)
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

export const ApiUpdateDosenProdi = async (data: {
  nidn: string;
  kelamin: string;
  password: string;
  namaLengkap: string;
  noTelfon: string;
  programStudi: string;
  id: string;
}) => {
  const response = await Axios.put(`${BACKEND_URL}/dosen-prodi/update`, data)
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

export const ApiDeleteDosenProdi = async (id: string) => {
  const response = await AxiosWithToken()
    .delete(`${BACKEND_URL}/dosen-prodi/delete/${id}`)
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
