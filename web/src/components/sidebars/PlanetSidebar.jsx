import { HiHashtag, HiAdjustments, HiCheckCircle } from 'react-icons/hi'
import React, { forwardRef } from 'react'
import Sidebar from '@/components/ui/sidebar/Sidebar'
import SidebarSortButtons from '@/components/ui/sidebar/SidebarSortButtons'
import Tippy from '@tippyjs/react'
import { Link } from 'react-router-dom'
import { useRouter } from 'next/router'

export default forwardRef(({ planet }, ref) => {
  return (
    <Sidebar ref={ref}>
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
        <div className="absolute inset-0 bg-gray-950 bg-opacity-25 z-0" />

        <div
          className={`relative flex items-center h-12 px-4 text-primary z-10`}
        >
          {planet.featured && (
            <Tippy content="Featured Planet">
              <div className="mr-3 cursor-pointer">
                <HiCheckCircle className="w-5 h-5 text-shadow" />
              </div>
            </Tippy>
          )}

          <div className="font-semibold text-base mr-auto pr-3 truncate text-shadow">
            {planet.name}
          </div>

          <div className="rounded-md p-1 transition bg-white bg-opacity-0 hover:bg-opacity-20 cursor-pointer">
            <HiAdjustments className="w-5 h-5 text-primary text-shadow" />
          </div>
        </div>
      </div>

      <div className="px-1">
        <div className="sidebar-label">POSTS</div>

        <SidebarSortButtons />

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
  const { pathname, query } = useRouter()
  return (
    <Link
      to={`/planet/${query.planetName}/channel/${channel.name}`}
      className="sidebar-item"
    >
      <HiHashtag className="w-5 h-5 mr-3" />
      {channel.name}
    </Link>
  )
}
