import { FiUser, FiCornerUpLeft } from 'react-icons/fi'
import { BiRocket } from 'react-icons/bi'
import React, { useState } from 'react'
import UserAvatar from '@/components/user/UserAvatar'
import UserPopup from '@/components/user/UserPopup'
import Twemoji from 'react-twemoji'
import { useRouter } from 'next/router'
import { useCurrentUser } from '@/lib/queries/useCurrentUser'
import {
  useRocketCommentMutation,
  useUnrocketCommentMutation
} from '@/lib/mutations/rocketMutations'
import { useLogin } from '@/lib/useLogin'

export default function Comment({ comment, level = 0, setParentComment }) {
  const [collapse, setCollapse] = useState(false)
  const { query, pathname, push } = useRouter()
  const currentUser = useCurrentUser().data

  if (!comment.author) {
    comment.deleted = true
    comment.author = { username: '[deleted]' }
  }

  const { openLogin } = useLogin()
  const variables = { commentId: comment.id }
  const rocketCommentMutation = useRocketCommentMutation()
  const unrocketCommentMutation = useUnrocketCommentMutation()

  const rocket = async () => {
    comment.isRocketed = true
    comment.rocketCount++
    await rocketCommentMutation.mutateAsync(variables)
  }

  const unrocket = async () => {
    comment.isRocketed = false
    comment.rocketCount--
    await unrocketCommentMutation.mutateAsync(variables)
  }

  const toggle = () => {
    if (!currentUser) {
      openLogin()
      return
    }

    if (comment.isRocketed) unrocket()
    else rocket()
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
          <UserAvatar
            className="w-10 h-10 mr-3 cursor-pointer transition hover:opacity-90"
            user={comment.author}
          />
        </UserPopup>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-900 arrow-box rounded w-full">
          <div className="flex items-start w-full">
            <div className="flex flex-col w-full">
              <div className="h-9 flex items-center text-sm bg-gray-50 dark:bg-gray-900 rounded-t">
                <div className="inline-flex flex-wrap items-center p-3 cursor-pointer">
                  <UserPopup user={comment.author}>
                    <span className="text-secondary font-semibold hover:underline cursor-pointer">
                      {comment.author.username}
                    </span>
                    &nbsp;
                    <span className="text-tertiary">
                      @{comment.author.username}
                    </span>
                  </UserPopup>
                  <div className="text-mid">
                    &nbsp;&middot;&nbsp;{comment.timeSince}
                  </div>
                </div>

                <div className="ml-auto flex text-tertiary items-center h-full">
                  {!comment.deleted && (
                    <div
                      onClick={() => {
                        setParentComment(comment)
                        push({
                          pathname,
                          query: currentUser
                            ? { ...query, createcomment: 'true' }
                            : { ...query, login: 'true' }
                        })
                      }}
                      className="flex items-center transition cursor-pointer dark:hover:bg-gray-700 h-full px-4 font-medium"
                    >
                      <div>Reply</div>
                      <FiCornerUpLeft className="w-4.5 h-4.5 ml-3" />
                    </div>
                  )}

                  <div
                    onClick={() => toggle()}
                    className={`flex items-center h-full px-4 font-medium ${
                      !comment.deleted
                        ? 'transition cursor-pointer dark:hover:bg-gray-700'
                        : ''
                    } ${comment.isRocketed ? 'text-red-400' : 'text-tertiary'}`}
                  >
                    <div>{comment.rocketCount}</div>
                    <BiRocket className="w-4.5 h-4.5 ml-3" />
                  </div>
                </div>
              </div>

              {!collapse && !comment.deleted && (
                <Twemoji options={{ className: 'twemoji' }}>
                  <div
                    className="prose prose-sm prose-blue dark:prose-dark max-w-none p-3 border-t border-gray-200 dark:border-gray-800"
                    dangerouslySetInnerHTML={{ __html: comment.textContent }}
                  />
                </Twemoji>
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
            setParentComment={setParentComment}
          />
        ))}
    </div>
  )
}
