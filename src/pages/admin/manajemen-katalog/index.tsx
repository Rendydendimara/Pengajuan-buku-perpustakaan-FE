import AppTemplate from '@/components/templates/AppTemplate';
import Layout from '@/components/templates/Layout';
import { APP_NAME } from '@/constant';
import { privateRouteAdmin } from '@/lib/withprivateRouteAdmin';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { BsFillDatabaseFill } from 'react-icons/bs';

const ManajemenkatalogAdmin: NextPage = () => {
  const router = useRouter();

  const gotoBuku = () => {
    router.push('/admin/manajemen-katalog/list-buku');
  };

  const gotoKatalog = () => {
    router.push('/admin/manajemen-katalog/list-katalog');
  };

  return (
    <Layout>
      <Head>
        <title>{APP_NAME} | Admin | Manajemen Katalog</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppTemplate>
        <Box p='4' h='full'>
          <Text fontWeight='700' color='gray.700' fontSize='2xl'>
            Manajemen Katalog
          </Text>
          <Flex
            h='80vh'
            justifyContent='center'
            alignItems='center'
            my='4'
            gap='20px'
            flexDirection='column'
          >
            <Box w='40%'>
              <Box onClick={gotoBuku}>
                <StatsCard
                  title='Buku'
                  stat='40'
                  icon={<BsFillDatabaseFill size={'5em'} />}
                />
              </Box>
            </Box>
            <Box w='40%'>
              <Box onClick={gotoKatalog}>
                <StatsCard
                  title='Katalog'
                  stat='20'
                  icon={<BsFillDatabaseFill size={'5em'} />}
                />
              </Box>
            </Box>
          </Flex>
        </Box>
      </AppTemplate>
    </Layout>
  );
};

// export default privateRouteAdmin(ManajemenkatalogAdmin);
export default ManajemenkatalogAdmin;

interface StatsCardProps {
  title: string;
  stat: string;
  icon: ReactNode;
}
function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props;
  return (
    <Stat
      _hover={{ cursor: 'pointer' }}
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={'gray.800'}
      rounded={'lg'}
    >
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={'medium'} fontSize='4xl'>
            {title}
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {stat}
          </StatNumber>
        </Box>
        <Box my={'auto'} color={'gray.800'} alignContent={'center'}>
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}
