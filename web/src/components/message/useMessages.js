import { useMessagesQuery } from '@/graphql/hooks'

export const useMessages = ({ channelId, groupId, userId }) => {
  const vars = { channelId, groupId, userId }
  const { data, fetchMore, loading } = useMessagesQuery({
    variables: {
      ...vars,
      cursor: null
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first'
  })
  const hasMore = data?.messages.hasMore
  const messages = data?.messages.messages
  const loadMore = () => {
    if (!messages || !hasMore || messages.length === 0) return
    fetchMore({
      variables: {
        ...vars,
        cursor: messages[0].id
      },
      updateQuery: (prev, { fetchMoreResult: res }) => {
        return {
          messages: {
            hasMore: res.messages.hasMore,
            messages: [...res.messages.messages, ...prev.messages.messages]
          }
        }
      }
    })
  }
  return [messages, loading, loadMore, hasMore]
}
