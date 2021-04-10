import { createContext, useContext } from 'react'
import {
  GET_GROUPS_AND_DMS,
  GET_JOINED_SERVERS,
  GET_USER_FOLDERS,
  GET_USER_RELATIONSHIPS
} from '@/graphql/queries'
import {
  MESSAGE_REMOVED,
  MESSAGE_SENT,
  MESSAGE_UPDATED,
  REFETCH_GROUPS_AND_DMS,
  REFETCH_JOINED_SERVERS,
  REFETCH_USER_RELATIONSHIPS
} from '@/graphql/subscriptions'
import { REFETCH_USER_FOLDERS } from '@/graphql/subscriptions/folder'
import { useCurrentUser } from '@/providers/UserProvider'
import { useClient, useQuery, useSubscription } from 'urql'
import { matchPath, useHistory, useLocation } from 'react-router-dom'

export const DataContext = createContext({
  joinedServers: null,
  groupsAndDms: null,
  userFolders: null,
  userRelationships: null,
  loading: true
})

export function DataProvider({ children }) {
  const currentUser = useCurrentUser()
  const pause = !currentUser
  const [{ data: joinedServersData }, refetchServers] = useQuery({
    query: GET_JOINED_SERVERS,
    pause
  })
  const joinedServers = joinedServersData?.getJoinedServers
  useSubscription({ query: REFETCH_JOINED_SERVERS, pause }, () =>
    refetchServers()
  )

  const [{ data: groupsAndDmsData }, refetchDms] = useQuery({
    query: GET_GROUPS_AND_DMS,
    pause
  })
  const groupsAndDms = groupsAndDmsData?.getGroupsAndDms
  useSubscription({ query: REFETCH_GROUPS_AND_DMS, pause }, () => refetchDms())

  const [{ data: userFoldersData }, refetchFolders] = useQuery({
    query: GET_USER_FOLDERS,
    pause
  })
  const userFolders = userFoldersData?.getUserFolders
  useSubscription({ query: REFETCH_USER_FOLDERS, pause }, () => {
    refetchFolders()
  })

  const [{ data: userRelationshipsData }, refetchRels] = useQuery({
    query: GET_USER_RELATIONSHIPS,
    pause
  })
  const userRelationships = userRelationshipsData?.getUserRelationships
  useSubscription({ query: REFETCH_USER_RELATIONSHIPS, pause }, () =>
    refetchRels()
  )

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
  const urqlClient = useClient()

  useSubscription({ query: MESSAGE_SENT, pause }, (prev, res) => {
    const data = res?.messageSent
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
        (currentGroupId &&
          messageGroupId &&
          currentGroupId === messageGroupId) ||
        (currentUserId && messageUserId && currentUserId === messageUserId) ||
        (currentChannelId &&
          messageChannelId &&
          currentChannelId === messageChannelId)
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
      }
      const audio = new Audio(`${window.electron ? '.' : ''}/notification.mp3`)
      audio.volume = 0.5
      audio.play()
    }
  })
  useSubscription({ query: MESSAGE_REMOVED, pause })
  useSubscription({ query: MESSAGE_UPDATED, pause })

  /*useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])*/

  return (
    <DataContext.Provider
      value={{
        joinedServers,
        groupsAndDms,
        userFolders,
        userRelationships,
        loading:
          currentUser &&
          (!joinedServers ||
            !groupsAndDms ||
            !userFolders ||
            !userRelationships)
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export const useJoinedServers = () => {
  const { joinedServers } = useContext(DataContext)
  return joinedServers
}
export const useGroupsAndDms = () => {
  const { groupsAndDms } = useContext(DataContext)
  return groupsAndDms
}
export const useUserFolders = () => {
  const { userFolders } = useContext(DataContext)
  return userFolders
}
export const useUserRelationships = () => {
  const { userRelationships } = useContext(DataContext)
  return userRelationships
}
export const useDataLoading = () => {
  const { loading } = useContext(DataContext)
  return loading
}
