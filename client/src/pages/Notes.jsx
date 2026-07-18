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
    <div className='min-h-screen bg-ds-page font-body px-6 py-8'>
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}

        className="mb-10
       rounded-2xl
       bg-ds-page
       border border-ds-border
       shadow-sm
       px-8 py-5
       items-start
       flex md:items-center justify-between gap-4 flex-col md:flex-row">

        <div onClick={() => navigate("/")} className='cursor-pointer'>
          <h1 className="text-xl font-bold font-heading text-ds-text">Notely</h1>
          <p className="text-sm text-ds-text-sec mt-1">AI-powered exam-oriented notes & revision</p>
        </div>

        <div className='flex items-center gap-4 flex-wrap'>
          <button className='flex items-center gap-2
        px-4 py-2 rounded-full
        bg-ds-section
        border border-ds-border
        text-ds-text text-sm hover:bg-white transition-colors shadow-sm' onClick={() => navigate("/Pricing")}>
            <span className='text-lg text-ds-accent'><LuDiamond /></span>
            <span className='font-medium'>{credits}</span>
            <motion.span
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.97 }}
              className='ml-1 h-5 w-5 flex items-center justify-center rounded-full bg-ds-btn-sec-bg text-ds-btn-sec-text text-xs font-bold'
            >
              <LuPlus size={12} />
            </motion.span>

          </button>
          <button onClick={() => navigate("/History")}
            className='px-5 py-2.5 rounded-full
        text-sm font-semibold font-heading
        bg-ds-btn-sec-bg
        text-ds-btn-sec-text
        hover:bg-[#c7d6ff]
        transition-colors
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
          className="text-center text-ds-text font-medium mb-6">
          Generating exam-focused notes...
        </motion.div>
      )}

      {error && (
        <div
          className="mb-6 text-center text-ds-error font-medium">
          {error}
        </div>
      )}

      {!result && <motion.div
        whileHover={{ scale: 1.02 }}
        className="h-64
        rounded-2xl
       flex flex-col items-center justify-center
       bg-ds-section
       border border-dashed border-ds-border
       text-ds-text-sec">
        <span className="text-4xl mb-3 text-ds-accent"><LuPen /></span>
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
      bg-ds-page
      border border-ds-border
      shadow-sm
      p-6'>

          <FinalResult result={result.data} />
        </div>
      </motion.div>}
    </div>
  )
}

export default Notes