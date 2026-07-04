import React from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Topicform from '../components/Topicform'
import { useState } from 'react'

function Notes() {
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.user)
  const credits = userData.credits
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState("")
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-100 to-gray-100 px-6 py-8'>
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}

        className="mb-10
       rounded-2xl
       bg-black/80 backdrop-blur-xl
       border border-white/10
       px-8 py-6
       shadow-[0_20px_45px_rgba(0,0,0,0.6)] items-start
       flex md:items-center justify-between gap-4 flex-col md:flex-row">

        <div onClick={() => navigate("/")} className='cursor-pointer'>
          <h1 className="text-2xl font-bold
       bg-linear-to-r from-pink-500 via-fuchsia-500 to-purple-500
       bg-clip-text text-transparent">StudyWithAI</h1>
          <p className="text-sm text-white/100 mt-2">A platform to enhance your learning experience with AI-powered tools and resources.</p>
        </div>

        <div className='flex items-center gap-4 flex-wrap'>
          <button className='flex items-center gap-2
        px-4 py-2 rounded-full
        bg-white/10
        border border-white/20
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
          <button onClick={() => navigate("/History")}
            className='px-4 py-3 rounded-full
        text-sm font-medium
        bg-white/10
        border border-white/20
        text-white
        hover:bg-white/20
        transition
        flex-items-center gap-2'>
            🗒️ Your Notes

          </button>
        </div>

      </motion.header>

      <motion.div
        className="mb-12">
        <Topicform loading={loading} setResult={setResult} setLoading={setLoading} setError={setError} />
      </motion.div>

     <motion.div 
     whileHover={ { scale: 1.02 }}
     className="h-64
        rounded-2xl
       flex flex-col items-center justify-center
       bg-white/60 backdrop-blur-lg
       border border-dashed border-gray-300
       text-gray-500
       shadow-inner">
        <span className = "text-4xl mb-3">📝</span>
        <p className = "text-sm">
          Generated Notes will appear here.
        </p>

     </motion.div>
    </div>
  )
}

export default Notes