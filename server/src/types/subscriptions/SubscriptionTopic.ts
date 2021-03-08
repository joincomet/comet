export enum SubscriptionTopic {
  MessageCreated = 'MESSAGE_CREATED',
  MessageUpdated = 'MESSAGE_UPDATED',
  MessageDeleted = 'MESSAGE_DELETED',
  MessageMentioned = 'MESSAGE_MENTIONED',

  GroupAdded = 'GROUP_ADDED',
  GroupUpdated = 'GROUP_UPDATED',
  GroupRemoved = 'GROUP_REMOVED',

  ServerUpdated = 'SERVER_UPDATED',
  ServerDeleted = 'SERVER_DELETED',

  UserJoinedServer = 'USER_JOINED_SERVER',
  UserLeftServer = 'USER_LEFT_SERVER',
  UserUpdated = 'USER_UPDATED',

  CommentReplied = 'COMMENT_REPLIED'
}
