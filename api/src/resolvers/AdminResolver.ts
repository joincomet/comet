import { RepositoryInjector } from '@/RepositoryInjector'
import { Arg, Authorized, ID, Mutation } from 'type-graphql'

export class AdminResolver extends RepositoryInjector {
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
