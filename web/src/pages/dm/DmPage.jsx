import Header from '@/components/ui/header/Header'
import MainSidebar from '@/pages/MainSidebar'
import React, { useEffect } from 'react'
import { useMutation, useQuery } from 'urql'
import { CREATE_DM } from '@/graphql/mutations'
import { Redirect, useParams } from 'react-router-dom'
import { useGroupsAndDms } from '@/components/DataProvider'
import { HiAtSymbol } from 'react-icons/hi'
import SendMessageBar from '@/components/message/SendMessageBar'
import Message from '@/components/message/Message'
import { Virtuoso } from 'react-virtuoso'
import { GET_MESSAGES } from '@/graphql/queries'
import LoadingScreen from '@/pages/LoadingScreen'

export default function DmPage() {
  const { userId } = useParams()
  const [createDmRes, createDm] = useMutation(CREATE_DM)
  const [groupsAndDms, refetchGroupsAndDms] = useGroupsAndDms()
  useEffect(() => {
    createDm({ userId }).then(() => refetchGroupsAndDms)
  }, [])
  const user = groupsAndDms.find(
    u => u.__typename === 'User' && u.id === userId
  )

  const [{ data: messagesData }] = useQuery({
    query: GET_MESSAGES,
    variables: { userId }
  })

  const messages = messagesData?.getMessages?.messages || []

  if (!user) return <LoadingScreen />

  return (
    <>
      <Header>
        <div className="flex items-center pl-6 text-secondary font-medium text-base">
          <HiAtSymbol className="w-5 h-5 mr-3 text-tertiary" />
          {user.name}
        </div>
      </Header>
      <MainSidebar />

      <main className="pl-76 pt-12 h-full">
        <div className="h-full dark:bg-gray-750">
          <Virtuoso
            followOutput={isAtBottom =>
              isAtBottom ||
              messages.length === 0 ||
              messages[messages.length - 1].author.isCurrentUser
            }
            alignToBottom
            data={messages}
            overscan={200}
            className="scrollbar-thin scrollbar-thumb-gray-850 scrollbar-track-gray-775 scrollbar-thumb-rounded-md mr-1"
            style={{ height: 'calc(100% - 5.875rem)' }}
            itemContent={(index, message) => (
              <Message
                message={message}
                showUser={
                  index === 0 ||
                  messagesData.messages[index - 1].author.id !==
                    message.author.id
                }
              />
            )}
          />

          <SendMessageBar user={user} />
        </div>
      </main>
    </>
  )
}
