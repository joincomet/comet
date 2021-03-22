import React, { useEffect, useState } from 'react'
import FoldersSidebar from '@/components/sidebars/FoldersSidebar'
import PostsHeader from '@/components/headers/PostsHeader'
import { useStore } from '@/lib/stores/useStore'
import { useQuery } from 'urql'
import { GET_POST, GET_POSTS } from '@/graphql/queries'
import Post from '@/components/post/Post'
import MainContainer from '@/components/MainContainer'
import MainView from '@/components/MainView'
import { useParams } from 'react-router-dom'
import PostUsersSidebar from '@/components/sidebars/PostUsersSidebar'
import Header from '@/components/headers/base/Header'

export default function PostPage() {
  const { postId } = useParams()

  const [{ data }] = useQuery({
    query: GET_POST,
    variables: {
      postId
    }
  })
  const post = data?.getPost

  return (
    <>
      <Header />
      <PostUsersSidebar post={post} />

      <MainContainer>
        <MainView>Test</MainView>
      </MainContainer>
    </>
  )
}
