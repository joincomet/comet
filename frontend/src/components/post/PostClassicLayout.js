import NavLink from '@/components/NavLink'
import { BiRocket } from 'react-icons/bi'
import {
  FiFolderPlus,
  FiMessageCircle,
  FiMoreHorizontal,
  FiShare,
  FiAlignLeft
} from 'react-icons/fi'
import React from 'react'
import Image from 'next/image'

export default function PostClassicLayout({ post, index, measure }) {
  return (
    <div className="flex flex-row">
      <div className="hidden sm:block text-xs text-disabled font-mono pt-6 mt-1.5 pr-3">
        <span style={{ marginTop: '-1px' }}>{index + 1}</span>
      </div>
      <div className="flex flex-col items-center pt-1 text-disabled">
        <BiRocket className="w-5 h-5 cursor-pointer" />
        <div className="pt-1.5 text-xs font-semibold">{post.rocketCount}</div>
      </div>
      <div
        className="ml-3 mt-0.5"
        style={{
          maxHeight: '4.5rem',
          minWidth: '4.5rem',
          width: '4.5rem'
        }}
      >
        {post.thumbnailURL ? (
          <Image loading="eager"
            src={post.thumbnailURL}
                 width={72}
                 height={56}
            className="bg-center bg-cover"
          />
        ) : (
          <div className="inline-flex h-full min-w-full">
            <div className="inline-flex items-center w-12 h-12 mx-auto bg-gray-800 rounded-full">
              <FiAlignLeft className="w-6 h-6 mx-auto text-tertiary" />
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col flex-grow ml-3">
        <div className="text-base font-medium text-primary">{post.title}</div>
        <div className="text-xxs">
          <span className="text-tertiary">submitted {post.timeSince} by </span>
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
        <div className="text-xxs text-tertiary font-semibold pt-0.5">
          <span className="cursor-pointer hover:underline">{`${
            post.commentCount
          } comment${post.commentCount === 1 ? '' : 's'}`}</span>
          <span className="ml-2 cursor-pointer hover:underline">share</span>
          <span className="ml-2 cursor-pointer hover:underline">
            add to folder
          </span>
        </div>
      </div>
    </div>
  )
}
