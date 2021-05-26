import ContextMenuTrigger from '@/components/ui/context/ContextMenuTrigger'
import { ContextMenuType } from '@/types/ContextMenuType'
import UserPopup from '@/components/user/UserPopup'
import UserAvatar from '@/components/user/UserAvatar'
import { calendarDate } from '@/utils/timeUtils'
import { Link } from 'react-router-dom'
import ServerAvatar from '@/components/server/ServerAvatar'
import { IconCheck } from '@/components/ui/icons/Icons'
import { RepliesDocument, useMarkReplyReadMutation } from '@/graphql/hooks'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import { useStore } from '@/hooks/useStore'

export default function Reply({ reply }) {
  const inboxPage = useStore(s => s.inboxPage)
  const { comment } = reply
  const { parentComment, post } = comment
  const [currentUser] = useCurrentUser()
  const [markReplyRead] = useMarkReplyReadMutation({
    optimisticResponse: {
      markReplyRead: {
        ...reply,
        isRead: true
      }
    },
    update(cache, { data: { markReplyRead } }) {
      const queryOptions = {
        query: RepliesDocument,
        variables: {
          input: {
            userId: currentUser.id,
            unreadOnly: inboxPage === 'Unread'
          }
        }
      }
      const queryData = cache.readQuery(queryOptions)
      if (
        queryData &&
        queryData.replies.map(r => r.id).includes(markReplyRead.id)
      ) {
        cache.writeQuery({
          ...queryOptions,
          data: {
            replies: queryData.replies.filter(r => r.id !== markReplyRead.id)
          }
        })
      }
    }
  })

  return (
    <Link
      to={`${post.relativeUrl}#${comment.id}`}
      className="block dark:bg-gray-800 dark:hover:bg-gray-825 rounded p-3 cursor-pointer relative"
    >
      <div className="flex">
        <div className="text-13 hover:underline font-medium text-tertiary pr-5 leading-5">
          {post.title}
        </div>
        <div className="flex items-center ml-auto h-5">
          <div className="text-mid text-13 font-medium mr-2 leading-5">
            {post.server.name}
          </div>
          <ServerAvatar
            server={post.server}
            size={5}
            className="rounded-full"
          />
        </div>
      </div>

      {parentComment ? (
        <div>
          <ReplyContent comment={parentComment} />
          <div className="ml-7 mt-2 border-t dark:border-gray-750">
            <ReplyContent comment={comment} />
          </div>
        </div>
      ) : (
        <ReplyContent comment={comment} />
      )}

      <div className="flex items-center pt-3 border-t dark:border-gray-750 mt-2">
        <div
          className="flex items-center highlightable"
          onClick={e => {
            e.stopPropagation()
            e.preventDefault()
            markReplyRead({ variables: { input: { replyId: reply.id } } })
          }}
        >
          <IconCheck className="h-5 w-5" />
          <div className="ml-2 text-xs font-medium">Mark Read</div>
        </div>
      </div>
    </Link>
  )
}

function ReplyContent({ comment }) {
  return (
    <div className="flex space-x-3 pt-3">
      <div
        onClick={e => {
          e.stopPropagation()
          e.preventDefault()
        }}
      >
        <ContextMenuTrigger
          data={{
            type: ContextMenuType.User,
            user: comment.author
          }}
        >
          <UserPopup user={comment.author} role={comment.serverUser?.role}>
            <UserAvatar user={comment.author} size={7} />
          </UserPopup>
        </ContextMenuTrigger>
      </div>

      <div>
        <div className="flex items-end pb-1.5">
          <div
            onClick={e => {
              e.stopPropagation()
              e.preventDefault()
            }}
          >
            <ContextMenuTrigger
              data={{
                type: ContextMenuType.User,
                user: comment.author
              }}
            >
              <UserPopup user={comment.author} role={comment.serverUser?.role}>
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
          </div>

          <div className="text-11 text-mid font-medium pl-2 leading-none">
            {calendarDate(comment.createdAt)}
          </div>
        </div>

        <div
          className="prose prose-sm dark:prose-dark"
          dangerouslySetInnerHTML={{ __html: comment.text }}
        />
      </div>
    </div>
  )
}
