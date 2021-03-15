import React from 'react'
import PlanetSidebar from '@/pages/server/ServerSidebar'
import { useParams } from 'react-router-dom'
import { GET_JOINED_SERVERS } from '@/graphql/queries'
import { useQuery } from 'urql'

export default function ServerLayout({ children }) {
  const { planetId } = useParams()
  const [
    {
      data: { getJoinedServers: servers }
    }
  ] = useQuery({ query: GET_JOINED_SERVERS })
  const server = servers.find(p => p.id === planetId)

  return (
    <>
      <PlanetSidebar planet={server} />
      {children}
    </>
  )
}
