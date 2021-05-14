import { Field, InputType } from 'type-graphql'
import { IsEmail, Length, Matches, MinLength } from 'class-validator'
import { Context } from '@/types'
import { User } from '@/entity'
import { handleUnderscore } from '@/util'
import { GraphQLEmailAddress } from 'graphql-scalars'
import * as argon2 from 'argon2'
import { usernameRegex } from '@/util/text/usernameRegex'

@InputType()
export class UpdateAccountInput {
  @Field({ nullable: true })
  @Length(3, 20)
  @Matches(usernameRegex)
  username?: string

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
  { username, email, password, currentPassword }: UpdateAccountInput
): Promise<User> {
  const user = await em.findOneOrFail(User, userId)
  const match = await argon2.verify(user.passwordHash, currentPassword)
  if (!match) throw new Error('error.login.wrongPassword')
  if (email && email !== user.email) {
    email = email.toLowerCase()
    const foundUser = await em.findOne(User, {
      email: { $ilike: handleUnderscore(email) },
      isDeleted: false
    })
    if (foundUser) throw new Error('error.login.emailInUse')
  }
  if (username && username !== user.username) {
    const foundUser = await em.findOne(User, {
      username: { $ilike: handleUnderscore(username) },
      isDeleted: false
    })
    if (foundUser) throw new Error('error.login.usernameTaken')
  }
  em.assign(user, {
    username: username ?? user.username,
    email: email ?? user.email,
    passwordHash: password ? await argon2.hash(password) : user.passwordHash
  })
  await em.persistAndFlush(user)
  liveQueryStore.invalidate(`User:${user.id}`)
  return user
}
