import { Context, ServerPermission } from '@/types'
import { createMethodDecorator } from 'type-graphql'
import { Folder, Post } from '@/entity'

/**
 * Expects folderId arg
 * Check if user has given ServerPermission for folder server or is folder owner
 * @param permission Required ServerPermission
 */
export const CheckFolderServerPermission = (permission: ServerPermission) =>
  createMethodDecorator<Context>(
    async ({ args: { folderId }, context: { em, user } }, next) => {
      if (!user) throw new Error('error.notLoggedIn')
      if (!folderId) return next()
      const folder = await em.findOneOrFail(Folder, folderId, [
        'owner',
        'serverFolder.server'
      ])
      if (folder.serverFolder)
        await user.checkServerPermission(
          em,
          folder.serverFolder.server,
          permission
        )
      else if (folder.owner !== user) throw new Error('error.folder.notOwner')
      return next()
    }
  )
