export const getProdiName = (prodiCode: string) => {
  switch (prodiCode) {
    case 'tif':
      return 'Teknik Informatika';
    case 'thp':
      return 'Teknologi Hasil Perikanan';
    case 'agt':
      return 'Agroteknologi';
    case 'ptk':
      return 'Peternakan';
    case 'agb':
      return 'Agribisnis';
    default:
      return '';
  }
};
