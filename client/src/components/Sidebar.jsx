import React from 'react'
import { LuPin, LuStar, LuFlame, LuCircleHelp } from 'react-icons/lu';

function Sidebar({ result }) {

    // Validate result structure before rendering
    if (
        !result ||
        !result.subtopics ||
        !result.questions ||
        !result.questions.short ||
        !result.questions.long
    ) {
        return null;
    }

    return (
        <div className="bg-[#FBF9F6] rounded-2xl border border-[#E4DEF3] shadow-none p-5 space-y-6">

            <div className='flex items-center gap-2'>
                <span className='text-xl text-[#B9AEE0]'><LuPin /></span>
                <h3 className='text-lg font-semibold font-[Poppins] text-[#372F52]'>
                    Quick Exam View
                </h3>
            </div>

            <section>
                <p className='text-sm font-semibold text-[#6B647F] mb-3 flex items-center gap-1'>
                    <LuStar className="text-[#B9AEE0]" /> Sub Topics (Priority Wise)
                </p>
                {
                    Object.entries(result.subtopics).map(([star, topics]) => (
                        <div key={star} className='mb-3
                        rounded-lg
                        bg-[#F7F4FC]
                        border border-[#E4DEF3]
                        p-3'>
                            <p className='text-sm font-semibold text-[#372F52] mb-1'>
                                {star} Priority
                            </p>
                            <ul className='list-disc ml-4 text-sm text-[#6B647F] space-y-1'>
                                {topics.map((t, i) => (
                                    <li key={i}>{t}</li>
                                ))}
                            </ul>
                        </div>
                    ))
                }
            </section>


            <section className='rounded-lg
                            bg-[#F7F4FC]
                             border border-[#E4DEF3] p-3'>

                <p className='text-sm font-semibold text-[#6B647F] mb-1 flex items-center gap-1'>
                    <LuFlame className="text-[#C07B9F]" /> Exam Importance
                </p>
                <span className='text-[#372F52] font-bold text-sm'>
                    {result.importance}
                </span>
            
                <p className='text-sm font-semibold text-[#6B647F] mb-3 mt-4 flex items-center gap-1'>
                    <LuCircleHelp className="text-[#7FA870]" /> Important Questions
                </p>

                <div className='mb-4 rounded-lg
                bg-[#FBF9F6]
                border border-[#E4DEF3]
                p-3'>
                    <p className='text-sm font-semibold text-[#372F52] mb-2'>
                                Short Questions
                            </p>
                            <ul className='list-disc ml-4 text-sm text-[#6B647F] space-y-1'>
                                {result.questions.short.map((t, i) => (
                                    <li key={i}>{t}</li>
                                ))}
                            </ul>

                </div>

                <div className='mb-4 rounded-lg
                bg-[#FBF9F6]
                border border-[#E4DEF3]
                p-3'>
                    <p className='text-sm font-semibold text-[#372F52] mb-2'>
                                Long Questions
                            </p>
                            <ul className='list-disc ml-4 text-sm text-[#6B647F] space-y-1'>
                                {result.questions.long.map((t, i) => (
                                    <li key={i}>{t}</li>
                                ))}
                            </ul>

                </div>

                <div className='mb-4 rounded-lg
                bg-[#FBF9F6]
                border border-[#E4DEF3]
                p-3'>
                    <p className='text-sm font-semibold text-[#372F52] mb-2'>
                                Diagram Questions
                            </p>
                            <ul className='list-disc ml-4 text-sm text-[#6B647F] space-y-1'>
                                <li>{result.questions.diagram}</li>
                            </ul>

                </div>

            </section>


        </div>
    )
}

export default Sidebar
