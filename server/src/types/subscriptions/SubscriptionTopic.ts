export enum SubscriptionTopic {
  MessageSent = 'MessageSent', // payload: Message
  MessageUpdated = 'MessageUpdated', // payload: Message
  MessageRemoved = 'MessageRemoved', // payload: messageId
  Typing = 'Typing', // payload:

  RefetchGroupsAndDms = 'RefetchGroupsAndDms', // payload: userId
  RefetchUsers = 'RefetchUsers', // payload: userId
  RefetchJoinedServers = 'RefetchJoinedServers', // payload: userId
  RefetchServerChannels = 'RefetchServerChannels', // payload: serverId
  RefetchUserRelationships = 'RefetchUserRelationships', // payload: userId
  RefetchNotifications = 'RefetchNotifications', // payload: userId
  RefetchUserFolders = 'RefetchUserFolders', // payload: userId
  RefetchServerFolders = 'RefetchServerFolders' // payload: serverId
}
