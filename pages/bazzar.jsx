import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/global.module.css' 

export default function BazzarPage() {
    return(
        <>
            <Head>
                <title>ArtBazzar</title>
                <meta name="description" content="Style Transfer NFT" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <p>Hello world!</p>
        </>
    )
}