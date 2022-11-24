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
    /// @notice setted accommodation to user's address to his/her donation balance and is available nft token to collect it
    mapping(uint256 => mapping(address => UserDonations)) public userDonationsInfo;
    /// @notice setted accommodationId to accommodation needed and current amount
    mapping(uint256 => AccommodationInfo) public accommodationCost;
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

    function addAccommadation(uint256 accommodationId, uint256 cost) external override {
        if(accommodationId == 0) revert InvalidAccommodationId();
        if(cost == 0) revert InvalidRequestedAccommodationCost(); 

        AccommodationInfo storage accommodation = accommodationCost[accommodationId];

        accommodation.requestedDonation = cost;

        emit CreatedAccommodationRequest(accommodationId, cost);
    }

    function sendDonation(address organization, uint256 donationAmount) payable external override onlyOwner {
        if(organization == address(0)) revert ZeroAddress();
        if(donationAmount == 0) revert InvalidDonation();
        if(totalDonationPool == 0) revert EmptyDonationPool(); 
        
        (bool success, ) = organization.call{value: donationAmount}("");
        require(success, "INVALID_TRANSFER");

        totalDonationPool -= donationAmount;

        emit SentDonation(organization, totalDonationPool);
    }

    function collectNFT(uint256 accommodationId) external {
        if(accommodationId == 0) revert InvalidAccommodationId();
        UserDonations storage userDonation = userDonationsInfo[accommodationId][msg.sender];

        if(!userDonation.isAvailableNFT) revert NoAvailableNFT();

        userDonation.isUnAvailableDonate = false;

        charityNFT.mintNFT(msg.sender, nftURI);
    }

    function donate(uint256 accommodationId) payable public override {
        if(accommodationId == 0) revert InvalidAccommodationId();
        
        AccommodationInfo storage accommodation = accommodationCost[accommodationId];

        if(msg.value == 0 || accommodation.currentDonation + msg.value > accommodation.requestedDonation) 
            revert InvalidDonation();

        UserDonations storage userDonation = userDonationsInfo[accommodationId][msg.sender];

        userDonation.donationBalance += msg.value;
        userDonation.isAvailableNFT = true;
        userDonation.isUnAvailableDonate = true;
        totalDonationPool += msg.value;
        accommodation.currentDonation += msg.value;

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
            revert InvalidTransaction();
        }
    }
}
