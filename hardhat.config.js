require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const getHDWallet = () => {
  const { MNEMONIC, PRIVATE_KEY } = process.env;
  if (MNEMONIC && MNEMONIC !== "") {
    return {
      mnemonic: MNEMONIC,
    }
  }
  if (PRIVATE_KEY && PRIVATE_KEY !== "") {
    return [PRIVATE_KEY]
  }
  throw Error("Private Key Not Set! Please set up .env");
}

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks:{
    devnode: {
      url:"http://127.0.0.1:8545",
    },
    hardhat: {
      forking: {
        /** 
         * It is strongly adviced to use self hosted RPC to use for forking 
         * **/
        url: "https://evm-cronos.crypto.org:8545", 
      }
    },
    cronos:{
      url:"https://evm-cronos.crypto.org:8545",
      chainId: 25,
      //accounts: getHDWallet()
    }
  }
};
