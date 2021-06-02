import { useEffect, useState } from 'react'
import { matchPath, useHistory, useLocation } from 'react-router-dom'
import {
  ChannelFragmentDoc,
  GroupFragmentDoc,
  MessagesDocument,
  MessageType,
  useMessageChangedSubscription,
  UserFragmentDoc
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
  const server = matchedServer?.params?.server.substring(1)
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
        const updatedMessage = data?.updated
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

          const isViewingUser =
            username && message.toUser && username === message.toUser.username
          const isViewingGroup =
            groupId && message.group && groupId === message.group.id
          const isViewingChannel =
            channelName &&
            message.channel &&
            message.channel.server.name === server &&
            channelName === message.channel.name

          if (message.toUser && !isViewingUser) {
            const data = client.cache.readFragment({
              fragment: UserFragmentDoc,
              id: `User:${message.author.id}`
            })
            if (data) {
              client.cache.writeFragment({
                fragment: UserFragmentDoc,
                id: `User:${message.author.id}`,
                data: {
                  ...data,
                  unreadCount: data.unreadCount + 1
                }
              })
            }
          } else if (message.group && !isViewingGroup) {
            const data = client.cache.readFragment({
              fragment: GroupFragmentDoc,
              id: `User:${message.group.id}`
            })
            if (data) {
              client.cache.writeFragment({
                fragment: GroupFragmentDoc,
                id: `Group:${message.group.id}`,
                data: {
                  ...data,
                  unreadCount: data.unreadCount + 1
                }
              })
            }
          } else if (message.channel && !isViewingChannel) {
            const data = client.cache.readFragment({
              fragment: ChannelFragmentDoc,
              id: `Channel:${message.channel.id}`
            })
            if (data) {
              console.log(data)
              const newData = {
                ...data,
                isUnread: true
              }
              if (
                message.isEveryoneMentioned ||
                (!!currentUser &&
                  message.mentionedUsers
                    .map(u => u.id)
                    .includes(currentUser.id))
              )
                newData.mentionCount = data.mentionCount + 1
              client.cache.writeFragment({
                fragment: ChannelFragmentDoc,
                id: `Channel:${message.channel.id}`,
                data: newData
              })
            }
          }

          if (message.author.id !== currentUser.id) {
            if (
              (!window.electron || (window.electron && windowOpen)) &&
              (isViewingGroup || isViewingUser || isViewingChannel)
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
              let title = `@${message.author.username}`
              if (message.channel) title += ` · #${message.channel.name}`
              if (message.group) title += ` · #${message.group.displayName}`

              createNotification({
                title,
                body: stripHtml(message.text),
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
                title: `@${message.author.username}`,
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
            queryData.messages.messages.map(m => m.id).includes(message.id)
          ) {
            client.cache.writeQuery({
              ...queryOptions,
              data: {
                messages: {
                  ...queryData.messages,
                  messages: queryData.messages.messages.filter(m => m.id !== message.id)
                }
              }
            })
          }
        }
      }
    }
  })
}

function stripHtml(html) {
  let tmp = document.createElement('DIV')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}
