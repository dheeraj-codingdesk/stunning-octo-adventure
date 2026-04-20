import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useEntries } from '../hooks/useEntries'

export default function NewEntry() {
  const { addEntry } = useEntries()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState([])
  const titleRef = useRef(null)

  useEffect(() => { titleRef.current?.focus() }, [])

  function addTag(e) {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      const tag = tagInput.trim()
      if (!tags.includes(tag)) setTags([...tags, tag])
      setTagInput('')
    }
  }

  function removeTag(tag) {
    setTags(tags.filter((t) => t !== tag))
  }

  async function handleSave() {
    if (!title.trim()) return
    await addEntry({ title, body, tags })
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
        <input
          ref={titleRef}
          type="text"
          placeholder="Entry title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-2xl font-bold border-b pb-2 bg-transparent text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none"
        />
        <textarea
          placeholder="Write in markdown..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={16}
          className="w-full border rounded-lg p-3 text-sm font-mono bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span key={tag} className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                {tag}
                <button onClick={() => removeTag(tag)} className="hover:text-red-500">×</button>
              </span>
            ))}
          </div>
          <input
            type="text"
            placeholder="Add tag (press Enter)"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={addTag}
            className="border rounded px-3 py-1 text-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none"
          />
        </div>
        <div className="flex gap-3">
          <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Save</button>
          <button onClick={() => navigate('/')} className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Cancel</button>
        </div>
      </div>
    </div>
  )
}
