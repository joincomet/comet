import FriendListItemBase from '@/pages/friends/FriendListItemBase'
import Tippy from '@tippyjs/react'
import { IconChat, IconDotsVertical } from '@/lib/Icons'
import UserContextMenu from '@/components/context-menus/UserContextMenu'
import { Menu } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import FriendListItemButton, {
  friendListButtonClass
} from '@/pages/friends/FriendListItemButton'

export default function FriendListItem({ friend }) {
  const { t } = useTranslation()

  return (
    <FriendListItemBase friend={friend}>
      <FriendListItemButton label="friends.sendMessage">
        <IconChat className="w-5 h-5" />
      </FriendListItemButton>

      <UserContextMenu
        user={friend}
        button={ref => (
          <Tippy content={t('more')} ref={ref}>
            <Menu.Button
              onClick={e => {
                e.stopPropagation()
                e.preventDefault()
              }}
              className={friendListButtonClass}
            >
              <IconDotsVertical className="w-5 h-5" />
            </Menu.Button>
          </Tippy>
        )}
      />
    </FriendListItemBase>
  )
}
