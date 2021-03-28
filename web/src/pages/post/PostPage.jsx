import { useEffect } from 'react'
import { useQuery } from 'urql'
import { GET_COMMENTS, GET_POST } from '@/graphql/queries'
import Post from '@/components/post/Post'
import Container from '@/components/Container'
import View from '@/components/View'
import { useParams } from 'react-router-dom'
import PostUsersSidebar from '@/components/sidebars/PostUsersSidebar'
import Header from '@/components/headers/base/Header'
import { IconText, IconUsers } from '@/lib/Icons'
import Tippy from '@tippyjs/react'
import { createCommentTree, getParticipants } from '@/lib/commentUtils'
import Comment from '@/components/comment/Comment'
import { useTranslation } from 'react-i18next'

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

  const comments = createCommentTree(commentsData?.getComments ?? [])

  const users = getParticipants(comments)

  const { t } = useTranslation()

  return (
    <>
      <Header icon={<IconText className="w-5 h-5" />} title="Post" showDivider>
        <div className="text-base font-medium truncate">{post?.title}</div>
        <div className="ml-auto pl-6">
          <Tippy content={t('post.hideParticipants')}>
            <div>
              <IconUsers className="w-5 h-5 highlightable" />
            </div>
          </Tippy>
        </div>
      </Header>
      <PostUsersSidebar post={post} users={users} />

      <Container rightSidebar>
        <View>
          {!!post && <Post post={post} forceExpand />}
          {comments.map(comment => (
            <Comment comment={comment} post={post} key={comment.id} />
          ))}
        </View>
      </Container>
    </>
  )
}
