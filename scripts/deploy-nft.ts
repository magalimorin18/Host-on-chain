import { ethers } from "hardhat";

async function main() {
  const CharityNFT = await ethers.getContractFactory("CharityNFT");
  const nft = await CharityNFT.deploy("Host on Chain", "HOC");

  await nft.deployed();

  const txHash = nft.deployTransaction.hash
  const txReceipt = await ethers.provider.waitForTransaction(txHash)
  const contractAddress = txReceipt.contractAddress

  console.log(`CharityNFT contract deployed to ${contractAddress}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
