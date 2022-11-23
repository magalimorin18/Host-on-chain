// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/// @notice interface for CharityNFT contract
interface ICharityNFT is IERC721 {
 
    function mintNFT(address to, string memory nftURI) external returns(uint256);
}