import Header from '@/components/ui/header/Header'
import { useParams } from 'react-router-dom'
import GroupUsersSidebar from '@/pages/me/group/GroupUsersSidebar'
import Messages from '@/components/message/Messages'
import { useGroupsAndDms } from '@/providers/DataProvider'
import { useSetHomePage } from '@/hooks/useSetHomePage'
import Page from '@/components/ui/page/Page'

export default function GroupPage() {
  const { groupId } = useParams()
  const group = useGroupsAndDms().find(
    o => o.__typename === 'Group' && o.id === groupId
  )
  useSetHomePage(`group/${groupId}`)
  return (
    <Page header={<Header></Header>} rightSidebar={<GroupUsersSidebar />}>
      {!!group && <Messages group={group} />}
    </Page>
  )
}
