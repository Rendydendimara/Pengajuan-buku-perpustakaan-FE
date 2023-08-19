import Axios from 'axios';
import { BACKEND_URL } from '../constant';
import { AxiosWithToken } from '../lib/axios';

export const ApiCreatePengajuanBuku = async (data: {
  buku: string;
  dosenProdi: string;
  jumlah: number;
  pesanDosen: string;
}) => {
  const response = await Axios.post(
    `${BACKEND_URL}/pengajuan-buku/create`,
    data
  )
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

export const ApiGetListPengajuanBuku = async () => {
  const response = await AxiosWithToken()
    .get(`${BACKEND_URL}/pengajuan-buku/list`)
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

export const ApiGetListPengajuanBukuByDosen = async (dosenId: string) => {
  const response = await AxiosWithToken()
    .get(`${BACKEND_URL}/pengajuan-buku/list-by-dosen/${dosenId}`)
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

export const ApiUpdatePengajuanBuku = async (data: {
  buku: string;
  jumlah: number;
  pesanAdmin: string;
  pesanDosen: string;
  status: string;
  id: string;
}) => {
  const response = await Axios.put(`${BACKEND_URL}/pengajuan-buku/update`, data)
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

export const ApiDeletePengajuanBuku = async (id: string) => {
  const response = await AxiosWithToken()
    .delete(`${BACKEND_URL}/pengajuan-buku/delete/${id}`)
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
