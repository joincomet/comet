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
  'cursor-pointer px-3 h-8 inline-flex flex-row items-center rounded-full dark:border-gray-700 border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition'

export default function PostActions({ post }) {
  // post.imageUrls.length > 0
  return (
    <div className={`flex flex-row items-center mx-3 sm:mx-16 py-1.5 mt-auto`}>
      <div className={`${chip} mr-3 text-tertiary`}>
        <BiRocket className={`w-4.5 h-4.5`} />
        <span className="ml-3 text-sm font-medium">{post.rocketCount}</span>
      </div>

      <NavLink href={post.relativeUrl} className={`${chip} text-tertiary mr-3`}>
        <FiMessageCircle className="w-4.5 h-4.5" />
        <span className="ml-3 text-sm font-medium">{post.commentCount}</span>
      </NavLink>

      <div className={`${chip} text-tertiary hidden sm:inline-flex`}>
        <FiRepeat className="w-4.5 h-4.5" />
        <span className="ml-3 text-sm font-medium">{post.commentCount}</span>
      </div>

      <div className="ml-auto" />
      {/*<div className="mr-3 opacity-50">
        <Logo className="h-3" />
      </div>*/}

      <div className={`${chip} text-tertiary group mr-3`}>
        <FiFolderPlus className="w-4.5 h-4.5 group-hover:text-blue-500 transition  " />
      </div>

      <div className={`${chip} text-tertiary group`}>
        <FiShare className="w-4.5 h-4.5 group-hover:text-green-500 transition  " />
      </div>
    </div>
  )
}
