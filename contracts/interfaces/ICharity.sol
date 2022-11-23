// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

/// @notice interface for Charity contract
interface ICharity {
    event CreatedDonate(address indexed user, uint256 donationAmount);

    event SentDonation(address indexed organization, uint256 donationAmount);

    error InvalidDonationAmount();

    error EmptyDonationPool();

    function donate() payable external;

    function sendDonation(address organization, uint256 donationAmount) payable external;
   
}