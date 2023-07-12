import AppTemplateProdi from '@/components/templates/AppTemplateProdi';
import LayoutProdi from '@/components/templates/LayoutProdi';
import { APP_NAME } from '@/constant';
import { Button } from '@chakra-ui/button';
import { Checkbox } from '@chakra-ui/checkbox';
import { Box, Flex, Text, VStack } from '@chakra-ui/layout';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

// interface IReduxStateWorkspace {
//   user?: IUser;
// }

const BerandaProdi: NextPage = () => {
  const router = useRouter();
  // const { user } = useSelector<ICombinedState, IReduxStateWorkspace>(
  //   (state) => {
  //     return {
  //       user: state.user.user,
  //     };
  //   }
  // );

  const gotoPengajuan = () => {
    router.push('/prodi/pengajuan');
  };

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
            Prodi Teknik Informatika / Katalog UGM
          </Text>
          <Box w='full' mt='6'>
            <VStack w='full' spacing={10}>
              <Box w='full'>
                <Text fontSize='2xl'>List Buku Prodi</Text>
                <VStack w='full' spacing={4} mt='4'>
                  {[1, 2, 3, 4].map((i) => (
                    <Flex
                      w='full'
                      borderRadius='8px'
                      border='1px solid pink'
                      justifyContent='space-between'
                      minH='80px'
                    >
                      <Flex gap='40px'>
                        <Flex
                          justifyContent='center'
                          alignItems='center'
                          bgColor='pink.500'
                          w='70px'
                          h='full'
                        >
                          <Text color='gray.800' fontSize='2xl'>
                            {i}
                          </Text>
                        </Flex>
                        <Box>
                          <Text fontSize='lg'>Judul Buku</Text>
                          <Text fontWeight='bold' fontSize='lg'>
                            Katalog
                          </Text>
                        </Box>
                      </Flex>
                      <Flex
                        alignItems='center'
                        justifyContent='space-between'
                        gap='40px'
                        pr='4'
                      >
                        <Box>
                          <Text>Penulis</Text>
                          <Text>{new Date().getFullYear()}</Text>
                        </Box>
                        <Box>
                          <Checkbox size='lg' />
                        </Box>
                      </Flex>
                    </Flex>
                  ))}
                </VStack>
              </Box>
              <Box w='full'>
                <Text fontSize='2xl'>List Buku Umum</Text>
                <VStack w='full' spacing={4} mt='4'>
                  {[1, 2, 3, 4].map((i) => (
                    <Flex
                      w='full'
                      borderRadius='8px'
                      border='1px solid pink'
                      justifyContent='space-between'
                      minH='80px'
                    >
                      <Flex gap='40px'>
                        <Flex
                          justifyContent='center'
                          alignItems='center'
                          bgColor='pink.500'
                          w='70px'
                          h='full'
                        >
                          <Text color='gray.800' fontSize='2xl'>
                            {i}
                          </Text>
                        </Flex>
                        <Box>
                          <Text fontSize='lg'>Judul Buku</Text>
                          <Text fontWeight='bold' fontSize='lg'>
                            Katalog
                          </Text>
                        </Box>
                      </Flex>
                      <Flex
                        alignItems='center'
                        justifyContent='space-between'
                        gap='40px'
                        pr='4'
                      >
                        <Box>
                          <Text>Penulis</Text>
                          <Text>{new Date().getFullYear()}</Text>
                        </Box>
                        <Box>
                          <Checkbox size='lg' />
                        </Box>
                      </Flex>
                    </Flex>
                  ))}
                </VStack>
              </Box>
            </VStack>
            <Flex justifyContent='flex-end'>
              <Button my='8' colorScheme='green' onClick={gotoPengajuan}>
                Ajukan
              </Button>
            </Flex>
          </Box>
        </Box>
      </AppTemplateProdi>
    </LayoutProdi>
  );
};

export default BerandaProdi;
// export default privateRouteAdmin(BerandaProdi);