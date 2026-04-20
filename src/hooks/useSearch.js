import { useState, useMemo, useCallback } from 'react'

export function useSearch(entries) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTag, setActiveTag] = useState(null)

  const onSearch = useCallback((term) => {
    setSearchTerm(term)
  }, [])

  const filtered = useMemo(() => {
    let result = entries
    if (activeTag) {
      result = result.filter((e) => e.tags?.includes(activeTag))
    }
    if (searchTerm.trim()) {
      const lower = searchTerm.toLowerCase()
      result = result.filter(
        (e) =>
          e.title?.toLowerCase().includes(lower) ||
          e.body?.toLowerCase().includes(lower)
      )
    }
    return result
  }, [entries, searchTerm, activeTag])

  const allTags = useMemo(() => {
    const set = new Set()
    entries.forEach((e) => e.tags?.forEach((t) => set.add(t)))
    return [...set]
  }, [entries])

  return { filtered, onSearch, activeTag, setActiveTag, allTags, searchTerm }
}
