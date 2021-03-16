import React from 'react'
import { useMutation } from 'urql'
import { SEND_MESSAGE } from '@/graphql/mutations'

export default function SendMessageBar({ channel, group, user }) {
  const [{ data, fetching, error }, sendMessage] = useMutation(SEND_MESSAGE)
  let placeholder
  if (channel) placeholder = `Message #${channel.name}`
  else if (group) placeholder = `Message ${group.name}`
  else if (user) placeholder = `Message @${user.name}`

  return (
    <div className="pt-5.5 pb-6 px-4 dark:bg-gray-750">
      <input
        className="h-12 px-3 w-full dark:bg-gray-700 rounded-lg text-sm focus:outline-none text-secondary"
        placeholder={placeholder}
        onKeyDown={e => {
          if (e.key === 'Enter' && e.target.value) {
            sendMessage({
              text: e.target.value,
              channelId: channel?.id,
              groupId: group?.id,
              userId: user?.id
            })
            e.target.value = ''
          }
        }}
      />
    </div>
  )
}
