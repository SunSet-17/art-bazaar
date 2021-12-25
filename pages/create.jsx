import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
// import styles from '../styles/global.module.css' 
import styles from '../styles/Create.module.css' 

export default function CreatePage() {  
  return (
    <>
      <Head>
        <title>ArtBazzar</title>
        <meta name="description" content="Style Transfer NFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.boxDiv}>
        <button className={styles.selectBox}></button>
        <p className={styles.upload_reminder}>File types supported: JPG, JPEG, PNG, SVG</p>
        <button className={styles.selectBox}></button>
        <br/>

        
        <Link href="/creating"> 
          <button className={styles.createNow} >CLICK TO CREATE</button>
        </Link>
      </div>

      <div className={styles.divRight}>
        <button className={styles.tags}></button>

      </div>

    </>
  )
}