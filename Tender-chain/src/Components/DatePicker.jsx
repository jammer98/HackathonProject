import React, { useEffect, useMemo, useRef, useState } from 'react'

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const CURRENT_YEAR = new Date().getFullYear()
const YEAR_RANGE_START = CURRENT_YEAR - 40
const YEAR_RANGE_END = CURRENT_YEAR + 40
const YEAR_OPTIONS = Array.from({ length: YEAR_RANGE_END - YEAR_RANGE_START + 1 }, (_, index) => YEAR_RANGE_START + index)

const padNumber = (value) => value.toString().padStart(2, '0')

const parseISODate = (value) => {
  if (!value) return null
  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) return null
  return new Date(year, month - 1, day)
}

const formatISODate = (date) => `${date.getFullYear()}-${padNumber(date.getMonth() + 1)}-${padNumber(date.getDate())}`

const formatDisplayDate = (value) => {
  const parsed = parseISODate(value)
  if (!parsed) return ''
  const day = padNumber(parsed.getDate())
  const month = MONTH_NAMES[parsed.getMonth()].slice(0, 3)
  const year = parsed.getFullYear()
  return `${day} ${month} ${year}`
}

const buildCalendar = (anchorDate) => {
  const year = anchorDate.getFullYear()
  const month = anchorDate.getMonth()
  const firstOfMonth = new Date(year, month, 1)
  const startOffset = firstOfMonth.getDay()
  const startDate = new Date(year, month, 1 - startOffset)
  return Array.from({ length: 42 }, (_, index) => {
    const current = new Date(startDate)
    current.setDate(startDate.getDate() + index)
    return current
  })
}

function DatePicker({ id, label, value, onChange, placeholder = 'Select date' }) {
  const referenceDate = useMemo(() => parseISODate(value) ?? new Date(), [value])
  const [isOpen, setIsOpen] = useState(false)
  const [visibleMonth, setVisibleMonth] = useState(referenceDate)
  const [isSelectingMonthYear, setIsSelectingMonthYear] = useState(false)
  const [selectionYear, setSelectionYear] = useState(referenceDate.getFullYear())
  const containerRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      setIsSelectingMonthYear(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (value) {
      const parsed = parseISODate(value)
      if (parsed) {
        setVisibleMonth(parsed)
      }
    }
  }, [value])

  useEffect(() => {
    if (isSelectingMonthYear) {
      setSelectionYear(visibleMonth.getFullYear())
    }
  }, [isSelectingMonthYear, visibleMonth])

  const days = useMemo(() => buildCalendar(visibleMonth), [visibleMonth])
  const selectedDate = parseISODate(value)
  const todayISO = formatISODate(new Date())

  const handleDayClick = (date) => {
    const isoValue = formatISODate(date)
    onChange?.(isoValue)
    setIsOpen(false)
  }

  const handleMonthChange = (direction) => {
    setVisibleMonth((prev) => {
      const next = new Date(prev)
      next.setMonth(prev.getMonth() + direction)
      return next
    })
  }

  const handleMonthSelect = (monthIndex) => {
    const next = new Date(visibleMonth)
    next.setFullYear(selectionYear, monthIndex, 1)
    setVisibleMonth(next)
    setIsSelectingMonthYear(false)
  }

  return (
    <div className="relative" ref={containerRef}>
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
        {label}
      </label>
      <button
        type="button"
        id={id}
        className="mt-2 flex w-full items-center justify-between rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-left text-neutral-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="text-sm text-neutral-200">{formatDisplayDate(value) || placeholder}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-4 w-4 text-neutral-500"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 12 12 15.75 15.75 12" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-2 w-full rounded-2xl border border-neutral-800 bg-neutral-900 p-4 shadow-[0_30px_90px_-60px_rgba(16,185,129,0.5)]">
          <div className="mb-4 flex items-center justify-between text-sm text-neutral-200">
            <button
              type="button"
              onClick={() => handleMonthChange(-1)}
              className={`inline-flex h-8 w-8 items-center justify-center rounded-xl border border-neutral-800 text-neutral-400 transition hover:border-neutral-700 hover:text-neutral-100 ${isSelectingMonthYear ? 'pointer-events-none opacity-40' : ''}`}
              aria-label="Previous month"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 19.5-7.5-7.5 7.5-7.5" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setIsSelectingMonthYear((previous) => !previous)}
              className="rounded-xl px-3 py-1 font-semibold text-neutral-100 transition hover:bg-neutral-800"
            >
              {`${MONTH_NAMES[visibleMonth.getMonth()]} ${visibleMonth.getFullYear()}`}
            </button>
            <button
              type="button"
              onClick={() => handleMonthChange(1)}
              className={`inline-flex h-8 w-8 items-center justify-center rounded-xl border border-neutral-800 text-neutral-400 transition hover:border-neutral-700 hover:text-neutral-100 ${isSelectingMonthYear ? 'pointer-events-none opacity-40' : ''}`}
              aria-label="Next month"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
          {isSelectingMonthYear ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3 text-xs text-neutral-400">
                <label htmlFor={`${id}-year`} className="uppercase tracking-wide">
                  Select Year
                </label>
                <select
                  id={`${id}-year`}
                  value={selectionYear}
                  onChange={(event) => setSelectionYear(Number(event.target.value))}
                  className="w-32 rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                >
                  {YEAR_OPTIONS.map((yearOption) => (
                    <option key={yearOption} value={yearOption}>
                      {yearOption}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                {MONTH_NAMES.map((monthName, monthIndex) => {
                  const isActive =
                    visibleMonth.getFullYear() === selectionYear && visibleMonth.getMonth() === monthIndex
                  return (
                    <button
                      key={monthName}
                      type="button"
                      onClick={() => handleMonthSelect(monthIndex)}
                      className={`rounded-2xl border px-3 py-2 transition ${
                        isActive
                          ? 'border-emerald-500/60 bg-emerald-500/15 text-emerald-200'
                          : 'border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:text-neutral-100'
                      }`}
                    >
                      {monthName.slice(0, 3)}
                    </button>
                  )
                })}
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-7 gap-2 text-center text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
                {WEEK_DAYS.map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>
              <div className="mt-2 grid grid-cols-7 gap-2 text-sm">
                {days.map((date) => {
                  const isoValue = formatISODate(date)
                  const isToday = isoValue === todayISO
                  const isSelected = selectedDate && isoValue === formatISODate(selectedDate)
                  const isCurrentMonth = date.getMonth() === visibleMonth.getMonth()

                  return (
                    <button
                      key={isoValue}
                      type="button"
                      onClick={() => handleDayClick(date)}
                      className={`flex h-9 w-full items-center justify-center rounded-xl border transition ${
                        isSelected
                          ? 'border-emerald-500/60 bg-emerald-500/20 text-emerald-200'
                          : isToday
                            ? 'border-neutral-700 bg-neutral-800 text-neutral-100'
                            : 'border-transparent text-neutral-400 hover:border-neutral-700 hover:text-neutral-100'
                      } ${isCurrentMonth ? '' : 'opacity-40'}`}
                    >
                      {date.getDate()}
                    </button>
                  )
                })}
              </div>
            </>
          )}
          <div className="mt-3 flex items-center justify-between text-xs text-neutral-500">
            <span>Selected: {formatDisplayDate(value) || 'None'}</span>
            <button
              type="button"
              onClick={() => {
                const today = formatISODate(new Date())
                onChange?.(today)
                setIsOpen(false)
              }}
              className="rounded-full border border-neutral-800 px-3 py-1 text-[11px] font-semibold text-neutral-400 transition hover:border-emerald-500/40 hover:text-emerald-300"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DatePicker