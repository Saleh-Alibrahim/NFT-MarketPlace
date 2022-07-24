import { Center, Flex, SimpleGrid, VStack, Wrap, WrapItem, Image, Text, HStack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
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

  return (
    <Wrap spacing={10} padding='3rem'>
      <WrapItem>
        <VStack boxShadow='2xl' align='left' width='20rem' borderRadius='1rem' padding='1rem'>
          <Image height='100%' width='100%' src='/img/nft.avif' />
          <Text fontSize='0.8rem' fontWeight='bold'>
            9071
          </Text>
          <Text fontSize='0.8rem'>Price</Text>
          <HStack>
            <Image width='1.5rem' height='1.5rem' src='/img/icon/eth.svg'></Image>
            <Text fontWeight='bold'>17.43</Text>
          </HStack>
        </VStack>
      </WrapItem>
      <WrapItem>
        <VStack boxShadow='2xl' align='left' width='20rem' borderRadius='1rem' padding='1rem'>
          <Image height='100%' width='100%' src='/img/nft.avif' />
          <Text fontSize='0.8rem' fontWeight='bold'>
            9071
          </Text>
          <Text fontSize='0.8rem'>Price</Text>
          <HStack>
            <Image width='1.5rem' height='1.5rem' src='/img/icon/eth.svg'></Image>
            <Text fontWeight='bold'>17.43</Text>
          </HStack>
        </VStack>
      </WrapItem>
    </Wrap>
  );
};

export default Home;
