import React from 'react'
import Posts from '@/components/post/Posts'
import Header from '@/components/ui/header/Header'
import FoldersSidebar from '@/pages/folder/FoldersSidebar'
import { useParams } from 'react-router-dom'

export default function ServerPostsPage() {
  const { serverId } = useParams()

  return (
    <>
      <Header></Header>
      <FoldersSidebar />
      <main>
        <Posts variables={{ serverId }} draggable link thumbnail expandable />
      </main>
    </>
  )
}
