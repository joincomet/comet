import { Post } from '@/entities/Post'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { User } from '@/entities/User'
import { Repository } from 'typeorm'
import { Comment } from '@/entities/Comment'
import { PostUpvote } from '@/entities/relations/PostUpvote'
import { CommentUpvote } from '@/entities/relations/CommentUpvote'
import { Notification } from '@/entities/Notification'
import { Community } from '@/entities/Community'

export class RepositoryInjector {
  @InjectRepository(User) readonly userRepository: Repository<User>

  @InjectRepository(Post) readonly postRepository: Repository<Post>
  @InjectRepository(PostUpvote)
  readonly postUpvoteRepository: Repository<PostUpvote>

  @InjectRepository(Comment) readonly commentRepository: Repository<Comment>
  @InjectRepository(CommentUpvote)
  readonly commentUpvoteRepository: Repository<CommentUpvote>
  @InjectRepository(Notification)
  readonly notificationRepository: Repository<Notification>

  @InjectRepository(Community) readonly communityRepository: Repository<
    Community
  >
}
