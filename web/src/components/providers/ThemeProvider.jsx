import { useState, useEffect, useContext } from 'react'

const ThemeContext = React.createContext('dark')

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(global.window?.__theme || 'dark')
  const toggleTheme = () => {
    global.window.__setPreferredTheme(theme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    global.window.__onThemeChange = setTheme
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
