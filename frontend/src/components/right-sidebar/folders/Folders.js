import Folder from '@/components/right-sidebar/folders/Folder'
import { FiFolderPlus } from 'react-icons/fi'
import React from 'react'

export default function Folders() {
  return (
    <>
      <div className="mx-6 mb-3 font-header text-tertiary">Folders</div>
      <Folder
        folder={{ name: 'Favorites', type: 'PRIVATE', color: '#eab308' }}
      />
      <Folder folder={{ name: 'Read Later', type: 'PRIVATE' }} />
      <Folder
        folder={{
          name: 'Best Posts Ever',
          type: 'SHARED',
          color: '#22c55e'
        }}
      />
      <Folder
        folder={{
          name: 'Cool Pics',
          type: 'PUBLIC',
          color: '#f97316'
        }}
      />

      <div className="flex flex-row items-center h-12 px-6 transition-150 cursor-pointer text-tertiary dark:hover:bg-gray-700">
        <FiFolderPlus className="w-8 h-8 p-1.5" />
        <span className="ml-6 text-sm font-medium">New Folder</span>
      </div>
    </>
  )
}
