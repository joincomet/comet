import Avatar from '@/components/avatar/Avatar'
import React, { useState } from 'react'
import { usePopper } from 'react-popper'
import { AnimatePresence, motion } from 'framer-motion'

export default function AvatarPopup({
  user,
  loading = 'lazy',
  className = 'w-10 h-10'
}) {
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)
  const [arrowElement, setArrowElement] = useState(null)
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    placement: 'right-start'
  })

  const [show, setShow] = useState(false)

  return (
    <>
      <div ref={setReferenceElement} onClick={() => setShow(!show)}>
        <Avatar
          avatarUrl={user.avatarUrl}
          loading={loading}
          className={className}
        />
      </div>

      {show && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <AnimatePresence>
            {show && (
              <>
                <motion.div
                  initial={{
                    x: 6
                  }}
                  animate={{
                    x: 0
                  }}
                  transition={{ duration: 0.15, ease: 'easeInOut' }}
                  style={{ backdropFilter: 'blur(3px)' }}
                  className="bg-blue-500 rounded-md shadow-2xl p-3 flex flex-col items-center z-50 w-64 bg-opacity-75"
                >
                  <Avatar avatarUrl={user.avatarUrl} className="w-16 h-16" />
                  <div className="mt-3 font-medium">{user.name}</div>
                  <div className="mt-1 text-sm text-tertiary">
                    @{user.username}
                  </div>
                </motion.div>
                <div ref={setArrowElement} style={styles.arrow} />
              </>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  )
}
