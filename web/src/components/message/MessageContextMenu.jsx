import { useMutation } from 'urql'
import { useCopyToClipboard } from 'react-use'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { ServerPermission } from '@/types/ServerPermission'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import { ChannelPermission } from '@/types/ChannelPermission'
import { useParams } from 'react-router-dom'
import ContextMenuSection from '@/components/ui/context/ContextMenuSection'
import { useHasChannelPermissions } from '@/hooks/useHasChannelPermissions'
import { useToggleMessagePin } from '@/components/message/useToggleMessagePin'

export default function MessageContextMenu({ message, ContextMenuItem }) {
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
  const togglePin = useToggleMessagePin(message)
  const { t } = useTranslation()
  const [currentUser] = useCurrentUser()

  const isAuthor = message.author.id === currentUser.id
  const canDelete = canManageMessages || isAuthor
  const canPin = canManageMessages || groupId || userId

  return (
    <>
      <ContextMenuSection>
        {isAuthor && <ContextMenuItem label={t('message.context.edit')} />}
        {canPin && (
          <ContextMenuItem
            label={
              message.isPinned
                ? t('message.context.unpin')
                : t('message.context.pin')
            }
            onClick={() => togglePin()}
          />
        )}
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
    </>
  )
}
