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
        <div className="bg-ds-page rounded-2xl border border-ds-border shadow-sm p-5 space-y-6">

            <div className='flex items-center gap-2'>
                <span className='text-xl text-ds-accent'><LuPin /></span>
                <h3 className='text-lg font-semibold font-heading text-ds-text'>
                    Quick Exam View
                </h3>
            </div>

            <section>
                <p className='text-sm font-semibold text-ds-text-sec mb-3 flex items-center gap-1'>
                    <LuStar className="text-ds-accent" /> Sub Topics (Priority Wise)
                </p>
                {
                    Object.entries(result.subtopics).map(([star, topics]) => (
                        <div key={star} className='mb-3
                        rounded-xl
                        bg-ds-section
                        border border-ds-border
                        p-3'>
                            <p className='text-sm font-semibold text-ds-text mb-1'>
                                {star} Priority
                            </p>
                            <ul className='list-disc ml-4 text-sm text-ds-text-sec space-y-1'>
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

                <p className='text-sm font-semibold text-ds-text-sec mb-1 flex items-center gap-1'>
                    <LuFlame className="text-ds-error" /> Exam Importance
                </p>
                <span className='text-ds-text font-bold text-sm'>
                    {result.importance}
                </span>
            
                <p className='text-sm font-semibold text-ds-text-sec mb-3 mt-4 flex items-center gap-1'>
                    <LuCircleHelp className="text-ds-success" /> Important Questions
                </p>

                <div className='mb-4 rounded-xl
                bg-ds-section
                border border-ds-border
                p-3'>
                    <p className='text-sm font-semibold text-ds-text mb-2'>
                                Short Questions
                            </p>
                            <ul className='list-disc ml-4 text-sm text-ds-text-sec space-y-1'>
                                {result.questions.short.map((t, i) => (
                                    <li key={i}>{t}</li>
                                ))}
                            </ul>

                </div>

                <div className='mb-4 rounded-xl
                bg-ds-section
                border border-ds-border
                p-3'>
                    <p className='text-sm font-semibold text-ds-text mb-2'>
                                Long Questions
                            </p>
                            <ul className='list-disc ml-4 text-sm text-ds-text-sec space-y-1'>
                                {result.questions.long.map((t, i) => (
                                    <li key={i}>{t}</li>
                                ))}
                            </ul>

                </div>

                <div className='mb-4 rounded-xl
                bg-ds-section
                border border-ds-border
                p-3'>
                    <p className='text-sm font-semibold text-ds-text mb-2'>
                                Diagram Questions
                            </p>
                            <ul className='list-disc ml-4 text-sm text-ds-text-sec space-y-1'>
                                <li>{result.questions.diagram}</li>
                            </ul>

                </div>

            </section>


        </div>
    )
}

export default Sidebar
