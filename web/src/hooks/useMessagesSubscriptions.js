import { useEffect, useState } from 'react'
import { matchPath, useHistory, useLocation } from 'react-router-dom'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import { useMessageChangedSubscription } from '@/graphql/hooks'

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

  const { data: res } = useMessageChangedSubscription()
  useEffect(
    () => () => {
      const data = res?.messageChanged
      const message = data?.message
      const messageServerId = data?.serverId
      const messageChannelId = data?.channelId
      const messageGroupId = data?.groupId
      const messageUserId = data?.userId
      if (!message) return
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

        let channel
        if (messageChannelId && messageServerId) {
          channel = urqlClient
            .readQuery(GET_JOINED_SERVERS)
            ?.data?.getJoinedServers?.find(s => s.id === messageServerId)
            ?.channels?.find(c => c.id === messageChannelId)
        }

        const notification = new Notification(
          channel
            ? `@${message.author.name} · #${channel.name}`
            : `@${message.author.name}`,
          {
            body: message.text,
            icon:
              message.author.avatarUrl ??
              `${window.electron ? '.' : ''}/icons/icon.png`,
            timestamp: message.createdAt,
            silent: true
          }
        )
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

        return [...messages, message]
      }
    },
    [res]
  )
}
