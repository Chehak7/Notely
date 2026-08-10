import React from 'react'
import { motion } from 'motion/react'
import { LuMoon, LuSun } from 'react-icons/lu'
import { useTheme } from '../context/ThemeContext'

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <motion.button
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      onClick={toggleTheme}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      className="fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-full border border-ds-border bg-ds-surface px-3 py-3 sm:px-4 shadow-lg text-ds-text hover:bg-ds-section transition-colors"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ds-btn-sec-bg text-ds-btn-sec-text">
        {isDark ? <LuSun size={18} /> : <LuMoon size={18} />}
      </span>
      <span className="hidden sm:inline text-sm font-semibold font-heading">
        {isDark ? 'Light mode' : 'Dark mode'}
      </span>
    </motion.button>
  )
}

export default ThemeToggle
