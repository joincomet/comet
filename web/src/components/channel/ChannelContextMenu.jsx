import { useTranslation } from 'react-i18next'
import ContextMenuSection from '@/components/ui/context/ContextMenuSection'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import { useHistory, useLocation } from 'react-router-dom'
import { ServerPermission, useDeleteChannelMutation } from '@/graphql/hooks'

export default function ChannelContextMenu({
  channel,
  server,
  ContextMenuItem
}) {
  const { t } = useTranslation()
  const { push } = useHistory()
  const { pathname } = useLocation()
  const [canManageChannels] = useHasServerPermissions({
    server,
    permissions: [ServerPermission.ManageChannels]
  })
  const [deleteChannel] = useDeleteChannelMutation()
  return (
    <>
      <ContextMenuSection>
        <ContextMenuItem label={t('channel.context.markRead')} />
        {/*<ContextMenuItem label={t('channel.context.mute')} />*/}
        <ContextMenuItem label={t('channel.context.edit')} />
        {canManageChannels && (
          <ContextMenuItem
            label={t('channel.context.delete')}
            red
            onClick={() => {
              if (pathname === `/+${server.name}/#${channel.name}`)
                push(`/+${server.name}`)
              deleteChannel({ variables: { input: { channelId: channel.id } } })
            }}
          />
        )}
      </ContextMenuSection>
    </>
  )
}
