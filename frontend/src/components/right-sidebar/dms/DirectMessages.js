import DirectMessage from '@/components/right-sidebar/dms/DirectMessage'
import { FiUserPlus } from 'react-icons/fi'
import React from 'react'

export default function DirectMessages() {
  return (
    <>
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
    </>
  )
}
