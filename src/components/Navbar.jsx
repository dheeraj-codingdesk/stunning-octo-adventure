import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const { logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-800 shadow">
      <div className="flex gap-6 items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">DevLog</Link>
        <Link to="/" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600">Entries</Link>
        <Link to="/dashboard" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600">Dashboard</Link>
      </div>
      <div className="flex gap-3 items-center">
        <button
          onClick={toggleTheme}
          className="text-sm px-3 py-1 rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <button
          onClick={logout}
          className="text-sm px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}
