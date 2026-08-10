import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import MermaidSetup from './MermaidSetup'
import RechartSetUp from './RechartSetup'
import { LuStar, LuPen, LuChartBar, LuTrendingUp, LuTrendingDown, LuCircleHelp } from 'react-icons/lu';
import { downloadPdf } from '../services/api'

const markdownComponents = {
  h1: ({ children }) => (
    <h1 className="text-2xl font-heading font-bold text-ds-text mt-6 mb-4 border-b border-ds-border pb-2">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl font-heading font-semibold text-ds-text mt-5 mb-3">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold text-ds-text mt-4 mb-2">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-ds-text-sec leading-relaxed mb-3">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc ml-6 space-y-1 text-ds-text-sec">
      {children}
    </ul>
  ),
  li: ({ children }) => (
    <li className="list-disc ml-6 space-y-1 text-ds-text-sec">
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
    <div className="mt-6 p-3 space-y-10 bg-transparent text-ds-text-sec">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-3xl font-heading font-bold text-ds-text">
          Generated Notes
        </h2>

        <div className="flex gap-3">
          <button
            onClick={() => setQuickRevision(!quickRevision)}
            className={`px-4 py-2 rounded-full border border-ds-border text-sm font-medium font-heading transition ${quickRevision
              ? 'bg-ds-btn-sec-bg text-ds-btn-sec-text'
              : 'bg-ds-section text-ds-text hover:bg-ds-surface'
              }`}>
            {quickRevision ? 'Exit Revision Mode' : 'Quick Revision (5 min)'}
          </button>

          <button onClick={() => downloadPdf(result)}
          className="px-4 py-2 rounded-full text-sm font-semibold font-heading text-white transition-all hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #3B5FE3 0%, #5B7FFF 100%)', boxShadow: '0 4px 20px 0 rgba(59,95,227,0.35)' }}>
            📥 Download PDF
          </button>
        </div>
      </div>

      {!quickRevision && (
        <section>
          <SectionHeader icon={<LuStar />} title="Sub Topics" color="indigo" />
          {Object.entries(subtopics).map(([star, topics]) => (
            <div key={star} className="mb-3">
              <p className="font-medium text-ds-accent mb-1">{star} Priority</p>
              <ul className="list-disc ml-6 text-ds-text-sec">
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
          <div className="bg-ds-section border border-ds-border rounded-2xl p-6">
            <ReactMarkdown components={markdownComponents}>{notes}</ReactMarkdown>
          </div>
        </section>
      )}

      {quickRevision && (
        <section className="rounded-2xl bg-ds-accent-light border border-ds-accent/30 p-6">
          <h3 className="font-bold font-heading text-ds-text mb-3 text-lg">✦ Exam Quick Revision Points</h3>
          <ul className="list-disc ml-6 space-y-1 text-ds-text-sec">
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
          <p className="mt-3 text-xs text-ds-text-muted italic">
            If you need this diagram for future reference or revision, you can save it by taking a screenshot.
          </p>
        </section>
      )}


      {result.charts?.length > 0 &&
        <section>
          <SectionHeader icon={<LuTrendingUp />} title="Visual Charts" color="indigo" />
          <RechartSetUp charts={result.charts} />
          <p className="mt-3 text-xs text-ds-text-muted italic">
            If you need this Chart for future reference or revision, you can save it by taking a screenshot.
          </p>

        </section>}


      {result.charts && result.charts.length === 0 && (
        <p className="text-sm text-ds-text-muted italic flex items-center gap-1">
           <LuTrendingDown /> Charts are not relevant for this topic.
        </p>
      )}

      <section>
        <SectionHeader icon={<LuCircleHelp />} title="Important Questions" color="rose" />
        <p className="font-medium text-ds-text">Short Questions:</p>
        <ul className="list-disc ml-6 text-ds-text-sec">
          {shortQuestions.map((question, index) => (
            <li key={index}>{question}</li>
          ))}
        </ul>
      </section>

      <section>
        <p className="font-medium text-ds-text">Long Questions:</p>
        <ul className="list-disc ml-6 text-ds-text-sec">
          {longQuestions.map((question, index) => (
            <li key={index}>{question}</li>
          ))}
        </ul>
      </section>

      {diagramQuestions.length > 0 && (
        <section>
          <p className="font-medium text-ds-text">Diagram Questions:</p>
          <ul className="list-disc ml-6 text-ds-text-sec">
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
    <div className={`mb-4 px-4 py-2.5 rounded-xl bg-ds-section border border-ds-border text-ds-text font-heading font-semibold flex items-center gap-2`}>
      <span className="text-ds-accent">{icon}</span>
      <span>{title}</span>
    </div>
  )
}

export default FinalResult