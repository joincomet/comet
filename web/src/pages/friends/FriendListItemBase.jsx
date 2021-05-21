import { useHistory } from 'react-router-dom'
import UserAvatar from '@/components/user/UserAvatar'
import { useTranslation } from 'react-i18next'

export default function FriendListItemBase({ friend, children }) {
  const { t } = useTranslation()

  const { push } = useHistory()

  return (
    <div className="group px-2 dark:hover:bg-gray-725 rounded-lg">
      <div
        onClick={() => push(`/dm/@${friend.username}`)}
        className="relative h-16 py-2 flex items-center cursor-pointer group border-t dark:border-gray-700"
      >
        <div className="flex">
          <UserAvatar
            user={friend}
            size={9}
            showOnline
            dotClassName="w-2.5 h-2.5 ring-3 dark:ring-gray-750"
          />
          <div>
            <div className="text-base text-secondary font-medium ml-3">
              {friend.username}
            </div>
            <div className="text-13 text-tertiary font-medium ml-3 leading-5">
              {friend.isOnline ? t('user.online') : t('user.offline')}
            </div>
          </div>
        </div>

        <div className="ml-auto flex items-center space-x-3">{children}</div>
      </div>
    </div>
  )
}
