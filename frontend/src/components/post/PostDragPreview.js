import React, { useEffect, useState, memo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export const PostDragPreview = memo(({ post, show }) => {
  return (
    <div className="transform -translate-x-1/2 -translate-y-full">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{
              scale: 0.75,
              opacity: 0
            }}
            animate={{
              scale: 1,
              opacity: 1
            }}
            exit={{
              scale: 0.75,
              opacity: 0
            }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
            className="bg-blue-500 bg-opacity-75 rounded-md shadow-lg text-white text-sm font-medium px-6 h-10 inline-flex items-center"
          >
            {post && post.title}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})
