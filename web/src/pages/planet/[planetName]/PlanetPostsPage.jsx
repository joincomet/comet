import PlanetSidebar from '@/components/sidebars/PlanetSidebar'
import React from 'react'
import Posts from '@/components/post/Posts'
import Header from '@/components/ui/header/Header'
import FoldersSidebar from '@/components/sidebars/FoldersSidebar'
import { HiFolder } from 'react-icons/hi'
import HeaderNewPostButton from '@/components/ui/header/HeaderNewPostButton'
import CreatePostDialog from '@/components/modals/createpost/CreatePostDialog'

export default function PlanetPostsPage() {
  const variables = {
    planet: query.planetName,
    pageSize: 20,
    page: query.page ? query.page - 1 : 0,
    sort: query.sort ? query.sort.toUpperCase() : 'HOT',
    time: query.time ? query.time.toUpperCase() : 'ALL'
  }
  const planetQuery = usePlanet({ name: query.planetName })
  const planet = planetQuery.data

  const title =
    planet.name +
    ' / Posts / ' +
    (query.sort
      ? query.sort.toUpperCase().substring(0, 1) +
        query.sort.toLowerCase().substring(1)
      : 'Hot') +
    (query.time
      ? ' / ' +
        query.time.toUpperCase().substring(0, 1) +
        query.time.toLowerCase().substring(1)
      : '')

  return (
    <>
      <Header
        ref={header}
        {...{ slideoutLeft, slideoutRight, title }}
        rightSidebarIcon={<HiFolder className="w-5 h-5" />}
      >
        <CreatePostDialog
          activator={({ setOpen }) => <HeaderNewPostButton setOpen={setOpen} />}
        />
      </Header>
      <PlanetSidebar planet={planet} ref={menuLeft} />
      <FoldersSidebar ref={menuRight} />
      <main
        className="slideout-panel slideout-panel--right slideout-panel--header"
        id="panel"
        ref={panel}
      >
        <Posts variables={variables} draggable link thumbnail expandable />
      </main>
    </>
  )
}
