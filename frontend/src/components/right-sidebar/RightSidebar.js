import {
  FiFolder,
  FiFolderPlus,
  FiStar,
  FiUsers,
  FiUserPlus,
  FiGlobe
} from 'react-icons/fi'
import Tippy from '@tippyjs/react'
import React from 'react'
import CometXLinks from '@/components/CometXLinks'
import Folder from '@/components/right-sidebar/folders/Folder'
import DirectMessage from '@/components/right-sidebar/dms/DirectMessage'
import DirectMessages from '@/components/right-sidebar/dms/DirectMessages'
import Folders from '@/components/right-sidebar/folders/Folders'
import UserInfo from '@/components/right-sidebar/UserInfo'

export default function RightSidebar() {
  return (
    <>
      <nav
        className="fixed top-0 right-0 z-20 flex flex-col hidden h-full min-h-full overflow-y-auto bg-white shadow-lg dark:bg-gray-800 sm:block"
        style={{ width: '17.5rem' }}
      >
        <UserInfo />

        <CometXLinks />

        <div className="mt-6">
          <Folders />

          <DirectMessages />
        </div>
      </nav>
    </>
  )
}
