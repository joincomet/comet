import { memo, useMemo, useState } from 'react'
import Dialog from '@/components/ui/dialog/Dialog'
import UserAvatar from '@/components/user/UserAvatar'
import { IconDotsVertical, IconFolder } from '@/components/ui/icons/Icons'
import ctl from '@netlify/classnames-template-literals'
import { useTranslation } from 'react-i18next'
import ServerAvatar from '@/components/server/ServerAvatar'
import { Link } from 'react-router-dom'
import { useStore } from '@/hooks/useStore'
import { useUserQuery } from '@/graphql/hooks'
import { useUserRelationships } from '@/hooks/useUserRelationships'

const tabClass = active =>
  ctl(`
  h-full
  cursor-pointer
  select-none
  focus:outline-none
  text-13
  border-b-4
  flex
  items-center
  box-content
  ${
    active
      ? 'text-gray-900 dark:text-gray-100 dark:border-white'
      : 'text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 border-transparent'
  }
`)

const buttonClass = green =>
  ctl(`
  px-4
  h-8
  flex
  items-center
  rounded
  ${green ? 'bg-green-600' : 'bg-gray-500'}
  disabled:opacity-50
  disabled:cursor-not-allowed
  text-primary
  select-none
  cursor-pointer
  text-13
  focus:outline-none
`)

const itemClass = ctl(`
  flex
  w-full
  items-center
  dark:hover:bg-gray-725
  px-2
  py-1
  h-12
  rounded
  cursor-pointer
`)

const tab = {
  MutualServers: 'MutualServers',
  MutualFriends: 'MutualFriends',
  Folders: 'Folders'
}

export default memo(function UserDialog() {
  const [user, setUser, open, setOpen] = useStore(s => [
    s.dialogUser,
    s.setDialogUser,
    s.userDialogOpen,
    s.setUserDialogOpen
  ])
  const { t } = useTranslation()
  const [currentTab, setCurrentTab] = useState(tab.MutualServers)

  const { data: userData } = useUserQuery({
    variables: { id: user?.id },
    skip: !user
  })

  const mutualFriends = userData?.user?.relatedUsers ?? []
  const mutualServers = userData?.user?.servers ?? []
  const folders = userData?.user?.folders ?? []

  const {
    outgoingFriendRequests,
    incomingFriendRequests,
    friends,
    blocking,
    blockedBy
  } = useUserRelationships()
  const isFriendRequestSent = outgoingFriendRequests
    .map(u => u.id)
    .includes(user?.id)
  const isFriendRequestReceived = incomingFriendRequests
    .map(u => u.id)
    .includes(user?.id)
  const isFriend = friends.map(u => u.id).includes(user?.id)
  const isBlocking = blocking.map(u => u.id).includes(user?.id)
  const isBlocked = blockedBy.map(u => u.id).includes(user?.id)

  const buttons = useMemo(() => {
    if (isFriendRequestReceived)
      return (
        <>
          <button className={buttonClass(true)}>
            {t('user.context.accept')}
          </button>
          <button className={buttonClass(false)}>
            {t('user.context.ignore')}
          </button>
        </>
      )
    else if (isFriendRequestSent)
      return (
        <button className={buttonClass(false)}>
          {t('user.context.revoke')}
        </button>
      )
    else if (isFriend)
      return (
        <Link
          to={`/me/dm/${user.id}`}
          onClick={() => close()}
          className={buttonClass(true)}
        >
          {t('user.context.sendMessage')}
        </Link>
      )
    else if (isBlocking)
      return (
        <button className={buttonClass(false)}>
          {t('user.context.unblock')}
        </button>
      )
    else if (isBlocked)
      return (
        <button disabled className={buttonClass(false)}>
          {t('user.context.blockingYou')}
        </button>
      )
    else
      return (
        <button className={buttonClass(true)}>
          {t('user.context.sendFriendRequest')}
        </button>
      )
  }, [
    isFriendRequestSent,
    isFriendRequestReceived,
    isFriend,
    isBlocking,
    isBlocked
  ])

  const close = () => {
    setOpen(false)
    setTimeout(() => setUser(null), 300)
  }

  return (
    <Dialog closeOnOverlayClick isOpen={open} close={close}>
      <div
        onClick={e => e.stopPropagation()}
        className="rounded-lg max-w-xl w-full dark:bg-gray-850"
      >
        <div className="flex p-5">
          <UserAvatar
            user={user}
            size={20}
            showOnline
            dotClassName="ring-5 dark:ring-gray-850 w-4 h-4"
          />
          <div className="ml-5 flex w-full pt-5">
            <div className="font-semibold text-lg text-primary">
              {user?.name}
              <span className="text-tertiary text-sm font-normal">
                #{user?.tag}
              </span>
            </div>

            <div className="ml-auto" />
            <div className="flex items-center space-x-2.5 h-8">{buttons}</div>

            <button className="h-8 cursor-pointer highlightable ml-3 focus:outline-none">
              <IconDotsVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="px-5 dark:border-gray-775 border-t h-14 flex items-center space-x-10">
          <button
            className={tabClass(currentTab === tab.MutualServers)}
            onClick={() => setCurrentTab(tab.MutualServers)}
          >
            <div className="transform translate-y-0.5">Mutual Servers</div>
          </button>

          <button
            className={tabClass(currentTab === tab.MutualFriends)}
            onClick={() => setCurrentTab(tab.MutualFriends)}
          >
            <div className="transform translate-y-0.5">Mutual Friends</div>
          </button>

          <button
            className={tabClass(currentTab === tab.Folders)}
            onClick={() => setCurrentTab(tab.Folders)}
          >
            <div className="transform translate-y-0.5">Folders</div>
          </button>
        </div>
        <div className="rounded-b-lg dark:bg-gray-750 p-2 max-h-[15rem] min-h-[15rem] h-full scrollbar-custom">
          {currentTab === tab.MutualServers &&
            mutualServers.map(server => (
              <Link
                to={`/server/${server.id}`}
                key={server.id}
                className={itemClass}
                onClick={() => close()}
              >
                <ServerAvatar
                  server={server}
                  size={10}
                  className="dark:bg-gray-800"
                />
                <div className="pl-2.5 text-base text-secondary font-medium">
                  {server.name}
                </div>
              </Link>
            ))}

          {currentTab === tab.MutualFriends &&
            mutualFriends.map(friend => (
              <div
                key={friend.id}
                className={itemClass}
                onClick={() => setUser(friend)}
              >
                <UserAvatar
                  user={friend}
                  size={10}
                  showOnline
                  dotClassName="ring-2 dark:ring-gray-750 w-2 h-2"
                />
                <div className="pl-2.5">
                  <div className="text-base text-secondary font-medium">
                    {friend.name}
                    <span className="text-13 text-tertiary font-normal">
                      #{friend.tag}
                    </span>
                  </div>
                </div>
              </div>
            ))}

          {currentTab === tab.Folders &&
            folders.map(folder => (
              <Link
                to={`/me/folder/${folder.id}`}
                key={folder.id}
                className={itemClass}
                onClick={() => close()}
              >
                {folder.avatarUrl ? (
                  <div
                    className="h-10 w-10 rounded-full bg-cover bg-no-repeat bg-center"
                    style={{ backgroundImage: `url(${folder.avatarUrl})` }}
                  />
                ) : (
                  <IconFolder className="text-gray-500 w-6 h-6 mx-2" />
                )}
                <div className="pl-2.5 text-base text-secondary font-medium">
                  {folder.name}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </Dialog>
  )
})
