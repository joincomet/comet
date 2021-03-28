import { AnimatePresence, motion } from 'framer-motion'

export default function PostDragPreview({ post, show }) {
  const split = post ? post.title.split(' ') : []
  const title = `${split.slice(0, 9).join(' ')}${
    split.length >= 9 ? '...' : ''
  }`

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
            className="bg-blue-500 bg-opacity-75 truncate w-64 rounded-md shadow-lg text-white text-sm font-medium h-10 px-2 flex items-center"
          >
            <div className="truncate">{title}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
