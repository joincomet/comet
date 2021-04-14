import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  Publisher,
  PubSub,
  Resolver
} from 'type-graphql'
import { Post } from '@/entity'
import { Context } from '@/types'
import { createPost, CreatePostInput } from '@/resolver/post/mutations'
import { ChangePayload, SubscriptionTopic } from '@/subscriptions'
import {
  UpdatePostInput,
  updatePost
} from '@/resolver/post/mutations/updatePost'

@Resolver()
export class PostMutations {
  @Authorized()
  @Mutation(() => Post)
  async createPost(
    @Ctx() ctx: Context,
    @Arg('input')
    input: CreatePostInput,
    @PubSub(SubscriptionTopic.PostChanged)
    notifyPostChanged: Publisher<ChangePayload>
  ): Promise<Post> {
    return createPost(ctx, input, notifyPostChanged)
  }

  @Authorized()
  @Mutation(() => Post)
  async updatePost(
    @Ctx() ctx: Context,
    @Arg('input')
    input: UpdatePostInput,
    @PubSub(SubscriptionTopic.PostChanged)
    notifyPostChanged: Publisher<ChangePayload>
  ): Promise<Post> {
    return updatePost(ctx, input, notifyPostChanged)
  }
}
