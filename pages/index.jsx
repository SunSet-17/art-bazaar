import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>ArtBazaar</title>
        <meta name="description" content="Style Transfer NFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='flex justify-center'>
        <img className='mt-12' src='Homepage.svg' ></img>
      </div>

      

      {/* {styles.description} */}
      {/* <p className=' '>FINE BAZAAR FOR <br/>
        ARTIST, CREATOR <br/>
        AND COLLECTOR.</p>

      <Link href="/create">
        <button className={styles.toCreate} >TO CREATE</button>
      </Link> */}

      {/* <object className={styles.twoDesigner} src="/public/svg/Designer_Two.svg" type="image/svg+xml" /> */}

        {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  )
}
