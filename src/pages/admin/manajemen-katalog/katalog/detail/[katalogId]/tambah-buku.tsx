import { ApiCreateBuku, ApiGetDetailBuku, ApiUpdateBuku } from '@/api/buku';
import { ApiGetDetailKatalogBuku } from '@/api/katalogBuku';
import AppTemplate from '@/components/templates/AppTemplate';
import Layout from '@/components/templates/Layout';
import { APP_NAME } from '@/constant';
import { Alert, AlertIcon } from '@chakra-ui/alert';
import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { useDisclosure } from '@chakra-ui/hooks';
import { Input } from '@chakra-ui/input';
import { Box, Flex, Text } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { Select } from '@chakra-ui/select';
import { createStandaloneToast } from '@chakra-ui/toast';
import type { NextPage } from 'next';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TambahBukuAdmin: NextPage = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState<'add' | 'cancel' | ''>('');
  const [initialValue, setInitialValue] = useState(
    '<p>Tambahkan deskripsi produkmu untuk memudahkan pelanggan melihat informasi produk</p>'
  );
  const [isShowPassword, setIsShowPassword] = useState<boolean>(true);
  const [isShowConfirmPassword, setIsShowConfirmPassword] =
    useState<boolean>(true);
  const handleTogglePasswordShow = (): void => {
    setIsShowPassword(!isShowPassword);
  };
  // const [listProdi, setListProdi] = useState<IProdi[]>([]);
  // const { showToast } = useGlobalContext();
  const [actionType, setActionType] = useState<'add' | 'edit'>('add');
  const [idSelected, setIdSelected] = useState();
  const [form, setForm] = useState<any>({
    judulBuku: '',
    penulis: '',
    tahunTerbit: '',
    bahasa: '',
    prodi: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingPost, setLoadingPost] = useState(false);
  const handleToggleConfirmPasswordShow = (): void => {
    setIsShowConfirmPassword(!isShowConfirmPassword);
  };
  const { toast } = createStandaloneToast();

  const onChangeForm = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const onOpenModal = (type: 'add' | 'cancel') => {
    setModalType(type);
    onOpen();
  };

  const changeDate = (e: any) => {
    setForm({ ...form, tahunTerbit: e });
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>
  ): Promise<void> => {
    setErrorMessage('');
    onClose();
    setLoadingPost(true);
    event.preventDefault();
    if (actionType === 'edit') {
      const katalogId: any = router.query.katalogId;
      const res = await ApiUpdateBuku({
        judul: form.judulBuku,
        penulis: form.penulis,
        katalog: katalogId,
        tahunTerbit: new Date(form.tahunTerbit).getFullYear().toString(),
        bahasa: form.bahasa,
        prodi: form.prodi,
        id: idSelected ?? '',
      });
      if (res.status === 200) {
        toast({
          title: 'Berhasil',
          description: 'Berhasil mengubah buku',
          status: 'success',
        });
        router.push(`/admin/manajemen-katalog/katalog/detail/${katalogId}/`);
      } else {
        toast({
          title: 'Gagal',
          description: res.data.message,
          status: 'error',
        });
      }
      // update api
      // new Date(form.tahunPembelian).getFullYear()
      // tahunPembelian: new Date(`01-01-${res.data.data.tahun_pembelian}`),
    } else {
      const katalogId: any = router.query.katalogId;
      const res = await ApiCreateBuku({
        judul: form.judulBuku,
        penulis: form.penulis,
        katalog: katalogId,
        tahunTerbit: new Date(form.tahunTerbit).getFullYear().toString(),
        bahasa: form.bahasa,
        prodi: form.prodi,
      });
      if (res.status === 200) {
        toast({
          title: 'Berhasil',
          description: 'Berhasil menambah buku',
          status: 'success',
        });
        router.push(`/admin/manajemen-katalog/katalog/detail/${katalogId}/`);
      } else {
        toast({
          title: 'Gagal',
          description: res.data.message,
          status: 'error',
        });
      }
    }

    setLoadingPost(false);
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

  const onChangeBahasa = (e: any) => {
    setForm({
      ...form,
      bahasa: e.target.value,
    });
  };

  const [catalogData, setCatalogData] = useState<any>();

  const getCatalogName = async (id: string) => {
    const res = await ApiGetDetailKatalogBuku(id);
    if (res.status === 200) {
      setCatalogData(res.data.data);
    } else {
      console.log('back');
      Router.push(`/admin/manajemen-katalog/katalog/`);
    }
  };

  const disabled = () => {
    if (
      form.bahasa &&
      form.judulBuku &&
      form.penulis &&
      form.prodi &&
      form.tahunTerbit
    )
      return false;
    return true;
  };

  const getDetailBuku = async (id: string) => {
    const res = await ApiGetDetailBuku(id);
    if (res.status === 200) {
      // judul
      // penulis
      // katalog
      // tahunTerbit
      // bahasa
      // prodi
      // createdAt
      // deletedAt
      // updatedAt
      setForm({
        judulBuku: res.data.data.judul,
        penulis: res.data.data.penulis,
        tahunTerbit: new Date(`01-01-${res.data.data.tahunTerbit}`),
        bahasa: res.data.data.bahasa,
        prodi: res.data.data.prodi,
      });
    } else {
      toast({
        title: 'Gagal',
        description: res.data.message,
        status: 'error',
      });
    }
  };

  useEffect(() => {
    const { id, katalogId }: any = router.query;
    if (id) {
      setActionType('edit');
      setIdSelected(id);
      getDetailBuku(id);
    }
    if (katalogId) {
      getCatalogName(katalogId);
    }
  }, [router.query]);

  return (
    <Layout>
      <Head>
        <title>
          {APP_NAME} | Admin | {actionType === 'edit' ? 'Ubah' : 'Tambah'} Buku
        </title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppTemplate>
        <Box p='2'>
          <Text fontWeight='700' fontSize='2xl'>
            {actionType === 'edit' ? 'Ubah' : 'Tambah'} Buku
          </Text>
          {errorMessage && (
            <>
              <Alert status='error' mb={'10px'}>
                <AlertIcon />
                <Text fontSize='12px'>{errorMessage}</Text>
              </Alert>
            </>
          )}
          <Flex my='4' justifyContent='center'>
            <Box w='50%'>
              <form method='POST'>
                <FormControl my='3' id='nama_lengkap' isRequired>
                  <FormLabel>Katalog</FormLabel>
                  <Select disabled>
                    <option>{catalogData?.name}</option>
                  </Select>
                </FormControl>
                <FormControl my='3' id='nama_lengkap' isRequired>
                  <FormLabel>Prodi</FormLabel>
                  <Select
                    name='programStudi'
                    value={form.prodi}
                    onChange={onChangeProdi}
                  >
                    <option value=''></option>
                    <option value='tif'>Teknik Informatika</option>
                    <option value='ptk'>Peternakan</option>
                    <option value='agb'>Agribisnis</option>
                    <option value='agt'>Agroteknologi</option>
                    <option value='thp'>Teknologi Hasil Perikanan</option>
                  </Select>
                </FormControl>
                <FormControl my='3' id='nama_lengkap' isRequired>
                  <FormLabel>Judul Buku</FormLabel>
                  <Input
                    type='text'
                    name='judulBuku'
                    value={form.judulBuku}
                    onChange={onChangeForm}
                    required
                  />
                </FormControl>
                <FormControl my='3' id='nidn' isRequired>
                  <FormLabel>Tahun Terbit</FormLabel>
                  <DatePicker
                    id='DatePicker'
                    // type='string'
                    className='text-primary dateInput yearPicker'
                    selected={
                      form.tahunTerbit ? new Date(form.tahunTerbit) : null
                    }
                    onChange={changeDate}
                    // value={form.tahunPembelian}
                    showYearPicker
                    dateFormat='yyyy'
                    yearItemNumber={9}
                    required
                  />
                </FormControl>
                <FormControl my='3' id='nama_lengkap' isRequired>
                  <FormLabel>Penulis</FormLabel>
                  <Input
                    type='text'
                    name='penulis'
                    value={form.penulis}
                    onChange={onChangeForm}
                    required
                  />
                </FormControl>
                <FormControl my='3' id='nama_lengkap' isRequired>
                  <FormLabel>Bahasa</FormLabel>
                  <Select
                    name='bahasa'
                    value={form.bahasa}
                    onChange={onChangeBahasa}
                  >
                    <option value=''></option>
                    <option value='Indonesia'>Indonesia</option>
                    <option value='Inggris'>Inggris</option>
                  </Select>
                </FormControl>
              </form>
              <Box mt='5'>
                <Button
                  type='submit'
                  w='full'
                  onClick={() => onOpenModal('add')}
                  colorScheme='green'
                  _hover={{
                    bg: 'green.700',
                  }}
                  isDisabled={disabled()}
                  isLoading={loadingPost}
                >
                  {actionType === 'edit' ? 'Update' : 'Upload'}
                </Button>
                <Button
                  mt='2'
                  onClick={() => onOpenModal('cancel')}
                  w='full'
                  // onClick={handleSubmitRegister}
                  colorScheme='red'
                  _hover={{
                    bg: 'red.700',
                  }}
                >
                  Batal
                </Button>
              </Box>
            </Box>
          </Flex>
        </Box>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {modalType === 'add'
                ? `${actionType === 'edit' ? 'Ubah' : 'Tambah'}`
                : 'Batal'}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {modalType === 'add' ? (
                <Box>
                  <Text>
                    Apakah kamu yakin untuk{' '}
                    {actionType === 'edit' ? 'mengubah' : 'menambah'}?
                  </Text>
                  <Text>Pastikan semua info sudah diisi dengan benar</Text>
                </Box>
              ) : (
                <Box>
                  <Text>
                    Apakah kamu yakin untuk membatalkan{' '}
                    {actionType === 'edit' ? 'pengubahan' : 'penambahan'} ?
                  </Text>
                </Box>
              )}
            </ModalBody>
            <ModalFooter gap='2'>
              <Button onClick={handleSubmit} colorScheme='green'>
                Ya, Lanjut
              </Button>
              <Button colorScheme='red' onClick={onClose}>
                Batal
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </AppTemplate>
    </Layout>
  );
};

// export default privateRouteAdmin(TambahBukuAdmin);
export default TambahBukuAdmin;
