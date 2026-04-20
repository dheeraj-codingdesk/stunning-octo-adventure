import Navbar from '../components/Navbar'
import StreakCalendar from '../components/StreakCalendar'
import WeeklyChart from '../components/WeeklyChart'
import { useEntries } from '../hooks/useEntries'
import { useStreak } from '../hooks/useStreak'

export default function Dashboard() {
  const { entries, loading } = useEntries()
  const { countByDate, currentStreak, longestStreak } = useStreak(entries)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
        <div className="flex gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">{currentStreak}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Current Streak</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">{longestStreak}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Longest Streak</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">{entries.length}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Entries</div>
          </div>
        </div>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Activity</h3>
              <StreakCalendar countByDate={countByDate} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Entries per Week</h3>
              <WeeklyChart countByDate={countByDate} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
