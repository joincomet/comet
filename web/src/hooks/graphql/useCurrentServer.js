import { useContext } from 'react'
import { ServerContext } from '@/providers/ServerProvider'

export const useCurrentServer = () => {
  const { server, loading, users } = useContext(ServerContext)
  return { server, loading, users }
}
