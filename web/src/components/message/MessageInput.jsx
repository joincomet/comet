import { useMemo, useEffect, useRef, useState } from 'react'
import { useMutation, useSubscription } from 'urql'
import { SEND_MESSAGE, START_TYPING } from '@/graphql/mutations'
import { IconUpload } from '@/components/ui/icons/Icons'
import Tippy from '@tippyjs/react'
import { useTranslation } from 'react-i18next'
import { USER_STARTED_TYPING } from '@/graphql/subscriptions'
import { useCurrentUser } from '@/providers/UserProvider'
import ContentEditable from '@/components/ui/editor/ContentEditable'

const TYPING_TIMEOUT = 3000

export default function MessageInput({ channel, group, user }) {
  const { t } = useTranslation()
  const currentUser = useCurrentUser()
  const [typingNames, setTypingNames] = useState(new Set())

  const variables = {
    channelId: channel?.id,
    groupId: group?.id,
    userId: user?.id
  }

  useSubscription(
    {
      query: USER_STARTED_TYPING,
      variables,
      pause: !channel && !group && !user
    },
    (_, { userStartedTyping: username }) => {
      setTypingNames(prev => new Set(prev.add(username)))
      setTimeout(
        () =>
          setTypingNames(
            prev => new Set([...prev].filter(u => u !== username))
          ),
        TYPING_TIMEOUT
      )
    }
  )

  const [_startTypingRes, startTyping] = useMutation(START_TYPING)

  const typingNamesDisplay = useMemo(() => {
    const names = [...typingNames]
      .filter(u => u !== currentUser.username)
      .map(
        u =>
          `<span style="font-weight: 700">
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
  }, [typingNames, currentUser.username])

  const [_, sendMessage] = useMutation(SEND_MESSAGE)

  const placeholder = useMemo(() => {
    if (channel) return `${t('message.message')} #${channel.name}`
    else if (group) return `${t('message.message')} ${group.name}`
    else if (user) return `${t('message.message')} @${user.name}`
    return `${t('message.message')}`
  }, [channel, group, user])

  const inputRef = useRef(null)
  const [text, setText] = useState('')

  useEffect(() => {
    inputRef.current?.el?.current?.focus()
  }, [])

  useEffect(() => {
    if (inputRef.current?.el?.current)
      inputRef.current.el.current.dataset.placeholder = placeholder
  }, [placeholder])

  return (
    <div className="px-4 dark:bg-gray-750">
      <div className="relative">
        <Tippy content={t('message.upload')}>
          <div className="block absolute left-4.5 top-1/2 transform -translate-y-1/2">
            <input
              className="hidden"
              id="file"
              name="file"
              type="file"
              accept="image/png, image/jpeg"
            />
            <label htmlFor="file" className="text-tertiary highlightable">
              <IconUpload className="w-5 h-5" />
            </label>
          </div>
        </Tippy>

        <ContentEditable
          ref={inputRef}
          className="px-14 min-h-[3rem] max-h-[20rem] overflow-y-auto scrollbar-light py-3 w-full dark:bg-gray-700 rounded-lg text-base focus:outline-none text-secondary border-none"
          html={text}
          data-placeholder={placeholder}
          onChange={e => {
            startTyping(variables)
            setText(e.target.value)
            if (text === '<br>') setText('')
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              if (text && !e.shiftKey) {
                e.preventDefault()
                sendMessage({
                  text,
                  ...variables
                })
                setText('')
              } else if (!text) {
                e.preventDefault()
              }
            }
          }}
        />
      </div>

      <div
        className="h-6 flex items-center text-primoary text-xs"
        dangerouslySetInnerHTML={{ __html: typingNamesDisplay }}
      />
    </div>
  )
}
