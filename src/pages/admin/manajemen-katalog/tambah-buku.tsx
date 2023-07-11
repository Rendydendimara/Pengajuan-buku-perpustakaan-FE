import AppTemplate from '@/components/templates/AppTemplate';
import Layout from '@/components/templates/Layout';
import { APP_NAME } from '@/constant';
import { privateRouteAdmin } from '@/lib/withprivateRouteAdmin';
import { Alert, AlertIcon } from '@chakra-ui/alert';
import { Button, IconButton } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { useDisclosure } from '@chakra-ui/hooks';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
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
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
// if (typeof window !== 'undefined') {
// import { Editor } from 'react-draft-wysiwyg';
// }
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { BiArrowBack } from 'react-icons/bi';

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
  const [form, setForm] = useState({
    judulBuku: '',
    penulis: '',
    penerbit: '',
    tanggalUpload: '',
    tahunBuku: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingPost, setLoadingPost] = useState(false);
  const handleToggleConfirmPasswordShow = (): void => {
    setIsShowConfirmPassword(!isShowConfirmPassword);
  };

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

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>
  ): Promise<void> => {
    setErrorMessage('');
    onClose();
    setLoadingPost(true);
    event.preventDefault();
    if (actionType === 'edit') {
      // update api
    } else {
      // create api
    }
    // const res: any = await ApiCreateAccountPenjualAdminProdi({
    //   judulBuku: form.judulBuku,
    //   penulis: form.penulis,
    //   penerbit: form.penerbit,
    //   tanggalUpload: form.tanggalUpload,
    //   tahunBuku: form.tahunBuku,
    //   password: form.password,
    // });
    // if (res.status === 200) {
    //   showToast({
    //     title: 'Berhasil',
    //     message: 'Berhasil membuat akun Penjual',
    //     type: 'success',
    //   });
    //   router.push('/admin-prodi/pengguna/list-pengguna');
    // } else {
    //   setErrorMessage(res.data.message);
    // }
    setLoadingPost(false);
  };

  const back = () => {
    router.back();
  };

  useEffect(() => {
    const { id }: any = router.query;
    if (id) {
      setActionType('edit');
      setIdSelected(id);
      // getDetailProduk(id);
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
          <Button
            onClick={back}
            my='5'
            leftIcon={<BiArrowBack />}
            colorScheme='green'
            size='md'
          >
            Kembali
          </Button>
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
                  <FormLabel>Judul Buku</FormLabel>
                  <Input
                    type='text'
                    name='judulBuku'
                    value={form.judulBuku}
                    onChange={onChangeForm}
                    required
                  />
                </FormControl>
                <FormControl my='3' id='penulis' isRequired>
                  <FormLabel>Tanggal Upload</FormLabel>
                  <Input
                    type='date'
                    name='tanggalUpload'
                    value={form.tanggalUpload}
                    onChange={onChangeForm}
                    required
                  />
                </FormControl>
                <FormControl my='3' id='nidn' isRequired>
                  <FormLabel>Tahun Buku</FormLabel>
                  <Input
                    type='date'
                    name='tahunBuku'
                    value={form.tahunBuku}
                    onChange={onChangeForm}
                    required
                  />
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