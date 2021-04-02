import Header from '@/components/ui/header/Header'
import { useParams } from 'react-router-dom'
import GroupUsersSidebar from '@/pages/me/group/GroupUsersSidebar'
import Container from '@/components/ui/Container'
import Messages from '@/components/message/Messages'
import { useGroupsAndDms } from '@/providers/DataProvider'

export default function GroupPage() {
  const { groupId } = useParams()
  const group = useGroupsAndDms().find(
    o => o.__typename === 'Group' && o.id === groupId
  )
  return (
    <>
      <Header />
      <GroupUsersSidebar />

      <Container>
        <Messages group={group} />
      </Container>
    </>
  )
}
