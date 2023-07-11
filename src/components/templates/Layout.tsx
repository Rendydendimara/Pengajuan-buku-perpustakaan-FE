import { Providers } from '@/providers';
import Head from 'next/head';
import React, { ReactNode } from 'react';
// import Footer from '../Footer';
// import Header from '../Header';

interface IProps {
  children: ReactNode;
  cookies?: string;
  showHeaderFooter?: boolean;
}

interface IProps {}

const Layout: React.FC<IProps> = (props) => {
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
        <main>{props.children}</main>
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

export default Layout;
