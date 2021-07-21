import { useState } from 'react'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import UserAvatar from '@/components/user/UserAvatar'
import CommentEditor from '@/components/comment/CommentEditor'
import { useTranslation } from 'react-i18next'

export default function CreateCommentCard({ postId }) {
  const [open, setOpen] = useState(false)
  const [user] = useCurrentUser()
  const { t } = useTranslation()

  return (
    <>
      {!open ? (
        <div
          onClick={() => setOpen(true)}
          className="dark:bg-gray-700 h-13 flex items-center rounded transition dark:hover:bg-gray-650 cursor-pointer bg-gray-200"
        >
          <div className="px-3 border-r dark:border-gray-650 h-7">
            <UserAvatar user={user} size={7} />
          </div>
          <div className="text-sm text-secondary px-3">
            {t('post.createComment')}
          </div>
        </div>
      ) : (
        <div className="dark:bg-gray-800 bg-gray-200 pt-3 pb-3 px-3 rounded flex">
          <div className="pr-3 mr-3 border-r dark:border-gray-750 inline-block h-7">
            <UserAvatar user={user} size={7} />
          </div>

          <CommentEditor postId={postId} setOpen={setOpen} />
        </div>
      )}
    </>
  )
}
