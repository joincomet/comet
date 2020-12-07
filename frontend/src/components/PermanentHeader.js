import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SearchBar from '@/components/SearchBar'
import SortDropdown from '@/components/SortDropdown'
import { FiEdit } from 'react-icons/fi'

export default function PermanentHeader({ children, className, ...rest }) {
  return (
    <>
      <header
        style={{ top: '-1px' }}
        className={`hidden sm:flex z-10 sticky h-16 px-3 2xl:px-72 items-center transition dark:bg-gray-800 bg-white shadow-md`}
        {...rest}
      >
        <SearchBar
          slashFocus={true}
          className={`w-full h-10 text-sm px-16 rounded-full focus:shadow-md outline-none transition border border-gray-200 dark:border-gray-800 focus:border-blue-500 dark:focus:border-blue-500 dark:bg-gray-700 bg-gray-100`}
        />
        <SortDropdown />
      </header>
    </>
  )
}
