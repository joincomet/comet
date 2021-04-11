export enum SubscriptionTopic {
  MessageSent = 'MessageSent',
  MessageUpdated = 'MessageUpdated',
  MessageDeleted = 'MessageDeleted',
  Typing = 'Typing',

  FriendRequestReceived = 'FriendRequestReceived',
  FriendRequestAccepted = 'FriendRequestAccepted',
  FriendRemoved = 'FriendRemoved',
  UserBlocked = 'UserBlocked',

  UserUpdated = 'UserUpdated',

  PostCreated = 'PostCreated',
  PostUpdated = 'PostUpdated',
  PostDeleted = 'PostDeleted',

  CommentCreated = 'CommentCreated',
  CommentUpdated = 'CommentUpdated',
  CommentDeleted = 'CommentDeleted',

  ReplyReceived = 'ReplyReceived',
  ReplyRead = 'ReplyRead',
  AllRepliesRead = 'AllRepliesRead',

  RolesUpdated = 'RolesUpdated',
  ServerUpdated = 'ServerUpdated',
  JoinedServer = 'JoinedServer',
  LeftServer = 'LeftServer',
  ServersReordered = 'ServersReordered',

  ChannelCreated = 'ChannelCreated',
  ChannelUpdated = 'ChannelUpdated',
  ChannelDeleted = 'ChannelDeleted',
  ChannelsReordered = 'ChannelsReordered',

  UserFolderCreated = 'ServerFolderCreated',
  UserFolderDeleted = 'ServerFolderDeleted',
  ServerFolderCreated = 'ServerFolderCreated',
  ServerFolderDeleted = 'ServerFolderDeleted',
  FolderUpdated = 'FolderUpdated',
  PostAddedToFolder = 'PostAddedToFolder',
  PostRemovedFromFolder = 'PostRemovedFromFolder',
  ServerFoldersReordered = 'ServerFoldersReordered',
  UserFoldersReordered = 'UserFoldersReordered',

  ChannelRead = 'ChannelRead',

  UserLeftGroup = 'UserLeftGroup',
  UserJoinedGroup = 'UserJoinedGroup',
  GroupRead = 'GroupRead',
  GroupUpdated = 'GroupUpdated',

  DmOpened = 'DmOpened',
  DmClosed = 'DmClosed',
  DmRead = 'DmRead'

  /*RefetchGroupsAndDms = 'RefetchGroupsAndDms', // payload: userId
  RefetchUsers = 'RefetchUsers', // payload: userId
  RefetchJoinedServers = 'RefetchJoinedServers', // payload: userId
  RefetchServerChannels = 'RefetchServerChannels', // payload: serverId
  RefetchUserRelationships = 'RefetchUserRelationships', // payload: userId
  RefetchNotifications = 'RefetchNotifications', // payload: userId
  RefetchUserFolders = 'RefetchUserFolders', // payload: userId
  RefetchServerFolders = 'RefetchServerFolders' // payload: serverId*/
}
