import DataLoader from 'dataloader'
import { getRepository } from 'typeorm'
import { User } from '@/entities/User'
import { Comment } from '@/entities/Comment'
import { Post } from '@/entities/Post'
import { Community } from '@/entities/Community'
import { CommunityJoin } from '@/entities/relations/CommunityJoin'
import { PostUpvote } from '@/entities/relations/PostUpvote'
import { CommentUpvote } from '@/entities/relations/CommentUpvote'

export const UserLoader = new DataLoader(async (keys: number[]) => {
  const entities = await getRepository(User)
    .createQueryBuilder('user')
    .whereInIds(keys)
    .getMany()

  const entityMap: any = {}
  entities.forEach(entity => {
    entityMap[entity.id] = entity
  })

  return keys.map((key: number) => entityMap[key])
})

export const CommentLoader = new DataLoader(async (keys: number[]) => {
  const entities = await getRepository(Comment)
    .createQueryBuilder('comment')
    .whereInIds(keys)
    .getMany()

  const entityMap: any = {}
  entities.forEach(entity => {
    entityMap[entity.id] = entity
  })

  return keys.map((key: number) => entityMap[key])
})

export const PostLoader = new DataLoader(async (keys: number[]) => {
  const entities = await getRepository(Post)
    .createQueryBuilder('post')
    .whereInIds(keys)
    .leftJoinAndSelect('post.community', 'community')
    .getMany()

  const entityMap: any = {}
  entities.forEach(entity => {
    entityMap[entity.id] = entity
  })

  return keys.map((key: number) => entityMap[key])
})

export const JoinedLoader = new DataLoader(
  async (keys: { userId: number; communityId: number }[]) => {
    const entities = await getRepository(CommunityJoin)
      .createQueryBuilder('join')
      .andWhere('join.communityId = ANY(:communities)', {
        communities: keys.map(k => k.communityId)
      })
      .andWhere('join.userId = ANY(:users)', {
        users: keys.map(k => k.userId)
      })
      .getMany()

    return keys.map(
      (key: { userId: number; communityId: number }) =>
        !!entities.find(
          k => k.userId === key.userId && k.communityId === key.communityId
        )
    )
  }
)

export const PostUpvoteLoader = new DataLoader(
  async (keys: { userId: number; postId: number }[]) => {
    const entities = await getRepository(PostUpvote)
      .createQueryBuilder('upvote')
      .andWhere('upvote.postId = ANY(:posts)', {
        posts: keys.map(k => k.postId)
      })
      .andWhere('upvote.userId = ANY(:users)', {
        users: keys.map(k => k.userId)
      })
      .getMany()

    return keys.map(
      (key: { userId: number; postId: number }) =>
        !!entities.find(k => k.userId === key.userId && k.postId === key.postId)
    )
  }
)

export const CommentUpvoteLoader = new DataLoader(
  async (keys: { userId: number; commentId: number }[]) => {
    const entities = await getRepository(CommentUpvote)
      .createQueryBuilder('upvote')
      .andWhere('upvote.commentId = ANY(:comments)', {
        comments: keys.map(k => k.commentId)
      })
      .andWhere('upvote.userId = ANY(:users)', {
        users: keys.map(k => k.userId)
      })
      .getMany()

    return keys.map(
      (key: { userId: number; commentId: number }) =>
        !!entities.find(
          k => k.userId === key.userId && k.commentId === key.commentId
        )
    )
  }
)
