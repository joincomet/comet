import { HiAnnotation, HiDotsHorizontal } from 'react-icons/hi'
import React, { useState } from 'react'
import UserAvatar from '@/components/user/UserAvatar'
import Twemoji from 'react-twemoji'
import Tippy from '@tippyjs/react'
import { useCommentStore } from '@/lib/stores/useCommentStore'
import { RiRocketFill } from 'react-icons/ri'
import UserPopup from '@/components/user/UserPopup'
import { commentCollapse } from './Comment.module.scss'
import { useMutation } from 'urql'

export default function Comment({
  commentData,
  post,
  level = 0,
  setParentComment
}) {
  const { setCreateComment } = useCommentStore()
  const [collapse, setCollapse] = useState(false)
  const [editing, setEditing] = useState(false)
  const [comment, setComment] = useState(commentData)
  const [textContent, setTextContent] = useState(comment.textContent)

  return (
    <div className={`relative`}>
      <div id={comment.id} />

      <div
        className={commentCollapse}
        style={{ marginLeft: 1 * level + 'rem' }}
        onClick={() => setCollapse(!collapse)}
      />

      <div
        className="relative transition dark:hover:bg-gray-775"
        style={{ paddingLeft: 1 * level + 'rem' }}
      >
        <div className="pl-4">
          <div className="pl-4 pr-8 pt-3 pb-1.5 transition dark:hover:bg-gray-775">
            <div
              onClick={
                collapse
                  ? () => {
                      setCollapse(false)
                    }
                  : () => {}
              }
              className={`transition w-full ${
                collapse ? 'opacity-50 hover:opacity-100 cursor-pointer' : ''
              } ${collapse || comment.deleted ? 'h-10' : ''}`}
            >
              <div className="flex items-center text-13 font-medium text-tertiary pb-1.5">
                {comment.author ? (
                  <>
                    <UserPopup user={comment.author}>
                      <UserAvatar
                        className="w-5 h-5 mr-1.5 cursor-pointer transition hover:opacity-90"
                        user={comment.author}
                        loading="lazy"
                      />
                    </UserPopup>
                    <UserPopup user={comment.author}>
                      <span className="hover:underline cursor-pointer">
                        {comment.author.username}
                      </span>
                    </UserPopup>
                  </>
                ) : (
                  <span className="hover:underline cursor-pointer">
                    [deleted]
                  </span>
                )}
                &nbsp;&middot;&nbsp;
                <Tippy content={comment.timeSinceFull}>
                  <span>{comment.timeSince}</span>
                </Tippy>
              </div>

              {!collapse && !comment.deleted && (
                <>
                  <Twemoji options={{ className: 'twemoji' }}>
                    <div
                      className="prose prose-sm dark:prose-dark max-w-none"
                      dangerouslySetInnerHTML={{ __html: textContent }}
                    />
                  </Twemoji>

                  <div className="flex items-center space-x-1 pt-1.5 -ml-2">
                    <Rocket comment={comment} setComment={setComment} />

                    {!comment.deleted && (
                      <div
                        onClick={() => {
                          setParentComment(comment)
                          setCreateComment(true)
                        }}
                        className="action-chip text-tertiary"
                      >
                        <HiAnnotation className="w-5 h-5 mr-1.5" />
                        <div className="text-xs font-medium">Reply</div>
                      </div>
                    )}

                    <Options comment={comment} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {!collapse &&
        comment.childComments &&
        comment.childComments.length > 0 &&
        comment.childComments.map(childComment => (
          <Comment
            key={childComment.id}
            commentData={childComment}
            level={level + 1}
            setParentComment={setParentComment}
            post={post}
          />
        ))}
    </div>
  )
}

function Options({ comment }) {
  return (
    <div className="inline-flex cursor-pointer items-center text-mid p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
      <HiDotsHorizontal className="w-5 h-5" />
    </div>
  )
}

function Rocket({ comment, setComment }) {
  const variables = { commentId: comment.id }
  const [rocketCommentMutation] = useMutation(ROCKET_COMMENT_MUTATION)
  const [unrocketCommentMutation] = useMutation(UNROCKET_COMMENT_MUTATION)

  const rocket = async () => {
    comment.isRocketed = true
    comment.voteCount++
    await rocketCommentMutation.mutateAsync(variables)
  }

  const unrocket = async () => {
    comment.isRocketed = false
    comment.voteCount--
    await unrocketCommentMutation.mutateAsync(variables)
  }

  const toggleRocket = () => {
    if (comment.isRocketed) unrocket()
    else rocket()
  }

  return (
    <div
      onClick={e => {
        e.stopPropagation()
        toggleRocket()
      }}
      className={`action-chip ${
        comment.isRocketed ? 'text-red-400' : 'text-tertiary'
      }`}
    >
      <RiRocketFill className="w-4 h-4" />
      <div className="ml-1.5 text-xs font-medium">{comment.voteCount}</div>
    </div>
  )
}
