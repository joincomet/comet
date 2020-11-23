import NavLink from '@/components/NavLink'
import { BiRocket } from 'react-icons/bi'
import {
  FiFolderPlus,
  FiMessageCircle,
  FiMoreHorizontal,
  FiShare,
  FiLink,
  FiAlignLeft
} from 'react-icons/fi'
import React from 'react'
import Image from 'next/image'

export default function PostSmallCardLayout({ post, index, measure }) {
  const chip =
    'cursor-pointer px-3 py-2 text-tertiary inline-flex flex-row items-center rounded-full dark:border-gray-700 border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-150 ease-in-out'

  return (
    <div className="mx-5 sm:mx-72 flex bg-white dark:bg-gray-800 sm:rounded-md shadow border border-gray-100 dark:border-gray-800 p-3">
      <NavLink
        href={`@${post.author.username}`}
        className={`w-10 h-10 flex-shrink-0 rounded-full ${
          post.author.avatarURL ? '' : 'bg-gray-200'
        }`}
      >
        <Image
          src={post.author.avatarURL || '/logos/astronaut.png'}
          height={40}
          width={40}
          className="rounded-full object-cover object-center block h-8 w-8"
          loading="eager"
        />
      </NavLink>

      <div className="flex flex-col flex-grow ml-3">
        <div className="text-tertiary text-xs font-semibold mb-0.5">
          {post.author.username} to{' '}
          <span className="text-accent">{post.planet.name}</span>{' '}
          {post.timeSince}
        </div>
        <NavLink
          href={post.relativeURL}
          className="text-base font-semibold text-primary"
        >
          {post.title}
        </NavLink>

        {post.textContent && (
          <div
            className="text-primary prose-sm line-clamp-3"
            dangerouslySetInnerHTML={{ __html: post.textContent }}
          />
        )}

        <div className="flex flex-row items-center -mr-3 -ml-3 mt-auto -mb-2 pt-5">
          <div className={chip}>
            <BiRocket className="w-5 h-5" />
            <span className="ml-3 text-xs font-medium">{post.rocketCount}</span>
          </div>

          <div className={`ml-4 ${chip}`}>
            <FiMessageCircle className="w-5 h-5" />
            <span className="ml-3 text-xs font-medium">
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

      <div className="ml-auto pl-10">
        <div
          className="flex w-24 h-24"
          style={{ minWidth: '6rem', minHeight: '6rem' }}
        >
          {post.thumbnailURL ? (
            <Image
              src={post.thumbnailURL}
              width={256}
              height={256}
              className="rounded object-cover dark:bg-gray-700 w-36 h-36"
              loading="eager"
            />
          ) : (
            <div className="dark:bg-gray-700 bg-gray-100 w-full h-full rounded flex">
              {post.linkURL ? (
                <FiLink size={32} className="m-auto text-mid" />
              ) : (
                <FiAlignLeft size={32} className="m-auto text-mid" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
