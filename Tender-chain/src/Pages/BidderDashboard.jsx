import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'

const NAVIGATION = [
  {
    title: 'Navigation',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'grid', path: '/dashboard' },
      { id: 'browse', label: 'Browse Tenders', icon: 'wallet', path: '/dashboard' },
      { id: 'bids', label: 'My Bids', icon: 'document', path: '/dashboard' },
      { id: 'profile', label: 'My Profile', icon: 'user', path: '/dashboard' }
    ]
  },
  {
    title: 'System',
    items: [{ id: 'settings', label: 'Settings', icon: 'settings', path: '/dashboard' }]
  }
]

const METRICS = [
  {
    id: 'active-bids',
    label: 'Active Bids',
    value: 8,
    change: '+2 this week',
    icon: 'document'
  },
  {
    id: 'won-projects',
    label: 'Won Projects',
    value: 0,
    change: 'Pending award',
    icon: 'trophy'
  },
  {
    id: 'success-rate',
    label: 'Success Rate',
    value: '0%',
    change: 'Build proposal strength',
    icon: 'trending'
  },
  {
    id: 'rating',
    label: 'Rating',
    value: 0,
    change: 'New bidder status',
    icon: 'star'
  }
]

const TAB_DEFINITIONS = [
  { id: 'available', label: 'Available Tenders' },
  { id: 'my-bids', label: 'My Bids' },
  { id: 'awarded', label: 'Awarded' }
]

const TENDER_DATA = {
  available: [
    {
      id: 'tender-1',
      status: 'Open',
      title: 'Road Construction - National Highway 48',
      agency: 'Public Works Department',
      deadline: 'Closes in 6 days',
      budget: '₹48 Cr',
      summary: '4-lane expansion including smart tolling integration.',
      tags: ['EPC Contract', 'Smart Tolling', 'Highway']
    },
    {
      id: 'tender-2',
      status: 'Open',
      title: 'Smart City Surveillance System',
      agency: 'Ministry of Electronics & IT',
      deadline: 'Closes in 9 days',
      budget: '₹27 Cr',
      summary: 'City-wide command center with AI-enabled monitoring.',
      tags: ['IoT', 'Command Center']
    },
    {
      id: 'tender-3',
      status: 'Open',
      title: 'Solar Microgrid Deployment - Eastern Region',
      agency: 'Renewable Energy Corporation',
      deadline: 'Closes in 12 days',
      budget: '₹32 Cr',
      summary: 'Hybrid storage-backed microgrids for remote districts.',
      tags: ['Solar', 'Microgrid', 'Energy Storage']
    }
  ],
  'my-bids': [
    {
      id: 'tender-4',
      status: 'Evaluating',
      title: 'Rural Broadband - Phase III',
      agency: 'Digital India Mission',
      deadline: 'Submitted 4 days ago',
      budget: '₹21 Cr',
      summary: 'Fiber backbone with last-mile wireless delivery.',
      tags: ['Telecom', 'Fiber', 'Wireless']
    },
    {
      id: 'tender-5',
      status: 'Clarification',
      title: 'Water Treatment Plant Upgrade',
      agency: 'Urban Utilities Board',
      deadline: 'Client requested clarifications',
      budget: '₹15 Cr',
      summary: 'Membrane filtration retrofit for existing facility.',
      tags: ['Water', 'Infrastructure']
    }
  ],
  awarded: [
    {
      id: 'tender-6',
      status: 'Awarded',
      title: 'Metro Rail Signaling Modernization',
      agency: 'Metro Rail Corporation',
      deadline: 'Awarded 3 months ago',
      budget: '₹58 Cr',
      summary: 'CBTC-based signaling and operations center upgrade.',
      tags: ['Rail', 'Automation']
    }
  ]
}

const ACTIVITY_FEED = [
  {
    id: 'activity-1',
    title: 'Bid Submitted',
    detail: 'You submitted a proposal for Rural Broadband - Phase III.',
    timestamp: '2 hours ago'
  },
  {
    id: 'activity-2',
    title: 'Clarification Requested',
    detail: 'Urban Utilities Board asked for pricing breakdown.',
    timestamp: '1 day ago'
  },
  {
    id: 'activity-3',
    title: 'Document Uploaded',
    detail: 'Updated financial guarantees for solar microgrid tender.',
    timestamp: '2 days ago'
  }
]

const PERFORMANCE_HINTS = [
  'Strengthen technical scoring for infrastructure tenders.',
  'Highlight consortium partners in your executive summary.',
  'Reuse the risk mitigation template across all bids.'
]

function iconPath(name) {
  switch (name) {
    case 'grid':
      return 'M3.75 3.75h5.25v5.25H3.75zm10.5 0H19.5v5.25h-5.25zm-10.5 10.5h5.25V19.5H3.75zm10.5 0H19.5V19.5h-5.25z'
    case 'wallet':
      return 'M3.75 7.5A2.25 2.25 0 0 1 6 5.25h12a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 16.5zm12.75 4.125a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z'
    case 'document':
      return 'M9 2.25h6.75a2.25 2.25 0 0 1 2.25 2.25v15a2.25 2.25 0 0 1-2.25 2.25H8.25A2.25 2.25 0 0 1 6 19.5V5.25A3 3 0 0 1 9 2.25Zm0 0V5.25h6.75'
    case 'user':
      return 'M15.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25c0-3.728 3.022-6.75 6.75-6.75s6.75 3.022 6.75 6.75'
    case 'settings':
      return 'M10.343 3.94c.09-.542.56-.94 1.11-.94s1.02.398 1.11.94l.149.894a1.125 1.125 0 0 0 1.217.917l.902-.15a1.125 1.125 0 0 1 1.27.864l.149.894c.09.542.56.94 1.11.94s1.02-.398 1.11-.94l.149-.894a1.125 1.125 0 0 1 1.218-.918l.902.15c.621.103 1.04.68.864 1.27l-.201.697a9.09 9.09 0 0 1 0 4.21l.201.697c.176.59-.243 1.167-.864 1.27l-.902.15a1.125 1.125 0 0 1-1.218-.918l-.149-.894a1.125 1.125 0 0 0-1.27-.864l-.902.15a1.125 1.125 0 0 1-1.218-.918l-.149-.894c-.09-.542-.56-.94-1.11-.94s-1.02.398-1.11.94l-.149.894a1.125 1.125 0 0 1-1.217.917l-.902-.15a1.125 1.125 0 0 0-1.27.864l-.149.894a1.125 1.125 0 0 1-1.218.918l-.902-.15c-.621-.103-1.04-.68-.864-1.27l.201-.697a9.09 9.09 0 0 1 0-4.21l-.201-.697c-.176-.59.243-1.167.864-1.27l.902-.15a1.125 1.125 0 0 1 1.218.918l.149.894a1.125 1.125 0 0 0 1.27.864l.902-.15a1.125 1.125 0 0 1 1.218.918l.149.894c.09.542.56.94 1.11.94s1.02-.398 1.11-.94l.149-.894a1.125 1.125 0 0 1 1.217-.917l.902.15a1.125 1.125 0 0 0 1.27-.864l.149-.894a1.125 1.125 0 0 0-1.27-.864l-.902.15a1.125 1.125 0 0 1-1.217-.918Z'
    case 'trophy':
      return 'M7.5 4.5v1.125A3.375 3.375 0 0 1 10.875 9h2.25A3.375 3.375 0 0 1 16.5 5.625V4.5m0 0H7.5m9 0H21v1.125a3.375 3.375 0 0 1-3.375 3.375H16.5a4.5 4.5 0 0 1-3 4.243v2.032A3.375 3.375 0 0 0 16.875 19.5H18a1.125 1.125 0 0 1 0 2.25H6a1.125 1.125 0 0 1 0-2.25h1.125A3.375 3.375 0 0 0 10.5 15.75v-2.032a4.5 4.5 0 0 1-3-4.243H6.375A3.375 3.375 0 0 1 3 5.625V4.5h5.25'
    case 'trending':
      return 'M3 16.5 9.75 9l3.75 3.75L21 6'
    case 'star':
      return 'M11.48 3.499a.875.875 0 0 1 1.04 0l2.445 1.777a.875.875 0 0 0 .513.165h3.024c.765 0 1.08.98.464 1.427l-2.447 1.777a.875.875 0 0 0-.317.981l.934 2.872c.237.73-.602 1.334-1.23.888l-2.445-1.777a.875.875 0 0 0-1.027 0l-2.445 1.777c-.629.446-1.467-.157-1.23-.888l.934-2.872a.875.875 0 0 0-.317-.981L4.534 6.868c-.616-.447-.302-1.427.463-1.427h3.025a.875.875 0 0 0 .513-.165z'
    default:
      return ''
  }
}

function BidderDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('available')
  const [activeNav, setActiveNav] = useState('dashboard')

  const tenders = useMemo(() => TENDER_DATA[activeTab] ?? [], [activeTab])

  return (
    <div className="flex min-h-screen bg-neutral-950 text-neutral-100">
      <aside className="hidden w-72 flex-shrink-0 flex-col border-r border-neutral-900 bg-neutral-950/80 p-6 lg:flex">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mb-8 flex items-center gap-2 text-left text-2xl font-semibold text-green-400"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-lg font-bold text-green-300">
            BT
          </span>
          BlockTender
        </button>

        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-400/40 bg-green-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-300">
          <span className="inline-flex h-2 w-2 rounded-full bg-green-400" />
          Bidder Portal
        </div>

        <nav className="space-y-8 text-sm font-medium">
          {NAVIGATION.map((section) => (
            <div key={section.title}>
              <p className="mb-3 text-xs uppercase tracking-wide text-neutral-500">{section.title}</p>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = activeNav === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveNav(item.id)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 transition ${
                        isActive
                          ? 'bg-neutral-900 text-neutral-100'
                          : 'text-neutral-400 hover:bg-neutral-900/50 hover:text-neutral-100'
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="h-5 w-5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d={iconPath(item.icon)} />
                      </svg>
                      {item.label}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="mt-auto space-y-4">
          <div className="rounded-2xl border border-neutral-900 bg-neutral-900/60 p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-500/10 text-lg font-semibold text-green-300">
                I
              </span>
              <div>
                <p className="text-sm font-semibold text-neutral-200">incnn</p>
                <p className="text-xs text-neutral-500">Contractor</p>
              </div>
            </div>
            <button
              type="button"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-800 px-3 py-2 text-xs font-medium text-neutral-400 transition hover:border-neutral-700 hover:text-neutral-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25m0 0-3.75 3.75m3.75-3.75 3.75 3.75M20.25 14.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-3.75" />
              </svg>
              Logout
            </button>
          </div>
          <p className="text-xs text-neutral-600">All activities are cryptographically logged on-chain.</p>
        </div>
      </aside>

      <main className="flex flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-neutral-900 bg-neutral-950/80 px-6 py-4 backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3 text-sm text-neutral-400">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-800 px-2 py-1 text-xs font-semibold text-neutral-400 transition hover:border-neutral-700 hover:text-neutral-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-3.5 w-3.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                  </svg>
                  Home
                </button>
                <span className="hidden h-1 w-1 rounded-full bg-neutral-700 lg:inline-flex" />
                <span className="text-neutral-500">Bidder Portal</span>
              </div>
              <h1 className="mt-2 text-2xl font-semibold text-neutral-50 sm:text-3xl">Bidder Dashboard</h1>
              <p className="mt-1 text-sm text-neutral-400">Discover opportunities and track your tender performance in real time.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-300">
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-300" />
                </span>
                Blockchain Connected
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs font-medium text-neutral-300 transition hover:border-neutral-700 hover:text-neutral-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l3 1.5" />
                </svg>
                Sync Activity
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-10">
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {METRICS.map((metric) => (
              <article
                key={metric.id}
                className="rounded-3xl border border-neutral-900 bg-neutral-900/70 p-5 shadow-[0_25px_80px_-60px_rgba(0,0,0,0.9)]"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-neutral-500">{metric.label}</p>
                    <p className="mt-3 text-3xl font-semibold text-neutral-50">
                      {typeof metric.value === 'number' ? metric.value : metric.value}
                    </p>
                  </div>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-green-500/10 text-green-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="h-5 w-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={iconPath(metric.icon)} />
                    </svg>
                  </span>
                </div>
                <p className="mt-5 text-xs text-neutral-500">{metric.change}</p>
              </article>
            ))}
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="rounded-3xl border border-neutral-900 bg-neutral-900/60 p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="inline-flex items-center gap-1 rounded-full border border-neutral-800 px-2 py-1 text-[11px] uppercase tracking-wide text-neutral-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Tender Opportunities
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {TAB_DEFINITIONS.map((tab) => {
                    const isActive = tab.id === activeTab
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                          isActive
                            ? 'bg-emerald-500 text-neutral-900 shadow-[0_8px_30px_rgba(16,185,129,0.25)]'
                            : 'border border-transparent text-neutral-400 hover:border-neutral-700 hover:text-neutral-100'
                        }`}
                      >
                        {tab.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative w-full sm:max-w-xs">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600">
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
                          d="M21 21l-4.35-4.35M9.75 17.25A7.5 7.5 0 1 1 17.25 9.75 7.5 7.5 0 0 1 9.75 17.25Z"
                        />
                      </svg>
                    </span>
                    <input
                      type="search"
                      placeholder="Search tenders"
                      className="w-full rounded-2xl border border-neutral-800 bg-neutral-950 px-10 py-3 text-xs text-neutral-200 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                  <div className="flex gap-2 text-xs text-neutral-500">
                    <span className="rounded-full border border-neutral-800 px-3 py-2">
                      0 Parts
                    </span>
                    <span className="rounded-full border border-neutral-800 px-3 py-2">
                      0 Bids
                    </span>
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                  {tenders.map((tender) => (
                    <article
                      key={tender.id}
                      className="flex h-full flex-col justify-between rounded-3xl border border-neutral-900 bg-neutral-950/60 p-5 transition hover:border-emerald-500/40 hover:bg-neutral-900/80"
                    >
                      <header className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[11px] uppercase tracking-wide text-neutral-500">{tender.agency}</p>
                          <h3 className="mt-2 text-lg font-semibold text-neutral-100">{tender.title}</h3>
                        </div>
                        <span className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
                          {tender.status}
                        </span>
                      </header>
                      <p className="mt-3 text-sm text-neutral-400">{tender.summary}</p>
                      <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-neutral-400">
                        <span className="rounded-full border border-neutral-800 px-3 py-1">{tender.deadline}</span>
                        <span className="rounded-full border border-neutral-800 px-3 py-1">Budget {tender.budget}</span>
                        {tender.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-neutral-800 px-3 py-1">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button
                        type="button"
                        className="mt-5 inline-flex items-center gap-2 self-start rounded-xl border border-neutral-800 px-3 py-2 text-xs font-semibold text-neutral-300 transition hover:border-emerald-500/60 hover:text-emerald-300"
                      >
                        View Details
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H10.5m9 0v9" />
                        </svg>
                      </button>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <aside className="flex flex-col gap-6">
              <div className="rounded-3xl border border-neutral-900 bg-neutral-900/60 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-neutral-200">Recent Activity</h2>
                  <span className="text-[11px] text-neutral-500">Last sync 10 mins ago</span>
                </div>
                <ul className="mt-4 space-y-4 text-xs text-neutral-400">
                  {ACTIVITY_FEED.map((activity) => (
                    <li key={activity.id} className="rounded-2xl border border-neutral-900 bg-neutral-950/60 p-3">
                      <p className="text-sm font-semibold text-neutral-200">{activity.title}</p>
                      <p className="mt-2 text-neutral-400">{activity.detail}</p>
                      <p className="mt-2 text-[10px] uppercase tracking-wide text-neutral-500">{activity.timestamp}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-neutral-900 bg-neutral-900/60 p-6">
                <h2 className="text-sm font-semibold text-neutral-200">Performance Insights</h2>
                <p className="mt-2 text-xs text-neutral-500">AI-assist recommendations for upcoming submissions.</p>
                <ul className="mt-4 space-y-3 text-sm text-neutral-300">
                  {PERFORMANCE_HINTS.map((hint) => (
                    <li key={hint} className="flex gap-2 rounded-2xl border border-neutral-900 bg-neutral-950/50 p-3">
                      <span className="mt-1 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-emerald-400" />
                      <span>{hint}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-300 transition hover:border-emerald-400/60 hover:bg-emerald-500/15"
                >
                  Download Bid Checklist
                </button>
              </div>
            </aside>
          </section>
        </div>
      </main>
    </div>
  )
}

export default BidderDashboard
