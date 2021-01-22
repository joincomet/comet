import { HiHashtag, HiAdjustments } from 'react-icons/hi'
import React, { forwardRef } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import PostSortButtons from '@/components/layout/PostSortButtons'

export default forwardRef(({ planet }, ref) => {
  return (
    <Sidebar left ref={ref}>
      <div
        className={`${
          planet.bannerUrl ? 'h-32' : 'h-12'
        } relative z-0 w-full bg-cover bg-center`}
        style={
          planet.bannerUrl
            ? { backgroundImage: `url(${planet.bannerUrl})` }
            : {}
        }
      >
        <div
          className={`flex items-center h-12 px-4 ${
            planet.bannerUrl
              ? 'dark:bg-gray-950 dark:bg-opacity-50 text-secondary'
              : 'dark:bg-gray-850 text-primary'
          }`}
        >
          {planet.avatarUrl && (
            <img src={planet.avatarUrl} className="w-8 h-8 rounded-full mr-3" />
          )}
          <div className="font-medium text-sm mr-auto pr-3 truncate">
            {planet.name}
          </div>

          <div className="rounded-md p-1 transition dark:hover:bg-gray-700 cursor-pointer">
            <HiAdjustments className="w-5 h-5 text-secondary" />
          </div>
        </div>
      </div>

      <div className="px-1">
        <div className="sidebar-label">POSTS</div>

        <PostSortButtons />

        <div className="sidebar-label">CHANNELS</div>

        <div className="space-y-0.5">
          {planet.channels.map(channel => (
            <ChatChannel key={channel.id} channel={channel} />
          ))}
        </div>
      </div>
    </Sidebar>
  )
})

function ChatChannel({ channel }) {
  return (
    <div className="sidebar-item">
      <HiHashtag className="w-5 h-5 mr-3" />
      {channel.name}
    </div>
  )
}
