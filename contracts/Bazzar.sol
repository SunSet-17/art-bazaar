// contracts/Bazzar.sol
// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract StyleTransferNFTBazzar is ReentrancyGuard {
  using Counters for Counters.Counter;
  Counters.Counter private _itemIds;
  Counters.Counter private _itemsSold;

  address payable owner;
  uint256 listingPrice = 0.025 ether;

  constructor() {
    owner = payable(msg.sender);
  }

  struct MarketItem {
    uint itemId;
    address nftContract;
    uint256 tokenId;
    address payable seller;
    address payable owner;
    uint256 price;
    bool sold;
  }

  mapping(uint256 => MarketItem) private idToMarketItem;

  event MarketItemCreated (
    uint indexed itemId,
    address indexed nftContract,
    uint256 indexed tokenId,
    address seller,
    address owner,
    uint256 price,
    bool sold
  );

  /* Returns the listing price of the contract */
  function getListingPrice() public view returns (uint256) {
    return listingPrice;
  }

  /* Places an item for sale on the marketplace */
  function createMarketItem(address nftContract, uint256 tokenId, uint256 price) public payable nonReentrant {
    require(price > 0, "Price must be at least 1 wei");
    require(msg.value == listingPrice, "Price must be equal to listing price");

    uint256 tokenId = _minter.createToken(tokenURI);
    _itemIds.increment();
    uint256 itemId = _itemIds.current();

    idToMarketItem[itemId] =  MarketItem(
      itemId,
      nftContract,
      tokenId,
      payable(msg.sender),
      payable(address(0)),
      price,
      false
    );

    IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

    emit MarketItemCreated(
      itemId,
      nftContract,
      tokenId,
      msg.sender,
      address(0),
      price,
      false
    );
  }

  /* Creates the sale of a marketplace item */
  /* Transfers ownership of the item, as well as funds between parties */
  function createMarketSale(uint256 itemId) public payable nonReentrant {
    require(msg.value == transactionPrice, "Please pay for the transactionFee");
    require(!idToMarketItem[itemId].sold, "The item is sold");

    _saleIds.increment();
    uint256 saleIds = _saleIds.current();
    _idToSale[saleIds] = Sale(
      saleIds,
      itemId,
      msg.sender,
      payable(msg.sender),
      block.timestamp,
      false
    );
//    IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
    idToMarketItem[itemId].sold = true;

    payable(_bazzarOwner).transfer(transactionPrice);
  }

  function endMarketSale(uint256 saleIds) public payable{
    uint itemId = _idToSale[saleIds].itemId;
    uint price = idToMarketItem[itemId].price;
    uint tokenId = idToMarketItem[itemId].tokenId;
    require(msg.value == price, "Please submit the asking price in order to complete the purchase");

    emit tokenTransfer(itemId, _idToSale[saleIds].seller, _idToSale[saleIds].buyer, block.timestamp, price);
  }

  /* Returns all unsold market items */
  function fetchMarketItems() public view returns (MarketItem[] memory) {
    uint itemCount = _itemIds.current();
    uint unsoldItemCount = _itemIds.current() - _itemsSold.current();
    uint currentIndex = 0;

    MarketItem[] memory items = new MarketItem[](unsoldItemCount);
    for (uint i = 0; i < itemCount; i++) {
      if (idToMarketItem[i + 1].owner == address(0)) {
        uint currentId = idToMarketItem[i + 1].itemId;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

  /* Returns only items that a user has purchased */
  function fetchMyNFTs() public view returns (MarketItem[] memory) {
    uint totalItemCount = _itemIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;

    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].owner == msg.sender) {
        itemCount += 1;
      }
    }

    MarketItem[] memory items = new MarketItem[](itemCount);
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].owner == msg.sender) {
        uint currentId = idToMarketItem[i + 1].itemId;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

  /* Return the item which you sale */
  function fetchMySale() public view returns (Sale[] memory, MarketItem[] memory) {
    uint totalSaleCount = _saleIds.current();
    uint saleCount = 0;
    uint currentIndex = 0;

    for (uint256 i = 0; i < totalSaleCount; i++) {
      if (_idToSale[i+1].seller == msg.sender) {
        saleCount += 1;
      }
    }

    Sale[] memory sale = new Sale[](saleCount);
    MarketItem[] memory NFTs = new MarketItem[](saleCount);
    for (uint256 i = 0; i < totalSaleCount; i++) {
      if (_idToSale[i+1].seller == msg.sender) {
        uint currentId = i+1;
        Sale storage currentSale = _idToSale[currentId];
        MarketItem storage currentNFT = idToMarketItem[currentSale.itemId];
        sale[currentIndex] = currentSale;
        NFTs[currentIndex] = currentNFT;
        currentIndex += 1;
      }
    }

    return (sale, NFTs);
  }

  /* Return the item which you purchase */
  function fetchMyBuy() public view returns (Sale[] memory, MarketItem[] memory) {
    uint totalSaleCount = _saleIds.current();
    uint saleCount = 0;
    uint currentIndex = 0;

    for (uint256 i = 0; i < totalSaleCount; i++) {
      if (_idToSale[i+1].buyer == msg.sender) {
        saleCount += 1;
      }
    }

    Sale[] memory sale = new Sale[](saleCount);
    MarketItem[] memory NFTs = new MarketItem[](saleCount);
    for (uint256 i = 0; i < totalSaleCount; i++) {
      if (_idToSale[i+1].buyer == msg.sender) {
        uint currentId = i+1;
        Sale storage currentSale = _idToSale[currentId];
        MarketItem storage currentNFT = idToMarketItem[currentSale.itemId];
        sale[currentIndex] = currentSale;
        NFTs[currentIndex] = currentNFT;
        currentIndex += 1;
      }
    }

    return (sale, NFTs);
  }

  /* Return the item which is still on sale */
  function fetchAvailableSale() public view returns (Sale[] memory, MarketItem[] memory) {
    uint totalSaleCount = _saleIds.current();
    uint saleCount = 0;
    uint currentIndex = 0;

    for (uint256 i = 0; i < totalSaleCount; i++) {
      if (!_idToSale[i+1].isEnded) {
        saleCount += 1;
      }
    }

    Sale[] memory sale = new Sale[](saleCount);
    MarketItem[] memory NFTs = new MarketItem[](saleCount);
    for (uint256 i = 0; i < totalSaleCount; i++) {
      if (!_idToSale[i+1].isEnded) {
        uint currentId = i+1;
        Sale storage currentSale = _idToSale[currentId];
        MarketItem storage currentNFT = idToMarketItem[currentSale.itemId];
        sale[currentIndex] = currentSale;
        NFTs[currentIndex] = currentNFT;
        currentIndex += 1;
      }
    }

    return (sale, NFTs);
  }


  /* Returns only items a user has created */
  function fetchItemsCreated() public view returns (MarketItem[] memory) {
    uint totalItemCount = _itemIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;

    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].seller == msg.sender) {
        itemCount += 1;
      }
    }

    MarketItem[] memory items = new MarketItem[](itemCount);
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].seller == msg.sender) {
        uint currentId = idToMarketItem[i + 1].itemId;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }
}