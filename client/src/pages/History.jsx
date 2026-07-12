import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { serverUrl } from '../App'
import { motion } from 'motion/react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from '../components/Sidebar';

function History() {
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.user)
  const credits = userData.credits
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [topics, setTopics] = useState([])
  useEffect(() => {
    const myNotes = async () => {
      try {
        const res = await axios.get(serverUrl + "/api/notes/getnotes", { withCredentials: true })
        console.log(res.data)
        setTopics(Array.isArray(res.data) ? res.data : [])

      } catch (error) {
        console.log(error)
      }
    }
    myNotes()
  }, [])

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-100 to-gray-100 px-6 py-8'>
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10
        rounded-2x1
        bg-black/80 backdrop-blur-x1
        border border-white/10
        px-8 py-6 items-start
       flex justify-between md:items-center gap-4 flex-wrap
       shadow-[0_20px_45px_rgba(0,0,0,0.6)]">

        <div onClick={() => navigate("/")} className='cursor-pointer'>
          <h1 className="text-2xl font-bold text-white">StudyWith AI</h1>
          <p className="text-sm text-gray-300 mt-2">AI-powered exam-oriented notes & revision</p>
        </div>

        <div className='flex items-center gap-4 flex-wrap'>

          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className='text-white text-2xl'> <GiHamburgerMenu /> </button>
          <button className='flex items-center gap-2
                px-4 py-2 rounded-full
                bg-black/40
                border border-zinc-700
                text-white text-sm' onClick={() => navigate("/Pricing")}>
            <span className='text-xl'>💠</span>
            <span>{credits}</span>
            <motion.span
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.97 }}
              className='ml-2 h-5 w-5 flex items-center justify-center rounded-full bg-white text-xs font-bold'
            >
              ➕
            </motion.span>
            </button>

        </div>

      </motion.header>
      {isSidebarOpen && <Sidebar setIsSidebarOpen={setIsSidebarOpen} />}
    </div>
  )
}

export default History
