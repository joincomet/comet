export const error = {
  entityNotFound: '{{replace}} not found!',
  invalidUserAuth: `'USER' authorization can only be used on User entity`,
  notLoggedIn: 'Not logged in',
  fileSize: 'File size must be less than {{replace}}MB',
  channelPermissions:
    '(useChannelPermissions) channelPermissions and serverPermissions must have same length',
  folder: {
    deleted: 'Folder has been deleted',
    notOwner: 'You do not own this folder',
    nameTooLong: 'Name cannot be longer than 300 characters',
    alreadyExists: 'You already have a folder with that name',
    noPermission: 'You do not have permission to modify this folder.',
    alreadyAdded: 'This post is already in this folder.',
    cannotEdit: 'Cannot edit Read Later or Favorites folders.',
    cannotDelete: 'Cannot delete Read Later or Favorites folders.',
    cannotCreate: 'Cannot create Read Later or Favorites folders.',
    notCollaborative: 'This folder is not collaborative.',
    notInFolder: 'That post is not in this folder.',
    owner: 'You are the owner of this folder',
    private: 'That folder is private.',
    friends: `Must be friends with this folder's owner`
  },
  message: {
    notAuthor: 'You are not the author of this message',
    missingArgs: 'Must provide channelId, groupId, or userId',
    notSentInChannel: 'Message was not sent in a channel',
    empty: 'Message cannot be empty',
    textOrFile: 'Must provide text or a file'
  },
  comment: {
    notAuthor: 'You are not the author of this comment',
    empty: 'Comment cannot be empty',
    alreadyDeleted: 'Comment already deleted',
    alreadyVoted: 'You have already voted this comment'
  },
  post: {
    notAuthor: 'You are not the author of this post',
    alreadyVoted: 'You have already voted this post',
    alreadyPinned: 'Post is already pinned',
    notPinned: 'Post is not pinned'
  },
  group: {
    maxSize: 'Max group size is 10 users',
    notJoined: 'You are not in this group'
  },
  server: {
    notJoined: 'You have not joined this planet',
    banned: 'You are banned from this planet',
    alreadyJoined: 'You have already joined this planet',
    missingPermission: 'Missing planet permission {{replace}}',
    notOwner: 'Must be planet owner',
    inviteRequired: 'Invite required to join this planet',
    inviteExpired: 'This invite has expired.'
  },
  channel: {
    missingPermission: 'Missing channel permission {{replace}}'
  },
  user: {
    blocking: 'You are blocking this user',
    blocked: 'This user has blocked you',
    friendRequestNotSent: 'You have not sent a friend request to this user',
    friendRequestNotReceived:
      'You have not received a friend request from this user',
    notFriends: 'You are not friends with this user',
    alreadyBlocking: 'You are already blocking this user',
    notBlocking: 'You are not blocking this user'
  },
  upload: {
    invalidMime: 'Image must be PNG or JPEG'
  },
  login: {
    invalid: 'Invalid login',
    invalidEmail: 'Invalid email address',
    emailInUse: 'Email already in use',
    illegalName: `Name cannot contain {{replace}}`,
    nameLength: 'Name must be 2-32 characters',
    banned: 'Banned{{replace}}',
    wrongPassword: 'Incorrect password',
    usernameTaken: 'Username taken'
  },
  notif: {
    notYours: 'This is not your notification'
  }
}
