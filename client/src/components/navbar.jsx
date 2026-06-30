import React , {useState} from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useSelector } from 'react-redux'
import logo from "../assets/logo.png"

function Navbar() {
  const { userData } = useSelector((state) => state.user)
  const credits = userData?.credits ?? 100  //free credits for user - 100
  const [showCredits,setShowCredits] = useState(false)
  const [showProfile,setShowProfile] = useState(false)

  return (
    <motion.nav
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5 }}
      className="relative z-20 mx-6 mt-6 rounded-2xl bg-gradient-to-br from-black/90 via-black/80 to-black/90 backdrop-blur-2xl border border-white/10 shadow-[0_22px_55px_rgba(0,0,0,0.75)]"
    >
      <div className="flex items-center justify-between px-4 sm:px-8 py-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt="examnotes" className='w-14 h-14' />
          <span className="hidden sm:inline text-xl font-semibold text-white">StudyWithAI</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 text-base text-gray-200">
          <a href="/auth" className="transition hover:text-pink-400 text-lg font-medium">Login</a>
          
          {/* Credits button + dropdown wrapper */}
          
          <div className="relative">

            <motion.div
              onClick={() => {setShowCredits(!showCredits);setShowProfile(false)}}
              whileHover={{ scale: 1.05, backgroundColor: '#ec4899', color: '#fff' }}
              className='flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white shadow-md transition-colors'
            >
              <span className='text-xl'>💠</span>
              <span>{credits}</span>
              <motion.span
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.97 }}
                className='ml-2 h-5 w-5 flex items-center justify-center rounded-full bg-white text-xs font-bold'
              >
                ➕
              </motion.span>
            </motion.div>

            <AnimatePresence>
              {showCredits &&
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className='absolute top-full right-0 mt-2 w-64
                    rounded-2xl
                    bg-black/90 backdrop-blur-xl
                    border border-white/10
                    shadow-[0_25px_60px_rgba(0,0,0,0.7)]
                    p-4 text-white'
                >
                  <h4 className='font semibold mb-2'>Buy Credits </h4>
                  <p className='text-sm text-gray-300 mb-4'>Use credits to generate AI notes,diagram & PDFs.</p>
                <button onClick={() => setShowCredits(false)} className='w-full py-2 rounded-lg 
                  bg-gradient-to-br from-white to-gray-200
                  text-black font-semibold
                  hover:opacity-90'
                > Buy more Credits </button>

                </motion.div>
              }
            </AnimatePresence>
          </div>

          <div className="relative">

            <motion.div
              onClick={() => {setShowProfile(!showProfile);setShowCredits(false)}}
              whileHover={{ scale: 1.1}}
              whileTap={{scale:0.97}}
              className='flex items-center justify-center gap-1
              px-4 py-2 rounded-full
              bg-white/10
              border border-white/20
              text-white text-sm
              shadow-md
              cursor-pointer '>
              <span className='text-lg'>{userData?.name.slice(0,1).toUpperCase()}</span>
              
            </motion.div>
            <AnimatePresence>
              {showProfile &&
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 10, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className='absolute right-0 mt-4 w-64
                    rounded-2xl
                    bg-black/90 backdrop-blur-xl
                    border border-white/10
                    shadow-[0_25px_60px_rgba(0,0,0,0.7)]
                    p-4 text-white'
                >
          

                </motion.div>
              }
            </AnimatePresence>

            
          </div>


        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
