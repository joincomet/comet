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
    alreadyExists: 'You already have a folder with that name'
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
    notJoined: 'You have not joined this server',
    banned: 'You are banned from this server',
    joinLimit: 'Cannot join more than 100 servers',
    alreadyJoined: 'You have already joined this server',
    missingPermission: 'Missing server permission {{replace}}',
    notOwner: 'Must be server owner',
    inviteRequired: 'Invite required to join this server',
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
    wrongPassword: 'Incorrect password'
  },
  notif: {
    notYours: 'This is not your notification'
  }
}
