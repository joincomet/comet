import { useRef, useState } from 'react'
import { GET_MESSAGES, useMessagesQuery } from '@/graphql/queries'
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

  return [data?.getMessages ?? [], fetching, () => setPage(page + 1)]
}
