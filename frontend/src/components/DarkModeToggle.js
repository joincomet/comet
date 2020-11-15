import React from 'react'
import useDarkMode from 'use-dark-mode'
import { FiMoon, FiSun } from 'react-icons/fi'

function DarkModeToggle() {
  const darkMode = useDarkMode(false, {
    classNameDark: 'dark',
    classNameLight: 'light'
  })

  return (
    <div onClick={darkMode.toggle} className="cursor-pointer">
      {/*{darkMode.value ? <FiMoon size={24} /> : <FiSun size={24} />}*/}
      Dark mode
    </div>
  )
}

export default React.memo(DarkModeToggle)
