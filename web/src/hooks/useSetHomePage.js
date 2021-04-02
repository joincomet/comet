import { useEffect } from 'react'
import { useStore } from '@/hooks/useStore'

export const useSetHomePage = page => {
  const setHomePage = useStore(s => s.setHomePage)
  useEffect(() => setHomePage(page))
}
