import React from 'react'
import { useNavigate } from 'react-router'

function LoginPage() {

    const navigate = useNavigate();
  return (
    <>
    <div className="top-0 z-50 sticky flex justify-between items-center p-2 w-full bg-neutral-900 border-b border-neutral-700">
        <button onClick={() => navigate("/")} className='flex justify-center items-center bg-neutral-900 hover:bg-neutral-800 p-2 rounded-xl cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="mr-3 size-5 text-green-400">
            <path strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          <span className='text-green-400'>Back To Home Page</span>
        </button>
      </div>
    <div className='bg-neutral-900 flex justify-center items-center w-full h-screen'>
            <p className='text-green-400 text-4xl '>Login Page</p>
    </div>
    </>
  )
}

export default LoginPage