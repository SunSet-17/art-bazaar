import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react';
import OperationBox from '../components/OperationBox';
import StyleGrid from '../components/StyleGrid';
// import styles from '../styles/global.module.css' 
import styles from '../styles/Create.module.css' 
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'


// connect to the default API address http://localhost:5001
const client = ipfsHttpClient()

import {
  nftaddress, nftmarketaddress
} from '../config'

import StyleTransferNFT from '../artifacts/contracts/StyleTransferNFT.sol/StyleTransferNFT.json'
import StyleTransferNFTBazzar from '../artifacts/contracts/Bazzar.sol/StyleTransferNFTBazzar.json'



export default function CreatePage() {

  // Get the 'deepai' package here (Compatible with browser & nodejs):
  //     https://www.npmjs.com/package/deepai
  // All examples use JS async-await syntax, be sure to call the API inside an async function.
  //     Learn more about async-await here: https://javascript.info/async-await
    
  // Example posting a image URL:

  var result;
  const [pic, setPic] = useState("");
  const [transStyle, setTransStyle] = useState("");
  // The content and the style

  const [ifCreating, setIfCreating] = useState(false);
  // 用来表征页面是否切换了的变量

  async function createStyleTransferImage() {
    setIfCreating(true);

    const deepai = require('deepai'); // OR include deepai.min.js as a script tag in your HTML
    deepai.setApiKey('c94716d3-97d7-4619-8359-f23e785a3cd5');

    console.log('Called API with:', pic, 'and', transStyle);
    result = await deepai.callStandardApi("fast-style-transfer", {
      content: pic,
      style: transStyle,
      // content: "YOUR_IMAGE_URL",
      // style: "YOUR_IMAGE_URL",
    });
    console.log(result);
  }

  //todo 异常检测 比如没选择图片点击按钮无效

  // -----------下面的部分来自原creating.jsx-------------


  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  const router = useRouter()

  async function createStyleTransferNFT(){

    setFileUrl(result.output_url)

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
      const url = `https://ipfs.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url)

      // create nft without going through ipfs
      // createSale(data.url)
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

          <OperationBox innerIcon='/svg/UploadIcon.svg' innerWords='Upload Your Picture' 
            imagePreviewUrl={pic}
            callback={(file, result)=>{
              console.log(file, 'has data of (base64)' ,result);
              setPic(result); 
              //这里拿到了file数据(并且是url base64) 并且设置到了Pic
            }}
          />
          <p className={styles.upload_reminder}>
            File types supported: JPG, JPEG, PNG, SVG
          </p>
          <OperationBox innerIcon='/svg/SelectIcon.svg' innerWords='Select Style from the Right'
            clickable={false} 
            imagePreviewUrl={transStyle}
          />
          <br/>

          { // the left button ----------------------------
            !ifCreating ?
            <button className={styles.createNow} 
              onClick={createStyleTransferImage}>
                CLICK TO CREATE
            </button>

            :// -------------------------------------------

            <button className={styles.reselect} 
              onClick={()=>{setIfCreating(false);}}>
                <p>RESELECT</p>
                <img src='/svg/reselect.svg' className='ml-2 mt-1'/>
            </button>
          }{/* -------------------------------------------- */}


        </div>

        {!ifCreating ? // -----Create----------------------

          <div className={styles.divColRight}>
            <button className={styles.tags}></button>
              {/* //todo about Tags */}
            <StyleGrid callback={(selected)=>{
              console.log('Selected: ', selected);
              setTransStyle(selected.imageSrc);
              console.log('The URL: ', transStyle);
            }}/>
          </div>
          
          : // ------------------Creating------------------

          <div className={styles.divColRight}>
            <div className={styles.div3PartParent}>
              <div className={styles.div1}>
                <Image
                  src='/outputImg.png' // Output Image //todo 替换成真的生成图片
                  height={452}
                  width={452} 
                  alt="Output Image"
                />
              </div>
              <div className={styles.div2}>
                <p className='text-2xl'>Name*</p>
                <input className={styles.theInput} type="text" placeholder="Name" onChange={e => updateFormInput({ ...formInput, name: e.target.value })}></input><br/><br/>
                <p className='text-2xl'>Tags</p>
                <input className={styles.theInput} type="text" placeholder="#Tags"></input><br/><br/>
                <p className='text-2xl'>Price* /ETH</p>
                <input className={styles.theInput} type="text" placeholder="Amount" onChange={e => updateFormInput({ ...formInput, price: e.target.value })}></input><br/><br/>
                <p className='text-2xl'>Fees</p>
                <p className='text-1xl'>todo</p>
                <p className='text-2xl'>Duration</p>
                <input className={styles.theInput} type="text" placeholder="6 mouths"></input><br/><br/>
              </div>
            </div>
            <p className='text-2xl'>Description</p>
            {/* //todo 从第一行开始输入 */}
            <input className={styles.descriptionInput} type="text" placeholder="Description" onChange={e => updateFormInput({ ...formInput, description: e.target.value })}></input>

            <div className='mt-12 mb-4 flex justify-center'>
              <button className={styles.listOnBazaar} onClick={createStyleTransferNFT}>LIST ON BAZZAR</button>
            </div>
          </div>

        }{/*------------------------------------------------ */}

      </div>
    </>
  )
}