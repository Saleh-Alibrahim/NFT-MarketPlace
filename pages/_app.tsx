import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from 'src/components/layout/Layout';
import Web3Provider from 'src/components/providers/Web3Provider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Web3Provider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Web3Provider>
    </ChakraProvider>
  );
}

export default MyApp;
