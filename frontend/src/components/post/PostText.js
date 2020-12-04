import React, { useState } from 'react'

export default function PostText({ post, measure }) {
  if (!post.textContent) return null

  const [readMore, setReadMore] = useState(false)

  const toggleReadMore = () => {
    setReadMore(!readMore)
    setTimeout(() => measure(), 0)
  }

  return (
    <div className="prose-sm p-3 rounded-md border dark:border-gray-700">
      <div
        dangerouslySetInnerHTML={{ __html: post.textContent }}
        className={`text-primary ${!readMore && 'line-clamp-3'}`}
      />
      <div
        className="text-blue-500 hover:underline cursor-pointer"
        onClick={() => toggleReadMore()}
      >
        {readMore ? 'Read Less' : 'Read More'}
      </div>
    </div>
  )
}
