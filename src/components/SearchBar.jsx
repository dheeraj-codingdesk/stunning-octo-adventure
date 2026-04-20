import { useRef, useCallback } from 'react'

export default function SearchBar({ onSearch }) {
  const timerRef = useRef(null)

  const handleChange = useCallback(
    (e) => {
      clearTimeout(timerRef.current)
      const val = e.target.value
      timerRef.current = setTimeout(() => onSearch(val), 300)
    },
    [onSearch]
  )

  return (
    <input
      type="text"
      placeholder="Search entries..."
      onChange={handleChange}
      className="w-full border rounded-lg px-4 py-2 text-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  )
}
