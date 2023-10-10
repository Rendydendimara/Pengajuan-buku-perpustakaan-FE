export interface IDataResultBulk {
  judul: string;
  penulis: string;
  katalog: string;
  tahunTerbit: string;
  bahasa: string;
  prodi: string;
  harga: number;
  tanggalUpload: string;
}

export interface IDataBuku {
  _id: string;
  no: number;
  judul: string;
  penulis: string;
  katalog: string;
  tahunTerbit: string;
  bahasa: string;
  prodi: string;
  harga?: number;
  katalogId: string;
  tanggalUpload: string;
  tipeBuku?: 'byKatalog' | 'byPerpus';
}

export interface IPengajuanBuku {
  _id: string;
  buku: any;
  dosenProdi: string;
  jumlah: number;
  pesanAdmin: string;
  pesanDosen: string;
  status: string;
  createdAt: string;
  deletedAt: string | null;
  updatedAt: string | null;
  bukuLink: any[];
}
