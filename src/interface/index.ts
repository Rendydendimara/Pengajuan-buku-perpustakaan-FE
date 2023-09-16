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
  judul: string;
  penulis: string;
  katalog: string;
  tahunTerbit: string;
  bahasa: string;
  prodi: string;
  harga?: number;
  tanggalUpload: string;
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
}
