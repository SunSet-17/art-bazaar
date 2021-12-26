import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'

// connect to the default API address http://localhost:5001
const client = ipfsHttpClient()

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
// import styles from '../styles/global.module.css' 
import styles from '../styles/Create.module.css' 

import {
  nftaddress, nftmarketaddress
} from '../config'

import StyleTransferNFT from '../artifacts/contracts/StyleTransferNFT.sol/StyleTransferNFT.json'
import StyleTransferNFTBazzar from '../artifacts/contracts/Bazzar.sol/StyleTransferNFTBazzar.json'

export default function CreatingPage() {  

  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  const router = useRouter()

  async function createStyleTransferNFT(){
    const { name, description, price } = formInput
    if (!name || !description || !price || !fileUrl) {
      return;
    }
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, image: fileUrl
    })
    try {
      const added = await client.add(data)
      const url = `http://localhost:5001/${added.path}`
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  async function createSale(url) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)    
    const signer = provider.getSigner()

    /* next, create the item */
    let contract = new ethers.Contract(nftaddress, StyleTransferNFT.abi, signer)
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()
    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()
    const price = ethers.utils.parseUnits(formInput.price, 'ether')

    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(nftmarketaddress, StyleTransferNFTBazzar.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice })
    await transaction.wait()
    router.push('/')
  }


  return (
    <>
      <Head>
        <title>ArtBazzar</title>
        <meta name="description" content="Style Transfer NFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.divColParent}>
        <div className={styles.divColLeft}>
          <button className={styles.selectBox}></button>
          <p className={styles.upload_reminder}></p>
          <button className={styles.selectBox}></button>
          <br/>
          <div >{/*className='flex justify-center'*/}
            <Link href="/create">
              <button className={styles.reselect} >
                <p>RESELECT</p>
                <img src='/svg/reselect.svg' className='ml-2 mt-1'/>
              </button>
            </Link>
          </div>

        </div>

        <div className={styles.divColRight}>
          <div className={styles.div3PartParent}>
            <div className={styles.div1}>
              <Image
                src='/outputImg.png' // Output Image
                height={452}
                width={452} 
                alt="Output Image"
              />
            </div>
            <div className={styles.div2}>
              {/* <br/> */}
              {/* <button className={styles.tags}></button><br/><br/> */}
              <p className='text-2xl'>Name*</p>
              <input className={styles.theInput} type="text" placeholder="" ></input><br/><br/>
              <p className='text-2xl'>Tags</p>
              <input className={styles.theInput} type="text" placeholder="#Tags"></input><br/><br/>
              <p className='text-2xl'>Price* /ETH</p>
              <input className={styles.theInput} type="text" placeholder="Amount"></input><br/><br/>
              <p className='text-2xl'>Fees</p>
              <p className='text-1xl'>todo</p>
              <p className='text-2xl'>Duration</p>
              <input className={styles.theInput} type="text" placeholder="6 mouths"></input><br/><br/>
            </div>
          </div>
          <p className='text-2xl'>Description</p>
          {/* //todo 从第一行开始输入 */}
          <input className={styles.descriptionInput} type="text" placeholder=""></input>

          <div className='mt-12 mb-4 flex justify-center'>
            <button className={styles.listOnBazaar} onClick={createStyleTransferNFT}>LIST ON BAZZAR</button>
          </div>
        </div>
      </div>

    </>
  )
}