import { useHistory, useLocation, useParams } from 'react-router-dom'
import { IconHot, IconNew, IconTop } from '@/lib/Icons'
import React from 'react'
import SidebarItem from '@/components/sidebars/base/SidebarItem'
import { useStore } from '@/lib/stores/useStore'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()
  return (
    <div className="space-y-0.5">
      <SortItem
        name={t('feed.sort.hot')}
        icon={<IconHot className="w-5 h-5 mr-3" />}
      />
      <SortItem
        name={t('feed.sort.new')}
        icon={<IconNew className="w-5 h-5 mr-3" />}
      />
      <SortItem
        name={t('feed.sort.top')}
        icon={<IconTop className="w-5 h-5 mr-3" />}
      />
    </div>
  )
}
