import { useTranslation } from 'react-i18next'
import ContextMenuSection from '@/components/ui/context/ContextMenuSection'
import { matchPath, useHistory, useLocation } from 'react-router-dom'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import {
  FolderVisibility,
  useDeleteFolderMutation,
  useFollowFolderMutation,
  useUnfollowFolderMutation,
  useUpdateFolderMutation
} from '@/graphql/hooks'

export default function FolderContextMenu({ folder, ContextMenuItem }) {
  const { t } = useTranslation()
  const [currentUser] = useCurrentUser()
  const userFolders = currentUser?.folders ?? []
  const isFollowing = !currentUser
    ? false
    : userFolders
        .filter(f => f.owner?.id !== currentUser.id)
        .map(f => f.id)
        .includes(folder.id)
  const editable = folder.name !== 'Read Later' && folder.name !== 'Favorites'
  const [updateFolder] = useUpdateFolderMutation()
  const [followFolder] = useFollowFolderMutation()
  const [unfollowFolder] = useUnfollowFolderMutation()
  const [deleteFolder] = useDeleteFolderMutation()
  const { push } = useHistory()
  const { pathname } = useLocation()
  const matched = matchPath(pathname, { path: '/:server' })
  const serverName = matched?.params?.server?.substring(1)

  return (
    <>
      <ContextMenuSection>
        <ContextMenuItem label={t('folder.context.copyLink')} />

        {!!currentUser && folder.owner?.id !== currentUser.id && (
          <>
            {isFollowing ? (
              <ContextMenuItem
                label={t('folder.context.unfollow')}
                onClick={() =>
                  unfollowFolder({
                    variables: { input: { folderId: folder.id } }
                  })
                }
              />
            ) : (
              <ContextMenuItem
                label={t('folder.context.follow')}
                onClick={() =>
                  followFolder({
                    variables: { input: { folderId: folder.id } }
                  })
                }
              />
            )}
          </>
        )}

        {editable && (
          <>
            <ContextMenuItem label={t('folder.context.edit')} />
            {!serverName && (
              <ContextMenuItem
                label={t('folder.context.collaborative')}
                checked={folder.isCollaborative}
                onClick={() =>
                  updateFolder({
                    variables: {
                      input: {
                        folderId: folder.id,
                        isCollaborative: !folder.isCollaborative
                      }
                    }
                  })
                }
              />
            )}

            <ContextMenuItem label={t('folder.context.changeVisibility')}>
              <ContextMenuItem
                label={t('folder.context.visibility.public')}
                checked={folder.visibility === FolderVisibility.Public}
                onClick={() =>
                  updateFolder({
                    variables: {
                      input: {
                        folderId: folder.id,
                        visibility: FolderVisibility.Public
                      }
                    }
                  })
                }
              />
              <ContextMenuItem
                label={t('folder.context.visibility.friends')}
                checked={folder.visibility === FolderVisibility.Friends}
                onClick={() =>
                  updateFolder({
                    variables: {
                      input: {
                        folderId: folder.id,
                        visibility: FolderVisibility.Friends
                      }
                    }
                  })
                }
              />
              <ContextMenuItem
                label={t('folder.context.visibility.unlisted')}
                checked={folder.visibility === FolderVisibility.Unlisted}
                onClick={() =>
                  updateFolder({
                    variables: {
                      input: {
                        folderId: folder.id,
                        visibility: FolderVisibility.Unlisted
                      }
                    }
                  })
                }
              />
              <ContextMenuItem
                label={t('folder.context.visibility.private')}
                checked={folder.visibility === FolderVisibility.Private}
                onClick={() =>
                  updateFolder({
                    variables: {
                      input: {
                        folderId: folder.id,
                        visibility: FolderVisibility.Private
                      }
                    }
                  })
                }
              />
            </ContextMenuItem>

            <ContextMenuItem
              label={t('folder.context.delete')}
              red
              onClick={() => {
                deleteFolder({ variables: { input: { folderId: folder.id } } })
                if (pathname.startsWith('/folder')) {
                  push('/')
                } else if (pathname.startsWith(`/${serverName}/folder`)) {
                  push(`/${serverName}`)
                }
              }}
            />
          </>
        )}
      </ContextMenuSection>
    </>
  )
}
