import { useCopyToClipboard } from 'react-use'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { ChannelPermission } from '@/graphql/hooks'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import { matchPath, useLocation, useParams } from 'react-router-dom'
import ContextMenuSection from '@/components/ui/context/ContextMenuSection'
import { useHasChannelPermissions } from '@/hooks/useHasChannelPermissions'
import { useToggleMessagePin } from '@/components/message/useToggleMessagePin'
import {
  useDeleteMessageMutation,
  usePinMessageMutation,
  useUnpinMessageMutation
} from '@/graphql/hooks'

export default function MessageContextMenu({ message, ContextMenuItem }) {
  const { pathname } = useLocation()
  const matchedGroup = matchPath(pathname, {
    path: '/me/group/:groupId'
  })
  const matchedDm = matchPath(pathname, {
    path: '/me/dm/:userId'
  })
  const matchedChannel = matchPath(pathname, {
    path: '/server/:serverId/channel/:channelId'
  })
  const groupId = matchedGroup?.params?.groupId
  const userId = matchedDm?.params?.userId
  const serverId = matchedChannel?.params?.serverId
  const channelId = matchedChannel?.params?.channelId
  const [canManageMessages] = useHasChannelPermissions({
    channelId,
    permissions: [ChannelPermission.ManageMessages]
  })
  const copyToClipboard = useCopyToClipboard()[1]
  const [deleteMessage] = useDeleteMessageMutation()
  const [pinMessage] = usePinMessageMutation()
  const [unpinMessage] = useUnpinMessageMutation()
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
