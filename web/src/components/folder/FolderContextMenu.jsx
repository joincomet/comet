import { useTranslation } from 'react-i18next'
import ContextMenuSection from '@/components/ui/context/ContextMenuSection'
import { useState } from 'react'
import {
  DELETE_FOLDER,
  FOLLOW_FOLDER,
  UNFOLLOW_FOLDER,
  UPDATE_FOLDER
} from '@/graphql/mutations'
import { useMutation } from 'urql'
import { FolderVisibility } from '@/types/FolderVisibility'
import { matchPath, useHistory, useLocation } from 'react-router-dom'
import { useUserFolders } from '@/providers/DataProvider'
import { useCurrentUser } from '@/providers/UserProvider'

export default function FolderContextMenu({ folder, ContextMenuItem }) {
  const { t } = useTranslation()
  const currentUser = useCurrentUser()
  const userFolders = useUserFolders()
  const isFollowing = userFolders
    .filter(f => f.owner.id !== currentUser.id)
    .map(f => f.id)
    .includes(folder.id)
  const editable = folder.name !== 'Read Later' && folder.name !== 'Favorites'
  const [c, setC] = useState(false)
  const [_updateFolderRes, updateFolder] = useMutation(UPDATE_FOLDER)
  const [_deleteFolderRes, deleteFolder] = useMutation(DELETE_FOLDER)
  const [_followRes, followFolder] = useMutation(FOLLOW_FOLDER)
  const [_unfollowRes, unfollowFolder] = useMutation(UNFOLLOW_FOLDER)
  const { push } = useHistory()
  const { pathname } = useLocation()
  const matched = matchPath(pathname, { path: '/server/:serverId' })
  const serverId = matched?.params?.serverId

  return (
    <>
      <ContextMenuSection>
        <ContextMenuItem label={t('folder.context.copyLink')} />

        {folder.owner.id !== currentUser.id && (
          <>
            {isFollowing ? (
              <ContextMenuItem
                label={t('folder.context.unfollow')}
                onClick={() => unfollowFolder({ folderId: folder.id })}
              />
            ) : (
              <ContextMenuItem
                label={t('folder.context.follow')}
                onClick={() => followFolder({ folderId: folder.id })}
              />
            )}
          </>
        )}

        {editable && (
          <>
            <ContextMenuItem label={t('folder.context.edit')} />
            {!serverId && (
              <ContextMenuItem
                label={t('folder.context.collaborative')}
                checked={folder.isCollaborative}
                onClick={() =>
                  updateFolder({
                    folderId: folder.id,
                    isCollaborative: !folder.isCollaborative
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
                    folderId: folder.id,
                    visibility: FolderVisibility.Public
                  })
                }
              />
              <ContextMenuItem
                label={t('folder.context.visibility.friends')}
                checked={folder.visibility === FolderVisibility.Friends}
                onClick={() =>
                  updateFolder({
                    folderId: folder.id,
                    visibility: FolderVisibility.Friends
                  })
                }
              />
              <ContextMenuItem
                label={t('folder.context.visibility.unlisted')}
                checked={folder.visibility === FolderVisibility.Unlisted}
                onClick={() =>
                  updateFolder({
                    folderId: folder.id,
                    visibility: FolderVisibility.Unlisted
                  })
                }
              />
              <ContextMenuItem
                label={t('folder.context.visibility.private')}
                checked={folder.visibility === FolderVisibility.Private}
                onClick={() =>
                  updateFolder({
                    folderId: folder.id,
                    visibility: FolderVisibility.Private
                  })
                }
              />
            </ContextMenuItem>

            <ContextMenuItem
              label={t('folder.context.delete')}
              red
              onClick={() => {
                deleteFolder({ folderId: folder.id })
                if (pathname.startsWith('/me/folder')) {
                  push('/me')
                } else if (pathname.startsWith(`/server/${serverId}/folder`)) {
                  push(`/server/${serverId}`)
                }
              }}
            />
          </>
        )}
      </ContextMenuSection>
    </>
  )
}
