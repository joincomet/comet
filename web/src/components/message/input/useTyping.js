import { useMemo, useState } from 'react'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import { useSubscription } from 'urql'
import { useTranslation } from 'react-i18next'
import {
  useStartTypingMutation,
  useUserStartedTypingSubscription
} from '@/graphql/hooks'

const TYPING_TIMEOUT = 3000

export const useTyping = ({ channel, group, user }) => {
  const { t } = useTranslation()
  const [currentUser] = useCurrentUser()
  const [typingNames, setTypingNames] = useState(new Set())
  const [_startTypingRes, startTyping] = useStartTypingMutation()

  const variables = {
    userId: user?.id,
    groupId: group?.id,
    channelId: channel?.id
  }

  useUserStartedTypingSubscription(
    {
      variables,
      pause: !channel && !group && !user
    },
    (_, { userStartedTyping: username }) => {
      setTypingNames(prev => new Set(prev.add(username)))
      const timeoutId = setTimeout(
        () =>
          setTypingNames(
            prev => new Set([...prev].filter(u => u !== username))
          ),
        TYPING_TIMEOUT
      )
      return () => clearTimeout(timeoutId)
    }
  )

  const typingNamesDisplay = useMemo(() => {
    const names = [...typingNames]
      .filter(u => u !== currentUser.username)
      .map(
        u =>
          `<span style="font-weight: 600" class="text-primary">
          ${u.split('#')[0]}&nbsp;
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
  }, [typingNames, currentUser.username, t])

  const typingFn = () => startTyping(variables)

  return [typingFn, typingNamesDisplay]
}
