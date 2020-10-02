import { Arg, Authorized, ID, Mutation } from 'type-graphql'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { User } from '@/entities/User'
import { Repository } from 'typeorm'
import { Post } from '@/entities/Post'

export class AdminResolver {
  @InjectRepository(User) readonly userRepository: Repository<User>
  @InjectRepository(Post) readonly postRepository: Repository<Post>

  @Authorized('ADMIN')
  @Mutation(() => Boolean)
  async banUser(
    @Arg('bannedId', () => ID) bannedId: number,
    @Arg('banReason') banReason: string
  ) {
    await this.userRepository.update(bannedId, { banned: true, banReason })

    return true
  }

  @Authorized('ADMIN')
  @Mutation(() => Boolean)
  async banAndPurgeUser(
    @Arg('bannedId', () => ID) bannedId: number,
    @Arg('banReason') banReason: string
  ) {
    await this.userRepository.update(bannedId, { banned: true, banReason })

    await this.postRepository.update(
      { authorId: bannedId },
      { removed: true, removedReason: banReason }
    )

    return true
  }

  @Authorized('ADMIN')
  @Mutation(() => Boolean)
  async unbanUser(@Arg('bannedId', () => ID) bannedId: number) {
    await this.userRepository.update(bannedId, {
      banned: false,
      banReason: null
    })

    return true
  }
}
