import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type AddPostToFolderInput = {
  folderId: Scalars['ID'];
  postId: Scalars['ID'];
};

export type AddUserToGroupInput = {
  groupId: Scalars['ID'];
  userId: Scalars['ID'];
};

export type AddUserToRoleInput = {
  roleId: Scalars['ID'];
  userId: Scalars['ID'];
};

export type AnswerFriendRequestInput = {
  accept: Scalars['Boolean'];
  userId: Scalars['ID'];
};

export type BanUserFromServerInput = {
  serverId: Scalars['ID'];
  userId: Scalars['ID'];
};

export type BaseEntity = {
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
};

export type BlockUserInput = {
  userId: Scalars['ID'];
};

export type ChangeNicknameInput = {
  nickname?: Maybe<Scalars['String']>;
  serverId: Scalars['ID'];
  userId?: Maybe<Scalars['ID']>;
};

export type ChangeNotificationSettingInput = {
  notificationSetting: NotificationSetting;
  serverId: Scalars['ID'];
};

export type ChangeOnlineStatusInput = {
  onlineStatus: OnlineStatus;
};

export type ChangePasswordInput = {
  currentPassword: Scalars['String'];
  password: Scalars['String'];
};

export type Channel = BaseEntity & {
  __typename?: 'Channel';
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isUnread: Scalars['Boolean'];
  mentionCount: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  server: Server;
};

export enum ChannelPermission {
  ManageMessages = 'ManageMessages',
  ManagePermissions = 'ManagePermissions',
  SendMessages = 'SendMessages',
  ViewChannel = 'ViewChannel'
}

export type ChannelPermissions = {
  __typename?: 'ChannelPermissions';
  allowedPermissions: Array<ChannelPermission>;
  channel: Channel;
  deniedPermissions: Array<ChannelPermission>;
};

export type CloseDmInput = {
  userId: Scalars['ID'];
};

export type Comment = BaseEntity & {
  __typename?: 'Comment';
  author?: Maybe<ServerUser>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isDeleted: Scalars['Boolean'];
  isPinned: Scalars['Boolean'];
  isVoted: Scalars['Boolean'];
  linkMetadatas: Array<LinkMetadata>;
  parentComment?: Maybe<Comment>;
  pinnedAt?: Maybe<Scalars['DateTime']>;
  post: Post;
  text: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  voteCount: Scalars['Int'];
};

export type CommentChangedResponse = {
  __typename?: 'CommentChangedResponse';
  added?: Maybe<Comment>;
  deleted?: Maybe<Comment>;
  updated?: Maybe<Comment>;
};

export enum CommentsSort {
  New = 'New',
  Top = 'Top'
}

export type CreateAccountInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type CreateChannelInput = {
  isPrivate?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  serverId: Scalars['ID'];
};

export type CreateCommentInput = {
  parentCommentId?: Maybe<Scalars['ID']>;
  postId: Scalars['ID'];
  text: Scalars['String'];
};

export type CreateFolderInput = {
  isCollaborative?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  serverId?: Maybe<Scalars['ID']>;
  visibility?: Maybe<FolderVisibility>;
};

export type CreateFriendRequestInput = {
  userId: Scalars['ID'];
};

export type CreateGroupInput = {
  usernames: Array<Scalars['String']>;
};

export type CreateMessageInput = {
  channelId?: Maybe<Scalars['ID']>;
  file?: Maybe<Scalars['Upload']>;
  groupId?: Maybe<Scalars['ID']>;
  text?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['ID']>;
};

export type CreatePostInput = {
  images?: Maybe<Array<Scalars['Upload']>>;
  linkUrl?: Maybe<Scalars['String']>;
  serverId: Scalars['ID'];
  text?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type CreateRoleInput = {
  color?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  permissions: Array<ServerPermission>;
  serverId: Scalars['ID'];
};

export type CreateServerInput = {
  avatarFile?: Maybe<Scalars['Upload']>;
  category?: Maybe<ServerCategory>;
  isPublic?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
};


export type DeleteChannelInput = {
  channelId: Scalars['ID'];
};

export type DeleteCommentInput = {
  commentId: Scalars['ID'];
};

export type DeleteFolderInput = {
  folderId: Scalars['ID'];
};

export type DeleteFriendRequestInput = {
  userId: Scalars['ID'];
};

export type DeleteMessageInput = {
  messageId: Scalars['ID'];
};

export type DeletePostInput = {
  postId: Scalars['ID'];
};

export type DeleteRoleInput = {
  roleId: Scalars['ID'];
};

export type DeleteServerInput = {
  serverId: Scalars['ID'];
};

export type File = {
  __typename?: 'File';
  filename: Scalars['String'];
  mime: Scalars['String'];
  size: Scalars['Float'];
  url: Scalars['String'];
};

export type Folder = BaseEntity & {
  __typename?: 'Folder';
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  followerCount: Scalars['Int'];
  id: Scalars['ID'];
  isCollaborative: Scalars['Boolean'];
  name: Scalars['String'];
  owner?: Maybe<User>;
  postCount: Scalars['Int'];
  server?: Maybe<Server>;
  visibility: FolderVisibility;
};

export enum FolderVisibility {
  Friends = 'Friends',
  Private = 'Private',
  Public = 'Public',
  Unlisted = 'Unlisted'
}

export type FollowFolderInput = {
  folderId: Scalars['ID'];
};

export type GlobalBanInput = {
  reason?: Maybe<Scalars['String']>;
  userId: Scalars['ID'];
};

export type Group = BaseEntity & {
  __typename?: 'Group';
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  displayName: Scalars['String'];
  id: Scalars['ID'];
  lastMessageAt: Scalars['DateTime'];
  name: Scalars['String'];
  owner: User;
  unreadCount: Scalars['Int'];
  users: Array<User>;
};

export type Image = {
  __typename?: 'Image';
  originalHeight: Scalars['Int'];
  originalUrl: Scalars['String'];
  originalWidth: Scalars['Int'];
  popupHeight: Scalars['Int'];
  popupUrl?: Maybe<Scalars['String']>;
  popupWidth: Scalars['Int'];
  smallHeight: Scalars['Int'];
  smallUrl?: Maybe<Scalars['String']>;
  smallWidth: Scalars['Int'];
};

export type JoinServerInput = {
  inviteId?: Maybe<Scalars['ID']>;
  serverId?: Maybe<Scalars['ID']>;
};

export type KickUserFromServerInput = {
  serverId: Scalars['ID'];
  userId: Scalars['ID'];
};

export type LeaveGroupInput = {
  groupId: Scalars['ID'];
};

export type LeaveServerInput = {
  serverId: Scalars['ID'];
};

export type LinkMetadata = {
  __typename?: 'LinkMetadata';
  author?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  twitterCard?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type MarkReplyReadInput = {
  isRead?: Maybe<Scalars['Boolean']>;
  replyId: Scalars['ID'];
};

export type Message = BaseEntity & {
  __typename?: 'Message';
  author: User;
  channel: Channel;
  createdAt: Scalars['DateTime'];
  file?: Maybe<File>;
  group: Group;
  id: Scalars['ID'];
  image?: Maybe<Image>;
  isDeleted: Scalars['Boolean'];
  isPinned: Scalars['Boolean'];
  linkMetadatas: Array<LinkMetadata>;
  pinnedAt?: Maybe<Scalars['DateTime']>;
  serverUser?: Maybe<ServerUser>;
  text?: Maybe<Scalars['String']>;
  toUser: User;
  type: MessageType;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MessageChangedResponse = {
  __typename?: 'MessageChangedResponse';
  added?: Maybe<Message>;
  deleted?: Maybe<Message>;
  updated?: Maybe<Message>;
};

export enum MessageType {
  Join = 'Join',
  Left = 'Left',
  Normal = 'Normal'
}

export type MessagesResponse = {
  __typename?: 'MessagesResponse';
  hasMore: Scalars['Boolean'];
  messages: Array<Message>;
};

export type MoveChannelInput = {
  beforeChannelId?: Maybe<Scalars['ID']>;
  channelId: Scalars['ID'];
};

export type MoveRoleInput = {
  beforeRoleId?: Maybe<Scalars['ID']>;
  roleId: Scalars['ID'];
};

export type MoveServerFolderInput = {
  beforeFolderId?: Maybe<Scalars['ID']>;
  folderId: Scalars['ID'];
};

export type MoveServerInput = {
  beforeServerId?: Maybe<Scalars['ID']>;
  serverId: Scalars['ID'];
};

export type MoveUserFolderInput = {
  beforeFolderId?: Maybe<Scalars['ID']>;
  folderId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addPostToFolder: Folder;
  addUserToGroup: Group;
  addUserToRole: ServerUser;
  answerFriendRequest: Relationship;
  banUserFromServer: Scalars['Boolean'];
  blockUser: Relationship;
  changeNickname: ServerUser;
  changeNotificationSetting: ServerUser;
  changeOnlineStatus: User;
  changePassword: LoginResponse;
  closeDm: Relationship;
  createAccount: LoginResponse;
  createChannel: Channel;
  createComment: Comment;
  createFolder: Folder;
  createFriendRequest: Relationship;
  createGroup: Group;
  createMessage: Message;
  createPost: Post;
  createRole: Role;
  createServer: Server;
  deleteAccount: Scalars['Boolean'];
  deleteChannel: Scalars['Boolean'];
  deleteComment: Comment;
  deleteFolder: Scalars['Boolean'];
  deleteFriendRequest: Relationship;
  deleteMessage: Scalars['Boolean'];
  deletePost: Post;
  deleteRole: Scalars['Boolean'];
  deleteServer: Scalars['Boolean'];
  followFolder: Folder;
  globalBan: Scalars['Boolean'];
  joinServer: Server;
  kickUserFromServer: Scalars['Boolean'];
  leaveGroup: Scalars['Boolean'];
  leaveServer: Scalars['Boolean'];
  login: LoginResponse;
  markAllRepliesRead: Scalars['Boolean'];
  markReplyRead: Reply;
  moveChannel: Channel;
  moveRole: Role;
  moveServer: ServerUser;
  moveServerFolder: Folder;
  moveUserFolder: Folder;
  openDm: Relationship;
  pinComment: Comment;
  pinMessage: Message;
  pinPost: Post;
  readChannel: Channel;
  readDm: Relationship;
  readGroup: Group;
  readServer: ServerUser;
  removeFriend: Relationship;
  removePostFromFolder: Folder;
  removeUserFromGroup: Group;
  removeUserFromRole: ServerUser;
  startTyping: Scalars['Boolean'];
  unbanUserFromServer: Scalars['Boolean'];
  unblockUser: Relationship;
  unfollowFolder: Folder;
  unpinComment: Comment;
  unpinMessage: Message;
  unpinPost: Post;
  unvoteComment: Comment;
  unvotePost: Post;
  updateAccount: User;
  updateChannel: Channel;
  updateChannelPermissions: Role;
  updateComment: Comment;
  updateFolder: Folder;
  updateGroup: Group;
  updateMessage: Message;
  updatePost: Post;
  updateRole: Role;
  updateServer: Server;
  voteComment: Comment;
  votePost: Post;
};


export type MutationAddPostToFolderArgs = {
  input: AddPostToFolderInput;
};


export type MutationAddUserToGroupArgs = {
  input: AddUserToGroupInput;
};


export type MutationAddUserToRoleArgs = {
  input: AddUserToRoleInput;
};


export type MutationAnswerFriendRequestArgs = {
  input: AnswerFriendRequestInput;
};


export type MutationBanUserFromServerArgs = {
  input: BanUserFromServerInput;
};


export type MutationBlockUserArgs = {
  input: BlockUserInput;
};


export type MutationChangeNicknameArgs = {
  input: ChangeNicknameInput;
};


export type MutationChangeNotificationSettingArgs = {
  input: ChangeNotificationSettingInput;
};


export type MutationChangeOnlineStatusArgs = {
  input: ChangeOnlineStatusInput;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationCloseDmArgs = {
  input: CloseDmInput;
};


export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};


export type MutationCreateChannelArgs = {
  input: CreateChannelInput;
};


export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


export type MutationCreateFolderArgs = {
  input: CreateFolderInput;
};


export type MutationCreateFriendRequestArgs = {
  input: CreateFriendRequestInput;
};


export type MutationCreateGroupArgs = {
  input: CreateGroupInput;
};


export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationCreateRoleArgs = {
  input: CreateRoleInput;
};


export type MutationCreateServerArgs = {
  input: CreateServerInput;
};


export type MutationDeleteChannelArgs = {
  input: DeleteChannelInput;
};


export type MutationDeleteCommentArgs = {
  input: DeleteCommentInput;
};


export type MutationDeleteFolderArgs = {
  input: DeleteFolderInput;
};


export type MutationDeleteFriendRequestArgs = {
  input: DeleteFriendRequestInput;
};


export type MutationDeleteMessageArgs = {
  input: DeleteMessageInput;
};


export type MutationDeletePostArgs = {
  input: DeletePostInput;
};


export type MutationDeleteRoleArgs = {
  input: DeleteRoleInput;
};


export type MutationDeleteServerArgs = {
  input: DeleteServerInput;
};


export type MutationFollowFolderArgs = {
  input: FollowFolderInput;
};


export type MutationGlobalBanArgs = {
  input: GlobalBanInput;
};


export type MutationJoinServerArgs = {
  input: JoinServerInput;
};


export type MutationKickUserFromServerArgs = {
  input: KickUserFromServerInput;
};


export type MutationLeaveGroupArgs = {
  input: LeaveGroupInput;
};


export type MutationLeaveServerArgs = {
  input: LeaveServerInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationMarkReplyReadArgs = {
  input: MarkReplyReadInput;
};


export type MutationMoveChannelArgs = {
  input: MoveChannelInput;
};


export type MutationMoveRoleArgs = {
  input: MoveRoleInput;
};


export type MutationMoveServerArgs = {
  input: MoveServerInput;
};


export type MutationMoveServerFolderArgs = {
  input: MoveServerFolderInput;
};


export type MutationMoveUserFolderArgs = {
  input: MoveUserFolderInput;
};


export type MutationOpenDmArgs = {
  input: OpenDmInput;
};


export type MutationPinCommentArgs = {
  input: PinCommentInput;
};


export type MutationPinMessageArgs = {
  input: PinMessageInput;
};


export type MutationPinPostArgs = {
  input: PinPostInput;
};


export type MutationReadChannelArgs = {
  input: ReadChannelInput;
};


export type MutationReadDmArgs = {
  input: ReadDmInput;
};


export type MutationReadGroupArgs = {
  input: ReadGroupInput;
};


export type MutationReadServerArgs = {
  input: ReadServerInput;
};


export type MutationRemoveFriendArgs = {
  input: RemoveFriendInput;
};


export type MutationRemovePostFromFolderArgs = {
  input: RemovePostFromFolderInput;
};


export type MutationRemoveUserFromGroupArgs = {
  input: RemoveUserFromGroupInput;
};


export type MutationRemoveUserFromRoleArgs = {
  input: RemoveUserFromRoleInput;
};


export type MutationStartTypingArgs = {
  channelId?: Maybe<Scalars['ID']>;
  groupId?: Maybe<Scalars['ID']>;
  userId?: Maybe<Scalars['ID']>;
};


export type MutationUnbanUserFromServerArgs = {
  input: UnbanUserFromServerInput;
};


export type MutationUnblockUserArgs = {
  input: UnblockUserInput;
};


export type MutationUnfollowFolderArgs = {
  input: UnfollowFolderInput;
};


export type MutationUnpinCommentArgs = {
  input: UnpinCommentInput;
};


export type MutationUnpinMessageArgs = {
  input: UnpinMessageInput;
};


export type MutationUnpinPostArgs = {
  input: UnpinPostInput;
};


export type MutationUnvoteCommentArgs = {
  input: UnvoteCommentInput;
};


export type MutationUnvotePostArgs = {
  input: UnvotePostInput;
};


export type MutationUpdateAccountArgs = {
  input: UpdateAccountInput;
};


export type MutationUpdateChannelArgs = {
  input: UpdateChannelInput;
};


export type MutationUpdateChannelPermissionsArgs = {
  input: UpdateChannelPermissionsInput;
};


export type MutationUpdateCommentArgs = {
  input: UpdateCommentInput;
};


export type MutationUpdateFolderArgs = {
  input: UpdateFolderInput;
};


export type MutationUpdateGroupArgs = {
  input: UpdateGroupInput;
};


export type MutationUpdateMessageArgs = {
  input: UpdateMessageInput;
};


export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
};


export type MutationUpdateRoleArgs = {
  input: UpdateRoleInput;
};


export type MutationUpdateServerArgs = {
  input: UpdateServerInput;
};


export type MutationVoteCommentArgs = {
  input: VoteCommentInput;
};


export type MutationVotePostArgs = {
  input: VotePostInput;
};

export enum NotificationSetting {
  All = 'All',
  Mentions = 'Mentions',
  None = 'None'
}

export enum OnlineStatus {
  Away = 'Away',
  DoNotDisturb = 'DoNotDisturb',
  Offline = 'Offline',
  Online = 'Online'
}

export type OpenDmInput = {
  userId: Scalars['ID'];
};

export type PinCommentInput = {
  commentId: Scalars['ID'];
};

export type PinMessageInput = {
  messageId: Scalars['ID'];
};

export type PinPostInput = {
  postId: Scalars['ID'];
};

export type Post = BaseEntity & {
  __typename?: 'Post';
  addedAt?: Maybe<Scalars['DateTime']>;
  addedByUser?: Maybe<User>;
  author?: Maybe<ServerUser>;
  commentCount: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  domain?: Maybe<Scalars['String']>;
  folders?: Maybe<Array<Folder>>;
  id: Scalars['ID'];
  imageUrls: Array<Scalars['String']>;
  isDeleted: Scalars['Boolean'];
  isPinned: Scalars['Boolean'];
  isVoted: Scalars['Boolean'];
  linkMetadata?: Maybe<LinkMetadata>;
  linkMetadatas: Array<LinkMetadata>;
  linkUrl?: Maybe<Scalars['String']>;
  pinnedAt?: Maybe<Scalars['DateTime']>;
  relativeUrl: Scalars['String'];
  server: Server;
  text?: Maybe<Scalars['String']>;
  thumbnailUrl?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  voteCount: Scalars['Int'];
};

export type PostChangedResponse = {
  __typename?: 'PostChangedResponse';
  added?: Maybe<Post>;
  deleted?: Maybe<Post>;
  updated?: Maybe<Post>;
};

export type PostsResponse = {
  __typename?: 'PostsResponse';
  hasMore: Scalars['Boolean'];
  posts: Array<Post>;
};

export enum PostsSort {
  Added = 'Added',
  Hot = 'Hot',
  New = 'New',
  Top = 'Top'
}

export enum PostsTime {
  All = 'All',
  Day = 'Day',
  Hour = 'Hour',
  Month = 'Month',
  Week = 'Week',
  Year = 'Year'
}

export enum PublicServersSort {
  Featured = 'Featured',
  New = 'New',
  Top = 'Top'
}

export type Query = {
  __typename?: 'Query';
  channelUsers: Array<ServerUser>;
  comments: Array<Comment>;
  folder: Folder;
  messages: Array<MessagesResponse>;
  post: Post;
  posts: Array<PostsResponse>;
  publicServers: Array<Server>;
  replies: Array<Reply>;
  roleUsers: Array<ServerUser>;
  user?: Maybe<User>;
};


export type QueryChannelUsersArgs = {
  channelId: Scalars['ID'];
};


export type QueryCommentsArgs = {
  postId?: Maybe<Scalars['ID']>;
  sort?: Maybe<CommentsSort>;
};


export type QueryFolderArgs = {
  id: Scalars['ID'];
};


export type QueryMessagesArgs = {
  channelId?: Maybe<Scalars['ID']>;
  groupId?: Maybe<Scalars['ID']>;
  initialTime?: Maybe<Scalars['DateTime']>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  pinned?: Maybe<Scalars['Boolean']>;
  userId?: Maybe<Scalars['ID']>;
};


export type QueryPostArgs = {
  id: Scalars['ID'];
};


export type QueryPostsArgs = {
  folderId?: Maybe<Scalars['ID']>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  search?: Maybe<Scalars['String']>;
  serverId?: Maybe<Scalars['ID']>;
  sort?: Maybe<PostsSort>;
  time?: Maybe<PostsTime>;
};


export type QueryPublicServersArgs = {
  category?: Maybe<ServerCategory>;
  sort?: Maybe<PublicServersSort>;
};


export type QueryRepliesArgs = {
  userId: Scalars['ID'];
};


export type QueryRoleUsersArgs = {
  roleId: Scalars['ID'];
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type ReadChannelInput = {
  channelId: Scalars['ID'];
};

export type ReadDmInput = {
  userId: Scalars['ID'];
};

export type ReadGroupInput = {
  groupId: Scalars['ID'];
};

export type ReadServerInput = {
  serverId: Scalars['ID'];
};

export type Relationship = {
  __typename?: 'Relationship';
  lastMessageAt: Scalars['DateTime'];
  showChat: Scalars['Boolean'];
  status: RelationshipStatus;
  unreadCount: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export enum RelationshipStatus {
  Blocked = 'Blocked',
  Blocking = 'Blocking',
  FriendRequestIncoming = 'FriendRequestIncoming',
  FriendRequestOutgoing = 'FriendRequestOutgoing',
  Friends = 'Friends',
  None = 'None'
}

export type RemoveFriendInput = {
  userId: Scalars['ID'];
};

export type RemovePostFromFolderInput = {
  folderId: Scalars['ID'];
  postId: Scalars['ID'];
};

export type RemoveUserFromGroupInput = {
  groupId: Scalars['ID'];
  userId: Scalars['ID'];
};

export type RemoveUserFromRoleInput = {
  roleId: Scalars['ID'];
  userId: Scalars['ID'];
};

export type RepliesChangedResponse = {
  __typename?: 'RepliesChangedResponse';
  added: Array<Reply>;
  deleted: Array<Reply>;
  updated: Array<Reply>;
};

export type Reply = BaseEntity & {
  __typename?: 'Reply';
  comment: Comment;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isRead: Scalars['Boolean'];
};

export type Role = BaseEntity & {
  __typename?: 'Role';
  channelPermissions: Array<ChannelPermissions>;
  color: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  permissions: Array<ServerPermission>;
};

export type Server = BaseEntity & {
  __typename?: 'Server';
  avatarUrl?: Maybe<Scalars['String']>;
  bannerUrl?: Maybe<Scalars['String']>;
  category: ServerCategory;
  channels: Array<Channel>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  folders: Array<Folder>;
  id: Scalars['ID'];
  isBanned: Scalars['Boolean'];
  isDeleted: Scalars['Boolean'];
  isFeatured: Scalars['Boolean'];
  isPublic: Scalars['Boolean'];
  myRoles: Array<Role>;
  name: Scalars['String'];
  owner: User;
  roles: Array<Role>;
  sendWelcomeMessage: Scalars['Boolean'];
  systemMessagesChannel: Channel;
  userCount: Scalars['Int'];
};

export enum ServerCategory {
  Arts = 'Arts',
  Business = 'Business',
  Culture = 'Culture',
  Discussion = 'Discussion',
  Entertainment = 'Entertainment',
  Gaming = 'Gaming',
  Health = 'Health',
  Hobbies = 'Hobbies',
  Lifestyle = 'Lifestyle',
  Memes = 'Memes',
  Meta = 'Meta',
  News = 'News',
  Other = 'Other',
  Politics = 'Politics',
  Programming = 'Programming',
  Science = 'Science',
  Sports = 'Sports',
  Technology = 'Technology'
}

export enum ServerPermission {
  AddPostToFolder = 'AddPostToFolder',
  Admin = 'Admin',
  ChangeNickname = 'ChangeNickname',
  CreateComment = 'CreateComment',
  CreateInvite = 'CreateInvite',
  CreatePost = 'CreatePost',
  DisplayRoleSeparately = 'DisplayRoleSeparately',
  ManageChannels = 'ManageChannels',
  ManageComments = 'ManageComments',
  ManageFolders = 'ManageFolders',
  ManageMessages = 'ManageMessages',
  ManageNicknames = 'ManageNicknames',
  ManagePosts = 'ManagePosts',
  ManageRoles = 'ManageRoles',
  ManageServer = 'ManageServer',
  ManageUsers = 'ManageUsers',
  Mention = 'Mention',
  Mentionable = 'Mentionable',
  SendMessages = 'SendMessages',
  ViewChannels = 'ViewChannels',
  ViewComments = 'ViewComments',
  VoteComment = 'VoteComment',
  VotePost = 'VotePost'
}

export type ServerUser = {
  __typename?: 'ServerUser';
  color?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  nickname?: Maybe<Scalars['String']>;
  notificationSetting: NotificationSetting;
  roles: Array<Role>;
  server: Server;
  user: User;
};

export type Subscription = {
  __typename?: 'Subscription';
  commentChanged: CommentChangedResponse;
  messageChanged: MessageChangedResponse;
  postChanged: PostChangedResponse;
  repliesChanged: RepliesChangedResponse;
  userStartedTyping: Scalars['String'];
};


export type SubscriptionUserStartedTypingArgs = {
  channelId?: Maybe<Scalars['ID']>;
  groupId?: Maybe<Scalars['ID']>;
  userId?: Maybe<Scalars['ID']>;
};

export type UnbanUserFromServerInput = {
  serverId: Scalars['ID'];
  userId: Scalars['ID'];
};

export type UnblockUserInput = {
  userId: Scalars['ID'];
};

export type UnfollowFolderInput = {
  folderId: Scalars['ID'];
};

export type UnpinCommentInput = {
  commentId: Scalars['ID'];
};

export type UnpinMessageInput = {
  messageId: Scalars['ID'];
};

export type UnpinPostInput = {
  postId: Scalars['ID'];
};

export type UnvoteCommentInput = {
  commentId: Scalars['ID'];
};

export type UnvotePostInput = {
  postId: Scalars['ID'];
};

export type UpdateAccountInput = {
  avatarFile?: Maybe<Scalars['Upload']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type UpdateChannelInput = {
  channelId: Scalars['ID'];
  isPrivate?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
};

export type UpdateChannelPermissionsInput = {
  allowedPermissions: Array<ChannelPermission>;
  channelId: Scalars['ID'];
  deniedPermissions: Array<ChannelPermission>;
  roleId: Scalars['ID'];
};

export type UpdateCommentInput = {
  commentId: Scalars['ID'];
  text: Scalars['String'];
};

export type UpdateFolderInput = {
  avatarFile?: Maybe<Scalars['Upload']>;
  folderId: Scalars['ID'];
  isCollaborative?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  visibility?: Maybe<FolderVisibility>;
};

export type UpdateGroupInput = {
  avatarFile?: Maybe<Scalars['Upload']>;
  groupId: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type UpdateMessageInput = {
  messageId: Scalars['ID'];
  text: Scalars['String'];
};

export type UpdatePostInput = {
  postId: Scalars['ID'];
  text: Scalars['String'];
};

export type UpdateRoleInput = {
  color?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<ServerPermission>>;
  roleId: Scalars['ID'];
};

export type UpdateServerInput = {
  avatarFile?: Maybe<Scalars['Upload']>;
  bannerFile?: Maybe<Scalars['Upload']>;
  category?: Maybe<ServerCategory>;
  description?: Maybe<Scalars['String']>;
  featuredPosition?: Maybe<Scalars['Int']>;
  isFeatured?: Maybe<Scalars['Boolean']>;
  isPublic?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['ID']>;
  sendWelcomeMessage?: Maybe<Scalars['Boolean']>;
  serverId: Scalars['ID'];
  systemMessagesChannelId?: Maybe<Scalars['ID']>;
};


export type User = BaseEntity & {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  folders?: Maybe<Array<Folder>>;
  groups: Array<Group>;
  id: Scalars['ID'];
  isAdmin: Scalars['Boolean'];
  isCurrentUser: Scalars['Boolean'];
  isOnline: Scalars['Boolean'];
  isPremium: Scalars['Boolean'];
  lastLoginAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  onlineStatus: OnlineStatus;
  relationships: Array<Relationship>;
  servers: Array<ServerUser>;
  tag: Scalars['String'];
  username: Scalars['String'];
};

export type VoteCommentInput = {
  commentId: Scalars['ID'];
};

export type VotePostInput = {
  postId: Scalars['ID'];
};

export type ChannelFragment = (
  { __typename?: 'Channel' }
  & Pick<Channel, 'id' | 'name' | 'description' | 'isUnread' | 'mentionCount'>
);

export type CommentFragment = (
  { __typename?: 'Comment' }
  & Pick<Comment, 'id' | 'text' | 'voteCount' | 'isVoted' | 'isDeleted' | 'createdAt' | 'updatedAt'>
  & { parentComment?: Maybe<(
    { __typename?: 'Comment' }
    & Pick<Comment, 'id'>
  )>, linkMetadatas: Array<(
    { __typename?: 'LinkMetadata' }
    & MetadataFragment
  )> }
);

export type FolderFragment = (
  { __typename?: 'Folder' }
  & Pick<Folder, 'id' | 'name' | 'avatarUrl' | 'description' | 'postCount' | 'followerCount' | 'isCollaborative' | 'visibility'>
);

export type GroupFragment = (
  { __typename?: 'Group' }
  & Pick<Group, 'id' | 'name' | 'displayName' | 'avatarUrl' | 'unreadCount'>
);

export type MessageFragment = (
  { __typename?: 'Message' }
  & Pick<Message, 'id' | 'text' | 'createdAt' | 'updatedAt' | 'type'>
  & { image?: Maybe<(
    { __typename?: 'Image' }
    & Pick<Image, 'originalUrl' | 'popupUrl' | 'popupWidth' | 'popupHeight' | 'smallUrl' | 'smallWidth' | 'smallHeight'>
  )>, file?: Maybe<(
    { __typename?: 'File' }
    & Pick<File, 'url' | 'mime' | 'filename' | 'size'>
  )>, linkMetadatas: Array<(
    { __typename?: 'LinkMetadata' }
    & MetadataFragment
  )> }
);

export type MetadataFragment = (
  { __typename?: 'LinkMetadata' }
  & Pick<LinkMetadata, 'author' | 'date' | 'description' | 'image' | 'logo' | 'publisher' | 'title' | 'twitterCard' | 'url'>
);

export type PostFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'title' | 'isPinned' | 'text' | 'linkUrl' | 'imageUrls' | 'relativeUrl' | 'commentCount' | 'voteCount' | 'isVoted' | 'thumbnailUrl' | 'domain' | 'isDeleted' | 'createdAt' | 'updatedAt' | 'addedAt'>
  & { linkMetadata?: Maybe<(
    { __typename?: 'LinkMetadata' }
    & MetadataFragment
  )> }
);

export type RelationshipFragment = (
  { __typename?: 'Relationship' }
  & Pick<Relationship, 'lastMessageAt' | 'showChat' | 'status' | 'unreadCount' | 'updatedAt'>
);

export type ReplyFragment = (
  { __typename?: 'Reply' }
  & Pick<Reply, 'id' | 'isRead'>
  & { comment: (
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'text' | 'voteCount'>
    & { author?: Maybe<(
      { __typename?: 'ServerUser' }
      & ServerUserFragment
    )>, post: (
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'title'>
    ), parentComment?: Maybe<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'text' | 'voteCount'>
      & { author?: Maybe<(
        { __typename?: 'ServerUser' }
        & ServerUserFragment
      )> }
    )> }
  ) }
);

export type RoleFragment = (
  { __typename?: 'Role' }
  & Pick<Role, 'id' | 'name' | 'color' | 'permissions'>
);

export type ServerFragment = (
  { __typename?: 'Server' }
  & Pick<Server, 'id' | 'name' | 'description' | 'avatarUrl' | 'bannerUrl' | 'userCount' | 'isPublic'>
);

export type ServerUserFragment = (
  { __typename?: 'ServerUser' }
  & Pick<ServerUser, 'name' | 'color'>
  & { roles: Array<(
    { __typename?: 'Role' }
    & RoleFragment
  )>, user: (
    { __typename?: 'User' }
    & UserFragment
  ) }
);

export type UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'name' | 'tag' | 'username' | 'avatarUrl' | 'onlineStatus' | 'isCurrentUser'>
);

export type CreateChannelMutationVariables = Exact<{
  input: CreateChannelInput;
}>;


export type CreateChannelMutation = (
  { __typename?: 'Mutation' }
  & { createChannel: (
    { __typename?: 'Channel' }
    & ChannelFragment
  ) }
);

export type UpdateChannelMutationVariables = Exact<{
  input: UpdateChannelInput;
}>;


export type UpdateChannelMutation = (
  { __typename?: 'Mutation' }
  & { updateChannel: (
    { __typename?: 'Channel' }
    & ChannelFragment
  ) }
);

export type DeleteChannelMutationVariables = Exact<{
  input: DeleteChannelInput;
}>;


export type DeleteChannelMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteChannel'>
);

export type MoveChannelMutationVariables = Exact<{
  input: MoveChannelInput;
}>;


export type MoveChannelMutation = (
  { __typename?: 'Mutation' }
  & { moveChannel: (
    { __typename?: 'Channel' }
    & ChannelFragment
  ) }
);

export type ReadChannelMutationVariables = Exact<{
  input: ReadChannelInput;
}>;


export type ReadChannelMutation = (
  { __typename?: 'Mutation' }
  & { readChannel: (
    { __typename?: 'Channel' }
    & ChannelFragment
  ) }
);

export type UpdateChannelPermissionsMutationVariables = Exact<{
  input: UpdateChannelPermissionsInput;
}>;


export type UpdateChannelPermissionsMutation = (
  { __typename?: 'Mutation' }
  & { updateChannelPermissions: (
    { __typename?: 'Role' }
    & RoleFragment
  ) }
);

export type CreateCommentMutationVariables = Exact<{
  input: CreateCommentInput;
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment: (
    { __typename?: 'Comment' }
    & { author?: Maybe<(
      { __typename?: 'ServerUser' }
      & ServerUserFragment
    )> }
    & CommentFragment
  ) }
);

export type UpdateCommentMutationVariables = Exact<{
  input: UpdateCommentInput;
}>;


export type UpdateCommentMutation = (
  { __typename?: 'Mutation' }
  & { updateComment: (
    { __typename?: 'Comment' }
    & { author?: Maybe<(
      { __typename?: 'ServerUser' }
      & ServerUserFragment
    )> }
    & CommentFragment
  ) }
);

export type DeleteCommentMutationVariables = Exact<{
  input: DeleteCommentInput;
}>;


export type DeleteCommentMutation = (
  { __typename?: 'Mutation' }
  & { deleteComment: (
    { __typename?: 'Comment' }
    & { author?: Maybe<(
      { __typename?: 'ServerUser' }
      & ServerUserFragment
    )> }
    & CommentFragment
  ) }
);

export type VoteCommentMutationVariables = Exact<{
  input: VoteCommentInput;
}>;


export type VoteCommentMutation = (
  { __typename?: 'Mutation' }
  & { voteComment: (
    { __typename?: 'Comment' }
    & { author?: Maybe<(
      { __typename?: 'ServerUser' }
      & ServerUserFragment
    )> }
    & CommentFragment
  ) }
);

export type UnvoteCommentMutationVariables = Exact<{
  input: UnvoteCommentInput;
}>;


export type UnvoteCommentMutation = (
  { __typename?: 'Mutation' }
  & { unvoteComment: (
    { __typename?: 'Comment' }
    & { author?: Maybe<(
      { __typename?: 'ServerUser' }
      & ServerUserFragment
    )> }
    & CommentFragment
  ) }
);

export type PinCommentMutationVariables = Exact<{
  input: PinCommentInput;
}>;


export type PinCommentMutation = (
  { __typename?: 'Mutation' }
  & { pinComment: (
    { __typename?: 'Comment' }
    & { author?: Maybe<(
      { __typename?: 'ServerUser' }
      & ServerUserFragment
    )> }
    & CommentFragment
  ) }
);

export type UnpinCommentMutationVariables = Exact<{
  input: UnpinCommentInput;
}>;


export type UnpinCommentMutation = (
  { __typename?: 'Mutation' }
  & { unpinComment: (
    { __typename?: 'Comment' }
    & { author?: Maybe<(
      { __typename?: 'ServerUser' }
      & ServerUserFragment
    )> }
    & CommentFragment
  ) }
);

export type CreateFolderMutationVariables = Exact<{
  input: CreateFolderInput;
}>;


export type CreateFolderMutation = (
  { __typename?: 'Mutation' }
  & { createFolder: (
    { __typename?: 'Folder' }
    & FolderFragment
  ) }
);

export type UpdateFolderMutationVariables = Exact<{
  input: UpdateFolderInput;
}>;


export type UpdateFolderMutation = (
  { __typename?: 'Mutation' }
  & { updateFolder: (
    { __typename?: 'Folder' }
    & FolderFragment
  ) }
);

export type DeleteFolderMutationVariables = Exact<{
  input: DeleteFolderInput;
}>;


export type DeleteFolderMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteFolder'>
);

export type MoveServerFolderMutationVariables = Exact<{
  input: MoveServerFolderInput;
}>;


export type MoveServerFolderMutation = (
  { __typename?: 'Mutation' }
  & { moveServerFolder: (
    { __typename?: 'Folder' }
    & FolderFragment
  ) }
);

export type MoveUserFolderMutationVariables = Exact<{
  input: MoveUserFolderInput;
}>;


export type MoveUserFolderMutation = (
  { __typename?: 'Mutation' }
  & { moveUserFolder: (
    { __typename?: 'Folder' }
    & FolderFragment
  ) }
);

export type FollowFolderMutationVariables = Exact<{
  input: FollowFolderInput;
}>;


export type FollowFolderMutation = (
  { __typename?: 'Mutation' }
  & { followFolder: (
    { __typename?: 'Folder' }
    & FolderFragment
  ) }
);

export type UnfollowFolderMutationVariables = Exact<{
  input: UnfollowFolderInput;
}>;


export type UnfollowFolderMutation = (
  { __typename?: 'Mutation' }
  & { unfollowFolder: (
    { __typename?: 'Folder' }
    & FolderFragment
  ) }
);

export type AddPostToFolderMutationVariables = Exact<{
  input: AddPostToFolderInput;
}>;


export type AddPostToFolderMutation = (
  { __typename?: 'Mutation' }
  & { addPostToFolder: (
    { __typename?: 'Folder' }
    & FolderFragment
  ) }
);

export type RemovePostFromFolderMutationVariables = Exact<{
  input: RemovePostFromFolderInput;
}>;


export type RemovePostFromFolderMutation = (
  { __typename?: 'Mutation' }
  & { removePostFromFolder: (
    { __typename?: 'Folder' }
    & FolderFragment
  ) }
);

export type CreateGroupMutationVariables = Exact<{
  input: CreateGroupInput;
}>;


export type CreateGroupMutation = (
  { __typename?: 'Mutation' }
  & { createGroup: (
    { __typename?: 'Group' }
    & GroupFragment
  ) }
);

export type UpdateGroupMutationVariables = Exact<{
  input: UpdateGroupInput;
}>;


export type UpdateGroupMutation = (
  { __typename?: 'Mutation' }
  & { updateGroup: (
    { __typename?: 'Group' }
    & GroupFragment
  ) }
);

export type LeaveGroupMutationVariables = Exact<{
  input: LeaveGroupInput;
}>;


export type LeaveGroupMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'leaveGroup'>
);

export type ReadGroupMutationVariables = Exact<{
  input: ReadGroupInput;
}>;


export type ReadGroupMutation = (
  { __typename?: 'Mutation' }
  & { readGroup: (
    { __typename?: 'Group' }
    & GroupFragment
  ) }
);

export type AddUserToGroupMutationVariables = Exact<{
  input: AddUserToGroupInput;
}>;


export type AddUserToGroupMutation = (
  { __typename?: 'Mutation' }
  & { addUserToGroup: (
    { __typename?: 'Group' }
    & GroupFragment
  ) }
);

export type RemoveUserFromGroupMutationVariables = Exact<{
  input: RemoveUserFromGroupInput;
}>;


export type RemoveUserFromGroupMutation = (
  { __typename?: 'Mutation' }
  & { removeUserFromGroup: (
    { __typename?: 'Group' }
    & GroupFragment
  ) }
);

export type CreateMessageMutationVariables = Exact<{
  input: CreateMessageInput;
}>;


export type CreateMessageMutation = (
  { __typename?: 'Mutation' }
  & { createMessage: (
    { __typename?: 'Message' }
    & { author: (
      { __typename?: 'User' }
      & UserFragment
    ), serverUser?: Maybe<(
      { __typename?: 'ServerUser' }
      & ServerUserFragment
    )> }
    & MessageFragment
  ) }
);

export type UpdateMessageMutationVariables = Exact<{
  input: UpdateMessageInput;
}>;


export type UpdateMessageMutation = (
  { __typename?: 'Mutation' }
  & { updateMessage: (
    { __typename?: 'Message' }
    & { author: (
      { __typename?: 'User' }
      & UserFragment
    ), serverUser?: Maybe<(
      { __typename?: 'ServerUser' }
      & ServerUserFragment
    )> }
    & MessageFragment
  ) }
);

export type DeleteMessageMutationVariables = Exact<{
  input: DeleteMessageInput;
}>;


export type DeleteMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteMessage'>
);

export type PinMessageMutationVariables = Exact<{
  input: PinMessageInput;
}>;


export type PinMessageMutation = (
  { __typename?: 'Mutation' }
  & { pinMessage: (
    { __typename?: 'Message' }
    & { author: (
      { __typename?: 'User' }
      & UserFragment
    ), serverUser?: Maybe<(
      { __typename?: 'ServerUser' }
      & ServerUserFragment
    )> }
    & MessageFragment
  ) }
);

export type UnpinMessageMutationVariables = Exact<{
  input: UnpinMessageInput;
}>;


export type UnpinMessageMutation = (
  { __typename?: 'Mutation' }
  & { unpinMessage: (
    { __typename?: 'Message' }
    & { author: (
      { __typename?: 'User' }
      & UserFragment
    ), serverUser?: Maybe<(
      { __typename?: 'ServerUser' }
      & ServerUserFragment
    )> }
    & MessageFragment
  ) }
);

export type StartTypingMutationVariables = Exact<{
  userId?: Maybe<Scalars['ID']>;
  groupId?: Maybe<Scalars['ID']>;
  channelId?: Maybe<Scalars['ID']>;
}>;


export type StartTypingMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'startTyping'>
);

export type CreatePostMutationVariables = Exact<{
  input: CreatePostInput;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & { author?: Maybe<(
      { __typename?: 'ServerUser' }
      & ServerUserFragment
    )> }
    & PostFragment
  ) }
);

export type UpdatePostMutationVariables = Exact<{
  input: UpdatePostInput;
}>;


export type UpdatePostMutation = (
  { __typename?: 'Mutation' }
  & { updatePost: (
    { __typename?: 'Post' }
    & { author?: Maybe<(
      { __typename?: 'ServerUser' }
      & ServerUserFragment
    )> }
    & PostFragment
  ) }
);

export type DeletePostMutationVariables = Exact<{
  input: DeletePostInput;
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & { deletePost: (
    { __typename?: 'Post' }
    & { author?: Maybe<(
      { __typename?: 'ServerUser' }
      & ServerUserFragment
    )> }
    & PostFragment
  ) }
);

export type VotePostMutationVariables = Exact<{
  input: VotePostInput;
}>;


export type VotePostMutation = (
  { __typename?: 'Mutation' }
  & { votePost: (
    { __typename?: 'Post' }
    & { author?: Maybe<(
      { __typename?: 'ServerUser' }
      & ServerUserFragment
    )> }
    & PostFragment
  ) }
);

export type UnvotePostMutationVariables = Exact<{
  input: UnvotePostInput;
}>;


export type UnvotePostMutation = (
  { __typename?: 'Mutation' }
  & { unvotePost: (
    { __typename?: 'Post' }
    & { author?: Maybe<(
      { __typename?: 'ServerUser' }
      & ServerUserFragment
    )> }
    & PostFragment
  ) }
);

export type PinPostMutationVariables = Exact<{
  input: PinPostInput;
}>;


export type PinPostMutation = (
  { __typename?: 'Mutation' }
  & { pinPost: (
    { __typename?: 'Post' }
    & { author?: Maybe<(
      { __typename?: 'ServerUser' }
      & ServerUserFragment
    )> }
    & PostFragment
  ) }
);

export type UnpinPostMutationVariables = Exact<{
  input: UnpinPostInput;
}>;


export type UnpinPostMutation = (
  { __typename?: 'Mutation' }
  & { unpinPost: (
    { __typename?: 'Post' }
    & { author?: Maybe<(
      { __typename?: 'ServerUser' }
      & ServerUserFragment
    )> }
    & PostFragment
  ) }
);

export type CreateFriendRequestMutationVariables = Exact<{
  input: CreateFriendRequestInput;
}>;


export type CreateFriendRequestMutation = (
  { __typename?: 'Mutation' }
  & { createFriendRequest: (
    { __typename?: 'Relationship' }
    & RelationshipFragment
  ) }
);

export type DeleteFriendRequestMutationVariables = Exact<{
  input: DeleteFriendRequestInput;
}>;


export type DeleteFriendRequestMutation = (
  { __typename?: 'Mutation' }
  & { deleteFriendRequest: (
    { __typename?: 'Relationship' }
    & RelationshipFragment
  ) }
);

export type AnswerFriendRequestMutationVariables = Exact<{
  input: AnswerFriendRequestInput;
}>;


export type AnswerFriendRequestMutation = (
  { __typename?: 'Mutation' }
  & { answerFriendRequest: (
    { __typename?: 'Relationship' }
    & RelationshipFragment
  ) }
);

export type BlockUserMutationVariables = Exact<{
  input: BlockUserInput;
}>;


export type BlockUserMutation = (
  { __typename?: 'Mutation' }
  & { blockUser: (
    { __typename?: 'Relationship' }
    & RelationshipFragment
  ) }
);

export type UnblockUserMutationVariables = Exact<{
  input: UnblockUserInput;
}>;


export type UnblockUserMutation = (
  { __typename?: 'Mutation' }
  & { unblockUser: (
    { __typename?: 'Relationship' }
    & RelationshipFragment
  ) }
);

export type RemoveFriendMutationVariables = Exact<{
  input: RemoveFriendInput;
}>;


export type RemoveFriendMutation = (
  { __typename?: 'Mutation' }
  & { removeFriend: (
    { __typename?: 'Relationship' }
    & RelationshipFragment
  ) }
);

export type ReadDmMutationVariables = Exact<{
  input: ReadDmInput;
}>;


export type ReadDmMutation = (
  { __typename?: 'Mutation' }
  & { readDm: (
    { __typename?: 'Relationship' }
    & RelationshipFragment
  ) }
);

export type OpenDmMutationVariables = Exact<{
  input: OpenDmInput;
}>;


export type OpenDmMutation = (
  { __typename?: 'Mutation' }
  & { openDm: (
    { __typename?: 'Relationship' }
    & RelationshipFragment
  ) }
);

export type CloseDmMutationVariables = Exact<{
  input: CloseDmInput;
}>;


export type CloseDmMutation = (
  { __typename?: 'Mutation' }
  & { closeDm: (
    { __typename?: 'Relationship' }
    & RelationshipFragment
  ) }
);

export type MarkReplyReadMutationVariables = Exact<{
  input: MarkReplyReadInput;
}>;


export type MarkReplyReadMutation = (
  { __typename?: 'Mutation' }
  & { markReplyRead: (
    { __typename?: 'Reply' }
    & ReplyFragment
  ) }
);

export type MarkAllRepliesReadMutationVariables = Exact<{ [key: string]: never; }>;


export type MarkAllRepliesReadMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'markAllRepliesRead'>
);

export type CreateRoleMutationVariables = Exact<{
  input: CreateRoleInput;
}>;


export type CreateRoleMutation = (
  { __typename?: 'Mutation' }
  & { createRole: (
    { __typename?: 'Role' }
    & RoleFragment
  ) }
);

export type UpdateRoleMutationVariables = Exact<{
  input: UpdateRoleInput;
}>;


export type UpdateRoleMutation = (
  { __typename?: 'Mutation' }
  & { updateRole: (
    { __typename?: 'Role' }
    & RoleFragment
  ) }
);

export type DeleteRoleMutationVariables = Exact<{
  input: DeleteRoleInput;
}>;


export type DeleteRoleMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteRole'>
);

export type MoveRoleMutationVariables = Exact<{
  input: MoveRoleInput;
}>;


export type MoveRoleMutation = (
  { __typename?: 'Mutation' }
  & { moveRole: (
    { __typename?: 'Role' }
    & RoleFragment
  ) }
);

export type AddUserToRoleMutationVariables = Exact<{
  input: AddUserToRoleInput;
}>;


export type AddUserToRoleMutation = (
  { __typename?: 'Mutation' }
  & { addUserToRole: (
    { __typename?: 'ServerUser' }
    & ServerUserFragment
  ) }
);

export type RemoveUserFromRoleMutationVariables = Exact<{
  input: RemoveUserFromRoleInput;
}>;


export type RemoveUserFromRoleMutation = (
  { __typename?: 'Mutation' }
  & { removeUserFromRole: (
    { __typename?: 'ServerUser' }
    & ServerUserFragment
  ) }
);

export type CreateServerMutationVariables = Exact<{
  input: CreateServerInput;
}>;


export type CreateServerMutation = (
  { __typename?: 'Mutation' }
  & { createServer: (
    { __typename?: 'Server' }
    & ServerFragment
  ) }
);

export type UpdateServerMutationVariables = Exact<{
  input: UpdateServerInput;
}>;


export type UpdateServerMutation = (
  { __typename?: 'Mutation' }
  & { updateServer: (
    { __typename?: 'Server' }
    & ServerFragment
  ) }
);

export type DeleteServerMutationVariables = Exact<{
  input: DeleteServerInput;
}>;


export type DeleteServerMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteServer'>
);

export type MoveServerMutationVariables = Exact<{
  input: MoveServerInput;
}>;


export type MoveServerMutation = (
  { __typename?: 'Mutation' }
  & { moveServer: (
    { __typename?: 'ServerUser' }
    & ServerUserFragment
  ) }
);

export type JoinServerMutationVariables = Exact<{
  input: JoinServerInput;
}>;


export type JoinServerMutation = (
  { __typename?: 'Mutation' }
  & { joinServer: (
    { __typename?: 'Server' }
    & ServerFragment
  ) }
);

export type LeaveServerMutationVariables = Exact<{
  input: LeaveServerInput;
}>;


export type LeaveServerMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'leaveServer'>
);

export type ReadServerMutationVariables = Exact<{
  input: ReadServerInput;
}>;


export type ReadServerMutation = (
  { __typename?: 'Mutation' }
  & { readServer: (
    { __typename?: 'ServerUser' }
    & ServerUserFragment
  ) }
);

export type BanUserFromServerMutationVariables = Exact<{
  input: BanUserFromServerInput;
}>;


export type BanUserFromServerMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'banUserFromServer'>
);

export type UnbanUserFromServerMutationVariables = Exact<{
  input: UnbanUserFromServerInput;
}>;


export type UnbanUserFromServerMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'unbanUserFromServer'>
);

export type KickUserFromServerMutationVariables = Exact<{
  input: KickUserFromServerInput;
}>;


export type KickUserFromServerMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'kickUserFromServer'>
);

export type CreateAccountMutationVariables = Exact<{
  input: CreateAccountInput;
}>;


export type CreateAccountMutation = (
  { __typename?: 'Mutation' }
  & { createAccount: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
  ) }
);

export type UpdateAccountMutationVariables = Exact<{
  input: UpdateAccountInput;
}>;


export type UpdateAccountMutation = (
  { __typename?: 'Mutation' }
  & { updateAccount: (
    { __typename?: 'User' }
    & UserFragment
  ) }
);

export type DeleteAccountMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteAccountMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteAccount'>
);

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
  ) }
);

export type ChangePasswordMutationVariables = Exact<{
  input: ChangePasswordInput;
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
  ) }
);

export type ChangeOnlineStatusMutationVariables = Exact<{
  input: ChangeOnlineStatusInput;
}>;


export type ChangeOnlineStatusMutation = (
  { __typename?: 'Mutation' }
  & { changeOnlineStatus: (
    { __typename?: 'User' }
    & UserFragment
  ) }
);

export type GlobalBanMutationVariables = Exact<{
  input: GlobalBanInput;
}>;


export type GlobalBanMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'globalBan'>
);

export type ChannelUsersQueryVariables = Exact<{
  channelId: Scalars['ID'];
}>;


export type ChannelUsersQuery = (
  { __typename?: 'Query' }
  & { channelUsers: Array<(
    { __typename?: 'ServerUser' }
    & ServerUserFragment
  )> }
);

export type CommentsQueryVariables = Exact<{
  postId: Scalars['ID'];
  sort?: Maybe<CommentsSort>;
}>;


export type CommentsQuery = (
  { __typename?: 'Query' }
  & { comments: Array<(
    { __typename?: 'Comment' }
    & { author?: Maybe<(
      { __typename?: 'ServerUser' }
      & ServerUserFragment
    )> }
    & CommentFragment
  )> }
);

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'isAdmin'>
    & { servers: Array<(
      { __typename?: 'ServerUser' }
      & { server: (
        { __typename?: 'Server' }
        & { channels: Array<(
          { __typename?: 'Channel' }
          & ChannelFragment
        )>, roles: Array<(
          { __typename?: 'Role' }
          & { channelPermissions: Array<(
            { __typename?: 'ChannelPermissions' }
            & Pick<ChannelPermissions, 'allowedPermissions' | 'deniedPermissions'>
            & { channel: (
              { __typename?: 'Channel' }
              & Pick<Channel, 'id'>
            ) }
          )> }
          & RoleFragment
        )> }
        & ServerFragment
      ) }
    )>, relationships: Array<(
      { __typename?: 'Relationship' }
      & { user: (
        { __typename?: 'User' }
        & UserFragment
      ) }
      & RelationshipFragment
    )>, groups: Array<(
      { __typename?: 'Group' }
      & { owner: (
        { __typename?: 'User' }
        & Pick<User, 'id'>
      ), users: Array<(
        { __typename?: 'User' }
        & UserFragment
      )> }
      & GroupFragment
    )>, folders?: Maybe<Array<(
      { __typename?: 'Folder' }
      & FolderFragment
    )>> }
    & UserFragment
  )> }
);

export type FolderQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type FolderQuery = (
  { __typename?: 'Query' }
  & { folder: (
    { __typename?: 'Folder' }
    & Pick<Folder, 'postCount'>
    & { owner?: Maybe<(
      { __typename?: 'User' }
      & UserFragment
    )>, server?: Maybe<(
      { __typename?: 'Server' }
      & ServerFragment
    )> }
    & FolderFragment
  ) }
);

export type MessagesQueryVariables = Exact<{
  channelId?: Maybe<Scalars['ID']>;
  userId?: Maybe<Scalars['ID']>;
  groupId?: Maybe<Scalars['ID']>;
  pageSize?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  initialTime?: Maybe<Scalars['DateTime']>;
}>;


export type MessagesQuery = (
  { __typename?: 'Query' }
  & { messages: Array<(
    { __typename?: 'MessagesResponse' }
    & Pick<MessagesResponse, 'hasMore'>
    & { messages: Array<(
      { __typename?: 'Message' }
      & { author: (
        { __typename?: 'User' }
        & UserFragment
      ), serverUser?: Maybe<(
        { __typename?: 'ServerUser' }
        & Pick<ServerUser, 'name' | 'color'>
        & { roles: Array<(
          { __typename?: 'Role' }
          & RoleFragment
        )> }
      )> }
      & MessageFragment
    )> }
  )> }
);

export type PostQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PostQuery = (
  { __typename?: 'Query' }
  & { post: (
    { __typename?: 'Post' }
    & { author?: Maybe<(
      { __typename?: 'ServerUser' }
      & ServerUserFragment
    )>, server: (
      { __typename?: 'Server' }
      & ServerFragment
    ) }
    & PostFragment
  ) }
);

export type PostsQueryVariables = Exact<{
  sort?: Maybe<PostsSort>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  time?: Maybe<PostsTime>;
  folderId?: Maybe<Scalars['ID']>;
  serverId?: Maybe<Scalars['ID']>;
  search?: Maybe<Scalars['String']>;
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: Array<(
    { __typename?: 'PostsResponse' }
    & Pick<PostsResponse, 'hasMore'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & { author?: Maybe<(
        { __typename?: 'ServerUser' }
        & ServerUserFragment
      )>, server: (
        { __typename?: 'Server' }
        & ServerFragment
      ), addedByUser?: Maybe<(
        { __typename?: 'User' }
        & UserFragment
      )> }
      & PostFragment
    )> }
  )> }
);

export type PublicServersQueryVariables = Exact<{
  sort?: Maybe<PublicServersSort>;
  category?: Maybe<ServerCategory>;
}>;


export type PublicServersQuery = (
  { __typename?: 'Query' }
  & { publicServers: Array<(
    { __typename?: 'Server' }
    & ServerFragment
  )> }
);

export type RepliesQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type RepliesQuery = (
  { __typename?: 'Query' }
  & { replies: Array<(
    { __typename?: 'Reply' }
    & ReplyFragment
  )> }
);

export type RoleUsersQueryVariables = Exact<{
  roleId: Scalars['ID'];
}>;


export type RoleUsersQuery = (
  { __typename?: 'Query' }
  & { roleUsers: Array<(
    { __typename?: 'ServerUser' }
    & Pick<ServerUser, 'nickname'>
    & ServerUserFragment
  )> }
);

export type UserQueryVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & { folders?: Maybe<Array<(
      { __typename?: 'Folder' }
      & FolderFragment
    )>>, relationships: Array<(
      { __typename?: 'Relationship' }
      & { user: (
        { __typename?: 'User' }
        & UserFragment
      ) }
    )>, servers: Array<(
      { __typename?: 'ServerUser' }
      & Pick<ServerUser, 'nickname'>
      & { server: (
        { __typename?: 'Server' }
        & Pick<Server, 'id' | 'avatarUrl' | 'name'>
      ) }
    )> }
    & UserFragment
  )> }
);

export type CommentChangedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type CommentChangedSubscription = (
  { __typename?: 'Subscription' }
  & { commentChanged: (
    { __typename?: 'CommentChangedResponse' }
    & { added?: Maybe<(
      { __typename?: 'Comment' }
      & { post: (
        { __typename?: 'Post' }
        & Pick<Post, 'id'>
      ) }
      & CommentFragment
    )>, updated?: Maybe<(
      { __typename?: 'Comment' }
      & CommentFragment
    )>, deleted?: Maybe<(
      { __typename?: 'Comment' }
      & { post: (
        { __typename?: 'Post' }
        & Pick<Post, 'id'>
      ) }
      & CommentFragment
    )> }
  ) }
);

export type MessageChangedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MessageChangedSubscription = (
  { __typename?: 'Subscription' }
  & { messageChanged: (
    { __typename?: 'MessageChangedResponse' }
    & { added?: Maybe<(
      { __typename?: 'Message' }
      & { channel: (
        { __typename?: 'Channel' }
        & Pick<Channel, 'id' | 'name'>
      ), group: (
        { __typename?: 'Group' }
        & Pick<Group, 'id' | 'displayName'>
      ), toUser: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name'>
      ) }
      & MessageFragment
    )>, updated?: Maybe<(
      { __typename?: 'Message' }
      & MessageFragment
    )>, deleted?: Maybe<(
      { __typename?: 'Message' }
      & { channel: (
        { __typename?: 'Channel' }
        & Pick<Channel, 'id' | 'name'>
      ), group: (
        { __typename?: 'Group' }
        & Pick<Group, 'id' | 'displayName'>
      ), toUser: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name'>
      ) }
      & MessageFragment
    )> }
  ) }
);

export type PostChangedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type PostChangedSubscription = (
  { __typename?: 'Subscription' }
  & { postChanged: (
    { __typename?: 'PostChangedResponse' }
    & { added?: Maybe<(
      { __typename?: 'Post' }
      & { folders?: Maybe<Array<(
        { __typename?: 'Folder' }
        & Pick<Folder, 'id'>
      )>> }
      & PostFragment
    )>, updated?: Maybe<(
      { __typename?: 'Post' }
      & PostFragment
    )>, deleted?: Maybe<(
      { __typename?: 'Post' }
      & { folders?: Maybe<Array<(
        { __typename?: 'Folder' }
        & Pick<Folder, 'id'>
      )>> }
      & PostFragment
    )> }
  ) }
);

export type RepliesChangedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type RepliesChangedSubscription = (
  { __typename?: 'Subscription' }
  & { repliesChanged: (
    { __typename?: 'RepliesChangedResponse' }
    & { added: Array<(
      { __typename?: 'Reply' }
      & ReplyFragment
    )>, updated: Array<(
      { __typename?: 'Reply' }
      & ReplyFragment
    )>, deleted: Array<(
      { __typename?: 'Reply' }
      & ReplyFragment
    )> }
  ) }
);

export type UserStartedTypingSubscriptionVariables = Exact<{
  userId?: Maybe<Scalars['ID']>;
  groupId?: Maybe<Scalars['ID']>;
  channelId?: Maybe<Scalars['ID']>;
}>;


export type UserStartedTypingSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Subscription, 'userStartedTyping'>
);

export const ChannelFragmentDoc = gql`
    fragment Channel on Channel {
  id
  name
  description
  isUnread
  mentionCount
}
    `;
export const MetadataFragmentDoc = gql`
    fragment Metadata on LinkMetadata {
  author
  date
  description
  image
  logo
  publisher
  title
  twitterCard
  url
}
    `;
export const CommentFragmentDoc = gql`
    fragment Comment on Comment {
  id
  parentComment {
    id
  }
  text
  voteCount
  isVoted
  isDeleted
  createdAt
  updatedAt
  linkMetadatas {
    ...Metadata
  }
}
    ${MetadataFragmentDoc}`;
export const FolderFragmentDoc = gql`
    fragment Folder on Folder {
  id
  name
  avatarUrl
  description
  postCount
  followerCount
  isCollaborative
  visibility
}
    `;
export const GroupFragmentDoc = gql`
    fragment Group on Group {
  id
  name
  displayName
  avatarUrl
  unreadCount
}
    `;
export const MessageFragmentDoc = gql`
    fragment Message on Message {
  id
  text
  createdAt
  updatedAt
  type
  image {
    originalUrl
    popupUrl
    popupWidth
    popupHeight
    smallUrl
    smallWidth
    smallHeight
  }
  file {
    url
    mime
    filename
    size
  }
  linkMetadatas {
    ...Metadata
  }
}
    ${MetadataFragmentDoc}`;
export const PostFragmentDoc = gql`
    fragment Post on Post {
  id
  title
  isPinned
  text
  linkUrl
  imageUrls
  relativeUrl
  commentCount
  voteCount
  isVoted
  thumbnailUrl
  domain
  isDeleted
  createdAt
  updatedAt
  addedAt
  linkMetadata {
    ...Metadata
  }
}
    ${MetadataFragmentDoc}`;
export const RelationshipFragmentDoc = gql`
    fragment Relationship on Relationship {
  lastMessageAt
  showChat
  status
  unreadCount
  updatedAt
}
    `;
export const RoleFragmentDoc = gql`
    fragment Role on Role {
  id
  name
  color
  permissions
}
    `;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  name
  tag
  username
  avatarUrl
  onlineStatus
  isCurrentUser
}
    `;
export const ServerUserFragmentDoc = gql`
    fragment ServerUser on ServerUser {
  name
  color
  roles {
    ...Role
  }
  user {
    ...User
  }
}
    ${RoleFragmentDoc}
${UserFragmentDoc}`;
export const ReplyFragmentDoc = gql`
    fragment Reply on Reply {
  id
  isRead
  comment {
    id
    text
    voteCount
    author {
      ...ServerUser
    }
    post {
      id
      title
    }
    parentComment {
      id
      text
      voteCount
      author {
        ...ServerUser
      }
    }
  }
}
    ${ServerUserFragmentDoc}`;
export const ServerFragmentDoc = gql`
    fragment Server on Server {
  id
  name
  description
  avatarUrl
  bannerUrl
  userCount
  isPublic
}
    `;
export const CreateChannelDocument = gql`
    mutation createChannel($input: CreateChannelInput!) {
  createChannel(input: $input) {
    ...Channel
  }
}
    ${ChannelFragmentDoc}`;

export function useCreateChannelMutation() {
  return Urql.useMutation<CreateChannelMutation, CreateChannelMutationVariables>(CreateChannelDocument);
};
export const UpdateChannelDocument = gql`
    mutation updateChannel($input: UpdateChannelInput!) {
  updateChannel(input: $input) {
    ...Channel
  }
}
    ${ChannelFragmentDoc}`;

export function useUpdateChannelMutation() {
  return Urql.useMutation<UpdateChannelMutation, UpdateChannelMutationVariables>(UpdateChannelDocument);
};
export const DeleteChannelDocument = gql`
    mutation deleteChannel($input: DeleteChannelInput!) {
  deleteChannel(input: $input)
}
    `;

export function useDeleteChannelMutation() {
  return Urql.useMutation<DeleteChannelMutation, DeleteChannelMutationVariables>(DeleteChannelDocument);
};
export const MoveChannelDocument = gql`
    mutation moveChannel($input: MoveChannelInput!) {
  moveChannel(input: $input) {
    ...Channel
  }
}
    ${ChannelFragmentDoc}`;

export function useMoveChannelMutation() {
  return Urql.useMutation<MoveChannelMutation, MoveChannelMutationVariables>(MoveChannelDocument);
};
export const ReadChannelDocument = gql`
    mutation readChannel($input: ReadChannelInput!) {
  readChannel(input: $input) {
    ...Channel
  }
}
    ${ChannelFragmentDoc}`;

export function useReadChannelMutation() {
  return Urql.useMutation<ReadChannelMutation, ReadChannelMutationVariables>(ReadChannelDocument);
};
export const UpdateChannelPermissionsDocument = gql`
    mutation updateChannelPermissions($input: UpdateChannelPermissionsInput!) {
  updateChannelPermissions(input: $input) {
    ...Role
  }
}
    ${RoleFragmentDoc}`;

export function useUpdateChannelPermissionsMutation() {
  return Urql.useMutation<UpdateChannelPermissionsMutation, UpdateChannelPermissionsMutationVariables>(UpdateChannelPermissionsDocument);
};
export const CreateCommentDocument = gql`
    mutation createComment($input: CreateCommentInput!) {
  createComment(input: $input) {
    ...Comment
    author {
      ...ServerUser
    }
  }
}
    ${CommentFragmentDoc}
${ServerUserFragmentDoc}`;

export function useCreateCommentMutation() {
  return Urql.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument);
};
export const UpdateCommentDocument = gql`
    mutation updateComment($input: UpdateCommentInput!) {
  updateComment(input: $input) {
    ...Comment
    author {
      ...ServerUser
    }
  }
}
    ${CommentFragmentDoc}
${ServerUserFragmentDoc}`;

export function useUpdateCommentMutation() {
  return Urql.useMutation<UpdateCommentMutation, UpdateCommentMutationVariables>(UpdateCommentDocument);
};
export const DeleteCommentDocument = gql`
    mutation deleteComment($input: DeleteCommentInput!) {
  deleteComment(input: $input) {
    ...Comment
    author {
      ...ServerUser
    }
  }
}
    ${CommentFragmentDoc}
${ServerUserFragmentDoc}`;

export function useDeleteCommentMutation() {
  return Urql.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument);
};
export const VoteCommentDocument = gql`
    mutation voteComment($input: VoteCommentInput!) {
  voteComment(input: $input) {
    ...Comment
    author {
      ...ServerUser
    }
  }
}
    ${CommentFragmentDoc}
${ServerUserFragmentDoc}`;

export function useVoteCommentMutation() {
  return Urql.useMutation<VoteCommentMutation, VoteCommentMutationVariables>(VoteCommentDocument);
};
export const UnvoteCommentDocument = gql`
    mutation unvoteComment($input: UnvoteCommentInput!) {
  unvoteComment(input: $input) {
    ...Comment
    author {
      ...ServerUser
    }
  }
}
    ${CommentFragmentDoc}
${ServerUserFragmentDoc}`;

export function useUnvoteCommentMutation() {
  return Urql.useMutation<UnvoteCommentMutation, UnvoteCommentMutationVariables>(UnvoteCommentDocument);
};
export const PinCommentDocument = gql`
    mutation pinComment($input: PinCommentInput!) {
  pinComment(input: $input) {
    ...Comment
    author {
      ...ServerUser
    }
  }
}
    ${CommentFragmentDoc}
${ServerUserFragmentDoc}`;

export function usePinCommentMutation() {
  return Urql.useMutation<PinCommentMutation, PinCommentMutationVariables>(PinCommentDocument);
};
export const UnpinCommentDocument = gql`
    mutation unpinComment($input: UnpinCommentInput!) {
  unpinComment(input: $input) {
    ...Comment
    author {
      ...ServerUser
    }
  }
}
    ${CommentFragmentDoc}
${ServerUserFragmentDoc}`;

export function useUnpinCommentMutation() {
  return Urql.useMutation<UnpinCommentMutation, UnpinCommentMutationVariables>(UnpinCommentDocument);
};
export const CreateFolderDocument = gql`
    mutation createFolder($input: CreateFolderInput!) {
  createFolder(input: $input) {
    ...Folder
  }
}
    ${FolderFragmentDoc}`;

export function useCreateFolderMutation() {
  return Urql.useMutation<CreateFolderMutation, CreateFolderMutationVariables>(CreateFolderDocument);
};
export const UpdateFolderDocument = gql`
    mutation updateFolder($input: UpdateFolderInput!) {
  updateFolder(input: $input) {
    ...Folder
  }
}
    ${FolderFragmentDoc}`;

export function useUpdateFolderMutation() {
  return Urql.useMutation<UpdateFolderMutation, UpdateFolderMutationVariables>(UpdateFolderDocument);
};
export const DeleteFolderDocument = gql`
    mutation deleteFolder($input: DeleteFolderInput!) {
  deleteFolder(input: $input)
}
    `;

export function useDeleteFolderMutation() {
  return Urql.useMutation<DeleteFolderMutation, DeleteFolderMutationVariables>(DeleteFolderDocument);
};
export const MoveServerFolderDocument = gql`
    mutation moveServerFolder($input: MoveServerFolderInput!) {
  moveServerFolder(input: $input) {
    ...Folder
  }
}
    ${FolderFragmentDoc}`;

export function useMoveServerFolderMutation() {
  return Urql.useMutation<MoveServerFolderMutation, MoveServerFolderMutationVariables>(MoveServerFolderDocument);
};
export const MoveUserFolderDocument = gql`
    mutation moveUserFolder($input: MoveUserFolderInput!) {
  moveUserFolder(input: $input) {
    ...Folder
  }
}
    ${FolderFragmentDoc}`;

export function useMoveUserFolderMutation() {
  return Urql.useMutation<MoveUserFolderMutation, MoveUserFolderMutationVariables>(MoveUserFolderDocument);
};
export const FollowFolderDocument = gql`
    mutation followFolder($input: FollowFolderInput!) {
  followFolder(input: $input) {
    ...Folder
  }
}
    ${FolderFragmentDoc}`;

export function useFollowFolderMutation() {
  return Urql.useMutation<FollowFolderMutation, FollowFolderMutationVariables>(FollowFolderDocument);
};
export const UnfollowFolderDocument = gql`
    mutation unfollowFolder($input: UnfollowFolderInput!) {
  unfollowFolder(input: $input) {
    ...Folder
  }
}
    ${FolderFragmentDoc}`;

export function useUnfollowFolderMutation() {
  return Urql.useMutation<UnfollowFolderMutation, UnfollowFolderMutationVariables>(UnfollowFolderDocument);
};
export const AddPostToFolderDocument = gql`
    mutation addPostToFolder($input: AddPostToFolderInput!) {
  addPostToFolder(input: $input) {
    ...Folder
  }
}
    ${FolderFragmentDoc}`;

export function useAddPostToFolderMutation() {
  return Urql.useMutation<AddPostToFolderMutation, AddPostToFolderMutationVariables>(AddPostToFolderDocument);
};
export const RemovePostFromFolderDocument = gql`
    mutation removePostFromFolder($input: RemovePostFromFolderInput!) {
  removePostFromFolder(input: $input) {
    ...Folder
  }
}
    ${FolderFragmentDoc}`;

export function useRemovePostFromFolderMutation() {
  return Urql.useMutation<RemovePostFromFolderMutation, RemovePostFromFolderMutationVariables>(RemovePostFromFolderDocument);
};
export const CreateGroupDocument = gql`
    mutation createGroup($input: CreateGroupInput!) {
  createGroup(input: $input) {
    ...Group
  }
}
    ${GroupFragmentDoc}`;

export function useCreateGroupMutation() {
  return Urql.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(CreateGroupDocument);
};
export const UpdateGroupDocument = gql`
    mutation updateGroup($input: UpdateGroupInput!) {
  updateGroup(input: $input) {
    ...Group
  }
}
    ${GroupFragmentDoc}`;

export function useUpdateGroupMutation() {
  return Urql.useMutation<UpdateGroupMutation, UpdateGroupMutationVariables>(UpdateGroupDocument);
};
export const LeaveGroupDocument = gql`
    mutation leaveGroup($input: LeaveGroupInput!) {
  leaveGroup(input: $input)
}
    `;

export function useLeaveGroupMutation() {
  return Urql.useMutation<LeaveGroupMutation, LeaveGroupMutationVariables>(LeaveGroupDocument);
};
export const ReadGroupDocument = gql`
    mutation readGroup($input: ReadGroupInput!) {
  readGroup(input: $input) {
    ...Group
  }
}
    ${GroupFragmentDoc}`;

export function useReadGroupMutation() {
  return Urql.useMutation<ReadGroupMutation, ReadGroupMutationVariables>(ReadGroupDocument);
};
export const AddUserToGroupDocument = gql`
    mutation addUserToGroup($input: AddUserToGroupInput!) {
  addUserToGroup(input: $input) {
    ...Group
  }
}
    ${GroupFragmentDoc}`;

export function useAddUserToGroupMutation() {
  return Urql.useMutation<AddUserToGroupMutation, AddUserToGroupMutationVariables>(AddUserToGroupDocument);
};
export const RemoveUserFromGroupDocument = gql`
    mutation removeUserFromGroup($input: RemoveUserFromGroupInput!) {
  removeUserFromGroup(input: $input) {
    ...Group
  }
}
    ${GroupFragmentDoc}`;

export function useRemoveUserFromGroupMutation() {
  return Urql.useMutation<RemoveUserFromGroupMutation, RemoveUserFromGroupMutationVariables>(RemoveUserFromGroupDocument);
};
export const CreateMessageDocument = gql`
    mutation createMessage($input: CreateMessageInput!) {
  createMessage(input: $input) {
    ...Message
    author {
      ...User
    }
    serverUser {
      ...ServerUser
    }
  }
}
    ${MessageFragmentDoc}
${UserFragmentDoc}
${ServerUserFragmentDoc}`;

export function useCreateMessageMutation() {
  return Urql.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument);
};
export const UpdateMessageDocument = gql`
    mutation updateMessage($input: UpdateMessageInput!) {
  updateMessage(input: $input) {
    ...Message
    author {
      ...User
    }
    serverUser {
      ...ServerUser
    }
  }
}
    ${MessageFragmentDoc}
${UserFragmentDoc}
${ServerUserFragmentDoc}`;

export function useUpdateMessageMutation() {
  return Urql.useMutation<UpdateMessageMutation, UpdateMessageMutationVariables>(UpdateMessageDocument);
};
export const DeleteMessageDocument = gql`
    mutation deleteMessage($input: DeleteMessageInput!) {
  deleteMessage(input: $input)
}
    `;

export function useDeleteMessageMutation() {
  return Urql.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(DeleteMessageDocument);
};
export const PinMessageDocument = gql`
    mutation pinMessage($input: PinMessageInput!) {
  pinMessage(input: $input) {
    ...Message
    author {
      ...User
    }
    serverUser {
      ...ServerUser
    }
  }
}
    ${MessageFragmentDoc}
${UserFragmentDoc}
${ServerUserFragmentDoc}`;

export function usePinMessageMutation() {
  return Urql.useMutation<PinMessageMutation, PinMessageMutationVariables>(PinMessageDocument);
};
export const UnpinMessageDocument = gql`
    mutation unpinMessage($input: UnpinMessageInput!) {
  unpinMessage(input: $input) {
    ...Message
    author {
      ...User
    }
    serverUser {
      ...ServerUser
    }
  }
}
    ${MessageFragmentDoc}
${UserFragmentDoc}
${ServerUserFragmentDoc}`;

export function useUnpinMessageMutation() {
  return Urql.useMutation<UnpinMessageMutation, UnpinMessageMutationVariables>(UnpinMessageDocument);
};
export const StartTypingDocument = gql`
    mutation startTyping($userId: ID, $groupId: ID, $channelId: ID) {
  startTyping(userId: $userId, groupId: $groupId, channelId: $channelId)
}
    `;

export function useStartTypingMutation() {
  return Urql.useMutation<StartTypingMutation, StartTypingMutationVariables>(StartTypingDocument);
};
export const CreatePostDocument = gql`
    mutation createPost($input: CreatePostInput!) {
  createPost(input: $input) {
    ...Post
    author {
      ...ServerUser
    }
  }
}
    ${PostFragmentDoc}
${ServerUserFragmentDoc}`;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const UpdatePostDocument = gql`
    mutation updatePost($input: UpdatePostInput!) {
  updatePost(input: $input) {
    ...Post
    author {
      ...ServerUser
    }
  }
}
    ${PostFragmentDoc}
${ServerUserFragmentDoc}`;

export function useUpdatePostMutation() {
  return Urql.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument);
};
export const DeletePostDocument = gql`
    mutation deletePost($input: DeletePostInput!) {
  deletePost(input: $input) {
    ...Post
    author {
      ...ServerUser
    }
  }
}
    ${PostFragmentDoc}
${ServerUserFragmentDoc}`;

export function useDeletePostMutation() {
  return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument);
};
export const VotePostDocument = gql`
    mutation votePost($input: VotePostInput!) {
  votePost(input: $input) {
    ...Post
    author {
      ...ServerUser
    }
  }
}
    ${PostFragmentDoc}
${ServerUserFragmentDoc}`;

export function useVotePostMutation() {
  return Urql.useMutation<VotePostMutation, VotePostMutationVariables>(VotePostDocument);
};
export const UnvotePostDocument = gql`
    mutation unvotePost($input: UnvotePostInput!) {
  unvotePost(input: $input) {
    ...Post
    author {
      ...ServerUser
    }
  }
}
    ${PostFragmentDoc}
${ServerUserFragmentDoc}`;

export function useUnvotePostMutation() {
  return Urql.useMutation<UnvotePostMutation, UnvotePostMutationVariables>(UnvotePostDocument);
};
export const PinPostDocument = gql`
    mutation pinPost($input: PinPostInput!) {
  pinPost(input: $input) {
    ...Post
    author {
      ...ServerUser
    }
  }
}
    ${PostFragmentDoc}
${ServerUserFragmentDoc}`;

export function usePinPostMutation() {
  return Urql.useMutation<PinPostMutation, PinPostMutationVariables>(PinPostDocument);
};
export const UnpinPostDocument = gql`
    mutation unpinPost($input: UnpinPostInput!) {
  unpinPost(input: $input) {
    ...Post
    author {
      ...ServerUser
    }
  }
}
    ${PostFragmentDoc}
${ServerUserFragmentDoc}`;

export function useUnpinPostMutation() {
  return Urql.useMutation<UnpinPostMutation, UnpinPostMutationVariables>(UnpinPostDocument);
};
export const CreateFriendRequestDocument = gql`
    mutation createFriendRequest($input: CreateFriendRequestInput!) {
  createFriendRequest(input: $input) {
    ...Relationship
  }
}
    ${RelationshipFragmentDoc}`;

export function useCreateFriendRequestMutation() {
  return Urql.useMutation<CreateFriendRequestMutation, CreateFriendRequestMutationVariables>(CreateFriendRequestDocument);
};
export const DeleteFriendRequestDocument = gql`
    mutation deleteFriendRequest($input: DeleteFriendRequestInput!) {
  deleteFriendRequest(input: $input) {
    ...Relationship
  }
}
    ${RelationshipFragmentDoc}`;

export function useDeleteFriendRequestMutation() {
  return Urql.useMutation<DeleteFriendRequestMutation, DeleteFriendRequestMutationVariables>(DeleteFriendRequestDocument);
};
export const AnswerFriendRequestDocument = gql`
    mutation answerFriendRequest($input: AnswerFriendRequestInput!) {
  answerFriendRequest(input: $input) {
    ...Relationship
  }
}
    ${RelationshipFragmentDoc}`;

export function useAnswerFriendRequestMutation() {
  return Urql.useMutation<AnswerFriendRequestMutation, AnswerFriendRequestMutationVariables>(AnswerFriendRequestDocument);
};
export const BlockUserDocument = gql`
    mutation blockUser($input: BlockUserInput!) {
  blockUser(input: $input) {
    ...Relationship
  }
}
    ${RelationshipFragmentDoc}`;

export function useBlockUserMutation() {
  return Urql.useMutation<BlockUserMutation, BlockUserMutationVariables>(BlockUserDocument);
};
export const UnblockUserDocument = gql`
    mutation unblockUser($input: UnblockUserInput!) {
  unblockUser(input: $input) {
    ...Relationship
  }
}
    ${RelationshipFragmentDoc}`;

export function useUnblockUserMutation() {
  return Urql.useMutation<UnblockUserMutation, UnblockUserMutationVariables>(UnblockUserDocument);
};
export const RemoveFriendDocument = gql`
    mutation removeFriend($input: RemoveFriendInput!) {
  removeFriend(input: $input) {
    ...Relationship
  }
}
    ${RelationshipFragmentDoc}`;

export function useRemoveFriendMutation() {
  return Urql.useMutation<RemoveFriendMutation, RemoveFriendMutationVariables>(RemoveFriendDocument);
};
export const ReadDmDocument = gql`
    mutation readDm($input: ReadDmInput!) {
  readDm(input: $input) {
    ...Relationship
  }
}
    ${RelationshipFragmentDoc}`;

export function useReadDmMutation() {
  return Urql.useMutation<ReadDmMutation, ReadDmMutationVariables>(ReadDmDocument);
};
export const OpenDmDocument = gql`
    mutation openDm($input: OpenDmInput!) {
  openDm(input: $input) {
    ...Relationship
  }
}
    ${RelationshipFragmentDoc}`;

export function useOpenDmMutation() {
  return Urql.useMutation<OpenDmMutation, OpenDmMutationVariables>(OpenDmDocument);
};
export const CloseDmDocument = gql`
    mutation closeDm($input: CloseDmInput!) {
  closeDm(input: $input) {
    ...Relationship
  }
}
    ${RelationshipFragmentDoc}`;

export function useCloseDmMutation() {
  return Urql.useMutation<CloseDmMutation, CloseDmMutationVariables>(CloseDmDocument);
};
export const MarkReplyReadDocument = gql`
    mutation markReplyRead($input: MarkReplyReadInput!) {
  markReplyRead(input: $input) {
    ...Reply
  }
}
    ${ReplyFragmentDoc}`;

export function useMarkReplyReadMutation() {
  return Urql.useMutation<MarkReplyReadMutation, MarkReplyReadMutationVariables>(MarkReplyReadDocument);
};
export const MarkAllRepliesReadDocument = gql`
    mutation markAllRepliesRead {
  markAllRepliesRead
}
    `;

export function useMarkAllRepliesReadMutation() {
  return Urql.useMutation<MarkAllRepliesReadMutation, MarkAllRepliesReadMutationVariables>(MarkAllRepliesReadDocument);
};
export const CreateRoleDocument = gql`
    mutation createRole($input: CreateRoleInput!) {
  createRole(input: $input) {
    ...Role
  }
}
    ${RoleFragmentDoc}`;

export function useCreateRoleMutation() {
  return Urql.useMutation<CreateRoleMutation, CreateRoleMutationVariables>(CreateRoleDocument);
};
export const UpdateRoleDocument = gql`
    mutation updateRole($input: UpdateRoleInput!) {
  updateRole(input: $input) {
    ...Role
  }
}
    ${RoleFragmentDoc}`;

export function useUpdateRoleMutation() {
  return Urql.useMutation<UpdateRoleMutation, UpdateRoleMutationVariables>(UpdateRoleDocument);
};
export const DeleteRoleDocument = gql`
    mutation deleteRole($input: DeleteRoleInput!) {
  deleteRole(input: $input)
}
    `;

export function useDeleteRoleMutation() {
  return Urql.useMutation<DeleteRoleMutation, DeleteRoleMutationVariables>(DeleteRoleDocument);
};
export const MoveRoleDocument = gql`
    mutation moveRole($input: MoveRoleInput!) {
  moveRole(input: $input) {
    ...Role
  }
}
    ${RoleFragmentDoc}`;

export function useMoveRoleMutation() {
  return Urql.useMutation<MoveRoleMutation, MoveRoleMutationVariables>(MoveRoleDocument);
};
export const AddUserToRoleDocument = gql`
    mutation addUserToRole($input: AddUserToRoleInput!) {
  addUserToRole(input: $input) {
    ...ServerUser
  }
}
    ${ServerUserFragmentDoc}`;

export function useAddUserToRoleMutation() {
  return Urql.useMutation<AddUserToRoleMutation, AddUserToRoleMutationVariables>(AddUserToRoleDocument);
};
export const RemoveUserFromRoleDocument = gql`
    mutation removeUserFromRole($input: RemoveUserFromRoleInput!) {
  removeUserFromRole(input: $input) {
    ...ServerUser
  }
}
    ${ServerUserFragmentDoc}`;

export function useRemoveUserFromRoleMutation() {
  return Urql.useMutation<RemoveUserFromRoleMutation, RemoveUserFromRoleMutationVariables>(RemoveUserFromRoleDocument);
};
export const CreateServerDocument = gql`
    mutation createServer($input: CreateServerInput!) {
  createServer(input: $input) {
    ...Server
  }
}
    ${ServerFragmentDoc}`;

export function useCreateServerMutation() {
  return Urql.useMutation<CreateServerMutation, CreateServerMutationVariables>(CreateServerDocument);
};
export const UpdateServerDocument = gql`
    mutation updateServer($input: UpdateServerInput!) {
  updateServer(input: $input) {
    ...Server
  }
}
    ${ServerFragmentDoc}`;

export function useUpdateServerMutation() {
  return Urql.useMutation<UpdateServerMutation, UpdateServerMutationVariables>(UpdateServerDocument);
};
export const DeleteServerDocument = gql`
    mutation deleteServer($input: DeleteServerInput!) {
  deleteServer(input: $input)
}
    `;

export function useDeleteServerMutation() {
  return Urql.useMutation<DeleteServerMutation, DeleteServerMutationVariables>(DeleteServerDocument);
};
export const MoveServerDocument = gql`
    mutation moveServer($input: MoveServerInput!) {
  moveServer(input: $input) {
    ...ServerUser
  }
}
    ${ServerUserFragmentDoc}`;

export function useMoveServerMutation() {
  return Urql.useMutation<MoveServerMutation, MoveServerMutationVariables>(MoveServerDocument);
};
export const JoinServerDocument = gql`
    mutation joinServer($input: JoinServerInput!) {
  joinServer(input: $input) {
    ...Server
  }
}
    ${ServerFragmentDoc}`;

export function useJoinServerMutation() {
  return Urql.useMutation<JoinServerMutation, JoinServerMutationVariables>(JoinServerDocument);
};
export const LeaveServerDocument = gql`
    mutation leaveServer($input: LeaveServerInput!) {
  leaveServer(input: $input)
}
    `;

export function useLeaveServerMutation() {
  return Urql.useMutation<LeaveServerMutation, LeaveServerMutationVariables>(LeaveServerDocument);
};
export const ReadServerDocument = gql`
    mutation readServer($input: ReadServerInput!) {
  readServer(input: $input) {
    ...ServerUser
  }
}
    ${ServerUserFragmentDoc}`;

export function useReadServerMutation() {
  return Urql.useMutation<ReadServerMutation, ReadServerMutationVariables>(ReadServerDocument);
};
export const BanUserFromServerDocument = gql`
    mutation banUserFromServer($input: BanUserFromServerInput!) {
  banUserFromServer(input: $input)
}
    `;

export function useBanUserFromServerMutation() {
  return Urql.useMutation<BanUserFromServerMutation, BanUserFromServerMutationVariables>(BanUserFromServerDocument);
};
export const UnbanUserFromServerDocument = gql`
    mutation unbanUserFromServer($input: UnbanUserFromServerInput!) {
  unbanUserFromServer(input: $input)
}
    `;

export function useUnbanUserFromServerMutation() {
  return Urql.useMutation<UnbanUserFromServerMutation, UnbanUserFromServerMutationVariables>(UnbanUserFromServerDocument);
};
export const KickUserFromServerDocument = gql`
    mutation kickUserFromServer($input: KickUserFromServerInput!) {
  kickUserFromServer(input: $input)
}
    `;

export function useKickUserFromServerMutation() {
  return Urql.useMutation<KickUserFromServerMutation, KickUserFromServerMutationVariables>(KickUserFromServerDocument);
};
export const CreateAccountDocument = gql`
    mutation createAccount($input: CreateAccountInput!) {
  createAccount(input: $input) {
    accessToken
  }
}
    `;

export function useCreateAccountMutation() {
  return Urql.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument);
};
export const UpdateAccountDocument = gql`
    mutation updateAccount($input: UpdateAccountInput!) {
  updateAccount(input: $input) {
    ...User
  }
}
    ${UserFragmentDoc}`;

export function useUpdateAccountMutation() {
  return Urql.useMutation<UpdateAccountMutation, UpdateAccountMutationVariables>(UpdateAccountDocument);
};
export const DeleteAccountDocument = gql`
    mutation deleteAccount {
  deleteAccount
}
    `;

export function useDeleteAccountMutation() {
  return Urql.useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(DeleteAccountDocument);
};
export const LoginDocument = gql`
    mutation login($input: LoginInput!) {
  login(input: $input) {
    accessToken
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const ChangePasswordDocument = gql`
    mutation changePassword($input: ChangePasswordInput!) {
  changePassword(input: $input) {
    accessToken
  }
}
    `;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const ChangeOnlineStatusDocument = gql`
    mutation changeOnlineStatus($input: ChangeOnlineStatusInput!) {
  changeOnlineStatus(input: $input) {
    ...User
  }
}
    ${UserFragmentDoc}`;

export function useChangeOnlineStatusMutation() {
  return Urql.useMutation<ChangeOnlineStatusMutation, ChangeOnlineStatusMutationVariables>(ChangeOnlineStatusDocument);
};
export const GlobalBanDocument = gql`
    mutation globalBan($input: GlobalBanInput!) {
  globalBan(input: $input)
}
    `;

export function useGlobalBanMutation() {
  return Urql.useMutation<GlobalBanMutation, GlobalBanMutationVariables>(GlobalBanDocument);
};
export const ChannelUsersDocument = gql`
    query channelUsers($channelId: ID!) @live {
  channelUsers(channelId: $channelId) {
    ...ServerUser
  }
}
    ${ServerUserFragmentDoc}`;

export function useChannelUsersQuery(options: Omit<Urql.UseQueryArgs<ChannelUsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ChannelUsersQuery>({ query: ChannelUsersDocument, ...options });
};
export const CommentsDocument = gql`
    query comments($postId: ID!, $sort: CommentsSort) {
  comments(postId: $postId, sort: $sort) {
    ...Comment
    author {
      ...ServerUser
    }
  }
}
    ${CommentFragmentDoc}
${ServerUserFragmentDoc}`;

export function useCommentsQuery(options: Omit<Urql.UseQueryArgs<CommentsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CommentsQuery>({ query: CommentsDocument, ...options });
};
export const CurrentUserDocument = gql`
    query currentUser @live {
  user {
    ...User
    isAdmin
    servers {
      server {
        ...Server
        channels {
          ...Channel
        }
        roles {
          ...Role
          channelPermissions {
            channel {
              id
            }
            allowedPermissions
            deniedPermissions
          }
        }
      }
    }
    relationships {
      ...Relationship
      user {
        ...User
      }
    }
    groups {
      ...Group
      owner {
        id
      }
      users {
        ...User
      }
    }
    folders {
      ...Folder
    }
  }
}
    ${UserFragmentDoc}
${ServerFragmentDoc}
${ChannelFragmentDoc}
${RoleFragmentDoc}
${RelationshipFragmentDoc}
${GroupFragmentDoc}
${FolderFragmentDoc}`;

export function useCurrentUserQuery(options: Omit<Urql.UseQueryArgs<CurrentUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CurrentUserQuery>({ query: CurrentUserDocument, ...options });
};
export const FolderDocument = gql`
    query folder($id: ID!) @live {
  folder(id: $id) {
    ...Folder
    postCount
    owner {
      ...User
    }
    server {
      ...Server
    }
  }
}
    ${FolderFragmentDoc}
${UserFragmentDoc}
${ServerFragmentDoc}`;

export function useFolderQuery(options: Omit<Urql.UseQueryArgs<FolderQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FolderQuery>({ query: FolderDocument, ...options });
};
export const MessagesDocument = gql`
    query messages($channelId: ID, $userId: ID, $groupId: ID, $pageSize: Int, $page: Int, $initialTime: DateTime) {
  messages(
    channelId: $channelId
    userId: $userId
    groupId: $groupId
    pageSize: $pageSize
    page: $page
    initialTime: $initialTime
  ) {
    hasMore
    messages {
      ...Message
      author {
        ...User
      }
      serverUser {
        name
        color
        roles {
          ...Role
        }
      }
    }
  }
}
    ${MessageFragmentDoc}
${UserFragmentDoc}
${RoleFragmentDoc}`;

export function useMessagesQuery(options: Omit<Urql.UseQueryArgs<MessagesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MessagesQuery>({ query: MessagesDocument, ...options });
};
export const PostDocument = gql`
    query post($id: ID!) {
  post(id: $id) {
    ...Post
    author {
      ...ServerUser
    }
    server {
      ...Server
    }
  }
}
    ${PostFragmentDoc}
${ServerUserFragmentDoc}
${ServerFragmentDoc}`;

export function usePostQuery(options: Omit<Urql.UseQueryArgs<PostQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostQuery>({ query: PostDocument, ...options });
};
export const PostsDocument = gql`
    query posts($sort: PostsSort, $page: Int, $pageSize: Int, $time: PostsTime, $folderId: ID, $serverId: ID, $search: String) {
  posts(
    sort: $sort
    time: $time
    folderId: $folderId
    serverId: $serverId
    search: $search
    page: $page
    pageSize: $pageSize
  ) {
    hasMore
    posts {
      ...Post
      author {
        ...ServerUser
      }
      server {
        ...Server
      }
      addedByUser {
        ...User
      }
    }
  }
}
    ${PostFragmentDoc}
${ServerUserFragmentDoc}
${ServerFragmentDoc}
${UserFragmentDoc}`;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};
export const PublicServersDocument = gql`
    query publicServers($sort: PublicServersSort, $category: ServerCategory) {
  publicServers(sort: $sort, category: $category) {
    ...Server
  }
}
    ${ServerFragmentDoc}`;

export function usePublicServersQuery(options: Omit<Urql.UseQueryArgs<PublicServersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PublicServersQuery>({ query: PublicServersDocument, ...options });
};
export const RepliesDocument = gql`
    query replies($userId: ID!) {
  replies(userId: $userId) {
    ...Reply
  }
}
    ${ReplyFragmentDoc}`;

export function useRepliesQuery(options: Omit<Urql.UseQueryArgs<RepliesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<RepliesQuery>({ query: RepliesDocument, ...options });
};
export const RoleUsersDocument = gql`
    query roleUsers($roleId: ID!) @live {
  roleUsers(roleId: $roleId) {
    nickname
    ...ServerUser
  }
}
    ${ServerUserFragmentDoc}`;

export function useRoleUsersQuery(options: Omit<Urql.UseQueryArgs<RoleUsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<RoleUsersQuery>({ query: RoleUsersDocument, ...options });
};
export const UserDocument = gql`
    query user($id: ID) @live {
  user(id: $id) {
    ...User
    folders {
      ...Folder
    }
    relationships {
      user {
        ...User
      }
    }
    servers {
      nickname
      server {
        id
        avatarUrl
        name
      }
    }
  }
}
    ${UserFragmentDoc}
${FolderFragmentDoc}`;

export function useUserQuery(options: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserQuery>({ query: UserDocument, ...options });
};
export const CommentChangedDocument = gql`
    subscription CommentChanged {
  commentChanged {
    added {
      ...Comment
      post {
        id
      }
    }
    updated {
      ...Comment
    }
    deleted {
      ...Comment
      post {
        id
      }
    }
  }
}
    ${CommentFragmentDoc}`;

export function useCommentChangedSubscription<TData = CommentChangedSubscription>(options: Omit<Urql.UseSubscriptionArgs<CommentChangedSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<CommentChangedSubscription, TData>) {
  return Urql.useSubscription<CommentChangedSubscription, TData, CommentChangedSubscriptionVariables>({ query: CommentChangedDocument, ...options }, handler);
};
export const MessageChangedDocument = gql`
    subscription MessageChanged {
  messageChanged {
    added {
      ...Message
      channel {
        id
        name
      }
      group {
        id
        displayName
      }
      toUser {
        id
        name
      }
    }
    updated {
      ...Message
    }
    deleted {
      ...Message
      channel {
        id
        name
      }
      group {
        id
        displayName
      }
      toUser {
        id
        name
      }
    }
  }
}
    ${MessageFragmentDoc}`;

export function useMessageChangedSubscription<TData = MessageChangedSubscription>(options: Omit<Urql.UseSubscriptionArgs<MessageChangedSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<MessageChangedSubscription, TData>) {
  return Urql.useSubscription<MessageChangedSubscription, TData, MessageChangedSubscriptionVariables>({ query: MessageChangedDocument, ...options }, handler);
};
export const PostChangedDocument = gql`
    subscription PostChanged {
  postChanged {
    added {
      ...Post
      folders {
        id
      }
    }
    updated {
      ...Post
    }
    deleted {
      ...Post
      folders {
        id
      }
    }
  }
}
    ${PostFragmentDoc}`;

export function usePostChangedSubscription<TData = PostChangedSubscription>(options: Omit<Urql.UseSubscriptionArgs<PostChangedSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<PostChangedSubscription, TData>) {
  return Urql.useSubscription<PostChangedSubscription, TData, PostChangedSubscriptionVariables>({ query: PostChangedDocument, ...options }, handler);
};
export const RepliesChangedDocument = gql`
    subscription RepliesChanged {
  repliesChanged {
    added {
      ...Reply
    }
    updated {
      ...Reply
    }
    deleted {
      ...Reply
    }
  }
}
    ${ReplyFragmentDoc}`;

export function useRepliesChangedSubscription<TData = RepliesChangedSubscription>(options: Omit<Urql.UseSubscriptionArgs<RepliesChangedSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<RepliesChangedSubscription, TData>) {
  return Urql.useSubscription<RepliesChangedSubscription, TData, RepliesChangedSubscriptionVariables>({ query: RepliesChangedDocument, ...options }, handler);
};
export const UserStartedTypingDocument = gql`
    subscription userStartedTyping($userId: ID, $groupId: ID, $channelId: ID) {
  userStartedTyping(userId: $userId, groupId: $groupId, channelId: $channelId)
}
    `;

export function useUserStartedTypingSubscription<TData = UserStartedTypingSubscription>(options: Omit<Urql.UseSubscriptionArgs<UserStartedTypingSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<UserStartedTypingSubscription, TData>) {
  return Urql.useSubscription<UserStartedTypingSubscription, TData, UserStartedTypingSubscriptionVariables>({ query: UserStartedTypingDocument, ...options }, handler);
};