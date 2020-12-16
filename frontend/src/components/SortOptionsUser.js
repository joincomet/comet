import React from 'react'

const item =
  'text-xl font-bold tracking-tight leading-none text-tertiary cursor-pointer hover:underline'
const itemActive =
  'text-xl font-bold tracking-tight leading-none text-blue-500 cursor-pointer hover:underline'

export default function SortOptionsUser() {
  return (
    <div className="flex mb-6">
      <div className="inline-flex space-x-4">
        <div className={itemActive}>New</div>
        <div className={item}>Top</div>
      </div>

      <div className="ml-auto inline-flex space-x-4">
        <div className={itemActive}>Overview</div>
        <div className={item}>Posts</div>
        <div className={item}>Comments</div>
      </div>
    </div>
  )
}
