import { Post } from '@/entities/Post'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { User } from '@/entities/User'
import { Repository } from 'typeorm'
import { Comment } from '@/entities/Comment'
import { PostRocket } from '@/entities/relations/PostRocket'
import { CommentRocket } from '@/entities/relations/CommentRocket'
import { Notification } from '@/entities/Notification'
import { Planet } from '@/entities/Planet'

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
