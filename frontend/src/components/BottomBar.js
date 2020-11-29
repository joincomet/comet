import { FiFolder, FiHome, FiMail, FiSearch } from 'react-icons/fi'
import React from 'react'

const bottomButton = 'h-16 w-full inline-flex cursor-pointer'

export default function BottomBar() {
  return (
    <div className="block sm:hidden items-center fixed z-10 justify-between text-tertiary bottom-0 left-0 right-0 h-14 bg-white dark:bg-gray-800 shadow-md flex border-t dark:border-gray-700">
      <div className={bottomButton}>
        <FiHome size={20} className="m-auto text-blue-500" />
      </div>

      <div className={bottomButton}>
        <FiSearch size={20} className="m-auto" />
      </div>

      <div className={bottomButton}>
        <FiFolder size={20} className="m-auto" />
      </div>

      <div className={bottomButton}>
        <FiMail size={20} className="m-auto" />
      </div>
    </div>
  )
}
