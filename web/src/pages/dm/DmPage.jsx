import MainSidebar from '@/components/sidebars/HomeSidebar'
import { useQuery } from 'urql'
import { useParams } from 'react-router-dom'
import SendMessageBar from '@/components/message/SendMessageBar'
import Message from '@/components/message/Message'
import { GET_MESSAGES, GET_USER } from '@/graphql/queries'
import DmHeader from '@/components/headers/DmHeader'
import Container from '@/components/Container'
import View from '@/components/View'
import Scroller from '@/components/Scroller'
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
      <MainSidebar />

      <Container>
        <Messages user={user} />
      </Container>
    </>
  )
}
