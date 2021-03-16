import React, { createContext, useContext } from 'react'
import { useQuery } from 'urql'
import {
  GET_BLOCKED_USERS,
  GET_CURRENT_USER,
  GET_GROUPS_AND_DMS,
  GET_JOINED_SERVERS,
  GET_USER_FOLDERS
} from '@/graphql/queries'
import { GET_FRIEND_REQUESTS, GET_FRIENDS } from '@/graphql/queries/friend'
import LoadingScreen from '@/pages/LoadingScreen'

export const DataContext = createContext({
  currentUser: null,
  joinedServers: [],
  userFolders: [],
  friends: [],
  friendRequests: [],
  blockedUsers: [],
  groupsAndDms: [],
  refetchGroupsAndDms: null
})

export const useUser = () => {
  const { currentUser } = useContext(DataContext)
  return currentUser
}

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
  const { groupsAndDms, refetchGroupsAndDms } = useContext(DataContext)
  return [groupsAndDms, refetchGroupsAndDms]
}

export function DataProvider({ children }) {
  const [{ data: currentUserData }] = useQuery({
    query: GET_CURRENT_USER
  })

  const [{ data: joinedServersData }] = useQuery({
    query: GET_JOINED_SERVERS
  })

  const [{ data: userFoldersData }] = useQuery({
    query: GET_USER_FOLDERS
  })

  const [{ data: friendsData }] = useQuery({
    query: GET_FRIENDS
  })

  const [{ data: friendRequestsData }] = useQuery({
    query: GET_FRIEND_REQUESTS
  })

  const [{ data: blockedUsersData }] = useQuery({
    query: GET_BLOCKED_USERS
  })

  const [{ data: groupsAndDmsData }, refetchGroupsAndDms] = useQuery({
    query: GET_GROUPS_AND_DMS
  })

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
        currentUser: currentUserData?.getCurrentUser,
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
