import { ethers } from "hardhat";

async function main() {
  const Charity = await ethers.getContractFactory("Charity");
  const charity = await Charity.deploy();

  await charity.deployed();

  console.log(`Charity contract deployed to ${charity.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
