import { createContext } from 'react'
import { useServerQuery } from '@/graphql/hooks'

export const ServerContext = createContext({ server: null, loading: true })

export default function ServerProvider({ children, name }) {
  const { data, loading } = useServerQuery({
    variables: {
      name
    },
    skip: !name,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first'
  })
  const server = data?.server
  return (
    <ServerContext.Provider
      value={{
        server,
        loading: loading && !server
      }}
    >
      {children}
    </ServerContext.Provider>
  )
}
