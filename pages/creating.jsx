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
        <p className={styles.upload_reminder}></p>
        <button className={styles.selectBox}></button>
        <br/>

        {/* //todo: RESELECT */}
        <Link href="/todo RESELECT">
          <button className={styles.reselect} >RESELECT</button>
        </Link>
      </div>

      <div className={styles.divRight}>
        <button className={styles.tags}></button><br/><br/>
        <input className={styles.nameInput}></input><br/><br/>
        <input className={styles.tagsInput}></input><br/><br/>
        <input className={styles.priceInput}></input><br/><br/>
        <input className={styles.durationInput}></input><br/><br/>
        <input className={styles.descriptionInput}></input><br/><br/>
      </div>

    </>
  )
}