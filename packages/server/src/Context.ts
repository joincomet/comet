import DataLoader from 'dataloader'
import { User } from '@/user/User.Entity'
import { Comment } from '@/comment/Comment.Entity'
import { Post } from '@/post/Post.Entity'

export interface Context {
  req: any
  res: any
  userId: number
  userLoader: DataLoader<number, User>
  postLoader: DataLoader<number, Post>
  commentLoader: DataLoader<number, Comment>
}
