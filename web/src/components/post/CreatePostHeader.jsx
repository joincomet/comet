import { useState } from 'react'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import UserAvatar from '@/components/user/UserAvatar'
import { useTranslation } from 'react-i18next'
import PostEditor from '@/components/post/PostEditor'

export default function CreatePostHeader() {
  const [open, setOpen] = useState(false)
  const [user] = useCurrentUser()
  const { t } = useTranslation()

  return (
    <div className="p-4">
      {!open ? (
        <div
          onClick={() => setOpen(true)}
          className="dark:bg-gray-700 h-13 flex items-center rounded transition dark:hover:bg-gray-650 cursor-pointer"
        >
          <div className="px-3 border-r dark:border-gray-650 h-7">
            <UserAvatar user={user} size={7} />
          </div>
          <div className="text-sm text-secondary px-3">
            {t('post.createPost')}
          </div>
        </div>
      ) : (
        <div className="dark:bg-gray-800 pt-3 pb-3 px-3 rounded flex">
          <div className="pr-3 mr-3 border-r dark:border-gray-750 inline-block h-7">
            <UserAvatar user={user} size={7} />
          </div>

          <PostEditor setOpen={setOpen} />
        </div>
      )}
    </div>
  )
}
