import { last52Weeks } from '../utils/dateHelpers'

export default function StreakCalendar({ countByDate }) {
  const weeks = last52Weeks()
  const today = new Date().toISOString().slice(0, 10)

  function colorClass(count) {
    if (!count) return 'bg-gray-100 dark:bg-gray-700'
    if (count === 1) return 'bg-blue-200 dark:bg-blue-900'
    if (count === 2) return 'bg-blue-400'
    return 'bg-blue-600'
  }

  return (
    <div className="flex gap-1 overflow-x-auto pb-2">
      {weeks.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-1">
          {week.map((date) => (
            <div
              key={date}
              title={`${date}: ${countByDate[date] || 0} entries`}
              className={`w-3 h-3 rounded-sm ${colorClass(countByDate[date])} ${date === today ? 'ring-1 ring-blue-500' : ''}`}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
