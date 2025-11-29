import React from 'react'
import { useNavigate } from 'react-router'

function Home() {
    const navigate = useNavigate();

    return (
        <div className='h-screen w-full bg-neutral-900'>
            {/* Navbar */}
            <nav className='bg-neutral-900 text-white flex justify-between items-center py-4 fixed top-0 left-0 w-full z-10 px-8'>
                <a href='/' className='flex items-center gap-2'>
                    <h1 className='text-2xl font-["Montserrat"] font-semibold tracking-tight text-green-400'>Tender-Chain</h1>
                </a>

                <div className='flex justify-center items-center gap-8'>
                    <button className='rounded-xl text-green-400 flex justify-center items-center gap-3 px-7 py-2 cursor-pointer transition-all duration-200 hover:text-neutral-900 font-semibold border-2 border-green-400 hover:bg-green-400'>
                        <svg xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth="1.5" 
                            stroke="currentColor" 
                            className="w-5 h-5">
                            <path strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                        <p>Login</p>
                    </button>
                    <button className='rounded-xl bg-green-400 text-neutral-900 px-7 py-2 cursor-pointer hover:bg-green-300 transition-all duration-200 font-semibold'>Register</button>
                </div>
            </nav>

            {/* Hero Section */}
            <div className='flex flex-col justify-center items-center w-full h-full pt-20'>
                <div className='bg-green-400 w-full flex flex-col justify-center items-center py-20 px-4'>
                    <div className='text-center'>
                        <h1 className='text-6xl font-bold text-neutral-900 font-["Playfair_Display"] tracking-tight'>Tender on Chain <br /> Is The New Name</h1>
                        <p className='text-neutral-800 mt-6 text-xl font-["Montserrat"] tracking-normal font-semibold'>Blockchain-powered decentralized tender system ensuring fair allocation,<br /> transparent processes, and complete accountability in government procurement.</p>
                    </div>
                </div>

                <div className='w-full flex justify-center items-center mt-20 px-4'>
                    <button onClick={ () => window.open("https://sepolia.etherscan.io/address/0x0cf5ffb83022f9c5a2b7417fea77e6c1009d79e6#code", "_blank") } class="inline-flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 mt-2 px-4 py-2 rounded-full cursor-pointer">
                        <span class="relative flex w-3 h-3">
                        <span class="inline-flex absolute bg-green-500 opacity-100 rounded-full w-full h-full animate-ping"></span>
                        <span class="inline-flex relative bg-green-400 rounded-full w-3 h-3"></span>
                        </span>
                        <span class="font-medium text-green-400 ">Blockchain Network Active</span>
                    </button>
                </div>
            </div>


        </div>
    )
}

export default Home