import { useEffect, useState } from 'react'
import { matchPath, useHistory, useLocation } from 'react-router-dom'
import {
  MessagesDocument,
  MessageType,
  useMessageChangedSubscription
} from '@/graphql/hooks'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import { createNotification } from '@/utils/createNotification'

export const useMessagesSubscriptions = () => {
  const [currentUser] = useCurrentUser()
  const { push } = useHistory()
  const { pathname, hash } = useLocation()
  const matchedServer = matchPath(pathname, {
    path: '/:server'
  })
  const server = matchedServer?.params?.server
  const channelName = server && hash ? hash.substring(1) : null

  const matchedDm = matchPath(pathname, { path: '/dm/:username' })
  const username = matchedDm?.params?.username?.substring(1)

  const matchedGroup = matchPath(pathname, { path: '/group/:groupId' })
  const groupId = matchedGroup?.params?.groupId

  const [windowOpen, setWindowOpen] = useState(true)
  useEffect(() => {
    if (window.electron) {
      window.electron.on('windowOpened', () => setWindowOpen(true))
      window.electron.on('windowClosed', () => setWindowOpen(false))
    }
  }, [])

  const { data: res } = useMessageChangedSubscription({
    skip: !currentUser,
    onSubscriptionData({ client, subscriptionData }) {
      if (subscriptionData.data) {
        const data = subscriptionData.data.messageChanged
        const addedMessage = data?.added
        const deletedMessage = data?.deleted
        let message

        if (addedMessage) {
          message = addedMessage
          const messageChannelId = message.channel?.id
          const messageGroupId = message.group?.id
          const messageUserId = message.toUser ? message.author?.id : undefined
          const queryOptions = {
            query: MessagesDocument,
            variables: {
              userId: messageUserId,
              groupId: messageGroupId,
              channelId: messageChannelId,
              cursor: null
            }
          }
          const queryData = client.cache.readQuery(queryOptions)
          if (
            queryData &&
            !queryData.messages.messages.map(m => m.id).includes(message.id)
          ) {
            client.cache.writeQuery({
              ...queryOptions,
              data: {
                messages: {
                  ...queryData.messages,
                  messages: [...queryData.messages.messages, message]
                }
              }
            })
          }

          if (message.author.id !== currentUser.id) {
            if (
              (!window.electron || (window.electron && windowOpen)) &&
              ((groupId && messageGroupId && groupId === messageGroupId) ||
                (currentUserId &&
                  messageUserId &&
                  currentUserId === messageUserId) ||
                (currentChannelId &&
                  messageChannelId &&
                  currentChannelId === messageChannelId))
            )
              return

            if (
              message.type === MessageType.Normal &&
              message.text &&
              (message.toUser ||
                message.group ||
                message.isEveryoneMentioned ||
                (!!currentUser &&
                  message.mentionedUsers
                    .map(u => u.id)
                    .includes(currentUser.id)))
            ) {
              let title = `@${message.author.name}`
              if (message.channel) title += ` · #${message.channel.name}`
              if (message.group) title += ` · #${message.group.displayName}`

              createNotification({
                title,
                body: message.text,
                icon:
                  message.author.avatarUrl ??
                  `${window.electron ? '.' : ''}/icons/icon.png`,
                timestamp: message.createdAt,
                onClick: () => {
                  if (messageUserId) push(`/dm/@${message.author.username}`)
                  else if (messageGroupId) push(`/group/${messageGroupId}`)
                  else if (messageChannelId)
                    push(`/+${message.server.name}/#${message.channel.name}`)
                  if (window.electron) window.electron.show()
                }
              })
            } else if (message.type === MessageType.FriendRequestReceived) {
              createNotification({
                title: `@${message.author.name}`,
                body: 'Sent a friend request',
                icon:
                  message.author.avatarUrl ??
                  `${window.electron ? '.' : ''}/icons/icon.png`,
                timestamp: message.createdAt,
                onClick: () => {
                  push(`/friends`)
                  if (window.electron) window.electron.show()
                }
              })
            }
          }
        } else if (deletedMessage) {
          message = deletedMessage
        }
      }
    }
  })
}
