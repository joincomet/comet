import DmHeader from '@/pages/dm/DmHeader'
import Messages from '@/components/message/Messages'
import { useSetHomePage } from '@/hooks/useSetHomePage'
import Page from '@/components/ui/page/Page'
import {
  useOpenDmMutation,
  useReadDmMutation,
  useUserQuery
} from '@/graphql/hooks'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import { useEffect } from 'react'

export default function DmPage({ username }) {
  const { data: userData } = useUserQuery({
    variables: { username }
  })
  const [openDm] = useOpenDmMutation()
  const [readDm] = useReadDmMutation()
  const user = userData?.user
  useEffect(() => {
    if (!user) return
    if (!user.showChat) {
      openDm({ variables: { input: { userId: user.id } } })
    }
  }, [user])
  useSetHomePage(`dm/@${username}`)
  const [currentUser] = useCurrentUser()
  useEffect(() => {
    if (currentUser && user && user.unreadCount > 0) {
      readDm({
        variables: { input: { userId: user.id } },
        optimisticResponse: {
          readDm: {
            ...user,
            unreadCount: 0
          }
        }
      })
    }
  }, [user, currentUser])
  return (
    <Page header={<DmHeader user={user} />}>
      {!!user && <Messages user={user} users={[user, currentUser]} />}
    </Page>
  )
}
