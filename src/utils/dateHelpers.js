export function toDateString(timestamp) {
  if (!timestamp) return ''
  const d = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return d.toISOString().slice(0, 10)
}

export function last52Weeks() {
  const weeks = []
  const today = new Date()
  for (let i = 51; i >= 0; i--) {
    const week = []
    for (let d = 6; d >= 0; d--) {
      const date = new Date(today)
      date.setDate(today.getDate() - i * 7 - d)
      week.push(date.toISOString().slice(0, 10))
    }
    weeks.push(week)
  }
  return weeks
}

export function last8Weeks(countByDate) {
  const result = []
  const today = new Date()
  for (let i = 7; i >= 0; i--) {
    let count = 0
    for (let d = 0; d < 7; d++) {
      const date = new Date(today)
      date.setDate(today.getDate() - i * 7 - d)
      const key = date.toISOString().slice(0, 10)
      count += countByDate[key] || 0
    }
    const weekStart = new Date(today)
    weekStart.setDate(today.getDate() - i * 7 - 6)
    result.push({ week: weekStart.toISOString().slice(0, 10), count })
  }
  return result
}
