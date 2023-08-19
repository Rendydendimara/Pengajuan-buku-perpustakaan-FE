import AppTemplate from '@/components/templates/AppTemplate';
import Layout from '@/components/templates/Layout';
import { APP_NAME } from '@/constant';
import {
  Box,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
} from '@chakra-ui/layout';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { privateRouteAdmin } from '@/lib/withprivateRouteAdmin';
import { BiSolidBarChartAlt2 } from 'react-icons/bi';
import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { COLORS_STATISTIK } from '@/utils/statistik';

// interface IReduxStateWorkspace {
//   user?: IUser;
// }

const data = [
  {
    name: '2020',
    diterima: 100,
    ditolak: 10,
    selesai: 90,
    pengajuan: 100 + 10 + 90,
  },
  {
    name: '2021',
    diterima: 210,
    ditolak: 50,
    selesai: 60,
    pengajuan: 210 + 50 + 60,
  },
  {
    name: '2022',
    diterima: 50,
    ditolak: 10,
    selesai: 40,
    pengajuan: 10 + 50 + 40,
  },
  {
    name: '2023',
    diterima: 100,
    ditolak: 90,
    selesai: 10,
    pengajuan: 100 + 90 + 10,
  },
];

const CustomizedLabel: React.FC<any> = (props) => {
  const { x, y, stroke, value } = props;

  return (
    <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor='middle'>
      {value}
    </text>
  );
};

const CustomizedAxisTick: React.FC<any> = (props) => {
  const { x, y, stroke, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor='end'
        fill='#666'
        transform='rotate(-35)'
      >
        {payload.value}
      </text>
    </g>
  );
};

const BerandaAdmin: NextPage = () => {
  const router = useRouter();
  // const { user } = useSelector<ICombinedState, IReduxStateWorkspace>(
  //   (state) => {
  //     return {
  //       user: state.user.user,
  //     };
  //   }
  // );

  return (
    <Layout>
      <Head>
        <title>{APP_NAME} | Admin | Beranda</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppTemplate>
        <Box>
          <Text fontSize='2xl'>Selamat Datang</Text>
          <Text>FULLNAME, Admin</Text>
          <Box my='8'>
            <Heading as='h3' fontSize='24px' fontWeight='700'>
              Data Statistik
            </Heading>
            <Box my='4'>
              <ResponsiveContainer width='100%' height='100%'>
                <LineChart
                  width={500}
                  height={300}
                  data={data}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis
                    dataKey='name'
                    height={60}
                    tick={<CustomizedAxisTick />}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type='monotone'
                    dataKey='ditolak'
                    stroke='#8884d8'
                    label={<CustomizedLabel />}
                  />
                  <Line type='monotone' dataKey='diterima' stroke='#82ca9d' />
                  <Line
                    type='monotone'
                    dataKey='pengajuan'
                    stroke='#8884d8'
                    label={<CustomizedLabel />}
                  />
                  <Line type='monotone' dataKey='selesai' stroke='#82ca9d' />
                </LineChart>
              </ResponsiveContainer>

              <SimpleGrid mt='10' spacing={3} columns={[3]}>
                <ItemStatistik
                  bgColor='green.100'
                  title='Daftar Buku'
                  count={100}
                />
                <ItemStatistik
                  bgColor='orange.100'
                  title='Daftar Katalog'
                  count={100}
                />
                <ItemStatistik
                  bgColor='yellow.100'
                  title='Permintaan Pengajuan Buku'
                  count={100}
                />
                <ItemStatistik
                  bgColor='purple.100'
                  title='Permintaan Pengajuan Buku Diterima'
                  count={100}
                />
                <ItemStatistik
                  bgColor='red.100'
                  title='Permintaan Pengajuan Buku Ditolak'
                  count={100}
                />
              </SimpleGrid>
              <Box h='5' />
            </Box>
          </Box>
        </Box>
      </AppTemplate>
    </Layout>
  );
};

export default BerandaAdmin;
// export default privateRouteAdmin(BerandaAdmin);

interface IItemStatistik {
  bgColor: string;
  title: string;
  count: any;
}

const ItemStatistik: React.FC<IItemStatistik> = ({ bgColor, title, count }) => {
  return (
    <Flex
      w='full'
      // justifyContent='space-between'
      padding='2'
      h='130px'
      alignItems='center'
      gap='10px'
      borderRadius='8px'
      bgColor={bgColor}
    >
      <BiSolidBarChartAlt2 size={50} />
      <Flex flexDirection='column' h='80px' justifyContent='space-between'>
        <Text fontSize='lg'>{title}</Text>
        <Text fontSize='4xl' fontWeight='800'>
          {count}
        </Text>
      </Flex>
    </Flex>
  );
};
