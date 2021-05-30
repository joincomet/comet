import { useCopyToClipboard } from 'react-use'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import { matchPath, useLocation } from 'react-router-dom'
import ContextMenuSection from '@/components/ui/context/ContextMenuSection'
import { useToggleMessagePin } from '@/components/message/useToggleMessagePin'
import {
  MessageType,
  ServerPermission,
  useDeleteMessageMutation,
  usePinMessageMutation,
  useUnpinMessageMutation
} from '@/graphql/hooks'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'

export default function MessageContextMenu({
  message,
  server,
  ContextMenuItem
}) {
  const { pathname } = useLocation()
  const matchedGroup = matchPath(pathname, {
    path: '/group/:groupId'
  })
  const matchedDm = matchPath(pathname, {
    path: '/dm/:username'
  })
  const groupId = matchedGroup?.params?.groupId
  const username = matchedDm?.params?.username
  const [canManageMessages] = useHasServerPermissions({
    server,
    permissions: [ServerPermission.ManageMessages]
  })
  const copyToClipboard = useCopyToClipboard()[1]
  const [deleteMessage] = useDeleteMessageMutation()
  const [pinMessage] = usePinMessageMutation()
  const [unpinMessage] = useUnpinMessageMutation()
  const togglePin = useToggleMessagePin(message)
  const { t } = useTranslation()
  const [currentUser] = useCurrentUser()

  const isAuthor = !!currentUser && message.author.id === currentUser.id
  const canDelete =
    (canManageMessages || isAuthor) && message.type === MessageType.Normal
  const canEdit = isAuthor && message.type === MessageType.Normal
  const canPin = canManageMessages || groupId || username

  return (
    <>
      <ContextMenuSection>
        {/*{canEdit && <ContextMenuItem label={t('message.context.edit')} />}*/}
        {/*{canPin && (
          <ContextMenuItem
            label={
              message.isPinned
                ? t('message.context.unpin')
                : t('message.context.pin')
            }
            onClick={() => togglePin()}
          />
        )}*/}
        {/*<ContextMenuItem
          onClick={() => {
            copyToClipboard(`${message.relativeUrl}`)
          }}
          label={t('message.context.copyLink')}
        />*/}
        {canDelete && (
          <ContextMenuItem
            label={t('message.context.delete')}
            red
            onClick={() => {
              deleteMessage({
                variables: {
                  input: {
                    messageId: message.id
                  }
                }
              })
              toast.error(t('Message deleted!'))
            }}
          />
        )}
      </ContextMenuSection>
    </>
  )
}
