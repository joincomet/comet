import NavLink from '@/components/NavLink'
import { BiRocket } from 'react-icons/bi'
import {
  FiFolderPlus,
  FiMessageCircle,
  FiMoreHorizontal,
  FiShare,
  FiAlignLeft,
  FiLink
} from 'react-icons/fi'
import React from 'react'
import Image from 'next/image'

export default function PostClassicLayout({ post, index, measure }) {
  return (
    <div className="relative">
      <div className="flex flex-row mx-3 sm:mx-72 space-x-4 dark:bg-gray-800 rounded py-3">
        <div className="absolute right-0 top-0 mx-3 sm:mx-72 h-full text-xs text-disabled font-mono p-3">
          {index + 1}
        </div>
        <div className="flex flex-col items-center pt-1 text-disabled">
          <BiRocket className="w-5 h-5 cursor-pointer" />
          <div className="pt-1.5 text-xs font-semibold">{post.rocketCount}</div>
        </div>
        {post.thumbnailURL ? (
          <div className="w-16 h-16 rounded">
            <Image
              loading="eager"
              src={post.thumbnailURL}
              layout="responsive"
              width={32}
              height={32}
              className="object-center object-cover rounded"
            />
          </div>
        ) : (
          <div className="inline-flex items-center w-16 h-16 bg-gray-700 rounded">
            {post.linkURL ? (
              <FiLink size={24} className="m-auto text-mid" />
            ) : (
              <FiAlignLeft size={24} className="m-auto text-mid" />
            )}
          </div>
        )}
        <div className="flex flex-col flex-grow">
          <div className="text-base font-medium text-primary">{post.title}</div>
          <div className="text-xxs">
            <span className="text-tertiary">
              submitted {post.timeSince} by{' '}
            </span>
            <NavLink
              href={`/@${post.author.username}`}
              className="text-tertiary hover:underline"
            >
              {post.author.username}
            </NavLink>
            <span className="text-tertiary"> to </span>
            <NavLink
              href={`/+${post.planet.name}`}
              className="text-accent hover:underline"
            >
              +{post.planet.name}
            </NavLink>
          </div>
          <div className="text-xxs text-tertiary font-semibold mt-1">
            <span className="cursor-pointer hover:underline">{`${
              post.commentCount
            } comment${post.commentCount === 1 ? '' : 's'}`}</span>
            <span className="ml-2 cursor-pointer hover:underline">share</span>
          </div>
        </div>
      </div>
    </div>
  )
}
