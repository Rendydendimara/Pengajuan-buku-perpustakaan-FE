import Axios from 'axios';
import { BACKEND_URL } from '../constant';
import { AxiosWithToken } from '../lib/axios';
// bukuRouter.post('/create', asyncErrorHandler(createBukuUseCase));
// bukuRouter.get('/list', asyncErrorHandler(getListBukuUseCase));
// bukuRouter.put('/update', asyncErrorHandler(updateBukuUseCase));
// bukuRouter.delete('/delete/:id', asyncErrorHandler(deleteBukuUseCase));
// bukuRouter.post(
//   '/bulk-buku-perpus',
//   uploadXls.single('file'),
//   asyncErrorHandler(bulkBukuPerpusUseCase)
// );
// bukuRouter.post(
//   '/bulk-buku-katalog',
//   uploadXls.single('file'),
//   asyncErrorHandler(bulkBukuPerpusUseCase)
// );
export const ApiCreateBuku = async (data: {
  judul: string;
  penulis: string;
  katalog: string;
  tahunTerbit: string;
  bahasa: string;
  prodi: string;
}) => {
  const response = await Axios.post(`${BACKEND_URL}/buku/create`, data)
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

export const ApiGetListBuku = async () => {
  const response = await AxiosWithToken()
    .get(`${BACKEND_URL}/buku/list`)
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

export const ApiUpdateBuku = async (data: {
  judul: string;
  penulis: string;
  katalog: string;
  tahunTerbit: string;
  bahasa: string;
  prodi: string;
  id: string;
}) => {
  const response = await Axios.put(`${BACKEND_URL}/buku/update`, data)
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

export const ApiDeleteBuku = async (id: string) => {
  const response = await AxiosWithToken()
    .delete(`${BACKEND_URL}/buku/delete/${id}`)
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

export const ApiBulkBukuPerpus = async (data: { file: any }) => {
  let formData = new FormData();
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  formData.append('file', data.file);

  const response = await AxiosWithToken()
    .post(`${BACKEND_URL}/buku/bulk-buku-perpus`, formData, config)
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

export const ApiBulkBukuKatalog = async (data: {
  file: any;
  katalog: string;
}) => {
  let formData = new FormData();
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  formData.append('file', data.file);
  formData.append('katalog', data.katalog);

  const response = await AxiosWithToken()
    .post(`${BACKEND_URL}/buku/bulk-buku-katalog`, formData, config)
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

export const ApiGetDetailBuku = async (id: string) => {
  const response = await AxiosWithToken()
    .get(`${BACKEND_URL}/buku/detail/${id}`)
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
