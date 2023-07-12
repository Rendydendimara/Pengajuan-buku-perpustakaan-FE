import { Providers } from '@/providers';
import { Box, Flex } from '@chakra-ui/layout';
import Head from 'next/head';
import React, { ReactNode } from 'react';
import HeaderProdi from '../HeaderProdi';
// import Footer from '../Footer';
// import Header from '../Header';

interface IProps {
  children: ReactNode;
  cookies?: string;
  showOnlyInfoUser?: boolean;
}

const LayoutProdi: React.FC<IProps> = (props) => {
  return (
    <Providers>
      <div>
        <Head>
          {/* Favicon Icon */}
          <meta name='application-name' content='&nbsp;' />
          <meta name='msapplication-TileColor' content='#FFFFFF' />
          {/* End Favicon Icon */}
          <meta name='theme-color' content='#008000' />
          <meta property='og:type' content='website' />

          {/* <meta
          name='google-site-verification'
          content=''
        /> */}
        </Head>
        {/* {props.showHeaderFooter && <Header />} */}
        <HeaderProdi showOnlyInfoUser={props.showOnlyInfoUser} />
        <main>
          <Flex justifyContent='center'>
            <Box style={{ maxWidth: '1440px' }} w='full'>
              {props.children}
            </Box>
          </Flex>
        </main>
        {/* {props.showHeaderFooter && <Footer />} */}
        <script
          src='https://accounts.google.com/gsi/client'
          async
          defer
        ></script>
      </div>
    </Providers>
  );
};

export default LayoutProdi;
