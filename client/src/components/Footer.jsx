import React from 'react'
import { motion } from "motion/react"
import logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import axios from 'axios'
import { serverUrl } from '../App'

function Footer() {
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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='z-10 mx-6 mb-6 mt-24
            rounded-2xl
            border border-ds-border
            px-8 py-8'
            style={{ background: 'linear-gradient(135deg, #4B5563 0%, #1F2937 100%)' }}>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 items-start'>
                    <motion.div 
                    className="flex flex-col gap-4">
                        <div className="flex items-center gap-3 cursor-pointer">
                            <img src={logo} alt="logo" className='h-9 w-9 object-contain '/>
                            <span className="
                            text-2xl font-[Poppins] font-bold text-white">
                                Notely
                            </span>
                        </div>
                        <p className="text-sm text-[#9CA3AF] max-w-sm">Notely helps students generate exam-focused notes,
                             revision material, diagrams and printable PDFs using AI. </p>

                    </motion.div>
                    <div className='text-center'>
                        <h1 className='text-sm font-[Poppins] font-bold text-white mb-4'>Quick Links</h1> 
                        <ul className='space-y-2 text-sm'>
                            <li onClick={() => navigate("/Notes")} className='text-[#9CA3AF] hover:text-ds-accent cursor-pointer transition-colors'>
                                Notes
                            </li>
                            <li onClick={() => navigate("/history")} className='text-[#9CA3AF] hover:text-ds-accent cursor-pointer transition-colors'>
                                History
                            </li>
                            <li onClick={() => navigate("/Pricing")} className='text-[#9CA3AF] hover:text-ds-accent cursor-pointer transition-colors'>
                                Add Credits
                            </li>
                        </ul>
                    </div>
                    <div className='text-center'>
                        <h1 className='text-sm font-[Poppins] font-bold text-white mb-4'>Quick Links</h1> 
                        <ul className='space-y-2 text-sm'>
                            <li onClick={() => navigate("/auth")} className='text-[#9CA3AF] hover:text-ds-accent cursor-pointer transition-colors'>
                                SignIn
                            </li>
                            <li onClick={handleSignOut} className='text-ds-error hover:text-[#dc2626] cursor-pointer transition-colors'>
                                SignOut
                            </li>
                            <li className='text-[#9CA3AF] hover:text-ds-accent cursor-pointer transition-colors'>
                                Support Email: info@notely.com
                            </li>
                        </ul>
                    </div>

                </div>
                <div className="my-6 h-px bg-[#374151]">
                   <p className='text-center text-xs text-[#6B7280] mt-6'>
                     &copy; {new Date().getFullYear()} Notely. All rights reserved.
                     </p> 
                </div>

        </motion.div>
    )
}

export default Footer
