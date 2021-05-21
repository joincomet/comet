import{g as e,u as t,a as n,b as r,i as a,B as l,c as s,A as o,d as i,m as c,e as m,z as d,f as u,p,r as g,s as v,h,R as f,L as b,j as E,N as x,k as y,H as w,t as N,l as k,n as C,o as $,q as U,v as I,w as P,x as S,y as F,C as M,T as R,D as A,E as O,F as D,G as L,I as T,J as q,K as z,M as H,O as B,P as j,Q as _,S as V,U as G,V as Y,W,X as Q,Y as J,Z as K,_ as Z,$ as X,a0 as ee,a1 as te,a2 as ne,a3 as re,a4 as ae,a5 as le,a6 as se,a7 as oe,a8 as ie,a9 as ce,aa as me,ab as de,ac as ue,ad as pe,ae as ge,af as ve,ag as he,ah as fe,ai as be,aj as Ee,ak as xe,al as ye,am as we,an as Ne,ao as ke,ap as Ce,aq as $e,ar as Ue,as as Ie,at as Pe,au as Se,av as Fe,aw as Me,ax as Re,ay as Ae,az as Oe,aA as De,aB as Le,aC as Te,aD as qe,aE as ze,aF as He,aG as Be,aH as je,aI as _e,aJ as Ve,aK as Ge,aL as Ye,aM as We,aN as Qe,aO as Je,aP as Ke,aQ as Ze,aR as Xe,aS as et,aT as tt,aU as nt,aV as rt,aW as at,aX as lt,aY as st,aZ as ot,a_ as it,a$ as ct,b0 as mt,b1 as dt,b2 as ut,b3 as pt,b4 as gt,b5 as vt,b6 as ht,b7 as ft,b8 as bt,b9 as Et,ba as xt,bb as yt,bc as wt,bd as Nt,be as kt,bf as Ct,bg as $t,bh as Ut,bi as It,bj as Pt,bk as St,bl as Ft,bm as Mt,bn as Rt,bo as At,bp as Ot,bq as Dt,br as Lt,bs as Tt,bt as qt,bu as zt,bv as Ht,bw as Bt,bx as jt,by as _t,bz as Vt,bA as Gt,bB as Yt,bC as Wt,bD as Qt,bE as Jt,bF as Kt,bG as Zt,bH as Xt,bI as en,bJ as tn,bK as nn,bL as rn,bM as an,bN as ln,bO as sn,bP as on,bQ as cn,bR as mn,bS as dn,bT as un,bU as pn,bV as gn,bW as vn,bX as hn,bY as fn,bZ as bn,b_ as En,b$ as xn,c0 as yn,c1 as wn,c2 as Nn,c3 as kn,c4 as Cn}from"./vendor.4eea0af2.js";const $n={entityNotFound:"{{replace}} not found!",invalidUserAuth:"'USER' authorization can only be used on User entity",notLoggedIn:"Not logged in",fileSize:"File size must be less than {{replace}}MB",channelPermissions:"(useChannelPermissions) channelPermissions and serverPermissions must have same length",folder:{deleted:"Folder has been deleted",notOwner:"You do not own this folder",nameTooLong:"Name cannot be longer than 300 characters",alreadyExists:"You already have a folder with that name",noPermission:"You do not have permission to modify this folder.",alreadyAdded:"This post is already in this folder.",cannotEdit:"Cannot edit Read Later or Favorites folders.",cannotDelete:"Cannot delete Read Later or Favorites folders.",cannotCreate:"Cannot create Read Later or Favorites folders.",notCollaborative:"This folder is not collaborative.",notInFolder:"That post is not in this folder.",owner:"You are the owner of this folder",private:"That folder is private.",friends:"Must be friends with this folder's owner"},message:{notAuthor:"You are not the author of this message",missingArgs:"Must provide channelId, groupId, or userId",notSentInChannel:"Message was not sent in a channel",empty:"Message cannot be empty",textOrFile:"Must provide text or a file"},comment:{notAuthor:"You are not the author of this comment",empty:"Comment cannot be empty",alreadyDeleted:"Comment already deleted",alreadyVoted:"You have already voted this comment"},post:{notAuthor:"You are not the author of this post",alreadyVoted:"You have already voted this post",alreadyPinned:"Post is already pinned",notPinned:"Post is not pinned"},group:{maxSize:"Max group size is 10 users",notJoined:"You are not in this group"},server:{notJoined:"You have not joined this planet",banned:"You are banned from this planet",alreadyJoined:"You have already joined this planet",missingPermission:"Missing planet permission {{replace}}",notOwner:"Must be planet owner",inviteRequired:"Invite required to join this planet",inviteExpired:"This invite has expired."},channel:{missingPermission:"Missing channel permission {{replace}}"},user:{blocking:"You are blocking this user",blocked:"This user has blocked you",friendRequestNotSent:"You have not sent a friend request to this user",friendRequestNotReceived:"You have not received a friend request from this user",notFriends:"You are not friends with this user",alreadyBlocking:"You are already blocking this user",notBlocking:"You are not blocking this user"},upload:{invalidMime:"Image must be PNG or JPEG"},login:{invalid:"Invalid login",invalidEmail:"Invalid email address",emailInUse:"Email already in use",illegalName:"Name cannot contain {{replace}}",nameLength:"Name must be 2-32 characters",banned:"Banned{{replace}}",wrongPassword:"Incorrect password",usernameTaken:"Username taken"},notif:{notYours:"This is not your notification"}},Un={hide:"Hide Folders",show:"Show Folders",favorites:"Favorites",readLater:"Read Later",added:"Added to {{name}}!",name:"Name",postCount:"{{count}} Post",postCount_plural:"{{count}} Posts",createdBy:"Created by",userFolder:"User Folder",serverFolder:"Planet Folder",collaborative:"Collaborative",user:{title:"Your Folders",create:"Create Folder"},server:{title:"{{name}}'s Folders",create:"Create Planet Folder"},context:{follow:"Follow Folder",unfollow:"Unfollow Folder",delete:"Delete Folder",copyLink:"Copy Folder Link",edit:"Edit Folder",collaborative:"Collaborative",changeVisibility:"Change Visibility",visibility:{public:"Public",friends:"Friends Only",private:"Private",unlisted:"Unlisted"}}},In={};var Pn,Sn,Fn,Mn,Rn,An,On,Dn,Ln,Tn,qn,zn,Hn,Bn,jn,_n,Vn,Gn,Yn,Wn,Qn,Jn,Kn,Zn;(Sn=Pn||(Pn={})).Private="Private",Sn.Public="Public",Sn.Restricted="Restricted",(Mn=Fn||(Fn={})).Blue="Blue",Mn.Green="Green",Mn.Indigo="Indigo",Mn.Pink="Pink",Mn.Purple="Purple",Mn.Red="Red",Mn.Yellow="Yellow",(An=Rn||(Rn={})).New="New",An.Top="Top",(Dn=On||(On={})).Friends="Friends",Dn.Private="Private",Dn.Public="Public",Dn.Unlisted="Unlisted",(Tn=Ln||(Ln={})).FriendRequestReceived="FriendRequestReceived",Tn.Initial="Initial",Tn.Join="Join",Tn.Left="Left",Tn.Normal="Normal",(zn=qn||(qn={})).Away="Away",zn.DoNotDisturb="DoNotDisturb",zn.Offline="Offline",zn.Online="Online",(Bn=Hn||(Hn={})).Added="Added",Bn.Hot="Hot",Bn.New="New",Bn.Top="Top",(_n=jn||(jn={})).All="All",_n.Day="Day",_n.Hour="Hour",_n.Month="Month",_n.Week="Week",_n.Year="Year",(Gn=Vn||(Vn={})).New="New",Gn.Top="Top",(Wn=Yn||(Yn={})).Blocked="Blocked",Wn.Blocking="Blocking",Wn.FriendRequestIncoming="FriendRequestIncoming",Wn.FriendRequestOutgoing="FriendRequestOutgoing",Wn.Friends="Friends",Wn.None="None",(Jn=Qn||(Qn={})).Arts="Arts",Jn.Business="Business",Jn.Culture="Culture",Jn.Discussion="Discussion",Jn.Entertainment="Entertainment",Jn.Gaming="Gaming",Jn.Health="Health",Jn.Hobbies="Hobbies",Jn.Lifestyle="Lifestyle",Jn.Memes="Memes",Jn.Meta="Meta",Jn.News="News",Jn.Other="Other",Jn.Politics="Politics",Jn.Programming="Programming",Jn.Science="Science",Jn.Sports="Sports",Jn.Technology="Technology",(Zn=Kn||(Kn={})).AddPostToFolder="AddPostToFolder",Zn.Admin="Admin",Zn.DisplayRoleSeparately="DisplayRoleSeparately",Zn.ManageChannels="ManageChannels",Zn.ManageComments="ManageComments",Zn.ManageFolders="ManageFolders",Zn.ManageMessages="ManageMessages",Zn.ManagePosts="ManagePosts",Zn.ManageServer="ManageServer",Zn.ManageUsers="ManageUsers",Zn.PrivateChannels="PrivateChannels",Zn.RestrictedChannels="RestrictedChannels",Zn.SendMessages="SendMessages";const Xn=e`
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
  domain
}
    `,er=e`
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
    ${Xn}`,tr=e`
    fragment User on User {
  id
  username
  avatarUrl
  isOnline
  onlineStatus
  isCurrentUser
  relationshipStatus
  color
}
    `,nr=e`
    fragment Channel on Channel {
  id
  name
  description
  isUnread
  mentionCount
  type
}
    `,rr=e`
    fragment Role on Role {
  id
  name
  color
  permissions
}
    `,ar=e`
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
    `,lr=e`
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
  owner {
    id
  }
  permissions
  channels {
    ...Channel
  }
  roles {
    ...Role
  }
  folders {
    ...Folder
  }
}
    ${nr}
${rr}
${ar}`,sr=e`
    fragment RelatedUser on User {
  ...User
  showChat
  unreadCount
  lastMessageAt
}
    ${tr}`,or=e`
    fragment Group on Group {
  id
  name
  displayName
  avatarUrl
  unreadCount
  lastMessageAt
}
    `,ir=e`
    fragment CurrentUser on User {
  ...User
  isAdmin
  email
  servers {
    ...Server
  }
  relatedUsers {
    ...RelatedUser
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
    ${tr}
${lr}
${sr}
${or}`,cr=e`
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
  mentionedUsers {
    id
  }
  isEveryoneMentioned
  isPinned
}
    ${Xn}`,mr=e`
    fragment Post on Post {
  id
  title
  isPinned
  text
  linkUrl
  relativeUrl
  commentCount
  voteCount
  isVoted
  thumbnailUrl
  domain
  isDeleted
  createdAt
  updatedAt
  linkMetadata {
    ...Metadata
  }
  images {
    url
    linkUrl
    caption
  }
}
    ${Xn}`,dr=e`
    fragment ServerUser on ServerUser {
  color
  roles {
    ...Role
  }
  user {
    ...User
  }
}
    ${rr}
${tr}`,ur=e`
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
    ${tr}
${dr}`,pr=e`
    mutation createChannel($input: CreateChannelInput!) {
  createChannel(input: $input) {
    ...Channel
  }
}
    ${nr}`;e`
    mutation updateChannel($input: UpdateChannelInput!) {
  updateChannel(input: $input) {
    ...Channel
  }
}
    ${nr}`;const gr=e`
    mutation deleteChannel($input: DeleteChannelInput!) {
  deleteChannel(input: $input)
}
    `;e`
    mutation moveChannel($input: MoveChannelInput!) {
  moveChannel(input: $input) {
    ...Channel
  }
}
    ${nr}`;const vr=e`
    mutation readChannel($input: ReadChannelInput!) {
  readChannel(input: $input) {
    ...Channel
  }
}
    ${nr}`;const hr=e`
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
    ${er}
${tr}
${dr}`;e`
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
    ${er}
${tr}
${dr}`;const fr=e`
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
    ${er}
${tr}
${dr}`;const br=e`
    mutation voteComment($input: VoteCommentInput!) {
  voteComment(input: $input) {
    ...Comment
    author {
      ...User
    }
    serverUser {
      ...ServerUser
    }
  }
}
    ${er}
${tr}
${dr}`;const Er=e`
    mutation unvoteComment($input: UnvoteCommentInput!) {
  unvoteComment(input: $input) {
    ...Comment
    author {
      ...User
    }
    serverUser {
      ...ServerUser
    }
  }
}
    ${er}
${tr}
${dr}`;const xr=e`
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
    ${er}
${tr}
${dr}`;const yr=e`
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
    ${er}
${tr}
${dr}`;e`
    mutation createFolder($input: CreateFolderInput!) {
  createFolder(input: $input) {
    ...Folder
  }
}
    ${ar}`;const wr=e`
    mutation updateFolder($input: UpdateFolderInput!) {
  updateFolder(input: $input) {
    ...Folder
  }
}
    ${ar}`;const Nr=e`
    mutation deleteFolder($input: DeleteFolderInput!) {
  deleteFolder(input: $input)
}
    `;e`
    mutation moveServerFolder($input: MoveServerFolderInput!) {
  moveServerFolder(input: $input) {
    ...Folder
  }
}
    ${ar}`,e`
    mutation moveUserFolder($input: MoveUserFolderInput!) {
  moveUserFolder(input: $input) {
    ...Folder
  }
}
    ${ar}`;const kr=e`
    mutation followFolder($input: FollowFolderInput!) {
  followFolder(input: $input) {
    ...Folder
  }
}
    ${ar}`;const Cr=e`
    mutation unfollowFolder($input: UnfollowFolderInput!) {
  unfollowFolder(input: $input) {
    ...Folder
  }
}
    ${ar}`;e`
    mutation addPostToFolder($input: AddPostToFolderInput!) {
  addPostToFolder(input: $input) {
    ...Folder
  }
}
    ${ar}`,e`
    mutation removePostFromFolder($input: RemovePostFromFolderInput!) {
  removePostFromFolder(input: $input) {
    ...Folder
  }
}
    ${ar}`,e`
    mutation createGroup($input: CreateGroupInput!) {
  createGroup(input: $input) {
    ...Group
  }
}
    ${or}`,e`
    mutation updateGroup($input: UpdateGroupInput!) {
  updateGroup(input: $input) {
    ...Group
  }
}
    ${or}`,e`
    mutation leaveGroup($input: LeaveGroupInput!) {
  leaveGroup(input: $input)
}
    `,e`
    mutation readGroup($input: ReadGroupInput!) {
  readGroup(input: $input) {
    ...Group
  }
}
    ${or}`,e`
    mutation addUserToGroup($input: AddUserToGroupInput!) {
  addUserToGroup(input: $input) {
    ...Group
  }
}
    ${or}`,e`
    mutation removeUserFromGroup($input: RemoveUserFromGroupInput!) {
  removeUserFromGroup(input: $input) {
    ...Group
  }
}
    ${or}`;const $r=e`
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
    ${cr}
${tr}
${dr}`;function Ur(e){const t={...In,...e};return n($r,t)}e`
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
    ${cr}
${tr}
${dr}`;const Ir=e`
    mutation deleteMessage($input: DeleteMessageInput!) {
  deleteMessage(input: $input)
}
    `;const Pr=e`
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
    ${cr}
${tr}
${dr}`;function Sr(e){const t={...In,...e};return n(Pr,t)}const Fr=e`
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
    ${cr}
${tr}
${dr}`;function Mr(e){const t={...In,...e};return n(Fr,t)}const Rr=e`
    mutation updateTyping($input: TypingInput!) {
  updateTyping(input: $input)
}
    `;const Ar=e`
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
    ${mr}
${tr}
${dr}`;e`
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
    ${mr}
${tr}
${dr}`;const Or=e`
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
    ${mr}
${tr}
${dr}`;const Dr=e`
    mutation votePost($input: VotePostInput!) {
  votePost(input: $input) {
    ...Post
    author {
      ...User
    }
    serverUser {
      ...ServerUser
    }
  }
}
    ${mr}
${tr}
${dr}`;const Lr=e`
    mutation unvotePost($input: UnvotePostInput!) {
  unvotePost(input: $input) {
    ...Post
    author {
      ...User
    }
    serverUser {
      ...ServerUser
    }
  }
}
    ${mr}
${tr}
${dr}`;const Tr=e`
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
    ${mr}
${tr}
${dr}`;const qr=e`
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
    ${mr}
${tr}
${dr}`;const zr=e`
    mutation createFriendRequest($input: CreateFriendRequestInput!) {
  createFriendRequest(input: $input) {
    ...User
    folders {
      ...Folder
    }
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
    ${tr}
${ar}`;function Hr(e){const t={...In,...e};return n(zr,t)}const Br=e`
    mutation deleteFriendRequest($input: DeleteFriendRequestInput!) {
  deleteFriendRequest(input: $input) {
    ...User
    folders {
      ...Folder
    }
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
    ${tr}
${ar}`;function jr(e){const t={...In,...e};return n(Br,t)}const _r=e`
    mutation answerFriendRequest($input: AnswerFriendRequestInput!) {
  answerFriendRequest(input: $input) {
    ...RelatedUser
  }
}
    ${sr}`;function Vr(e){const t={...In,...e};return n(_r,t)}const Gr=e`
    mutation blockUser($input: BlockUserInput!) {
  blockUser(input: $input) {
    ...RelatedUser
  }
}
    ${sr}`;const Yr=e`
    mutation unblockUser($input: UnblockUserInput!) {
  unblockUser(input: $input) {
    ...RelatedUser
  }
}
    ${sr}`;const Wr=e`
    mutation removeFriend($input: RemoveFriendInput!) {
  removeFriend(input: $input) {
    ...RelatedUser
  }
}
    ${sr}`;function Qr(e){const t={...In,...e};return n(Wr,t)}const Jr=e`
    mutation readDm($input: ReadDmInput!) {
  readDm(input: $input) {
    ...RelatedUser
  }
}
    ${sr}`;function Kr(e){const t={...In,...e};return n(Jr,t)}const Zr=e`
    mutation openDm($input: OpenDmInput!) {
  openDm(input: $input) {
    ...RelatedUser
  }
}
    ${sr}`;const Xr=e`
    mutation closeDm($input: CloseDmInput!) {
  closeDm(input: $input) {
    ...RelatedUser
  }
}
    ${sr}`;function ea(e){const t={...In,...e};return n(Xr,t)}const ta=e`
    mutation markReplyRead($input: MarkReplyReadInput!) {
  markReplyRead(input: $input) {
    ...Reply
  }
}
    ${ur}`;e`
    mutation markReplyUnread($input: MarkReplyUnreadInput!) {
  markReplyUnread(input: $input) {
    ...Reply
  }
}
    ${ur}`,e`
    mutation createRole($input: CreateRoleInput!) {
  createRole(input: $input) {
    ...Role
  }
}
    ${rr}`,e`
    mutation updateRole($input: UpdateRoleInput!) {
  updateRole(input: $input) {
    ...Role
  }
}
    ${rr}`,e`
    mutation deleteRole($input: DeleteRoleInput!) {
  deleteRole(input: $input)
}
    `,e`
    mutation moveRole($input: MoveRoleInput!) {
  moveRole(input: $input) {
    ...Role
  }
}
    ${rr}`,e`
    mutation addUserToRole($input: AddUserToRoleInput!) {
  addUserToRole(input: $input) {
    ...ServerUser
  }
}
    ${dr}`,e`
    mutation removeUserFromRole($input: RemoveUserFromRoleInput!) {
  removeUserFromRole(input: $input) {
    ...ServerUser
  }
}
    ${dr}`;const na=e`
    mutation createServer($input: CreateServerInput!) {
  createServer(input: $input) {
    ...Server
  }
}
    ${lr}`;const ra=e`
    mutation updateServer($input: UpdateServerInput!) {
  updateServer(input: $input) {
    ...Server
  }
}
    ${lr}`;const aa=e`
    mutation deleteServer($input: DeleteServerInput!) {
  deleteServer(input: $input)
}
    `;e`
    mutation moveServer($input: MoveServerInput!) {
  moveServer(input: $input)
}
    `;const la=e`
    mutation joinServer($input: JoinServerInput!) {
  joinServer(input: $input) {
    ...Server
  }
}
    ${lr}`;const sa=e`
    mutation leaveServer($input: LeaveServerInput!) {
  leaveServer(input: $input) {
    ...Server
  }
}
    ${lr}`;function oa(e){const t={...In,...e};return n(sa,t)}e`
    mutation readServer($input: ReadServerInput!) {
  readServer(input: $input) {
    ...Server
  }
}
    ${lr}`;const ia=e`
    mutation banUserFromServer($input: BanUserFromServerInput!) {
  banUserFromServer(input: $input)
}
    `;e`
    mutation unbanUserFromServer($input: UnbanUserFromServerInput!) {
  unbanUserFromServer(input: $input)
}
    `;const ca=e`
    mutation kickUserFromServer($input: KickUserFromServerInput!) {
  kickUserFromServer(input: $input)
}
    `;const ma=e`
    mutation createAccount($input: CreateAccountInput!) {
  createAccount(input: $input) {
    accessToken
    user {
      ...CurrentUser
    }
  }
}
    ${ir}`;const da=e`
    mutation changePassword($input: ChangePasswordInput!) {
  changePassword(input: $input) {
    ...CurrentUser
  }
}
    ${ir}`;const ua=e`
    mutation changeUserAvatar($input: ChangeUserAvatarInput!) {
  changeUserAvatar(input: $input) {
    ...CurrentUser
  }
}
    ${ir}`;const pa=e`
    mutation deleteAccount($input: DeleteAccountInput!) {
  deleteAccount(input: $input)
}
    `;const ga=e`
    mutation login($input: LoginInput!) {
  login(input: $input) {
    accessToken
    user {
      ...CurrentUser
    }
  }
}
    ${ir}`;const va=e`
    mutation changeOnlineStatus($input: ChangeOnlineStatusInput!) {
  changeOnlineStatus(input: $input) {
    ...CurrentUser
  }
}
    ${ir}`;e`
    mutation globalBan($input: GlobalBanInput!) {
  globalBan(input: $input)
}
    `;const ha=e`
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
    ${er}
${tr}
${dr}`;const fa=e`
    query currentUser @live {
  user {
    ...CurrentUser
  }
}
    ${ir}`;e`
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
    ${ar}
${tr}
${lr}`;const ba=e`
    query getLinkMeta($linkUrl: String!) {
  getLinkMeta(linkUrl: $linkUrl) {
    ...Metadata
  }
}
    ${Xn}`;const Ea=e`
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
    ${cr}
${tr}
${dr}`;const xa=e`
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
      ...Server
      permissions
    }
  }
}
    ${mr}
${tr}
${dr}
${lr}`;const ya=e`
    query posts($sort: PostsSort, $offset: NonNegativeInt, $limit: PositiveInt, $time: PostsTime, $folderId: ID, $serverId: ID, $search: String) {
  posts(
    sort: $sort
    time: $time
    folderId: $folderId
    serverId: $serverId
    search: $search
    offset: $offset
    limit: $limit
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
        ...Server
      }
    }
  }
}
    ${mr}
${tr}
${dr}
${lr}`;const wa=e`
    query publicServers($sort: PublicServersSort, $category: ServerCategory, $featured: Boolean) {
  publicServers(sort: $sort, category: $category, featured: $featured) {
    ...Server
    onlineCount
  }
}
    ${lr}`;function Na(e){const n={...In,...e};return t(wa,n)}const ka=e`
    query replies($input: RepliesInput!) {
  replies(input: $input) {
    ...Reply
  }
}
    ${ur}`;function Ca(e){const n={...In,...e};return t(ka,n)}const $a=e`
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
    folders {
      ...Folder
    }
  }
}
    ${lr}
${nr}
${rr}
${ar}`;const Ua=e`
    query serverUsers($serverId: ID!) @live {
  serverUsers(serverId: $serverId) {
    ...ServerUser
  }
}
    ${dr}`;function Ia(e){const n={...In,...e};return t(Ua,n)}const Pa=e`
    query user($id: ID, $username: String) @live {
  user(id: $id, username: $username) {
    ...RelatedUser
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
    ${sr}
${tr}`;function Sa(e){const n={...In,...e};return t(Pa,n)}e`
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
    ${er}`;const Fa=e`
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
        id
        name
        server {
          id
          name
        }
      }
      group {
        id
        displayName
      }
      toUser {
        id
        username
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
    ${cr}
${tr}
${dr}`;e`
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
    ${mr}`,e`
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
    ${ur}`;const Ma=e`
    subscription typingUpdated($userId: ID, $groupId: ID, $channelId: ID) {
  typingUpdated(userId: $userId, groupId: $groupId, channelId: $channelId) {
    typingUserId
    isTyping
  }
}
    `;const Ra={en:{translation:{home:"Home",copyId:"Copy ID",markRead:"Mark As Read",continue:"Continue",more:"More",updateAvailable:"Update Available!",auth:{login:"Login",createAccount:"Create an Account",welcomeBack:"Welcome Back!",name:"Name",password:"Password",email:"Email",alreadyHaveAccount:"Already have an account?",register:"Register",needAccount:"Need an account?"},category:{Featured:"Featured",Arts:"Arts",Business:"Business",Culture:"Culture",Discussion:"Discussion",Entertainment:"Entertainment",Gaming:"Gaming",Health:"Health",Hobbies:"Hobbies",Lifestyle:"Lifestyle",Memes:"Memes",Meta:"Meta",News:"News",Politics:"Politics",Programming:"Programming",Science:"Science",Sports:"Sports",Technology:"Technology",Other:"Other"},channel:{title:"Channels",togglePrivate:"Private Channel",hideUsers:"Hide Users",showUsers:"Show Users",create:"Create Channel",edit:"Edit Channel",context:{markRead:"Mark As Read",delete:"Delete Channel",edit:"Edit Channel",mute:"Mute Channel"}},comment:{noPermission:"You do not have permission to view comments.",reply:"Reply",cancelReply:"Cancel Reply",hideReplies:"Hide Replies",showReplies:"Show Replies",create:{submit:"Comment",cancel:"Cancel"},context:{copyLink:"Copy Comment Link",delete:"Delete Comment",reply:"Reply",vote:"Add Rocket",unvote:"Remove Rocket",votePermission:"This planet does not allow you to rocket comments.",pin:"Pin Comment",unpin:"Unpin Comment",edit:"Edit Comment"}},dm:{title:"Direct Messages",create:"Create DM",markRead:"Mark Read",shared:"Shared with {{user.name}}!"},error:$n,explore:{title:"Explore",categories:"Categories",all:"All"},folder:Un,inbox:{title:"Inbox",tab:{all:"All",unread:"Unread"}},infinity:{comingSoon:"Comet Infinity is coming soon!",title:"Infinity"},message:{message:"Message",pinned:"Pinned Messages",upload:"Upload a File",typing:{one:"{{name}} is typing...",two:"{{name1}} and {{name2}} are typing...",three:"{{name1}}, {{name2}}, and {{name3}} are typing...",several:"Several people are typing..."},context:{copyLink:"Copy Message Link",pin:"Pin Message",unpin:"Unpin Message",edit:"Edit Message",delete:"Delete Message"}},permissions:{server:{[Kn.ManageChannels]:{title:"Manage Channels",description:"Allows members to create, edit, or delete channels."},[Kn.ManageServer]:{title:"Manage Roles",description:"Allows members to create new roles and edit or delete roles lower than their highest role. Also allows members to change permissions of individual channels that they have access to."},[Kn.ManageServer]:{title:"Manage Planet",description:"Allows members to change this planet's name, description, icon, and banner image."},[Kn.SendMessages]:{title:"Send Messages",description:"Allows members to send messages in text channels."},[Kn.Mention]:{title:"Mention @everyone, @here, and All Roles",description:'Allows members to use @everyone (everyone in the planet) or @here (only online members in that channel). They can also @mention all roles, even if the role\'s "Allow anyone to mention this role" permission is disabled.'},[Kn.ManageMessages]:{title:"Manage Messages",description:"Allows members to remove messages by other members or pin any message."},[Kn.CreatePost]:{title:"Create Posts",description:"Allows members to create posts."},[Kn.VotePost]:{title:"Vote on Posts",description:"Allows members to vote on posts."},[Kn.ManagePosts]:{title:"Manage Posts",description:"Allows members to pin and remove posts."},[Kn.CreateComment]:{title:"Create Comments",description:"Allows members to create comments."},[Kn.VoteComment]:{title:"Vote on Comments",description:"Allows members to vote on comments."},[Kn.ManageComments]:{title:"Manage Comments",description:"Allows members to pin and remove comments."},[Kn.ManageFolders]:{title:"Manage Folders",description:"Allows members to create, delete, and edit folders."},[Kn.AddPostToFolder]:{title:"Add Posts to Folders",description:"Allows members to add and remove posts from folders."},[Kn.DisplayRoleSeparately]:{title:"Display role members separately from online members",description:""},[Kn.Mentionable]:{title:"Allow anyone to @mention this role",description:'Note: Members with the "Mention @everyone, @here, and All Roles" permission will always be able to ping this role.'},[Kn.Admin]:{title:"Administrator",description:"Members with this permission will have every permission and will also bypass all channel specific permissions or restrictions (for example, these members would get access to all private channels). **This is a dangerous permission to grant**."},[Kn.ManageUsers]:{title:"Manage Users",description:"Ban and kick users"},[Kn.ViewChannels]:{title:"View Channels",description:"View channels"}}},post:{createPost:"Create a post",create:{submit:"Post",cancel:"Cancel"},type:{text:"Text Post",link:"Link Post",image:"Image Post",album:"Image Album"},createComment:"Write a comment",commentCount:"{{count}} Comment",commentCount_plural:"{{count}} Comments",participantCount:"{{count}} Participant",participantCount_plural:"{{count}} Participants",creator:"Creator",context:{pin:"Pin Post",pinned:"Post pinned!",unpin:"Unpin Post",unpinned:"Post unpinned!",removeFromFolder:"Remove from Folder",addToUserFolder:"Add to Folder",addToServerFolder:"Add to Planet Folder",edit:"Edit Post",delete:"Delete Post",deleted:"Post deleted!",copyLink:"Copy Post Link",sendToFriend:"Send to Friend",vote:"Add Rocket",unvote:"Remove Rocket",votePermission:"This planet does not allow you to rocket posts."},hideParticipants:"Hide Participants",showParticipants:"Show Participants",pinnedTo:"Pinned to {{server.name}}",expand:"Show Details",collapse:"Hide Details",feed:{title:"Your Feed",refresh:"Refresh Posts",sort:{hot:"Hot",top:"Top",new:"New"},time:{hour:"Hour",day:"Day",week:"Week",month:"Month",year:"Year",all:"All"},liveMode:{title:"Live Mode",description:"Automatically add new posts to feed",comingSoon:"Live Mode is coming soon!"},subscriptions:{show:"Show Subscriptions",hide:"Hide Subscriptions",comingSoon:"Planet subscriptions are coming soon!"}}},search:{comingSoon:"Search is coming soon!"},server:{loading:"Loading planet...",feed:"Feed",invitePeople:"Invite People",onlineCount:"{{count}} online",memberCount:"{{count}} Member",memberCount_plural:"{{count}} Members",context:{markRead:"Mark As Read",mute:"Mute Planet",invite:"Invite People",leave:"Leave Planet"},create:{title:"Create Planet",name:"Planet Name",upload:"Upload",requireInvite:"Require Invite to Join"}},settings:{title:"Settings"},user:{hideUsers:"Hide Users",showUsers:"Show Users",context:{viewProfile:"Profile",closeDm:"Close DM",block:"Block",unblock:"Unblock",addFriend:"Add Friend",removeFriend:"Remove Friend",sendMessage:"Send Message",message:"Message",kickUser:"Kick {{user.name}}",banUser:"Ban {{user.name}}",banPrompt:"Reason (Optional)",ignore:"Ignore",accept:"Accept",revoke:"Revoke Friend Request",sendFriendRequest:"Send Friend Request",blockingYou:"Blocking You",markRead:"Mark as Read"},profile:{sentFriendRequest:"Request Sent",receivedFriendRequest:"Accept Request",mutualServers:"Mutual Planets",mutualFriends:"Mutual Friends",sendMessage:"Send Message"},offline:"Offline",online:"Online",friends:{title:"Friends",sendMessage:"Message",revokeRequest:"Cancel",acceptRequest:"Accept",rejectRequest:"Ignore",tab:{online:"Online",all:"All",pending:"Pending",blocked:"Blocked",add:"Add Friend"}}}}}};a.use(l).use(s).init({resources:Ra,fallbackLng:"en",debug:!1,load:"languageOnly",interpolation:{escapeValue:!1}});const Aa={status:"connecting"};const Oa=g.exports.createContext({user:null,loading:!0});function Da({children:e}){const{data:n,loading:r}=function(e){const n={...In,...e};return t(fa,n)}({fetchPolicy:"cache-and-network",nextFetchPolicy:"cache-first"}),a=null==n?void 0:n.user;return g.exports.useEffect((()=>{a?v({id:a.id,email:a.email,username:a.username}):h((e=>e.setUser(null)))}),[a]),f.createElement(Oa.Provider,{value:{user:a,loading:(r||"connected"!==Aa.status)&&!a}},e)}const La=()=>{const{user:e,loading:t}=g.exports.useContext(Oa);return[e,t]};var Ta=g.exports.memo((function({children:e="You have reached the end!",className:t="h-48"}){return f.createElement("div",{className:"flex flex-col items-center justify-center text-primary pt-6"},f.createElement("img",{alt:"astronaut",src:"/astronaut.png",className:`object-contain opacity-50 animate-float select-none pointer-events-none ${t}`}),f.createElement("div",{className:"text-tertiary pt-3 text-lg font-semibold"},e))}));function qa(){return La(),f.createElement("div",{className:"relative h-full w-full dark:bg-gray-750 flex flex-col items-center justify-center p-6 text-center"},f.createElement("div",{className:"text-center space-y-3"},f.createElement(Ta,null,"This page does not exist.",f.createElement(b,{to:"/",className:"block text-lg pt-3 text-accent font-medium cursor-pointer hover:underline"},"Return home"))))}function za({children:e,right:t=!1,show:n=!0}){return f.createElement("div",{className:`${n?"block":"hidden"} w-60 min-w-[15rem] bg-gray-200 dark:bg-gray-800 ${t?"":"rounded-tl-lg"}`},f.createElement("div",{className:"relative h-full w-full scrollbar-dark"},e))}const Ha=E(((e,t)=>({friendsPage:"Online",setFriendsPage:t=>e({friendsPage:t}),inboxPage:"Unread",setInboxPage:t=>e({inboxPage:t}),postsSort:"Hot",setPostsSort:t=>e({postsSort:t}),postsTime:"Day",setPostsTime:t=>e({postsTime:t}),commentsSort:"Top",setCommentsSort:t=>e({commentsSort:t}),liveMode:!1,setLiveMode:t=>e({liveMode:t}),showFolders:!0,setShowFolders:t=>e({showFolders:t}),showUsers:!0,setShowUsers:t=>e({showUsers:t}),serverPages:{},setServerPage:(n,r)=>e({serverPages:{...t().serverPages,[n]:r}}),homePage:null,setHomePage:t=>e({homePage:t}),replyingCommentId:null,setReplyingCommentId:t=>e({replyingCommentId:t}),canGoBack:!1,setCanGoBack:t=>e({canGoBack:t}),exploreSort:"Top",setExploreSort:t=>e({exploreSort:t}),exploreCategory:null,setExploreCategory:t=>e({exploreCategory:t}),dialogUserId:null,setDialogUserId:t=>e({dialogUserId:t,userDialogOpen:!!t}),userDialogOpen:!1,setUserDialogOpen:t=>e({userDialogOpen:t}),folderSort:"Added",setFolderSort:t=>e({folderSort:t}),updateAvailable:!1,setUpdateAvailable:t=>e({updateAvailable:t}),loginDialog:!1,setLoginDialog:t=>e({loginDialog:t}),createAccount:!1,setCreateAccount:t=>e({createAccount:t})}))),Ba="Post",ja=(e,t,n)=>y(`\n  ${e&&"h-11"}\n  ${t&&"h-9"}\n  ${!e&&!t&&"h-9"}\n  group\n  rounded\n  cursor-pointer\n  flex\n  items-center\n  text-base\n  font-medium\n  px-4\n  w-full\n  ${n?"dark:hover:bg-gray-725 dark:active:bg-gray-725":"dark:hover:bg-gray-775 dark:active:bg-gray-775"}\n  text-gray-600\n  dark:text-gray-400\n  select-none\n  focus:outline-none\n  relative\n  hover:text-gray-700\n  dark:hover:text-gray-300\n`),_a=e=>y(`\n  text-gray-800\n  hover:text-gray-800\n  dark:text-gray-200\n  dark:hover:text-gray-200\n  ${e?"dark:bg-gray-700 dark:hover:bg-gray-700":"dark:bg-gray-750 dark:hover:bg-gray-750"}\n`);var Va=g.exports.forwardRef((({children:e,large:t=!1,small:n=!1,to:r,onClick:a,active:l,exact:s=!1,light:o=!1},i)=>r?f.createElement(x,{ref:i,to:r,className:`${ja(t,n,o)} ${l?_a(o):""}`,activeClassName:null!=l?"":_a(o),exact:s},e):f.createElement("button",{ref:i,onClick:a,className:`${ja(t,n,o)} ${l?_a(o):""}`},e)));function Ga({className:e}){return f.createElement("svg",{className:e,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor"},f.createElement("path",{fillRule:"evenodd",d:"M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z",clipRule:"evenodd"}))}function Ya({className:e}){return f.createElement("svg",{className:e,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor"},f.createElement("path",{d:"M13 7H7v6h6V7z"}),f.createElement("path",{fillRule:"evenodd",d:"M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z",clipRule:"evenodd"}))}function Wa({className:e}){return f.createElement("svg",{className:e,viewBox:"0 0 24 24"},f.createElement("path",{fill:"currentColor",d:"M17 14H19V17H22V19H19V22H17V19H14V17H17V14M20 12C20 8.64 17.93 5.77 15 4.59V5C15 6.1 14.1 7 13 7H11V9C11 9.55 10.55 10 10 10H8V12H14C14.5 12 14.9 12.35 15 12.81C13.2 13.85 12 15.79 12 18C12 19.5 12.54 20.85 13.44 21.9L12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12L21.9 13.44C21.34 12.96 20.7 12.59 20 12.34L20 12M11 19.93V18C9.9 18 9 17.1 9 16V15L4.21 10.21C4.08 10.78 4 11.38 4 12C4 16.08 7.06 19.44 11 19.93Z"}))}function Qa({className:e="h-5 w-5 text-primary"}){return f.createElement("svg",{className:`animate-spin ${e}`,xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24"},f.createElement("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),f.createElement("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"}))}function Ja({className:e}){return f.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:e,viewBox:"0 0 20 20",fill:"currentColor"},f.createElement("path",{d:"M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"}),f.createElement("path",{d:"M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"}))}const Ka=({server:e,permissions:t})=>g.exports.useMemo((()=>e?t.map((t=>{var n;return[...null!=(n=null==e?void 0:e.permissions)?n:[]].includes(t)})):t.map((e=>!1))),[t,e]),Za=0,Xa=2,el={disable:!1,holdToDisplay:1e3,posX:0,posY:0,mouseButton:Xa,disableIfShiftIsPressed:!1,collect(){}};function tl(e,t){return t=>{const n=Object.assign({},el,t);g.exports.useRef(!1),g.exports.useRef(),g.exports.useRef();const r=t=>{t.ctrlKey||(t.preventDefault(),t.stopPropagation(),e(((e,t)=>["X","Y"].map((n=>(e[`client${n}`]||e.touches&&e.touches[0][`page${n}`])-t[`pos${n}`])))(t,n),{...n.collect(),href:t.target.href}))};return[{onContextMenu:e=>{e.button===n.mouseButton&&r(e)},onClick:e=>{e.button===n.mouseButton&&r(e)}}]}}const nl=27,rl=13,al=38,ll=40,sl={position:"fixed",opacity:0,pointerEvents:"none"},ol=e=>e.focus(),il=({rtl:e,handleElementSelect:t=ol}={})=>{const n=g.exports.useRef(),r=g.exports.useRef([]),[a,l]=g.exports.useState(sl),[s,o]=g.exports.useState(-1),[i,c]=g.exports.useState(!1),[m,d]=g.exports.useState([0,0]),[u,p]=g.exports.useState(),v=g.exports.useCallback((()=>c(!1)),[c]);g.exports.useCallback((()=>{i&&c(!1)}),[i,c]);const h=g.exports.useCallback(((e,t)=>{c(!0),d(e),p(t)}),[c,p]);g.exports.useEffect((()=>{const e=e=>{n.current.contains(e.target)||(o(-1),v())},a=e=>{switch(e.keyCode){case nl:e.preventDefault(),v();break;case al:e.preventDefault(),s>0&&(o((e=>e-1)),t(r.current[s-1]));break;case ll:e.preventDefault(),s+1<r.current.length&&(o((e=>e+1)),t(r.current[s+1]));break;case rl:-1!==s&&r.current[s].click(),v()}};return i&&(document.addEventListener("mousedown",e),document.addEventListener("touchstart",e),document.addEventListener("scroll",v),document.addEventListener("contextmenu",v),document.addEventListener("keydown",a)),()=>{document.removeEventListener("mousedown",e),document.removeEventListener("touchstart",e),document.removeEventListener("scroll",v),document.removeEventListener("contextmenu",v),document.removeEventListener("keydown",a)}}),[n,v,s,o,r,t,i]),g.exports.useLayoutEffect((()=>{if(i){const t=n.current.getBoundingClientRect(),{top:r,left:a}=e?((e,[t,n])=>{const r={top:n,left:t},{innerWidth:a,innerHeight:l}=window;return r.left=t-e.width,n+e.height>l&&(r.top-=e.height),r.left<0&&(r.left+=e.width),r.top<0&&(r.top=e.height<l?(l-e.height)/2:0),r.left+e.width>a&&(r.left=e.width<a?(a-e.width)/2:0),r})(t,m):((e,[t,n])=>{const r={top:n,left:t},{innerWidth:a,innerHeight:l}=window;return n+e.height>l&&(r.top-=e.height),t+e.width>a&&(r.left-=e.width),r.top<0&&(r.top=e.height<l?(l-e.height)/2:0),r.left<0&&(r.left=e.width<a?(a-e.width)/2:0),r})(t,m);l((e=>({...e,top:`${r}px`,left:`${a}px`,opacity:1,pointerEvents:"auto"})))}else l(sl)}),[n,i,m]);return[{style:a,ref:n,role:"menu",tabIndex:-1},{ref:e=>r.current=null===e?[]:[...r.current,e],role:"menuitem",tabIndex:-1},tl(h),{data:u,isVisible:i,setVisible:c,coords:m,setCoords:d}]},cl=e=>y(`\n  active:text-white\n  dark:active:text-white\n  dark:hover:text-white\n  dark:focus:text-white\n  hover:text-white\n  select-none\n  cursor-pointer\n  w-full\n  px-2\n  py-1.5\n  leading-5\n  flex\n  items-center\n  text-13\n  rounded-sm\n  font-medium\n  focus:outline-none\n  group\n  relative\n  ${e?"text-red-500 active:bg-red-600 hover:bg-red-500 focus:bg-red-500":"text-gray-600 dark:text-gray-400 active:bg-green-700 focus:bg-green-600 hover:bg-green-600"} \n`);function ml({item:{bindMenuItem:e,hideMenu:t},onClick:n,red:r,checked:a=null,label:l,children:s}){return f.createElement("div",{...e,className:cl(r),onClick:e=>{t(),n&&n(e)}},l,null!==a&&f.createElement("input",{type:"checkbox",className:"ml-auto h-4 w-4 border-none rounded dark:checked:bg-green-600 dark:bg-gray-750 focus:outline-none cursor-pointer",checked:a,readOnly:!0}),s&&f.createElement(f.Fragment,null,f.createElement("div",{className:"ml-auto"},f.createElement(w,{className:"w-5 h-5 -mr-0.5"})),f.createElement("div",{className:"absolute left-full -top-2 -ml-2 hidden group-hover:block"},f.createElement("div",{className:"pl-2"},f.createElement("div",{className:"p-2 ml-3 dark:bg-gray-900 rounded w-48 shadow-lg"},s)))))}const dl="User",ul="Post",pl="Comment",gl="Message",vl="Server",hl="Folder",fl="Channel",bl=e=>{const{t:t}=k(),[r]=function(e){const t={...In,...e};return n(Dr,t)}({optimisticResponse:{votePost:{...e,isVoted:!0,voteCount:e.voteCount+1}}}),[a]=function(e){const t={...In,...e};return n(Lr,t)}({optimisticResponse:{unvotePost:{...e,isVoted:!1,voteCount:e.voteCount-1}}}),[l]=Ka({server:null==e?void 0:e.server,permissions:[Kn.VotePost]});return g.exports.useCallback((()=>{const n={postId:e.id};l?e.isVoted?a({variables:{input:n}}):r({variables:{input:n}}):N.error(t("post.context.votePermission"))}),[e,l,r,a,t])},El=e=>{const[t]=function(e){const t={...In,...e};return n(Tr,t)}(),[r]=function(e){const t={...In,...e};return n(qr,t)}();return g.exports.useCallback((()=>{const n={postId:e.id};e.isPinned?r({variables:{input:n}}):t({variables:{input:n}})}),[e,t,r])},xl=y("\n  select-none\n  w-full\n  px-2\n  h-8\n  flex\n  items-center\n  text-13\n  text-mid\n  cursor-default\n  rounded-sm\n  font-medium\n  focus:outline-none\n");function yl({children:e}){return wl(e)?f.createElement("div",{className:"space-y-0.5"},f.createElement("div",{className:xl},"No actions available")):f.createElement("div",{className:"space-y-0.5"},e)}const wl=e=>!C.renderToStaticMarkup(e),Nl=()=>Ha((e=>[e.loginDialog,e.setLoginDialog,e.createAccount,e.setCreateAccount])),kl=()=>{const e=Nl()[1];return()=>e(!0)};function Cl({post:e,ContextMenuItem:t}){var r,a;$();const{t:l}=k(),[s]=Ka({server:null==e?void 0:e.server,permissions:[Kn.ManagePosts]}),o=U()[1],[i]=function(e){const t={...In,...e};return n(Or,t)}(),c=bl(e),m=El(e),[d]=La(),u=!!d&&(null==(r=null==e?void 0:e.author)?void 0:r.id)===d.id,p=u||s,g=(null!=(a=null==d?void 0:d.relatedUsers)?a:[]).filter((e=>"Friends"===e.relationshipStatus));return e?f.createElement(f.Fragment,null,f.createElement(yl,null,!!d&&f.createElement(t,{onClick:()=>{c()},label:e.isVoted?l("post.context.unvote"):l("post.context.vote")}),g.length>0&&f.createElement(t,{label:l("post.context.sendToFriend")},g.map((e=>f.createElement(t,{key:e.id,label:e.name})))),u&&f.createElement(t,{label:l("post.context.edit")}),s&&f.createElement(t,{onClick:()=>m(),label:e.isPinned?l("post.context.unpin"):l("post.context.pin")}),f.createElement(t,{onClick:()=>{o(`${location.origin}${e.relativeUrl}`)},label:l("post.context.copyLink")}),p&&f.createElement(t,{red:!0,onClick:()=>{i({variables:{input:{postId:e.id}}}),N.success(l("post.context.deleted"))},label:l("post.context.delete")}))):null}function $l({user:e,server:t,isDm:r,ContextMenuItem:a}){const{t:l}=k(),[s]=La(),[o]=Ka({server:t,permissions:[Kn.ManageUsers]}),[i]=ea(),[c]=Kr(),[m]=function(e){const t={...In,...e};return n(ia,t)}(),[d]=function(e){const t={...In,...e};return n(ca,t)}();Hr(),Qr();const u=Ha((e=>e.setDialogUserId)),{push:p}=I();return e?f.createElement(f.Fragment,null,f.createElement(yl,null,f.createElement(a,{label:l("user.context.viewProfile"),onClick:()=>{u(e.id)}}),r&&f.createElement(f.Fragment,null,!!e.unreadCount&&f.createElement(a,{label:l("user.context.markRead"),onClick:()=>{c({variables:{input:{userId:e.id}}})}}),f.createElement(a,{label:l("user.context.closeDm"),onClick:()=>{i({variables:{input:{userId:e.id}}})}})),s&&e.id!==s.id?f.createElement(f.Fragment,null,!r&&f.createElement(a,{onClick:()=>p(`/dm/@${e.username}`),label:l("user.context.sendMessage")})):f.createElement(f.Fragment,null),!!t&&o&&f.createElement(f.Fragment,null,f.createElement(a,{label:l("user.context.kickUser",{user:e}),red:!0,onClick:()=>{d({variables:{input:{serverId:t.id,userId:e.id}}}),N.success(l("user.context.kickedUser",{user:e}))}}),f.createElement(a,{label:l("user.context.banUser",{user:e}),red:!0,onClick:()=>{const n=window.prompt(l("user.context.banPrompt"));null!==n&&(m({variables:{input:{serverId:t.id,userId:e.id,reason:n}}}),N.success(l("user.context.bannedUser",{user:e})))}})))):null}function Ul({message:e,server:t,ContextMenuItem:r}){var a,l;const{pathname:s}=$(),o=P(s,{path:"/group/:groupId"}),i=P(s,{path:"/dm/:username"});null==(a=null==o?void 0:o.params)||a.groupId,null==(l=null==i?void 0:i.params)||l.username;const[c]=Ka({server:t,permissions:[Kn.ManageMessages]});U()[1],function(e){const t={...In,...e};n(Ir,t)}(),Sr(),Mr(),(e=>{const[t]=Sr(),[n]=Mr();g.exports.useCallback((()=>{const r={messageId:e.id};e.isPinned?n({variables:{input:r}}):t({variables:{input:r}})}),[e,t,n])})(e);const{t:m}=k(),[d]=La(),u=!!d&&e.author.id===d.id,p=(c||u)&&e.type===Ln.Normal,v=u&&e.type===Ln.Normal;return f.createElement(f.Fragment,null,f.createElement(yl,null,v&&f.createElement(r,{label:m("message.context.edit")}),p&&f.createElement(r,{label:m("message.context.delete"),red:!0,onClick:()=>N.error(m("message.context.deleted"))})))}const Il=e=>{const{t:t}=k(),[r]=function(e){const t={...In,...e};return n(br,t)}({optimisticResponse:{voteComment:{...e,isVoted:!0,voteCount:e.voteCount+1}}}),[a]=function(e){const t={...In,...e};return n(Er,t)}({optimisticResponse:{unvoteComment:{...e,isVoted:!1,voteCount:e.voteCount-1}}});return g.exports.useCallback((()=>{const t={commentId:e.id};e.isVoted?a({variables:{input:t}}):r({variables:{input:t}})}),[e,r,a,t])},Pl=e=>{const[t]=function(e){const t={...In,...e};return n(xr,t)}(),[r]=function(e){const t={...In,...e};return n(yr,t)}();return g.exports.useCallback((()=>{const n={commentId:e.id};e.isPinned?r({variables:{input:n}}):t({variables:{input:n}})}),[e,t,r])};function Sl({comment:e,post:t,ContextMenuItem:r}){const{t:a}=k(),[l]=La(),s=Ha((e=>e.setReplyingCommentId)),[o,i,c]=Ka({server:t.server,permissions:[Kn.ManageComments,Kn.VoteComment,Kn.CreateComment]});U()[1],function(e){const t={...In,...e};n(fr,t)}();const m=Il(e),d=Pl(e),u=!!l&&e.author.id===l.id,p=o||u;return f.createElement(f.Fragment,null,f.createElement(yl,null,!!l&&i&&f.createElement(r,{label:e.isVoted?a("comment.context.unvote"):a("comment.context.vote"),onClick:()=>m()}),u&&f.createElement(r,{label:a("comment.context.edit")}),o&&f.createElement(r,{label:e.isPinned?a("comment.context.unpin"):a("comment.context.pin"),onClick:()=>d()}),c&&f.createElement(r,{onClick:()=>s(null==e?void 0:e.id),label:a("comment.context.reply")}),p&&f.createElement(r,{label:a("comment.context.delete"),red:!0,onClick:()=>N.error(a("comment.context.deleted"))})))}function Fl({server:e,ContextMenuItem:t}){const{t:n}=k(),[r]=La(),a=S(),[l]=oa(),{push:s}=I(),{pathname:o}=$();return f.createElement(f.Fragment,null,f.createElement(yl,null,(null==r?void 0:r.isAdmin)&&f.createElement(f.Fragment,null,f.createElement(t,{label:e.isFeatured?"Remove from Featured":"Make Featured"}),!e.isFeatured&&f.createElement(f.Fragment,null,f.createElement(t,{label:"Increment Featured Position"}),f.createElement(t,{label:"Decrement Featured Position"}))),!!r&&e.owner.id!==r.id&&f.createElement(t,{label:n("server.context.leave"),red:!0,onClick:()=>{o.startsWith(`/+${e.id}`)&&s("/"),l({variables:{input:{serverId:e.id}}});const t=a.cache.readQuery({query:fa});a.cache.writeQuery({query:fa,data:{user:{...t.user,servers:t.user.servers.filter((t=>t.id!==e.id))}}});const n=a.cache.readFragment({fragment:lr,id:`Server:${e.id}`});a.cache.writeFragment({fragment:lr,id:`Server:${e.id}`,data:{...n,isJoined:!1}})}})))}function Ml({channel:e,server:t,openDelete:n,ContextMenuItem:r}){const{t:a}=k(),[l]=Ka({server:t,permissions:[Kn.ManageChannels]});return f.createElement(f.Fragment,null,f.createElement(yl,null,l&&f.createElement(f.Fragment,null,f.createElement(r,{label:a("channel.context.edit")}),f.createElement(r,{label:a("channel.context.delete"),red:!0,onClick:()=>{n()}}))))}function Rl({folder:e,ContextMenuItem:t}){var r,a,l,s;const{t:o}=k(),[i]=La(),c=null!=(r=null==i?void 0:i.folders)?r:[],m=!!i&&c.filter((e=>{var t;return(null==(t=e.owner)?void 0:t.id)!==i.id})).map((e=>e.id)).includes(e.id),d="Read Later"!==e.name&&"Favorites"!==e.name,[u]=function(e){const t={...In,...e};return n(wr,t)}(),[p]=function(e){const t={...In,...e};return n(kr,t)}(),[g]=function(e){const t={...In,...e};return n(Cr,t)}(),[v]=function(e){const t={...In,...e};return n(Nr,t)}(),{push:h}=I(),{pathname:b}=$(),E=P(b,{path:"/:server"}),x=null==(l=null==(a=null==E?void 0:E.params)?void 0:a.server)?void 0:l.substring(1);return f.createElement(f.Fragment,null,f.createElement(yl,null,f.createElement(t,{label:o("folder.context.copyLink")}),!!i&&(null==(s=e.owner)?void 0:s.id)!==i.id&&f.createElement(f.Fragment,null,m?f.createElement(t,{label:o("folder.context.unfollow"),onClick:()=>g({variables:{input:{folderId:e.id}}})}):f.createElement(t,{label:o("folder.context.follow"),onClick:()=>p({variables:{input:{folderId:e.id}}})})),d&&f.createElement(f.Fragment,null,f.createElement(t,{label:o("folder.context.edit")}),!x&&f.createElement(t,{label:o("folder.context.collaborative"),checked:e.isCollaborative,onClick:()=>u({variables:{input:{folderId:e.id,isCollaborative:!e.isCollaborative}}})}),f.createElement(t,{label:o("folder.context.changeVisibility")},f.createElement(t,{label:o("folder.context.visibility.public"),checked:e.visibility===On.Public,onClick:()=>u({variables:{input:{folderId:e.id,visibility:On.Public}}})}),f.createElement(t,{label:o("folder.context.visibility.friends"),checked:e.visibility===On.Friends,onClick:()=>u({variables:{input:{folderId:e.id,visibility:On.Friends}}})}),f.createElement(t,{label:o("folder.context.visibility.unlisted"),checked:e.visibility===On.Unlisted,onClick:()=>u({variables:{input:{folderId:e.id,visibility:On.Unlisted}}})}),f.createElement(t,{label:o("folder.context.visibility.private"),checked:e.visibility===On.Private,onClick:()=>u({variables:{input:{folderId:e.id,visibility:On.Private}}})})),f.createElement(t,{label:o("folder.context.delete"),red:!0,onClick:()=>{v({variables:{input:{folderId:e.id}}}),b.startsWith("/folder")?h("/"):b.startsWith(`/${x}/folder`)&&h(`/${x}`)}}))))}function Al(){let e=window.navigator.userAgent,t=window.navigator.platform,n=null;return-1!==["Macintosh","MacIntel","MacPPC","Mac68K"].indexOf(t)?n="Mac OS":-1!==["iPhone","iPad","iPod"].indexOf(t)?n="iOS":-1!==["Win32","Win64","Windows","WinCE"].indexOf(t)?n="Windows":/Android/.test(e)?n="Android":/Linux/.test(t)&&(n="Linux"),n}function Ol(){return f.createElement("div",{className:"border-t dark:border-gray-800 mt-2 pb-2"})}const Dl=y("\n  p-2\n  w-48\n  dark:bg-gray-900\n  rounded\n  shadow-lg\n  outline-none\n");function Ll({bindMenu:{style:e,ref:t,role:n,tabIndex:r},data:a,bindMenuItem:l,hideMenu:s}){const o=(i={bindMenuItem:l,hideMenu:s},g.exports.useCallback((({onClick:e,red:t,label:n,checked:r,children:a})=>f.createElement(ml,{item:i,onClick:e,red:t,label:n,checked:r},a)),[i]));var i;const c=U()[1],m=(null==a?void 0:a.href)?new URL(a.href):null,d=m&&m.origin===window.location.origin,u="Mac OS"===Al(),p={...null!=a?a:{},ContextMenuItem:o};return f.createElement("div",{style:{...e,zIndex:999999},ref:t,role:n,tabIndex:r,className:Dl,onMouseDown:e=>{e.stopPropagation(),e.preventDefault()}},!!window.getSelection().toString()&&f.createElement(f.Fragment,null,f.createElement(o,{label:f.createElement("div",{className:"flex items-center w-full"},"Copy",f.createElement("div",{className:"ml-auto"},u?"⌘+C":"Ctrl+C")),onClick:()=>document.execCommand("copy")}),f.createElement(Ol,null)),(null==a?void 0:a.type)===ul&&f.createElement(Cl,{...p}),(null==a?void 0:a.type)===dl&&f.createElement($l,{...p}),(null==a?void 0:a.type)===gl&&f.createElement(Ul,{...p}),(null==a?void 0:a.type)===pl&&f.createElement(Sl,{...p}),(null==a?void 0:a.type)===vl&&f.createElement(Fl,{...p}),(null==a?void 0:a.type)===fl&&f.createElement(Ml,{...p}),(null==a?void 0:a.type)===hl&&f.createElement(Rl,{...p}),!!(null==a?void 0:a.href)&&!d&&f.createElement(f.Fragment,null,f.createElement(Ol,null),f.createElement(yl,null,f.createElement(o,{label:"Copy Link",onClick:()=>c(a.href)}),f.createElement(o,{label:"Open Link",onClick:()=>window.open(a.href,"_blank")}))))}const Tl=g.exports.createContext({useContextTrigger:e=>[{}]});function ql({children:e}){const[t,n,r,{data:a,coords:l,setVisible:s}]=il();return f.createElement(f.Fragment,null,f.createElement(Tl.Provider,{value:{useContextTrigger:r}},e,f.createElement(Ll,{bindMenu:t,data:a,bindMenuItem:n,hideMenu:()=>s(!1)})))}function zl({data:e,leftClick:t=!1,children:n,className:r}){const[a]=((e,t=!1)=>{const{useContextTrigger:n}=g.exports.useContext(Tl);return n({collect:()=>e,mouseButton:t?Za:Xa})})(e,t);return f.createElement("div",{className:r,...a},n)}const Hl=e=>y(`\n  px-3\n  pt-4\n  pb-1\n  text-gray-500\n  dark:text-gray-500\n  uppercase\n  text-11\n  font-semibold\n  tracking-wide\n  flex\n  items-center\n  justify-between\n  select-none\n  ${e&&"hover:text-gray-600 dark:hover:text-gray-400"}\n`);function Bl({children:e,plusLabel:t,onClick:n}){const r=t&&n;return f.createElement("div",{className:Hl(r)},e,r&&f.createElement(F,{content:t},f.createElement("div",{onClick:n},f.createElement(M,{className:"w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"}))))}function jl({isOpen:e,close:t,children:n,closeOnOverlayClick:r=!1}){return f.createElement(R,{show:e,as:g.exports.Fragment},f.createElement(A,{open:e,onClose:t,static:!0},f.createElement("div",{className:"fixed z-10 inset-0"},f.createElement("div",{className:"flex items-end justify-center min-h-screen text-center sm:block p-0"},f.createElement(R.Child,{enter:"ease-out duration-150",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-150",leaveFrom:"opacity-100",leaveTo:"opacity-0"},f.createElement(A.Overlay,{className:"fixed inset-0 transition-opacity"},f.createElement("div",{className:"absolute inset-0 bg-gray-500 dark:bg-black opacity-75"}))),f.createElement(R.Child,{enter:"ease-out transform duration-150",enterFrom:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",enterTo:"opacity-100 translate-y-0 sm:scale-100",leave:"ease-in transform duration-150",leaveFrom:"opacity-100 translate-y-0 sm:scale-100",leaveTo:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"},f.createElement("span",{className:"hidden sm:inline-block sm:align-middle sm:h-screen","aria-hidden":"true"},"​"),f.createElement("div",{onClick:()=>{r&&t()},className:"overflow-y-auto scrollbar dark:scrollbar-thumb-gray-800 dark:scrollbar-track-transparent inline-block h-screen transform transition-all align-middle w-full"},f.createElement("div",{className:"flex min-h-full w-full items-center justify-center"},n)))))))}var _l=A.Title;function Vl(){return f.createElement("div",{className:"group relative w-full"},f.createElement("input",{onFocus:e=>{e.target.blur(),N.error("Search is coming soon!")},className:"w-full block h-7 min-w-0 rounded-md dark:bg-gray-850 placeholder-tertiary text-sm focus:outline-none focus:ring-1 ring-blue-600 transition"}),f.createElement(O,{className:"w-4 h-4 text-mid absolute top-1/2 transform -translate-y-1/2 left-3"}))}function Gl({children:e,className:t,icon:n,title:r,showDivider:a=!1}){return f.createElement("header",{id:"header",className:"h-12 min-h-[3rem] items-center bg-white dark:bg-gray-750 border-b dark:border-gray-800 shadow flex"},f.createElement("div",{className:"flex items-center font-semibold text-base leading-5 text-primary pl-4 pr-4 "+(a?"border-r dark:border-gray-700 mr-4":"")},f.createElement("div",{className:"text-tertiary mr-3"},n),r),f.createElement("div",{className:"flex-grow flex items-center min-w-0 pr-4"},e),f.createElement("div",{className:"flex w-60 min-w-[15rem] pr-4"},f.createElement(Vl,null)))}function Yl({currentPage:e,setCurrentPage:t,page:n,green:r=!1,children:a}){return f.createElement("button",{onClick:()=>t(n),className:"text-base font-medium rounded px-1.5 py-0.5 cursor-pointer select-none flex flex-shrink-0 items-center focus:outline-none "+(n===e?r?"text-green-600 bg-green-900":"text-secondary dark:bg-gray-700":r?"text-secondary bg-green-600":"text-tertiary")},a||n)}function Wl({refreshPosts:e}){const[t,n,r]=Ha((e=>[e.postsSort,e.showFolders,e.liveMode])),{t:a}=k();let l;switch(t){case"Hot":l=f.createElement(q,{className:"w-5 h-5"});break;case"New":l=f.createElement(T,{className:"w-5 h-5"});break;case"Top":l=f.createElement(L,{className:"w-5 h-5"})}return f.createElement(Gl,{isRightSidebar:n,title:t,icon:l,showDivider:"Top"===t},"Top"===t&&f.createElement("div",{className:"flex items-center space-x-4"},f.createElement(Ql,{time:"Hour"}),f.createElement(Ql,{time:"Day"}),f.createElement(Ql,{time:"Week"}),f.createElement(Ql,{time:"Month"}),f.createElement(Ql,{time:"Year"}),f.createElement(Ql,{time:"All"})),f.createElement("div",{className:"ml-auto space-x-5 flex items-center"},f.createElement(F,{content:a("post.feed.refresh")},f.createElement("div",{className:"highlightable",onClick:e},f.createElement(D,{className:"w-5 h-5"})))))}function Ql({time:e}){const{t:t}=k(),[n,r]=Ha((e=>[e.postsTime,e.setPostsTime]));return f.createElement(Yl,{page:e,setCurrentPage:r,currentPage:n},t(`post.feed.time.${e.toLowerCase()}`))}const Jl=({serverId:e,folderId:n})=>{var r;const[a,l,s]=Ha((e=>[e.postsSort,e.postsTime,e.folderSort])),[o,i]=g.exports.useState(0),c={sort:n?s:a,time:"Top"!==a||n?null:l,serverId:e,folderId:n},{data:m,loading:d,fetchMore:u}=function(e){const n={...In,...e};return t(ya,n)}({variables:c,fetchPolicy:"cache-and-network",nextFetchPolicy:"cache-first"}),p=null==m?void 0:m.posts.hasMore,v=null!=(r=null==m?void 0:m.posts.posts)?r:[];return[v,d,()=>{p&&0!==v.length&&(u({variables:{...c,offset:20*(o+1)},updateQuery:(e,{fetchMoreResult:t})=>({posts:{hasMore:t.posts.hasMore,posts:[...e.posts.posts,...t.posts.posts]}})}),i(o+1))},p]};var Kl=g.exports.forwardRef((({avatarUrl:e,children:t,loading:n="eager",className:r="",size:a=12,style:l={}},s)=>f.createElement("div",{ref:s,className:`relative flex-shrink-0 flex items-center justify-center bg-cover bg-center ${r}`,style:{width:a/4+"rem",height:a/4+"rem",backgroundImage:e?`url(${e})`:void 0,...l}},t)));const Zl={gray:z.gray,red:z.red,yellow:z.amber,green:z.emerald,blue:z.blue,indigo:z.indigo,purple:z.violet,pink:z.pink},Xl={transparent:"transparent",current:"currentColor",black:z.black,white:z.white,...Zl},es={Red:Xl.red[500],Yellow:Xl.yellow[500],Green:Xl.green[500],Blue:Xl.blue[500],Indigo:Xl.indigo[500],Purple:Xl.purple[500],Pink:Xl.pink[500]};var ts=g.exports.forwardRef((({user:e,loading:t="eager",size:n=12,showOnline:r=!1,className:a="",dotClassName:l=""},s)=>f.createElement(Kl,{ref:s,avatarUrl:null==e?void 0:e.avatarUrl,loading:t,className:`${a} cursor-pointer rounded-full`,size:n,style:(null==e?void 0:e.avatarUrl)?{}:{backgroundColor:es[null==e?void 0:e.color]}},r&&f.createElement("div",{className:`absolute bottom-0 right-0 rounded-full z-10 ${l} ${(null==e?void 0:e.isOnline)?"bg-green-500":"bg-gray-600"}`}),!(null==e?void 0:e.avatarUrl)&&f.createElement(H,{className:"text-primary w-2/3 h-2/3"})))),ns=g.exports.forwardRef((({server:e,loading:t="eager",size:n=12,className:r="",style:a={}},l)=>{var s;const o=(null!=(s=null==e?void 0:e.displayName)?s:"").split(" ").map((e=>e[0])).join("").toUpperCase(),i=g.exports.useMemo((()=>{const e=o;return e.length<=2?"18px":3===e.length?"16px":4===e.length?"14px":5===e.length?"12px":e.length>=6?"10px":void 0}),[o]);return e?f.createElement(Kl,{ref:l,avatarUrl:e.avatarUrl,loading:t,className:`${r} cursor-pointer`,size:n,style:a},!e.avatarUrl&&f.createElement("svg",{width:"100%",height:"100%",viewBox:"0 0 48 48",className:"absolute top-0 left-0",overflow:"visible"},f.createElement("defs",null,f.createElement("g",null,f.createElement("path",{d:"M48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24Z"})),f.createElement("g",null,f.createElement("rect",{x:"28",y:"-4",width:"24",height:"24",rx:"12",ry:"12",transform:"translate(20 -20)"})),f.createElement("g",null,f.createElement("rect",{x:"28",y:"28",width:"24",height:"24",rx:"12",ry:"12",transform:"translate(20 20)"}))),f.createElement("foreignObject",{x:"0",y:"0",width:"48",height:"48"},f.createElement("div",{className:"flex items-center justify-center h-full",tabIndex:"-1","aria-label":e.name,style:{fontSize:i}},f.createElement("div",{className:"flex items-center justify-center whitespace-nowrap font-medium text-tertiary","aria-hidden":"true"},o))))):null}));function rs({children:e,render:t,className:n,placement:r="right"}){const[a,l]=g.exports.useState(!1),s=B(8);const o={name:"hideOnPopperBlur",defaultValue:!0,fn:e=>({onCreate(){e.popper.addEventListener("focusout",(t=>{e.props.hideOnPopperBlur&&t.relatedTarget&&!e.popper.contains(t.relatedTarget)&&e.hide()}))}})};return f.createElement(f.Fragment,null,f.createElement(j,{render:e=>f.createElement(_.div,{style:{x:s},...e,className:`hidden lg:block ${n}`},t((()=>l(!1)))),placement:r,interactive:!0,onMount:function(){l(!0),s.set(8),V(s,0,{ease:[.4,0,.2,1],duration:.15})},visible:a,onHide:()=>l(!1),onClickOutside:()=>l(!1),plugins:[o],zIndex:9999,appendTo:document.body},f.createElement("span",{className:"leading-none",onClick:()=>l(!0)},e)))}function as({user:e,roles:t,children:n,placement:r="right"}){const a=Ha((e=>e.setDialogUserId));return f.createElement(f.Fragment,null,f.createElement(rs,{className:"w-64",placement:r,render:n=>f.createElement("div",{className:"w-full relative rounded-md shadow-lg duration-200 transform transition z-50 w-64"},f.createElement("div",{className:"p-3 flex flex-col items-center dark:bg-gray-850 rounded-t-md"},f.createElement("div",{className:"group relative"},f.createElement(ts,{user:e,size:20,showOnline:!0,className:"dark:bg-gray-700 cursor-pointer select-none",dotClassName:"ring-5 w-4 h-4 dark:ring-gray-850"}),f.createElement("div",{onClick:()=>{n(),a(e.id)},className:"cursor-pointer bg-black bg-opacity-50 transition rounded-full absolute whitespace-nowrap inset-0 flex items-center justify-center text-9 uppercase tracking-widest font-semibold opacity-0 group-hover:opacity-100"},"View Profile")),f.createElement("div",{className:"mt-3 text-base"},f.createElement("span",{className:"font-semibold text-primary"},e.username))),f.createElement("div",{className:"p-4 dark:bg-gray-800 rounded-b-md"},t&&f.createElement("div",null,f.createElement("div",{className:"text-11 font-semibold uppercase tracking-widest text-secondary pb-2"},"Roles"),f.createElement("div",{className:"flex space-x-1"},t.map((e=>f.createElement("div",{key:e.id,style:{color:e.color,borderColor:e.color},className:"text-xs font-medium px-2 h-5.5 rounded-full border inline-flex items-center "+(e.color?"":"dark:border-gray-700 text-secondary")},e.name))),f.createElement("div",{className:"text-xs font-medium h-5.5 w-5.5 rounded-full border inline-flex items-center justify-center dark:border-gray-700 text-secondary"},f.createElement(M,{className:"w-5 h-5"}))))))},n))}function ls(e){return G(e).calendar()}function ss(e){return G(e).format("h:mm A")}G.extend(Y),G.extend(W);const os=/^https?:\/\/twitter\.com\/(?:#!\/)?(?:\w+)\/status(?:es)?\/(\d+)/,is=/^https?:\/\/banned\.video\/watch\?id=((?:\w){24})/,cs=/^https?:\/\/open\.(?:spotify\.com\/)(?:embed\/)?(track|playlist|album)\/((?:\w){22})/,ms=/^https?:\/\/gfycat\.com\/(\w+)/,ds=/^https?:\/\/www\.bitchute\.com\/video\/(\w+)/,us=e=>Q.canPlay(e),ps=e=>os.test(e),gs=e=>is.test(e),vs=e=>cs.test(e),hs=e=>ms.test(e),fs=e=>ds.test(e),bs=e=>e&&(us(e)||ps(e)||gs(e)||vs(e)||hs(e))||fs(e),Es=y("aspect-h-9 aspect-w-16 relative"),xs=y("w-full h-full");function ys({url:e}){if(us(e))return f.createElement("div",{className:Es},f.createElement(Q,{url:e,className:"absolute top-0 left-0",width:"100%",height:"100%",config:{youtube:{playerVars:{controls:1}}}}));if(ps(e)){const t=e.match(os)[1];return f.createElement(J,{tweetId:t,options:{theme:"dark",align:"center",dnt:!0}})}if(gs(e)){const t=e.match(is)[1];return f.createElement("div",{className:Es},f.createElement("iframe",{src:`https://api.banned.video/embed/${t}?autoplay=false&amp;muted=false`,frameBorder:"0",allowFullScreen:!0,className:xs}))}if(vs(e)){const t=e.match(cs),n=t[1],r=t[2];return f.createElement("div",{className:Es},f.createElement("iframe",{src:`https://open.spotify.com/embed/${n}/${r}`,frameBorder:"0",allowTransparency:"true",allow:"encrypted-media",className:xs}))}if(hs(e)){const t=e.match(ms)[1];return f.createElement("div",{className:Es},f.createElement("iframe",{src:`https://gfycat.com/ifr/${t}`,frameBorder:"0",scrolling:"no",allowFullScreen:!0,className:xs}))}if(fs(e)){const t=e.match(ds)[1];return f.createElement("div",{className:Es},f.createElement("iframe",{src:`https://www.bitchute.com/embed/${t}/`,frameBorder:"0",allowFullScreen:!0,className:xs}))}return null}function ws({linkUrl:e,metadata:t,dark:n=!1}){var r,a;const l=g.exports.useMemo((()=>{if(!e)return"domain.com";let t=new URL(e).hostname;return t.startsWith("www.")&&(t=t.substring(4)),t}),[e]);return e&&bs(e)?f.createElement(ys,{url:e}):f.createElement("a",{href:e,rel:"noopener nofollow noreferrer",target:"_blank",className:"rounded-md flex transition "+(n?"dark:bg-gray-775 border dark:border-gray-825":"dark:bg-gray-750 dark:hover:bg-gray-725")},f.createElement("div",{className:"rounded-l-md dark:bg-gray-750 flex flex-shrink-0 items-center justify-center h-24 w-24 bg-contain bg-center",style:(null==t?void 0:t.image)?{backgroundImage:`url(${null==t?void 0:t.image})`}:{}},!(null==t?void 0:t.image)&&f.createElement(K,{className:"w-1/2 h-1/2 text-mid"})),f.createElement("div",{className:"flex-grow rounded-r-md pl-4 pr-4 max-h-24 flex flex-col py-1.5"},f.createElement("div",{className:"text-base text-primary line-clamp-1"},null!=(r=null==t?void 0:t.title)?r:"No title"),f.createElement("div",{className:"text-13 text-secondary pt-0.5 line-clamp-2",dangerouslySetInnerHTML:{__html:null!=(a=null==t?void 0:t.description)?a:"No description"}}),f.createElement("div",{className:"mt-auto text-11 text-tertiary flex items-center"},(!t||(null==t?void 0:t.logo))&&f.createElement("div",{className:"h-4 w-4 mr-2 dark:bg-gray-725 bg-contain bg-center",style:(null==t?void 0:t.logo)?{backgroundImage:`url(${null==t?void 0:t.logo})`}:{}}),l)))}var Ns=g.exports.memo((function({post:e,isPostPage:t=!1,showServerName:n=!1,className:r="",index:a}){var l,s,o,i,c,m,d,u,p,v;const{push:h}=I(),E=bl(e),[{opacity:x},y]=Z({type:Ba,item:e,collect:e=>({opacity:e.isDragging()?.4:1})}),N=X().getMonitor().isDragging(),[k,C]=g.exports.useState(!1);g.exports.useEffect((()=>{if(!N){const e=setTimeout((()=>C(!1)),300);return()=>clearTimeout(e)}C(!0)}),[N]);const $=g.exports.useMemo((()=>{var t,n;return e.text||!(e.text||e.linkUrl||e.images&&0!==e.images.length)?"Text":e.linkUrl?e.domain:1===(null==(t=e.images)?void 0:t.length)?"Image":(null==(n=e.images)?void 0:n.length)>1?"Image Album":void 0}),[e.domain,e.images,e.linkUrl,e.text]),U=e=>{e.stopPropagation(),e.preventDefault()},[P,S]=g.exports.useState(0),[M]=La(),R=kl();return f.createElement(zl,{data:{type:ul,post:e}},f.createElement("div",{ref:y,style:{opacity:x},className:`${r} cursor-pointer relative group hover:shadow dark:bg-gray-800 dark:hover:bg-gray-825 pt-3 px-3 pb-3 rounded flex`,onClick:()=>{k||h(e.relativeUrl)}},!t&&f.createElement("div",{className:"w-26 h-18 rounded dark:bg-gray-700 mr-3 flex items-center justify-center bg-center bg-cover bg-no-repeat",style:e.thumbnailUrl?{backgroundImage:`url(${e.thumbnailUrl})`}:{}},!e.thumbnailUrl&&f.createElement(f.Fragment,null,e.linkUrl?f.createElement(K,{className:"w-8 h-8 text-tertiary"}):f.createElement(ee,{className:"w-8 h-8 text-tertiary"}))),f.createElement("div",{className:"pr-3 py-0.5 flex-grow flex flex-col"},f.createElement(b,{to:e.relativeUrl,className:"text-secondary font-medium"},e.title,f.createElement("span",{className:"text-xs text-mid"},"  ",$)),t&&$&&f.createElement("div",{className:"border-b dark:border-gray-750 mt-0.5 pb-2"},!!e.text&&f.createElement("div",{dangerouslySetInnerHTML:{__html:e.text},className:"prose prose-sm dark:prose-dark max-w-none pt-0.5"}),!!e.linkUrl&&f.createElement(f.Fragment,null,e.linkMetadata?f.createElement("div",{className:"max-w-screen-md w-full mt-2"},f.createElement(ws,{linkUrl:e.linkUrl,metadata:e.linkMetadata})):f.createElement("a",{href:e.linkUrl,target:"_blank",rel:"noopener nofollow noreferrer",className:"text-sm text-blue-400 hover:underline cursor-pointer pt-0.5"},e.linkUrl)),(null==(l=e.images)?void 0:l.length)>=1&&f.createElement("div",{className:"max-w-screen-md w-full mt-2"},f.createElement("div",{className:"flex relative"},f.createElement("div",{className:"aspect-h-9 aspect-w-16 relative flex w-full dark:bg-gray-775"},e.images.map(((e,t)=>f.createElement("img",{key:t,alt:"",src:e.url,className:"w-full h-full object-contain select-none "+(t===P?"block":"hidden")})))),e.images.length>1&&f.createElement(f.Fragment,null,P>0&&f.createElement("div",{onClick:()=>S(P-1),className:"absolute left-3 top-1/2 transform -translate-y-1/2 rounded-full shadow flex items-center justify-center w-10 h-10 dark:bg-white"},f.createElement(te,{className:"w-5 h-5 dark:text-black"})),P<e.images.length-1&&f.createElement("div",{onClick:()=>S(P+1),className:"absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full shadow flex items-center justify-center w-10 h-10 dark:bg-white"},f.createElement(w,{className:"w-5 h-5 dark:text-black"})))),f.createElement("div",{className:"h-12 dark:bg-gray-750 flex items-center px-5 text-13 select-none"},e.images[P].caption&&f.createElement("div",{className:"text-primary truncate pr-3",title:e.images[P].caption},e.images[P].caption),e.images[P].linkUrl&&f.createElement("a",{href:e.images[P].linkUrl,target:"_blank",rel:"noopener nofollow noreferrer",className:"ml-auto text-blue-400 hover:underline cursor-pointer"},e.images[P].linkUrl)))),f.createElement("div",{className:"flex items-center pt-2 mt-auto"},f.createElement("div",{className:"flex items-center",onClick:U},f.createElement(zl,{data:{type:dl,user:null==(s=e.author)?void 0:s.user}},f.createElement(as,{user:null==(o=e.author)?void 0:o.user,roles:null==(i=e.author)?void 0:i.roles},f.createElement(ts,{user:e.author.user,size:5}))),f.createElement(zl,{data:{type:dl,user:null==(c=e.author)?void 0:c.user}},f.createElement(as,{user:null==(m=e.author)?void 0:m.user,roles:null==(d=e.author)?void 0:d.roles},f.createElement("div",{className:"ml-2 hover:underline cursor-pointer text-tertiary text-xs font-medium leading-none",style:{color:null==(u=e.author)?void 0:u.color}},null!=(v=null==(p=e.author)?void 0:p.user.username)?v:"[deleted]"))),n&&f.createElement("div",{className:"ml-1 flex items-center",onClick:U},f.createElement(ne,{className:"w-4.5 h-4.5 text-mid mr-1"}),f.createElement(b,{to:`/+${e.server.name}`,className:"flex items-center"},f.createElement(ns,{server:e.server,size:5,className:"dark:bg-gray-750 rounded-full"}),f.createElement("span",{className:"ml-2 text-xs font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"},e.server.name))),f.createElement("div",{className:"text-xs text-mid font-medium"},"  ·  ",f.createElement(F,{content:ls(e.createdAt)},f.createElement("span",null,(A=e.createdAt,G(A).twitter()))))),f.createElement("div",{className:"flex items-center ml-auto"},f.createElement("div",{className:"text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center cursor-pointer"},f.createElement(re,{className:"w-5 h-5"}),f.createElement("div",{className:"ml-2 text-xs font-medium"},e.commentCount)),f.createElement("div",{onClick:e=>{e.preventDefault(),e.stopPropagation(),M?E():R()},className:(e.isVoted?"text-red-400":"text-gray-500 hover:text-gray-700 dark:hover:text-gray-300")+" flex items-center cursor-pointer ml-6"},f.createElement(ae,{className:"w-4 h-4"}),f.createElement("div",{className:"ml-2 text-xs font-medium"},e.voteCount)),f.createElement(zl,{data:{type:ul,post:e},leftClick:!0},f.createElement("div",{className:"ml-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center cursor-pointer"},f.createElement(le,{className:"text-disabled w-4 h-4"}))))))));var A}));function ks({folderId:e,serverId:t,showServerName:n,header:r}){const a=g.exports.useRef(null),[l,s,o,i]=Jl({folderId:e,serverId:t}),c=g.exports.useCallback(((e,t)=>{const r=e[t];return r?f.createElement("div",{className:"px-4 pb-1.5"},f.createElement(Ns,{post:r,showServerName:n,index:t})):f.createElement("div",{style:{height:"1px"}})}),[n]);return f.createElement(f.Fragment,null,f.createElement(se,{className:"scrollbar-custom dark:bg-gray-750",components:{Header:r?()=>r:null,Footer:()=>i?f.createElement("div",{className:"flex items-center justify-center h-20"},f.createElement(Qa,null)):f.createElement(Ta,null)},endReached:()=>{!s&&i&&o()},itemContent:e=>c(l,e),overscan:100,ref:a,style:{overflowX:"hidden"},totalCount:(null==l?void 0:l.length)||0}))}const Cs=e=>{const t=Ha((e=>e.setHomePage));g.exports.useEffect((()=>t(e)))};function $s({children:e,header:t,rightSidebar:n,leftSidebar:r}){return f.createElement("div",{className:"flex flex-col flex-grow"},t,f.createElement("div",{className:"flex h-full",style:{maxHeight:t?"calc(100% - 3rem)":"100%"}},r,f.createElement("div",{className:"flex flex-col flex-grow"},e),n))}const Us=oe.create({name:"spoiler",inclusive:!1,defaultOptions:{HTMLAttributes:{"data-spoiler":""}},addAttributes:()=>({"data-spoiler":{default:""}}),parseHTML:()=>[{tag:"span[data-spoiler]"}],renderHTML({HTMLAttributes:e}){return["span",ie(this.options.HTMLAttributes,e),0]},addCommands:()=>({setSpoiler:e=>({commands:t})=>t.setMark("spoiler",e),toggleSpoiler:e=>({commands:t})=>t.toggleMark("spoiler",e),unsetSpoiler:()=>({commands:e})=>e.unsetMark("spoiler")})});function Is({text:e,setText:t}){var n;const r=ce({extensions:[me.configure({heading:{levels:[2,3]}}),de,ue,Us],content:e,editorProps:{attributes:{class:"prose prose-sm dark:prose-dark focus:outline-none max-w-none min-h-[7.5rem] p-4"}}}),a=null!=(n=null==r?void 0:r.getHTML())?n:"";return g.exports.useEffect((()=>{t("<p></p>"===a?"":a)}),[r,a,t]),f.createElement("div",{className:"dark:bg-gray-750 rounded"},f.createElement(Rs,{editor:r}),f.createElement(pe,{editor:r}))}const Ps=e=>y(`\n  p-1\n  rounded\n  dark:hover:bg-gray-600\n  cursor-pointer\n  ${e?"dark:bg-gray-600 dark:text-gray-300":"text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}\n`);function Ss({label:e,icon:t,small:n,onClick:r,active:a}){const l=t;return f.createElement(F,{content:e},f.createElement("div",{className:"h-9 flex items-center",onClick:r},f.createElement("div",{className:Ps(a)},f.createElement(l,{className:""+(n?"w-4 h-4 mt-0.5":"w-5 h-5")}))))}const Fs=y("\n  flex\n  items-center\n  px-2\n  h-full\n  space-x-0.5\n");function Ms({children:e}){return f.createElement("div",{className:Fs},e)}function Rs({editor:e}){return e?f.createElement("div",{className:"min-h-[2.25rem] border-b dark:border-gray-700 flex flex-wrap items-center divide-x dark:divide-gray-700"},f.createElement(Ms,null,f.createElement(Ss,{label:"Bold (Ctrl+B)",icon:ge,onClick:()=>e.chain().focus().toggleBold().run(),active:e.isActive("bold")}),f.createElement(Ss,{label:"Italic (Ctrl+U)",icon:ve,onClick:()=>e.chain().focus().toggleItalic().run(),active:e.isActive("italic")}),f.createElement(Ss,{label:"Underline (Ctrl+I)",icon:he,onClick:()=>e.chain().focus().toggleUnderline().run(),active:e.isActive("underline")}),f.createElement(Ss,{label:"Strikethrough",icon:fe,onClick:()=>e.chain().focus().toggleStrike().run(),active:e.isActive("strike")})),f.createElement(Ms,null,f.createElement(Ss,{label:"Spoiler",icon:be,onClick:()=>e.chain().focus().toggleSpoiler().run(),active:e.isActive("spoiler")}),f.createElement(Ss,{label:"Inline Code",icon:Ee,onClick:()=>e.chain().focus().toggleCode().run(),active:e.isActive("code")})),f.createElement(Ms,null,f.createElement(Ss,{label:"Link",icon:xe,onClick:()=>{const t=window.prompt("URL");e.chain().focus().setLink({href:t}).run()},active:e.isActive("link")}),e.isActive("link")&&f.createElement(Ss,{label:"Remove Link",icon:ye,onClick:()=>{e.chain().focus().unsetLink().run()}}),f.createElement(Ss,{label:"Divider",icon:we,onClick:()=>e.chain().focus().setHorizontalRule().run()})),f.createElement(Ms,null,f.createElement(Ss,{label:"Bulleted List",icon:Ne,onClick:()=>e.chain().focus().toggleBulletList().run(),active:e.isActive("bulletList")}),f.createElement(Ss,{label:"Numbered List",icon:ke,onClick:()=>e.chain().focus().toggleOrderedList().run(),active:e.isActive("orderedList")})),f.createElement(Ms,null,f.createElement(Ss,{label:"Large Heading (Ctrl+[)",icon:Ce,onClick:()=>e.chain().focus().toggleHeading({level:2}).run(),active:e.isActive("heading",{level:2})}),f.createElement(Ss,{label:"Small Heading (Ctrl+])",icon:Ce,small:!0,onClick:()=>e.chain().focus().toggleHeading({level:3}).run(),active:e.isActive("heading",{level:3})})),f.createElement(Ms,null,f.createElement(Ss,{label:"Block Quote",icon:$e,onClick:()=>e.chain().focus().toggleBlockquote().run(),active:e.isActive("blockquote")}),f.createElement(Ss,{label:"Code Block",icon:Ue,onClick:()=>e.chain().focus().toggleCodeBlock().run(),active:e.isActive("codeBlock")})),f.createElement(Ms,null,f.createElement(Ss,{label:"Emoji",icon:Ie}))):null}const As=y("\n  relative\n  w-full\n  h-12\n  flex\n  items-center\n  pl-5\n  pr-10\n  text-left\n  bg-white\n  dark:bg-gray-800\n  dark:hover:bg-gray-775\n  cursor-pointer\n  focus:outline-none\n  text-sm\n  rounded-none\n  rounded-tl-xl\n"),Os=y("\n  scrollbar-dark\n  absolute\n  w-full\n  py-1\n  mt-1\n  overflow-auto\n  text-sm\n  text-primary\n  bg-white\n  dark:bg-gray-775\n  rounded-md\n  shadow-lg\n  max-h-60\n  focus:outline-none\n  space-y-0.5\n");function Ds({servers:e=[],server:t,setServer:n}){return f.createElement("div",{className:"col-span-1 z-10"},f.createElement(Pe,{value:t,onChange:n},(({open:n})=>f.createElement(f.Fragment,null,f.createElement("div",{className:"relative"},f.createElement(Pe.Button,{className:As},t?f.createElement(f.Fragment,null,f.createElement(ns,{server:t,className:"dark:bg-gray-750 rounded-full",size:7}),f.createElement("span",{className:"block truncate pl-2"},t.name)):f.createElement("span",{className:"block truncate text-red-400"},"Select a planet"),f.createElement("span",{className:"absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none"},f.createElement(Se,{className:"w-5 h-5 text-gray-400","aria-hidden":"true"}))),f.createElement(R,{show:n,as:g.exports.Fragment,leave:"transition ease-in duration-100",leaveFrom:"opacity-100",leaveTo:"opacity-0"},f.createElement(Pe.Options,{static:!0,className:Os},e.map((e=>f.createElement(Pe.Option,{key:e.id,className:({active:e})=>(e=>y(`\n  ${e?"dark:bg-gray-750":""}\n  cursor-pointer\n  select-none\n  relative\n  focus:outline-none\n`))(e),value:e},(({selected:t})=>f.createElement("div",{className:"flex items-center h-10 pl-5 pr-4 "+(t?"dark:bg-gray-750":"")},f.createElement(ns,{server:e,size:7,className:"dark:bg-gray-725 rounded-full"}),f.createElement("span",{className:(t?"font-semibold":"font-normal")+" block truncate pl-2"},e.name)))))))))))))}const Ls=(e,t)=>{const n=g.exports.useRef(e);g.exports.useEffect((()=>{n.current=e}),null!=t?t:[e]);return g.exports.useCallback(((...e)=>{var t;null==(t=n.current)||t.call(n,...e)}),[])};var Ts=g.exports.forwardRef((({onChange:e,onInput:t,onBlur:n,onKeyPress:r,onKeyDown:a,onPaste:l,...s},o)=>{const i=Ls(e),c=Ls(t),m=Ls(n),d=Ls(r),u=Ls(a),p=Ls(l);return f.createElement(Fe,{...s,ref:o,onChange:i,onInput:c,onBlur:m,onKeyPress:d,onKeyDown:u,onPaste:p})}));const qs=y("\n  block\n  text-11\n  pb-1.5\n  font-semibold\n  tracking-widest\n  uppercase\n  text-tertiary\n"),zs=y("\n  text-base\n  text-primary\n  disabled:opacity-50\n  bg-green-600\n  rounded\n  px-5\n  h-9\n  flex\n  items-center\n  disabled:cursor-not-allowed\n  focus:outline-none\n  select-none\n"),Hs=y("\n  text-base\n  text-tertiary\n  focus:outline-none\n  px-2\n  h-9\n  flex\n  items-center\n  select-none\n"),Bs=e=>y(`\n  px-5\n  h-12\n  border-b-2\n  dark:hover:bg-gray-775\n  ${e?"dark:border-gray-100 text-primary dark:bg-gray-775":"border-transparent text-tertiary"}\n  flex\n  items-center\n  justify-center\n  select-none\n  cursor-pointer\n  text-sm\n  last:rounded-tr-xl\n`),js=y("\n  px-4\n  h-10\n  placeholder-tertiary\n  dark:bg-gray-750\n  rounded\n  text-sm\n  text-primary\n  w-full\n  focus:outline-none\n"),_s="Text",Vs="Link",Gs="Image";function Ys({open:e,setOpen:r,serverId:a}){var l,s,o,i,c,m,d,u,p,v;const[h,b]=g.exports.useState(""),[E,{loading:x}]=function(e){const t={...In,...e};return n(Ar,t)}(),{t:y}=k(),{push:w}=I(),[N]=La(),C=(null!=(l=null==N?void 0:N.servers)?l:[]).filter((e=>e.permissions.includes(Kn.CreatePost))),[$,U]=g.exports.useState(a?null==C?void 0:C.find((e=>e.id===a)):null),[P,S]=g.exports.useState(_s),{register:F,handleSubmit:R,reset:A,formState:O,watch:D,setValue:L,trigger:T}=Me({mode:"onChange"}),q=D("linkUrl"),[z,H]=g.exports.useState("");Re((()=>{H(q)}),500,[q]);const B=D("title"),{data:j,loading:_}=function(e){const n={...In,...e};return t(ba,n)}({variables:{linkUrl:z},skip:!z||!Ae(z)}),V=null==j?void 0:j.getLinkMeta,[G,Y]=g.exports.useState([]);function W(e){return new Promise((function(t,n){let r=new FileReader;r.onload=function(){t(r.result)},r.onerror=function(){n(r)},r.readAsDataURL(e)}))}const[Q,J]=g.exports.useState(0),K=()=>{r(!1),setTimeout((()=>{J(0),Y([]),S(_s),A()}),300)};return f.createElement(jl,{isOpen:e,close:K},f.createElement("form",{onSubmit:R((({title:e,linkUrl:t})=>{E({variables:{input:{title:e,text:h&&P===_s?h:null,linkUrl:t&&P===Vs?t:null,serverId:$.id,images:G&&G.length>0&&P===Gs?G.map((({file:e,caption:t,linkUrl:n})=>({file:e,caption:t,linkUrl:n}))):null}}}).then((({data:e})=>{const t=null==e?void 0:e.createPost;t&&(r(!1),A(),w(t.relativeUrl))}))})),className:"max-w-screen-md w-full dark:bg-gray-800 text-left rounded-xl"},f.createElement("div",{className:"grid grid-cols-4"},f.createElement(Ds,{servers:C,server:$,setServer:U}),f.createElement("div",{className:Bs(P===_s),onClick:()=>{S(_s),L("linkUrl",""),Y([])}},f.createElement(ee,{className:"mr-2 w-5 h-5"}),"Text"),f.createElement("div",{className:Bs(P===Vs),onClick:()=>{S(Vs),b(""),Y([])}},f.createElement(Oe,{className:"mr-2 w-5 h-5"}),"Link"),f.createElement("div",{className:Bs(P===Gs),onClick:()=>{S(Gs),L("linkUrl",""),T("linkUrl"),b("")}},f.createElement(De,{className:"mr-2 w-5 h-5"}),"Images")),f.createElement("div",{className:"p-5"},f.createElement("div",{className:"relative"},f.createElement("label",{htmlFor:"title",className:qs},"Title",(null==B?void 0:B.length)>0&&` (${null==B?void 0:B.length}/300)`),f.createElement("input",{maxLength:300,className:js,...F("title",{required:!0}),id:"title"})),P===_s&&f.createElement("div",{className:"pt-5"},f.createElement(Is,{text:h,setText:b})),P===Vs&&f.createElement(f.Fragment,null,f.createElement("div",{className:"pb-5 pt-1.5"},(null==V?void 0:V.title)&&B!==(null==V?void 0:V.title)&&f.createElement("span",{className:"text-xs text-blue-500 hover:underline cursor-pointer line-clamp-1",onClick:()=>{L("title",null==V?void 0:V.title),T("title")}},null==V?void 0:V.title)),f.createElement("label",{htmlFor:"linkUrl",className:"block text-11 pb-1.5 font-semibold tracking-widest uppercase text-tertiary"},"Link URL"),f.createElement("div",{className:"relative h-10"},f.createElement(Oe,{className:"top-1/2 left-2.5 transform -translate-y-1/2 absolute w-5 h-5 text-mid"}),f.createElement("input",{maxLength:2e3,className:"px-10 h-10 dark:bg-gray-750 rounded text-sm text-primary w-full focus:outline-none",...F("linkUrl",{validate:e=>!e||Ae(e)}),id:"linkUrl"}),_&&f.createElement("div",{className:"top-1/2 right-2.5 transform -translate-y-1/2 absolute"},f.createElement(Qa,null))),q&&!Ae(q)&&f.createElement("div",{className:"text-13 text-red-400 pt-1"},"Must be a valid URL"),z&&Ae(z)&&(V||bs(z))&&f.createElement("div",{className:"mt-5"},f.createElement(ws,{linkUrl:z,metadata:V}))),P===Gs&&f.createElement("div",{className:"mt-5"},G&&G.length>0?f.createElement("div",null,f.createElement("div",{className:"flex"},f.createElement("div",{className:"flex scrollbar-custom items-center space-x-3 overflow-x-auto border dark:border-gray-700 rounded-md h-31 px-3 max-w-full w-full"},G.map(((e,t)=>f.createElement("div",{key:t,onClick:()=>J(t),className:"cursor-pointer group relative rounded border "+(Q===t?"dark:border-gray-500":"dark:border-transparent")},f.createElement("div",{className:"max-w-25 max-h-25 min-w-[6.25rem] min-h-[6.25rem] transform "+(Q===t?"scale-85":"")},f.createElement("div",{className:"absolute top-1 right-1 rounded-full bg-black p-0.5 hidden group-hover:block z-10",onClick:()=>{Q>=t&&Q>0&&setImmediate((()=>J(Q-1)));const e=G.slice();e.splice(t,1),Y(e)}},f.createElement(Le,{className:"w-4.5 h-4.5 text-white"})),f.createElement("div",{className:"absolute inset-0 bg-black rounded bg-opacity-0 group-hover:bg-opacity-50"}),f.createElement("div",{style:{backgroundImage:`url(${e.data})`},className:"max-w-25 max-h-25 min-w-[6.25rem] min-h-[6.25rem] bg-cover bg-center select-none rounded"}))))),f.createElement("div",{className:"w-25 h-25 rounded relative flex items-center justify-center border dark:border-gray-700 border-dashed cursor-pointer transition dark:hover:bg-gray-775"},f.createElement("input",{type:"file",id:"file",accept:"image/png,image/jpeg,image/webp,image/gif",hidden:!0,multiple:!0,onChange:e=>{const t=e.target.files;if(t&&t.length>0){Y([...G,...Array.from(t).map((e=>({file:e,caption:"",linkUrl:""})))]);let e=[];for(let n=0;n<t.length;n++)e.push(W(t[n]));Promise.all(e).then((e=>{Y([...G,...e.map(((e,n)=>({file:t[n],caption:"",linkUrl:"",data:e})))])}))}}}),f.createElement("label",{htmlFor:"file",className:"absolute inset-0 block cursor-pointer"}),f.createElement(M,{className:"w-1/2 h-1/2 text-tertiary"})))),G&&(null==G?void 0:G.length)>0&&f.createElement("div",{className:"mt-5 flex space-x-5"},f.createElement("div",{className:"w-81 h-81 bg-contain bg-center bg-no-repeat dark:bg-gray-775 flex-shrink-0",style:{backgroundImage:`url(${null==(s=G[Q])?void 0:s.data})`}}),f.createElement("div",{className:"space-y-5 max-w-full flex-grow"},f.createElement("div",null,f.createElement("label",{htmlFor:"caption",className:qs},"Caption",(null==(i=null==(o=G[Q])?void 0:o.caption)?void 0:i.length)>0&&` (${null==(m=null==(c=G[Q])?void 0:c.caption)?void 0:m.length}/180)`),f.createElement(Ts,{id:"caption",className:"px-4 py-2.5 min-h-[2.5rem] dark:bg-gray-750 rounded text-sm text-primary focus:outline-none break-word",html:(null==(d=G[Q])?void 0:d.caption)||"",onChange:e=>{var t,n;if((null==(n=null==(t=G[Q])?void 0:t.caption)?void 0:n.length)>=180)return;const r=G.slice();let a=e.target.value;a.length>180&&(a=a.substring(0,181)),r[Q].caption=a,Y(r)}})),f.createElement("div",null,f.createElement("label",{htmlFor:"link",className:qs},"Link"),f.createElement("input",{id:"link",className:js,value:(null==(u=G[Q])?void 0:u.linkUrl)||"",onChange:e=>{const t=G.slice();t[Q].linkUrl=e.target.value,Y(t)}}),(null==(p=G[Q])?void 0:p.linkUrl)&&!Ae(null==(v=G[Q])?void 0:v.linkUrl)&&f.createElement("div",{className:"text-13 text-red-400 pt-1"},"Must be a valid URL"))))):f.createElement("div",{className:"relative"},f.createElement("input",{type:"file",id:"files",accept:"image/png,image/jpeg,image/webp,image/gif",hidden:!0,multiple:!0,onChange:e=>{const t=e.target.files;if(t&&t.length>0){Y(Array.from(t).map((e=>({file:e,caption:"",linkUrl:""}))));let e=[];for(let n=0;n<t.length;n++)e.push(W(t[n]));Promise.all(e).then((e=>Y(e.map(((e,n)=>({file:t[n],caption:"",linkUrl:"",data:e}))))))}}}),f.createElement("label",{htmlFor:"files",className:"select-none cursor-pointer flex items-center justify-center text-base text-tertiary h-30 border border-dashed dark:border-gray-700 rounded-md transition dark:hover:bg-gray-775"},"Drag 'n' drop some images here, or click to select images"))),f.createElement("div",{className:"flex items-center pt-5"},f.createElement("div",{className:"ml-auto flex items-center space-x-3"},f.createElement("button",{type:"button",className:Hs,onClick:()=>K()},y("post.create.cancel")),f.createElement("button",{type:"submit",className:zs,disabled:!O.isValid||!$||x},y("post.create.submit"),x&&f.createElement(Qa,{className:"w-5 h-5 text-primary ml-3"})))))))}function Ws({server:e}){const{t:t}=k(),[n,r]=g.exports.useState(!1),[a]=La();return f.createElement(f.Fragment,null,f.createElement(Ys,{open:n,setOpen:r,serverId:null==e?void 0:e.id}),f.createElement("div",{className:"p-4"},f.createElement("div",{onClick:()=>r(!0),className:"dark:bg-gray-700 h-13 flex items-center rounded transition dark:hover:bg-gray-650 cursor-pointer"},f.createElement("div",{className:"px-3 border-r dark:border-gray-650 h-7"},f.createElement(ts,{user:a,size:7})),f.createElement("div",{className:"text-sm text-secondary px-3"},t("post.createPost")))))}const Qs=({onClick:e,title:t,body:n,icon:r,timestamp:a})=>{if("granted"!==Notification.permission)return;new Notification(t,{body:n,icon:r,timestamp:a,silent:!0}).onclick=e;const l=new Audio((window.electron?".":"")+"/notification.mp3");l.volume=.5,l.play()},Js=y("\n  cursor-pointer\n  hover:underline\n");function Ks(){return f.createElement(za,{right:!0},f.createElement("div",{className:"px-2.5 py-2.5"},f.createElement("div",{className:"dark:border-gray-750 border rounded p-2.5 text-xs text-tertiary space-x-3 leading-5"},f.createElement(b,{to:"/about",target:"_blank",className:Js},"Terms"),f.createElement(b,{to:"/about",target:"_blank",className:Js},"Privacy Policy"),f.createElement(b,{to:"/about",target:"_blank",className:Js},"Content Policy"),f.createElement("a",{href:"https://github.com/joincomet/comet",target:"_blank",rel:"noopener noreferrer",className:Js},"GitHub"),f.createElement("a",{href:"https://discord.gg/NPCMGSm",target:"_blank",rel:"noopener noreferrer",className:Js},"Discord"))))}function Zs(){k(),Ha((e=>e.showFolders));const[e]=La(),t=g.exports.useRef(null);return Cs(null),g.exports.useEffect((()=>{"default"===Notification.permission&&Notification.requestPermission().then((function(e){"granted"===e&&Qs({title:"Notifications enabled!",icon:"/icons/icon.png"})}))})),f.createElement(f.Fragment,null,f.createElement(Te,null,f.createElement("title",null,"Home – Comet")),f.createElement($s,{header:f.createElement(Wl,{refreshPosts:()=>{t&&t.current&&t.current.refresh()}}),rightSidebar:f.createElement(Ks,null)},f.createElement(ks,{showServerName:!0,header:e?f.createElement(Ws,null):null})))}function Xs({friend:e,children:t}){const{t:n}=k(),{push:r}=I();return f.createElement("div",{className:"group px-2 dark:hover:bg-gray-725 rounded-lg"},f.createElement("div",{onClick:()=>r(`/dm/@${e.username}`),className:"relative h-16 py-2 flex items-center cursor-pointer group border-t dark:border-gray-700"},f.createElement("div",{className:"flex"},f.createElement(ts,{user:e,size:9,showOnline:!0,dotClassName:"w-2.5 h-2.5 ring-3 dark:ring-gray-750"}),f.createElement("div",null,f.createElement("div",{className:"text-base text-secondary font-medium ml-3"},e.username),f.createElement("div",{className:"text-13 text-tertiary font-medium ml-3 leading-5"},e.isOnline?n("user.online"):n("user.offline")))),f.createElement("div",{className:"ml-auto flex items-center space-x-3"},t)))}const eo=y("\n  rounded-full\n  dark:bg-gray-800\n  dark:group-hover:bg-gray-900\n  h-9 w-9\n  flex\n  items-center\n  justify-center\n  text-tertiary\n");function to({children:e,label:t,onClick:n}){const{t:r}=k();return f.createElement(F,{content:r(t)},f.createElement("div",{onClick:n,className:eo},e))}function no({friend:e}){const{t:t}=k();return f.createElement(Xs,{friend:e},f.createElement(to,{label:"friends.sendMessage"},f.createElement(re,{className:"w-5 h-5"})),f.createElement(F,{content:t("more")},f.createElement("button",{onClick:e=>{e.stopPropagation(),e.preventDefault()},className:eo},f.createElement(le,{className:"w-5 h-5"}))))}function ro({count:e}){return f.createElement("div",{className:"text-green-400"},e)}function ao({pendingCount:e=0}){return f.createElement(Gl,{icon:f.createElement(qe,{className:"h-5 w-5"}),title:"Friends",showDivider:!0},f.createElement("div",{className:"flex items-center space-x-4"},f.createElement(lo,{page:"Online"}),f.createElement(lo,{page:"All"}),f.createElement(lo,{page:"Pending",pendingCount:e}),f.createElement(lo,{page:"Blocked"}),f.createElement(lo,{page:"Add Friend",green:!0})))}function lo({page:e,green:t=!1,pendingCount:n=0}){const[r,a]=Ha((e=>[e.friendsPage,e.setFriendsPage]));return f.createElement(Yl,{page:e,green:t,currentPage:r,setCurrentPage:a},e,!!n&&f.createElement("div",{className:"ml-2"},f.createElement(ro,{count:n})))}function so({user:e}){const[t]=jr(),[n]=Vr();return f.createElement(zl,{data:{type:dl,user:e}},f.createElement(Xs,{friend:e},e.relationshipStatus===Yn.FriendRequestOutgoing?f.createElement(to,{label:"Cancel",onClick:n=>{n.stopPropagation(),t({variables:{input:{userId:e.id}}})}},f.createElement(Le,{className:"w-5 h-5"})):f.createElement(f.Fragment,null,f.createElement(to,{label:"Accept",onClick:t=>{t.stopPropagation(),n({variables:{input:{userId:e.id,accept:!0}}})}},f.createElement(ze,{className:"w-5 h-5"})),f.createElement(to,{label:"Ignore",onClick:t=>{t.stopPropagation(),n({variables:{input:{userId:e.id,accept:!1}}})}},f.createElement(Le,{className:"w-5 h-5"})))))}function oo({children:e}){return f.createElement("div",{className:"max-h-full h-full dark:bg-gray-750 px-6 py-4 scrollbar-custom"},e)}const io=y("\n  px-2\n  pb-2\n  text-11\n  text-tertiary\n  uppercase\n  tracking-wide\n  font-semibold\n  select-none\n");function co(){const{friends:e,outgoingFriendRequests:t,incomingFriendRequests:n,blocking:r}=(()=>{var e,t,n,r,a;const[l]=La();return{friends:null!=(e=null==l?void 0:l.relatedUsers.filter((e=>e.relationshipStatus===Yn.Friends)))?e:[],blocking:null!=(t=null==l?void 0:l.relatedUsers.filter((e=>e.relationshipStatus===Yn.Blocking)))?t:[],blockedBy:null!=(n=null==l?void 0:l.relatedUsers.filter((e=>e.relationshipStatus===Yn.Blocked)))?n:[],outgoingFriendRequests:null!=(r=null==l?void 0:l.relatedUsers.filter((e=>e.relationshipStatus===Yn.FriendRequestOutgoing)))?r:[],incomingFriendRequests:null!=(a=null==l?void 0:l.relatedUsers.filter((e=>e.relationshipStatus===Yn.FriendRequestIncoming)))?a:[]}})(),a=e.filter((e=>e.isOnline)),l=t.concat(n),s=Ha((e=>e.friendsPage)),[o,i]=g.exports.useState("");return Cs("friends"),f.createElement($s,{header:f.createElement(ao,{pendingCount:n.length})},f.createElement(Te,null,f.createElement("title",null,"Friends – Comet")),f.createElement(oo,null,"Online"===s&&f.createElement(f.Fragment,null,f.createElement("div",{className:io},"Online - ",a.length),a.map((e=>f.createElement(no,{friend:e,key:e.id})))),"All"===s&&f.createElement(f.Fragment,null,f.createElement("div",{className:io},"All Friends - ",e.length),e.map((e=>f.createElement(no,{friend:e,key:e.id})))),"Pending"===s&&f.createElement(f.Fragment,null,f.createElement("div",{className:io},"Pending Requests - ",l.length),l.map((e=>f.createElement(so,{user:e,key:`${e.relationshipStatus===Yn.FriendRequestOutgoing?"outgoing":"incoming"}-${e.id}`})))),"Blocked"===s&&f.createElement(f.Fragment,null,f.createElement("div",{className:io},"Blocked Users - ",r.length)),"Add Friend"===s&&f.createElement("div",null,f.createElement("div",{className:"font-bold uppercase text-base text-primary"},"Add Friend"),f.createElement("div",{className:"text-secondary text-sm mt-3 mb-4"},"You can add a friend with their Comet Tag. It's cAsE sEnSitIvE!"),f.createElement("div",{className:"relative"},f.createElement("input",{value:o,onChange:e=>i(e.target.value),placeholder:"Enter a Username#0000",className:"w-full h-14 rounded-xl px-4 dark:bg-gray-775 border dark:border-gray-850 placeholder-gray-400 dark:placeholder-gray-600 block focus:outline-none text-base text-secondary"}),f.createElement("button",{className:"absolute right-4 text-13 text-primary font-medium bg-blue-500 rounded h-8 px-4 top-1/2 transform -translate-y-1/2 disabled:opacity-50",disabled:!o},"Send Friend Request")))))}const mo=e=>{if(!e)return He;switch(e){case"Featured":return et;case"Arts":return Xe;case"Business":return Ze;case"Culture":return qe;case"Discussion":return re;case"Entertainment":return Ke;case"Gaming":return Je;case"Health":return Qe;case"Hobbies":return We;case"Lifestyle":return Ye;case"Memes":return Ie;case"Meta":return Ge;case"News":return Ve;case"Politics":return _e;case"Programming":return Ee;case"Science":return Ga;case"Sports":return je;case"Technology":return Ya;case"Other":return Be}};function uo({className:e}){const[t]=g.exports.useState((new Date).getTime().toString());return f.createElement("svg",{className:e,fill:"currentColor",viewBox:"0 0 30.327 5.0518"},f.createElement("defs",null,f.createElement("linearGradient",{id:t,x1:"7.7677",x2:"14.802",y1:"5.3857",y2:"5.3857",gradientTransform:"translate(1.0113e-4,1.6184e-4)",gradientUnits:"userSpaceOnUse"},f.createElement("stop",{stopColor:"#6875f5",offset:"0"}),f.createElement("stop",{stopColor:"#f98080",offset:"1"}))),f.createElement("g",{transform:"translate(-56.423 -63.81)",strokeWidth:".26458"},f.createElement("path",{d:"m61.235 68.093q-0.18344 0.16933-0.50094 0.34572t-0.72672 0.30339q-0.40922 0.11994-0.87489 0.11994-0.5715 0-1.0654-0.17639-0.49389-0.18344-0.86783-0.51506-0.36689-0.33161-0.5715-0.79728-0.20461-0.47272-0.20461-1.0513 0-0.54328 0.21167-1.0019 0.21872-0.45861 0.59972-0.79728t0.87489-0.52211q0.49389-0.1905 1.0442-0.1905 0.45156 0 0.86783 0.127 0.41628 0.11994 0.74083 0.31044 0.33161 0.1905 0.52917 0.39511l-0.47272 0.61383q-0.34572-0.30339-0.76906-0.49389-0.42333-0.19756-0.9525-0.19756-0.35983 0-0.6985 0.11994t-0.61383 0.35278q-0.26811 0.22578-0.43039 0.55033-0.15522 0.32456-0.15522 0.73378 0 0.59267 0.28222 0.99483 0.28222 0.39511 0.74083 0.59972 0.46567 0.19756 0.98778 0.19756 0.381 0 0.68439-0.09878 0.30339-0.10583 0.54328-0.254t0.43039-0.29633z"}),f.createElement("path",{d:"m70.164 63.853 1.9826 2.6317 1.9826-2.6317h0.73378v4.9389h-0.762v-2.0743q0-0.45861 0.01411-0.86783 0.02117-0.40922 0.0635-0.81844l-1.8062 2.3424h-0.46567l-1.8062-2.3354q0.04939 0.40217 0.0635 0.81139t0.01411 0.86783v2.0743h-0.762v-4.9389z"}),f.createElement("path",{d:"m77.106 63.853h3.8241v0.73378h-3.0621v1.3053h2.6741v0.73378h-2.6741v1.4323h3.0621v0.73378h-3.8241z"}),f.createElement("path",{d:"m84.203 68.792v-4.2051h-1.7357v-0.73378h4.2827v0.73378h-1.7851v4.2051z"})),f.createElement("path",{transform:"rotate(32 15.881 -1.0183)",fillRule:"evenodd",d:"m11.03 3.2283a2.4814 2.526 7.3662e-7 0 0-0.30277 0.22149 1.9313 1.966 7.3662e-7 0 1 1.5991 1.936 1.9313 1.966 7.3662e-7 0 1-1.5988 1.9369 2.4814 2.526 7.3662e-7 0 0 1.5929 0.589 2.4814 2.526 7.3662e-7 0 0 2.4814-2.5255 2.4814 2.526 7.3662e-7 0 0-2.4815-2.526 2.4814 2.526 7.3662e-7 0 0-1.2903 0.36814zm-3.2345 2.2039c-0.18296 0.086815 0.49439 0.074836 3.0594 0.9212 0.46608 0.15383 0.88156-0.43345 0.88156-0.96766s-0.41546-1.1208-0.88154-0.96706l-2.9313 0.96698c-0.058262 0.019224-0.10199 0.034146-0.12813 0.046548z",fill:`url(#${t})`}))}function po({category:e}){const{t:t}=k(),[n,r]=Ha((e=>[e.exploreCategory,e.setExploreCategory])),a=mo(e);return f.createElement(Va,{onClick:()=>r(e),active:n===e},f.createElement(a,{className:"w-5 h-5 mr-3"}),t(e?`category.${e}`:"explore.all"))}function go({sort:e,label:t,icon:n}){const[r,a]=Ha((e=>[e.exploreSort,e.setExploreSort])),l=n;return f.createElement(Va,{onClick:()=>a(e),active:r===e},f.createElement(l,{className:"w-5 h-5 mr-3"}),t)}function vo(){const{t:e}=k(),t=g.exports.useMemo((()=>{let e=Object.keys(Qn);const t=e.splice(e.indexOf(Qn.Other),1);return e.push(...t),e}),[]);return f.createElement(za,null,f.createElement("div",{className:"h-12 border-b dark:border-gray-850 shadow flex items-center px-5 text-base font-medium"},f.createElement(uo,{className:"h-4"})),f.createElement("div",{className:"px-1.5"},f.createElement(Bl,null,"Sort"),f.createElement("div",{className:"space-y-0.5"},f.createElement(go,{label:"Most Popular",sort:"Top",icon:L}),f.createElement(go,{label:"Recently Created",sort:"New",icon:T})),f.createElement(Bl,null,e("explore.categories")),f.createElement("div",{className:"space-y-0.5"},f.createElement(po,{category:"Featured"}),f.createElement(po,{category:null}),t.map((e=>f.createElement(po,{key:e,category:e}))))))}function ho({server:e,shadow:t=!1,className:n=""}){var r;const{t:a}=k(),l=mo(e.category);return f.createElement(zl,{data:{type:vl,server:e}},f.createElement(b,{to:`/+${e.name}`,className:`${n} relative relative flex flex-col w-full rounded-lg group dark:bg-gray-800 dark:hover:bg-gray-850 duration-200 transform transition hover:shadow-xl ${t?"shadow-lg":""}`},f.createElement("div",{className:"h-32 rounded-t-lg w-full bg-cover bg-center bg-no-repeat relative bg-gradient-to-br from-red-400 to-indigo-600",style:(null==e?void 0:e.bannerUrl)?{backgroundImage:`url(${null==e?void 0:e.bannerUrl})`}:void 0},f.createElement("div",{className:"absolute left-4 -bottom-3"},f.createElement(ns,{size:10,server:e,className:"dark:bg-gray-750 rounded-xl ring-4 dark:ring-gray-800 transition dark:group-hover:ring-gray-850 group-hover:shadow-md"}))),f.createElement("div",{className:"flex flex-col flex-grow px-4 pt-5 pb-4 h-40"},f.createElement("div",{className:"text-lg font-semibold text-secondary"},null==e?void 0:e.name),f.createElement("div",{className:"text-13 text-tertiary line-clamp-3 pt-1"},(null==e?void 0:e.description)||"No description"),f.createElement("div",{className:"flex mt-auto text-xs"},f.createElement("div",{className:"inline-flex items-center"},f.createElement(tt,{className:"w-4 h-4 text-tertiary"}),f.createElement("div",{className:"ml-2 text-tertiary"},a("server.memberCount",{count:null!=(r=null==e?void 0:e.userCount)?r:0}))),f.createElement("div",{className:"ml-auto inline-flex items-center"},f.createElement(l,{className:"w-4 h-4 text-tertiary"}),f.createElement("div",{className:"ml-2 text-tertiary"},e.category))))))}function fo(){var e;const[t,n]=g.exports.useState(0),[r,a]=Ha((e=>[e.exploreCategory,e.exploreSort])),{data:l}=Na({variables:{sort:a,category:r&&"Featured"!==r?r:null,featured:"Featured"===r,page:t,pageSize:20},fetchPolicy:"no-cache",nextFetchPolicy:"cache-first"}),s=null!=(e=null==l?void 0:l.publicServers)?e:[];return f.createElement($s,{leftSidebar:f.createElement(vo,null)},f.createElement(Te,null,f.createElement("title",null,"Explore Planets – Comet")),f.createElement(oo,null,f.createElement("div",{className:"px-8 py-8"},f.createElement("div",{className:"grid grid-cols-1 gap-4 lg:grid-cols-3 2xl:grid-cols-5"},s.map((e=>f.createElement(ho,{server:e,key:e.id})))),!s.length&&f.createElement(Ta,null,"Nothing here yet!"))))}function bo(){return f.createElement(Gl,{icon:f.createElement(nt,{className:"h-5 w-5"}),title:"Inbox",showDivider:!0},f.createElement("div",{className:"flex items-center space-x-4"},f.createElement(Eo,{page:"Unread"}),f.createElement(Eo,{page:"All"})))}function Eo({page:e}){const[t,n]=Ha((e=>[e.inboxPage,e.setInboxPage]));return f.createElement(Yl,{page:e,currentPage:t,setCurrentPage:n})}function xo({reply:e}){const t=Ha((e=>e.inboxPage)),{comment:r}=e,{parentComment:a,post:l}=r,[s]=La(),[o]=function(e){const t={...In,...e};return n(ta,t)}({optimisticResponse:{markReplyRead:{...e,isRead:!0}},update(e,{data:{markReplyRead:n}}){const r={query:ka,variables:{input:{userId:s.id,unreadOnly:"Unread"===t}}},a=e.readQuery(r);a&&a.replies.map((e=>e.id)).includes(n.id)&&e.writeQuery({...r,data:{replies:a.replies.filter((e=>e.id!==n.id))}})}});return f.createElement(b,{to:`${l.relativeUrl}#${r.id}`,className:"block dark:bg-gray-800 dark:hover:bg-gray-825 rounded p-3 cursor-pointer relative"},f.createElement("div",{className:"flex"},f.createElement("div",{className:"text-13 hover:underline font-medium text-tertiary pr-5 leading-5"},l.title),f.createElement("div",{className:"flex items-center ml-auto h-5"},f.createElement("div",{className:"text-mid text-13 font-medium mr-2 leading-5"},l.server.name),f.createElement(ns,{server:l.server,size:5,className:"rounded-full"}))),a?f.createElement("div",null,f.createElement(yo,{comment:a}),f.createElement("div",{className:"ml-7 mt-2 border-t dark:border-gray-750"},f.createElement(yo,{comment:r}))):f.createElement(yo,{comment:r}),f.createElement("div",{className:"flex items-center pt-3 border-t dark:border-gray-750 mt-2"},f.createElement("div",{className:"flex items-center highlightable",onClick:t=>{t.stopPropagation(),t.preventDefault(),o({variables:{input:{replyId:e.id}}})}},f.createElement(ze,{className:"h-5 w-5"}),f.createElement("div",{className:"ml-2 text-xs font-medium"},"Mark Read"))))}function yo({comment:e}){var t,n,r,a,l;return f.createElement("div",{className:"flex space-x-3 pt-3"},f.createElement("div",{onClick:e=>{e.stopPropagation(),e.preventDefault()}},f.createElement(zl,{data:{type:dl,user:e.author.user}},f.createElement(as,{user:e.author.user,roles:e.author.roles},f.createElement(ts,{user:e.author.user,size:7})))),f.createElement("div",null,f.createElement("div",{className:"flex items-end pb-1.5"},f.createElement("div",{onClick:e=>{e.stopPropagation(),e.preventDefault()}},f.createElement(zl,{data:{type:dl,user:e.author}},f.createElement(as,{user:null==(t=e.author)?void 0:t.user,roles:null==(n=e.author)?void 0:n.roles},f.createElement("div",{className:"text-sm font-medium cursor-pointer hover:underline leading-none "+(e.author.color?"":"text-primary"),style:{color:e.author.color}},null!=(l=null==(a=null==(r=e.author)?void 0:r.user)?void 0:a.username)?l:"[deleted]")))),f.createElement("div",{className:"text-11 text-mid font-medium pl-2 leading-none"},ls(e.createdAt))),f.createElement("div",{className:"prose prose-sm dark:prose-dark",dangerouslySetInnerHTML:{__html:e.text}})))}y("\n  absolute\n  cursor-pointer\n  select-none\n  top-32\n  -mt-4\n  hover:shadow-md\n  z-10\n  right-3\n  transition\n  flex\n  items-center\n  px-4\n  h-8\n  rounded-md\n  text-13\n  font-semibold\n  bg-gray-200\n  border-2\n  border-gray-800\n  text-gray-900\n  transform\n  hover:scale-105\n  focus:outline-none\n");const wo="px-2 pb-2 text-11 text-tertiary uppercase tracking-widest font-semibold";function No(){var e;const t=Ha((e=>e.inboxPage));Cs("inbox");const[n]=La(),{data:r}=Ca({variables:{input:{unreadOnly:"Unread"===t}},skip:!n}),a=null!=(e=null==r?void 0:r.replies)?e:[];return f.createElement($s,{header:f.createElement(bo,null)},f.createElement(Te,null,f.createElement("title",null,`(${a.length}) Inbox – Comet`)),f.createElement(oo,null,"Unread"===t&&f.createElement(f.Fragment,null,f.createElement("div",{className:wo},"Unread - ",a.length)),"All"===t&&f.createElement(f.Fragment,null,f.createElement("div",{className:wo},"All - ",a.length)),0===a.length&&f.createElement(Ta,null,"You are all caught up!"),f.createElement("div",{className:"space-y-1.5"},a.map((e=>f.createElement(xo,{reply:e,key:e.id}))))))}function ko({user:e}){var t;return f.createElement(Gl,{icon:f.createElement(rt,{className:"w-5 h-5"}),title:f.createElement(f.Fragment,null,null!=(t=null==e?void 0:e.username)?t:"",f.createElement("div",{className:"w-2.5 h-2.5 ml-3 rounded-full "+((null==e?void 0:e.isOnline)?"bg-green-500":"bg-gray-600")}))})}const Co=["application/vnd.rar","application/x-tar","application/zip","application/x-7z-compressed","application/java-archive","application/x-bzip","application/x-bzip2","application/gzip","application/x-freearc"],$o=["application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/x-abiword","application/rtf","application/vnd.oasis.opendocument.text"],Uo=["application/xhtml+xml","application/xml","text/xml","application/json","application/ld+json","text/css","application/x-csh","text/html","text/javascript","application/x-httpd-php","application/x-sh","application/vnd.mozilla.xul+xml"],Io=["application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.oasis.opendocument.spreadsheet"],Po=["application/vnd.ms-powerpoint","application/vnd.openxmlformats-officedocument.presentationml.presentation","application/vnd.oasis.opendocument.presentation"],So=e=>g.exports.useMemo((()=>e?e.startsWith("audio")?at:e.startsWith("image")?lt:e.startsWith("video")?st:"text/csv"===e?ot:"application/pdf"===e?it:$o.includes(e)?ct:Io.includes(e)?mt:Po.includes(e)?dt:Co.includes(e)?ut:Uo.includes(e)?pt:gt:null),[e]);function Fo({message:e}){const[t,n]=g.exports.useState(!1);return e.image?f.createElement("div",{className:"pt-1"},f.createElement("img",{onClick:()=>n(!0),src:e.image.smallUrl,alt:"",className:"rounded cursor-pointer",width:e.image.smallWidth,height:e.image.smallHeight}),f.createElement(jl,{closeOnOverlayClick:!0,close:()=>n(!1),isOpen:t},f.createElement("div",{className:"mx-auto"},f.createElement("div",{className:"text-left"},f.createElement("img",{onClick:e=>e.stopPropagation(),src:e.image.popupUrl,alt:"",width:e.image.popupWidth,height:e.image.popupHeight}),f.createElement("div",{className:"pt-1"},f.createElement("a",{href:e.image.originalUrl,className:"hover:underline cursor-pointer text-mid font-semibold text-13 focus:outline-none",target:"_blank",rel:"noreferrer noopener",onClick:e=>e.stopPropagation()},"Open original")))))):null}function Mo({user:e,channel:t,group:n}){return f.createElement("div",{className:"px-4 py-5.5 flex items-end"},f.createElement("div",null,!!e&&f.createElement(f.Fragment,null,f.createElement(ts,{user:e,size:20}),f.createElement("div",{className:"text-3xl font-semibold pt-4 text-primary"},e.name),f.createElement("div",{className:"pt-2 text-tertiary select-none text-base"},"This is the beginning of your direct message history with"," ",f.createElement("span",{className:"font-semibold"},"@",e.name))),!!t&&f.createElement(f.Fragment,null,f.createElement("div",{className:"rounded-full flex items-center justify-center w-20 h-20 dark:bg-gray-700"},f.createElement(Ja,{className:"w-2/3 h-2/3 text-primary"})),f.createElement("div",{className:"text-3xl font-semibold pt-4 text-primary"},"Welcome to #",t.name,"!"),f.createElement("div",{className:"pt-2 text-tertiary select-none text-base"},"This is the start of the #",t.name," channel.")),!!n&&f.createElement(f.Fragment,null,f.createElement("div",{className:"rounded-full flex items-center justify-center w-20 h-20 dark:bg-gray-700"},f.createElement(tt,{className:"w-2/3 h-2/3 text-primary"})),f.createElement("div",{className:"text-3xl font-semibold pt-4 text-primary"},n.name),f.createElement("div",{className:"pt-2 text-tertiary select-none text-base"},"Welcome to the beginning of the"," ",f.createElement("span",{className:"font-semibold"},n.displayName)," group."))))}var Ro=g.exports.memo((function({index:e,message:t,prevMessage:n,server:r,channel:a,group:l,user:s}){var o,i,c,m,d,u;const[p]=La(),v=t.isEveryoneMentioned||t.mentionedUsers.map((e=>e.id)).includes(null==p?void 0:p.id),h=So(null==(o=null==t?void 0:t.file)?void 0:o.mime),b=g.exports.useCallback((e=>{var t,n;const r=null==(n=null==(t=e.target)?void 0:t.dataset)?void 0:n.mention;r&&r.substring(2,r.length-1)}),[t]),E=0===e||n&&(!n.text||n.author.id!==t.author.id);return t.type===Ln.Initial?f.createElement(Mo,{channel:a,group:l,user:s}):t.type===Ln.Join?f.createElement(zl,{className:(null==n?void 0:n.text)?"pt-4":"",data:{type:gl,message:t}},f.createElement("div",{className:"flex dark:hover:bg-gray-775 py-1 px-4"},f.createElement("div",{className:"w-10 flex justify-center"},f.createElement(vt,{className:"w-5 h-5 text-green-500"})),f.createElement("div",{className:"pl-4 text-base text-tertiary flex items-center"},f.createElement(zl,{className:"inline-block",data:{type:dl,user:t.author}},f.createElement(as,{user:t.author,roles:null==(i=t.serverUser)?void 0:i.roles},f.createElement(ts,{user:t.author,size:5}))),f.createElement(zl,{className:"inline-block",data:{type:dl,user:t.author}},f.createElement(as,{user:t.author,roles:null==(c=t.serverUser)?void 0:c.roles},f.createElement("span",{className:"ml-2 text-white cursor-pointer hover:underline"},t.author.username)))," has joined the ",t.serverUser?"planet":"group",f.createElement("span",{className:"pl-2 text-11 whitespace-nowrap text-mid cursor-default leading-5 select-none"},ss(t.createdAt))))):t.type===Ln.Normal?f.createElement("div",{className:""+(E?"pt-4":"")},f.createElement(zl,{data:{type:gl,message:t,server:r}},f.createElement("div",{className:"flex py-1 px-4 dark:hover:bg-gray-775 group relative"},v&&f.createElement("div",{className:"bg-gray-500 group-hover:bg-opacity-30 bg-opacity-10 absolute inset-0 pointer-events-none border-l-2 border-gray-500"}),E?f.createElement(zl,{data:{type:dl,user:t.author}},f.createElement(as,{user:t.author,roles:null==(m=t.serverUser)?void 0:m.roles},f.createElement(ts,{user:t.author,size:10,className:"dark:bg-gray-700 cursor-pointer"}))):f.createElement("div",{className:"w-10 text-11 whitespace-nowrap text-mid group-hover:opacity-100 opacity-0 cursor-default select-none leading-6.5"},ss(t.createdAt)),f.createElement("div",{className:"pl-4 w-full"},E&&f.createElement("div",{className:"flex items-end pb-0.5"},f.createElement(zl,{data:{type:dl,user:t.author}},f.createElement(as,{user:t.author,roles:null==(d=t.serverUser)?void 0:d.roles},f.createElement("div",{className:"text-base font-medium cursor-pointer hover:underline leading-none"},t.author.username))),f.createElement("div",{className:"text-11 text-mid pl-2 leading-none cursor-default select-none"},ls(t.createdAt))),!!t.text&&f.createElement("div",{onClick:b,className:"prose prose-sm dark:prose-dark focus:outline-none max-w-none",dangerouslySetInnerHTML:{__html:t.text}}),!!(null==(u=t.linkMetadatas)?void 0:u.length)&&f.createElement(f.Fragment,null,t.linkMetadatas.map(((e,t)=>f.createElement("div",{key:t,className:"py-1.5 max-w-screen-sm w-full"},f.createElement(ws,{dark:!0,metadata:e,linkUrl:e.url}))))),f.createElement(Fo,{message:t}),!!t.file&&f.createElement("div",{className:"pt-1 max-w-screen-sm w-full"},f.createElement("div",{className:"flex border dark:border-gray-850 dark:bg-gray-800 p-3 rounded w-full items-center"},f.createElement(h,{className:"w-8 h-8 dark:text-white"}),f.createElement("div",{className:"pl-3"},f.createElement("a",{href:t.file.url,target:"_blank",rel:"noreferrer noopener",className:"block text-base text-accent hover:underline cursor-pointer truncate"},t.file.filename),f.createElement("div",{className:"text-mid text-xs"},function(e,t=2){if(0===e)return"0 Bytes";const n=t<0?0:t,r=Math.floor(Math.log(e)/Math.log(1024));return parseFloat((e/Math.pow(1024,r)).toFixed(n))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][r]}(t.file.size))),f.createElement("a",{className:"block ml-auto",href:t.file.url,target:"_blank",rel:"noreferrer noopener"},f.createElement(ht,{className:"h-6 w-6 highlightable"})))))))):null}));const Ao=({channelId:e,groupId:n,userId:r})=>{const a={channelId:e,groupId:n,userId:r},{data:l,fetchMore:s,loading:o}=function(e){const n={...In,...e};return t(Ea,n)}({variables:{...a,cursor:null},fetchPolicy:"network-only",nextFetchPolicy:"cache-first"}),i=null==l?void 0:l.messages.hasMore,c=null==l?void 0:l.messages.messages;return[c,o,()=>{c&&i&&0!==c.length&&s({variables:{...a,cursor:c[0].id},updateQuery:(e,{fetchMoreResult:t})=>({messages:{hasMore:t.messages.hasMore,messages:[...t.messages.messages,...e.messages.messages]}})})},i]},Oo=e=>y(`\n  ${e?"scale-100":"scale-0"}\n  transform\n  transition\n  bg-gradient-to-br\n  from-red-400\n  to-indigo-600\n  rounded-xl\n  p-3\n  max-w-sm\n  w-full\n  relative\n`);function Do({channel:e,user:t,group:n,setFiles:r}){const[a,l]=(()=>{const[e,t]=g.exports.useState(null),[n,r]=g.exports.useState(!1),a=g.exports.useRef(0),l=g.exports.useCallback((e=>{e.preventDefault(),e.stopPropagation()}),[]),s=g.exports.useCallback((e=>{e.preventDefault(),e.stopPropagation(),a.current++,e.dataTransfer.items&&e.dataTransfer.items.length>0&&r(!0)}),[]),o=g.exports.useCallback((e=>{e.preventDefault(),e.stopPropagation(),a.current--,a.current>0||r(!1)}),[]),i=g.exports.useCallback((e=>{e.preventDefault(),e.stopPropagation(),r(!1),e.dataTransfer.files&&e.dataTransfer.files.length>0&&(a.current=0,t(e.dataTransfer.files),e.dataTransfer.clearData())}),[]);return g.exports.useEffect((()=>(window.addEventListener("dragenter",s),window.addEventListener("dragleave",o),window.addEventListener("dragover",l),window.addEventListener("drop",i),function(){window.removeEventListener("dragenter",s),window.removeEventListener("dragleave",o),window.removeEventListener("dragover",l),window.removeEventListener("drop",i)}))),[e,n]})();g.exports.useEffect((()=>r(a)),[a,r]);const s=g.exports.useMemo((()=>e?`#${e.name}`:t?`@${t.username}`:n?`${n.displayName}`:void 0),[e,t,n]);return f.createElement(f.Fragment,null,f.createElement("div",{className:(o=l,y(`\n  fixed\n  inset-0\n  transition-all\n  bg-black\n  ${o?"visible bg-opacity-75":"invisible bg-opacity-0"}\n  flex\n  items-center\n  justify-center\n`)),style:{zIndex:999999}},f.createElement("div",{className:Oo(l)},f.createElement("div",{className:"flex absolute left-1/2 transform top-0 -translate-x-1/2 -translate-y-1/2 transition delay-75 "+(l?"scale-100":"scale-0")},f.createElement("div",{className:"relative transform translate-x-6 translate-y-3 -rotate-12"},f.createElement("div",{className:"absolute left-5 top-9 w-14 h-14 bg-red-400",style:{zIndex:-1}}),f.createElement(pt,{className:"w-24 h-24"})),f.createElement("div",{className:"relative"},f.createElement("div",{className:"absolute left-5 top-9 w-14 h-14 bg-red-400",style:{zIndex:-1}}),f.createElement(st,{className:"w-24 h-24 "})),f.createElement("div",{className:"relative transform -translate-x-6 translate-y-3 rotate-12"},f.createElement("div",{className:"absolute left-5 top-8 w-14 h-14 bg-red-400",style:{zIndex:-1}}),f.createElement(lt,{className:"w-24 h-24"}))),f.createElement("div",{className:"rounded-xl border-dashed border-white border-2 px-4 pb-4 pt-16 text-center"},f.createElement("div",{className:"text-xl font-bold text-primary"},"Upload to ",f.createElement("span",{className:"text-white"},s))))));var o}const Lo=e=>new Promise(((t,n)=>{const r=new FileReader;r.onload=e=>t(e.target.result),r.onerror=e=>n(e),r.readAsDataURL(e)})),To=y("\n  text-sm\n  text-primary\n  h-10\n  px-7\n  hover:underline\n  focus:outline-none\n  select-none\n  disabled:opacity-50\n  disabled:no-underline\n  disabled:cursor-not-allowed\n"),qo=y("\n  text-sm\n  text-primary\n  transition\n  bg-blue-500\n  hover:bg-blue-600\n  flex\n  items-center\n  justify-center\n  rounded\n  px-7\n  h-10\n  focus:outline-none\n  select-none\n  disabled:opacity-50\n  disabled:cursor-not-allowed\n");function zo({createMessage:e,variables:t,file:n,setFileIndex:r,placeholder:a,multiple:l,cancelAll:s}){var o;const[i,c]=g.exports.useState(""),m=(e=>{const[t,n]=g.exports.useState(null);return g.exports.useEffect((()=>{e&&(e.type.startsWith("image")?Lo(e).then((e=>n(e))).catch((()=>n(null))):n(null))}),[e]),t})(n),[d,u]=g.exports.useState(!1),p=g.exports.useCallback((()=>{d||r((e=>e+1))}),[r,d]),v=g.exports.useCallback((()=>{u(!0),e({variables:{input:{text:i||null,file:n,...t}}}).then((()=>{u(!1),p()}))}),[p,i,n,t,e]);g.exports.useEffect((()=>c("")),[n]);const h=g.exports.useCallback((e=>{"Enter"===e.key&&n&&v()}),[v,n]);g.exports.useEffect((()=>(document.body.addEventListener("keydown",h),()=>{document.body.removeEventListener("keydown",h)})),[h]);const b=So(null==n?void 0:n.type);return f.createElement(jl,{close:p,isOpen:!!n},f.createElement("div",{className:"text-left relative w-full rounded-xl dark:bg-gray-750 max-w-lg mx-auto"},f.createElement("div",{className:"absolute left-5 -top-20 flex w-46 h-40"},m&&f.createElement("img",{alt:"",src:m,className:"absolute max-w-full max-h-full bottom-0 left-0 rounded shadow-md object-cover"}),!m&&b&&f.createElement(b,{className:"h-full w-full text-white absolute bottom-0 left-0 transform -translate-x-8"})),f.createElement("div",{className:"px-5 pt-24 pb-5"},f.createElement(_l,{className:"truncate text-left text-xl text-primary font-semibold select-none"},null!=(o=null==n?void 0:n.name)?o:""),f.createElement("div",{className:"text-tertiary text-13 pb-5 pt-0.5 select-none"},"Upload to"," ",f.createElement("span",{className:"font-medium text-secondary"},a)),f.createElement("label",{htmlFor:"comment",className:"block uppercase text-xs font-medium text-secondary pb-1.5"},"Add a Comment ",f.createElement("span",{className:"text-tertiary"},"(Optional)")),f.createElement("input",{className:"h-10 rounded-lg dark:bg-gray-700 w-full focus:outline-none px-4 text-secondary text-base",id:"comment",value:i,onChange:e=>{const t=e.target.value;c(t)}})),f.createElement("div",{className:"flex p-4 dark:bg-gray-775 rounded-b-xl"},f.createElement("div",{className:"ml-auto"}),l&&f.createElement("button",{className:To,onClick:()=>{s()},disabled:d},"Cancel All"),f.createElement("button",{className:To,onClick:p,disabled:d},"Cancel"),f.createElement("button",{className:qo,disabled:!n||d,onClick:v},"Upload",d&&f.createElement("div",{className:"ml-3"},f.createElement(Qa,null))))))}const Ho=({channel:e,group:t,user:a,users:l})=>{k();const[s]=La(),[o,i]=g.exports.useState([]),[c]=function(e){const t={...In,...e};return n(Rr,t)}(),m={userId:null==a?void 0:a.id,groupId:null==t?void 0:t.id,channelId:null==e?void 0:e.id};!function(e){const t={...In,...e};r(Ma,t)}({variables:m,skip:!e&&!t&&!a,onSubscriptionData({subscriptionData:{data:{typingUpdated:{typingUserId:e,isTyping:t}}}}){if(t){const t=o.find((t=>t.id===e));if(t){const e=o.indexOf(t),n=[...o];n[e]={id:t.id,time:(new Date).getTime()},i(n)}else i([...o,{id:e,time:(new Date).getTime()}])}else i(o.filter((({id:t})=>t!==e)))}});const[d,u]=g.exports.useState(0);g.exports.useEffect((()=>{const e=setInterval((()=>{u(d+1)}),1e3);return()=>clearInterval(e)}),[d,u]);return[()=>c({variables:{input:m}}),o.filter((({id:e,time:t})=>(!s||e!==s.id)&&(new Date).getTime()-t<=1500)).map((({id:e})=>{var t;return null==(t=l.find((t=>t.id===e)))?void 0:t.username})).filter((e=>!!e))]},Bo=ft.create({name:"mention",defaultOptions:{HTMLAttributes:{},suggestion:{char:"@",command:({editor:e,range:t,props:n})=>{e.chain().focus().replaceRange(t,"mention",n).insertContent(" ").run()},allow:({editor:e,range:t})=>e.can().replaceRange(t,"mention")}},group:"inline",inline:!0,selectable:!1,atom:!0,addAttributes:()=>({id:{default:null,parseHTML:e=>({id:e.getAttribute("data-mention")}),renderHTML:e=>e.id?{"data-mention":e.id}:{}},name:{default:null,parseHTML:e=>({name:e.getAttribute("data-mention")}),renderHTML:()=>({})}}),parseHTML:()=>[{tag:"span[data-mention]"}],renderHTML({node:e,HTMLAttributes:t}){return["span",ie(this.options.HTMLAttributes,t),`@${e.attrs.name}`]},renderText:({node:e})=>`@${e.attrs.name}`,addKeyboardShortcuts(){return{Backspace:()=>this.editor.commands.command((({tr:e,state:t})=>{let n=!1;const{selection:r}=t,{empty:a,anchor:l}=r;return!!a&&(t.doc.nodesBetween(l-1,l,((t,r)=>{if("mention"===t.type.name)return n=!0,e.insertText(this.options.suggestion.char||"",r,r+t.nodeSize),!1})),n)}))}},addProseMirrorPlugins(){return[bt({editor:this.editor,...this.options.suggestion})]}});class jo extends g.exports.Component{constructor(e){super(e),this.state={selectedIndex:0}}componentDidUpdate(e){this.props.users!==e.users&&this.setState({selectedIndex:0})}onKeyDown({event:e}){return"ArrowUp"===e.key?(this.upHandler(),!0):"ArrowDown"===e.key?(this.downHandler(),!0):"Enter"===e.key&&(e.stopPropagation(),this.enterHandler(),!0)}upHandler(){this.setState({selectedIndex:(this.state.selectedIndex+this.props.users.length-1)%this.props.users.length})}downHandler(){this.setState({selectedIndex:(this.state.selectedIndex+1)%this.props.users.length})}enterHandler(){this.selectItem(this.state.selectedIndex)}selectItem(e){const t=this.props.users[e];t&&this.props.command("string"==typeof t?{id:`<${t}>`,name:t.substring(1)}:{id:`<@${t.user.id}>`,name:t.name})}render(){return f.createElement("div",{className:"relative w-full w-72 rounded dark:bg-gray-800 text-primary overflow-hidden text-sm shadow-md"},this.props.users.filter((e=>("string"==typeof e?e.substring(1):e.username).toLowerCase().startsWith(this.props.query.toLowerCase()))).slice(0,5).map(((e,t)=>f.createElement("button",{className:"block w-full text-left bg-transparent border-none px-2 py-2 dark:hover:bg-gray-775 focus:outline-none "+(t===this.state.selectedIndex?"dark:bg-gray-775":""),key:"string"==typeof e?e:e.id,onClick:()=>this.selectItem(t)},"string"==typeof e?e:e.username))))}}const _o="_typing__dot_1o677_5";function Vo(){return f.createElement("div",{className:"_typing_1o677_1"},f.createElement("div",{className:_o}),f.createElement("div",{className:_o}),f.createElement("div",{className:_o}))}function Go({channel:e,server:t,group:n,user:r,users:a}){const{t:l}=k(),[s]=La(),o=!!r&&r.relationshipStatus===Yn.Blocked,i=!!r&&r.relationshipStatus===Yn.Blocking,[c,m,d]=Ka({server:t,permissions:[Kn.SendMessages,Kn.RestrictedChannels,Kn.PrivateChannels]}),u=!!e&&c&&(e.type===Pn.Public||e.type===Pn.Restricted&&m||e.type===Pn.Private&&d),p=!!s&&(!!r&&(!!r&&!o&&!i)||!!e&&u||!!n),v=g.exports.useMemo((()=>s?e?u?`Message #${e.name}`:"You do not have permission to send messages in this channel":n?`Message ${n.name}`:r?o?"This user has blocked you":i?"You are blocking this user":`Message @${r.username}`:"":"Must log in to send messages"),[s,e,n,r,u,o,i]),h={autofocus:!0,extensions:[me.configure({horizontalRule:!1,bulletList:!1,orderedList:!1,listItem:!1,heading:!1}),de,Et.configure({placeholder:`${v}`,showOnlyWhenEditable:!1}),xt.create({addKeyboardShortcuts:()=>({Enter:({editor:e})=>{let t=e.getHTML();if(!(0===e.state.doc.textContent.length)){const n=/^<p>|<\/p>$/gi,r=/^\s*(?:<br\s*\/?\s*>)+|(?:<br\s*\/?\s*>)+\s*$/gi;t=t.replace(n,""),t=t.replace(r,""),S({variables:{input:{text:t,...M}}}),e.commands.clearContent()}return!0}})}),Bo.configure({suggestion:{allowSpaces:!1,render:()=>{let e,t;return{onStart:n=>{e=new yt(jo,{props:{...n,users:["@everyone"].concat(a)},editor:n.editor}),t=wt("body",{getReferenceClientRect:n.clientRect,appendTo:()=>document.body,content:e.element,showOnCreate:!0,interactive:!0,trigger:"manual",placement:"bottom-start",render(e){const t=document.createElement("div"),n=document.createElement("div");return t.appendChild(n),n.innerHTML="",n.appendChild(e.props.content),{popper:t,onUpdate:function(e,t){e.content!==t.content&&(n.innerHTML="",n.appendChild(t.content))}}}})},onUpdate(n){e.updateProps(n),t[0].setProps({getReferenceClientRect:n.clientRect})},onKeyDown(t){var n;return null==(n=e.ref)?void 0:n.onKeyDown(t)},onExit(){t[0].destroy(),e.destroy()}}}}})],content:"",editorProps:{attributes:{class:"prose prose-sm dark:prose-dark focus:outline-none max-w-none"}},editable:p},[b,E]=g.exports.useState(null),x=function(){const[,e]=g.exports.useState(0);return()=>e((e=>e+1))}();g.exports.useEffect((()=>{b&&b.destroy();const e=new Nt(h);return E(e),e.on("transaction",x),()=>{e.destroy()}}),[p,v,e,r,n,t]);const[y,w]=Ho({channel:e,group:n,user:r,users:a}),[N,C]=g.exports.useState(null),[$,U]=g.exports.useState(null),[I,P]=g.exports.useState(0),[S]=Ur({update(t,{data:{createMessage:a}}){const l=null==e?void 0:e.id,s=null==n?void 0:n.id,o=null==r?void 0:r.id,i={query:Ea,variables:{userId:o,groupId:s,channelId:l,cursor:null}},c=t.readQuery(i);c&&!c.messages.messages.map((e=>e.id)).includes(a.id)&&t.writeQuery({...i,data:{messages:{...c.messages,messages:[...c.messages.messages,a]}}})}}),M={channelId:null==e?void 0:e.id,groupId:null==n?void 0:n.id,userId:null==r?void 0:r.id},R=kl(),A=g.exports.useCallback((e=>{if(!p)return;const t=e.clipboardData.files;if(t&&t.length>0)C(t),e.preventDefault();else{e.clipboardData.getData("text")&&(null==b||b.commands.focus())}}),[b]);g.exports.useEffect((()=>(document.body.addEventListener("paste",A),()=>{document.body.removeEventListener("paste",A)})),[A]),g.exports.useEffect((()=>{N&&(U(N[0]),P(0))}),[N]),g.exports.useEffect((()=>{if(!N)return;let e;return I>=N.length?(C(null),U(null),P(0)):(U(null),e=setTimeout((()=>U(N[I])),300)),()=>{e&&clearTimeout(e)}}),[I]);const O=g.exports.useCallback((()=>{C(null),U(null),P(0)}),[C,U,P]);return f.createElement(f.Fragment,null,!!s&&f.createElement(f.Fragment,null,f.createElement(Do,{placeholder:v,setFiles:C}),f.createElement(zo,{createMessage:S,variables:M,file:$,setFileIndex:P,placeholder:v,multiple:N&&N.length>1,cancelAll:O})),f.createElement("div",{className:"px-4 dark:bg-gray-750 relative",onKeyPress:()=>{s&&y()}},f.createElement("div",{className:"relative"},p&&f.createElement(F,{content:l("message.upload")},f.createElement("div",{className:"block absolute left-4.5 top-1/2 transform -translate-y-1/2"},f.createElement("input",{className:"hidden",id:"file",name:"file",type:"file",onChange:e=>C(e.target.files),multiple:!0}),f.createElement("label",{htmlFor:"file",className:"text-tertiary highlightable"},f.createElement(kt,{className:"w-5 h-5"})))),f.createElement("div",{onClick:()=>{s||R()},className:`${p?"px-14":"px-4 opacity-50"} ${s?"":"cursor-pointer"} min-h-[3rem] max-h-[20rem] overflow-y-auto scrollbar-light dark:bg-gray-700 py-3 w-full  rounded-lg text-base focus:outline-none text-secondary border-none`},f.createElement(pe,{editor:b}))),f.createElement("div",{className:"h-6 flex items-center text-secondary text-13 font-medium"},w.length>0&&f.createElement(Vo,null),1===w.length&&f.createElement(f.Fragment,null,f.createElement("span",{className:"font-bold text-primary"},w[0])," is typing..."),2===w.length&&f.createElement(f.Fragment,null,f.createElement("span",{className:"font-bold text-primary"},w[0])," and ",f.createElement("span",{className:"font-bold text-primary"},w[1])," are typing..."),3===w.length&&f.createElement(f.Fragment,null,f.createElement("span",{className:"font-bold text-primary"},w[0]),", ",f.createElement("span",{className:"font-bold text-primary"},w[1]),", and ",f.createElement("span",{className:"font-bold text-primary"},w[2])," are typing..."),w.length>3&&f.createElement(f.Fragment,null,"Several people are typing..."))))}function Yo({channel:e,server:t,user:n,group:r,users:a}){const l=g.exports.useRef(null),[s,o,i,c]=Ao({channelId:null==e?void 0:e.id,userId:null==n?void 0:n.id,group:null==r?void 0:r.id}),[m,d]=g.exports.useState((null==s?void 0:s.length)||0),u=Ct(m);g.exports.useEffect((()=>{var e;d((null==s?void 0:s.length)||0),0===u&&(null==(e=null==l?void 0:l.current)||e.scrollBy({top:1e7}))}),[e,n,r,l]);const{atBottom:p,newMessagesNotification:v,setNewMessagesNotification:h}=function(e){const[t]=La(),[n,r]=g.exports.useState(!1),a=g.exports.useRef(""),l=g.exports.useRef(!1);return g.exports.useEffect((()=>{var n;if(!(null==e?void 0:e.length))return;const s=e[e.length-1],o=a.current;a.current=s.id||"",s.id!==o&&(l.current||t&&(null==(n=s.author)?void 0:n.id)!==t.id&&r(!0))}),[t,e]),{atBottom:l,newMessagesNotification:n,setNewMessagesNotification:r}}(s),b=function(e){var t;const n=null==(t=null==e?void 0:e[0])?void 0:t.id,r=g.exports.useRef(n),a=g.exports.useRef(n),l=g.exports.useRef(0);return g.exports.useMemo((()=>{if(!e||!e.length)return 0;if(n===a.current)return l.current;r.current||(r.current=n),a.current=n;for(let t=l.current;t<e.length;t+=1)if(e[t].id===r.current)return l.current=t,t;return 0}),[e,null==e?void 0:e.length])}(s),E=function(e){const[t]=La(),n=g.exports.useRef(""),r=g.exports.useRef(!1);function a(){var r;if(e&&e.length>0){const a=e[e.length-1];if((null==(r=a.author)?void 0:r.id)===(null==t?void 0:t.id)&&n.current!==a.id)return n.current=a.id,!0}return!1}return g.exports.useEffect((()=>{e&&e.length&&!r.current&&(r.current=!0,a())}),[e,null==e?void 0:e.length]),a}(s),x=g.exports.useCallback(((a,l)=>{const s=l+b-1e7,o=a[s],i=s>0?a[s-1]:null;return o?f.createElement(Ro,{server:t,channel:e,group:r,user:n,message:o,index:s,prevMessage:i}):f.createElement("div",{style:{height:"1px"}})}),[b,t,e,r,n]);return f.createElement(f.Fragment,null,f.createElement("div",{className:"relative flex-1 overflow-x-hidden overflow-y-auto dark:bg-gray-750 w-full h-full"},!!s&&f.createElement(se,{className:"scrollbar-custom",alignToBottom:!0,atBottomStateChange:e=>{p.current=e,e&&v&&h(!1)},components:{Footer:()=>f.createElement("div",{className:"h-5.5"})},firstItemIndex:1e7-b,followOutput:e=>(E()||!!e)&&"auto",initialTopMostItemIndex:s.length>0?s.length-1:0,itemContent:e=>x(s,e),overscan:0,ref:l,startReached:()=>{!o&&c&&i()},style:{overflowX:"hidden"},totalCount:s.length||0})),!!a&&(!!e||!!n||!!r)&&f.createElement(Go,{server:t,channel:e,user:n,group:r,users:a}))}function Wo({username:e}){const{data:t}=Sa({variables:{username:e},fetchPolicy:"cache-and-network",nextFetchPolicy:"cache-first"}),[r]=function(e){const t={...In,...e};return n(Zr,t)}(),[a]=Kr(),l=null==t?void 0:t.user;g.exports.useEffect((()=>{l&&(l.showChat||r({variables:{input:{userId:l.id}}}))}),[l]),Cs(`dm/@${e}`);const[s]=La();return g.exports.useEffect((()=>{s&&l&&l.unreadCount>0&&a({variables:{input:{userId:l.id}},optimisticResponse:{readDm:{...l,unreadCount:0}}})}),[l,s]),f.createElement($s,{header:f.createElement(ko,{user:l})},!!l&&f.createElement(Yo,{user:l,users:[l,s]}))}const Qo=e=>{const{server:t}=$t(),n=Ha((e=>e.setServerPage));g.exports.useEffect((()=>n(t,e)))};function Jo({user:e,color:t,roles:n=[]}){return f.createElement(zl,{data:{type:dl,user:e}},f.createElement(as,{user:e,roles:n,placement:"left"},f.createElement(Va,{small:!0},f.createElement(ts,{user:e,size:6,showOnline:!0,dotClassName:"w-2 h-2 ring-2 dark:ring-gray-800"}),f.createElement("div",{className:"ml-3 font-medium text-tertiary"},e.username))))}function Ko({server:e,serverUsers:t}){const n=g.exports.useMemo((()=>{var n;const r=[];for(const s of(null!=(n=null==e?void 0:e.roles)?n:[]).filter((e=>e.permissions.includes(Kn.DisplayRoleSeparately)))){const e=t.filter((e=>e.isOnline&&e.roles.map((e=>e.id)).includes(s.id)&&!r.includes(e)));e.length&&(r.push(`${s.name} — ${e.length}`),r.push(...e))}const a=t.filter((e=>e.user.isOnline));a.length&&(r.push(`Online — ${a.length}`),r.push(...a));const l=t.filter((e=>!e.user.isOnline));return l.length&&(r.push(`Offline — ${l.length}`),r.push(...l)),r}),[t,e]),r=g.exports.useRef(),a=Ha((e=>e.showUsers));return f.createElement(za,{right:!0,show:a},f.createElement(se,{className:"scrollbar-dark",ref:r,style:{height:"100%",width:"100%"},data:n,itemContent:(e,t)=>f.createElement("div",{className:"px-1.5 pb-0.5"},"string"==typeof t?f.createElement(Bl,null,t):f.createElement("div",{className:""+(t.user.isOnline?"":"opacity-35")},f.createElement(Jo,{user:t.user,roles:t.roles,color:t.color})))}))}function Zo({server:e}){var t;const[n]=La(),r=g.exports.useRef(null),{data:a}=Ia({variables:{serverId:null==e?void 0:e.id},skip:!e,fetchPolicy:"cache-and-network"}),l=null!=(t=null==a?void 0:a.serverUsers)?t:[];return Qo(""),f.createElement($s,{header:f.createElement(Wl,{refreshPosts:()=>{r&&r.current&&r.current.refresh()}}),rightSidebar:f.createElement(Ko,{server:e,serverUsers:l})},f.createElement(Te,null,f.createElement("title",null,null==e?void 0:e.displayName)),f.createElement(ks,{serverId:null==e?void 0:e.id,header:n?f.createElement(Ws,{server:e}):null}))}function Xo({post:e,users:t=[]}){var n,r,a;const{t:l}=k(),s=Ha((e=>e.showUsers));return f.createElement(za,{right:!0,show:s},f.createElement("div",{className:"px-1"},(null==e?void 0:e.author)&&f.createElement(f.Fragment,null,f.createElement(Bl,null,l("post.creator")),f.createElement(Jo,{user:null==(n=e.author)?void 0:n.user,color:null==(r=e.author)?void 0:r.color,roles:null==(a=e.author)?void 0:a.roles})),t&&t.length>0&&f.createElement(f.Fragment,null,f.createElement(Bl,null,l("post.participantCount",{count:t.length})),t.map((e=>f.createElement(Jo,{key:e.user.id,user:e.user,color:e.color,roles:e.roles}))))))}const ei=e=>{if(!e.childComments||0===e.childComments.length)return 0;let t=0;return e.childComments.forEach((e=>{t++,e.childCount=ei(e),t+=e.childCount})),t},ti=e=>((e=(e=>{const t=Object.create(null);e.forEach((e=>t[e.id]={...e,childComments:[]}));const n=[];return e.forEach((e=>{e.parentComment?t[e.parentComment.id].childComments.push(t[e.id]):n.push(t[e.id])})),n})(e)).forEach((e=>e.childCount=ei(e))),e),ni=y("\n  text-base\n  text-primary\n  disabled:opacity-50\n  dark:disabled:bg-gray-600\n  bg-green-600\n  rounded\n  px-3\n  h-8\n  flex\n  items-center\n  disabled:cursor-not-allowed\n  focus:outline-none\n"),ri=y("\n  text-base\n  text-tertiary\n  focus:outline-none\n  px-2\n  h-8\n  flex\n  items-center\n");function ai({postId:e,parentCommentId:t,setOpen:r}){const[a,l]=g.exports.useState(""),[s,{loading:o}]=function(e){const t={...In,...e};return n(hr,t)}({update(t,{data:{createComment:n}}){const r=t.readQuery({query:ha,variables:{postId:e}});t.writeQuery({query:ha,variables:{postId:e},data:{comments:[n,...r.comments]}})}}),{t:i}=k();return f.createElement("div",{className:"max-w-screen-md w-full"},f.createElement(Is,{text:a,setText:l}),f.createElement("div",{className:"flex justify-end space-x-3 items-center pt-3"},f.createElement("button",{className:ri,onClick:()=>{r(!1),l("")}},i("comment.create.cancel")),f.createElement("button",{className:ni,disabled:!a||o,onClick:()=>{s({variables:{input:{postId:e,text:a,parentCommentId:t}}}).then((()=>{r(!1),l("")}))}},i("comment.create.submit"),o&&f.createElement(Qa,{className:"w-5 h-5 text-primary ml-3"}))))}const li=y("\n  ml-4\n  text-xs\n  text-gray-500\n  hover:text-gray-700\n  dark:hover:text-gray-300\n  font-medium\n  leading-none\n  select-none\n  cursor-pointer\n");function si({comment:e,post:t,level:n=0,setParentComment:r,isLast:a}){var l,s,o,i,c,m,d,u;const{t:p}=k(),[v,h]=Ka({server:null==t?void 0:t.server,permissions:[Kn.CreateComment,Kn.VoteComment]}),[b,E]=g.exports.useState(!1),[x,y]=Ha((e=>[e.replyingCommentId,e.setReplyingCommentId])),w=x===e.id;return f.createElement("div",{className:"relative rounded dark:bg-gray-800 "+(0===n?"":"pl-4")},f.createElement("div",{id:e.id}),f.createElement(zl,{data:{type:pl,comment:e,post:t}},f.createElement("div",{className:"flex px-3 pt-3"},f.createElement(zl,{data:{type:dl,user:e.author}},f.createElement(as,{user:null==(l=e.author)?void 0:l.user,roles:null==(s=e.author)?void 0:s.roles},f.createElement(ts,{size:7,className:"cursor-pointer transition hover:opacity-90",user:null==(o=e.author)?void 0:o.user}))),f.createElement("div",{className:"pl-3 pb-3 w-full "+(!e.childComments.length&&!a||b?"":"border-b dark:border-gray-750")},f.createElement("div",{className:"flex items-end pb-1.5"},f.createElement(zl,{data:{type:dl,user:e.author}},f.createElement(as,{user:null==(i=e.author)?void 0:i.user,roles:null==(c=e.author)?void 0:c.roles},f.createElement("div",{className:"text-sm font-medium cursor-pointer hover:underline leading-none "+(e.author.color?"":"text-primary"),style:{color:e.author.color}},null!=(u=null==(d=null==(m=e.author)?void 0:m.user)?void 0:d.username)?u:"[deleted]"))),f.createElement("div",{className:"text-11 text-mid font-medium pl-2 leading-none"},ls(e.createdAt))),f.createElement("div",{className:"prose prose-sm dark:prose-dark max-w-none",dangerouslySetInnerHTML:{__html:e.text}}),f.createElement("div",{className:"flex items-center pt-2"},f.createElement(oi,{comment:e,canVote:h}),v&&f.createElement("div",{className:li,onClick:()=>{y(w?null:e.id)}},p(w?"comment.cancelReply":"comment.reply")),!!e.childCount&&f.createElement("div",{className:li,onClick:()=>E(!b)},b?`${p("comment.showReplies")} (${e.childCount})`:p("comment.hideReplies")),f.createElement("div",{className:"ml-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center cursor-pointer"},f.createElement(Ut,{className:"w-5 h-5"}))),w&&f.createElement("div",{className:"pt-3 max-w-screen-md w-full"},f.createElement(ai,{postId:t.id,parentCommentId:e.id,setOpen:()=>y(null)}))))),f.createElement("div",{className:"pl-3"},!b&&e.childComments.map(((a,l)=>f.createElement(si,{key:a.id,comment:a,level:n+1,setParentComment:r,post:t,isLast:l<e.childComments.length-1})))))}function oi({comment:e,canVote:t}){const n=Il(e),{t:r}=k(),a=kl(),[l]=La();return f.createElement("div",{onClick:e=>{e.stopPropagation(),l?t?n():N.error(r("comment.context.votePermission")):a()},className:(e.isVoted?"text-red-400":"text-gray-500 hover:text-gray-700 dark:hover:text-gray-300")+" flex items-center cursor-pointer"},f.createElement(ae,{className:"w-4 h-4"}),f.createElement("div",{className:"ml-2 text-xs font-medium"},e.voteCount))}function ii({postId:e}){const[t,n]=g.exports.useState(!1),[r]=La(),{t:a}=k();return f.createElement(f.Fragment,null,t?f.createElement("div",{className:"dark:bg-gray-800 pt-3 pb-3 px-3 rounded flex"},f.createElement("div",{className:"pr-3 mr-3 border-r dark:border-gray-750 inline-block h-7"},f.createElement(ts,{user:r,size:7})),f.createElement(ai,{postId:e,setOpen:n})):f.createElement("div",{onClick:()=>n(!0),className:"dark:bg-gray-700 h-13 flex items-center rounded transition dark:hover:bg-gray-650 cursor-pointer"},f.createElement("div",{className:"px-3 border-r dark:border-gray-650 h-7"},f.createElement(ts,{user:r,size:7})),f.createElement("div",{className:"text-sm text-secondary px-3"},a("post.createComment"))))}function ci(){const[e,t]=Ha((e=>[e.showUsers,e.setShowUsers])),{t:n}=k();return f.createElement(F,{content:n(e?"user.hideUsers":"user.showUsers")},f.createElement("div",{className:"highlightable",onClick:()=>t(!e)},f.createElement(tt,{className:"w-5 h-5"})))}function mi({post:e}){const t=Ha((e=>e.canGoBack)),{push:n,goBack:r}=I();return f.createElement("header",{id:"header",className:"h-12 min-h-[3rem] items-center bg-white dark:bg-gray-750 border-b dark:border-gray-800 shadow flex items-center"},f.createElement("div",{className:"flex items-center font-semibold text-base text-primary pl-4"},f.createElement("div",{className:"highlightable mr-3 cursor-pointer",onClick:()=>{t?r():n(`/+${null==e?void 0:e.server.name}`)}},f.createElement(It,{className:"w-5 h-5"})),f.createElement("span",{className:"line-clamp-1"},null==e?void 0:e.title)),f.createElement("div",{className:"ml-auto pl-6 pr-4"},f.createElement(ci,null)),f.createElement("div",{className:"flex w-60 min-w-[15rem] pr-4"},f.createElement(Vl,null)))}function di({server:e,postId:n}){const[r]=Ka({server:e,permissions:[Kn.CreateComment]}),{data:a}=function(e){const n={...In,...e};return t(xa,n)}({variables:{id:n}}),l=null==a?void 0:a.post,{data:s}=function(e){const n={...In,...e};return t(ha,n)}({variables:{postId:n}}),o=g.exports.useMemo((()=>{var e;return ti(null!=(e=null==s?void 0:s.comments)?e:[])}),[null==s?void 0:s.comments]),i=g.exports.useMemo((()=>o.filter((e=>!!e.author)).map((e=>e.author)).filter(((e,t,n)=>n.findIndex((t=>t.id===e.id))===t))),[o]);return f.createElement($s,{header:f.createElement(mi,{post:l}),rightSidebar:f.createElement(Xo,{post:l,users:i})},f.createElement(Te,null,f.createElement("title",null,`${null==l?void 0:l.title} – ${null==e?void 0:e.displayName}`)),f.createElement("div",{className:"max-h-full h-full scrollbar-custom dark:bg-gray-750"},f.createElement("div",{className:"pt-4 px-4"},!!l&&f.createElement(Ns,{post:l,isPostPage:!0})),r&&f.createElement("div",{className:"pt-4 px-4"},f.createElement(ii,{postId:n})),f.createElement("div",{className:"space-y-2 px-4 pt-4 pb-96"},o.map(((e,t)=>f.createElement(si,{key:e.id,comment:e,post:l,isLast:t<o.length-1}))))))}function ui({name:e,icon:t}){const[n,r]=Ha((e=>[e.postsSort,e.setPostsSort])),{server:a}=$t(),{pathname:l}=$(),{push:s}=I(),o=n===e&&("/"===l||l===`/${a}`),i=t;return f.createElement(Va,{onClick:()=>{r(e),s(a?`/${a}`:"/")},active:o},f.createElement(i,{className:"w-5 h-5 mr-3 text-tertiary"}),e)}function pi(){const{t:e}=k();return f.createElement("div",{className:"space-y-0.5"},f.createElement(ui,{name:e("post.feed.sort.hot"),icon:q}),f.createElement(ui,{name:e("post.feed.sort.new"),icon:T}),f.createElement(ui,{name:e("post.feed.sort.top"),icon:L}))}function gi(){var e,t,n,r;const{t:a}=k(),[l]=La(),s=null!=(e=null==l?void 0:l.groups)?e:[],o=null!=(n=null==(t=null==l?void 0:l.relatedUsers)?void 0:t.filter((e=>e.showChat)))?n:[],i=s.concat(o).sort(((e,t)=>(e.lastMessageAt?new Date(e.lastMessageAt).getTime():0)-(t.lastMessageAt?new Date(t.lastMessageAt).getTime():0))),{data:c}=Ca({variables:{input:{unreadOnly:!0}},skip:!l}),m=null!=(r=null==c?void 0:c.replies)?r:[];return f.createElement(f.Fragment,null,f.createElement(za,null,f.createElement("div",{className:"h-12 border-b dark:border-gray-850 shadow flex items-center px-5 text-base font-medium"},f.createElement(uo,{className:"h-4"})),f.createElement("div",{className:"px-1.5"},!!l&&f.createElement("div",{className:"space-y-0.5 pt-3"},f.createElement(Va,{to:"/friends"},f.createElement(qe,{className:"mr-3 h-5 w-5"}),a("user.friends.title")),f.createElement(Va,{to:"/inbox"},f.createElement(nt,{className:"mr-3 h-5 w-5"}),a("inbox.title"),!!m.length&&f.createElement("div",{className:"ml-auto"},f.createElement(ro,{count:m.length})))),f.createElement(Bl,null,"Posts"),f.createElement(pi,null),!!l&&f.createElement(f.Fragment,null,f.createElement(Bl,{plusLabel:"Create DM"},a("dm.title")),f.createElement("div",{className:"space-y-0.5"},!!i&&i.map((e=>{if("Group"===e.__typename)return f.createElement("div",null,"Group");if("User"===e.__typename){const t=e;return f.createElement(vi,{user:t,key:`user-${t.id}`})}})))))))}function vi({user:e}){k();const[t]=ea(),{push:n}=I(),{pathname:r}=$(),[a]=Ur(),[{isOver:l,canDrop:s},o]=Pt({accept:Ba,drop:(t,r)=>{n(`/dm/@${e.username}`),a({variables:{input:{userId:e.id,text:`${location.origin}${t.relativeUrl}`}}})},collect:e=>({isOver:e.isOver(),canDrop:e.canDrop()})});return f.createElement("div",null,f.createElement(zl,{data:{type:dl,user:e,isDm:!0}},f.createElement(Va,{ref:o,large:!0,to:`/dm/@${e.username}`,key:`user-${e.id}`},f.createElement(ts,{size:9,showOnline:!0,user:e,dotClassName:"ring-3 w-2.5 h-2.5 dark:ring-gray-800"}),f.createElement("span",{className:"ml-3"},e.username),f.createElement("div",{className:"ml-auto"}),f.createElement("div",{className:"pr-2"},!!e.unreadCount&&f.createElement(ro,{count:e.unreadCount})),f.createElement(Le,{onClick:a=>{a.stopPropagation(),a.preventDefault(),t({variables:{input:{userId:e.id}}}),r===`/dm/@${e.username}`&&n("/friends")},className:"group-hover:visible invisible w-5 h-5 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}))))}const hi=e=>y(`\n  w-12\n  h-12\n  object-cover\n  inline-flex\n  items-center\n  justify-center\n  hover:rounded-2xl\n  ${e?"rounded-2xl":"rounded-3xl"}\n  transform\n  transition-all\n  relative\n  group\n  cursor-pointer\n`),fi=(e,t)=>y(`\n  absolute\n  left-0\n  w-1\n  dark:bg-white\n  rounded-r-2xl\n  top-1/2\n  -translate-y-1/2\n  transform\n  transition\n  duration-250\n  group-hover:-translate-x-3\n  ${e?"-translate-x-3 h-10":t?"-translate-x-3 h-2.5 group-hover:h-5":"-translate-x-4 h-5"}\n`);var bi=g.exports.forwardRef((({name:e,children:t,to:n,onClick:r,className:a="dark:bg-gray-800 bg-gray-200",active:l=!1,unread:s=!1},o)=>f.createElement(F,{content:e,placement:"right",ref:o,offset:[0,22]},n?f.createElement(x,{to:n,className:`${hi(l)} ${a}`},f.createElement("div",{className:fi(l,s)}),t):f.createElement("div",{onClick:r,className:`${hi(l)} ${a}`},f.createElement("div",{className:fi(l,s)}),t))));const Ei=y("\n  relative\n  flex\n  items-center\n  pl-3\n  pr-10\n  text-left\n  bg-white\n  cursor-pointer\n  focus:outline-none\n  text-13\n  rounded\n  border\n  h-10\n  dark:bg-gray-800\n  dark:border-gray-700\n  border-b\n  border-t-0\n  border-r-0\n  border-l-0\n  rounded-none\n  focus:outline-none\n  transition\n  px-4\n  text-secondary\n"),xi=y("\n  scrollbar-thin\n  dark:scrollbar-thumb-gray-750\n  dark:scrollbar-track-gray-850\n  scrollbar-thumb-rounded-md\n  absolute\n  py-1\n  mt-1\n  overflow-auto\n  text-13\n  text-secondary\n  bg-white\n  dark:bg-gray-850\n  rounded-md\n  shadow-lg\n  max-h-60\n  focus:outline-none\n  space-y-0.5\n  font-medium\n");function yi({category:e,setCategory:t}){const n=Object.values(Qn),r=mo(e);return f.createElement("div",{className:"min-w-full relative z-50"},f.createElement(Pe,{value:e,onChange:t},(({open:t})=>f.createElement(f.Fragment,null,f.createElement("div",{className:"relative"},f.createElement(Pe.Button,{className:Ei},e?f.createElement(f.Fragment,null,f.createElement(r,{className:"w-5 h-5 text-secondary"}),f.createElement("span",{className:"block truncate pl-3"},e)):f.createElement("span",{className:"block truncate text-tertiary"},"Category"),f.createElement("span",{className:"absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none"},f.createElement(Se,{className:"w-5 h-5 text-gray-400","aria-hidden":"true"}))),f.createElement(R,{show:t,as:g.exports.Fragment,leave:"transition ease-in duration-100",leaveFrom:"opacity-100",leaveTo:"opacity-0"},f.createElement(Pe.Options,{static:!0,className:xi},n.map((e=>f.createElement(Pe.Option,{key:e,className:({active:e})=>(e=>y(`\n  ${e?"dark:bg-gray-775":""}\n  cursor-pointer\n  select-none\n  relative\n  focus:outline-none\n`))(e),value:e},(({selected:t})=>f.createElement("div",{className:"flex items-center h-10 pl-3 pr-3 "+(t?"dark:bg-gray-775":"")},(()=>{const t=mo(e);return f.createElement(t,{className:"w-5 h-5 text-secondary"})})(),f.createElement("span",{className:"block truncate pl-2"},e)))))))))))))}function wi({children:e,buttons:t,open:n,close:r,closeOnOverlayClick:a,onSubmit:l,small:s=!1}){return f.createElement(jl,{isOpen:n,close:r,closeOnOverlayClick:a},f.createElement("form",{onSubmit:l,className:"rounded-lg dark:bg-gray-800 w-full relative text-left "+(s?"max-w-sm":"max-w-lg"),onClick:e=>e.stopPropagation()},e,f.createElement("div",{className:"rounded-b-lg dark:bg-gray-750 h-9"}),f.createElement("div",{className:"absolute right-5 bottom-9 transform translate-y-1/2 flex items-center space-x-3 justify-end h-9"},!!t&&(t.type===g.exports.Fragment?t.props.children:[t]).map(((e,t)=>f.createElement("div",{key:t,className:"dark:bg-gray-800 rounded"},e))))))}function Ni({open:e,setOpen:t,server:r}){var a,l;const[s]=La(),[o,{loading:i}]=function(e){const t={...In,...e};return n(na,t)}({update(e,{data:{createServer:t}}){const n=e.readQuery({query:fa});e.writeQuery({query:fa,data:{user:{...n.user,servers:[t,...n.user.servers]}}})}}),[c,{loading:m}]=function(e){const t={...In,...e};return n(ra,t)}(),[d,u]=g.exports.useState(null!=(a=null==r?void 0:r.category)?a:Qn.Other),{handleSubmit:p,register:v,watch:h,reset:b,setValue:E}=Me({shouldUnregister:!0,defaultValues:r?{displayName:r.displayName,description:r.description}:{}}),x=h("avatarFile"),y=h("bannerFile"),w=h("name"),N=h("displayName"),[k,C]=g.exports.useState(!1);g.exports.useEffect((()=>{k||null==N||E("name",N.replace(" ","_").replace(/[^A-Za-z0-9_]/i,""))}),[N]),g.exports.useEffect((()=>{w||C(!1)}),[w]);const[$,U]=g.exports.useState(null==r?void 0:r.avatarUrl),[P,S]=g.exports.useState(null==r?void 0:r.bannerUrl);g.exports.useEffect((()=>{r?(U(r.avatarUrl),S(r.bannerUrl),b(),E("displayName",r.displayName),u(r.category)):(U(null),S(null),b(),u(Qn.Other))}),[r]),g.exports.useEffect((()=>{x&&x[0]&&Lo(x[0]).then((e=>U(e)))}),[x]),g.exports.useEffect((()=>{y&&y[0]&&Lo(y[0]).then((e=>S(e)))}),[y]);const{push:M}=I(),R=(N||"").split(" ").map((e=>e[0])).join("").toUpperCase(),[A,O]=g.exports.useState(!1);return f.createElement(wi,{open:e,close:()=>{t(!1)},closeOnOverlayClick:!0,onSubmit:p((({name:e,displayName:n,description:a,avatarFile:l,bannerFile:s})=>{r?c({variables:{input:{serverId:r.id,displayName:n,description:a,category:d,avatarFile:l?l[0]:null,bannerFile:s?s[0]:null}}}).then((()=>{t(!1)})):o({variables:{input:{name:e,displayName:n,description:a,category:d,avatarFile:l?l[0]:null,bannerFile:s?s[0]:null}}}).then((({data:{createServer:e}})=>{t(!1),M(`/+${e.name}`)}))})),buttons:f.createElement(f.Fragment,null,!!r&&r.owner.id===(null==s?void 0:s.id)&&f.createElement(F,{content:"Delete Planet"},f.createElement("button",{type:"button",onClick:()=>O(!0),className:"form-button-delete"},f.createElement(St,{className:"w-5 h-5 text-primary"}))),r?f.createElement(F,{content:"Save Changes"},f.createElement("button",{type:"submit",className:"form-button-submit",disabled:!N||m||(null==N?void 0:N.length)<2},m?f.createElement(Qa,{className:"w-5 h-5 text-primary"}):f.createElement(ze,{className:"w-5 h-5 text-primary"}))):f.createElement("button",{type:"submit",className:"form-button-submit",disabled:!N||!w||(null==N?void 0:N.length)<2||(null==w?void 0:w.length)<3||i},i?f.createElement(Qa,{className:"w-5 h-5 text-primary"}):f.createElement(ne,{className:"w-5 h-5 text-primary"})))},!!r&&f.createElement(ki,{open:A,setOpen:O,server:r}),f.createElement("input",{type:"file",...v("bannerFile"),className:"hidden",id:"bannerFile",accept:"image/png,image/jpeg,image/webp,image/gif"}),f.createElement("label",{htmlFor:"bannerFile",className:"h-24 block relative rounded-t-lg group cursor-pointer bg-center bg-cover "+(P?"":"bg-gradient-to-br from-red-400 to-indigo-600"),style:P?{backgroundImage:`url(${P})`}:{}},f.createElement("div",{className:"rounded-t-lg absolute inset-0 transition bg-black opacity-0 group-hover:opacity-50 flex items-center justify-center"},f.createElement(Ft,{className:"w-10 h-10"}))),f.createElement("input",{type:"file",...v("avatarFile"),className:"hidden",id:"avatarFile",accept:"image/png,image/jpeg,image/webp,image/gif"}),f.createElement("label",{htmlFor:"avatarFile",className:"flex items-center justify-center cursor-pointer rounded-3xl h-24 w-24 absolute left-3 top-24 transform -translate-y-1/2 dark:bg-gray-700 shadow group bg-center bg-cover",style:$?{backgroundImage:`url(${$})`}:{}},!$&&f.createElement("div",{className:"text-tertiary text-3xl font-medium overflow-hidden"},R),f.createElement("div",{className:"absolute rounded-3xl inset-0 transition bg-black opacity-0 group-hover:opacity-50 flex items-center justify-center"},f.createElement(Ft,{className:"w-10 h-10"}))),f.createElement("div",{className:"pl-30 pr-5 pt-2 text-left"},f.createElement("input",{...v("displayName",{maxLength:100,required:!0}),placeholder:"Display Name",className:"form-input-lg",maxLength:100})),f.createElement("div",{className:"pb-5 space-y-3 pt-3 px-5 text-left"},f.createElement("div",{className:"text-sm text-accent flex items-center pt-3"},f.createElement("span",{className:"h-7 flex items-center"},"joincomet.app/+",null!=(l=null==r?void 0:r.name)?l:""),!r&&f.createElement("input",{...v("name"),placeholder:"Name",className:"bg-transparent h-7 w-full border-b dark:border-gray-700 focus:outline-none transition dark:focus:border-blue-500",onKeyPress:()=>C(!0)})),f.createElement("textarea",{...v("description",{maxLength:500}),placeholder:"Description",className:"form-textarea",maxLength:500}),f.createElement("div",{className:"flex items-center"},f.createElement("div",{className:"text-13 font-medium text-tertiary pr-1.5"},"Category"),f.createElement(yi,{category:d,setCategory:u}))))}function ki({open:e,setOpen:t,server:r}){const[a,l]=g.exports.useState(""),[s,{loading:o}]=function(e){const t={...In,...e};return n(aa,t)}(),{push:i}=I();return f.createElement(jl,{isOpen:e,close:()=>t(!1)},f.createElement("div",{className:"max-w-md w-full rounded-md dark:bg-gray-800 shadow-lg p-4"},f.createElement("div",{className:"text-red-400 text-2xl font-semibold"},"Delete ",r.name),f.createElement("div",{className:"text-secondary pb-5 pt-3 text-base"},"You will not be able to restore this planet."),f.createElement("div",{className:"text-left"},f.createElement("label",{htmlFor:"confirmPassword",className:"label"},"Password"),f.createElement("input",{id:"confirmPassword",name:"confirmPassword",className:"textbox",value:a,onChange:e=>l(e.target.value),type:"password"})),f.createElement("div",{className:"flex items-center justify-end space-x-4 pt-4"},f.createElement("button",{className:"cancel-button",type:"button",onClick:()=>t(!1)},"Cancel"),f.createElement("button",{className:"delete-button",type:"button",disabled:!a||o,onClick:()=>{s({variables:{input:{password:a,serverId:r.id}}}).then((()=>{t(!1),i("/")}))}},"Delete ",r.name,o&&f.createElement(Qa,{className:"w-5 h-5 text-primary ml-3"})))))}function Ci(){const[e,t]=g.exports.useState(!1),{t:n}=k();return f.createElement(f.Fragment,null,f.createElement(bi,{name:n("server.create.title"),onClick:()=>t(!0),className:"dark:bg-gray-800 bg-gray-200 hover:bg-purple-600 dark:hover:bg-purple-600"},f.createElement(Wa,{className:"w-5 h-5 text-purple-500 group-hover:text-white transition"})),f.createElement(Ni,{open:e,setOpen:t}))}function $i(){var e;const{pathname:t}=$(),{t:n}=k(),r=Ha((e=>e.homePage)),a="/explore"!==t&&!t.startsWith("/+"),l=t.startsWith("/explore"),s="Mac OS"===Al()&&window.electron,[o]=La(),{data:i}=Na({variables:{featured:!0}}),c=o?o.servers:null!=(e=null==i?void 0:i.publicServers)?e:[];return f.createElement(f.Fragment,null,f.createElement("div",{className:"flex flex-col items-center min-w-[4.5rem] w-18 bg-white dark:bg-gray-900 overflow-y-auto scrollbar-none"},s&&f.createElement("div",{className:"h-5"}),f.createElement("div",{className:"h-full flex flex-col items-center w-full divide-y dark:divide-gray-800 divide-gray-200"},f.createElement("div",{className:"space-y-2 flex flex-col items-center py-2"},f.createElement(bi,{name:n("home"),to:""+(r?`/${r}`:"/"),active:a,className:""+(a?"bg-blue-600":"dark:bg-gray-800 bg-gray-200 hover:bg-blue-600 dark:hover:bg-blue-600")},f.createElement(Mt,{className:"w-5 h-5 group-hover:text-white transition "+(a?"text-white":"text-blue-500")})),f.createElement(bi,{name:n("explore.title"),to:"/explore",active:l,className:l?"bg-green-600":"dark:bg-gray-800 bg-gray-200 hover:bg-green-600 dark:hover:bg-green-600"},f.createElement(Rt,{className:"w-5 h-5 group-hover:text-white transition "+(l?"text-white":"text-green-500")})),!!o&&f.createElement(Ci,null)),!!c&&c.length>0&&f.createElement("div",{className:"space-y-2 flex flex-col items-center py-2"},c.map((e=>f.createElement(Ui,{server:e,key:e.id})))))))}function Ui({server:e}){var t,n,r;const{pathname:a}=$(),l=P(a,{path:"/:server"}),s=null==(n=null==(t=null==l?void 0:l.params)?void 0:t.server)?void 0:n.substring(1),o=Ha((e=>e.serverPages)),[i]=Ka({server:e,permissions:[Kn.PrivateChannels]}),c=!!(null!=(r=e.channels)?r:[]).filter((e=>e.type!==Pn.Private||i)).find((e=>e.isUnread)),m=s===e.name;return f.createElement(zl,{className:"h-12",data:{type:vl,server:e}},f.createElement(bi,{to:`/+${e.name}${o[e.id]?`/${o[e.id]}`:""}`,name:e.displayName,active:m,unread:c},f.createElement(ns,{server:e,size:12,className:"bg-gray-200 h-12 w-12 dark:bg-gray-800 group-hover:rounded-2xl transition-all "+(m?"rounded-2xl":"rounded-3xl")})))}function Ii({open:e,setOpen:t}){const[r]=La(),[a,l]=g.exports.useState(!1),{register:s,handleSubmit:o,watch:i,reset:c,formState:{errors:m}}=Me({mode:"onChange"}),d=i("password"),u=i("currentPassword"),[p,{loading:v}]=function(e){const t={...In,...e};return n(da,t)}(),[h]=function(e){const t={...In,...e};return n(ua,t)}(),b=()=>{t(!1),setTimeout((()=>c()),300)};return f.createElement(f.Fragment,null,f.createElement(jl,{isOpen:e,close:b},f.createElement("div",{className:"min-w-full h-full min-h-full h-screen dark:bg-gray-800 scrollbar-custom",onClick:e=>e.stopPropagation()},f.createElement("div",{className:"w-full relative flex"},f.createElement("button",{className:"absolute top-3 right-3 focus:outline-none rounded-full transition dark:hover:bg-gray-700 p-2",onClick:b},f.createElement(At,{className:"w-6 h-6 text-tertiary"})),f.createElement("div",{className:"w-1/3 min-w-[14rem] dark:bg-gray-800 flex justify-end px-4 py-12"},f.createElement("div",{className:"w-56"},f.createElement(Bl,null,"User Settings"),f.createElement(Va,null,"My Account"),f.createElement(Va,{onClick:()=>{localStorage.removeItem("token"),location.reload()}},f.createElement("span",{className:"text-red-500"},"Log Out")))),f.createElement("div",{className:"w-2/3 px-10 py-16 dark:bg-gray-750 min-h-screen"},f.createElement("div",{className:"max-w-screen-sm text-left"},f.createElement("div",{className:"font-semibold text-primary uppercase mb-6"},"My Account"),f.createElement("form",{onSubmit:o((({password:e,currentPassword:t})=>{p({variables:{input:{password:e,currentPassword:t}}}).then((()=>{N.success("Saved changes!"),c()}))})),className:"rounded-lg dark:bg-gray-800 p-4"},f.createElement("div",{className:"flex items-center"},f.createElement("input",{type:"file",accept:"image/png,image/jpeg,image/webp,image/gif",name:"avatarFile",id:"avatarFile",hidden:!0,onChange:e=>{const t=e.target.files[0];t&&h({variables:{input:{avatarFile:t}}})}}),f.createElement("label",{htmlFor:"avatarFile",className:"relative group"},f.createElement(ts,{user:r,size:20}),f.createElement("div",{className:"absolute rounded-full cursor-pointer inset-0 bg-black opacity-0 group-hover:opacity-100 bg-opacity-50 z-10 transition flex items-center justify-center"},f.createElement(Ft,{className:"w-1/2 h-1/2"}))),f.createElement("div",{className:"flex items-end ml-6"},f.createElement("div",{className:"font-semibold text-xl text-primary"},r.username))),f.createElement("div",{className:"mt-5 space-y-5"},f.createElement("div",null,f.createElement("label",{htmlFor:"password",className:"label"},"New Password"),f.createElement("input",{className:"textbox",id:"password",...s("password",{minLength:6,required:!0}),type:"password",minLength:6}),m.password&&f.createElement("div",{className:"error"},"Password must be at least 6 characters")),f.createElement("div",null,f.createElement("label",{htmlFor:"currentPassword",className:"label"},"Current Password"),f.createElement("input",{className:"textbox",id:"currentPassword",...s("currentPassword",{required:!0}),type:"password"}))),f.createElement("div",{className:"flex items-center mt-5"},f.createElement("div",{className:"ml-auto"}),f.createElement("button",{type:"submit",disabled:v||!u||!d||(null==d?void 0:d.length)<6,className:"disabled:opacity-50 disabled:cursor-not-allowed rounded px-4 h-9 text-sm text-primary bg-green-600 focus:outline-none flex items-center"},"Save Changes",v&&f.createElement(Qa,{className:"w-5 h-5 text-primary ml-3"})))),f.createElement("div",{className:"mt-10 flex items-center justify-end"},f.createElement("button",{type:"button",onClick:()=>l(!0),className:"delete-button"},"Delete Account")))))),f.createElement(Pi,{deleteOpen:a,setDeleteOpen:l})))}function Pi({deleteOpen:e,setDeleteOpen:t}){const[r,a]=g.exports.useState(""),[l,{loading:s}]=function(e){const t={...In,...e};return n(pa,t)}(),{push:o}=I(),i=S();return f.createElement(jl,{isOpen:e,close:()=>t(!1)},f.createElement("div",{className:"max-w-md w-full rounded-md dark:bg-gray-800 shadow-lg p-4"},f.createElement("div",{className:"text-red-400 text-2xl font-semibold"},"Delete Account"),f.createElement("div",{className:"text-secondary pb-5 pt-3 text-base"},"You will not be able to recover your account."),f.createElement("div",{className:"text-left"},f.createElement("label",{htmlFor:"confirmPassword",className:"label"},"Password"),f.createElement("input",{id:"confirmPassword",name:"confirmPassword",className:"textbox",value:r,onChange:e=>a(e.target.value),type:"password"})),f.createElement("div",{className:"flex items-center justify-end space-x-4 pt-4"},f.createElement("button",{className:"cancel-button",type:"button",onClick:()=>t(!1)},"Cancel"),f.createElement("button",{className:"delete-button",type:"button",disabled:!r||s,onClick:()=>{l({variables:{input:{password:r}}}).then((()=>{t(!1),o("/"),i.resetStore()}))}},"Delete Account",s&&f.createElement(Qa,{className:"w-5 h-5 text-primary ml-3"})))))}function Si(){const[e]=La(),t=[0,14],[r,a]=g.exports.useState(!1),[l,s]=Ha((e=>[e.updateAvailable,e.setUpdateAvailable]));g.exports.useEffect((()=>{window.electron&&window.electron.on("updateAvailable",(()=>{s(!0)}))}),[]),function(e){const t={...In,...e};n(va,t)}(),(()=>{const e=Al()})();const[o,i,c,m]=Nl();return f.createElement(f.Fragment,null,!!e&&f.createElement(Ii,{open:r,setOpen:a}),f.createElement("div",{className:"flex items-center shadow-md px-3 bottom-0 h-5.5 bg-gray-700 z-50"},e?f.createElement(f.Fragment,null,f.createElement(ts,{size:4.5,className:"mr-2",user:e}),f.createElement("div",{className:"text-primary text-13 font-medium cursor-pointer"},e.username),f.createElement("div",{className:"w-2 h-2 rounded-full bg-green-500 ml-2"})):f.createElement("div",{className:"flex items-center text-primary text-13 font-medium"},f.createElement("div",{className:"cursor-pointer hover:underline",onClick:()=>{m(!1),i(!0)}},"Log In"),"  ·  ",f.createElement("div",{className:"cursor-pointer hover:underline",onClick:()=>{m(!0),i(!0)}},"Create account")),f.createElement("div",{className:"ml-auto flex items-center space-x-4 text-primary"},f.createElement(F,{content:""+(window.electron&&l?"Update available":"Up to date!")},f.createElement("div",{className:"flex items-center "+(window.electron&&l?"cursor-pointer":""),onClick:()=>{window.electron&&l&&window.electron.restart()}},f.createElement("div",{className:"text-xs font-medium "+(l&&window.electron?"text-green-500":"text-tertiary")},"v","0.0.68"),window.electron&&l&&f.createElement("div",{className:"pl-2"},f.createElement(Ot,{className:"w-4.5 h-4.5 text-green-500 cursor-pointer"})))),!!e&&f.createElement(f.Fragment,null,f.createElement(F,{content:"Notifications",offset:t},f.createElement(b,{to:"/inbox"},f.createElement(Dt,{className:"w-4.5 h-4.5 cursor-pointer"}))),f.createElement(F,{content:"Settings",offset:t},f.createElement("div",{onClick:()=>a(!0)},f.createElement(Lt,{className:"w-4.5 h-4.5 cursor-pointer"})))))))}function Fi({channel:e,server:t}){const{t:n}=k(),[r]=Ka({server:t,permissions:[Kn.ManageChannels]}),{hash:a}=$(),l=`/+${null==t?void 0:t.name}/#${e.name}`,s=a.substring(1)===e.name,[o,i]=g.exports.useState(!1);return f.createElement(f.Fragment,null,f.createElement(zl,{data:{type:fl,channel:e,server:t,openDelete:()=>i(!0)}},f.createElement(Va,{to:l,active:s},e.isUnread&&!s&&f.createElement("div",{className:"absolute -left-1.5 top-1/2 transform -translate-y-1/2 rounded-r-full dark:bg-gray-100 h-2 w-1"}),f.createElement(Ja,{className:"w-5 h-5 mr-3 text-tertiary"}),f.createElement("span",{className:""+(e.isUnread?"text-primary":"")},e.name),f.createElement("div",{className:"ml-auto"}),!!e.mentionCount&&f.createElement("div",{className:"pr-2"},f.createElement(ro,{count:e.mentionCount})),r&&f.createElement(F,{content:n("channel.edit")},f.createElement("div",{className:"group-hover:visible invisible"},f.createElement(Lt,{className:"w-4 h-4 text-tertiary"}))))),f.createElement(Mi,{open:o,setOpen:i,channel:e,server:t}))}function Mi({server:e,channel:t,open:r,setOpen:a}){const[l,{loading:s}]=function(e){const t={...In,...e};return n(gr,t)}(),{push:o}=I(),{pathname:i,hash:c}=$();return f.createElement(wi,{small:!0,open:r,close:()=>a(!1),buttons:f.createElement(f.Fragment,null,f.createElement("button",{className:"form-button-cancel",onClick:()=>a(!1),type:"button"},"Cancel"),f.createElement("button",{className:"form-button-delete",disabled:s,onClick:()=>{l({variables:{input:{channelId:t.id}},update(t,{data:{deleteChannel:n}}){t.writeQuery({query:$a,variables:{name:e.name},data:{server:{...e,channels:e.channels.filter((e=>e.id!==n))}}})}}).then((()=>{a(!1),i===`/+${e.name}/`&&c===`#${t.name}`&&o(`/+${e.name}`)}))},type:"button"},s?f.createElement(Qa,null):"Delete"))},f.createElement("div",{className:"px-4 pt-4 pb-10"},f.createElement("div",{className:"text-lg font-medium text-secondary"},"Delete ",f.createElement("span",{className:"text-primary"},"#",t.name),"?"),f.createElement("div",{className:"text-tertiary pt-3 text-sm"},"Messages in this channel will be lost.")))}const Ri=e=>y(`\n  h-1.5\n  w-1.5\n  rounded-full\n  dark:bg-gray-100\n  mr-2\n  ${e?"opacity-100":"opacity-0"}\n`),Ai=e=>y(`\n  flex\n  items-center\n  cursor-pointer\n  ${e?"text-primary":"text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}\n`);function Oi({open:e,setOpen:t,server:r}){const{handleSubmit:a,register:l,setValue:s,watch:o,reset:i}=Me({mode:"onChange"}),c=o("name");g.exports.useEffect((()=>{c&&s("name",c.toLowerCase().replace(" ","-").replace(/[^a-z0-9-_]+/,""))}),[c]);const[m,d]=g.exports.useState(Pn.Public),{push:u}=I(),[p,{loading:v}]=function(e){const t={...In,...e};return n(pr,t)}({update(e,{data:{createChannel:t}}){e.writeQuery({query:$a,variables:{name:r.name},data:{server:{...r,channels:[...r.channels,t]}}})}}),h=()=>{t(!1)},b=!!c&&r.channels.map((e=>e.name)).includes(c);return f.createElement(wi,{onSubmit:a((({name:e,description:t})=>{p({variables:{input:{name:e,description:t,serverId:r.id,type:m}}}).then((({data:{createChannel:e}})=>{h(),u(`/+${r.name}/#${e.name}`),i(),d(Pn.Public)}))})),open:e,close:h,closeOnOverlayClick:!0,buttons:f.createElement("button",{type:"submit",className:"form-button-submit",disabled:!c||b||v},v?f.createElement(Qa,{className:"w-5 h-5"}):f.createElement(ze,{className:"w-5 h-5"}))},f.createElement("div",{className:"p-5 space-y-4 w-full text-left"},f.createElement("div",{className:"flex items-center font-semibold text-primary"},f.createElement(ns,{server:r,size:6,className:"rounded-md mr-2"}),f.createElement("div",{className:"truncate"},r.displayName),"  ·  Create Channel",f.createElement(Le,{className:"h-5 w-5 highlightable ml-auto",onClick:()=>h()})),f.createElement("div",null,f.createElement("div",{className:"relative"},f.createElement("input",{...l("name",{required:!0,maxLength:100}),maxLength:100,className:"form-input-icon",spellCheck:!1,autoCapitalize:"none",id:"name",placeholder:"Channel name"}),f.createElement(Ja,{className:"form-input-icon-icon"})),b&&f.createElement("div",{className:"form-error"},"Channel already exists")),f.createElement("textarea",{placeholder:"Description",...l("description"),className:"form-textarea"}),f.createElement("div",{className:"flex items-center space-x-4 text-sm text-tertiary"},f.createElement(F,{content:"Anyone can view and send messages"},f.createElement("div",{onClick:()=>d(Pn.Public),className:Ai(m===Pn.Public)},f.createElement("div",{className:Ri(m===Pn.Public)}),"Public")),f.createElement(F,{content:"Anyone can view, but only members with permission can send messages"},f.createElement("div",{onClick:()=>d(Pn.Restricted),className:Ai(m===Pn.Restricted)},f.createElement("div",{className:Ri(m===Pn.Restricted)}),"Restricted")),f.createElement(F,{content:"Only members with permission can view and send messages"},f.createElement("div",{onClick:()=>d(Pn.Private),className:Ai(m===Pn.Private)},f.createElement("div",{className:Ri(m===Pn.Private)}),"Private")))))}function Di({server:e}){const{t:t}=k(),[n,r]=g.exports.useState(!1),[a]=Ka({server:e,permissions:[Kn.ManageChannels]});return a?f.createElement(f.Fragment,null,f.createElement(Bl,{onClick:()=>r(!0),plusLabel:t("channel.create")},"Channels"),f.createElement(Oi,{open:n,setOpen:r,server:e})):f.createElement(Bl,null,"Channels")}function Li({server:e}){const[t]=La(),[r,a]=g.exports.useState(!1),[l,s]=Ka({server:e,permissions:[Kn.ManageServer,Kn.PrivateChannels]}),[o,{loading:i}]=function(e){const t={...In,...e};return n(la,t)}(),[c,{loading:m}]=oa(),d=mo(null==e?void 0:e.category);return e?f.createElement(f.Fragment,null,f.createElement(Ni,{open:r,setOpen:a,server:e}),f.createElement(za,null,e.bannerUrl?f.createElement("div",{className:"h-20 relative bg-center bg-cover bg-no-repeat "+(e.bannerUrl?"":"bg-gradient-to-br from-red-400 to-indigo-600"),style:e.bannerUrl?{backgroundImage:`url(${e.bannerUrl})`}:{}}):f.createElement("div",{className:"h-12 border-b dark:border-gray-850 shadow flex items-center px-5 text-base font-medium"},f.createElement(uo,{className:"h-4"})),f.createElement("div",{className:"px-1.5 pt-4"},f.createElement("div",{className:"shadow-inner dark:bg-gray-850 p-2.5 space-y-2.5 rounded"},f.createElement("div",{className:"flex items-center"},f.createElement(ns,{server:e,size:6,className:"rounded-md mr-2 dark:bg-gray-750"}),f.createElement("div",{className:"font-semibold text-primary pr-2.5 truncate"},e.displayName),!!t&&t.id!==e.owner.id&&f.createElement("button",{className:(u=e.isJoined,p=i||m,y(`\n  ml-auto\n  px-3\n  h-6\n  rounded\n  text-13\n  font-medium\n  focus:outline-none\n  ${u?"border border-gray-700 text-blue-500":"bg-blue-500 text-primary"}\n  ${p?"opacity-50":"opacity-100"}\n`)),type:"button",onClick:()=>{i||m||(e.isJoined?c({variables:{input:{serverId:e.id}}}):o({variables:{input:{serverId:e.id}}}))}},e.isJoined?"Leave":"Join")),f.createElement("div",{className:"text-13 text-secondary pb-1.5"},e.description||"No description"),f.createElement("div",{className:"flex items-center justify-between"},f.createElement("div",{className:"text-xs font-medium flex items-center text-tertiary"},f.createElement(tt,{className:"w-4 h-4 mr-2.5"}),e.userCount," Member",1===e.userCount?"":"s"),f.createElement("div",{className:"text-xs font-medium flex items-center text-tertiary"},f.createElement(d,{className:"w-4 h-4 mr-2.5"}),e.category))),f.createElement(Bl,{plusLabel:"Create Post"},"Posts"),f.createElement(pi,null),f.createElement(Di,{server:e}),f.createElement("div",{className:"space-y-0.5"},e.channels.filter((e=>e.type!==Pn.Private||s)).map((t=>f.createElement(Fi,{key:t.id,channel:t,server:e})))),l&&f.createElement(f.Fragment,null,f.createElement(Bl,null,"Admin"),f.createElement("div",{className:"space-y-0.5"},f.createElement(Va,{onClick:()=>a(!0)},f.createElement(Lt,{className:"mr-3 w-5 h-5"}),"Edit Planet"),f.createElement(Va,null,f.createElement(Tt,{className:"mr-3 w-5 h-5"}),"Manage Roles")))))):null;var u,p}function Ti({channel:e}){var t;return f.createElement(Gl,{showDivider:!!(null==e?void 0:e.description),icon:f.createElement(Ja,{className:"w-5 h-5"}),title:`${null!=(t=null==e?void 0:e.name)?t:""}`},(null==e?void 0:e.description)&&f.createElement("div",{className:"text-13 text-tertiary font-medium leading-5 truncate"},"Description"),f.createElement("div",{className:"ml-auto pl-6 flex items-center space-x-5"},f.createElement(ci,null)))}function qi({server:e,channel:t}){var r;Qo(`channel/${null==t?void 0:t.id}`);const{data:a}=Ia({variables:{serverId:null==e?void 0:e.id},skip:!e,fetchPolicy:"cache-and-network"}),l=null!=(r=null==a?void 0:a.serverUsers)?r:[],[s]=function(e){const t={...In,...e};return n(vr,t)}(),[o]=La();return g.exports.useEffect((()=>{o&&t&&t.isUnread&&s({variables:{input:{channelId:t.id}},optimisticResponse:{readChannel:{...t,isUnread:!1}}})}),[t,o]),f.createElement($s,{header:f.createElement(Ti,{channel:t}),rightSidebar:f.createElement(Ko,{channel:t,serverUsers:l,server:e})},f.createElement(Te,null,f.createElement("title",null,`#${null==t?void 0:t.name} – ${null==e?void 0:e.displayName}`)),!!t&&f.createElement(Yo,{server:e,channel:t,users:l.map((e=>e.user))}))}const zi=()=>{var e,t,n,a;const[l]=La(),{push:s}=I(),{pathname:o,hash:i}=$(),c=P(o,{path:"/:server"}),m=null==(e=null==c?void 0:c.params)?void 0:e.server,d=m&&i?i.substring(1):null,u=P(o,{path:"/dm/:username"}),p=null==(n=null==(t=null==u?void 0:u.params)?void 0:t.username)?void 0:n.substring(1),v=P(o,{path:"/group/:groupId"}),h=null==(a=null==v?void 0:v.params)?void 0:a.groupId,[f,b]=g.exports.useState(!0);g.exports.useEffect((()=>{window.electron&&(window.electron.on("windowOpened",(()=>b(!0))),window.electron.on("windowClosed",(()=>b(!1))))}),[]),function(e){const t={...In,...e};r(Fa,t)}({skip:!l,onSubscriptionData({client:e,subscriptionData:t}){var n,r,a,o,i;if(t.data){const c=t.data.messageChanged,u=null==c?void 0:c.added,g=null==c?void 0:c.deleted;let v;if(u){v=u;const t=null==(n=v.channel)?void 0:n.id,c=null==(r=v.group)?void 0:r.id,g=v.toUser?null==(a=v.author)?void 0:a.id:void 0,b={query:Ea,variables:{userId:g,groupId:c,channelId:t,cursor:null}},E=e.cache.readQuery(b);if(E&&!E.messages.messages.map((e=>e.id)).includes(v.id)&&e.cache.writeQuery({...b,data:{messages:{...E.messages,messages:[...E.messages.messages,v]}}}),v.author.id!==l.id){if((!window.electron||window.electron&&f)&&(h&&v.group&&h===v.group.id||p&&v.toUser&&p===v.toUser.username||d&&v.channel&&v.channel.server.name===m&&d===v.channel.name))return;if(v.type===Ln.Normal&&v.text&&(v.toUser||v.group||v.isEveryoneMentioned||l&&v.mentionedUsers.map((e=>e.id)).includes(l.id))){let e=`@${v.author.username}`;v.channel&&(e+=` · #${v.channel.name}`),v.group&&(e+=` · #${v.group.displayName}`),Qs({title:e,body:v.text,icon:null!=(o=v.author.avatarUrl)?o:(window.electron?".":"")+"/icons/icon.png",timestamp:v.createdAt,onClick:()=>{g?s(`/dm/@${v.author.username}`):c?s(`/group/${c}`):t&&s(`/+${v.server.name}/#${v.channel.name}`),window.electron&&window.electron.show()}})}else v.type===Ln.FriendRequestReceived&&Qs({title:`@${v.author.username}`,body:"Sent a friend request",icon:null!=(i=v.author.avatarUrl)?i:(window.electron?".":"")+"/icons/icon.png",timestamp:v.createdAt,onClick:()=>{s("/friends"),window.electron&&window.electron.show()}})}}else g&&(v=g)}}})},Hi="\\+[A-Za-z0-9_]+";function Bi(){var e,t;zi();const{pathname:n}=$(),r=P(n,{path:"/dm/:username"}),a=null==(t=null==(e=null==r?void 0:r.params)?void 0:e.username)?void 0:t.substring(1);return f.createElement(qt,null,f.createElement(zt,{path:"/"},f.createElement(qt,null,f.createElement(zt,{path:["/","/friends","/inbox","/dm/:username(@[A-Za-z0-9-_]+)",`/:server(${Hi})`,`/:server(${Hi})/post/:postId`,`/:server(${Hi})/post/:postId/:slug`,"/explore"],exact:!0},f.createElement("div",{className:"flex-grow"},f.createElement("div",{className:"flex h-full",style:{height:"calc(100% - 1.375rem)"}},f.createElement($i,null),f.createElement(zt,{path:"/explore"},f.createElement(fo,null)),f.createElement(zt,{path:`/:server(${Hi})`},f.createElement(ji,null)),f.createElement(zt,{exact:!0,path:["/","/friends","/inbox","/dm/:username(@[A-Za-z0-9-_]+)"]},f.createElement(gi,null),f.createElement(zt,{path:"/",exact:!0},f.createElement(Zs,null)),f.createElement(zt,{path:"/friends"},f.createElement(co,null)),f.createElement(zt,{path:"/inbox"},f.createElement(No,null)),f.createElement(zt,{path:"/dm/:username(@[A-Za-z0-9-_]+)"},f.createElement(Wo,{username:a})))),f.createElement(Si,null))),f.createElement(zt,null,f.createElement(qa,null)))))}function ji(){var e,n;const{server:r}=$t(),a=r.substring(1),{data:l}=function(e){const n={...In,...e};return t($a,n)}({variables:{name:a},fetchPolicy:"cache-and-network"}),s=null==l?void 0:l.server,{hash:o,pathname:i}=$(),c=o.substring(1),m=(null!=(e=null==s?void 0:s.channels)?e:[]).find((e=>e.name===c)),d=P(i,{path:"/:server/post/:postId"}),u=null==(n=null==d?void 0:d.params)?void 0:n.postId;return f.createElement(f.Fragment,null,f.createElement(Li,{server:s}),f.createElement(zt,{path:`/:server(${Hi})`,exact:!0,render:({location:e})=>e.hash?f.createElement(qi,{server:s,channel:m}):f.createElement(Zo,{server:s})}),f.createElement(zt,{path:[`/:server(${Hi})/post/:postId`,`/:server(${Hi})/post/:postId/:slug`]},f.createElement(di,{server:s,postId:u})))}function _i(){return Ht("(min-width: 1024px)"),f.createElement(Bt,{position:"bottom-center",toastOptions:{className:"toast",success:{className:"toast",iconTheme:{primary:"#059669"}},error:{className:"toast",iconTheme:{primary:"#EF4444"}}}})}function Vi({post:e,show:t}){const n=e?e.title.split(" "):[],r=`${n.slice(0,9).join(" ")}${n.length>=9?"...":""}`;return f.createElement("div",null,f.createElement(jt,null,t&&f.createElement(_.div,{initial:{scale:.75,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.75,opacity:0},transition:{duration:.15,ease:"easeInOut"},className:"bg-blue-500 bg-opacity-75 truncate w-64 rounded-md shadow-lg text-white text-sm font-medium h-10 px-2 flex items-center"},f.createElement("div",{className:"truncate"},r))))}const Gi={position:"fixed",pointerEvents:"none",zIndex:100,left:0,top:0};function Yi(e,t,n,r){e||(e={x:0,y:0});let a=n.x-e.x,l=n.y-e.y,{x:s,y:o}=t||{x:r.x-e.x,y:r.y-e.y};const i=`translate(${s+a}px, ${o+l}px)`;return{transform:i,WebkitTransform:i}}var Wi=g.exports.memo((function(){const[e,t]=g.exports.useState({x:0,y:0}),[n,r]=g.exports.useState({x:0,y:0}),a=e=>t({x:e.clientX,y:e.clientY}),l=e=>t({x:e.clientX,y:e.clientY});g.exports.useEffect((()=>(window.addEventListener("mousedown",a),window.addEventListener("mouseup",l),()=>{window.removeEventListener("mousedown",a),window.removeEventListener("mouseup",l)})));const{itemType:s,isDragging:o,item:i,initialOffset:c,currentOffset:m}=_t((e=>({item:e.getItem(),itemType:e.getItemType(),initialOffset:e.getInitialSourceClientOffset(),currentOffset:e.getSourceClientOffset(),isDragging:e.isDragging()})));return f.createElement("div",{style:Gi},f.createElement("div",{style:Yi(c,m,e,n)},s===Ba&&f.createElement(Vi,{post:i,show:o})))}));const Qi="_window-button_19ru1_11",Ji="_window-button-icon_19ru1_18";function Ki(){const{close:e,minimize:t,maximize:n,unmaximize:r,isMaximized:a}=window.electron,[l,s]=g.exports.useState(a()),o=()=>s(a());return f.createElement("header",{className:"_titlebar_19ru1_1"},f.createElement(uo,{className:"h-3 text-tertiary"}),f.createElement("div",{className:"_window-controls_19ru1_6"},f.createElement("div",{className:`${Qi} flex`,onClick:()=>{t(),o()}},f.createElement("img",{className:`${Ji} hidden dark:block`,srcSet:"./icons/titlebar/min-w-10.png 1x, ./icons/titlebar/min-w-12.png 1.25x, ./icons/titlebar/min-w-15.png 1.5x, ./icons/titlebar/min-w-15.png 1.75x, ./icons/titlebar/min-w-20.png 2x, ./icons/titlebar/min-w-20.png 2.25x, ./icons/titlebar/min-w-24.png 2.5x, ./icons/titlebar/min-w-30.png 3x, ./icons/titlebar/min-w-30.png 3.5x",draggable:"false"}),f.createElement("img",{className:`${Ji} block dark:hidden`,srcSet:"./icons/titlebar/min-k-10.png 1x, ./icons/titlebar/min-k-12.png 1.25x, ./icons/titlebar/min-k-15.png 1.5x, ./icons/titlebar/min-k-15.png 1.75x, ./icons/titlebar/min-k-20.png 2x, ./icons/titlebar/min-k-20.png 2.25x, ./icons/titlebar/min-k-24.png 2.5x, ./icons/titlebar/min-k-30.png 3x, ./icons/titlebar/min-k-30.png 3.5x",draggable:"false"})),f.createElement("div",{className:`${Qi} ${l?"hidden":"flex"}`,onClick:()=>{n(),o()}},f.createElement("img",{className:`${Ji} hidden dark:block`,srcSet:"./icons/titlebar/max-w-10.png 1x, ./icons/titlebar/max-w-12.png 1.25x, ./icons/titlebar/max-w-15.png 1.5x, ./icons/titlebar/max-w-15.png 1.75x, ./icons/titlebar/max-w-20.png 2x, ./icons/titlebar/max-w-20.png 2.25x, ./icons/titlebar/max-w-24.png 2.5x, ./icons/titlebar/max-w-30.png 3x, ./icons/titlebar/max-w-30.png 3.5x",draggable:"false"}),f.createElement("img",{className:`${Ji} block dark:hidden`,srcSet:"./icons/titlebar/max-k-10.png 1x, ./icons/titlebar/max-k-12.png 1.25x, ./icons/titlebar/max-k-15.png 1.5x, ./icons/titlebar/max-k-15.png 1.75x, ./icons/titlebar/max-k-20.png 2x, ./icons/titlebar/max-k-20.png 2.25x, ./icons/titlebar/max-k-24.png 2.5x, ./icons/titlebar/max-k-30.png 3x, ./icons/titlebar/max-k-30.png 3.5x",draggable:"false"})),f.createElement("div",{className:`${Qi} ${l?"flex":"hidden"}`,onClick:()=>{r(),o()}},f.createElement("img",{className:`${Ji} hidden dark:block`,srcSet:"./icons/titlebar/restore-w-10.png 1x, ./icons/titlebar/restore-w-12.png 1.25x, ./icons/titlebar/restore-w-15.png 1.5x, ./icons/titlebar/restore-w-15.png 1.75x, ./icons/titlebar/restore-w-20.png 2x, ./icons/titlebar/restore-w-20.png 2.25x, ./icons/titlebar/restore-w-24.png 2.5x, ./icons/titlebar/restore-w-30.png 3x, ./icons/titlebar/restore-w-30.png 3.5x",draggable:"false"}),f.createElement("img",{className:`${Ji} block dark:hidden`,srcSet:"./icons/titlebar/restore-k-10.png 1x, ./icons/titlebar/restore-k-12.png 1.25x, ./icons/titlebar/restore-k-15.png 1.5x, ./icons/titlebar/restore-k-15.png 1.75x, ./icons/titlebar/restore-k-20.png 2x, ./icons/titlebar/restore-k-20.png 2.25x, ./icons/titlebar/restore-k-24.png 2.5x, ./icons/titlebar/restore-k-30.png 3x, ./icons/titlebar/restore-k-30.png 3.5x",draggable:"false"})),f.createElement("div",{className:`${Qi} _close-button_19ru1_32 flex`,onClick:()=>{e(),o()}},f.createElement("img",{className:`${Ji} hidden dark:block`,srcSet:"./icons/titlebar/close-w-10.png 1x, ./icons/titlebar/close-w-12.png 1.25x, ./icons/titlebar/close-w-15.png 1.5x, ./icons/titlebar/close-w-15.png 1.75x, ./icons/titlebar/close-w-20.png 2x, ./icons/titlebar/close-w-20.png 2.25x, ./icons/titlebar/close-w-24.png 2.5x, ./icons/titlebar/close-w-30.png 3x, ./icons/titlebar/close-w-30.png 3.5x",draggable:"false"}),f.createElement("img",{className:`${Ji} block dark:hidden`,srcSet:"./icons/titlebar/close-k-10.png 1x, ./icons/titlebar/close-k-12.png 1.25x, ./icons/titlebar/close-k-15.png 1.5x, ./icons/titlebar/close-k-15.png 1.75x, ./icons/titlebar/close-k-20.png 2x, ./icons/titlebar/close-k-20.png 2.25x, ./icons/titlebar/close-k-24.png 2.5x, ./icons/titlebar/close-k-30.png 3x, ./icons/titlebar/close-k-30.png 3.5x",draggable:"false"}))))}const{hasOwnProperty:Zi}=Object.prototype;const Xi=(e,t)=>{let n;try{n=JSON.stringify(e)}catch(r){const e=new Gt(`Network request failed. ${t} is not serializable: ${r.message}`);throw e.parseError=r,e}return n};function ec(e,t,n){e.append(t,n,n.name)}const tc=(e={})=>{let{uri:t="/graphql",fetch:n,includeExtensions:r,useGETForQueries:a,isExtractableFile:l=Jt,formDataAppendFile:s=ec,...i}=e;Kt(n),n||(n=fetch);const c={http:{includeExtensions:r},options:i.fetchOptions,credentials:i.credentials,headers:i.headers};return new o((e=>{let r=Yt(e,t);const o=e.getContext(),i={};if(o.clientAwareness){const{name:e,version:t}=o.clientAwareness;e&&(i["apollographql-client-name"]=e),t&&(i["apollographql-client-version"]=t)}const m={...i,...o.headers},u={http:o.http,options:o.fetchOptions,credentials:o.credentials,headers:m},{options:g,body:v}=((e,t,...n)=>{let r={...t.options,headers:t.headers,credentials:t.credentials},a=t.http||{};n.forEach((e=>{r={...r,...e.options,headers:{...r.headers,...e.headers}},e.credentials&&(r.credentials=e.credentials),a={...a,...e.http}}));const{operationName:l,extensions:s,variables:o,query:i}=e,c={operationName:l,variables:o};return a.includeExtensions&&(c.extensions=s),a.includeQuery&&(c.query=p(i)),{options:r,body:c}})(e,Zt,c,u),{clone:h,files:f}=Wt(v,"",l),b=Xi(h,"Payload");let E;if(!g.signal){const{controller:e,signal:t}=(()=>{if("undefined"==typeof AbortController)return{controller:!1,signal:!1};const e=new AbortController;return{controller:e,signal:e.signal}})();E=e,E&&(g.signal=t)}if(a&&!e.query.definitions.some((e=>"OperationDefinition"===e.kind&&"mutation"===e.operation))&&(g.method="GET"),"GET"===g.method){const{newURI:e,parseError:t}=function(e,n){const r=[],a=(e,t)=>{r.push(`${e}=${encodeURIComponent(t)}`)};if("query"in n&&a("query",n.query),n.operationName&&a("operationName",n.operationName),n.variables){let e;try{e=Xi(n.variables,"Variables map")}catch(t){return{parseError:t}}a("variables",e)}if(n.extensions){let e;try{e=Xi(n.extensions,"Extensions map")}catch(t){return{parseError:t}}a("extensions",e)}let l="",s=e;const o=e.indexOf("#");-1!==o&&(l=e.substr(o),s=e.substr(0,o));const i=-1===s.indexOf("?")?"?":"&";return{newURI:s+i+r.join("&")+l}}(r,v);if(t)return Qt(t);r=e}else if(f.size){delete g.headers["content-type"];const e=new FormData;e.append("operations",b);const t={};let n=0;f.forEach((e=>{t[++n]=e})),e.append("map",JSON.stringify(t)),n=0,f.forEach(((t,r)=>{s(e,++n,r)})),g.body=e}else try{g.body=Xi(v,"Payload")}catch(x){return Qt(x)}return new d((t=>{var a;return n(r,g).then((t=>(e.setContext({response:t}),t))).then((a=e,e=>e.text().then((t=>{try{return JSON.parse(t)}catch(n){const r=n;throw r.name="ServerParseError",r.response=e,r.statusCode=e.status,r.bodyText=t,r}})).then((t=>(e.status>=300&&Vt(e,t,`Response not successful: Received status code ${e.status}`),Array.isArray(t)||Zi.call(t,"data")||Zi.call(t,"errors")||Vt(e,t,`Server response was missing for query '${Array.isArray(a)?a.map((e=>e.operationName)):a.operationName}'.`),t))))).then((e=>(t.next(e),t.complete(),e))).catch((e=>{"AbortError"!==e.name&&(e.result&&e.result.errors&&e.result.data&&t.next(e.result),t.error(e))})),()=>{E&&E.abort()}}))}))};const nc=ln((({graphQLErrors:e,networkError:t})=>{e&&e.map((({message:e,locations:t,path:n})=>{console.log(`[GraphQL error]: Message: ${e}, Location: ${t}, Path: ${n}`),"Access denied! You need to be authorized to perform this action!"!==e&&N.error(a.t(e))})),t&&(console.log(`[Network error]: ${t}`),N.error(t.message))})),rc=new class extends o{constructor(e={}){super(tc(e).request),this.options=e}}({uri:"https://api.joincomet.app/graphql",headers:{token:localStorage.getItem("token")}}),ac=sn(((e,{headers:t})=>{const n=localStorage.getItem("token");return{headers:n?{...t,token:n}:t}})),lc=new class extends o{constructor(){super(),this.client=i({url:"wss://api.joincomet.app/graphql",lazy:!1,connectionParams:()=>{const e=localStorage.getItem("token");return e?{token:e}:{}},on:{connected:()=>{Aa.status="connected"},error:()=>{Aa.status="error"},closed:()=>{Aa.status="closed"},connecting:()=>{Aa.status="connecting"}}})}wsFetcher(e){return c((t=>this.client.subscribe(e,t)))}request(e){const t=m();return new d((n=>u(t(this.wsFetcher({operationName:e.operationName,query:p(e.query),variables:e.variables})),n)))}},sc=new rn({link:nn([nc,(new Xt).split((({query:e})=>{const t=en(e);return"OperationDefinition"===t.kind&&("subscription"===t.operation||tn(t))}),lc,ac.concat(rc))]),cache:new an({typePolicies:{User:{fields:{servers:{merge:!1},folders:{merge:!1}}},Server:{fields:{channels:{merge:!1},folders:{merge:!1},owner:{merge:!0},permissions:{merge:!1},roles:{merge:!1}}},Post:{fields:{author:{merge:!0},serverUser:{merge:!0},server:{merge:!0}}},Comment:{fields:{author:{merge:!0},serverUser:{merge:!0}}},Message:{fields:{author:{merge:!0},serverUser:{merge:!0}}},Query:{fields:{serverUsers:{merge:!1}}}}})});var oc="_meteor-1_1pj33_1",ic="_meteor-2_1pj33_24",cc="_meteor-3_1pj33_47",mc="_meteor-4_1pj33_70",dc="_meteor-5_1pj33_93",uc="_meteor-6_1pj33_116",pc="_meteor-7_1pj33_139";function gc(){return f.createElement(f.Fragment,null,f.createElement("div",{className:oc}),f.createElement("div",{className:ic}),f.createElement("div",{className:cc}),f.createElement("div",{className:mc}),f.createElement("div",{className:dc}),f.createElement("div",{className:uc}),f.createElement("div",{className:pc}))}function vc(){return f.createElement("div",{className:"relative h-full w-full dark:bg-gray-750 flex flex-col items-center justify-center md:hidden p-6 text-center"},f.createElement(gc,null),f.createElement("div",{className:"z-10 flex flex-col items-center"},f.createElement(uo,{className:"w-48"}),f.createElement("img",{alt:"astronaut",src:"/astronaut.png",className:"object-contain opacity-75 h-48 animate-float mt-5"}),f.createElement("div",{className:"pt-5 font-medium text-primary text-lg"},"Support for mobile devices is coming soon!"),f.createElement("div",{className:"text-tertiary text-base pt-2 font-medium"},"Please visit"," ",f.createElement(b,{to:"/",className:"text-accent hover:underline"},"joincomet.app")," ","from a laptop or desktop computer."),f.createElement("div",{className:"text-tertiary text-base pt-5 font-medium"},"Stay updated:"),f.createElement("div",{className:"space-y-4 text-tertiary text-sm font-medium pt-5"},f.createElement("a",{href:"https://discord.gg/NPCMGSm",target:"_blank",rel:"noopener noreferrer",className:"flex items-center"},f.createElement(on,{className:"h-6 w-6 mr-4 text-tertiary"}),"Discord"),f.createElement("a",{href:"https://github.com/joincomet/comet",target:"_blank",rel:"noopener noreferrer",className:"flex items-center"},f.createElement(cn,{className:"h-6 w-6 mr-4 text-tertiary"}),"GitHub"),f.createElement("a",{href:"https://twitter.com/joincometapp",target:"_blank",rel:"noopener noreferrer",className:"flex items-center"},f.createElement(mn,{className:"h-6 w-6 mr-4 text-tertiary"}),"Twitter"))))}const hc=y("\n  highlightable\n  absolute\n  right-1.5\n  top-1/2\n  transform\n  -translate-y-1/2\n"),fc=/^[A-Za-z0-9-_]+$/gi;function bc(){var e,t,r,a;const[l,s,o,i]=Nl(),[c,m]=g.exports.useState(!1),{handleSubmit:d,register:u,watch:p,reset:v,getValues:h,formState:{errors:b}}=Me({mode:"onChange",shouldUnregister:!0}),E=p("email"),x=p("username"),y=p("usernameOrEmail"),w=p("password"),N=p("confirmPassword"),[k,{loading:C}]=function(e){const t={...In,...e};return n(ma,t)}(),[$,{loading:U}]=function(e){const t={...In,...e};return n(ga,t)}();S();const I=()=>{v(),s(!1)},P=!(o?x&&x.length>=3&&x.length<=20&&fc.test(x)&&(!E||E&&dn(E))&&w&&w.length>=6&&N&&N===w:y&&w);return f.createElement(wi,{close:I,open:l,onSubmit:d((({usernameOrEmail:e,email:t,username:n,password:r})=>{if(o)k({variables:{input:{username:n,password:r,email:t||null}}}).then((({data:{createAccount:{accessToken:e,user:t}}})=>{localStorage.setItem("token",e),location.reload()}));else{const t=dn(e)?{email:e}:{username:e};$({variables:{input:{...t,password:r}}}).then((({data:{login:{accessToken:e,user:t}}})=>{localStorage.setItem("token",e),location.reload()}))}})),buttons:f.createElement("button",{type:"submit",className:"form-button-submit",disabled:P},o&&C||!o&&U?f.createElement(Qa,{className:"w-5 h-5"}):f.createElement(ne,{className:"w-5 h-5"}))},f.createElement("div",{className:"rounded-t-lg bg-gradient-to-r from-red-400 to-indigo-600 h-2"}),f.createElement("div",{className:"px-5 pt-2 pb-9 text-left"},f.createElement("div",{className:"pb-4 flex items-center"},f.createElement("div",{onClick:()=>{o&&(i(!1),v())},className:"text-sm cursor-pointer mr-3 py-3 border-b-2 inline-flex items-center justify-center px-3 "+(o?"border-transparent text-secondary":"dark:border-gray-300 text-primary")},"Log In"),f.createElement("div",{onClick:()=>{o||(i(!0),v())},className:"text-sm cursor-pointer py-3 border-b-2 inline-flex items-center justify-center px-3 "+(o?"dark:border-gray-300 text-primary":"border-transparent text-secondary")},"Create Account"),f.createElement("div",{className:"ml-auto"},f.createElement(uo,{className:"h-3.5 text-secondary"})),f.createElement(Le,{className:"ml-5 w-5 h-5 text-tertiary highlightable",onClick:()=>I()})),f.createElement("div",{className:"space-y-4"},o?f.createElement(f.Fragment,null,f.createElement("div",null,f.createElement("div",{className:"relative"},f.createElement("input",{id:"username",...u("username",{required:!0,pattern:fc,maxLength:20,minLength:3}),className:"form-input-icon",placeholder:"Username",minLength:3,maxLength:20}),f.createElement(H,{className:"form-input-icon-icon"})),"minLength"===(null==(e=b.username)?void 0:e.type)&&f.createElement("div",{className:"form-error"},"Username must be between 3 and 20 characters"),"pattern"===(null==(t=b.username)?void 0:t.type)&&f.createElement("div",{className:"form-error"},"Letters, numbers, dashes, and underscores only")),f.createElement("div",null,f.createElement("div",{className:"relative"},f.createElement("input",{id:"email",...u("email",{validate:{email:e=>!e||dn(e)||"Invalid email"}}),className:"form-input-icon",placeholder:"Email (Optional)",type:"email"}),f.createElement(un,{className:"form-input-icon-icon"})),"email"===(null==(r=b.email)?void 0:r.type)&&f.createElement("div",{className:"form-error"},b.email.message))):f.createElement("input",{id:"usernameOrEmail",...u("usernameOrEmail",{shouldUnregister:!0}),className:"form-input",placeholder:"Username or email"}),o?f.createElement(f.Fragment,null,f.createElement("div",null,f.createElement("div",{className:"relative"},f.createElement("input",{id:"password",...u("password",{required:!0,minLength:6}),className:"form-input",placeholder:"Password",type:c?"text":"password",minLength:6}),f.createElement(Ec,{showPassword:c,setShowPassword:m})),"minLength"===(null==(a=b.password)?void 0:a.type)&&f.createElement("div",{className:"form-error"},"Password must be at least 6 characters")),f.createElement("div",null,f.createElement("div",{className:"relative"},f.createElement("input",{id:"confirmPassword",...u("confirmPassword",{required:!0,validate:{matchesPreviousPassword:e=>{const{password:t}=h();return t===e||"Passwords do not match"}}}),className:"form-input",placeholder:"Confirm Password",type:c?"text":"password"}),f.createElement(Ec,{showPassword:c,setShowPassword:m})),!!w&&!!N&&w!==N&&f.createElement("div",{className:"form-error"},"Passwords do not match"))):f.createElement("div",{className:"relative"},f.createElement("input",{id:"password",...u("password",{required:!0}),className:"form-input",placeholder:"Password",type:c?"text":"password"}),f.createElement(Ec,{showPassword:c,setShowPassword:m})))))}function Ec({showPassword:e,setShowPassword:t}){return f.createElement(F,{content:e?"Hide Password":"Show Password"},f.createElement("div",{className:hc},e?f.createElement(pn,{onClick:()=>t(!1),className:"w-5 h-5"}):f.createElement(gn,{onClick:()=>t(!0),className:"w-5 h-5"})))}const xc=e=>y(`\n  h-full\n  cursor-pointer\n  select-none\n  focus:outline-none\n  text-13\n  border-b-4\n  flex\n  items-center\n  box-content\n  ${e?"text-gray-900 dark:text-gray-100 dark:border-white":"text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 border-transparent"}\n`),yc=e=>y(`\n  px-4\n  h-8\n  flex\n  items-center\n  rounded\n  ${e?"bg-green-600":"bg-gray-500"}\n  disabled:opacity-50\n  disabled:cursor-not-allowed\n  text-primary\n  select-none\n  cursor-pointer\n  text-13\n  focus:outline-none\n`),wc=y("\n  flex\n  w-full\n  items-center\n  dark:hover:bg-gray-725\n  px-2\n  py-1\n  h-12\n  rounded\n  cursor-pointer\n"),Nc="MutualServers",kc="MutualFriends";var Cc=g.exports.memo((function(){var e,t,r,a;const[l]=La(),[s,o,i,c]=Ha((e=>[e.dialogUserId,e.setDialogUserId,e.userDialogOpen,e.setUserDialogOpen])),{t:m}=k(),[d,u]=g.exports.useState(Nc),{data:p}=Sa({variables:{id:s},skip:!s}),v=null==p?void 0:p.user,[h]=Hr(),[E]=jr(),[x]=Vr();!function(e){const t={...In,...e};n(Gr,t)}();const[y]=function(e){const t={...In,...e};return n(Yr,t)}();Qr();const w=null!=(t=null==(e=null==p?void 0:p.user)?void 0:e.relatedUsers)?t:[],N=null!=(a=null==(r=null==p?void 0:p.user)?void 0:r.servers)?a:[],C=g.exports.useCallback((()=>{c(!1)}),[c]),$=g.exports.useMemo((()=>(null==v?void 0:v.relationshipStatus)===Yn.FriendRequestIncoming?f.createElement(f.Fragment,null,f.createElement("button",{className:yc(!0),onClick:()=>x({variables:{input:{userId:s,accept:!0}}})},m("user.context.accept")),f.createElement("button",{className:yc(!1),onClick:()=>x({variables:{input:{userId:s,accept:!0}}})},m("user.context.ignore"))):(null==v?void 0:v.relationshipStatus)===Yn.FriendRequestOutgoing?f.createElement("button",{className:yc(!1),onClick:()=>E({variables:{input:{userId:s}},optimisticResponse:{deleteFriendRequest:{...v,relationshipStatus:Yn.None}}})},m("user.context.revoke")):(null==v?void 0:v.relationshipStatus)===Yn.Friends?f.createElement(b,{to:`/dm/@${null==v?void 0:v.username}`,onClick:()=>C(),className:yc(!0)},m("user.context.sendMessage")):(null==v?void 0:v.relationshipStatus)===Yn.Blocking?f.createElement("button",{className:yc(!1),onClick:()=>y({variables:{input:{userId:s}}})},m("user.context.unblock")):(null==v?void 0:v.relationshipStatus)===Yn.Blocked?f.createElement("button",{disabled:!0,className:yc(!1)},m("user.context.blockingYou")):f.createElement("button",{className:yc(!0),onClick:()=>h({variables:{input:{userId:s}},optimisticResponse:{createFriendRequest:{...v,relationshipStatus:Yn.FriendRequestOutgoing}}})},m("user.context.sendFriendRequest"))),[v,m,s,x,E,C,y,h]);return f.createElement(jl,{closeOnOverlayClick:!0,isOpen:i,close:C},f.createElement("div",{onClick:e=>e.stopPropagation(),className:"rounded-lg max-w-xl w-full dark:bg-gray-850"},f.createElement("div",{className:"flex p-5"},f.createElement(ts,{user:v,size:20,showOnline:!0,dotClassName:"ring-5 dark:ring-gray-850 w-4 h-4"}),f.createElement("div",{className:"ml-5 flex w-full pt-5"},f.createElement("div",{className:"font-semibold text-lg text-primary"},null==v?void 0:v.username),s!==(null==l?void 0:l.id)&&f.createElement(f.Fragment,null,f.createElement("div",{className:"ml-auto"}),f.createElement("div",{className:"flex items-center space-x-2.5 h-8"},$),f.createElement(zl,{data:{type:dl,user:v},leftClick:!0},f.createElement("button",{className:"h-8 cursor-pointer highlightable ml-3 focus:outline-none"},f.createElement(le,{className:"w-5 h-5"})))))),l&&(null==v?void 0:v.id)===l.id?f.createElement("div",{className:"h-36 dark:bg-gray-750 rounded-b-lg p-5 flex items-center justify-center"},f.createElement("button",{className:"h-0 w-0 overflow-hidden"}),f.createElement("div",{className:"text-lg font-medium text-tertiary"},"Improved profile coming soon!")):f.createElement(f.Fragment,null,f.createElement("div",{className:"px-5 dark:border-gray-775 border-t h-14 flex items-center space-x-10"},f.createElement("button",{className:xc(d===Nc),onClick:()=>u(Nc)},f.createElement("div",{className:"transform translate-y-0.5"},"Mutual Planets")),f.createElement("button",{className:xc(d===kc),onClick:()=>u(kc)},f.createElement("div",{className:"transform translate-y-0.5"},"Mutual Friends"))),f.createElement("div",{className:"rounded-b-lg dark:bg-gray-750 p-2 max-h-[15rem] min-h-[15rem] h-full scrollbar-custom"},d===Nc&&(N.length>0?N.map((e=>f.createElement(b,{to:`/+${e.name}`,key:e.id,className:wc,onClick:()=>C()},f.createElement(ns,{server:e,size:10,className:"dark:bg-gray-800 rounded-full"}),f.createElement("div",{className:"pl-2.5 text-base text-secondary font-medium"},e.name)))):f.createElement(Ta,{className:"h-36"},"No mutual planets")),d===kc&&(w.length>0?w.map((e=>f.createElement("div",{key:e.id,className:wc,onClick:()=>o(e.id)},f.createElement(ts,{user:e,size:10,showOnline:!0,dotClassName:"ring-3 dark:ring-gray-750 w-2.5 h-2.5"}),f.createElement("div",{className:"pl-2.5"},f.createElement("div",{className:"text-base text-secondary font-medium"},e.username))))):f.createElement(Ta,{className:"h-36"},"No mutual friends"))))))}));var $c=vn((function({history:e}){const t="Mac OS"===Al();return f.createElement(hn,{client:sc},f.createElement(fn,null,f.createElement(Te,null,f.createElement("meta",{charSet:"UTF-8"}),f.createElement("link",{rel:"icon",type:"image/svg+xml",href:"/logos/logo_icon.svg"}),f.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),f.createElement("title",null,"Comet – All-in-one chat & forums for communities")),f.createElement(Da,null,f.createElement(bn,{history:e},f.createElement(ql,null,f.createElement(En,{backend:xn,options:{enableTouchEvents:!1,enableMouseEvents:!0}},f.createElement(vc,null),f.createElement(_i,null),f.createElement(Wi,null),window.electron&&!t&&f.createElement(Ki,null),f.createElement(bc,null),f.createElement(Cc,null),f.createElement("div",{style:window.electron?{height:t?"100%":"calc(100% - 1.375rem)"}:{height:"100%"},className:"hidden md:flex"},f.createElement(Bi,null))))))))}));const Uc=yn();wn({dsn:"https://1cff6f3dfcb844e8bd098e35a0498e5a@o683674.ingest.sentry.io/5771326",integrations:[new Nn.BrowserTracing({routingInstrumentation:kn(Uc)})],release:"web@0.0.68",tracesSampleRate:1,enabled:{}.PROD&&"https://1cff6f3dfcb844e8bd098e35a0498e5a@o683674.ingest.sentry.io/5771326"}),window.electron&&document.documentElement.classList.add("electron"),Cn.render(f.createElement($c,{history:Uc}),document.getElementById("root"));
