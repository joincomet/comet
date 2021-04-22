import { Field, InputType } from 'type-graphql'
import { IsEmail, Length } from 'class-validator'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { Context } from '@/types'
import { User } from '@/entity'
import { tagGenerator, uploadImageFileSingle } from '@/util'
import { GraphQLEmailAddress } from 'graphql-scalars'

@InputType()
export class UpdateAccountInput {
  @Field({ nullable: true })
  @Length(2, 32)
  name?: string

  @Field(() => GraphQLEmailAddress, { nullable: true })
  @IsEmail()
  email?: string

  @Field(() => GraphQLUpload, { nullable: true })
  avatarFile?: FileUpload
}

export async function updateAccount(
  { em, userId, liveQueryStore }: Context,
  { name, email, avatarFile }: UpdateAccountInput
): Promise<User> {
  const user = await em.findOneOrFail(User, userId)
  em.assign(user, {
    name: name ?? user.name,
    email: email ?? user.email,
    avatarUrl: avatarFile
      ? await uploadImageFileSingle(avatarFile, { width: 256, height: 256 })
      : user.avatarUrl
  })
  while (
    await em.findOne(User, {
      name: user.name,
      tag: user.tag,
      email: { $ne: user.email }
    })
  ) {
    user.tag = tagGenerator()
  }
  await em.persistAndFlush(user)
  liveQueryStore.invalidate(`User:${user.id}`)
  return user
}
