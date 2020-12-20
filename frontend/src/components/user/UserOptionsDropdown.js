// @refresh reset
import { useCurrentUser } from '@/lib/queries/useCurrentUser'
import React, { useEffect, useRef, useState } from 'react'
import { usePopper } from 'react-popper'
import { useClickAway } from 'react-use'
import ReactDOM from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import UserAvatar from '@/components/user/UserAvatar'
import NavLink from '@/components/NavLink'
import { useLogoutMutation } from '@/lib/mutations/authMutations'
import { useQueryClient } from 'react-query'
import { useRouter } from 'next/router'

const item =
  'transition hover:bg-gray-700 cursor-pointer px-4 h-10 flex items-center text-sm text-secondary'

export default function UserOptionsDropdown() {
  const currentUser = useCurrentUser().data

  const queryClient = useQueryClient()

  const logoutMutation = useLogoutMutation()
  const logout = async () => {
    await logoutMutation.mutateAsync({})
    await queryClient.invalidateQueries()
  }

  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [-128]
        }
      }
    ]
  })

  const [show, setShow] = useState(false)

  const { query, pathname } = useRouter()

  useEffect(() => setShow(false), [query, pathname])

  const clickAwayRef = useRef(null)
  useClickAway(clickAwayRef, ({ target }) => {
    if (
      target !== referenceElement &&
      !referenceElement.contains(target) &&
      show
    )
      setShow(false)
  })

  return (
    <>
      <div
        ref={setReferenceElement}
        onClick={() => setShow(!show)}
        className="inline-flex flex-nowrap items-center cursor-pointer select-none"
      >
        <UserAvatar user={currentUser} />
        <div className="ml-3 label">{currentUser.name}</div>
      </div>

      {
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <AnimatePresence>
            {show && (
              <motion.div
                ref={clickAwayRef}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15, ease: 'easeInOut' }}
                className="origin-top-right relative dark:bg-gray-800 rounded-md shadow-xl z-50 w-32"
              >
                <NavLink
                  href={`/user/${currentUser.username}`}
                  className={item}
                >
                  My Profile
                </NavLink>
                <NavLink href="/settings" className={item}>
                  Settings
                </NavLink>
                <div onClick={() => logout()} className={item}>
                  Log Out
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      }
    </>
  )
}
