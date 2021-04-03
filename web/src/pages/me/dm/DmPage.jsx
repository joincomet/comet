import { useQuery } from 'urql'
import { useParams } from 'react-router-dom'
import { GET_USER } from '@/graphql/queries'
import DmHeader from '@/pages/me/dm/DmHeader'
import Container from '@/components/ui/Container'
import Messages from '@/components/message/Messages'
import { useSetHomePage } from '@/hooks/useSetHomePage'

export default function DmPage() {
  const { userId } = useParams()
  const [{ data: userData }] = useQuery({
    query: GET_USER,
    variables: { userId }
  })
  const user = userData?.getUser
  useSetHomePage(`dm/${userId}`)
  return (
    <>
      <DmHeader user={user} />

      <Container>{!!user && <Messages user={user} />}</Container>
    </>
  )
}
