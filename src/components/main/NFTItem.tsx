import { WrapItem, VStack, HStack, Image, Text } from '@chakra-ui/react';

interface INFTItem {
  nftUrl: string;
  id: string;
  price: number;
}

const NFTItem = ({ nftUrl, id, price }: INFTItem) => {
  return (
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
  );
};

export default NFTItem;
