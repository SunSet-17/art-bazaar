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

      <div className={styles.divColParent}>
        <div className={styles.boxDiv, styles.divColLeft}>
          <button className={styles.selectBox}></button>
          <p className={styles.upload_reminder}></p>
          <button className={styles.selectBox}></button>
          <br/>

          {/* //todo: RESELECT */}
          <Link href="/todo RESELECT">
            <button className={styles.reselect} >RESELECT</button>
            {/* //todo 返回的图标 */}
          </Link>
        </div>

        <div className={styles.divColRight}>
          <div className='columns-2'>
            <Image
              src={require('/public/outputImg.png')} // Route of the image file
              height={452} // Desired size with correct aspect ratio
              width={452} // Desired size with correct aspect ratio
              alt="Output Img"
            />
            <div>
              <br/>
              {/* <button className={styles.tags}></button><br/><br/> */}
              <p>Name</p>
              <input className={styles.nameInput}></input><br/><br/>
              <p>Tags</p>
              <input className={styles.tagsInput}></input><br/><br/>
              <p>Price</p>
              <input className={styles.priceInput}></input><br/><br/>
              <p>Fees</p>
              <p>Duration</p>
              <input className={styles.durationInput}></input><br/><br/>
            </div>
          </div>
          <p>Description</p>
          <input className={styles.descriptionInput}></input><br/><br/>

          <button className={styles.listOnBazaar} onClick={()=>{
            // todo 生成的图片上链生成NFT 并且加入市场(todo later)
          }}>LIST ON BAZAAR</button>
        </div>
      </div>

    </>
  )
}