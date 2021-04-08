import { useTranslation } from 'react-i18next'
import ContextMenuSection from '@/components/ui/context/ContextMenuSection'

export default function FolderContextMenu({ folder, ContextMenuItem }) {
  const { t } = useTranslation()

  const editable = folder.name !== 'Read Later' && folder.name !== 'Favorites'

  return (
    <>
      <ContextMenuSection>
        <ContextMenuItem label={t('folder.context.copyLink')} />
        {editable && (
          <>
            <ContextMenuItem label={t('folder.context.edit')} />
            <ContextMenuItem label={t('folder.context.delete')} red />
          </>
        )}
      </ContextMenuSection>
    </>
  )
}
