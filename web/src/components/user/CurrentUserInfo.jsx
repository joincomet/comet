import { IconSettings } from '@/components/ui/icons/Icons'

import Tippy from '@tippyjs/react'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import UserAvatar from '@/components/user/UserAvatar'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export function CurrentUserInfo() {
  const [currentUser] = useCurrentUser()
  const { t } = useTranslation()

  if (!currentUser) return null

  return (
    <div className="fixed bottom-0 left-18 right-0 w-60 h-12 px-3 dark:bg-gray-850 flex items-center">
      <UserAvatar
        user={currentUser}
        size={9}
        showOnline
        dotClassName="w-2.5 h-2.5 ring-3 dark:ring-gray-850"
      />

      <div className="ml-3">
        <div className="text-sm text-primary font-medium">
          {currentUser.name}
        </div>
        <div className="text-xs text-tertiary font-medium">
          #{currentUser.tag}
        </div>
      </div>

      <Tippy content={t('settings.title')}>
        <Link
          to="/settings"
          className="p-1.5 rounded dark:hover:bg-gray-750 transition cursor-pointer ml-auto"
        >
          <IconSettings className="w-5 h-5 text-tertiary" />
        </Link>
      </Tippy>
    </div>
  )
}
