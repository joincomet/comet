import DirectMessage from '@/components/right-sidebar/dms/DirectMessage'
import { FiUserPlus } from 'react-icons/fi'
import React from 'react'
import Tippy from '@tippyjs/react'
import Image from 'next/image'

export default function DirectMessages() {
  return (
    <>
      <div className="mx-6 mt-6 mb-3 font-header text-tertiary">
        Direct Messages
      </div>

      {/*<DirectMessage
        user={{
          profile: {
            realName: 'Michael Perino',
            avatarURL:
              'https://pbs.twimg.com/profile_images/1278741528425517057/oQbjgrA2_400x400.jpg'
          }
        }}
      />*/}

      {/*<Tippy content="This feature is coming soon">
        <div className="flex flex-row items-center h-12 px-6 transition duration-150 ease-in-out cursor-pointer text-disabled dark:hover:bg-gray-700">
          <FiUserPlus className="w-8 h-8 p-1" />
          <span className="ml-6 text-sm font-medium">Coming Soon...</span>
        </div>
      </Tippy>*/}

      <div className="sidebar-item">
        <Image
          src="/avatar.jpg"
          width={20}
          height={20}
          className="object-cover object-center rounded-full"
        />
        <span className="text-xs ml-6 font-semibold tracking-wide">
          Dan Beneventano
        </span>

        <span className="h-1.5 w-1.5 bg-blue-500 rounded-full ml-3" />
      </div>
    </>
  )
}
