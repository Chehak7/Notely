import React, { useEffect } from 'react'
import { motion } from "motion/react"
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { generateNotes } from '../services/api';
import { updateCredits } from '../redux/userSlice';


function Topicform({ setResult, setLoading, loading, setError }) {

    const [topic, setTopic] = useState("");
    const [classLevel, setClassLevel] = useState("");
    const [examType, setExamType] = useState("");
    const [revisionMode, setRevisionMode] = useState(false);
    const [includeDiagram, setIncludeDiagram] = useState(false);
    const [includeCharts, setIncludeCharts] = useState(false);
    const [progress, setProgress] = useState(0);
    const [progressText, setProgressText] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        if (!topic.trim()) {
            setError("please enter the topic")
            return;
        }
        setError("")
        setLoading(true)
        setResult(null)
        try {
            const result = await generateNotes({
                topic,
                classLevel,
                examType,
                revisionMode,
                includeDiagram,
                includeCharts
            })
            setResult(result)
            setLoading(false)
            setClassLevel("")
            setTopic("")
            setExamType("")
            setIncludeCharts(false)
            setRevisionMode(false)
            setIncludeDiagram(false)

            if (typeof result.creditsLeft === "number") {
                dispatch(updateCredits(result.creditsLeft))

            }

        } catch (error) {
            console.log(error)
            setError("Failed to fetch notes from server");
            setLoading(false)

        }
    }

    useEffect(() => {
        if (!loading) return;

        let value = 0;

        const interval = setInterval(() => {
            value += Math.random() * 8

            setProgress(value);

            if (value >= 95) {
                setProgressText("Almost done...");
                clearInterval(interval);
            } else if (value > 70) {
                setProgressText("Finalizing notes...");
            } else if (value > 40) {
                setProgressText("Processing content...");
            } else {
                setProgressText("Generating notes...");
            }

            setProgress(Math.floor(value))

        }, 700);

        return () => {
            clearInterval(interval);
            setProgress(0);
            setProgressText("");
        };
    }, [loading]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl
      bg-[#FBF9F6]
      border border-[#E4DEF3]
      p-8 space-y-6 text-[#372F52]">
            <input type="text" className='w-full p-3 rounded-xl
         bg-[#F7F4FC]
         border border-[#E4DEF3]
         placeholder-[#8A8398] 
         text-[#372F52] 
         focus:outline-none focus:ring-2 focus:ring-[#B9AEE0]' placeholder='Enter topic (e.g. Web Development)'
                onChange={(e) => setTopic(e.target.value)}
                value={topic}
            />

            <input type="text" className='w-full p-3 rounded-xl
         bg-[#F7F4FC]
         border border-[#E4DEF3]
         placeholder-[#8A8398] 
         text-[#372F52] 
         focus:outline-none focus:ring-2 focus:ring-[#B9AEE0]'
                placeholder='Class / Level (e.g. Class 10)'
                onChange={(e) => setClassLevel(e.target.value)}
                value={classLevel}
            />

            <input type="text" className='w-full p-3 rounded-xl
         bg-[#F7F4FC]
         border border-[#E4DEF3]
         placeholder-[#8A8398] 
         text-[#372F52] 
         focus:outline-none focus:ring-2 focus:ring-[#B9AEE0]'
                placeholder='Exam Type (e.g. CBSE, JEE, NEET)'
                onChange={(e) => setExamType(e.target.value)}
                value={examType}
            />
            <div className='flex flex-row gap-8 items-center'>
                <Toggle label="Exam Revision Mode" checked={revisionMode} onChange={() => setRevisionMode(!revisionMode)} />
                <Toggle label="Include Diagram" checked={includeDiagram} onChange={() => setIncludeDiagram(!includeDiagram)} />
                <Toggle label="Include Charts" checked={includeCharts} onChange={() => setIncludeCharts(!includeCharts)} />
            </div>

            <motion.button
                onClick={handleSubmit}
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.95 } : {}}
                disabled={loading}
                className={`w-full py-3 rounded-xl
            font-semibold 
            flex items-center justify-center gap-3
            transition
            ${loading
                        ? "bg-[#E4DEF3] text-[#6B647F] cursor-not-allowed"
                        : "bg-[#B9AEE0] text-[#372F52] hover:bg-[#A79CD6]"
                    }`}>
                {loading ? "Generating Notes..." : "Generate Notes"}

            </motion.button>
            {loading && <div className='mt-4 space-y-2'>
                <div className='w-full h-2 rounded-full bg-[#E4DEF3] overflow-hidden'>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "easeOut", duration: 0.6 }}
                        className='h-full bg-[#A79CD6]'>
                    </motion.div>
                </div>
                <div className='flex justify-between text-xs text-[#6B647F]'>
                    <span>{progressText}</span>
                    <span>{progress}%</span>
                </div>
                <p className='text-xs text-[#8A8398] text-center'>
                    This may take upto 2-5 minutes. please do not close or refresh the page.
                </p>
            </div>}


        </motion.div>
    )
}

function Toggle({ label, checked, onChange }) {
    return (
        <div className='flex items-center gap-4 cursor-pointer select-none' onClick={onChange}>
            <motion.div
                animate={{
                    backgroundColor: checked
                        ? "#A79CD6"
                        : "#E4DEF3"
                }}
                transition={{ duration: 0.25 }}
                className='relative w-12 h-6 rounded-full 
            border border-[#E4DEF3]'>

                <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className='absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm'
                    style={{
                        left: checked ? "1.6rem" : "0.25rem",
                    }}>

                </motion.div>
            </motion.div>
            <span className={`text-lg transition-colors font-medium ${checked ? "text-[#372F52]" : "text-[#6B647F]"
                }`}>{label}</span>

        </div>
    )
}


export default Topicform