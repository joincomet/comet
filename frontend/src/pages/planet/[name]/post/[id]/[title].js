import { QueryClient } from 'react-query'
import { dehydrate } from '@/lib/dehydrate'
import { fetchPost, usePost } from '@/lib/usePost'
import { useRouter } from 'next/router'
import Post from '@/components/post/Post'
import { fetchComments, useComments } from '@/lib/useComments'

export default function PlanetPage() {
  const router = useRouter()
  const post = usePost({ postId: router.query.id }).data
  const comments = useComments({ postId: router.query.id }).data

  return (
    <div className="py-3">
      <Post post={post} />
      {comments.map((comment, index) => (
        <div key={index} className="mx-3 2xl:mx-72 mb-3">
          <div className="dark:bg-gray-800 rounded-md shadow-md p-3">
            <div
              className="text-sm"
              dangerouslySetInnerHTML={{ __html: comment.textContent }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['post', { postId: ctx.query.id }], key =>
    fetchPost(key, ctx)
  )

  await queryClient.prefetchQuery(['comments', { postId: ctx.query.id }], key =>
    fetchComments(key, ctx)
  )

  const dehydratedState = dehydrate(queryClient)

  return {
    props: {
      dehydratedState
    }
  }
}
