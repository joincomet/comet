import React, { useEffect, useRef, useState } from 'react'
import { FiSearch } from 'react-icons/fi'

export default function SearchBar() {
  let [searchFocused, setSearchFocused] = useState(false)
  const inputRef = useRef(null)

  const handleKeyDown = e => {
    if (e.keyCode === 191 && document.activeElement !== inputRef.current) {
      inputRef.current.focus()
      e.preventDefault()
    } else if (
      e.keyCode === 27 &&
      document.activeElement === inputRef.current
    ) {
      inputRef.current.blur()
      e.preventDefault()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  return (
    <div className="inline-flex items-center relative flex-grow">
      <input
        ref={inputRef}
        className="shadow-md w-full h-10 text-sm px-16 rounded-full dark:bg-gray-800 outline-none transition duration-200 ease-in-out border border-gray-800 focus:border-blue-500"
        placeholder='Search everything (press "/" to focus)'
        onFocus={() => setSearchFocused(true)}
        onBlur={() => setSearchFocused(false)}
      />
      <button
        className={`absolute left-6 transform focus:outline-none transition duration-200 ease-in-out ${
          searchFocused ? 'text-blue-500' : 'text-tertiary'
        }`}
        style={{ top: '0.8125rem' }}
      >
        <FiSearch className="h-4 w-4" />
      </button>
    </div>
  )
}
