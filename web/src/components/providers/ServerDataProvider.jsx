import React, { createContext, useContext } from 'react'
import { useQuery, useSubscription } from 'urql'
import {
  GET_SERVER_CHANNELS,
  GET_SERVER_FOLDERS,
  GET_SERVER_PERMISSIONS
} from '@/graphql/queries'
import { useParams } from 'react-router-dom'
import { useJoinedServers } from '@/components/providers/DataProvider'
import { REFETCH_SERVER_CHANNELS } from '@/graphql/subscriptions/channel'
import { REFETCH_SERVER_FOLDERS } from '@/graphql/subscriptions/folder'

export const ServerDataContext = createContext({
  serverChannels: [],
  serverPermissions: [],
  serverFolders: []
})

export const useServer = () => {
  const { serverId } = useParams()
  const joinedServers = useJoinedServers()
  return joinedServers.find(s => s.id === serverId)
}

export const useServerChannels = () => {
  const { serverChannels } = useContext(ServerDataContext)
  return serverChannels
}

export const useServerPermissions = () => {
  const { serverPermissions } = useContext(ServerDataContext)
  return serverPermissions
}

export const useServerFolders = () => {
  const { serverFolders } = useContext(ServerDataContext)
  return serverFolders
}

export const useChannel = () => {
  const { channelId } = useParams()
  const channels = useServerChannels()
  return channels.find(c => c.id === channelId)
}

export function ServerDataProvider({ children }) {
  const { serverId } = useParams()

  const [{ data: serverChannelsData }, refetchServerChannels] = useQuery({
    query: GET_SERVER_CHANNELS,
    variables: { serverId }
  })
  useSubscription({ query: REFETCH_SERVER_CHANNELS }, () =>
    refetchServerChannels()
  )

  const [{ data: serverPermsData }] = useQuery({
    query: GET_SERVER_PERMISSIONS,
    variables: { serverId }
  })

  const [{ data: serverFoldersData }, refetchServerFolders] = useQuery({
    query: GET_SERVER_FOLDERS,
    variables: { serverId }
  })
  useSubscription({ query: REFETCH_SERVER_FOLDERS }, () =>
    refetchServerFolders()
  )

  return (
    <ServerDataContext.Provider
      value={{
        serverChannels: serverChannelsData?.getServerChannels || [],
        serverPermissions: serverPermsData?.getServerPermissions || [],
        serverFolders: serverFoldersData?.getServerFolders || []
      }}
    >
      {children}
    </ServerDataContext.Provider>
  )
}
