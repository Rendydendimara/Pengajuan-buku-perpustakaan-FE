import AppTemplateProdiDashboard from '@/components/templates/AppTemplateProdiDashboard';
import Layout from '@/components/templates/Layout';
import { APP_NAME } from '@/constant';
import { shimmer, toBase64 } from '@/lib/ImageOptimization';
import { ICombinedState } from '@/provider/redux/store';
import { Button } from '@chakra-ui/button';
import { Box, Divider, Flex, Text } from '@chakra-ui/layout';
import {
  Alert,
  AlertIcon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';

interface IReduxStateWorkspace {
  user: any;
}

const AdminProfile: NextPage = () => {
  const [imageProfile, setImageProfile] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const [loadingUploadImage, setLoadingUploadImage] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useSelector<ICombinedState, IReduxStateWorkspace>(
    (state) => {
      return {
        user: state.user.user,
      };
    }
  );

  console.log('user', user);
  const handleSubmitProfileImage = async () => {
    setLoadingUploadImage(true);
    // const res = await ApiUpdateProfile({
    //   nama_lengkap: user?.nama_lengkap ?? '',
    //   gender: user?.gender ?? '',
    //   pekerjaan: user?.pekerjaan ?? '',
    //   no_telfon: user?.no_telfon ?? '',
    //   imageProfile: imageProfile,
    // });
    // if (res.status === 200) {
    //   if (user) {
    //     dispatch(
    //       actionSetUser({
    //         ...user,
    //         profile_image: res.data.data.profile_image,
    //       })
    //     );
    //   }
    //   handleClose();
    // } else {
    //   setErrorMessage(res.data.message);
    // }
    setLoadingUploadImage(false);
  };

  const handleDrop = (files: any): void => {
    const file = files[0];
    // looping for validation file before upload
    const fileName = file.name.match(/\.[0-9a-z]+$/i)[0];
    const fileFormat = fileName.substring(1, fileName.length);
    const isImage =
      ['jpg', 'jpeg', 'png'].includes(fileFormat.toLowerCase()) ?? false;

    if (!isImage) {
      setErrorMessage('File harus gambar format png, jpg, jpeg');
      return;
    }
    setImageProfile(file);
  };

  const thumbs = () => {
    if (imageProfile) {
      const url = URL.createObjectURL(imageProfile);

      return (
        <Image
          src={url}
          width='300'
          alt=''
          height='300'
          objectFit='contain'
          objectPosition='center'
        />
      );
    }
    return <></>;
  };

  const handleClose = () => {
    setImageProfile(undefined);
    onClose();
  };

  return (
    <Layout>
      <AppTemplateProdiDashboard>
        <Head>
          <title>{APP_NAME} | Admin | Profile</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Box>
          <Box minH='80vh' rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
            <Flex gap='15px' flexDirection={{ base: 'column', md: 'row' }}>
              <Flex
                w={{ base: '100%', md: '30%' }}
                flexDirection='column'
                alignItems='center'
                boxShadow={'md'}
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
                {/* {user ? (
                  !user.profile_image ? (
                    <Text my='3' fontSize='13px' color='orange.500'>
                      (Belum ada foto)
                    </Text>
                  ) : (
                    ''
                  )
                ) : (
                  ''
                )} */}
                {/* <Button
                  my='3'
                  w='full'
                  size='sm'
                  colorScheme='teal'
                  onClick={onOpen}
                >
                  Unggah Foto
                </Button> */}
              </Flex>
              <Box boxShadow={'md'} p={4} w={{ base: '100%', md: '70%' }}>
                <Box my='5'>
                  <Divider my='2' />
                  <Flex alignItems='center' justifyContent='space-between'>
                    <Text textAlign='left' fontWeight='bold'>
                      Nama Lengkap
                    </Text>
                    <Text textAlign='right' fontWeight='500'>
                      {user?.namaLengkap}
                    </Text>
                  </Flex>
                  <Divider my='2' />
                  <Divider my='2' />
                  <Flex alignItems='center' justifyContent='space-between'>
                    <Text textAlign='left' fontWeight='bold'>
                      NIDN
                    </Text>
                    <Text textAlign='right' fontWeight='500'>
                      {user?.nidn}
                    </Text>
                  </Flex>
                  <Divider my='2' />
                  <Divider my='2' />
                  <Flex alignItems='center' justifyContent='space-between'>
                    <Text textAlign='left' fontWeight='bold'>
                      Email
                    </Text>
                    <Text textAlign='right' fontWeight='500'>
                      {user?.email}
                    </Text>
                  </Flex>
                  <Divider my='2' />
                  <Divider my='2' />
                  <Flex alignItems='center' justifyContent='space-between'>
                    <Text textAlign='left' fontWeight='bold'>
                      Nomor Telfon
                    </Text>
                    <Text textAlign='right' fontWeight='500'>
                      {user?.noTelfon}
                    </Text>
                  </Flex>
                  <Divider my='2' />
                </Box>
                <Flex justifyContent='flex-end'>
                  {/* <Link href='/peserta/biodata/update'> */}
                  {/* <Button size='sm' colorScheme='teal'>
                    Ubah
                  </Button> */}
                  {/* </Link> */}
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Box>
        <Modal
          closeOnOverlayClick={false}
          isOpen={isOpen}
          onClose={onClose}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Ubah Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Flex w='full' alignItems='center' flexDirection='column'>
                {errorMessage && (
                  <Alert my='3' status='error' mb={'10px'}>
                    <AlertIcon />
                    <Text fontSize='12px'>{errorMessage}</Text>
                  </Alert>
                )}
                <Dropzone onDrop={handleDrop} multiple={false}>
                  {({ getRootProps, getInputProps }) => (
                    <section className='container'>
                      <div
                        {...getRootProps({ className: 'dropzone' })}
                        className='dropzone'
                      >
                        <input {...getInputProps()} />
                        <p>
                          Seret 'dan' jatuhkan gambar profile di sini, atau klik
                          untuk memilih file
                        </p>
                      </div>
                    </section>
                  )}
                </Dropzone>
                {imageProfile && <Box my='5'>{thumbs()}</Box>}
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button
                isLoading={loadingUploadImage}
                onClick={handleSubmitProfileImage}
                colorScheme='teal'
                mr={3}
              >
                Unggah Foto
              </Button>
              <Button onClick={handleClose}>Batal</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </AppTemplateProdiDashboard>
    </Layout>
  );
};

// export default privateRouteAdmin(AdminProfile);
export default AdminProfile;
