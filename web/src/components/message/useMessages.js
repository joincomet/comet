import { useState } from 'react'
import { useMessagesQuery } from '@/graphql/hooks'

export function useMessages({ channel, group, user, initialTime }) {
  // const initialTime = useRef(new Date())
  const [page, setPage] = useState(0)

  const [{ data, fetching }] = useMessagesQuery({
    variables: {
      channelId: channel?.id,
      groupId: group?.id,
      userId: user?.id,
      initialTime: initialTime.toString(),
      pageSize: 100,
      page
    },
    pause: !channel && !group && !user
  })

  return [
    data?.messages.flatMap(res => res.messages),
    fetching,
    () => {
      // Wait 3 seconds before fetching because of bug where messages sometimes starts at top and immediately loads more
      if (
        !data ||
        !data?.messages[0]?.hasMore ||
        new Date() - initialTime < 3000
      )
        return
      setPage(page + 1)
    },
    data && data.messages.length > 0 ? data.messages[0].hasMore : true
  ]
}
