import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { serverUrl } from '../App'
import { AnimatePresence, motion } from 'motion/react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from '../components/Sidebar';
import FinalResult from '../components/FinalResult'
import { LuPlus, LuFolderOpen, LuZap, LuChartBar, LuTrendingUp, LuArrowLeft, LuDiamond } from 'react-icons/lu';

function History() {
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.user)
  const credits = userData.credits
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    return typeof window !== 'undefined' && window.innerWidth >= 1024
  })
  const [activeNoteID, setActiveNoteID] = useState(null);
  const [topics, setTopics] = useState([])
  const [selectedNote, setSelectedNote] = useState(null);
  const [loading, setloading] = useState(false);

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

  const openNotes = async (noteId) => {
    setloading(true)
    setActiveNoteID(noteId)
    try {
      const res = await axios.get(serverUrl + `/api/notes/${noteId}`, { withCredentials: true })
      setSelectedNote(res.data.content)
      setloading(false)
    } catch (error) {
      console.log(error)
      setloading(false)

    }
  }


  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className='min-h-screen bg-[#F7F4FC] font-[Inter] px-6 py-8'>
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10
        rounded-2xl
        bg-[#EDE9F9]
        border border-[#E4DEF3]
        px-8 py-6 items-start
       flex justify-between md:items-center gap-4 flex-wrap">

        <div onClick={() => navigate("/")} className='cursor-pointer'>
          <h1 className="text-2xl font-bold font-[Poppins] text-[#372F52]">Notely</h1>
          <p className="text-sm text-[#6B647F] mt-2">AI-powered exam-oriented notes & revision</p>
        </div>

        <div className='flex items-center gap-4 flex-wrap'>

          {!isSidebarOpen && <button onClick={() => setIsSidebarOpen(true)} className='lg:hidden text-[#372F52] text-2xl'> <GiHamburgerMenu /> </button>}
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

        </div>

      </motion.header>


      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
        <AnimatePresence>

          {(isSidebarOpen) &&
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className='fixed lg:static
            top-0 left-0 z-50 lg:z-auto
            w-90 lg:w-auto
            h-full lg:h-[75vh]
            lg:rounded-2xl
            lg:col-span-1
            bg-[#EDE9F9]
            border border-[#E4DEF3]
            p-5
            overflow-y-auto custom-scrollbar'>
              <button onClick={() => setIsSidebarOpen(false)}
                className='lg:hidden text-[#372F52] mb-4 flex items-center gap-2'>
                <LuArrowLeft /> Back
              </button>

              <div className='mb-4 space-y-11 text-start'>
                <button onClick={() => navigate("/notes")} className='w-full px-4 py-3 
                rounded-xl text-sm font-medium text-[#372F52] bg-[#B9AEE0] hover:bg-[#A79CD6]
                flex items-center gap-2'>
                  <span className='text-xl'><LuPlus /></span> New Notes
                </button>

                <hr className="border-[#E4DEF3] mb-4" />

                <h2 className='mb-4 text-lg font-[Poppins] font-bold text-[#372F52] flex items-center gap-2'>
                  <span className='text-xl text-[#A79CD6]'><LuFolderOpen /></span> Your Notes
                </h2>

                {topics.length === 0 && (
                  <p className="text-sm text-[#6B647F]"> No notes created yet</p>
                )}

                <ul className='space-y-4'>
                  {topics.map((t, i) => (
                    <li key={i} onClick={() => { openNotes(t._id) }}
                      className={`cursor-pointer rounded-xl p-3 border transition-all
                  ${activeNoteID === t._id
                          ? "bg-[#B9AEE0] border-[#A79CD6]"
                          : "bg-[#FBF9F6] border-[#E4DEF3] hover:bg-white"
                        }`}>

                      <p className='text-base font-bold text-[#372F52] mb-3'>{t.topic}</p>

                      <div className='flex flex-wrap gap-2 text-[11px] mb-3'>
                        {t.classLevel && <span className='px-2 py-1 rounded-md bg-[#F6DDE8] text-[#372F52]' >ClassLevel : {t.classLevel}</span>}
                        {t.examType && <span className='px-2 py-1 rounded-md bg-[#F6DDE8] text-[#372F52]'> {t.examType}</span>}
                      </div>

                      <div className='flex gap-3 text-xs text-[#6B647F] font-medium'>
                        {t.revisionMode && <span className='flex items-center gap-1'><LuZap /> Revision</span>}
                        {t.includeDiagram && <span className='flex items-center gap-1'><LuChartBar /> Diagram</span>}
                        {t.includeCharts && <span className='flex items-center gap-1'><LuTrendingUp /> Chart</span>}
                      </div>

                    </li>
                  ))}
                </ul>
              </div>

            </motion.div>}

        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='lg:col-span-3
        rounded-2xl bg-[#FBF9F6] border border-[#E4DEF3]
        p-6
        min-h-[75vh] relative overflow-hidden'>

          {loading && <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-medium">Loading notes...</div>}
          {!loading && !selectedNote && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">
              Select a topic from the Sidebar
            </div>
          )}
          {!loading && selectedNote && <FinalResult result={selectedNote} />}

        </motion.div>

      </div>

    </div>
  )
}

export default History
