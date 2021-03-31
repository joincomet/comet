import { createContext, useContext, useEffect, useState } from 'react'
import { useQuery, useSubscription } from 'urql'
import {
  GET_BLOCKED_USERS,
  GET_CURRENT_USER,
  GET_GROUPS_AND_DMS,
  GET_JOINED_SERVERS,
  GET_SERVER_CHANNELS,
  GET_SERVER_FOLDERS,
  GET_SERVER_PERMISSIONS,
  GET_USER_FOLDERS
} from '@/graphql/queries'
import { GET_FRIEND_REQUESTS, GET_FRIENDS } from '@/graphql/queries/friend'
import {
  MESSAGE_REMOVED,
  MESSAGE_SENT,
  MESSAGE_UPDATED,
  REFETCH_GROUPS_AND_DMS,
  REFETCH_JOINED_SERVERS
} from '@/graphql/subscriptions'
import { REFETCH_FRIENDS } from '@/graphql/subscriptions/friend'
import {
  REFETCH_SERVER_FOLDERS,
  REFETCH_USER_FOLDERS
} from '@/graphql/subscriptions/folder'
import { useLocation, matchPath, useParams } from 'react-router-dom'
import { REFETCH_SERVER_CHANNELS } from '@/graphql/subscriptions/channel'

export const DataContext = createContext({
  user: null,
  userFetching: true,
  fetching: true,
  joinedServers: [],
  userFolders: [],
  friends: [],
  friendRequests: [],
  blockedUsers: [],
  groupsAndDms: [],
  // Server
  serverChannels: [],
  serverPermissions: [],
  serverFolders: []
})

const useFetched = (fetching, pause) => {
  const [fetched, setFetched] = useState(false)
  useEffect(() => {
    if (!fetching && !pause) setFetched(true)
  }, [fetching])
  return fetched
}

export function DataProvider({ children }) {
  const { pathname } = useLocation()
  const matchPathRes = matchPath(pathname, { path: '/server/:serverId' })
  const serverId = matchPathRes?.params?.serverId

  const [{ data: userData, fetching: userFetching }, refetchUser] = useQuery({
    query: GET_CURRENT_USER
  })
  const fetchedUser = useFetched(userFetching, false)

  const pause = !userData?.getCurrentUser
  const serverPause = pause || !serverId

  // Refetch user every 30 seconds to update online status
  useEffect(() => {
    const id = setTimeout(() => {
      if (userData?.getCurrentUser && !userFetching && !pause)
        refetchUser({ requestPolicy: 'network-only' })
    }, 30000)
    return () => clearTimeout(id)
  }, [])

  // QUERIES
  const [
    { data: joinedServersData, fetching: joinedServersFetching },
    refetchJoinedServers
  ] = useQuery({
    query: GET_JOINED_SERVERS,
    pause
  })
  const fetchedServers = useFetched(joinedServersFetching, pause)

  const [
    { data: userFoldersData, fetching: userFoldersFetching },
    refetchUserFolders
  ] = useQuery({
    query: GET_USER_FOLDERS,
    pause
  })
  const fetchedUserFolders = useFetched(userFoldersFetching, pause)

  const [
    { data: friendsData, fetching: friendsFetching },
    refetchFriends
  ] = useQuery({
    query: GET_FRIENDS,
    pause
  })
  const fetchedFriends = useFetched(friendsFetching, pause)

  const [
    { data: friendRequestsData, fetching: friendRequestsFetching },
    refetchFriendRequests
  ] = useQuery({
    query: GET_FRIEND_REQUESTS,
    pause
  })
  const fetchedFriendRequests = useFetched(friendRequestsFetching, pause)

  const [
    { data: blockedUsersData, fetching: blockedUsersFetching },
    refetchBlockedUsers
  ] = useQuery({
    query: GET_BLOCKED_USERS,
    pause
  })
  const fetchedBlockedUsers = useFetched(blockedUsersFetching, pause)

  const [
    { data: groupsAndDmsData, fetching: groupsAndDmsFetching },
    refetchGroupsAndDms
  ] = useQuery({
    query: GET_GROUPS_AND_DMS,
    pause
  })
  const fetchedGroupsAndDms = useFetched(groupsAndDmsFetching, pause)

  // Server
  const [{ data: serverChannelsData }, refetchServerChannels] = useQuery({
    query: GET_SERVER_CHANNELS,
    variables: { serverId },
    pause: serverPause
  })
  const [{ data: serverPermsData }] = useQuery({
    query: GET_SERVER_PERMISSIONS,
    variables: { serverId },
    pause: serverPause
  })
  const [{ data: serverFoldersData }, refetchServerFolders] = useQuery({
    query: GET_SERVER_FOLDERS,
    variables: { serverId },
    pause: serverPause
  })

  // SUBSCRIPTIONS
  useSubscription({ query: REFETCH_GROUPS_AND_DMS, pause }, () =>
    refetchGroupsAndDms()
  )
  useSubscription({ query: REFETCH_FRIENDS, pause }, () => {
    refetchFriends()
    refetchFriendRequests()
    refetchBlockedUsers()
  })
  useSubscription({ query: REFETCH_USER_FOLDERS, pause }, () =>
    refetchUserFolders()
  )
  useSubscription({ query: REFETCH_JOINED_SERVERS, pause }, () =>
    refetchJoinedServers()
  )
  useSubscription({ query: MESSAGE_SENT, pause })
  useSubscription({ query: MESSAGE_UPDATED, pause })
  useSubscription({ query: MESSAGE_REMOVED, pause })
  // Server
  useSubscription({ query: REFETCH_SERVER_FOLDERS, pause: serverPause }, () =>
    refetchServerFolders()
  )
  useSubscription({ query: REFETCH_SERVER_CHANNELS, pause: serverPause }, () =>
    refetchServerChannels()
  )

  const fetching = !(
    fetchedUser &&
    fetchedServers &&
    fetchedUserFolders &&
    fetchedFriends &&
    fetchedFriendRequests &&
    fetchedBlockedUsers &&
    fetchedGroupsAndDms
  )

  return (
    <DataContext.Provider
      value={{
        user: userData?.getCurrentUser,
        userFetching,
        fetching,
        joinedServers: joinedServersData?.getJoinedServers || [],
        userFolders: userFoldersData?.getUserFolders || [],
        friends: friendsData?.getFriends || [],
        friendRequests: friendRequestsData?.getFriendRequests || [],
        blockedUsers: blockedUsersData?.getBlockedUsers || [],
        groupsAndDms: groupsAndDmsData?.getGroupsAndDms || [],
        // Server
        serverChannels: serverChannelsData?.getServerChannels || [],
        serverPermissions: serverPermsData?.getServerPermissions || [],
        serverFolders: serverFoldersData?.getServerFolders || []
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

const useData = () => useContext(DataContext)

export const useUser = () => {
  const { user } = useData()
  return user
}

export const useUserFetching = () => {
  const { userFetching } = useData()
  return userFetching
}

export const useFetching = () => {
  const { fetching } = useData()
  return fetching
}

export const useJoinedServers = () => {
  const { joinedServers } = useData()
  return joinedServers
}

export const useUserFolders = () => {
  const { userFolders } = useData()
  return userFolders
}

export const useFriends = () => {
  const { friends } = useData()
  return friends
}

export const useFriendRequests = () => {
  const { friendRequests } = useData()
  return friendRequests
}

export const useBlockedUsers = () => {
  const { blockedUsers } = useData()
  return blockedUsers
}

export const useGroupsAndDms = () => {
  const { groupsAndDms } = useData()
  return groupsAndDms
}

// Server
export const useServer = () => {
  const { serverId } = useParams()
  const joinedServers = useJoinedServers()
  return joinedServers.find(s => s.id === serverId)
}

export const useServerChannels = () => {
  const { serverChannels } = useData()
  return serverChannels
}

export const useServerPermissions = () => {
  const { serverPermissions } = useData()
  return serverPermissions
}

export const useServerFolders = () => {
  const { serverFolders } = useData()
  return serverFolders
}

export const useChannel = () => {
  const { channelId } = useParams()
  const channels = useServerChannels()
  return channels.find(c => c.id === channelId)
}
