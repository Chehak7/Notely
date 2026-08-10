import React, { useEffect, useRef } from 'react'
import mermaid from 'mermaid'
import { useTheme } from '../context/ThemeContext'

const cleanMermaidChart = (diagram) => {
  if (!diagram) return ''

  let clean = diagram.replace(/\r\n/g, '\n').trim()

  if (!clean.startsWith('graph')) {
    clean = `graph TD\n${clean}`
  }

  return clean
}

const autoFixNodes = (diagram) => {
  let index = 0
  const used = new Map()

  return diagram.replace(/\[(.*?)\]/g, (_, label) => {
    const key = label.trim()

    if (used.has(key)) {
      return used.get(key)
    }

    index += 1
    const id = `N${index}`
    const node = `${id}["${key}"]`

    used.set(key, node)
    return node
  })
}

const MERMAID_THEME_VARIABLES = {
  light: {
    background: '#FFFFFF',
    primaryColor: '#D1F5F2',
    primaryTextColor: '#1A1A2E',
    primaryBorderColor: '#4ECDC4',
    lineColor: '#6B7280',
    secondaryColor: '#DCE6FF',
    tertiaryColor: '#F8FAFC',
    textColor: '#1A1A2E',
    mainBkg: '#FFFFFF',
    nodeBorder: '#4ECDC4',
    clusterBkg: '#F8FAFC',
    clusterBorder: '#E5E7EB',
    edgeLabelBackground: '#FFFFFF',
  },
  dark: {
    background: '#1F2937',
    primaryColor: '#1E293B',
    primaryTextColor: '#F8FAFC',
    primaryBorderColor: '#5EEAD4',
    lineColor: '#CBD5E1',
    secondaryColor: '#243041',
    tertiaryColor: '#111827',
    textColor: '#F8FAFC',
    mainBkg: '#1F2937',
    nodeBorder: '#5EEAD4',
    clusterBkg: '#111827',
    clusterBorder: '#334155',
    edgeLabelBackground: '#1F2937',
  },
}

function MermaidSetup({ diagram }) {
  const containerRef = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (!diagram || !containerRef.current) return

    const renderDiagram = async () => {
      try {
        containerRef.current.innerHTML = ''

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'loose',
          theme: 'base',
          themeVariables: MERMAID_THEME_VARIABLES[theme],
        })

        const uniqueId = `mermaid-${Math.random().toString(36).substring(2, 9)}`
        const safeChart = autoFixNodes(cleanMermaidChart(diagram))
        const { svg } = await mermaid.render(uniqueId, safeChart)
        containerRef.current.innerHTML = svg
      } catch (error) {
        console.error('Mermaid render failed:', error)
      }
    }

    renderDiagram()
  }, [diagram, theme])

  return (
    <div className='bg-ds-surface border border-ds-border rounded-xl p-4 overflow-x-auto'>
      <div ref={containerRef} className='min-w-max' />
    </div>
  )
}

export default MermaidSetup
