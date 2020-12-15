import React, { useState } from 'react'
import Logo from '@/components/Logo'

export default function PostText({ post, measure, showFullText = false }) {
  if (!post.textContent) return null

  return (
    <div
      dangerouslySetInnerHTML={{ __html: post.textContent }}
      className={`prose prose-sm prose-blue dark:prose-dark max-w-none ${
        !showFullText && 'line-clamp-3'
      }`}
    />
  )
}
