import { useTranslation } from 'react-i18next'
import ContextMenuSection from '@/components/ui/context/ContextMenuSection'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import { useParams } from 'react-router-dom'
import { ServerPermission } from '@/graphql/hooks'

export default function ChannelContextMenu({ channel, ContextMenuItem }) {
  const { t } = useTranslation()
  const { serverId } = useParams()
  const [canManageChannels] = useHasServerPermissions({
    serverId,
    permissions: [ServerPermission.ManageChannels]
  })

  return (
    <>
      <ContextMenuSection>
        <ContextMenuItem label={t('channel.context.markRead')} />
        <ContextMenuItem label={t('channel.context.mute')} />
        <ContextMenuItem label={t('channel.context.edit')} />
        {canManageChannels && (
          <ContextMenuItem label={t('channel.context.delete')} red />
        )}
      </ContextMenuSection>
    </>
  )
}
