import React, { useState, useEffect } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
import { useTheme } from './ThemeContext'
import { useMountedState } from 'react-use'

function ToggleTheme() {
  const isMounted = useMountedState()
  const { theme, toggleTheme } = useTheme()

  if (!isMounted()) return null
  return (
    <button type="button" onClick={toggleTheme} className={theme}>
      {theme === 'light' ? <FiMoon /> : <FiSun />}
      <style jsx>{`
        button {
          /* remove default */
          background: none;
          color: inherit;
          border: none;
          padding: 0;
          font: inherit;
          cursor: pointer;
          outline: inherit;
          /* custom styles */
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.4rem;
          padding: 4px;
          border-radius: 2px;
        }
        .light {
          color: #2d3748;
        }
        .dark {
          color: #f6e05e;
        }
      `}</style>
    </button>
  )
}

export default ToggleTheme
