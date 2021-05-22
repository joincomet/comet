import { createContext } from 'react'
import { useServerQuery, useServerUsersQuery } from '@/graphql/hooks'

export const ServerContext = createContext({
  server: null,
  loading: true,
  users: []
})

export default function ServerProvider({ children, name }) {
  const { data, loading } = useServerQuery({
    variables: {
      name
    },
    skip: !name,
    fetchPolicy: 'cache-and-network'
    // nextFetchPolicy: 'cache-first'
  })
  const server = data?.server

  const { data: usersData } = useServerUsersQuery({
    variables: { serverId: server?.id },
    skip: !server,
    fetchPolicy: 'cache-and-network'
  })
  const users = usersData?.serverUsers ?? []

  return (
    <ServerContext.Provider
      value={{
        server,
        loading: loading && !server,
        users
      }}
    >
      {children}
    </ServerContext.Provider>
  )
}
