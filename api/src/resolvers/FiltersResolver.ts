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

    communities.forEach((community) => (community.muted = true))

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

    const blockedUsersIds = blockedUsers.map((u) => u.id)

    const users = await this.userRepository
      .createQueryBuilder('user')
      .whereInIds(blockedUsersIds)
      .andWhere('user.banned = false')
      .loadRelationCountAndMap('user.followerCount', 'user.followers')
      .loadRelationCountAndMap('user.followingCount', 'user.following')
      .loadRelationCountAndMap(
        'user.commentCount',
        'user.comments',
        'comment',
        (qb) => {
          return qb
            .andWhere('comment.deleted = false')
            .andWhere('comment.removed = false')
        }
      )
      .loadRelationCountAndMap('user.postCount', 'user.posts', 'post', (qb) => {
        return qb
          .andWhere('post.deleted = false')
          .andWhere('post.removed = false')
      })
      .getMany()

    users.forEach((user) => (user.isBlocking = true))

    return users
  }
}
