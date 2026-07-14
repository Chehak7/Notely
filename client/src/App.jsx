import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/home.jsx'
import Auth from './pages/auth.jsx'
import History from './pages/History.jsx'
import Notes from './pages/Notes.jsx'
import Pricing from './pages/Pricing.jsx'
import { getCurrentUser } from './services/api'
import { useDispatch, useSelector } from 'react-redux'
export const serverUrl = "https://notelyserver.onrender.com"

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    getCurrentUser(dispatch)
  }, [dispatch])

  const { userData } = useSelector((state) => state.user)

  return (
    < >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={userData ? <Navigate to='/' replace /> : <Auth />} />
        <Route path='/history' element={userData ? <History /> : <Navigate to="/auth" replace />} />
        <Route path='/Notes' element={userData ? <Notes /> : <Navigate to='/' replace />} />
        <Route path='/Pricing' element={userData ? <Pricing /> : <Navigate to='/' replace />} />
      </Routes>
    </>
  )
}

export default App
