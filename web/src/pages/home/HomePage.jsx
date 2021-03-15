import React from 'react'
import HomeSidebar from '@/pages/home/HomeSidebar'
import Posts from '@/components/post/Posts'
import Header from '@/components/ui/header/Header'
import FoldersSidebar from '@/pages/folder/FoldersSidebar'
import { useParams } from 'react-router-dom'
import ServerList from '@/components/server-list/ServerList'

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
