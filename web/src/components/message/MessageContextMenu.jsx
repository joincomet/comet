import { useContextMenuEvent } from '@/components/ui/context'
import { useMutation } from 'urql'
import { useCopyToClipboard } from 'react-use'
import { DELETE_MESSAGE, PIN_MESSAGE, UNPIN_MESSAGE } from '@/graphql/mutations'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import ContextMenuItem from '@/components/ui/context/ContextMenuItem'
import ContextMenu from '@/components/ui/context/ContextMenu'
import { ServerPermission } from '@/types/ServerPermission'
import { useCurrentUser } from '@/providers/UserProvider'
import { ChannelPermission } from '@/types/ChannelPermission'
import { useParams } from 'react-router-dom'
import ContextMenuSection from '@/components/ui/context/ContextMenuSection'
import { useHasChannelPermissions } from '@/hooks/useHasChannelPermissions'

export default function MessageContextMenu() {
  const menuEvent = useContextMenuEvent()
  const message = menuEvent?.data?.message
  const { serverId, channelId, userId, groupId } = useParams()
  const [canManageMessages] = useHasChannelPermissions({
    channelId,
    serverId,
    channelPermissions: [ChannelPermission.ManageMessages],
    serverPermissions: [ServerPermission.ManageMessages]
  })
  const copyToClipboard = useCopyToClipboard()[1]
  const [_deleteRes, deleteMessage] = useMutation(DELETE_MESSAGE)
  const [_pinRes, pinMessage] = useMutation(PIN_MESSAGE)
  const [_unpinRes, unpinMessage] = useMutation(UNPIN_MESSAGE)
  const { t } = useTranslation()
  const currentUser = useCurrentUser()

  const isAuthor = message.author.id === currentUser.id
  const canDelete = canManageMessages || isAuthor
  const canPin = canManageMessages || !!groupId || !!userId

  if (!menuEvent || !menuEvent.data) return null

  return (
    <ContextMenu>
      <ContextMenuSection>
        {isAuthor && <ContextMenuItem label={t('message.context.edit')} />}
        {canPin && <ContextMenuItem label={t('message.context.pin')} />}
        <ContextMenuItem
          onClick={() => {
            copyToClipboard(`${message.relativeUrl}`)
          }}
          label={t('message.context.copyLink')}
        />
        {canDelete && (
          <ContextMenuItem
            label={t('message.context.delete')}
            red
            onClick={() => toast.error(t('message.context.deleted'))}
          />
        )}
      </ContextMenuSection>
    </ContextMenu>
  )
}
