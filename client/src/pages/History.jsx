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
    <div className='min-h-screen bg-ds-page font-body px-6 py-8'>
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10
        rounded-2xl
        bg-ds-page
        border border-ds-border
        shadow-sm
        px-8 py-5 items-start
       flex justify-between md:items-center gap-4 flex-wrap">

        <div onClick={() => navigate("/")} className='cursor-pointer'>
          <h1 className="text-xl font-bold font-heading text-ds-text">Notely</h1>
          <p className="text-sm text-ds-text-sec mt-1">AI-powered exam-oriented notes & revision</p>
        </div>

        <div className='flex items-center gap-4 flex-wrap'>

          {!isSidebarOpen && <button onClick={() => setIsSidebarOpen(true)} className='lg:hidden text-[#372F52] text-2xl'> <GiHamburgerMenu /> </button>}
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
            w-80 lg:w-auto
            h-full lg:h-[75vh]
            lg:rounded-[24px]
            lg:col-span-1
            bg-ds-section
            border border-ds-border
            p-5
            shadow-xl lg:shadow-none
            overflow-y-auto custom-scrollbar'>
              <button onClick={() => setIsSidebarOpen(false)}
                className='lg:hidden text-ds-text-sec hover:text-ds-text mb-6 flex items-center gap-2 transition-colors'>
                <LuArrowLeft /> Back
              </button>

              <div className='mb-4 space-y-6 text-start'>
                <button onClick={() => navigate("/notes")} className='w-full px-4 py-3.5 
                rounded-full text-sm font-semibold font-heading text-white
                flex justify-center items-center gap-2 transition-opacity hover:opacity-90 shadow-md'
                style={{ background: 'linear-gradient(135deg, #3B5FE3 0%, #5B7FFF 100%)', boxShadow: '0 4px 20px 0 rgba(59,95,227,0.35)' }}>
                  <span className='text-xl'><LuPlus /></span> New Notes
                </button>

                <h2 className='pt-2 text-xl font-heading font-bold text-ds-text flex items-center gap-2'>
                  <span className='text-ds-accent'><LuFolderOpen size={22} /></span> History
                </h2>

                {topics.length === 0 && (
                  <div className="flex flex-col items-center justify-center p-6 text-center mt-6">
                    <svg viewBox="0 0 200 200" className="w-24 h-24 mb-4 opacity-70" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="100" cy="100" r="80" fill="#FFFFFF" />
                      <rect x="70" y="60" width="60" height="80" rx="6" fill="#F8FAFC" stroke="#E5E7EB" strokeWidth="4" />
                      <path d="M85 90h30M85 110h30M85 130h15" stroke="#4ECDC4" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                    <p className="text-ds-text-sec text-sm font-medium">No notes created yet. Start learning!</p>
                  </div>
                )}

                <ul className='space-y-4'>
                  {topics.map((t, i) => (
                    <li key={i} onClick={() => { openNotes(t._id) }}
                      className={`cursor-pointer rounded-2xl p-4 transition-all border shadow-sm hover:shadow-md
                  ${activeNoteID === t._id
                          ? "bg-white border-ds-accent ring-1 ring-ds-accent"
                          : "bg-white border-ds-border hover:border-gray-300"
                        }`}>

                      <p className='text-base font-bold font-heading text-ds-text mb-3 leading-tight'>{t.topic}</p>

                      <div className='flex flex-wrap gap-2 text-xs mb-3 font-medium'>
                        {t.classLevel && <span className='px-2.5 py-1 rounded-md bg-ds-section border border-ds-border text-ds-text-sec'>Class: {t.classLevel}</span>}
                        {t.examType && <span className='px-2.5 py-1 rounded-md bg-ds-section border border-ds-border text-ds-text-sec'>{t.examType}</span>}
                      </div>

                      <div className='flex gap-3 text-xs text-ds-text-muted font-medium pt-1 border-t border-gray-100'>
                        {t.revisionMode && <span className='flex items-center gap-1 mt-2'><LuZap className="text-ds-accent" size={14} /> Revision</span>}
                        {t.includeDiagram && <span className='flex items-center gap-1 mt-2'><LuChartBar className="text-ds-accent" size={14} /> Diagram</span>}
                        {t.includeCharts && <span className='flex items-center gap-1 mt-2'><LuTrendingUp className="text-ds-accent" size={14} /> Chart</span>}
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
        rounded-[24px] bg-white border border-ds-border
        shadow-sm
        p-6 lg:p-8
        min-h-[75vh] relative overflow-hidden'>

          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-ds-accent font-medium">
              <svg className="animate-spin h-8 w-8 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading notes...
            </div>
          )}
          {!loading && !selectedNote && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-40 h-40 mb-4 opacity-50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M160.5 142.5C153.146 172.053 115.25 189.75 82 182.25C48.75 174.75 24.75 142.5 17.75 109.75C10.75 77 48.75 39.75 82 32.25C115.25 24.75 167.854 112.947 160.5 142.5Z" fill="#F8FAFC"/>
                <rect x="70" y="60" width="60" height="80" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="4"/>
                <circle cx="100" cy="100" r="12" fill="#4ECDC4" />
                <path d="M85 80h30" stroke="#E5E7EB" strokeWidth="4" strokeLinecap="round" />
              </svg>
              <p className="text-ds-text-sec text-lg font-medium font-heading">Select a topic from your history to view notes</p>
            </div>
          )}
          {!loading && selectedNote && <FinalResult result={selectedNote} />}

        </motion.div>

      </div>

    </div>
  )
}

export default History
