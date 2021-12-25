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
          <div className={styles.div3PartParent}>
            <div className={styles.div1}>
              <Image
                src={require('/public/outputImg.png')} // Route of the image file
                height={452} // Desired size with correct aspect ratio
                width={452} // Desired size with correct aspect ratio
                alt="Output Image"
              />
            </div>
            <div className={styles.div2}>
              {/* <br/> */}
              {/* <button className={styles.tags}></button><br/><br/> */}
              <p className='text-2xl'>Name</p>
              <input className={styles.theInput} type="text" placeholder="" ></input><br/><br/>
              <p className='text-2xl'>Tags</p>
              <input className={styles.theInput} type="text" placeholder="#Tags"></input><br/><br/>
              <p className='text-2xl'>Price /ETH</p>
              <input className={styles.theInput} type="text" placeholder="Amount"></input><br/><br/>
              <p className='text-2xl'>Fees</p>
              <p className='text-1xl'>todo</p>
              <p className='text-2xl'>Duration</p>
              <input className={styles.theInput} type="text" placeholder="6 mouths"></input><br/><br/>
            </div>
          </div>
          <p className='text-2xl'>Description</p>
          {/* //todo 从第一行开始输入 */}
          <input className={styles.descriptionInput} type="text" placeholder=""></input><br/><br/>

          <button className={styles.listOnBazaar} onClick={()=>{
            // todo 生成的图片上链生成NFT 并且加入市场(todo later)
          }}>LIST ON BAZAAR</button>
        </div>
      </div>

    </>
  )
}