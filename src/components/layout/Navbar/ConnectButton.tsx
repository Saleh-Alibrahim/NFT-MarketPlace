import { Button, Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { Web3Context } from 'src/components/providers/Web3Provider';

const ConnectButton = () => {
  const { connectWallet } = useContext(Web3Context);
  const [hasWindowEthereum, setHasWindowEthereum] = useState(false);

  useEffect(() => {
    setHasWindowEthereum(window.ethereum);
  }, []);

  const buttonText = hasWindowEthereum ? 'Connect' : 'Download Metamask';
  const onClick = () => {
    if (hasWindowEthereum) {
      return connectWallet();
    }

    return window.open('https://metamask.io/', '_blank');
  };
  return (
    <Button color='inherit' onClick={onClick}>
      {buttonText}
    </Button>
  );
};

export default ConnectButton;
