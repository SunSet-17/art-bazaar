const { expect } = require("chai");
const { ethers } = require("hardhat");

// describe("Greeter", function () {
//   it("Should return the new greeting once it's changed", async function () {
//     const Greeter = await ethers.getContractFactory("Greeter");
//     const greeter = await Greeter.deploy("Hello, world!");
//     await greeter.deployed();

//     expect(await greeter.greet()).to.equal("Hello, world!");

//     const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

//     // wait until the transaction is mined
//     await setGreetingTx.wait();

//     expect(await greeter.greet()).to.equal("Hola, mundo!");
//   });
// });

describe("StyleTransferNFTBazzar", function() {
  it("Should create and execute market sales", async function() {
    /* deploy the bazzar */
    const Bazzar = await ethers.getContractFactory("StyleTransferNFTBazzar")
    const bazzar = await Bazzar.deploy()
    await bazzar.deployed()
    const marketAddress = bazzar.address

    /* deploy the StyleTransferNFT contract */
    const StyleTransferNFT = await ethers.getContractFactory("StyleTransferNFT")
    const styleTransferNFT = await StyleTransferNFT.deploy(marketAddress)
    await styleTransferNFT.deployed()
    const nftContractAddress = styleTransferNFT.address

    let listingPrice = await bazzar.getListingPrice()
    listingPrice = listingPrice.toString()

    const auctionPrice = ethers.utils.parseUnits('1', 'ether')

    /* create two tokens */
    await styleTransferNFT.createToken("")
    await styleTransferNFT.createToken("")

    /* put both tokens for sale */
    await bazzar.createMarketItem(nftContractAddress, 1, auctionPrice, { value: listingPrice })
    await bazzar.createMarketItem(nftContractAddress, 2, auctionPrice, { value: listingPrice })

    const [_, buyerAddress] = await ethers.getSigners()

    /* execute sale of token to another user */
    await bazzar.connect(buyerAddress).createMarketSale(nftContractAddress, 1, { value: auctionPrice})

    /* query for and return the unsold items */
    items = await bazzar.fetchMarketItems()
    items = await Promise.all(items.map(async i => {
      const tokenUri = await styleTransferNFT.tokenURI(i.tokenId)
      let item = {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenUri
      }
      return item
    }))
    console.log('items: ', items)
  })
})
