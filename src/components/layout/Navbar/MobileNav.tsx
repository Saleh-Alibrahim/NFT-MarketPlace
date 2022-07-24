import { FlexProps, Flex, useColorModeValue, IconButton, HStack,Text } from "@chakra-ui/react";
import { useContext } from "react";
import { FiMenu } from "react-icons/fi";
import { Web3Context } from "src/components/providers/Web3Provider";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import ConnectButton from "./ConnectButton";
import ConnectedProfile from "./ConnectedProfile";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { connectWallet, account } = useContext(Web3Context);

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height='10vh'
      alignItems='center'
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth='1px'
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton display={{ base: 'flex', md: 'none' }} onClick={onOpen} variant='outline' aria-label='open menu' icon={<FiMenu />} />

      <Text display={{ base: 'flex', md: 'none' }} fontSize='2xl' fontFamily='monospace' fontWeight='bold'>
        NFT
      </Text>

      <HStack spacing={{ base: '2', md: '6' }}>
        <ColorModeSwitcher />
        {account ? <ConnectedProfile account={account} /> : <ConnectButton />}
      </HStack>
    </Flex>
  );
};

export default MobileNav;