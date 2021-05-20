import Header from '@/components/ui/header/Header'
import { useParams } from 'react-router-dom'
import GroupUsersSidebar from '@/pages/group/GroupUsersSidebar'
import Messages from '@/components/message/Messages'
import { useSetHomePage } from '@/hooks/useSetHomePage'
import Page from '@/components/ui/page/Page'
import { IconUsers } from '@/components/ui/icons/Icons'
import ShowUsersButton from '@/components/ui/header/buttons/ShowUsersButton'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import { useReadGroupMutation } from '@/graphql/hooks'
import { useEffect } from 'react'

export default function GroupPage() {
  const { groupId } = useParams()
  useSetHomePage(`group/${groupId}`)
  const [currentUser] = useCurrentUser()
  const [readGroup] = useReadGroupMutation()

  useEffect(() => {
    if (currentUser && group && group.unreadCount > 0) {
      readGroup({
        variables: { input: { groupId: group.id } },
        optimisticResponse: {
          readGroup: {
            ...group,
            unreadCount: 0
          }
        }
      })
    }
  }, [group, currentUser])

  const group = currentUser.groups.find(g => g.id === groupId)
  return (
    <Page
      header={
        <Header
          icon={<IconUsers className="w-5 h-5 text-primary" />}
          title={group.displayName}
        >
          <ShowUsersButton />
        </Header>
      }
      rightSidebar={<GroupUsersSidebar users={group.users} />}
    >
      {!!group && <Messages group={group} users={group.users} />}
    </Page>
  )
}
