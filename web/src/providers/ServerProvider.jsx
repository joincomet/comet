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
    fetchPolicy: 'network-only',
    // nextFetchPolicy: 'standby'
  })
  const server = data?.server

  const { data: usersData } = useServerUsersQuery({
    variables: { serverId: server?.id },
    skip: !server,
    fetchPolicy: 'network-only'
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
