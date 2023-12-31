import AppTemplateProdi from '@/components/templates/AppTemplateProdi';
import LayoutProdi from '@/components/templates/LayoutProdi';
import { APP_NAME, LOCAL_CART_PRODI } from '@/constant';
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
  createStandaloneToast,
} from '@chakra-ui/react';
import { CiCircleRemove } from 'react-icons/ci';
import { BsFillCartFill } from 'react-icons/bs';
import { ICombinedState } from '@/provider/redux/store';
import { getProdiName } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { findIndex } from 'lodash';
import { ApiCreatePengajuanBuku } from '@/api/pengajuanBuku';

// interface IReduxStateWorkspace {
//   user?: IUser;
// }
interface IReduxStateWorkspace {
  user: any;
  cart: any;
}
interface IDataCart {
  prodi: string;
  judul: string;
  katalog: string;
  id: string;
  jumlah: number;
}
interface IFormBukuLink {
  link: string;
  jumlah: number;
}

const PengajuanProdi: NextPage = () => {
  const router = useRouter();
  const { user, cart } = useSelector<ICombinedState, IReduxStateWorkspace>(
    (state) => {
      return {
        user: state.user.user,
        cart: state.cart.cart,
      };
    }
  );
  const [dataCart, setDataCart] = useState<IDataCart[]>([]);
  const [formBukuLink, seFormBukuLink] = useState<IFormBukuLink[]>([
    {
      link: '',
      jumlah: 0,
    },
  ]);
  const [informasiTambahan, setInformasiTambahan] = useState('');
  const toast = createStandaloneToast();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // const { user } = useSelector<ICombinedState, IReduxStateWorkspace>(
  //   (state) => {
  //     return {
  //       user: state.user.user,
  //     };
  //   }
  // );

  const onAddFormBukuLink = () => {
    seFormBukuLink([...formBukuLink, { link: '', jumlah: 0 }]);
  };

  const onRemoveFormBukuLink = (index: number) => {
    seFormBukuLink([
      ...formBukuLink.slice(0, index),
      ...formBukuLink.slice(index + 1, formBukuLink.length),
    ]);
  };

  const onChangeFormBukuLink = (index: number, field: any, value: string) => {
    seFormBukuLink([
      ...formBukuLink.slice(0, index),
      {
        ...formBukuLink[index],
        [field]: value,
      },
      ...formBukuLink.slice(index + 1, formBukuLink.length),
    ]);
  };

  const createPengajuan = async () => {
    setLoading(true);
    let isErrorEmptyCount = false;
    dataCart.forEach((dt) => {
      if (dt.jumlah < 1) {
        isErrorEmptyCount = true;
      }
    });

    if (isErrorEmptyCount) {
      toast.toast({
        status: 'error',
        duration: 5000,
        title: 'Error',
        description: 'Pastikan jumlah buku harus lebih dari 0',
        position: 'bottom-right',
      });
    } else {
      const dataBuku: any = [];
      dataCart.forEach((dt) =>
        dataBuku.push({
          _id: dt.id,
          jumlah: dt.jumlah,
        })
      );

      const bukuLink: any = [];
      formBukuLink.map((dt) => {
        if (dt.jumlah > 0 && dt.link) {
          bukuLink.push({
            jumlah: dt.jumlah,
            linkBuku: dt.link,
          });
        }
      });

      const res = await ApiCreatePengajuanBuku({
        dataBuku: JSON.stringify(dataBuku),
        bukuLink: JSON.stringify(bukuLink),
        dosenProdi: user?._id,
        pesanDosen: informasiTambahan,
      });
      if (res.status === 200) {
        toast.toast({
          status: 'success',
          duration: 5000,
          title: 'Berhasil',
          description: 'Pengajuan berhasil dibuat',
          position: 'bottom-right',
        });
        localStorage.setItem(LOCAL_CART_PRODI, '');
        dispatch({
          type: 'SET_CART',
          cart: [],
        });
        router.push('/prodi/manajemen-pengajuan');
      } else {
        toast.toast({
          status: 'error',
          duration: 5000,
          title: 'Error',
          description: res.data.message,
          position: 'bottom-right',
        });
      }
    }
    setLoading(false);
  };

  const onChangeCount = (id: string, e: any) => {
    if (!isNaN(e.target.value)) {
      const index = findIndex(dataCart, ['id', id]);
      if (index != -1) {
        setDataCart([
          ...dataCart.slice(0, index),
          {
            ...dataCart[index],
            jumlah: Number(e.target.value),
          },
          ...dataCart.slice(index + 1, dataCart.length),
        ]);
      }
    }
  };

  const getJumlahBuku = () => {
    const dataBukuLink = formBukuLink.filter((dt) => dt.jumlah > 0 && dt.link);
    return dataCart.length + dataBukuLink.length;
  };

  const getTotalBanyakBuku = () => {
    let count = 0;
    dataCart.forEach((dt) => (count += Number(dt.jumlah)));
    const dataBukuLink = formBukuLink.filter((dt) => dt.jumlah > 0 && dt.link);
    dataBukuLink.forEach((dt) => (count += Number(dt.jumlah)));
    return count;
  };

  const onChangeInformasiTambahan = (e: any) => {
    setInformasiTambahan(e.target.value);
  };

  const removeCrt = (id: string) => {
    const newData = dataCart.filter((dt) => dt.id !== id);
    let cartBuku: any = localStorage.getItem(LOCAL_CART_PRODI);
    if (cartBuku) {
      cartBuku = JSON.parse(cartBuku);
      const newData = cartBuku.filter((dt: any) => dt._id !== id);
      localStorage.setItem(LOCAL_CART_PRODI, JSON.stringify(newData));
      dispatch({
        type: 'SET_CART',
        cart: newData,
      });
    }

    setDataCart(newData);
  };

  useEffect(() => {
    if (cart) {
      const temp: IDataCart[] = [];
      cart.forEach((crt: any) => {
        temp.push({
          prodi: crt.prodi,
          judul: crt.judul,
          katalog: crt.katalog,
          id: crt._id,
          jumlah: 0,
        });
      });
      setDataCart(temp);
    }
  }, [cart]);

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
              <Box mt='5' w='70%'>
                <TableContainer>
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
                      {dataCart.map((crt: IDataCart, i: number) => (
                        <Tr key={i}>
                          <Td>{getProdiName(crt.prodi)}</Td>
                          <Td>
                            <Text
                              maxWidth='300px'
                              minWidth='300px'
                              whiteSpace='break-spaces'
                            >
                              {crt.judul}
                            </Text>
                          </Td>
                          <Td>{crt.katalog}</Td>
                          <Td>
                            <Input
                              value={crt.jumlah}
                              borderColor='blue'
                              w='80px'
                              // type='ST'
                              onChange={(e) => onChangeCount(crt.id, e)}
                            />
                          </Td>
                          <Td>
                            <IconButton
                              onClick={() => removeCrt(crt.id)}
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

                {/* <Box mt='5' mb='30px'>
                  <Text fontSize='lg' fontWeight='700'>
                    Buku Link
                  </Text>
                  <VStack
                    my='2'
                    spacing='10px'
                    w='full'
                    alignItems='flex-start'
                  >
                    {formBukuLink.map((form, i) => (
                      <Flex w='full' alignItems='center' gap='10px'>
                        <FormControl>
                          <Input
                            value={form.link}
                            onChange={(e) =>
                              onChangeFormBukuLink(i, 'link', e.target.value)
                            }
                          />
                        </FormControl>
                        <Input
                          borderColor='blue'
                          w='80px'
                          type='number'
                          value={form.jumlah}
                          onChange={(e) =>
                            onChangeFormBukuLink(i, 'jumlah', e.target.value)
                          }
                        />
                        <IconButton
                          onClick={() => onRemoveFormBukuLink(i)}
                          colorScheme='red'
                          aria-label='delete'
                          icon={<CiCircleRemove size={24} />}
                        />
                      </Flex>
                    ))}
                  </VStack>

                  <Button
                    size='sm'
                    colorScheme='green'
                    onClick={onAddFormBukuLink}
                  >
                    Tambah
                  </Button>
                </Box> */}
                <Box mt='10'>
                  <Text
                    mt='10'
                    as='span'
                    fontSize='xl'
                    color='blue.700'
                    fontWeight='bold'
                    _hover={{
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      color: 'blue',
                    }}
                  >
                    <a
                      target='_blank'
                      href='https://docs.google.com/forms/u/0/'
                      rel='noopener noreferrer'
                    >
                      Link Pengajuan
                    </a>
                  </Text>
                </Box>
              </Box>

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
                      <Text>Jumlah Buku: {getJumlahBuku()}</Text>
                      <Text>Total Banyak Buku: {getTotalBanyakBuku()}</Text>
                      <Text>
                        Program Studi: {getProdiName(user?.programStudi)}
                      </Text>
                      <FormControl>
                        <FormLabel>Pesan Dari Prodi:</FormLabel>
                        <Textarea
                          value={informasiTambahan}
                          onChange={onChangeInformasiTambahan}
                          rows={5}
                        />
                      </FormControl>
                    </VStack>
                  </Box>
                  <Button
                    w='full'
                    leftIcon={<BsFillCartFill />}
                    colorScheme='green'
                    mt='4'
                    isLoading={loading}
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
