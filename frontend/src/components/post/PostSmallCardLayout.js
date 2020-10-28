import NavLink from '@/components/NavLink'
import { BiRocket } from 'react-icons/bi'
import {
  FiFolderPlus,
  FiMessageCircle,
  FiMoreHorizontal,
  FiShare
} from 'react-icons/fi'
import React from 'react'

export default function PostSmallCardLayout({ post, index, measure }) {
  const chip =
    'cursor-pointer px-3 py-2 text-tertiary inline-flex flex-row items-center rounded-full dark:border-gray-700 border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-150 ease-in-out'

  return (
    <div className="pb-2 bg-white border border-gray-100 shadow cursor-grab dark:border-gray-800 dark:bg-gray-800 sm:rounded-xl ">
      <div className="inline-flex flex-row px-5 pt-3 pb-3 w-full">
        <div
          className="w-8 h-8 rounded-full bg-gray-700 mr-5 mt-0.5 bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              post.author.avatarURL || '/logos/astronaut.png'
            })`
          }}
        />

        <div className="mr-5">
          <div className="text-base font-semibold text-primary">
            {post.title}
          </div>
          <div className="mt-0.5 text-xs text-tertiary">
            {post.author.username} &middot; {post.timeSince} &middot;{' '}
            <span className="text-blue-500">+{post.planet.name}</span>
          </div>
        </div>

        {post.thumbnailURL && (
          <div
            className="w-12 h-12 sm:w-20 sm:h-20 rounded-lg ml-auto bg-cover bg-center"
            style={{ backgroundImage: `url(${post.thumbnailURL})` }}
          />
        )}
      </div>
      <div className="flex flex-row items-center pl-16 pr-5 -mr-3 -ml-1">
        <div className={chip}>
          <BiRocket className="w-5 h-5" />
          <span className="ml-3 text-sm font-semibold">{post.rocketCount}</span>
        </div>

        <div className={`ml-4 ${chip}`}>
          <FiMessageCircle className="w-5 h-5" />
          <span className="ml-3 text-sm font-semibold">
            {post.commentCount}
          </span>
        </div>

        <div className={`${chip} ml-auto`}>
          <FiMoreHorizontal className="w-5 h-5 text-disabled" />
        </div>

        <div className={`${chip} ml-4`}>
          <FiShare className="w-5 h-5 text-green-500" />
        </div>

        <div className={`${chip} ml-4`}>
          <FiFolderPlus className="w-5 h-5 text-blue-500" />
        </div>
      </div>
    </div>
  )
}
