import React, { useState, useEffect } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
import { useTheme } from './ThemeContext'
import { useMountedState } from 'react-use'

const item =
  'transition hover:bg-gray-700 cursor-pointer px-4 h-10 flex items-center text-sm text-secondary'

function ToggleTheme({ className }) {
  const isMounted = useMountedState()
  const { theme, toggleTheme } = useTheme()

  // if (!isMounted()) return null
  return (
    <div onClick={toggleTheme} className={className}>
      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
    </div>
  )
}

export default ToggleTheme
