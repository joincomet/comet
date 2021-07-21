import { useTranslation } from 'react-i18next'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import UserAvatar from '@/components/user/UserAvatar'
import { useState } from 'react'
import CreatePostDialog from '@/components/post/create/CreatePostDialog'

export default function CreatePostHeader({ server }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [user] = useCurrentUser()

  return (
    <>
      <CreatePostDialog open={open} setOpen={setOpen} serverId={server?.id} />
      <div className="p-4">
        <div
          onClick={() => setOpen(true)}
          className="dark:bg-gray-700 h-13 flex items-center rounded transition dark:hover:bg-gray-650 cursor-pointer bg-gray-200 hover:bg-gray-300"
        >
          <div className="px-3 border-r dark:border-gray-650 border-gray-300 h-7">
            <UserAvatar user={user} size={7} />
          </div>
          <div className="text-sm text-secondary px-3">
            {t('post.createPost')}
          </div>
        </div>
      </div>
    </>
  )
}
