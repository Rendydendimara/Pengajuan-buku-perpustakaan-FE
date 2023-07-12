export const getColorStatus = (status: string) => {
  console.log('status', status);
  if (status === 'diproses') {
    return 'yellow';
  } else if (status === 'diterima' || status === 'selesai') {
    return 'green';
  } else if (status === 'gagal' || status === 'ditolak') {
    return 'red';
  }
  return 'transparent';
};
