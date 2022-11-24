// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/// @notice interface for CharityNFT contract
interface ICharityNFT is IERC721 {

    /// @notice emmited when nft is minted
    /// @param minter - 
    /// @param tokenURI - 
    /// @param nftId - 
    event MintedNFT(address indexed minter, string tokenURI, uint256 nftId);

    /// @notice 
    function mintNFT(address to, string memory nftURI) external returns(uint256);
}