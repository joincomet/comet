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
    <div className="mx-5 sm:mx-72 flex bg-white dark:bg-gray-800 sm:rounded-md shadow border border-gray-100 dark:border-gray-800 p-4">
      <NavLink
        href={`@${post.author.username}`}
        className={`w-8 h-8 flex-shrink-0 rounded-full mt-0.5 ${
          post.author.avatarURL ? '' : 'bg-blue-500'
        }`}
      >
        <Image
          src={post.author.avatarURL || '/logos/astronaut.png'}
          height={64}
          width={64}
          className="rounded-full object-cover object-center block h-8 w-8"
          loading="eager"
        />
      </NavLink>

      <div className="flex flex-col flex-grow ml-5">
        <NavLink
          href={post.relativeURL}
          className="text-base font-semibold text-primary"
        >
          {post.title}
        </NavLink>
        <div className="mt-0.5 text-xs text-tertiary">
          {post.author.username} &middot; {post.timeSince} &middot;{' '}
          <NavLink
            href={`/${post.planet.name}`}
            className="text-blue-500 hover:underline"
          >
            +{post.planet.name}
          </NavLink>
          {post.domain && (
            <span>
              &nbsp;&middot;&nbsp;
              <NavLink
                href={post.relativeURL}
                className="text-tertiary hover:underline"
              >
                {post.domain}
              </NavLink>
            </span>
          )}
        </div>

        {post.textContent && (
          <div
            className="mt-1 text-sm text-secondary line-clamp-2"
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
