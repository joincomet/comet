import { Arg, Authorized, ID, Mutation } from 'type-graphql'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { User } from '@/user/User.Entity'
import { Repository } from 'typeorm'
import { Post } from '@/post/Post.Entity'

export class AdminResolver {
  @InjectRepository(User) readonly userRepo: Repository<User>
  @InjectRepository(Post) readonly postRepo: Repository<Post>

  @Authorized('ADMIN')
  @Mutation(() => Boolean)
  async banUser(
    @Arg('bannedId', () => ID) bannedId: number,
    @Arg('banReason') banReason: string
  ) {
    await this.userRepo.update(bannedId, { banned: true, banReason })

    return true
  }

  @Authorized('ADMIN')
  @Mutation(() => Boolean)
  async banAndPurgeUser(
    @Arg('bannedId', () => ID) bannedId: number,
    @Arg('banReason') banReason: string
  ) {
    await this.userRepo.update(bannedId, { banned: true, banReason })

    await this.postRepo.update(
      { authorId: bannedId },
      { removed: true, removedReason: banReason }
    )

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
