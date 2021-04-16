import { useMemo, useState } from 'react'
import { useCurrentUser } from '@/providers/UserProvider'
import { useMutation, useSubscription } from 'urql'
import { START_TYPING } from '@/graphql/mutations'
import { useTranslation } from 'react-i18next'

const TYPING_TIMEOUT = 3000

export const useTyping = ({ channel, group, user }) => {
  const { t } = useTranslation()
  const currentUser = useCurrentUser()
  const [typingNames, setTypingNames] = useState(new Set())
  const [_startTypingRes, startTyping] = useMutation(START_TYPING)

  const variables = {
    userId: user?.id,
    groupId: group?.id,
    channelId: channel?.id
  }

  useSubscription(
    {
      query: USER_STARTED_TYPING,
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
