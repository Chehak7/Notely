import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { LuGift, LuBook, LuFolder, LuChartBar, LuDownload } from "react-icons/lu";
import { auth, provider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

function Auth() {

  const dispatch = useDispatch()
  const handleGoogleSignIn = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      const user = response.user
      const name = user.displayName
      const email = user.email
      const result = await axios.post(serverUrl + "/api/auth/google", { name, email }, { withCredentials: true })
      dispatch(setUserData(result.data))
    }
    catch (error) {
      console.log("Error signing in with Google:", error);
    }
  }
  return (
    <div className='min-h-screen overflow-hidden bg-[#F7F4FC] text-[#6B647F] font-[Inter] px-8'>

      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="max-w-7xl mx-auto mt-8
       rounded-2xl
       bg-[#EDE9F9]
       border border-[#E4DEF3]
       px-8 py-6">

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold font-[Poppins] text-[#372F52]">StudyWithAI</h1>
          <a href="/" className="transition hover:text-[#A79CD6] text-lg font-medium text-[#372F52]">Home</a>
        </div>

        <p className="text-sm text-[#6B647F] mt-2">A platform to enhance your learning experience with AI-powered tools and resources.</p>
      </motion.header>

      <main className="max-w-7xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* Left side content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
        >
          <h1 className='text-5xl lg:text-6xl font-[Poppins] font-extrabold leading-tight text-[#372F52]'>
            Unlock Your Learning Potential <br /> with AI</h1>

          <motion.button
            onClick={handleGoogleSignIn}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className='mt-10 px-10 py-3 rounded-xl
            flex items-center gap-3
            bg-[#B9AEE0] hover:bg-[#A79CD6]
            border border-[#E4DEF3]
            text-[#372F52] font-semibold text-lg'
          >
            <FcGoogle size={22} />
            Sign in with Google

          </motion.button>
          <p className='mt-6 max-w-xl text-lg font-medium text-[#6B647F]'
          > Join our community of learners and unlock your full potential with AI-powered education.<br /> You get 100 free credits to start with! </p>

          <p className='mt-4 text-sm text-[#8A8398]'> Start with 100 free credits. Upgrade anytime for more credits . Instant access. </p>
        </motion.div>

        {/* Right side content */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
          <Feature icon={<LuGift size={28} />} title="100 Free Credits" desc="Get started with 100 free credits to explore our AI-powered learning tools." />
          <Feature icon={<LuBook size={28} />} title="Exam notes" desc="High-quality exam notes for all subjects." />
          <Feature icon={<LuFolder size={28} />} title="Project notes" desc="Well-structured documentation for assignments & projects." />
          <Feature icon={<LuChartBar size={28} />} title="Charts & Graphs" desc="Visual representations of data for better understanding." />
          <Feature icon={<LuDownload size={28} />} title="Free PDF download" desc="Download all your learning materials in PDF format instantly." />


        </div>


      </main>

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
        <h3 className='text-lg font-[Poppins] font-semibold mb-2'>{title}</h3>
        <p className='text-[#6B647F] text-sm leading-relaxed'>{desc}</p>

      </div>
    </motion.div>
  )
}

export default Auth

