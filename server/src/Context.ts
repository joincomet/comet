import DataLoader from 'dataloader'
import { User } from '@/user/User.entity'
import { Comment } from '@/comment/Comment.Entity'
import { Post } from '@/post/Post.entity'
import { EntityManager } from '@mikro-orm/postgresql'
import { Request, Response } from 'express'

export interface Context {
  em: EntityManager
  req: Request
  res: Response
  userId: bigint
  userLoader: DataLoader<bigint, User>
  postLoader: DataLoader<bigint, Post>
  commentLoader: DataLoader<bigint, Comment>
}
