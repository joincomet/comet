import ctl from '@netlify/classnames-template-literals'
import { useStore } from '@/hooks/useStore'
import ServerList from '@/components/server/list/ServerList'
import { motion, AnimatePresence } from 'framer-motion'

const sidebarClass = ctl(`
  transition
  md:transition-none
  fixed
  md:relative
  md:translate-x-0
  top-0
  bottom-0
  bg-gray-200
  dark:bg-gray-800
  transform
  z-50
  md:z-0
`)

const leftClass = show =>
  ctl(`
  left-0
  md:rounded-tl-lg
  ${show ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
  flex
  md:w-60
  md:min-w-[15rem]
  w-78
  min-w-[19.5rem]
`)

const rightClass = show =>
  ctl(`
  right-0
  ${show ? 'translate-x-0' : 'translate-x-full'}
  ${show ? 'md:block' : 'md:hidden'}
  w-60
  min-w-[15rem]
`)

const overlayClass = ctl(`
  bg-black
  bg-opacity-75
  md:hidden
  fixed
  inset-0
  z-40
`)

export default function Sidebar({ children, right = false }) {
  const [
    showLeftSidebar,
    setShowLeftSidebar,
    showRightSidebar,
    setShowRightSidebar
  ] = useStore(s => [
    s.showLeftSidebar,
    s.setShowLeftSidebar,
    s.showRightSidebar,
    s.setShowRightSidebar
  ])
  return (
    <>
      <AnimatePresence>
        {(right ? showRightSidebar : showLeftSidebar) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className={overlayClass}
            onClick={() => {
              if (right && showRightSidebar) setShowRightSidebar(false)
              else if (!right && showLeftSidebar) setShowLeftSidebar(false)
            }}
          />
        )}
      </AnimatePresence>

      <div
        className={`${sidebarClass} ${
          right ? rightClass(showRightSidebar) : leftClass(showLeftSidebar)
        }`}
      >
        {!right && (
          <div
            className={`md:hidden`}
            onClick={() => setShowLeftSidebar(false)}
          >
            <ServerList />
          </div>
        )}
        <div
          className="relative h-full w-full scrollbar-dark overflow-y-auto"
          onClick={() => {
            if (!right) setShowLeftSidebar(false)
          }}
        >
          {children}
        </div>
      </div>
    </>
  )
}
