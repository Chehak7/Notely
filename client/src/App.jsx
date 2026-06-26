import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/home.jsx'
import Auth from './pages/auth.jsx'

export const serverUrl = "http://localhost:8000"
function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/auth' element={<Auth/>}/>
    </Routes>
    </>
  )
}

export default App
