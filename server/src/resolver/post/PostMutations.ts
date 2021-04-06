import { Arg, Args, Ctx, ID, Mutation, Resolver } from 'type-graphql'
import { Post, PostVote, Server } from '@/entity'
import { CreatePostArgs } from '@/resolver/post'
import { Context, ServerPermission } from '@/types'
import {
  CheckPostAuthor,
  CheckPostServerPermission,
  CheckServerPermission,
  handleText,
  scrapeMetadata,
  uploadImage,
  uploadImageSingle
} from '@/util'

@Resolver()
export class PostMutations {
  @CheckServerPermission(ServerPermission.CreatePost)
  @Mutation(() => Post, {
    description:
      'Create a post in a server (requires ServerPermission.CreatePost)'
  })
  async createPost(
    @Args()
    { title, linkUrl, text, serverId, images }: CreatePostArgs,
    @Ctx() { user, em }: Context
  ): Promise<Post> {
    if (text) {
      text = handleText(text)
      if (!text) text = null
    }

    const server = await em.findOne(Server, serverId)

    const imageUrls = []

    if (images && images.length > 0) {
      for (const image of images) {
        const imageUrl = await uploadImageSingle(image)
        imageUrls.push(imageUrl)
      }
    }

    const post = em.create(Post, {
      title,
      linkUrl,
      author: user,
      server,
      linkMetadata: linkUrl ? await scrapeMetadata(linkUrl) : null,
      imageUrls,
      text: text
    })

    await em.persistAndFlush(post)

    await this.votePost({ user, em }, post.id)
    post.isVoted = true
    post.voteCount = 1

    return post
  }

  @CheckPostAuthor()
  @Mutation(() => Post, {
    description: 'Edit a post (must be author)'
  })
  async editPost(
    @Arg('postId', () => ID, { description: 'ID of post to edit' })
    postId: string,
    @Arg('text') text: string,
    @Ctx() { user, em }: Context
  ): Promise<Post> {
    const post = await em.findOne(Post, postId)

    text = handleText(text)
    if (!text) text = null

    post.text = text
    post.editedAt = new Date()

    await em.persistAndFlush(post)

    return post
  }

  @CheckPostAuthor()
  @Mutation(() => Boolean, {
    description: 'Delete a post (must be author)'
  })
  async deletePost(
    @Arg('postId', () => ID) postId: string,
    @Ctx() { user, em }: Context
  ): Promise<boolean> {
    const post = await em.findOne(Post, postId)
    post.isDeleted = true
    post.isPinned = false
    await em.persistAndFlush(post)
    return true
  }

  @CheckPostServerPermission(ServerPermission.VotePost)
  @Mutation(() => Post, { description: 'Add vote to post' })
  async votePost(
    @Ctx() { user, em }: Context,
    @Arg('postId', () => ID, {
      description: 'ID of post to vote (requires ServerPermission.VotePost)'
    })
    postId: string
  ): Promise<Post> {
    const post = await em.findOneOrFail(Post, postId)
    let vote = await em.findOne(PostVote, { user, post })
    if (vote) throw new Error('error.post.alreadyVoted')
    vote = em.create(PostVote, { user, post })
    post.voteCount++
    post.isVoted = true
    await em.persistAndFlush([post, vote])
    return post
  }

  @CheckPostServerPermission(ServerPermission.VotePost)
  @Mutation(() => Post, { description: 'Remove vote from post' })
  async unvotePost(
    @Ctx() { user, em }: Context,
    @Arg('postId', () => ID, {
      description:
        'ID of post to remove vote (requires ServerPermission.VotePost)'
    })
    postId: string
  ): Promise<Post> {
    const post = await em.findOneOrFail(Post, postId)
    const vote = await em.findOneOrFail(PostVote, { user, post })
    post.voteCount--
    post.isVoted = false
    await em.remove(vote).persistAndFlush([post])
    return post
  }

  @CheckPostServerPermission(ServerPermission.ManagePosts)
  @Mutation(() => Post, {
    description: 'Pin a post (requires ServerPermission.PinPosts)'
  })
  async pinPost(
    @Arg('postId', () => ID, { description: 'ID of post to pin' })
    postId: string,
    @Ctx() { em }: Context
  ): Promise<Post> {
    const post = await em.findOne(Post, postId)
    if (post.isPinned) throw new Error('error.post.alreadyPinned')
    post.isPinned = true
    await em.persistAndFlush(post)
    return post
  }

  @CheckPostServerPermission(ServerPermission.ManagePosts)
  @Mutation(() => Post, {
    description: 'Unpin a post (requires ServerPermission.PinPosts)'
  })
  async unpinPost(
    @Arg('postId', () => ID, { description: 'ID of post to unpin' })
    postId: string,
    @Ctx() { em }: Context
  ): Promise<Post> {
    const post = await em.findOne(Post, postId)
    if (!post.isPinned) throw new Error('error.post.notPinned')
    post.isPinned = false
    await em.persistAndFlush(post)
    return post
  }
}
