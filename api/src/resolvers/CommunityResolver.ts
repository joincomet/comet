import {
  Arg,
  Args,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver,
  UseMiddleware
} from 'type-graphql'
import { RepositoryInjector } from '@/RepositoryInjector'
import { CreateCommunityArgs } from '@/args/CreateCommunityArgs'
import { Community } from '@/entities/Community'
import { Context } from '@/Context'
import { User } from '@/entities/User'
import { bannedWords } from '@/BannedWords'

@Resolver(() => Community)
export class CommunityResolver extends RepositoryInjector {
  @Authorized()
  @Mutation(() => Boolean)
  async createCommunity(
    @Args() { name, description, tags }: CreateCommunityArgs,
    @Ctx() { userId }: Context
  ) {
    bannedWords.forEach((u) => {
      if (name.toLowerCase().includes(u.toLowerCase())) {
        throw new Error('Inappropriate Community Name')
      }
    })

    if (await this.communityExists(name))
      throw new Error('Community already exists')

    const user = await this.userRepository
      .createQueryBuilder('user')
      .whereInIds(userId)
      .leftJoinAndSelect('user.moderatedCommunities', 'moderatedCommunity')
      .getOne()
    if ((await user.moderatedCommunities).length >= 3)
      throw new Error('Cannot moderate more than 3 communities')

    const tagsToSave = []
    for (const tag of tags) {
      tagsToSave.push(tag)
    }

    await this.communityRepository.save({
      name,
      description,
      tags: tags,
      createdAt: new Date(),
      creatorId: userId,
      moderators: [{ id: userId }],
      users: [{ id: userId }]
    } as Community)

    return true
  }

  @Query(() => Boolean)
  async communityExists(@Arg('name') name: string) {
    const foundCommunity = await this.communityRepository.findOne({
      where: `"name" ILIKE '${name.replace(/_/g, '\\_')}'`
    })
    return !!foundCommunity
  }

  @Query(() => Community, { nullable: true })
  async community(
    @Arg('name', () => ID) name: string,
    @Ctx() { userId }: Context
  ) {
    const qb = this.communityRepository
      .createQueryBuilder('community')
      .andWhere('community.name ILIKE :name', {
        name: name.replace(/_/g, '\\_')
      })
      .loadRelationCountAndMap('community.userCount', 'community.users')
      .leftJoinAndSelect('community.moderators', 'moderator')
      .leftJoinAndSelect('community.galaxy', 'galaxy')

    if (userId) {
      qb.loadRelationCountAndMap(
        'community.personalUserCount',
        'community.users',
        'user',
        (qb) => {
          return qb.andWhere('user.id = :userId', { userId })
        }
      )
    }
    const community = await qb.getOne()
    if (!community) return null
    community.joined = Boolean(community.personalUserCount)
    return community
  }

  @Query(() => [Community])
  async recentCommunities(@Arg('communitys', () => [ID]) communitys: string[]) {
    if (communitys.length === 0) return []
    const qb = this.communityRepository
      .createQueryBuilder('community')
      .andWhere('community.name ILIKE ANY(:communitys)', {
        communitys: communitys.map((p) => p.replace(/_/g, '\\_'))
      })
      .addGroupBy('community.name')
      .addSelect('COUNT(posts.id)', 'community_total')
      .leftJoin(
        'community.posts',
        'posts',
        "posts.deleted = false AND posts.createdAt > NOW() - INTERVAL '1 day'"
      )

    const communities = await qb.getMany()
    communities.forEach((community) => {
      community.postCount = community.total
    })
    return communitys
      .map((name) => communities.find((p) => p.name === name))
      .filter((p) => !!p)
  }

  @UseMiddleware(RequiresAuth)
  @Mutation(() => Boolean)
  async joinCommunity(
    @Arg('community', () => ID) community: string,
    @Ctx() { userId }: Context
  ) {
    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'communities')
      .of(userId)
      .add(community)
    return true
  }

  @UseMiddleware(RequiresAuth)
  @Mutation(() => Boolean)
  async leaveCommunity(
    @Arg('community', () => ID) community: string,
    @Ctx() { userId }: Context
  ) {
    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'communities')
      .of(userId)
      .remove(community)
    return true
  }

  @UseMiddleware(RequiresAuth)
  @Mutation(() => Boolean)
  async muteCommunity(
    @Arg('community', () => ID) community: string,
    @Ctx() { userId }: Context
  ) {
    const foundCommunity = await this.communityRepository
      .createQueryBuilder('community')
      .where('community.name ILIKE :community', {
        community: community.replace(/_/g, '\\_')
      })
      .getOne()

    if (!foundCommunity) throw new Error('Community does not exist')

    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'communities')
      .of(userId)
      .remove(foundCommunity.name)

    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'mutedCommunities')
      .of(userId)
      .add(foundCommunity.name)
    return true
  }

  @UseMiddleware(RequiresAuth)
  @Mutation(() => Boolean)
  async unmuteCommunity(
    @Arg('community', () => ID) community: string,
    @Ctx() { userId }: Context
  ) {
    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'mutedcommunities')
      .of(userId)
      .remove(community)
    return true
  }

  @Query(() => [Community])
  async popularCommunities(
    @Arg('galaxyName', () => ID, { nullable: true }) galaxyName?: string
  ) {
    const qb = await this.communityRepository
      .createQueryBuilder('community')
      .addSelect('COUNT(posts.id)', 'community_total')
      .leftJoin(
        'community.posts',
        'posts',
        "posts.deleted = false AND posts.createdAt > NOW() - INTERVAL '1 day'"
      )
      .groupBy('community.name')
      .orderBy('community_total', 'DESC')
      .take(5)
      .loadRelationCountAndMap('community.userCount', 'community.users')

    if (galaxyName) {
      qb.where('community.galaxy = :galaxyName', { galaxyName })
    }

    const communities = await qb.getMany()

    communities.forEach((community) => (community.postCount = community.total))

    return communities
  }

  @Query(() => [Community])
  async allCommunities(
    @Ctx() { userId }: Context,
    @Arg('galaxyName', () => ID, { nullable: true }) galaxyName: string
  ) {
    const qb = this.communityRepository
      .createQueryBuilder('community')
      .orderBy('community.name', 'ASC')
      .leftJoinAndSelect('community.galaxy', 'galaxy')
      .loadRelationCountAndMap('community.userCount', 'community.users')

    if (galaxyName) qb.andWhere('galaxy.name = :galaxyName', { galaxyName })

    if (userId) {
      qb.loadRelationCountAndMap(
        'community.personalUserCount',
        'community.users',
        'user',
        (qb) => {
          return qb.andWhere('user.id = :userId', { userId })
        }
      )
    }

    const communities = await qb.getMany()

    communities.forEach((community) => {
      community.joined = Boolean(community.personalUserCount)
    })

    return communities
  }

  @Query(() => [Community])
  async searchCommunities(@Arg('search') search: string) {
    if (!search) return []

    return this.communityRepository
      .createQueryBuilder('community')
      .where('community.name ILIKE :name', {
        name: '%' + search.toLowerCase().replace(/ /g, '_') + '%'
      })
      .take(10)
      .getMany()
  }

  @Query(() => [Community])
  async joinedCommunities(@Ctx() { userId }: Context) {
    if (!userId) return []

    let communities = await this.userRepository
      .createQueryBuilder()
      .relation(User, 'communities')
      .of(userId)
      .loadMany()

    if (communities.length === 0) return []

    communities = await this.communityRepository
      .createQueryBuilder('community')
      .whereInIds(communities.map((community) => community.name))
      .addOrderBy('community.name', 'ASC')
      .loadRelationCountAndMap(
        'community.postCount',
        'community.posts',
        'post',
        (qb) => {
          return qb
            .andWhere('post.deleted = false')
            .andWhere('post.removed = false')
            .andWhere("post.createdAt > NOW() - INTERVAL '1 day'")
        }
      )
      .getMany()

    communities.forEach((p) => (p.joined = true))

    return communities
  }
}
