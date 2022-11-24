// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

/// @notice interface for Charity contract
interface ICharity {
    /// @notice
    /// @param donationBalance - total amount that the user is already donated
    /// @param isAvailableNFT - true when nft is available to collect
    /// @param isUnAvailableDonate - true when donation is unavailable(first user need to collect his nft)
    struct UserDonations{
        uint256 donationBalance;
        bool isAvailableNFT;
        bool isUnAvailableDonate;
    }

    struct AccommodationInfo {
        uint256 requestedDonation;
        uint256 currentDonation;
    }

    /// @notice emmited wher dination is addres by user
    /// @param user - 
    /// @param donationAmount -
    event CreatedDonate(address indexed user, uint256 donationAmount);

    /// @notice emmited when the owner sends some donation amount to organization/charity/dao address
    /// @param organization - 
    /// @param donationAmount - 
    event SentDonation(address indexed organization, uint256 donationAmount);

    /// @notice emmited when nft address is setted
    /// @param nftAddress - address of the nft token
    event SetCharityNFTAddress(address indexed nftAddress);

    event CreatedAccommodationRequest(uint256 indexed accommodationId, uint256 requestedCost);

    /// @notice 
    error InvalidDonation();

    /// @notice 
    error EmptyDonationPool();

    /// @notice
    error ZeroAddress();

    /// @notice
    error NoAvailableNFT();

    /// @notice
    error InvalidTransaction();

    /// @notice
    error InvalidAccommodationId();

    /// @notice
    error InvalidRequestedAccommodationCost();

    function addAccommodation(uint256 accommodationId, uint256 cost) external;

    /// @notice 
    function donate(uint256 accommodationId) payable external;

    /// @notice
    function sendDonation(address organization, uint256 donationAmount) payable external;
   
}