import {
  Arg,
  Args,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root
} from 'type-graphql'
import { CreateCommunityArgs } from '@/args/CreateCommunityArgs'
import { Community } from '@/entities/Community'
import { Context } from '@/Context'
import { User } from '@/entities/User'
import { bannedWords } from '@/BannedWords'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'
import { CommunitiesArgs } from '@/args/CommunitiesArgs'
import { CommunitySort } from '@/types/community/CommunitySort'
import { CommunityUser } from '@/entities/relations/CommunityUser'

@Resolver(() => Community)
export class CommunityResolver {
  @InjectRepository(Community) readonly communityRepository: Repository<
    Community
  >
  @InjectRepository(User) readonly userRepository: Repository<User>
  @InjectRepository(CommunityUser) readonly userCommunityRepository: Repository<
    CommunityUser
  >

  @Authorized()
  @Mutation(() => Boolean)
  async createCommunity(
    @Args() { name, description, tags }: CreateCommunityArgs,
    @Ctx() { userId }: Context
  ) {
    bannedWords.forEach(u => {
      if (name.toLowerCase().includes(u.toLowerCase())) {
        throw new Error('Inappropriate Community Name')
      }
    })

    const foundCommunity = await this.communityRepository.findOne({
      where: `"name" ILIKE '${name.replace(/_/g, '\\_')}'`
    })

    if (foundCommunity) throw new Error('Community already exists')

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
      creatorId: userId
    })

    return true
  }

  @Query(() => Community, { nullable: true })
  async community(@Arg('name') name: string, @Ctx() { userId }: Context) {
    const qb = this.communityRepository
      .createQueryBuilder('community')
      .andWhere('community.name ILIKE :name', {
        name: name.replace(/_/g, '\\_')
      })
      .loadRelationCountAndMap('community.userCount', 'community.users')
      .leftJoinAndSelect('community.moderators', 'moderator')

    return qb.getOne()
  }

  @Authorized()
  @Mutation(() => Boolean)
  async joinCommunity(@Arg('name') name: string, @Ctx() { userId }: Context) {
    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'communities')
      .of(userId)
      .add(name)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async leaveCommunity(@Arg('name') name: string, @Ctx() { userId }: Context) {
    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'communities')
      .of(userId)
      .remove(name)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async muteCommunity(@Arg('name') name: string, @Ctx() { userId }: Context) {
    const foundCommunity = await this.communityRepository
      .createQueryBuilder('community')
      .where('community.name ILIKE :community', {
        community: name.replace(/_/g, '\\_')
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

  @Authorized()
  @Mutation(() => Boolean)
  async unmuteCommunity(@Arg('name') name: string, @Ctx() { userId }: Context) {
    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'mutedCommunities')
      .of(userId)
      .remove(name)
    return true
  }

  @Query(() => [Community])
  async communities(
    @Args()
    { sort, joined, names, search, tags, page, pageSize }: CommunitiesArgs,
    @Ctx() { userId }: Context
  ) {
    const qb = this.communityRepository
      .createQueryBuilder('community')
      .loadRelationCountAndMap('community.userCount', 'community.users')
      .loadRelationCountAndMap(
        'community.postCount',
        'community.posts',
        'p',
        qb => qb.andWhere('p.deleted = false AND p.removed = false')
      )

    if (sort === CommunitySort.NEW) {
      qb.addOrderBy('community.createdAt', 'DESC')
    } else if (sort === CommunitySort.TOP) {
      qb.addSelect('COUNT(join.userId)', 'community_total')
        .leftJoin('community.users', 'join')
        .addGroupBy('community.id')
        .addOrderBy('community_total', 'DESC')
    } else if (sort === CommunitySort.TRENDING) {
      qb.addSelect('COUNT(join.userId)', 'community_total')
        .leftJoin(
          'community.users',
          'join',
          "join.createdAt > NOW() - INTERVAL '1 day'"
        )
        .addGroupBy('community.id')
        .addOrderBy('community_total', 'DESC')
    }

    qb.addOrderBy('community.name', 'ASC')

    if (userId && joined) {
      const sub = await this.userCommunityRepository
        .createQueryBuilder('join')
        .where(`join.userId = ${userId}`)
        .select('"join"."community_id"')
      qb.andWhere(`community.id = ANY((${sub.getQuery()}))`)
    }

    return qb
      .skip(page * pageSize)
      .take(pageSize)
      .getMany()
  }

  @FieldResolver()
  async joined(
    @Root() community: Community,
    @Ctx() { joinedLoader, userId }: Context
  ) {
    if (!userId) return false
    return joinedLoader.load({ userId, communityId: community.id })
  }
}
