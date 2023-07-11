import Layout from '@/components/templates/Layout';
import { APP_NAME, LOCAL_USER_TYPE } from '@/constant';
import { setLocal } from '@/lib/LocalStorage/localStorage';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { BiLogIn } from 'react-icons/bi';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';

const LoginAdminUmum: NextPage = () => {
  const [formLogin, setFormLogin] = useState({
    nidn: '',
    password: '',
    email: '',
    userType: 'admin',
  });
  const dispatch = useDispatch();
  const [isShowPassword, setIsShowPassword] = useState<boolean>(true);
  const [loadingFetchLogin, setLoadingFetchLogin] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorVerifikasi, setIsErrorVerifikasi] = useState<boolean>(false);
  // const { user } = useSelector<ICombinedState, IReduxStateWorkspace>(
  //   (state) => {
  //     return {
  //       user: state.user.user,
  //     };
  //   }
  // );
  const handleTogglePasswordShow = (): void => {
    setIsShowPassword(!isShowPassword);
  };

  const onChangeForm = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setFormLogin({
      ...formLogin,
      [event.target.name]: event.target.value,
    });
  };

  const onChangeType = (e: any) => {
    setFormLogin({
      ...formLogin,
      userType: e.target.value,
    });
  };

  const handleSubmitLogin = async (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>
  ): Promise<void> => {
    setErrorMessage('');
    setLoadingFetchLogin(true);
    event.preventDefault();
    setLocal(LOCAL_USER_TYPE, formLogin.userType);
    Router.replace(`/${formLogin.userType}/beranda`);

    // const res: any = await ApiAdminUmumLogin(formLogin);
    // if (res.status === 200) {
    //   dispatch(
    //     actionSetUser({
    //       _id: res.data.data._id,
    //       fullname: res.data.data.fullname,
    //       email: res.data.data.email,
    //       gender: res.data.data.gender,
    //       noTelfon: res.data.data.noTelfon,
    //       profileImage: res.data.data.profileImage,
    //       prodi: undefined,
    //       createdAt: res.data.data.createdAt,
    //       updatedAt: res.data.data.updatedAt,
    //       userType: 'adminUmum',
    //     })
    //   );
    //   setLocal(LOCAL_USER_TYPE, 'adminUmum');
    //   localCookieSaveToken(res.data.data.token);
    //   Router.replace('/admin-umum/beranda');
    // } else {
    //   setErrorMessage(res.data.message);
    //   if (res.data.message?.includes('terverifikasi')) {
    //     setIsErrorVerifikasi(true);
    //   }
    // }
    setLoadingFetchLogin(false);
  };

  const disableForm = () => {
    if (formLogin.userType === 'admin') {
      if (formLogin.password && formLogin.email) {
        return false;
      }
      return true;
    } else if (formLogin.userType === 'prodi') {
      if (formLogin.password && formLogin.nidn) {
        return false;
      }
      return true;
    }
    return true;
  };

  useEffect(() => {
    // if (user) {
    //   Router.push('/admin-umum/beranda');
    // }
  }, []);

  return (
    <Layout>
      <Head>
        <title>{APP_NAME} | Login</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Flex
        w='full'
        minH={'100vh'}
        justifyContent='center'
        alignItems='center'
        bg='white'
      >
        <Stack
          spacing={3}
          mx={'auto'}
          alignItems='center'
          justifyContent='center'
          py={12}
          px={6}
        >
          <Stack align={'center'}>
            <Heading fontSize={'3xl'} textAlign='center' color='gray.700'>
              Aplikasi Pengajuan Buku
            </Heading>
            <Heading fontSize={'lg'} textAlign='center' color='teal.600'>
              Silakan Masukan Form Login
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            {errorMessage && (
              <>
                <Alert status='error' mb={'10px'}>
                  <AlertIcon />
                  <Text fontSize='12px'>{errorMessage}</Text>
                </Alert>
              </>
            )}
            <Stack spacing={4}>
              <form onSubmit={handleSubmitLogin}>
                <FormControl my='5' id='email' isRequired>
                  <FormLabel>Tipe Akun</FormLabel>
                  <Select
                    value={formLogin.userType}
                    placeholder='Pilih akun...'
                    onChange={onChangeType}
                  >
                    <option value='admin'>Admin</option>
                    <option value='prodi'>Prodi</option>
                  </Select>
                </FormControl>
                {formLogin.userType === 'prodi' ? (
                  <FormControl my='5' id='nidn' isRequired>
                    <FormLabel>NIDN</FormLabel>
                    <Input
                      type='text'
                      name='nidn'
                      onChange={onChangeForm}
                      value={formLogin.nidn}
                      required
                    />
                  </FormControl>
                ) : (
                  <FormControl my='5' id='email' isRequired>
                    <FormLabel>Alamat email</FormLabel>
                    <Input
                      type='email'
                      name='email'
                      value={formLogin.email}
                      onChange={onChangeForm}
                      required
                    />
                  </FormControl>
                )}
                <FormControl my='5' id='password' isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup
                    size='md'
                    bgColor='white'
                    border='1px solid #C8C8C8'
                    borderRadius='8px'
                  >
                    <Input
                      name='password'
                      value={formLogin.password}
                      onChange={onChangeForm}
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
                  {/* <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}
                    mt='2'
                  >
                    <Link href='/admin-umum/forgot-password'>
                      <Text
                        fontSize='12px'
                        color='#008000'
                        _hover={{ cursor: 'pointer' }}
                      >
                        Forgot password?
                      </Text>
                    </Link>
                  </Stack> */}
                </FormControl>
                <Stack spacing={10}>
                  <Button
                    rightIcon={<BiLogIn />}
                    type='submit'
                    isLoading={loadingFetchLogin}
                    onClick={handleSubmitLogin}
                    bg={'blue.400'}
                    isDisabled={disableForm()}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                  >
                    Login
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Layout>
  );
};

export default LoginAdminUmum;
