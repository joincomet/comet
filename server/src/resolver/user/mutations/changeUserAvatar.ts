import { Field, InputType } from 'type-graphql'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { Context } from '@/types'
import { User } from '@/entity'
import {logger, uploadImageFileSingle} from '@/util'

@InputType()
export class ChangeUserAvatarInput {
  @Field(() => GraphQLUpload, { nullable: true })
  avatarFile?: FileUpload
}

export async function changeUserAvatar(
  { em, userId, liveQueryStore }: Context,
  { avatarFile }: ChangeUserAvatarInput
): Promise<User> {
  logger('changeUserAvatar')
  const user = await em.findOneOrFail(User, userId)
  em.assign(user, {
    avatarUrl: avatarFile
      ? await uploadImageFileSingle(avatarFile, { width: 256, height: 256 })
      : user.avatarUrl
  })
  await em.persistAndFlush(user)
  return user
}
