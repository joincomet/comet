import { useTranslation } from 'react-i18next'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import { ServerPermission } from '@/types/ServerPermission'
import { useCopyToClipboard } from 'react-use'
import { useMutation, useQuery } from 'urql'
import {
  ADD_POST_TO_FOLDER,
  DELETE_POST,
  REMOVE_POST_FROM_FOLDER
} from '@/graphql/mutations'
import { useTogglePostVote } from '@/components/post/useTogglePostVote'
import { useTogglePostPin } from '@/components/post/useTogglePostPin'
import { useCurrentUser } from '@/providers/UserProvider'
import ContextMenuSection from '@/components/ui/context/ContextMenuSection'
import toast from 'react-hot-toast'
import { useUserFolders, useUserRelationships } from '@/providers/DataProvider'
import { matchPath, useLocation } from 'react-router-dom'
import { GET_SERVER_FOLDERS } from '@/graphql/queries'

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

  const { friends } = useUserRelationships()

  const copyToClipboard = useCopyToClipboard()[1]

  const [_deletePostRes, deletePost] = useMutation(DELETE_POST)

  const toggleVote = useTogglePostVote(post)
  const togglePin = useTogglePostPin(post)

  const currentUser = useCurrentUser()
  const isAuthor = post?.author?.id === currentUser.id
  const canDelete = isAuthor || canManagePosts

  const userFolders = useUserFolders().filter(f => f.id !== folderId)
  const [{ data: serverFoldersData }] = useQuery({
    query: GET_SERVER_FOLDERS,
    variables: { serverId: post?.server.id },
    pause: !post
  })
  const serverFolders =
    serverFoldersData?.getServerFolders.filter(f => f.id !== folderId) ?? []

  const [_addPostRes, addPostToFolder] = useMutation(ADD_POST_TO_FOLDER)
  const [_removePostRes, removePostFromFolder] = useMutation(
    REMOVE_POST_FROM_FOLDER
  )

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
