import React from 'react'

export default function ChatMessageBar({ channel }) {
  return (
    <div className="fixed bottom-0 p-4 left-76 right-60 dark:bg-gray-750">
      <input
        className="h-12 px-3 w-full dark:bg-gray-800 rounded-lg text-sm focus:outline-none text-secondary"
        placeholder={`Send a message in #${channel.name}`}
      />
    </div>
  )
}
