import { WrapItem, VStack, HStack, Image, Text, Button } from '@chakra-ui/react';

interface INFTItem {
  nftUrl: string;
  id: string;
  price: string;
}

const NFTItem = ({ nftUrl, id, price }: INFTItem) => {
  return (
    <WrapItem cursor='pointer'>
      <VStack boxShadow='2xl' align='left' minWidth='20rem' minHeight='30rem' borderRadius='1rem' padding='1rem'>
        <Image
          transition='.5s'
          _hover={{ transform: 'scale(1.03)' }}
          height='20rem'
          width='20rem'
          src={nftUrl}
          borderRadius='1rem'
          boxShadow='xl'
        />
        <Text fontSize='0.8rem' fontWeight='bold'>
          {id}
        </Text>
        <Text fontSize='0.8rem'>Price</Text>
        <VStack align='left' spacing={10}>
          <HStack>
            <Image width='1.5rem' height='1.5rem' src='/img/icon/eth.svg'></Image>
            <Text fontWeight='bold'>{price}</Text>
          </HStack>
          <Button _hover={{ backgroundColor: '#2e8eee' }} color='white' backgroundColor='#2081e2' width='100%' minWidth='100%'>
            Details
          </Button>
        </VStack>
      </VStack>
    </WrapItem>
  );
};

export default NFTItem;
