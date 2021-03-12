export enum SubscriptionTopic {
  MessageSent = 'MESSAGE_SENT',
  MessageUpdated = 'MESSAGE_UPDATED',
  MessageRemoved = 'MESSAGE_REMOVED',

  GroupAdded = 'GROUP_ADDED',
  GroupUpdated = 'GROUP_UPDATED',
  UserLeftGroup = 'USER_LEFT_GROUP',
  UserAddedToGroup = 'USER_ADDED_TO_GROUP',

  ServerUpdated = 'SERVER_UPDATED',
  ServerDeleted = 'SERVER_DELETED',

  UserJoinedServer = 'USER_JOINED_SERVER',
  UserLeftServer = 'USER_LEFT_SERVER',
  UserUpdated = 'USER_UPDATED',

  FriendRequestReceived = 'FRIEND_REQUEST_RECEIVED',
  FriendRequestSent = 'FRIEND_REQUEST_SENT',
  FriendRequestRemoved = 'FRIEND_REQUEST_REMOVED',
  FriendAdded = 'FRIEND_ADDED',
  FriendRemoved = 'FRIEND_REMOVED',

  NotificationReceived = 'NOTIFICATION_RECEIVED',
  NotificationRemoved = 'NOTIFICATION_REMOVED',
  NotificationRead = 'NOTIFICATION_READ',
  NotificationReadAll = 'NOTIFICATION_READ_ALL',

  FolderUpdated = 'FOLDER_UPDATED',
  FolderDeleted = 'FOLDER_DELETED'
}
