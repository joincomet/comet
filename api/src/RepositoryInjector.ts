import { Post } from '@/post/Post.Entity'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { User } from '@/user/User.Entity'
import { Repository } from 'typeorm'
import { Comment } from '@/comment/Comment.Entity'
import { PostRocket } from '@/post/PostRocket.Entity'
import { CommentRocket } from '@/comment/CommentRocket.Entity'
import { Notification } from '@/notification/Notification.Entity'
import { Planet } from '@/planet/Planet.Entity'

export class RepositoryInjector {
  @InjectRepository(User) readonly userRepository: Repository<User>

  @InjectRepository(Post) readonly postRepository: Repository<Post>
  @InjectRepository(PostRocket)
  readonly postUpvoteRepository: Repository<PostRocket>

  @InjectRepository(Comment) readonly commentRepository: Repository<Comment>
  @InjectRepository(CommentRocket)
  readonly commentUpvoteRepository: Repository<CommentRocket>
  @InjectRepository(Notification)
  readonly notificationRepository: Repository<Notification>

  @InjectRepository(Planet) readonly planetRepository: Repository<Planet>
}
