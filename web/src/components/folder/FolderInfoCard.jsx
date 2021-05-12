import ContextMenuTrigger from '@/components/ui/context/ContextMenuTrigger'
import { ContextMenuType } from '@/types/ContextMenuType'
import {
  IconDotsHorizontal,
  IconEditAvatar,
  IconFavoritesFolder,
  IconFolder,
  IconReadLaterFolder
} from '@/components/ui/icons/Icons'
import { useTranslation } from 'react-i18next'
import { useStore } from '@/hooks/useStore'
import ServerPopup from '@/components/server/ServerPopup'
import ServerAvatar from '@/components/server/ServerAvatar'
import { useEffect, useMemo, useState } from 'react'
import UserPopup from '@/components/user/UserPopup'
import UserAvatar from '@/components/user/UserAvatar'
import { useUpdateFolderMutation } from '@/graphql/hooks'

export default function FolderInfoCard({ folder }) {
  const { t } = useTranslation()

  const folderIcon = useMemo(() => {
    if (!folder || folder.avatarUrl) return null
    if (folder.name === 'Favorites')
      return <IconFavoritesFolder className="w-1/2 h-1/2 text-yellow-500" />
    else if (folder.name === 'Read Later')
      return <IconReadLaterFolder className="w-1/2 h-1/2 text-blue-500" />
    else return <IconFolder className="w-1/2 h-1/2 text-gray-500" />
  }, [folder, t])

  const editable = folder?.name !== 'Favorites' && folder?.name !== 'Read Later'

  const [updateFolder] = useUpdateFolderMutation()

  const [avatarFile, setAvatarFile] = useState(null)

  useEffect(() => {
    if (!avatarFile) return null
    updateFolder({ variables: { input: { avatarFile, folderId: folder.id } } })
  }, [avatarFile, updateFolder])

  if (!folder) return null
  return (
    <div className="p-4">
      <ContextMenuTrigger data={{ type: ContextMenuType.Folder, folder }}>
        <div className="dark:bg-gray-800 p-4 flex rounded">
          <div
            className="w-32 h-32 dark:bg-gray-750 flex items-center justify-center group relative bg-center bg-contain"
            style={
              folder.avatarUrl
                ? { backgroundImage: `url(${folder.avatarUrl})` }
                : {}
            }
          >
            {folderIcon}
            {editable && (
              <>
                <input
                  hidden
                  name="avatarFile"
                  id="avatarFile"
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  onChange={e => setAvatarFile(e.target.files[0])}
                />
                <label
                  htmlFor="avatarFile"
                  className="absolute inset-0 items-center justify-center hidden bg-black bg-opacity-50 hidden group-hover:flex cursor-pointer"
                >
                  <IconEditAvatar className="w-1/2 h-1/2 text-primary" />
                </label>
              </>
            )}
          </div>

          <div className="ml-6 flex flex-col py-0.5">
            <div className="text-tertiary text-13 pb-1">
              {folder.owner ? t('folder.userFolder') : t('folder.serverFolder')}
              {folder.isCollaborative && (
                <>&nbsp;&middot;&nbsp;{t('folder.collaborative')}</>
              )}
            </div>
            <div className="text-4xl font-bold text-primary">{folder.name}</div>
            {folder.description && (
              <div className="text-tertiary text-sm pt-2">
                {folder.description}
              </div>
            )}
            <div className="text-tertiary text-13 pt-3 mt-auto flex items-center">
              {folder.owner ? (
                <>
                  {t('folder.createdBy')}&nbsp;
                  <ContextMenuTrigger
                    data={{
                      type: ContextMenuType.User,
                      user: folder.owner
                    }}
                  >
                    <div className="flex items-center">
                      <UserPopup user={folder.owner}>
                        <UserAvatar user={folder.owner} size={5} />
                      </UserPopup>
                      <UserPopup user={folder.owner}>
                        <span className="ml-1.5 text-primary cursor-pointer hover:underline font-medium">
                          {folder.owner.name}
                        </span>
                      </UserPopup>
                    </div>
                  </ContextMenuTrigger>
                </>
              ) : (
                <div className="flex items-center">
                  <ServerPopup server={folder.server}>
                    <ServerAvatar
                      className="rounded-full"
                      size={5}
                      server={folder.server}
                    />
                  </ServerPopup>
                  <ServerPopup server={folder.server}>
                    <span className="ml-1.5 text-primary cursor-pointer hover:underline font-medium">
                      {folder.server.name}
                    </span>
                  </ServerPopup>
                </div>
              )}
              &nbsp;&middot;{' '}
              {t('folder.postCount', { count: folder.postCount })}
              <ContextMenuTrigger
                leftClick
                data={{ type: ContextMenuType.Folder, folder }}
              >
                <IconDotsHorizontal className="highlightable w-5 h-5 ml-2.5" />
              </ContextMenuTrigger>
            </div>
          </div>
        </div>
      </ContextMenuTrigger>
    </div>
  )
}
