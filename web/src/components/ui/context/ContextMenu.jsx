import { Menu, Portal } from '@headlessui/react'
import { usePopper } from '@/hooks/usePopper'
import ctl from '@netlify/classnames-template-literals'

const className = ctl(`
  block
  p-2
  absolute
  right-0
  w-48
  origin-top-right
  dark:bg-gray-900
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
          {button(trigger)}
          <Portal>
            <Menu.Items ref={container} static={false} className={className}>
              {children}
            </Menu.Items>
          </Portal>
        </>
      ) : (
        <Menu.Items static className={`${className}`}>
          {children}
        </Menu.Items>
      )}
    </Menu>
  )
}
