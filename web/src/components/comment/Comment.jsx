import {
  IconChevronDown,
  IconChevronUp,
  IconDotsVertical
} from '@/components/ui/icons/Icons'
import { useState } from 'react'
import UserAvatar from '@/components/user/UserAvatar'
import UserPopup from '@/components/user/UserPopup'
import ctl from '@netlify/classnames-template-literals'
import CommentEditor from '@/components/comment/CommentEditor'
import { useTranslation } from 'react-i18next'
import { useStore } from '@/hooks/useStore'
import ContextMenuTrigger from '@/components/ui/context/ContextMenuTrigger'
import { ContextMenuType } from '@/types/ContextMenuType'
import { useOpenLogin } from '@/hooks/useLoginDialog'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import { useUpdateCommentVoteMutation, VoteType } from '@/graphql/hooks'
import { formatDistanceToNowStrict } from 'date-fns'

const replyBtnClass = ctl(`
  ml-2
  text-13
  text-gray-500
  hover:text-gray-700
  dark:hover:text-gray-300
  font-medium
  leading-none
  select-none
  cursor-pointer
`)

export default function Comment({
  comment,
  post,
  level = 0,
  setParentComment
}) {
  const { t } = useTranslation()
  const [currentUser] = useCurrentUser()
  const openLogin = useOpenLogin()
  const [updateCommentVote] = useUpdateCommentVoteMutation()
  const [collapse, setCollapse] = useState(false)
  const [replyingCommentId, setReplyingCommentId] = useStore(s => [
    s.replyingCommentId,
    s.setReplyingCommentId
  ])
  const isReplying = replyingCommentId === comment.id

  if (comment.isDeleted && !comment.childCount) return null

  return (
    <div
      className={`relative md:rounded dark:bg-gray-800 bg-gray-200 ${
        level === 0 ? '' : 'pl-4'
      }`}
    >
      <div id={comment.id} />

      <ContextMenuTrigger
        data={{ type: ContextMenuType.Comment, comment, post }}
      >
        <div className="flex px-3 pt-3">
          <ContextMenuTrigger
            data={{ type: ContextMenuType.User, user: comment.author }}
          >
            <UserPopup user={comment.author} role={comment.serverUser?.role}>
              <UserAvatar
                size={7}
                className={`cursor-pointer transition ${
                  !comment.author
                    ? 'opacity-40 dark:bg-gray-700'
                    : 'hover:opacity-90'
                }`}
                user={comment.author}
              />
            </UserPopup>
          </ContextMenuTrigger>

          <div
            className={`pl-3 pb-3 w-full ${
              !!comment.childCount && !collapse
                ? 'border-b dark:border-gray-750'
                : ''
            }`}
          >
            <div className="flex items-end pb-1.5">
              <ContextMenuTrigger
                data={{ type: ContextMenuType.User, user: comment.author }}
              >
                <UserPopup
                  user={comment.author}
                  role={comment.serverUser?.role}
                >
                  <div
                    className={`text-sm font-medium cursor-pointer hover:underline leading-none ${
                      comment.serverUser?.role?.color ? '' : 'text-primary'
                    }`}
                    style={{ color: comment.serverUser?.role?.color }}
                  >
                    {comment.author?.username ?? (
                      <span className="text-mid">[deleted]</span>
                    )}
                  </div>
                </UserPopup>
              </ContextMenuTrigger>

              <div className="text-11 text-mid font-medium pl-2 leading-none">
                {formatDistanceToNowStrict(new Date(comment.createdAt))}
                &nbsp;ago
              </div>
            </div>

            <div
              className="prose prose-sm dark:prose-dark max-w-none"
              dangerouslySetInnerHTML={{ __html: comment.text }}
            />

            <div className="flex items-center pt-1 -ml-2">
              <div className="flex items-center">
                <button
                  type="button"
                  className={`focus:outline-none p-1 rounded-full dark:hover:bg-gray-750 transition cursor-pointer hover:bg-gray-200 ${
                    comment.voteType === VoteType.Up
                      ? 'text-red-400'
                      : 'text-mid'
                  }`}
                  onClick={() => {
                    if (!currentUser) {
                      openLogin()
                      return
                    }
                    let voteCount = comment.voteCount
                    if (comment.voteType === VoteType.Up) {
                      voteCount--
                    } else if (comment.voteType === VoteType.None) {
                      voteCount++
                    } else if (comment.voteType === VoteType.Down) {
                      voteCount += 2
                    }
                    updateCommentVote({
                      variables: {
                        input: {
                          commentId: comment.id,
                          type:
                            comment.voteType === VoteType.Up
                              ? VoteType.None
                              : VoteType.Up
                        }
                      },
                      optimisticResponse: {
                        ...comment,
                        voteType:
                          comment.voteType === VoteType.Up
                            ? VoteType.None
                            : VoteType.Up,
                        voteCount
                      }
                    })
                  }}
                >
                  <IconChevronUp className="w-5 h-5" />
                </button>
                <div
                  className={`text-13 leading-none font-semibold ${
                    comment.voteType === VoteType.Up ? 'text-red-400' : ''
                  } ${
                    comment.voteType === VoteType.Down ? 'text-blue-400' : ''
                  } ${
                    comment.voteType === VoteType.None ? 'text-tertiary' : ''
                  }`}
                >
                  {comment.voteCount}
                </div>
                {post.server.isDownvotesEnabled && (
                  <button
                    type="button"
                    className={`focus:outline-none p-1 rounded-full dark:hover:bg-gray-750 transition cursor-pointer ${
                      comment.voteType === VoteType.Down
                        ? 'text-blue-400'
                        : 'text-mid'
                    }`}
                    onClick={() => {
                      if (!currentUser) {
                        openLogin()
                        return
                      }
                      let voteCount = comment.voteCount
                      if (comment.voteType === VoteType.Down) {
                        voteCount++
                      } else if (comment.voteType === VoteType.None) {
                        voteCount--
                      } else if (comment.voteType === VoteType.Up) {
                        voteCount -= 2
                      }
                      updateCommentVote({
                        variables: {
                          input: {
                            commentId: comment.id,
                            type:
                              comment.voteType === VoteType.Down
                                ? VoteType.None
                                : VoteType.Down
                          }
                        },
                        optimisticResponse: {
                          ...comment,
                          voteType:
                            comment.voteType === VoteType.Down
                              ? VoteType.None
                              : VoteType.Down,
                          voteCount
                        }
                      })
                    }}
                  >
                    <IconChevronDown className="w-5 h-5" />
                  </button>
                )}
              </div>

              {!comment.isDeleted && (
                <div
                  className={replyBtnClass}
                  onClick={() => {
                    if (isReplying) {
                      setReplyingCommentId(null)
                    } else {
                      setReplyingCommentId(comment.id)
                    }
                  }}
                >
                  {isReplying ? t('comment.cancelReply') : t('comment.reply')}
                </div>
              )}

              {!!comment.childCount && (
                <div
                  className={replyBtnClass}
                  onClick={() => setCollapse(!collapse)}
                >
                  {collapse
                    ? `${t('comment.showReplies')} (${comment.childCount})`
                    : t('comment.hideReplies')}
                </div>
              )}

              <ContextMenuTrigger
                leftClick
                data={{ type: ContextMenuType.Comment, comment, post }}
              >
                <div
                  className={`ml-2 text-disabled flex items-center cursor-pointer`}
                >
                  <IconDotsVertical className="w-4 h-4" />
                </div>
              </ContextMenuTrigger>
            </div>

            {isReplying && (
              <div className="pt-3 max-w-screen-md w-full">
                <CommentEditor
                  postId={post.id}
                  parentCommentId={comment.id}
                  setOpen={() => setReplyingCommentId(null)}
                />
              </div>
            )}
          </div>
        </div>
      </ContextMenuTrigger>

      <div className="pl-3">
        {!collapse &&
          comment.childComments.map(childComment => (
            <Comment
              key={childComment.id}
              comment={childComment}
              level={level + 1}
              setParentComment={setParentComment}
              post={post}
            />
          ))}
      </div>
    </div>
  )
}
