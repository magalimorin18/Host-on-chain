import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
describe("Charity", function () {

  const ether = ethers.utils.parseEther;

  async function deployContract() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const CharityNFT = await ethers.getContractFactory("CharityNFT");
    const charityNft = await CharityNFT.deploy("Host in Chain", "HOC");

    const Charity = await ethers.getContractFactory("Charity");
    const charity = await Charity.deploy(charityNft.address, "https://ipfs.io/ipfs/QmVrSSKiMYGmHdqHU9FoapnBhgjomZ4MwK57hoWZMykcAH");

    return { charityNft, charity, owner, otherAccount };
  }

  // describe("Deployment", function () {
  //   it("Should set the right unlockTime", async function () {
  //     const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);

  //     expect(await lock.unlockTime()).to.equal(unlockTime);
  //   });

  //   it("Should set the right owner", async function () {
  //     const { lock, owner } = await loadFixture(deployOneYearLockFixture);

  //     expect(await lock.owner()).to.equal(owner.address);
  //   });

  //   it("Should receive and store the funds to lock", async function () {
  //     const { lock, lockedAmount } = await loadFixture(
  //       deployOneYearLockFixture
  //     );

  //     expect(await ethers.provider.getBalance(lock.address)).to.equal(
  //       lockedAmount
  //     );
  //   });

  //   it("Should fail if the unlockTime is not in the future", async function () {
  //     // We don't use the fixture here because we want a different deployment
  //     const latestTime = await time.latest();
  //     const Lock = await ethers.getContractFactory("Lock");
  //     await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
  //       "Unlock time should be in the future"
  //     );
  //   });
  // });

  describe("donate", function () {
    describe("Validations", function () {
      it("Should success", async function () {
        const { charity } = await loadFixture(deployContract);

        await charity.addAccommodation(1, ether("2"));

        await charity.donate(1, { value: ether("1") })

        expect(await charity.totalDonationPool()).to.be.equal(ether("1"));
      });

      //   it("Should revert with the right error if called from another account", async function () {
      //     const { lock, unlockTime, otherAccount } = await loadFixture(
      //       deployOneYearLockFixture
      //     );

      //     // We can increase the time in Hardhat Network
      //     await time.increaseTo(unlockTime);

      //     // We use lock.connect() to send a transaction from another account
      //     await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
      //       "You aren't the owner"
      //     );
      //   });

      //   it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
      //     const { lock, unlockTime } = await loadFixture(
      //       deployOneYearLockFixture
      //     );

      //     // Transactions are sent using the first signer by default
      //     await time.increaseTo(unlockTime);

      //     await expect(lock.withdraw()).not.to.be.reverted;
      //   });
    });

    // describe("Events", function () {
    //   it("Should emit an event on withdrawals", async function () {
    //     const { lock, unlockTime, lockedAmount } = await loadFixture(
    //       deployOneYearLockFixture
    //     );

    //     await time.increaseTo(unlockTime);

    //     await expect(lock.withdraw())
    //       .to.emit(lock, "Withdrawal")
    //       .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
    //   });
    // });

    // describe("Transfers", function () {
    //   it("Should transfer the funds to the owner", async function () {
    //     const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
    //       deployOneYearLockFixture
    //     );

    //     await time.increaseTo(unlockTime);

    //     await expect(lock.withdraw()).to.changeEtherBalances(
    //       [owner, lock],
    //       [lockedAmount, -lockedAmount]
    //     );
    //   });
    // });
  });
});
