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
import { useQuery, useSubscription } from 'urql'

export const DataContext = createContext({
  joinedServers: null,
  groupsAndDms: null,
  userFolders: null,
  userRelationships: null,
  loading: true
})

export function DataProvider({ children }) {
  const user = useCurrentUser()
  const pause = !user
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
  useSubscription({ query: REFETCH_USER_FOLDERS, pause }, () =>
    refetchFolders()
  )

  const [{ data: userRelationshipsData }, refetchRels] = useQuery({
    query: GET_USER_RELATIONSHIPS,
    pause
  })
  const userRelationships = userRelationshipsData?.getUserRelationships
  useSubscription({ query: REFETCH_USER_RELATIONSHIPS, pause }, () =>
    refetchRels()
  )

  useSubscription({ query: MESSAGE_SENT, pause })
  useSubscription({ query: MESSAGE_REMOVED, pause })
  useSubscription({ query: MESSAGE_UPDATED, pause })

  return (
    <DataContext.Provider
      value={{
        joinedServers,
        groupsAndDms,
        userFolders,
        userRelationships,
        loading:
          !joinedServers || !groupsAndDms || !userFolders || !userRelationships
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
