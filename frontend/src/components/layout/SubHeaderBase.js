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
          className="fixed z-50 top-14 left-64 right-0 h-14 flex items-center dark:bg-gray-900 px-8 border-b dark:border-gray-800"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
