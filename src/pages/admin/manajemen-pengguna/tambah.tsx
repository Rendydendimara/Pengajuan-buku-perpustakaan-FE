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
import {
  ApiCreateDosenProdi,
  ApiGetDetailDosenProdi,
  ApiUpdateDosenProdi,
} from '@/api/dosenProdi';
import { useGlobalContext } from '@/provider/global-provider';
import { createStandaloneToast } from '@chakra-ui/toast';

const TambahAdminProdi: NextPage = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState<'add' | 'cancel' | ''>('');
  const [isShowPassword, setIsShowPassword] = useState<boolean>(true);
  const [isShowConfirmPassword, setIsShowConfirmPassword] =
    useState<boolean>(true);
  const handleTogglePasswordShow = (): void => {
    setIsShowPassword(!isShowPassword);
  };
  const { toast } = createStandaloneToast();
  // const [listProdi, setListProdi] = useState<IProdi[]>([]);
  const [actionType, setActionType] = useState<'add' | 'edit'>('add');
  const [idSelected, setIdSelected] = useState();
  const [form, setForm] = useState({
    namaLengkap: '',
    email: '',
    noTelfon: '',
    programStudi: '',
    jenisKelamin: '',
    password: '',
    confirmPassword: '',
    nidn: '',
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

  const onChangeProdi = (e: any) => {
    setForm({
      ...form,
      programStudi: e.target.value,
    });
  };
  const onChangeJenisKelamin = (e: any) => {
    setForm({
      ...form,
      jenisKelamin: e.target.value,
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
    if (form.password !== form.confirmPassword) {
      toast({
        title: 'Gagal',
        description: 'Konfirmasi password tidak sama',
        status: 'error',
      });
      setLoadingPost(false);
      return;
    }
    if (actionType === 'edit') {
      // update api
      const res = await ApiUpdateDosenProdi({
        id: idSelected ?? '',
        nidn: form.nidn,
        kelamin: form.jenisKelamin,
        password: form.password,
        namaLengkap: form.namaLengkap,
        noTelfon: form.noTelfon,
        email: form.email,
        programStudi: form.programStudi,
      });
      if (res.status === 200) {
        toast({
          title: 'Berhasil',
          description: 'Berhasil update akun dosen prodi',
          status: 'success',
        });
        router.push('/admin/manajemen-pengguna');
      } else {
        setErrorMessage(res.data.message);
      }
    } else {
      // create api
      const res = await ApiCreateDosenProdi({
        nidn: form.nidn,
        kelamin: form.jenisKelamin,
        email: form.email,
        password: form.password,
        namaLengkap: form.namaLengkap,
        noTelfon: form.noTelfon,
        programStudi: form.programStudi,
      });
      if (res.status === 200) {
        toast({
          title: 'Berhasil',
          description: 'Berhasil membuat akun dosen prodi',
          status: 'success',
        });
        router.push('/admin/manajemen-pengguna');
      } else {
        setErrorMessage(res.data.message);
      }
    }

    setLoadingPost(false);
  };

  const back = () => {
    router.back();
  };

  const disabled = () => {
    if (
      form.namaLengkap &&
      form.email &&
      form.noTelfon &&
      form.programStudi &&
      form.jenisKelamin &&
      form.password &&
      form.confirmPassword &&
      form.nidn
    )
      return false;
    return true;
  };

  const getDetailDosen = async (id: string) => {
    const res = await ApiGetDetailDosenProdi(id);
    if (res.status === 200) {
      console.log('res.data', res.data);
      setForm({
        namaLengkap: res.data.data.namaLengkap,
        email: res.data.data.email ?? '',
        noTelfon: res.data.data.noTelfon,
        programStudi: res.data.data.programStudi,
        jenisKelamin: res.data.data.jenisKelamin,
        password: '',
        confirmPassword: '',
        nidn: res.data.data.nidn,
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
    const { id }: any = router.query;
    if (id) {
      setActionType('edit');
      setIdSelected(id);
      getDetailDosen(id);
    }
  }, [router.query]);

  return (
    <Layout>
      <Head>
        <title>
          {APP_NAME} | Admin | {actionType === 'edit' ? 'Ubah' : 'Tambah'} Akun
          Prodi
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
            {actionType === 'edit' ? 'Ubah' : 'Tambah'} Akun Prodi
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
                  <FormLabel>Nama Lengkap</FormLabel>
                  <Input
                    type='text'
                    name='namaLengkap'
                    value={form.namaLengkap}
                    onChange={onChangeForm}
                    required
                  />
                </FormControl>
                <FormControl my='3' id='email' isRequired>
                  <FormLabel>Alamat Email</FormLabel>
                  <Input
                    type='email'
                    name='email'
                    value={form.email}
                    onChange={onChangeForm}
                    required
                  />
                </FormControl>
                <FormControl my='3' id='nidn' isRequired>
                  <FormLabel>NIDN</FormLabel>
                  <Input
                    type='number'
                    name='nidn'
                    value={form.nidn}
                    onChange={onChangeForm}
                    required
                  />
                </FormControl>
                <FormControl my='3' id='no_telfon' isRequired>
                  <FormLabel>Nomor Telfon</FormLabel>
                  <Input
                    type='number'
                    name='noTelfon'
                    value={form.noTelfon}
                    onChange={onChangeForm}
                    required
                  />
                </FormControl>
                <FormControl my='3' isRequired>
                  <FormLabel>Program Studi</FormLabel>
                  <Select
                    name='programStudi'
                    value={form.programStudi}
                    onChange={onChangeProdi}
                  >
                    <option value=''></option>
                    <option value='Teknik Informatika'>
                      Teknik Informatika
                    </option>
                    <option value='Peternakan'>Peternakan</option>
                    <option value='Agribisnis'>Agribisnis</option>
                    <option value='Agroteknologi'>Agroteknologi</option>
                    <option value='Teknologi Hasil Perikanan'>
                      Teknologi Hasil Perikanan
                    </option>
                  </Select>
                </FormControl>
                <FormControl my='3' isRequired>
                  <FormLabel>Jenis Kelamin</FormLabel>
                  <Select
                    name='jenisKelamin'
                    value={form.jenisKelamin}
                    onChange={onChangeJenisKelamin}
                  >
                    <option value=''></option>
                    <option value='L'>Laki-laki</option>
                    <option value='P'>Perempuan</option>
                  </Select>
                </FormControl>
                <FormControl my='3' id='password'>
                  <FormLabel>Password</FormLabel>
                  <InputGroup
                    size='md'
                    bgColor='white'
                    border='1px solid #C8C8C8'
                    borderRadius='8px'
                  >
                    <Input
                      value={form.password}
                      onChange={onChangeForm}
                      name='password'
                      placeholder='Password'
                      type={isShowPassword ? 'password' : 'text'}
                      autoComplete='off'
                      autoSave='off'
                      required
                    />
                    <InputRightElement>
                      <IconButton
                        _hover={{}}
                        _focus={{}}
                        borderColor='transparent'
                        backgroundColor='transparent'
                        aria-label='Call Segun'
                        size='sm'
                        onClick={handleTogglePasswordShow}
                        icon={
                          isShowPassword ? (
                            <BsFillEyeFill width={22} height={29} />
                          ) : (
                            <BsFillEyeSlashFill width={22} height={29} />
                          )
                        }
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl my='3' id='confirmPassword'>
                  <FormLabel>Konfirmasi Password</FormLabel>
                  {/* <Input type='password' /> */}
                  <InputGroup
                    size='md'
                    bgColor='white'
                    border='1px solid #C8C8C8'
                    borderRadius='8px'
                  >
                    <Input
                      value={form.confirmPassword}
                      onChange={onChangeForm}
                      name='confirmPassword'
                      placeholder='Konfirmasi Password'
                      type={isShowConfirmPassword ? 'password' : 'text'}
                      autoComplete='off'
                      autoSave='off'
                      required
                    />
                    <InputRightElement>
                      <IconButton
                        _hover={{}}
                        _focus={{}}
                        borderColor='transparent'
                        backgroundColor='transparent'
                        aria-label='Call Segun'
                        size='sm'
                        onClick={handleToggleConfirmPasswordShow}
                        icon={
                          isShowConfirmPassword ? (
                            <BsFillEyeFill width={22} height={29} />
                          ) : (
                            <BsFillEyeSlashFill width={22} height={29} />
                          )
                        }
                      />
                    </InputRightElement>
                  </InputGroup>
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
                  {actionType === 'edit' ? 'Ubah' : 'Tambah'} Akun Prodi
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
                ? `${actionType === 'edit' ? 'Ubah' : 'Tambah'} Penjual`
                : 'Batal'}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {modalType === 'add' ? (
                <Box>
                  <Text>
                    Apakah kamu yakin untuk{' '}
                    {actionType === 'edit' ? 'mengubah' : 'menambah'} akun prodi
                    ?
                  </Text>
                  <Text>
                    Pastikan semua info akun prodi sudah diisi dengan benar
                  </Text>
                </Box>
              ) : (
                <Box>
                  <Text>
                    Apakah kamu yakin untuk membatalkan{' '}
                    {actionType === 'edit' ? 'pengubahan' : 'penambahan'} akun
                    prodi ?
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

export default privateRouteAdmin(TambahAdminProdi);
// export default TambahAdminProdi;
