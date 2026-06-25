import {Routes, Route} from 'react-router-dom'
import Home from './pages/home.jsx'
import Auth from './pages/auth.jsx'
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
