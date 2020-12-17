import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { usePopper } from 'react-popper'
import { AnimatePresence, motion } from 'framer-motion'
import { useClickAway } from 'react-use'
import NavLink from '@/components/NavLink'
import PlanetAvatar from '@/components/planet/PlanetAvatar'

export default function PlanetPopup({
  planet,
  children,
  placement = 'right-start'
}) {
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement
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
                      x: 8
                    }}
                    animate={{
                      x: 0
                    }}
                    transition={{ duration: 0.15, ease: 'easeInOut' }}
                    className="relative dark:bg-gray-800 rounded-md shadow-xl p-3 flex flex-col items-center z-50 w-64"
                  >
                    <PlanetAvatar planet={planet} className="w-20 h-20" />
                    <div className="mt-3 font-medium">{planet.name}</div>
                    <div className="mt-1 text-sm text-tertiary">
                      {planet.userCount} Members
                    </div>

                    <div className="flex items-center mt-3 space-x-3 w-full">
                      <NavLink
                        href={`/planet/${planet.name}`}
                        className="text-accent border rounded dark:border-gray-700 w-full h-9 inline-flex items-center justify-center text-sm font-medium cursor-pointer"
                      >
                        View Planet
                      </NavLink>

                      <div className="text-white w-full h-9 rounded bg-blue-600 inline-flex items-center justify-center text-sm font-medium cursor-pointer">
                        Join
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>,
          document.querySelector('#userpopover')
        )}
    </>
  )
}
