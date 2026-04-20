import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import EntryCard from '../components/EntryCard'
import TagFilter from '../components/TagFilter'
import SearchBar from '../components/SearchBar'
import { useEntries } from '../hooks/useEntries'
import { useSearch } from '../hooks/useSearch'

export default function Home() {
  const { entries, loading } = useEntries()
  const { filtered, onSearch, activeTag, setActiveTag, allTags } = useSearch(entries)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Entries</h2>
          <button
            onClick={() => navigate('/new')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
          >
            + New Entry
          </button>
        </div>
        <SearchBar onSearch={onSearch} />
        <TagFilter tags={allTags} activeTag={activeTag} onSelect={setActiveTag} />
        {loading ? (
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No entries yet. Write your first one!</p>
        ) : (
          <div className="space-y-3">
            {filtered.map((entry) => (
              <EntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
