import React, { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useDispatch, useSelector } from 'react-redux'
import logo from "../assets/logo.png"
import axios from 'axios'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'
import { LuDiamond, LuPlus, LuMenu, LuX } from 'react-icons/lu';

function Navbar() {
  const { userData } = useSelector((state) => state.user)
  const credits = userData?.credits ?? 100  //free credits for user - 100
  const [showCredits, setShowCredits] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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

  const AuthButtons = ({ isMobile }) => {
    if (!userData) {
      return (
        <a href="/auth" className={`text-sm font-semibold font-heading rounded-full border border-ds-border text-ds-text hover:bg-ds-section transition-colors shadow-sm ${isMobile ? 'block text-center w-full py-3' : 'px-6 py-2.5'}`}>
          Login
        </a>
      )
    }

    return (
      <div className={`flex ${isMobile ? 'flex-col' : 'items-center'} gap-3 w-full`}>
        {/* Credits button + dropdown wrapper */}
        <div className={`relative ${isMobile ? 'w-full' : ''}`}>
          <motion.div
            onClick={() => { setShowCredits(!showCredits); setShowProfile(false) }}
            whileHover={{ scale: 1.03 }}
            className={`flex cursor-pointer items-center justify-center gap-2 rounded-full border border-ds-border bg-ds-page text-sm text-ds-text transition-colors hover:bg-ds-section shadow-sm ${isMobile ? 'w-full py-3' : 'px-4 py-2'}`}
          >
            <span className='text-lg text-ds-accent'><LuDiamond /></span>
            <span className='font-medium'>{credits}</span>
            <motion.span
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.97 }}
              className='ml-1 h-5 w-5 flex items-center justify-center rounded-full bg-ds-btn-sec-bg text-ds-btn-sec-text text-xs font-bold'
            >
              <LuPlus size={12} />
            </motion.span>
          </motion.div>

          <AnimatePresence>
            {showCredits && !isMobile &&
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className='absolute top-full right-[-50px] mt-3 w-64
                  rounded-2xl bg-ds-page border border-ds-border
                  p-4 text-ds-text shadow-xl z-50'
              >
                <h4 className='font-semibold font-heading mb-2 text-ds-text'>Buy Credits</h4>
                <p className='text-sm text-ds-text-sec mb-4'>Use credits to generate AI notes, diagrams & PDFs.</p>
                <button onClick={() => {setShowCredits(false);navigate("/Pricing")}} 
                className='w-full py-2.5 rounded-full font-semibold font-heading text-sm text-white transition-all hover:opacity-90' 
                style={{ background: 'linear-gradient(135deg, #3B5FE3 0%, #5B7FFF 100%)', boxShadow: '0 4px 20px 0 rgba(59,95,227,0.35)' }}
                > Buy more Credits </button>
              </motion.div>
            }
          </AnimatePresence>
          
          {/* Mobile inline credits dropdown */}
          <AnimatePresence>
            {showCredits && isMobile &&
               <motion.div
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: 'auto' }}
                 exit={{ opacity: 0, height: 0 }}
                 className='w-full overflow-hidden mt-2'
               >
                 <div className='p-4 bg-ds-section rounded-2xl border border-ds-border'>
                    <h4 className='font-semibold font-heading mb-2 text-ds-text'>Buy Credits</h4>
                    <p className='text-sm text-ds-text-sec mb-4'>Use credits to generate AI notes, diagrams & PDFs.</p>
                    <button onClick={() => {setShowCredits(false);navigate("/Pricing"); setMobileMenuOpen(false);}} 
                    className='w-full py-2.5 rounded-full font-semibold font-heading text-sm text-white transition-all hover:opacity-90' 
                    style={{ background: 'linear-gradient(135deg, #3B5FE3 0%, #5B7FFF 100%)', boxShadow: '0 4px 20px 0 rgba(59,95,227,0.35)' }}
                    > Buy more Credits </button>
                 </div>
               </motion.div>
            }
          </AnimatePresence>
        </div>

        <div className={`relative ${isMobile ? 'w-full' : ''}`}>
          <motion.div
            onClick={() => { setShowProfile(!showProfile); setShowCredits(false) }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.97 }}
            className={`flex items-center justify-center rounded-full text-white text-sm font-bold font-heading cursor-pointer mx-auto ${isMobile ? 'w-12 h-12' : 'w-10 h-10'}`}
            style={{ background: 'linear-gradient(135deg, #3B5FE3 0%, #5B7FFF 100%)', boxShadow: '0 4px 20px 0 rgba(59,95,227,0.35)' }}>
            <span>{userData?.name.slice(0, 1).toUpperCase()}</span>
          </motion.div>
          
          <AnimatePresence>
            {showProfile && !isMobile &&
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 8, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className='absolute right-0 mt-3 w-56
                  rounded-2xl bg-ds-page border border-ds-border
                  p-3 text-ds-text shadow-xl z-50'
              >
                <MenuItem text="History" onClick={() => {setShowProfile(false);navigate("/history")}} />
                <div className="divider mx-3 my-2 border-t border-ds-border"></div>
                <MenuItem text="Sign Out" red onClick={handleSignOut} />
              </motion.div>
            }
          </AnimatePresence>
          
          {/* Mobile inline profile dropdown */}
          <AnimatePresence>
            {showProfile && isMobile &&
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className='w-full overflow-hidden mt-2'
              >
                 <div className='p-3 bg-ds-section rounded-2xl border border-ds-border'>
                    <MenuItem text="History" onClick={() => {setShowProfile(false);navigate("/history"); setMobileMenuOpen(false);}} />
                    <div className="mx-3 my-2 border-t border-ds-border"></div>
                    <MenuItem text="Sign Out" red onClick={handleSignOut} />
                 </div>
              </motion.div>
            }
          </AnimatePresence>
        </div>
      </div>
    )
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5 }}
      className="sticky top-0 z-50 w-full bg-ds-page border-b border-ds-border shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} alt="examnotes" className='w-10 h-10' />
          <span className="text-2xl font-bold font-heading text-ds-text">
            Notely
          </span>
        </div>
        
        {/* Desktop View */}
        <div className="hidden md:flex items-center gap-3 text-base text-ds-text-sec">
           <AuthButtons isMobile={false} />
        </div>
        
        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-ds-text text-2xl p-2 rounded-md hover:bg-ds-section transition-colors">
            {mobileMenuOpen ? <LuX /> : <LuMenu />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-ds-border bg-ds-page px-6 py-4 flex flex-col gap-4 overflow-hidden"
          >
            <AuthButtons isMobile={true} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

function MenuItem({ onClick, text, red }) {
  return (
    <div onClick={onClick}
      className={`w-full text-left px-4 py-2.5 text-sm font-medium
      transition-colors rounded-xl cursor-pointer
      ${red
          ? "text-ds-error hover:bg-red-50"
          : "text-ds-text-sec hover:bg-ds-section"
        }
    `}>
      {text}
    </div>
  )
}

export default Navbar
