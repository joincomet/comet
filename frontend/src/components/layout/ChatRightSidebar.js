import { FiSearch, FiUserPlus } from 'react-icons/fi'
import { CgInfinity } from 'react-icons/cg'
import { BiHomeAlt } from 'react-icons/bi'
import NavLink from '../NavLink'
import Logo from '@/components/Logo'
import React, { useEffect, useState } from 'react'
import RSC from 'react-scrollbars-custom'
import { AnimatePresence, motion } from 'framer-motion'
import { useCurrentUser } from '@/lib/queries/useCurrentUser'
import { useHeaderStore } from '@/lib/stores/useHeaderStore'
import { useRouter } from 'next/router'

const link =
  'cursor-pointer relative text-xs font-medium dark:hover:bg-gray-800 hover:bg-gray-200 px-6 h-10 flex items-center transition'

export default function ChatRightSidebar() {
  const currentUser = useCurrentUser().data

  const { sidebar, setSidebar } = useHeaderStore()

  const { query, pathname } = useRouter()

  useEffect(() => setSidebar(false), [query, pathname])

  return (
    <>
      <AnimatePresence>
        {sidebar && (
          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 0.75
            }}
            exit={{
              opacity: 0
            }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
            onClick={() => setSidebar(false)}
            className={`z-30 fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-gray-900`}
          />
        )}
      </AnimatePresence>
      <nav
        className={`w-64 top-0 bottom-0 right-0 fixed z-50 flex flex-col overflow-y-auto bg-white dark:bg-gray-900 transform duration-300 transition ${
          sidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <NavLink href="/" className="flex items-center h-14 px-4">
          <Logo className="h-4 dark:text-gray-200 text-black" />
          <div className="ml-3 mt-2 label text-tertiary">alpha</div>
        </NavLink>
        <div>
          <NavLink
            className={`${link} ${
              pathname === '/' ? 'text-accent navitem-active' : 'text-tertiary'
            }`}
          >
            <FiUserPlus className="w-5 h-5" />
            <span className="ml-6">Direct Message</span>
          </NavLink>
        </div>
      </nav>
    </>
  )
}

function CustomScrollbars({
  children,
  forwardedRef,
  onScroll,
  style,
  className
}) {
  return (
    <RSC
      className={className}
      style={style}
      scrollerProps={{
        renderer: props => {
          const { elementRef, onScroll: rscOnScroll, ...restProps } = props

          return (
            <span
              {...restProps}
              onScroll={e => {
                onScroll(e)
                rscOnScroll(e)
              }}
              ref={ref => {
                forwardedRef(ref)
                elementRef(ref)
              }}
            />
          )
        }
      }}
    >
      {children}
    </RSC>
  )
}

const CustomScrollbarsVirtualList = React.forwardRef((props, ref) => (
  <CustomScrollbars {...props} forwardedRef={ref} />
))
