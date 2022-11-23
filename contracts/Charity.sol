// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/ICharity.sol";
import "./interfaces/ICharityNFT.sol";

/// @notice Charity contract that is implemented ICharity interface functionality
contract Charity is ICharity, Ownable {

    ICharityNFT public charityNFT;

    string private nftURI;

    /// @notice 
    mapping(address => uint256) public donationBalances;

    uint256 public totalDonationPool;

    constructor (address _charityNFT) {
        _setNFTAddress(_charityNFT);
    }

    function setNFTAddress(address _charityNFT) external onlyOwner {
        _setNFTAddress(_charityNFT);
    }

    function sendDonation(address organization, uint256 donationAmount) payable external override onlyOwner {
        if(organization == address(0)) revert ZeroAddress();
        if(donationAmount == 0) revert InvalidDonationAmount();
        if(totalDonationPool == 0) revert EmptyDonationPool(); 
        
        (bool success, ) = organization.call{value: donationAmount}("");
        require(success, "INVALID_TRANSFER");

        totalDonationPool -= donationAmount;

        emit SentDonation(organization, totalDonationPool);
    }

    function donate() payable public override {
        if(msg.value == 0) revert InvalidDonationAmount();

        donationBalances[msg.sender] += msg.value;
        totalDonationPool += msg.value;

        charityNFT.mintNFT(msg.sender, nftURI);

        emit CreatedDonate(msg.sender, msg.value);
    }

    function _setNFTAddress(address _charityNFT) private {
         if(_charityNFT == address(0)) revert ZeroAddress();

        charityNFT = ICharityNFT(_charityNFT);

        emit SetCharityNFTAddress(_charityNFT);
    }

    receive() external payable {
        if (msg.sender != address(0)) {
            donate();
        }
    }

}
