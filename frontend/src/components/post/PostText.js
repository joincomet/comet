import React, { useState } from 'react'
import Logo from '@/components/Logo'

export default function PostText({ post, measure }) {
  if (!post.textContent) return null

  const [readMore, setReadMore] = useState(false)

  const toggleReadMore = () => {
    setReadMore(!readMore)
    setTimeout(() => measure(), 0)
  }

  return (
    <div className="group border-b border-gray-200 pb-3 pt-3 dark:border-gray-700 relative">
      {/*<div className="absolute bottom-0 right-0 p-3 group-hover:opacity-0 opacity-100 transition">
        <Logo className="h-3" />
      </div>*/}
      <div
        dangerouslySetInnerHTML={{ __html: post.textContent }}
        className={`prose-sm text-primary ${!readMore && 'line-clamp-3'}`}
      />
      <div
        className="text-blue-500 hover:underline cursor-pointer text-sm mt-3"
        onClick={() => toggleReadMore()}
      >
        {readMore ? 'Read Less' : 'Read More'}
      </div>
    </div>
  )
}
