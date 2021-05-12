import { useParams } from 'react-router-dom'
import DmHeader from '@/pages/me/dm/DmHeader'
import Messages from '@/components/message/Messages'
import { useSetHomePage } from '@/hooks/useSetHomePage'
import Page from '@/components/ui/page/Page'
import { useOpenDmMutation, useUserQuery } from '@/graphql/hooks'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import { useEffect } from 'react'

export default function DmPage() {
  const { userId } = useParams()
  const { data: userData } = useUserQuery({
    variables: { id: userId }
  })
  const [openDm] = useOpenDmMutation()
  const user = userData?.user
  useEffect(() => {
    if (!user) return
    if (!user.showChat) {
      openDm({ variables: { input: { userId: user.id } } })
    }
  }, [user])
  useSetHomePage(`dm/${userId}`)
  const [currentUser] = useCurrentUser()
  return (
    <Page header={<DmHeader user={user} />}>
      {!!user && <Messages user={user} users={[user, currentUser]} />}
    </Page>
  )
}
