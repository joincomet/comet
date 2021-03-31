import { useState } from 'react'
import { useUser } from '@/components/providers/DataProvider'
import UserAvatar from '@/components/avatars/UserAvatar'
import { useTranslation } from 'react-i18next'
import PostEditor from '@/components/post/PostEditor'

export default function CreatePostCard() {
  const [open, setOpen] = useState(false)
  const user = useUser()
  const { t } = useTranslation()

  return (
    <>
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
    </>
  )
}
