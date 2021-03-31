import { useQuery } from 'urql'
import { useParams } from 'react-router-dom'
import { GET_USER } from '@/graphql/queries'
import DmHeader from '@/components/headers/DmHeader'
import Container from '@/components/Container'
import Messages from '@/components/message/Messages'

export default function DmPage() {
  const { userId } = useParams()
  const [{ data: userData }] = useQuery({
    query: GET_USER,
    variables: { userId }
  })
  const user = userData?.getUser

  return (
    <>
      <DmHeader user={user} />

      <Container>
        <Messages user={user} />
      </Container>
    </>
  )
}
