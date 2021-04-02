import { IconDotsHorizontal, IconVote } from '@/components/ui/icons/Icons'
import { useState } from 'react'
import UserAvatar from '@/components/user/UserAvatar'
import Twemoji from 'react-twemoji'
import UserPopup from '@/components/user/UserPopup'
import { useMutation } from 'urql'
import { CREATE_COMMENT_VOTE, REMOVE_COMMENT_VOTE } from '@/graphql/mutations'
import { calendarDate } from '@/utils/timeUtils'
import ctl from '@netlify/classnames-template-literals'
import CommentEditor from '@/components/comment/CommentEditor'
import { useTranslation } from 'react-i18next'

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
  const [collapse, setCollapse] = useState(false)
  const [replying, setReplying] = useState(false)
  const { t } = useTranslation()

  return (
    <div
      className={`relative rounded dark:bg-gray-800`}
      style={{ paddingLeft: level + 'rem' }}
    >
      <div id={comment.id} />

      <div className="flex px-3 pt-3">
        <UserPopup user={comment.author}>
          <UserAvatar
            size={7}
            className="cursor-pointer transition hover:opacity-90"
            user={comment.author}
          />
        </UserPopup>

        <div
          className={`pl-3 pb-3 w-full ${
            (!!comment.childComments.length || isLast) && !collapse
              ? 'border-b dark:border-gray-750'
              : ''
          }`}
        >
          <div className="flex items-end pb-1.5">
            <UserPopup user={comment.author}>
              <div className="text-sm font-medium cursor-pointer hover:underline leading-none text-accent">
                {comment.author.name}
              </div>
            </UserPopup>
            <div className="text-11 text-mid font-medium pl-2 leading-none">
              {calendarDate(comment.createdAt)}
            </div>
          </div>

          <Twemoji options={{ className: 'twemoji' }}>
            <div
              className="prose prose-sm dark:prose-dark max-w-none"
              dangerouslySetInnerHTML={{ __html: comment.text }}
            />
          </Twemoji>

          <div className="flex items-center pt-2">
            <VoteButton comment={comment} />
            <div
              className={replyBtnClass}
              onClick={() => setReplying(!replying)}
            >
              {replying ? t('comment.cancelReply') : t('comment.reply')}
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

          {replying && (
            <div className="pt-3 max-w-screen-md w-full">
              <CommentEditor
                postId={post.id}
                parentCommentId={comment.id}
                setOpen={setReplying}
              />
            </div>
          )}
        </div>
      </div>

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
  const variables = { commentId: comment.id }
  const [_, createVote] = useMutation(CREATE_COMMENT_VOTE)
  const [__, removeVote] = useMutation(REMOVE_COMMENT_VOTE)

  const toggleVote = () => {
    if (!comment.isVoted) createVote(variables)
    else removeVote(variables)
  }

  return (
    <div
      onClick={e => {
        e.stopPropagation()
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
