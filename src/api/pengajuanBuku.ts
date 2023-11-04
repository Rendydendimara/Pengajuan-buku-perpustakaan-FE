import Axios from 'axios';
import { BACKEND_URL } from '../constant';
import { AxiosWithToken } from '../lib/axios';
import fileDownload from 'js-file-download';

export const ApiCreatePengajuanBuku = async (data: {
  dataBuku: string;
  dosenProdi: string;
  pesanDosen: string;
  bukuLink: string;
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

export const ApiGetRekapanPengajuanBuku = async () => {
  const response = await AxiosWithToken()
    .get(`${BACKEND_URL}/pengajuan-buku/get-rekapan`)
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

// export const ApiUpdatePengajuanBuku = async (data: {
//   buku: string;
//   jumlah: number;
//   pesanAdmin: string;
//   pesanDosen: string;
//   status: string;
//   id: string;
// }) => {
//   const response = await Axios.put(`${BACKEND_URL}/pengajuan-buku/update`, data)
//     .then((response) => {
//       return response;
//     })
//     .catch((error) => {
//       return error.response;
//     });

//   if (response) {
//     return response;
//   } else {
//     return {
//       status: 500,
//       data: {
//         message: 'Server error.',
//       },
//     };
//   }
// };

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

export const ApiGetDetailPengajuanBuku = async (id: string) => {
  const response = await AxiosWithToken()
    .get(`${BACKEND_URL}/pengajuan-buku/detail/${id}`)
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

export const ApiChangeStatusPengajuanBuku = async (data: {
  status: string;
  pesan: string;
  id: string;
}) => {
  const response = await Axios.post(
    `${BACKEND_URL}/pengajuan-buku/change-status`,
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

export const ApiCetakRekapan = async (form: {
  tahun: string;
  prodi: string;
}) => {
  const response = await Axios.get(
    `${BACKEND_URL}/pengajuan-buku/cetak-rekapan?tahun=${form.tahun}&prodi=${form.prodi}`,
    {
      responseType: 'blob',
    }
  )
    .then((response) => {
      fileDownload(
        response.data,
        `${new Date().getTime().toString()}-laporan.pdf`
      );
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
        message: 'Server error. Silakan hubungi admin',
      },
    };
  }
};

export const ApiChangeStatusPengajuanBukuItemBuku = async (data: {
  status: string; pengajuanId: string; bukuId: string;
}) => {
  const response = await Axios.post(
    `${BACKEND_URL}/pengajuan-buku/change-status-item-buku`,
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


export const ApiChangeAllStatusPengajuanBukuItemBuku = async (data: {
  status: string; pengajuanId: string;
}) => {
  const response = await Axios.post(
    `${BACKEND_URL}/pengajuan-buku/change-all-status-item-buku`,
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