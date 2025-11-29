import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import DatePicker from '../componets/DatePicker.jsx'

const HEADER_STATS = [
  {
    id: 'active-tenders',
    label: 'Active Tenders',
    value: 2,
    helper: 'Currently open for bidding',
    trend: '+12% from last month',
    icon: 'document'
  },
  {
    id: 'total-bidders',
    label: 'Total Bidders',
    value: '156',
    helper: 'Registered bidders',
    trend: '+8% from last month',
    icon: 'users'
  },
  {
    id: 'completed',
    label: 'Completed',
    value: 1,
    helper: 'This quarter',
    trend: 'On track',
    icon: 'check'
  },
  {
    id: 'pending-review',
    label: 'Pending Review',
    value: 12,
    helper: 'Awaiting selection',
    trend: 'Resolve soon',
    icon: 'clock'
  }
]

const GOVERNMENT_METRICS = [
  { id: 'departments', label: 'Government Departments', value: '156' },
  { id: 'verified-bidders', label: 'Verified Bidders', value: '12,890+' },
  { id: 'awarded', label: 'Crore INR Awarded', value: '45,000+' },
  { id: 'integrity', label: 'Corruption Clearance', value: '100%' }
]

const BASE_TENDERS = [
  {
    id: 'metro-line',
    status: 'Active',
    title: 'Mumbai Metro Line 4 Extension',
    department: 'Ministry of Urban Development',
    description: 'Construction of 12.8 km elevated metro corridor from Wadala to Kasarvadavali.',
    parts: 2,
    budget: '₹11,50,00,000',
    deadline: '15 Mar',
    createdOn: '02 Jan 2025'
  },
  {
    id: 'nh48',
    status: 'Active',
    title: 'Delhi-Jaipur Highway Expansion',
    department: 'Ministry of Road Transport',
    description: 'Widening NH-48 from 4-lane to 8-lane between Delhi and Jaipur.',
    parts: 1,
    budget: '₹15,00,00,000',
    deadline: '01 Apr',
    createdOn: '24 Dec 2024'
  },
  {
    id: 'hospital-upgrade',
    status: 'Completed',
    title: 'Government Hospital Modernization',
    department: 'Ministry of Health',
    description: 'Complete renovation of district hospital with modern equipment.',
    parts: 1,
    budget: '₹4,00,00,000',
    deadline: '15 Feb',
    createdOn: '05 Oct 2024'
  }
]

const DEPARTMENTS = [
  'Ministry of Urban Development',
  'Ministry of Road Transport',
  'Ministry of Health',
  'Public Works Department',
  'Smart Cities Mission',
  'Renewable Energy Corporation'
]

const ICON_PATHS = {
  document: 'M9 2.25h6.75A2.25 2.25 0 0 1 18 4.5v15A2.25 2.25 0 0 1 15.75 21.75H8.25A2.25 2.25 0 0 1 6 19.5V6a3.75 3.75 0 0 1 3-3.75Zm0 0V6h6.75',
  users: 'M7.5 7.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm9 9.75a4.5 4.5 0 0 0-4.5-4.5h-6a4.5 4.5 0 0 0-4.5 4.5V18A3.75 3.75 0 0 0 5.25 21.75h13.5A3.75 3.75 0 0 0 21 18Z',
  check: 'm4.5 12 4.5 4.5L19.5 6',
  clock: 'M12 6v6l3 1.5',
  plus: 'M12 4.5v15m7.5-7.5h-15'
}

const createUniqueId = () => (globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : Math.random().toString(36).slice(2))

const formatCardDate = (value) => {
  if (!value) return 'Not set'
  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) return 'Not set'
  const parsed = new Date(year, month - 1, day)
  return parsed.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

const initialFormState = {
  name: '',
  description: '',
  department: '',
  bidDeadline: '',
  createdOn: new Date().toISOString().slice(0, 10),
  parts: [
    {
      id: createUniqueId(),
      label: 'Part 1',
      description: '',
      minCost: '',
      maxCost: '',
      minDays: '',
      maxDays: ''
    }
  ]
}

function GovernmentDashboard() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formState, setFormState] = useState(initialFormState)
  const [tenders, setTenders] = useState(BASE_TENDERS)
  const [activeTab, setActiveTab] = useState('my-tenders')

  const filteredTenders = useMemo(() => {
    if (activeTab === 'completed') {
      return tenders.filter((item) => item.status.toLowerCase() === 'completed')
    }
    if (activeTab === 'review') {
      return tenders.filter((item) => item.status.toLowerCase() === 'pending')
    }
    return tenders
  }, [activeTab, tenders])

  const resetForm = () => {
    setFormState({
      ...initialFormState,
      parts: initialFormState.parts.map((part, index) => ({
        ...part,
        id: createUniqueId(),
        label: `Part ${index + 1}`
      }))
    })
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    resetForm()
  }

  const handleFormChange = ({ target }) => {
    const { name, value } = target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (name, isoValue) => {
    setFormState((prev) => ({ ...prev, [name]: isoValue }))
  }

  const handlePartChange = (partId, field, value) => {
    setFormState((prev) => ({
      ...prev,
      parts: prev.parts.map((part) =>
        part.id === partId ? { ...part, [field]: value } : part
      )
    }))
  }

  const handleAddPart = () => {
    setFormState((prev) => ({
      ...prev,
      parts: [
        ...prev.parts,
        {
          id: createUniqueId(),
          label: `Part ${prev.parts.length + 1}`,
          description: '',
          minCost: '',
          maxCost: '',
          minDays: '',
          maxDays: ''
        }
      ]
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const newTender = {
      id: createUniqueId(),
      status: 'Pending',
      title: formState.name || 'Untitled Tender',
      department: formState.department || 'Unassigned Department',
      description: formState.description || 'No description provided.',
      parts: formState.parts.length,
      budget: 'TBD',
      deadline: formatCardDate(formState.bidDeadline),
      createdOn: (() => {
        const formatted = formatCardDate(formState.createdOn)
        if (formatted === 'Not set') {
          return formatCardDate(new Date().toISOString().slice(0, 10))
        }
        return formatted
      })()
    }

    setTenders((prev) => [newTender, ...prev])
    handleModalClose()
  }

  return (
    <div className="flex min-h-screen bg-neutral-950 text-neutral-100">
      <aside className="hidden w-72 flex-shrink-0 flex-col border-r border-neutral-900 bg-neutral-950/80 p-6 lg:flex">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mb-8 flex items-center gap-2 text-left text-2xl font-semibold text-green-400"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-lg font-bold text-green-300">
            TC
          </span>
          TenderChain
        </button>

        <nav className="space-y-1 text-sm font-medium text-neutral-400">
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-xl bg-neutral-900 px-4 py-3 text-neutral-100"
          >
            Government Officer
            <span className="rounded-full border border-emerald-500/50 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
              On Duty
            </span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2 transition hover:bg-neutral-900/50 hover:text-neutral-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d={ICON_PATHS.document} />
            </svg>
            Bidder Portal
          </button>
        </nav>

        <div className="mt-auto space-y-6 text-xs text-neutral-500">
          <div className="rounded-2xl border border-neutral-900 bg-neutral-900/70 p-4">
            <p className="text-sm font-semibold text-neutral-200">Blockchain Node</p>
            <p className="mt-2 font-mono text-[11px] text-emerald-300">0x1234...5678</p>
            <button
              type="button"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-800 px-3 py-2 text-xs font-semibold text-neutral-400 transition hover:border-neutral-700 hover:text-neutral-100"
            >
              View Ledger
            </button>
          </div>
          <p>Every tender issue and bid evaluation is stored on-chain for audit readiness.</p>
        </div>
      </aside>

      <main className="flex flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-neutral-900 bg-neutral-950/80 px-6 py-4 backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-800 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-neutral-400 transition hover:border-neutral-700 hover:text-neutral-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-3.5 w-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                  </svg>
                  Home
                </button>
                <span className="hidden h-1 w-1 rounded-full bg-neutral-700 lg:inline-flex" />
                <span>TenderChain India</span>
              </div>
              <h1 className="mt-2 text-3xl font-semibold text-neutral-50">Government Dashboard</h1>
              <p className="mt-1 text-sm text-neutral-400">Manage tenders, review bidder applications, and maintain transparent procurement.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
                </span>
                Blockchain Connected
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-emerald-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d={ICON_PATHS.plus} />
                </svg>
                Create Tender
              </button>
            </div>
          </div>
        </header>

        <div className="flex flex-col gap-8 px-4 py-6 sm:px-6 lg:px-10">
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {HEADER_STATS.map((stat) => (
              <article key={stat.id} className="rounded-3xl border border-neutral-900 bg-neutral-900/70 p-5 shadow-[0_30px_90px_-60px_rgba(16,185,129,0.4)]">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-neutral-500">{stat.label}</p>
                    <p className="mt-2 text-3xl font-semibold text-neutral-50">{stat.value}</p>
                  </div>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d={ICON_PATHS[stat.icon]} />
                    </svg>
                  </span>
                </div>
                <p className="mt-4 text-xs text-neutral-400">{stat.helper}</p>
                <p className="mt-2 text-[11px] font-medium text-emerald-400">{stat.trend}</p>
              </article>
            ))}
          </section>

          <section className="rounded-3xl border border-neutral-900 bg-neutral-900/60 p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 px-3 py-1 text-[11px] uppercase tracking-wider text-neutral-500">
                Government Overview
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-emerald-300">
                {GOVERNMENT_METRICS.map((metric) => (
                  <span key={metric.id} className="rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-[11px] font-semibold tracking-wide">
                    {metric.value} {metric.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {filteredTenders.map((tender) => (
                <article key={tender.id} className="flex h-full flex-col justify-between rounded-3xl border border-neutral-900 bg-neutral-950/60 p-5 transition hover:border-emerald-500/40 hover:bg-neutral-900/80">
                  <header className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-neutral-500">{tender.department}</p>
                      <h3 className="mt-2 text-lg font-semibold text-neutral-100">{tender.title}</h3>
                    </div>
                    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${
                      tender.status === 'Completed'
                        ? 'border-emerald-400/50 bg-emerald-400/10 text-emerald-200'
                        : tender.status === 'Pending'
                          ? 'border-amber-400/40 bg-amber-400/10 text-amber-200'
                          : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                    }`}>
                      {tender.status}
                    </span>
                  </header>
                  <p className="mt-3 text-sm text-neutral-400">{tender.description}</p>
                  <div className="mt-4 grid gap-2 text-[11px] text-neutral-400">
                    <span className="rounded-full border border-neutral-800 px-3 py-1">Parts {tender.parts}</span>
                    <span className="rounded-full border border-neutral-800 px-3 py-1">Budget {tender.budget}</span>
                    <span className="rounded-full border border-neutral-800 px-3 py-1">Deadline {tender.deadline}</span>
                    <span className="rounded-full border border-neutral-800 px-3 py-1">Created {tender.createdOn}</span>
                  </div>
                  <button
                    type="button"
                    className="mt-5 inline-flex items-center gap-2 self-start rounded-xl border border-neutral-800 px-3 py-2 text-xs font-semibold text-neutral-300 transition hover:border-emerald-500/60 hover:text-emerald-300"
                  >
                    View Details
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H10.5m9 0v9" />
                    </svg>
                  </button>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-neutral-900 bg-neutral-900/60 p-6">
            <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-400">
              <button
                type="button"
                onClick={() => setActiveTab('my-tenders')}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  activeTab === 'my-tenders'
                    ? 'bg-emerald-500 text-neutral-900 shadow-[0_10px_40px_rgba(16,185,129,0.25)]'
                    : 'border border-transparent hover:border-neutral-800 hover:text-neutral-100'
                }`}
              >
                My Tenders
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('review')}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  activeTab === 'review'
                    ? 'bg-emerald-500 text-neutral-900 shadow-[0_10px_40px_rgba(16,185,129,0.25)]'
                    : 'border border-transparent hover:border-neutral-800 hover:text-neutral-100'
                }`}
              >
                Bid Review
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('completed')}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  activeTab === 'completed'
                    ? 'bg-emerald-500 text-neutral-900 shadow-[0_10px_40px_rgba(16,185,129,0.25)]'
                    : 'border border-transparent hover:border-neutral-800 hover:text-neutral-100'
                }`}
              >
                Blockchain Log
              </button>
            </div>
            <div className="mt-6 rounded-3xl border border-neutral-900 bg-neutral-950/70 p-5 text-sm text-neutral-400">
              <p>Every tender transaction and evaluation decision is recorded on the blockchain for persistent audit trails accessible by authorized stakeholders.</p>
            </div>
          </section>
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-neutral-950/80 p-4 backdrop-blur">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-neutral-800 bg-neutral-900 p-6 shadow-[0_45px_120px_-50px_rgba(16,185,129,0.8)]">
            <header className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-neutral-100">Create New Tender</h2>
                <p className="mt-1 text-sm text-neutral-400">Fill in the details to create a new tender. All data will be stored on the blockchain.</p>
              </div>
              <button
                type="button"
                onClick={handleModalClose}
                className="rounded-full border border-neutral-700 p-2 text-neutral-500 transition hover:border-neutral-600 hover:text-neutral-100"
                aria-label="Close tender creation form"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6m0 12L6 6" />
                </svg>
              </button>
            </header>

            <form className="mt-6 space-y-6 text-sm" onSubmit={handleSubmit}>
              <section className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-950/50 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-neutral-200">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 text-emerald-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d={ICON_PATHS.document} />
                  </svg>
                  Tender Details
                </div>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="tender-name" className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                      Tender Name
                    </label>
                    <input
                      id="tender-name"
                      name="name"
                      value={formState.name}
                      onChange={handleFormChange}
                      placeholder="e.g., Mumbai Metro Line 4 Extension"
                      className="rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-neutral-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="tender-description" className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                      Description
                    </label>
                    <textarea
                      id="tender-description"
                      name="description"
                      value={formState.description}
                      onChange={handleFormChange}
                      placeholder="Detailed description of the tender..."
                      rows={4}
                      className="rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-neutral-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <label htmlFor="department" className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                        Department
                      </label>
                      <select
                        id="department"
                        name="department"
                        value={formState.department}
                        onChange={handleFormChange}
                        className="rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-neutral-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      >
                        <option value="" disabled>
                          Select department
                        </option>
                        {DEPARTMENTS.map((department) => (
                          <option key={department} value={department}>
                            {department}
                          </option>
                        ))}
                      </select>
                    </div>
                    <DatePicker
                      id="bidDeadline"
                      label="Bid Deadline"
                      value={formState.bidDeadline}
                      onChange={(isoValue) => handleDateChange('bidDeadline', isoValue)}
                    />
                  </div>
                  <DatePicker
                    id="createdOn"
                    label="Creation Date"
                    value={formState.createdOn}
                    onChange={(isoValue) => handleDateChange('createdOn', isoValue)}
                  />
                </div>
              </section>

              <section className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-950/50 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold text-neutral-200">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 text-emerald-300">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h18M3 9h18M3 13.5h18M3 18h18" />
                    </svg>
                    Tender Parts
                  </div>
                  <button
                    type="button"
                    onClick={handleAddPart}
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-800 px-3 py-1 text-xs font-semibold text-neutral-400 transition hover:border-emerald-500/40 hover:text-emerald-300"
                  >
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-300">+</span>
                    Add Part
                  </button>
                </div>
                {formState.parts.map((part) => (
                  <div key={part.id} className="rounded-2xl border border-neutral-800 bg-neutral-950/70 p-4">
                    <p className="text-sm font-semibold text-neutral-200">{part.label}</p>
                    <div className="mt-3 grid gap-3">
                      <textarea
                        placeholder="e.g., Civil Works, Electrical, Plumbing"
                        value={part.description}
                        onChange={(event) => handlePartChange(part.id, 'description', event.target.value)}
                        rows={2}
                        className="rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-neutral-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15"
                      />
                      <div className="grid gap-3 sm:grid-cols-2">
                        <input
                          placeholder="Min Cost"
                          value={part.minCost}
                          onChange={(event) => handlePartChange(part.id, 'minCost', event.target.value)}
                          className="rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-neutral-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15"
                        />
                        <input
                          placeholder="Max Cost"
                          value={part.maxCost}
                          onChange={(event) => handlePartChange(part.id, 'maxCost', event.target.value)}
                          className="rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-neutral-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15"
                        />
                        <input
                          placeholder="Min Days"
                          value={part.minDays}
                          onChange={(event) => handlePartChange(part.id, 'minDays', event.target.value)}
                          className="rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-neutral-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15"
                        />
                        <input
                          placeholder="Max Days"
                          value={part.maxDays}
                          onChange={(event) => handlePartChange(part.id, 'maxDays', event.target.value)}
                          className="rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-neutral-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </section>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="rounded-xl border border-neutral-800 px-4 py-2 text-sm font-semibold text-neutral-400 transition hover:border-neutral-700 hover:text-neutral-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-emerald-400"
                >
                  Create Tender
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default GovernmentDashboard
