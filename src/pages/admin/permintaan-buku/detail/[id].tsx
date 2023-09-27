import { ApiGetDetailPengajuanBuku } from '@/api/pengajuanBuku';
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
  const { toast } = createStandaloneToast();
  const [data, setData] = useState<IPengajuanBuku>();

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

  const getJumlahTotalBuku = () => {
    let total = 0;
    data?.buku.map((bk: any) => (total += bk.jumlah));
    data?.bukuLink.map((bk: any) => (total += bk.jumlah));

    return total;
  };

  useEffect(() => {
    const id: any = router.query.id;
    if (id) {
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
              Detail Pengajuan Buku
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
                    padding='2'
                  >
                    Id Pengajuan Buku
                  </Flex>
                  <Text>: {data?._id}</Text>
                </Flex>

                <Flex alignItems='flex-start' gap='15px'>
                  <Flex
                    borderColor='blue'
                    minW='300px'
                    borderWidth='1px'
                    alignItems='center'
                    justifyContent='center'
                    padding='2'
                  >
                    Buku
                  </Flex>
                  <VStack
                    w='full'
                    justifyContent='flex-start'
                    alignItems='flex-start'
                  >
                    {data?.buku.map((buku: any, i: number) => (
                      <Flex
                        bgColor='gray.400'
                        borderRadius='4px'
                        padding='2'
                        key={i}
                        minW='500px'
                        maxW='500px'
                        alignItems='center'
                        gap='5px'
                      >
                        {/* <Text fontWeight='bold' fontSize='lg'>
                          {i + 1}
                        </Text> */}
                        <Box>
                          <Text>Judul: {buku?._id?.judul}</Text>
                          <Text>Jumlah: {buku.jumlah}</Text>
                          <Text>Katalog: {buku?._id?.katalog.name}</Text>
                        </Box>
                      </Flex>
                    ))}
                    {data?.bukuLink.map((buku: any, i: number) => (
                      <Flex
                        bgColor='gray.400'
                        borderRadius='4px'
                        padding='2'
                        key={i}
                        minW='500px'
                        maxW='500px'
                        alignItems='center'
                        gap='5px'
                      >
                        {/* <Text fontWeight='bold' fontSize='lg'>
                          {i + 1}
                        </Text> */}
                        <Box>
                          <Text>
                            Link:{' '}
                            <Text
                              as='span'
                              _hover={{
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                color: 'blue',
                              }}
                            >
                              <a
                                target='_blank'
                                href={buku.linkBuku}
                                rel='noopener noreferrer'
                              >
                                {buku.linkBuku}
                              </a>
                            </Text>
                          </Text>
                          <Text>Jumlah: {buku.jumlah}</Text>
                        </Box>
                      </Flex>
                    ))}
                  </VStack>
                </Flex>
                <Flex alignItems='center' gap='15px'>
                  <Flex
                    borderColor='blue'
                    minW='300px'
                    borderWidth='1px'
                    alignItems='center'
                    justifyContent='center'
                    padding='2'
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
                    padding='2'
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
                    padding='2'
                  >
                    Informasi Tambahan
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
                    padding='2'
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
                    <Text color='white' fontWeight='700'>
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
                    padding='2'
                  >
                    Informasi Admin
                  </Flex>
                  <Text maxW='500px'>: {data?.pesanAdmin}</Text>
                </Flex>
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
