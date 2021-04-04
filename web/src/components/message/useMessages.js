import { useRef, useState } from 'react'
import { GET_MESSAGES } from '@/graphql/queries'
import { useQuery } from 'urql'

export function useMessages({ channel, group, user }) {
  const initialTime = useRef(new Date().toString())
  const [page, setPage] = useState(0)

  const [{ data, fetching }] = useQuery({
    query: GET_MESSAGES,
    variables: {
      channelId: channel?.id,
      groupId: group?.id,
      userId: user?.id,
      initialTime: initialTime.current,
      pageSize: 100,
      page
    },
    pause: !channel && !group && !user
  })

  return [
    data?.getMessages.flatMap(res => res.messages),
    fetching,
    () => {
      // Wait 3 seconds before fetching because of bug where messages sometimes starts at top and immediately loads more
      if (
        !data ||
        !data.getMessages[0].hasMore ||
        new Date().getTime() - initialTime.current.getTime() < 3000
      )
        return
      setPage(page + 1)
    },
    data ? data.getMessages[0].hasMore : true
  ]
}
