import Sidebar from '@/components/ui/sidebar/Sidebar'
import SidebarSortButtons from '@/components/ui/sidebar/SidebarSortButtons'
import {
  IconFeatured,
  IconFriends,
  IconHome,
  IconInbox,
  IconInfinity,
  IconX
} from '@/components/ui/icons/Icons'
import { useHistory, useLocation } from 'react-router-dom'
import UserAvatar from '@/components/user/UserAvatar'
import SidebarLabel from '@/components/ui/sidebar/SidebarLabel'
import SidebarItem from '@/components/ui/sidebar/SidebarItem'
import { useTranslation } from 'react-i18next'
import { useDrop } from 'react-dnd'
import { DragItemTypes } from '@/types/DragItemTypes'
import { VectorLogo } from '@/components/ui/vectors'
import ContextMenuTrigger from '@/components/ui/context/ContextMenuTrigger'
import { ContextMenuType } from '@/types/ContextMenuType'
import CountBadge from '@/components/ui/CountBadge'
import {
  useCloseDmMutation,
  useCreateMessageMutation,
  useRepliesQuery
} from '@/graphql/hooks'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import { useStore } from '@/hooks/useStore'

export default function HomeSidebar() {
  const { t } = useTranslation()
  const [currentUser] = useCurrentUser()
  const groups = currentUser?.groups ?? []
  const dms = currentUser?.relatedUsers?.filter(r => r.showChat) ?? []
  const groupsAndDms = groups
    .concat(dms)
    .sort(
      (a, b) =>
        (a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : 0) -
        (b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : 0)
    )
  const { data } = useRepliesQuery({
    skip: !currentUser,
    fetchPolicy: 'cache-and-network'
  })
  const repliesCount = (data?.replies ?? []).filter(r => !r.isRead).length
  const [postsFeed, setPostsFeed] = useStore(s => [s.postsFeed, s.setPostsFeed])
  const { pathname } = useLocation()
  const { push } = useHistory()
  return (
    <>
      <Sidebar>
        <div className="h-12 border-b dark:border-gray-850 shadow flex items-center px-5 text-base font-medium">
          <VectorLogo className="h-4" />
        </div>

        <div className="px-1.5">
          {!!currentUser && (
            <div className="space-y-0.5 pt-3">
              {/*<SidebarItem to="/friends">
                <IconFriends className="mr-3 h-5 w-5" />
                {t('user.friends.title')}
              </SidebarItem>*/}

              <SidebarItem to="/inbox">
                <IconInbox className="mr-3 h-5 w-5" />
                {t('inbox.title')}
                {!!repliesCount && (
                  <div className="ml-auto">
                    <CountBadge count={repliesCount} />
                  </div>
                )}
              </SidebarItem>
            </div>
          )}

          <SidebarLabel>Feed</SidebarLabel>

          <div className="space-y-0.5">
            {!!currentUser && (
              <SidebarItem
                active={postsFeed === 'Joined' && pathname === '/'}
                onClick={() => {
                  setPostsFeed('Joined')
                  if (pathname !== '/') push('/')
                }}
              >
                <IconHome className="mr-3 h-5 w-5" />
                Your Feed
              </SidebarItem>
            )}

            <SidebarItem
              active={
                (postsFeed === 'Featured' ||
                  (!currentUser && postsFeed === 'Joined')) &&
                pathname === '/'
              }
              onClick={() => {
                setPostsFeed('Featured')
                if (pathname !== '/') push('/')
              }}
            >
              <IconFeatured className="mr-3 h-5 w-5" />
              Featured
            </SidebarItem>
            <SidebarItem
              active={postsFeed === 'All' && pathname === '/'}
              onClick={() => {
                setPostsFeed('All')
                if (pathname !== '/') push('/')
              }}
            >
              <IconInfinity className="mr-3 h-5 w-5" />
              Universe
            </SidebarItem>
          </div>

          <SidebarLabel>Posts</SidebarLabel>

          <SidebarSortButtons />

          {!!currentUser && (
            <>
              <SidebarLabel plusLabel="Create DM">{t('dm.title')}</SidebarLabel>

              <div className="space-y-0.5">
                {!!groupsAndDms &&
                  groupsAndDms.map(groupOrDm => {
                    if (groupOrDm.__typename === 'Group') {
                      const group = groupOrDm
                      return <div>Group</div>
                    } else if (groupOrDm.__typename === 'User') {
                      const user = groupOrDm
                      return (
                        <DirectMessage user={user} key={`user-${user.id}`} />
                      )
                    }
                  })}
              </div>
            </>
          )}
        </div>
      </Sidebar>
    </>
  )
}

function DirectMessage({ user }) {
  const { t } = useTranslation()

  const [closeDm] = useCloseDmMutation()

  const { push } = useHistory()
  const { pathname } = useLocation()

  const [sendMessage] = useCreateMessageMutation()

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: DragItemTypes.Post,
    drop: (post, monitor) => {
      push(`/dm/@${user.username}`)
      sendMessage({
        variables: {
          input: {
            userId: user.id,
            text: `${location.origin}${post.relativeUrl}`
          }
        }
      })
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })
  const isActive = isOver && canDrop

  return (
    <div>
      <ContextMenuTrigger
        data={{ type: ContextMenuType.User, user, isDm: true }}
      >
        <SidebarItem
          ref={dropRef}
          large
          to={`/dm/@${user.username}`}
          key={`user-${user.id}`}
        >
          <UserAvatar
            size={9}
            showOnline
            user={user}
            dotClassName="ring-3 w-2.5 h-2.5 dark:ring-gray-800"
          />
          <span className="ml-3">{user.username}</span>

          <div className="ml-auto" />

          <div className="pr-2">
            {!!user.unreadCount && <CountBadge count={user.unreadCount} />}
          </div>

          <IconX
            onClick={e => {
              e.stopPropagation()
              e.preventDefault()
              closeDm({ variables: { input: { userId: user.id } } })
              if (pathname === `/dm/@${user.username}`) push('/')
            }}
            className="group-hover:visible invisible w-5 h-5 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          />
        </SidebarItem>
      </ContextMenuTrigger>
    </div>
  )
}
