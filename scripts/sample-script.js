// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { expect } = require("chai");
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // Get signers to work with
  const [mainWallet, secondWallet] = await hre.ethers.getSigners();

  // Use ethers to convert units (parseEther is now a standalone function)
  const toSpend = hre.ethers.parseEther("100.0"); // 100 ETH/CRO

  // Simple send
  console.log("Sending", hre.ethers.formatEther(toSpend), "ETH/CRO from", mainWallet.address, "to", secondWallet.address);
  
  const tx = await mainWallet.sendTransaction({
    to: secondWallet.address,
    value: toSpend
  });

  // Wait for block to be mined. Get tx receipt back
  const receipt = await tx.wait();
  console.log("Transaction hash:", receipt.hash);
  console.log("Block number:", receipt.blockNumber);
  
  // Get balances after transaction
  const senderBalance = await hre.ethers.provider.getBalance(mainWallet.address);
  const receiverBalance = await hre.ethers.provider.getBalance(secondWallet.address);
  
  console.log("Sender balance:", hre.ethers.formatEther(senderBalance), "ETH/CRO");
  console.log("Receiver balance:", hre.ethers.formatEther(receiverBalance), "ETH/CRO");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
