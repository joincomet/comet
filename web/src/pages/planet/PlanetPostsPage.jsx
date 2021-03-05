import React from 'react'
import Posts from '@/components/post/Posts'
import Header from '@/components/ui/header/Header'
import FoldersSidebar from '@/pages/folder/FoldersSidebar'
import { useParams } from 'react-router-dom'

export default function PlanetPostsPage() {
  const { planetId } = useParams()

  return (
    <>
      <Header></Header>
      <FoldersSidebar />
      <main>
        <Posts variables={{ planetId }} draggable link thumbnail expandable />
      </main>
    </>
  )
}
