export enum SubscriptionTopic {
  MessageReceived = 'MESSAGE_RECEIVED', // payload: Message
  MessageUpdated = 'MESSAGE_UPDATED', // payload: Message
  MessageRemoved = 'MESSAGE_REMOVED', // payload: messageId

  RefetchGroupsAndDms = 'REFETCH_GROUPS_DMS', // payload: userId
  RefetchUsers = 'REFETCH_USERS', // payload: userId
  RefetchServers = 'REFETCH_SERVERS', // payload: userId
  RefetchServersServerRemoved = 'REFETCH_SERVERS_SERVER_REMOVED', // payload: userId
  RefetchChannels = 'REFETCH_CHANNELS', // payload: serverId
  RefetchBlocks = 'REFETCH_BLOCKS', // payload: userId
  RefetchFriends = 'REFETCH_FRIENDS', // payload: userId
  RefetchFriendRequests = 'REFETCH_FRIEND_REQUESTS', // payload: userId
  RefetchNotifications = 'REFETCH_NOTIFICATIONS', // payload: userId
  RefetchUserFolders = 'REFETCH_USER_FOLDERS', // payload: userId
  RefetchServerFolders = 'REFETCH_SERVER_FOLDERS' // payload: serverId
}
