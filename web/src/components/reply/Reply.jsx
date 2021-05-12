import ContextMenuTrigger from '@/components/ui/context/ContextMenuTrigger'
import { ContextMenuType } from '@/types/ContextMenuType'
import UserPopup from '@/components/user/UserPopup'
import UserAvatar from '@/components/user/UserAvatar'
import { calendarDate } from '@/utils/timeUtils'
import { Link } from 'react-router-dom'
import ServerAvatar from '@/components/server/ServerAvatar'

export default function Reply({ reply }) {
  const { comment } = reply
  const { parentComment, post } = comment

  return (
    <Link
      to={`${post.relativeUrl}#${comment.id}`}
      className="block dark:bg-gray-800 dark:hover:bg-gray-825 rounded p-3 cursor-pointer relative"
    >
      <div className="flex">
        <div className="text-13 hover:underline font-medium text-mid pr-5 leading-5">
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
            user: comment.author.user
          }}
        >
          <UserPopup
            user={comment.author.user}
            roles={comment.author.roles}
            nickname={comment.author.nickname}
          >
            <UserAvatar user={comment.author.user} size={7} />
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
              <UserPopup
                user={comment.author?.user}
                roles={comment.author?.roles}
                nickname={comment.author?.nickname}
              >
                <div
                  className={`text-sm font-medium cursor-pointer hover:underline leading-none ${
                    comment.author.color ? '' : 'text-primary'
                  }`}
                  style={{ color: comment.author.color }}
                >
                  {comment.author.name}
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
