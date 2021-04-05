import { useQuery } from 'urql'
import { useParams } from 'react-router-dom'
import { GET_USER } from '@/graphql/queries'
import DmHeader from '@/pages/me/dm/DmHeader'
import Messages from '@/components/message/Messages'
import { useSetHomePage } from '@/hooks/useSetHomePage'
import Page from '@/components/ui/page/Page'

export default function DmPage() {
  const { userId } = useParams()
  const [{ data: userData }] = useQuery({
    query: GET_USER,
    variables: { userId }
  })
  const user = userData?.getUser
  useSetHomePage(`dm/${userId}`)
  return (
    <Page header={<DmHeader user={user} />}>
      <Messages user={user} />
    </Page>
  )
}
