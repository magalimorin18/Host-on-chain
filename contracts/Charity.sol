// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/ICharity.sol";

/// @notice Charity contract that is implemented ICharity interface functionality
contract Charity is ICharity, Ownable {

    /// @notice 
    mapping(address => uint256) donationBalances;

    uint256 public totalDonationPool;

    constructor () {}

    function sendDonation(address organization, uint256 donationAmount) payable external override onlyOwner {
        // check organization address
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

        emit CreatedDonate(msg.sender, msg.value);
    }

    receive() external payable {
        if (msg.sender != address(0)) {
            donate();
        }
    }

}
