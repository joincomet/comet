import { useTranslation } from 'react-i18next'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import { ServerPermission } from '@/types/ServerPermission'
import { useCopyToClipboard } from 'react-use'
import { useMutation, useQuery } from 'urql'
import { useTogglePostVote } from '@/components/post/useTogglePostVote'
import { useTogglePostPin } from '@/components/post/useTogglePostPin'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import ContextMenuSection from '@/components/ui/context/ContextMenuSection'
import toast from 'react-hot-toast'
import { matchPath, useLocation } from 'react-router-dom'
import {
  useAddPostToFolderMutation,
  useDeletePostMutation,
  useRemovePostFromFolderMutation
} from '@/graphql/hooks'

export default function PostContextMenu({ post, ContextMenuItem }) {
  const { pathname } = useLocation()
  const matchedUserFolder = matchPath(pathname, {
    path: '/me/folder/:folderId'
  })
  const matchedServerFolder = matchPath(pathname, {
    path: '/server/:serverId/folder/:folderId'
  })
  const folderId =
    matchedUserFolder?.params?.folderId || matchedServerFolder?.params?.folderId
  const { t } = useTranslation()

  const [canManagePosts] = useHasServerPermissions({
    serverId: post?.server.id,
    permissions: [ServerPermission.ManagePosts]
  })

  const copyToClipboard = useCopyToClipboard()[1]

  const [_deletePostRes, deletePost] = useDeletePostMutation()

  const toggleVote = useTogglePostVote(post)
  const togglePin = useTogglePostPin(post)

  const [currentUser] = useCurrentUser()
  const isAuthor = post?.author?.id === currentUser.id
  const canDelete = isAuthor || canManagePosts

  const userFolders = currentUser.folders
  const serverFolders =
    currentUser.servers.find(s => s.server.id === post.server.id)?.folders ?? []
  const friends = currentUser.relationships
    .filter(rel => rel.status === 'Friends')
    .map(rel => rel.user)

  const [_addPostRes, addPostToFolder] = useAddPostToFolderMutation()
  const [
    _removePostRes,
    removePostFromFolder
  ] = useRemovePostFromFolderMutation()

  if (!post) return null
  return (
    <>
      <ContextMenuSection>
        <ContextMenuItem
          onClick={() => toggleVote()}
          label={
            post.isVoted ? t('post.context.unvote') : t('post.context.vote')
          }
        />

        {userFolders.length > 0 && (
          <ContextMenuItem label={t('post.context.addToUserFolder')}>
            {userFolders.map(folder => (
              <ContextMenuItem
                key={folder.id}
                label={folder.name}
                onClick={() =>
                  addPostToFolder({
                    folderId: folder.id,
                    postId: post.id
                  }).then(res => {
                    if (!res.error)
                      toast.success(t('folder.added', { name: folder.name }))
                  })
                }
              />
            ))}
          </ContextMenuItem>
        )}

        {serverFolders.length > 0 && (
          <ContextMenuItem label={t('post.context.addToServerFolder')}>
            {serverFolders.map(folder => (
              <ContextMenuItem
                key={folder.id}
                label={folder.name}
                onClick={() =>
                  addPostToFolder({
                    folderId: folder.id,
                    postId: post.id
                  }).then(res => {
                    if (!res.error)
                      toast.success(t('folder.added', { name: folder.name }))
                  })
                }
              />
            ))}
          </ContextMenuItem>
        )}

        {friends.length > 0 && (
          <ContextMenuItem label={t('post.context.sendToFriend')}>
            {friends.map(friend => (
              <ContextMenuItem key={friend.id} label={friend.name} />
            ))}
          </ContextMenuItem>
        )}

        {isAuthor && <ContextMenuItem label={t('post.context.edit')} />}
        {canManagePosts && (
          <ContextMenuItem
            onClick={() => togglePin()}
            label={
              post.isPinned ? t('post.context.unpin') : t('post.context.pin')
            }
          />
        )}
        <ContextMenuItem
          onClick={() => {
            copyToClipboard(`${post.relativeUrl}`)
          }}
          label={t('post.context.copyLink')}
        />

        {folderId && (
          <ContextMenuItem
            label={t('post.context.removeFromFolder')}
            red
            onClick={() => removePostFromFolder({ folderId, postId: post.id })}
          />
        )}

        {canDelete && (
          <ContextMenuItem
            red
            onClick={() => {
              deletePost({ postId: post.id })
              toast.success(t('post.context.deleted'))
            }}
            label={t('post.context.delete')}
          />
        )}
      </ContextMenuSection>
    </>
  )
}
