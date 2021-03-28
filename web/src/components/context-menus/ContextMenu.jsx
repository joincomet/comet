import { Menu, Portal } from '@headlessui/react'
import { usePopper } from '@/lib/usePopper'
import ctl from '@netlify/classnames-template-literals'

const className = ctl(`
  p-2
  absolute
  right-0
  w-48
  origin-top-right
  dark:bg-gray-950
  rounded
  shadow-lg
  outline-none
`)

export default function ContextMenu({ children, button }) {
  let [trigger, container] = usePopper({
    placement: 'bottom-end',
    strategy: 'fixed'
  })
  return (
    <Menu>
      {button ? (
        <>
          {button && button(trigger)}
          <Portal>
            <Menu.Items ref={container} static={!button} className={className}>
              {children}
            </Menu.Items>
          </Portal>
        </>
      ) : (
        <Menu.Items ref={container} static={!button} className={`${className}`}>
          {children}
        </Menu.Items>
      )}
    </Menu>
  )
}
