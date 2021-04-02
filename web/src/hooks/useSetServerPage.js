import { useEffect } from 'react'
import { useStore } from '@/hooks/useStore'
import { useParams } from 'react-router-dom'

export const useSetServerPage = page => {
  const { serverId } = useParams()
  const setServerPage = useStore(s => s.setServerPage)
  useEffect(() => setServerPage(serverId, page))
}
