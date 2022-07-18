import { createContext, useEffect, useState } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import NFT from '../../../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../../../artifacts/contracts/Marketplace.sol/Marketplace.json';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

const contextDefaultValues = {
  account: '',
  network: 'localhost',
  balance: 0,
  marketplaceContract: null,
  nftContract: null,
  isReady: false,
  hasWeb3: false,
  connectWallet: () => {},
  disconnectWallet: () => {},
};

const networkNames: { unknown: string } = {
  unknown: 'LOCALHOST',
};

export const Web3Context = createContext(contextDefaultValues);

interface IWeb3Provider {
  children?: React.ReactNode;
}

const Web3Provider = ({ children }: IWeb3Provider) => {
  const [hasWeb3, setHasWeb3] = useState(contextDefaultValues.hasWeb3);
  const [account, setAccount] = useState(contextDefaultValues.account);
  const [network, setNetwork] = useState(contextDefaultValues.network);
  const [balance, setBalance] = useState(contextDefaultValues.balance);
  const [marketplaceContract, setMarketplaceContract]: [any, any] = useState(contextDefaultValues.marketplaceContract);
  const [nftContract, setNFTContract]: [any, any] = useState(contextDefaultValues.nftContract);
  const [isReady, setIsReady] = useState(contextDefaultValues.isReady);
  const toast = useToast({
    duration: 2000,
    position: 'top',
  });

  // async function initializeWeb3WithoutSigner() {
  //   const alchemyProvider = new ethers.providers.AlchemyProvider(80001);
  //   setHasWeb3(false);
  //   await getAndSetWeb3ContextWithoutSigner(alchemyProvider);
  // }

  async function connectWallet() {
    try {
      if (!window.ethereum) {
        // await initializeWeb3WithoutSigner();
        return;
      }

      let onAccountsChangedCooldown = false;
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      setHasWeb3(true);
      const provider = new ethers.providers.Web3Provider(connection, 'any');
      await getAndSetWeb3ContextWithSigner(provider);

      const onAccountsChanged = (accounts: Array<string>) => {
        // Workaround to accountsChanged metamask mobile bug
        if (onAccountsChangedCooldown) return;
        onAccountsChangedCooldown = true;
        setTimeout(() => {
          onAccountsChangedCooldown = false;
        }, 1000);
        const changedAddress = ethers.utils.getAddress(accounts[0]);
        return getAndSetAccountAndBalance(provider, changedAddress);
      };

      connection.on('accountsChanged', onAccountsChanged);
      connection.on('chainChanged', connectWallet);
    } catch (error: any) {
      // initializeWeb3WithoutSigner();
      console.log(error);
      if (error.code === 4001) {
        toast({
          title: 'Please accept the request',
          description: 'Please accept the request to connect to your wallet',
          status: 'error',
        });
      }
      if (error.code === -32002) {
        toast({
          title: 'You have already pending request',
          description: 'Please cancel the pending request to connect to your wallet',
          status: 'error',
        });
      } else {
        toast({
          title: 'Please install MetaMask',
          description: 'Please install MetaMask to connect to your wallet',
          status: 'error',
        });
      }
    }
  }
  async function disconnectWallet() {
    setHasWeb3(false);
    setAccount(contextDefaultValues.account);
    setNetwork(contextDefaultValues.network);
    setBalance(contextDefaultValues.balance);
    setMarketplaceContract(contextDefaultValues.marketplaceContract);
    setNFTContract(contextDefaultValues.nftContract);
    setIsReady(contextDefaultValues.isReady);
  }

  async function getAndSetWeb3ContextWithSigner(provider: ethers.providers.Web3Provider) {
    setIsReady(false);
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();
    await getAndSetAccountAndBalance(provider, signerAddress);
    const networkName = await getAndSetNetwork(provider);
    const success = await setupContracts(signer, networkName);
    setIsReady(success);
  }

  async function getAndSetWeb3ContextWithoutSigner(provider: any) {
    setIsReady(false);
    const networkName = await getAndSetNetwork(provider);
    const success = await setupContracts(provider, networkName);
    setIsReady(success);
  }

  async function getAndSetAccountAndBalance(provider: ethers.providers.Web3Provider, address: string) {
    setAccount(address);
    const signerBalance = await provider.getBalance(address);
    const balanceInEther = ethers.utils.formatEther(signerBalance);
    setBalance(Number(balanceInEther));
    console.log(address);
    console.log(balanceInEther);
  }

  async function getAndSetNetwork(provider: ethers.providers.Web3Provider | ethers.providers.AlchemyProvider) {
    const { name: network } = await provider.getNetwork();
    // @ts-ignore
    const networkName = networkNames[network];
    setNetwork(networkName);
    return networkName;
  }

  async function setupContracts(signer: ethers.providers.JsonRpcSigner, networkName: string) {
    if (!networkName) {
      setMarketplaceContract(null);
      setNFTContract(null);
      return false;
    }
    const { data } = await axios(`/api/addresses?network=${networkName}`);
    const marketplaceContract = new ethers.Contract(data.marketplaceAddress, Market.abi, signer);
    setMarketplaceContract(marketplaceContract);
    const nftContract = new ethers.Contract(data.nftAddress, NFT.abi, signer);
    setNFTContract(nftContract);
    return true;
  }

  return (
    <Web3Context.Provider
      value={{
        account,
        marketplaceContract,
        nftContract,
        isReady,
        network,
        balance,
        connectWallet,
        disconnectWallet,
        hasWeb3,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
