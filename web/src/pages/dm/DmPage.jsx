import DmHeader from '@/pages/dm/DmHeader'
import Messages from '@/components/message/Messages'
import { useSetHomePage } from '@/hooks/useSetHomePage'
import Page from '@/components/ui/page/Page'
import {
  useOpenDmMutation,
  useUserQuery
} from '@/graphql/hooks'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import { useEffect } from 'react'

export default function DmPage({ username }) {
  const { data: userData } = useUserQuery({
    variables: { username },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first'
  })
  const [openDm] = useOpenDmMutation()
  const user = userData?.user
  useEffect(() => {
    if (!user) return
    if (!user.showChat) {
      openDm({ variables: { input: { userId: user.id } } })
    }
  }, [user?.id])
  useSetHomePage(`dm/@${username}`)
  const [currentUser] = useCurrentUser()
  return (
    <Page header={<DmHeader user={user} />}>
      {!!user && <Messages user={user} users={[user, currentUser]} />}
    </Page>
  )
}
