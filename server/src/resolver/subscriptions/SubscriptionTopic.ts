export enum SubscriptionTopic {
  /**
   * Message created, edited, deleted
   * @payload { messageId }
   * @response { added: Message, updated: Message, deleted: Message }
   */
  MessageChanged = 'MessageChanged',

  /**
   * Post created, edited, deleted
   * @payload { postId }
   * @response { added: Post, updated: Post, deleted: Post }
   */
  PostChanged = 'PostChanged',

  /**
   * Comment created, edited, deleted
   * @payload { commentId }
   * @response { added: Comment, updated: Comment, deleted: Comment }
   */
  CommentChanged = 'CommentChanged',

  /**
   * Reply received, marked read, deleted
   * @payload { replyId }
   * @response { added: Reply[], updated: Reply[], deleted: Reply[] }
   */
  ReplyChanged = 'ReplyChanged',

  /**
   * User started typing
   * @args { channelId?, groupId?, userId? }
   * @payload { username, channelId?, groupId?, userId? }
   * @response username: string
   */
  TypingUpdated = 'TypingUpdated'
}
