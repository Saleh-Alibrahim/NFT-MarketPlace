import { createContext, useState } from 'react';

const contextDefaultValues = {
  modalNFT: undefined,
  isModalOpen: false,
  setModalNFT: null,
  setIsModalOpen: undefined,
};

const NFTModalContext = createContext(contextDefaultValues);

interface INFTModalProvider {
  children?: React.ReactNode;
}

export const NFTModalProvider = ({ children }: INFTModalProvider) => {
  const [modalNFT, setModalNFT]: [any, any] = useState(contextDefaultValues.modalNFT);
  const [isModalOpen, setIsModalOpen]: [any, any] = useState(contextDefaultValues.isModalOpen);

  return (
    <NFTModalContext.Provider
      value={{
        modalNFT,
        isModalOpen,
        setModalNFT,
        setIsModalOpen,
      }}
    >
      {children}
    </NFTModalContext.Provider>
  );
};

export default NFTModalContext;
