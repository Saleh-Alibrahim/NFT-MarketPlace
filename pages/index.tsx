import { Flex } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import UnsupportedChain from 'src/components/chain/UnsupportedChain';
import { Web3Context } from 'src/components/providers/Web3Provider';
import { mapAvailableMarketItems } from '../src/utils/nft';

const Home: NextPage = () => {
  const [nfts, setNfts]: [any[], any] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { marketplaceContract, nftContract, isReady, network } = useContext(Web3Context);

  useEffect(() => {
    loadNFTs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  const loadNFTs = async () => {
    console.log(isReady);
    if (!isReady) return;
    const data = await marketplaceContract!.fetchAvailableMarketItems();
    console.log(data);
    const items = await Promise.all(data.map(mapAvailableMarketItems(nftContract)));
    setNfts(items);
    setIsLoading(false);
  };

  // if (!network) {
  //   return <UnsupportedChain />;
  // }

  return <Flex width='100vh' height='100%' backgroundColor='red.100'></Flex>;
};

export default Home;
