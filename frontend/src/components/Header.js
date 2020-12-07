import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SearchBar from '@/components/SearchBar'
import SortDropdown from '@/components/SortDropdown'
import { FiEdit } from 'react-icons/fi'

export default function Header({ children, className, ...rest }) {
  const [isSticky, setIsSticky] = useState(false)
  const ref = React.createRef()

  // mount
  useEffect(() => {
    const cachedRef = ref.current,
      observer = new IntersectionObserver(
        ([e]) => setIsSticky(e.intersectionRatio < 1),
        { threshold: [1] }
      )

    observer.observe(cachedRef)

    // unmount
    return function () {
      observer.unobserve(cachedRef)
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        {isSticky && (
          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
            className="hidden sm:inline-flex fixed items-center flex-nowrap inset-x-center bottom-8 px-12 h-10 text-white select-none font-medium text-sm rounded-full transition bg-blue-500 hover:bg-blue-600 shadow z-10 cursor-pointer"
          >
            Create post
            <FiEdit size={20} className="text-white ml-3" />
          </motion.div>
        )}
      </AnimatePresence>

      <header
        style={{ top: '-1px' }}
        className={`hidden sm:flex z-10 sticky h-16 px-3 2xl:px-72 items-center transition ${
          isSticky ? 'dark:bg-gray-800 bg-white shadow-md' : 'bg-transparent'
        }`}
        ref={ref}
        {...rest}
      >
        <SearchBar
          slashFocus={true}
          className={`w-full h-10 text-sm px-16 rounded-full focus:shadow-md outline-none transition border border-gray-200 dark:border-gray-800 focus:border-blue-500 dark:focus:border-blue-500 ${
            isSticky
              ? 'dark:bg-gray-700 bg-gray-100'
              : 'dark:bg-gray-800 bg-white'
          }`}
        />
        <SortDropdown />
      </header>
    </>
  )
}
