import { IconSpinner, GraphicLogo } from '@/lib/Icons'
import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ zIndex: 9999 }}
      className="h-full fixed inset-0 flex items-center justify-center dark:bg-gray-800"
    >
      <div className="space-y-8">
        <GraphicLogo className="w-36" />
        <div className="flex items-center justify-center">
          <IconSpinner />
        </div>
      </div>
    </motion.div>
  )
}
