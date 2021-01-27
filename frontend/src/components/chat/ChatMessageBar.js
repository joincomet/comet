import React from 'react'
import { useRouter } from 'next/router'

export default function ChatMessageBar() {
  const { query } = useRouter()
  return (
    <div className="fixed bottom-0 p-4 left-0 right-0 dark:bg-gray-750">
      <input
        className="h-12 px-3 w-full dark:bg-gray-800 rounded-lg text-sm focus:outline-none text-secondary"
        placeholder={`Send a message in #${query.channelName}`}
      />
    </div>
  )
}
