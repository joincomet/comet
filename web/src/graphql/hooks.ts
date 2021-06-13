import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: any;
  /** A field whose value is a hex color code: https://en.wikipedia.org/wiki/Web_colors. */
  HexColorCode: any;
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
  JWT: any;
  /** Integers that will have a value of 0 or more. */
  NonNegativeInt: any;
  /** Integers that will have a value greater than 0. */
  PositiveInt: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
  /** Represents NULL values */
  Void: any;
};


export type AddPostToFolderInput = {
  folderId: Scalars['ID'];
  postId: Scalars['ID'];
};

export type AddUserToGroupInput = {
  groupId: Scalars['ID'];
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

export type ChangeOnlineStatusInput = {
  onlineStatus: OnlineStatus;
};

export type ChangePasswordInput = {
  currentPassword: Scalars['String'];
  password: Scalars['String'];
};

export type ChangeUserAvatarInput = {
  avatarFile?: Maybe<Scalars['Upload']>;
};

export type Channel = BaseEntity & {
  __typename?: 'Channel';
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isDefault: Scalars['Boolean'];
  isUnread: Scalars['Boolean'];
  mentionCount: Scalars['NonNegativeInt'];
  name?: Maybe<Scalars['String']>;
  server: Server;
  type: ChannelType;
};

export enum ChannelType {
  Private = 'Private',
  Public = 'Public',
  Restricted = 'Restricted'
}

export type CloseDmInput = {
  userId: Scalars['ID'];
};

export enum Color {
  Blue = 'Blue',
  Green = 'Green',
  Indigo = 'Indigo',
  Pink = 'Pink',
  Purple = 'Purple',
  Red = 'Red',
  Yellow = 'Yellow'
}

export type Comment = BaseEntity & {
  __typename?: 'Comment';
  author?: Maybe<User>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isDeleted: Scalars['Boolean'];
  isPinned: Scalars['Boolean'];
  linkMetadatas: Array<LinkMetadata>;
  parentComment?: Maybe<Comment>;
  pinnedAt?: Maybe<Scalars['DateTime']>;
  post: Post;
  serverUser?: Maybe<ServerUser>;
  text: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  voteCount: Scalars['Int'];
  voteType: VoteType;
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
  email?: Maybe<Scalars['EmailAddress']>;
  password: Scalars['String'];
  username: Scalars['String'];
};

export type CreateChannelInput = {
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  serverId: Scalars['ID'];
  type?: Maybe<ChannelType>;
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

export type CreatePostImagesInput = {
  caption?: Maybe<Scalars['String']>;
  file: Scalars['Upload'];
  linkUrl?: Maybe<Scalars['String']>;
};

export type CreatePostInput = {
  images?: Maybe<Array<CreatePostImagesInput>>;
  linkUrl?: Maybe<Scalars['String']>;
  serverId: Scalars['ID'];
  text?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type CreateRoleInput = {
  name: Scalars['String'];
  serverId: Scalars['ID'];
};

export type CreateServerInput = {
  avatarFile?: Maybe<Scalars['Upload']>;
  bannerFile?: Maybe<Scalars['Upload']>;
  category?: Maybe<ServerCategory>;
  description?: Maybe<Scalars['String']>;
  displayName: Scalars['String'];
  isDownvotesEnabled?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
};


export type DeleteAccountInput = {
  password: Scalars['String'];
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
  password: Scalars['String'];
  serverId: Scalars['ID'];
};


export type FeatureServerInput = {
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
  followerCount: Scalars['NonNegativeInt'];
  id: Scalars['ID'];
  isCollaborative: Scalars['Boolean'];
  isFollowing: Scalars['Boolean'];
  name: Scalars['String'];
  owner?: Maybe<User>;
  postCount: Scalars['NonNegativeInt'];
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
  unreadCount: Scalars['NonNegativeInt'];
  users: Array<User>;
};


export type Image = {
  __typename?: 'Image';
  originalHeight: Scalars['PositiveInt'];
  originalUrl: Scalars['String'];
  originalWidth: Scalars['PositiveInt'];
  popupHeight: Scalars['PositiveInt'];
  popupUrl?: Maybe<Scalars['String']>;
  popupWidth: Scalars['PositiveInt'];
  smallHeight: Scalars['PositiveInt'];
  smallUrl?: Maybe<Scalars['String']>;
  smallWidth: Scalars['PositiveInt'];
};


export type JoinServerInput = {
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
  domain?: Maybe<Scalars['String']>;
  image?: Maybe<Image>;
  imageUrl?: Maybe<Scalars['String']>;
  logo?: Maybe<Image>;
  logoUrl?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
  themeColor?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  twitterCard?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  email?: Maybe<Scalars['EmailAddress']>;
  password: Scalars['String'];
  username?: Maybe<Scalars['String']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['JWT'];
  user: User;
};

export type MarkReplyReadInput = {
  replyId: Scalars['ID'];
};

export type MarkReplyUnreadInput = {
  replyId: Scalars['ID'];
};

export type Message = BaseEntity & {
  __typename?: 'Message';
  author: User;
  channel?: Maybe<Channel>;
  createdAt: Scalars['DateTime'];
  file?: Maybe<File>;
  group?: Maybe<Group>;
  id: Scalars['ID'];
  images: Array<Image>;
  isDeleted: Scalars['Boolean'];
  isEveryoneMentioned: Scalars['Boolean'];
  isPinned: Scalars['Boolean'];
  linkMetadatas: Array<LinkMetadata>;
  mentionedUsers: Array<User>;
  pinnedAt?: Maybe<Scalars['DateTime']>;
  serverUser?: Maybe<ServerUser>;
  text?: Maybe<Scalars['String']>;
  toUser?: Maybe<User>;
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
  FriendRequestReceived = 'FriendRequestReceived',
  Initial = 'Initial',
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
  answerFriendRequest: User;
  banUserFromServer: Scalars['Boolean'];
  blockUser: User;
  changeOnlineStatus: User;
  changePassword: User;
  changeUserAvatar: User;
  closeDm: User;
  createAccount: LoginResponse;
  createChannel: Channel;
  createComment: Comment;
  createFolder: Folder;
  createFriendRequest: User;
  createGroup: Group;
  createMessage: Message;
  createPost: Post;
  createRole: Role;
  createServer: Server;
  deleteAccount: Scalars['Boolean'];
  deleteChannel: Scalars['ID'];
  deleteComment: Comment;
  deleteFolder: Scalars['Boolean'];
  deleteFriendRequest: User;
  deleteMessage: Scalars['Boolean'];
  deletePost: Post;
  deleteRole: Scalars['ID'];
  deleteServer: Scalars['ID'];
  featureServer: Server;
  followFolder: Folder;
  globalBan: Scalars['Boolean'];
  joinServer: Server;
  kickUserFromServer: Scalars['Boolean'];
  leaveGroup: Scalars['Boolean'];
  leaveServer: Server;
  login: LoginResponse;
  markReplyRead: Reply;
  markReplyUnread: Reply;
  moveChannel: Channel;
  moveServer: Scalars['Void'];
  moveServerFolder: Folder;
  moveUserFolder: Folder;
  openDm: User;
  pinComment: Comment;
  pinMessage: Message;
  pinPost: Post;
  readChannel: Channel;
  readDm: User;
  readGroup: Group;
  readServer: Server;
  removeFriend: User;
  removePostFromFolder: Folder;
  removeUserFromGroup: Group;
  setUserRole: ServerUser;
  unbanUserFromServer: Scalars['Boolean'];
  unblockUser: User;
  unfeatureServer: Server;
  unfollowFolder: Folder;
  unpinComment: Comment;
  unpinMessage: Message;
  unpinPost: Post;
  updateChannel: Channel;
  updateComment: Comment;
  updateCommentVote: Comment;
  updateFolder: Folder;
  updateGroup: Group;
  updateMessage: Message;
  updatePost: Post;
  updatePostVote: Post;
  updateRole: Role;
  updateServer: Server;
  updateTyping: Scalars['Boolean'];
};


export type MutationAddPostToFolderArgs = {
  input: AddPostToFolderInput;
};


export type MutationAddUserToGroupArgs = {
  input: AddUserToGroupInput;
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


export type MutationChangeOnlineStatusArgs = {
  input: ChangeOnlineStatusInput;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationChangeUserAvatarArgs = {
  input: ChangeUserAvatarInput;
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


export type MutationDeleteAccountArgs = {
  input: DeleteAccountInput;
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


export type MutationFeatureServerArgs = {
  input: FeatureServerInput;
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


export type MutationMarkReplyUnreadArgs = {
  input: MarkReplyUnreadInput;
};


export type MutationMoveChannelArgs = {
  input: MoveChannelInput;
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


export type MutationSetUserRoleArgs = {
  input: SetUserRoleInput;
};


export type MutationUnbanUserFromServerArgs = {
  input: UnbanUserFromServerInput;
};


export type MutationUnblockUserArgs = {
  input: UnblockUserInput;
};


export type MutationUnfeatureServerArgs = {
  input: UnfeatureServerInput;
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


export type MutationUpdateChannelArgs = {
  input: UpdateChannelInput;
};


export type MutationUpdateCommentArgs = {
  input: UpdateCommentInput;
};


export type MutationUpdateCommentVoteArgs = {
  input: UpdateCommentVoteInput;
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


export type MutationUpdatePostVoteArgs = {
  input: UpdatePostVoteInput;
};


export type MutationUpdateRoleArgs = {
  input: UpdateRoleInput;
};


export type MutationUpdateServerArgs = {
  input: UpdateServerInput;
};


export type MutationUpdateTypingArgs = {
  input: TypingInput;
};


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
  author?: Maybe<User>;
  commentCount: Scalars['NonNegativeInt'];
  createdAt: Scalars['DateTime'];
  domain?: Maybe<Scalars['String']>;
  folders?: Maybe<Array<Folder>>;
  id: Scalars['ID'];
  images: Array<PostImage>;
  isDeleted: Scalars['Boolean'];
  isPinned: Scalars['Boolean'];
  linkMetadata?: Maybe<LinkMetadata>;
  linkMetadatas: Array<LinkMetadata>;
  linkUrl?: Maybe<Scalars['String']>;
  pinnedAt?: Maybe<Scalars['DateTime']>;
  relativeUrl: Scalars['String'];
  server: Server;
  serverUser?: Maybe<ServerUser>;
  text?: Maybe<Scalars['String']>;
  thumbnailUrl?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  voteCount: Scalars['Int'];
  voteType: VoteType;
};

export type PostChangedResponse = {
  __typename?: 'PostChangedResponse';
  added?: Maybe<Post>;
  deleted?: Maybe<Post>;
  updated?: Maybe<Post>;
};

export type PostImage = {
  __typename?: 'PostImage';
  caption?: Maybe<Scalars['String']>;
  image: Image;
  linkUrl?: Maybe<Scalars['String']>;
};

export enum PostsFeed {
  All = 'All',
  Featured = 'Featured',
  Joined = 'Joined'
}

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
  New = 'New',
  Top = 'Top'
}

export type Query = {
  __typename?: 'Query';
  comments: Array<Comment>;
  folder: Folder;
  getLinkMeta?: Maybe<LinkMetadata>;
  messages: MessagesResponse;
  post: Post;
  posts: PostsResponse;
  publicServers: Array<Server>;
  replies: Array<Reply>;
  server?: Maybe<Server>;
  serverUsers: Array<ServerUser>;
  user?: Maybe<User>;
};


export type QueryCommentsArgs = {
  postId?: Maybe<Scalars['ID']>;
  sort?: Maybe<CommentsSort>;
};


export type QueryFolderArgs = {
  id: Scalars['ID'];
};


export type QueryGetLinkMetaArgs = {
  linkUrl: Scalars['String'];
};


export type QueryMessagesArgs = {
  channelId?: Maybe<Scalars['ID']>;
  cursor?: Maybe<Scalars['ID']>;
  groupId?: Maybe<Scalars['ID']>;
  limit?: Maybe<Scalars['PositiveInt']>;
  pinned?: Maybe<Scalars['Boolean']>;
  userId?: Maybe<Scalars['ID']>;
};


export type QueryPostArgs = {
  id: Scalars['ID'];
};


export type QueryPostsArgs = {
  feed?: Maybe<PostsFeed>;
  folderId?: Maybe<Scalars['ID']>;
  limit?: Maybe<Scalars['PositiveInt']>;
  offset?: Maybe<Scalars['NonNegativeInt']>;
  search?: Maybe<Scalars['String']>;
  serverId?: Maybe<Scalars['ID']>;
  sort?: Maybe<PostsSort>;
  time?: Maybe<PostsTime>;
};


export type QueryPublicServersArgs = {
  category?: Maybe<ServerCategory>;
  featured?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<PublicServersSort>;
};


export type QueryServerArgs = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};


export type QueryServerUsersArgs = {
  serverId: Scalars['ID'];
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['ID']>;
  username?: Maybe<Scalars['String']>;
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

export type Reply = BaseEntity & {
  __typename?: 'Reply';
  comment: Comment;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isRead: Scalars['Boolean'];
};

export type ReplyChangedResponse = {
  __typename?: 'ReplyChangedResponse';
  added?: Maybe<Reply>;
  deleted?: Maybe<Reply>;
  updated?: Maybe<Reply>;
};

export type Role = BaseEntity & {
  __typename?: 'Role';
  color?: Maybe<Scalars['HexColorCode']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isDefault: Scalars['Boolean'];
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
  displayName: Scalars['String'];
  folders: Array<Folder>;
  id: Scalars['ID'];
  isBanned: Scalars['Boolean'];
  isChatEnabled: Scalars['Boolean'];
  isDeleted: Scalars['Boolean'];
  isDownvotesEnabled: Scalars['Boolean'];
  isFeatured: Scalars['Boolean'];
  isJoined: Scalars['Boolean'];
  isPublic: Scalars['Boolean'];
  name: Scalars['String'];
  onlineCount: Scalars['NonNegativeInt'];
  owner: User;
  permissions: Array<ServerPermission>;
  roles: Array<Role>;
  userCount: Scalars['NonNegativeInt'];
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
  DisplayRoleSeparately = 'DisplayRoleSeparately',
  ManageChannels = 'ManageChannels',
  ManageComments = 'ManageComments',
  ManageFolders = 'ManageFolders',
  ManageMessages = 'ManageMessages',
  ManagePosts = 'ManagePosts',
  ManageServer = 'ManageServer',
  ManageUsers = 'ManageUsers',
  PrivateChannels = 'PrivateChannels',
  RestrictedChannels = 'RestrictedChannels',
  SendMessages = 'SendMessages'
}

export type ServerUser = {
  __typename?: 'ServerUser';
  id: Scalars['ID'];
  role: Role;
  user: User;
};

export type SetUserRoleInput = {
  roleId: Scalars['ID'];
  userId: Scalars['ID'];
};

export type Subscription = {
  __typename?: 'Subscription';
  commentChanged: CommentChangedResponse;
  messageChanged: MessageChangedResponse;
  postChanged: PostChangedResponse;
  replyChanged: ReplyChangedResponse;
  typingUpdated: TypingResponse;
};


export type SubscriptionTypingUpdatedArgs = {
  channelId?: Maybe<Scalars['ID']>;
  groupId?: Maybe<Scalars['ID']>;
  userId?: Maybe<Scalars['ID']>;
};

export type TypingInput = {
  channelId?: Maybe<Scalars['ID']>;
  groupId?: Maybe<Scalars['ID']>;
  isTyping?: Maybe<Scalars['Boolean']>;
  userId?: Maybe<Scalars['ID']>;
};

export type TypingResponse = {
  __typename?: 'TypingResponse';
  isTyping: Scalars['Boolean'];
  typingUserId: Scalars['ID'];
};

export type UnbanUserFromServerInput = {
  serverId: Scalars['ID'];
  userId: Scalars['ID'];
};

export type UnblockUserInput = {
  userId: Scalars['ID'];
};

export type UnfeatureServerInput = {
  serverId: Scalars['ID'];
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

export type UpdateChannelInput = {
  channelId: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  type?: Maybe<ChannelType>;
};

export type UpdateCommentInput = {
  commentId: Scalars['ID'];
  text: Scalars['String'];
};

export type UpdateCommentVoteInput = {
  commentId: Scalars['ID'];
  type: VoteType;
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

export type UpdatePostVoteInput = {
  postId: Scalars['ID'];
  type: VoteType;
};

export type UpdateRoleInput = {
  color?: Maybe<Scalars['HexColorCode']>;
  name?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<ServerPermission>>;
  roleId: Scalars['ID'];
};

export type UpdateServerInput = {
  avatarFile?: Maybe<Scalars['Upload']>;
  bannerFile?: Maybe<Scalars['Upload']>;
  category?: Maybe<ServerCategory>;
  description?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  isDownvotesEnabled?: Maybe<Scalars['Boolean']>;
  ownerId?: Maybe<Scalars['ID']>;
  serverId: Scalars['ID'];
};


export type User = BaseEntity & {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']>;
  color: Color;
  createdAt: Scalars['DateTime'];
  email?: Maybe<Scalars['EmailAddress']>;
  folders: Array<Folder>;
  groups: Array<Group>;
  id: Scalars['ID'];
  isAdmin: Scalars['Boolean'];
  isCurrentUser: Scalars['Boolean'];
  isOg: Scalars['Boolean'];
  isOnline: Scalars['Boolean'];
  isStaff: Scalars['Boolean'];
  lastLoginAt?: Maybe<Scalars['DateTime']>;
  lastMessageAt?: Maybe<Scalars['DateTime']>;
  onlineStatus: OnlineStatus;
  relatedUsers: Array<User>;
  relationshipStatus: RelationshipStatus;
  servers: Array<Server>;
  showChat: Scalars['Boolean'];
  unreadCount: Scalars['NonNegativeInt'];
  username: Scalars['String'];
};


export enum VoteType {
  Down = 'Down',
  None = 'None',
  Up = 'Up'
}

export type ChannelFragment = (
  { __typename?: 'Channel' }
  & Pick<Channel, 'id' | 'name' | 'description' | 'isUnread' | 'mentionCount' | 'type'>
);

export type CommentFragment = (
  { __typename?: 'Comment' }
  & Pick<Comment, 'id' | 'text' | 'voteCount' | 'voteType' | 'isDeleted' | 'createdAt' | 'updatedAt'>
  & { parentComment?: Maybe<(
    { __typename?: 'Comment' }
    & Pick<Comment, 'id'>
  )>, linkMetadatas: Array<(
    { __typename?: 'LinkMetadata' }
    & MetadataFragment
  )> }
);

export type CurrentUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'isAdmin' | 'email'>
  & { servers: Array<(
    { __typename?: 'Server' }
    & Pick<Server, 'id' | 'name' | 'displayName' | 'avatarUrl' | 'permissions'>
    & { owner: (
      { __typename?: 'User' }
      & Pick<User, 'id'>
    ), channels: Array<(
      { __typename?: 'Channel' }
      & Pick<Channel, 'id' | 'isUnread' | 'mentionCount'>
    )> }
  )>, relatedUsers: Array<(
    { __typename?: 'User' }
    & Pick<User, 'showChat' | 'unreadCount'>
    & UserFragment
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
  )> }
  & UserFragment
);

export type FolderFragment = (
  { __typename?: 'Folder' }
  & Pick<Folder, 'id' | 'name' | 'avatarUrl' | 'description' | 'postCount' | 'followerCount' | 'isCollaborative' | 'visibility'>
);

export type GroupFragment = (
  { __typename?: 'Group' }
  & Pick<Group, 'id' | 'name' | 'displayName' | 'avatarUrl' | 'unreadCount' | 'lastMessageAt'>
);

export type ImageFragment = (
  { __typename?: 'Image' }
  & Pick<Image, 'originalUrl' | 'popupUrl' | 'popupWidth' | 'popupHeight' | 'smallUrl' | 'smallWidth' | 'smallHeight'>
);

export type MessageFragment = (
  { __typename?: 'Message' }
  & Pick<Message, 'id' | 'text' | 'createdAt' | 'updatedAt' | 'type' | 'isEveryoneMentioned' | 'isPinned'>
  & { images: Array<(
    { __typename?: 'Image' }
    & ImageFragment
  )>, file?: Maybe<(
    { __typename?: 'File' }
    & Pick<File, 'url' | 'mime' | 'filename' | 'size'>
  )>, linkMetadatas: Array<(
    { __typename?: 'LinkMetadata' }
    & MetadataFragment
  )>, mentionedUsers: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )> }
);

export type MetadataFragment = (
  { __typename?: 'LinkMetadata' }
  & Pick<LinkMetadata, 'author' | 'date' | 'description' | 'publisher' | 'title' | 'twitterCard' | 'url' | 'domain' | 'themeColor'>
  & { image?: Maybe<(
    { __typename?: 'Image' }
    & ImageFragment
  )> }
);

export type PostFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'title' | 'isPinned' | 'text' | 'linkUrl' | 'relativeUrl' | 'commentCount' | 'voteCount' | 'voteType' | 'thumbnailUrl' | 'domain' | 'isDeleted' | 'createdAt' | 'updatedAt'>
  & { linkMetadata?: Maybe<(
    { __typename?: 'LinkMetadata' }
    & MetadataFragment
  )>, images: Array<(
    { __typename?: 'PostImage' }
    & Pick<PostImage, 'linkUrl' | 'caption'>
    & { image: (
      { __typename?: 'Image' }
      & ImageFragment
    ) }
  )> }
);

export type RelatedUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'showChat' | 'unreadCount' | 'lastMessageAt'>
  & UserFragment
);

export type ReplyFragment = (
  { __typename?: 'Reply' }
  & Pick<Reply, 'id' | 'isRead'>
  & { comment: (
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'text' | 'voteCount' | 'createdAt'>
    & { author?: Maybe<(
      { __typename?: 'User' }
      & UserFragment
    )>, serverUser?: Maybe<(
      { __typename?: 'ServerUser' }
      & ServerUserFragment
    )>, post: (
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'title' | 'relativeUrl'>
      & { server: (
        { __typename?: 'Server' }
        & Pick<Server, 'id' | 'displayName' | 'name' | 'avatarUrl'>
      ) }
    ), parentComment?: Maybe<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'text' | 'voteCount' | 'createdAt'>
      & { author?: Maybe<(
        { __typename?: 'User' }
        & UserFragment
      )>, serverUser?: Maybe<(
        { __typename?: 'ServerUser' }
        & ServerUserFragment
      )> }
    )> }
  ) }
);

export type RoleFragment = (
  { __typename?: 'Role' }
  & Pick<Role, 'id' | 'name' | 'color' | 'permissions' | 'isDefault'>
);

export type ServerFragment = (
  { __typename?: 'Server' }
  & Pick<Server, 'id' | 'name' | 'displayName' | 'description' | 'avatarUrl' | 'bannerUrl' | 'category' | 'userCount' | 'isJoined' | 'isFeatured' | 'isDownvotesEnabled' | 'permissions'>
  & { owner: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type ServerUserFragment = (
  { __typename?: 'ServerUser' }
  & Pick<ServerUser, 'id'>
  & { role: (
    { __typename?: 'Role' }
    & RoleFragment
  ), user: (
    { __typename?: 'User' }
    & UserFragment
  ) }
);

export type UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'avatarUrl' | 'isOnline' | 'onlineStatus' | 'isCurrentUser' | 'color' | 'isOg' | 'isStaff' | 'showChat'>
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

export type CreateCommentMutationVariables = Exact<{
  input: CreateCommentInput;
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment: (
    { __typename?: 'Comment' }
    & { author?: Maybe<(
      { __typename?: 'User' }
      & UserFragment
    )>, serverUser?: Maybe<(
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
      { __typename?: 'User' }
      & UserFragment
    )>, serverUser?: Maybe<(
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
      { __typename?: 'User' }
      & UserFragment
    )>, serverUser?: Maybe<(
      { __typename?: 'ServerUser' }
      & ServerUserFragment
    )> }
    & CommentFragment
  ) }
);

export type UpdateCommentVoteMutationVariables = Exact<{
  input: UpdateCommentVoteInput;
}>;


export type UpdateCommentVoteMutation = (
  { __typename?: 'Mutation' }
  & { updateCommentVote: (
    { __typename?: 'Comment' }
    & { author?: Maybe<(
      { __typename?: 'User' }
      & UserFragment
    )>, serverUser?: Maybe<(
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
      { __typename?: 'User' }
      & UserFragment
    )>, serverUser?: Maybe<(
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
      { __typename?: 'User' }
      & UserFragment
    )>, serverUser?: Maybe<(
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

export type UpdateTypingMutationVariables = Exact<{
  input: TypingInput;
}>;


export type UpdateTypingMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateTyping'>
);

export type CreatePostMutationVariables = Exact<{
  input: CreatePostInput;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & { author?: Maybe<(
      { __typename?: 'User' }
      & UserFragment
    )>, serverUser?: Maybe<(
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
      { __typename?: 'User' }
      & UserFragment
    )>, serverUser?: Maybe<(
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
      { __typename?: 'User' }
      & UserFragment
    )>, serverUser?: Maybe<(
      { __typename?: 'ServerUser' }
      & ServerUserFragment
    )> }
    & PostFragment
  ) }
);

export type UpdatePostVoteMutationVariables = Exact<{
  input: UpdatePostVoteInput;
}>;


export type UpdatePostVoteMutation = (
  { __typename?: 'Mutation' }
  & { updatePostVote: (
    { __typename?: 'Post' }
    & { author?: Maybe<(
      { __typename?: 'User' }
      & UserFragment
    )>, serverUser?: Maybe<(
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
      { __typename?: 'User' }
      & UserFragment
    )>, serverUser?: Maybe<(
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
      { __typename?: 'User' }
      & UserFragment
    )>, serverUser?: Maybe<(
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
    { __typename?: 'User' }
    & { relatedUsers: Array<(
      { __typename?: 'User' }
      & RelatedUserFragment
    )>, servers: Array<(
      { __typename?: 'Server' }
      & Pick<Server, 'id' | 'avatarUrl' | 'name'>
    )> }
    & UserFragment
  ) }
);

export type DeleteFriendRequestMutationVariables = Exact<{
  input: DeleteFriendRequestInput;
}>;


export type DeleteFriendRequestMutation = (
  { __typename?: 'Mutation' }
  & { deleteFriendRequest: (
    { __typename?: 'User' }
    & { relatedUsers: Array<(
      { __typename?: 'User' }
      & RelatedUserFragment
    )>, servers: Array<(
      { __typename?: 'Server' }
      & Pick<Server, 'id' | 'avatarUrl' | 'name'>
    )> }
    & UserFragment
  ) }
);

export type AnswerFriendRequestMutationVariables = Exact<{
  input: AnswerFriendRequestInput;
}>;


export type AnswerFriendRequestMutation = (
  { __typename?: 'Mutation' }
  & { answerFriendRequest: (
    { __typename?: 'User' }
    & RelatedUserFragment
  ) }
);

export type BlockUserMutationVariables = Exact<{
  input: BlockUserInput;
}>;


export type BlockUserMutation = (
  { __typename?: 'Mutation' }
  & { blockUser: (
    { __typename?: 'User' }
    & RelatedUserFragment
  ) }
);

export type UnblockUserMutationVariables = Exact<{
  input: UnblockUserInput;
}>;


export type UnblockUserMutation = (
  { __typename?: 'Mutation' }
  & { unblockUser: (
    { __typename?: 'User' }
    & RelatedUserFragment
  ) }
);

export type RemoveFriendMutationVariables = Exact<{
  input: RemoveFriendInput;
}>;


export type RemoveFriendMutation = (
  { __typename?: 'Mutation' }
  & { removeFriend: (
    { __typename?: 'User' }
    & RelatedUserFragment
  ) }
);

export type ReadDmMutationVariables = Exact<{
  input: ReadDmInput;
}>;


export type ReadDmMutation = (
  { __typename?: 'Mutation' }
  & { readDm: (
    { __typename?: 'User' }
    & RelatedUserFragment
  ) }
);

export type OpenDmMutationVariables = Exact<{
  input: OpenDmInput;
}>;


export type OpenDmMutation = (
  { __typename?: 'Mutation' }
  & { openDm: (
    { __typename?: 'User' }
    & RelatedUserFragment
  ) }
);

export type CloseDmMutationVariables = Exact<{
  input: CloseDmInput;
}>;


export type CloseDmMutation = (
  { __typename?: 'Mutation' }
  & { closeDm: (
    { __typename?: 'User' }
    & RelatedUserFragment
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

export type MarkReplyUnreadMutationVariables = Exact<{
  input: MarkReplyUnreadInput;
}>;


export type MarkReplyUnreadMutation = (
  { __typename?: 'Mutation' }
  & { markReplyUnread: (
    { __typename?: 'Reply' }
    & ReplyFragment
  ) }
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

export type SetUserRoleMutationVariables = Exact<{
  input: SetUserRoleInput;
}>;


export type SetUserRoleMutation = (
  { __typename?: 'Mutation' }
  & { setUserRole: (
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
    & { roles: Array<(
      { __typename?: 'Role' }
      & RoleFragment
    )> }
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
  & Pick<Mutation, 'moveServer'>
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
  & { leaveServer: (
    { __typename?: 'Server' }
    & ServerFragment
  ) }
);

export type ReadServerMutationVariables = Exact<{
  input: ReadServerInput;
}>;


export type ReadServerMutation = (
  { __typename?: 'Mutation' }
  & { readServer: (
    { __typename?: 'Server' }
    & ServerFragment
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

export type FeatureServerMutationVariables = Exact<{
  input: FeatureServerInput;
}>;


export type FeatureServerMutation = (
  { __typename?: 'Mutation' }
  & { featureServer: (
    { __typename?: 'Server' }
    & ServerFragment
  ) }
);

export type UnfeatureServerMutationVariables = Exact<{
  input: UnfeatureServerInput;
}>;


export type UnfeatureServerMutation = (
  { __typename?: 'Mutation' }
  & { unfeatureServer: (
    { __typename?: 'Server' }
    & ServerFragment
  ) }
);

export type CreateAccountMutationVariables = Exact<{
  input: CreateAccountInput;
}>;


export type CreateAccountMutation = (
  { __typename?: 'Mutation' }
  & { createAccount: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & CurrentUserFragment
    ) }
  ) }
);

export type ChangePasswordMutationVariables = Exact<{
  input: ChangePasswordInput;
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'User' }
    & CurrentUserFragment
  ) }
);

export type ChangeUserAvatarMutationVariables = Exact<{
  input: ChangeUserAvatarInput;
}>;


export type ChangeUserAvatarMutation = (
  { __typename?: 'Mutation' }
  & { changeUserAvatar: (
    { __typename?: 'User' }
    & CurrentUserFragment
  ) }
);

export type DeleteAccountMutationVariables = Exact<{
  input: DeleteAccountInput;
}>;


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
    & { user: (
      { __typename?: 'User' }
      & CurrentUserFragment
    ) }
  ) }
);

export type ChangeOnlineStatusMutationVariables = Exact<{
  input: ChangeOnlineStatusInput;
}>;


export type ChangeOnlineStatusMutation = (
  { __typename?: 'Mutation' }
  & { changeOnlineStatus: (
    { __typename?: 'User' }
    & CurrentUserFragment
  ) }
);

export type GlobalBanMutationVariables = Exact<{
  input: GlobalBanInput;
}>;


export type GlobalBanMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'globalBan'>
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
      { __typename?: 'User' }
      & UserFragment
    )>, serverUser?: Maybe<(
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
    & CurrentUserFragment
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
      & Pick<Server, 'id' | 'displayName' | 'name' | 'avatarUrl' | 'permissions'>
    )> }
    & FolderFragment
  ) }
);

export type GetLinkMetaQueryVariables = Exact<{
  linkUrl: Scalars['String'];
}>;


export type GetLinkMetaQuery = (
  { __typename?: 'Query' }
  & { getLinkMeta?: Maybe<(
    { __typename?: 'LinkMetadata' }
    & MetadataFragment
  )> }
);

export type MessagesQueryVariables = Exact<{
  channelId?: Maybe<Scalars['ID']>;
  userId?: Maybe<Scalars['ID']>;
  groupId?: Maybe<Scalars['ID']>;
  limit?: Maybe<Scalars['PositiveInt']>;
  cursor?: Maybe<Scalars['ID']>;
}>;


export type MessagesQuery = (
  { __typename?: 'Query' }
  & { messages: (
    { __typename?: 'MessagesResponse' }
    & Pick<MessagesResponse, 'hasMore'>
    & { messages: Array<(
      { __typename?: 'Message' }
      & { author: (
        { __typename?: 'User' }
        & UserFragment
      ), serverUser?: Maybe<(
        { __typename?: 'ServerUser' }
        & ServerUserFragment
      )> }
      & MessageFragment
    )> }
  ) }
);

export type PostQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PostQuery = (
  { __typename?: 'Query' }
  & { post: (
    { __typename?: 'Post' }
    & { author?: Maybe<(
      { __typename?: 'User' }
      & UserFragment
    )>, serverUser?: Maybe<(
      { __typename?: 'ServerUser' }
      & ServerUserFragment
    )>, server: (
      { __typename?: 'Server' }
      & Pick<Server, 'id' | 'name' | 'avatarUrl' | 'isDownvotesEnabled' | 'displayName' | 'permissions'>
    ) }
    & PostFragment
  ) }
);

export type PostsQueryVariables = Exact<{
  sort?: Maybe<PostsSort>;
  offset?: Maybe<Scalars['NonNegativeInt']>;
  limit?: Maybe<Scalars['PositiveInt']>;
  time?: Maybe<PostsTime>;
  folderId?: Maybe<Scalars['ID']>;
  serverId?: Maybe<Scalars['ID']>;
  search?: Maybe<Scalars['String']>;
  feed?: Maybe<PostsFeed>;
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: (
    { __typename?: 'PostsResponse' }
    & Pick<PostsResponse, 'hasMore'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & { author?: Maybe<(
        { __typename?: 'User' }
        & UserFragment
      )>, serverUser?: Maybe<(
        { __typename?: 'ServerUser' }
        & ServerUserFragment
      )>, server: (
        { __typename?: 'Server' }
        & Pick<Server, 'id' | 'name' | 'avatarUrl' | 'isDownvotesEnabled' | 'displayName' | 'permissions'>
      ) }
      & PostFragment
    )> }
  ) }
);

export type PublicServersQueryVariables = Exact<{
  sort?: Maybe<PublicServersSort>;
  category?: Maybe<ServerCategory>;
  featured?: Maybe<Scalars['Boolean']>;
}>;


export type PublicServersQuery = (
  { __typename?: 'Query' }
  & { publicServers: Array<(
    { __typename?: 'Server' }
    & Pick<Server, 'id' | 'name' | 'displayName' | 'avatarUrl' | 'bannerUrl' | 'description' | 'userCount' | 'category' | 'isFeatured'>
  )> }
);

export type RepliesQueryVariables = Exact<{ [key: string]: never; }>;


export type RepliesQuery = (
  { __typename?: 'Query' }
  & { replies: Array<(
    { __typename?: 'Reply' }
    & ReplyFragment
  )> }
);

export type ServerQueryVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
}>;


export type ServerQuery = (
  { __typename?: 'Query' }
  & { server?: Maybe<(
    { __typename?: 'Server' }
    & Pick<Server, 'permissions'>
    & { channels: Array<(
      { __typename?: 'Channel' }
      & ChannelFragment
    )>, roles: Array<(
      { __typename?: 'Role' }
      & RoleFragment
    )> }
    & ServerFragment
  )> }
);

export type ServerUsersQueryVariables = Exact<{
  serverId: Scalars['ID'];
}>;


export type ServerUsersQuery = (
  { __typename?: 'Query' }
  & { serverUsers: Array<(
    { __typename?: 'ServerUser' }
    & ServerUserFragment
  )> }
);

export type UserQueryVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
  username?: Maybe<Scalars['String']>;
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & { relatedUsers: Array<(
      { __typename?: 'User' }
      & UserFragment
    )>, servers: Array<(
      { __typename?: 'Server' }
      & Pick<Server, 'id' | 'avatarUrl' | 'name'>
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
      & { author: (
        { __typename?: 'User' }
        & UserFragment
      ), serverUser?: Maybe<(
        { __typename?: 'ServerUser' }
        & ServerUserFragment
      )>, channel?: Maybe<(
        { __typename?: 'Channel' }
        & Pick<Channel, 'name' | 'id'>
        & { server: (
          { __typename?: 'Server' }
          & Pick<Server, 'id' | 'name'>
        ) }
      )>, group?: Maybe<(
        { __typename?: 'Group' }
        & Pick<Group, 'displayName' | 'id'>
      )>, toUser?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'username' | 'id'>
      )> }
      & MessageFragment
    )>, updated?: Maybe<(
      { __typename?: 'Message' }
      & { author: (
        { __typename?: 'User' }
        & UserFragment
      ), serverUser?: Maybe<(
        { __typename?: 'ServerUser' }
        & ServerUserFragment
      )> }
      & MessageFragment
    )>, deleted?: Maybe<(
      { __typename?: 'Message' }
      & Pick<Message, 'id'>
      & { channel?: Maybe<(
        { __typename?: 'Channel' }
        & Pick<Channel, 'id'>
      )>, group?: Maybe<(
        { __typename?: 'Group' }
        & Pick<Group, 'id'>
      )>, toUser?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id'>
      )> }
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
      & PostFragment
    )>, updated?: Maybe<(
      { __typename?: 'Post' }
      & PostFragment
    )>, deleted?: Maybe<(
      { __typename?: 'Post' }
      & PostFragment
    )> }
  ) }
);

export type ReplyChangedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ReplyChangedSubscription = (
  { __typename?: 'Subscription' }
  & { replyChanged: (
    { __typename?: 'ReplyChangedResponse' }
    & { added?: Maybe<(
      { __typename?: 'Reply' }
      & ReplyFragment
    )>, updated?: Maybe<(
      { __typename?: 'Reply' }
      & ReplyFragment
    )>, deleted?: Maybe<(
      { __typename?: 'Reply' }
      & ReplyFragment
    )> }
  ) }
);

export type TypingUpdatedSubscriptionVariables = Exact<{
  userId?: Maybe<Scalars['ID']>;
  groupId?: Maybe<Scalars['ID']>;
  channelId?: Maybe<Scalars['ID']>;
}>;


export type TypingUpdatedSubscription = (
  { __typename?: 'Subscription' }
  & { typingUpdated: (
    { __typename?: 'TypingResponse' }
    & Pick<TypingResponse, 'typingUserId' | 'isTyping'>
  ) }
);

export const ChannelFragmentDoc = gql`
    fragment Channel on Channel {
  id
  name
  description
  isUnread
  mentionCount
  type
}
    `;
export const ImageFragmentDoc = gql`
    fragment Image on Image {
  originalUrl
  popupUrl
  popupWidth
  popupHeight
  smallUrl
  smallWidth
  smallHeight
}
    `;
export const MetadataFragmentDoc = gql`
    fragment Metadata on LinkMetadata {
  author
  date
  description
  image {
    ...Image
  }
  publisher
  title
  twitterCard
  url
  domain
  themeColor
}
    ${ImageFragmentDoc}`;
export const CommentFragmentDoc = gql`
    fragment Comment on Comment {
  id
  parentComment {
    id
  }
  text
  voteCount
  voteType
  isDeleted
  createdAt
  updatedAt
  linkMetadatas {
    ...Metadata
  }
}
    ${MetadataFragmentDoc}`;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  username
  avatarUrl
  isOnline
  onlineStatus
  isCurrentUser
  color
  isOg
  isStaff
  showChat
}
    `;
export const GroupFragmentDoc = gql`
    fragment Group on Group {
  id
  name
  displayName
  avatarUrl
  unreadCount
  lastMessageAt
}
    `;
export const CurrentUserFragmentDoc = gql`
    fragment CurrentUser on User {
  ...User
  isAdmin
  email
  servers {
    id
    name
    displayName
    avatarUrl
    owner {
      id
    }
    permissions
    channels {
      id
      isUnread
      mentionCount
    }
  }
  relatedUsers {
    ...User
    showChat
    unreadCount
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
}
    ${UserFragmentDoc}
${GroupFragmentDoc}`;
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
export const MessageFragmentDoc = gql`
    fragment Message on Message {
  id
  text
  createdAt
  updatedAt
  type
  images {
    ...Image
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
  mentionedUsers {
    id
  }
  isEveryoneMentioned
  isPinned
}
    ${ImageFragmentDoc}
${MetadataFragmentDoc}`;
export const PostFragmentDoc = gql`
    fragment Post on Post {
  id
  title
  isPinned
  text
  linkUrl
  relativeUrl
  commentCount
  voteCount
  voteType
  thumbnailUrl
  domain
  isDeleted
  createdAt
  updatedAt
  linkMetadata {
    ...Metadata
  }
  images {
    image {
      ...Image
    }
    linkUrl
    caption
  }
}
    ${MetadataFragmentDoc}
${ImageFragmentDoc}`;
export const RelatedUserFragmentDoc = gql`
    fragment RelatedUser on User {
  ...User
  showChat
  unreadCount
  lastMessageAt
}
    ${UserFragmentDoc}`;
export const RoleFragmentDoc = gql`
    fragment Role on Role {
  id
  name
  color
  permissions
  isDefault
}
    `;
export const ServerUserFragmentDoc = gql`
    fragment ServerUser on ServerUser {
  id
  role {
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
    createdAt
    author {
      ...User
    }
    serverUser {
      ...ServerUser
    }
    post {
      id
      title
      relativeUrl
      server {
        id
        displayName
        name
        avatarUrl
      }
    }
    parentComment {
      id
      text
      voteCount
      createdAt
      author {
        ...User
      }
      serverUser {
        ...ServerUser
      }
    }
  }
}
    ${UserFragmentDoc}
${ServerUserFragmentDoc}`;
export const ServerFragmentDoc = gql`
    fragment Server on Server {
  id
  name
  displayName
  description
  avatarUrl
  bannerUrl
  category
  userCount
  isJoined
  isFeatured
  isDownvotesEnabled
  owner {
    id
  }
  permissions
}
    `;
export const CreateChannelDocument = gql`
    mutation createChannel($input: CreateChannelInput!) {
  createChannel(input: $input) {
    ...Channel
  }
}
    ${ChannelFragmentDoc}`;
export type CreateChannelMutationFn = Apollo.MutationFunction<CreateChannelMutation, CreateChannelMutationVariables>;

/**
 * __useCreateChannelMutation__
 *
 * To run a mutation, you first call `useCreateChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChannelMutation, { data, loading, error }] = useCreateChannelMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateChannelMutation(baseOptions?: Apollo.MutationHookOptions<CreateChannelMutation, CreateChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChannelMutation, CreateChannelMutationVariables>(CreateChannelDocument, options);
      }
export type CreateChannelMutationHookResult = ReturnType<typeof useCreateChannelMutation>;
export type CreateChannelMutationResult = Apollo.MutationResult<CreateChannelMutation>;
export type CreateChannelMutationOptions = Apollo.BaseMutationOptions<CreateChannelMutation, CreateChannelMutationVariables>;
export const UpdateChannelDocument = gql`
    mutation updateChannel($input: UpdateChannelInput!) {
  updateChannel(input: $input) {
    ...Channel
  }
}
    ${ChannelFragmentDoc}`;
export type UpdateChannelMutationFn = Apollo.MutationFunction<UpdateChannelMutation, UpdateChannelMutationVariables>;

/**
 * __useUpdateChannelMutation__
 *
 * To run a mutation, you first call `useUpdateChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChannelMutation, { data, loading, error }] = useUpdateChannelMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateChannelMutation(baseOptions?: Apollo.MutationHookOptions<UpdateChannelMutation, UpdateChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateChannelMutation, UpdateChannelMutationVariables>(UpdateChannelDocument, options);
      }
export type UpdateChannelMutationHookResult = ReturnType<typeof useUpdateChannelMutation>;
export type UpdateChannelMutationResult = Apollo.MutationResult<UpdateChannelMutation>;
export type UpdateChannelMutationOptions = Apollo.BaseMutationOptions<UpdateChannelMutation, UpdateChannelMutationVariables>;
export const DeleteChannelDocument = gql`
    mutation deleteChannel($input: DeleteChannelInput!) {
  deleteChannel(input: $input)
}
    `;
export type DeleteChannelMutationFn = Apollo.MutationFunction<DeleteChannelMutation, DeleteChannelMutationVariables>;

/**
 * __useDeleteChannelMutation__
 *
 * To run a mutation, you first call `useDeleteChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteChannelMutation, { data, loading, error }] = useDeleteChannelMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteChannelMutation(baseOptions?: Apollo.MutationHookOptions<DeleteChannelMutation, DeleteChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteChannelMutation, DeleteChannelMutationVariables>(DeleteChannelDocument, options);
      }
export type DeleteChannelMutationHookResult = ReturnType<typeof useDeleteChannelMutation>;
export type DeleteChannelMutationResult = Apollo.MutationResult<DeleteChannelMutation>;
export type DeleteChannelMutationOptions = Apollo.BaseMutationOptions<DeleteChannelMutation, DeleteChannelMutationVariables>;
export const MoveChannelDocument = gql`
    mutation moveChannel($input: MoveChannelInput!) {
  moveChannel(input: $input) {
    ...Channel
  }
}
    ${ChannelFragmentDoc}`;
export type MoveChannelMutationFn = Apollo.MutationFunction<MoveChannelMutation, MoveChannelMutationVariables>;

/**
 * __useMoveChannelMutation__
 *
 * To run a mutation, you first call `useMoveChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveChannelMutation, { data, loading, error }] = useMoveChannelMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMoveChannelMutation(baseOptions?: Apollo.MutationHookOptions<MoveChannelMutation, MoveChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MoveChannelMutation, MoveChannelMutationVariables>(MoveChannelDocument, options);
      }
export type MoveChannelMutationHookResult = ReturnType<typeof useMoveChannelMutation>;
export type MoveChannelMutationResult = Apollo.MutationResult<MoveChannelMutation>;
export type MoveChannelMutationOptions = Apollo.BaseMutationOptions<MoveChannelMutation, MoveChannelMutationVariables>;
export const ReadChannelDocument = gql`
    mutation readChannel($input: ReadChannelInput!) {
  readChannel(input: $input) {
    ...Channel
  }
}
    ${ChannelFragmentDoc}`;
export type ReadChannelMutationFn = Apollo.MutationFunction<ReadChannelMutation, ReadChannelMutationVariables>;

/**
 * __useReadChannelMutation__
 *
 * To run a mutation, you first call `useReadChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReadChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [readChannelMutation, { data, loading, error }] = useReadChannelMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReadChannelMutation(baseOptions?: Apollo.MutationHookOptions<ReadChannelMutation, ReadChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReadChannelMutation, ReadChannelMutationVariables>(ReadChannelDocument, options);
      }
export type ReadChannelMutationHookResult = ReturnType<typeof useReadChannelMutation>;
export type ReadChannelMutationResult = Apollo.MutationResult<ReadChannelMutation>;
export type ReadChannelMutationOptions = Apollo.BaseMutationOptions<ReadChannelMutation, ReadChannelMutationVariables>;
export const CreateCommentDocument = gql`
    mutation createComment($input: CreateCommentInput!) {
  createComment(input: $input) {
    ...Comment
    author {
      ...User
    }
    serverUser {
      ...ServerUser
    }
  }
}
    ${CommentFragmentDoc}
${UserFragmentDoc}
${ServerUserFragmentDoc}`;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const UpdateCommentDocument = gql`
    mutation updateComment($input: UpdateCommentInput!) {
  updateComment(input: $input) {
    ...Comment
    author {
      ...User
    }
    serverUser {
      ...ServerUser
    }
  }
}
    ${CommentFragmentDoc}
${UserFragmentDoc}
${ServerUserFragmentDoc}`;
export type UpdateCommentMutationFn = Apollo.MutationFunction<UpdateCommentMutation, UpdateCommentMutationVariables>;

/**
 * __useUpdateCommentMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutation, { data, loading, error }] = useUpdateCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCommentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommentMutation, UpdateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCommentMutation, UpdateCommentMutationVariables>(UpdateCommentDocument, options);
      }
export type UpdateCommentMutationHookResult = ReturnType<typeof useUpdateCommentMutation>;
export type UpdateCommentMutationResult = Apollo.MutationResult<UpdateCommentMutation>;
export type UpdateCommentMutationOptions = Apollo.BaseMutationOptions<UpdateCommentMutation, UpdateCommentMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation deleteComment($input: DeleteCommentInput!) {
  deleteComment(input: $input) {
    ...Comment
    author {
      ...User
    }
    serverUser {
      ...ServerUser
    }
  }
}
    ${CommentFragmentDoc}
${UserFragmentDoc}
${ServerUserFragmentDoc}`;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const UpdateCommentVoteDocument = gql`
    mutation updateCommentVote($input: UpdateCommentVoteInput!) {
  updateCommentVote(input: $input) {
    ...Comment
    author {
      ...User
    }
    serverUser {
      ...ServerUser
    }
  }
}
    ${CommentFragmentDoc}
${UserFragmentDoc}
${ServerUserFragmentDoc}`;
export type UpdateCommentVoteMutationFn = Apollo.MutationFunction<UpdateCommentVoteMutation, UpdateCommentVoteMutationVariables>;

/**
 * __useUpdateCommentVoteMutation__
 *
 * To run a mutation, you first call `useUpdateCommentVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentVoteMutation, { data, loading, error }] = useUpdateCommentVoteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCommentVoteMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommentVoteMutation, UpdateCommentVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCommentVoteMutation, UpdateCommentVoteMutationVariables>(UpdateCommentVoteDocument, options);
      }
export type UpdateCommentVoteMutationHookResult = ReturnType<typeof useUpdateCommentVoteMutation>;
export type UpdateCommentVoteMutationResult = Apollo.MutationResult<UpdateCommentVoteMutation>;
export type UpdateCommentVoteMutationOptions = Apollo.BaseMutationOptions<UpdateCommentVoteMutation, UpdateCommentVoteMutationVariables>;
export const PinCommentDocument = gql`
    mutation pinComment($input: PinCommentInput!) {
  pinComment(input: $input) {
    ...Comment
    author {
      ...User
    }
    serverUser {
      ...ServerUser
    }
  }
}
    ${CommentFragmentDoc}
${UserFragmentDoc}
${ServerUserFragmentDoc}`;
export type PinCommentMutationFn = Apollo.MutationFunction<PinCommentMutation, PinCommentMutationVariables>;

/**
 * __usePinCommentMutation__
 *
 * To run a mutation, you first call `usePinCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePinCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pinCommentMutation, { data, loading, error }] = usePinCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePinCommentMutation(baseOptions?: Apollo.MutationHookOptions<PinCommentMutation, PinCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PinCommentMutation, PinCommentMutationVariables>(PinCommentDocument, options);
      }
export type PinCommentMutationHookResult = ReturnType<typeof usePinCommentMutation>;
export type PinCommentMutationResult = Apollo.MutationResult<PinCommentMutation>;
export type PinCommentMutationOptions = Apollo.BaseMutationOptions<PinCommentMutation, PinCommentMutationVariables>;
export const UnpinCommentDocument = gql`
    mutation unpinComment($input: UnpinCommentInput!) {
  unpinComment(input: $input) {
    ...Comment
    author {
      ...User
    }
    serverUser {
      ...ServerUser
    }
  }
}
    ${CommentFragmentDoc}
${UserFragmentDoc}
${ServerUserFragmentDoc}`;
export type UnpinCommentMutationFn = Apollo.MutationFunction<UnpinCommentMutation, UnpinCommentMutationVariables>;

/**
 * __useUnpinCommentMutation__
 *
 * To run a mutation, you first call `useUnpinCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnpinCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unpinCommentMutation, { data, loading, error }] = useUnpinCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUnpinCommentMutation(baseOptions?: Apollo.MutationHookOptions<UnpinCommentMutation, UnpinCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnpinCommentMutation, UnpinCommentMutationVariables>(UnpinCommentDocument, options);
      }
export type UnpinCommentMutationHookResult = ReturnType<typeof useUnpinCommentMutation>;
export type UnpinCommentMutationResult = Apollo.MutationResult<UnpinCommentMutation>;
export type UnpinCommentMutationOptions = Apollo.BaseMutationOptions<UnpinCommentMutation, UnpinCommentMutationVariables>;
export const CreateFolderDocument = gql`
    mutation createFolder($input: CreateFolderInput!) {
  createFolder(input: $input) {
    ...Folder
  }
}
    ${FolderFragmentDoc}`;
export type CreateFolderMutationFn = Apollo.MutationFunction<CreateFolderMutation, CreateFolderMutationVariables>;

/**
 * __useCreateFolderMutation__
 *
 * To run a mutation, you first call `useCreateFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFolderMutation, { data, loading, error }] = useCreateFolderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateFolderMutation(baseOptions?: Apollo.MutationHookOptions<CreateFolderMutation, CreateFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFolderMutation, CreateFolderMutationVariables>(CreateFolderDocument, options);
      }
export type CreateFolderMutationHookResult = ReturnType<typeof useCreateFolderMutation>;
export type CreateFolderMutationResult = Apollo.MutationResult<CreateFolderMutation>;
export type CreateFolderMutationOptions = Apollo.BaseMutationOptions<CreateFolderMutation, CreateFolderMutationVariables>;
export const UpdateFolderDocument = gql`
    mutation updateFolder($input: UpdateFolderInput!) {
  updateFolder(input: $input) {
    ...Folder
  }
}
    ${FolderFragmentDoc}`;
export type UpdateFolderMutationFn = Apollo.MutationFunction<UpdateFolderMutation, UpdateFolderMutationVariables>;

/**
 * __useUpdateFolderMutation__
 *
 * To run a mutation, you first call `useUpdateFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFolderMutation, { data, loading, error }] = useUpdateFolderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateFolderMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFolderMutation, UpdateFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFolderMutation, UpdateFolderMutationVariables>(UpdateFolderDocument, options);
      }
export type UpdateFolderMutationHookResult = ReturnType<typeof useUpdateFolderMutation>;
export type UpdateFolderMutationResult = Apollo.MutationResult<UpdateFolderMutation>;
export type UpdateFolderMutationOptions = Apollo.BaseMutationOptions<UpdateFolderMutation, UpdateFolderMutationVariables>;
export const DeleteFolderDocument = gql`
    mutation deleteFolder($input: DeleteFolderInput!) {
  deleteFolder(input: $input)
}
    `;
export type DeleteFolderMutationFn = Apollo.MutationFunction<DeleteFolderMutation, DeleteFolderMutationVariables>;

/**
 * __useDeleteFolderMutation__
 *
 * To run a mutation, you first call `useDeleteFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFolderMutation, { data, loading, error }] = useDeleteFolderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteFolderMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFolderMutation, DeleteFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFolderMutation, DeleteFolderMutationVariables>(DeleteFolderDocument, options);
      }
export type DeleteFolderMutationHookResult = ReturnType<typeof useDeleteFolderMutation>;
export type DeleteFolderMutationResult = Apollo.MutationResult<DeleteFolderMutation>;
export type DeleteFolderMutationOptions = Apollo.BaseMutationOptions<DeleteFolderMutation, DeleteFolderMutationVariables>;
export const MoveServerFolderDocument = gql`
    mutation moveServerFolder($input: MoveServerFolderInput!) {
  moveServerFolder(input: $input) {
    ...Folder
  }
}
    ${FolderFragmentDoc}`;
export type MoveServerFolderMutationFn = Apollo.MutationFunction<MoveServerFolderMutation, MoveServerFolderMutationVariables>;

/**
 * __useMoveServerFolderMutation__
 *
 * To run a mutation, you first call `useMoveServerFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveServerFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveServerFolderMutation, { data, loading, error }] = useMoveServerFolderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMoveServerFolderMutation(baseOptions?: Apollo.MutationHookOptions<MoveServerFolderMutation, MoveServerFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MoveServerFolderMutation, MoveServerFolderMutationVariables>(MoveServerFolderDocument, options);
      }
export type MoveServerFolderMutationHookResult = ReturnType<typeof useMoveServerFolderMutation>;
export type MoveServerFolderMutationResult = Apollo.MutationResult<MoveServerFolderMutation>;
export type MoveServerFolderMutationOptions = Apollo.BaseMutationOptions<MoveServerFolderMutation, MoveServerFolderMutationVariables>;
export const MoveUserFolderDocument = gql`
    mutation moveUserFolder($input: MoveUserFolderInput!) {
  moveUserFolder(input: $input) {
    ...Folder
  }
}
    ${FolderFragmentDoc}`;
export type MoveUserFolderMutationFn = Apollo.MutationFunction<MoveUserFolderMutation, MoveUserFolderMutationVariables>;

/**
 * __useMoveUserFolderMutation__
 *
 * To run a mutation, you first call `useMoveUserFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveUserFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveUserFolderMutation, { data, loading, error }] = useMoveUserFolderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMoveUserFolderMutation(baseOptions?: Apollo.MutationHookOptions<MoveUserFolderMutation, MoveUserFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MoveUserFolderMutation, MoveUserFolderMutationVariables>(MoveUserFolderDocument, options);
      }
export type MoveUserFolderMutationHookResult = ReturnType<typeof useMoveUserFolderMutation>;
export type MoveUserFolderMutationResult = Apollo.MutationResult<MoveUserFolderMutation>;
export type MoveUserFolderMutationOptions = Apollo.BaseMutationOptions<MoveUserFolderMutation, MoveUserFolderMutationVariables>;
export const FollowFolderDocument = gql`
    mutation followFolder($input: FollowFolderInput!) {
  followFolder(input: $input) {
    ...Folder
  }
}
    ${FolderFragmentDoc}`;
export type FollowFolderMutationFn = Apollo.MutationFunction<FollowFolderMutation, FollowFolderMutationVariables>;

/**
 * __useFollowFolderMutation__
 *
 * To run a mutation, you first call `useFollowFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followFolderMutation, { data, loading, error }] = useFollowFolderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFollowFolderMutation(baseOptions?: Apollo.MutationHookOptions<FollowFolderMutation, FollowFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowFolderMutation, FollowFolderMutationVariables>(FollowFolderDocument, options);
      }
export type FollowFolderMutationHookResult = ReturnType<typeof useFollowFolderMutation>;
export type FollowFolderMutationResult = Apollo.MutationResult<FollowFolderMutation>;
export type FollowFolderMutationOptions = Apollo.BaseMutationOptions<FollowFolderMutation, FollowFolderMutationVariables>;
export const UnfollowFolderDocument = gql`
    mutation unfollowFolder($input: UnfollowFolderInput!) {
  unfollowFolder(input: $input) {
    ...Folder
  }
}
    ${FolderFragmentDoc}`;
export type UnfollowFolderMutationFn = Apollo.MutationFunction<UnfollowFolderMutation, UnfollowFolderMutationVariables>;

/**
 * __useUnfollowFolderMutation__
 *
 * To run a mutation, you first call `useUnfollowFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowFolderMutation, { data, loading, error }] = useUnfollowFolderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUnfollowFolderMutation(baseOptions?: Apollo.MutationHookOptions<UnfollowFolderMutation, UnfollowFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnfollowFolderMutation, UnfollowFolderMutationVariables>(UnfollowFolderDocument, options);
      }
export type UnfollowFolderMutationHookResult = ReturnType<typeof useUnfollowFolderMutation>;
export type UnfollowFolderMutationResult = Apollo.MutationResult<UnfollowFolderMutation>;
export type UnfollowFolderMutationOptions = Apollo.BaseMutationOptions<UnfollowFolderMutation, UnfollowFolderMutationVariables>;
export const AddPostToFolderDocument = gql`
    mutation addPostToFolder($input: AddPostToFolderInput!) {
  addPostToFolder(input: $input) {
    ...Folder
  }
}
    ${FolderFragmentDoc}`;
export type AddPostToFolderMutationFn = Apollo.MutationFunction<AddPostToFolderMutation, AddPostToFolderMutationVariables>;

/**
 * __useAddPostToFolderMutation__
 *
 * To run a mutation, you first call `useAddPostToFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPostToFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPostToFolderMutation, { data, loading, error }] = useAddPostToFolderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddPostToFolderMutation(baseOptions?: Apollo.MutationHookOptions<AddPostToFolderMutation, AddPostToFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPostToFolderMutation, AddPostToFolderMutationVariables>(AddPostToFolderDocument, options);
      }
export type AddPostToFolderMutationHookResult = ReturnType<typeof useAddPostToFolderMutation>;
export type AddPostToFolderMutationResult = Apollo.MutationResult<AddPostToFolderMutation>;
export type AddPostToFolderMutationOptions = Apollo.BaseMutationOptions<AddPostToFolderMutation, AddPostToFolderMutationVariables>;
export const RemovePostFromFolderDocument = gql`
    mutation removePostFromFolder($input: RemovePostFromFolderInput!) {
  removePostFromFolder(input: $input) {
    ...Folder
  }
}
    ${FolderFragmentDoc}`;
export type RemovePostFromFolderMutationFn = Apollo.MutationFunction<RemovePostFromFolderMutation, RemovePostFromFolderMutationVariables>;

/**
 * __useRemovePostFromFolderMutation__
 *
 * To run a mutation, you first call `useRemovePostFromFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePostFromFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePostFromFolderMutation, { data, loading, error }] = useRemovePostFromFolderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemovePostFromFolderMutation(baseOptions?: Apollo.MutationHookOptions<RemovePostFromFolderMutation, RemovePostFromFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemovePostFromFolderMutation, RemovePostFromFolderMutationVariables>(RemovePostFromFolderDocument, options);
      }
export type RemovePostFromFolderMutationHookResult = ReturnType<typeof useRemovePostFromFolderMutation>;
export type RemovePostFromFolderMutationResult = Apollo.MutationResult<RemovePostFromFolderMutation>;
export type RemovePostFromFolderMutationOptions = Apollo.BaseMutationOptions<RemovePostFromFolderMutation, RemovePostFromFolderMutationVariables>;
export const CreateGroupDocument = gql`
    mutation createGroup($input: CreateGroupInput!) {
  createGroup(input: $input) {
    ...Group
  }
}
    ${GroupFragmentDoc}`;
export type CreateGroupMutationFn = Apollo.MutationFunction<CreateGroupMutation, CreateGroupMutationVariables>;

/**
 * __useCreateGroupMutation__
 *
 * To run a mutation, you first call `useCreateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupMutation, { data, loading, error }] = useCreateGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateGroupMutation, CreateGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(CreateGroupDocument, options);
      }
export type CreateGroupMutationHookResult = ReturnType<typeof useCreateGroupMutation>;
export type CreateGroupMutationResult = Apollo.MutationResult<CreateGroupMutation>;
export type CreateGroupMutationOptions = Apollo.BaseMutationOptions<CreateGroupMutation, CreateGroupMutationVariables>;
export const UpdateGroupDocument = gql`
    mutation updateGroup($input: UpdateGroupInput!) {
  updateGroup(input: $input) {
    ...Group
  }
}
    ${GroupFragmentDoc}`;
export type UpdateGroupMutationFn = Apollo.MutationFunction<UpdateGroupMutation, UpdateGroupMutationVariables>;

/**
 * __useUpdateGroupMutation__
 *
 * To run a mutation, you first call `useUpdateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGroupMutation, { data, loading, error }] = useUpdateGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateGroupMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGroupMutation, UpdateGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGroupMutation, UpdateGroupMutationVariables>(UpdateGroupDocument, options);
      }
export type UpdateGroupMutationHookResult = ReturnType<typeof useUpdateGroupMutation>;
export type UpdateGroupMutationResult = Apollo.MutationResult<UpdateGroupMutation>;
export type UpdateGroupMutationOptions = Apollo.BaseMutationOptions<UpdateGroupMutation, UpdateGroupMutationVariables>;
export const LeaveGroupDocument = gql`
    mutation leaveGroup($input: LeaveGroupInput!) {
  leaveGroup(input: $input)
}
    `;
export type LeaveGroupMutationFn = Apollo.MutationFunction<LeaveGroupMutation, LeaveGroupMutationVariables>;

/**
 * __useLeaveGroupMutation__
 *
 * To run a mutation, you first call `useLeaveGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveGroupMutation, { data, loading, error }] = useLeaveGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLeaveGroupMutation(baseOptions?: Apollo.MutationHookOptions<LeaveGroupMutation, LeaveGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeaveGroupMutation, LeaveGroupMutationVariables>(LeaveGroupDocument, options);
      }
export type LeaveGroupMutationHookResult = ReturnType<typeof useLeaveGroupMutation>;
export type LeaveGroupMutationResult = Apollo.MutationResult<LeaveGroupMutation>;
export type LeaveGroupMutationOptions = Apollo.BaseMutationOptions<LeaveGroupMutation, LeaveGroupMutationVariables>;
export const ReadGroupDocument = gql`
    mutation readGroup($input: ReadGroupInput!) {
  readGroup(input: $input) {
    ...Group
  }
}
    ${GroupFragmentDoc}`;
export type ReadGroupMutationFn = Apollo.MutationFunction<ReadGroupMutation, ReadGroupMutationVariables>;

/**
 * __useReadGroupMutation__
 *
 * To run a mutation, you first call `useReadGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReadGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [readGroupMutation, { data, loading, error }] = useReadGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReadGroupMutation(baseOptions?: Apollo.MutationHookOptions<ReadGroupMutation, ReadGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReadGroupMutation, ReadGroupMutationVariables>(ReadGroupDocument, options);
      }
export type ReadGroupMutationHookResult = ReturnType<typeof useReadGroupMutation>;
export type ReadGroupMutationResult = Apollo.MutationResult<ReadGroupMutation>;
export type ReadGroupMutationOptions = Apollo.BaseMutationOptions<ReadGroupMutation, ReadGroupMutationVariables>;
export const AddUserToGroupDocument = gql`
    mutation addUserToGroup($input: AddUserToGroupInput!) {
  addUserToGroup(input: $input) {
    ...Group
  }
}
    ${GroupFragmentDoc}`;
export type AddUserToGroupMutationFn = Apollo.MutationFunction<AddUserToGroupMutation, AddUserToGroupMutationVariables>;

/**
 * __useAddUserToGroupMutation__
 *
 * To run a mutation, you first call `useAddUserToGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserToGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserToGroupMutation, { data, loading, error }] = useAddUserToGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddUserToGroupMutation(baseOptions?: Apollo.MutationHookOptions<AddUserToGroupMutation, AddUserToGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUserToGroupMutation, AddUserToGroupMutationVariables>(AddUserToGroupDocument, options);
      }
export type AddUserToGroupMutationHookResult = ReturnType<typeof useAddUserToGroupMutation>;
export type AddUserToGroupMutationResult = Apollo.MutationResult<AddUserToGroupMutation>;
export type AddUserToGroupMutationOptions = Apollo.BaseMutationOptions<AddUserToGroupMutation, AddUserToGroupMutationVariables>;
export const RemoveUserFromGroupDocument = gql`
    mutation removeUserFromGroup($input: RemoveUserFromGroupInput!) {
  removeUserFromGroup(input: $input) {
    ...Group
  }
}
    ${GroupFragmentDoc}`;
export type RemoveUserFromGroupMutationFn = Apollo.MutationFunction<RemoveUserFromGroupMutation, RemoveUserFromGroupMutationVariables>;

/**
 * __useRemoveUserFromGroupMutation__
 *
 * To run a mutation, you first call `useRemoveUserFromGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserFromGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserFromGroupMutation, { data, loading, error }] = useRemoveUserFromGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveUserFromGroupMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserFromGroupMutation, RemoveUserFromGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserFromGroupMutation, RemoveUserFromGroupMutationVariables>(RemoveUserFromGroupDocument, options);
      }
export type RemoveUserFromGroupMutationHookResult = ReturnType<typeof useRemoveUserFromGroupMutation>;
export type RemoveUserFromGroupMutationResult = Apollo.MutationResult<RemoveUserFromGroupMutation>;
export type RemoveUserFromGroupMutationOptions = Apollo.BaseMutationOptions<RemoveUserFromGroupMutation, RemoveUserFromGroupMutationVariables>;
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
export type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, options);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
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
export type UpdateMessageMutationFn = Apollo.MutationFunction<UpdateMessageMutation, UpdateMessageMutationVariables>;

/**
 * __useUpdateMessageMutation__
 *
 * To run a mutation, you first call `useUpdateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMessageMutation, { data, loading, error }] = useUpdateMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMessageMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMessageMutation, UpdateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMessageMutation, UpdateMessageMutationVariables>(UpdateMessageDocument, options);
      }
export type UpdateMessageMutationHookResult = ReturnType<typeof useUpdateMessageMutation>;
export type UpdateMessageMutationResult = Apollo.MutationResult<UpdateMessageMutation>;
export type UpdateMessageMutationOptions = Apollo.BaseMutationOptions<UpdateMessageMutation, UpdateMessageMutationVariables>;
export const DeleteMessageDocument = gql`
    mutation deleteMessage($input: DeleteMessageInput!) {
  deleteMessage(input: $input)
}
    `;
export type DeleteMessageMutationFn = Apollo.MutationFunction<DeleteMessageMutation, DeleteMessageMutationVariables>;

/**
 * __useDeleteMessageMutation__
 *
 * To run a mutation, you first call `useDeleteMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageMutation, { data, loading, error }] = useDeleteMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteMessageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMessageMutation, DeleteMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(DeleteMessageDocument, options);
      }
export type DeleteMessageMutationHookResult = ReturnType<typeof useDeleteMessageMutation>;
export type DeleteMessageMutationResult = Apollo.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = Apollo.BaseMutationOptions<DeleteMessageMutation, DeleteMessageMutationVariables>;
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
export type PinMessageMutationFn = Apollo.MutationFunction<PinMessageMutation, PinMessageMutationVariables>;

/**
 * __usePinMessageMutation__
 *
 * To run a mutation, you first call `usePinMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePinMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pinMessageMutation, { data, loading, error }] = usePinMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePinMessageMutation(baseOptions?: Apollo.MutationHookOptions<PinMessageMutation, PinMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PinMessageMutation, PinMessageMutationVariables>(PinMessageDocument, options);
      }
export type PinMessageMutationHookResult = ReturnType<typeof usePinMessageMutation>;
export type PinMessageMutationResult = Apollo.MutationResult<PinMessageMutation>;
export type PinMessageMutationOptions = Apollo.BaseMutationOptions<PinMessageMutation, PinMessageMutationVariables>;
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
export type UnpinMessageMutationFn = Apollo.MutationFunction<UnpinMessageMutation, UnpinMessageMutationVariables>;

/**
 * __useUnpinMessageMutation__
 *
 * To run a mutation, you first call `useUnpinMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnpinMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unpinMessageMutation, { data, loading, error }] = useUnpinMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUnpinMessageMutation(baseOptions?: Apollo.MutationHookOptions<UnpinMessageMutation, UnpinMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnpinMessageMutation, UnpinMessageMutationVariables>(UnpinMessageDocument, options);
      }
export type UnpinMessageMutationHookResult = ReturnType<typeof useUnpinMessageMutation>;
export type UnpinMessageMutationResult = Apollo.MutationResult<UnpinMessageMutation>;
export type UnpinMessageMutationOptions = Apollo.BaseMutationOptions<UnpinMessageMutation, UnpinMessageMutationVariables>;
export const UpdateTypingDocument = gql`
    mutation updateTyping($input: TypingInput!) {
  updateTyping(input: $input)
}
    `;
export type UpdateTypingMutationFn = Apollo.MutationFunction<UpdateTypingMutation, UpdateTypingMutationVariables>;

/**
 * __useUpdateTypingMutation__
 *
 * To run a mutation, you first call `useUpdateTypingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTypingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTypingMutation, { data, loading, error }] = useUpdateTypingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTypingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTypingMutation, UpdateTypingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTypingMutation, UpdateTypingMutationVariables>(UpdateTypingDocument, options);
      }
export type UpdateTypingMutationHookResult = ReturnType<typeof useUpdateTypingMutation>;
export type UpdateTypingMutationResult = Apollo.MutationResult<UpdateTypingMutation>;
export type UpdateTypingMutationOptions = Apollo.BaseMutationOptions<UpdateTypingMutation, UpdateTypingMutationVariables>;
export const CreatePostDocument = gql`
    mutation createPost($input: CreatePostInput!) {
  createPost(input: $input) {
    ...Post
    author {
      ...User
    }
    serverUser {
      ...ServerUser
    }
  }
}
    ${PostFragmentDoc}
${UserFragmentDoc}
${ServerUserFragmentDoc}`;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const UpdatePostDocument = gql`
    mutation updatePost($input: UpdatePostInput!) {
  updatePost(input: $input) {
    ...Post
    author {
      ...User
    }
    serverUser {
      ...ServerUser
    }
  }
}
    ${PostFragmentDoc}
${UserFragmentDoc}
${ServerUserFragmentDoc}`;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const DeletePostDocument = gql`
    mutation deletePost($input: DeletePostInput!) {
  deletePost(input: $input) {
    ...Post
    author {
      ...User
    }
    serverUser {
      ...ServerUser
    }
  }
}
    ${PostFragmentDoc}
${UserFragmentDoc}
${ServerUserFragmentDoc}`;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const UpdatePostVoteDocument = gql`
    mutation updatePostVote($input: UpdatePostVoteInput!) {
  updatePostVote(input: $input) {
    ...Post
    author {
      ...User
    }
    serverUser {
      ...ServerUser
    }
  }
}
    ${PostFragmentDoc}
${UserFragmentDoc}
${ServerUserFragmentDoc}`;
export type UpdatePostVoteMutationFn = Apollo.MutationFunction<UpdatePostVoteMutation, UpdatePostVoteMutationVariables>;

/**
 * __useUpdatePostVoteMutation__
 *
 * To run a mutation, you first call `useUpdatePostVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostVoteMutation, { data, loading, error }] = useUpdatePostVoteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePostVoteMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostVoteMutation, UpdatePostVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostVoteMutation, UpdatePostVoteMutationVariables>(UpdatePostVoteDocument, options);
      }
export type UpdatePostVoteMutationHookResult = ReturnType<typeof useUpdatePostVoteMutation>;
export type UpdatePostVoteMutationResult = Apollo.MutationResult<UpdatePostVoteMutation>;
export type UpdatePostVoteMutationOptions = Apollo.BaseMutationOptions<UpdatePostVoteMutation, UpdatePostVoteMutationVariables>;
export const PinPostDocument = gql`
    mutation pinPost($input: PinPostInput!) {
  pinPost(input: $input) {
    ...Post
    author {
      ...User
    }
    serverUser {
      ...ServerUser
    }
  }
}
    ${PostFragmentDoc}
${UserFragmentDoc}
${ServerUserFragmentDoc}`;
export type PinPostMutationFn = Apollo.MutationFunction<PinPostMutation, PinPostMutationVariables>;

/**
 * __usePinPostMutation__
 *
 * To run a mutation, you first call `usePinPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePinPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pinPostMutation, { data, loading, error }] = usePinPostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePinPostMutation(baseOptions?: Apollo.MutationHookOptions<PinPostMutation, PinPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PinPostMutation, PinPostMutationVariables>(PinPostDocument, options);
      }
export type PinPostMutationHookResult = ReturnType<typeof usePinPostMutation>;
export type PinPostMutationResult = Apollo.MutationResult<PinPostMutation>;
export type PinPostMutationOptions = Apollo.BaseMutationOptions<PinPostMutation, PinPostMutationVariables>;
export const UnpinPostDocument = gql`
    mutation unpinPost($input: UnpinPostInput!) {
  unpinPost(input: $input) {
    ...Post
    author {
      ...User
    }
    serverUser {
      ...ServerUser
    }
  }
}
    ${PostFragmentDoc}
${UserFragmentDoc}
${ServerUserFragmentDoc}`;
export type UnpinPostMutationFn = Apollo.MutationFunction<UnpinPostMutation, UnpinPostMutationVariables>;

/**
 * __useUnpinPostMutation__
 *
 * To run a mutation, you first call `useUnpinPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnpinPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unpinPostMutation, { data, loading, error }] = useUnpinPostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUnpinPostMutation(baseOptions?: Apollo.MutationHookOptions<UnpinPostMutation, UnpinPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnpinPostMutation, UnpinPostMutationVariables>(UnpinPostDocument, options);
      }
export type UnpinPostMutationHookResult = ReturnType<typeof useUnpinPostMutation>;
export type UnpinPostMutationResult = Apollo.MutationResult<UnpinPostMutation>;
export type UnpinPostMutationOptions = Apollo.BaseMutationOptions<UnpinPostMutation, UnpinPostMutationVariables>;
export const CreateFriendRequestDocument = gql`
    mutation createFriendRequest($input: CreateFriendRequestInput!) {
  createFriendRequest(input: $input) {
    ...User
    relatedUsers {
      ...RelatedUser
    }
    servers {
      id
      avatarUrl
      name
    }
  }
}
    ${UserFragmentDoc}
${RelatedUserFragmentDoc}`;
export type CreateFriendRequestMutationFn = Apollo.MutationFunction<CreateFriendRequestMutation, CreateFriendRequestMutationVariables>;

/**
 * __useCreateFriendRequestMutation__
 *
 * To run a mutation, you first call `useCreateFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFriendRequestMutation, { data, loading, error }] = useCreateFriendRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<CreateFriendRequestMutation, CreateFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFriendRequestMutation, CreateFriendRequestMutationVariables>(CreateFriendRequestDocument, options);
      }
export type CreateFriendRequestMutationHookResult = ReturnType<typeof useCreateFriendRequestMutation>;
export type CreateFriendRequestMutationResult = Apollo.MutationResult<CreateFriendRequestMutation>;
export type CreateFriendRequestMutationOptions = Apollo.BaseMutationOptions<CreateFriendRequestMutation, CreateFriendRequestMutationVariables>;
export const DeleteFriendRequestDocument = gql`
    mutation deleteFriendRequest($input: DeleteFriendRequestInput!) {
  deleteFriendRequest(input: $input) {
    ...User
    relatedUsers {
      ...RelatedUser
    }
    servers {
      id
      avatarUrl
      name
    }
  }
}
    ${UserFragmentDoc}
${RelatedUserFragmentDoc}`;
export type DeleteFriendRequestMutationFn = Apollo.MutationFunction<DeleteFriendRequestMutation, DeleteFriendRequestMutationVariables>;

/**
 * __useDeleteFriendRequestMutation__
 *
 * To run a mutation, you first call `useDeleteFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFriendRequestMutation, { data, loading, error }] = useDeleteFriendRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFriendRequestMutation, DeleteFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFriendRequestMutation, DeleteFriendRequestMutationVariables>(DeleteFriendRequestDocument, options);
      }
export type DeleteFriendRequestMutationHookResult = ReturnType<typeof useDeleteFriendRequestMutation>;
export type DeleteFriendRequestMutationResult = Apollo.MutationResult<DeleteFriendRequestMutation>;
export type DeleteFriendRequestMutationOptions = Apollo.BaseMutationOptions<DeleteFriendRequestMutation, DeleteFriendRequestMutationVariables>;
export const AnswerFriendRequestDocument = gql`
    mutation answerFriendRequest($input: AnswerFriendRequestInput!) {
  answerFriendRequest(input: $input) {
    ...RelatedUser
  }
}
    ${RelatedUserFragmentDoc}`;
export type AnswerFriendRequestMutationFn = Apollo.MutationFunction<AnswerFriendRequestMutation, AnswerFriendRequestMutationVariables>;

/**
 * __useAnswerFriendRequestMutation__
 *
 * To run a mutation, you first call `useAnswerFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAnswerFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [answerFriendRequestMutation, { data, loading, error }] = useAnswerFriendRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAnswerFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<AnswerFriendRequestMutation, AnswerFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AnswerFriendRequestMutation, AnswerFriendRequestMutationVariables>(AnswerFriendRequestDocument, options);
      }
export type AnswerFriendRequestMutationHookResult = ReturnType<typeof useAnswerFriendRequestMutation>;
export type AnswerFriendRequestMutationResult = Apollo.MutationResult<AnswerFriendRequestMutation>;
export type AnswerFriendRequestMutationOptions = Apollo.BaseMutationOptions<AnswerFriendRequestMutation, AnswerFriendRequestMutationVariables>;
export const BlockUserDocument = gql`
    mutation blockUser($input: BlockUserInput!) {
  blockUser(input: $input) {
    ...RelatedUser
  }
}
    ${RelatedUserFragmentDoc}`;
export type BlockUserMutationFn = Apollo.MutationFunction<BlockUserMutation, BlockUserMutationVariables>;

/**
 * __useBlockUserMutation__
 *
 * To run a mutation, you first call `useBlockUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBlockUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [blockUserMutation, { data, loading, error }] = useBlockUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBlockUserMutation(baseOptions?: Apollo.MutationHookOptions<BlockUserMutation, BlockUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BlockUserMutation, BlockUserMutationVariables>(BlockUserDocument, options);
      }
export type BlockUserMutationHookResult = ReturnType<typeof useBlockUserMutation>;
export type BlockUserMutationResult = Apollo.MutationResult<BlockUserMutation>;
export type BlockUserMutationOptions = Apollo.BaseMutationOptions<BlockUserMutation, BlockUserMutationVariables>;
export const UnblockUserDocument = gql`
    mutation unblockUser($input: UnblockUserInput!) {
  unblockUser(input: $input) {
    ...RelatedUser
  }
}
    ${RelatedUserFragmentDoc}`;
export type UnblockUserMutationFn = Apollo.MutationFunction<UnblockUserMutation, UnblockUserMutationVariables>;

/**
 * __useUnblockUserMutation__
 *
 * To run a mutation, you first call `useUnblockUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnblockUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unblockUserMutation, { data, loading, error }] = useUnblockUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUnblockUserMutation(baseOptions?: Apollo.MutationHookOptions<UnblockUserMutation, UnblockUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnblockUserMutation, UnblockUserMutationVariables>(UnblockUserDocument, options);
      }
export type UnblockUserMutationHookResult = ReturnType<typeof useUnblockUserMutation>;
export type UnblockUserMutationResult = Apollo.MutationResult<UnblockUserMutation>;
export type UnblockUserMutationOptions = Apollo.BaseMutationOptions<UnblockUserMutation, UnblockUserMutationVariables>;
export const RemoveFriendDocument = gql`
    mutation removeFriend($input: RemoveFriendInput!) {
  removeFriend(input: $input) {
    ...RelatedUser
  }
}
    ${RelatedUserFragmentDoc}`;
export type RemoveFriendMutationFn = Apollo.MutationFunction<RemoveFriendMutation, RemoveFriendMutationVariables>;

/**
 * __useRemoveFriendMutation__
 *
 * To run a mutation, you first call `useRemoveFriendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFriendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFriendMutation, { data, loading, error }] = useRemoveFriendMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveFriendMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFriendMutation, RemoveFriendMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveFriendMutation, RemoveFriendMutationVariables>(RemoveFriendDocument, options);
      }
export type RemoveFriendMutationHookResult = ReturnType<typeof useRemoveFriendMutation>;
export type RemoveFriendMutationResult = Apollo.MutationResult<RemoveFriendMutation>;
export type RemoveFriendMutationOptions = Apollo.BaseMutationOptions<RemoveFriendMutation, RemoveFriendMutationVariables>;
export const ReadDmDocument = gql`
    mutation readDm($input: ReadDmInput!) {
  readDm(input: $input) {
    ...RelatedUser
  }
}
    ${RelatedUserFragmentDoc}`;
export type ReadDmMutationFn = Apollo.MutationFunction<ReadDmMutation, ReadDmMutationVariables>;

/**
 * __useReadDmMutation__
 *
 * To run a mutation, you first call `useReadDmMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReadDmMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [readDmMutation, { data, loading, error }] = useReadDmMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReadDmMutation(baseOptions?: Apollo.MutationHookOptions<ReadDmMutation, ReadDmMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReadDmMutation, ReadDmMutationVariables>(ReadDmDocument, options);
      }
export type ReadDmMutationHookResult = ReturnType<typeof useReadDmMutation>;
export type ReadDmMutationResult = Apollo.MutationResult<ReadDmMutation>;
export type ReadDmMutationOptions = Apollo.BaseMutationOptions<ReadDmMutation, ReadDmMutationVariables>;
export const OpenDmDocument = gql`
    mutation openDm($input: OpenDmInput!) {
  openDm(input: $input) {
    ...RelatedUser
  }
}
    ${RelatedUserFragmentDoc}`;
export type OpenDmMutationFn = Apollo.MutationFunction<OpenDmMutation, OpenDmMutationVariables>;

/**
 * __useOpenDmMutation__
 *
 * To run a mutation, you first call `useOpenDmMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOpenDmMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [openDmMutation, { data, loading, error }] = useOpenDmMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOpenDmMutation(baseOptions?: Apollo.MutationHookOptions<OpenDmMutation, OpenDmMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OpenDmMutation, OpenDmMutationVariables>(OpenDmDocument, options);
      }
export type OpenDmMutationHookResult = ReturnType<typeof useOpenDmMutation>;
export type OpenDmMutationResult = Apollo.MutationResult<OpenDmMutation>;
export type OpenDmMutationOptions = Apollo.BaseMutationOptions<OpenDmMutation, OpenDmMutationVariables>;
export const CloseDmDocument = gql`
    mutation closeDm($input: CloseDmInput!) {
  closeDm(input: $input) {
    ...RelatedUser
  }
}
    ${RelatedUserFragmentDoc}`;
export type CloseDmMutationFn = Apollo.MutationFunction<CloseDmMutation, CloseDmMutationVariables>;

/**
 * __useCloseDmMutation__
 *
 * To run a mutation, you first call `useCloseDmMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCloseDmMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [closeDmMutation, { data, loading, error }] = useCloseDmMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCloseDmMutation(baseOptions?: Apollo.MutationHookOptions<CloseDmMutation, CloseDmMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CloseDmMutation, CloseDmMutationVariables>(CloseDmDocument, options);
      }
export type CloseDmMutationHookResult = ReturnType<typeof useCloseDmMutation>;
export type CloseDmMutationResult = Apollo.MutationResult<CloseDmMutation>;
export type CloseDmMutationOptions = Apollo.BaseMutationOptions<CloseDmMutation, CloseDmMutationVariables>;
export const MarkReplyReadDocument = gql`
    mutation markReplyRead($input: MarkReplyReadInput!) {
  markReplyRead(input: $input) {
    ...Reply
  }
}
    ${ReplyFragmentDoc}`;
export type MarkReplyReadMutationFn = Apollo.MutationFunction<MarkReplyReadMutation, MarkReplyReadMutationVariables>;

/**
 * __useMarkReplyReadMutation__
 *
 * To run a mutation, you first call `useMarkReplyReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkReplyReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markReplyReadMutation, { data, loading, error }] = useMarkReplyReadMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMarkReplyReadMutation(baseOptions?: Apollo.MutationHookOptions<MarkReplyReadMutation, MarkReplyReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkReplyReadMutation, MarkReplyReadMutationVariables>(MarkReplyReadDocument, options);
      }
export type MarkReplyReadMutationHookResult = ReturnType<typeof useMarkReplyReadMutation>;
export type MarkReplyReadMutationResult = Apollo.MutationResult<MarkReplyReadMutation>;
export type MarkReplyReadMutationOptions = Apollo.BaseMutationOptions<MarkReplyReadMutation, MarkReplyReadMutationVariables>;
export const MarkReplyUnreadDocument = gql`
    mutation markReplyUnread($input: MarkReplyUnreadInput!) {
  markReplyUnread(input: $input) {
    ...Reply
  }
}
    ${ReplyFragmentDoc}`;
export type MarkReplyUnreadMutationFn = Apollo.MutationFunction<MarkReplyUnreadMutation, MarkReplyUnreadMutationVariables>;

/**
 * __useMarkReplyUnreadMutation__
 *
 * To run a mutation, you first call `useMarkReplyUnreadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkReplyUnreadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markReplyUnreadMutation, { data, loading, error }] = useMarkReplyUnreadMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMarkReplyUnreadMutation(baseOptions?: Apollo.MutationHookOptions<MarkReplyUnreadMutation, MarkReplyUnreadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkReplyUnreadMutation, MarkReplyUnreadMutationVariables>(MarkReplyUnreadDocument, options);
      }
export type MarkReplyUnreadMutationHookResult = ReturnType<typeof useMarkReplyUnreadMutation>;
export type MarkReplyUnreadMutationResult = Apollo.MutationResult<MarkReplyUnreadMutation>;
export type MarkReplyUnreadMutationOptions = Apollo.BaseMutationOptions<MarkReplyUnreadMutation, MarkReplyUnreadMutationVariables>;
export const CreateRoleDocument = gql`
    mutation createRole($input: CreateRoleInput!) {
  createRole(input: $input) {
    ...Role
  }
}
    ${RoleFragmentDoc}`;
export type CreateRoleMutationFn = Apollo.MutationFunction<CreateRoleMutation, CreateRoleMutationVariables>;

/**
 * __useCreateRoleMutation__
 *
 * To run a mutation, you first call `useCreateRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoleMutation, { data, loading, error }] = useCreateRoleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRoleMutation(baseOptions?: Apollo.MutationHookOptions<CreateRoleMutation, CreateRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRoleMutation, CreateRoleMutationVariables>(CreateRoleDocument, options);
      }
export type CreateRoleMutationHookResult = ReturnType<typeof useCreateRoleMutation>;
export type CreateRoleMutationResult = Apollo.MutationResult<CreateRoleMutation>;
export type CreateRoleMutationOptions = Apollo.BaseMutationOptions<CreateRoleMutation, CreateRoleMutationVariables>;
export const UpdateRoleDocument = gql`
    mutation updateRole($input: UpdateRoleInput!) {
  updateRole(input: $input) {
    ...Role
  }
}
    ${RoleFragmentDoc}`;
export type UpdateRoleMutationFn = Apollo.MutationFunction<UpdateRoleMutation, UpdateRoleMutationVariables>;

/**
 * __useUpdateRoleMutation__
 *
 * To run a mutation, you first call `useUpdateRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRoleMutation, { data, loading, error }] = useUpdateRoleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRoleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRoleMutation, UpdateRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRoleMutation, UpdateRoleMutationVariables>(UpdateRoleDocument, options);
      }
export type UpdateRoleMutationHookResult = ReturnType<typeof useUpdateRoleMutation>;
export type UpdateRoleMutationResult = Apollo.MutationResult<UpdateRoleMutation>;
export type UpdateRoleMutationOptions = Apollo.BaseMutationOptions<UpdateRoleMutation, UpdateRoleMutationVariables>;
export const DeleteRoleDocument = gql`
    mutation deleteRole($input: DeleteRoleInput!) {
  deleteRole(input: $input)
}
    `;
export type DeleteRoleMutationFn = Apollo.MutationFunction<DeleteRoleMutation, DeleteRoleMutationVariables>;

/**
 * __useDeleteRoleMutation__
 *
 * To run a mutation, you first call `useDeleteRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRoleMutation, { data, loading, error }] = useDeleteRoleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteRoleMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRoleMutation, DeleteRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRoleMutation, DeleteRoleMutationVariables>(DeleteRoleDocument, options);
      }
export type DeleteRoleMutationHookResult = ReturnType<typeof useDeleteRoleMutation>;
export type DeleteRoleMutationResult = Apollo.MutationResult<DeleteRoleMutation>;
export type DeleteRoleMutationOptions = Apollo.BaseMutationOptions<DeleteRoleMutation, DeleteRoleMutationVariables>;
export const SetUserRoleDocument = gql`
    mutation setUserRole($input: SetUserRoleInput!) {
  setUserRole(input: $input) {
    ...ServerUser
  }
}
    ${ServerUserFragmentDoc}`;
export type SetUserRoleMutationFn = Apollo.MutationFunction<SetUserRoleMutation, SetUserRoleMutationVariables>;

/**
 * __useSetUserRoleMutation__
 *
 * To run a mutation, you first call `useSetUserRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUserRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUserRoleMutation, { data, loading, error }] = useSetUserRoleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetUserRoleMutation(baseOptions?: Apollo.MutationHookOptions<SetUserRoleMutation, SetUserRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetUserRoleMutation, SetUserRoleMutationVariables>(SetUserRoleDocument, options);
      }
export type SetUserRoleMutationHookResult = ReturnType<typeof useSetUserRoleMutation>;
export type SetUserRoleMutationResult = Apollo.MutationResult<SetUserRoleMutation>;
export type SetUserRoleMutationOptions = Apollo.BaseMutationOptions<SetUserRoleMutation, SetUserRoleMutationVariables>;
export const CreateServerDocument = gql`
    mutation createServer($input: CreateServerInput!) {
  createServer(input: $input) {
    ...Server
    roles {
      ...Role
    }
  }
}
    ${ServerFragmentDoc}
${RoleFragmentDoc}`;
export type CreateServerMutationFn = Apollo.MutationFunction<CreateServerMutation, CreateServerMutationVariables>;

/**
 * __useCreateServerMutation__
 *
 * To run a mutation, you first call `useCreateServerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateServerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createServerMutation, { data, loading, error }] = useCreateServerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateServerMutation(baseOptions?: Apollo.MutationHookOptions<CreateServerMutation, CreateServerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateServerMutation, CreateServerMutationVariables>(CreateServerDocument, options);
      }
export type CreateServerMutationHookResult = ReturnType<typeof useCreateServerMutation>;
export type CreateServerMutationResult = Apollo.MutationResult<CreateServerMutation>;
export type CreateServerMutationOptions = Apollo.BaseMutationOptions<CreateServerMutation, CreateServerMutationVariables>;
export const UpdateServerDocument = gql`
    mutation updateServer($input: UpdateServerInput!) {
  updateServer(input: $input) {
    ...Server
  }
}
    ${ServerFragmentDoc}`;
export type UpdateServerMutationFn = Apollo.MutationFunction<UpdateServerMutation, UpdateServerMutationVariables>;

/**
 * __useUpdateServerMutation__
 *
 * To run a mutation, you first call `useUpdateServerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateServerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateServerMutation, { data, loading, error }] = useUpdateServerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateServerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateServerMutation, UpdateServerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateServerMutation, UpdateServerMutationVariables>(UpdateServerDocument, options);
      }
export type UpdateServerMutationHookResult = ReturnType<typeof useUpdateServerMutation>;
export type UpdateServerMutationResult = Apollo.MutationResult<UpdateServerMutation>;
export type UpdateServerMutationOptions = Apollo.BaseMutationOptions<UpdateServerMutation, UpdateServerMutationVariables>;
export const DeleteServerDocument = gql`
    mutation deleteServer($input: DeleteServerInput!) {
  deleteServer(input: $input)
}
    `;
export type DeleteServerMutationFn = Apollo.MutationFunction<DeleteServerMutation, DeleteServerMutationVariables>;

/**
 * __useDeleteServerMutation__
 *
 * To run a mutation, you first call `useDeleteServerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteServerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteServerMutation, { data, loading, error }] = useDeleteServerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteServerMutation(baseOptions?: Apollo.MutationHookOptions<DeleteServerMutation, DeleteServerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteServerMutation, DeleteServerMutationVariables>(DeleteServerDocument, options);
      }
export type DeleteServerMutationHookResult = ReturnType<typeof useDeleteServerMutation>;
export type DeleteServerMutationResult = Apollo.MutationResult<DeleteServerMutation>;
export type DeleteServerMutationOptions = Apollo.BaseMutationOptions<DeleteServerMutation, DeleteServerMutationVariables>;
export const MoveServerDocument = gql`
    mutation moveServer($input: MoveServerInput!) {
  moveServer(input: $input)
}
    `;
export type MoveServerMutationFn = Apollo.MutationFunction<MoveServerMutation, MoveServerMutationVariables>;

/**
 * __useMoveServerMutation__
 *
 * To run a mutation, you first call `useMoveServerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveServerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveServerMutation, { data, loading, error }] = useMoveServerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMoveServerMutation(baseOptions?: Apollo.MutationHookOptions<MoveServerMutation, MoveServerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MoveServerMutation, MoveServerMutationVariables>(MoveServerDocument, options);
      }
export type MoveServerMutationHookResult = ReturnType<typeof useMoveServerMutation>;
export type MoveServerMutationResult = Apollo.MutationResult<MoveServerMutation>;
export type MoveServerMutationOptions = Apollo.BaseMutationOptions<MoveServerMutation, MoveServerMutationVariables>;
export const JoinServerDocument = gql`
    mutation joinServer($input: JoinServerInput!) {
  joinServer(input: $input) {
    ...Server
  }
}
    ${ServerFragmentDoc}`;
export type JoinServerMutationFn = Apollo.MutationFunction<JoinServerMutation, JoinServerMutationVariables>;

/**
 * __useJoinServerMutation__
 *
 * To run a mutation, you first call `useJoinServerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinServerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinServerMutation, { data, loading, error }] = useJoinServerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useJoinServerMutation(baseOptions?: Apollo.MutationHookOptions<JoinServerMutation, JoinServerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinServerMutation, JoinServerMutationVariables>(JoinServerDocument, options);
      }
export type JoinServerMutationHookResult = ReturnType<typeof useJoinServerMutation>;
export type JoinServerMutationResult = Apollo.MutationResult<JoinServerMutation>;
export type JoinServerMutationOptions = Apollo.BaseMutationOptions<JoinServerMutation, JoinServerMutationVariables>;
export const LeaveServerDocument = gql`
    mutation leaveServer($input: LeaveServerInput!) {
  leaveServer(input: $input) {
    ...Server
  }
}
    ${ServerFragmentDoc}`;
export type LeaveServerMutationFn = Apollo.MutationFunction<LeaveServerMutation, LeaveServerMutationVariables>;

/**
 * __useLeaveServerMutation__
 *
 * To run a mutation, you first call `useLeaveServerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveServerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveServerMutation, { data, loading, error }] = useLeaveServerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLeaveServerMutation(baseOptions?: Apollo.MutationHookOptions<LeaveServerMutation, LeaveServerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeaveServerMutation, LeaveServerMutationVariables>(LeaveServerDocument, options);
      }
export type LeaveServerMutationHookResult = ReturnType<typeof useLeaveServerMutation>;
export type LeaveServerMutationResult = Apollo.MutationResult<LeaveServerMutation>;
export type LeaveServerMutationOptions = Apollo.BaseMutationOptions<LeaveServerMutation, LeaveServerMutationVariables>;
export const ReadServerDocument = gql`
    mutation readServer($input: ReadServerInput!) {
  readServer(input: $input) {
    ...Server
  }
}
    ${ServerFragmentDoc}`;
export type ReadServerMutationFn = Apollo.MutationFunction<ReadServerMutation, ReadServerMutationVariables>;

/**
 * __useReadServerMutation__
 *
 * To run a mutation, you first call `useReadServerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReadServerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [readServerMutation, { data, loading, error }] = useReadServerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReadServerMutation(baseOptions?: Apollo.MutationHookOptions<ReadServerMutation, ReadServerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReadServerMutation, ReadServerMutationVariables>(ReadServerDocument, options);
      }
export type ReadServerMutationHookResult = ReturnType<typeof useReadServerMutation>;
export type ReadServerMutationResult = Apollo.MutationResult<ReadServerMutation>;
export type ReadServerMutationOptions = Apollo.BaseMutationOptions<ReadServerMutation, ReadServerMutationVariables>;
export const BanUserFromServerDocument = gql`
    mutation banUserFromServer($input: BanUserFromServerInput!) {
  banUserFromServer(input: $input)
}
    `;
export type BanUserFromServerMutationFn = Apollo.MutationFunction<BanUserFromServerMutation, BanUserFromServerMutationVariables>;

/**
 * __useBanUserFromServerMutation__
 *
 * To run a mutation, you first call `useBanUserFromServerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBanUserFromServerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [banUserFromServerMutation, { data, loading, error }] = useBanUserFromServerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBanUserFromServerMutation(baseOptions?: Apollo.MutationHookOptions<BanUserFromServerMutation, BanUserFromServerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BanUserFromServerMutation, BanUserFromServerMutationVariables>(BanUserFromServerDocument, options);
      }
export type BanUserFromServerMutationHookResult = ReturnType<typeof useBanUserFromServerMutation>;
export type BanUserFromServerMutationResult = Apollo.MutationResult<BanUserFromServerMutation>;
export type BanUserFromServerMutationOptions = Apollo.BaseMutationOptions<BanUserFromServerMutation, BanUserFromServerMutationVariables>;
export const UnbanUserFromServerDocument = gql`
    mutation unbanUserFromServer($input: UnbanUserFromServerInput!) {
  unbanUserFromServer(input: $input)
}
    `;
export type UnbanUserFromServerMutationFn = Apollo.MutationFunction<UnbanUserFromServerMutation, UnbanUserFromServerMutationVariables>;

/**
 * __useUnbanUserFromServerMutation__
 *
 * To run a mutation, you first call `useUnbanUserFromServerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnbanUserFromServerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unbanUserFromServerMutation, { data, loading, error }] = useUnbanUserFromServerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUnbanUserFromServerMutation(baseOptions?: Apollo.MutationHookOptions<UnbanUserFromServerMutation, UnbanUserFromServerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnbanUserFromServerMutation, UnbanUserFromServerMutationVariables>(UnbanUserFromServerDocument, options);
      }
export type UnbanUserFromServerMutationHookResult = ReturnType<typeof useUnbanUserFromServerMutation>;
export type UnbanUserFromServerMutationResult = Apollo.MutationResult<UnbanUserFromServerMutation>;
export type UnbanUserFromServerMutationOptions = Apollo.BaseMutationOptions<UnbanUserFromServerMutation, UnbanUserFromServerMutationVariables>;
export const KickUserFromServerDocument = gql`
    mutation kickUserFromServer($input: KickUserFromServerInput!) {
  kickUserFromServer(input: $input)
}
    `;
export type KickUserFromServerMutationFn = Apollo.MutationFunction<KickUserFromServerMutation, KickUserFromServerMutationVariables>;

/**
 * __useKickUserFromServerMutation__
 *
 * To run a mutation, you first call `useKickUserFromServerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useKickUserFromServerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [kickUserFromServerMutation, { data, loading, error }] = useKickUserFromServerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useKickUserFromServerMutation(baseOptions?: Apollo.MutationHookOptions<KickUserFromServerMutation, KickUserFromServerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<KickUserFromServerMutation, KickUserFromServerMutationVariables>(KickUserFromServerDocument, options);
      }
export type KickUserFromServerMutationHookResult = ReturnType<typeof useKickUserFromServerMutation>;
export type KickUserFromServerMutationResult = Apollo.MutationResult<KickUserFromServerMutation>;
export type KickUserFromServerMutationOptions = Apollo.BaseMutationOptions<KickUserFromServerMutation, KickUserFromServerMutationVariables>;
export const FeatureServerDocument = gql`
    mutation featureServer($input: FeatureServerInput!) {
  featureServer(input: $input) {
    ...Server
  }
}
    ${ServerFragmentDoc}`;
export type FeatureServerMutationFn = Apollo.MutationFunction<FeatureServerMutation, FeatureServerMutationVariables>;

/**
 * __useFeatureServerMutation__
 *
 * To run a mutation, you first call `useFeatureServerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFeatureServerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [featureServerMutation, { data, loading, error }] = useFeatureServerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFeatureServerMutation(baseOptions?: Apollo.MutationHookOptions<FeatureServerMutation, FeatureServerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FeatureServerMutation, FeatureServerMutationVariables>(FeatureServerDocument, options);
      }
export type FeatureServerMutationHookResult = ReturnType<typeof useFeatureServerMutation>;
export type FeatureServerMutationResult = Apollo.MutationResult<FeatureServerMutation>;
export type FeatureServerMutationOptions = Apollo.BaseMutationOptions<FeatureServerMutation, FeatureServerMutationVariables>;
export const UnfeatureServerDocument = gql`
    mutation unfeatureServer($input: UnfeatureServerInput!) {
  unfeatureServer(input: $input) {
    ...Server
  }
}
    ${ServerFragmentDoc}`;
export type UnfeatureServerMutationFn = Apollo.MutationFunction<UnfeatureServerMutation, UnfeatureServerMutationVariables>;

/**
 * __useUnfeatureServerMutation__
 *
 * To run a mutation, you first call `useUnfeatureServerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfeatureServerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfeatureServerMutation, { data, loading, error }] = useUnfeatureServerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUnfeatureServerMutation(baseOptions?: Apollo.MutationHookOptions<UnfeatureServerMutation, UnfeatureServerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnfeatureServerMutation, UnfeatureServerMutationVariables>(UnfeatureServerDocument, options);
      }
export type UnfeatureServerMutationHookResult = ReturnType<typeof useUnfeatureServerMutation>;
export type UnfeatureServerMutationResult = Apollo.MutationResult<UnfeatureServerMutation>;
export type UnfeatureServerMutationOptions = Apollo.BaseMutationOptions<UnfeatureServerMutation, UnfeatureServerMutationVariables>;
export const CreateAccountDocument = gql`
    mutation createAccount($input: CreateAccountInput!) {
  createAccount(input: $input) {
    accessToken
    user {
      ...CurrentUser
    }
  }
}
    ${CurrentUserFragmentDoc}`;
export type CreateAccountMutationFn = Apollo.MutationFunction<CreateAccountMutation, CreateAccountMutationVariables>;

/**
 * __useCreateAccountMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutation, { data, loading, error }] = useCreateAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAccountMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccountMutation, CreateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument, options);
      }
export type CreateAccountMutationHookResult = ReturnType<typeof useCreateAccountMutation>;
export type CreateAccountMutationResult = Apollo.MutationResult<CreateAccountMutation>;
export type CreateAccountMutationOptions = Apollo.BaseMutationOptions<CreateAccountMutation, CreateAccountMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation changePassword($input: ChangePasswordInput!) {
  changePassword(input: $input) {
    ...CurrentUser
  }
}
    ${CurrentUserFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ChangeUserAvatarDocument = gql`
    mutation changeUserAvatar($input: ChangeUserAvatarInput!) {
  changeUserAvatar(input: $input) {
    ...CurrentUser
  }
}
    ${CurrentUserFragmentDoc}`;
export type ChangeUserAvatarMutationFn = Apollo.MutationFunction<ChangeUserAvatarMutation, ChangeUserAvatarMutationVariables>;

/**
 * __useChangeUserAvatarMutation__
 *
 * To run a mutation, you first call `useChangeUserAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeUserAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeUserAvatarMutation, { data, loading, error }] = useChangeUserAvatarMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeUserAvatarMutation(baseOptions?: Apollo.MutationHookOptions<ChangeUserAvatarMutation, ChangeUserAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeUserAvatarMutation, ChangeUserAvatarMutationVariables>(ChangeUserAvatarDocument, options);
      }
export type ChangeUserAvatarMutationHookResult = ReturnType<typeof useChangeUserAvatarMutation>;
export type ChangeUserAvatarMutationResult = Apollo.MutationResult<ChangeUserAvatarMutation>;
export type ChangeUserAvatarMutationOptions = Apollo.BaseMutationOptions<ChangeUserAvatarMutation, ChangeUserAvatarMutationVariables>;
export const DeleteAccountDocument = gql`
    mutation deleteAccount($input: DeleteAccountInput!) {
  deleteAccount(input: $input)
}
    `;
export type DeleteAccountMutationFn = Apollo.MutationFunction<DeleteAccountMutation, DeleteAccountMutationVariables>;

/**
 * __useDeleteAccountMutation__
 *
 * To run a mutation, you first call `useDeleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccountMutation, { data, loading, error }] = useDeleteAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteAccountMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAccountMutation, DeleteAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(DeleteAccountDocument, options);
      }
export type DeleteAccountMutationHookResult = ReturnType<typeof useDeleteAccountMutation>;
export type DeleteAccountMutationResult = Apollo.MutationResult<DeleteAccountMutation>;
export type DeleteAccountMutationOptions = Apollo.BaseMutationOptions<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const LoginDocument = gql`
    mutation login($input: LoginInput!) {
  login(input: $input) {
    accessToken
    user {
      ...CurrentUser
    }
  }
}
    ${CurrentUserFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const ChangeOnlineStatusDocument = gql`
    mutation changeOnlineStatus($input: ChangeOnlineStatusInput!) {
  changeOnlineStatus(input: $input) {
    ...CurrentUser
  }
}
    ${CurrentUserFragmentDoc}`;
export type ChangeOnlineStatusMutationFn = Apollo.MutationFunction<ChangeOnlineStatusMutation, ChangeOnlineStatusMutationVariables>;

/**
 * __useChangeOnlineStatusMutation__
 *
 * To run a mutation, you first call `useChangeOnlineStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeOnlineStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeOnlineStatusMutation, { data, loading, error }] = useChangeOnlineStatusMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeOnlineStatusMutation(baseOptions?: Apollo.MutationHookOptions<ChangeOnlineStatusMutation, ChangeOnlineStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeOnlineStatusMutation, ChangeOnlineStatusMutationVariables>(ChangeOnlineStatusDocument, options);
      }
export type ChangeOnlineStatusMutationHookResult = ReturnType<typeof useChangeOnlineStatusMutation>;
export type ChangeOnlineStatusMutationResult = Apollo.MutationResult<ChangeOnlineStatusMutation>;
export type ChangeOnlineStatusMutationOptions = Apollo.BaseMutationOptions<ChangeOnlineStatusMutation, ChangeOnlineStatusMutationVariables>;
export const GlobalBanDocument = gql`
    mutation globalBan($input: GlobalBanInput!) {
  globalBan(input: $input)
}
    `;
export type GlobalBanMutationFn = Apollo.MutationFunction<GlobalBanMutation, GlobalBanMutationVariables>;

/**
 * __useGlobalBanMutation__
 *
 * To run a mutation, you first call `useGlobalBanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGlobalBanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [globalBanMutation, { data, loading, error }] = useGlobalBanMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGlobalBanMutation(baseOptions?: Apollo.MutationHookOptions<GlobalBanMutation, GlobalBanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GlobalBanMutation, GlobalBanMutationVariables>(GlobalBanDocument, options);
      }
export type GlobalBanMutationHookResult = ReturnType<typeof useGlobalBanMutation>;
export type GlobalBanMutationResult = Apollo.MutationResult<GlobalBanMutation>;
export type GlobalBanMutationOptions = Apollo.BaseMutationOptions<GlobalBanMutation, GlobalBanMutationVariables>;
export const CommentsDocument = gql`
    query comments($postId: ID!, $sort: CommentsSort) {
  comments(postId: $postId, sort: $sort) {
    ...Comment
    author {
      ...User
    }
    serverUser {
      ...ServerUser
    }
  }
}
    ${CommentFragmentDoc}
${UserFragmentDoc}
${ServerUserFragmentDoc}`;

/**
 * __useCommentsQuery__
 *
 * To run a query within a React component, call `useCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useCommentsQuery(baseOptions: Apollo.QueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
      }
export function useCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
        }
export type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>;
export type CommentsLazyQueryHookResult = ReturnType<typeof useCommentsLazyQuery>;
export type CommentsQueryResult = Apollo.QueryResult<CommentsQuery, CommentsQueryVariables>;
export const CurrentUserDocument = gql`
    query currentUser @live {
  user {
    ...CurrentUser
  }
}
    ${CurrentUserFragmentDoc}`;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const FolderDocument = gql`
    query folder($id: ID!) @live {
  folder(id: $id) {
    ...Folder
    postCount
    owner {
      ...User
    }
    server {
      id
      displayName
      name
      avatarUrl
      permissions
    }
  }
}
    ${FolderFragmentDoc}
${UserFragmentDoc}`;

/**
 * __useFolderQuery__
 *
 * To run a query within a React component, call `useFolderQuery` and pass it any options that fit your needs.
 * When your component renders, `useFolderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFolderQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFolderQuery(baseOptions: Apollo.QueryHookOptions<FolderQuery, FolderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FolderQuery, FolderQueryVariables>(FolderDocument, options);
      }
export function useFolderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FolderQuery, FolderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FolderQuery, FolderQueryVariables>(FolderDocument, options);
        }
export type FolderQueryHookResult = ReturnType<typeof useFolderQuery>;
export type FolderLazyQueryHookResult = ReturnType<typeof useFolderLazyQuery>;
export type FolderQueryResult = Apollo.QueryResult<FolderQuery, FolderQueryVariables>;
export const GetLinkMetaDocument = gql`
    query getLinkMeta($linkUrl: String!) {
  getLinkMeta(linkUrl: $linkUrl) {
    ...Metadata
  }
}
    ${MetadataFragmentDoc}`;

/**
 * __useGetLinkMetaQuery__
 *
 * To run a query within a React component, call `useGetLinkMetaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLinkMetaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLinkMetaQuery({
 *   variables: {
 *      linkUrl: // value for 'linkUrl'
 *   },
 * });
 */
export function useGetLinkMetaQuery(baseOptions: Apollo.QueryHookOptions<GetLinkMetaQuery, GetLinkMetaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLinkMetaQuery, GetLinkMetaQueryVariables>(GetLinkMetaDocument, options);
      }
export function useGetLinkMetaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLinkMetaQuery, GetLinkMetaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLinkMetaQuery, GetLinkMetaQueryVariables>(GetLinkMetaDocument, options);
        }
export type GetLinkMetaQueryHookResult = ReturnType<typeof useGetLinkMetaQuery>;
export type GetLinkMetaLazyQueryHookResult = ReturnType<typeof useGetLinkMetaLazyQuery>;
export type GetLinkMetaQueryResult = Apollo.QueryResult<GetLinkMetaQuery, GetLinkMetaQueryVariables>;
export const MessagesDocument = gql`
    query messages($channelId: ID, $userId: ID, $groupId: ID, $limit: PositiveInt, $cursor: ID) {
  messages(
    channelId: $channelId
    userId: $userId
    groupId: $groupId
    limit: $limit
    cursor: $cursor
  ) {
    hasMore
    messages {
      ...Message
      author {
        ...User
      }
      serverUser {
        ...ServerUser
      }
    }
  }
}
    ${MessageFragmentDoc}
${UserFragmentDoc}
${ServerUserFragmentDoc}`;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      userId: // value for 'userId'
 *      groupId: // value for 'groupId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useMessagesQuery(baseOptions?: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
      }
export function useMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
        }
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesQueryResult = Apollo.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const PostDocument = gql`
    query post($id: ID!) {
  post(id: $id) {
    ...Post
    author {
      ...User
    }
    serverUser {
      ...ServerUser
    }
    server {
      id
      name
      avatarUrl
      isDownvotesEnabled
      displayName
      permissions
    }
  }
}
    ${PostFragmentDoc}
${UserFragmentDoc}
${ServerUserFragmentDoc}`;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostsDocument = gql`
    query posts($sort: PostsSort, $offset: NonNegativeInt, $limit: PositiveInt, $time: PostsTime, $folderId: ID, $serverId: ID, $search: String, $feed: PostsFeed) {
  posts(
    sort: $sort
    time: $time
    folderId: $folderId
    serverId: $serverId
    search: $search
    offset: $offset
    limit: $limit
    feed: $feed
  ) {
    hasMore
    posts {
      ...Post
      author {
        ...User
      }
      serverUser {
        ...ServerUser
      }
      server {
        id
        name
        avatarUrl
        isDownvotesEnabled
        displayName
        permissions
      }
    }
  }
}
    ${PostFragmentDoc}
${UserFragmentDoc}
${ServerUserFragmentDoc}`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      time: // value for 'time'
 *      folderId: // value for 'folderId'
 *      serverId: // value for 'serverId'
 *      search: // value for 'search'
 *      feed: // value for 'feed'
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const PublicServersDocument = gql`
    query publicServers($sort: PublicServersSort, $category: ServerCategory, $featured: Boolean) {
  publicServers(sort: $sort, category: $category, featured: $featured) {
    id
    name
    displayName
    avatarUrl
    bannerUrl
    description
    userCount
    category
    isFeatured
  }
}
    `;

/**
 * __usePublicServersQuery__
 *
 * To run a query within a React component, call `usePublicServersQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicServersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicServersQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *      category: // value for 'category'
 *      featured: // value for 'featured'
 *   },
 * });
 */
export function usePublicServersQuery(baseOptions?: Apollo.QueryHookOptions<PublicServersQuery, PublicServersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PublicServersQuery, PublicServersQueryVariables>(PublicServersDocument, options);
      }
export function usePublicServersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PublicServersQuery, PublicServersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PublicServersQuery, PublicServersQueryVariables>(PublicServersDocument, options);
        }
export type PublicServersQueryHookResult = ReturnType<typeof usePublicServersQuery>;
export type PublicServersLazyQueryHookResult = ReturnType<typeof usePublicServersLazyQuery>;
export type PublicServersQueryResult = Apollo.QueryResult<PublicServersQuery, PublicServersQueryVariables>;
export const RepliesDocument = gql`
    query replies {
  replies {
    ...Reply
  }
}
    ${ReplyFragmentDoc}`;

/**
 * __useRepliesQuery__
 *
 * To run a query within a React component, call `useRepliesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRepliesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRepliesQuery({
 *   variables: {
 *   },
 * });
 */
export function useRepliesQuery(baseOptions?: Apollo.QueryHookOptions<RepliesQuery, RepliesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RepliesQuery, RepliesQueryVariables>(RepliesDocument, options);
      }
export function useRepliesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RepliesQuery, RepliesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RepliesQuery, RepliesQueryVariables>(RepliesDocument, options);
        }
export type RepliesQueryHookResult = ReturnType<typeof useRepliesQuery>;
export type RepliesLazyQueryHookResult = ReturnType<typeof useRepliesLazyQuery>;
export type RepliesQueryResult = Apollo.QueryResult<RepliesQuery, RepliesQueryVariables>;
export const ServerDocument = gql`
    query server($id: ID, $name: String) @live {
  server(id: $id, name: $name) {
    ...Server
    permissions
    channels {
      ...Channel
    }
    roles {
      ...Role
    }
  }
}
    ${ServerFragmentDoc}
${ChannelFragmentDoc}
${RoleFragmentDoc}`;

/**
 * __useServerQuery__
 *
 * To run a query within a React component, call `useServerQuery` and pass it any options that fit your needs.
 * When your component renders, `useServerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServerQuery({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useServerQuery(baseOptions?: Apollo.QueryHookOptions<ServerQuery, ServerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ServerQuery, ServerQueryVariables>(ServerDocument, options);
      }
export function useServerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ServerQuery, ServerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ServerQuery, ServerQueryVariables>(ServerDocument, options);
        }
export type ServerQueryHookResult = ReturnType<typeof useServerQuery>;
export type ServerLazyQueryHookResult = ReturnType<typeof useServerLazyQuery>;
export type ServerQueryResult = Apollo.QueryResult<ServerQuery, ServerQueryVariables>;
export const ServerUsersDocument = gql`
    query serverUsers($serverId: ID!) @live {
  serverUsers(serverId: $serverId) {
    ...ServerUser
  }
}
    ${ServerUserFragmentDoc}`;

/**
 * __useServerUsersQuery__
 *
 * To run a query within a React component, call `useServerUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useServerUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServerUsersQuery({
 *   variables: {
 *      serverId: // value for 'serverId'
 *   },
 * });
 */
export function useServerUsersQuery(baseOptions: Apollo.QueryHookOptions<ServerUsersQuery, ServerUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ServerUsersQuery, ServerUsersQueryVariables>(ServerUsersDocument, options);
      }
export function useServerUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ServerUsersQuery, ServerUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ServerUsersQuery, ServerUsersQueryVariables>(ServerUsersDocument, options);
        }
export type ServerUsersQueryHookResult = ReturnType<typeof useServerUsersQuery>;
export type ServerUsersLazyQueryHookResult = ReturnType<typeof useServerUsersLazyQuery>;
export type ServerUsersQueryResult = Apollo.QueryResult<ServerUsersQuery, ServerUsersQueryVariables>;
export const UserDocument = gql`
    query user($id: ID, $username: String) @live {
  user(id: $id, username: $username) {
    ...User
    relatedUsers {
      ...User
    }
    servers {
      id
      avatarUrl
      name
    }
  }
}
    ${UserFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
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

/**
 * __useCommentChangedSubscription__
 *
 * To run a query within a React component, call `useCommentChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCommentChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentChangedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useCommentChangedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<CommentChangedSubscription, CommentChangedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<CommentChangedSubscription, CommentChangedSubscriptionVariables>(CommentChangedDocument, options);
      }
export type CommentChangedSubscriptionHookResult = ReturnType<typeof useCommentChangedSubscription>;
export type CommentChangedSubscriptionResult = Apollo.SubscriptionResult<CommentChangedSubscription>;
export const MessageChangedDocument = gql`
    subscription MessageChanged {
  messageChanged {
    added {
      ...Message
      author {
        ...User
      }
      serverUser {
        ...ServerUser
      }
      channel {
        name
        id
        server {
          id
          name
        }
      }
      group {
        displayName
        id
      }
      toUser {
        username
        id
      }
    }
    updated {
      ...Message
      author {
        ...User
      }
      serverUser {
        ...ServerUser
      }
    }
    deleted {
      id
      channel {
        id
      }
      group {
        id
      }
      toUser {
        id
      }
    }
  }
}
    ${MessageFragmentDoc}
${UserFragmentDoc}
${ServerUserFragmentDoc}`;

/**
 * __useMessageChangedSubscription__
 *
 * To run a query within a React component, call `useMessageChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageChangedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useMessageChangedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<MessageChangedSubscription, MessageChangedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<MessageChangedSubscription, MessageChangedSubscriptionVariables>(MessageChangedDocument, options);
      }
export type MessageChangedSubscriptionHookResult = ReturnType<typeof useMessageChangedSubscription>;
export type MessageChangedSubscriptionResult = Apollo.SubscriptionResult<MessageChangedSubscription>;
export const PostChangedDocument = gql`
    subscription PostChanged {
  postChanged {
    added {
      ...Post
    }
    updated {
      ...Post
    }
    deleted {
      ...Post
    }
  }
}
    ${PostFragmentDoc}`;

/**
 * __usePostChangedSubscription__
 *
 * To run a query within a React component, call `usePostChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePostChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostChangedSubscription({
 *   variables: {
 *   },
 * });
 */
export function usePostChangedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<PostChangedSubscription, PostChangedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<PostChangedSubscription, PostChangedSubscriptionVariables>(PostChangedDocument, options);
      }
export type PostChangedSubscriptionHookResult = ReturnType<typeof usePostChangedSubscription>;
export type PostChangedSubscriptionResult = Apollo.SubscriptionResult<PostChangedSubscription>;
export const ReplyChangedDocument = gql`
    subscription ReplyChanged {
  replyChanged {
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

/**
 * __useReplyChangedSubscription__
 *
 * To run a query within a React component, call `useReplyChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useReplyChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReplyChangedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useReplyChangedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<ReplyChangedSubscription, ReplyChangedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ReplyChangedSubscription, ReplyChangedSubscriptionVariables>(ReplyChangedDocument, options);
      }
export type ReplyChangedSubscriptionHookResult = ReturnType<typeof useReplyChangedSubscription>;
export type ReplyChangedSubscriptionResult = Apollo.SubscriptionResult<ReplyChangedSubscription>;
export const TypingUpdatedDocument = gql`
    subscription typingUpdated($userId: ID, $groupId: ID, $channelId: ID) {
  typingUpdated(userId: $userId, groupId: $groupId, channelId: $channelId) {
    typingUserId
    isTyping
  }
}
    `;

/**
 * __useTypingUpdatedSubscription__
 *
 * To run a query within a React component, call `useTypingUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTypingUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTypingUpdatedSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *      groupId: // value for 'groupId'
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useTypingUpdatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<TypingUpdatedSubscription, TypingUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<TypingUpdatedSubscription, TypingUpdatedSubscriptionVariables>(TypingUpdatedDocument, options);
      }
export type TypingUpdatedSubscriptionHookResult = ReturnType<typeof useTypingUpdatedSubscription>;
export type TypingUpdatedSubscriptionResult = Apollo.SubscriptionResult<TypingUpdatedSubscription>;