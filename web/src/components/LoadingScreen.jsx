import React from 'react'
import { useQuery } from '@apollo/client'
import { CURRENT_USER_QUERY } from '@/lib/queries/useCurrentUser'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '@/components/ui/icons/Logo'
import IconSpinner from '@/components/ui/icons/IconSpinner'

export default function LoadingScreen({ children }) {
  const { loading } = useQuery(CURRENT_USER_QUERY)

  return (
    <AnimatePresence>
      {loading ? (
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
