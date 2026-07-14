import React from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Topicform from '../components/Topicform'
import { useState } from 'react'
import FinalResult from '../components/FinalResult'
import Sidebar from '../components/Sidebar'
import { LuFileText, LuPlus, LuPen, LuDiamond } from 'react-icons/lu';

function Notes() {
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.user)
  const credits = userData.credits
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState("")
  return (
    <div className='min-h-screen bg-[#F7F4FC] font-[Inter] px-6 py-8'>
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}

        className="mb-10
       rounded-2xl
       bg-[#EDE9F9]
       border border-[#E4DEF3]
       px-8 py-6
       items-start
       flex md:items-center justify-between gap-4 flex-col md:flex-row">

        <div onClick={() => navigate("/")} className='cursor-pointer'>
          <h1 className="text-2xl font-bold font-[Poppins] text-[#372F52]">StudyWith AI</h1>
          <p className="text-sm text-[#6B647F] mt-2">AI-powered exam-oriented notes & revision</p>
        </div>

        <div className='flex items-center gap-4 flex-wrap'>
          <button className='flex items-center gap-2
        px-4 py-2 rounded-xl
        bg-[#FBF9F6]
        border border-[#E4DEF3]
        text-[#372F52] text-sm' onClick={() => navigate("/Pricing")}>
            <span className='text-xl text-[#B9AEE0]'><LuDiamond /></span>
            <span>{credits}</span>
            <motion.span
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.97 }}
              className='ml-2 h-5 w-5 flex items-center justify-center rounded-full bg-[#B9AEE0] text-[#372F52] text-xs font-bold'
            >
              <LuPlus size={12} />
            </motion.span>

          </button>
          <button onClick={() => navigate("/History")}
            className='px-4 py-3 rounded-xl
        text-sm font-medium
        bg-[#B9AEE0]
        border border-[#E4DEF3]
        text-[#372F52]
        hover:bg-[#A79CD6]
        transition
        flex flex-row items-center gap-2'>
            <LuFileText /> Your Notes

          </button>
        </div>

      </motion.header>

      <motion.div
        className="mb-12">
        <Topicform loading={loading} setResult={setResult} setLoading={setLoading} setError={setError} />
      </motion.div>

      {loading && (
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="text-center text-[#372F52] font-medium mb-6">
          Generating exam-focused notes...
        </motion.div>
      )}

      {error && (
        <div
          className="mb-6 text-center text-red-600 font-medium">
          {error}
        </div>
      )}

      {!result && <motion.div
        whileHover={{ scale: 1.02 }}
        className="h-64
        rounded-2xl
       flex flex-col items-center justify-center
       bg-[#FBF9F6]
       border border-dashed border-[#E4DEF3]
       text-[#6B647F]
       shadow-none">
        <span className="text-4xl mb-3 text-[#B9AEE0]"><LuPen /></span>
        <p className="text-sm">
          Generated Notes will appear here.
        </p>

      </motion.div>}

      {result && <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className='flex flex-col
     lg:grid lg:grid-cols-4
     gap-6'>
        <div className='lg:col-span-1'>
          <Sidebar result={result.data} />
        </div>

        <div className='lg:col-span-3
      rounded-2xl
      bg-[#FBF9F6]
      border border-[#E4DEF3]
      p-6'>

          <FinalResult result={result.data} />
        </div>
      </motion.div>}
    </div>
  )
}

export default Notes