import React, { ReactNode, useContext } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Button,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Web3Context } from '../../providers/Web3Provider';
import ConnectedAccountAddress from '../Navbar/ConnectedAccountAddress';
import ConnectButton from '../Navbar/ConnectButton';
import ConnectedProfile from '../Navbar/ConnectedProfile';
import SidebarContent from './SidebarContent';




const SidebarWithHeader = ({ children }: { children: ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH='100vh' bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Flex ml={{ base: 0, md: 60 }} minH='90vh'>
        {children}
      </Flex>
    </Box>
  );
};





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

export default SidebarWithHeader;
