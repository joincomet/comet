import LeftSidebar from './LeftSidebar'
import TopBar from '@/components/TopBar'
import { AnimatePresence, motion } from 'framer-motion'

export default function Layout({ children, showTopBar }) {
  return (
    <div>
      <AnimatePresence>
        {showTopBar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <TopBar />
          </motion.div>
        )}
      </AnimatePresence>

      <LeftSidebar />

      <main>{children}</main>
    </div>
  )
}
