import Folder, { folderClass } from '@/components/right-sidebar/folders/Folder'
import { FiFolderPlus } from 'react-icons/fi'
import React from 'react'

export default function Folders() {
  return (
    <>
      <div className="mx-6 mb-3 font-header text-tertiary">My Folders</div>
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

      <div className={folderClass}>
        <FiFolderPlus className="w-5 h-5" />
        <span className="ml-6">New Folder</span>
      </div>
    </>
  )
}
