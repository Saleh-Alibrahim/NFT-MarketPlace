import { Button, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { Web3Context } from 'src/components/providers/Web3Provider';

const ConnectButton = () => {
  const { connectWallet } = useContext(Web3Context);
  return <Button onClick={connectWallet}>Connect</Button>;
};

export default ConnectButton;
