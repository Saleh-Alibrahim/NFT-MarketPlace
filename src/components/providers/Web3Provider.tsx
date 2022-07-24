import { createContext, useEffect, useMemo, useState } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import NFT from '../../../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../../../artifacts/contracts/Marketplace.sol/Marketplace.json';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

interface IContextDefaultValues {
  account: string;
  network: string;
  balance: number;
  marketplaceContract: any;
  nftContract: any;
  isReady: boolean;
  hasWeb3: boolean;
  connectWallet: any;
  disconnectWallet: any;
}

const contextDefaultValues: IContextDefaultValues = {
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

const networkNames: { unknown: string; maticmum: string } = {
  unknown: 'LOCALHOST',
  maticmum: 'MUMBAI',
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
  const [marketplaceContract, setMarketplaceContract] = useState(contextDefaultValues.marketplaceContract);
  const [nftContract, setNFTContract] = useState(contextDefaultValues.nftContract);
  const [isReady, setIsReady] = useState(contextDefaultValues.isReady);
  const toast = useToast({
    duration: 2000,
    position: 'top',
  });

  const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
  const web3Modal = useMemo(() => {
    if (typeof window === 'undefined') return;
    return new Web3Modal();
  }, []);

  useEffect(() => {
    initializeWeb3WithoutSigner();
  }, []);

  async function initializeWeb3WithoutSigner() {
    setHasWeb3(false);
    await getAndSetWeb3ContextWithoutSigner(provider);
  }

  async function connectWallet() {
    try {
      if (!window.ethereum) {
        return;
      }

      let onAccountsChangedCooldown = false;

      const connection = await web3Modal!.connect();

      setHasWeb3(true);
      const signer = provider.getSigner();
      const signerAddress = await signer.getAddress();
      await getAndSetAccountAndBalance(signerAddress);

      const onAccountsChanged = (accounts: Array<string>) => {
        // Workaround to accountsChanged metamask mobile bug
        if (onAccountsChangedCooldown) return;
        onAccountsChangedCooldown = true;
        setTimeout(() => {
          onAccountsChangedCooldown = false;
        }, 1000);
        const changedAddress = ethers.utils.getAddress(accounts[0]);
        return getAndSetAccountAndBalance(changedAddress);
      };

      connection.on('accountsChanged', onAccountsChanged);
      connection.on('chainChanged', connectWallet);
    } catch (error: any) {
      initializeWeb3WithoutSigner();
      console.log(error);
      toast({
        title: '😥',
        description: error.message,
        status: 'error',
      });
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
    await web3Modal!.clearCachedProvider();
  }

  async function getAndSetWeb3ContextWithoutSigner(provider: any) {
    setIsReady(false);
    const networkName = await getAndSetNetwork();
    const success = await setupContracts(networkName);
    setIsReady(success);
  }

  async function getAndSetAccountAndBalance(address: string) {
    setAccount(address);
    const signerBalance = await provider.getBalance(address);
    const balanceInEther = ethers.utils.formatEther(signerBalance);
    setBalance(Number(balanceInEther));
  }

  async function getAndSetNetwork() {
    const { name: network } = await provider.getNetwork();
    console.log('network', network);
    // @ts-ignore
    const networkName = networkNames[network];
    setNetwork(networkName);
    return networkName;
  }

  async function setupContracts(networkName: string) {
    const { data } = await axios(`/api/addresses?network=${networkName}`);
    console.log('Address : ', data);
    const marketplaceContract = new ethers.Contract(data.marketplaceAddress, Market.abi, provider);
    console.log('marketplaceContract', marketplaceContract);
    setMarketplaceContract(marketplaceContract);
    const nftContract = new ethers.Contract(data.nftAddress, NFT.abi, provider);
    console.log('nftContract', nftContract);
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
        connectWallet: connectWallet,
        disconnectWallet,
        hasWeb3,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
