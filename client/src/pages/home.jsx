import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/Footer'
import { motion } from 'motion/react'
import img from '../assets/img1.png'
import { useNavigate } from 'react-router-dom'
import { LuBook, LuFolder, LuChartBar, LuDownload, LuPlay } from 'react-icons/lu'

function Home() {
  const navigate = useNavigate()

  return (
    <div className='min-h-screen overflow-hidden bg-ds-page text-ds-text-sec font-body'>
      <Navbar />

      <section className='max-w-7xl mx-auto px-6 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
        <div>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className='max-w-xl'
          >
            <motion.h1
              className='text-5xl lg:text-7xl font-extrabold leading-tight font-display text-ds-text'
              whileHover={{ y: -2 }}
            >
              Create smart <br />
              <span className='relative inline-block mx-1'>
                <span className='relative z-10 bg-ds-highlight px-3 py-1 rounded-xl text-ds-text transform -rotate-2 inline-block'>AI</span>
              </span>{' '}
              notes in <br /> seconds.
            </motion.h1>

            <motion.p whileHover={{ y: -1 }} className='mt-6 text-lg text-ds-text-sec font-body leading-relaxed'>
              Generate exam-focused notes, project documentation,
              flow diagrams and revision-ready content using AI —
              faster, cleaner and smarter.
            </motion.p>

            <div className='mt-10 flex flex-wrap items-center gap-4'>
              <motion.button
                onClick={() => navigate('/Notes')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className='px-8 py-3.5 rounded-full flex items-center justify-center gap-3 text-white font-semibold font-heading text-base transition-all hover:opacity-90'
                style={{ background: 'linear-gradient(135deg, #3B5FE3 0%, #5B7FFF 100%)', boxShadow: '0 4px 20px 0 rgba(59,95,227,0.35)' }}
              >
                Get started
              </motion.button>
              <motion.button
                onClick={() => navigate('/auth')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className='px-8 py-3.5 rounded-full flex items-center justify-center gap-2 bg-ds-btn-sec-bg text-ds-btn-sec-text font-semibold font-heading text-base transition-colors hover:bg-ds-btn-sec-hover'
              >
                <LuPlay size={18} /> Watch Demo
              </motion.button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          whileHover={{ y: -8 }}
          className='relative flex justify-center items-center p-8'
        >
          <svg viewBox='0 0 400 400' className='w-full max-w-lg drop-shadow-xl' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M320.5 285.5C305.792 344.606 230 380 163.5 365C97 350 49 285.5 35 220C21 154.5 97 80 163.5 65C230 50 335.208 226.394 320.5 285.5Z' fill='var(--ds-section)' />
            <circle cx='200' cy='200' r='140' fill='var(--ds-surface-alt)' />

            <rect x='120' y='100' width='100' height='140' rx='8' fill='var(--ds-surface)' stroke='var(--ds-border)' strokeWidth='6' transform='rotate(-15 120 100)' />
            <rect x='160' y='140' width='120' height='160' rx='8' fill='var(--ds-surface)' stroke='var(--ds-accent)' strokeWidth='6' />
            <path d='M180 180h80M180 215h60M180 250h80' stroke='var(--ds-border)' strokeWidth='6' strokeLinecap='round' />
            <path d='M180 285h40' stroke='var(--ds-accent)' strokeWidth='6' strokeLinecap='round' />

            <path d='M260 280L320 220L340 240L280 300L250 310L260 280Z' fill='var(--ds-surface)' stroke='var(--ds-cta)' strokeWidth='6' strokeLinejoin='round' />
            <path d='M290 250L310 270' stroke='var(--ds-cta)' strokeWidth='6' strokeLinecap='round' />

            <path d='M80 280C80 280 60 220 100 180C140 140 160 200 160 200C160 200 180 260 140 300C100 340 80 280 80 280Z' fill='var(--ds-surface)' stroke='var(--ds-accent)' strokeWidth='6' strokeLinejoin='round' />
            <path d='M120 240L85 275' stroke='var(--ds-accent)' strokeWidth='6' strokeLinecap='round' />
          </svg>
        </motion.div>
      </section>

      <section className='bg-ds-section py-24'>
        <div className='max-w-6xl mx-auto px-6 text-center'>
          <h2 className='text-3xl lg:text-4xl font-bold font-display text-ds-text mb-4'>See it in action</h2>
          <p className='text-ds-text-sec text-lg mb-12 max-w-2xl mx-auto'>
            Experience a clean, distraction-free dashboard designed to help you focus on what matters most — your learning.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className='rounded-xl overflow-hidden border border-[#374151] shadow-2xl bg-[#1F2937] max-w-5xl mx-auto transform transition-transform duration-500 hover:scale-[1.01]'
          >
            <div className='flex items-center gap-2 px-4 py-3 bg-[#111827] border-b border-[#374151]'>
              <div className='w-3 h-3 rounded-full bg-red-500'></div>
              <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
              <div className='w-3 h-3 rounded-full bg-green-500'></div>
              <div className='mx-auto px-4 py-1 rounded bg-[#1F2937] border border-[#374151] text-xs text-gray-400 font-mono w-1/3 text-center hidden sm:block'>
                app.notely.com/dashboard
              </div>
            </div>
            <img src={img} alt='Product Dashboard' className='w-full object-cover' />
          </motion.div>
        </div>
      </section>

      <section className='bg-ds-page py-24'>
        <div className='max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8'>
          <Feature icon={<LuBook size={28} />} title='Exam notes' desc='High-yield exam-oriented notes with revision points.' />
          <Feature icon={<LuFolder size={28} />} title='Project notes' desc='Well-structured content for assignments & projects.' />
          <Feature icon={<LuChartBar size={28} />} title='Charts & Graphs' desc='Auto generated visual representations of data for clarity.' />
          <Feature icon={<LuDownload size={28} />} title='Free PDF download' desc='Download clean, printable PDFs instantly.' />
        </div>
      </section>

      <Footer />
    </div>
  )
}

function Feature({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      className='relative rounded-2xl p-6 bg-ds-section border border-ds-border shadow-sm hover:shadow-md transition-shadow text-ds-text'
    >
      <div className='relative z-10'>
        <div className='text-ds-accent mb-3'>{icon}</div>
        <h3 className='text-lg font-semibold font-heading mb-2'>{title}</h3>
        <p className='text-ds-text-sec text-sm leading-relaxed'>{desc}</p>
      </div>
    </motion.div>
  )
}

export default Home
