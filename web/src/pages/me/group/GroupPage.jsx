import Header from '@/components/ui/header/Header'
import HomeSidebar from '@/pages/me/HomeSidebar'

import GroupUsersSidebar from '@/pages/me/group/GroupUsersSidebar'

export default function GroupPage() {
  return (
    <>
      <Header />
      <HomeSidebar />
      <GroupUsersSidebar />

      <main></main>
    </>
  )
}
