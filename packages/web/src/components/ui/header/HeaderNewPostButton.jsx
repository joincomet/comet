import Tippy from '@tippyjs/react'
import { HiPlusCircle } from 'react-icons/hi'
import React from 'react'

export default function HeaderNewPostButton({ setOpen }) {
  return (
    <Tippy content="New Post">
      <div
        onClick={() => setOpen(true)}
        className="text-gray-800 dark:text-gray-200 dark:hover:text-white hover:text-black cursor-pointer"
      >
        <HiPlusCircle className="h-5 w-5" />
      </div>
    </Tippy>
  )
}
