import { FiFolder, FiHome, FiMail, FiSearch, FiBell } from 'react-icons/fi'
import React from 'react'
import NavLink from '@/components/NavLink'

const bottomButton =
  'h-16 w-full inline-flex items-center justify-center cursor-pointer'

export default function BottomBar() {
  return (
    <div className="block lg:hidden items-center fixed z-10 justify-between text-tertiary bottom-0 left-0 right-0 h-14 bg-white dark:bg-gray-800 shadow-md flex border-t dark:border-gray-700">
      <NavLink href="/" className={bottomButton}>
        <FiHome size={20} className="text-blue-500" />
      </NavLink>

      <div className={bottomButton}>
        <FiSearch size={20} />
      </div>

      <div className={bottomButton}>
        <FiBell size={20} />
      </div>
    </div>
  )
}
