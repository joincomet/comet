import React from 'react'
import HomeSidebar from '@/components/sidebars/HomeSidebar'
import Posts from '@/components/post/Posts'
import Header from '@/components/ui/header/Header'
import FoldersSidebar from '@/components/sidebars/FoldersSidebar'
import { useParams } from 'react-router-dom'
import PlanetScroller from '@/components/planet-scroller/PlanetScroller'

export default function HomePage() {
  const query = useParams()

  const variables = {
    joinedOnly: true,
    pageSize: 20,
    page: query.page ? query.page - 1 : 0,
    sort: query.sort ? query.sort.toUpperCase() : 'HOT',
    time: query.time ? query.time.toUpperCase() : 'ALL'
  }

  return (
    <>
      <PlanetScroller />
      <HomeSidebar />
      <FoldersSidebar />
      <Header />

      <div className="h-full pl-76 pr-60 pt-12">
        <div className="h-full dark:bg-gray-750">
          <Posts />
        </div>
      </div>
    </>
  )
}
