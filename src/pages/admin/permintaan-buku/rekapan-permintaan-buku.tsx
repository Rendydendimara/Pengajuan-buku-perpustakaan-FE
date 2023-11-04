import AppTemplate from '@/components/templates/AppTemplate';
import Layout from '@/components/templates/Layout';
import { APP_NAME } from '@/constant';
import { Button } from '@chakra-ui/button';
import { FormLabel } from '@chakra-ui/form-control';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import moment from 'moment';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  createStandaloneToast,
  FormControl,
} from '@chakra-ui/react';
import { AiOutlineFilePdf } from 'react-icons/ai';
import {
  ApiCetakRekapan,
  ApiGetRekapanPengajuanBuku,
} from '@/api/pengajuanBuku';
import { groupBy } from 'lodash';
import { privateRouteAdmin } from '@/lib/withprivateRouteAdmin';
import { getProdiName } from '@/utils';

interface IDataRow {
  id: string;
  no: number;
  judulBuku: string;
  penulis: string;
  penerbit: string;
  tanggalUpload: string;
  tahun: string;
  aksi: string;
}

// interface IReduxStateWorkspace {
//   user?: IUser;
// }

interface IBukuRekapan {
  judulBuku: string;
  penulis: string;
  penerbit: string;
  tahunBuku: string;
  diBuat: string;
}

interface IDataRekapan {
  hkm: IBukuRekapan[];
  pbi: IBukuRekapan[];
  man: IBukuRekapan[];
  ekm: IBukuRekapan[];
  pmt: IBukuRekapan[];
  ptk: IBukuRekapan[];
  agt: IBukuRekapan[];
  agb: IBukuRekapan[];
  thp: IBukuRekapan[];
  tif: IBukuRekapan[];
}
let resulttif: IBukuRekapan[] = [];

const RekapanPermintaanBukuAdmin: NextPage = () => {
  const router = useRouter();
  const { toast } = createStandaloneToast();
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [dataRekapan, setDataRekapan] = useState<IDataRekapan | any>({
    hkm: [],
    pbi: [],
    man: [],
    ekm: [],
    pmt: [],
    ptk: [],
    agt: [],
    agb: [],
    thp: [],
    tif: [],
  });
  const [form, setForm] = useState({
    tahun: '',
    prodi: '',
  });

  const columns = useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'no',
      },
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Judul Buku',
        accessor: 'judulBuku',
      },
      {
        Header: 'Penulis',
        accessor: 'penulis',
      },
      {
        Header: 'Penerbit',
        accessor: 'penerbit',
      },
      {
        Header: 'Tanggal Upload',
        accessor: 'tanggalUpload',
      },
      {
        Header: 'Tahun',
        accessor: 'tahun',
      },
      {
        Header: 'Aksi',
        accessor: 'aksi',
      },
    ],
    []
  );
  const filterData = (
    prodi:
      | 'hkm'
      | 'pbi'
      | 'man'
      | 'ekm'
      | 'pmt'
      | 'ptk'
      | 'agt'
      | 'agb'
      | 'thp'
      | 'tif',
    dataSource: any[]
  ) => {
    let result: IBukuRekapan[] = [];

    dataSource
      .filter((dt: any) => dt.prodi === prodi)
      .map((dt: any) => {
        dt.buku.forEach((buku: any) => {
          if (buku._id) {
            result.push({
              judulBuku: buku._id.judul,
              penulis: buku._id.penulis,
              penerbit: buku._id.katalog.name,
              tahunBuku: buku._id.tahunTerbit,
              diBuat: moment(dt.createdAt).format('L'),
            });
          }
        });
      });
    return result;
  };

  const handleCetakRekapan = async () => {
    setLoadingDownload(true);
    const res = await ApiCetakRekapan(form);
    if (res.status !== 200) {
      toast({
        position: 'bottom',
        title: 'Error',
        description: res.data.message,
        status: 'error',
        duration: 8000,
        isClosable: true,
      });
    }
    setLoadingDownload(false);
  };

  const getListPengguna = async () => {
    const res = await ApiGetRekapanPengajuanBuku();
    if (res.status === 200) {
      let dataResult: any = [];
      res.data.data.forEach((dt: any) => {
        dataResult.push({
          ...dt,
          prodi: dt.dosenProdi.programStudi,
        });
      });

      let pbi: IBukuRekapan[] = filterData('pbi', dataResult);
      let man: IBukuRekapan[] = filterData('man', dataResult);
      let ekm: IBukuRekapan[] = filterData('ekm', dataResult);
      let pmt: IBukuRekapan[] = filterData('pmt', dataResult);
      let ptk: IBukuRekapan[] = filterData('ptk', dataResult);
      let agt: IBukuRekapan[] = filterData('agt', dataResult);
      let agb: IBukuRekapan[] = filterData('agb', dataResult);
      let thp: IBukuRekapan[] = filterData('thp', dataResult);
      let hkm: IBukuRekapan[] = filterData('hkm', dataResult);
      let tif: IBukuRekapan[] = filterData('tif', dataResult);

      setDataRekapan({
        hkm,
        pbi,
        man,
        ekm,
        pmt,
        ptk,
        agt,
        agb,
        thp,
        tif,
      });
    } else {
      toast({
        status: 'error',
        duration: 5000,
        title: 'Error',
        description: res.data.message,
        position: 'bottom-right',
      });
    }
  };

  const back = () => {
    router.back();
  };

  const onChangeProdi = (e: any) => {
    setForm({
      ...form,
      prodi: e.target.value,
    });
  };

  const onChangeTahun = (e: any) => {
    setForm({
      ...form,
      tahun: e.target.value,
    });
  };

  useEffect(() => {
    getListPengguna();
  }, []);

  return (
    <Layout>
      <Head>
        <title>{APP_NAME} | Admin | Manajemen Katalog</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppTemplate>
        <Flex mt='6' gap='10px' alignItems='center'>
          <FormControl my='3' id='nama_lengkap' isRequired w="200px">
            <FormLabel>Prodi</FormLabel>
            <Select
              name='programStudi'
              value={form.prodi}
              onChange={onChangeProdi}
              placeholder='Pilih Prodi'
            >
              <option value='semua'>Semua</option>
              <option value='tif'>Teknik Informatika</option>
              <option value='ptk'>Peternakan</option>
              <option value='agb'>Agribisnis</option>
              <option value='agt'>Agroteknologi</option>
              <option value='thp'>Teknologi Hasil Perikanan</option>
              <option value='hkm'>Hukum</option>
              <option value='pbi'>Pendidikan Biologi</option>
              <option value='man'>Manajemen</option>
              <option value='ekm'>Ekonomi Pembangunan</option>
              <option value='pmt'>Pendidikan Matematika</option>
              <option value='umum'>Umum</option>
            </Select>
          </FormControl>
          <FormControl w="200px">
            <FormLabel>Tahun</FormLabel>
            <Select
              onChange={onChangeTahun}
              value={form.tahun}
              placeholder='Pilih tahun'
            >
              <option value='2014'>2014</option>
              <option value='2015'>2015</option>
              <option value='2016'>2016</option>
              <option value='2017'>2017</option>
              <option value='2018'>2018</option>
              <option value='2019'>2019</option>
              <option value='2020'>2020</option>
              <option value='2021'>2021</option>
              <option value='2022'>2022</option>
              <option value='2023'>2023</option>
            </Select>
          </FormControl>
          <Button
            mt="30px"
            isLoading={loadingDownload}
            onClick={handleCetakRekapan}
            colorScheme='purple'
            leftIcon={<AiOutlineFilePdf />}
          >
            Cetak PDF
          </Button>
        </Flex>
        <Box p='4' minH='100vh'>
          <Text fontWeight='700' color='gray.700' fontSize='2xl'>
            Rekapan Permintaan Buku
          </Text>
          <Box my='4'>
            {/* <Flex w='full' justifyContent='flex-start' alignItems='center'>
              <Box>
                <FormLabel>Urutkan</FormLabel>
                <Select>
                  <option value=''>Penerbit A </option>
                  <option value=''>Penerbit B </option>
                  <option value=''>Penerbit C </option>
                  <option value=''>Penerbit D </option>
                </Select>
                <InputGroup w='500px' size='md'>
                  <Input placeholder='Cari nama...' />
                  <InputRightElement>
                    <IconButton
                      aria-label='cari'
                      // onClick={handleClick}
                      icon={<Search2Icon />}
                    />
                  </InputRightElement>
                </InputGroup>
              </Box>
            </Flex> */}
            <Box my='4'>
              {form.prodi === '' || form.prodi === 'semua' ?
                <>
                  <TableRekap title='Teknik Informatika' data={dataRekapan.tif} />
                  <TableRekap title='Peternakan' data={dataRekapan.ptk} />
                  <TableRekap
                    title='Teknologi Hasil Perikanan'
                    data={dataRekapan.thp}
                  />
                  <TableRekap title='Agribisnis' data={dataRekapan.agb} />
                  <TableRekap title='Agroteknologi' data={dataRekapan.agt} />
                  <TableRekap
                    title='Pendidikan Matematika'
                    data={dataRekapan.pmt}
                  />
                  <TableRekap title='Pendidikan Biologi' data={dataRekapan.pbi} />
                  <TableRekap title='Hukum' data={dataRekapan.hkm} />
                  <TableRekap title='Ekonomi Pembangunan' data={dataRekapan.ekm} />
                  <TableRekap title='Manajemen' data={dataRekapan.man} />
                </>
                :
                <>
                  <TableRekap title={getProdiName(form.prodi)} data={dataRekapan[form.prodi]} />
                </>
              }
            </Box>
          </Box>
        </Box>
      </AppTemplate>
    </Layout>
  );
};

interface ITableRekap {
  title: string;
  data: IBukuRekapan[];
}

const TableRekap: React.FC<ITableRekap> = (props) => {
  return (
    <Box my='8'>
      <Text
        textAlign='center'
        color='black'
        fontWeight='800'
        mb='3'
        size='24px'
      >
        {props.title}
      </Text>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Judul Buku</Th>
              <Th>Penulis</Th>
              <Th>Penerbit</Th>
              <Th>Tahun</Th>
              <Th>Diajukan Pada</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.data.map((dt, i) => (
              <Tr>
                <Td>{i + 1}</Td>
                <Td>{dt.judulBuku}</Td>
                <Td>{dt.penulis}</Td>
                <Td>{dt.penerbit}</Td>
                <Td>{dt.tahunBuku}</Td>
                <Td>{dt.diBuat}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default privateRouteAdmin(RekapanPermintaanBukuAdmin);
// export default RekapanPermintaanBukuAdmin;
