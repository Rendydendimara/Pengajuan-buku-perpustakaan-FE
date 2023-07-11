import AppTemplate from '@/components/templates/AppTemplate';
import Layout from '@/components/templates/Layout';
import { APP_NAME } from '@/constant';
import { privateRouteAdmin } from '@/lib/withprivateRouteAdmin';
import { Button } from '@chakra-ui/button';
import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/layout';
import {
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

const AdminDetailProdi: NextPage = () => {
  const [userTypeInfo, setUserTypeInfo] = useState('');
  const [lapakName, setLapakName] = useState('');
  const dispatch = useDispatch();
  // const [detailUser, setDetailUser] = useState<IUser>();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  // const { showToast } = useGlobalContext();

  const getDetailUser = async (id: string) => {
    // let res = await ApiGetDetailPenjual(id);
    // if (res.status === 200) {
    //   const lapak = await ApiGetLapakByProdiId(res.data.data.prodi._id);
    //   setDetailUser({
    //     _id: res.data.data._id,
    //     fullname: res.data.data.fullname,
    //     email: res.data.data.email,
    //     gender: res.data.data.gender,
    //     noTelfon: res.data.data.noTelfon,
    //     profileImage: res.data.data.profileImage,
    //     prodi: res.data.data.prodi.name,
    //     createdAt: res.data.data.createdAt,
    //     updatedAt: res.data.data.updatedAt,
    //     userType: 'penjual',
    //   });
    //   setLapakName(lapak?.data?.data?.namaLapak ?? '');
    // } else {
    //   showToast({
    //     title: 'Error',
    //     message: res.data.message,
    //     type: 'error',
    //   });
    // }
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
          <Button
            onClick={back}
            my='5'
            leftIcon={<BiArrowBack />}
            colorScheme='green'
            size='md'
          >
            Kembali
          </Button>
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
                    Erlinda kosong 2
                  </Text>
                </Flex>
                <Divider my='2' />
                <Divider my='2' />
                <Flex alignItems='center' justifyContent='space-between'>
                  <Text textAlign='left' fontWeight='bold'>
                    No. Telepon
                  </Text>
                  <Text textAlign='right' fontWeight='500'>
                    08214324234324
                  </Text>
                </Flex>
                <Divider my='2' />
                <Divider my='2' />
                <Flex alignItems='center' justifyContent='space-between'>
                  <Text textAlign='left' fontWeight='bold'>
                    NIDN
                  </Text>
                  <Text textAlign='right' fontWeight='500'>
                    1232432432
                  </Text>
                </Flex>
                <Divider my='2' />
                <Divider my='2' />
                <Flex alignItems='center' justifyContent='space-between'>
                  <Text textAlign='left' fontWeight='bold'>
                    Email
                  </Text>
                  <Text textAlign='right' fontWeight='500'>
                    erlinda02@gmail.com
                  </Text>
                </Flex>
                <Divider my='2' />
                <Divider my='2' />
                <Flex alignItems='center' justifyContent='space-between'>
                  <Text textAlign='left' fontWeight='bold'>
                    NIDN
                  </Text>
                  <Text textAlign='right' fontWeight='500'>
                    1232432432
                  </Text>
                </Flex>
                <Divider my='2' />
                <Divider my='2' />
                <Flex alignItems='center' justifyContent='space-between'>
                  <Text textAlign='left' fontWeight='bold'>
                    Program Studi
                  </Text>
                  <Text textAlign='right' fontWeight='500'>
                    Teknik Informatika
                  </Text>
                </Flex>
                <Divider my='2' />
                <Divider my='2' />
                <Flex alignItems='center' justifyContent='space-between'>
                  <Text textAlign='left' fontWeight='bold'>
                    Jenis Kelamin
                  </Text>
                  <Text textAlign='right' fontWeight='500'>
                    Laki-laki
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
              <Button onClick={onClose} colorScheme='green'>
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

// export default privateRouteAdmin(AdminDetailProdi);
export default AdminDetailProdi;
