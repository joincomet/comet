import FriendListItemBase from '@/pages/friends/FriendListItemBase'
import Tippy from '@tippyjs/react'
import { IconChat, IconDotsVertical } from '@/components/ui/icons/Icons'
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

      <Tippy content={t('more')}>
        <button
          onClick={e => {
            e.stopPropagation()
            e.preventDefault()
          }}
          className={friendListButtonClass}
        >
          <IconDotsVertical className="w-5 h-5" />
        </button>
      </Tippy>
    </FriendListItemBase>
  )
}
