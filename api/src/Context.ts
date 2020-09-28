import DataLoader from 'dataloader'
import { User } from '@/entities/User'
import { Comment } from '@/entities/Comment'
import { Post } from '@/entities/Post'

export interface Context {
  req: any
  res: any
  userId36: string
  userId: number
  userLoader: DataLoader<number, User>
  postLoader: DataLoader<number, Post>
  commentLoader: DataLoader<number, Comment>
}
