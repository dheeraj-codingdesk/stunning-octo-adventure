import { useNavigate } from 'react-router-dom'

export default function EntryCard({ entry }) {
  const navigate = useNavigate()
  const date = entry.createdAt?.toDate
    ? entry.createdAt.toDate().toLocaleDateString()
    : ''

  return (
    <div
      onClick={() => navigate(`/entry/${entry.id}`)}
      className="cursor-pointer p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition"
    >
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-gray-900 dark:text-white">{entry.title}</h3>
        <span className="text-xs text-gray-400">{date}</span>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{entry.body}</p>
      <div className="flex flex-wrap gap-1 mt-2">
        {entry.tags?.map((tag) => (
          <span key={tag} className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-0.5 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
