import React from 'react'
import { useSendMessageMutation } from '@/lib/mutations'

export default function ChatMessageBar({ channel }) {
  const [{ data, fetching, error }, sendMessage] = useSendMessageMutation()

  return (
    <div className="pt-5.5 pb-6 px-4 dark:bg-gray-750">
      <input
        className="h-12 px-3 w-full dark:bg-gray-700 rounded-lg text-sm focus:outline-none text-secondary"
        placeholder={`Send a message in #${channel.name}`}
        onKeyDown={e => {
          if (e.key === 'Enter' && e.target.value) {
            sendMessage({ text: e.target.value, channelId: channel.id })
            e.target.value = ''
          }
        }}
      />
    </div>
  )
}
