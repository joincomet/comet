import { useEffect, useRef, useState } from 'react'
import { useMutation } from 'urql'
import { SEND_MESSAGE } from '@/graphql/mutations'
import { IconUpload } from '@/lib/Icons'
import Tippy from '@tippyjs/react'
import { useTranslation } from 'react-i18next'

export default function SendMessageBar({ channel, group, user }) {
  const [_, sendMessage] = useMutation(SEND_MESSAGE)
  let placeholder
  if (channel) placeholder = `Message #${channel.name}`
  else if (group) placeholder = `Message ${group.name}`
  else if (user) placeholder = `Message @${user.name}`

  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus()
  }, [inputRef])

  const { t } = useTranslation()

  return (
    <div className="pt-5.5 pb-6 px-4 dark:bg-gray-750">
      <div className="relative">
        <Tippy content={t('messages.upload')}>
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

        <div
          contentEditable
          ref={inputRef}
          className="px-14 min-h-[3rem] max-h-[20rem] overflow-y-auto scrollbar-light py-3 w-full dark:bg-gray-700 rounded-lg text-base focus:outline-none text-secondary border-none"
          data-placeholder={placeholder}
          autoFocus
          onKeyUp={e => {
            if (e.target.innerHTML === '<br>') e.target.innerHTML = ''
          }}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey && e.target.innerHTML) {
              e.preventDefault()
              sendMessage({
                text: e.target.innerHTML,
                channelId: channel?.id,
                groupId: group?.id,
                userId: user?.id
              })
              e.target.innerHTML = ''
            }
          }}
        />
      </div>
    </div>
  )
}
