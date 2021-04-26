import { useEffect, useState } from 'react'
import { matchPath, useHistory, useLocation } from 'react-router-dom'
import {
  MessagesDocument,
  useMessageChangedSubscription
} from '@/graphql/hooks'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'

export const useMessagesSubscriptions = () => {
  const [currentUser] = useCurrentUser()
  const { push } = useHistory()
  const { pathname } = useLocation()
  const matchedChannel = matchPath(pathname, {
    path: '/server/:serverId/channel/:channelId'
  })
  const currentServerId = matchedChannel?.params?.serverId
  const currentChannelId = matchedChannel?.params?.channelId
  const matchedDm = matchPath(pathname, { path: '/me/dm/:userId' })
  const currentUserId = matchedDm?.params?.userId
  const matchedGroup = matchPath(pathname, { path: '/me/group/:groupId' })
  const currentGroupId = matchedGroup?.params?.groupId

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
        const message = data?.added
        if (!message) return
        const messageServerId = message.channel?.server.id
        const messageChannelId = message.channel?.id
        const messageGroupId = message.group?.id
        const messageUserId = message.toUser?.id
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
        if (queryData) {
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

        if (
          Notification.permission === 'granted' &&
          message.author.id !== currentUser.id
        ) {
          if (
            (!window.electron || (window.electron && windowOpen)) &&
            ((currentGroupId &&
              messageGroupId &&
              currentGroupId === messageGroupId) ||
              (currentUserId &&
                messageUserId &&
                currentUserId === messageUserId) ||
              (currentChannelId &&
                messageChannelId &&
                currentChannelId === messageChannelId))
          )
            return

          let title = `@${message.author.name}`
          if (message.channel) title += ` · #${message.channel.name}`
          if (message.group) title += ` · #${message.group.displayName}`

          const notification = new Notification(title, {
            body: message.text,
            icon:
              message.author.avatarUrl ??
              `${window.electron ? '.' : ''}/icons/icon.png`,
            timestamp: message.createdAt,
            silent: true
          })
          notification.onclick = () => {
            if (messageUserId) push(`/me/dm/${messageUserId}`)
            else if (messageGroupId) push(`/me/group/${messageGroupId}`)
            else if (messageChannelId && messageServerId)
              push(`/server/${messageServerId}/channel/${messageChannelId}`)
            if (window.electron) window.electron.show()
          }
          const audio = new Audio(
            `${window.electron ? '.' : ''}/notification.mp3`
          )
          audio.volume = 0.5
          audio.play()
        }
      }
    }
  })
}
