import DataLoader from 'dataloader'
import { User } from '@/user/User.Entity'
import { Comment } from '@/comment/Comment.Entity'
import { Post } from '@/post/Post.Entity'

export interface Context {
  req: any
  res: any
  userId36: string
  userId: number
  userLoader: DataLoader<number, User>
  postLoader: DataLoader<number, Post>
  commentLoader: DataLoader<number, Comment>
  userJoinedPlanetLoader: DataLoader<
    { userId: number; planetId: number },
    boolean
  >
  postRocketLoader: DataLoader<{ userId: number; postId: number }, -1 | 0 | 1>
  commentRocketLoader: DataLoader<
    { userId: number; commentId: number },
    -1 | 0 | 1
  >
}
