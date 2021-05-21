import { useTranslation } from 'react-i18next'
import ContextMenuSection from '@/components/ui/context/ContextMenuSection'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import { useHistory, useLocation } from 'react-router-dom'
import { ServerPermission, useDeleteChannelMutation } from '@/graphql/hooks'

export default function ChannelContextMenu({
  channel,
  server,
  openDelete,
  ContextMenuItem
}) {
  const { t } = useTranslation()
  const [canManageChannels] = useHasServerPermissions({
    server,
    permissions: [ServerPermission.ManageChannels]
  })
  return (
    <>
      <ContextMenuSection>
        {canManageChannels && (
          <>
            <ContextMenuItem label={t('channel.context.edit')} />

            <ContextMenuItem
              label={t('channel.context.delete')}
              red
              onClick={() => {
                openDelete()
              }}
            />
          </>
        )}
      </ContextMenuSection>
    </>
  )
}
