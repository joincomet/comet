import { useContextMenuEvent } from '@/components/ui/context'
import { useMutation } from 'urql'
import { useCopyToClipboard } from 'react-use'
import {
  REMOVE_MESSAGE,
  DELETE_MESSAGE,
  PIN_MESSAGE,
  UNPIN_MESSAGE
} from '@/graphql/mutations'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import ContextMenuItem from '@/components/ui/context/ContextMenuItem'
import ContextMenuDivider from '@/components/ui/context/ContextMenuDivider'
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
  const { serverId } = useParams()
  const [canManageMessages] = useHasChannelPermissions(
    [ChannelPermission.ManageMessages],
    [ServerPermission.ManageMessages],
    message?.channel?.id,
    serverId
  )
  const [_clipboardState, copyToClipboard] = useCopyToClipboard()
  const [_deleteMessageRes, deleteMessage] = useMutation(DELETE_MESSAGE)
  const [_removeMessageRes, removeMessage] = useMutation(REMOVE_MESSAGE)
  const [_pinMessageRes, pinMessage] = useMutation(PIN_MESSAGE)
  const [_unpinMessageRes, unpinMessage] = useMutation(UNPIN_MESSAGE)
  const { t } = useTranslation()
  const user = useCurrentUser()

  if (!menuEvent || !menuEvent.data) return null

  return (
    <ContextMenu>
      <ContextMenuSection>
        <ContextMenuItem
          onClick={() => {
            copyToClipboard(`${message.relativeUrl}`)
            toast.success(t('message.context.copiedLink'))
          }}
          label={t('message.context.copyLink')}
        />
      </ContextMenuSection>
      {message.author.id === user.id && (
        <>
          <ContextMenuDivider />
          <ContextMenuSection>
            <ContextMenuItem label={t('message.context.edit')} />
            <ContextMenuItem
              label={t('message.context.delete')}
              red
              onClick={() => toast.error(t('message.context.deleted'))}
            />
          </ContextMenuSection>
        </>
      )}
      {canManageMessages && (
        <>
          <ContextMenuDivider />
          <ContextMenuItem
            label={t('post.context.remove')}
            red
            onClick={() => {
              const confirmed = window.confirm(
                t('message.context.removeConfirm')
              )
              if (!confirmed) return
              removeMessage({ messageId: message.id })
              toast.success(t('message.context.removed'))
            }}
          />
        </>
      )}
    </ContextMenu>
  )
}
