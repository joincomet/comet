import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '@/components/ui/icons/Logo'
import IconSpinner from '@/components/ui/icons/IconSpinner'
import { useCurrentUserQuery } from '@/graphql/queries'

export default function LoadingScreen() {
  return (
    <div className="h-full flex items-center justify-center dark:bg-gray-800">
      <div className="space-y-8">
        <Logo className="w-36" />
        <div className="flex items-center justify-center">
          <IconSpinner />
        </div>
      </div>
    </div>
  )
}
