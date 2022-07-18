import { Flex, Box, Menu, MenuButton, HStack, Avatar, VStack, MenuList, MenuItem } from '@chakra-ui/react';
import React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import ConnectedAccountAddress from './ConnectedAccountAddress';
import Jdenticon from 'react-jdenticon';

interface IConnectedProfile {
  account: string;
}

const ConnectedProfile = ({ account }: IConnectedProfile) => {
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
          <MenuItem>Disconnect</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default ConnectedProfile;
