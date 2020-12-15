import { usePosts } from '@/lib/usePosts'
import InfiniteScroll from 'react-infinite-scroll-component'
import Post from '@/components/post/Post'

export default function Posts({ variables }) {
  const { data, fetchNextPage } = usePosts(variables)

  if (!data) return null

  return (
    <InfiniteScroll
      scrollThreshold="600px"
      next={fetchNextPage}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      dataLength={data.length}
      style={{ overflowX: 'hidden' }}
    >
      {data.map((post, index) => (
        <Post key={post.id} post={post} />
      ))}
    </InfiniteScroll>
  )
}
