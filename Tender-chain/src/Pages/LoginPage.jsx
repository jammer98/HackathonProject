import React, { useState } from 'react'
import { useNavigate } from 'react-router'

const ROLE_CONFIG = {
  government: {
    label: 'Government',
    actionLabel: 'Login as Government Official',
    demoHint: 'Demo: gov.officer@india.gov.in / demo123'
  },
  bidder: {
    label: 'Bidder',
    actionLabel: 'Login as Bidder',
    demoHint: 'Demo: bidder@enterprise.com / bid123'
  }
}

function LoginPage() {
  const navigate = useNavigate()
  const [activeRole, setActiveRole] = useState('government')

  return (
    <>
      <div className="top-0 z-50 sticky flex justify-between items-center p-3 w-full bg-neutral-950/90 border-b border-neutral-800 backdrop-blur">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm font-medium text-neutral-100 transition hover:border-neutral-600 hover:bg-neutral-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4 text-green-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          <span className="text-green-400">Back To Home Page</span>
        </button>
      </div>
      <main className="min-h-[calc(100vh-56px)] bg-neutral-950 text-neutral-100">
        <div className="mx-auto flex min-h-full max-w-6xl flex-col items-center justify-center px-4 py-16">
          <div className="mb-10 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-1.5 0h12a1.5 1.5 0 0 1 1.5 1.5v6.75a1.5 1.5 0 0 1-1.5 1.5h-12a1.5 1.5 0 0 1-1.5-1.5V12a1.5 1.5 0 0 1 1.5-1.5Z"
                />
              </svg>
              BlockTender
            </div>
            <h1 className="text-3xl font-semibold text-neutral-50 sm:text-4xl">Blockchain-Based Decentralized Tender System</h1>
            <p className="mt-3 text-base text-neutral-400">Transparent. Secure. Corruption-Free.</p>
          </div>

          <div className="w-full max-w-md rounded-3xl border border-neutral-800 bg-neutral-900/60 p-8 shadow-[0_30px_100px_-50px_rgba(0,0,0,0.8)]">
            <div className="mb-8 grid grid-cols-2 gap-1 rounded-xl border border-neutral-800 bg-neutral-950/80 p-1">
              {Object.entries(ROLE_CONFIG).map(([roleKey, { label }]) => {
                const isActive = activeRole === roleKey
                return (
                  <button
                    key={roleKey}
                    type="button"
                    onClick={() => setActiveRole(roleKey)}
                    className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? 'bg-neutral-800 text-neutral-50 shadow-inner'
                        : 'text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-100'
                    }`}
                  >
                    {roleKey === 'government' ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 9h18M4.5 19.5h15m-13.5 0V9m12 10.5V9m-6 10.5V9m-6 0 7.5-5.25L21 9"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 20.25a7.5 7.5 0 0 1 15 0"
                        />
                      </svg>
                    )}
                    {label}
                  </button>
                )
              })}
            </div>

            <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium text-neutral-300">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder={
                    activeRole === 'government' ? 'gov.officer@india.gov.in' : 'bidder@enterprise.com'
                  }
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 outline-none transition focus:border-green-400 focus:ring-2 focus:ring-green-500/20"
                  autoComplete="username"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-neutral-300">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder={activeRole === 'government' ? 'demo123' : 'bid123'}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 outline-none transition focus:border-green-400 focus:ring-2 focus:ring-green-500/20"
                  autoComplete="current-password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
              >
                {ROLE_CONFIG[activeRole].actionLabel}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-neutral-500">{ROLE_CONFIG[activeRole].demoHint}</p>
            <hr className="mt-8 border-neutral-800" />
            <p className="mt-4 text-center text-xs text-neutral-500">
              All transactions are recorded on the blockchain for complete transparency
            </p>
          </div>
        </div>
      </main>
    </>
  )
}

export default LoginPage