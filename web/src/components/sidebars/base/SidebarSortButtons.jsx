import { useHistory, useLocation, useParams } from 'react-router-dom'
import { IconHot, IconNew, IconTop } from '@/lib/Icons'
import React from 'react'
import SidebarItem from '@/components/sidebars/base/SidebarItem'
import { useStore } from '@/lib/stores/useStore'

function SortItem({ name, icon }) {
  const { postsSort, setPostsSort } = useStore()
  const { serverId } = useParams()

  const { pathname } = useLocation()

  const { push } = useHistory()

  const active =
    postsSort === name &&
    (pathname === '/posts' || pathname === `/server/${serverId}/posts`)

  return (
    <SidebarItem
      onClick={() => {
        setPostsSort(name)
        push(serverId ? `/server/${serverId}/posts` : '/posts')
      }}
      active={active}
    >
      {icon}
      {name}
    </SidebarItem>
  )
}

export default function SidebarSortButtons() {
  return (
    <div className="space-y-0.5">
      <SortItem name="Hot" icon={<IconHot className="w-5 h-5 mr-3" />} />
      <SortItem name="New" icon={<IconNew className="w-5 h-5 mr-3" />} />
      <SortItem name="Top" icon={<IconTop className="w-5 h-5 mr-3" />} />
    </div>
  )
}
