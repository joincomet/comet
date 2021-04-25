import { useEffect, useState } from 'react'
import { useMessagesQuery } from '@/graphql/hooks'
import { useStore } from '@/hooks/useStore'

export function useMessages({ channelId, groupId, userId }) {
  const initialTime = useStore(s => s.initialTime)
  const [page, setPage] = useState(0)

  const variables = {
    channelId,
    groupId,
    userId,
    initialTime: initialTime ? new Date(initialTime) : null,
    pageSize: 100,
    page
  }

  useEffect(() => console.log({ channelId, groupId, userId }), [
    channelId,
    groupId,
    userId
  ])

  const { data, loading, fetchMore } = useMessagesQuery({
    variables,
    skip: (!channelId && !groupId && !userId) || !initialTime,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first'
  })

  return [
    data?.messages.flatMap(res => res.messages),
    loading,
    () => {
      // Wait 3 seconds before fetching because of bug where messages sometimes starts at top and immediately loads more
      if (
        !data ||
        !data?.messages[0]?.hasMore ||
        new Date() - initialTime < 3000
      )
        return
      setPage(page + 1)
      fetchMore({ variables })
    },
    data && data.messages.length > 0 ? data.messages[0].hasMore : true
  ]
}
