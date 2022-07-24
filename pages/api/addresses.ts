import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const network = req.query.network;
  res.status(200).json({
    marketplaceAddress: process.env[`MARKETPLACE_CONTRACT_ADDRESS_${network}`],
    nftAddress: process.env[`NFT_CONTRACT_ADDRESS_${network}`],
  });
}
