import Head from 'next/head';
import { useRouter } from 'next/router';
import SidebarWithHeader from './SidebarWithHeader';

interface ILayout {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayout) => {
  return (
    <>
      <Head>
        <title>NFT Marketplace</title>
        <meta name='description' content='Oumla Play' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <SidebarWithHeader>{children}</SidebarWithHeader>
    </>
  );
};

export default Layout;
