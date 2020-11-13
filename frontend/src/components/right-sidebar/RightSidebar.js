import {
  FiFolder,
  FiFolderPlus,
  FiStar,
  FiUsers,
  FiUserPlus,
  FiGlobe,
  FiSettings
} from 'react-icons/fi'
import { HiCog } from 'react-icons/hi'
import Tippy from '@tippyjs/react'
import React from 'react'
import CometXLinks from '@/components/CometXLinks'
import Folder from '@/components/right-sidebar/folders/Folder'
import DirectMessage from '@/components/right-sidebar/dms/DirectMessage'
import DirectMessages from '@/components/right-sidebar/dms/DirectMessages'
import Folders from '@/components/right-sidebar/folders/Folders'
import UserInfo from '@/components/right-sidebar/UserInfo'
import DarkModeToggle from '@/components/DarkModeToggle'
import Image from 'next/image'

export default function RightSidebar() {
  return (
    <nav className="w-nav fixed top-0 right-0 z-20 flex flex-col hidden h-full min-h-full overflow-y-auto bg-white shadow-lg dark:bg-gray-800 sm:block">
      {/*        <UserInfo />

        <CometXLinks />*/}

      <div className="relative">
        <div className="w-nav pl-6 pr-3 py-3 fixed bottom-0 right-0 hidden sm:inline-flex border-t dark:border-gray-700 cursor-pointer items-center">
          <div className="w-8 h-8 relative">
            <div className="absolute w-2.5 h-2.5 ring dark:ring-gray-800 bg-green-500 rounded-full bottom-0 right-0 z-10" />
            <Image
              src="/avatar.jpg"
              width={32}
              height={32}
              className="rounded-full object-cover object-center"
            />
          </div>

          <div className="ml-4">
            <div className="text-xs text-secondary font-medium">
              Dan Beneventano
            </div>
            <div className="text-xs mt-0.5 text-tertiary font-medium">@Dan</div>
          </div>

          <div className="ml-auto mr-1.5 p-1.5 transition-150 transform hover:rotate-12 hover:scale-110 dark:hover:bg-gray-900 rounded-full">
            <HiCog size={20} className="text-disabled" />
          </div>
        </div>

        <div className="mt-6">
          <Folders />

          <DirectMessages />
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  )
}
