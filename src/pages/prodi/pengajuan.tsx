import AppTemplateProdi from '@/components/templates/AppTemplateProdi';
import LayoutProdi from '@/components/templates/LayoutProdi';
import { APP_NAME } from '@/constant';
import { Button, IconButton } from '@chakra-ui/button';
import { Checkbox } from '@chakra-ui/checkbox';
import { Box, Flex, Text, VStack } from '@chakra-ui/layout';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
  Input,
  FormControl,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';
import { CiCircleRemove } from 'react-icons/ci';
import { BsFillCartFill } from 'react-icons/bs';

// interface IReduxStateWorkspace {
//   user?: IUser;
// }

const PengajuanProdi: NextPage = () => {
  const router = useRouter();
  // const { user } = useSelector<ICombinedState, IReduxStateWorkspace>(
  //   (state) => {
  //     return {
  //       user: state.user.user,
  //     };
  //   }
  // );

  const createPengajuan = () => {
    router.push('/prodi/manajemen-pengajuan');
  };

  return (
    <LayoutProdi showOnlyInfoUser>
      <Head>
        <title>{APP_NAME} | Prodi | Pengajuan</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppTemplateProdi>
        <Box w='full'>
          <Link href='/prodi/beranda'>
            <Button leftIcon={<BiArrowBack />} size='md' colorScheme='blue'>
              Kembali
            </Button>
          </Link>
          <Box my='5'>
            <Text fontSize='xl' fontWeight='700'>
              Daftar Pengajuan
            </Text>
            <Flex gap='50px'>
              <TableContainer mt='5' w='70%'>
                <Table variant='simple'>
                  <TableCaption>Daftar Pengajuan Buku</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Program Studi</Th>
                      <Th>Judul Buku</Th>
                      <Th>Penerbit</Th>
                      <Th>Jumlah</Th>
                      <Th>Aksi</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Tr key={i}>
                        <Td>Teknik Informatika</Td>
                        <Td>Buku Arsitektur Komputer</Td>
                        <Td>Akhlis Munaziliin</Td>
                        <Td>
                          <Input borderColor='blue' w='80px' type='number' />
                        </Td>
                        <Td>
                          <IconButton
                            colorScheme='red'
                            aria-label='delete'
                            icon={<CiCircleRemove size={24} />}
                          />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
              <Box w='30%'>
                <Box
                  boxShadow='lg'
                  borderColor='blue'
                  borderWidth='1px'
                  borderRadius='4px'
                  p='4'
                >
                  <Text fontSize='lg' fontWeight='700'>
                    Informasi Belanja
                  </Text>
                  <Box mt='4'>
                    <VStack spacing={1} alignItems='flex-start'>
                      <Text>Jumlah Buku: 6</Text>
                      <Text>Total Banyak Buku: 9</Text>
                      <Text>Program Studi: Teknik Informatika</Text>
                      <FormControl>
                        <FormLabel>Informasi Tambahan:</FormLabel>
                        <Textarea rows={5} />
                      </FormControl>
                    </VStack>
                  </Box>
                  <Button
                    w='full'
                    leftIcon={<BsFillCartFill />}
                    colorScheme='green'
                    mt='4'
                    onClick={createPengajuan}
                  >
                    Buat Pesanan
                  </Button>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Box>
      </AppTemplateProdi>
    </LayoutProdi>
  );
};

export default PengajuanProdi;
// export default privateRouteAdmin(PengajuanProdi);