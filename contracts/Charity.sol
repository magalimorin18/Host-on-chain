// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/ICharity.sol";
import "./interfaces/ICharityNFT.sol";

/// @notice Charity contract that is implemented ICharity interface functionality
contract Charity is ICharity, Ownable {
    /// @notice address of NFT token that will be minted to user as an encouragee
    ICharityNFT public charityNFT;
    /// @notice uri to mint a NFT token
    string private nftURI;
    /// @notice setted user's address to his/her donation balance and is available nft token to collect it
    mapping(address => UserDonations) public userDonationsInfo;
    /// @notice pool will all donations amount
    uint256 public totalDonationPool;

    /// @notice constructor
    /// @param  _charityNFT - 
    /// @param _nftURI - 
    constructor (address _charityNFT, string memory _nftURI) {
        _setNFTAddress(_charityNFT, _nftURI);
    }

    function setNFTAddress(address _charityNFT, string memory _nftURI) external onlyOwner {
        _setNFTAddress(_charityNFT, _nftURI);
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

    function collectNFT() external {
        UserDonations storage userDonation = userDonationsInfo[msg.sender];

        if(!userDonation.isAvailableNFT) revert NoAvailableNFT();

        userDonation.isUnAvailableDonate = false;

        charityNFT.mintNFT(msg.sender, nftURI);
    }

    function donate() payable public override {
        if(msg.value == 0) revert InvalidDonationAmount();

        UserDonations storage userDonation = userDonationsInfo[msg.sender];

        userDonation.donationBalance += msg.value;
        userDonation.isAvailableNFT = true;
        userDonation.isUnAvailableDonate = true;
        totalDonationPool += msg.value;

        emit CreatedDonate(msg.sender, msg.value);
    }

    function _setNFTAddress(address _charityNFT, string memory _nftURI) private {
         if(_charityNFT == address(0)) revert ZeroAddress();

        charityNFT = ICharityNFT(_charityNFT);

        nftURI = _nftURI;

        emit SetCharityNFTAddress(_charityNFT);
    }

    receive() external payable {
        if (msg.sender != address(0)) {
            donate();
        }
    }

}
