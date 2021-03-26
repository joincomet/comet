import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import UserAvatar from '@/components/avatars/UserAvatar'
import Tippy from '@tippyjs/react'
import { IconChat, IconDotsVertical } from '@/lib/Icons'
import { Menu } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import UserContextMenu from '@/components/context-menus/UserContextMenu'
import { useContextMenuTrigger } from 'react-context-menu-wrapper'
import { ContextMenuType } from '@/components/context-menus/ContextMenuType'

export default function FriendListItem({ friend }) {
  const { t } = useTranslation()

  const contextMenuRef = useContextMenuTrigger({
    menuId: ContextMenuType.User,
    data: { user: friend }
  })

  const { push } = useHistory()

  return (
    <div
      ref={contextMenuRef}
      className="group px-2 dark:hover:bg-gray-725 rounded-lg"
    >
      <div
        onClick={() => push(`/dm/${friend.id}`)}
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
              {friend.name}
              <span className="hidden group-hover:inline-block text-13 text-tertiary font-medium">
                #{friend.tag}
              </span>
            </div>
            <div className="text-13 text-tertiary font-medium ml-3 leading-5">
              {friend.isOnline ? t('user.online') : t('user.offline')}
            </div>
          </div>
        </div>

        <Tippy content={t('friends.sendMessage')}>
          <div className="ml-auto rounded-full dark:bg-gray-800 dark:group-hover:bg-gray-900 h-9 w-9 flex items-center justify-center">
            <IconChat className="w-5 h-5 text-tertiary" />
          </div>
        </Tippy>

        <UserContextMenu
          user={friend}
          button={ref => (
            <Tippy content={t('more')} ref={ref}>
              <Menu.Button
                onClick={e => {
                  console.log('clikc')
                  e.stopPropagation()
                  e.preventDefault()
                }}
                className="ml-3 rounded-full dark:bg-gray-800 dark:group-hover:bg-gray-900 h-9 w-9 flex items-center justify-center focus:outline-none"
              >
                <IconDotsVertical className="w-5 h-5 text-tertiary" />
              </Menu.Button>
            </Tippy>
          )}
        />
      </div>
    </div>
  )
}
