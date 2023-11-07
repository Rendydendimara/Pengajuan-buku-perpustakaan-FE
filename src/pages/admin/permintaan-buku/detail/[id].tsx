import { ApiChangeAllStatusPengajuanBukuItemBuku, ApiChangeStatusPengajuanBukuItemBuku, ApiGetDetailPengajuanBuku } from '@/api/pengajuanBuku';
import AppTemplate from '@/components/templates/AppTemplate';
import AppTemplateProdi from '@/components/templates/AppTemplateProdi';
import Layout from '@/components/templates/Layout';
import { APP_NAME } from '@/constant';
import { IPengajuanBuku } from '@/interface';
import { getColorStatus } from '@/utils/colors';
import { Button } from '@chakra-ui/button';
import { Box, Flex, Text, VStack } from '@chakra-ui/layout';
import { createStandaloneToast } from '@chakra-ui/toast';
import moment from 'moment';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
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
} from '@chakra-ui/react'

// interface IReduxStateWorkspace {
//   user?: IUser;
// }

interface IDataRow {
  no: number;
  diAjuakanPada: string;
  prodi: string;
  judulBuku: string;
  jumlah: number;
  status: string;
  aksi: string;
}

const DetailPengajuanAdmin: NextPage = () => {
  const router = useRouter();
  const [loadingChangeStatusBuku, setLoadingChangeStatusBuku] = useState(false)
  const { toast } = createStandaloneToast();
  const [data, setData] = useState<IPengajuanBuku>();
  const [idPengajuan, setIdPengajuan] = useState('');

  const getData = async (id: string) => {
    const res = await ApiGetDetailPengajuanBuku(id);
    if (res.status === 200) {
      setData({
        ...res.data.data,
        jumlah: res.data.data.buku.length,
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

  const getJumlahTotalBuku = (status?: string) => {
    let total = 0;
    if (status) {
      if (status === 'diproses') {
        data?.buku.filter((dt: any) => dt.status === 'diproses').map((bk: any) => (total += bk.jumlah));
        return total;
      } else if (status === 'diterima') {
        data?.buku.filter((dt: any) => dt.status === 'diterima').map((bk: any) => (total += bk.jumlah));
        return total;
      } else if (status === 'selesai') {
        data?.buku.filter((dt: any) => dt.status === 'selesai').map((bk: any) => (total += bk.jumlah));
        return total;
      } else if (status === 'gagal') {
        data?.buku.filter((dt: any) => dt.status === 'gagal').map((bk: any) => (total += bk.jumlah));
        return total;
      } else if (status === 'ditolak') {
        data?.buku.filter((dt: any) => dt.status === 'ditolak').map((bk: any) => (total += bk.jumlah));
        return total;
      }
    }
    data?.buku.map((bk: any) => (total += bk.jumlah));

    return total;
  };

  const changeItemBukuStatus = async (data: { idBuku: string; status: string; }) => {
    setLoadingChangeStatusBuku(true)
    const res = await ApiChangeStatusPengajuanBukuItemBuku({
      pengajuanId: idPengajuan,
      bukuId: data.idBuku,
      status: data.status
    })
    if (res.status === 200) {
      getData(idPengajuan);
    } else {
      toast({
        status: 'error',
        duration: 5000,
        title: 'Error',
        description: res.data.message,
        position: 'bottom-right',
      });
    }
    setLoadingChangeStatusBuku(false)
  }

  const changeAllItemBukuStatus = async (status: string) => {
    setLoadingChangeStatusBuku(true)
    const res = await ApiChangeAllStatusPengajuanBukuItemBuku({
      pengajuanId: idPengajuan,
      status: status
    })
    if (res.status === 200) {
      getData(idPengajuan);
    } else {
      toast({
        status: 'error',
        duration: 5000,
        title: 'Error',
        description: res.data.message,
        position: 'bottom-right',
      });
    }
    setLoadingChangeStatusBuku(false)
  }


  useEffect(() => {
    const id: any = router.query.id;
    if (id) {
      setIdPengajuan(id)
      getData(id);
    }
  }, [router.query]);

  return (
    <Layout>
      <Head>
        <title>{APP_NAME} | Admin | Pengajuan</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppTemplate>
        <Box w='full' p='4'>
          {/* <Link href='/prodi/manajemen-pengajuan'> */}
          {/* <Button leftIcon={<BiArrowBack />} size='md' colorScheme='blue'>
            Kembali
          </Button> */}
          {/* </Link> */}
          <Box my='5'>
            <Text fontSize='xl' fontWeight='700'>
              Detail Permintaan Buku
            </Text>
            <Box my='5'>
              <VStack spacing={3} w='full' alignItems='flex-start'>
                <Flex alignItems='center' gap='15px'>
                  <Flex
                    borderColor='blue'
                    minW='300px'
                    borderWidth='1px'
                    alignItems='center'
                    justifyContent='center'
                    padding='1'
                  >
                    Id Pengajuan Buku
                  </Flex>
                  <Text>: {data?._id}</Text>
                </Flex>
                <Flex alignItems='center' gap='15px'>
                  <Flex
                    borderColor='blue'
                    minW='300px'
                    borderWidth='1px'
                    alignItems='center'
                    justifyContent='center'
                    padding='1'
                  >
                    Tanggal Pengajuan
                  </Flex>
                  <Text>: {moment(data?.createdAt).format('LLL')}</Text>
                </Flex>
                <Flex alignItems='center' gap='15px'>
                  <Flex
                    borderColor='blue'
                    minW='300px'
                    borderWidth='1px'
                    alignItems='center'
                    justifyContent='center'
                    padding='1'
                  >
                    Status
                  </Flex>
                  <Flex
                    padding='1'
                    borderRadius='10px'
                    alignItems='center'
                    bgColor={getColorStatus(data?.status ?? '')}
                    justifyContent='center'
                  >
                    <Text color='black' fontWeight='700'>
                      {data?.status}
                    </Text>
                  </Flex>
                </Flex>
                <Flex alignItems='center' gap='15px'>
                  <Flex
                    borderColor='blue'
                    minW='300px'
                    borderWidth='1px'
                    alignItems='center'
                    justifyContent='center'
                    padding='1'
                  >
                    Jumlah Buku
                  </Flex>
                  <Text>: {data?.jumlah}</Text>
                </Flex>
                <Flex alignItems='center' gap='15px'>
                  <Flex
                    borderColor='blue'
                    minW='300px'
                    borderWidth='1px'
                    alignItems='center'
                    justifyContent='center'
                    padding='1'
                  >
                    Jumlah Total Buku
                  </Flex>
                  <Text>: {getJumlahTotalBuku()}</Text>
                </Flex>
                <Flex alignItems='center' gap='15px'>
                  <Flex
                    borderColor='blue'
                    minW='300px'
                    borderWidth='1px'
                    alignItems='center'
                    justifyContent='center'
                    padding='1'
                  >
                    Jumlah Total Buku Diproses
                  </Flex>
                  <Text>: {getJumlahTotalBuku('diproses')}</Text>
                </Flex>
                <Flex alignItems='center' gap='15px'>
                  <Flex
                    borderColor='blue'
                    minW='300px'
                    borderWidth='1px'
                    alignItems='center'
                    justifyContent='center'
                    padding='1'
                  >
                    Jumlah Total Buku Diterima
                  </Flex>
                  <Text>: {getJumlahTotalBuku('diterima')}</Text>
                </Flex>
                <Flex alignItems='center' gap='15px'>
                  <Flex
                    borderColor='blue'
                    minW='300px'
                    borderWidth='1px'
                    alignItems='center'
                    justifyContent='center'
                    padding='1'
                  >
                    Jumlah Total Buku Ditolak
                  </Flex>
                  <Text>: {getJumlahTotalBuku('ditolak')}</Text>
                </Flex>
                <Flex alignItems='center' gap='15px'>
                  <Flex
                    borderColor='blue'
                    minW='300px'
                    borderWidth='1px'
                    alignItems='center'
                    justifyContent='center'
                    padding='1'
                  >
                    Jumlah Total Buku Selesai
                  </Flex>
                  <Text>: {getJumlahTotalBuku('selesai')}</Text>
                </Flex>
                <Flex alignItems='center' gap='15px'>
                  <Flex
                    borderColor='blue'
                    minW='300px'
                    borderWidth='1px'
                    alignItems='center'
                    justifyContent='center'
                    padding='1'
                  >
                    Pesan Dari Admin Prodi
                  </Flex>
                  <Text maxW='500px'>: {data?.pesanDosen}</Text>
                </Flex>
                <Flex alignItems='center' gap='15px'>
                  <Flex
                    borderColor='blue'
                    minW='300px'
                    borderWidth='1px'
                    alignItems='center'
                    justifyContent='center'
                    padding='1'
                  >
                    Pesan Ke Admin Prodi
                  </Flex>
                  <Text maxW='500px'>: {data?.pesanAdmin}</Text>
                </Flex>
                <Flex alignItems='flex-start' gap='15px'>
                  <Flex
                    borderColor='blue'
                    minW='300px'
                    borderWidth='1px'
                    alignItems='center'
                    justifyContent='center'
                    padding='1'
                  >
                    Informasi Buku :
                  </Flex>
                </Flex>
                {data &&
                  <Box>
                    <Flex mt="20px" alignItems="center" gap='15px' mb='20px'>
                      {data.status === 'diterima' &&
                        <>
                          <Button
                            isLoading={loadingChangeStatusBuku}
                            colorScheme='red'
                            size='sm'
                            onClick={() => {
                              changeAllItemBukuStatus('ditolak'
                              )
                            }}
                          >
                            Tolak Semua
                          </Button>
                          <Button
                            isLoading={loadingChangeStatusBuku}
                            colorScheme='green'
                            size='sm'
                            onClick={() => {
                              changeAllItemBukuStatus('diterima')
                            }}

                          >
                            Terima Semua
                          </Button>
                        </>}
                    </Flex>
                    <TableContainer>
                      <Table size='sm'>
                        <Thead>
                          <Tr>
                            <Th>No</Th>
                            <Th>Judul Buku</Th>
                            <Th>Katalog</Th>
                            <Th textAlign="center">Jumlah</Th>
                            <Th>Keterangan</Th>
                            <Th>Aksi</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {data?.buku.map((buku: any, i: number) => (
                            <Tr key={i}>
                              <Td>{i + 1}</Td>
                              <Td>{buku._id?.judul}</Td>
                              <Td textAlign="center">{buku?._id?.katalog?.name ?? "-"}</Td>
                              <Td textAlign="center">{buku?.jumlah}</Td>
                              <Td>
                                <Flex
                                  padding='1'
                                  borderRadius='10px'
                                  alignItems='center'
                                  bgColor={getColorStatus(data.status === 'ditolak' ? 'ditolak' : buku.status ?? '')}
                                  justifyContent='center'
                                >
                                  <Text color='black' fontWeight='700'>
                                    {data.status === 'ditolak' ? 'ditolak' : buku.status ?? ''}
                                  </Text>
                                </Flex>
                              </Td>
                              <Td>
                                {data.status === 'ditolak' || data.status === 'selesai' || data.status === 'diproses' ? '-' : <Flex alignItems='center' gap='10px'>
                                  {buku.status === 'diproses' ?
                                    <>
                                      <Button
                                        isLoading={loadingChangeStatusBuku}
                                        colorScheme='red'
                                        size='sm'
                                        onClick={() => {
                                          changeItemBukuStatus({
                                            idBuku: buku._id._id,
                                            status: 'ditolak'
                                          })
                                        }}
                                      >
                                        Tolak
                                      </Button>
                                      <Button
                                        isLoading={loadingChangeStatusBuku}
                                        colorScheme='green'
                                        size='sm'
                                        onClick={() => {
                                          changeItemBukuStatus({
                                            idBuku: buku._id._id,
                                            status: 'diterima'
                                          })
                                        }}

                                      >
                                        Terima
                                      </Button>
                                    </>
                                    : '-'}

                                  {buku.status === 'diterima' && (
                                    <>
                                      <Button
                                        isLoading={loadingChangeStatusBuku}
                                        colorScheme='red'
                                        size='sm'
                                        onClick={() => {
                                          changeItemBukuStatus({
                                            idBuku: buku._id._id,
                                            status: 'gagal'
                                          })
                                        }}
                                      >
                                        Gagal
                                      </Button>
                                      <Button
                                        isLoading={loadingChangeStatusBuku}
                                        colorScheme='green'
                                        size='sm'
                                        onClick={() => {
                                          changeItemBukuStatus({
                                            idBuku: buku._id._id,
                                            status: 'selesai'
                                          })
                                        }}

                                      >
                                        Selesai
                                      </Button>
                                    </>
                                  )}
                                </Flex>}
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </Box>

                }
              </VStack>
            </Box>
          </Box>
        </Box>
      </AppTemplate>
    </Layout>
  );
};

export default DetailPengajuanAdmin;
// export default privateRouteAdmin(DetailPengajuanAdmin);
