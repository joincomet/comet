import { Arg, Authorized, ID, Mutation } from 'type-graphql'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { User } from '@/user/User.Entity'
import { Repository } from 'typeorm'
import { Post } from '@/post/Post.Entity'
import { Comment } from '@/comment/Comment.Entity'
import { Notification } from '@/notification/Notification.Entity'

export class AdminResolver {
  @InjectRepository(User) readonly userRepo: Repository<User>
  @InjectRepository(Post) readonly postRepo: Repository<Post>
  @InjectRepository(Comment) readonly commentRepo: Repository<Comment>
  @InjectRepository(Notification)
  readonly notificationRepo: Repository<Notification>

  @Authorized('ADMIN')
  @Mutation(() => Boolean)
  async banUser(
    @Arg('bannedId', () => ID) bannedId: number,
    @Arg('reason') reason: string
  ) {
    await this.userRepo.update(bannedId, { banned: true, banReason: reason })

    return true
  }

  @Authorized('ADMIN')
  @Mutation(() => Boolean)
  async banAndPurgeUser(
    @Arg('bannedId', () => ID) bannedId: number,
    @Arg('reason') reason: string
  ) {
    await this.userRepo.update(bannedId, {
      banned: true,
      banReason: reason,
      postCount: 0,
      commentCount: 0
    })

    await this.postRepo.update(
      { authorId: bannedId },
      {
        removed: true,
        removedReason: reason,
        pinned: false,
        pinnedByAuthor: false
      }
    )

    await this.commentRepo.update(
      { authorId: bannedId },
      { removed: true, removedReason: reason, pinned: false }
    )

    await this.notificationRepo.delete({ fromUserId: bannedId })

    return true
  }

  @Authorized('ADMIN')
  @Mutation(() => Boolean)
  async unbanUser(@Arg('bannedId', () => ID) bannedId: number) {
    await this.userRepo.update(bannedId, {
      banned: false,
      banReason: null
    })

    return true
  }
}
