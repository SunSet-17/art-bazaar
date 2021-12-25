// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const fs = require('fs');

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  // const Greeter = await hre.ethers.getContractFactory("Greeter");
  // const greeter = await Greeter.deploy("Hello, Hardhat!");
  // await greeter.deployed();
  // console.log("Greeter deployed to:", greeter.address);

  const ArtBazzar = await hre.ethers.getContractFactory("StyleTransferNFTBazzar");
  const artBazzar = await ArtBazzar.deploy();
  await artBazzar.deployed();
  console.log("artBazzar deployed to:", artBazzar.address);

  const StyleTransferNFT = await hre.ethers.getContractFactory("StyleTransferNFT");
  const styleTransferNFT = await StyleTransferNFT.deploy(artBazzar.address);
  await styleTransferNFT.deployed();
  console.log("styleTransferNFT deployed to:", styleTransferNFT.address);

  let config = `
  export const nftmarketaddress = "${artBazzar.address}"
  export const nftaddress = "${styleTransferNFT.address}"
  `

  let data = JSON.stringify(config);
  fs.writeFileSync('config.js', JSON.parse(data));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
