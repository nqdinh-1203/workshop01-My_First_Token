require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const ALCHEMY_API_KEY = "GMGOq5IweL2FmHvrCa2v_H8ISKknDtUu";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",

  networks:{
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY]
    },
  },

  etherscan: {
    apiKey: process.env.API_KEY
  }
};
// https://goerli.etherscan.io/address/0x3f5ec04aA1BD9DBABD119d767AeBb476a8EC3bf5#code