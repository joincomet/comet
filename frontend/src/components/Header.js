import React, {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import SearchBar from "@/components/SearchBar";
import SortDropdown from "@/components/SortDropdown";

export default function Header({ children, sticky = false, className, ...rest }) {
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
            className="fixed inset-x-center bottom-8 px-16 py-2 text-white font-medium text-sm rounded-full bg-blue-500 shadow z-10 cursor-pointer"
          >
            Create post
          </motion.div>
        )}
      </AnimatePresence>

      <header
        style={{ top: '-1px' }}
        className={`z-10 sticky h-16 px-3 2xl:px-72 flex items-center transition ${
          isSticky ? 'dark:bg-gray-800 bg-white shadow-md' : 'bg-transparent'
        }`}
        ref={ref}
        {...rest}
      >
        <SearchBar
          slashFocus={true}
          className={`w-full h-10 text-sm px-16 rounded-full outline-none transition duration-200 ease-in-out border border-gray-200 dark:border-gray-800 focus:border-blue-500 ${
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
