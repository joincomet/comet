import React, { useState, useEffect } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
import { useTheme } from './ThemeContext'
import { useMountedState } from 'react-use'

function ToggleTheme() {
  const isMounted = useMountedState()
  const { theme, toggleTheme } = useTheme()

  if (!isMounted()) return null
  return (
    <div onClick={toggleTheme} className="cursor-pointer">
      {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
    </div>
  )
}

export default ToggleTheme
