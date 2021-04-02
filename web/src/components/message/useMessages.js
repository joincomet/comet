import { useRef, useState } from 'react'
import { useMessagesQuery } from '@/graphql/queries'

export function useMessages({ channel, group, user }) {
  const initialTime = useRef(new Date().toString())
  const [page, setPage] = useState(0)

  const [{ data, fetching }] = useMessagesQuery({
    channelId: channel?.id,
    groupId: group?.id,
    userId: user?.id,
    initialTime: initialTime.current,
    pageSize: 100,
    page
  })

  return [data?.getMessages ?? [], fetching, () => setPage(page + 1)]
}
