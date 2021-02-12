import PlanetSidebar from '@/pages/planet/PlanetSidebar'
import React from 'react'
import Posts from '@/components/post/Posts'
import Header from '@/components/ui/header/Header'
import FoldersSidebar from '@/pages/folder/FoldersSidebar'
import { useQuery } from 'urql'
import { useParams } from 'react-router-dom'
import { CURRENT_USER_QUERY } from '@/lib/queries'

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
