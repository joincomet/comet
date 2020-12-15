import UserAvatar from '@/components/user/UserAvatar'
import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { usePopper } from 'react-popper'
import { AnimatePresence, motion } from 'framer-motion'
import { useClickAway } from 'react-use'
import { FiExternalLink } from 'react-icons/fi'
import NavLink from '@/components/NavLink'

export default function UserPopup({ user, children }) {
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)
  const [arrowElement, setArrowElement] = useState(null)
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    placement: 'right-start'
  })

  const [show, setShow] = useState(false)

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
      <div ref={setReferenceElement} onClick={() => setShow(!show)}>
        {children}
      </div>

      {show &&
        ReactDOM.createPortal(
          <div
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            <AnimatePresence>
              {show && (
                <>
                  <motion.div
                    ref={clickAwayRef}
                    initial={{
                      x: 6
                    }}
                    animate={{
                      x: 0
                    }}
                    transition={{ duration: 0.15, ease: 'easeInOut' }}
                    className="relative dark:bg-gray-800 rounded-md shadow-xl p-3 flex flex-col items-center z-50 w-64 bg-opacity-75"
                  >
                    <UserAvatar user={user} showOnline className="w-20 h-20" />
                    <div className="mt-3 font-medium">{user.name}</div>
                    <div className="mt-1 text-sm text-tertiary">
                      @{user.username}
                    </div>

                    <div className="flex items-center mt-3 space-x-3 w-full">
                      <NavLink
                        href={`/user/${user.username}`}
                        className="text-accent border rounded dark:border-gray-700 w-full h-9 inline-flex items-center justify-center text-sm font-medium cursor-pointer"
                      >
                        View profile
                      </NavLink>

                      <div className="text-white w-full h-9 rounded bg-blue-600 inline-flex items-center justify-center text-sm font-medium cursor-pointer">
                        Follow
                      </div>
                    </div>
                  </motion.div>
                  <div ref={setArrowElement} style={styles.arrow} />
                </>
              )}
            </AnimatePresence>
          </div>,
          document.querySelector('#userpopover')
        )}
    </>
  )
}
