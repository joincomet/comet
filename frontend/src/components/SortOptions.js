import React from 'react'

export default function SortOptions() {
  return (
    <div className="flex mb-6 space-x-4">
      <div className="text-xl font-bold tracking-tight leading-none text-blue-500 cursor-pointer hover:underline">
        Hot
      </div>
      <div className="text-xl font-bold tracking-tight leading-none text-tertiary cursor-pointer hover:underline">
        New
      </div>
      <div className="text-xl font-bold tracking-tight leading-none text-tertiary cursor-pointer hover:underline">
        Top
      </div>
    </div>
  )
}
