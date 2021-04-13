import { Authorized, Ctx, Resolver, Root, Subscription } from 'type-graphql'
import { SubscriptionTopic } from '@/types'
import { joinedServerFilter } from '@/util/joinedServerFilter'
import { Post } from '@/entity'
import { PostServerPayload } from '@/resolver/post/subscriptions'
import { PostDeletedResponse } from '@/resolver/post/subscriptions/PostDeletedResponse'

@Resolver()
export class PostSubscriptions {
  @Authorized()
  @Subscription(() => Post, {
    topics: SubscriptionTopic.PostCreated,
    filter: joinedServerFilter
  })
  async postCreated(
    @Ctx() { em, user },
    @Root() { postId }: { postId: string }
  ): Promise<Post> {
    const post = await em.findOneOrFail(Post, postId, [
      'author',
      'server',
      'votes'
    ])
    post.isVoted = post.votes
      .getItems()
      .map(vote => vote.user)
      .includes(user)
    return post
  }

  @Authorized()
  @Subscription(() => Post, {
    topics: SubscriptionTopic.PostUpdated,
    filter: joinedServerFilter
  })
  async postUpdated(
    @Ctx() { em, user },
    @Root() { postId }: PostServerPayload
  ): Promise<Post> {
    const post = await em.findOneOrFail(Post, postId, [
      'author',
      'server',
      'votes'
    ])
    post.isVoted = post.votes
      .getItems()
      .map(vote => vote.user)
      .includes(user)
    return post
  }

  @Authorized()
  @Subscription(() => PostDeletedResponse, {
    topics: SubscriptionTopic.PostDeleted,
    filter: joinedServerFilter
  })
  postDeleted(
    @Root() { postId, serverId }: PostServerPayload
  ): PostDeletedResponse {
    return { postId, serverId }
  }
}
