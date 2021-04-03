import { IconSpinner } from '@/components/ui/icons/Icons'
import { motion } from 'framer-motion'
import { VectorLogo } from '@/components/ui/vectors'

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, delay: 0.3 }}
      style={{ zIndex: 9999 }}
      className="h-full fixed inset-0 flex items-center justify-center dark:bg-gray-800"
    >
      <div className="space-y-8">
        <VectorLogo className="w-36" />
        <div className="flex items-center justify-center">
          <IconSpinner />
        </div>
      </div>
    </motion.div>
  )
}
