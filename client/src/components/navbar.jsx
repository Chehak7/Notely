import React, { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useDispatch, useSelector } from 'react-redux'
import logo from "../assets/logo.png"
import axios from 'axios'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'
import { LuDiamond, LuPlus } from 'react-icons/lu';
function Navbar() {
  const { userData } = useSelector((state) => state.user)
  const credits = userData?.credits ?? 100  //free credits for user - 100
  const [showCredits, setShowCredits] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSignOut = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
      dispatch(setUserData(null))
      navigate("/auth")
    } catch (error) {
      console.log(error)

    }
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5 }}
      className="relative z-20 mx-6 mt-6 rounded-2xl bg-[#EDE9F9] border border-[#E4DEF3]"
    >
      <div className="flex items-center justify-between px-4 sm:px-8 py-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt="examnotes" className='w-14 h-14' />
          <span className="text-2xl font-bold font-[Poppins] text-[#372F52]">
            StudyWith <span className="text-[#6B647F]"> AI </span>
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 text-base text-[#6B647F]">
          <a href="/auth" className="transition hover:text-[#A79CD6] text-lg font-medium">Login</a>

          {/* Credits button + dropdown wrapper */}

          <div className="relative">

            <motion.div
              onClick={() => { setShowCredits(!showCredits); setShowProfile(false) }}
              whileHover={{ scale: 1.05 }}
              className='flex cursor-pointer items-center gap-2 rounded-xl border border-[#E4DEF3] bg-[#FBF9F6] px-4 py-2 text-sm text-[#372F52] transition-colors hover:bg-white'
            >
              <span className='text-xl text-[#B9AEE0]'><LuDiamond /></span>
              <span>{credits}</span>
              <motion.span
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.97 }}
                className='ml-2 h-5 w-5 flex items-center justify-center rounded-full bg-[#B9AEE0] text-[#372F52] text-xs font-bold'
              >
                <LuPlus size={12} />
              </motion.span>
            </motion.div>

            <AnimatePresence>
              {showCredits &&
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className='absolute top-full right-[-50px] mt-2 w-64
                    rounded-2xl
                    bg-[#FBF9F6]
                    border border-[#E4DEF3]
                    p-4 text-[#372F52]'
                >
                  <h4 className='font-semibold font-[Poppins] mb-2'>Buy Credits </h4>
                  <p className='text-sm text-[#6B647F] mb-4'>Use credits to generate AI notes, diagram & PDFs.</p>
                  <button onClick={() => {setShowCredits(false);navigate("/Pricing")}} 
                  className='w-full py-2 rounded-xl 
                  bg-[#B9AEE0]
                  text-[#372F52] font-semibold
                  hover:bg-[#A79CD6]'
                  > Buy more Credits </button>

                </motion.div>
              }
            </AnimatePresence>
          </div>

          <div className="relative">

            <motion.div
              onClick={() => { setShowProfile(!showProfile); setShowCredits(false) }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.97 }}
              className='flex items-center justify-center gap-1
              px-4 py-2 rounded-xl
              bg-[#FBF9F6]
              border border-[#E4DEF3]
              text-[#372F52] text-sm
              cursor-pointer hover:bg-white'>
              <span className='text-lg font-bold'>{userData?.name.slice(0, 1).toUpperCase()}</span>

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
                    bg-[#FBF9F6]
                    border border-[#E4DEF3]
                    p-4 text-[#372F52]'
                >
                  <MenuItem text="History" onClick={() => {setShowProfile(false);navigate("/history")}} />
                  <div className="h-px bg-[#E4DEF3] mx-3 my-2"></div>
                  <MenuItem text="sign out" red onClick={handleSignOut} />


                </motion.div>
              }
            </AnimatePresence>


          </div>


        </div>
      </div>
    </motion.nav>
  )
}

function MenuItem({ onClick, text, red }) {
  return (
    <div onClick={onClick}
      className={`w-full text-left px-5 py-3 text-sm font-medium
      transition-colors rounded-xl cursor-pointer
      ${red
          ? "text-[#C07B9F] hover:bg-[#C07B9F]/10"
          : "text-[#6B647F] hover:bg-[#E4DEF3]/50"
        }
    `}>
      {text}
    </div>

  )
}



export default Navbar
