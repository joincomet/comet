import React, { useEffect, useState } from 'react'
import FoldersSidebar from '@/components/sidebars/FoldersSidebar'
import PostsHeader from '@/components/headers/PostsHeader'
import { useStore } from '@/lib/stores/useStore'
import { useQuery } from 'urql'
import { GET_COMMENTS, GET_POST, GET_POSTS } from '@/graphql/queries'
import Post from '@/components/post/Post'
import MainContainer from '@/components/MainContainer'
import MainView from '@/components/MainView'
import { useParams } from 'react-router-dom'
import PostUsersSidebar from '@/components/sidebars/PostUsersSidebar'
import Header from '@/components/headers/base/Header'
import { IconText, IconUsers } from '@/lib/Icons'
import Tippy from '@tippyjs/react'
import { createCommentTree, getParticipants } from '@/lib/commentUtils'
import Comment from '@/components/comment/Comment'
import HeaderTab from '@/components/headers/base/HeaderTab'

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

  useEffect(() => console.log(comments), [comments])

  const users = getParticipants(comments)

  return (
    <>
      <Header icon={<IconText className="w-5 h-5" />} title="Post" showDivider>
        <div className="text-base font-medium truncate">{post?.title}</div>
        <div className="ml-auto pl-6">
          <Tippy content="Hide Participants">
            <div>
              <IconUsers className="w-5 h-5 highlightable" />
            </div>
          </Tippy>
        </div>
      </Header>
      <PostUsersSidebar post={post} users={users} />

      <MainContainer rightSidebar>
        <MainView>
          {!!post && <Post post={post} forceExpand />}
          {comments.map(comment => (
            <Comment comment={comment} post={post} key={comment.id} />
          ))}
        </MainView>
      </MainContainer>
    </>
  )
}
