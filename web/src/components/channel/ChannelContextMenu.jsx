import { useContextMenuEvent } from '@/components/ui/context'
import { useTranslation } from 'react-i18next'
import ContextMenuItem from '@/components/ui/context/ContextMenuItem'
import ContextMenu from '@/components/ui/context/ContextMenu'
import ContextMenuSection from '@/components/ui/context/ContextMenuSection'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import { useParams } from 'react-router-dom'
import { ServerPermission } from '@/types/ServerPermission'

export default function ChannelContextMenu() {
  const menuEvent = useContextMenuEvent()
  const { t } = useTranslation()
  const { serverId } = useParams()
  const [canManageChannels] = useHasServerPermissions({
    serverId,
    permissions: [ServerPermission.ManageChannels]
  })

  if (!menuEvent || !menuEvent.data) return null
  const { channel } = menuEvent.data

  return (
    <ContextMenu>
      <ContextMenuSection>
        <ContextMenuItem label={t('channel.context.markRead')} />
        <ContextMenuItem label={t('channel.context.mute')} />
        <ContextMenuItem label={t('channel.context.edit')} />
        {canManageChannels && (
          <ContextMenuItem label={t('channel.context.delete')} red />
        )}
      </ContextMenuSection>
    </ContextMenu>
  )
}
