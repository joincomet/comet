import React from 'react'
import { Menu } from '@headlessui/react'

export default function ContextMenu({ children }) {
  return (
    <Menu>
      {({ open }) => (
        <>
          <Menu.Items
            static
            className="p-2 absolute right-0 w-48 mt-4 origin-top-right dark:bg-gray-900 rounded shadow-lg outline-none transform translate-x-full"
          >
            {children}
          </Menu.Items>
        </>
      )}
    </Menu>
  )
}
