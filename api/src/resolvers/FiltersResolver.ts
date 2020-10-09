import { Ctx, Query, Resolver } from 'type-graphql'
import { Context } from '@/Context'
import { User } from '@/entities/User'
import { Community } from '@/entities/Community'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'

@Resolver()
export class FiltersResolver {
  @InjectRepository(User) readonly userRepository: Repository<User>

  @Query(() => [Community])
  async mutedCommunities(@Ctx() { userId }: Context) {
    if (!userId) return []

    const communities = await this.userRepository
      .createQueryBuilder()
      .relation(User, 'mutedCommunities')
      .of(userId)
      .loadMany()

    communities.forEach(community => (community.muted = true))

    return communities
  }

  @Query(() => [User])
  async blockedUsers(@Ctx() { userId }: Context) {
    if (!userId) return []

    const blockedUsers = await this.userRepository
      .createQueryBuilder()
      .relation(User, 'blockedUsers')
      .of(userId)
      .loadMany()

    if (blockedUsers.length === 0) return []

    const blockedUsersIds = blockedUsers.map(u => u.id)

    return this.userRepository
      .createQueryBuilder('user')
      .whereInIds(blockedUsersIds)
      .andWhere('user.banned = false')
      .getMany()
  }
}
