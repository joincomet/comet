import { BiRocket } from 'react-icons/bi'
import {
  FiFolderPlus,
  FiMessageCircle,
  FiRepeat,
  FiShare
} from 'react-icons/fi'
import React from 'react'
import Logo from '@/components/Logo'
import NavLink from '@/components/NavLink'

const chip =
  'cursor-pointer inline-flex items-center group transition text-tertiary'
const label = 'ml-3 text-sm font-medium transition'
const icon =
  'w-9 h-9 dark:group-hover:bg-gray-800 rounded-full transition inline-flex items-center justify-center'

export default function PostActions({ post }) {
  // post.imageUrls.length > 0
  return (
    <div
      className={`flex flex-row items-center -ml-2 -mr-2 px-3 sm:px-16 pt-1 pb-1`}
    >
      <div className={`${chip} mr-6`}>
        <div className={`${icon} group-hover:text-red-400`}>
          <BiRocket size={18} />
        </div>
        <span className={`${label} group-hover:text-red-400`}>
          {post.rocketCount}
        </span>
      </div>

      <NavLink href={post.relativeUrl} className={`${chip} mr-6`}>
        <div className={`${icon} group-hover:text-blue-500`}>
          <FiMessageCircle size={18} />
        </div>
        <span className={`${label} group-hover:text-blue-500`}>
          {post.commentCount}
        </span>
      </NavLink>

      <div className={`${chip}`}>
        <div className={`${icon} group-hover:text-green-500`}>
          <FiRepeat size={18} />
        </div>
        <span className={`${label} group-hover:text-green-500`}>
          {post.repostCount}
        </span>
      </div>

      <div className={`${chip} ml-auto`}>
        <div className={`${icon} group-hover:text-blue-500`}>
          <FiShare size={18} />
        </div>
      </div>
    </div>
  )
}
