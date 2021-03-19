import React, { createContext, useContext } from 'react'
import { useQuery, useSubscription } from 'urql'
import {
  GET_BLOCKED_USERS,
  GET_CURRENT_USER,
  GET_GROUPS_AND_DMS,
  GET_JOINED_SERVERS,
  GET_USER_FOLDERS
} from '@/graphql/queries'
import { GET_FRIEND_REQUESTS, GET_FRIENDS } from '@/graphql/queries/friend'
import LoadingScreen from '@/pages/LoadingScreen'
import {
  MESSAGE_SENT,
  REFETCH_GROUPS_AND_DMS,
  REFETCH_JOINED_SERVERS
} from '@/graphql/subscriptions'
import { REFETCH_FRIENDS } from '@/graphql/subscriptions/friend'
import { REFETCH_USER_FOLDERS } from '@/graphql/subscriptions/folder'

export const DataContext = createContext({
  joinedServers: [],
  userFolders: [],
  friends: [],
  friendRequests: [],
  blockedUsers: [],
  groupsAndDms: [],
  refetchGroupsAndDms: null
})

export const useJoinedServers = () => {
  const { joinedServers } = useContext(DataContext)
  return joinedServers
}

export const useUserFolders = () => {
  const { userFolders } = useContext(DataContext)
  return userFolders
}

export const useFriends = () => {
  const { friends } = useContext(DataContext)
  return friends
}

export const useFriendRequests = () => {
  const { friendRequests } = useContext(DataContext)
  return friendRequests
}

export const useBlockedUsers = () => {
  const { blockedUsers } = useContext(DataContext)
  return blockedUsers
}

export const useGroupsAndDms = () => {
  const { groupsAndDms } = useContext(DataContext)
  return groupsAndDms
}

export function DataProvider({ children }) {
  const [{ data: joinedServersData }, refetchJoinedServers] = useQuery({
    query: GET_JOINED_SERVERS
  })
  useSubscription({ query: REFETCH_JOINED_SERVERS }, () =>
    refetchJoinedServers()
  )

  const [{ data: userFoldersData }, refetchUserFolders] = useQuery({
    query: GET_USER_FOLDERS
  })
  useSubscription({ query: REFETCH_USER_FOLDERS }, () => refetchUserFolders())

  const [{ data: friendsData }, refetchFriends] = useQuery({
    query: GET_FRIENDS
  })

  const [{ data: friendRequestsData }, refetchFriendRequests] = useQuery({
    query: GET_FRIEND_REQUESTS
  })

  const [{ data: blockedUsersData }, refetchBlockedUsers] = useQuery({
    query: GET_BLOCKED_USERS
  })

  useSubscription({ query: REFETCH_FRIENDS }, () => {
    refetchFriends()
    refetchFriendRequests()
    refetchBlockedUsers()
  })

  const [{ data: groupsAndDmsData }, refetchGroupsAndDms] = useQuery({
    query: GET_GROUPS_AND_DMS
  })
  useSubscription({ query: REFETCH_GROUPS_AND_DMS }, () =>
    refetchGroupsAndDms()
  )

  useSubscription({ query: MESSAGE_SENT })

  if (
    !joinedServersData ||
    !userFoldersData ||
    !friendsData ||
    !friendRequestsData ||
    !blockedUsersData ||
    !groupsAndDmsData
  )
    return <LoadingScreen />

  return (
    <DataContext.Provider
      value={{
        joinedServers: joinedServersData?.getJoinedServers || [],
        userFolders: userFoldersData?.getUserFolders || [],
        friends: friendsData?.getFriends || [],
        friendRequests: friendRequestsData?.getFriendRequests || [],
        blockedUsers: blockedUsersData?.getBlockedUsers || [],
        groupsAndDms: groupsAndDmsData?.getGroupsAndDms || [],
        refetchGroupsAndDms
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
