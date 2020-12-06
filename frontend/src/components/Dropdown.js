import { Menu, Transition } from '@headlessui/react'
import React from 'react'

export default function Dropdown({
  button,
  children,
  className,
  buttonClassName,
  style
}) {
  if (!Array.isArray(children)) children = [children]

  return (
    <Menu>
      {({ open }) => (
        <>
          <Menu.Button className={buttonClassName}>{button}</Menu.Button>

          <div className="relative">
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
                className={`absolute right-0 w-full origin-top outline-none ${className}`}
              >
                {children.map((item, index) => (
                  <Menu.Item key={index}>{item}</Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </div>
        </>
      )}
    </Menu>
  )
}
