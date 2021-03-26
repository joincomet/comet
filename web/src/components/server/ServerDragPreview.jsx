import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ServerAvatar from '@/components/avatars/ServerAvatar'

export default function ServerDragPreview({ server, show }) {
  return (
    <div>
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
          >
            <ServerAvatar server={server} size={12} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
