import Tippy from '@tippyjs/react/headless'
import { useMotionValue, animate, motion } from 'framer-motion'
import { useState } from 'react'

export default function Popup({
  children,
  render,
  className,
  placement = 'right'
}) {
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
        placement={placement}
        interactive
        onMount={onMount}
        onHide={() => setOpen(false)}
        plugins={[hideOnPopperBlur]}
        zIndex={9999}
        appendTo={document.body}
      >
        {children}
      </Tippy>
    </>
  )
}
