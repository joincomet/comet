import { Context } from '@/types'
import { Folder, User } from '@/entity'
import { getUserFolders } from '@/resolver/folder/queries/getUserFolders'
import { getOtherUserFolders } from '@/resolver/folder/queries/getOtherUserFolders'

export async function folders(
  { em, user: currentUser }: Context,
  user: User
): Promise<Folder[]> {
  if (currentUser === user) {
    return getUserFolders({ em, user: currentUser })
  } else {
    return getOtherUserFolders({ em, user: currentUser }, user.id)
  }
}
