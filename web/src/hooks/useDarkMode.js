import useDark from 'use-dark-mode'

export const useDarkMode = () =>
  useDark(true, {
    classNameDark: 'dark',
    classNameLight: 'light',
    element: document.documentElement
  })
