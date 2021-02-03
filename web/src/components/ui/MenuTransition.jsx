import { Transition } from '@headlessui/react'

export default function MenuTransition({ show, children }) {
  return (
    <Transition
      show={show}
      {...{
        enter: 'transition ease-out duration-100',
        enterFrom: 'transform opacity-0 scale-95',
        enterTo: 'transform opacity-100 scale-100',
        leave: 'transition ease-in duration-75',
        leaveFrom: 'transform opacity-100 scale-100',
        leaveTo: 'transform opacity-0 scale-95'
      }}
    >
      {children}
    </Transition>
  )
}
