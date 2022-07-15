const path = require('path');
require('@nomiclabs/hardhat-waffle');
require('dotenv').config({ path: path.join(__dirname, '/.env.local') });
require('hardhat-gas-reporter');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_ID}`,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY, process.env.ACCOUNT2_PRIVATE_KEY],
    },
    reposten: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_ID}`,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY, process.env.ACCOUNT2_PRIVATE_KEY],
    },
  },
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
