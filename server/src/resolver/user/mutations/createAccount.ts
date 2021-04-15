import { Field, InputType } from 'type-graphql'
import { IsEmail, Length } from 'class-validator'
import { Context } from '@/types'
import { LoginResponse } from '@/resolver/user'
import isEmail from 'validator/lib/isEmail'
import { CustomError } from '@/types/CustomError'
import { Folder, FolderVisibility, Server, ServerUser, User } from '@/entity'
import { createAccessToken, handleUnderscore, tagGenerator } from '@/util'
import * as argon2 from 'argon2'
import { ServerUserStatus } from '@/entity/server/ServerUserStatus'

@InputType()
export class CreateAccountInput {
  @Field()
  @Length(2, 32)
  name: string

  @Field()
  @IsEmail()
  email: string

  @Field()
  @Length(6)
  password: string
}

export async function createAccount(
  { em }: Context,
  { name, email, password }: CreateAccountInput
): Promise<LoginResponse> {
  email = email.toLowerCase()
  if (!isEmail(email)) throw new Error('error.login.invalidEmail')

  name = name
    .replace(/ +(?= )/g, '') // remove repeated spaces
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // remove zero-width characters
    .trim() // remove leading and trailing whitespace
  if (name.length < 2 || name.length > 32)
    throw new Error('error.login.nameLength')

  const bannedSubstrings = ['@', '#', ':', '```']

  for (const s of bannedSubstrings) {
    if (name.includes(s)) throw new CustomError('error.login.illegalName', s)
  }

  const foundUser = await em.findOne(User, {
    email: handleUnderscore(email)
  })
  if (foundUser) throw new Error('error.login.emailInUse')

  const passwordHash = await argon2.hash(password)

  let tag = tagGenerator()

  while (
    await em.findOne(User, {
      $and: [{ name: { $ilike: handleUnderscore(name) } }, { tag }]
    })
  ) {
    tag = tagGenerator()
  }

  const user = em.create(User, {
    name,
    tag,
    passwordHash,
    lastLoginAt: new Date(),
    email
  })

  const favoritesFolder = em.create(Folder, {
    name: 'Favorites',
    owner: user,
    visibility: FolderVisibility.Private
  })

  const readLaterFolder = em.create(Folder, {
    name: 'Read Later',
    owner: user,
    visibility: FolderVisibility.Private
  })

  const cometServer = await em.findOne(Server, { name: 'Comet' })
  const join = await em.create(ServerUser, {
    user,
    server: cometServer,
    status: ServerUserStatus.Joined
  })

  await em.persistAndFlush([user, favoritesFolder, readLaterFolder, join])
  user.username = `${user.name}#${user.tag}`
  const accessToken = createAccessToken(user)
  return {
    accessToken,
    user
  } as LoginResponse
}
