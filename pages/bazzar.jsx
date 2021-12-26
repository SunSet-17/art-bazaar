import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/global.module.css' 

import {
    nftaddress, nftmarketaddress
} from '../config'

import StyleTransferNFT from '../artifacts/contracts/StyleTransferNFT.sol/StyleTransferNFT.json'
import StyleTransferNFTBazzar from '../artifacts/contracts/Bazzar.sol/StyleTransferNFTBazzar.json'

export default function BazzarPage() {

    const [nfts, setNfts] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')
    useEffect(() => {
        loadNFTs()
    }, [])

    async function loadNFTs() {
        /* create a generic provider and query for unsold market items */
        const provider = new ethers.providers.JsonRpcProvider()
        const tokenContract = new ethers.Contract(nftaddress, StyleTransferNFT.abi, provider)
        const marketContract = new ethers.Contract(nftmarketaddress, StyleTransferNFTBazzar.abi, provider)
        const data = await marketContract.fetchMarketItems()
    
        /*
        *  map over items returned from smart contract and format 
        *  them as well as fetch their token metadata
        */
        const items = await Promise.all(data.map(async i => {
          const tokenUri = await tokenContract.tokenURI(i.tokenId)
          const meta = await axios.get(tokenUri)
          let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
          let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.data.image,
            name: meta.data.name,
            description: meta.data.description,
          }
          return item
        }))
        setNfts(items)
        setLoadingState('loaded') 
    }

    if (loadingState === 'loaded' && !nfts.length) {
        return (<h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>)
    }

    return(
        <>
            <Head>
                <title>ArtBazaar</title>
                <meta name="description" content="Style Transfer NFT" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <p>Hello world!</p>
        </>
    )
}