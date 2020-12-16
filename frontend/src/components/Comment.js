import NavLink from '@/components/NavLink'
import Image from 'next/image'
import { FiUser, FiCornerUpLeft } from 'react-icons/fi'
import { BiRocket } from 'react-icons/bi'
import React, { useState } from 'react'
import UserAvatar from '@/components/user/UserAvatar'
import UserPopup from '@/components/user/UserPopup'

export default function Comment({ comment, level = 0 }) {
  const [collapse, setCollapse] = useState(false)

  if (!comment.author) {
    comment.deleted = true
    comment.author = { username: '[deleted]' }
  }

  return (
    <div
      className="relative mt-3"
      style={{ marginLeft: level === 0 ? '0' : '2rem' }}
    >
      <div className="commentcollapse" onClick={() => setCollapse(true)} />

      <div
        className={`flex transition ${
          collapse ? 'opacity-50 hover:opacity-100 cursor-pointer' : ''
        } ${comment.deleted ? 'opacity-50' : '100'}`}
        onClick={
          collapse
            ? () => {
                setCollapse(false)
              }
            : () => {}
        }
      >
        <UserPopup user={comment.author}>
          <UserAvatar className="w-10 h-10 mr-3" user={comment.author} />
        </UserPopup>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-900 arrow_box rounded-md w-full">
          <div className="flex items-start w-full">
            <div className="flex flex-col w-full">
              <div className="h-9 flex items-center text-sm bg-gray-100 dark:bg-gray-900 rounded-t-md">
                <div className="inline-flex items-center p-3">
                  <UserPopup user={comment.author}>
                    <div className="text-secondary font-semibold hover:underline cursor-pointer">
                      {comment.author.username}
                    </div>
                  </UserPopup>
                  &nbsp;
                  <div className="text-tertiary">
                    @{comment.author.username}
                  </div>
                  <div className="text-tertiary">
                    &nbsp;&middot;&nbsp;{comment.timeSince}
                  </div>
                </div>

                <div className="ml-auto flex text-tertiary items-center h-full">
                  {!comment.deleted && (
                    <div className="flex items-center transition cursor-pointer dark:hover:bg-gray-700 h-full px-4 font-medium">
                      <div>Reply</div>
                      <FiCornerUpLeft className="w-5 h-5 ml-3" />
                    </div>
                  )}

                  <div
                    className={`flex items-center h-full px-4 font-medium ${
                      !comment.deleted
                        ? 'transition cursor-pointer dark:hover:bg-gray-700'
                        : ''
                    }`}
                  >
                    <div>{comment.rocketCount}</div>
                    <BiRocket className="w-5 h-5 ml-3" />
                  </div>
                </div>
              </div>

              {!collapse && !comment.deleted && (
                <div
                  className="prose prose-sm prose-blue dark:prose-dark max-w-none p-3 border-t border-gray-200 dark:border-gray-800"
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
