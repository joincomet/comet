import { useParams } from 'react-router-dom'
import DmHeader from '@/pages/me/dm/DmHeader'
import Messages from '@/components/message/Messages'
import { useSetHomePage } from '@/hooks/useSetHomePage'
import Page from '@/components/ui/page/Page'
import { useUserQuery } from '@/graphql/hooks'

export default function DmPage() {
  const { userId } = useParams()
  const [{ data: userData }] = useUserQuery({
    variables: { userId }
  })
  const user = userData?.user
  useSetHomePage(`dm/${userId}`)
  return (
    <Page header={<DmHeader user={user} />}>
      {!!user && <Messages user={user} />}
    </Page>
  )
}
