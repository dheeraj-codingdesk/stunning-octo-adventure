import { useMemo } from 'react'
import { toDateString } from '../utils/dateHelpers'

export function useStreak(entries) {
  const countByDate = useMemo(() => {
    const map = {}
    entries.forEach((e) => {
      const key = toDateString(e.createdAt)
      if (key) map[key] = (map[key] || 0) + 1
    })
    return map
  }, [entries])

  const { currentStreak, longestStreak } = useMemo(() => {
    const today = new Date()
    let current = 0
    let longest = 0
    let running = 0
    let checkDate = new Date(today)

    for (let i = 0; i < 365; i++) {
      const key = checkDate.toISOString().slice(0, 10)
      if (countByDate[key]) {
        running++
        if (i === 0 || i === current) current = running
        longest = Math.max(longest, running)
      } else {
        if (i < current + 1) current = running
        running = 0
      }
      checkDate.setDate(checkDate.getDate() - 1)
    }

    return { currentStreak: current, longestStreak: longest }
  }, [countByDate])

  return { countByDate, currentStreak, longestStreak }
}
