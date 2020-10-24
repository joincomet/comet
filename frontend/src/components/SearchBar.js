import React, { useEffect, useRef, useState } from 'react'
import { FiSearch } from 'react-icons/fi'

export default function SearchBar({ className, slashFocus }) {
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

  if (slashFocus) {
    useEffect(() => {
      window.addEventListener('keydown', handleKeyDown)

      return () => window.removeEventListener('keydown', handleKeyDown)
    })
  }

  return (
    <div className="inline-flex items-center relative flex-grow">
      <input
        ref={inputRef}
        className={className}
        placeholder=""
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
