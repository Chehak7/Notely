import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/Footer'
import { AnimatePresence, motion } from 'motion/react'
import img from "../assets/img1.png"
import { useNavigate } from 'react-router-dom'
import { LuBook, LuFolder, LuChartBar, LuDownload } from "react-icons/lu";
function Home() {
  const navigate = useNavigate()
  return (
    <div className='min-h-screen overflow-hidden bg-[#F7F4FC] text-[#6B647F] font-[Inter]'>
      <Navbar />
      {/* top */}
      <section className='max-w-7xl mx-auto px-8 pt-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center'>
        <div>
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            whileHover={{ y: -5 }}>

            <motion.h1 className="text-5xl lg:text-6xl font-extrabold leading-tight font-[Poppins] text-[#372F52]"
              whileHover={{ y: -4 }}>
              Create smart <br /> AI notes in <br /> seconds.
            </motion.h1>

            <motion.p whileHover={{ y: -2 }} className='mt-6 max-w-xl text-lg text-[#6B647F]'>
              Generate exam-focused notes, project documentation,
              flow diagrams and revision-ready content using AI -
              faster, cleaner and smarter.


            </motion.p>

            <motion.button
              onClick={() => navigate("/Notes")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className='relative z-50 mt-10 px-10 py-3 rounded-xl
             flex items-center gap-3
             bg-[#B9AEE0] hover:bg-[#A79CD6] transition-colors
             border border-[#E4DEF3]
             text-[#372F52] font-semibold text-lg'
            >

              Get started

            </motion.button>

          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          whileHover={{ y: -12, scale: 1.02 }}
          className="overflow-hidden rounded-2xl border border-[#E4DEF3] shadow-sm">

          <div className='overflow-hidden'>
            <img src={img} alt='img' className="rounded-2xl" />
          </div>

        </motion.div>

      </section>

      {/* bottom */}
      <section className='max-w-6xl mx-auto px-8 py-32 grid grid-cols-1
      md:grid-cols-4 gap-10'>
        <Feature icon={<LuBook size={28} />} title="Exam notes" desc="High-yield exam-oriented notes with revision points. " />
        <Feature icon={<LuFolder size={28} />} title="Project notes" desc="Well-structured content for assignments & projects." />
        <Feature icon={<LuChartBar size={28} />} title="Charts & Graphs" desc="Auto generated Visual representations of data for clarity." />
        <Feature icon={<LuDownload size={28} />} title="Free PDF download" desc="Download clean , printable PDFs instantly." />

      </section>

      <Footer />

    </div>
  )
}

function Feature({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className='relative rounded-2xl p-6
      bg-[#FBF9F6]
      border border-[#E4DEF3]
      text-[#372F52]'
    >
      <div className='relative z-10'>
        <div className='text-[#A79CD6] mb-3'>{icon}</div>
        <h3 className='text-lg font-semibold font-[Poppins] mb-2'>{title}</h3>
        <p className='text-[#6B647F] text-sm leading-relaxed'>{desc}</p>

      </div>
    </motion.div>
  )
}

export default Home
