import { useParams } from 'react-router-dom'
import DmHeader from '@/pages/me/dm/DmHeader'
import Messages from '@/components/message/Messages'
import { useSetHomePage } from '@/hooks/useSetHomePage'
import Page from '@/components/ui/page/Page'
import { useUserQuery } from '@/graphql/hooks'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'

export default function DmPage() {
  const { userId } = useParams()
  const { data: userData } = useUserQuery({
    variables: { id: userId }
  })
  const user = userData?.user
  useSetHomePage(`dm/${userId}`)
  const [currentUser] = useCurrentUser()
  return (
    <Page header={<DmHeader user={user} />}>
      {!!user && <Messages user={user} users={[user, currentUser]} />}
    </Page>
  )
}
