import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import { serverUrl } from "../App.jsx";

function Auth() {

  const handleGoogleSignIn = async() => {
    try{
      const response = await signInWithPopup(auth, provider)
      const user = response.user
      const name = user.displayName
      const email = user.email
      const result = await axios.post( serverUrl + "/api/auth/google", { name, email }, { withCredentials: true })
      console.log(result.data)
    } 
    catch (error) {
      console.log("Error signing in with Google:", error);
    }
  }
  return (
    <div className='min-h-screen overflow-hidden bg-white text-black px-8'>

      <motion.header 
       initial = {{opacity: 0, y: -15}}
       animate = {{opacity: 1, y: 0}}
       transition = {{duration: 1.5}}
       className="max-w-7xl mx-auto mt-8
       rounded-2xl
       bg-black/80 backdrop-blur-md
       border border-white/10
       px-8 py-6
       shadow-[0_20px_45px_rgba(0,0,0,0.6)]">

       <h1 className="text-2xl font-bold
       bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500
       bg-clip-text text-transparent">StudyWithAI</h1>

       <p className="text-sm text-white/100 mt-2">A platform to enhance your learning experience with AI-powered tools and resources.</p>
      </motion.header>

      <main className="max-w-7xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Left side content */}
        <motion.div 
          initial = {{opacity: 0, x: -60}}
          animate = {{opacity: 1, x: 0}}
          transition = {{duration: 1.5}}
          >
           <h1 className='text-5xl lg:text-6xl font-extrabold leading-tight
           bg-gradient-to-br from-black/90 via-black/60 to-black/90
           bg-clip-text text-transparent'>
            Unlock Your Learning Potential <br/> with AI</h1>

          <motion.button
          onClick={handleGoogleSignIn}
            whileHover={{ y: -10,rotateX:8,rotateY:-8,scale:1.07}}
             whileTap={{scale:0.97}}
             transition={{type:"spring", stiffness:200, damping:18}}
            className ='mt-10 px-10 py-3 rounded-xl
            flex items-center gap-3
            bg-gradient-to-br from-black/90 via-black/80 to-black/90
            border border-white/10
            text-white font-semibold text-lg
            shadow-[0_25px_60px_rgba(0,0,0,0.7)]'
            >
                <FcGoogle size={22} />
                Sign in with Google
            
          </motion.button>
         <p className='mt-6 max-w-xl text-lg font-semibold
         bg-gradient-to-br from-gray-700 via-gray-500/80 to-gray-700
         bg-clip-text text-transparent'
         > Join our community of learners and unlock your full potential with AI-powered education.<br /> You get 100 free credits to start with! </p>

         <p className = 'mt-4 text-sm text-gray-500'> Start with 100 free credits. Upgrade anytime for more credits . Instant access. </p>
        </motion.div>
        
        {/* Right side content */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'> 
          <Feature icon="🎁" title = "100 Free Credits" desc = "Get started with 100 free credits to explore our AI-powered learning tools." />
          <Feature icon="📚" title = "Exam notes" desc = "High-quality exam notes for all subjects."/>
          <Feature icon="🗂️" title = "Project notes" desc = "Well-structured documentation for assignments & projects."/>
          <Feature icon="📊" title = "Charts & Graphs" desc = "Visual representations of data for better understanding."/>
          <Feature icon="📄" title = "Free PDF download" desc = "Download all your learning materials in PDF format instantly."/>


        </div>


      </main>

    </div>
  )
}

function Feature({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ y: -12,rotateX:8,rotateY:8, scale:1.05}}
      transition={{type:"spring", stiffness:200, damping:18}}
      className='relative rounded-2xl p-6
      bg-gradient-to-br from-black/90 via-black/80 to-black/90
      backdrop-blur-2xl
      border border-white/10
      shadow-[0_30px_80px_rgba(0,0,0,0.7)]
      text-white'
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className ='relative z-10' style = {{transform: "translateZ(30px)"}}>
        <div className = 'text-4xl mb-3'>{icon}</div>
        <h3 className = 'text-lg font-semibold mb-2'>{title}</h3>
        <p className = 'text-gray-300 text-sm leading-relaxed'>{desc}</p>

       </div>
    </motion.div>
  )
}

export default Auth

