import { Menu, Transition } from '@headlessui/react'
import React from 'react'

export default function Dropdown({ button, children, className, style }) {
  return (
    <div className="relative inline-block">
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button className="focus:outline-none">{button}</Menu.Button>

            <Transition
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                style={style}
                className={`absolute right-0 w-full origin-top z-10 outline-none ${className}`}
              >
                {children.map((item, index) => (
                  <Menu.Item key={index}>{item}</Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  )
}
