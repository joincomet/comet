import { useMemo, useState } from 'react'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import { useTranslation } from 'react-i18next'
import {
  useUpdateTypingMutation,
  useTypingUpdatedSubscription
} from '@/graphql/hooks'

const TYPING_TIMEOUT = 3000

export const useTyping = ({ channel, group, user, users }) => {
  const { t } = useTranslation()
  const [currentUser] = useCurrentUser()
  const [typingIds, setTypingIds] = useState(new Set())
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
        setTypingIds(prev => new Set(prev.add(typingUserId)))
        setTimeout(
          () =>
            setTypingIds(
              prev => new Set([...prev].filter(id => id !== typingUserId))
            ),
          TYPING_TIMEOUT
        )
      } else {
        setTypingIds(
          prev => new Set([...prev].filter(id => id !== typingUserId))
        )
      }
    }
  })

  const typingNamesDisplay = useMemo(() => {
    const names = [...typingIds]
      .filter(id => id !== currentUser.id)
      .map(id => user.find(user => user.id === id)?.name)
      .filter(name => !!name)
      .map(
        name =>
          `<span style="font-weight: 600" class="text-primary">
          &nbsp;${name}&nbsp;
        </span>`
      )
    if (names.length === 0) return null
    else if (names.length === 1)
      return t('message.typing.one', { name: names[0] })
    else if (names.length === 2)
      return t('message.typing.two', { name1: names[0], name2: names[1] })
    else if (names.length === 3)
      return t('message.typing.three', {
        name1: names[0],
        name2: names[1],
        name3: names[2]
      })
    else return t('message.typing.several')
  }, [typingIds, currentUser, t])

  const typingFn = () => updateTyping({ variables: { input: variables } })

  return [typingFn, typingNamesDisplay]
}
