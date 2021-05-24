import { IconDotsHorizontal, IconVote } from '@/components/ui/icons/Icons'
import { useState } from 'react'
import UserAvatar from '@/components/user/UserAvatar'
import UserPopup from '@/components/user/UserPopup'
import { calendarDate } from '@/utils/timeUtils'
import ctl from '@netlify/classnames-template-literals'
import CommentEditor from '@/components/comment/CommentEditor'
import { useTranslation } from 'react-i18next'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import { ServerPermission } from '@/graphql/hooks'
import { useParams } from 'react-router-dom'
import { useStore } from '@/hooks/useStore'
import { useToggleCommentVote } from '@/components/comment/useToggleCommentVote'
import ContextMenuTrigger from '@/components/ui/context/ContextMenuTrigger'
import { ContextMenuType } from '@/types/ContextMenuType'
import toast from 'react-hot-toast'
import { useOpenLogin } from '@/hooks/useLoginDialog'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'

const replyBtnClass = ctl(`
  ml-4
  text-xs
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
  setParentComment,
  isLast
}) {
  const { t } = useTranslation()
  const [currentUser] = useCurrentUser()
  const [collapse, setCollapse] = useState(false)
  const [replyingCommentId, setReplyingCommentId] = useStore(s => [
    s.replyingCommentId,
    s.setReplyingCommentId
  ])
  const isReplying = replyingCommentId === comment.id

  return (
    <div
      className={`relative rounded dark:bg-gray-800 ${
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
                className="cursor-pointer transition hover:opacity-90"
                user={comment.author}
              />
            </UserPopup>
          </ContextMenuTrigger>

          <div
            className={`pl-3 pb-3 w-full ${
              (!!comment.childComments.length || isLast) && !collapse
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
                    {comment.author?.username ?? '[deleted]'}
                  </div>
                </UserPopup>
              </ContextMenuTrigger>

              <div className="text-11 text-mid font-medium pl-2 leading-none">
                {calendarDate(comment.createdAt)}
              </div>
            </div>

            <div
              className="prose prose-sm dark:prose-dark max-w-none"
              dangerouslySetInnerHTML={{ __html: comment.text }}
            />

            <div className="flex items-center pt-2">
              <VoteButton comment={comment} />

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

              <div
                className={`ml-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center cursor-pointer`}
              >
                <IconDotsHorizontal className="w-5 h-5" />
              </div>
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
          comment.childComments.map((childComment, index) => (
            <Comment
              key={childComment.id}
              comment={childComment}
              level={level + 1}
              setParentComment={setParentComment}
              post={post}
              isLast={index < comment.childComments.length - 1}
            />
          ))}
      </div>
    </div>
  )
}

function VoteButton({ comment }) {
  const toggleVote = useToggleCommentVote(comment)
  const openLogin = useOpenLogin()
  const [currentUser] = useCurrentUser()
  return (
    <div
      onClick={e => {
        e.stopPropagation()
        if (!currentUser) {
          openLogin()
          return
        }
        toggleVote()
      }}
      className={`${
        comment.isVoted
          ? 'text-red-400'
          : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
      } flex items-center cursor-pointer`}
    >
      <IconVote className="w-4 h-4" />
      <div className="ml-2 text-xs font-medium">{comment.voteCount}</div>
    </div>
  )
}
