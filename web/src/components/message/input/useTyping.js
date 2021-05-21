import { useEffect, useMemo, useState } from 'react'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import { useTranslation } from 'react-i18next'
import {
  useUpdateTypingMutation,
  useTypingUpdatedSubscription
} from '@/graphql/hooks'

const TYPING_TIMEOUT = 1500

export const useTyping = ({ channel, group, user, users }) => {
  const { t } = useTranslation()
  const [currentUser] = useCurrentUser()
  const [typingIds, setTypingIds] = useState([])
  const [updateTyping] = useUpdateTypingMutation()

  const variables = {
    userId: user?.id,
    groupId: group?.id,
    channelId: channel?.id
  }

  useTypingUpdatedSubscription({
    variables,
    skip: !channel && !group && !user,
    onSubscriptionData({
      subscriptionData: {
        data: {
          typingUpdated: { typingUserId, isTyping }
        }
      }
    }) {
      if (isTyping) {
        const found = typingIds.find(obj => obj.id === typingUserId)
        if (found) {
          const index = typingIds.indexOf(found)
          const newTypingIds = [...typingIds]
          newTypingIds[index] = { id: found.id, time: new Date().getTime() }
          setTypingIds(newTypingIds)
        } else {
          setTypingIds([
            ...typingIds,
            { id: typingUserId, time: new Date().getTime() }
          ])
        }
      } else {
        setTypingIds(typingIds.filter(({ id }) => id !== typingUserId))
      }
    }
  })

  const [typingUpdate, setTypingUpdate] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setTypingUpdate(typingUpdate + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [typingUpdate, setTypingUpdate])

  const typingNames = typingIds
    .filter(
      ({ id, time }) =>
        (!currentUser || id !== currentUser.id) &&
        new Date().getTime() - time <= TYPING_TIMEOUT
    )
    .map(({ id }) => users.find(user => user.id === id)?.username)
    .filter(name => !!name)

  const typingFn = () => updateTyping({ variables: { input: variables } })

  return [typingFn, typingNames]
}
