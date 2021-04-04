import { useContextMenuEvent } from '@/components/ui/context'
import { useTranslation } from 'react-i18next'
import ContextMenuItem from '@/components/ui/context/ContextMenuItem'
import ContextMenu from '@/components/ui/context/ContextMenu'
import ContextMenuSection from '@/components/ui/context/ContextMenuSection'

export default function ServerContextMenu() {
  const menuEvent = useContextMenuEvent()
  const { t } = useTranslation()

  if (!menuEvent || !menuEvent.data) return null
  const { server } = menuEvent.data

  return (
    <ContextMenu>
      <ContextMenuSection>
        <ContextMenuItem label={t('server.context.markRead')} />
        <ContextMenuItem label={t('server.context.mute')} />
        <ContextMenuItem label={t('server.context.invite')} />
        <ContextMenuItem label={t('server.context.leave')} red />
      </ContextMenuSection>
    </ContextMenu>
  )
}
