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
import Router, { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
// if (typeof window !== 'undefined') {
// import { Editor } from 'react-draft-wysiwyg';
// }
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
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
} from '@chakra-ui/react';
import moment from 'moment';
import { ApiGetDetailKatalogBuku } from '@/api/katalogBuku';
import { ApiBulkBukuKatalog } from '@/api/buku';
import { IDataResultBulk } from '@/interface';

const BulkKatalogAdmin: NextPage = () => {
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
    namaKatalog: '',
    tanggalUpload: '',
    file: undefined,
    prodi: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingPost, setLoadingPost] = useState(false);
  const [showBulkInfo, setShowBulkInfo] = useState(false);
  const [catalogData, setCatalogData] = useState<any>();
  const { toast } = createStandaloneToast();
  const [dataInfoResultBulk, setDataInfoResultBulk] = useState({
    errorDuplicate: [],
    errorUpload: [],
    successUpload: [],
  });

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
      prodi: e.target.value,
    });
  };

  const onOpenModal = (type: 'add' | 'cancel') => {
    setModalType(type);
    onOpen();
  };

  const onChangeFile = (e: any) => {
    setForm({
      ...form,
      file: e.target.files[0],
    });
  };

  const handleSubmit = async (): Promise<void> => {
    setErrorMessage('');
    onClose();
    setDataInfoResultBulk({
      errorDuplicate: [],
      errorUpload: [],
      successUpload: [],
    });
    setLoadingPost(true);
    setShowBulkInfo(false);
    // event.preventDefault();

    const res: any = await ApiBulkBukuKatalog({
      file: form.file,
      uploadDate: form.tanggalUpload,
      catalogId: catalogData._id,
      prodi: form.prodi,
    });
    if (res.status === 200) {
      toast({
        title: 'Berhasil',
        description: res.data.message,
        status: 'success',
      });
      setDataInfoResultBulk(res.data.data);
      setShowBulkInfo(true);
    } else {
      setErrorMessage(res.data.message);
    }
    setLoadingPost(false);
  };

  const back = () => {
    router.back();
  };

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
    if (form.tanggalUpload && form.file && form.prodi) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    const { katalogId }: any = router.query;
    if (katalogId) {
      getCatalogName(katalogId);
    }
  }, [router.query]);

  return (
    <Layout>
      <Head>
        <title>
          {APP_NAME} | Admin | {actionType === 'edit' ? 'Ubah' : 'Tambah'} Bulk
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
            {actionType === 'edit' ? 'Ubah' : 'Tambah'} Bulk
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
              <Box>
                <FormControl my='3' id='nama_lengkap' isRequired>
                  <FormLabel>Nama Katalog</FormLabel>
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
                    placeholder='Pilih Prodi'
                  >
                    <option value='tif'>Teknik Informatika</option>
                    <option value='ptk'>Peternakan</option>
                    <option value='agb'>Agribisnis</option>
                    <option value='agt'>Agroteknologi</option>
                    <option value='thp'>Teknologi Hasil Perikanan</option>
                    <option value='umum'>Umum</option>
                    <option value='hkm'>Hukum</option>
                    <option value='pbi'>Pendidikan Biologi</option>
                    <option value='man'>Manajemen</option>
                    <option value='ekm'>Ekonomi Pembangunan</option>
                    <option value='pmt'>Pendidikan Matematika</option>
                  </Select>
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
                  <FormLabel>File</FormLabel>
                  <Input
                    type='file'
                    name='file'
                    onChange={onChangeFile}
                    required
                  />
                </FormControl>
              </Box>
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
                  isDisabled={disabled()}
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
          {showBulkInfo && (
            <>
              <Box my='4'>
                <Text color='green' fontWeight='800' size='24px'>
                  Daftar buku berhasil bulk
                </Text>
                <TableContainer>
                  <Table variant='simple'>
                    <TableCaption>Gagal bulk</TableCaption>
                    <Thead>
                      <Tr>
                        <Th>No</Th>
                        <Th>Judul Buku</Th>
                        <Th>Penulis</Th>
                        <Th>Penerbit</Th>
                        <Th>Tanggal Upload</Th>
                        <Th>Tahun</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {dataInfoResultBulk.successUpload.map(
                        (dt: IDataResultBulk, i) => (
                          <Tr>
                            <Td>{i + 1}</Td>
                            <Td>{dt.judul}</Td>
                            <Td>{dt.penulis}</Td>
                            <Td>{catalogData?.name}</Td>
                            <Td>{moment(dt.tanggalUpload).format('L')}</Td>
                            <Td>{dt.tahunTerbit}</Td>
                          </Tr>
                        )
                      )}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>

              <Box my='4'>
                <Text color='orange' fontWeight='800' size='24px'>
                  Daftar buku duplikasi
                </Text>
                <TableContainer>
                  <Table variant='simple'>
                    <TableCaption>Duplkasi buku</TableCaption>
                    <Thead>
                      <Tr>
                        <Th>No</Th>
                        <Th>Judul Buku</Th>
                        <Th>Penulis</Th>
                        <Th>Penerbit</Th>
                        <Th>Tanggal Upload</Th>
                        <Th>Tahun</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {dataInfoResultBulk.errorDuplicate.map(
                        (dt: IDataResultBulk, i) => (
                          <Tr>
                            <Td>{i + 1}</Td>
                            <Td>{dt.judul}</Td>
                            <Td>{dt.penulis}</Td>
                            <Td>{catalogData?.name}</Td>
                            <Td>{moment(dt.tanggalUpload).format('L')}</Td>
                            <Td>{dt.tahunTerbit}</Td>
                          </Tr>
                        )
                      )}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
              <Box my='4'>
                <Text color='red' fontWeight='800' size='24px'>
                  Daftar buku gagal bulk
                </Text>
                <TableContainer>
                  <Table variant='simple'>
                    <TableCaption>Gagal bulk</TableCaption>
                    <Thead>
                      <Tr>
                        <Th>No</Th>
                        <Th>Judul Buku</Th>
                        <Th>Penulis</Th>
                        <Th>Penerbit</Th>
                        <Th>Tanggal Upload</Th>
                        <Th>Tahun</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {dataInfoResultBulk.errorUpload.map(
                        (dt: IDataResultBulk, i) => (
                          <Tr>
                            <Td>{i + 1}</Td>
                            <Td>{dt.judul}</Td>
                            <Td>{dt.penulis}</Td>
                            <Td>{catalogData?.name}</Td>
                            <Td>{moment(dt.tanggalUpload).format('L')}</Td>
                            <Td>{dt.tahunTerbit}</Td>
                          </Tr>
                        )
                      )}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </>
          )}
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
              <Button
                onClick={
                  modalType === 'add' ? () => handleSubmit() : () => back()
                }
                colorScheme='green'
              >
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

// export default privateRouteAdmin(BulkKatalogAdmin);
export default BulkKatalogAdmin;
