import { Center, Flex, SimpleGrid, VStack, Wrap, WrapItem, Image, Text, HStack, Spinner } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import UnsupportedChain from 'src/components/chain/UnsupportedChain';
import NFTItem from 'src/components/main/NFTItem';
import { Web3Context } from 'src/components/providers/Web3Provider';
import { mapAvailableMarketItems } from '../src/utils/nft';

const Home: NextPage = () => {
  const [nfts, setNfts]: [any[], any] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { marketplaceContract, nftContract, isReady } = useContext(Web3Context);

  useEffect(() => {
    loadNFTs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  const loadNFTs = async () => {
    if (!isReady) return;
    const data = await marketplaceContract!.fetchAvailableMarketItems();
    console.log('marketplaceContract ' + data);
    const items = await Promise.all(data.map(mapAvailableMarketItems(nftContract)));
    console.log('items ', items);
    setNfts(items);
    setIsLoading(false);
  };

  // if (!network) {
  //   return <UnsupportedChain />;
  // }

  return (
    <>
      {isLoading ? (
        <Center width='100%'>
          <Spinner width='20rem' height='20rem' thickness='20px' speed='0.8s' emptyColor='gray.300' color='blue.500' size='xl' />
        </Center>
      ) : (
        <Wrap spacing={10} padding='3rem'>
          <NFTItem nftUrl='' price={17} id='9071' />
        </Wrap>
      )}
    </>
  );
};

export default Home;
