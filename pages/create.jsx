import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import StyleGrid from '../components/StyleGrid';
// import styles from '../styles/global.module.css' 
import styles from '../styles/Create.module.css' 

export default function CreatePage() {

  // Get the 'deepai' package here (Compatible with browser & nodejs):
  //     https://www.npmjs.com/package/deepai
  // All examples use JS async-await syntax, be sure to call the API inside an async function.
  //     Learn more about async-await here: https://javascript.info/async-await
    
  // Example posting a image URL:
  async function createStyleTransferImage() {
    const deepai = require('deepai'); // OR include deepai.min.js as a script tag in your HTML
    deepai.setApiKey('quickstart-QUdJIGlzIGNvbWluZy4uLi4K');

    var result = await deepai.callStandardApi("fast-style-transfer", {
      content: "YOUR_IMAGE_URL",
      style: "YOUR_IMAGE_URL",
    });
    console.log(result);
  }
  

  return (
    <>
      <Head>
        <title>ArtBazzar</title>
        <meta name="description" content="Style Transfer NFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.divColParent}>
        <div className={styles.boxDiv, styles.divColLeft}>
          <button className={styles.selectBox}></button>
          <p className={styles.upload_reminder}>
            File types supported: JPG, JPEG, PNG, SVG
          </p>
          <button className={styles.selectBox}></button>
          <br/>

          
          <Link href="/creating"> 
            <button className={styles.createNow} onClick={createStyleTransferImage}>CLICK TO CREATE</button>
          </Link>
        </div>

        <div className={styles.divColRight}>
          <button className={styles.tags}></button>

          <StyleGrid></StyleGrid>

        </div>
      </div>
      


    </>
  )
}