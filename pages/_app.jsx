import '../styles/globals.css' 
import styles from '../styles/global.module.css' 
import Link from 'next/link'
import NavComponent from '../components/NavComponent'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      
      {/* <nav className="flex items-center justify-between flex-wrap p-4">
        <p className={`${styles.Logo} text-4xl font-bold`}>ArtBazzar</p>

        <div className="flex mt-20 ">
          <Link href="/">
            <a className="mr-4 text-pink-500">
              Home
            </a>
          </Link>
          <Link href="/bazzar">
            <a className="mr-6 text-pink-500">
              Bazzar
            </a>
          </Link>
          <Link href="/create">
            <a className="mr-6 text-pink-500">
              Create
            </a>
          </Link>
        </div>
      </nav> */}
      
       {/*--- The Navigator ---*/}
      <NavComponent/>
      
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
