import { NavLink } from '@/components/NavLink'
import { BiRocket } from 'react-icons/bi'
import {
  FiFolderPlus,
  FiMessageCircle,
  FiMoreHorizontal,
  FiShare,
  FiAlignLeft
} from 'react-icons/fi'
import React from 'react'

export default function PostClassicLayout({ post, index, measure }) {
  return (
    <div className="flex flex-row pb-2">
      <div className="text-xs text-disabled font-mono pt-6 mt-1.5 pr-3">
        <span style={{ marginTop: '-1px' }}>{index + 1}</span>
      </div>
      <div className="flex flex-col items-center text-disabled pt-1">
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
          <img
            style={{
              maxHeight: '4.5rem',
              minWidth: '4.5rem',
              width: '4.5rem'
            }}
            className="object-cover"
            onLoad={measure}
            alt="Post Thumbnail"
            src={post.thumbnailURL}
          />
        ) : (
          <div className="min-w-full h-full inline-flex">
            <div className="w-12 h-12 bg-gray-800 rounded-full inline-flex items-center mx-auto">
              <FiAlignLeft className="w-6 h-6 text-tertiary mx-auto" />
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col flex-grow pr-8 ml-3">
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
          <span className="hover:underline cursor-pointer">{`${
            post.commentCount
          } comment${post.commentCount === 1 ? '' : 's'}`}</span>
          <span className="hover:underline ml-2 cursor-pointer">share</span>
          <span className="hover:underline ml-2 cursor-pointer">
            add to folder
          </span>
        </div>
      </div>
    </div>
  )
}
