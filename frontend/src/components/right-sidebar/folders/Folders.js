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

      <div className="sidebar-item">
        <FiFolderPlus className="w-5 h-5 p-0.5" />
        <span className="text-xs ml-6 font-semibold tracking-wide">
          New Folder
        </span>
      </div>
    </>
  )
}
