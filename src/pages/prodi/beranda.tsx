import { ApiGetListBuku } from '@/api/buku';
import { ApiGetListKatalogBuku } from '@/api/katalogBuku';
import AppTemplateProdi from '@/components/templates/AppTemplateProdi';
import LayoutProdi from '@/components/templates/LayoutProdi';
import { APP_NAME, LOCAL_CART_PRODI } from '@/constant';
import { IDataBuku } from '@/interface';
import { ICombinedState } from '@/provider/redux/store';
import { Button } from '@chakra-ui/button';
import { Checkbox } from '@chakra-ui/checkbox';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import { Skeleton, SkeletonText } from '@chakra-ui/skeleton';
import { createStandaloneToast } from '@chakra-ui/toast';
import { includes, some } from 'lodash';
import moment from 'moment';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BiSearchAlt2, BiSolidBookBookmark } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';

interface IReduxStateWorkspace {
  user?: any;
}

export interface IKatalog {
  name: string;
  id: string;
}

const BerandaProdi: NextPage = () => {
  const router = useRouter();
  const { toast } = createStandaloneToast();
  const [loading, setLoading] = useState(false);
  const [dataBuku, setDataBuku] = useState<IDataBuku[]>([]);
  const [listKatalog, setListKatalog] = useState<IKatalog[]>([]);
  const [selectedKatalog, setSelectedKatalog] = useState('');
  const [selectedTahun, setSelectedTahun] = useState('');
  const [searching, setSearching] = useState('');
  const { user } = useSelector<ICombinedState, IReduxStateWorkspace>(
    (state) => {
      return {
        user: state.user.user,
      };
    }
  );

  const gotoPengajuan = () => {
    router.push('/prodi/pengajuan');
  };

  const getListBuku = async () => {
    setLoading(true);
    let temp: IDataBuku[] = [];
    let res = await ApiGetListBuku({ prodi: user?.programStudi ?? 'umum' });
    if (res.status === 200) {
      let i = 0;
      for (const data of res.data.data) {
        i += 1;
        temp.push({
          no: i,
          _id: data._id,
          judul: data.judul,
          penulis: data.penulis,
          katalog: data?.katalog?.name ?? '-',
          katalogId: data?.katalog?._id ?? '-',
          tahunTerbit: data.tahunTerbit,
          bahasa: data.bahasa,
          prodi: data.prodi,
          tanggalUpload: moment(data.createdAt).format('L'),
        });
      }
    }
    res = await ApiGetListBuku({ prodi: 'umum' });
    if (res.status === 200) {
      let i = 0;
      for (const data of res.data.data) {
        i += 1;
        temp.push({
          no: i,
          _id: data._id,
          judul: data.judul,
          penulis: data.penulis,
          katalog: data?.katalog?.name ?? '-',
          katalogId: data?.katalog?._id ?? '-',
          tahunTerbit: data.tahunTerbit,
          bahasa: data.bahasa,
          prodi: data.prodi,
          tanggalUpload: moment(data.createdAt).format('L'),
        });
      }
      setDataBuku(temp);
    } else {
      toast({
        title: 'Error',
        description: res.data.message,
        status: 'error',
      });
    }
    setLoading(false);
  };

  const getListKatalog = async () => {
    const res = await ApiGetListKatalogBuku();
    if (res.status === 200) {
      let temp: IKatalog[] = [];
      for (const data of res.data.data) {
        temp.push({
          id: data._id,
          name: data.name,
        });
      }
      setListKatalog(temp);
    } else {
      toast({
        title: 'Gagal',
        description: res.data.message,
        status: 'error',
      });
    }
  };

  const onChangeKatalog = (e: any) => {
    setSelectedKatalog(e.target.value);
  };

  const onChangeTahun = (e: any) => {
    setSelectedTahun(e.target.value);
  };

  const onChangeSearching = (e: any) => {
    setSearching(e.target.value);
  };

  const filterBukuProdi = () => {
    let data = dataBuku;
    data = data.filter((data) => data.prodi !== 'umum');
    if (searching) {
      data = data.filter((data) => {
        const haystack = [data.judul.toLowerCase()];
        return some(haystack, (el) => includes(el, searching.toLowerCase()));
      });
    }
    if (selectedKatalog) {
      data = data.filter((data) => data.katalogId === selectedKatalog);
    }
    if (selectedTahun) {
      data = data.filter((data) => data.tahunTerbit === selectedTahun);
    }

    return data;
  };

  const filterBukuUmum = () => {
    let data = dataBuku;
    data = data.filter((data) => data.prodi === 'umum');
    if (searching) {
      data = data.filter((data) => {
        const haystack = [data.judul.toLowerCase()];
        return some(haystack, (el) => includes(el, searching.toLowerCase()));
      });
    }
    if (selectedKatalog) {
      data = data.filter((data) => data.katalogId === selectedKatalog);
    }
    if (selectedTahun) {
      data = data.filter((data) => data.tahunTerbit === selectedTahun);
    }
    return data;
  };
  useEffect(() => {
    getListKatalog();
  }, []);

  useEffect(() => {
    getListBuku();
  }, [user]);

  return (
    <LayoutProdi>
      <Head>
        <title>{APP_NAME} | Prodi | Beranda</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppTemplateProdi>
        <Box w='full' mt='15'>
          <Text fontSize='lg' fontWeight='700'>
            Prodi Teknik Informatika
          </Text>
          <Flex mt='6' gap='10px' alignItems='center'>
            <FormControl w='fit-content'>
              <FormLabel>Katalog</FormLabel>
              <Select
                onChange={onChangeKatalog}
                value={selectedKatalog}
                w='150px'
                placeholder='Pilih katalog'
              >
                <option value=''>Semua</option>
                {listKatalog.map((katalog, i) => (
                  <option key={i} value={katalog.id}>
                    {katalog.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl w='fit-content'>
              <FormLabel>Tahun</FormLabel>
              <Select
                onChange={onChangeTahun}
                value={selectedTahun}
                w='150px'
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
            <FormControl w='fit-content'>
              <FormLabel>Cari buku</FormLabel>
              <InputGroup w='400px'>
                <Input
                  value={searching}
                  onChange={onChangeSearching}
                  placeholder='Cari judul buku'
                />
                <InputRightElement width='4.5rem'>
                  <BiSearchAlt2 />
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </Flex>

          <Box w='full' mt='6'>
            <VStack w='full' spacing={10}>
              <Box w='full'>
                <Text fontSize='2xl'>List Buku Prodi</Text>
                <VStack w='full' spacing={4} mt='4'>
                  {loading ? (
                    [1, 2, 3, 4, 5].map((i) => <ItemLoading key={i} />)
                  ) : filterBukuProdi().length > 0 ? (
                    filterBukuProdi().map((buku, i) => (
                      <ItemBuku key={i} buku={buku} index={i} />
                    ))
                  ) : (
                    <Heading
                      display='inline-block'
                      as='h2'
                      size='2xl'
                      bgGradient='linear(to-r, teal.400, teal.600)'
                      backgroundClip='text'
                    >
                      Data Kosong
                    </Heading>
                  )}
                </VStack>
              </Box>
              <Box w='full'>
                <Text fontSize='2xl'>List Buku Umum</Text>
                <VStack w='full' spacing={4} mt='4'>
                  {loading ? (
                    [1, 2, 3, 4, 5].map((i) => <ItemLoading key={i} />)
                  ) : filterBukuUmum().length > 0 ? (
                    filterBukuUmum().map((buku, i) => (
                      <ItemBuku key={i} buku={buku} index={i} />
                    ))
                  ) : (
                    <Heading
                      display='inline-block'
                      as='h2'
                      size='2xl'
                      bgGradient='linear(to-r, teal.400, teal.600)'
                      backgroundClip='text'
                    >
                      Data Kosong
                    </Heading>
                  )}
                </VStack>
              </Box>
            </VStack>
          </Box>
        </Box>
      </AppTemplateProdi>
    </LayoutProdi>
  );
};

export default BerandaProdi;
// export default privateRouteAdmin(BerandaProdi);

interface IItemBuku {
  index: number;
  buku: IDataBuku;
}

const ItemBuku: React.FC<IItemBuku> = (props) => {
  const { toast } = createStandaloneToast();
  const dispatch = useDispatch();

  const addToCart = (buku: IDataBuku) => {
    if (typeof window !== 'undefined') {
      let cartBuku: any = localStorage.getItem(LOCAL_CART_PRODI);
      if (cartBuku) {
        cartBuku = JSON.parse(cartBuku);
        const exist = cartBuku.find((dt: IDataBuku) => dt._id === buku._id);
        if (!exist) {
          cartBuku.push(buku);
          localStorage.setItem(LOCAL_CART_PRODI, JSON.stringify(cartBuku));
          dispatch({
            type: 'SET_CART',
            cart: cartBuku,
          });
          toast({
            title: 'Berhasil',
            description: 'berhasil menambahkan ke keranjang',
            status: 'success',
          });
        } else {
          toast({
            title: 'Berhasil',
            description: 'berhasil menambahkan ke keranjang',
            status: 'success',
          });
        }
      } else {
        localStorage.setItem(LOCAL_CART_PRODI, JSON.stringify([buku]));
        dispatch({
          type: 'SET_CART',
          cart: [buku],
        });
        toast({
          title: 'Berhasil',
          description: 'berhasil menambahkan ke keranjang',
          status: 'success',
        });
      }
    }
  };

  return (
    <Flex
      w='full'
      borderRadius='8px'
      border='1px solid pink'
      justifyContent='space-between'
      minH='80px'
    >
      <Flex gap='10px' w='60%'>
        <Flex
          justifyContent='center'
          alignItems='center'
          bgColor='pink.500'
          w='70px'
          h='full'
        >
          <Text color='gray.800' fontSize='2xl'>
            {props.buku.no}
          </Text>
        </Flex>
        <VStack
          w='full'
          justifyContent='center'
          alignItems='flex-start'
          spacing='1'
        >
          <Text>{props.buku.judul}</Text>
          <Text>Katalog: {props.buku.katalog}</Text>
          <Text>Penulis: {props.buku.penulis}</Text>
        </VStack>
      </Flex>
      <Flex
        w='40%'
        alignItems='center'
        justifyContent='space-between'
        gap='40px'
        pr='4'
      >
        <Box>
          <Text>Bahasa: {props.buku.bahasa}</Text>
          <Text>Tahun terbit: {props.buku.tahunTerbit}</Text>
        </Box>
        <Box>
          <Button
            onClick={() => addToCart(props.buku)}
            my='8'
            colorScheme='green'
          >
            Ajukan
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

const ItemLoading: React.FC<any> = () => {
  return (
    <Flex
      border='1px solid pink'
      w='full'
      borderRadius='8px'
      justifyContent='space-between'
    >
      <Flex gap='10px' w='60%'>
        <Skeleton width='75px' h='50px' />
        <VStack
          w='full'
          justifyContent='center'
          alignItems='flex-start'
          spacing='2'
        >
          <Skeleton width='400px' h='10px' />
          <Skeleton width='400px' h='10px' />
          <Skeleton width='400px' h='10px' />
        </VStack>
      </Flex>
      <Flex
        w='40%'
        alignItems='center'
        justifyContent='space-between'
        gap='40px'
        pr='4'
      >
        <VStack
          w='full'
          justifyContent='center'
          alignItems='flex-start'
          spacing='2'
        >
          <Skeleton width='300px' h='10px' />
          <Skeleton width='300px' h='10px' />
          <Skeleton width='300px' h='10px' />
        </VStack>
        <Box>
          <Skeleton height='40px' w='80px' />
        </Box>
      </Flex>
    </Flex>
  );
};
