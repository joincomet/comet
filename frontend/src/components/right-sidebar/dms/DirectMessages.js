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

      <DirectMessage
        user={{
          profile: {
            realName: 'Michael Perino',
            avatarURL:
              'https://pbs.twimg.com/profile_images/1278741528425517057/oQbjgrA2_400x400.jpg'
          }
        }}
      />
    </>
  )
}
