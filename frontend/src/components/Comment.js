import NavLink from '@/components/NavLink'
import Image from 'next/image'
import { FiUser } from 'react-icons/fi'
import { BiRocket } from 'react-icons/bi'
import React, { useState } from 'react'

export default function Comment({ comment, level = 0 }) {
  const [collapse, setCollapse] = useState(false)

  return (
    <div
      className="relative mt-3"
      style={{ marginLeft: level === 0 ? '0' : '2rem' }}
    >
      <div className="commentcollapse" onClick={() => setCollapse(true)} />

      <div
        className={`flex transition ${
          collapse
            ? 'opacity-50 hover:opacity-100 cursor-pointer'
            : 'opacity-100'
        }`}
        onClick={
          collapse
            ? () => {
                setCollapse(false)
              }
            : () => {}
        }
      >
        <NavLink
          href={`/user/${comment.author.username}`}
          className={`w-10 h-10 relative mr-3 flex-shrink-0 rounded-full hover:shadow-lg ${
            comment.author.avatarUrl ? '' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          {comment.author.avatarUrl ? (
            <Image
              src={comment.author.avatarUrl}
              layout="fill"
              className="rounded-full object-cover object-center"
              loading="eager"
            />
          ) : (
            <FiUser size={20} className="m-2.5 text-gray-500" />
          )}
        </NavLink>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-transparent arrow_box rounded-md w-full">
          <div className="flex items-start w-full">
            <div className="flex flex-col w-full">
              <div className="flex items-center text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded-t-md">
                <span className="text-secondary font-semibold hover:underline cursor-pointer">
                  {comment.author.username}
                </span>
                &nbsp;
                <span className="text-tertiary">
                  @{comment.author.username}
                </span>
                <span className="text-tertiary">
                  &nbsp;&middot;&nbsp;{comment.timeSince}
                </span>
                <div className="ml-auto inline-flex text-tertiary items-center">
                  <span>{comment.rocketCount}</span>
                  <BiRocket size={18} className="ml-3" />
                </div>
              </div>

              {!collapse && (
                <div
                  className="prose-sm p-3 border-t dark:border-gray-700"
                  dangerouslySetInnerHTML={{ __html: comment.textContent }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {!collapse &&
        comment.childComments.map(childComment => (
          <Comment
            key={childComment.id}
            comment={childComment}
            level={level + 1}
          />
        ))}
    </div>
  )
}
