import React,{useState} from "react";
import styles from '../styles/global.module.css' 
import Link from 'next/link'
import Image from 'next/image'
import Web3 from 'web3';
import icon_svg from '../public/icon.svg'

export default function NavComponent({page, login, address}) {

    // todo: 按照所在的Tab显示按钮的特殊背景

    var address = "";
    var web3;
    const [add, setAdd] = useState("Connect Wallet");

    const clickConnect = async () => {
        // this.setState({step: 3});  // to confirm page..
        console.log(localStorage.getItem("address"));
        if (!await ethEnabled()) {
            alert("Wallet connecting operation abort");
        }
        address = await web3.eth.getAccounts(); 
        if(address.length > 0){
          localStorage.setItem("address", address[0]);
          setAdd(address[0].substring(0, 10) + "...");
        }
        // const balance = await web3.eth.getBalance(this.address);
        // console.log('blance: ' + balance/1e18);
    }

    const ethEnabled = async () => {
        if (typeof window.ethereum !== 'undefined') {
            // Instance web3 with the provided information from the MetaMask provider information
            web3 = new Web3(window.ethereum);
            try {
                // Request account access
                await window.ethereum.enable();
                return true
            } catch (e) {
                // User denied access
                return false
            }
        }
        return false;
    }

    return (
        <>
            <nav className="shadow-lg">
                <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between">
                    <div>
                        {/* <!-- Website Logo --> */}
                        <div className="flex items-center py-2 px-4 my-2">
                            <div className="fill-current h-8 w-8 mr-2">
                                <Image src={icon_svg} alt='Icon of Art Bazaar'></Image>
                            </div>
                            <Link href="/" passHref>
                            <button style={{textDecoration:'none', fontFamily:"Apple LiGothic"}} className="text-white text-3xl">ArtBazaar</button>
                            </Link>
                        </div>
                    </div>

                    {/* <!-- Primary Navbar items --> */}
                    <div className="hidden md:flex items-center space-x-20">
                    <Link href="/" passHref>
                        <button style={{fontFamily:"Apple LiGothic"}} 
                            className="py-2 px-4 my-2 text-white text-xl rounded-md 
                            hover:border-transparent hover:bg-purple-900 transition duration-300">
                                HOME
                        </button>
                    </Link>
                    <Link href="/bazzar" passHref>
                        <button style={{fontFamily:"Apple LiGothic"}} 
                            className="py-2 px-4 my-2 text-white text-xl rounded-md 
                            hover:border-transparent hover:bg-purple-900 transition duration-300">
                                BAZAAR
                        </button>
                    </Link>
                    <Link href="/create" passHref>
                        <button style={{fontFamily:"Apple LiGothic"}} 
                            className="py-2 px-4 my-2 text-white text-xl rounded-md 
                            hover:border-transparent hover:bg-purple-900 transition duration-300">
                                CREATE
                        </button>
                    </Link>
                    </div>


                    {/* <!-- Secondary Navbar items --> */}
                    <div className="hidden md:flex items-center space-x-1 ">
                    <button href="#" 
                        className="inline-block font-medium px-4 py-2 leading-none border rounded-lg text-white border-white 
                            hover:border-transparent hover:text-bg hover:bg-white  transition duration-300" 
                        onClick={clickConnect}> 
                            {add} {/* The address */}
                    </button>
                    </div>

                    {/* <!-- Mobile menu button --> */}
                    <div className="md:hidden flex items-center">
                    {/* 菜单按钮 */}
                    <button onClick={()=>{document.querySelector(".mobile-menu").classList.toggle("hidden")}} className="outline-none mobile-menu-button">
                        <svg className=" w-6 h-6 text-white hover:text-slate-500 " x-show="!showMenu" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                    </div>

                </div>
                </div>
                {/* <!-- mobile menu --> */}
                <div className="hidden mobile-menu">
                <ul className="">
                {/* li className="active" */}
                    <li><Link href="/" passHref><button style={{fontFamily:"Apple LiGothic"}} 
                        className="block text-sm px-4 w-full text-left py-4 text-white 
                        hover:bg-slate-900 transition duration-300 font-semibold">
                            HOME
                    </button></Link></li>
                    <li><Link href="/bazzar" passHref><button style={{fontFamily:"Apple LiGothic"}} 
                        className="block text-sm px-4 w-full text-left py-4 text-white 
                        hover:bg-slate-900 transition duration-300 font-semibold">
                            BAZZAR
                    </button></Link></li>
                    <li><Link href="/create" passHref><button style={{fontFamily:"Apple LiGothic"}} 
                        className="block text-sm px-4 w-full text-left py-4 text-white 
                        hover:bg-slate-900 transition duration-300 font-semibold">
                            CREATE
                    </button></Link></li>
                    <li><button style={{fontFamily:"Apple LiGothic"}} 
                        className="inline-block font-medium px-4 py-2 leading-none border rounded-lg text-white border-white 
                            hover:border-transparent hover:text-bg hover:bg-white mt-4 lg:mt-0" 
                        onClick={clickConnect}> 
                            {add} {/* The address */}
                    </button></li>
                </ul>
                </div>
            </nav>
        </>
    )
}