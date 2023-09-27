import Axios from 'axios';
import { BACKEND_URL } from '../constant';
import { AxiosWithToken } from '../lib/axios';

export const ApiGetListStatistik = async (data: {
  type: 'admin' | 'tif' | 'ptk' | 'agb' | 'agt' | 'thp' | 'umum';
  adminProdi?: string;
}) => {
  let endpoint = `${BACKEND_URL}/shared/get-statistik?`;
  if (data.type) {
    endpoint = `${endpoint}&type=${data.type}`;
  }
  if (data.adminProdi) {
    endpoint = `${endpoint}&adminProdi=${data.adminProdi}`;
  }
  const response = await AxiosWithToken()
    .get(endpoint)
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
