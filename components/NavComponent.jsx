import React,{useState} from "react";
import styles from '../styles/global.module.css' 
import Link from 'next/link'
import Web3 from 'web3';

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
                    <div className="flex space-x-7">
                    <div>
                        {/* <!-- Website Logo --> */}
                        <div className="flex items-center py-4 px-2">
                            <svg className="fill-current h-8 w-8 mr-2" width="56" height="55" viewBox="0 0 56 55" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.3286 8.50221H40.5362V0H55.9999V36.9917H49.4892V14.361H18.3286V8.50221Z" fill="url(#paint0_linear_96_36)"/><path d="M8.60529 37.2221V15.2785H0V0H37.4402V6.43271H14.5351V37.2221H8.60529Z" fill="url(#paint1_linear_96_36)"/><path d="M37.6734 46.4978H15.4637V55H0V18.0083H6.51071V40.639H37.6734V46.4978Z" fill="url(#paint2_linear_96_36)"/><path d="M47.3968 17.7779V39.7215H56V55H18.5598V48.5673H41.467V17.7779H47.3968Z" fill="url(#paint3_linear_96_36)"/><defs><linearGradient id="paint0_linear_96_36" x1="18.3286" y1="18.4958" x2="55.9999" y2="18.4958" gradientUnits="userSpaceOnUse"><stop stopColor="#FFBF1E"/><stop offset="1" stopColor="#FDE4A0"/></linearGradient><linearGradient id="paint1_linear_96_36" x1="18.7201" y1="36.86" x2="18.7201" y2="-0.131658" gradientUnits="userSpaceOnUse"><stop stopColor="#AC54EA"/><stop offset="1" stopColor="#AA86D5"/></linearGradient><linearGradient id="paint2_linear_96_36" x1="6650.49" y1="6582.18" x2="-165.763" y2="6582.18" gradientUnits="userSpaceOnUse"><stop stopColor="#FFBF1E"/><stop offset="1" stopColor="#FDE4A0"/></linearGradient><linearGradient id="paint3_linear_96_36" x1="6722.23" y1="3568.02" x2="6722.23" y2="10261.3" gradientUnits="userSpaceOnUse"><stop stopColor="#AC54EA"/><stop offset="1" stopColor="#AA86D5"/></linearGradient></defs></svg>
                            {/* //todo: 改为引用svg */}
                            <Link href="/">
                            <a style={{textDecoration:'none'}} className="font-semibold text-white text-3xl mr-20">ArtBazzar</a>
                            </Link>
                        </div>
                    </div>

                    {/* <!-- Primary Navbar items --> */}
                    <div className="hidden md:flex items-center space-x-20">
                    <Link href="/"><a className="py-4 px-2 text-white font-semibold hover:text-white transition duration-300 ml-20">HOME</a></Link>
                    <Link href="/bazzar"><a className="py-4 px-2 text-white font-semibold hover:text-white transition duration-300">BAZZAR</a></Link>
                    <Link href="/create"><a className="py-4 px-2 text-white font-semibold hover:text-white transition duration-300">CREATE</a></Link>
                        {/* //todo: 所在的Tab显示按钮的特殊背景 */}
                    </div>

                    </div>

                    {/* <!-- Secondary Navbar items --> */}
                    <div className="hidden md:flex items-center space-x-1 ">
                    {/* <a href="" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300">Log In</a>
                    <a href="" className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">Sign Up</a> */}
                    <a href="#" className="inline-block font-medium px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-bg hover:bg-white mt-4 lg:mt-0" onClick={clickConnect}>{add}</a>
                    </div>

                    {/* <!-- Mobile menu button --> */}
                    <div className="md:hidden flex items-center">
                    {/* 菜单按钮 */}
                    <button onClick={()=>{document.querySelector(".mobile-menu").classList.toggle("hidden")}} className="outline-none mobile-menu-button">
                        <svg className=" w-6 h-6 text-white hover:text-slate-500 " x-show="!showMenu" fill="none" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                    </div>

                </div>
                </div>
                {/* <!-- mobile menu --> */}
                <div className="hidden mobile-menu">
                <ul className="">
                    <li className="active"><a href="index.html" className="block text-sm px-2 py-4 text-white bg-slate-900 font-semibold">HOME</a></li>
                    <li><a href="/bazzar" className="block text-sm text-white px-2 py-4 hover:bg-slate-900 transition duration-300 ">BAZZAR</a></li>
                    <li><a href="/create" className="block text-sm text-white px-2 py-4 hover:bg-slate-900 transition duration-300">CREATE</a></li>
                    <li><a href="#" className="inline-block font-medium px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-bg hover:bg-white mt-4 lg:mt-0">CONNECT WALLET</a></li>
                </ul>
                </div>
            </nav>
        </>
    )
}