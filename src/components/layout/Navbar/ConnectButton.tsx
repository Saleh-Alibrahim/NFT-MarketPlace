import { Button, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { Web3Context } from 'src/components/providers/Web3Provider';

const ConnectButton = () => {
  const { initializeWeb3 } = useContext(Web3Context);
  return <Button onClick={initializeWeb3}>Connect</Button>;
};

export default ConnectButton;
