import { useHeaderStore } from '@/lib/useHeaderStore'
import { useEffect } from 'react'

export default function UniversePage() {
  const { setTitle } = useHeaderStore()
  useEffect(() => setTitle('Universe'), [])

  return <div>universe</div>
}
