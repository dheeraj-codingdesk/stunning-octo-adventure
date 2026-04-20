export default function TagFilter({ tags, activeTag, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={`text-xs px-3 py-1 rounded-full border ${
          activeTag === null
            ? 'bg-blue-600 text-white border-blue-600'
            : 'text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onSelect(tag)}
          className={`text-xs px-3 py-1 rounded-full border ${
            activeTag === tag
              ? 'bg-blue-600 text-white border-blue-600'
              : 'text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
