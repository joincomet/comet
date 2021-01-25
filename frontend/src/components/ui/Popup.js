import Tippy from '@tippyjs/react/headless'
import PlanetInfoCard from '@/components/planet/PlanetInfoCard'
import { useMotionValue, animate, AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

export default function Popup({ children, render, className }) {
  const [open, setOpen] = useState(false)
  const x = useMotionValue(8)

  function onMount() {
    setOpen(true)
    x.set(8)
    animate(x, 0, { ease: [0.4, 0, 0.2, 1], duration: 0.15 })
  }

  const hideOnPopperBlur = {
    name: 'hideOnPopperBlur',
    defaultValue: true,
    fn(instance) {
      return {
        onCreate() {
          instance.popper.addEventListener('focusout', event => {
            if (
              instance.props.hideOnPopperBlur &&
              event.relatedTarget &&
              !instance.popper.contains(event.relatedTarget)
            ) {
              instance.hide()
            }
          })
        }
      }
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
              className={`fixed bottom-0 right-0 left-0 block lg:hidden w-full ${className}`}
              style={{ zIndex: 9999 }}
            >
              {render}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
              className={`fixed bottom-0 top-0 right-0 left-0 block lg:hidden bg-black`}
              style={{ zIndex: 9998 }}
            />
          </>
        )}
      </AnimatePresence>

      <Tippy
        render={attrs => (
          <motion.div
            style={{
              x
            }}
            {...attrs}
            className={`hidden lg:block ${className}`}
          >
            {render}
          </motion.div>
        )}
        trigger="click"
        placement="right"
        interactive
        onMount={onMount}
        onHide={() => setOpen(false)}
        plugins={[hideOnPopperBlur]}
      >
        {children}
      </Tippy>
    </>
  )
}
