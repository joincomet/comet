import { useTranslation } from 'react-i18next'
import ContextMenuSection from '@/components/ui/context/ContextMenuSection'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import { ServerPermission } from '@/graphql/hooks'

export default function ChannelContextMenu({
  channel,
  server,
  openDelete,
  openEdit,
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
            <ContextMenuItem
              label={t('channel.context.edit')}
              onClick={() => {
                openEdit()
              }}
            />

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
