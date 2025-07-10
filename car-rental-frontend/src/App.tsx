import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import Upload from './components/Upload'
import { authService } from './services/authService'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated())
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          isAuthenticated ? <Navigate to="/upload" replace /> : <Navigate to="/login" replace />
        } 
      />
      <Route 
        path="/login" 
        element={
          isAuthenticated ? <Navigate to="/upload" replace /> : <Login setIsAuthenticated={setIsAuthenticated} />
        } 
      />
      <Route 
        path="/register" 
        element={
          isAuthenticated ? <Navigate to="/upload" replace /> : <Register />
        } 
      />
      <Route 
        path="/upload" 
        element={
          isAuthenticated ? <Upload setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" replace />
        } 
      />
    </Routes>
  )
}

export default App