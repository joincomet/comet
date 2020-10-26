import Folder from '@/components/right-sidebar/folders/Folder'
import { FiFolderPlus } from 'react-icons/fi'
import React from 'react'

export default function Folders() {
  return (
    <>
      <div className="mx-5 mb-3 text-xs font-mono font-base text-tertiary">
        Folders
      </div>
      <Folder folder={{ name: 'Favorites', type: 'PRIVATE' }} />
      <Folder folder={{ name: 'Read Later', type: 'PRIVATE' }} />
      <Folder
        folder={{
          name: 'Best Posts Ever',
          type: 'SHARED',
          color: 'text-green-500'
        }}
      />
      <Folder
        folder={{
          name: 'Cool Pics',
          type: 'PUBLIC',
          color: 'text-orange-500'
        }}
      />

      <div className="flex flex-row items-center h-12 px-6 transition duration-150 ease-in-out cursor-pointer text-tertiary dark:hover:bg-gray-700">
        <FiFolderPlus className="w-8 h-8 p-1.5" />
        <span className="ml-6 text-sm font-medium">New Folder</span>
      </div>
    </>
  )
}
