import { useEffect, useState } from 'react'
import { db } from '../services/firebase'
import { useAuth } from '../context/AuthContext'
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore'

export function useEntries() {
  const { user } = useAuth()
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    const q = query(
      collection(db, 'users', user.uid, 'entries'),
      orderBy('createdAt', 'desc')
    )
    const unsub = onSnapshot(q, (snap) => {
      setEntries(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      setLoading(false)
    })
    return unsub
  }, [user])

  async function addEntry({ title, body, tags }) {
    if (!user) throw new Error('Not authenticated')
    return addDoc(collection(db, 'users', user.uid, 'entries'), {
      title,
      body,
      tags,
      createdAt: serverTimestamp(),
    })
  }

  async function updateEntry(id, { title, body, tags }) {
    await updateDoc(doc(db, 'users', user.uid, 'entries', id), {
      title,
      body,
      tags,
    })
  }

  async function removeEntry(id) {
    await deleteDoc(doc(db, 'users', user.uid, 'entries', id))
  }

  return { entries, loading, addEntry, updateEntry, removeEntry }
}
