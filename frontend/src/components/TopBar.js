import { FiBell, FiUser } from 'react-icons/fi'
import React from 'react'

export default function TopBar({ setSidebarOpen }) {
  return (
    <div className="sm:hidden flex fixed top-0 left-0 right-0 items-center h-14 border-b dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md z-10">
      <div
        onClick={() => setSidebarOpen(true)}
        className="rounded-full bg-gray-200 dark:bg-gray-700 inline-flex h-8 w-8 ml-3 mr-5"
      >
        <FiUser size={16} className="text-gray-500 m-auto" />
      </div>
      <span className="font-medium text-lg">Home</span>
      <div className="w-14 h-14 inline-flex ml-auto">
        <FiBell size={20} className="text-tertiary m-auto" />
      </div>
    </div>
  )
}
