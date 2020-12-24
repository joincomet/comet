import React, { useState, useEffect } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
import { useTheme } from './ThemeContext'
import { useMountedState } from 'react-use'

function ToggleTheme({ className }) {
  const { theme, toggleTheme } = useTheme()

  // if (!isMounted()) return null
  return (
    <div onClick={toggleTheme} className={className}>
      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
    </div>
  )
}

export default ToggleTheme
