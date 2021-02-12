import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '@/components/ui/icons/Logo'
import IconSpinner from '@/components/ui/icons/IconSpinner'
import { useCurrentUserQuery } from '@/lib/queries'

export default function LoadingScreen({ children }) {
  const [{ fetching }] = useCurrentUserQuery()

  return (
    <AnimatePresence>
      {fetching || !children ? (
        <motion.div
          className="h-full flex items-center justify-center dark:bg-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="space-y-8">
            <Logo className="w-36" />
            <div className="flex items-center justify-center">
              <IconSpinner />
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
