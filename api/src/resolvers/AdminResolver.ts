import { RepositoryInjector } from '../RepositoryInjector'
import { Arg, Ctx, ID, Mutation, UseMiddleware } from 'type-graphql'
import { RequiresAdmin } from '../middleware/RequiresAdmin'
import { Context } from '../Context'

export class AdminResolver extends RepositoryInjector {
  @UseMiddleware(RequiresAdmin)
  @Mutation(() => Boolean)
  async banUser(
    @Arg('bannedId', () => ID) bannedId: string,
    @Arg('banReason') banReason: string,
    @Ctx() { userId }: Context
  ) {
    await this.userRepository.update(bannedId, { banned: true, banReason })

    return true
  }

  @UseMiddleware(RequiresAdmin)
  @Mutation(() => Boolean)
  async banAndPurgeUser(
    @Arg('bannedId', () => ID) bannedId: string,
    @Arg('banReason') banReason: string,
    @Ctx() { userId }: Context
  ) {
    await this.userRepository.update(bannedId, { banned: true, banReason })

    await this.postRepository.update(
      { authorId: bannedId },
      { removed: true, removedReason: banReason }
    )

    return true
  }

  @UseMiddleware(RequiresAdmin)
  @Mutation(() => Boolean)
  async unbanUser(
    @Arg('bannedId', () => ID) bannedId: string,
    @Ctx() { userId }: Context
  ) {
    await this.userRepository.update(bannedId, {
      banned: false,
      banReason: null
    })

    return true
  }
}
