import React from 'react';
import useDarkMode from 'use-dark-mode';
import { FiMoon, FiSun } from "react-icons/fi";

const DarkModeToggle = () => {
  const darkMode = useDarkMode(false, { classNameDark: 'dark', classNameLight: 'light' });

  return (
    <div onClick={darkMode.toggle} className='cursor-pointer'>
      {darkMode.value ? <FiMoon /> : <FiSun /> }
    </div>
  );
};

export default DarkModeToggle;
