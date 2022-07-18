import { Flex, Box, Menu, MenuButton, HStack, Avatar, VStack, MenuList, MenuItem } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import ConnectedAccountAddress from './ConnectedAccountAddress';
// @ts-ignore
import Jdenticon from 'react-jdenticon';
import { Web3Context } from 'src/components/providers/Web3Provider';

interface IConnectedProfile {
  account: string;
}

const ConnectedProfile = ({ account }: IConnectedProfile) => {
  const { disconnectWallet } = useContext(Web3Context);
  return (
    <Flex alignItems={'center'}>
      <Menu>
        <MenuButton py={2} transition='all 0.3s' _focus={{ boxShadow: 'none' }}>
          <HStack>
            <Jdenticon size='40' value={account} />
            <VStack display={{ base: 'none', md: 'flex' }} alignItems='flex-start' spacing='1px' ml='2'>
              <ConnectedAccountAddress account={account} />
            </VStack>
            <Box display={{ base: 'none', md: 'flex' }}>
              <FiChevronDown />
            </Box>
          </HStack>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={disconnectWallet}>Disconnect</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default ConnectedProfile;
