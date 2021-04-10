import { createContext, useContext } from 'react'
import { GET_SERVER_FOLDERS, GET_SERVER_PERMISSIONS } from '@/graphql/queries'
import { useParams } from 'react-router-dom'
import { useQuery, useSubscription } from 'urql'
import { useJoinedServers } from '@/providers/DataProvider'
import { REFETCH_SERVER_FOLDERS } from '@/graphql/subscriptions/folder'

export const ServerContext = createContext({
  folders: null,
  permissions: null,
  loading: true
})

export function ServerProvider({ children }) {
  const { serverId } = useParams()
  const joinedServers = useJoinedServers()
  const pause =
    !serverId ||
    !joinedServers ||
    !joinedServers.map(s => s.id).includes(serverId)

  const [{ data: foldersData }, refetchFolders] = useQuery({
    query: GET_SERVER_FOLDERS,
    variables: { serverId },
    pause
  })
  useSubscription({ query: REFETCH_SERVER_FOLDERS, pause }, () =>
    refetchFolders()
  )

  const [{ data: permissionsData }, refetchPermissions] = useQuery({
    query: GET_SERVER_PERMISSIONS,
    variables: { serverId },
    pause
  })
  // TODO refetch permissions

  return (
    <ServerContext.Provider
      value={{
        folders: foldersData?.getServerFolders,
        permissions: permissionsData?.getServerPermissions,
        loading: !foldersData
      }}
    >
      {children}
    </ServerContext.Provider>
  )
}

export const useServer = () => {
  const { serverId } = useParams()
  const joinedServers = useJoinedServers()
  return joinedServers?.find(s => s.id === serverId)
}
export const useServerLoading = () => {
  const { loading } = useContext(ServerContext)
  return loading
}
export const useServerFolders = () => {
  const { folders } = useContext(ServerContext)
  return folders
}
export const useServerPermissions = () => {
  const { permissions } = useContext(ServerContext)
  return permissions
}
