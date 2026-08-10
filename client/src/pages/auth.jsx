import { motion } from 'motion/react'
import { FcGoogle } from 'react-icons/fc'
import { LuGift, LuBook, LuChartBar } from 'react-icons/lu'
import { auth, provider } from '../utils/firebase'
import { signInWithPopup } from 'firebase/auth'
import axios from 'axios'
import { serverUrl } from '../App.jsx'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice.js'
import { useNavigate } from 'react-router-dom'

function Auth() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleGoogleSignIn = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      const user = response.user
      const name = user.displayName
      const email = user.email
      const result = await axios.post(serverUrl + '/api/auth/google', { name, email }, { withCredentials: true })
      dispatch(setUserData(result.data))
      navigate('/')
    } catch (error) {
      console.log('Error signing in with Google:', error)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-ds-section font-body p-4 sm:p-8'>
      <div className='w-full max-w-5xl mx-auto flex flex-col lg:flex-row shadow-2xl rounded-[24px] overflow-hidden border border-ds-border'>
        <div className='hidden lg:flex flex-col justify-between w-1/2 p-12 bg-ds-page relative overflow-hidden'>
          <div className='absolute top-0 right-0 w-80 h-80 bg-ds-accent opacity-[0.08] rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3'></div>
          <div className='absolute bottom-0 left-0 w-80 h-80 bg-ds-cta opacity-[0.08] rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3'></div>

          <div className='relative z-10'>
            <div className='flex items-center gap-2 mb-12'>
              <h2 className='text-xl font-bold font-heading text-ds-text'>Notely</h2>
            </div>

            <h1 className='text-4xl font-display font-extrabold leading-tight text-ds-text mb-6'>
              Unlock Your Learning Potential with AI
            </h1>
            <p className='text-base font-medium text-ds-text-sec mb-10'>
              Join our community of learners and unlock your full potential with AI-powered education. You get 100 free credits to start!
            </p>

            <div className='space-y-5'>
              <Feature icon={<LuGift size={22} />} title='100 Free Credits' desc='Get started with 100 free credits to explore our AI tools.' />
              <Feature icon={<LuBook size={22} />} title='Exam Notes & Projects' desc='High-quality structured notes for all subjects.' />
              <Feature icon={<LuChartBar size={22} />} title='Charts & PDFs' desc='Visual representations of data and instant PDF downloads.' />
            </div>
          </div>
        </div>

        <div className='w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-16 bg-ds-surface relative'>
          <div className='w-full max-w-sm'>
            <div className='text-center mb-10'>
              <h2 className='text-3xl font-bold font-heading text-ds-text mb-3'>Welcome Back</h2>
              <p className='text-sm text-ds-text-sec'>Sign in to access your notes, diagrams, and AI tools.</p>
            </div>

            <motion.button
              onClick={handleGoogleSignIn}
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className='w-full px-6 py-4 rounded-full flex justify-center items-center gap-3 bg-ds-surface border border-ds-border text-ds-text font-semibold font-heading text-base shadow-sm hover:shadow-md hover:bg-ds-section transition-all'
            >
              <FcGoogle size={24} />
              Continue with Google
            </motion.button>

            <div className='mt-8 text-center'>
              <p className='text-xs text-ds-text-muted leading-relaxed'>
                Start with 100 free credits. Upgrade anytime for more credits. Instant access.
              </p>
            </div>

            <div className='mt-12 text-center border-t border-ds-border pt-8'>
              <a href='/' className='text-sm font-semibold font-heading text-ds-accent hover:text-ds-accent-hover transition-colors'>
                &larr; Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Feature({ icon, title, desc }) {
  return (
    <div className='flex items-start gap-4'>
      <div className='text-ds-accent mt-0.5'>{icon}</div>
      <div>
        <h3 className='text-sm font-heading font-semibold text-ds-text'>{title}</h3>
        <p className='text-ds-text-sec text-xs leading-relaxed mt-0.5'>{desc}</p>
      </div>
    </div>
  )
}

export default Auth
