import axios from 'axios';
import { ethers } from 'ethers';

export const getTokenMetadataByTokenId = async (nftContract: any, tokenId: string) => {
  try {
    const tokenUri = await nftContract.tokenURI(tokenId);
    const { data: metadata } = await axios.get(tokenUri);
    return metadata;
  } catch (error) {
    console.log(error);
  }
};

export function mapAvailableMarketItems(nftContract: any) {
  return async (marketItem: any) => {
    const metadata = await getTokenMetadataByTokenId(nftContract, marketItem.tokenId);
    return mapMarketItem(marketItem, metadata);
  };
}

export function mapCreatedAndOwnedTokenIdsAsMarketItems(marketplaceContract: any, nftContract: any, account: any) {
  return async (tokenId: any) => {
    const metadata = await getTokenMetadataByTokenId(nftContract, tokenId);
    const approveAddress = await nftContract.getApproved(tokenId);
    const hasMarketApproval = approveAddress === marketplaceContract.address;
    const [foundMarketItem, hasFound] = await marketplaceContract.getLatestMarketItemByTokenId(tokenId);
    const marketItem = hasFound ? foundMarketItem : {};
    return mapMarketItem(marketItem, metadata, tokenId, account, hasMarketApproval);
  };
}

export function mapMarketItem(marketItem: any, metadata: any, tokenId?: any, account?: any, hasMarketApproval?: any) {
  return {
    price: marketItem.price ? ethers.utils.formatUnits(marketItem.price, 'ether') : undefined,
    tokenId: marketItem.tokenId || tokenId,
    marketItemId: marketItem.marketItemId || undefined,
    creator: marketItem.creator || account,
    seller: marketItem.seller || undefined,
    owner: marketItem.owner || account,
    sold: marketItem.sold || false,
    canceled: marketItem.canceled || false,
    image: metadata.image,
    name: metadata.name,
    description: metadata.description,
    hasMarketApproval: hasMarketApproval || false,
  };
}

export async function getUniqueOwnedAndCreatedTokenIds(nftContract: any) {
  const nftIdsCreatedByMe = await nftContract.getTokensCreatedByMe();
  const nftIdsOwnedByMe = await nftContract.getTokensOwnedByMe();
  const myNftIds = [...nftIdsCreatedByMe, ...nftIdsOwnedByMe];
  return [...new Map(myNftIds.map((item) => [item._hex, item])).values()];
}
