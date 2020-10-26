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
import Folder from '@/components/Folder'
import DirectMessage from '@/components/DirectMessage'

export default function FolderSidebar() {
  return (
    <>
      <nav
        className="fixed top-0 right-0 z-20 flex flex-col hidden h-full min-h-full overflow-y-auto bg-white shadow-lg dark:bg-gray-800 sm:block"
        style={{ width: '17.5rem' }}
      >
        <div className="flex flex-col items-center flex-grow py-5 mx-4 border-b border-gray-200 dark:border-gray-700">
          <img
            className="w-24 h-24 transition duration-150 ease-in-out transform bg-indigo-500 border-2 border-blue-500 rounded-full cursor-pointer hover:scale-105"
            src="https://pbs.twimg.com/profile_images/1312166598086598658/I2-2CTFg_400x400.jpg"
          />
          <div className="inline-flex items-center mt-3 text-lg font-semibold">
            Dan Beneventano
            <span className="flex w-3 h-3 ml-3 cursor-pointer">
              <span className="absolute inline-flex w-3 h-3 p-1 bg-green-500 rounded-full opacity-75 animate-online" />
              <span className="relative inline-flex w-3 h-3 bg-green-500 rounded-full" />
            </span>
          </div>
          <div className="font-medium mt-0.5 text-tertiary text-sm ">@Dan</div>
        </div>

        <CometXLinks />

        <div className="mt-6">
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

          <div className="mx-5 mt-6 mb-3 font-mono text-xs text-tertiary font-base">
            Direct Messages & Groups
          </div>

          <DirectMessage
            user={{
              profile: {
                realName: 'Michael Perino',
                avatarURL:
                  'https://pbs.twimg.com/profile_images/1278741528425517057/oQbjgrA2_400x400.jpg'
              }
            }}
          />

          <div className="flex flex-row items-center h-12 px-6 transition duration-150 ease-in-out cursor-pointer text-tertiary dark:hover:bg-gray-700">
            <FiUserPlus className="w-8 h-8 p-1" />
            <span className="ml-6 text-sm font-medium">New Direct Message</span>
          </div>
        </div>
      </nav>
    </>
  )
}
