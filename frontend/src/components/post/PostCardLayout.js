import NavLink from '@/components/NavLink'
import { BiRocket } from 'react-icons/bi'
import {
  FiFolderPlus,
  FiMessageCircle,
  FiMoreHorizontal,
  FiShare,
  FiLink
} from 'react-icons/fi'
import React from 'react'
import Image from 'next/image'

export default function PostCardLayout({ post, index }) {
  const chip =
    'cursor-pointer px-3 py-2 text-tertiary inline-flex flex-row items-center rounded-full dark:border-gray-700 border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-150 ease-in-out'

  return (
    <div className="pb-3 bg-white border border-gray-100 shadow dark:border-gray-800 dark:bg-gray-800 sm:rounded-xl ">
      <div className="flex flex-row pt-5 pl-5 pr-5 sm:pl-8 sm:pr-8">
        <NavLink href={`/@${post.author.username}`}>
          <Image
            loading="eager"
            src={post.author.avatarURL || '/astronaut.png'}
            width={32}
            height={32}
            className="w-8 h-8 bg-blue-500 rounded-full"
          />
        </NavLink>
        <div className="flex flex-col flex-grow pr-12 ml-4">
          <div className="text-xs">
            <NavLink
              href={`/@${post.author.username}`}
              className="font-semibold text-tertiary hover:underline"
            >
              {post.author.username}
            </NavLink>
            <span className="text-tertiary"> in </span>
            <NavLink
              href={`/+${post.planet.name}`}
              className="font-semibold text-accent hover:underline"
            >
              +{post.planet.name}
            </NavLink>
          </div>
          <div className="text-xs mt-0.5">
            <span className="text-tertiary">{post.timeSince}</span>
          </div>
        </div>
        <div className="ml-auto font-mono text-xs text-disabled">
          {index + 1}
        </div>
      </div>
      <div className="mx-5 mt-3 mb-3 sm:ml-20 sm:mr-20">
        <NavLink
          href={post.relativeURL}
          className="font-semibold transition-150 text-black dark:text-white hover:text-blue-500"
        >
          {post.title}
        </NavLink>
        {post.textContent ? (
          <div
            className="mt-1 text-sm text-secondary line-clamp-3"
            dangerouslySetInnerHTML={{ __html: post.textContent }}
          />
        ) : (
          ''
        )}

        {post.imageURLs.length > 0 ? (
          <div className="relative aspect-ratio-16/9 object-contain w-full mt-4 bg-gray-100 border border-gray-200 rounded-md dark:bg-gray-900 dark:border-gray-800 hover:bg-gray-200">
            <Image
              loading="eager"
              alt="Image"
              layout="fill"
              src={post.imageURLs[0]}
              className="rounded-md object-contain"
            />
          </div>
        ) : (
          post.linkURL && (
            <a
              href={post.linkURL}
              target="_blank"
              rel="noreferrer noopener nofollow"
              className="flex flex-row items-start mt-4 bg-gray-100 border border-gray-200 rounded-m dark:border-gray-800 dark:bg-gray-900 hover:bg-gray-200 hover:text-blue-500"
            >
              <div
                className="w-32 h-32"
                style={{
                  minWidth: '8rem'
                }}
              >
                {post.thumbnailURL || post.logoURL ? (
                  <Image
                    loading="eager"
                    src={post.thumbnailURL || post.logoURL}
                    width={128}
                    height={128}
                    className="object-cover object-center bg-white rounded-l-md dark:bg-gray-800"
                  />
                ) : (
                  <div className="flex w-32 h-32 rounded-l-md dark:bg-gray-700">
                    <FiLink className="w-8 h-8 m-auto text-tertiary" />
                  </div>
                )}
              </div>

              <div className="flex flex-col h-32 px-6 py-3 cursor-pointer">
                <div className="text-sm font-semibold transition duration-150 ease-in-out line-clamp-2 hover:text-blue-500">
                  {post.embed && post.embed.title
                    ? post.embed.title
                    : post.linkURL}
                </div>

                <div className="mt-1 text-xs font-medium text-tertiary line-clamp-2">
                  {post.embed && post.embed.description
                    ? post.embed.description
                    : 'Could not embed this link'}
                </div>

                <div className="flex flex-row items-start mt-auto">
                  {post.faviconURL && (
                    <div className="inline-block w-4 h-4 mr-3 rounded-sm">
                      <Image
                        loading="eager"
                        src={post.faviconURL}
                        width={16}
                        height={16}
                        className="rounded-sm"
                      />
                    </div>
                  )}

                  <div className="text-tertiary">
                    <div className="font-header">{post.domain}</div>
                  </div>
                </div>
              </div>
            </a>
          )
        )}
      </div>
      <div className="flex flex-row items-center px-5 -ml-3 -mr-3 sm:px-20">
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
