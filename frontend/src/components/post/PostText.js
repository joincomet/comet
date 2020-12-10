import React, { useState } from 'react'
import Logo from '@/components/Logo'

export default function PostText({ post, measure, showFullText = false }) {
  if (!post.textContent) return null

  return (
    <div className="group border-b border-gray-200 pb-3 pt-3 dark:border-gray-700 relative">
      <div
        dangerouslySetInnerHTML={{ __html: post.textContent }}
        className={`prose prose-sm prose-blue dark:prose-dark max-w-none ${
          !showFullText && 'line-clamp-3'
        }`}
      />
    </div>
  )
}
