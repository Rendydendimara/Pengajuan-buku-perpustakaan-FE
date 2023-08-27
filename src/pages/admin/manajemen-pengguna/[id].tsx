import AppTemplate from '@/components/templates/AppTemplate';
import Layout from '@/components/templates/Layout';
import { APP_NAME } from '@/constant';
import { privateRouteAdmin } from '@/lib/withprivateRouteAdmin';
import { Button } from '@chakra-ui/button';
import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/layout';
import {
  createStandaloneToast,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  useDisclosure,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ImProfile } from 'react-icons/im';
import { useDispatch } from 'react-redux';
import { shimmer, toBase64 } from '@/lib/ImageOptimization';
import { BiArrowBack } from 'react-icons/bi';
import { ApiDeleteDosenProdi, ApiGetDetailDosenProdi } from '@/api/dosenProdi';

const AdminDetailProdi: NextPage = () => {
  const [userTypeInfo, setUserTypeInfo] = useState('');
  const [lapakName, setLapakName] = useState('');
  const [prodi, setProdi] = useState({
    id: '',
    namaLengkap: '',
    kelamin: '',
    nidn: '',
    noTelfon: '',
    programStudi: '',
    email: '',
  });
  const dispatch = useDispatch();
  // const [detailUser, setDetailUser] = useState<IUser>();
  const { toast } = createStandaloneToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  // const { showToast } = useGlobalContext();

  const getDetailUser = async (id: string) => {
    let res = await ApiGetDetailDosenProdi(id);
    if (res.status === 200) {
      setProdi({
        id: res.data.data._id,
        namaLengkap: res.data.data.namaLengkap,
        kelamin: res.data.data.kelamin,
        nidn: res.data.data.nidn,
        noTelfon: res.data.data.noTelfon,
        programStudi: res.data.data.programStudi,
        email: res.data.data.email,
      });
    } else {
      toast({
        title: 'Error',
        description: res.data.message,
        status: 'error',
      });
    }
  };

  const handleDeleteProdi = async () => {
    let res = await ApiDeleteDosenProdi(prodi.id);
    if (res.status === 200) {
      toast({
        title: 'Berhasil',
        description: 'Berhasil hapus akun prodi',
        status: 'success',
      });
      router.push('/admin/manajemen-pengguna');
    } else {
      toast({
        title: 'Error',
        description: res.data.message,
        status: 'error',
      });
    }
  };

  const back = () => {
    Router.back();
  };

  useEffect(() => {
    const { id }: any = router.query;
    // showContent
    if (id) {
      getDetailUser(id);
    }
  }, [router.query]);

  return (
    <Layout>
      <AppTemplate>
        <Head>
          <title>{APP_NAME} | Admin | Prodi Detail</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Box p='2'>
          <Text fontWeight='700' color='gray.700' fontSize='2xl'>
            Detail Akun Prodi
          </Text>
          <Box minH='80vh' rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
            <Flex
              w={{ base: '100%', md: '30%' }}
              flexDirection='column'
              alignItems='center'
              p={4}
            >
              <Image
                objectFit='contain'
                objectPosition='center'
                alt='Profile image'
                width='250'
                height='250'
                src={'/images/user.png'}
                placeholder='blur'
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(700, 700)
                )}`}
                priority
              />
            </Flex>
            <Box boxShadow={'md'} p={4} w={{ base: '100%', md: '70%' }}>
              <Box my='5'>
                <Divider my='2' />
                <Flex alignItems='center' justifyContent='space-between'>
                  <Text textAlign='left' fontWeight='bold'>
                    Nama Lengkap
                  </Text>
                  <Text textAlign='right' fontWeight='500'>
                    {prodi.namaLengkap}
                  </Text>
                </Flex>
                <Divider my='2' />
                <Divider my='2' />
                <Flex alignItems='center' justifyContent='space-between'>
                  <Text textAlign='left' fontWeight='bold'>
                    No. Telepon
                  </Text>
                  <Text textAlign='right' fontWeight='500'>
                    {prodi.noTelfon}
                  </Text>
                </Flex>
                <Divider my='2' />
                <Divider my='2' />
                <Flex alignItems='center' justifyContent='space-between'>
                  <Text textAlign='left' fontWeight='bold'>
                    NIDN
                  </Text>
                  <Text textAlign='right' fontWeight='500'>
                    {prodi.nidn}
                  </Text>
                </Flex>
                <Divider my='2' />
                <Divider my='2' />
                <Flex alignItems='center' justifyContent='space-between'>
                  <Text textAlign='left' fontWeight='bold'>
                    Email
                  </Text>
                  <Text textAlign='right' fontWeight='500'>
                    {prodi.email}
                  </Text>
                </Flex>
                <Divider my='2' />
                <Divider my='2' />
                <Flex alignItems='center' justifyContent='space-between'>
                  <Text textAlign='left' fontWeight='bold'>
                    Program Studi
                  </Text>
                  <Text textAlign='right' fontWeight='500'>
                    {prodi.programStudi}
                  </Text>
                </Flex>
                <Divider my='2' />
                <Divider my='2' />
                <Flex alignItems='center' justifyContent='space-between'>
                  <Text textAlign='left' fontWeight='bold'>
                    Jenis Kelamin
                  </Text>
                  <Text textAlign='right' fontWeight='500'>
                    {prodi.kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
                  </Text>
                </Flex>
                <Divider my='2' />
                <Divider my='2' />
              </Box>
              <Flex justifyContent='flex-end'>
                <Button onClick={onOpen} colorScheme='red'>
                  Hapus Akun
                </Button>
              </Flex>
            </Box>
          </Box>
        </Box>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Hapus Prodi</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box>
                <Text>Apakah kamu yakin untuk menghapus prodi ?</Text>
                <Text>
                  Setelah penghapusan, data prodi tidak bisa dilihat lagi
                </Text>
              </Box>
            </ModalBody>
            <ModalFooter gap='2'>
              <Button onClick={handleDeleteProdi} colorScheme='green'>
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

export default privateRouteAdmin(AdminDetailProdi);
// export default AdminDetailProdi;
