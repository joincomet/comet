import React from 'react'
import { Menu } from '@headlessui/react'
import { IconChevrownRight } from '@/lib/Icons'

export default function ContextMenuItem({
  label,
  onClick,
  red = false,
  arrow = false
}) {
  return (
    <Menu.Item onClick={onClick}>
      {({ active }) => (
        <div
          className={`${
            active
              ? `text-white dark:text-white ${
                  red ? 'dark:bg-red-500' : 'dark:bg-green-600'
                }`
              : red
              ? 'text-red-500'
              : 'text-gray-600 dark:text-gray-400'
          } ${
            red ? 'dark:active:bg-red-600' : 'dark:active:bg-green-700'
          } active:text-white dark:active:text-white flex select-none cursor-pointer w-full px-2 h-8 flex items-center text-13 rounded-sm font-medium focus:outline-none`}
        >
          {label}
          {arrow && <IconChevrownRight className="w-5 h-5 ml-auto" />}
        </div>
      )}
    </Menu.Item>
  )
}
