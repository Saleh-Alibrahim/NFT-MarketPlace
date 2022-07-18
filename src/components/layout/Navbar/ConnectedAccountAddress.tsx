import { Text } from '@chakra-ui/react';

interface IConnectedAccountAddress {
  account: string;
}

const ConnectedAccountAddress = ({ account }: IConnectedAccountAddress) => {
  return <Text>{account.slice(0, 8)}</Text>;
};

export default ConnectedAccountAddress;
