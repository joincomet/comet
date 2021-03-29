import { forwardRef, memo } from 'react'
import { IconUser } from '@/lib/Icons'
import Avatar from '@/components/avatars/base/Avatar'
import { useContextMenuTrigger } from 'react-context-menu-wrapper'
import { mergeRefs } from '@/lib/mergeRefs'
import { ContextMenuType } from '@/components/context-menus/ContextMenuType'

export default forwardRef(
  (
    {
      user,
      server,
      loading = 'eager',
      size = 12,
      showOnline = false,
      className = '',
      dotClassName = ''
    },
    ref
  ) => {
    const contextMenuRef = useContextMenuTrigger({
      menuId: ContextMenuType.User,
      data: { user, server }
    })

    if (!user) return null
    return (
      <Avatar
        ref={mergeRefs(ref, contextMenuRef)}
        avatarUrl={user.avatarUrl}
        loading={loading}
        className={`${className} bg-gray-200 dark:bg-gray-650 cursor-pointer`}
        size={size}
      >
        {showOnline && (
          <div
            className={`absolute bottom-0 right-0 rounded-full z-10 ${dotClassName} ${
              user.isOnline ? 'bg-green-500' : 'bg-gray-600'
            }`}
          />
        )}
        {!user.avatarUrl && <IconUser className="text-mid w-2/3 h-2/3" />}
      </Avatar>
    )
  }
)
