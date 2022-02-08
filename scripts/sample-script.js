// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { expect } = require("chai");
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  //get signers to work with.
  const [mainWallet, secondWallet] = await ethers.getSigners();

  //use ethers.utils to convert units
  let toSpend = ethers.utils.parseEther("100.0"); // 100ETH/CRO

  //simple send
  let tx = await mainWallet.sendTransaction({
    to: secondWallet.address,
    value: toSpend
  });
  //wait for block to be mined. Get tx receipt back
  let receipt = await tx.wait();
  console.log("Simple send returned:", receipt);


  //send and test if recipient got funds
  tx = mainWallet.sendTransaction({
    to: secondWallet.address,
    value: toSpend
  });
  expect(() => tx).to.changeEtherBalance(secondWallet.address, toSpend);
  console.log("Recipient received expected value");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
