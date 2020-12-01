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
import { SiDiscord } from 'react-icons/si'
import Tippy from '@tippyjs/react'
import React from 'react'
import Folder from '@/components/right-sidebar/folders/Folder'
import DirectMessage from '@/components/right-sidebar/dms/DirectMessage'
import DirectMessages from '@/components/right-sidebar/dms/DirectMessages'
import Folders from '@/components/right-sidebar/folders/Folders'
import ToggleTheme from '@/components/ToggleTheme'
import Image from 'next/image'

export default function RightSidebar() {
  return (
    <nav className="w-nav fixed top-0 right-0 z-20 flex flex-col hidden h-full min-h-full overflow-y-auto bg-white shadow-lg dark:bg-gray-800 sm:block">
      <div className="relative">
        <UserInfo />

        <div className="mt-6">
          <Folders />

          <DirectMessages />
          <ToggleTheme />
        </div>
      </div>
    </nav>
  )
}

function UserInfo() {
  return (
    <div className="w-nav fixed bottom-0 right-0 hidden sm:block">
      <div className="h-16 mx-5 px-3 border-t dark:border-gray-700 cursor-pointer items-center flex">
        <div className="w-8 h-8 relative">
          <div className="absolute w-2.5 h-2.5 ring dark:ring-gray-800 ring-white bg-green-500 rounded-full bottom-0 right-0 z-10" />
          <Image
            src="/avatar.jpg"
            width={32}
            height={32}
            className="rounded-full object-cover object-center"
          />
        </div>

        <div className="ml-4">
          <div className="text-xs text-primary font-medium">
            Dan Beneventano
          </div>
          <div className="text-xs mt-0.5 text-tertiary font-medium">@Dan</div>
        </div>

        <div className="ml-auto mr-1.5 p-1.5 transition transform hover:rotate-12 hover:scale-110 dark:hover:bg-gray-900 hover:bg-gray-200 rounded-full">
          <HiCog size={20} className="text-disabled" />
        </div>
      </div>
    </div>
  )
}
