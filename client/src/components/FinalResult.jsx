import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import MermaidSetup from './MermaidSetup'
import RechartSetUp from './RechartSetup'
import { LuStar, LuPen, LuChartBar, LuTrendingUp, LuTrendingDown, LuCircleHelp } from 'react-icons/lu';
import { downloadPdf } from '../services/api'

const markdownComponents = {
  h1: ({ children }) => (
    <h1 className="text-2xl font-[Poppins] font-bold text-[#372F52] mt-6 mb-4 border-b border-[#E4DEF3] pb-2">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl font-[Poppins] font-semibold text-[#372F52] mt-5 mb-3">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold text-[#372F52] mt-4 mb-2">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-[#6B647F] leading-relaxed mb-3">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc ml-6 space-y-1 text-[#6B647F]">
      {children}
    </ul>
  ),
  li: ({ children }) => (
    <li className="list-disc ml-6 space-y-1 text-[#6B647F]">
      {children}
    </li>
  ),
}

function FinalResult({ result }) {
  const [quickRevision, setQuickRevision] = useState(false)

  if (!result) {
    return null
  }

  const shortQuestions = result.questions?.short ?? []
  const longQuestions = result.questions?.long ?? result.questions?.Long ?? []
  const diagramQuestions = result.questions?.diagram ? [result.questions.diagram] : []
  const revisionPoints = result.revisionPoints ?? []
  const notes = result.notes ?? ''
  const diagramData = result.diagram?.data
  const subtopics = result.subtopics ?? {}

  return (
    <div className="mt-6 p-3 space-y-10 bg-transparent text-[#6B647F]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-3xl font-[Poppins] font-bold text-[#372F52]">
          Generated Notes
        </h2>

        <div className="flex gap-3">
          <button
            onClick={() => setQuickRevision(!quickRevision)}
            className={`px-4 py-2 rounded-xl border border-[#E4DEF3] text-sm font-medium transition ${quickRevision
              ? 'bg-[#B9AEE0] text-[#372F52]'
              : 'bg-[#FBF9F6] text-[#372F52] hover:bg-[#E4DEF3]'
              }`}>
            {quickRevision ? 'Exit Revision Mode' : 'Quick Revision (5 min)'}
          </button>

          <button onClick={() => downloadPdf(result)}
          className="px-4 py-2 rounded-xl text-sm font-medium bg-[#B9AEE0] border border-[#E4DEF3] text-[#372F52] hover:bg-[#A79CD6]">
            📥 Download PDF
          </button>
        </div>
      </div>

      {!quickRevision && (
        <section>
          <SectionHeader icon={<LuStar />} title="Sub Topics" color="indigo" />
          {Object.entries(subtopics).map(([star, topics]) => (
            <div key={star} className="mb-3">
              <p className="font-medium text-[#A79CD6] mb-1">{star} Priority</p>
              <ul className="list-disc ml-6 text-[#6B647F]">
                {topics.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {!quickRevision && (
        <section>
          <SectionHeader icon={<LuPen />} title="Detailed Notes" color="purple" />
          <div className="bg-[#F7F4FC] border border-[#E4DEF3] rounded-2xl p-6">
            <ReactMarkdown components={markdownComponents}>{notes}</ReactMarkdown>
          </div>
        </section>
      )}

      {quickRevision && (
        <section className="rounded-2xl bg-[#F6DDE8] border border-[#B9AEE0] p-6">
          <h3 className="font-bold font-[Poppins] text-[#372F52] mb-3 text-lg">✦ Exam Quick Revision Points</h3>
          <ul className="list-disc ml-6 space-y-1 text-[#6B647F]">
            {revisionPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </section>
      )}

      {diagramData && (
        <section>
          <SectionHeader icon={<LuChartBar />} title="Diagram" color="cyan" />
          <MermaidSetup diagram={diagramData} />
          <p className="mt-3 text-xs text-[#8A8398] italic">
            If you need this diagram for future reference or revision, you can save it by taking a screenshot.
          </p>
        </section>
      )}


      {result.charts?.length > 0 &&
        <section>
          <SectionHeader icon={<LuTrendingUp />} title="Visual Charts" color="indigo" />
          <RechartSetUp charts={result.charts} />
          <p className="mt-3 text-xs text-[#8A8398] italic">
            If you need this Chart for future reference or revision, you can save it by taking a screenshot.
          </p>

        </section>}


      {result.charts && result.charts.length === 0 && (
        <p className="text-sm text-[#8A8398] italic flex items-center gap-1">
           <LuTrendingDown /> Charts are not relevant for this topic.
        </p>
      )}

      <section>
        <SectionHeader icon={<LuCircleHelp />} title="Important Questions" color="rose" />
        <p className="font-medium text-[#372F52]">Short Questions:</p>
        <ul className="list-disc ml-6 text-[#6B647F]">
          {shortQuestions.map((question, index) => (
            <li key={index}>{question}</li>
          ))}
        </ul>
      </section>

      <section>
        <p className="font-medium text-[#372F52]">Long Questions:</p>
        <ul className="list-disc ml-6 text-[#6B647F]">
          {longQuestions.map((question, index) => (
            <li key={index}>{question}</li>
          ))}
        </ul>
      </section>

      {diagramQuestions.length > 0 && (
        <section>
          <p className="font-medium text-[#372F52]">Diagram Questions:</p>
          <ul className="list-disc ml-6 text-[#6B647F]">
            {diagramQuestions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

function SectionHeader({ icon, title, color }) {
  return (
    <div className={`mb-4 px-4 py-2 rounded-xl bg-[#EDE9F9] border border-[#E4DEF3] text-[#372F52] font-[Poppins] font-semibold flex items-center gap-2`}>
      <span className="text-[#B9AEE0]">{icon}</span>
      <span>{title}</span>
    </div>
  )
}

export default FinalResult