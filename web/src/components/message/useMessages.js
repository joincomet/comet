import { useState } from 'react'
import { useMessagesQuery } from '@/graphql/hooks'
import { useStore } from '@/hooks/useStore'

export function useMessages({ channel, group, user }) {
  const initialTime = useStore(s => s.initialTime)
  const [page, setPage] = useState(0)

  const variables = {
    channelId: channel?.id,
    groupId: group?.id,
    userId: user?.id,
    initialTime: initialTime ? new Date(initialTime) : null,
    pageSize: 100,
    page
  }

  const { data, loading, fetchMore } = useMessagesQuery({
    variables,
    skip: (!channel && !group && !user) || !initialTime
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
