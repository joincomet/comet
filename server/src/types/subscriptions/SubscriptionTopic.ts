export enum SubscriptionTopic {
  MessageSent = 'MESSAGE_SENT', // payload: Message
  MessageUpdated = 'MESSAGE_UPDATED', // payload: Message
  MessageRemoved = 'MESSAGE_REMOVED', // payload: messageId

  RefetchGroupsAndDms = 'REFETCH_GROUPS_DMS', // payload: userId
  RefetchUsers = 'REFETCH_USERS', // payload: userId
  RefetchJoinedServers = 'REFETCH_JOINED_SERVERS', // payload: userId
  RefetchServerChannels = 'REFETCH_SERVER_CHANNELS', // payload: serverId
  RefetchFriends = 'REFETCH_FRIENDS', // payload: userId
  RefetchNotifications = 'REFETCH_NOTIFICATIONS', // payload: userId
  RefetchUserFolders = 'REFETCH_USER_FOLDERS', // payload: userId
  RefetchServerFolders = 'REFETCH_SERVER_FOLDERS' // payload: serverId
}
