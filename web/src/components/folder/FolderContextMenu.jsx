import { useTranslation } from 'react-i18next'
import ContextMenuSection from '@/components/ui/context/ContextMenuSection'

export default function FolderContextMenu({ folder, ContextMenuItem }) {
  const { t } = useTranslation()

  return (
    <>
      <ContextMenuSection>
        <ContextMenuItem label={t('server.context.markRead')} />
        <ContextMenuItem label={t('server.context.mute')} />
        <ContextMenuItem label={t('server.context.invite')} />
        <ContextMenuItem label={t('server.context.leave')} red />
      </ContextMenuSection>
    </>
  )
}
