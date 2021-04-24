import { Field, InputType } from 'type-graphql'
import { IsEmail, Length, MinLength } from 'class-validator'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { Context } from '@/types'
import { User } from '@/entity'
import { handleUnderscore, tagGenerator, uploadImageFileSingle } from '@/util'
import { GraphQLEmailAddress } from 'graphql-scalars'
import * as argon2 from 'argon2'

@InputType()
export class UpdateAccountInput {
  @Field({ nullable: true })
  @Length(2, 32)
  name?: string

  @Field(() => GraphQLEmailAddress, { nullable: true })
  @IsEmail()
  email?: string

  @Field({ nullable: true })
  @MinLength(6)
  password?: string

  @Field()
  currentPassword: string
}

export async function updateAccount(
  { em, userId, liveQueryStore }: Context,
  { name, email, password, currentPassword }: UpdateAccountInput
): Promise<User> {
  const user = await em.findOneOrFail(User, userId)
  const match = await argon2.verify(user.passwordHash, currentPassword)
  if (!match) throw new Error('error.login.wrongPassword')

  if (email && email !== user.email) {
    const foundUser = await em.findOne(User, {
      email: handleUnderscore(email),
      isDeleted: false
    })
    if (foundUser) throw new Error('error.login.emailInUse')
  }

  em.assign(user, {
    name: name ?? user.name,
    email: email ?? user.email,
    passwordHash: password ? await argon2.hash(password) : user.passwordHash
  })
  if (name) {
    while (
      await em.findOne(User, {
        name: user.name,
        tag: user.tag,
        email: { $ne: user.email }
      })
    ) {
      user.tag = tagGenerator()
    }
  }
  await em.persistAndFlush(user)
  liveQueryStore.invalidate(`User:${user.id}`)
  return user
}
