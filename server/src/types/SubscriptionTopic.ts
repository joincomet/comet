export enum SubscriptionTopic {
  /**
   * Message sent
   * @payload MessagePayload
   * @response MessageResponse
   */
  MessageSent = 'MessageSent',

  /**
   * Message edited or link embeds updated
   * @payload MessagePayload
   * @response MessageResponse
   */
  MessageUpdated = 'MessageUpdated',

  /**
   * Message deleted
   * @payload MessagePayload
   * @response MessageDeletedResponse
   */
  MessageDeleted = 'MessageDeleted',

  /**
   * User started typing
   * @payload TypingPayload
   * @response username: string
   */
  UserStartedTyping = 'UserStartedTyping',

  /**
   * Friend status changed
   * @payload { userId: string, friendId: string, status: FriendStatus }
   * @response Relationship
   */
  RelationshipUpdated = 'RelationshipUpdated',

  /**
   * Banned globally
   * @payload { userId: string }
   * @response boolean
   */
  UserBannedGlobal = 'UserBannedGlobal',

  /**
   * Account edited (name, avatar, online status, etc)
   * @payload { userId: string }
   * @response User
   */
  UserUpdated = 'UserUpdated',

  /**
   * Post created
   * @payload { postId: string, serverId: string }
   * @response Post
   */
  PostCreated = 'PostCreated',

  /**
   * Post edited
   * @payload { postId: string }
   * @response Post
   */
  PostUpdated = 'PostUpdated',

  /**
   * Post deleted
   * @payload { postId: string }
   * @response postId: string
   */
  PostDeleted = 'PostDeleted',

  /**
   * Comment created
   * @payload { commentId: string, postId: string }
   * @response { comment: Comment, postId: string }
   */
  CommentCreated = 'CommentCreated',

  /**
   * Comment edited
   * @payload { commentId: string }
   * @response Comment
   */
  CommentUpdated = 'CommentUpdated',

  /**
   * Comment deleted
   * @payload { commentId: string, postId: string }
   * @response { commentId: string, postId: string }
   */
  CommentDeleted = 'CommentDeleted',

  /**
   * Received comment reply to post or comment
   * @payload { userId: string, replyId: string}
   * @response Reply
   */
  ReplyReceived = 'ReplyReceived',

  /**
   * Marked single reply as read
   * @payload { userId: string, replyId: string }
   * @response Reply
   */
  ReplyRead = 'ReplyRead',

  /**
   * Marked all replies as read
   * @payload { userId: string }
   * @response boolean
   */
  AllRepliesRead = 'AllRepliesRead',

  /**
   * Servers joined, left, reordered
   * @payload { userId: string }
   * @response Server
   */
  ServersUpdated = 'ServersUpdated',

  /**
   * Server edited, roles changed, channels changed, folders changed
   * @payload { serverId: string }
   * @response Server[]
   */
  ServerUpdated = 'ServerUpdated',

  /**
   * Channel edited, marked read
   * @payload { channelId: string }
   * @response Channel
   */
  ChannelUpdated = 'ChannelUpdated',

  /**
   * Folder edited
   * @payload { folderId: string }
   * @response Folder
   */
  FolderUpdated = 'FolderUpdated',

  /**
   * Post added to folder
   * @payload { postId: string, folderId: string }
   * @response { post: Post, folderId: string }
   */
  PostAddedToFolder = 'PostAddedToFolder',

  /**
   * Post removed from folder
   * @payload { postId: string, folderId: string }
   * @response { postId: string, folderId: string }
   */
  PostRemovedFromFolder = 'PostRemovedFromFolder',

  /**
   * Group edited, user left/joined, marked read
   * @payload { groupId: string }
   * @response Group
   */
  GroupUpdated = 'GroupUpdated',

  /**
   * Joined/left group
   * @payload { userId: string }
   * @response Group
   */
  GroupsUpdated = 'GroupsUpdated'
}
