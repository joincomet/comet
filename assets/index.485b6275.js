import{g as e,u as t,a as n,b as r,i as a,B as l,c as s,A as o,d as i,m as c,z as m,e as d,f as u,p,r as g,R as v,L as h,h as f,j as b,N as E,k as x,H as y,l as w,n as N,o as k,t as C,q as $,s as U,v as S,w as I,F as P,x as F,y as M,C as R,D as A,E as D,G as T,I as L,J as O,K as z,M as q,O as H,P as B,Q as _,S as j,T as G,U as V,V as Y,W,X as Z,Y as Q,Z as J,_ as K,$ as X,a0 as ee,a1 as te,a2 as ne,a3 as re,a4 as ae,a5 as le,a6 as se,a7 as oe,a8 as ie,a9 as ce,aa as me,ab as de,ac as ue,ad as pe,ae as ge,af as ve,ag as he,ah as fe,ai as be,aj as Ee,ak as xe,al as ye,am as we,an as Ne,ao as ke,ap as Ce,aq as $e,ar as Ue,as as Se,at as Ie,au as Pe,av as Fe,aw as Me,ax as Re,ay as Ae,az as De,aA as Te,aB as Le,aC as Oe,aD as ze,aE as qe,aF as He,aG as Be,aH as _e,aI as je,aJ as Ge,aK as Ve,aL as Ye,aM as We,aN as Ze,aO as Qe,aP as Je,aQ as Ke,aR as Xe,aS as et,aT as tt,aU as nt,aV as rt,aW as at,aX as lt,aY as st,aZ as ot,a_ as it,a$ as ct,b0 as mt,b1 as dt,b2 as ut,b3 as pt,b4 as gt,b5 as vt,b6 as ht,b7 as ft,b8 as bt,b9 as Et,ba as xt,bb as yt,bc as wt,bd as Nt,be as kt,bf as Ct,bg as $t,bh as Ut,bi as St,bj as It,bk as Pt,bl as Ft,bm as Mt,bn as Rt,bo as At,bp as Dt,bq as Tt,br as Lt,bs as Ot,bt as zt,bu as qt,bv as Ht,bw as Bt,bx as _t,by as jt,bz as Gt,bA as Vt,bB as Yt,bC as Wt,bD as Zt,bE as Qt,bF as Jt,bG as Kt,bH as Xt,bI as en,bJ as tn,bK as nn,bL as rn,bM as an,bN as ln,bO as sn,bP as on,bQ as cn,bR as mn,bS as dn,bT as un,bU as pn,bV as gn,bW as vn,bX as hn,bY as fn,bZ as bn,b_ as En,b$ as xn,c0 as yn,c1 as wn,c2 as Nn,c3 as kn,c4 as Cn,c5 as $n,c6 as Un,c7 as Sn,c8 as In}from"./vendor.3f32c3f9.js";const Pn={entityNotFound:"{{replace}} not found!",invalidUserAuth:"'USER' authorization can only be used on User entity",notLoggedIn:"Not logged in",fileSize:"File size must be less than {{replace}}MB",channelPermissions:"(useChannelPermissions) channelPermissions and serverPermissions must have same length",folder:{deleted:"Folder has been deleted",notOwner:"You do not own this folder",nameTooLong:"Name cannot be longer than 300 characters",alreadyExists:"You already have a folder with that name",noPermission:"You do not have permission to modify this folder.",alreadyAdded:"This post is already in this folder.",cannotEdit:"Cannot edit Read Later or Favorites folders.",cannotDelete:"Cannot delete Read Later or Favorites folders.",cannotCreate:"Cannot create Read Later or Favorites folders.",notCollaborative:"This folder is not collaborative.",notInFolder:"That post is not in this folder.",owner:"You are the owner of this folder",private:"That folder is private.",friends:"Must be friends with this folder's owner"},message:{notAuthor:"You are not the author of this message",missingArgs:"Must provide channelId, groupId, or userId",notSentInChannel:"Message was not sent in a channel",empty:"Message cannot be empty",textOrFile:"Must provide text or a file"},comment:{notAuthor:"You are not the author of this comment",empty:"Comment cannot be empty",alreadyDeleted:"Comment already deleted",alreadyVoted:"You have already voted this comment"},post:{notAuthor:"You are not the author of this post",alreadyVoted:"You have already voted this post",alreadyPinned:"Post is already pinned",notPinned:"Post is not pinned"},group:{maxSize:"Max group size is 10 users",notJoined:"You are not in this group"},server:{notJoined:"You have not joined this planet",banned:"You are banned from this planet",alreadyJoined:"You have already joined this planet",missingPermission:"Missing planet permission {{replace}}",notOwner:"Must be planet owner",inviteRequired:"Invite required to join this planet",inviteExpired:"This invite has expired."},channel:{missingPermission:"Missing channel permission {{replace}}"},user:{blocking:"You are blocking this user",blocked:"This user has blocked you",friendRequestNotSent:"You have not sent a friend request to this user",friendRequestNotReceived:"You have not received a friend request from this user",notFriends:"You are not friends with this user",alreadyBlocking:"You are already blocking this user",notBlocking:"You are not blocking this user"},upload:{invalidMime:"Image must be PNG or JPEG"},login:{invalid:"Invalid login",invalidEmail:"Invalid email address",emailInUse:"Email already in use",illegalName:"Name cannot contain {{replace}}",nameLength:"Name must be 2-32 characters",banned:"Banned{{replace}}",wrongPassword:"Incorrect password",usernameTaken:"Username taken"},notif:{notYours:"This is not your notification"}},Fn={hide:"Hide Folders",show:"Show Folders",favorites:"Favorites",readLater:"Read Later",added:"Added to {{name}}!",name:"Name",postCount:"{{count}} Post",postCount_plural:"{{count}} Posts",createdBy:"Created by",userFolder:"User Folder",serverFolder:"Planet Folder",collaborative:"Collaborative",user:{title:"Your Folders",create:"Create Folder"},server:{title:"{{name}}'s Folders",create:"Create Planet Folder"},context:{follow:"Follow Folder",unfollow:"Unfollow Folder",delete:"Delete Folder",copyLink:"Copy Folder Link",edit:"Edit Folder",collaborative:"Collaborative",changeVisibility:"Change Visibility",visibility:{public:"Public",friends:"Friends Only",private:"Private",unlisted:"Unlisted"}}},Mn={};var Rn,An,Dn,Tn,Ln,On,zn,qn,Hn,Bn,_n,jn,Gn,Vn,Yn,Wn,Zn,Qn,Jn,Kn,Xn,er,tr,nr,rr,ar,lr,sr;(An=Rn||(Rn={})).Private="Private",An.Public="Public",An.Restricted="Restricted",(Tn=Dn||(Dn={})).Blue="Blue",Tn.Green="Green",Tn.Indigo="Indigo",Tn.Pink="Pink",Tn.Purple="Purple",Tn.Red="Red",Tn.Yellow="Yellow",(On=Ln||(Ln={})).New="New",On.Top="Top",(qn=zn||(zn={})).Friends="Friends",qn.Private="Private",qn.Public="Public",qn.Unlisted="Unlisted",(Bn=Hn||(Hn={})).FriendRequestReceived="FriendRequestReceived",Bn.Initial="Initial",Bn.Join="Join",Bn.Left="Left",Bn.Normal="Normal",(jn=_n||(_n={})).Away="Away",jn.DoNotDisturb="DoNotDisturb",jn.Offline="Offline",jn.Online="Online",(Vn=Gn||(Gn={})).All="All",Vn.Featured="Featured",Vn.Joined="Joined",(Wn=Yn||(Yn={})).Added="Added",Wn.Hot="Hot",Wn.New="New",Wn.Top="Top",(Qn=Zn||(Zn={})).All="All",Qn.Day="Day",Qn.Hour="Hour",Qn.Month="Month",Qn.Week="Week",Qn.Year="Year",(Kn=Jn||(Jn={})).New="New",Kn.Top="Top",(er=Xn||(Xn={})).Blocked="Blocked",er.Blocking="Blocking",er.FriendRequestIncoming="FriendRequestIncoming",er.FriendRequestOutgoing="FriendRequestOutgoing",er.Friends="Friends",er.None="None",(nr=tr||(tr={})).Arts="Arts",nr.Business="Business",nr.Culture="Culture",nr.Discussion="Discussion",nr.Entertainment="Entertainment",nr.Gaming="Gaming",nr.Health="Health",nr.Hobbies="Hobbies",nr.Lifestyle="Lifestyle",nr.Memes="Memes",nr.Meta="Meta",nr.News="News",nr.Other="Other",nr.Politics="Politics",nr.Programming="Programming",nr.Science="Science",nr.Sports="Sports",nr.Technology="Technology",(ar=rr||(rr={})).AddPostToFolder="AddPostToFolder",ar.Admin="Admin",ar.DisplayRoleSeparately="DisplayRoleSeparately",ar.ManageChannels="ManageChannels",ar.ManageComments="ManageComments",ar.ManageFolders="ManageFolders",ar.ManageMessages="ManageMessages",ar.ManagePosts="ManagePosts",ar.ManageServer="ManageServer",ar.ManageUsers="ManageUsers",ar.PrivateChannels="PrivateChannels",ar.RestrictedChannels="RestrictedChannels",ar.SendMessages="SendMessages",(sr=lr||(lr={})).Down="Down",sr.None="None",sr.Up="Up";const or=e`
    fragment Channel on Channel {
  id
  name
  description
  isUnread
  mentionCount
  type
}
    `,ir=e`
    fragment Image on Image {
  originalUrl
  popupUrl
  popupWidth
  popupHeight
  smallUrl
  smallWidth
  smallHeight
}
    `,cr=e`
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
    ${ir}`,mr=e`
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
    ${cr}`,dr=e`
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
    `,ur=e`
    fragment Group on Group {
  id
  name
  displayName
  avatarUrl
  unreadCount
  lastMessageAt
}
    `,pr=e`
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
    ${dr}
${ur}`,gr=e`
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
    `,vr=e`
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
    ${ir}
${cr}`,hr=e`
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
    ${cr}
${ir}`,fr=e`
    fragment RelatedUser on User {
  ...User
  showChat
  unreadCount
  lastMessageAt
}
    ${dr}`,br=e`
    fragment Role on Role {
  id
  name
  color
  permissions
  isDefault
}
    `,Er=e`
    fragment ServerUser on ServerUser {
  id
  role {
    ...Role
  }
  user {
    ...User
  }
}
    ${br}
${dr}`,xr=e`
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
    ${dr}
${Er}`,yr=e`
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
    `,wr=e`
    mutation createChannel($input: CreateChannelInput!) {
  createChannel(input: $input) {
    ...Channel
  }
}
    ${or}`;const Nr=e`
    mutation updateChannel($input: UpdateChannelInput!) {
  updateChannel(input: $input) {
    ...Channel
  }
}
    ${or}`;const kr=e`
    mutation deleteChannel($input: DeleteChannelInput!) {
  deleteChannel(input: $input)
}
    `;e`
    mutation moveChannel($input: MoveChannelInput!) {
  moveChannel(input: $input) {
    ...Channel
  }
}
    ${or}`;const Cr=e`
    mutation readChannel($input: ReadChannelInput!) {
  readChannel(input: $input) {
    ...Channel
  }
}
    ${or}`;const $r=e`
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
    ${mr}
${dr}
${Er}`;e`
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
    ${mr}
${dr}
${Er}`;const Ur=e`
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
    ${mr}
${dr}
${Er}`;const Sr=e`
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
    ${mr}
${dr}
${Er}`;const Ir=e`
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
    ${mr}
${dr}
${Er}`;const Pr=e`
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
    ${mr}
${dr}
${Er}`;e`
    mutation createFolder($input: CreateFolderInput!) {
  createFolder(input: $input) {
    ...Folder
  }
}
    ${gr}`;const Fr=e`
    mutation updateFolder($input: UpdateFolderInput!) {
  updateFolder(input: $input) {
    ...Folder
  }
}
    ${gr}`;const Mr=e`
    mutation deleteFolder($input: DeleteFolderInput!) {
  deleteFolder(input: $input)
}
    `;e`
    mutation moveServerFolder($input: MoveServerFolderInput!) {
  moveServerFolder(input: $input) {
    ...Folder
  }
}
    ${gr}`,e`
    mutation moveUserFolder($input: MoveUserFolderInput!) {
  moveUserFolder(input: $input) {
    ...Folder
  }
}
    ${gr}`;const Rr=e`
    mutation followFolder($input: FollowFolderInput!) {
  followFolder(input: $input) {
    ...Folder
  }
}
    ${gr}`;const Ar=e`
    mutation unfollowFolder($input: UnfollowFolderInput!) {
  unfollowFolder(input: $input) {
    ...Folder
  }
}
    ${gr}`;e`
    mutation addPostToFolder($input: AddPostToFolderInput!) {
  addPostToFolder(input: $input) {
    ...Folder
  }
}
    ${gr}`,e`
    mutation removePostFromFolder($input: RemovePostFromFolderInput!) {
  removePostFromFolder(input: $input) {
    ...Folder
  }
}
    ${gr}`,e`
    mutation createGroup($input: CreateGroupInput!) {
  createGroup(input: $input) {
    ...Group
  }
}
    ${ur}`,e`
    mutation updateGroup($input: UpdateGroupInput!) {
  updateGroup(input: $input) {
    ...Group
  }
}
    ${ur}`,e`
    mutation leaveGroup($input: LeaveGroupInput!) {
  leaveGroup(input: $input)
}
    `;const Dr=e`
    mutation readGroup($input: ReadGroupInput!) {
  readGroup(input: $input) {
    ...Group
  }
}
    ${ur}`;e`
    mutation addUserToGroup($input: AddUserToGroupInput!) {
  addUserToGroup(input: $input) {
    ...Group
  }
}
    ${ur}`,e`
    mutation removeUserFromGroup($input: RemoveUserFromGroupInput!) {
  removeUserFromGroup(input: $input) {
    ...Group
  }
}
    ${ur}`;const Tr=e`
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
    ${vr}
${dr}
${Er}`;function Lr(e){const n={...Mn,...e};return t(Tr,n)}e`
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
    ${vr}
${dr}
${Er}`;const Or=e`
    mutation deleteMessage($input: DeleteMessageInput!) {
  deleteMessage(input: $input)
}
    `;const zr=e`
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
    ${vr}
${dr}
${Er}`;function qr(e){const n={...Mn,...e};return t(zr,n)}const Hr=e`
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
    ${vr}
${dr}
${Er}`;function Br(e){const n={...Mn,...e};return t(Hr,n)}const _r=e`
    mutation updateTyping($input: TypingInput!) {
  updateTyping(input: $input)
}
    `;const jr=e`
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
    ${hr}
${dr}
${Er}`;e`
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
    ${hr}
${dr}
${Er}`;const Gr=e`
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
    ${hr}
${dr}
${Er}`;const Vr=e`
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
    ${hr}
${dr}
${Er}`;e`
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
    ${hr}
${dr}
${Er}`,e`
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
    ${hr}
${dr}
${Er}`;const Yr=e`
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
    ${dr}
${fr}`;e`
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
    ${dr}
${fr}`,e`
    mutation answerFriendRequest($input: AnswerFriendRequestInput!) {
  answerFriendRequest(input: $input) {
    ...RelatedUser
  }
}
    ${fr}`,e`
    mutation blockUser($input: BlockUserInput!) {
  blockUser(input: $input) {
    ...RelatedUser
  }
}
    ${fr}`,e`
    mutation unblockUser($input: UnblockUserInput!) {
  unblockUser(input: $input) {
    ...RelatedUser
  }
}
    ${fr}`;const Wr=e`
    mutation removeFriend($input: RemoveFriendInput!) {
  removeFriend(input: $input) {
    ...RelatedUser
  }
}
    ${fr}`;const Zr=e`
    mutation readDm($input: ReadDmInput!) {
  readDm(input: $input) {
    ...RelatedUser
  }
}
    ${fr}`;function Qr(e){const n={...Mn,...e};return t(Zr,n)}const Jr=e`
    mutation openDm($input: OpenDmInput!) {
  openDm(input: $input) {
    ...RelatedUser
  }
}
    ${fr}`;const Kr=e`
    mutation closeDm($input: CloseDmInput!) {
  closeDm(input: $input) {
    ...RelatedUser
  }
}
    ${fr}`;function Xr(e){const n={...Mn,...e};return t(Kr,n)}const ea=e`
    mutation markReplyRead($input: MarkReplyReadInput!) {
  markReplyRead(input: $input) {
    ...Reply
  }
}
    ${xr}`;const ta=e`
    mutation markReplyUnread($input: MarkReplyUnreadInput!) {
  markReplyUnread(input: $input) {
    ...Reply
  }
}
    ${xr}`;const na=e`
    mutation createRole($input: CreateRoleInput!) {
  createRole(input: $input) {
    ...Role
  }
}
    ${br}`;const ra=e`
    mutation updateRole($input: UpdateRoleInput!) {
  updateRole(input: $input) {
    ...Role
  }
}
    ${br}`;const aa=e`
    mutation deleteRole($input: DeleteRoleInput!) {
  deleteRole(input: $input)
}
    `;const la=e`
    mutation setUserRole($input: SetUserRoleInput!) {
  setUserRole(input: $input) {
    ...ServerUser
  }
}
    ${Er}`;const sa=e`
    mutation createServer($input: CreateServerInput!) {
  createServer(input: $input) {
    ...Server
    roles {
      ...Role
    }
  }
}
    ${yr}
${br}`;const oa=e`
    mutation updateServer($input: UpdateServerInput!) {
  updateServer(input: $input) {
    ...Server
  }
}
    ${yr}`;const ia=e`
    mutation deleteServer($input: DeleteServerInput!) {
  deleteServer(input: $input)
}
    `;e`
    mutation moveServer($input: MoveServerInput!) {
  moveServer(input: $input)
}
    `;const ca=e`
    mutation joinServer($input: JoinServerInput!) {
  joinServer(input: $input) {
    ...Server
  }
}
    ${yr}`;const ma=e`
    mutation leaveServer($input: LeaveServerInput!) {
  leaveServer(input: $input) {
    ...Server
  }
}
    ${yr}`;function da(e){const n={...Mn,...e};return t(ma,n)}e`
    mutation readServer($input: ReadServerInput!) {
  readServer(input: $input) {
    ...Server
  }
}
    ${yr}`;const ua=e`
    mutation banUserFromServer($input: BanUserFromServerInput!) {
  banUserFromServer(input: $input)
}
    `;e`
    mutation unbanUserFromServer($input: UnbanUserFromServerInput!) {
  unbanUserFromServer(input: $input)
}
    `;const pa=e`
    mutation kickUserFromServer($input: KickUserFromServerInput!) {
  kickUserFromServer(input: $input)
}
    `;const ga=e`
    mutation featureServer($input: FeatureServerInput!) {
  featureServer(input: $input) {
    ...Server
  }
}
    ${yr}`;const va=e`
    mutation unfeatureServer($input: UnfeatureServerInput!) {
  unfeatureServer(input: $input) {
    ...Server
  }
}
    ${yr}`;const ha=e`
    mutation createAccount($input: CreateAccountInput!) {
  createAccount(input: $input) {
    accessToken
    user {
      ...CurrentUser
    }
  }
}
    ${pr}`;const fa=e`
    mutation changePassword($input: ChangePasswordInput!) {
  changePassword(input: $input) {
    ...CurrentUser
  }
}
    ${pr}`;const ba=e`
    mutation changeUserAvatar($input: ChangeUserAvatarInput!) {
  changeUserAvatar(input: $input) {
    ...CurrentUser
  }
}
    ${pr}`;const Ea=e`
    mutation deleteAccount($input: DeleteAccountInput!) {
  deleteAccount(input: $input)
}
    `;const xa=e`
    mutation login($input: LoginInput!) {
  login(input: $input) {
    accessToken
    user {
      ...CurrentUser
    }
  }
}
    ${pr}`;const ya=e`
    mutation changeOnlineStatus($input: ChangeOnlineStatusInput!) {
  changeOnlineStatus(input: $input) {
    ...CurrentUser
  }
}
    ${pr}`;const wa=e`
    mutation globalBan($input: GlobalBanInput!) {
  globalBan(input: $input)
}
    `;const Na=e`
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
    ${mr}
${dr}
${Er}`;const ka=e`
    query currentUser @live {
  user {
    ...CurrentUser
  }
}
    ${pr}`;e`
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
    ${gr}
${dr}`;const Ca=e`
    query getLinkMeta($linkUrl: String!) {
  getLinkMeta(linkUrl: $linkUrl) {
    ...Metadata
  }
}
    ${cr}`;const $a=e`
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
    ${vr}
${dr}
${Er}`;const Ua=e`
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
    ${hr}
${dr}
${Er}`;const Sa=e`
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
    ${hr}
${dr}
${Er}`;const Ia=e`
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
    `;function Pa(e){const t={...Mn,...e};return n(Ia,t)}const Fa=e`
    query replies {
  replies {
    ...Reply
  }
}
    ${xr}`;function Ma(e){const t={...Mn,...e};return n(Fa,t)}const Ra=e`
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
    ${yr}
${or}
${br}`;const Aa=e`
    query serverUsers($serverId: ID!) @live {
  serverUsers(serverId: $serverId) {
    ...ServerUser
  }
}
    ${Er}`;const Da=e`
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
    ${dr}`;function Ta(e){const t={...Mn,...e};return n(Da,t)}e`
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
    ${mr}`;const La=e`
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
    ${vr}
${dr}
${Er}`;e`
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
    ${hr}`,e`
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
    ${xr}`;const Oa=e`
    subscription typingUpdated($userId: ID, $groupId: ID, $channelId: ID) {
  typingUpdated(userId: $userId, groupId: $groupId, channelId: $channelId) {
    typingUserId
    isTyping
  }
}
    `;const za={en:{translation:{home:"Home",copyId:"Copy ID",markRead:"Mark As Read",continue:"Continue",more:"More",updateAvailable:"Update Available!",auth:{login:"Login",createAccount:"Create an Account",welcomeBack:"Welcome Back!",name:"Name",password:"Password",email:"Email",alreadyHaveAccount:"Already have an account?",register:"Register",needAccount:"Need an account?"},category:{Featured:"Featured",Arts:"Arts",Business:"Business",Culture:"Culture",Discussion:"Discussion",Entertainment:"Entertainment",Gaming:"Gaming",Health:"Health",Hobbies:"Hobbies",Lifestyle:"Lifestyle",Memes:"Memes",Meta:"Meta",News:"News",Politics:"Politics",Programming:"Programming",Science:"Science",Sports:"Sports",Technology:"Technology",Other:"Other"},channel:{title:"Channels",togglePrivate:"Private Channel",hideUsers:"Hide Users",showUsers:"Show Users",create:"Create Channel",edit:"Edit Channel",context:{markRead:"Mark As Read",delete:"Delete Channel",edit:"Edit Channel",mute:"Mute Channel"}},comment:{noPermission:"You do not have permission to view comments.",reply:"Reply",cancelReply:"Cancel Reply",hideReplies:"Hide Replies",showReplies:"Show Replies",create:{submit:"Comment",cancel:"Cancel"},context:{copyLink:"Copy Comment Link",delete:"Delete Comment",reply:"Reply",vote:"Add Rocket",unvote:"Remove Rocket",votePermission:"This planet does not allow you to rocket comments.",pin:"Pin Comment",unpin:"Unpin Comment",edit:"Edit Comment"}},dm:{title:"Direct Messages",create:"Create DM",markRead:"Mark Read",shared:"Shared with {{user.username}}!"},error:Pn,explore:{title:"Explore",categories:"Categories",all:"All"},folder:Fn,inbox:{title:"Inbox",tab:{all:"All",unread:"Unread"}},infinity:{comingSoon:"Comet Infinity is coming soon!",title:"Infinity"},message:{message:"Message",pinned:"Pinned Messages",upload:"Upload a File",typing:{one:"{{name}} is typing...",two:"{{name1}} and {{name2}} are typing...",three:"{{name1}}, {{name2}}, and {{name3}} are typing...",several:"Several people are typing..."},context:{copyLink:"Copy Message Link",pin:"Pin Message",unpin:"Unpin Message",edit:"Edit Message",delete:"Delete Message"}},permissions:{server:{[rr.ManageChannels]:{title:"Manage Channels",description:"Allows members to create, edit, or delete channels."},[rr.ManageServer]:{title:"Manage Roles",description:"Allows members to create new roles and edit or delete roles lower than their highest role. Also allows members to change permissions of individual channels that they have access to."},[rr.ManageServer]:{title:"Manage Planet",description:"Allows members to change this planet's name, description, icon, and banner image."},[rr.SendMessages]:{title:"Send Messages",description:"Allows members to send messages in text channels."},[rr.RestrictedChannels]:{title:"Send Messages in Restricted Channels",description:"Allows members to send messages in restricted text channels."},[rr.PrivateChannels]:{title:"Use Private Channels",description:"Allows members to view and send messages in private text channels."},[rr.ManageMessages]:{title:"Manage Messages",description:"Allows members to remove messages by other members or pin any message."},[rr.ManagePosts]:{title:"Manage Posts",description:"Allows members to pin and remove posts."},[rr.ManageComments]:{title:"Manage Comments",description:"Allows members to pin and remove comments."},[rr.ManageFolders]:{title:"Manage Folders",description:"Allows members to create, delete, and edit folders."},[rr.AddPostToFolder]:{title:"Add Posts to Folders",description:"Allows members to add and remove posts from folders."},[rr.DisplayRoleSeparately]:{title:"Display Role Separately",description:"Members with this role will appear separately in the users list"},[rr.Admin]:{title:"Administrator",description:"Members with this role have every permission"},[rr.ManageUsers]:{title:"Manage Users",description:"Ban and kick users"}}},post:{createPost:"Create a post",create:{submit:"Post",cancel:"Cancel"},type:{text:"Text Post",link:"Link Post",image:"Image Post",album:"Image Album"},createComment:"Write a comment",commentCount:"{{count}} Comment",commentCount_plural:"{{count}} Comments",participantCount:"{{count}} Participant",participantCount_plural:"{{count}} Participants",creator:"Creator",context:{pin:"Pin Post",pinned:"Post pinned!",unpin:"Unpin Post",unpinned:"Post unpinned!",removeFromFolder:"Remove from Folder",addToUserFolder:"Add to Folder",addToServerFolder:"Add to Planet Folder",edit:"Edit Post",delete:"Delete Post",deleted:"Post deleted!",copyLink:"Copy Post Link",sendToFriend:"Send to Friend",vote:"Add Rocket",unvote:"Remove Rocket",votePermission:"This planet does not allow you to rocket posts."},hideParticipants:"Hide Participants",showParticipants:"Show Participants",pinnedTo:"Pinned to {{server.name}}",expand:"Show Details",collapse:"Hide Details",feed:{title:"Your Feed",refresh:"Refresh Posts",sort:{hot:"Hot",top:"Top",new:"New"},time:{hour:"Hour",day:"Day",week:"Week",month:"Month",year:"Year",all:"All"},liveMode:{title:"Live Mode",description:"Automatically add new posts to feed",comingSoon:"Live Mode is coming soon!"},subscriptions:{show:"Show Subscriptions",hide:"Hide Subscriptions",comingSoon:"Planet subscriptions are coming soon!"}}},search:{comingSoon:"Search is coming soon!"},server:{loading:"Loading planet...",feed:"Feed",invitePeople:"Invite People",onlineCount:"{{count}} online",memberCount:"{{count}} Member",memberCount_plural:"{{count}} Members",context:{markRead:"Mark As Read",mute:"Mute Planet",invite:"Invite People",leave:"Leave Planet"},create:{title:"Create Planet",name:"Planet Name",upload:"Upload",requireInvite:"Require Invite to Join"}},settings:{title:"Settings"},user:{hideUsers:"Hide Users",showUsers:"Show Users",context:{viewProfile:"Profile",closeDm:"Close DM",block:"Block",unblock:"Unblock",addFriend:"Add Friend",removeFriend:"Remove Friend",sendMessage:"Send Message",message:"Message",kickUser:"Kick {{user.username}}",banUser:"Ban {{user.username}}",banPrompt:"Reason (Optional)",ignore:"Ignore",accept:"Accept",revoke:"Revoke Friend Request",sendFriendRequest:"Send Friend Request",blockingYou:"Blocking You",markRead:"Mark as Read"},profile:{sentFriendRequest:"Request Sent",receivedFriendRequest:"Accept Request",mutualServers:"Mutual Planets",mutualFriends:"Mutual Friends",sendMessage:"Send Message"},offline:"Offline",online:"Online",friends:{title:"Friends",sendMessage:"Message",revokeRequest:"Cancel",acceptRequest:"Accept",rejectRequest:"Ignore",tab:{online:"Online",all:"All",pending:"Pending",blocked:"Blocked",add:"Add Friend"}}}}}};a.use(l).use(s).init({resources:za,fallbackLng:"en",debug:!1,load:"languageOnly",interpolation:{escapeValue:!1}});const qa={status:"connecting"};const Ha=g.exports.createContext({user:null,loading:!0});function Ba({children:e}){const{data:t,loading:r}=function(e){const t={...Mn,...e};return n(ka,t)}({fetchPolicy:"cache-and-network",nextFetchPolicy:"cache-first"}),a=null==t?void 0:t.user;return v.createElement(Ha.Provider,{value:{user:a,loading:(r||"connected"!==qa.status)&&!a}},e)}const _a=()=>{const{user:e,loading:t}=g.exports.useContext(Ha);return[e,t]};var ja=g.exports.memo((function({children:e="No more posts loaded!",className:t="h-48"}){return v.createElement("div",{className:"flex flex-col items-center justify-center text-primary py-6"},v.createElement("img",{alt:"astronaut",src:"/assets/astronaut.72ca8e56.png",className:`object-contain opacity-50 animate-float select-none pointer-events-none ${t}`}),v.createElement("div",{className:"text-tertiary pt-3 text-lg font-semibold"},e))}));function Ga(){return _a(),v.createElement("div",{className:"relative h-full w-full dark:bg-gray-750 flex flex-col items-center justify-center p-6 text-center"},v.createElement("div",{className:"text-center space-y-3"},v.createElement(ja,null,"This page does not exist.",v.createElement(h,{to:"/",className:"block text-lg pt-3 text-accent font-medium cursor-pointer hover:underline"},"Return home"))))}function Va(){let e=window.navigator.userAgent,t=window.navigator.platform,n=null;return-1!==["Macintosh","MacIntel","MacPPC","Mac68K"].indexOf(t)?n="Mac OS":-1!==["iPhone","iPad","iPod"].indexOf(t)?n="iOS":-1!==["Win32","Win64","Windows","WinCE"].indexOf(t)?n="Windows":/Android/.test(e)?n="Android":/Linux/.test(t)&&(n="Linux"),n}const Ya=f(((e,t)=>({friendsPage:"Online",setFriendsPage:t=>e({friendsPage:t}),inboxPage:"Unread",setInboxPage:t=>e({inboxPage:t}),postsSort:"Hot",setPostsSort:t=>e({postsSort:t}),postsTime:"Day",setPostsTime:t=>e({postsTime:t}),postsFeed:"Joined",setPostsFeed:t=>e({postsFeed:t}),commentsSort:"Top",setCommentsSort:t=>e({commentsSort:t}),liveMode:!1,setLiveMode:t=>e({liveMode:t}),serverPages:{},setServerPage:(n,r)=>e({serverPages:{...t().serverPages,[n]:r}}),homePage:null,setHomePage:t=>e({homePage:t}),replyingCommentId:null,setReplyingCommentId:t=>e({replyingCommentId:t}),canGoBack:!1,setCanGoBack:t=>e({canGoBack:t}),exploreSort:"Top",setExploreSort:t=>e({exploreSort:t}),exploreCategory:null,setExploreCategory:t=>e({exploreCategory:t}),dialogUserId:null,setDialogUserId:t=>e({dialogUserId:t,userDialogOpen:!!t}),userDialogOpen:!1,setUserDialogOpen:t=>e({userDialogOpen:t}),folderSort:"Added",setFolderSort:t=>e({folderSort:t}),updateAvailable:!1,setUpdateAvailable:t=>e({updateAvailable:t}),loginDialog:!1,setLoginDialog:t=>e({loginDialog:t}),createAccount:!1,setCreateAccount:t=>e({createAccount:t}),showLeftSidebar:!1,setShowLeftSidebar:t=>e({showLeftSidebar:t}),showRightSidebar:!["iOS","Android"].includes(Va()),setShowRightSidebar:t=>e({showRightSidebar:t})})));function Wa({className:e}){return v.createElement("svg",{className:e,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor"},v.createElement("path",{fillRule:"evenodd",d:"M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z",clipRule:"evenodd"}))}function Za({className:e}){return v.createElement("svg",{className:e,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor"},v.createElement("path",{d:"M13 7H7v6h6V7z"}),v.createElement("path",{fillRule:"evenodd",d:"M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z",clipRule:"evenodd"}))}function Qa({className:e}){return v.createElement("svg",{className:e,viewBox:"0 0 24 24"},v.createElement("path",{fill:"currentColor",d:"M17 14H19V17H22V19H19V22H17V19H14V17H17V14M20 12C20 8.64 17.93 5.77 15 4.59V5C15 6.1 14.1 7 13 7H11V9C11 9.55 10.55 10 10 10H8V12H14C14.5 12 14.9 12.35 15 12.81C13.2 13.85 12 15.79 12 18C12 19.5 12.54 20.85 13.44 21.9L12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12L21.9 13.44C21.34 12.96 20.7 12.59 20 12.34L20 12M11 19.93V18C9.9 18 9 17.1 9 16V15L4.21 10.21C4.08 10.78 4 11.38 4 12C4 16.08 7.06 19.44 11 19.93Z"}))}function Ja({className:e="h-5 w-5 text-primary"}){return v.createElement("svg",{className:`animate-spin ${e}`,xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24"},v.createElement("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),v.createElement("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"}))}function Ka({className:e}){return v.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:e,viewBox:"0 0 20 20",fill:"currentColor"},v.createElement("path",{d:"M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"}),v.createElement("path",{d:"M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"}))}function Xa({className:e}){return v.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:e,viewBox:"0 0 20 20",fill:"currentColor"},v.createElement("path",{fillRule:"evenodd",d:"M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z",clipRule:"evenodd"}))}var el=g.exports.forwardRef((({avatarUrl:e,children:t,loading:n="eager",className:r="",size:a=12,style:l={}},s)=>v.createElement("div",{ref:s,className:`relative flex-shrink-0 flex items-center justify-center bg-cover bg-center ${r}`,style:{width:a/4+"rem",height:a/4+"rem",backgroundImage:e?`url(${e})`:void 0,...l}},t))),tl=g.exports.forwardRef((({server:e,loading:t="eager",size:n=12,className:r="",style:a={}},l)=>{var s;const o=(null!=(s=null==e?void 0:e.displayName)?s:"").split(" ").map((e=>e[0])).join("").toUpperCase(),i=g.exports.useMemo((()=>{const e=o;return e.length<=2?"18px":3===e.length?"16px":4===e.length?"14px":5===e.length?"12px":e.length>=6?"10px":void 0}),[o]);return e?v.createElement(el,{ref:l,avatarUrl:e.avatarUrl,loading:t,className:`${r} cursor-pointer`,size:n,style:a},!e.avatarUrl&&v.createElement("svg",{width:"100%",height:"100%",viewBox:"0 0 48 48",className:"absolute top-0 left-0",overflow:"visible"},v.createElement("defs",null,v.createElement("g",null,v.createElement("path",{d:"M48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24Z"})),v.createElement("g",null,v.createElement("rect",{x:"28",y:"-4",width:"24",height:"24",rx:"12",ry:"12",transform:"translate(20 -20)"})),v.createElement("g",null,v.createElement("rect",{x:"28",y:"28",width:"24",height:"24",rx:"12",ry:"12",transform:"translate(20 20)"}))),v.createElement("foreignObject",{x:"0",y:"0",width:"48",height:"48"},v.createElement("div",{className:"flex items-center justify-center h-full",tabIndex:"-1","aria-label":e.name,style:{fontSize:i}},v.createElement("div",{className:"flex items-center justify-center whitespace-nowrap font-medium text-tertiary","aria-hidden":"true"},o))))):null}));const nl=e=>x(`\n  w-12\n  h-12\n  object-cover\n  inline-flex\n  items-center\n  justify-center\n  hover:rounded-2xl\n  ${e?"rounded-2xl":"rounded-3xl"}\n  transform\n  transition-all\n  relative\n  group\n  cursor-pointer\n`),rl=(e,t)=>x(`\n  absolute\n  left-0\n  w-1\n  dark:bg-white\n  bg-gray-900\n  rounded-r-2xl\n  top-1/2\n  -translate-y-1/2\n  transform\n  transition\n  duration-250\n  group-hover:-translate-x-3\n  ${e?"-translate-x-3 h-10":t?"-translate-x-3 h-2.5 group-hover:h-5":"-translate-x-4 h-5"}\n`);var al=g.exports.forwardRef((({name:e,children:t,to:n,onClick:r,className:a="dark:bg-gray-800 bg-gray-200",active:l=!1,unread:s=!1},o)=>v.createElement(b,{content:e,placement:"right",ref:o,offset:[0,22]},n?v.createElement(E,{to:n,className:`${nl(l)} ${a}`},v.createElement("div",{className:rl(l,s)}),t):v.createElement("div",{onClick:r,className:`${nl(l)} ${a}`},v.createElement("div",{className:rl(l,s)}),t))));const ll=0,sl=2,ol={disable:!1,holdToDisplay:1e3,posX:0,posY:0,mouseButton:sl,disableIfShiftIsPressed:!1,collect(){}};function il(e,t){return t=>{const n=Object.assign({},ol,t);g.exports.useRef(!1),g.exports.useRef(),g.exports.useRef();const r=t=>{t.ctrlKey||(t.preventDefault(),t.stopPropagation(),e(((e,t)=>["X","Y"].map((n=>(e[`client${n}`]||e.touches&&e.touches[0][`page${n}`])-t[`pos${n}`])))(t,n),{...n.collect(),href:t.target.href}))};return[{onContextMenu:e=>{e.button===n.mouseButton&&r(e)},onClick:e=>{e.button===n.mouseButton&&r(e)}}]}}const cl=27,ml=13,dl=38,ul=40,pl={position:"fixed",opacity:0,pointerEvents:"none"},gl=e=>e.focus(),vl=({handleElementSelect:e=gl}={})=>{const t=g.exports.useRef(),n=g.exports.useRef([]),[r,a]=g.exports.useState(pl),[l,s]=g.exports.useState(-1),[o,i]=g.exports.useState(!1),[c,m]=g.exports.useState([0,0]),[d,u]=g.exports.useState(),p=g.exports.useCallback((()=>i(!1)),[i]);g.exports.useCallback((()=>{o&&i(!1)}),[o,i]);const v=g.exports.useCallback(((e,t)=>{i(!0),m(e),u(t)}),[i,u]);g.exports.useEffect((()=>{const r=e=>{t.current.contains(e.target)||(s(-1),p())},a=t=>{switch(t.keyCode){case cl:t.preventDefault(),p();break;case dl:t.preventDefault(),l>0&&(s((e=>e-1)),e(n.current[l-1]));break;case ul:t.preventDefault(),l+1<n.current.length&&(s((e=>e+1)),e(n.current[l+1]));break;case ml:-1!==l&&n.current[l].click(),p()}};return o&&(document.addEventListener("mousedown",r),document.addEventListener("touchstart",r),document.addEventListener("scroll",p),document.addEventListener("contextmenu",p),document.addEventListener("keydown",a)),()=>{document.removeEventListener("mousedown",r),document.removeEventListener("touchstart",r),document.removeEventListener("scroll",p),document.removeEventListener("contextmenu",p),document.removeEventListener("keydown",a)}}),[t,p,l,s,n,e,o]);const[h,f]=g.exports.useState(!1);g.exports.useLayoutEffect((()=>{if(o){const e=t.current.getBoundingClientRect(),{top:n,left:r,isRight:l}=((e,[t,n])=>{const r={top:n,left:t,isRight:!1},{innerWidth:a,innerHeight:l}=window;return n+e.height>l&&(r.top-=e.height),t+e.width>a&&(r.left-=e.width),t+2*e.width>a&&(r.isRight=!0),r.top<0&&(r.top=e.height<l?(l-e.height)/2:0),r.left<0&&(r.left=e.width<a?(a-e.width)/2:0),r})(e,c);f(l),a((e=>({...e,top:`${n}px`,left:`${r}px`,opacity:1,pointerEvents:"auto"})))}else a(pl)}),[t,o,c]);return[{style:r,ref:t,role:"menu",tabIndex:-1},{ref:e=>n.current=null===e?[]:[...n.current,e],role:"menuitem",tabIndex:-1},il(v),{data:d,isVisible:o,setVisible:i,coords:c,setCoords:m,isRight:h}]},hl=e=>x(`\n  active:text-white\n  dark:active:text-white\n  dark:hover:text-white\n  dark:focus:text-white\n  hover:text-white\n  select-none\n  cursor-pointer\n  w-full\n  px-2\n  py-1.5\n  leading-5\n  flex\n  items-center\n  text-13\n  rounded-sm\n  font-medium\n  focus:outline-none\n  group\n  relative\n  ${e?"text-red-500 active:bg-red-600 hover:bg-red-500 focus:bg-red-500":"text-gray-600 dark:text-gray-400 active:bg-green-700 focus:bg-green-600 hover:bg-green-600"} \n`);function fl({item:{bindMenuItem:e,hideMenu:t,isRight:n},onClick:r,red:a,checked:l=null,label:s,children:o}){return v.createElement("div",{...e,className:hl(a),onClick:e=>{t(),r&&r(e)}},s,null!==l&&v.createElement("input",{type:"checkbox",className:"ml-auto h-4 w-4 border-none rounded dark:checked:bg-green-600 dark:bg-gray-750 focus:outline-none cursor-pointer",checked:l,readOnly:!0}),o&&v.createElement(v.Fragment,null,v.createElement("div",{className:"ml-auto"},v.createElement(y,{className:"w-5 h-5 -mr-0.5"})),v.createElement("div",{className:"absolute -top-2 hidden group-hover:block "+(n?"right-full -mr-2":"left-full -ml-2")},v.createElement("div",{className:""+(n?"pr-2":"pl-2")},v.createElement("div",{className:(n?"mr-3":"ml-3")+" p-2 dark:bg-gray-900 rounded w-48 shadow-lg"},o)))))}const bl="User",El="Post",xl="Comment",yl="Message",wl="Server",Nl="Folder",kl="Channel",Cl=({server:e,permissions:t})=>g.exports.useMemo((()=>e?t.map((t=>{var n;return[...null!=(n=null==e?void 0:e.permissions)?n:[]].includes(t)})):t.map((e=>!1))),[t,e]),$l=x("\n  select-none\n  w-full\n  px-2\n  h-8\n  flex\n  items-center\n  text-13\n  text-mid\n  cursor-default\n  rounded-sm\n  font-medium\n  focus:outline-none\n");function Ul({children:e}){return Sl(e)?v.createElement("div",{className:"space-y-0.5"},v.createElement("div",{className:$l},"No actions available")):v.createElement("div",{className:"space-y-0.5"},e)}const Sl=e=>!w.renderToStaticMarkup(e);function Il({post:e,ContextMenuItem:n}){const{t:r}=N(),[a]=Cl({server:null==e?void 0:e.server,permissions:[rr.ManagePosts]}),l=k()[1],[s]=function(e){const n={...Mn,...e};return t(Gr,n)}(),[o]=_a(),i=!!e.author&&!!o&&e.author.id===o.id,c=i||a;return e?v.createElement(v.Fragment,null,v.createElement(Ul,null,i&&v.createElement(n,{label:r("post.context.edit")}),v.createElement(n,{onClick:()=>{l(`${location.origin}${e.relativeUrl}`)},label:r("post.context.copyLink")}),c&&v.createElement(n,{red:!0,onClick:()=>{s({variables:{input:{postId:e.id}},optimisticResponse:{...e,isDeleted:!0,author:null,serverUser:null}}),C.success(r("post.context.deleted"))},label:r("post.context.delete")}))):null}function Pl({user:e,server:n,role:r,isDm:a,ContextMenuItem:l}){const{t:s}=N(),[o]=_a(),[i]=Cl({server:n,permissions:[rr.ManageUsers]}),[c]=Xr(),[m]=Qr(),[d]=function(e){const n={...Mn,...e};return t(ua,n)}(),[u]=function(e){const n={...Mn,...e};return t(pa,n)}();!function(e){const n={...Mn,...e};t(wa,n)}(),function(e){const n={...Mn,...e};t(Yr,n)}(),function(e){const n={...Mn,...e};t(Wr,n)}();const[p]=function(e){const n={...Mn,...e};return t(la,n)}(),g=Ya((e=>e.setDialogUserId)),{push:h}=$();return e?v.createElement(v.Fragment,null,v.createElement(Ul,null,v.createElement(l,{label:s("user.context.viewProfile"),onClick:()=>{g(e.id)}}),a&&v.createElement(v.Fragment,null,!!e.unreadCount&&v.createElement(l,{label:s("user.context.markRead"),onClick:()=>{m({variables:{input:{userId:e.id}}})}}),v.createElement(l,{label:s("user.context.closeDm"),onClick:()=>{c({variables:{input:{userId:e.id}}})}})),o&&e.id!==o.id?v.createElement(v.Fragment,null,!a&&v.createElement(l,{onClick:()=>h(`/dm/@${e.username}`),label:s("user.context.sendMessage")})):v.createElement(v.Fragment,null),!!n&&i&&v.createElement(v.Fragment,null,v.createElement(l,{label:"Set Role"},n.roles.map((t=>v.createElement(l,{key:t.id,checked:r&&r.id===t.id,label:v.createElement("div",{className:"flex items-center "},v.createElement("div",{className:"w-3 h-3 rounded-full mr-2.5 "+(t.color?"":"dark:bg-gray-700"),style:{backgroundColor:t.color}}),t.name),onClick:()=>{p({variables:{input:{userId:e.id,roleId:t.id}}})}})))),v.createElement(l,{label:s("user.context.kickUser",{user:e}),red:!0,onClick:()=>{u({variables:{input:{serverId:n.id,userId:e.id}}}),C.success(s("user.context.kickedUser",{user:e}))}}),v.createElement(l,{label:s("user.context.banUser",{user:e}),red:!0,onClick:()=>{window.confirm(`Are you sure you want to ban ${e.username} from +${n.name}?`)&&(d({variables:{input:{serverId:n.id,userId:e.id}}}),C.success(`Banned ${e.username} from +${n.name}!`))}}),o.isAdmin&&v.createElement(l,{label:`Global ban ${e.username}`,red:!0,onClick:()=>{window.confirm(`Are you sure you want to global ban ${e.username}?`)&&(d({variables:{input:{serverId:n.id,userId:e.id}}}),C.success(`Global banned ${e.username}!`))}})))):null}function Fl({message:e,server:n,ContextMenuItem:r}){var a,l;const{pathname:s}=U(),o=S(s,{path:"/group/:groupId"}),i=S(s,{path:"/dm/:username"});null==(a=null==o?void 0:o.params)||a.groupId,null==(l=null==i?void 0:i.params)||l.username;const[c]=Cl({server:n,permissions:[rr.ManageMessages]});k()[1];const[m]=function(e){const n={...Mn,...e};return t(Or,n)}();qr(),Br(),(e=>{const[t]=qr(),[n]=Br();g.exports.useCallback((()=>{const r={messageId:e.id};e.isPinned?n({variables:{input:r}}):t({variables:{input:r}})}),[e,t,n])})(e);const{t:d}=N(),[u]=_a(),p=!!u&&e.author.id===u.id,h=(c||p)&&e.type===Hn.Normal;return p&&(e.type,Hn.Normal),v.createElement(v.Fragment,null,v.createElement(Ul,null,h&&v.createElement(r,{label:d("message.context.delete"),red:!0,onClick:()=>{m({variables:{input:{messageId:e.id}}}),C.error(d("Message deleted!"))}})))}const Ml=e=>{const[n]=function(e){const n={...Mn,...e};return t(Ir,n)}(),[r]=function(e){const n={...Mn,...e};return t(Pr,n)}();return g.exports.useCallback((()=>{const t={commentId:e.id};e.isPinned?r({variables:{input:t}}):n({variables:{input:t}})}),[e,n,r])};function Rl({comment:e,post:n,ContextMenuItem:r}){const{t:a}=N(),[l]=_a(),s=Ya((e=>e.setReplyingCommentId)),[o]=Cl({server:n.server,permissions:[rr.ManageComments]});k()[1];const[i]=function(e){const n={...Mn,...e};return t(Ur,n)}();Ml(e);const c=!!e.author&&!!l&&e.author.id===l.id,m=o||c;return v.createElement(v.Fragment,null,v.createElement(Ul,null,c&&v.createElement(r,{label:a("comment.context.edit")}),!!l&&!e.isDeleted&&v.createElement(r,{onClick:()=>s(null==e?void 0:e.id),label:a("comment.context.reply")}),m&&v.createElement(r,{label:a("comment.context.delete"),red:!0,onClick:()=>{i({variables:{input:{commentId:e.id}},optimisticResponse:{...e,isDeleted:!0,text:"[deleted]",author:null,serverUser:null}}),C.success("Comment deleted!")}})))}function Al({server:e,enableFeatured:n,openDelete:r,ContextMenuItem:a}){const{t:l}=N(),[s]=_a(),o=I(),[i]=da(),{push:c}=$(),{pathname:m}=U(),d=Ya((e=>e.exploreSort)),u=[{query:Ia,variables:{featured:!0,sort:d}}],[p]=function(e){const n={...Mn,...e};return t(ga,n)}({refetchQueries:u}),[g]=function(e){const n={...Mn,...e};return t(va,n)}({refetchQueries:u});return v.createElement(v.Fragment,null,v.createElement(Ul,null,(null==s?void 0:s.isAdmin)&&v.createElement(v.Fragment,null,!!n&&v.createElement(a,{label:e.isFeatured?"Remove from Featured":"Make Featured",onClick:()=>{e.isFeatured?g({variables:{input:{serverId:e.id}}}):p({variables:{input:{serverId:e.id}}})}})),!!s&&!!e.owner&&e.owner.id!==s.id&&v.createElement(a,{label:l("server.context.leave"),red:!0,onClick:()=>{m.startsWith(`/+${e.id}`)&&c("/"),i({variables:{input:{serverId:e.id}}});const t=o.cache.readQuery({query:ka});o.cache.writeQuery({query:ka,data:{user:{...t.user,servers:t.user.servers.filter((t=>t.id!==e.id))}}});const n=o.cache.readFragment({fragment:yr,id:`Server:${e.id}`});o.cache.writeFragment({fragment:yr,id:`Server:${e.id}`,data:{...n,isJoined:!1}})}}),!!s&&!!e.owner&&!!r&&(s.isAdmin||e.owner.id===s.id)&&v.createElement(a,{label:"Delete Planet",red:!0,onClick:()=>r()})))}function Dl({channel:e,server:t,openDelete:n,openEdit:r,ContextMenuItem:a}){const{t:l}=N(),[s]=Cl({server:t,permissions:[rr.ManageChannels]});return v.createElement(v.Fragment,null,v.createElement(Ul,null,s&&v.createElement(v.Fragment,null,v.createElement(a,{label:l("channel.context.edit"),onClick:()=>{r()}}),v.createElement(a,{label:l("channel.context.delete"),red:!0,onClick:()=>{n()}}))))}function Tl({folder:e,ContextMenuItem:n}){var r,a,l,s;const{t:o}=N(),[i]=_a(),c=null!=(r=null==i?void 0:i.folders)?r:[],m=!!i&&c.filter((e=>{var t;return(null==(t=e.owner)?void 0:t.id)!==i.id})).map((e=>e.id)).includes(e.id),d="Read Later"!==e.name&&"Favorites"!==e.name,[u]=function(e){const n={...Mn,...e};return t(Fr,n)}(),[p]=function(e){const n={...Mn,...e};return t(Rr,n)}(),[g]=function(e){const n={...Mn,...e};return t(Ar,n)}(),[h]=function(e){const n={...Mn,...e};return t(Mr,n)}(),{push:f}=$(),{pathname:b}=U(),E=S(b,{path:"/:server"}),x=null==(l=null==(a=null==E?void 0:E.params)?void 0:a.server)?void 0:l.substring(1);return v.createElement(v.Fragment,null,v.createElement(Ul,null,v.createElement(n,{label:o("folder.context.copyLink")}),!!i&&(null==(s=e.owner)?void 0:s.id)!==i.id&&v.createElement(v.Fragment,null,m?v.createElement(n,{label:o("folder.context.unfollow"),onClick:()=>g({variables:{input:{folderId:e.id}}})}):v.createElement(n,{label:o("folder.context.follow"),onClick:()=>p({variables:{input:{folderId:e.id}}})})),d&&v.createElement(v.Fragment,null,v.createElement(n,{label:o("folder.context.edit")}),!x&&v.createElement(n,{label:o("folder.context.collaborative"),checked:e.isCollaborative,onClick:()=>u({variables:{input:{folderId:e.id,isCollaborative:!e.isCollaborative}}})}),v.createElement(n,{label:o("folder.context.changeVisibility")},v.createElement(n,{label:o("folder.context.visibility.public"),checked:e.visibility===zn.Public,onClick:()=>u({variables:{input:{folderId:e.id,visibility:zn.Public}}})}),v.createElement(n,{label:o("folder.context.visibility.friends"),checked:e.visibility===zn.Friends,onClick:()=>u({variables:{input:{folderId:e.id,visibility:zn.Friends}}})}),v.createElement(n,{label:o("folder.context.visibility.unlisted"),checked:e.visibility===zn.Unlisted,onClick:()=>u({variables:{input:{folderId:e.id,visibility:zn.Unlisted}}})}),v.createElement(n,{label:o("folder.context.visibility.private"),checked:e.visibility===zn.Private,onClick:()=>u({variables:{input:{folderId:e.id,visibility:zn.Private}}})})),v.createElement(n,{label:o("folder.context.delete"),red:!0,onClick:()=>{h({variables:{input:{folderId:e.id}}}),b.startsWith("/folder")?f("/"):b.startsWith(`/${x}/folder`)&&f(`/${x}`)}}))))}function Ll(){return v.createElement("div",{className:"border-t dark:border-gray-800 mt-2 pb-2"})}const Ol=x("\n  p-2\n  w-48\n  dark:bg-gray-900\n  rounded\n  shadow-lg\n  outline-none\n  bg-white\n");function zl({bindMenu:{style:e,ref:t,role:n,tabIndex:r},data:a,bindMenuItem:l,hideMenu:s,isRight:o}){const i=(c={bindMenuItem:l,hideMenu:s,isRight:o},g.exports.useCallback((({onClick:e,red:t,label:n,checked:r,children:a})=>v.createElement(fl,{item:c,onClick:e,red:t,label:n,checked:r},a)),[c]));var c;const m=k()[1],d=(null==a?void 0:a.href)?new URL(a.href):null,u=d&&d.origin===window.location.origin,p="Mac OS"===Va(),h={...null!=a?a:{},ContextMenuItem:i};return v.createElement("div",{style:{...e,zIndex:999999},ref:t,role:n,tabIndex:r,className:Ol,onMouseDown:e=>{e.stopPropagation(),e.preventDefault()}},!!window.getSelection().toString()&&v.createElement(v.Fragment,null,v.createElement(i,{label:v.createElement("div",{className:"flex items-center w-full"},"Copy",v.createElement("div",{className:"ml-auto"},p?"⌘+C":"Ctrl+C")),onClick:()=>document.execCommand("copy")}),v.createElement(Ll,null)),(null==a?void 0:a.type)===El&&v.createElement(Il,{...h}),(null==a?void 0:a.type)===bl&&v.createElement(Pl,{...h}),(null==a?void 0:a.type)===yl&&v.createElement(Fl,{...h}),(null==a?void 0:a.type)===xl&&v.createElement(Rl,{...h}),(null==a?void 0:a.type)===wl&&v.createElement(Al,{...h}),(null==a?void 0:a.type)===kl&&v.createElement(Dl,{...h}),(null==a?void 0:a.type)===Nl&&v.createElement(Tl,{...h}),!!(null==a?void 0:a.href)&&!u&&v.createElement(v.Fragment,null,v.createElement(Ll,null),v.createElement(Ul,null,v.createElement(i,{label:"Copy Link",onClick:()=>m(a.href)}),v.createElement(i,{label:"Open Link",onClick:()=>window.open(a.href,"_blank")}))))}const ql=g.exports.createContext({useContextTrigger:e=>[{}]});function Hl({children:e}){const[t,n,r,{data:a,coords:l,setVisible:s,isRight:o}]=vl();return v.createElement(v.Fragment,null,v.createElement(ql.Provider,{value:{useContextTrigger:r}},e,v.createElement(zl,{bindMenu:t,data:a,bindMenuItem:n,hideMenu:()=>s(!1),isRight:o})))}function Bl({data:e,leftClick:t=!1,children:n,className:r}){const[a]=((e,t=!1)=>{const{useContextTrigger:n}=g.exports.useContext(ql);return n({collect:()=>e,mouseButton:t?ll:sl})})(e,t);return v.createElement("div",{className:r,...a},n)}const _l=e=>new Promise(((t,n)=>{const r=new FileReader;r.onload=e=>t(e.target.result),r.onerror=e=>n(e),r.readAsDataURL(e)})),jl=e=>{if(!e)return P;switch(e){case"Featured":return Y;case"Arts":return V;case"Business":return G;case"Culture":return j;case"Discussion":return _;case"Entertainment":return B;case"Gaming":return H;case"Health":return q;case"Hobbies":return z;case"Lifestyle":return O;case"Memes":return L;case"Meta":return T;case"News":return D;case"Politics":return A;case"Programming":return R;case"Science":return Wa;case"Sports":return M;case"Technology":return Za;case"Other":return F}},Gl=x("\n  relative\n  flex\n  items-center\n  pl-3\n  pr-10\n  text-left\n  bg-white\n  cursor-pointer\n  focus:outline-none\n  text-13\n  rounded\n  border\n  h-10\n  dark:bg-gray-800\n  dark:border-gray-700\n  border-b\n  border-t-0\n  border-r-0\n  border-l-0\n  rounded-none\n  focus:outline-none\n  transition\n  px-4\n  text-secondary\n"),Vl=x("\n  scrollbar-thin\n  dark:scrollbar-thumb-gray-750\n  dark:scrollbar-track-gray-850\n  scrollbar-thumb-rounded-md\n  absolute\n  py-1\n  mt-1\n  overflow-auto\n  text-13\n  text-secondary\n  bg-white\n  dark:bg-gray-850\n  rounded-md\n  shadow-lg\n  max-h-60\n  focus:outline-none\n  space-y-0.5\n  font-medium\n");function Yl({category:e,setCategory:t}){const n=Object.values(tr),r=jl(e);return v.createElement("div",{className:"min-w-full relative z-50"},v.createElement(W,{value:e,onChange:t},(({open:t})=>v.createElement(v.Fragment,null,v.createElement("div",{className:"relative"},v.createElement(W.Button,{className:Gl},e?v.createElement(v.Fragment,null,v.createElement(r,{className:"w-5 h-5 text-secondary"}),v.createElement("span",{className:"block truncate pl-3"},e)):v.createElement("span",{className:"block truncate text-tertiary"},"Category"),v.createElement("span",{className:"absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none"},v.createElement(Z,{className:"w-5 h-5 text-gray-400","aria-hidden":"true"}))),v.createElement(Q,{show:t,as:g.exports.Fragment,leave:"transition ease-in duration-100",leaveFrom:"opacity-100",leaveTo:"opacity-0"},v.createElement(W.Options,{static:!0,className:Vl},n.map((e=>v.createElement(W.Option,{key:e,className:({active:e})=>(e=>x(`\n  ${e?"dark:bg-gray-775":""}\n  cursor-pointer\n  select-none\n  relative\n  focus:outline-none\n`))(e),value:e},(({selected:t})=>v.createElement("div",{className:"flex items-center h-10 pl-3 pr-3 "+(t?"dark:bg-gray-775":"")},(()=>{const t=jl(e);return v.createElement(t,{className:"w-5 h-5 text-secondary"})})(),v.createElement("span",{className:"block truncate pl-2"},e)))))))))))))}function Wl({isOpen:e,close:t,children:n,closeOnOverlayClick:r=!1}){return v.createElement(Q,{show:e,as:g.exports.Fragment},v.createElement(J,{open:e,onClose:t,static:!0},v.createElement("div",{className:"fixed z-10 inset-0"},v.createElement("div",{className:"flex items-end justify-center min-h-screen text-center sm:block p-0"},v.createElement(Q.Child,{enter:"ease-out duration-150",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-150",leaveFrom:"opacity-100",leaveTo:"opacity-0"},v.createElement(J.Overlay,{className:"fixed inset-0 transition-opacity"},v.createElement("div",{className:"absolute inset-0 bg-gray-500 dark:bg-black opacity-75"}))),v.createElement(Q.Child,{enter:"ease-out transform duration-150",enterFrom:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",enterTo:"opacity-100 translate-y-0 sm:scale-100",leave:"ease-in transform duration-150",leaveFrom:"opacity-100 translate-y-0 sm:scale-100",leaveTo:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"},v.createElement("span",{className:"hidden sm:inline-block sm:align-middle sm:h-screen","aria-hidden":"true"},"​"),v.createElement("div",{onClick:()=>{r&&t()},className:"overflow-y-auto scrollbar dark:scrollbar-thumb-gray-800 dark:scrollbar-track-transparent inline-block h-screen transform transition-all align-middle w-screen"},v.createElement("div",{className:"flex min-h-full w-full items-center justify-center"},n)))))))}function Zl({children:e,buttons:t,open:n,close:r,closeOnOverlayClick:a,onSubmit:l,small:s=!1,large:o=!1}){return v.createElement(Wl,{isOpen:n,close:r,closeOnOverlayClick:a},v.createElement("form",{onSubmit:l,className:`md:rounded-lg dark:bg-gray-800 min-w-screen w-full relative text-left bg-white text-white ${s||o?"":"md:max-w-lg"} ${s?"md:max-w-sm":""} ${o?"md:max-w-screen-lg":""}`,onClick:e=>e.stopPropagation()},e,!!t&&v.createElement(v.Fragment,null,v.createElement("div",{className:"md:rounded-b-lg dark:bg-gray-750 h-9"}),v.createElement("div",{className:"absolute right-5 bottom-9 transform translate-y-1/2 flex items-center space-x-3 justify-end h-9"},(t.type===g.exports.Fragment?t.props.children:[t]).map(((e,t)=>v.createElement("div",{key:t,className:"dark:bg-gray-800 rounded"},e)))))))}function Ql({checked:e,onChange:t,children:n,green:r=!1,className:a,disabled:l}){return v.createElement(K.Group,{as:"div",className:"flex items-center space-x-3"},n&&v.createElement(K.Label,{className:a},n),v.createElement(K,{disabled:l,as:"button",checked:e,onChange:t,className:(e?""+(r?"bg-green-600":"bg-blue-600"):"dark:bg-gray-500 bg-gray-300")+" relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-10 focus:outline-none focus:shadow-outline"},(({checked:e})=>v.createElement("span",{className:(e?"translate-x-4":"translate-x-0.5")+" bg-gray-100 inline-block relative translate-y-1px w-4.5 h-4.5 transition duration-200 ease-in-out transform rounded-full"},v.createElement(X,{className:`absolute inset-1/2 transform -translate-y-1/2 -translate-x-1/2 w-4 h-4 transition-opacity duration-200 ${e?"opacity-100":"opacity-0"} ${r?"text-green-600":"text-blue-600"}`}),v.createElement(ee,{className:`absolute inset-1/2 transform -translate-y-1/2 -translate-x-1/2 w-4 h-4 transition-opacity duration-200 ${e?"opacity-0":"opacity-100"} text-gray-500`})))))}const Jl=/^[A-Za-z0-9_]+$/i;function Kl({open:e,setOpen:n,server:r}){var a,l,s,o;const[i,c]=g.exports.useState(null!=(a=null==r?void 0:r.isDownvotesEnabled)&&a),[m,{loading:d}]=function(e){const n={...Mn,...e};return t(sa,n)}({update(e,{data:{createServer:t}}){const n=e.readQuery({query:ka});e.writeQuery({query:ka,data:{user:{...n.user,servers:[t,...n.user.servers]}}})}}),[u,{loading:p}]=function(e){const n={...Mn,...e};return t(oa,n)}(),[h,f]=g.exports.useState(null!=(l=null==r?void 0:r.category)?l:tr.Other),{handleSubmit:E,register:x,watch:y,reset:w,setValue:N,formState:{errors:k,isValid:C}}=te({mode:"onChange"});y(((e,{type:t,value:n,name:r})=>{if("avatarFile"===r){const{avatarFile:t}=e;if(!t||!t[0])return;_l(t[0]).then((e=>M(e)))}else if("bannerFile"===r){const{bannerFile:t}=e;if(!t||!t[0])return;_l(t[0]).then((e=>A(e)))}}));const U=y("name"),S=y("displayName"),[I,P]=g.exports.useState(!1);g.exports.useEffect((()=>{I||null==S||N("name",S.replace(" ","_").replace(/[^A-Za-z0-9_]/i,""))}),[S]),g.exports.useEffect((()=>{U||P(!1)}),[U]);const[F,M]=g.exports.useState(null==r?void 0:r.avatarUrl),[R,A]=g.exports.useState(null==r?void 0:r.bannerUrl);g.exports.useEffect((()=>{r?(M(r.avatarUrl),A(r.bannerUrl),N("displayName",r.displayName),N("description",r.description||""),f(r.category),c(r.isDownvotesEnabled)):(w(),M(null),A(null),f(tr.Other),c(!1))}),[r]);const{push:D}=$(),T=(S||"").split(" ").map((e=>e[0])).join("").toUpperCase();return v.createElement(Zl,{open:e,close:()=>{n(!1)},closeOnOverlayClick:!0,onSubmit:E((({name:e,displayName:t,description:a,avatarFile:l,bannerFile:s})=>{r?u({variables:{input:{serverId:r.id,displayName:t,description:a,category:h,avatarFile:l?l[0]:null,bannerFile:s?s[0]:null,isDownvotesEnabled:i}}}).then((()=>{n(!1)})):m({variables:{input:{name:e,displayName:t,description:a,category:h,avatarFile:l?l[0]:null,bannerFile:s?s[0]:null,isDownvotesEnabled:i}}}).then((({data:{createServer:e}})=>{n(!1),D(`/+${e.name}`)}))})),buttons:r?v.createElement(b,{content:"Save Changes"},v.createElement("button",{type:"submit",className:"form-button-submit",disabled:!S||p||(null==S?void 0:S.length)<2},p?v.createElement(Ja,{className:"w-5 h-5 text-primary"}):v.createElement(X,{className:"w-5 h-5 text-primary"}))):v.createElement("button",{type:"submit",className:"form-button-submit",disabled:!S||!U||(null==S?void 0:S.length)<2||(null==U?void 0:U.length)<3||d||!Jl.test(U)},d?v.createElement(Ja,{className:"w-5 h-5 text-primary"}):v.createElement(ne,{className:"w-5 h-5 text-primary"}))},v.createElement("input",{type:"file",...x("bannerFile"),className:"hidden",id:"bannerFile",accept:"image/png,image/jpeg,image/webp,image/gif"}),v.createElement("label",{htmlFor:"bannerFile",className:"h-24 block relative rounded-t-lg group cursor-pointer bg-center bg-cover "+(R?"":"bg-gradient-to-br from-red-400 to-indigo-600"),style:R?{backgroundImage:`url(${R})`}:{}},v.createElement("div",{className:"rounded-t-lg absolute inset-0 transition bg-black opacity-0 group-hover:opacity-50 flex items-center justify-center"},v.createElement(re,{className:"w-10 h-10"}))),v.createElement("input",{type:"file",...x("avatarFile"),className:"hidden",id:"avatarFile",accept:"image/png,image/jpeg,image/webp,image/gif"}),v.createElement("label",{htmlFor:"avatarFile",className:"flex items-center justify-center cursor-pointer rounded-3xl h-24 w-24 absolute left-3 top-24 transform -translate-y-1/2 dark:bg-gray-700 shadow group bg-center bg-cover bg-white",style:F?{backgroundImage:`url(${F})`}:{}},!F&&v.createElement("div",{className:"text-tertiary text-3xl font-medium overflow-hidden"},T),v.createElement("div",{className:"absolute rounded-3xl inset-0 transition bg-black opacity-0 group-hover:opacity-50 flex items-center justify-center"},v.createElement(re,{className:"w-10 h-10"}))),v.createElement("div",{className:"pl-30 pr-5 pt-2 text-left"},v.createElement("input",{...x("displayName",{maxLength:100,required:!0}),placeholder:"Display Name",className:"form-input-lg",maxLength:100})),v.createElement("div",{className:"pb-5 space-y-3 pt-3 px-5 text-left"},v.createElement("div",null,v.createElement("div",{className:"text-sm text-accent flex items-center pt-3"},v.createElement("span",{className:"h-7 flex items-center"},"joincomet.app/+",null!=(s=null==r?void 0:r.name)?s:""),!r&&v.createElement("input",{...x("name",{pattern:Jl,required:!0,minLength:3,maxLength:21}),minLength:3,maxLength:21,placeholder:"Name",className:"bg-transparent h-7 w-full border-b dark:border-gray-700 focus:outline-none transition dark:focus:border-blue-500",onKeyPress:()=>P(!0)})),"pattern"===(null==(o=k.name)?void 0:o.type)&&v.createElement("div",{className:"form-error"},"Letters, numbers and underscores only")),v.createElement("textarea",{...x("description",{maxLength:500}),placeholder:"Description",className:"form-textarea",maxLength:500}),v.createElement("div",{className:"flex items-center"},v.createElement("div",{className:"text-13 font-medium text-tertiary pr-1.5"},"Category"),v.createElement(Yl,{category:h,setCategory:f})),v.createElement("div",{className:"pt-2"},v.createElement(Ql,{checked:i,onChange:()=>c(!i),green:!0},v.createElement("div",{className:"text-13 font-medium text-tertiary"},"Downvotes enabled")))))}function Xl(){const[e,t]=g.exports.useState(!1),{t:n}=N();return v.createElement(v.Fragment,null,v.createElement(al,{name:n("server.create.title"),onClick:()=>t(!0),className:"dark:bg-gray-800 bg-white hover:bg-purple-600 dark:hover:bg-purple-600"},v.createElement(Qa,{className:"w-5 h-5 text-purple-500 group-hover:text-white transition"})),v.createElement(Kl,{open:e,setOpen:t}))}function es({showPassword:e,setShowPassword:t}){return v.createElement(b,{content:e?"Hide Password":"Show Password"},v.createElement("div",{className:"form-show-password-button"},e?v.createElement(ae,{onClick:()=>t(!1),className:"w-5 h-5"}):v.createElement(le,{onClick:()=>t(!0),className:"w-5 h-5"})))}function ts({count:e}){return v.createElement("div",{className:"rounded-full bg-red-500 w-4 h-4 flex items-center justify-center"},v.createElement("div",{className:"leading-none text-11 font-medium text-primary",style:{marginLeft:"-1px"}},e))}function ns({hide:e=!1}){var t;const{pathname:n}=U(),{t:r}=N(),a=Ya((e=>e.homePage)),l="/explore"!==n&&!n.startsWith("/+"),s=n.startsWith("/explore"),o="Mac OS"===Va()&&window.electron,[i]=_a(),{data:c}=Pa({variables:{featured:!0},fetchPolicy:"cache-and-network",nextFetchPolicy:"cache-first"}),m=i?i.servers:null!=(t=null==c?void 0:c.publicServers)?t:[];return v.createElement(v.Fragment,null,v.createElement("div",{className:(e?"hidden md:flex":"flex")+" h-full flex-col items-center min-w-[4.5rem] w-18 bg-gray-300 dark:bg-gray-900 overflow-y-auto scrollbar-none"},o&&v.createElement("div",{className:"h-5"}),v.createElement("div",{className:"h-full flex flex-col items-center w-full divide-y dark:divide-gray-800 divide-gray-200"},v.createElement("div",{className:"space-y-2 flex flex-col items-center py-2"},v.createElement(al,{name:r("home"),to:""+(a?`/${a}`:"/"),active:l,className:""+(l?"bg-blue-600":"dark:bg-gray-800 bg-white hover:bg-blue-600 dark:hover:bg-blue-600")},v.createElement(se,{className:"w-5 h-5 group-hover:text-white transition "+(l?"text-white":"text-blue-500")})),v.createElement(al,{name:r("explore.title"),to:"/explore",active:s,className:s?"bg-green-600":"dark:bg-gray-800 bg-white hover:bg-green-600 dark:hover:bg-green-600"},v.createElement(oe,{className:"w-5 h-5 group-hover:text-white transition "+(s?"text-white":"text-green-500")})),!!i&&v.createElement(Xl,null)),!!m&&m.length>0&&v.createElement("div",{className:"space-y-2 flex flex-col items-center py-2"},m.map((e=>v.createElement(rs,{server:e,key:e.id})))))))}function rs({server:e}){var t,n,r,a;const{pathname:l}=U(),s=S(l,{path:"/:server"}),o=null==(n=null==(t=null==s?void 0:s.params)?void 0:t.server)?void 0:n.substring(1),i=Ya((e=>e.serverPages)),[c]=Cl({server:e,permissions:[rr.PrivateChannels]}),m=(null!=(r=e.channels)?r:[]).filter((e=>e.type!==Rn.Private||c)),d=!!m.find((e=>e.isUnread)),u=m.length>0?m.map((e=>e.mentionCount)).reduce(((e,t)=>e+t)):0,p=o===e.name,[h,f]=g.exports.useState(!1);return v.createElement(v.Fragment,null,v.createElement(as,{open:h,setOpen:f,server:e}),v.createElement(Bl,{className:"h-12",data:{type:wl,server:e,openDelete:()=>f(!0)}},v.createElement(al,{to:`/+${e.name}${null!=(a=i[e.name])?a:""}`,name:e.displayName,active:p,unread:d},v.createElement(tl,{server:e,size:12,className:"bg-gray-200 h-12 w-12 dark:bg-gray-800 group-hover:rounded-2xl transition-all "+(p?"rounded-2xl":"rounded-3xl")}),!!u&&v.createElement("div",{className:"absolute -bottom-1 -right-1 rounded-full border-3 dark:border-gray-900"},v.createElement(ts,{count:u})))))}function as({open:e,setOpen:n,server:r}){const[a,l]=g.exports.useState(""),[s,o]=g.exports.useState(!1),[i,{loading:c}]=function(e){const n={...Mn,...e};return t(ia,n)}(),{push:m}=$();return v.createElement(Zl,{open:e,close:()=>n(!1),closeOnOverlayClick:!0,small:!0,buttons:v.createElement(v.Fragment,null,v.createElement("button",{className:"form-button-cancel",type:"button",onClick:()=>n(!1)},"Cancel"),v.createElement("button",{className:"form-button-delete",type:"button",disabled:!a||c,onClick:()=>{i({variables:{input:{password:a,serverId:r.id}}}).then((()=>{n(!1),m("/")}))}},"Delete",c&&v.createElement(Ja,{className:"w-5 h-5 text-primary ml-3"})))},v.createElement("div",{className:"max-w-md w-full rounded-md dark:bg-gray-800 shadow-lg px-5 pt-5 pb-10"},v.createElement("div",{className:"text-red-400 text-lg font-semibold"},"Delete ",r.name),v.createElement("div",{className:"text-tertiary pb-3 pt-3 text-sm"},"All posts, comments, and messages will be lost. Enter your password to continue."),v.createElement("div",{className:"relative"},v.createElement("input",{id:"confirmPassword",name:"confirmPassword",className:"form-input-password",placeholder:"Password",value:a,onChange:e=>l(e.target.value),type:s?"text":"password"}),v.createElement(es,{showPassword:s,setShowPassword:o}))))}const ls=x("\n  transition\n  md:transition-none\n  fixed\n  md:relative\n  md:translate-x-0\n  top-0\n  bottom-0\n  bg-gray-200\n  dark:bg-gray-800\n  transform\n  z-50\n  md:z-0\n"),ss=e=>x(`\n  left-0\n  md:rounded-tl-lg\n  ${e?"translate-x-0":"-translate-x-full md:translate-x-0"}\n  flex\n  md:w-60\n  md:min-w-[15rem]\n  w-78\n  min-w-[19.5rem]\n`),os=x("\n  bg-black\n  bg-opacity-75\n  md:hidden\n  fixed\n  inset-0\n  z-40\n");function is({children:e,right:t=!1}){const[n,r,a,l]=Ya((e=>[e.showLeftSidebar,e.setShowLeftSidebar,e.showRightSidebar,e.setShowRightSidebar]));return v.createElement(v.Fragment,null,v.createElement(ie,null,(t?a:n)&&v.createElement(ce.div,{initial:{opacity:0},animate:{opacity:.75},exit:{opacity:0},transition:{duration:.15,ease:[.4,0,.2,1]},className:os,onClick:()=>{t&&a?l(!1):!t&&n&&r(!1)}})),v.createElement("div",{className:`${ls} ${t?(s=a,x(`\n  right-0\n  ${s?"translate-x-0":"translate-x-full"}\n  ${s?"md:block":"md:hidden"}\n  w-60\n  min-w-[15rem]\n`)):ss(n)}`},!t&&v.createElement("div",{className:"md:hidden",onClick:()=>r(!1)},v.createElement(ns,null)),v.createElement("div",{className:"relative h-full w-full scrollbar-dark overflow-y-auto",onClick:()=>{t||r(!1)}},e)));var s}const cs="Post",ms=(e,t,n)=>x(`\n  ${e&&"h-11"}\n  ${t&&"h-9"}\n  ${!e&&!t&&"h-9"}\n  group\n  rounded\n  cursor-pointer\n  flex\n  items-center\n  text-base\n  font-medium\n  px-4\n  w-full\n  ${n?"dark:hover:bg-gray-725 dark:active:bg-gray-725 hover:bg-gray-300 active:bg-gray-300":"dark:hover:bg-gray-775 dark:active:bg-gray-775 hover:bg-gray-300 active:bg-gray-300"}\n  text-gray-600\n  dark:text-gray-400\n  select-none\n  focus:outline-none\n  relative\n  hover:text-gray-700\n  dark:hover:text-gray-300\n`),ds=e=>x(`\n  text-gray-800\n  hover:text-gray-800\n  dark:text-gray-200\n  dark:hover:text-gray-200\n  ${e?"dark:bg-gray-700 dark:hover:bg-gray-700 bg-gray-300":"dark:bg-gray-750 dark:hover:bg-gray-750 bg-gray-300"}\n`);var us=g.exports.forwardRef((({children:e,large:t=!1,small:n=!1,to:r,onClick:a,active:l,exact:s=!1,light:o=!1},i)=>r?v.createElement(E,{ref:i,to:r,className:`${ms(t,n,o)} ${l?ds(o):""}`,activeClassName:null!=l?"":ds(o),exact:s},e):v.createElement("button",{ref:i,onClick:a,className:`${ms(t,n,o)} ${l?ds(o):""}`,type:"button"},e)));const ps=e=>x(`\n  px-3\n  pt-4\n  pb-1\n  text-gray-500\n  dark:text-gray-500\n  uppercase\n  text-11\n  font-semibold\n  tracking-wide\n  flex\n  items-center\n  justify-between\n  select-none\n  ${e&&"hover:text-gray-600 dark:hover:text-gray-400"}\n`);function gs({children:e,plusLabel:t,onClick:n}){const r=t&&n;return v.createElement("div",{className:ps(r)},e,r&&v.createElement(b,{content:t},v.createElement("div",{onClick:n},v.createElement(me,{className:"w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"}))))}var vs=J.Title;const hs=()=>Ya((e=>[e.loginDialog,e.setLoginDialog,e.createAccount,e.setCreateAccount])),fs=()=>{const e=hs()[1];return()=>e(!0)};function bs({children:e,className:t,icon:n,title:r,showDivider:a=!1}){const[l]=Ya((e=>[e.setShowLeftSidebar]));return v.createElement("header",{id:"header",className:"h-12 min-h-[3rem] items-center bg-white dark:bg-gray-750 border-b dark:border-gray-800 shadow flex"},v.createElement("div",{className:"flex items-center font-semibold text-base leading-5 text-primary pl-4 pr-4 "+(a?"border-r dark:border-gray-700 mr-4":"")},v.createElement(de,{className:"md:hidden mr-3 w-5 h-5 text-tertiary",onClick:()=>l(!0)}),v.createElement("div",{className:"text-tertiary mr-3"},n),r),v.createElement("div",{className:"flex-grow flex items-center min-w-0 pr-4"},e))}function Es({currentPage:e,setCurrentPage:t,page:n,green:r=!1,children:a}){return v.createElement("button",{onClick:()=>t(n),className:"text-base font-medium rounded px-1.5 py-0.5 cursor-pointer select-none flex flex-shrink-0 items-center focus:outline-none "+(n===e?r?"text-green-600 bg-green-900":"text-secondary dark:bg-gray-700 bg-gray-200":r?"text-secondary bg-green-600":"text-tertiary")},a||n)}function xs(){const[e,t]=Ya((e=>[e.showRightSidebar,e.setShowRightSidebar])),{t:n}=N();return v.createElement(b,{content:n(e?"user.hideUsers":"user.showUsers")},v.createElement("div",{className:"highlightable",onClick:()=>t(!e)},v.createElement(ue,{className:"w-5 h-5"})))}function ys(){const[e]=Ya((e=>[e.postsSort]));let t;switch(e){case"Hot":t=v.createElement(ve,{className:"w-5 h-5"});break;case"New":t=v.createElement(ge,{className:"w-5 h-5"});break;case"Top":t=v.createElement(pe,{className:"w-5 h-5"})}return v.createElement(bs,{title:e,icon:t,showDivider:"Top"===e},"Top"===e&&v.createElement("div",{className:"flex items-center space-x-4"},v.createElement(ws,{time:"Hour"}),v.createElement(ws,{time:"Day"}),v.createElement(ws,{time:"Week"}),v.createElement(ws,{time:"Month"}),v.createElement(ws,{time:"Year"}),v.createElement(ws,{time:"All"})),v.createElement("div",{className:"ml-auto space-x-5 flex items-center"},v.createElement(xs,null)))}function ws({time:e}){const{t:t}=N(),[n,r]=Ya((e=>[e.postsTime,e.setPostsTime]));return v.createElement(Es,{page:e,setCurrentPage:r,currentPage:n},t(`post.feed.time.${e.toLowerCase()}`))}const Ns=({serverId:e,folderId:t})=>{var r;const[a]=_a(),[l,s,o,i]=Ya((e=>[e.postsSort,e.postsTime,e.folderSort,e.postsFeed])),[c,m]=g.exports.useState(0),d={sort:t?o:l,time:"Top"!==l||t?null:s,serverId:e,folderId:t,feed:a||"Joined"!==i?i:"Featured"},{data:u,loading:p,fetchMore:v}=function(e){const t={...Mn,...e};return n(Sa,t)}({variables:d,fetchPolicy:"cache-and-network",nextFetchPolicy:"cache-first"}),h=null==u?void 0:u.posts.hasMore,f=null!=(r=null==u?void 0:u.posts.posts)?r:[];return[f,p,()=>{h&&0!==f.length&&(v({variables:{...d,offset:20*(c+1)},updateQuery:(e,{fetchMoreResult:t})=>({posts:{hasMore:t.posts.hasMore,posts:[...e.posts.posts,...t.posts.posts]}})}),m(c+1))},h]};function ks({children:e,render:t,className:n,placement:r="right"}){const[a,l]=g.exports.useState(!1),s=he(8);const o={name:"hideOnPopperBlur",defaultValue:!0,fn:e=>({onCreate(){e.popper.addEventListener("focusout",(t=>{e.props.hideOnPopperBlur&&t.relatedTarget&&!e.popper.contains(t.relatedTarget)&&e.hide()}))}})};return v.createElement(v.Fragment,null,v.createElement(fe,{render:e=>v.createElement(ce.div,{style:{x:s},...e,className:`hidden lg:block ${n}`},t((()=>l(!1)))),placement:r,interactive:!0,onMount:function(){l(!0),s.set(8),be(s,0,{ease:[.4,0,.2,1],duration:.15})},visible:a,onHide:()=>l(!1),onClickOutside:()=>l(!1),plugins:[o],zIndex:9999,appendTo:document.body},v.createElement("span",{className:"leading-none",onClick:()=>l(!0)},e)))}const Cs={gray:Ee.gray,red:Ee.red,yellow:Ee.amber,green:Ee.emerald,blue:Ee.blue,indigo:Ee.indigo,purple:Ee.violet,pink:Ee.pink},$s={transparent:"transparent",current:"currentColor",black:Ee.black,white:Ee.white,...Cs},Us={Red:$s.red[500],Yellow:$s.yellow[500],Green:$s.green[500],Blue:$s.blue[500],Indigo:$s.indigo[500],Purple:$s.purple[500],Pink:$s.pink[500]};var Ss=g.exports.forwardRef((({user:e,loading:t="eager",size:n=12,showOnline:r=!1,className:a="",dotClassName:l=""},s)=>v.createElement(el,{ref:s,avatarUrl:null==e?void 0:e.avatarUrl,loading:t,className:`${a} cursor-pointer rounded-full`,size:n,style:(null==e?void 0:e.avatarUrl)?{}:{backgroundColor:Us[null==e?void 0:e.color]}},r&&v.createElement("div",{className:`absolute bottom-0 right-0 rounded-full z-10 ${l} ${(null==e?void 0:e.isOnline)?"bg-green-500":"bg-gray-600"}`}),!(null==e?void 0:e.avatarUrl)&&v.createElement(xe,{className:"text-primary w-2/3 h-2/3"}))));function Is({user:e,role:t,children:n,placement:r="right"}){const a=Ya((e=>e.setDialogUserId));return e?v.createElement(v.Fragment,null,v.createElement(ks,{className:"w-64",placement:r,render:n=>v.createElement("div",{className:"w-full relative rounded-md shadow-lg duration-200 transform transition z-50 w-64"},v.createElement("div",{className:"p-3 flex flex-col items-center dark:bg-gray-850 rounded-t-md bg-white"},v.createElement("div",{className:"group relative"},v.createElement(Ss,{user:e,size:20,showOnline:!0,className:"dark:bg-gray-700 cursor-pointer select-none",dotClassName:"ring-5 w-4 h-4 dark:ring-gray-850 ring-white"}),v.createElement("div",{onClick:()=>{n(),a(e.id)},className:"cursor-pointer bg-black bg-opacity-50 transition rounded-full absolute whitespace-nowrap inset-0 flex items-center justify-center text-9 uppercase tracking-widest font-semibold opacity-0 group-hover:opacity-100"},"View Profile")),v.createElement("div",{className:"mt-3 text-base"},v.createElement("span",{className:"font-semibold text-primary"},e.username))),v.createElement("div",{className:"p-4 dark:bg-gray-800 rounded-b-md bg-gray-50"},t&&v.createElement("div",null,v.createElement("div",{className:"text-11 font-semibold uppercase tracking-widest text-secondary pb-2"},"Roles"),v.createElement("div",{style:{borderColor:t.color},className:"text-xs text-secondary font-medium pl-1 py-1 pr-2 leading-none rounded-full border inline-flex items-center "+(t.color?"":"dark:border-gray-700 border-gray-300")},v.createElement("div",{className:"w-3 h-3 rounded-full mr-1 "+(t.color?"":"dark:bg-gray-700 bg-gray-300"),style:{backgroundColor:t.color}}),t.name))))},n)):n}const Ps=/^https?:\/\/twitter\.com\/(?:#!\/)?(?:\w+)\/status(?:es)?\/(\d+)/,Fs=/^https?:\/\/banned\.video\/watch\?id=((?:\w){24})/,Ms=/^https?:\/\/open\.(?:spotify\.com\/)(?:embed\/)?(track|playlist|album)\/((?:\w){22})/,Rs=/^https?:\/\/gfycat\.com\/(\w+)/,As=/^https?:\/\/www\.bitchute\.com\/video\/(\w+)/,Ds=/^https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,Ts=/^https?:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/,Ls=/^https?:\/\/www\.twitch\.tv\/([a-zA-Z0-9_-]+)/,Os=/^https?:\/\/www\.twitch\.tv\/videos\/(\d+)/,zs=/^https?:\/\/clips\.twitch\.tv\/([a-zA-Z0-9_-]+)/,qs=e=>Ps.test(e),Hs=e=>Fs.test(e),Bs=e=>Ms.test(e),_s=e=>Rs.test(e),js=e=>As.test(e),Gs=e=>Ds.test(e),Vs=e=>Ls.test(e),Ys=e=>Os.test(e),Ws=e=>zs.test(e),Zs=x("aspect-h-9 aspect-w-16 relative"),Qs=x("w-full h-full");function Js({url:e}){if(qs(e)){const t=e.match(Ps)[1];return v.createElement(ye,{tweetId:t,options:{theme:"dark",align:"center",dnt:!0}})}if(Hs(e)){const t=e.match(Fs)[1];return v.createElement("div",{className:Zs},v.createElement("iframe",{src:`https://api.banned.video/embed/${t}?autoplay=false&amp;muted=false`,frameBorder:"0",allowFullScreen:!0,className:Qs}))}if(Bs(e)){const t=e.match(Ms),n=t[1],r=t[2];return v.createElement("div",{className:Zs},v.createElement("iframe",{src:`https://open.spotify.com/embed/${n}/${r}`,frameBorder:"0",allowTransparency:"true",allow:"encrypted-media",className:Qs}))}if(_s(e)){const t=e.match(Rs)[1];return v.createElement("div",{className:Zs},v.createElement("iframe",{src:`https://gfycat.com/ifr/${t}`,frameBorder:"0",scrolling:"no",allowFullScreen:!0,className:Qs}))}if(js(e)){const t=e.match(As)[1];return v.createElement("div",{className:Zs},v.createElement("iframe",{src:`https://www.bitchute.com/embed/${t}/`,frameBorder:"0",allowFullScreen:!0,className:Qs}))}if(Gs(e)||(e=>Ts.test(e))(e)){const t=Gs(e)?e.match(Ds)[1]:e.match(Ts)[1];return v.createElement(we,{videoId:t,containerClassName:"relative w-full h-0 aspect-h-9 aspect-w-16 overflow-hidden youtube",opts:{playerVars:{autoplay:1,controls:1}}})}if(Vs(e)){const t=e.match(Ls)[1];return v.createElement(Ne,{channel:t,layout:"video",theme:"dark",targetClass:Zs})}if(Ys(e)){const t=e.match(Os)[1];return v.createElement(Ne,{video:t,layout:"video",theme:"dark",targetClass:Zs})}if(Ws(e)){const t=e.match(zs)[1];return v.createElement("div",{className:Zs},v.createElement("iframe",{src:`https://clips.twitch.tv/embed?clip=${t}&parent=localhost&parent=joincomet.app`,frameBorder:"0",allowFullScreen:!0,scrolling:"no",className:Qs}))}return null}function Ks({image:e,width:t,height:n,rounded:r=!0}){const[a,l]=g.exports.useState(!1);return v.createElement("div",null,v.createElement("img",{onClick:()=>l(!0),src:e.smallUrl,alt:"",className:(r?"rounded":"")+" cursor-pointer max-w-full",width:t||e.smallWidth,height:n||e.smallHeight}),v.createElement(Wl,{closeOnOverlayClick:!0,close:()=>l(!1),isOpen:a},v.createElement("div",{className:"mx-auto"},v.createElement("div",{className:"text-left"},v.createElement("img",{onClick:e=>e.stopPropagation(),src:e.popupUrl,alt:"",width:e.popupWidth,height:e.popupHeight}),v.createElement("div",{className:"pt-1"},v.createElement("a",{href:e.originalUrl,className:"hover:underline cursor-pointer text-mid font-semibold text-13 focus:outline-none",target:"_blank",rel:"noreferrer noopener",onClick:e=>e.stopPropagation()},"Open original"))))))}function Xs({metadata:e,dark:t=!1}){var n,r,a;const[l,s]=g.exports.useState(!1),o=(i=e.url)&&(qs(i)||Hs(i)||Bs(i)||_s(i)||js(i)||Gs(i)||Vs(i)||Ys(i)||Ws(i));var i;const c=null==(n=e.themeColor)?void 0:n.replaceAll(" ","").trim().toLowerCase(),m=!c||c.startsWith("rgb(255,255,255")||c.startsWith("rgba(255,255,255")||c.startsWith("#")&&![...c.substring(1)].find((e=>"f"!==e));return v.createElement("div",null,v.createElement("div",{className:`rounded inline-flex transition ${t?"dark:bg-gray-850 "+(m?"dark:border-gray-950":""):"dark:bg-gray-800 "+(m?"dark:border-gray-900":"")} pt-4 border-l-4`,style:m?{}:{borderColor:e.themeColor}},v.createElement("div",{className:"flex-grow rounded-r-md pl-4 pr-4 pb-4 flex flex-col"},v.createElement("div",{className:"max-w-[400px] space-y-3"},e.publisher&&v.createElement("div",{className:"text-xs text-secondary"},e.publisher),v.createElement("div",{className:"leading-none"},v.createElement("a",{href:e.url,rel:"noopener nofollow noreferrer",target:"_blank",className:"text-sm font-semibold text-blue-400 hover:underline"},null!=(r=e.title)?r:"No title")),e.description&&!o&&v.createElement("div",{className:"text-13 text-secondary line-clamp-9",dangerouslySetInnerHTML:{__html:null!=(a=e.description)?a:"No description"}}),(o||e.image&&"summary_large_image"===e.twitterCard)&&v.createElement("div",{className:"pt-1 "+(l?"min-w-[400px]":"")},l?v.createElement(Js,{url:e.url}):v.createElement("div",{className:"max-w-[400px] w-full relative rounded cursor-pointer",onClick:()=>{o&&s(!0)}},o?v.createElement(v.Fragment,null,v.createElement("img",{alt:"Thumbnail",src:e.image.smallUrl,className:"rounded select-none",height:e.image.smallHeight,width:e.image.smallWidth}),v.createElement("div",{className:"absolute inset-0 flex items-center justify-center"},v.createElement("div",{className:"text-tertiary rounded-full bg-black bg-opacity-75 flex space-x-3 p-3"},v.createElement(ke,{className:"w-6 h-6 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition"}),v.createElement(Ce,{onClick:t=>{t.stopPropagation(),t.preventDefault(),window.open(e.url,"_blank")},className:"w-6 h-6 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition"})))):v.createElement(Ks,{image:e.image}))))),!!e.image&&"summary_large_image"!==e.twitterCard&&!o&&v.createElement("div",{className:"pr-4"},v.createElement(Ks,{width:80,height:80,image:e.image}))))}var eo=g.exports.memo((function({post:e,isPostPage:n=!1,showServerName:r=!1,className:a="",index:l}){var s,o,i,c,m;const{push:d}=$(),[u]=function(e){const n={...Mn,...e};return t(Vr,n)}(),[{opacity:p},f]=$e({type:cs,item:e,collect:e=>({opacity:e.isDragging()?.4:1})}),b=Ue().getMonitor().isDragging(),[E,x]=g.exports.useState(!1);g.exports.useEffect((()=>{if(!b){const e=setTimeout((()=>x(!1)),300);return()=>clearTimeout(e)}x(!0)}),[b]);const w=g.exports.useMemo((()=>{var t,n;return e.text||!(e.text||e.linkUrl||e.images&&0!==e.images.length)?"text post":e.linkUrl?e.domain:1===(null==(t=e.images)?void 0:t.length)?"image post":(null==(n=e.images)?void 0:n.length)>1?"image album":void 0}),[e.domain,e.images,e.linkUrl,e.text]),[N,k]=g.exports.useState(0),[C]=_a(),U=fs();return v.createElement(Bl,{data:{type:El,post:e}},v.createElement("div",{style:{opacity:p},className:`${a} cursor-pointer relative group hover:shadow dark:bg-gray-800 dark:hover:bg-gray-825 bg-gray-200 px-2 py-3 md:rounded flex hover:bg-gray-300`,onClick:()=>{E||d(e.relativeUrl)}},v.createElement("div",{className:"flex flex-col items-center pr-2"},v.createElement("button",{type:"button",className:"focus:outline-none p-1 rounded-full dark:hover:bg-gray-750 transition cursor-pointer hover:bg-gray-200 "+(e.voteType===lr.Up?"text-red-400":"text-mid"),onClick:t=>{if(t.stopPropagation(),t.preventDefault(),!C)return void U();let n=e.voteCount;e.voteType===lr.Up?n--:e.voteType===lr.None?n++:e.voteType===lr.Down&&(n+=2),u({variables:{input:{postId:e.id,type:e.voteType===lr.Up?lr.None:lr.Up}},optimisticResponse:{...e,voteType:e.voteType===lr.Up?lr.None:lr.Up,voteCount:n}})}},v.createElement(Se,{className:"w-5 h-5"})),v.createElement("div",{className:`text-13 leading-none font-semibold ${e.voteType===lr.Up?"text-red-400":""} ${e.voteType===lr.Down?"text-blue-400":""} ${e.voteType===lr.None?"text-tertiary":""}`},e.voteCount<0?0:e.voteCount),e.server.isDownvotesEnabled&&v.createElement("button",{type:"button",className:"focus:outline-none p-1 rounded-full dark:hover:bg-gray-750 transition cursor-pointer "+(e.voteType===lr.Down?"text-blue-400":"text-mid"),onClick:t=>{if(t.stopPropagation(),t.preventDefault(),!C)return void U();let n=e.voteCount;e.voteType===lr.Down?n++:e.voteType===lr.None?n--:e.voteType===lr.Up&&(n-=2),u({variables:{input:{postId:e.id,type:e.voteType===lr.Down?lr.None:lr.Down}},optimisticResponse:{...e,voteType:e.voteType===lr.Down?lr.None:lr.Down,voteCount:n}})}},v.createElement(Z,{className:"w-5 h-5"}))),!n&&v.createElement("div",{className:"w-26 min-w-[6.5rem] h-18 min-h-[4.5rem] rounded dark:bg-gray-750 bg-gray-300 mr-4 flex items-center justify-center bg-center bg-cover bg-no-repeat",style:e.thumbnailUrl?{backgroundImage:`url(${e.thumbnailUrl})`}:{}},!e.thumbnailUrl&&v.createElement(v.Fragment,null,e.linkUrl?v.createElement(Ie,{className:"w-8 h-8 text-mid"}):v.createElement(Pe,{className:"w-8 h-8 text-mid"}))),v.createElement("div",{className:"pr-4 flex-grow flex flex-col"},v.createElement("div",{className:"flex flex-wrap items-center pb-1.5",onClick:e=>{e.stopPropagation(),e.preventDefault()}},v.createElement(h,{to:`/+${e.server.name}`,className:"flex items-center"},v.createElement(tl,{server:e.server,size:5,className:"dark:bg-gray-750 rounded-full"}),v.createElement("span",{className:"ml-1.5 text-xs font-medium text-secondary"},e.server.displayName)),v.createElement("span",{className:"text-xs text-tertiary"}," · ",Fe(new Date(e.createdAt))," ago by"),v.createElement(Bl,{data:{type:bl,user:e.author}},v.createElement(Is,{user:e.author,role:null==(s=e.serverUser)?void 0:s.role},v.createElement("div",{className:"ml-1 cursor-pointer text-tertiary text-xs font-medium leading-none",style:{color:null==(i=null==(o=e.serverUser)?void 0:o.role)?void 0:i.color}},null!=(m=null==(c=e.author)?void 0:c.username)?m:"[deleted]"))),v.createElement("div",{className:"text-xs text-mid font-medium"}," · ",v.createElement("span",{className:"text-xs text-mid"},"(",w,")"))),v.createElement("div",{className:"text-secondary font-medium text-base"},e.title),n&&w&&(!!e.text||!!e.linkUrl||!!e.images.length)&&v.createElement("div",{className:"mt-0.5 pb-2"},!!e.text&&v.createElement("div",{dangerouslySetInnerHTML:{__html:e.text},className:"prose prose-sm dark:prose-dark max-w-none pt-0.5"}),!!e.linkUrl&&v.createElement(v.Fragment,null,e.linkMetadata?v.createElement("div",{className:"max-w-screen-sm w-full mt-2"},v.createElement(Xs,{dark:!0,metadata:e.linkMetadata})):v.createElement("a",{href:e.linkUrl,target:"_blank",rel:"noopener nofollow noreferrer",className:"text-sm text-blue-400 hover:underline cursor-pointer pt-0.5"},e.linkUrl)),!!e.images.length&&v.createElement("div",{className:"mt-2 max-w-[400px]"},v.createElement("div",{className:"flex relative"},v.createElement("div",{className:"w-full h-[300px] relative flex items-center justify-center dark:bg-gray-775"},e.images.map(((e,t)=>v.createElement("div",{key:t,className:"select-none "+(t===N?"block":"hidden")},v.createElement(Ks,{rounded:!1,image:e.image,key:t}))))),e.images.length>1&&v.createElement(v.Fragment,null,N>0&&v.createElement("div",{onClick:()=>k(N-1),className:"absolute left-3 top-1/2 transform -translate-y-1/2 rounded-full shadow flex items-center justify-center w-10 h-10 dark:bg-white"},v.createElement(Me,{className:"w-5 h-5 dark:text-black"})),N<e.images.length-1&&v.createElement("div",{onClick:()=>k(N+1),className:"absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full shadow flex items-center justify-center w-10 h-10 dark:bg-white"},v.createElement(y,{className:"w-5 h-5 dark:text-black"})))),!!e.images.find((e=>e.caption||e.linkUrl))&&v.createElement("div",{className:"h-12 dark:bg-gray-750 flex items-center px-5 text-sm select-none"},e.images[N].caption&&v.createElement("div",{className:"text-primary truncate pr-3",title:e.images[N].caption},e.images[N].caption),e.images[N].linkUrl&&v.createElement("a",{href:e.images[N].linkUrl,target:"_blank",rel:"noopener nofollow noreferrer",className:"ml-auto text-blue-400 hover:underline cursor-pointer"},e.images[N].linkUrl)))),v.createElement("div",{className:"flex items-center pt-1.5"},v.createElement("div",{className:"select-none text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center cursor-pointer"},v.createElement(_,{className:"w-5 h-5"}),v.createElement("div",{className:"ml-2 text-xs font-medium"},e.commentCount)),v.createElement(Bl,{data:{type:El,post:e},leftClick:!0},v.createElement("div",{className:"ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center cursor-pointer"},v.createElement(Re,{className:"text-disabled w-4 h-4"})))))))}));function to({folderId:e,serverId:t,showServerName:n,header:r}){const a=g.exports.useRef(null),[l,s,o,i]=Ns({folderId:e,serverId:t}),c=g.exports.useCallback(((e,t)=>{const r=e[t];return r?v.createElement("div",{className:"md:px-4 pb-1.5 px-0"},v.createElement(eo,{post:r,showServerName:n,index:t})):v.createElement("div",{style:{height:"1px"}})}),[n]);return v.createElement(v.Fragment,null,v.createElement(Ae,{className:"scrollbar-custom dark:bg-gray-750 bg-gray-100",components:{Header:r?()=>r:null,Footer:()=>i?v.createElement("div",{className:"flex items-center justify-center h-20"},v.createElement(Ja,null)):v.createElement(ja,null)},endReached:()=>{!s&&i&&o()},itemContent:e=>c(l,e),overscan:100,ref:a,style:{overflowX:"hidden"},totalCount:(null==l?void 0:l.length)||0}))}const no=e=>{const t=Ya((e=>e.setHomePage));g.exports.useEffect((()=>t(e)))};function ro({children:e,header:t,rightSidebar:n,leftSidebar:r}){return v.createElement("div",{className:"flex flex-grow"},r,v.createElement("div",{className:"flex flex-col flex-grow"},t,v.createElement("div",{className:"h-full"},e)),n)}const ao=/(https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,}\b(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)(?:[-a-zA-Z0-9@:%._+~#=?!&/]*))[\s\n]$/gi,lo=/(?:\()https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,}\b(?:[-a-zA-Z0-9@:%._+~#=?!&/()]*)(?:\))[\s\n]$/gi;function so(e,t,n){const r=qe(e,t,n);return new Te(e,((e,t,n,a)=>{const l=r.handler(e,t,n,a);return l&&l.insertText(t[0].slice(-1),a),l}))}var oo=De.extend({addProseMirrorPlugins(){const e=[so(ao,this.type,(e=>({href:e[1]}))),so(lo,this.type,(e=>({href:e[1]})))],t=Le({rules:e}),n=t.props.handleTextInput;return t.props.handleKeyDown=(e,t)=>{if("Enter"!==t.key)return!1;const{$cursor:r}=e.state.selection;return!!r&&n(e,r.pos,r.pos,"\n")},[t,new Oe({key:new ze("handlePaste"),props:{handlePaste:()=>!0}})]}});const io=He.create({name:"spoiler",inclusive:!1,defaultOptions:{HTMLAttributes:{"data-spoiler":""}},addAttributes:()=>({"data-spoiler":{default:""}}),parseHTML:()=>[{tag:"span[data-spoiler]"}],renderHTML({HTMLAttributes:e}){return["span",Be(this.options.HTMLAttributes,e),0]},addCommands:()=>({setSpoiler:e=>({commands:t})=>t.setMark("spoiler",e),toggleSpoiler:e=>({commands:t})=>t.toggleMark("spoiler",e),unsetSpoiler:()=>({commands:e})=>e.unsetMark("spoiler")})});function co({text:e,setText:t}){var n;const r=_e({extensions:[je.configure({heading:{levels:[2,3]}}),oo,Ge,io],content:e,editorProps:{attributes:{class:"prose prose-sm dark:prose-dark focus:outline-none max-w-none min-h-[7.5rem] p-4"}}}),a=null!=(n=null==r?void 0:r.getHTML())?n:"";g.exports.useEffect((()=>{t("<p></p>"===a?"":a)}),[r,a,t]);const l=/https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,}\b(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)/i,s=g.exports.useCallback((e=>{var t;const n=null==(t=e.clipboardData)?void 0:t.getData("text/plain");n&&(l.test(n)?null==r||r.commands.insertContent(`<a href="${n}" target="_blank" rel="noopener noreferrer nofollow">${n}</a>`):null==r||r.commands.insertContent(n),null==r||r.commands.focus())}),[r]);return g.exports.useEffect((()=>(document.body.addEventListener("paste",s),()=>{document.body.removeEventListener("paste",s)})),[s]),v.createElement("div",{className:"dark:bg-gray-750 rounded bg-gray-100"},v.createElement(vo,{editor:r}),v.createElement(Ve,{editor:r}))}const mo=e=>x(`\n  p-1\n  rounded\n  dark:hover:bg-gray-600\n  hover:bg-gray-100\n  cursor-pointer\n  ${e?"dark:bg-gray-600 dark:text-gray-300":"text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}\n`);function uo({label:e,icon:t,small:n,onClick:r,active:a}){const l=t;return v.createElement(b,{content:e},v.createElement("div",{className:"h-9 flex items-center",onClick:r},v.createElement("div",{className:mo(a)},v.createElement(l,{className:""+(n?"w-4 h-4 mt-0.5":"w-5 h-5")}))))}const po=x("\n  flex\n  items-center\n  px-2\n  h-full\n  space-x-0.5\n");function go({children:e}){return v.createElement("div",{className:po},e)}function vo({editor:e}){return e?v.createElement("div",{className:"min-h-[2.25rem] border-b dark:border-gray-700 border-gray-300 flex flex-wrap items-center divide-x dark:divide-gray-700 divide-gray-300"},v.createElement(go,null,v.createElement(uo,{label:"Bold (Ctrl+B)",icon:Ye,onClick:()=>e.chain().focus().toggleBold().run(),active:e.isActive("bold")}),v.createElement(uo,{label:"Italic (Ctrl+U)",icon:We,onClick:()=>e.chain().focus().toggleItalic().run(),active:e.isActive("italic")}),v.createElement(uo,{label:"Underline (Ctrl+I)",icon:Ze,onClick:()=>e.chain().focus().toggleUnderline().run(),active:e.isActive("underline")}),v.createElement(uo,{label:"Strikethrough",icon:Qe,onClick:()=>e.chain().focus().toggleStrike().run(),active:e.isActive("strike")})),v.createElement(go,null,v.createElement(uo,{label:"Spoiler",icon:Je,onClick:()=>e.chain().focus().toggleSpoiler().run(),active:e.isActive("spoiler")}),v.createElement(uo,{label:"Inline Code",icon:R,onClick:()=>e.chain().focus().toggleCode().run(),active:e.isActive("code")})),v.createElement(go,null,v.createElement(uo,{label:"Link",icon:Ke,onClick:()=>{const t=window.prompt("URL");e.chain().focus().setLink({href:t}).run()},active:e.isActive("link")}),e.isActive("link")&&v.createElement(uo,{label:"Remove Link",icon:Xe,onClick:()=>{e.chain().focus().unsetLink().run()}}),v.createElement(uo,{label:"Divider",icon:et,onClick:()=>e.chain().focus().setHorizontalRule().run()})),v.createElement(go,null,v.createElement(uo,{label:"Bulleted List",icon:tt,onClick:()=>e.chain().focus().toggleBulletList().run(),active:e.isActive("bulletList")}),v.createElement(uo,{label:"Numbered List",icon:nt,onClick:()=>e.chain().focus().toggleOrderedList().run(),active:e.isActive("orderedList")})),v.createElement(go,null,v.createElement(uo,{label:"Large Heading (Ctrl+[)",icon:rt,onClick:()=>e.chain().focus().toggleHeading({level:2}).run(),active:e.isActive("heading",{level:2})}),v.createElement(uo,{label:"Small Heading (Ctrl+])",icon:rt,small:!0,onClick:()=>e.chain().focus().toggleHeading({level:3}).run(),active:e.isActive("heading",{level:3})})),v.createElement(go,null,v.createElement(uo,{label:"Block Quote",icon:at,onClick:()=>e.chain().focus().toggleBlockquote().run(),active:e.isActive("blockquote")}),v.createElement(uo,{label:"Code Block",icon:lt,onClick:()=>e.chain().focus().toggleCodeBlock().run(),active:e.isActive("codeBlock")})),v.createElement(go,null,v.createElement(uo,{label:"Emoji",icon:L}))):null}const ho=x("\n  relative\n  w-full\n  h-12\n  flex\n  items-center\n  pl-5\n  pr-10\n  text-left\n  bg-white\n  dark:bg-gray-800\n  dark:hover:bg-gray-775\n  cursor-pointer\n  focus:outline-none\n  text-sm\n  rounded-none\n  rounded-tl-xl\n"),fo=x("\n  scrollbar-dark\n  absolute\n  w-full\n  py-1\n  mt-1\n  overflow-auto\n  text-sm\n  text-primary\n  bg-white\n  dark:bg-gray-775\n  rounded-md\n  shadow-lg\n  max-h-60\n  focus:outline-none\n  space-y-0.5\n");function bo({servers:e=[],server:t,setServer:n}){return v.createElement("div",{className:"col-span-1 z-10"},v.createElement(W,{value:t,onChange:n},(({open:n})=>v.createElement(v.Fragment,null,v.createElement("div",{className:"relative"},v.createElement(W.Button,{className:ho},t?v.createElement(v.Fragment,null,v.createElement(tl,{server:t,className:"dark:bg-gray-750 rounded-full",size:7}),v.createElement("span",{className:"block truncate pl-2"},t.name)):v.createElement("span",{className:"block truncate text-red-400"},"Select a planet"),v.createElement("span",{className:"absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none"},v.createElement(Z,{className:"w-5 h-5 text-gray-400","aria-hidden":"true"}))),v.createElement(Q,{show:n,as:g.exports.Fragment,leave:"transition ease-in duration-100",leaveFrom:"opacity-100",leaveTo:"opacity-0"},v.createElement(W.Options,{static:!0,className:fo},e.map((e=>v.createElement(W.Option,{key:e.id,className:({active:e})=>(e=>x(`\n  ${e?"dark:bg-gray-750":""}\n  cursor-pointer\n  select-none\n  relative\n  focus:outline-none\n`))(e),value:e},(({selected:t})=>v.createElement("div",{className:"flex items-center h-10 pl-5 pr-4 "+(t?"dark:bg-gray-750":"")},v.createElement(tl,{server:e,size:7,className:"dark:bg-gray-725 rounded-full"}),v.createElement("span",{className:(t?"font-semibold":"font-normal")+" block truncate pl-2"},e.name)))))))))))))}const Eo=(e,t)=>{const n=g.exports.useRef(e);g.exports.useEffect((()=>{n.current=e}),null!=t?t:[e]);return g.exports.useCallback(((...e)=>{var t;null==(t=n.current)||t.call(n,...e)}),[])};var xo=g.exports.forwardRef((({onChange:e,onInput:t,onBlur:n,onKeyPress:r,onKeyDown:a,onPaste:l,...s},o)=>{const i=Eo(e),c=Eo(t),m=Eo(n),d=Eo(r),u=Eo(a),p=Eo(l);return v.createElement(st,{...s,ref:o,onChange:i,onInput:c,onBlur:m,onKeyPress:d,onKeyDown:u,onPaste:p})}));const yo=x("\n  block\n  text-11\n  pb-1.5\n  font-semibold\n  tracking-widest\n  uppercase\n  text-tertiary\n"),wo=x("\n  text-base\n  text-primary\n  disabled:opacity-50\n  bg-green-600\n  rounded\n  px-5\n  h-9\n  flex\n  items-center\n  disabled:cursor-not-allowed\n  focus:outline-none\n  select-none\n"),No=x("\n  text-base\n  text-tertiary\n  focus:outline-none\n  px-2\n  h-9\n  flex\n  items-center\n  select-none\n"),ko=e=>x(`\n  px-5\n  h-12\n  border-b-2\n  dark:hover:bg-gray-775\n  hover:bg-gray-200\n  ${e?"dark:border-gray-100 text-primary dark:bg-gray-775 bg-gray-200":"border-transparent text-tertiary"}\n  flex\n  items-center\n  justify-center\n  select-none\n  cursor-pointer\n  text-sm\n  last:rounded-tr-xl\n`),Co=x("\n  px-4\n  h-10\n  placeholder-tertiary\n  dark:bg-gray-750\n  bg-gray-100\n  rounded\n  text-sm\n  text-primary\n  w-full\n  focus:outline-none\n"),$o="Text",Uo="Link",So="Image";function Io({open:e,setOpen:r,serverId:a}){var l,s,o,i,c,m,d,u,p,h;const[f,b]=g.exports.useState(""),[E,{loading:x}]=function(e){const n={...Mn,...e};return t(jr,n)}(),{t:y}=N(),{push:w}=$(),[k]=_a(),C=null!=(l=null==k?void 0:k.servers)?l:[],[U,S]=g.exports.useState(a?null==C?void 0:C.find((e=>e.id===a)):null),[I,P]=g.exports.useState($o),{register:F,handleSubmit:M,reset:R,formState:A,watch:D,setValue:T,trigger:L}=te({mode:"onChange"}),O=D("linkUrl"),[z,q]=g.exports.useState("");ot((()=>{q(O)}),500,[O]);const H=D("title"),{data:B,loading:_}=function(e){const t={...Mn,...e};return n(Ca,t)}({variables:{linkUrl:z},skip:!z||!it(z)}),j=null==B?void 0:B.getLinkMeta,[G,V]=g.exports.useState([]);function Y(e){return new Promise((function(t,n){let r=new FileReader;r.onload=function(){t(r.result)},r.onerror=function(){n(r)},r.readAsDataURL(e)}))}const[W,Z]=g.exports.useState(0),Q=()=>{r(!1),setTimeout((()=>{Z(0),V([]),P($o),R()}),300)};return v.createElement(Wl,{isOpen:e,close:Q},v.createElement("form",{onSubmit:M((({title:e,linkUrl:t})=>{E({variables:{input:{title:e,text:f&&I===$o?f:null,linkUrl:t&&I===Uo?t:null,serverId:U.id,images:G&&G.length>0&&I===So?G.map((({file:e,caption:t,linkUrl:n})=>({file:e,caption:t,linkUrl:n}))):null}}}).then((({data:e})=>{const t=null==e?void 0:e.createPost;t&&(r(!1),R(),w(t.relativeUrl))}))})),className:"max-w-screen-md w-full dark:bg-gray-800 bg-white text-left rounded-xl"},v.createElement("div",{className:"grid grid-cols-4"},v.createElement(bo,{servers:C,server:U,setServer:S}),v.createElement("div",{className:ko(I===$o),onClick:()=>{P($o),T("linkUrl",""),V([])}},v.createElement(Pe,{className:"mr-2 w-5 h-5"}),"Text"),v.createElement("div",{className:ko(I===Uo),onClick:()=>{P(Uo),b(""),V([])}},v.createElement(ct,{className:"mr-2 w-5 h-5"}),"Link"),v.createElement("div",{className:ko(I===So),onClick:()=>{P(So),T("linkUrl",""),L("linkUrl"),b("")}},v.createElement(mt,{className:"mr-2 w-5 h-5"}),"Images")),v.createElement("div",{className:"p-5"},v.createElement("div",{className:"relative"},v.createElement("label",{htmlFor:"title",className:yo},"Title",(null==H?void 0:H.length)>0&&` (${null==H?void 0:H.length}/300)`),v.createElement("input",{maxLength:300,className:Co,...F("title",{required:!0}),id:"title"})),I===$o&&v.createElement("div",{className:"pt-5"},v.createElement(co,{text:f,setText:b})),I===Uo&&v.createElement(v.Fragment,null,v.createElement("div",{className:"pb-5 pt-1.5"},(null==j?void 0:j.title)&&H!==(null==j?void 0:j.title)&&v.createElement("span",{className:"text-xs text-blue-500 hover:underline cursor-pointer line-clamp-1",onClick:()=>{T("title",null==j?void 0:j.title),L("title")}},null==j?void 0:j.title)),v.createElement("label",{htmlFor:"linkUrl",className:"block text-11 pb-1.5 font-semibold tracking-widest uppercase text-tertiary"},"Link URL"),v.createElement("div",{className:"relative h-10"},v.createElement(ct,{className:"top-1/2 left-2.5 transform -translate-y-1/2 absolute w-5 h-5 text-mid"}),v.createElement("input",{maxLength:2e3,className:"px-10 h-10 dark:bg-gray-750 bg-gray-100 rounded text-sm text-primary w-full focus:outline-none",...F("linkUrl",{validate:e=>!e||it(e)}),id:"linkUrl"}),_&&v.createElement("div",{className:"top-1/2 right-2.5 transform -translate-y-1/2 absolute"},v.createElement(Ja,null))),O&&!it(O)&&v.createElement("div",{className:"text-13 text-red-400 pt-1"},"Must be a valid URL"),z&&it(z)&&!!j&&v.createElement("div",{className:"mt-5"},v.createElement(Xs,{dark:!0,metadata:j}))),I===So&&v.createElement("div",{className:"mt-5"},G&&G.length>0?v.createElement("div",null,v.createElement("div",{className:"flex"},v.createElement("div",{className:"flex scrollbar-custom items-center space-x-3 overflow-x-auto border dark:border-gray-700 rounded-md h-31 px-3 max-w-full w-full"},G.map(((e,t)=>v.createElement("div",{key:t,onClick:()=>Z(t),className:"cursor-pointer group relative rounded border "+(W===t?"dark:border-gray-500":"dark:border-transparent")},v.createElement("div",{className:"max-w-25 max-h-25 min-w-[6.25rem] min-h-[6.25rem] transform "+(W===t?"scale-85":"")},v.createElement("div",{className:"absolute top-1 right-1 rounded-full bg-black p-0.5 hidden group-hover:block z-10",onClick:()=>{W>=t&&W>0&&setImmediate((()=>Z(W-1)));const e=G.slice();e.splice(t,1),V(e)}},v.createElement(ee,{className:"w-4.5 h-4.5 text-white"})),v.createElement("div",{className:"absolute inset-0 bg-black rounded bg-opacity-0 group-hover:bg-opacity-50"}),v.createElement("div",{style:{backgroundImage:`url(${e.data})`},className:"max-w-25 max-h-25 min-w-[6.25rem] min-h-[6.25rem] bg-cover bg-center select-none rounded"}))))),v.createElement("div",{className:"w-25 h-25 rounded relative flex items-center justify-center border dark:border-gray-700 border-dashed cursor-pointer transition dark:hover:bg-gray-775"},v.createElement("input",{type:"file",id:"file",accept:"image/png,image/jpeg,image/webp,image/gif",hidden:!0,multiple:!0,onChange:e=>{const t=e.target.files;if(t&&t.length>0){V([...G,...Array.from(t).map((e=>({file:e,caption:"",linkUrl:""})))]);let e=[];for(let n=0;n<t.length;n++)e.push(Y(t[n]));Promise.all(e).then((e=>{V([...G,...e.map(((e,n)=>({file:t[n],caption:"",linkUrl:"",data:e})))])}))}}}),v.createElement("label",{htmlFor:"file",className:"absolute inset-0 block cursor-pointer"}),v.createElement(me,{className:"w-1/2 h-1/2 text-tertiary"})))),G&&(null==G?void 0:G.length)>0&&v.createElement("div",{className:"mt-5 flex space-x-5"},v.createElement("div",{className:"w-81 h-81 bg-contain bg-center bg-no-repeat dark:bg-gray-775 flex-shrink-0",style:{backgroundImage:`url(${null==(s=G[W])?void 0:s.data})`}}),v.createElement("div",{className:"space-y-5 max-w-full flex-grow"},v.createElement("div",null,v.createElement("label",{htmlFor:"caption",className:yo},"Caption",(null==(i=null==(o=G[W])?void 0:o.caption)?void 0:i.length)>0&&` (${null==(m=null==(c=G[W])?void 0:c.caption)?void 0:m.length}/180)`),v.createElement(xo,{id:"caption",className:"px-4 py-2.5 min-h-[2.5rem] dark:bg-gray-750 bg-gray-100 rounded text-sm text-primary focus:outline-none break-word",html:(null==(d=G[W])?void 0:d.caption)||"",onChange:e=>{var t,n;if((null==(n=null==(t=G[W])?void 0:t.caption)?void 0:n.length)>=180)return;const r=G.slice();let a=e.target.value;a.length>180&&(a=a.substring(0,181)),r[W].caption=a,V(r)}})),v.createElement("div",null,v.createElement("label",{htmlFor:"link",className:yo},"Link"),v.createElement("input",{id:"link",className:Co,value:(null==(u=G[W])?void 0:u.linkUrl)||"",onChange:e=>{const t=G.slice();t[W].linkUrl=e.target.value,V(t)}}),(null==(p=G[W])?void 0:p.linkUrl)&&!it(null==(h=G[W])?void 0:h.linkUrl)&&v.createElement("div",{className:"text-13 text-red-400 pt-1"},"Must be a valid URL"))))):v.createElement("div",{className:"relative"},v.createElement("input",{type:"file",id:"files",accept:"image/png,image/jpeg,image/webp,image/gif",hidden:!0,multiple:!0,onChange:e=>{const t=e.target.files;if(t&&t.length>0){V(Array.from(t).map((e=>({file:e,caption:"",linkUrl:""}))));let e=[];for(let n=0;n<t.length;n++)e.push(Y(t[n]));Promise.all(e).then((e=>V(e.map(((e,n)=>({file:t[n],caption:"",linkUrl:"",data:e}))))))}}}),v.createElement("label",{htmlFor:"files",className:"select-none cursor-pointer flex items-center justify-center text-base text-tertiary h-30 border border-dashed dark:border-gray-700 rounded-md transition dark:hover:bg-gray-775"},"Drag 'n' drop some images here, or click to select images"))),v.createElement("div",{className:"flex items-center pt-5"},v.createElement("div",{className:"ml-auto flex items-center space-x-3"},v.createElement("button",{type:"button",className:No,onClick:()=>Q()},y("post.create.cancel")),v.createElement("button",{type:"submit",className:wo,disabled:!A.isValid||!U||x},y("post.create.submit"),x&&v.createElement(Ja,{className:"w-5 h-5 text-primary ml-3"})))))))}function Po({server:e}){const{t:t}=N(),[n,r]=g.exports.useState(!1),[a]=_a();return v.createElement(v.Fragment,null,v.createElement(Io,{open:n,setOpen:r,serverId:null==e?void 0:e.id}),v.createElement("div",{className:"p-4"},v.createElement("div",{onClick:()=>r(!0),className:"dark:bg-gray-700 h-13 flex items-center rounded transition dark:hover:bg-gray-650 cursor-pointer bg-gray-200 hover:bg-gray-300"},v.createElement("div",{className:"px-3 border-r dark:border-gray-650 border-gray-300 h-7"},v.createElement(Ss,{user:a,size:7})),v.createElement("div",{className:"text-sm text-secondary px-3"},t("post.createPost")))))}const Fo=()=>"Notification"in window&&"serviceWorker"in navigator&&"PushManager"in window,Mo=({onClick:e,title:t,body:n,icon:r,timestamp:a})=>{if(!Fo())return;if("granted"!==Notification.permission)return;new Notification(t,{body:n,icon:r,timestamp:a,silent:!0}).onclick=e;const l=new Audio((window.electron?".":"")+"/notification.mp3");l.volume=.5,l.play()},Ro=x("\n  cursor-pointer\n  hover:underline\n"),Ao="bc1q85hzedw8wr29ylyh329z9e5dhz4yuqnc2830wc",Do="0x119b5129D730156017a69BD21e2ce774143C845b";function To(){const e=k()[1];return v.createElement(is,{right:!0},v.createElement("div",{className:"px-2.5 py-2.5 flex flex-col"},v.createElement("div",{className:"mt-auto"}),v.createElement("div",{className:"dark:border-gray-750 border rounded p-2.5 text-xs text-tertiary leading-5"},v.createElement("div",{className:"space-x-3"},v.createElement(h,{to:"/help/terms",target:"_blank",className:Ro},"Terms"),v.createElement(h,{to:"/help/privacy",target:"_blank",className:Ro},"Privacy Policy"),v.createElement(h,{to:"/help/content",target:"_blank",className:Ro},"Content Policy"),v.createElement("a",{href:"https://github.com/joincomet/comet",target:"_blank",rel:"noopener noreferrer",className:Ro},"GitHub"),v.createElement("a",{href:"https://discord.gg/NPCMGSm",target:"_blank",rel:"noopener noreferrer",className:Ro},"Discord")),v.createElement("div",{className:"pt-1.5"},"© ",(new Date).getFullYear()," CometX, LLC")),v.createElement("div",{className:"space-y-0.5 text-xs text-tertiary leading-5 pt-1.5 break-all"},v.createElement("div",null,"Donations appreciated!"),v.createElement(b,{content:"Click to copy"},v.createElement("div",{className:"cursor-pointer",onClick:()=>{e(Ao),C.success("BTC donation address copied!")}},v.createElement("span",{className:"select-none"},"BTC: "),v.createElement("span",{className:"highlightable"},Ao))),v.createElement(b,{content:"Click to copy"},v.createElement("div",{className:"cursor-pointer",onClick:()=>{e(Do),C.success("ETH/BSC/MATIC donation address copied!")}},v.createElement("span",{className:"select-none"},"ETH/BSC/MATIC: "),v.createElement("span",{className:"highlightable"},Do))))))}function Lo(){const[e]=_a();return no(null),g.exports.useEffect((()=>{Fo()&&"default"===Notification.permission&&Notification.requestPermission().then((function(e){"granted"===e&&Mo({title:"Notifications enabled!",icon:"/icons/icon.png"})}))}),[]),v.createElement(v.Fragment,null,v.createElement(dt,null,v.createElement("title",null,"Home – Comet")),v.createElement(ro,{header:v.createElement(ys,null),rightSidebar:v.createElement(To,null)},v.createElement(to,{showServerName:!0,header:e?v.createElement(Po,null):v.createElement("div",{className:"h-4"})})))}function Oo({className:e}){return v.createElement("svg",{className:e,version:"1.1",viewBox:"0 0 6.3938 6.3938",xmlns:"http://www.w3.org/2000/svg"},v.createElement("defs",null,v.createElement("linearGradient",{id:"linearGradient971",x1:"7.7677",x2:"14.802",y1:"5.3857",y2:"5.3857",gradientTransform:"rotate(32 322.69 255.38)",gradientUnits:"userSpaceOnUse"},v.createElement("stop",{stopColor:"#6875f5",offset:"0"}),v.createElement("stop",{stopColor:"#f98080",offset:"1"}))),v.createElement("g",{transform:"translate(-188.06 124.29)"},v.createElement("path",{d:"m192.01-123.61a2.4814 2.526 32 0 0-0.37414 0.0274 1.9313 1.966 32 0 1 0.33022 2.4892 1.9313 1.966 32 0 1-2.3823 0.7953 2.4814 2.526 32 0 0 1.0387 1.3436 2.4814 2.526 32 0 0 3.4427-0.82683 2.4814 2.526 32 0 0-0.76584-3.4572 2.4814 2.526 32 0 0-1.2893-0.37155zm-3.9109 0.15503c-0.20116-0.0233 0.37961 0.32545 2.1063 2.4024 0.31374 0.37744 0.9773 0.0996 1.2604-0.35346 0.28309-0.45304 0.24162-1.1707-0.23513-1.2873l-2.9983-0.73329c-0.0596-0.0146-0.10458-0.0251-0.13332-0.0284z",fill:"url(#linearGradient971)"})))}function zo({className:e}){const[t]=g.exports.useState((new Date).getTime().toString());return v.createElement("svg",{className:e,fill:"currentColor",viewBox:"0 0 30.327 5.0518"},v.createElement("defs",null,v.createElement("linearGradient",{id:t,x1:"7.7677",x2:"14.802",y1:"5.3857",y2:"5.3857",gradientTransform:"translate(1.0113e-4,1.6184e-4)",gradientUnits:"userSpaceOnUse"},v.createElement("stop",{stopColor:"#6875f5",offset:"0"}),v.createElement("stop",{stopColor:"#f98080",offset:"1"}))),v.createElement("g",{transform:"translate(-56.423 -63.81)",strokeWidth:".26458"},v.createElement("path",{d:"m61.235 68.093q-0.18344 0.16933-0.50094 0.34572t-0.72672 0.30339q-0.40922 0.11994-0.87489 0.11994-0.5715 0-1.0654-0.17639-0.49389-0.18344-0.86783-0.51506-0.36689-0.33161-0.5715-0.79728-0.20461-0.47272-0.20461-1.0513 0-0.54328 0.21167-1.0019 0.21872-0.45861 0.59972-0.79728t0.87489-0.52211q0.49389-0.1905 1.0442-0.1905 0.45156 0 0.86783 0.127 0.41628 0.11994 0.74083 0.31044 0.33161 0.1905 0.52917 0.39511l-0.47272 0.61383q-0.34572-0.30339-0.76906-0.49389-0.42333-0.19756-0.9525-0.19756-0.35983 0-0.6985 0.11994t-0.61383 0.35278q-0.26811 0.22578-0.43039 0.55033-0.15522 0.32456-0.15522 0.73378 0 0.59267 0.28222 0.99483 0.28222 0.39511 0.74083 0.59972 0.46567 0.19756 0.98778 0.19756 0.381 0 0.68439-0.09878 0.30339-0.10583 0.54328-0.254t0.43039-0.29633z"}),v.createElement("path",{d:"m70.164 63.853 1.9826 2.6317 1.9826-2.6317h0.73378v4.9389h-0.762v-2.0743q0-0.45861 0.01411-0.86783 0.02117-0.40922 0.0635-0.81844l-1.8062 2.3424h-0.46567l-1.8062-2.3354q0.04939 0.40217 0.0635 0.81139t0.01411 0.86783v2.0743h-0.762v-4.9389z"}),v.createElement("path",{d:"m77.106 63.853h3.8241v0.73378h-3.0621v1.3053h2.6741v0.73378h-2.6741v1.4323h3.0621v0.73378h-3.8241z"}),v.createElement("path",{d:"m84.203 68.792v-4.2051h-1.7357v-0.73378h4.2827v0.73378h-1.7851v4.2051z"})),v.createElement("path",{transform:"rotate(32 15.881 -1.0183)",fillRule:"evenodd",d:"m11.03 3.2283a2.4814 2.526 7.3662e-7 0 0-0.30277 0.22149 1.9313 1.966 7.3662e-7 0 1 1.5991 1.936 1.9313 1.966 7.3662e-7 0 1-1.5988 1.9369 2.4814 2.526 7.3662e-7 0 0 1.5929 0.589 2.4814 2.526 7.3662e-7 0 0 2.4814-2.5255 2.4814 2.526 7.3662e-7 0 0-2.4815-2.526 2.4814 2.526 7.3662e-7 0 0-1.2903 0.36814zm-3.2345 2.2039c-0.18296 0.086815 0.49439 0.074836 3.0594 0.9212 0.46608 0.15383 0.88156-0.43345 0.88156-0.96766s-0.41546-1.1208-0.88154-0.96706l-2.9313 0.96698c-0.058262 0.019224-0.10199 0.034146-0.12813 0.046548z",fill:`url(#${t})`}))}function qo({category:e}){const{t:t}=N(),[n,r]=Ya((e=>[e.exploreCategory,e.setExploreCategory])),a=jl(e);return v.createElement(us,{onClick:()=>r(e),active:n===e},v.createElement(a,{className:"w-5 h-5 mr-3"}),t(e?`category.${e}`:"explore.all"))}function Ho({sort:e,label:t,icon:n}){const[r,a]=Ya((e=>[e.exploreSort,e.setExploreSort])),l=n;return v.createElement(us,{onClick:()=>a(e),active:r===e},v.createElement(l,{className:"w-5 h-5 mr-3"}),t)}function Bo(){const{t:e}=N(),t=g.exports.useMemo((()=>{let e=Object.keys(tr);const t=e.splice(e.indexOf(tr.Other),1);return e.push(...t),e}),[]);return v.createElement(is,null,v.createElement("div",{className:"h-12 border-b dark:border-gray-850 shadow flex items-center px-5 text-base font-medium"},v.createElement(zo,{className:"h-4"})),v.createElement("div",{className:"px-1.5"},v.createElement(gs,null,"Sort"),v.createElement("div",{className:"space-y-0.5"},v.createElement(Ho,{label:"Most Popular",sort:"Top",icon:pe}),v.createElement(Ho,{label:"Recently Created",sort:"New",icon:ge})),v.createElement(gs,null,e("explore.categories")),v.createElement("div",{className:"space-y-0.5"},v.createElement(qo,{category:"Featured"}),v.createElement(qo,{category:null}),t.map((e=>v.createElement(qo,{key:e,category:e}))))))}function _o({server:e,shadow:t=!1,className:n=""}){var r;const{t:a}=N(),l=jl(e.category);return Ya((e=>e.exploreCategory)),v.createElement(Bl,{data:{type:wl,server:e,enableFeatured:!0}},v.createElement(h,{to:`/+${e.name}`,className:`${n} relative flex flex-col w-full rounded-lg group dark:bg-gray-800 dark:hover:bg-gray-850 duration-200 transform transition hover:shadow-xl bg-white ${t?"shadow-lg":""}`},v.createElement("div",{className:"h-32 rounded-t-lg w-full bg-cover bg-center bg-no-repeat relative bg-gradient-to-br from-red-400 to-indigo-600",style:(null==e?void 0:e.bannerUrl)?{backgroundImage:`url(${null==e?void 0:e.bannerUrl})`}:void 0},v.createElement("div",{className:"absolute left-4 -bottom-3"},v.createElement(tl,{size:10,server:e,className:"dark:bg-gray-750 rounded-xl ring-4 dark:ring-gray-800 ring-white transition dark:group-hover:ring-gray-850 group-hover:shadow-md bg-white"}))),v.createElement("div",{className:"flex flex-col flex-grow px-4 pt-5 pb-4 h-40"},v.createElement("div",{className:"text-lg font-semibold text-secondary"},null==e?void 0:e.displayName),v.createElement("div",{className:"text-13 text-tertiary line-clamp-3 pt-1"},(null==e?void 0:e.description)||"No description"),v.createElement("div",{className:"flex mt-auto text-xs"},v.createElement("div",{className:"inline-flex items-center"},v.createElement(ue,{className:"w-4 h-4 text-tertiary"}),v.createElement("div",{className:"ml-2 text-tertiary"},a("server.memberCount",{count:null!=(r=null==e?void 0:e.userCount)?r:0}))),v.createElement("div",{className:"ml-auto inline-flex items-center"},v.createElement(l,{className:"w-4 h-4 text-tertiary"}),v.createElement("div",{className:"ml-2 text-tertiary"},e.category))))))}function jo({children:e}){return v.createElement("div",{className:"max-h-full h-full dark:bg-gray-750 px-6 py-4 scrollbar-custom overflow-y-auto"},e)}function Go(){var e;const[t,n]=Ya((e=>[e.exploreCategory,e.exploreSort])),{data:r}=Pa({variables:{sort:n,category:t&&"Featured"!==t?t:null,featured:"Featured"===t},fetchPolicy:"cache-and-network"}),a=null!=(e=null==r?void 0:r.publicServers)?e:[];return v.createElement(ro,{leftSidebar:v.createElement(Bo,null),header:v.createElement(bs,{title:"Explore",icon:v.createElement(oe,{className:"w-5 h-5"})})},v.createElement(dt,null,v.createElement("title",null,"Explore Planets – Comet")),v.createElement(jo,null,v.createElement("div",{className:"md:px-8 md:py-8 px-0 py-0"},v.createElement("div",{className:"grid grid-cols-1 gap-4 lg:grid-cols-3 2xl:grid-cols-5"},a.map((e=>v.createElement(_o,{server:e,key:e.id})))),!a.length&&v.createElement(ja,null,"Nothing here yet!"))))}function Vo(){return v.createElement(bs,{icon:v.createElement(ut,{className:"h-5 w-5"}),title:"Inbox",showDivider:!0},v.createElement("div",{className:"flex items-center space-x-4"},v.createElement(Yo,{page:"Unread"}),v.createElement(Yo,{page:"All"})))}function Yo({page:e}){const[t,n]=Ya((e=>[e.inboxPage,e.setInboxPage]));return v.createElement(Es,{page:e,currentPage:t,setCurrentPage:n})}function Wo(e){return pt(e).calendar()}function Zo({reply:e}){const{comment:n}=e,{parentComment:r,post:a}=n,[l]=function(e){const n={...Mn,...e};return t(ea,n)}({optimisticResponse:{markReplyRead:{...e,isRead:!0}}}),[s]=function(e){const n={...Mn,...e};return t(ta,n)}({optimisticResponse:{markReplyUnread:{...e,isRead:!1}}});return v.createElement(h,{to:`${a.relativeUrl}#${n.id}`,className:"block dark:bg-gray-800 dark:hover:bg-gray-825 rounded p-3 cursor-pointer relative"},v.createElement("div",{className:"flex"},v.createElement("div",{className:"text-13 hover:underline font-medium text-tertiary pr-5 leading-5"},a.title),v.createElement("div",{className:"flex items-center ml-auto h-5"},v.createElement("div",{className:"text-mid text-13 font-medium mr-2 leading-5"},a.server.name),v.createElement(tl,{server:a.server,size:5,className:"rounded-full"}))),r?v.createElement("div",null,v.createElement(Qo,{comment:r}),v.createElement("div",{className:"ml-7 mt-2 border-t dark:border-gray-750"},v.createElement(Qo,{comment:n}))):v.createElement(Qo,{comment:n}),v.createElement("div",{className:"flex items-center pt-3 border-t dark:border-gray-750 mt-2"},v.createElement("div",{className:"flex items-center highlightable",onClick:t=>{t.stopPropagation(),t.preventDefault(),e.isRead?s({variables:{input:{replyId:e.id}}}):l({variables:{input:{replyId:e.id}}})}},v.createElement(X,{className:"h-5 w-5"}),v.createElement("div",{className:"ml-2 text-xs font-medium"},e.isRead?"Mark Unread":"Mark Read"))))}function Qo({comment:e}){var t,n,r,a,l,s,o,i;return v.createElement("div",{className:"flex space-x-3 pt-3"},v.createElement("div",{onClick:e=>{e.stopPropagation(),e.preventDefault()}},v.createElement(Bl,{data:{type:bl,user:e.author}},v.createElement(Is,{user:e.author,role:null==(t=e.serverUser)?void 0:t.role},v.createElement(Ss,{user:e.author,size:7})))),v.createElement("div",null,v.createElement("div",{className:"flex items-end pb-1.5"},v.createElement("div",{onClick:e=>{e.stopPropagation(),e.preventDefault()}},v.createElement(Bl,{data:{type:bl,user:e.author}},v.createElement(Is,{user:e.author,role:null==(n=e.serverUser)?void 0:n.role},v.createElement("div",{className:"text-sm font-medium cursor-pointer hover:underline leading-none "+((null==(a=null==(r=e.serverUser)?void 0:r.role)?void 0:a.color)?"":"text-primary"),style:{color:null==(s=null==(l=e.serverUser)?void 0:l.role)?void 0:s.color}},null!=(i=null==(o=e.author)?void 0:o.username)?i:"[deleted]")))),v.createElement("div",{className:"text-11 text-mid font-medium pl-2 leading-none"},Wo(e.createdAt))),v.createElement("div",{className:"prose prose-sm dark:prose-dark",dangerouslySetInnerHTML:{__html:e.text}})))}pt.extend(gt),pt.extend(vt);const Jo="px-2 pb-2 text-11 text-tertiary uppercase tracking-widest font-semibold";function Ko(){var e;const t=Ya((e=>e.inboxPage));no("inbox");const[n]=_a(),{data:r}=Ma({skip:!n,fetchPolicy:"cache-and-network"}),a=(null!=(e=null==r?void 0:r.replies)?e:[]).filter((e=>"Unread"!==t||!e.isRead));return v.createElement(ro,{header:v.createElement(Vo,null)},v.createElement(dt,null,v.createElement("title",null,`(${a.length}) Inbox – Comet`)),v.createElement(jo,null,"Unread"===t&&v.createElement(v.Fragment,null,v.createElement("div",{className:Jo},"Unread - ",a.length)),"All"===t&&v.createElement(v.Fragment,null,v.createElement("div",{className:Jo},"All - ",a.length)),0===a.length&&v.createElement(ja,null,"You are all caught up!"),v.createElement("div",{className:"space-y-1.5"},a.map((e=>v.createElement(Zo,{reply:e,key:e.id}))))))}function Xo({user:e}){var t;return v.createElement(bs,{icon:v.createElement(ht,{className:"w-5 h-5"}),title:v.createElement(v.Fragment,null,null!=(t=null==e?void 0:e.username)?t:"",v.createElement("div",{className:"w-2.5 h-2.5 ml-3 rounded-full "+((null==e?void 0:e.isOnline)?"bg-green-500":"bg-gray-600")}))})}const ei=["application/vnd.rar","application/x-tar","application/zip","application/x-7z-compressed","application/java-archive","application/x-bzip","application/x-bzip2","application/gzip","application/x-freearc"],ti=["application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/x-abiword","application/rtf","application/vnd.oasis.opendocument.text"],ni=["application/xhtml+xml","application/xml","text/xml","application/json","application/ld+json","text/css","application/x-csh","text/html","text/javascript","application/x-httpd-php","application/x-sh","application/vnd.mozilla.xul+xml"],ri=["application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.oasis.opendocument.spreadsheet"],ai=["application/vnd.ms-powerpoint","application/vnd.openxmlformats-officedocument.presentationml.presentation","application/vnd.oasis.opendocument.presentation"],li=e=>g.exports.useMemo((()=>e?e.startsWith("audio")?ft:e.startsWith("image")?bt:e.startsWith("video")?Et:"text/csv"===e?xt:"application/pdf"===e?yt:ti.includes(e)?wt:ri.includes(e)?Nt:ai.includes(e)?kt:ei.includes(e)?Ct:ni.includes(e)?$t:Ut:null),[e]);function si({user:e,channel:t,group:n}){return v.createElement("div",{className:"px-4 py-5.5 flex items-end"},v.createElement("div",null,!!e&&v.createElement(v.Fragment,null,v.createElement(Ss,{user:e,size:20}),v.createElement("div",{className:"text-3xl font-semibold pt-4 text-primary"},e.username),v.createElement("div",{className:"pt-2 text-tertiary select-none text-base"},"This is the beginning of your direct message history with"," ",v.createElement("span",{className:"font-semibold"},"@",e.username))),!!t&&v.createElement(v.Fragment,null,v.createElement("div",{className:"rounded-full flex items-center justify-center w-20 h-20 dark:bg-gray-700"},v.createElement(Ka,{className:"w-2/3 h-2/3 text-primary"})),v.createElement("div",{className:"text-3xl font-semibold pt-4 text-primary"},"Welcome to #",t.name,"!"),v.createElement("div",{className:"pt-2 text-tertiary select-none text-base"},"This is the start of the #",t.name," channel.")),!!n&&v.createElement(v.Fragment,null,v.createElement("div",{className:"rounded-full flex items-center justify-center w-20 h-20 dark:bg-gray-700"},v.createElement(ue,{className:"w-2/3 h-2/3 text-primary"})),v.createElement("div",{className:"text-3xl font-semibold pt-4 text-primary"},n.name),v.createElement("div",{className:"pt-2 text-tertiary select-none text-base"},"Welcome to the beginning of the"," ",v.createElement("span",{className:"font-semibold"},n.displayName)," group."))))}var oi=g.exports.memo((function({index:e,message:t,prevMessage:n,server:r,channel:a,group:l,user:s}){var o,i,c,m,d,u,p,h,f,b,E,x;const[y]=_a(),w=t.isEveryoneMentioned||t.mentionedUsers.map((e=>e.id)).includes(null==y?void 0:y.id),N=li(null==(o=null==t?void 0:t.file)?void 0:o.mime),k=g.exports.useCallback((e=>{var t,n;const r=null==(n=null==(t=e.target)?void 0:t.dataset)?void 0:n.mention;r&&r.substring(2,r.length-1)}),[t]),C=Math.floor(new Date(t.createdAt).getTime()/864e5),$=n?Math.floor(new Date(n.createdAt).getTime()/864e5):null,U=0===e||n&&(!n.text||n.author.id!==t.author.id)||C>$;return t.type===Hn.Initial?v.createElement(si,{channel:a,group:l,user:s}):t.type===Hn.Join?v.createElement(Bl,{className:(null==n?void 0:n.text)?"pt-4":"",data:{type:yl,message:t,server:r}},v.createElement("div",{className:"flex dark:hover:bg-gray-775 py-1 px-4"},v.createElement("div",{className:"w-10 flex justify-center"},v.createElement(St,{className:"w-5 h-5 text-green-500"})),v.createElement("div",{className:"pl-4 text-base text-tertiary flex items-center"},v.createElement(Bl,{className:"inline-block",data:{type:bl,user:t.author,server:r,role:null==(i=t.serverUser)?void 0:i.role}},v.createElement(Is,{user:t.author,role:null==(c=t.serverUser)?void 0:c.role},v.createElement(Ss,{user:t.author,size:5}))),v.createElement(Bl,{className:"inline-block",data:{type:bl,user:t.author,server:r,role:null==(m=t.serverUser)?void 0:m.role}},v.createElement(Is,{user:t.author,role:null==(d=t.serverUser)?void 0:d.role},v.createElement("span",{className:"ml-2 text-primary font-medium cursor-pointer hover:underline"},t.author.username)))," has joined the ",t.serverUser?"planet":"group",v.createElement("span",{className:"pl-2 text-11 whitespace-nowrap text-mid cursor-default leading-5 select-none"},Wo(t.createdAt))))):t.type===Hn.Normal?v.createElement("div",{className:""+(U?"pt-4":"")},C>$&&v.createElement("div",{className:"pt-1 pb-4 px-4"},v.createElement("div",{className:"text-mid text-xs font-medium h-0 border-t dark:border-gray-700 border-gray-200 flex items-center justify-center"},v.createElement("span",{className:"dark:bg-gray-750 bg-white px-1 py-0.5"},It(new Date(t.createdAt),"MMMM d, y")))),v.createElement(Bl,{data:{type:yl,message:t,server:r}},v.createElement("div",{className:"flex py-1 pl-4 pr-18 dark:hover:bg-gray-775 group relative"},w&&v.createElement("div",{className:"bg-gray-500 group-hover:bg-opacity-30 bg-opacity-10 absolute inset-0 pointer-events-none border-l-2 border-gray-500"}),U?v.createElement(Bl,{data:{type:bl,user:t.author,server:r,role:null==(u=t.serverUser)?void 0:u.role}},v.createElement(Is,{user:t.author,role:null==(p=t.serverUser)?void 0:p.role},v.createElement(Ss,{user:t.author,size:10,className:"dark:bg-gray-700 cursor-pointer"}))):v.createElement("div",{className:"w-10 text-11 whitespace-nowrap text-mid group-hover:opacity-100 opacity-0 cursor-default select-none leading-6.5"},(S=t.createdAt,pt(S).format("h:mm A"))),v.createElement("div",{className:"pl-4 w-full"},U&&v.createElement("div",{className:"flex items-end pb-0.5"},v.createElement(Bl,{data:{type:bl,user:t.author,server:r,role:null==(h=t.serverUser)?void 0:h.role}},v.createElement(Is,{user:t.author,role:null==(f=t.serverUser)?void 0:f.role},v.createElement("div",{className:"text-base text-black dark:text-white font-medium cursor-pointer hover:underline leading-none",style:{color:null==(E=null==(b=t.serverUser)?void 0:b.role)?void 0:E.color}},t.author.username))),v.createElement("div",{className:"text-11 text-mid pl-2 leading-none cursor-default select-none"},Wo(t.createdAt))),!!t.text&&v.createElement("div",{onClick:k,className:"prose prose-sm dark:prose-dark focus:outline-none max-w-none",dangerouslySetInnerHTML:{__html:t.text}}),!!(null==(x=t.linkMetadatas)?void 0:x.length)&&v.createElement("div",{className:"space-y-1 pt-1"},t.linkMetadatas.map(((e,t)=>v.createElement(Xs,{key:t,metadata:e,linkUrl:e.url})))),t.images.map(((e,t)=>v.createElement("div",{key:t,className:"pt-1"},v.createElement(Ks,{image:e})))),!!t.file&&v.createElement("div",{className:"pt-1 max-w-screen-sm w-full"},v.createElement("div",{className:"flex border dark:border-gray-850 dark:bg-gray-800 p-3 rounded w-full items-center"},v.createElement(N,{className:"w-8 h-8 dark:text-white"}),v.createElement("div",{className:"pl-3"},v.createElement("a",{href:t.file.url,target:"_blank",rel:"noreferrer noopener",className:"block text-base text-accent hover:underline cursor-pointer truncate"},t.file.filename),v.createElement("div",{className:"text-mid text-xs"},function(e,t=2){if(0===e)return"0 Bytes";const n=t<0?0:t,r=Math.floor(Math.log(e)/Math.log(1024));return parseFloat((e/Math.pow(1024,r)).toFixed(n))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][r]}(t.file.size))),v.createElement("a",{className:"block ml-auto",href:t.file.url,target:"_blank",rel:"noreferrer noopener"},v.createElement(Pt,{className:"h-6 w-6 highlightable"})))))))):null;var S}));const ii=({channelId:e,groupId:t,userId:r})=>{const a={channelId:e,groupId:t,userId:r},{data:l,fetchMore:s,loading:o}=function(e){const t={...Mn,...e};return n($a,t)}({variables:{...a,cursor:null},fetchPolicy:"cache-and-network",nextFetchPolicy:"cache-first"}),i=null==l?void 0:l.messages.hasMore,c=null==l?void 0:l.messages.messages;return[c,o,()=>{c&&i&&0!==c.length&&s({variables:{...a,cursor:c[0].id},updateQuery:(e,{fetchMoreResult:t})=>({messages:{hasMore:t.messages.hasMore,messages:[...t.messages.messages,...e.messages.messages]}})})},i]},ci=e=>x(`\n  ${e?"scale-100":"scale-0"}\n  transform\n  transition\n  bg-gradient-to-br\n  from-red-400\n  to-indigo-600\n  rounded-xl\n  p-3\n  max-w-sm\n  w-full\n  relative\n`);function mi({channel:e,user:t,group:n,setFiles:r}){const[a,l]=(()=>{const[e,t]=g.exports.useState(null),[n,r]=g.exports.useState(!1),a=g.exports.useRef(0),l=g.exports.useCallback((e=>{e.preventDefault(),e.stopPropagation()}),[]),s=g.exports.useCallback((e=>{e.preventDefault(),e.stopPropagation(),a.current++,e.dataTransfer.items&&e.dataTransfer.items.length>0&&r(!0)}),[]),o=g.exports.useCallback((e=>{e.preventDefault(),e.stopPropagation(),a.current--,a.current>0||r(!1)}),[]),i=g.exports.useCallback((e=>{e.preventDefault(),e.stopPropagation(),r(!1),e.dataTransfer.files&&e.dataTransfer.files.length>0&&(a.current=0,t(e.dataTransfer.files),e.dataTransfer.clearData())}),[]);return g.exports.useEffect((()=>(window.addEventListener("dragenter",s),window.addEventListener("dragleave",o),window.addEventListener("dragover",l),window.addEventListener("drop",i),function(){window.removeEventListener("dragenter",s),window.removeEventListener("dragleave",o),window.removeEventListener("dragover",l),window.removeEventListener("drop",i)}))),[e,n]})();g.exports.useEffect((()=>r(a)),[a,r]);const s=g.exports.useMemo((()=>e?`#${e.name}`:t?`@${t.username}`:n?`${n.displayName}`:void 0),[e,t,n]);return v.createElement(v.Fragment,null,v.createElement("div",{className:(o=l,x(`\n  fixed\n  inset-0\n  transition-all\n  bg-black\n  ${o?"visible bg-opacity-75":"invisible bg-opacity-0"}\n  flex\n  items-center\n  justify-center\n`)),style:{zIndex:999999}},v.createElement("div",{className:ci(l)},v.createElement("div",{className:"flex absolute left-1/2 transform top-0 -translate-x-1/2 -translate-y-1/2 transition delay-75 "+(l?"scale-100":"scale-0")},v.createElement("div",{className:"relative transform translate-x-6 translate-y-3 -rotate-12"},v.createElement("div",{className:"absolute left-5 top-9 w-14 h-14 bg-red-400",style:{zIndex:-1}}),v.createElement($t,{className:"w-24 h-24"})),v.createElement("div",{className:"relative"},v.createElement("div",{className:"absolute left-5 top-9 w-14 h-14 bg-red-400",style:{zIndex:-1}}),v.createElement(Et,{className:"w-24 h-24 "})),v.createElement("div",{className:"relative transform -translate-x-6 translate-y-3 rotate-12"},v.createElement("div",{className:"absolute left-5 top-8 w-14 h-14 bg-red-400",style:{zIndex:-1}}),v.createElement(bt,{className:"w-24 h-24"}))),v.createElement("div",{className:"rounded-xl border-dashed border-white border-2 px-4 pb-4 pt-16 text-center"},v.createElement("div",{className:"text-xl font-bold text-primary"},"Upload to ",v.createElement("span",{className:"text-white"},s))))));var o}const di=x("\n  text-sm\n  text-primary\n  h-10\n  px-7\n  hover:underline\n  focus:outline-none\n  select-none\n  disabled:opacity-50\n  disabled:no-underline\n  disabled:cursor-not-allowed\n"),ui=x("\n  text-sm\n  text-primary\n  transition\n  bg-blue-500\n  hover:bg-blue-600\n  flex\n  items-center\n  justify-center\n  rounded\n  px-7\n  h-10\n  focus:outline-none\n  select-none\n  disabled:opacity-50\n  disabled:cursor-not-allowed\n");function pi({createMessage:e,variables:t,file:n,setFileIndex:r,placeholder:a,multiple:l,cancelAll:s}){var o;const[i,c]=g.exports.useState(""),m=(e=>{const[t,n]=g.exports.useState(null);return g.exports.useEffect((()=>{e&&(e.type.startsWith("image")?_l(e).then((e=>n(e))).catch((()=>n(null))):n(null))}),[e]),t})(n),[d,u]=g.exports.useState(!1),p=g.exports.useCallback((()=>{d||r((e=>e+1))}),[r,d]),h=g.exports.useCallback((()=>{u(!0),e({variables:{input:{text:i||null,file:n,...t}}}).then((()=>{u(!1),p()}))}),[p,i,n,t,e]);g.exports.useEffect((()=>c("")),[n]);const f=g.exports.useCallback((e=>{"Enter"===e.key&&n&&h()}),[h,n]);g.exports.useEffect((()=>(document.body.addEventListener("keydown",f),()=>{document.body.removeEventListener("keydown",f)})),[f]);const b=li(null==n?void 0:n.type);return v.createElement(Wl,{close:p,isOpen:!!n},v.createElement("div",{className:"text-left relative w-full rounded-xl dark:bg-gray-750 max-w-lg mx-auto"},v.createElement("div",{className:"absolute left-5 -top-20 flex w-46 h-40"},m&&v.createElement("img",{alt:"",src:m,className:"absolute max-w-full max-h-full bottom-0 left-0 rounded shadow-md object-cover"}),!m&&b&&v.createElement(b,{className:"h-full w-full text-white absolute bottom-0 left-0 transform -translate-x-8"})),v.createElement("div",{className:"px-5 pt-24 pb-5"},v.createElement(vs,{className:"truncate text-left text-xl text-primary font-semibold select-none"},null!=(o=null==n?void 0:n.name)?o:""),v.createElement("div",{className:"text-tertiary text-13 pb-5 pt-0.5 select-none"},"Upload to"," ",v.createElement("span",{className:"font-medium text-secondary"},a)),v.createElement("label",{htmlFor:"comment",className:"block uppercase text-xs font-medium text-secondary pb-1.5"},"Add a Comment ",v.createElement("span",{className:"text-tertiary"},"(Optional)")),v.createElement("input",{className:"h-10 rounded-lg dark:bg-gray-700 w-full focus:outline-none px-4 text-secondary text-base",id:"comment",value:i,onChange:e=>{const t=e.target.value;c(t)}})),v.createElement("div",{className:"flex p-4 dark:bg-gray-775 rounded-b-xl"},v.createElement("div",{className:"ml-auto"}),l&&v.createElement("button",{className:di,onClick:()=>{s()},disabled:d},"Cancel All"),v.createElement("button",{className:di,onClick:p,disabled:d},"Cancel"),v.createElement("button",{className:ui,disabled:!n||d,onClick:h},"Upload",d&&v.createElement("div",{className:"ml-3"},v.createElement(Ja,null))))))}const gi=({channel:e,group:n,user:a,users:l})=>{N();const[s]=_a(),[o,i]=g.exports.useState([]),[c]=function(e){const n={...Mn,...e};return t(_r,n)}(),m={userId:null==a?void 0:a.id,groupId:null==n?void 0:n.id,channelId:null==e?void 0:e.id};!function(e){const t={...Mn,...e};r(Oa,t)}({variables:m,skip:!e&&!n&&!a,onSubscriptionData({subscriptionData:{data:{typingUpdated:{typingUserId:e,isTyping:t}}}}){if(t){const t=o.find((t=>t.id===e));if(t){const e=o.indexOf(t),n=[...o];n[e]={id:t.id,time:(new Date).getTime()},i(n)}else i([...o,{id:e,time:(new Date).getTime()}])}else i(o.filter((({id:t})=>t!==e)))}});const[d,u]=g.exports.useState(0);g.exports.useEffect((()=>{const e=setInterval((()=>{u(d+1)}),1e3);return()=>clearInterval(e)}),[d,u]);return[()=>c({variables:{input:m}}),o.filter((({id:e,time:t})=>(!s||e!==s.id)&&(new Date).getTime()-t<=1500)).map((({id:e})=>{var t;return null==(t=l.find((t=>t.id===e)))?void 0:t.username})).filter((e=>!!e))]},vi=Ft.create({name:"mention",defaultOptions:{HTMLAttributes:{},suggestion:{char:"@",command:({editor:e,range:t,props:n})=>{e.chain().focus().insertContentAt(t,[{type:"mention",attrs:n},{type:"text",text:" "}]).run()},allow:({editor:e,range:t})=>e.can().insertContentAt(t,{type:"mention"})}},group:"inline",inline:!0,selectable:!1,atom:!0,addAttributes:()=>({id:{default:null,parseHTML:e=>({id:e.getAttribute("data-mention")}),renderHTML:e=>e.id?{"data-mention":e.id}:{}},name:{default:null,parseHTML:e=>({name:e.getAttribute("data-mention")}),renderHTML:()=>({})}}),parseHTML:()=>[{tag:"span[data-mention]"}],renderHTML({node:e,HTMLAttributes:t}){return["span",Be(this.options.HTMLAttributes,t),`${this.options.suggestion.char}${e.attrs.name}`]},renderText({node:e}){return`${this.options.suggestion.char}${e.attrs.name}`},addKeyboardShortcuts(){return{Backspace:()=>this.editor.commands.command((({tr:e,state:t})=>{let n=!1;const{selection:r}=t,{empty:a,anchor:l}=r;return!!a&&(t.doc.nodesBetween(l-1,l,((t,r)=>{if("mention"===t.type.name)return n=!0,e.insertText(this.options.suggestion.char||"",r,r+t.nodeSize),!1})),n)}))}},addProseMirrorPlugins(){return[Mt({editor:this.editor,...this.options.suggestion})]}});class hi extends g.exports.Component{constructor(e){super(e),this.state={selectedIndex:0}}componentDidUpdate(e){e.users.length<this.props.selectedIndex+1&&this.setState({selectedIndex:e.users.length-1})}users(){return this.props.users.filter((e=>("string"==typeof e?e.substring(1):e.username).toLowerCase().startsWith(this.props.query.toLowerCase()))).slice(0,5)}onKeyDown({event:e}){return"ArrowUp"===e.key?(this.upHandler(),!0):"ArrowDown"===e.key?(this.downHandler(),!0):"Enter"===e.key?(e.stopPropagation(),this.enterHandler(),!0):!(" "!==e.key||!this.props.query)&&(e.stopPropagation(),this.spaceHandler(),!0)}upHandler(){let e=this.state.selectedIndex-1;e<0&&(e=this.users().length-1),this.setState({selectedIndex:e})}downHandler(){let e=this.state.selectedIndex+1;e>=this.users().length&&(e=0),this.setState({selectedIndex:e})}enterHandler(){this.selectItem(this.state.selectedIndex)}spaceHandler(){this.selectItem(this.state.selectedIndex)}selectItem(e){const t=this.users()[e];t&&this.props.command("string"==typeof t?{id:`<${t}>`,name:t.substring(1)}:{id:`<@${t.id}>`,name:t.username})}render(){return v.createElement("div",{className:"relative w-full w-72 rounded-md dark:bg-gray-800 overflow-hidden shadow-lg p-2 border dark:border-gray-850"},this.users().map(((e,t)=>v.createElement("button",{className:"flex items-center rounded w-full text-left text-primary text-base bg-transparent border-none px-2 h-10 focus:outline-none "+(t===this.state.selectedIndex?"dark:bg-gray-775":""),key:"string"==typeof e?e:e.id,onClick:()=>this.selectItem(t),onMouseMove:()=>this.setState({selectedIndex:t})},"string"==typeof e?e:v.createElement(v.Fragment,null,v.createElement(Ss,{user:e,size:6,className:"mr-2"}),e.username)))))}}const fi="_typing__dot_1o677_5";function bi(){return v.createElement("div",{className:"_typing_1o677_1"},v.createElement("div",{className:fi}),v.createElement("div",{className:fi}),v.createElement("div",{className:fi}))}function Ei({channel:e,server:t,group:n,user:r,users:a}){const l={channelId:null==e?void 0:e.id,groupId:null==n?void 0:n.id,userId:null==r?void 0:r.id},{t:s}=N(),[o]=_a(),i=!!r&&r.relationshipStatus===Xn.Blocked,c=!!r&&r.relationshipStatus===Xn.Blocking,[m,d,u]=Cl({server:t,permissions:[rr.SendMessages,rr.RestrictedChannels,rr.PrivateChannels]}),p=!!e&&m&&(e.type===Rn.Public||e.type===Rn.Restricted&&d||e.type===Rn.Private&&u),h=!!o&&(!!r&&(!!r&&!i&&!c)||!!e&&p||!!n),f=g.exports.useMemo((()=>o?e?p?`Message #${e.name}`:"You do not have permission to send messages in this channel":n?`Message ${n.name}`:r?i?"This user has blocked you":c?"You are blocking this user":`Message @${r.username}`:"":"Must log in to send messages"),[o,e,n,r,p,i,c]),E={autofocus:!0,extensions:[je.configure({horizontalRule:!1,bulletList:!1,orderedList:!1,listItem:!1,heading:!1}),oo,Rt.configure({placeholder:`${f}`,showOnlyWhenEditable:!1}),At.create({addKeyboardShortcuts:()=>({Enter:({editor:e})=>{let t=e.getHTML();if(!(0===e.state.doc.textContent.length)){const n=/^<p>|<\/p>$/gi,r=/^\s*(?:<br\s*\/?\s*>)+|(?:<br\s*\/?\s*>)+\s*$/gi;t=t.replace(n,""),t=t.replace(r,""),M({variables:{input:{text:t,...l}}}),e.commands.clearContent()}return!0}})}),vi.configure({suggestion:{allowSpaces:!1,render:()=>{let e,t;return{onStart:n=>{e=new Dt(hi,{props:{...n,users:["@everyone"].concat(a)},editor:n.editor}),t=Tt("body",{getReferenceClientRect:n.clientRect,appendTo:()=>document.body,content:e.element,showOnCreate:!0,interactive:!0,trigger:"manual",placement:"bottom-start",render(e){const t=document.createElement("div"),n=document.createElement("div");return t.appendChild(n),n.innerHTML="",n.appendChild(e.props.content),{popper:t,onUpdate:function(e,t){e.content!==t.content&&(n.innerHTML="",n.appendChild(t.content))}}}})},onUpdate(n){e.updateProps(n),t[0].setProps({getReferenceClientRect:n.clientRect})},onKeyDown(t){var n;return null==(n=e.ref)?void 0:n.onKeyDown(t)},onExit(){t[0].destroy(),e.destroy()}}}}})],content:"",editorProps:{attributes:{class:"prose prose-sm dark:prose-dark focus:outline-none max-w-none"}},editable:h},[x,y]=g.exports.useState(null),w=function(){const[,e]=g.exports.useState(0);return()=>e((e=>e+1))}();g.exports.useEffect((()=>{x&&x.destroy();const e=new Lt(E);return y(e),e.on("transaction",w),()=>{e.destroy()}}),[h,f,null==l?void 0:l.channelId,null==l?void 0:l.groupId,null==l?void 0:l.userId]);const[k,C]=gi({channel:e,group:n,user:r,users:a}),[$,U]=g.exports.useState(null),[S,I]=g.exports.useState(null),[P,F]=g.exports.useState(0),[M]=Lr({update(t,{data:{createMessage:a}}){const l=null==e?void 0:e.id,s=null==n?void 0:n.id,o=null==r?void 0:r.id,i={query:$a,variables:{userId:o,groupId:s,channelId:l,cursor:null}},c=t.readQuery(i);c&&!c.messages.messages.map((e=>e.id)).includes(a.id)&&t.writeQuery({...i,data:{messages:{...c.messages,messages:[...c.messages.messages,a]}}})}}),R=fs(),A=/https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,}\b(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)/i,D=g.exports.useCallback((e=>{var t;if(!h)return;const n=e.clipboardData.files;if(e.preventDefault(),n&&n.length>0)U(n);else{const n=null==(t=e.clipboardData)?void 0:t.getData("text/plain");n&&(A.test(n)?null==x||x.commands.insertContent(`<a href="${n}" target="_blank" rel="noopener noreferrer nofollow">${n}</a>`):null==x||x.commands.insertContent(n),null==x||x.commands.focus())}}),[x]);g.exports.useEffect((()=>(document.body.addEventListener("paste",D),()=>{document.body.removeEventListener("paste",D)})),[D]);const[T,L]=g.exports.useState(null),O=g.exports.useCallback((e=>{if(!h)return;const t=(new Date).getTime();T?t-T>500&&(k(),L(t)):L(t),null==x||x.commands.focus()}),[x]);g.exports.useEffect((()=>(document.body.addEventListener("keypress",O),()=>{document.body.removeEventListener("keypress",O)})),[D]),g.exports.useEffect((()=>{$&&(I($[0]),F(0))}),[$]),g.exports.useEffect((()=>{if(!$)return;let e;return P>=$.length?(U(null),I(null),F(0)):(I(null),e=setTimeout((()=>I($[P])),300)),()=>{e&&clearTimeout(e)}}),[P]);const z=g.exports.useCallback((()=>{U(null),I(null),F(0)}),[U,I,F]);return v.createElement(v.Fragment,null,!!o&&v.createElement(v.Fragment,null,v.createElement(mi,{placeholder:f,setFiles:U}),v.createElement(pi,{createMessage:M,variables:l,file:S,setFileIndex:F,placeholder:f,multiple:$&&$.length>1,cancelAll:z})),v.createElement("div",{className:"px-4 dark:bg-gray-750 bg-white relative"},v.createElement("div",{className:"relative"},h&&v.createElement(b,{content:s("message.upload")},v.createElement("div",{className:"block absolute left-4.5 top-1/2 transform -translate-y-1/2"},v.createElement("input",{className:"hidden",id:"file",name:"file",type:"file",onChange:e=>U(e.target.files),multiple:!0}),v.createElement("label",{htmlFor:"file",className:"text-tertiary highlightable"},v.createElement(Ot,{className:"w-5 h-5"})))),v.createElement("div",{onClick:()=>{o||R()},className:`${h?"px-14":"px-4 opacity-50"} ${o?"":"cursor-pointer"} min-h-[3rem] max-h-[20rem] overflow-y-auto scrollbar-light dark:bg-gray-700 py-3 w-full rounded-lg text-base focus:outline-none text-secondary border-none bg-gray-200`},!(null==x?void 0:x.isDestroyed)&&v.createElement(Ve,{editor:x}))),v.createElement("div",{className:"h-6 flex items-center text-secondary text-13 font-medium"},C.length>0&&v.createElement(bi,null),1===C.length&&v.createElement(v.Fragment,null,v.createElement("span",{className:"font-bold text-primary"},C[0])," is typing..."),2===C.length&&v.createElement(v.Fragment,null,v.createElement("span",{className:"font-bold text-primary"},C[0])," and ",v.createElement("span",{className:"font-bold text-primary"},C[1])," are typing..."),3===C.length&&v.createElement(v.Fragment,null,v.createElement("span",{className:"font-bold text-primary"},C[0]),", ",v.createElement("span",{className:"font-bold text-primary"},C[1]),", and ",v.createElement("span",{className:"font-bold text-primary"},C[2])," are typing..."),C.length>3&&v.createElement(v.Fragment,null,"Several people are typing..."))))}function xi({channel:e,server:n,user:r,group:a,users:l}){const s=g.exports.useRef(null),[o,i,c,m]=ii({channelId:null==e?void 0:e.id,userId:null==r?void 0:r.id,group:null==a?void 0:a.id}),[d,u]=g.exports.useState((null==o?void 0:o.length)||0);g.exports.useEffect((()=>{var e;u((null==o?void 0:o.length)||0),null==(e=null==s?void 0:s.current)||e.scrollToIndex(d+1e7)}),[e,r,a,s]);const{atBottom:p,newMessagesNotification:h,setNewMessagesNotification:f}=function(e){const[t]=_a(),[n,r]=g.exports.useState(!1),a=g.exports.useRef(""),l=g.exports.useRef(!1);return g.exports.useEffect((()=>{var n;if(!(null==e?void 0:e.length))return;const s=e[e.length-1],o=a.current;a.current=s.id||"",s.id!==o&&(l.current||t&&(null==(n=s.author)?void 0:n.id)!==t.id&&r(!0))}),[t,e]),{atBottom:l,newMessagesNotification:n,setNewMessagesNotification:r}}(o),b=function(e){var t;const n=null==(t=null==e?void 0:e[0])?void 0:t.id,r=g.exports.useRef(n),a=g.exports.useRef(n),l=g.exports.useRef(0);return g.exports.useMemo((()=>{if(!e||!e.length)return 0;if(n===a.current)return l.current;r.current||(r.current=n),a.current=n;for(let t=l.current;t<e.length;t+=1)if(e[t].id===r.current)return l.current=t,t;return 0}),[e,null==e?void 0:e.length])}(o),E=function(e){const[t]=_a(),n=g.exports.useRef(""),r=g.exports.useRef(!1);function a(){var r;if(e&&e.length>0){const a=e[e.length-1];if((null==(r=a.author)?void 0:r.id)===(null==t?void 0:t.id)&&n.current!==a.id)return n.current=a.id,!0}return!1}return g.exports.useEffect((()=>{e&&e.length&&!r.current&&(r.current=!0,a())}),[e,null==e?void 0:e.length]),a}(o),x=g.exports.useCallback(((t,l)=>{const s=l+b-1e7,o=t[s],i=s>0?t[s-1]:null;return o?v.createElement(oi,{server:n,channel:e,group:a,user:r,message:o,index:s,prevMessage:i}):v.createElement("div",{style:{height:"1px"}})}),[b,n,e,a,r]),[y]=function(e){const n={...Mn,...e};return t(Cr,n)}(),[w]=function(e){const n={...Mn,...e};return t(Dr,n)}(),[N]=Qr(),[k]=_a();return g.exports.useEffect((()=>{k&&(null==o?void 0:o.length)&&(e?y({variables:{input:{channelId:e.id}},optimisticResponse:{readChannel:{...e,isUnread:!1}}}):a?w({variables:{input:{groupId:a.id}},optimisticResponse:{readGroup:{...a,unreadCount:0}}}):r&&N({variables:{input:{userId:r.id}},optimisticResponse:{readDm:{...r,unreadCount:0}}}))}),[null==e?void 0:e.id,null==a?void 0:a.id,null==r?void 0:r.id,null==k?void 0:k.id,null==o?void 0:o.length]),v.createElement("div",{className:"flex flex-col h-full"},!!o&&v.createElement(Ae,{className:"scrollbar-custom dark:bg-gray-750 bg-white",alignToBottom:!0,atBottomStateChange:e=>{p.current=e,e&&h&&f(!1)},components:{Footer:()=>v.createElement("div",{className:"h-5.5"})},firstItemIndex:1e7-b,followOutput:e=>(E()||!!e)&&"auto",initialTopMostItemIndex:o.length>0?o.length-1:0,itemContent:e=>x(o,e),overscan:0,ref:s,startReached:()=>{!i&&m&&c()},style:{overflowX:"hidden"},totalCount:o.length||0}),!!l&&(!!e||!!r||!!a)&&v.createElement(Ei,{server:n,channel:e,user:r,group:a,users:l}))}function yi({username:e}){const{data:n}=Ta({variables:{username:e},fetchPolicy:"cache-and-network",nextFetchPolicy:"cache-first"}),[r]=function(e){const n={...Mn,...e};return t(Jr,n)}(),a=null==n?void 0:n.user;g.exports.useEffect((()=>{a&&(a.showChat||r({variables:{input:{userId:a.id}}}))}),[null==a?void 0:a.id]),no(`dm/@${e}`);const[l]=_a();return v.createElement(ro,{header:v.createElement(Xo,{user:a})},!!a&&v.createElement(xi,{user:a,users:[a,l]}))}const wi=e=>{const{server:t}=zt(),n=Ya((e=>e.setServerPage));g.exports.useEffect((()=>{null!=e&&n(t.substring(1),e)}),[e,t,n])};function Ni({user:e,role:t,server:n}){return v.createElement(Bl,{data:{type:bl,user:e,server:n,role:t}},v.createElement(Is,{user:e,role:t,placement:"left"},v.createElement(us,{small:!0},v.createElement(Ss,{user:e,size:6,showOnline:!0,dotClassName:"w-2 h-2 ring-2 dark:ring-gray-800 ring-gray-50"}),v.createElement("div",{className:"ml-3 font-medium text-tertiary",style:{color:null==t?void 0:t.color}},e.username))))}function ki({server:e,serverUsers:t}){const n=g.exports.useMemo((()=>{var n;const r=[];for(const s of(null!=(n=null==e?void 0:e.roles)?n:[]).filter((e=>e.permissions.includes(rr.DisplayRoleSeparately)))){const e=t.filter((e=>e.isOnline&&e.roles.map((e=>e.id)).includes(s.id)&&!r.includes(e)));e.length&&(r.push(`${s.name} — ${e.length}`),r.push(...e))}const a=t.filter((e=>e.user.isOnline));a.length&&(r.push(`Online — ${a.length}`),r.push(...a));const l=t.filter((e=>!e.user.isOnline));return l.length&&(r.push(`Offline — ${l.length}`),r.push(...l)),r}),[t,e]),r=g.exports.useRef(),a=Ya((e=>e.showUsers));return v.createElement(is,{right:!0,show:a},v.createElement(Ae,{className:"scrollbar-dark",ref:r,style:{height:"100%",width:"100%"},data:n,itemContent:(t,n)=>v.createElement("div",{className:"px-1.5 pb-0.5"},"string"==typeof n?v.createElement(gs,null,n):v.createElement("div",{className:""+(n.user.isOnline?"":"opacity-35")},v.createElement(Ni,{user:n.user,role:n.role,server:e})))}))}const Ci=g.exports.createContext({server:null,loading:!0,users:[]});function $i({children:e,name:t}){var r;const{data:a,loading:l}=function(e){const t={...Mn,...e};return n(Ra,t)}({variables:{name:t},skip:!t,fetchPolicy:"network-only"}),s=null==a?void 0:a.server,{data:o}=function(e){const t={...Mn,...e};return n(Aa,t)}({variables:{serverId:null==s?void 0:s.id},skip:!s,fetchPolicy:"network-only"}),i=null!=(r=null==o?void 0:o.serverUsers)?r:[];return v.createElement(Ci.Provider,{value:{server:s,loading:l&&!s,users:i}},e)}const Ui=()=>{const{server:e,loading:t,users:n}=g.exports.useContext(Ci);return{server:e,loading:t,users:n}};function Si(){const{server:e,users:t}=Ui(),[n]=_a();return wi(""),v.createElement(ro,{header:v.createElement(ys,null),rightSidebar:v.createElement(ki,{server:e,serverUsers:t})},v.createElement(dt,null,v.createElement("title",null,null==e?void 0:e.displayName)),v.createElement(to,{serverId:null==e?void 0:e.id,header:n?v.createElement(Po,{server:e}):v.createElement("div",{className:"h-4"})}))}function Ii({post:e,users:t=[]}){var n,r,a;const{t:l}=N(),s=Ya((e=>e.showUsers));return v.createElement(is,{right:!0,show:s},v.createElement("div",{className:"px-1"},(null==e?void 0:e.author)&&v.createElement(v.Fragment,null,v.createElement(gs,null,l("post.creator")),v.createElement(Ni,{user:e.author,color:null==(r=null==(n=e.serverUser)?void 0:n.role)?void 0:r.color,role:null==(a=e.serverUser)?void 0:a.role})),t&&t.length>0&&v.createElement(v.Fragment,null,v.createElement(gs,null,l("post.participantCount",{count:t.length})),t.map((e=>{var t,n,r;return v.createElement(Ni,{key:e.user.id,user:e.user,color:null==(n=null==(t=e.serverUser)?void 0:t.role)?void 0:n.color,role:null==(r=e.serverUser)?void 0:r.role})})))))}const Pi=e=>{if(!e.childComments||0===e.childComments.length)return 0;let t=0;return e.childComments.forEach((e=>{e.isDeleted||t++,e.childCount=Pi(e),t+=e.childCount})),t},Fi=e=>((e=(e=>{const t=Object.create(null);e.forEach((e=>t[e.id]={...e,childComments:[]}));const n=[];return e.forEach((e=>{e.parentComment?t[e.parentComment.id].childComments.push(t[e.id]):n.push(t[e.id])})),n})(e)).forEach((e=>e.childCount=Pi(e))),e),Mi=x("\n  text-base\n  text-primary\n  disabled:opacity-50\n  dark:disabled:bg-gray-600\n  bg-green-600\n  rounded\n  px-3\n  h-8\n  flex\n  items-center\n  disabled:cursor-not-allowed\n  focus:outline-none\n"),Ri=x("\n  text-base\n  text-tertiary\n  focus:outline-none\n  px-2\n  h-8\n  flex\n  items-center\n");function Ai({postId:e,parentCommentId:n,setOpen:r}){const[a,l]=g.exports.useState(""),[s,{loading:o}]=function(e){const n={...Mn,...e};return t($r,n)}({update(t,{data:{createComment:n}}){const r=t.readQuery({query:Na,variables:{postId:e}});t.writeQuery({query:Na,variables:{postId:e},data:{comments:[n,...r.comments]}})}}),{t:i}=N();return v.createElement("div",{className:"max-w-screen-md w-full"},v.createElement(co,{text:a,setText:l}),v.createElement("div",{className:"flex justify-end space-x-3 items-center pt-3"},v.createElement("button",{className:Ri,onClick:()=>{r(!1),l("")}},i("comment.create.cancel")),v.createElement("button",{className:Mi,disabled:!a||o,onClick:()=>{s({variables:{input:{postId:e,text:a,parentCommentId:n}}}).then((()=>{r(!1),l("")}))}},i("comment.create.submit"),o&&v.createElement(Ja,{className:"w-5 h-5 text-primary ml-3"}))))}const Di=x("\n  ml-2\n  text-13\n  text-gray-500\n  hover:text-gray-700\n  dark:hover:text-gray-300\n  font-medium\n  leading-none\n  select-none\n  cursor-pointer\n");function Ti({comment:e,post:n,level:r=0,setParentComment:a}){var l,s,o,i,c,m,d,u;const{t:p}=N(),[h]=_a(),f=fs(),[b]=function(e){const n={...Mn,...e};return t(Sr,n)}(),[E,x]=g.exports.useState(!1),[y,w]=Ya((e=>[e.replyingCommentId,e.setReplyingCommentId])),k=y===e.id;return e.isDeleted&&!e.childCount?null:v.createElement("div",{className:"relative md:rounded dark:bg-gray-800 bg-gray-200 "+(0===r?"":"pl-4")},v.createElement("div",{id:e.id}),v.createElement(Bl,{data:{type:xl,comment:e,post:n}},v.createElement("div",{className:"flex px-3 pt-3"},v.createElement(Bl,{data:{type:bl,user:e.author}},v.createElement(Is,{user:e.author,role:null==(l=e.serverUser)?void 0:l.role},v.createElement(Ss,{size:7,className:"cursor-pointer transition "+(e.author?"hover:opacity-90":"opacity-40 dark:bg-gray-700"),user:e.author}))),v.createElement("div",{className:"pl-3 pb-3 w-full "+(e.childCount&&!E?"border-b dark:border-gray-750":"")},v.createElement("div",{className:"flex items-end pb-1.5"},v.createElement(Bl,{data:{type:bl,user:e.author}},v.createElement(Is,{user:e.author,role:null==(s=e.serverUser)?void 0:s.role},v.createElement("div",{className:"text-sm font-medium cursor-pointer hover:underline leading-none "+((null==(i=null==(o=e.serverUser)?void 0:o.role)?void 0:i.color)?"":"text-primary"),style:{color:null==(m=null==(c=e.serverUser)?void 0:c.role)?void 0:m.color}},null!=(u=null==(d=e.author)?void 0:d.username)?u:v.createElement("span",{className:"text-mid"},"[deleted]")))),v.createElement("div",{className:"text-11 text-mid font-medium pl-2 leading-none"},Fe(new Date(e.createdAt))," ago")),v.createElement("div",{className:"prose prose-sm dark:prose-dark max-w-none",dangerouslySetInnerHTML:{__html:e.text}}),v.createElement("div",{className:"flex items-center pt-1 -ml-2"},v.createElement("div",{className:"flex items-center"},v.createElement("button",{type:"button",className:"focus:outline-none p-1 rounded-full dark:hover:bg-gray-750 transition cursor-pointer hover:bg-gray-200 "+(e.voteType===lr.Up?"text-red-400":"text-mid"),onClick:()=>{if(!h)return void f();let t=e.voteCount;e.voteType===lr.Up?t--:e.voteType===lr.None?t++:e.voteType===lr.Down&&(t+=2),b({variables:{input:{commentId:e.id,type:e.voteType===lr.Up?lr.None:lr.Up}},optimisticResponse:{...e,voteType:e.voteType===lr.Up?lr.None:lr.Up,voteCount:t}})}},v.createElement(Se,{className:"w-5 h-5"})),v.createElement("div",{className:`text-13 leading-none font-semibold ${e.voteType===lr.Up?"text-red-400":""} ${e.voteType===lr.Down?"text-blue-400":""} ${e.voteType===lr.None?"text-tertiary":""}`},e.voteCount),n.server.isDownvotesEnabled&&v.createElement("button",{type:"button",className:"focus:outline-none p-1 rounded-full dark:hover:bg-gray-750 transition cursor-pointer "+(e.voteType===lr.Down?"text-blue-400":"text-mid"),onClick:()=>{if(!h)return void f();let t=e.voteCount;e.voteType===lr.Down?t++:e.voteType===lr.None?t--:e.voteType===lr.Up&&(t-=2),b({variables:{input:{commentId:e.id,type:e.voteType===lr.Down?lr.None:lr.Down}},optimisticResponse:{...e,voteType:e.voteType===lr.Down?lr.None:lr.Down,voteCount:t}})}},v.createElement(Z,{className:"w-5 h-5"}))),!e.isDeleted&&v.createElement("div",{className:Di,onClick:()=>{w(k?null:e.id)}},p(k?"comment.cancelReply":"comment.reply")),!!e.childCount&&v.createElement("div",{className:Di,onClick:()=>x(!E)},E?`${p("comment.showReplies")} (${e.childCount})`:p("comment.hideReplies")),v.createElement(Bl,{leftClick:!0,data:{type:xl,comment:e,post:n}},v.createElement("div",{className:"ml-2 text-disabled flex items-center cursor-pointer"},v.createElement(Re,{className:"w-4 h-4"})))),k&&v.createElement("div",{className:"pt-3 max-w-screen-md w-full"},v.createElement(Ai,{postId:n.id,parentCommentId:e.id,setOpen:()=>w(null)}))))),v.createElement("div",{className:"pl-3"},!E&&e.childComments.map((e=>v.createElement(Ti,{key:e.id,comment:e,level:r+1,setParentComment:a,post:n})))))}function Li({postId:e}){const[t,n]=g.exports.useState(!1),[r]=_a(),{t:a}=N();return v.createElement(v.Fragment,null,t?v.createElement("div",{className:"dark:bg-gray-800 bg-gray-200 pt-3 pb-3 px-3 rounded flex"},v.createElement("div",{className:"pr-3 mr-3 border-r dark:border-gray-750 inline-block h-7"},v.createElement(Ss,{user:r,size:7})),v.createElement(Ai,{postId:e,setOpen:n})):v.createElement("div",{onClick:()=>n(!0),className:"dark:bg-gray-700 h-13 flex items-center rounded transition dark:hover:bg-gray-650 cursor-pointer bg-gray-200"},v.createElement("div",{className:"px-3 border-r dark:border-gray-650 h-7"},v.createElement(Ss,{user:r,size:7})),v.createElement("div",{className:"text-sm text-secondary px-3"},a("post.createComment"))))}function Oi({post:e}){const t=Ya((e=>e.canGoBack)),{push:n,goBack:r}=$();return v.createElement("header",{id:"header",className:"h-12 min-h-[3rem] items-center bg-white dark:bg-gray-750 border-b dark:border-gray-800 shadow flex items-center"},v.createElement("div",{className:"flex items-center font-semibold text-base text-primary pl-4"},v.createElement("div",{className:"highlightable mr-3 cursor-pointer",onClick:()=>{t?r():n(`/+${null==e?void 0:e.server.name}`)}},v.createElement(qt,{className:"w-5 h-5"})),v.createElement("span",{className:"line-clamp-1"},null==e?void 0:e.title)),v.createElement("div",{className:"ml-auto pl-6 pr-4"},v.createElement(xs,null)))}function zi({postId:e}){const[t]=_a(),{data:r}=function(e){const t={...Mn,...e};return n(Ua,t)}({variables:{id:e},fetchPolicy:"cache-and-network"}),a=null==r?void 0:r.post,{data:l}=function(e){const t={...Mn,...e};return n(Na,t)}({variables:{postId:e}}),s=g.exports.useMemo((()=>{var e;return Fi(null!=(e=null==l?void 0:l.comments)?e:[])}),[null==l?void 0:l.comments]),o=g.exports.useMemo((()=>((e,t)=>e.filter((e=>{var n;return!!e.author&&e.author.id!==(null==(n=null==t?void 0:t.author)?void 0:n.id)})).map((e=>({user:e.author,serverUser:e.serverUser}))).filter(((e,t,n)=>n.findIndex((t=>t.user.id===e.user.id))===t)))(s,a)),[s]);return v.createElement(ro,{header:a?v.createElement(Oi,{post:a}):null,rightSidebar:a?v.createElement(Ii,{post:a,users:o}):null},v.createElement(dt,null,v.createElement("title",null,a?`${a.title} – ${a.server.displayName}`:null)),a?v.createElement("div",{className:"max-h-full h-full scrollbar-custom dark:bg-gray-750 overflow-y-auto"},v.createElement("div",{className:"md:pt-4 md:px-4 px-0 pt-0"},!!a&&v.createElement(eo,{post:a,isPostPage:!0})),!!t&&v.createElement("div",{className:"pt-4 px-4"},v.createElement(Li,{postId:e})),v.createElement("div",{className:"space-y-2 md:px-4 pt-4 px-0 pb-96"},s.map((e=>v.createElement(Ti,{key:e.id,comment:e,post:a}))))):v.createElement(Ga,null))}function qi({name:e,icon:t}){const[n,r]=Ya((e=>[e.postsSort,e.setPostsSort])),{server:a}=zt(),{pathname:l}=U(),{push:s}=$(),o=n===e&&("/"===l||l===`/${a}`),i=t;return v.createElement(us,{onClick:()=>{r(e),s(a?`/${a}`:"/")},active:o},v.createElement(i,{className:"w-5 h-5 mr-3 text-tertiary"}),e)}function Hi(){const{t:e}=N();return v.createElement("div",{className:"space-y-0.5"},v.createElement(qi,{name:e("post.feed.sort.hot"),icon:ve}),v.createElement(qi,{name:e("post.feed.sort.new"),icon:ge}),v.createElement(qi,{name:e("post.feed.sort.top"),icon:pe}))}function Bi(){var e,t,n,r;const{t:a}=N(),[l]=_a(),s=null!=(e=null==l?void 0:l.groups)?e:[],o=null!=(n=null==(t=null==l?void 0:l.relatedUsers)?void 0:t.filter((e=>e.showChat)))?n:[],i=s.concat(o).sort(((e,t)=>(e.lastMessageAt?new Date(e.lastMessageAt).getTime():0)-(t.lastMessageAt?new Date(t.lastMessageAt).getTime():0))),{data:c}=Ma({skip:!l,fetchPolicy:"cache-and-network"}),m=(null!=(r=null==c?void 0:c.replies)?r:[]).filter((e=>!e.isRead)).length,[d,u]=Ya((e=>[e.postsFeed,e.setPostsFeed])),{pathname:p}=U(),{push:g}=$();return v.createElement(v.Fragment,null,v.createElement(is,null,v.createElement("div",{className:"h-12 border-b dark:border-gray-850 shadow flex items-center px-5 text-base font-medium"},v.createElement(zo,{className:"h-4"})),v.createElement("div",{className:"px-1.5"},!!l&&v.createElement("div",{className:"space-y-0.5 pt-3"},v.createElement(us,{to:"/inbox"},v.createElement(ut,{className:"mr-3 h-5 w-5"}),a("inbox.title"),!!m&&v.createElement("div",{className:"ml-auto"},v.createElement(ts,{count:m})))),v.createElement(gs,null,"Feed"),v.createElement("div",{className:"space-y-0.5"},!!l&&v.createElement(us,{active:"Joined"===d&&"/"===p,onClick:()=>{u("Joined"),"/"!==p&&g("/")}},v.createElement(se,{className:"mr-3 h-5 w-5"}),"Your Feed"),v.createElement(us,{active:("Featured"===d||!l&&"Joined"===d)&&"/"===p,onClick:()=>{u("Featured"),"/"!==p&&g("/")}},v.createElement(Y,{className:"mr-3 h-5 w-5"}),"Featured"),v.createElement(us,{active:"All"===d&&"/"===p,onClick:()=>{u("All"),"/"!==p&&g("/")}},v.createElement(Ht,{className:"mr-3 h-5 w-5"}),"Universe")),v.createElement(gs,null,"Posts"),v.createElement(Hi,null),!!l&&v.createElement(v.Fragment,null,v.createElement(gs,{plusLabel:"Create DM"},a("dm.title")),v.createElement("div",{className:"space-y-0.5"},!!i&&i.map((e=>{if("Group"===e.__typename)return v.createElement("div",null,"Group");if("User"===e.__typename){const t=e;return v.createElement(_i,{user:t,key:`user-${t.id}`})}})))))))}function _i({user:e}){N();const[t]=Xr(),{push:n}=$(),{pathname:r}=U(),[a]=Lr(),[{isOver:l,canDrop:s},o]=Bt({accept:cs,drop:(t,r)=>{n(`/dm/@${e.username}`),a({variables:{input:{userId:e.id,text:`${location.origin}${t.relativeUrl}`}}})},collect:e=>({isOver:e.isOver(),canDrop:e.canDrop()})});return v.createElement("div",null,v.createElement(Bl,{data:{type:bl,user:e,isDm:!0}},v.createElement(us,{ref:o,large:!0,to:`/dm/@${e.username}`,key:`user-${e.id}`},v.createElement(Ss,{size:9,showOnline:!0,user:e,dotClassName:"ring-3 w-2.5 h-2.5 dark:ring-gray-800"}),v.createElement("span",{className:"ml-3"},e.username),v.createElement("div",{className:"ml-auto"}),v.createElement("div",{className:"pr-2"},!!e.unreadCount&&v.createElement(ts,{count:e.unreadCount})),v.createElement(ee,{onClick:a=>{a.stopPropagation(),a.preventDefault(),t({variables:{input:{userId:e.id}}}),r===`/dm/@${e.username}`&&n("/")},className:"group-hover:visible invisible w-5 h-5 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}))))}function ji({open:e,setOpen:n}){const[r]=_a(),[a,l]=g.exports.useState(!1),[s,o]=g.exports.useState(!1),{register:i,handleSubmit:c,watch:m,reset:d,formState:{errors:u}}=te({mode:"onChange"}),p=m("password"),h=m("currentPassword"),[f,{loading:b}]=function(e){const n={...Mn,...e};return t(fa,n)}(),[E]=function(e){const n={...Mn,...e};return t(ba,n)}(),x=()=>{n(!1),setTimeout((()=>d()),300)};return v.createElement(v.Fragment,null,v.createElement(Zl,{onSubmit:c((({password:e,currentPassword:t})=>{f({variables:{input:{password:e,currentPassword:t}}}).then((()=>{C.success("Saved changes!"),d()}))})),open:e,close:x,closeOnOverlayClick:!0,buttons:v.createElement(v.Fragment,null,v.createElement("button",{onClick:()=>(localStorage.removeItem("token"),void location.reload()),className:"form-button-delete"},"Log Out",v.createElement(_t,{className:"ml-2 w-5 h-5"})),v.createElement("button",{onClick:()=>x(),className:"form-button-submit"},"Done",v.createElement(X,{className:"ml-2 w-5 h-5"})))},v.createElement(Gi,{deleteOpen:a,setDeleteOpen:l}),v.createElement("div",{className:"px-5 pt-5 pb-10"},v.createElement("div",{className:"flex items-center font-semibold text-primary"},v.createElement(Ss,{user:r,size:6,className:"rounded-md mr-2"}),"User Settings  –  ",v.createElement("div",{className:"truncate"},r.username),v.createElement(ee,{className:"h-5 w-5 highlightable ml-auto",onClick:()=>x()})),v.createElement("div",{className:"py-5 flex items-center"},v.createElement(Ss,{user:r,size:20}),v.createElement("input",{type:"file",accept:"image/png,image/jpeg,image/webp,image/gif",name:"avatarFile",id:"avatarFile",hidden:!0,onChange:e=>{const t=e.target.files[0];t&&E({variables:{input:{avatarFile:t}}})}}),v.createElement("label",{htmlFor:"avatarFile",className:"h-9 transition hover:bg-gray-200 cursor-pointer flex items-center justify-center text-sm font-medium border rounded dark:border-gray-600 px-3 bg-gray-300 text-gray-800 ml-3"},v.createElement(Xa,{className:"w-5 h-5 mr-2"}),"Upload Avatar")),v.createElement("div",{className:"border dark:border-gray-750 rounded space-y-3 p-3"},v.createElement("div",{className:"text-xs font-medium text-tertiary"},"Change Password"),v.createElement("div",null,v.createElement("div",{className:"relative"},v.createElement("input",{className:"form-input-password",placeholder:"New Password",id:"password",...i("password",{minLength:6,required:!0}),type:s?"text":"password",minLength:6}),v.createElement(es,{setShowPassword:o,showPassword:s})),!!p&&u.password&&v.createElement("div",{className:"form-error"},"Password must be at least 6 characters")),v.createElement("div",null,v.createElement("div",{className:"relative"},v.createElement("input",{className:"form-input-password",placeholder:"Current Password",id:"currentPassword",...i("currentPassword",{required:!0}),type:s?"text":"password"}),v.createElement(es,{setShowPassword:o,showPassword:s}))),v.createElement("button",{disabled:b||!h||!p||(null==p?void 0:p.length)<6,className:"form-button-submit ml-auto"},"Change Password",b&&v.createElement(Ja,{className:"w-5 h-5 ml-2"}))),v.createElement("div",{className:"mt-3"},v.createElement("button",{type:"button",onClick:()=>l(!0),className:"form-button-delete"},"Delete Account",v.createElement(jt,{className:"ml-2 w-5 h-5"}))))))}function Gi({deleteOpen:e,setDeleteOpen:n}){const[r,a]=g.exports.useState(""),[l,{loading:s}]=function(e){const n={...Mn,...e};return t(Ea,n)}();return v.createElement(Wl,{isOpen:e,close:()=>n(!1)},v.createElement("div",{className:"max-w-md w-full rounded-md dark:bg-gray-800 shadow-lg p-4"},v.createElement("div",{className:"text-red-400 text-2xl font-semibold"},"Delete Account"),v.createElement("div",{className:"text-secondary pb-5 pt-3 text-base"},"You will not be able to recover your account."),v.createElement("div",{className:"text-left"},v.createElement("label",{htmlFor:"confirmPassword",className:"label"},"Password"),v.createElement("input",{id:"confirmPassword",name:"confirmPassword",className:"textbox",value:r,onChange:e=>a(e.target.value),type:"password"})),v.createElement("div",{className:"flex items-center justify-end space-x-4 pt-4"},v.createElement("button",{className:"form-button-cancel",type:"button",onClick:()=>n(!1)},"Cancel"),v.createElement("button",{className:"form-button-delete",type:"button",disabled:!r||s,onClick:()=>{l({variables:{input:{password:r}}}).then((()=>{localStorage.removeItem("token"),location.reload()}))}},"Delete Account",s&&v.createElement(Ja,{className:"w-5 h-5 text-primary ml-3"})))))}function Vi(){const[e]=_a(),n=[0,14],[r,a]=g.exports.useState(!1),[l,s]=Ya((e=>[e.updateAvailable,e.setUpdateAvailable]));g.exports.useEffect((()=>{window.electron&&window.electron.on("updateAvailable",(()=>{s(!0)}))}),[]);const[o]=function(e){const n={...Mn,...e};return t(ya,n)}();g.exports.useEffect((()=>{if(e){const e=setInterval((()=>{o({variables:{input:{onlineStatus:_n.Online}}})}),15e3);return()=>clearInterval(e)}}),[e]);const{toggle:i,value:c}=Gt(!0,{classNameDark:"dark",classNameLight:"light",element:document.documentElement}),m=(()=>{const e=Va();return"Windows"===e?"https://github.com/joincomet/comet/releases/download/0.0.100/Comet-Setup-0.0.100.exe":"Mac OS"===e?"https://github.com/joincomet/comet/releases/download/0.0.100/Comet-0.0.100.dmg":"Linux"===e?"https://github.com/joincomet/comet/releases/download/0.0.100/Comet-0.0.100.AppImage":void 0})(),d=Va(),[u,p,f,E]=hs();return v.createElement(v.Fragment,null,!!e&&v.createElement(ji,{open:r,setOpen:a}),v.createElement("div",{className:"flex items-center shadow-md px-3 bottom-0 h-5.5 dark:bg-gray-700 z-50 bg-white"},e?v.createElement(v.Fragment,null,v.createElement(Ss,{size:4.5,className:"mr-2",user:e}),v.createElement("div",{className:"text-primary text-13 font-medium cursor-pointer"},e.username),v.createElement("div",{className:"w-2 h-2 rounded-full bg-green-500 ml-2"})):v.createElement("div",{className:"flex items-center text-primary text-13 font-medium"},v.createElement("div",{className:"cursor-pointer hover:underline",onClick:()=>{E(!1),p(!0)}},"Log In"),"  ·  ",v.createElement("div",{className:"cursor-pointer hover:underline",onClick:()=>{E(!0),p(!0)}},"Create account")),v.createElement("div",{className:"ml-auto flex items-center space-x-4 text-primary"},"Windows"===d&&!window.electron&&v.createElement(b,{content:"Download Comet for Desktop"},v.createElement("a",{className:"block",target:"_blank",rel:"noopener noreferrer",href:m},v.createElement(Vt,{className:"w-4.5 h-4.5 text-tertiary cursor-pointer"}))),v.createElement(b,{content:c?"Light Mode":"Dark Mode"},v.createElement("button",{className:"text-tertiary cursor-pointer",onClick:()=>i()},c?v.createElement(Yt,{className:"w-5 h-5"}):v.createElement(Wt,{className:"w-5 h-5"}))),v.createElement(b,{content:""+(window.electron&&l?"Update available":"Up to date!")},v.createElement("div",{className:"flex items-center "+(window.electron&&l?"cursor-pointer":""),onClick:()=>{window.electron&&l&&window.electron.restart()}},v.createElement("div",{className:"text-xs font-medium "+(l&&window.electron?"text-green-500":"text-tertiary")},"Comet v","0.0.100"),window.electron&&l&&v.createElement("div",{className:"pl-2"},v.createElement(Vt,{className:"w-4.5 h-4.5 text-green-500 cursor-pointer"})))),!!e&&v.createElement(v.Fragment,null,v.createElement(b,{content:"Notifications",offset:n},v.createElement(h,{to:"/inbox"},v.createElement(Zt,{className:"w-4.5 h-4.5 cursor-pointer text-tertiary"}))),v.createElement(b,{content:"Settings",offset:n},v.createElement("div",{onClick:()=>a(!0)},v.createElement(Qt,{className:"w-4.5 h-4.5 cursor-pointer text-tertiary"})))))))}const Yi=e=>x(`\n  h-1.5\n  w-1.5\n  rounded-full\n  dark:bg-gray-100\n  mr-2\n  ${e?"opacity-100":"opacity-0"}\n`),Wi=e=>x(`\n  flex\n  items-center\n  cursor-pointer\n  ${e?"text-primary":"text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}\n`);function Zi({open:e,setOpen:n,server:r,channel:a}){var l;const{handleSubmit:s,register:o,setValue:i,watch:c,reset:m}=te({mode:"onChange"}),d=c("name");g.exports.useEffect((()=>{d&&i("name",d.toLowerCase().replace(" ","-").replace(/[^a-z0-9-_]+/,""))}),[d]);const[u,p]=g.exports.useState(null!=(l=null==a?void 0:a.type)?l:Rn.Public),{push:h}=$(),[f,{loading:E}]=function(e){const n={...Mn,...e};return t(wr,n)}({update(e,{data:{createChannel:t}}){e.writeQuery({query:Ra,variables:{name:r.name},data:{server:{...r,channels:[...r.channels,t]}}})}}),[x,{loading:y}]=function(e){const n={...Mn,...e};return t(Nr,n)}(),w=()=>{n(!1)};g.exports.useEffect((()=>{a?(i("name",a.name),i("description",a.description||""),p(a.type)):(m(),p(Rn.Public))}),[a]);const N=!a&&!!d&&r.channels.map((e=>e.name)).includes(d);return v.createElement(Zl,{onSubmit:s((({name:e,description:t})=>{a?x({variables:{input:{description:t,channelId:a.id,type:u}}}).then((()=>{w()})):f({variables:{input:{name:e,description:t,serverId:r.id,type:u}}}).then((({data:{createChannel:e}})=>{w(),h(`/+${r.name}/#${e.name}`),m(),p(Rn.Public)}))})),open:e,close:w,closeOnOverlayClick:!0,buttons:v.createElement("button",{type:"submit",className:"form-button-submit",disabled:!a&&!d||N||E||y},E||y?v.createElement(Ja,{className:"w-5 h-5"}):v.createElement(X,{className:"w-5 h-5"}))},v.createElement("div",{className:"p-5 space-y-4 w-full text-left"},v.createElement("div",{className:"flex items-center font-semibold text-primary"},v.createElement(tl,{server:r,size:6,className:"rounded-md mr-2"}),v.createElement("div",{className:"truncate"},r.displayName),"  ·  ",a?"Edit":"Create"," Channel",v.createElement(ee,{className:"h-5 w-5 highlightable ml-auto",onClick:()=>w()})),v.createElement("div",null,v.createElement("div",{className:"relative"},v.createElement("input",{...o("name",{required:!0,maxLength:100}),maxLength:100,className:"form-input-icon",spellCheck:!1,autoCapitalize:"none",id:"name",placeholder:"Channel name",disabled:!!a}),v.createElement(Ka,{className:"form-input-icon-icon"})),N&&v.createElement("div",{className:"form-error"},"Channel already exists")),v.createElement("textarea",{placeholder:"Description",...o("description"),className:"form-textarea"}),v.createElement("div",{className:"flex items-center space-x-4 text-sm text-tertiary"},v.createElement(b,{content:"Anyone can view and send messages"},v.createElement("div",{onClick:()=>p(Rn.Public),className:Wi(u===Rn.Public)},v.createElement("div",{className:Yi(u===Rn.Public)}),"Public")),v.createElement(b,{content:"Anyone can view, but only members with permission can send messages"},v.createElement("div",{onClick:()=>p(Rn.Restricted),className:Wi(u===Rn.Restricted)},v.createElement("div",{className:Yi(u===Rn.Restricted)}),"Restricted")),v.createElement(b,{content:"Only members with permission can view and send messages"},v.createElement("div",{onClick:()=>p(Rn.Private),className:Wi(u===Rn.Private)},v.createElement("div",{className:Yi(u===Rn.Private)}),"Private")))))}function Qi({channel:e,server:t}){const{t:n}=N(),[r]=Cl({server:t,permissions:[rr.ManageChannels]}),{hash:a}=U(),l=`/+${null==t?void 0:t.name}/#${e.name}`,s=a.substring(1)===e.name,[o,i]=g.exports.useState(!1),[c,m]=g.exports.useState(!1);return v.createElement(v.Fragment,null,v.createElement(Zi,{open:c,setOpen:m,channel:e,server:t}),v.createElement(Bl,{data:{type:kl,channel:e,server:t,openDelete:()=>i(!0),openEdit:()=>m(!0)}},v.createElement(us,{to:l,active:s},e.isUnread&&!s&&v.createElement("div",{className:"absolute -left-1.5 top-1/2 transform -translate-y-1/2 rounded-r-full dark:bg-gray-100 bg-gray-900 h-2 w-1"}),v.createElement(Ka,{className:"w-5 h-5 mr-3 text-tertiary"}),v.createElement("span",{className:""+(e.isUnread?"text-primary":"")},e.name),v.createElement("div",{className:"ml-auto"}),!!e.mentionCount&&v.createElement("div",{className:r?"group-hover:hidden block":""},v.createElement(ts,{count:e.mentionCount})),r&&v.createElement(b,{content:n("channel.edit")},v.createElement("div",{className:"group-hover:block hidden",onClick:e=>{e.stopPropagation(),e.preventDefault(),m(!0)}},v.createElement(Qt,{className:"w-4 h-4 text-tertiary"}))))),v.createElement(Ji,{open:o,setOpen:i,channel:e,server:t}))}function Ji({server:e,channel:n,open:r,setOpen:a}){const[l,{loading:s}]=function(e){const n={...Mn,...e};return t(kr,n)}(),{push:o}=$(),{pathname:i,hash:c}=U();return v.createElement(Zl,{closeOnOverlayClick:!0,small:!0,open:r,close:()=>a(!1),buttons:v.createElement(v.Fragment,null,v.createElement("button",{className:"form-button-cancel",onClick:()=>a(!1),type:"button"},"Cancel"),v.createElement("button",{className:"form-button-delete",disabled:s,onClick:()=>{l({variables:{input:{channelId:n.id}},update(t,{data:{deleteChannel:n}}){t.writeQuery({query:Ra,variables:{name:e.name},data:{server:{...e,channels:e.channels.filter((e=>e.id!==n))}}})}}).then((()=>{a(!1),i===`/+${e.name}/`&&c===`#${n.name}`&&o(`/+${e.name}`)}))},type:"button"},s?v.createElement(Ja,null):"Delete"))},v.createElement("div",{className:"px-4 pt-4 pb-10"},v.createElement("div",{className:"text-lg font-medium text-secondary"},"Delete ",v.createElement("span",{className:"text-primary"},"#",n.name),"?"),v.createElement("div",{className:"text-tertiary pt-3 text-sm"},"Messages in this channel will be lost.")))}function Ki({server:e}){const{t:t}=N(),[n,r]=g.exports.useState(!1),[a]=Cl({server:e,permissions:[rr.ManageChannels]});return a?v.createElement(v.Fragment,null,v.createElement(gs,{onClick:()=>r(!0),plusLabel:t("channel.create")},"Channels"),v.createElement(Zi,{open:n,setOpen:r,server:e})):v.createElement(gs,null,"Channels")}function Xi({open:e,setOpen:n,server:r}){var a;const{t:l}=N(),[s,o]=g.exports.useState(null==(a=r.roles.find((e=>e.isDefault)))?void 0:a.id),i=r.roles.find((e=>e.id===s)),[c,m]=g.exports.useState(i.color),[d,u]=g.exports.useState(i.name),[p,h]=g.exports.useState(i.permissions);g.exports.useEffect((()=>{h(i.permissions),u(i.name),m(i.color)}),[i]);const[f]=function(e){const n={...Mn,...e};return t(aa,n)}({update(e,{data:{deleteRole:t}}){e.writeQuery({query:Ra,variables:{name:r.name},data:{server:{...r,roles:r.roles.filter((e=>e.id!==t))}}})}}),[E,{loading:x}]=function(e){const n={...Mn,...e};return t(ra,n)}(),y=!((e,t)=>{if(e.length!==t.length)return!1;for(const n of e)if(!t.includes(n))return!1;for(const n of t)if(!e.includes(n))return!1;return!0})(p,i.permissions)||d!==i.name||c!==i.color,w=[rr.SendMessages,rr.RestrictedChannels,rr.PrivateChannels,rr.ManageChannels,rr.ManageServer,rr.ManagePosts,rr.ManageComments,rr.DisplayRoleSeparately,rr.Admin],[k,C]=g.exports.useState(!1),[$,U]=g.exports.useState(""),[S,{loading:I}]=function(e){const n={...Mn,...e};return t(na,n)}({update(e,{data:{createRole:t}}){e.writeQuery({query:Ra,variables:{name:r.name},data:{server:{...r,roles:[t,...r.roles]}}})}}),P=()=>{$?S({variables:{input:{serverId:r.id,name:$}}}).then((e=>{U(""),C(!1),o(e.data.createRole.id)})):C(!1)};return v.createElement(Zl,{open:e,close:()=>{n(!1)},closeOnOverlayClick:!0,large:!0},v.createElement("div",{className:"flex"},v.createElement("div",{className:"h-[40rem] max-h-screen w-60 dark:bg-gray-750 rounded-l-lg space-y-0.5 overflow-y-auto scrollbar-custom p-1.5"},k?v.createElement("div",{className:"relative py-1 px-1.5"},v.createElement("input",{className:"form-input-password",placeholder:"Name",autoFocus:!0,value:$,onChange:e=>U(e.target.value),onKeyDown:e=>{"Enter"===e.code&&d&&P()},type:"text",maxLength:100}),I?v.createElement(Ja,{className:"form-show-password-button"}):v.createElement(X,{onClick:P,className:"form-show-password-button"})):v.createElement(us,{light:!0,onClick:()=>C(!0)},"Add Role",v.createElement(me,{className:"w-5 h-5 ml-auto"})),null==r?void 0:r.roles.map((e=>v.createElement(us,{key:e.id,light:!0,active:s===e.id,onClick:()=>o(e.id)},v.createElement("span",{style:{color:e.color}},e.name),!e.isDefault&&v.createElement(b,{content:"Delete Role"},v.createElement("div",{onClick:()=>{f({variables:{input:{roleId:e.id}}}),s===e.id&&o(r.roles.find((e=>e.isDefault)))},className:"group-hover:visible invisible ml-auto highlightable"},v.createElement(jt,{className:"w-4 h-4"}))))))),v.createElement("div",{className:"relative py-5 px-7 w-full h-[40rem] overflow-y-auto max-h-screen scrollbar-thin dark:scrollbar-thumb-gray-850 scrollbar-track-transparent scrollbar-thumb-rounded-md rounded-tr-lg"},v.createElement("div",{className:"flex items-center justify-between pb-5"},v.createElement("div",{className:"text-primary text-base font-semibold"},"Edit Role - ",i.name,!!(null==i?void 0:i.isDefault)&&" (Default)")),v.createElement("div",{className:"mb-6"},v.createElement("label",{className:"label"},"Name"),v.createElement("input",{className:"form-input",placeholder:"Name",value:d,onChange:e=>u(e.target.value),id:"name"})),v.createElement("div",{className:"label"},"Color"),v.createElement("div",{className:"grid grid-cols-4 gap-2 mb-10 w-60"},Object.keys(Cs).map((e=>v.createElement("div",{key:e,className:"h-6 rounded relative cursor-pointer",style:{backgroundColor:Cs[e][500]},onClick:()=>{c===Cs[e][500]?m(null):m(Cs[e][500])}},c===Cs[e][500]&&v.createElement("div",{className:"inset-0 absolute flex items-center justify-center"},v.createElement(X,{className:"w-4 h-4 text-white"})))))),v.createElement("div",{className:"label"},"Permissions"),v.createElement("div",{className:"space-y-0.5 divide-y divide-gray-700"},w.map((e=>v.createElement("div",{key:e,className:"flex w-full py-4 text-base cursor-pointer "+(p.includes(rr.Admin)&&e!==rr.Admin?"opacity-50":""),onClick:()=>{p.includes(rr.Admin)&&e!==rr.Admin||(p.includes(e)?h(p.filter((t=>t!==e))):h([...p,e]))}},v.createElement("div",null,v.createElement("div",{className:"font-medium"},l(`permissions.server.${e}.title`)),!!l(`permissions.server.${e}.description`)&&v.createElement("div",{className:"text-13 text-tertiary pt-1"},l(`permissions.server.${e}.description`))),v.createElement("div",{className:"pl-6 ml-auto"},v.createElement(Ql,{disabled:p.includes(rr.Admin)&&e!==rr.Admin,green:!0,checked:p.includes(e),onChange:()=>{p.includes(e)?h(p.filter((t=>t!==e))):h([...p,e])}})))))),v.createElement("div",{className:"h-16"}),v.createElement(ie,null,!!y&&v.createElement(ce.div,{initial:{y:"500px"},animate:{y:0},exit:{y:"500px"},transition:{ease:[.4,0,.2,1],duration:.15},className:"sticky z-50 flex items-center rounded-lg shadow-lg bottom-0 w-full dark:bg-gray-725 pr-3 pl-6 h-14 transform transition "},v.createElement("div",{className:"text-secondary text-sm"},"Changes not saved"),v.createElement("div",{className:"flex items-center space-x-3 ml-auto"},v.createElement("button",{type:"button",className:"form-button-cancel",onClick:()=>{u(i.name),m(i.color),h(i.permissions)}},"Discard"),v.createElement("button",{type:"button",disabled:!d||!y||x,className:"form-button-submit",onClick:()=>E({variables:{input:{roleId:s,name:d,color:c,permissions:p}}})},"Save",x&&v.createElement(Ja,{className:"w-5 h-5 text-primary ml-3"}))))))))}function ec(){const{server:e}=Ui(),[n]=_a(),[r,a]=g.exports.useState(!1),[l,s]=g.exports.useState(!1),[o,i]=Cl({server:e,permissions:[rr.ManageServer,rr.PrivateChannels]}),[c,{loading:m}]=function(e){const n={...Mn,...e};return t(ca,n)}(),[d,{loading:u}]=da(),p=jl(null==e?void 0:e.category);return e?v.createElement(v.Fragment,null,v.createElement(Kl,{open:r,setOpen:a,server:e}),v.createElement(Xi,{open:l,setOpen:s,server:e,key:e.id}),v.createElement(is,null,e.bannerUrl?v.createElement("div",{className:"h-20 relative bg-center bg-cover bg-no-repeat "+(e.bannerUrl?"":"bg-gradient-to-br from-red-400 to-indigo-600"),style:e.bannerUrl?{backgroundImage:`url(${e.bannerUrl})`}:{}}):v.createElement("div",{className:"h-12 border-b dark:border-gray-850 shadow flex items-center px-5 text-base font-medium"},v.createElement(zo,{className:"h-4"})),v.createElement("div",{className:"px-1.5 pt-4"},v.createElement("div",{className:"shadow-inner dark:bg-gray-850 bg-gray-300 p-2.5 space-y-2.5 rounded"},v.createElement("div",{className:"flex items-center"},v.createElement(tl,{server:e,size:6,className:"rounded-md mr-2 dark:bg-gray-750"}),v.createElement("div",{className:"font-semibold text-primary pr-2.5 truncate"},e.displayName),!!n&&n.id!==e.owner.id&&v.createElement("button",{className:(h=e.isJoined,f=m||u,x(`\n  ml-auto\n  px-3\n  h-6\n  rounded\n  text-13\n  font-medium\n  focus:outline-none\n  ${h?"border border-gray-700 text-blue-500":"bg-blue-500 text-primary"}\n  ${f?"opacity-50":"opacity-100"}\n`)),type:"button",onClick:()=>{m||u||(e.isJoined?d({variables:{input:{serverId:e.id}}}):c({variables:{input:{serverId:e.id}}}))}},e.isJoined?"Leave":"Join")),v.createElement("div",{className:"text-13 text-secondary pb-1.5"},e.description||"No description"),v.createElement("div",{className:"flex items-center justify-between"},v.createElement("div",{className:"text-xs font-medium flex items-center text-tertiary"},v.createElement(ue,{className:"w-4 h-4 mr-2.5"}),e.userCount," Member",1===e.userCount?"":"s"),v.createElement("div",{className:"text-xs font-medium flex items-center text-tertiary"},v.createElement(p,{className:"w-4 h-4 mr-2.5"}),e.category))),v.createElement(gs,{plusLabel:"Create Post"},"Posts"),v.createElement(Hi,null),v.createElement(Ki,{server:e}),v.createElement("div",{className:"space-y-0.5"},e.channels.filter((e=>e.type!==Rn.Private||i)).map((t=>v.createElement(Qi,{key:t.id,channel:t,server:e})))),o&&v.createElement(v.Fragment,null,v.createElement(gs,null,"Admin"),v.createElement("div",{className:"space-y-0.5"},v.createElement(us,{onClick:()=>a(!0)},v.createElement(Qt,{className:"mr-3 w-5 h-5"}),"Edit Planet"),v.createElement(us,{onClick:()=>s(!0)},v.createElement(Jt,{className:"mr-3 w-5 h-5"}),"Manage Roles")))))):null;var h,f}function tc({channel:e}){var t;return v.createElement(bs,{showDivider:!!(null==e?void 0:e.description),icon:v.createElement(Ka,{className:"w-5 h-5"}),title:`${null!=(t=null==e?void 0:e.name)?t:""}`},(null==e?void 0:e.description)&&v.createElement("div",{className:"text-13 text-tertiary font-medium leading-5 truncate"},null==e?void 0:e.description),v.createElement("div",{className:"ml-auto pl-6 flex items-center space-x-5"},v.createElement(xs,null)))}function nc({channelName:e}){var t;const{server:n,users:r}=Ui(),a=(null!=(t=null==n?void 0:n.channels)?t:[]).find((t=>t.name===e));return wi(a?`/#${e}`:null),v.createElement(ro,{header:v.createElement(tc,{channel:a}),rightSidebar:v.createElement(ki,{channel:a,serverUsers:r,server:n})},v.createElement(dt,null,v.createElement("title",null,a&&n?`#${null==a?void 0:a.name} – ${null==n?void 0:n.displayName}`:null)),!!a&&v.createElement(xi,{server:n,channel:a,users:r.map((e=>e.user))}))}const rc=()=>{var e,t,n,a;const[l]=_a(),{push:s}=$(),{pathname:o,hash:i}=U(),c=S(o,{path:"/:server"}),m=null==(e=null==c?void 0:c.params)?void 0:e.server.substring(1),d=m&&i?i.substring(1):null,u=S(o,{path:"/dm/:username"}),p=null==(n=null==(t=null==u?void 0:u.params)?void 0:t.username)?void 0:n.substring(1),v=S(o,{path:"/group/:groupId"}),h=null==(a=null==v?void 0:v.params)?void 0:a.groupId,[f,b]=g.exports.useState(!0);g.exports.useEffect((()=>{window.electron&&(window.electron.on("windowOpened",(()=>b(!0))),window.electron.on("windowClosed",(()=>b(!1))))}),[]),function(e){const t={...Mn,...e};r(La,t)}({skip:!l,onSubscriptionData({client:e,subscriptionData:t}){var n,r,a,o,i,c,u,g;if(t.data){const v=t.data.messageChanged,b=null==v?void 0:v.added,E=null==v?void 0:v.deleted;let x;if(null==v||v.updated,b){x=b;const t=null==(n=x.channel)?void 0:n.id,c=null==(r=x.group)?void 0:r.id,u=x.toUser?null==(a=x.author)?void 0:a.id:void 0,g={query:$a,variables:{userId:u,groupId:c,channelId:t,cursor:null}},v=e.cache.readQuery(g);v&&!v.messages.messages.map((e=>e.id)).includes(x.id)&&e.cache.writeQuery({...g,data:{messages:{...v.messages,messages:[...v.messages.messages,x]}}});const E=p&&x.toUser&&p===x.toUser.username,y=h&&x.group&&h===x.group.id,w=d&&x.channel&&x.channel.server.name===m&&d===x.channel.name;if(x.toUser&&!E){const t=e.cache.readFragment({fragment:dr,id:`User:${x.author.id}`});t&&e.cache.writeFragment({fragment:dr,id:`User:${x.author.id}`,data:{...t,unreadCount:t.unreadCount+1}})}else if(x.group&&!y){const t=e.cache.readFragment({fragment:ur,id:`User:${x.group.id}`});t&&e.cache.writeFragment({fragment:ur,id:`Group:${x.group.id}`,data:{...t,unreadCount:t.unreadCount+1}})}else if(x.channel&&!w){const t=e.cache.readFragment({fragment:or,id:`Channel:${x.channel.id}`});if(t){console.log(t);const n={...t,isUnread:!0};(x.isEveryoneMentioned||l&&x.mentionedUsers.map((e=>e.id)).includes(l.id))&&(n.mentionCount=t.mentionCount+1),e.cache.writeFragment({fragment:or,id:`Channel:${x.channel.id}`,data:n})}}if(x.author.id!==l.id){if((!window.electron||window.electron&&f)&&(y||E||w))return;if(x.type===Hn.Normal&&x.text&&(x.toUser||x.group||x.isEveryoneMentioned||l&&x.mentionedUsers.map((e=>e.id)).includes(l.id))){let e=`@${x.author.username}`;x.channel&&(e+=` · #${x.channel.name}`),x.group&&(e+=` · #${x.group.displayName}`),Mo({title:e,body:ac(x.text),icon:null!=(o=x.author.avatarUrl)?o:(window.electron?".":"")+"/icons/icon.png",timestamp:x.createdAt,onClick:()=>{u?s(`/dm/@${x.author.username}`):c?s(`/group/${c}`):t&&s(`/+${x.server.name}/#${x.channel.name}`),window.electron&&window.electron.show()}})}else x.type===Hn.FriendRequestReceived&&Mo({title:`@${x.author.username}`,body:"Sent a friend request",icon:null!=(i=x.author.avatarUrl)?i:(window.electron?".":"")+"/icons/icon.png",timestamp:x.createdAt,onClick:()=>{s("/friends"),window.electron&&window.electron.show()}})}}else if(E){x=E;const t=null==(c=x.channel)?void 0:c.id,n=null==(u=x.group)?void 0:u.id,r=x.toUser?null==(g=x.author)?void 0:g.id:void 0,a={query:$a,variables:{userId:r,groupId:n,channelId:t,cursor:null}},l=e.cache.readQuery(a);l&&l.messages.messages.map((e=>e.id)).includes(x.id)&&e.cache.writeQuery({...a,data:{messages:{...l.messages,messages:l.messages.messages.filter((e=>e.id!==x.id))}}})}}}})};function ac(e){let t=document.createElement("DIV");return t.innerHTML=e,t.textContent||t.innerText||""}function lc(){var e,t;rc();const{pathname:n}=U(),r=S(n,{path:"/dm/:username"}),a=null==(t=null==(e=null==r?void 0:r.params)?void 0:e.username)?void 0:t.substring(1);return v.createElement(Kt,null,v.createElement(Xt,{path:"/"},v.createElement(Kt,null,v.createElement(Xt,{path:["/","/inbox","/dm/:username(@[A-Za-z0-9-_]+)","/:server(\\+[A-Za-z0-9_]+)","/:server(\\+[A-Za-z0-9_]+)/post/:postId","/:server(\\+[A-Za-z0-9_]+)/post/:postId/:slug","/explore"],exact:!0},v.createElement("div",{className:"flex-grow"},v.createElement("div",{className:"flex items-stretch",style:{height:"calc(100% - 1.375rem)"}},v.createElement(ns,{hide:!0}),v.createElement(Xt,{path:"/explore"},v.createElement(Go,null)),v.createElement(Xt,{path:"/:server(\\+[A-Za-z0-9_]+)"},v.createElement(sc,null)),v.createElement(Xt,{exact:!0,path:["/","/inbox","/dm/:username(@[A-Za-z0-9-_]+)"]},v.createElement(Bi,null),v.createElement(Xt,{path:"/",exact:!0},v.createElement(Lo,null)),v.createElement(Xt,{path:"/inbox"},v.createElement(Ko,null)),v.createElement(Xt,{path:"/dm/:username(@[A-Za-z0-9-_]+)"},v.createElement(yi,{username:a})))),v.createElement(Vi,null))),v.createElement(Xt,null,v.createElement(Ga,null)))))}function sc(){const{server:e}=zt(),t=e.substring(1);return v.createElement($i,{name:t},v.createElement(oc,null))}function oc(){var e;const{server:t,loading:n}=Ui(),{hash:r,pathname:a}=U(),l=r.substring(1),s=S(a,{path:"/:server/post/:postId"}),o=null==(e=null==s?void 0:s.params)?void 0:e.postId;return t||n?v.createElement(v.Fragment,null,v.createElement(ec,null),v.createElement(Xt,{path:"/:server(\\+[A-Za-z0-9_]+)",exact:!0,render:({location:e})=>e.hash?v.createElement(nc,{channelName:l}):v.createElement(Si,null)}),v.createElement(Xt,{path:["/:server(\\+[A-Za-z0-9_]+)/post/:postId","/:server(\\+[A-Za-z0-9_]+)/post/:postId/:slug"]},v.createElement(zi,{postId:o}))):v.createElement(Ga,null)}function ic(){return en("(min-width: 1024px)"),v.createElement(tn,{position:"bottom-center",toastOptions:{className:"toast",success:{className:"toast",iconTheme:{primary:"#059669"}},error:{className:"toast",iconTheme:{primary:"#EF4444"}}}})}function cc({post:e,show:t}){const n=e?e.title.split(" "):[],r=`${n.slice(0,9).join(" ")}${n.length>=9?"...":""}`;return v.createElement("div",null,v.createElement(ie,null,t&&v.createElement(ce.div,{initial:{scale:.75,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.75,opacity:0},transition:{duration:.15,ease:"easeInOut"},className:"bg-blue-500 bg-opacity-75 truncate w-64 rounded-md shadow-lg text-white text-sm font-medium h-10 px-2 flex items-center"},v.createElement("div",{className:"truncate"},r))))}const mc={position:"fixed",pointerEvents:"none",zIndex:100,left:0,top:0};function dc(e,t,n,r){e||(e={x:0,y:0});let a=n.x-e.x,l=n.y-e.y,{x:s,y:o}=t||{x:r.x-e.x,y:r.y-e.y};const i=`translate(${s+a}px, ${o+l}px)`;return{transform:i,WebkitTransform:i}}var uc=g.exports.memo((function(){const[e,t]=g.exports.useState({x:0,y:0}),[n,r]=g.exports.useState({x:0,y:0}),a=e=>t({x:e.clientX,y:e.clientY}),l=e=>t({x:e.clientX,y:e.clientY});g.exports.useEffect((()=>(window.addEventListener("mousedown",a),window.addEventListener("mouseup",l),()=>{window.removeEventListener("mousedown",a),window.removeEventListener("mouseup",l)})));const{itemType:s,isDragging:o,item:i,initialOffset:c,currentOffset:m}=nn((e=>({item:e.getItem(),itemType:e.getItemType(),initialOffset:e.getInitialSourceClientOffset(),currentOffset:e.getSourceClientOffset(),isDragging:e.isDragging()})));return v.createElement("div",{style:mc},v.createElement("div",{style:dc(c,m,e,n)},s===cs&&v.createElement(cc,{post:i,show:o})))}));const pc="_window-button_19ru1_11",gc="_window-button-icon_19ru1_18";function vc(){const{close:e,minimize:t,maximize:n,unmaximize:r,isMaximized:a}=window.electron,[l,s]=g.exports.useState(a()),o=()=>s(a());return v.createElement("header",{className:"_titlebar_19ru1_1"},v.createElement(zo,{className:"h-3 text-tertiary"}),v.createElement("div",{className:"_window-controls_19ru1_6"},v.createElement("div",{className:`${pc} flex`,onClick:()=>{t(),o()}},v.createElement("img",{className:`${gc} hidden dark:block`,srcSet:"./icons/titlebar/min-w-10.png 1x, ./icons/titlebar/min-w-12.png 1.25x, ./icons/titlebar/min-w-15.png 1.5x, ./icons/titlebar/min-w-15.png 1.75x, ./icons/titlebar/min-w-20.png 2x, ./icons/titlebar/min-w-20.png 2.25x, ./icons/titlebar/min-w-24.png 2.5x, ./icons/titlebar/min-w-30.png 3x, ./icons/titlebar/min-w-30.png 3.5x",draggable:"false"}),v.createElement("img",{className:`${gc} block dark:hidden`,srcSet:"./icons/titlebar/min-k-10.png 1x, ./icons/titlebar/min-k-12.png 1.25x, ./icons/titlebar/min-k-15.png 1.5x, ./icons/titlebar/min-k-15.png 1.75x, ./icons/titlebar/min-k-20.png 2x, ./icons/titlebar/min-k-20.png 2.25x, ./icons/titlebar/min-k-24.png 2.5x, ./icons/titlebar/min-k-30.png 3x, ./icons/titlebar/min-k-30.png 3.5x",draggable:"false"})),v.createElement("div",{className:`${pc} ${l?"hidden":"flex"}`,onClick:()=>{n(),o()}},v.createElement("img",{className:`${gc} hidden dark:block`,srcSet:"./icons/titlebar/max-w-10.png 1x, ./icons/titlebar/max-w-12.png 1.25x, ./icons/titlebar/max-w-15.png 1.5x, ./icons/titlebar/max-w-15.png 1.75x, ./icons/titlebar/max-w-20.png 2x, ./icons/titlebar/max-w-20.png 2.25x, ./icons/titlebar/max-w-24.png 2.5x, ./icons/titlebar/max-w-30.png 3x, ./icons/titlebar/max-w-30.png 3.5x",draggable:"false"}),v.createElement("img",{className:`${gc} block dark:hidden`,srcSet:"./icons/titlebar/max-k-10.png 1x, ./icons/titlebar/max-k-12.png 1.25x, ./icons/titlebar/max-k-15.png 1.5x, ./icons/titlebar/max-k-15.png 1.75x, ./icons/titlebar/max-k-20.png 2x, ./icons/titlebar/max-k-20.png 2.25x, ./icons/titlebar/max-k-24.png 2.5x, ./icons/titlebar/max-k-30.png 3x, ./icons/titlebar/max-k-30.png 3.5x",draggable:"false"})),v.createElement("div",{className:`${pc} ${l?"flex":"hidden"}`,onClick:()=>{r(),o()}},v.createElement("img",{className:`${gc} hidden dark:block`,srcSet:"./icons/titlebar/restore-w-10.png 1x, ./icons/titlebar/restore-w-12.png 1.25x, ./icons/titlebar/restore-w-15.png 1.5x, ./icons/titlebar/restore-w-15.png 1.75x, ./icons/titlebar/restore-w-20.png 2x, ./icons/titlebar/restore-w-20.png 2.25x, ./icons/titlebar/restore-w-24.png 2.5x, ./icons/titlebar/restore-w-30.png 3x, ./icons/titlebar/restore-w-30.png 3.5x",draggable:"false"}),v.createElement("img",{className:`${gc} block dark:hidden`,srcSet:"./icons/titlebar/restore-k-10.png 1x, ./icons/titlebar/restore-k-12.png 1.25x, ./icons/titlebar/restore-k-15.png 1.5x, ./icons/titlebar/restore-k-15.png 1.75x, ./icons/titlebar/restore-k-20.png 2x, ./icons/titlebar/restore-k-20.png 2.25x, ./icons/titlebar/restore-k-24.png 2.5x, ./icons/titlebar/restore-k-30.png 3x, ./icons/titlebar/restore-k-30.png 3.5x",draggable:"false"})),v.createElement("div",{className:`${pc} _close-button_19ru1_32 flex`,onClick:()=>{e(),o()}},v.createElement("img",{className:`${gc} hidden dark:block`,srcSet:"./icons/titlebar/close-w-10.png 1x, ./icons/titlebar/close-w-12.png 1.25x, ./icons/titlebar/close-w-15.png 1.5x, ./icons/titlebar/close-w-15.png 1.75x, ./icons/titlebar/close-w-20.png 2x, ./icons/titlebar/close-w-20.png 2.25x, ./icons/titlebar/close-w-24.png 2.5x, ./icons/titlebar/close-w-30.png 3x, ./icons/titlebar/close-w-30.png 3.5x",draggable:"false"}),v.createElement("img",{className:`${gc} block dark:hidden`,srcSet:"./icons/titlebar/close-k-10.png 1x, ./icons/titlebar/close-k-12.png 1.25x, ./icons/titlebar/close-k-15.png 1.5x, ./icons/titlebar/close-k-15.png 1.75x, ./icons/titlebar/close-k-20.png 2x, ./icons/titlebar/close-k-20.png 2.25x, ./icons/titlebar/close-k-24.png 2.5x, ./icons/titlebar/close-k-30.png 3x, ./icons/titlebar/close-k-30.png 3.5x",draggable:"false"}))))}const{hasOwnProperty:hc}=Object.prototype;const fc=(e,t)=>{let n;try{n=JSON.stringify(e)}catch(r){const e=new an(`Network request failed. ${t} is not serializable: ${r.message}`);throw e.parseError=r,e}return n};function bc(e,t,n){e.append(t,n,n.name)}const Ec=(e={})=>{let{uri:t="/graphql",fetch:n,includeExtensions:r,useGETForQueries:a,isExtractableFile:l=cn,formDataAppendFile:s=bc,...i}=e;mn(n),n||(n=fetch);const c={http:{includeExtensions:r},options:i.fetchOptions,credentials:i.credentials,headers:i.headers};return new o((e=>{let r=ln(e,t);const o=e.getContext(),i={};if(o.clientAwareness){const{name:e,version:t}=o.clientAwareness;e&&(i["apollographql-client-name"]=e),t&&(i["apollographql-client-version"]=t)}const d={...i,...o.headers},u={http:o.http,options:o.fetchOptions,credentials:o.credentials,headers:d},{options:g,body:v}=((e,t,...n)=>{let r={...t.options,headers:t.headers,credentials:t.credentials},a=t.http||{};n.forEach((e=>{r={...r,...e.options,headers:{...r.headers,...e.headers}},e.credentials&&(r.credentials=e.credentials),a={...a,...e.http}}));const{operationName:l,extensions:s,variables:o,query:i}=e,c={operationName:l,variables:o};return a.includeExtensions&&(c.extensions=s),a.includeQuery&&(c.query=p(i)),{options:r,body:c}})(e,dn,c,u),{clone:h,files:f}=sn(v,"",l),b=fc(h,"Payload");let E;if(!g.signal){const{controller:e,signal:t}=(()=>{if("undefined"==typeof AbortController)return{controller:!1,signal:!1};const e=new AbortController;return{controller:e,signal:e.signal}})();E=e,E&&(g.signal=t)}if(a&&!e.query.definitions.some((e=>"OperationDefinition"===e.kind&&"mutation"===e.operation))&&(g.method="GET"),"GET"===g.method){const{newURI:e,parseError:t}=function(e,n){const r=[],a=(e,t)=>{r.push(`${e}=${encodeURIComponent(t)}`)};if("query"in n&&a("query",n.query),n.operationName&&a("operationName",n.operationName),n.variables){let e;try{e=fc(n.variables,"Variables map")}catch(t){return{parseError:t}}a("variables",e)}if(n.extensions){let e;try{e=fc(n.extensions,"Extensions map")}catch(t){return{parseError:t}}a("extensions",e)}let l="",s=e;const o=e.indexOf("#");-1!==o&&(l=e.substr(o),s=e.substr(0,o));const i=-1===s.indexOf("?")?"?":"&";return{newURI:s+i+r.join("&")+l}}(r,v);if(t)return on(t);r=e}else if(f.size){delete g.headers["content-type"];const e=new FormData;e.append("operations",b);const t={};let n=0;f.forEach((e=>{t[++n]=e})),e.append("map",JSON.stringify(t)),n=0,f.forEach(((t,r)=>{s(e,++n,r)})),g.body=e}else try{g.body=fc(v,"Payload")}catch(x){return on(x)}return new m((t=>{var a;return n(r,g).then((t=>(e.setContext({response:t}),t))).then((a=e,e=>e.text().then((t=>{try{return JSON.parse(t)}catch(n){const r=n;throw r.name="ServerParseError",r.response=e,r.statusCode=e.status,r.bodyText=t,r}})).then((t=>(e.status>=300&&rn(e,t,`Response not successful: Received status code ${e.status}`),Array.isArray(t)||hc.call(t,"data")||hc.call(t,"errors")||rn(e,t,`Server response was missing for query '${Array.isArray(a)?a.map((e=>e.operationName)):a.operationName}'.`),t))))).then((e=>(t.next(e),t.complete(),e))).catch((e=>{"AbortError"!==e.name&&(e.result&&e.result.errors&&e.result.data&&t.next(e.result),t.error(e))})),()=>{E&&E.abort()}}))}))};const xc=bn((({graphQLErrors:e,networkError:t})=>{e&&e.forEach((e=>{const{message:t,locations:n,path:r}=e;console.log(`[GraphQL error]: Message: ${t}, Location: ${n}, Path: ${r}`),"Access denied! You need to be authorized to perform this action!"!==t&&C.error(a.t(t))})),t&&(console.log(`[Network error]: ${t}`),C.error(t.message))})),yc=new class extends o{constructor(e={}){super(Ec(e).request),this.options=e}}({uri:"https://api.joincomet.app/graphql",headers:{token:localStorage.getItem("token")}}),wc=En(((e,{headers:t})=>{const n=localStorage.getItem("token");return{headers:n?{...t,token:n}:t}})),Nc=new class extends o{constructor(){super(),this.client=i({url:"wss://api.joincomet.app/graphql",lazy:!1,connectionParams:()=>{const e=localStorage.getItem("token");return e?{token:e}:{}},on:{connected:()=>{qa.status="connected"},error:()=>{qa.status="error"},closed:()=>{qa.status="closed"},connecting:()=>{qa.status="connecting"}}})}wsFetcher(e){return c((t=>this.client.subscribe(e,t)))}request(e){return new m((t=>d(u(this.wsFetcher({operationName:e.operationName,query:p(e.query),variables:e.variables})),t)))}};function kc(e,t){return e||t}const Cc=new hn({link:vn([xc,(new un).split((({query:e})=>{const t=pn(e);return"OperationDefinition"===t.kind&&("subscription"===t.operation||gn(t))}),Nc,wc.concat(yc))]),cache:new fn({typePolicies:{User:{fields:{servers:{merge:!1},folders:{merge:!1},relatedUsers:{merge:!1}}},Server:{fields:{channels:{merge:!1},folders:{merge:!1},owner:{merge:!0},permissions:{merge:!1},roles:{merge:!1}}},Post:{fields:{author:{merge:kc},serverUser:{merge:kc},server:{merge:kc}}},Comment:{fields:{author:{merge:kc},serverUser:{merge:kc}}},Message:{fields:{author:{merge:kc},serverUser:{merge:kc},channel:{merge:kc},group:{merge:kc},toUser:{merge:kc}}},Query:{fields:{serverUsers:{merge:!1},user:{merge:!0},server:{merge:!0},folder:{merge:!0},publicServers:{merge:!1}}}}})}),$c=/^[A-Za-z0-9-_]+$/gi;function Uc(){var e,n,r,a;const[l,s,o,i]=hs(),[c,m]=g.exports.useState(!1),{handleSubmit:d,register:u,watch:p,reset:h,getValues:f,formState:{errors:b}}=te({mode:"onChange",shouldUnregister:!0}),E=p("email"),x=p("username"),y=p("usernameOrEmail"),w=p("password"),N=p("confirmPassword"),[k,{loading:C}]=function(e){const n={...Mn,...e};return t(ha,n)}(),[$,{loading:U}]=function(e){const n={...Mn,...e};return t(xa,n)}(),S=()=>{h(),s(!1)},I=!(o?x&&x.length>=3&&x.length<=20&&$c.test(x)&&(!E||E&&xn(E))&&w&&w.length>=6&&N&&N===w:y&&w);return v.createElement(Zl,{close:S,open:l,onSubmit:d((({usernameOrEmail:e,email:t,username:n,password:r})=>{if(o)k({variables:{input:{username:n,password:r,email:t||null}}}).then((({data:{createAccount:{accessToken:e,user:t}}})=>{localStorage.setItem("token",e),location.reload()}));else{const t=xn(e)?{email:e}:{username:e};$({variables:{input:{...t,password:r}}}).then((({data:{login:{accessToken:e,user:t}}})=>{localStorage.setItem("token",e),location.reload()}))}})),buttons:v.createElement("button",{type:"submit",className:"form-button-submit",disabled:I},o&&C||!o&&U?v.createElement(Ja,{className:"w-5 h-5"}):v.createElement(ne,{className:"w-5 h-5"}))},v.createElement("div",{className:"rounded-t-lg bg-gradient-to-r from-red-400 to-indigo-600 h-2"}),v.createElement("div",{className:"px-5 pt-2 pb-9 text-left"},v.createElement("div",{className:"pb-4 flex items-center"},v.createElement("div",{onClick:()=>{o&&(i(!1),h())},className:"text-sm cursor-pointer mr-3 py-3 border-b-2 inline-flex items-center justify-center px-3 "+(o?"border-transparent text-secondary":"dark:border-gray-300 text-primary")},"Log In"),v.createElement("div",{onClick:()=>{o||(i(!0),h())},className:"text-sm cursor-pointer py-3 border-b-2 inline-flex items-center justify-center px-3 "+(o?"dark:border-gray-300 text-primary":"border-transparent text-secondary")},"Create Account"),v.createElement("div",{className:"ml-auto"},v.createElement(zo,{className:"h-3.5 text-secondary"})),v.createElement(ee,{className:"ml-5 w-5 h-5 text-tertiary highlightable",onClick:()=>S()})),v.createElement("div",{className:"space-y-4"},o?v.createElement(v.Fragment,null,v.createElement("div",null,v.createElement("div",{className:"relative"},v.createElement("input",{id:"username",...u("username",{required:!0,pattern:$c,maxLength:20,minLength:3}),className:"form-input-icon",placeholder:"Username",minLength:3,maxLength:20}),v.createElement(xe,{className:"form-input-icon-icon"})),"minLength"===(null==(e=b.username)?void 0:e.type)&&v.createElement("div",{className:"form-error"},"Username must be between 3 and 20 characters"),"pattern"===(null==(n=b.username)?void 0:n.type)&&v.createElement("div",{className:"form-error"},"Letters, numbers, dashes, and underscores only")),v.createElement("div",null,v.createElement("div",{className:"relative"},v.createElement("input",{id:"email",...u("email",{validate:{email:e=>!e||xn(e)||"Invalid email"}}),className:"form-input-icon",placeholder:"Email (Optional)",type:"email"}),v.createElement(yn,{className:"form-input-icon-icon"})),"email"===(null==(r=b.email)?void 0:r.type)&&v.createElement("div",{className:"form-error"},b.email.message))):v.createElement("input",{id:"usernameOrEmail",...u("usernameOrEmail",{shouldUnregister:!0}),className:"form-input",placeholder:"Username or email"}),o?v.createElement(v.Fragment,null,v.createElement("div",null,v.createElement("div",{className:"relative"},v.createElement("input",{id:"password",...u("password",{required:!0,minLength:6}),className:"form-input-password",placeholder:"Password",type:c?"text":"password",minLength:6}),v.createElement(es,{showPassword:c,setShowPassword:m})),"minLength"===(null==(a=b.password)?void 0:a.type)&&v.createElement("div",{className:"form-error"},"Password must be at least 6 characters")),v.createElement("div",null,v.createElement("div",{className:"relative"},v.createElement("input",{id:"confirmPassword",...u("confirmPassword",{required:!0,validate:{matchesPreviousPassword:e=>{const{password:t}=f();return t===e||"Passwords do not match"}}}),className:"form-input-password",placeholder:"Confirm Password",type:c?"text":"password"}),v.createElement(es,{showPassword:c,setShowPassword:m})),!!w&&!!N&&w!==N&&v.createElement("div",{className:"form-error"},"Passwords do not match"))):v.createElement("div",{className:"relative"},v.createElement("input",{id:"password",...u("password",{required:!0}),className:"form-input",placeholder:"Password",type:c?"text":"password"}),v.createElement(es,{showPassword:c,setShowPassword:m})))))}const Sc=x("\n  flex\n  w-full\n  items-center\n  dark:hover:bg-gray-725\n  px-2\n  py-1\n  h-12\n  rounded\n  cursor-pointer\n"),Ic="MutualServers";var Pc=g.exports.memo((function(){var e,t;const[n]=_a(),[r,a,l,s]=Ya((e=>[e.dialogUserId,e.setDialogUserId,e.userDialogOpen,e.setUserDialogOpen]));N();const[o,i]=g.exports.useState(Ic),{data:c}=Ta({variables:{id:r},skip:!r}),m=null==c?void 0:c.user,d=null!=(t=null==(e=null==c?void 0:c.user)?void 0:e.servers)?t:[],u=g.exports.useCallback((()=>{s(!1)}),[s]);return v.createElement(Wl,{closeOnOverlayClick:!0,isOpen:l,close:u},v.createElement("div",{onClick:e=>e.stopPropagation(),className:"rounded-lg max-w-xl w-full dark:bg-gray-850"},v.createElement("div",{className:"flex p-5"},v.createElement(Ss,{user:m,size:20,showOnline:!0,dotClassName:"ring-5 dark:ring-gray-850 w-4 h-4"}),v.createElement("div",{className:"ml-5 flex w-full pt-5"},v.createElement("div",{className:"font-semibold text-lg text-primary leading-none"},null==m?void 0:m.username),(null==m?void 0:m.isStaff)&&v.createElement(b,{content:"Staff"},v.createElement("div",{className:"cursor-pointer ml-3 h-5 w-5"},v.createElement(Oo,{className:"w-5 h-5"}))),(null==m?void 0:m.isOg)&&v.createElement(b,{content:"Early Adopter"},v.createElement("div",{className:"cursor-pointer ml-3 h-5 w-5"},v.createElement(wn,{className:"w-5 h-5 text-blue-500"}))),r!==(null==n?void 0:n.id)&&v.createElement(v.Fragment,null,v.createElement("div",{className:"ml-auto"}),v.createElement(Bl,{data:{type:bl,user:m},leftClick:!0},v.createElement("button",{className:"h-8 cursor-pointer highlightable ml-3 focus:outline-none"},v.createElement(Re,{className:"w-5 h-5"})))))),n&&(null==m?void 0:m.id)===n.id?v.createElement("div",{className:"h-36 dark:bg-gray-750 rounded-b-lg p-5 flex items-center justify-center"},v.createElement("button",{className:"h-0 w-0 overflow-hidden"}),v.createElement("div",{className:"text-lg font-medium text-tertiary"},"Improved profile coming soon!")):v.createElement(v.Fragment,null,v.createElement("div",{className:"px-5 dark:border-gray-775 border-t h-14 flex items-center space-x-10"},v.createElement("button",{className:(p=o===Ic,x(`\n  h-full\n  cursor-pointer\n  select-none\n  focus:outline-none\n  text-13\n  border-b-4\n  flex\n  items-center\n  box-content\n  ${p?"text-gray-900 dark:text-gray-100 dark:border-white":"text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 border-transparent"}\n`)),onClick:()=>i(Ic)},v.createElement("div",{className:"transform translate-y-0.5"},"Mutual Planets"))),v.createElement("div",{className:"rounded-b-lg dark:bg-gray-750 p-2 max-h-[15rem] min-h-[15rem] h-full scrollbar-custom"},o===Ic&&(d.length>0?d.map((e=>v.createElement(h,{to:`/+${e.name}`,key:e.id,className:Sc,onClick:()=>u()},v.createElement(tl,{server:e,size:10,className:"dark:bg-gray-800 rounded-full"}),v.createElement("div",{className:"pl-2.5 text-base text-secondary font-medium"},e.name)))):v.createElement(ja,{className:"h-36"},"No mutual planets"))))));var p}));function Fc(){const e="Mac OS"===Va(),t=window.electron?Un:Sn;return v.createElement(Nn,{client:Cc},v.createElement(kn,null,v.createElement(dt,null,v.createElement("meta",{charSet:"UTF-8"}),v.createElement("link",{rel:"icon",type:"image/svg+xml",href:"/logos/logo_icon.svg"}),v.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),v.createElement("title",null,"Comet – All-in-one chat & forums for communities")),v.createElement(Ba,null,v.createElement(t,null,v.createElement(Hl,null,v.createElement(Cn,{backend:$n,options:{enableTouchEvents:!1,enableMouseEvents:!0}},v.createElement(ic,null),v.createElement(uc,null),window.electron&&!e&&v.createElement(vc,null),v.createElement(Uc,null),v.createElement(Pc,null),v.createElement("div",{style:window.electron?{height:e?"100%":"calc(100% - 1.375rem)"}:{height:"100%"},className:"flex"},v.createElement(lc,null))))))))}window.electron&&document.documentElement.classList.add("electron"),In.render(v.createElement(Fc,null),document.getElementById("root"));
