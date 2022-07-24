import { WrapItem, VStack, HStack, Image, Text } from '@chakra-ui/react';

interface INFTItem {
  nftUrl: string;
  id: string;
  price: string;
}

const NFTItem = ({ nftUrl, id, price }: INFTItem) => {
  return (
    <WrapItem>
      <VStack boxShadow='2xl' align='left' width='20rem' height='30rem' borderRadius='1rem' padding='1rem'>
        <Image height='20rem' width='100%' src={nftUrl} borderRadius='1rem' boxShadow='xl' />
        <Text fontSize='0.8rem' fontWeight='bold'>
          {id}
        </Text>
        <Text fontSize='0.8rem'>Price</Text>
        <HStack>
          <Image width='1.5rem' height='1.5rem' src='/img/icon/eth.svg'></Image>
          <Text fontWeight='bold'>{price}</Text>
        </HStack>
      </VStack>
    </WrapItem>
  );
};

export default NFTItem;
