// contracts/StyleTransferNFT.sol
// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract StyleTransferNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address private _nftOwner;

    constructor(address marketplaceAddress) ERC721("StyleTransferTokens", "STT") {
        _nftOwner = marketplaceAddress;
    }

    function createToken(string memory tokenURI) public returns (uint) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        setApprovalForAll(_nftOwner, true);
        return newItemId;
    }

    function transferToken(address from, address to, uint256 tokenId) public {
        require(msg.sender == _nftOwner, "Transfer permission denied.");
        _transfer(from, to, tokenId);
    }
}