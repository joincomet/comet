import React, { createContext, useContext } from 'react'
import { useQuery } from 'urql'
import {
  GET_CURRENT_USER,
  GET_JOINED_SERVERS,
  GET_SERVER_CHANNELS,
  GET_SERVER_FOLDERS,
  GET_SERVER_PERMISSIONS,
  GET_USER_FOLDERS
} from '@/graphql/queries'
import { GET_FRIEND_REQUESTS, GET_FRIENDS } from '@/graphql/queries/friend'
import { useParams } from 'react-router-dom'
import { useJoinedServers } from '@/components/DataProvider'

export const ServerDataContext = createContext({
  channels: [],
  serverPermissions: [],
  serverFolders: []
})

export const useServer = () => {
  const { serverId } = useParams()
  const joinedServers = useJoinedServers()
  return joinedServers.find(s => s.id === serverId)
}

export const useChannels = () => {
  const { channels } = useContext(ServerDataContext)
  return channels
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
  const channels = useChannels()
  return channels.find(c => c.id === channelId)
}

export function ServerDataProvider({ children }) {
  const { serverId } = useParams()

  const [{ data: channelsData }] = useQuery({
    query: GET_SERVER_CHANNELS,
    variables: { serverId }
  })

  const [{ data: serverPermsData }] = useQuery({
    query: GET_SERVER_PERMISSIONS,
    variables: { serverId }
  })

  const [{ data: serverFoldersData }] = useQuery({
    query: GET_SERVER_FOLDERS,
    variables: { serverId }
  })

  return (
    <ServerDataContext.Provider
      value={{
        channels: channelsData?.getServerChannels || [],
        serverPermissions: serverPermsData?.getServerPermissions || [],
        serverFolders: serverFoldersData?.getServerFolders || []
      }}
    >
      {children}
    </ServerDataContext.Provider>
  )
}
