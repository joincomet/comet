import React from 'react'
import { useContextMenuEvent } from 'react-context-menu-wrapper'
import { useTranslation } from 'react-i18next'
import ContextMenuItem from '@/components/context-menus/ContextMenuItem'
import ContextMenu from '@/components/context-menus/ContextMenu'

export default function ServerContextMenu({ server }) {
  const menuEvent = useContextMenuEvent()
  if (menuEvent && menuEvent.data) {
    server = menuEvent.data.server
  }

  const { t } = useTranslation()

  return (
    <ContextMenu>
      <div className="space-y-0.5">
        <ContextMenuItem label={t('server.context.markRead')} />
        <ContextMenuItem label={t('server.context.mute')} />
        <ContextMenuItem label={t('server.context.invite')} />
        <ContextMenuItem label={t('server.context.leave')} red />
      </div>
    </ContextMenu>
  )
}
