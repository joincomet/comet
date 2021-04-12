import { ArgsType, Field, Publisher } from 'type-graphql'
import { IsEmail, Length } from 'class-validator'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { uploadImageSingle } from '@/util'
import { Context } from '@/types'
import { User } from '@/entity'

@ArgsType()
export class EditAccountArgs {
  @Field({ nullable: true })
  @Length(2, 32)
  name?: string

  @Field({ nullable: true })
  @IsEmail()
  email?: string

  @Field(() => GraphQLUpload, { nullable: true })
  avatarFile?: FileUpload
}

export async function editAccount(
  { em, user }: Context,
  { name, email, avatarFile }: EditAccountArgs,
  notifyUserUpdated: Publisher<{ userId: string }>
): Promise<User> {
  em.assign(user, {
    name: name ? name : user.name,
    email: email ? email : user.email,
    avatarUrl: avatarFile
      ? await uploadImageSingle(
          avatarFile,
          {
            width: 256,
            height: 256
          },
          true
        )
      : user.avatarUrl
  })
  await em.persistAndFlush(user)
  await notifyUserUpdated({ userId: user.id })
  return user
}
