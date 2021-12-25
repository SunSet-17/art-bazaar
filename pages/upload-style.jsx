import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
// import styles from '../styles/global.module.css' 
import styles from '../styles/Create.module.css' 
import StyleGrid from '../components/StyleGrid';

export default function CreatePage() {  
  return (
    <>
      <Head>
        <title>ArtBazzar</title>
        <meta name="description" content="Style Transfer NFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.divColParent}>
        <div className={styles.boxDiv, styles.divColLeft}>
          {/* 用来 upload your style picture 的按钮 */}
          <button className={styles.selectBox}  ></button>
          <p className={styles.textUnderStyle}>Rain is falling all around, It falls on field and tree, It rains on the umbrella here. And on the ships at sea. Rain is falling all around, It falls on field and tree, It rains on the umbrella here. And on the ships at sea. </p>
          <br/>

          
          <Link href="/creating"> 
            <button className={styles.createNow} >UPLOAD STYLE</button>
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