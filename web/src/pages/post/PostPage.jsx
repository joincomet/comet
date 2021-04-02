import { useMemo } from 'react'
import { useQuery } from 'urql'
import { GET_COMMENTS, GET_POST } from '@/graphql/queries'
import Post from '@/components/post/Post'
import Container from '@/components/ui/Container'
import View from '@/components/ui/View'
import { useParams } from 'react-router-dom'
import PostUsersSidebar from '@/pages/post/PostUsersSidebar'
import Header from '@/components/ui/header/Header'
import { IconText } from '@/components/ui/icons/Icons'
import { createCommentTree, getParticipants } from '@/utils/commentUtils'
import Comment from '@/components/comment/Comment'
import CreateCommentCard from '@/components/comment/CreateCommentCard'
import { useStore } from '@/hooks/useStore'
import ShowUsersButton from '@/components/ui/header/buttons/ShowUsersButton'

export default function PostPage() {
  const { postId } = useParams()

  const [{ data }] = useQuery({
    query: GET_POST,
    variables: {
      postId
    }
  })
  const post = data?.getPost

  const [{ data: commentsData }] = useQuery({
    query: GET_COMMENTS,
    variables: { postId }
  })
  const flatComments = commentsData?.getComments ?? []
  const comments = useMemo(() => createCommentTree(flatComments), [
    flatComments
  ])
  const users = useMemo(() => getParticipants(comments), [comments])
  const { showUsers } = useStore()

  return (
    <>
      <Header icon={<IconText className="w-5 h-5" />} title="Post" showDivider>
        <div className="text-base font-medium truncate">{post?.title}</div>
        <div className="ml-auto pl-6">
          <ShowUsersButton />
        </div>
      </Header>
      <PostUsersSidebar post={post} users={users} />

      <Container rightSidebar={showUsers}>
        <View>
          <div className="pt-4 px-4">
            {!!post && <Post post={post} isPostPage />}
          </div>

          <div className="py-4 px-4">
            <CreateCommentCard postId={postId} />
          </div>

          <div className="space-y-2 px-4">
            {comments.map((comment, index) => (
              <Comment
                key={comment.id}
                comment={comment}
                post={post}
                isLast={index < comments.length - 1}
              />
            ))}
          </div>

          <div className="h-96" />
        </View>
      </Container>
    </>
  )
}
