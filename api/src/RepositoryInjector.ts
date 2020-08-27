import { Post } from './entities/Post'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { User } from './entities/User'
import { Repository, TreeRepository } from 'typeorm'
import { Comment } from './entities/Comment'
import { PostEndorsement } from './entities/PostEndorsement'
import { CommentEndorsement } from './entities/CommentEndorsement'
import { PostView } from './entities/PostView'
import { ReplyNotification } from './entities/ReplyNotification'
import { Planet } from './entities/Planet'
import { Galaxy } from './entities/Galaxy'

export class RepositoryInjector {
  @InjectRepository(User) readonly userRepository: Repository<User>

  @InjectRepository(Post) readonly postRepository: Repository<Post>
  @InjectRepository(PostView) readonly postViewRepository: Repository<PostView>
  @InjectRepository(PostEndorsement)
  readonly postEndorsementRepository: Repository<PostEndorsement>

  @InjectRepository(Comment) readonly commentRepository: TreeRepository<Comment>
  @InjectRepository(CommentEndorsement)
  readonly commentEndorsementRepository: Repository<CommentEndorsement>
  @InjectRepository(ReplyNotification)
  readonly replyNotifRepository: Repository<ReplyNotification>

  @InjectRepository(Planet) readonly planetRepository: Repository<Planet>
  @InjectRepository(Galaxy) readonly galaxyRepository: Repository<Galaxy>
}
