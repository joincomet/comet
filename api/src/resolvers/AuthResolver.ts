import { Arg, Args, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { LoginResponse } from '../responses/LoginResponse'
import { LoginArgs } from '../args/LoginArgs'
import { Context } from '../Context'
import { User } from '../entities/User'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { createAccessToken } from '../auth'
import * as argon2 from 'argon2'
import { RequiresAuth } from '../middleware/RequiresAuth'
import { randomAvataaarUrl } from '../avataaars/randomAvataaar'
import { SignUpArgs } from '../args/SignUpArgs'
import { bannedWords } from '../bannedWords'

@Resolver()
export class AuthResolver {
  @InjectRepository(User) readonly userRepository: Repository<User>

  @Mutation(() => LoginResponse)
  async signUp(@Args() { username, password, email }: SignUpArgs) {
    if (
      username.toLowerCase() === 'null' ||
      username.toLowerCase() === 'undefined'
    )
      throw new Error('Invalid username')

    bannedWords.forEach((u) => {
      if (username.toLowerCase().includes(u.toLowerCase())) {
        throw new Error('Inappropiate Username')
      }
    })

    const foundUser = await this.userRepository.findOne({
      where: `"username" ILIKE '${username.replace(/_/g, '\\_')}'`
    })
    if (foundUser) throw new Error('Username taken')

    const passwordHash = await argon2.hash(password)

    const user = await this.userRepository.save({
      username,
      email,
      passwordHash,
      bio: 'New Comet user',
      createdAt: new Date(),
      lastLogin: new Date(),
      profilePicUrl: randomAvataaarUrl()
    } as User)

    return {
      accessToken: createAccessToken(user),
      user
    } as LoginResponse
  }

  @Mutation(() => LoginResponse)
  async login(@Args() { username, password }: LoginArgs) {
    const user = await this.userRepository.findOne({
      where: `"username" ILIKE '${username.replace(/_/g, '\\_')}'`
    })
    if (!user) throw new Error('Invalid Login')

    if (user.banned) throw new Error('Banned: ' + user.banReason)

    await this.userRepository
      .createQueryBuilder()
      .update()
      .set({ lastLogin: new Date() })
      .where('username = :username', { username })
      .execute()

    const match = await argon2.verify(user.passwordHash, password)

    if (!match) throw new Error('Invalid Login')

    return {
      accessToken: createAccessToken(user),
      user
    } as LoginResponse
  }

  @Mutation(() => LoginResponse)
  @UseMiddleware(RequiresAuth)
  async changePassword(
    @Arg('oldPassword') oldPassword: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() { userId }: Context
  ) {
    const user = await this.userRepository.findOne(userId)
    const match = await argon2.verify(user.passwordHash, oldPassword)

    if (!match) throw new Error('Current password incorrect!')

    await this.userRepository
      .createQueryBuilder()
      .update()
      .set({ passwordHash: await argon2.hash(newPassword) })
      .where('id = :userId', { userId })
      .execute()

    return {
      accessToken: createAccessToken(user),
      user
    } as LoginResponse
  }
}
