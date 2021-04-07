import { memo, useEffect, useMemo, useState } from 'react'
import Dialog from '@/components/ui/dialog/Dialog'
import UserAvatar from '@/components/user/UserAvatar'
import { IconDotsVertical } from '@/components/ui/icons/Icons'
import ctl from '@netlify/classnames-template-literals'
import { useUserRelationships } from '@/providers/DataProvider'
import { useTranslation } from 'react-i18next'
import { GET_MUTUAL_SERVERS } from '@/graphql/queries/server/GetMutualServers'
import { useQuery } from 'urql'
import ServerAvatar from '@/components/server/ServerAvatar'
import { Link } from 'react-router-dom'
import { GET_MUTUAL_FRIENDS } from '@/graphql/queries/user/GetMutualFriends'

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
  rounded
  cursor-pointer
`)

const tabName = {
  MutualServers: 'MutualServers',
  MutualFriends: 'MutualFriends'
}

export default memo(function UserDialog({ open, setOpen, user }) {
  const { t } = useTranslation()
  const [tab, setTab] = useState(tabName.MutualServers)
  const [dialogUser, setDialogUser] = useState(user)
  useEffect(() => setDialogUser(user), [user, setDialogUser])

  const [{ data: mutualServersData }] = useQuery({
    query: GET_MUTUAL_SERVERS,
    variables: { userId: dialogUser?.id },
    pause: !dialogUser
  })
  const mutualServers = mutualServersData?.getMutualServers ?? []

  const [{ data: mutualFriendsData }] = useQuery({
    query: GET_MUTUAL_FRIENDS,
    variables: { userId: dialogUser?.id },
    pause: !dialogUser
  })
  const mutualFriends = mutualFriendsData?.getMutualFriends ?? []

  const {
    outgoingFriendRequests,
    incomingFriendRequests,
    friends,
    blockingUsers,
    blockedByUsers
  } = useUserRelationships()
  const isFriendRequestSent = outgoingFriendRequests
    .map(u => u.id)
    .includes(dialogUser?.id)
  const isFriendRequestReceived = incomingFriendRequests
    .map(u => u.id)
    .includes(dialogUser?.id)
  const isFriend = friends.map(u => u.id).includes(dialogUser?.id)
  const isBlocking = blockingUsers.map(u => u.id).includes(dialogUser?.id)
  const isBlocked = blockedByUsers.map(u => u.id).includes(dialogUser?.id)

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
        <button className={buttonClass(true)}>
          {t('user.context.sendMessage')}
        </button>
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

  if (!dialogUser) return null

  return (
    <Dialog closeOnOverlayClick isOpen={open} close={() => setOpen(false)}>
      <div
        onClick={e => e.stopPropagation()}
        className="rounded-lg max-w-xl w-full dark:bg-gray-850"
      >
        <div className="flex p-5">
          <UserAvatar
            user={dialogUser}
            size={20}
            showOnline
            dotClassName="ring-5 dark:ring-gray-850 w-4 h-4"
          />
          <div className="ml-5 flex w-full pt-5">
            <div className="font-semibold text-lg text-primary">
              {dialogUser.name}
              <span className="text-tertiary text-sm font-normal">
                #{dialogUser.tag}
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
            className={tabClass(tab === tabName.MutualServers)}
            onClick={() => setTab(tabName.MutualServers)}
          >
            <div className="transform translate-y-0.5">Mutual Servers</div>
          </button>
          <button
            className={tabClass(tab === tabName.MutualFriends)}
            onClick={() => setTab(tabName.MutualFriends)}
          >
            <div className="transform translate-y-0.5">Mutual Friends</div>
          </button>
        </div>
        <div className="rounded-b-lg dark:bg-gray-750 p-2 max-h-[15rem] min-h-[15rem] h-full scrollbar">
          {tab === tabName.MutualServers &&
            mutualServers.map(server => (
              <Link
                to={`/server/${server.id}`}
                key={server.id}
                className={itemClass}
              >
                <ServerAvatar server={server} size={10} />
                <div className="pl-2.5">
                  <div className="text-base text-secondary font-medium">
                    {server.name}
                  </div>
                </div>
              </Link>
            ))}

          {tab === tabName.MutualFriends &&
            mutualFriends.map(friend => (
              <div
                key={friend.id}
                className={itemClass}
                onClick={() => setDialogUser(friend)}
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
        </div>
      </div>
    </Dialog>
  )
})
