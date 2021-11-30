import { memo, useCallback, useState } from 'react'
import Dialog from '@/components/ui/dialog/Dialog'
import UserAvatar from '@/components/user/UserAvatar'
import {IconDotsVertical, IconEarlyAdopter} from '@/components/ui/icons/Icons'
import ctl from '@netlify/classnames-template-literals'
import { useTranslation } from 'react-i18next'
import ServerAvatar from '@/components/server/ServerAvatar'
import { Link } from 'react-router-dom'
import { useStore } from '@/hooks/useStore'
import { useUserQuery } from '@/graphql/hooks'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import ContextMenuTrigger from '@/components/ui/context/ContextMenuTrigger'
import { ContextMenuType } from '@/types/ContextMenuType'
import EndReached from '@/components/ui/EndReached'
import Tippy from '@tippyjs/react'
import { VectorLogoIcon } from '@/components/ui/vectors'

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
  MutualServers: 'MutualServers'
  // MutualFriends: 'MutualFriends'
  // Folders: 'Folders'
}

export default memo(function UserDialog() {
  const [currentUser] = useCurrentUser()

  const [userId, setUserId, open, setOpen] = useStore(s => [
    s.dialogUserId,
    s.setDialogUserId,
    s.userDialogOpen,
    s.setUserDialogOpen
  ])
  const { t } = useTranslation()
  const [currentTab, setCurrentTab] = useState(tab.MutualServers)

  const { data: userData } = useUserQuery({
    variables: { id: userId },
    skip: !userId
  })

  const user = userData?.user

  /*const [createFriendRequest] = useCreateFriendRequestMutation()
  const [deleteFriendRequest] = useDeleteFriendRequestMutation()
  const [answerFriendRequest] = useAnswerFriendRequestMutation()
  const [blockUser] = useBlockUserMutation()
  const [unblockUser] = useUnblockUserMutation()
  const [removeFriend] = useRemoveFriendMutation()*/

  // const mutualFriends = userData?.user?.relatedUsers ?? []
  const mutualServers = userData?.user?.servers ?? []
  // const folders = userData?.user?.folders ?? []

  const close = useCallback(() => {
    setOpen(false)
    // setTimeout(() => setUserId(null), 300)
  }, [setOpen])

  /*const buttons = useMemo(() => {
    if (user?.relationshipStatus === RelationshipStatus.FriendRequestIncoming)
      return (
        <>
          <button
            className={buttonClass(true)}
            onClick={() =>
              answerFriendRequest({
                variables: { input: { userId, accept: true } }
              })
            }
          >
            {t('user.context.accept')}
          </button>
          <button
            className={buttonClass(false)}
            onClick={() =>
              answerFriendRequest({
                variables: { input: { userId, accept: true } }
              })
            }
          >
            {t('user.context.ignore')}
          </button>
        </>
      )
    else if (
      user?.relationshipStatus === RelationshipStatus.FriendRequestOutgoing
    )
      return (
        <button
          className={buttonClass(false)}
          onClick={() =>
            deleteFriendRequest({
              variables: { input: { userId } },
              optimisticResponse: {
                deleteFriendRequest: {
                  ...user,
                  relationshipStatus: RelationshipStatus.None
                }
              }
            })
          }
        >
          {t('user.context.revoke')}
        </button>
      )
    else if (user?.relationshipStatus === RelationshipStatus.Friends)
      return (
        <Link
          to={`/dm/@${user?.username}`}
          onClick={() => close()}
          className={buttonClass(true)}
        >
          {t('user.context.sendMessage')}
        </Link>
      )
    else if (user?.relationshipStatus === RelationshipStatus.Blocking)
      return (
        <button
          className={buttonClass(false)}
          onClick={() =>
            unblockUser({
              variables: { input: { userId } }
            })
          }
        >
          {t('user.context.unblock')}
        </button>
      )
    else if (user?.relationshipStatus === RelationshipStatus.Blocked)
      return (
        <button disabled className={buttonClass(false)}>
          {t('user.context.blockingYou')}
        </button>
      )
    else
      return (
        <button
          className={buttonClass(true)}
          onClick={() =>
            createFriendRequest({
              variables: { input: { userId } },
              optimisticResponse: {
                createFriendRequest: {
                  ...user,
                  relationshipStatus: RelationshipStatus.FriendRequestOutgoing
                }
              }
            })
          }
        >
          {t('user.context.sendFriendRequest')}
        </button>
      )
  }, [
    user,
    t,
    userId,
    answerFriendRequest,
    deleteFriendRequest,
    close,
    unblockUser,
    createFriendRequest
  ])*/

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
            <div className="font-semibold text-lg text-primary leading-none">
              {user?.username}
            </div>

            {user?.isStaff && (
              <Tippy content="Staff">
                <div className="cursor-pointer ml-3 h-5 w-5">
                  <VectorLogoIcon className="w-5 h-5" />
                </div>
              </Tippy>
            )}

            {user?.isOg && (
              <Tippy content="Early Adopter">
                <div className="cursor-pointer ml-3 h-5 w-5">
                  <IconEarlyAdopter className="w-5 h-5 text-blue-500" />
                </div>
              </Tippy>
            )}

            {userId !== currentUser?.id && (
              <>
                <div className="ml-auto" />
                {/*<div className="flex items-center space-x-2.5 h-8">
                  {buttons}
                </div>*/}
                <ContextMenuTrigger
                  data={{ type: ContextMenuType.User, user }}
                  leftClick
                >
                  <button className="h-8 cursor-pointer highlightable ml-3 focus:outline-none">
                    <IconDotsVertical className="w-5 h-5" />
                  </button>
                </ContextMenuTrigger>
              </>
            )}
          </div>
        </div>
        {!currentUser || user?.id !== currentUser.id ? (
          <>
            <div className="px-5 dark:border-gray-775 border-t h-14 flex items-center space-x-10">
              <button
                className={tabClass(currentTab === tab.MutualServers)}
                onClick={() => setCurrentTab(tab.MutualServers)}
              >
                <div className="transform translate-y-0.5">Mutual Planets</div>
              </button>

              {/*<button
                className={tabClass(currentTab === tab.MutualFriends)}
                onClick={() => setCurrentTab(tab.MutualFriends)}
              >
                <div className="transform translate-y-0.5">Mutual Friends</div>
              </button>*/}

              {/*<button
                className={tabClass(currentTab === tab.Folders)}
                onClick={() => setCurrentTab(tab.Folders)}
              >
                <div className="transform translate-y-0.5">Folders</div>
              </button>*/}
            </div>
            <div className="rounded-b-lg dark:bg-gray-750 p-2 max-h-[15rem] min-h-[15rem] h-full scrollbar-custom">
              {currentTab === tab.MutualServers &&
                (mutualServers.length > 0 ? (
                  mutualServers.map(server => (
                    <Link
                      to={`/+${server.name}`}
                      key={server.id}
                      className={itemClass}
                      onClick={() => close()}
                    >
                      <ServerAvatar
                        server={server}
                        size={10}
                        className="dark:bg-gray-800 rounded-full"
                      />
                      <div className="pl-2.5 text-base text-secondary font-medium">
                        {server.name}
                      </div>
                    </Link>
                  ))
                ) : (
                  <EndReached className="h-36">No mutual planets</EndReached>
                ))}

              {/*{currentTab === tab.MutualFriends &&
                (mutualFriends.length > 0 ? (
                  mutualFriends.map(friend => (
                    <div
                      key={friend.id}
                      className={itemClass}
                      onClick={() => setUserId(friend.id)}
                    >
                      <UserAvatar
                        user={friend}
                        size={10}
                        showOnline
                        dotClassName="ring-3 dark:ring-gray-750 w-2.5 h-2.5"
                      />
                      <div className="pl-2.5">
                        <div className="text-base text-secondary font-medium">
                          {friend.username}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <EndReached className="h-36">No mutual friends</EndReached>
                ))}*/}

              {/*{currentTab === tab.Folders &&
                (folders.length > 0 ? (
                  folders.map(folder => (
                    <Link
                      to={`/folder/${folder.id}`}
                      key={folder.id}
                      className={itemClass}
                      onClick={() => close()}
                    >
                      {folder.avatarUrl ? (
                        <div
                          className="h-10 w-10 rounded-full bg-cover bg-no-repeat bg-center"
                          style={{
                            backgroundImage: `url(${folder.avatarUrl})`
                          }}
                        />
                      ) : (
                        <IconFolder className="text-gray-500 w-6 h-6 mx-2" />
                      )}
                      <div className="pl-2.5 text-base text-secondary font-medium">
                        {folder.name}
                      </div>
                    </Link>
                  ))
                ) : (
                  <EndReached className="h-36">No visible folders</EndReached>
                ))}*/}
            </div>
          </>
        ) : (
          <div className="h-36 dark:bg-gray-750 rounded-b-lg p-5 flex items-center justify-center">
            <button className="h-0 w-0 overflow-hidden" />
            <div className="text-lg font-medium text-tertiary">
              Improved profile coming soon!
            </div>
          </div>
        )}
      </div>
    </Dialog>
  )
})
