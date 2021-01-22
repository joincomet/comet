import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

export default function SubHeaderBase({ show, children }) {
  return (
    <AnimatePresence>
      {show && (
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
          transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
          className="hidden md:flex fixed z-30 top-14 left-0 md:left-64 right-0 h-14 items-center bg-white dark:bg-gray-900 px-4 md:px-8 border-b dark:border-gray-800"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
