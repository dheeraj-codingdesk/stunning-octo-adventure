import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import NewEntry from './pages/NewEntry'
import EditEntry from './pages/EditEntry'
import Dashboard from './pages/Dashboard'

function Protected({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Protected><Home /></Protected>} />
        <Route path="/new" element={<Protected><NewEntry /></Protected>} />
        <Route path="/entry/:id" element={<Protected><EditEntry /></Protected>} />
        <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
      </Routes>
    </BrowserRouter>
  )
}
