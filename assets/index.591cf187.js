import{g as e,u as t,a as n,b as r,i as a,B as l,c as s,R as o,r as i,A as c,d as m,m as d,e as u,z as p,f as g,p as v,s as h,h as f,L as b,j as x,H as E,k as y,N as w,l as N,n as k,t as C,o as $,q as I,v as S,w as U,x as F,y as P,C as M,D as R,E as A,F as L,G as O,I as D,J as T,T as q,K as H,M as j,O as z,P as B,Q as _,S as V,U as G,V as Y,W,X as J,Y as Q,Z as K,_ as Z,$ as X,a0 as ee,a1 as te,a2 as ne,a3 as re,a4 as ae,a5 as le,a6 as se,a7 as oe,a8 as ie,a9 as ce,aa as me,ab as de,ac as ue,ad as pe,ae as ge,af as ve,ag as he,ah as fe,ai as be,aj as xe,ak as Ee,al as ye,am as we,an as Ne,ao as ke,ap as Ce,aq as $e,ar as Ie,as as Se,at as Ue,au as Fe,av as Pe,aw as Me,ax as Re,ay as Ae,az as Le,aA as Oe,aB as De,aC as Te,aD as qe,aE as He,aF as je,aG as ze,aH as Be,aI as _e,aJ as Ve,aK as Ge,aL as Ye,aM as We,aN as Je,aO as Qe,aP as Ke,aQ as Ze,aR as Xe,aS as et,aT as tt,aU as nt,aV as rt,aW as at,aX as lt,aY as st,aZ as ot,a_ as it,a$ as ct,b0 as mt,b1 as dt,b2 as ut,b3 as pt,b4 as gt,b5 as vt,b6 as ht,b7 as ft,b8 as bt,b9 as xt,ba as Et,bb as yt,bc as wt,bd as Nt,be as kt,bf as Ct,bg as $t,bh as It,bi as St,bj as Ut,bk as Ft,bl as Pt,bm as Mt,bn as Rt,bo as At,bp as Lt,bq as Ot,br as Dt,bs as Tt,bt as qt,bu as Ht,bv as jt,bw as zt,bx as Bt,by as _t,bz as Vt,bA as Gt,bB as Yt,bC as Wt,bD as Jt,bE as Qt,bF as Kt,bG as Zt,bH as Xt,bI as en,bJ as tn,bK as nn,bL as rn,bM as an,bN as ln,bO as sn,bP as on,bQ as cn,bR as mn,bS as dn,bT as un,bU as pn,bV as gn,bW as vn,bX as hn,bY as fn,bZ as bn,b_ as xn,b$ as En,c0 as yn,c1 as wn,c2 as Nn,c3 as kn,c4 as Cn,c5 as $n,c6 as In,c7 as Sn,c8 as Un,c9 as Fn}from"./vendor.edb25c13.js";const Pn={entityNotFound:"{{replace}} not found!",invalidUserAuth:"'USER' authorization can only be used on User entity",notLoggedIn:"Not logged in",fileSize:"File size must be less than {{replace}}MB",channelPermissions:"(useChannelPermissions) channelPermissions and serverPermissions must have same length",folder:{deleted:"Folder has been deleted",notOwner:"You do not own this folder",nameTooLong:"Name cannot be longer than 300 characters",alreadyExists:"You already have a folder with that name",noPermission:"You do not have permission to modify this folder.",alreadyAdded:"This post is already in this folder.",cannotEdit:"Cannot edit Read Later or Favorites folders.",cannotDelete:"Cannot delete Read Later or Favorites folders.",cannotCreate:"Cannot create Read Later or Favorites folders.",notCollaborative:"This folder is not collaborative.",notInFolder:"That post is not in this folder.",owner:"You are the owner of this folder",private:"That folder is private.",friends:"Must be friends with this folder's owner"},message:{notAuthor:"You are not the author of this message",missingArgs:"Must provide channelId, groupId, or userId",notSentInChannel:"Message was not sent in a channel",empty:"Message cannot be empty",textOrFile:"Must provide text or a file"},comment:{notAuthor:"You are not the author of this comment",empty:"Comment cannot be empty",alreadyDeleted:"Comment already deleted",alreadyVoted:"You have already voted this comment"},post:{notAuthor:"You are not the author of this post",alreadyVoted:"You have already voted this post",alreadyPinned:"Post is already pinned",notPinned:"Post is not pinned"},group:{maxSize:"Max group size is 10 users",notJoined:"You are not in this group"},server:{notJoined:"You have not joined this planet",banned:"You are banned from this planet",alreadyJoined:"You have already joined this planet",missingPermission:"Missing planet permission {{replace}}",notOwner:"Must be planet owner",inviteRequired:"Invite required to join this planet",inviteExpired:"This invite has expired."},channel:{missingPermission:"Missing channel permission {{replace}}"},user:{blocking:"You are blocking this user",blocked:"This user has blocked you",friendRequestNotSent:"You have not sent a friend request to this user",friendRequestNotReceived:"You have not received a friend request from this user",notFriends:"You are not friends with this user",alreadyBlocking:"You are already blocking this user",notBlocking:"You are not blocking this user"},upload:{invalidMime:"Image must be PNG or JPEG"},login:{invalid:"Invalid login",invalidEmail:"Invalid email address",emailInUse:"Email already in use",illegalName:"Name cannot contain {{replace}}",nameLength:"Name must be 2-32 characters",banned:"Banned{{replace}}",wrongPassword:"Incorrect password",usernameTaken:"Username taken"},notif:{notYours:"This is not your notification"}},Mn={hide:"Hide Folders",show:"Show Folders",favorites:"Favorites",readLater:"Read Later",added:"Added to {{name}}!",name:"Name",postCount:"{{count}} Post",postCount_plural:"{{count}} Posts",createdBy:"Created by",userFolder:"User Folder",serverFolder:"Planet Folder",collaborative:"Collaborative",user:{title:"Your Folders",create:"Create Folder"},server:{title:"{{name}}'s Folders",create:"Create Planet Folder"},context:{follow:"Follow Folder",unfollow:"Unfollow Folder",delete:"Delete Folder",copyLink:"Copy Folder Link",edit:"Edit Folder",collaborative:"Collaborative",changeVisibility:"Change Visibility",visibility:{public:"Public",friends:"Friends Only",private:"Private",unlisted:"Unlisted"}}},Rn={};var An,Ln,On,Dn,Tn,qn,Hn,jn,zn,Bn,_n,Vn,Gn,Yn,Wn,Jn,Qn,Kn,Zn,Xn,er,tr,nr,rr;(Ln=An||(An={})).Private="Private",Ln.Public="Public",Ln.Restricted="Restricted",(Dn=On||(On={})).Blue="Blue",Dn.Green="Green",Dn.Indigo="Indigo",Dn.Pink="Pink",Dn.Purple="Purple",Dn.Red="Red",Dn.Yellow="Yellow",(qn=Tn||(Tn={})).New="New",qn.Top="Top",(jn=Hn||(Hn={})).Friends="Friends",jn.Private="Private",jn.Public="Public",jn.Unlisted="Unlisted",(Bn=zn||(zn={})).FriendRequestReceived="FriendRequestReceived",Bn.Join="Join",Bn.Left="Left",Bn.Normal="Normal",(Vn=_n||(_n={})).Away="Away",Vn.DoNotDisturb="DoNotDisturb",Vn.Offline="Offline",Vn.Online="Online",(Yn=Gn||(Gn={})).Added="Added",Yn.Hot="Hot",Yn.New="New",Yn.Top="Top",(Jn=Wn||(Wn={})).All="All",Jn.Day="Day",Jn.Hour="Hour",Jn.Month="Month",Jn.Week="Week",Jn.Year="Year",(Kn=Qn||(Qn={})).New="New",Kn.Top="Top",(Xn=Zn||(Zn={})).Blocked="Blocked",Xn.Blocking="Blocking",Xn.FriendRequestIncoming="FriendRequestIncoming",Xn.FriendRequestOutgoing="FriendRequestOutgoing",Xn.Friends="Friends",Xn.None="None",(tr=er||(er={})).Arts="Arts",tr.Business="Business",tr.Culture="Culture",tr.Discussion="Discussion",tr.Entertainment="Entertainment",tr.Gaming="Gaming",tr.Health="Health",tr.Hobbies="Hobbies",tr.Lifestyle="Lifestyle",tr.Memes="Memes",tr.Meta="Meta",tr.News="News",tr.Other="Other",tr.Politics="Politics",tr.Programming="Programming",tr.Science="Science",tr.Sports="Sports",tr.Technology="Technology",(rr=nr||(nr={})).AddPostToFolder="AddPostToFolder",rr.Admin="Admin",rr.CreateComment="CreateComment",rr.CreatePost="CreatePost",rr.DisplayRoleSeparately="DisplayRoleSeparately",rr.ManageChannels="ManageChannels",rr.ManageComments="ManageComments",rr.ManageFolders="ManageFolders",rr.ManageMessages="ManageMessages",rr.ManagePosts="ManagePosts",rr.ManageServer="ManageServer",rr.ManageUsers="ManageUsers",rr.Mention="Mention",rr.Mentionable="Mentionable",rr.PrivateChannels="PrivateChannels",rr.RestrictedChannels="RestrictedChannels",rr.SendMessages="SendMessages",rr.VoteComment="VoteComment",rr.VotePost="VotePost";const ar=e`
    fragment Channel on Channel {
  id
  name
  description
  isUnread
  mentionCount
  type
}
    `,lr=e`
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
    `,sr=e`
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
    ${lr}`,or=e`
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
    `,ir=e`
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
}
    `,cr=e`
    fragment RelatedUser on User {
  ...User
  showChat
  unreadCount
  lastMessageAt
}
    ${or}`,mr=e`
    fragment Group on Group {
  id
  name
  displayName
  avatarUrl
  unreadCount
  lastMessageAt
}
    `,dr=e`
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
    `,ur=e`
    fragment CurrentUser on User {
  ...User
  isAdmin
  email
  servers {
    ...Server
    permissions
    channels {
      isUnread
      mentionCount
    }
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
  folders {
    ...Folder
  }
}
    ${or}
${ir}
${cr}
${mr}
${dr}`,pr=e`
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
    ${lr}`,gr=e`
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
    ${lr}`,vr=e`
    fragment Role on Role {
  id
  name
  color
  permissions
}
    `,hr=e`
    fragment ServerUser on ServerUser {
  color
  roles {
    ...Role
  }
  user {
    ...User
  }
}
    ${vr}
${or}`,fr=e`
    fragment Reply on Reply {
  id
  isRead
  comment {
    id
    text
    voteCount
    createdAt
    author {
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
        ...ServerUser
      }
    }
  }
}
    ${hr}`,br=e`
    mutation createChannel($input: CreateChannelInput!) {
  createChannel(input: $input) {
    ...Channel
  }
}
    ${ar}`;e`
    mutation updateChannel($input: UpdateChannelInput!) {
  updateChannel(input: $input) {
    ...Channel
  }
}
    ${ar}`;const xr=e`
    mutation deleteChannel($input: DeleteChannelInput!) {
  deleteChannel(input: $input)
}
    `;e`
    mutation moveChannel($input: MoveChannelInput!) {
  moveChannel(input: $input) {
    ...Channel
  }
}
    ${ar}`;const Er=e`
    mutation readChannel($input: ReadChannelInput!) {
  readChannel(input: $input) {
    ...Channel
  }
}
    ${ar}`;const yr=e`
    mutation createComment($input: CreateCommentInput!) {
  createComment(input: $input) {
    ...Comment
    author {
      ...ServerUser
    }
  }
}
    ${sr}
${hr}`;e`
    mutation updateComment($input: UpdateCommentInput!) {
  updateComment(input: $input) {
    ...Comment
    author {
      ...ServerUser
    }
  }
}
    ${sr}
${hr}`;const wr=e`
    mutation deleteComment($input: DeleteCommentInput!) {
  deleteComment(input: $input) {
    ...Comment
    author {
      ...ServerUser
    }
  }
}
    ${sr}
${hr}`;const Nr=e`
    mutation voteComment($input: VoteCommentInput!) {
  voteComment(input: $input) {
    ...Comment
    author {
      ...ServerUser
    }
  }
}
    ${sr}
${hr}`;const kr=e`
    mutation unvoteComment($input: UnvoteCommentInput!) {
  unvoteComment(input: $input) {
    ...Comment
    author {
      ...ServerUser
    }
  }
}
    ${sr}
${hr}`;const Cr=e`
    mutation pinComment($input: PinCommentInput!) {
  pinComment(input: $input) {
    ...Comment
    author {
      ...ServerUser
    }
  }
}
    ${sr}
${hr}`;const $r=e`
    mutation unpinComment($input: UnpinCommentInput!) {
  unpinComment(input: $input) {
    ...Comment
    author {
      ...ServerUser
    }
  }
}
    ${sr}
${hr}`;const Ir=e`
    mutation createFolder($input: CreateFolderInput!) {
  createFolder(input: $input) {
    ...Folder
  }
}
    ${dr}`;const Sr=e`
    mutation updateFolder($input: UpdateFolderInput!) {
  updateFolder(input: $input) {
    ...Folder
  }
}
    ${dr}`;function Ur(e){const t={...Rn,...e};return n(Sr,t)}const Fr=e`
    mutation deleteFolder($input: DeleteFolderInput!) {
  deleteFolder(input: $input)
}
    `;e`
    mutation moveServerFolder($input: MoveServerFolderInput!) {
  moveServerFolder(input: $input) {
    ...Folder
  }
}
    ${dr}`,e`
    mutation moveUserFolder($input: MoveUserFolderInput!) {
  moveUserFolder(input: $input) {
    ...Folder
  }
}
    ${dr}`;const Pr=e`
    mutation followFolder($input: FollowFolderInput!) {
  followFolder(input: $input) {
    ...Folder
  }
}
    ${dr}`;const Mr=e`
    mutation unfollowFolder($input: UnfollowFolderInput!) {
  unfollowFolder(input: $input) {
    ...Folder
  }
}
    ${dr}`;const Rr=e`
    mutation addPostToFolder($input: AddPostToFolderInput!) {
  addPostToFolder(input: $input) {
    ...Folder
  }
}
    ${dr}`;function Ar(e){const t={...Rn,...e};return n(Rr,t)}const Lr=e`
    mutation removePostFromFolder($input: RemovePostFromFolderInput!) {
  removePostFromFolder(input: $input) {
    ...Folder
  }
}
    ${dr}`;e`
    mutation createGroup($input: CreateGroupInput!) {
  createGroup(input: $input) {
    ...Group
  }
}
    ${mr}`,e`
    mutation updateGroup($input: UpdateGroupInput!) {
  updateGroup(input: $input) {
    ...Group
  }
}
    ${mr}`,e`
    mutation leaveGroup($input: LeaveGroupInput!) {
  leaveGroup(input: $input)
}
    `;const Or=e`
    mutation readGroup($input: ReadGroupInput!) {
  readGroup(input: $input) {
    ...Group
  }
}
    ${mr}`;e`
    mutation addUserToGroup($input: AddUserToGroupInput!) {
  addUserToGroup(input: $input) {
    ...Group
  }
}
    ${mr}`,e`
    mutation removeUserFromGroup($input: RemoveUserFromGroupInput!) {
  removeUserFromGroup(input: $input) {
    ...Group
  }
}
    ${mr}`;const Dr=e`
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
    ${pr}
${or}
${hr}`;function Tr(e){const t={...Rn,...e};return n(Dr,t)}e`
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
    ${pr}
${or}
${hr}`;const qr=e`
    mutation deleteMessage($input: DeleteMessageInput!) {
  deleteMessage(input: $input)
}
    `;const Hr=e`
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
    ${pr}
${or}
${hr}`;function jr(e){const t={...Rn,...e};return n(Hr,t)}const zr=e`
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
    ${pr}
${or}
${hr}`;function Br(e){const t={...Rn,...e};return n(zr,t)}const _r=e`
    mutation updateTyping($input: TypingInput!) {
  updateTyping(input: $input)
}
    `;const Vr=e`
    mutation createPost($input: CreatePostInput!) {
  createPost(input: $input) {
    ...Post
    author {
      ...ServerUser
    }
  }
}
    ${gr}
${hr}`;e`
    mutation updatePost($input: UpdatePostInput!) {
  updatePost(input: $input) {
    ...Post
    author {
      ...ServerUser
    }
  }
}
    ${gr}
${hr}`;const Gr=e`
    mutation deletePost($input: DeletePostInput!) {
  deletePost(input: $input) {
    ...Post
    author {
      ...ServerUser
    }
  }
}
    ${gr}
${hr}`;const Yr=e`
    mutation votePost($input: VotePostInput!) {
  votePost(input: $input) {
    ...Post
    author {
      ...ServerUser
    }
  }
}
    ${gr}
${hr}`;const Wr=e`
    mutation unvotePost($input: UnvotePostInput!) {
  unvotePost(input: $input) {
    ...Post
    author {
      ...ServerUser
    }
  }
}
    ${gr}
${hr}`;const Jr=e`
    mutation pinPost($input: PinPostInput!) {
  pinPost(input: $input) {
    ...Post
    author {
      ...ServerUser
    }
  }
}
    ${gr}
${hr}`;const Qr=e`
    mutation unpinPost($input: UnpinPostInput!) {
  unpinPost(input: $input) {
    ...Post
    author {
      ...ServerUser
    }
  }
}
    ${gr}
${hr}`;const Kr=e`
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
    ${or}
${dr}`;function Zr(e){const t={...Rn,...e};return n(Kr,t)}const Xr=e`
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
    ${or}
${dr}`;function ea(e){const t={...Rn,...e};return n(Xr,t)}const ta=e`
    mutation answerFriendRequest($input: AnswerFriendRequestInput!) {
  answerFriendRequest(input: $input) {
    ...RelatedUser
  }
}
    ${cr}`;function na(e){const t={...Rn,...e};return n(ta,t)}const ra=e`
    mutation blockUser($input: BlockUserInput!) {
  blockUser(input: $input) {
    ...RelatedUser
  }
}
    ${cr}`;const aa=e`
    mutation unblockUser($input: UnblockUserInput!) {
  unblockUser(input: $input) {
    ...RelatedUser
  }
}
    ${cr}`;const la=e`
    mutation removeFriend($input: RemoveFriendInput!) {
  removeFriend(input: $input) {
    ...RelatedUser
  }
}
    ${cr}`;function sa(e){const t={...Rn,...e};return n(la,t)}const oa=e`
    mutation readDm($input: ReadDmInput!) {
  readDm(input: $input) {
    ...RelatedUser
  }
}
    ${cr}`;function ia(e){const t={...Rn,...e};return n(oa,t)}const ca=e`
    mutation openDm($input: OpenDmInput!) {
  openDm(input: $input) {
    ...RelatedUser
  }
}
    ${cr}`;const ma=e`
    mutation closeDm($input: CloseDmInput!) {
  closeDm(input: $input) {
    ...RelatedUser
  }
}
    ${cr}`;function da(e){const t={...Rn,...e};return n(ma,t)}const ua=e`
    mutation markReplyRead($input: MarkReplyReadInput!) {
  markReplyRead(input: $input) {
    ...Reply
  }
}
    ${fr}`;e`
    mutation markReplyUnread($input: MarkReplyUnreadInput!) {
  markReplyUnread(input: $input) {
    ...Reply
  }
}
    ${fr}`,e`
    mutation createRole($input: CreateRoleInput!) {
  createRole(input: $input) {
    ...Role
  }
}
    ${vr}`,e`
    mutation updateRole($input: UpdateRoleInput!) {
  updateRole(input: $input) {
    ...Role
  }
}
    ${vr}`,e`
    mutation deleteRole($input: DeleteRoleInput!) {
  deleteRole(input: $input)
}
    `,e`
    mutation moveRole($input: MoveRoleInput!) {
  moveRole(input: $input) {
    ...Role
  }
}
    ${vr}`,e`
    mutation addUserToRole($input: AddUserToRoleInput!) {
  addUserToRole(input: $input) {
    ...ServerUser
  }
}
    ${hr}`,e`
    mutation removeUserFromRole($input: RemoveUserFromRoleInput!) {
  removeUserFromRole(input: $input) {
    ...ServerUser
  }
}
    ${hr}`;const pa=e`
    mutation createServer($input: CreateServerInput!) {
  createServer(input: $input) {
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
    ${ir}
${ar}
${vr}
${dr}`;const ga=e`
    mutation updateServer($input: UpdateServerInput!) {
  updateServer(input: $input) {
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
    ${ir}
${ar}
${vr}
${dr}`;const va=e`
    mutation deleteServer($input: DeleteServerInput!) {
  deleteServer(input: $input)
}
    `;e`
    mutation moveServer($input: MoveServerInput!) {
  moveServer(input: $input)
}
    `;const ha=e`
    mutation joinServer($input: JoinServerInput!) {
  joinServer(input: $input) {
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
    ${ir}
${ar}
${vr}
${dr}`;const fa=e`
    mutation leaveServer($input: LeaveServerInput!) {
  leaveServer(input: $input)
}
    `;e`
    mutation readServer($input: ReadServerInput!) {
  readServer(input: $input) {
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
    ${ar}
${vr}
${dr}`;const ba=e`
    mutation banUserFromServer($input: BanUserFromServerInput!) {
  banUserFromServer(input: $input)
}
    `;e`
    mutation unbanUserFromServer($input: UnbanUserFromServerInput!) {
  unbanUserFromServer(input: $input)
}
    `;const xa=e`
    mutation kickUserFromServer($input: KickUserFromServerInput!) {
  kickUserFromServer(input: $input)
}
    `;const Ea=e`
    mutation createAccount($input: CreateAccountInput!) {
  createAccount(input: $input) {
    accessToken
    user {
      ...CurrentUser
    }
  }
}
    ${ur}`;const ya=e`
    mutation changePassword($input: ChangePasswordInput!) {
  changePassword(input: $input) {
    ...CurrentUser
  }
}
    ${ur}`;const wa=e`
    mutation changeUserAvatar($input: ChangeUserAvatarInput!) {
  changeUserAvatar(input: $input) {
    ...CurrentUser
  }
}
    ${ur}`;const Na=e`
    mutation deleteAccount($input: DeleteAccountInput!) {
  deleteAccount(input: $input)
}
    `;const ka=e`
    mutation login($input: LoginInput!) {
  login(input: $input) {
    accessToken
    user {
      ...CurrentUser
    }
  }
}
    ${ur}`;const Ca=e`
    mutation changeOnlineStatus($input: ChangeOnlineStatusInput!) {
  changeOnlineStatus(input: $input) {
    ...CurrentUser
  }
}
    ${ur}`;e`
    mutation globalBan($input: GlobalBanInput!) {
  globalBan(input: $input)
}
    `;const $a=e`
    query comments($postId: ID!, $sort: CommentsSort) {
  comments(postId: $postId, sort: $sort) {
    ...Comment
    author {
      ...ServerUser
    }
  }
}
    ${sr}
${hr}`;const Ia=e`
    query currentUser @live {
  user {
    ...CurrentUser
  }
}
    ${ur}`;const Sa=e`
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
    ${dr}
${or}
${ir}`;const Ua=e`
    query getLinkMeta($linkUrl: String!) {
  getLinkMeta(linkUrl: $linkUrl) {
    ...Metadata
  }
}
    ${lr}`;const Fa=e`
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
    ${pr}
${or}
${hr}`;const Pa=e`
    query post($id: ID!) {
  post(id: $id) {
    ...Post
    author {
      ...ServerUser
    }
    server {
      ...Server
      permissions
    }
  }
}
    ${gr}
${hr}
${ir}`;const Ma=e`
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
        ...ServerUser
      }
      server {
        ...Server
      }
    }
  }
}
    ${gr}
${hr}
${ir}`;const Ra=e`
    query publicServers($sort: PublicServersSort, $category: ServerCategory, $featured: Boolean) {
  publicServers(sort: $sort, category: $category, featured: $featured) {
    ...Server
    onlineCount
  }
}
    ${ir}`;function Aa(e){const n={...Rn,...e};return t(Ra,n)}const La=e`
    query replies($input: RepliesInput!) {
  replies(input: $input) {
    ...Reply
  }
}
    ${fr}`;function Oa(e){const n={...Rn,...e};return t(La,n)}const Da=e`
    query server($id: ID, $name: String) @live {
  server(id: $id, name: $name) {
    ...Server
    permissions
    channels {
      ...Channel
    }
    folders {
      ...Folder
      owner {
        id
        username
      }
      server {
        id
        name
        avatarUrl
      }
    }
    roles {
      ...Role
    }
  }
}
    ${ir}
${ar}
${dr}
${vr}`;const Ta=e`
    query serverUsers($serverId: ID!) @live {
  serverUsers(serverId: $serverId) {
    ...ServerUser
  }
}
    ${hr}`;const qa=e`
    query user($id: ID) @live {
  user(id: $id) {
    ...RelatedUser
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
    ${cr}
${dr}
${or}`;function Ha(e){const n={...Rn,...e};return t(qa,n)}e`
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
    ${sr}`,e`
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
    ${pr}
${or}
${hr}`,e`
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
    ${gr}`,e`
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
    ${fr}`;const ja=e`
    subscription typingUpdated($userId: ID, $groupId: ID, $channelId: ID) {
  typingUpdated(userId: $userId, groupId: $groupId, channelId: $channelId) {
    typingUserId
    isTyping
  }
}
    `;const za={en:{translation:{home:"Home",copyId:"Copy ID",markRead:"Mark As Read",continue:"Continue",more:"More",updateAvailable:"Update Available!",auth:{login:"Login",createAccount:"Create an Account",welcomeBack:"Welcome Back!",name:"Name",password:"Password",email:"Email",alreadyHaveAccount:"Already have an account?",register:"Register",needAccount:"Need an account?"},category:{Featured:"Featured",Arts:"Arts",Business:"Business",Culture:"Culture",Discussion:"Discussion",Entertainment:"Entertainment",Gaming:"Gaming",Health:"Health",Hobbies:"Hobbies",Lifestyle:"Lifestyle",Memes:"Memes",Meta:"Meta",News:"News",Politics:"Politics",Programming:"Programming",Science:"Science",Sports:"Sports",Technology:"Technology",Other:"Other"},channel:{title:"Channels",togglePrivate:"Private Channel",hideUsers:"Hide Users",showUsers:"Show Users",create:"Create Channel",edit:"Edit Channel",context:{markRead:"Mark As Read",delete:"Delete Channel",edit:"Edit Channel",mute:"Mute Channel"}},comment:{noPermission:"You do not have permission to view comments.",reply:"Reply",cancelReply:"Cancel Reply",hideReplies:"Hide Replies",showReplies:"Show Replies",create:{submit:"Comment",cancel:"Cancel"},context:{copyLink:"Copy Comment Link",delete:"Delete Comment",reply:"Reply",vote:"Add Rocket",unvote:"Remove Rocket",votePermission:"This planet does not allow you to rocket comments.",pin:"Pin Comment",unpin:"Unpin Comment",edit:"Edit Comment"}},dm:{title:"Direct Messages",create:"Create DM",markRead:"Mark Read",shared:"Shared with {{user.name}}!"},error:Pn,explore:{title:"Explore",categories:"Categories",all:"All"},folder:Mn,inbox:{title:"Inbox",tab:{all:"All",unread:"Unread"}},infinity:{comingSoon:"Comet Infinity is coming soon!",title:"Infinity"},message:{message:"Message",pinned:"Pinned Messages",upload:"Upload a File",typing:{one:"{{name}} is typing...",two:"{{name1}} and {{name2}} are typing...",three:"{{name1}}, {{name2}}, and {{name3}} are typing...",several:"Several people are typing..."},context:{copyLink:"Copy Message Link",pin:"Pin Message",unpin:"Unpin Message",edit:"Edit Message",delete:"Delete Message"}},permissions:{server:{[nr.ManageChannels]:{title:"Manage Channels",description:"Allows members to create, edit, or delete channels."},[nr.ManageServer]:{title:"Manage Roles",description:"Allows members to create new roles and edit or delete roles lower than their highest role. Also allows members to change permissions of individual channels that they have access to."},[nr.ManageServer]:{title:"Manage Planet",description:"Allows members to change this planet's name, description, icon, and banner image."},[nr.SendMessages]:{title:"Send Messages",description:"Allows members to send messages in text channels."},[nr.Mention]:{title:"Mention @everyone, @here, and All Roles",description:'Allows members to use @everyone (everyone in the planet) or @here (only online members in that channel). They can also @mention all roles, even if the role\'s "Allow anyone to mention this role" permission is disabled.'},[nr.ManageMessages]:{title:"Manage Messages",description:"Allows members to remove messages by other members or pin any message."},[nr.CreatePost]:{title:"Create Posts",description:"Allows members to create posts."},[nr.VotePost]:{title:"Vote on Posts",description:"Allows members to vote on posts."},[nr.ManagePosts]:{title:"Manage Posts",description:"Allows members to pin and remove posts."},[nr.CreateComment]:{title:"Create Comments",description:"Allows members to create comments."},[nr.VoteComment]:{title:"Vote on Comments",description:"Allows members to vote on comments."},[nr.ManageComments]:{title:"Manage Comments",description:"Allows members to pin and remove comments."},[nr.ManageFolders]:{title:"Manage Folders",description:"Allows members to create, delete, and edit folders."},[nr.AddPostToFolder]:{title:"Add Posts to Folders",description:"Allows members to add and remove posts from folders."},[nr.DisplayRoleSeparately]:{title:"Display role members separately from online members",description:""},[nr.Mentionable]:{title:"Allow anyone to @mention this role",description:'Note: Members with the "Mention @everyone, @here, and All Roles" permission will always be able to ping this role.'},[nr.Admin]:{title:"Administrator",description:"Members with this permission will have every permission and will also bypass all channel specific permissions or restrictions (for example, these members would get access to all private channels). **This is a dangerous permission to grant**."},[nr.ManageUsers]:{title:"Manage Users",description:"Ban and kick users"},[nr.ViewChannels]:{title:"View Channels",description:"View channels"}}},post:{createPost:"Create a post",create:{submit:"Post",cancel:"Cancel"},type:{text:"Text Post",link:"Link Post",image:"Image Post",album:"Image Album"},createComment:"Write a comment",commentCount:"{{count}} Comment",commentCount_plural:"{{count}} Comments",participantCount:"{{count}} Participant",participantCount_plural:"{{count}} Participants",creator:"Creator",context:{pin:"Pin Post",pinned:"Post pinned!",unpin:"Unpin Post",unpinned:"Post unpinned!",removeFromFolder:"Remove from Folder",addToUserFolder:"Add to Folder",addToServerFolder:"Add to Planet Folder",edit:"Edit Post",delete:"Delete Post",deleted:"Post deleted!",copyLink:"Copy Post Link",sendToFriend:"Send to Friend",vote:"Add Rocket",unvote:"Remove Rocket",votePermission:"This planet does not allow you to rocket posts."},hideParticipants:"Hide Participants",showParticipants:"Show Participants",pinnedTo:"Pinned to {{server.name}}",expand:"Show Details",collapse:"Hide Details",feed:{title:"Your Feed",refresh:"Refresh Posts",sort:{hot:"Hot",top:"Top",new:"New"},time:{hour:"Hour",day:"Day",week:"Week",month:"Month",year:"Year",all:"All"},liveMode:{title:"Live Mode",description:"Automatically add new posts to feed",comingSoon:"Live Mode is coming soon!"},subscriptions:{show:"Show Subscriptions",hide:"Hide Subscriptions",comingSoon:"Planet subscriptions are coming soon!"}}},search:{comingSoon:"Search is coming soon!"},server:{loading:"Loading planet...",feed:"Feed",invitePeople:"Invite People",onlineCount:"{{count}} online",memberCount:"{{count}} member",memberCount_plural:"{{count}} members",context:{markRead:"Mark As Read",mute:"Mute Planet",invite:"Invite People",leave:"Leave Planet"},create:{title:"Create Planet",name:"Planet Name",upload:"Upload",requireInvite:"Require Invite to Join"}},settings:{title:"Settings"},user:{hideUsers:"Hide Users",showUsers:"Show Users",context:{viewProfile:"Profile",closeDm:"Close DM",block:"Block",unblock:"Unblock",addFriend:"Add Friend",removeFriend:"Remove Friend",sendMessage:"Send Message",message:"Message",kickUser:"Kick {{user.name}}",banUser:"Ban {{user.name}}",banPrompt:"Reason (Optional)",ignore:"Ignore",accept:"Accept",revoke:"Revoke Friend Request",sendFriendRequest:"Send Friend Request",blockingYou:"Blocking You",markRead:"Mark as Read"},profile:{sentFriendRequest:"Request Sent",receivedFriendRequest:"Accept Request",mutualServers:"Mutual Planets",mutualFriends:"Mutual Friends",sendMessage:"Send Message"},offline:"Offline",online:"Online",friends:{title:"Friends",sendMessage:"Message",revokeRequest:"Cancel",acceptRequest:"Accept",rejectRequest:"Ignore",tab:{online:"Online",all:"All",pending:"Pending",blocked:"Blocked",add:"Add Friend"}}}}}};a.use(l).use(s).init({resources:za,fallbackLng:"en",debug:!1,load:"languageOnly",interpolation:{escapeValue:!1}});function Ba({className:e}){return o.createElement("svg",{className:e,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor"},o.createElement("path",{fillRule:"evenodd",d:"M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z",clipRule:"evenodd"}))}function _a({className:e}){return o.createElement("svg",{className:e,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor"},o.createElement("path",{d:"M13 7H7v6h6V7z"}),o.createElement("path",{fillRule:"evenodd",d:"M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z",clipRule:"evenodd"}))}function Va({className:e}){return o.createElement("svg",{className:e,viewBox:"0 0 24 24"},o.createElement("path",{fill:"currentColor",d:"M17 14H19V17H22V19H19V22H17V19H14V17H17V14M20 12C20 8.64 17.93 5.77 15 4.59V5C15 6.1 14.1 7 13 7H11V9C11 9.55 10.55 10 10 10H8V12H14C14.5 12 14.9 12.35 15 12.81C13.2 13.85 12 15.79 12 18C12 19.5 12.54 20.85 13.44 21.9L12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12L21.9 13.44C21.34 12.96 20.7 12.59 20 12.34L20 12M11 19.93V18C9.9 18 9 17.1 9 16V15L4.21 10.21C4.08 10.78 4 11.38 4 12C4 16.08 7.06 19.44 11 19.93Z"}))}function Ga({className:e="h-5 w-5 text-primary"}){return o.createElement("svg",{className:`animate-spin ${e}`,xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24"},o.createElement("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),o.createElement("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"}))}function Ya({className:e}){return o.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:e,viewBox:"0 0 20 20",fill:"currentColor"},o.createElement("path",{d:"M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"}),o.createElement("path",{d:"M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"}))}function Wa({className:e}){const[t]=i.exports.useState((new Date).getTime().toString());return o.createElement("svg",{className:e,fill:"currentColor",viewBox:"0 0 30.327 5.0518"},o.createElement("defs",null,o.createElement("linearGradient",{id:t,x1:"7.7677",x2:"14.802",y1:"5.3857",y2:"5.3857",gradientTransform:"translate(1.0113e-4,1.6184e-4)",gradientUnits:"userSpaceOnUse"},o.createElement("stop",{stopColor:"#6875f5",offset:"0"}),o.createElement("stop",{stopColor:"#f98080",offset:"1"}))),o.createElement("g",{transform:"translate(-56.423 -63.81)",strokeWidth:".26458"},o.createElement("path",{d:"m61.235 68.093q-0.18344 0.16933-0.50094 0.34572t-0.72672 0.30339q-0.40922 0.11994-0.87489 0.11994-0.5715 0-1.0654-0.17639-0.49389-0.18344-0.86783-0.51506-0.36689-0.33161-0.5715-0.79728-0.20461-0.47272-0.20461-1.0513 0-0.54328 0.21167-1.0019 0.21872-0.45861 0.59972-0.79728t0.87489-0.52211q0.49389-0.1905 1.0442-0.1905 0.45156 0 0.86783 0.127 0.41628 0.11994 0.74083 0.31044 0.33161 0.1905 0.52917 0.39511l-0.47272 0.61383q-0.34572-0.30339-0.76906-0.49389-0.42333-0.19756-0.9525-0.19756-0.35983 0-0.6985 0.11994t-0.61383 0.35278q-0.26811 0.22578-0.43039 0.55033-0.15522 0.32456-0.15522 0.73378 0 0.59267 0.28222 0.99483 0.28222 0.39511 0.74083 0.59972 0.46567 0.19756 0.98778 0.19756 0.381 0 0.68439-0.09878 0.30339-0.10583 0.54328-0.254t0.43039-0.29633z"}),o.createElement("path",{d:"m70.164 63.853 1.9826 2.6317 1.9826-2.6317h0.73378v4.9389h-0.762v-2.0743q0-0.45861 0.01411-0.86783 0.02117-0.40922 0.0635-0.81844l-1.8062 2.3424h-0.46567l-1.8062-2.3354q0.04939 0.40217 0.0635 0.81139t0.01411 0.86783v2.0743h-0.762v-4.9389z"}),o.createElement("path",{d:"m77.106 63.853h3.8241v0.73378h-3.0621v1.3053h2.6741v0.73378h-2.6741v1.4323h3.0621v0.73378h-3.8241z"}),o.createElement("path",{d:"m84.203 68.792v-4.2051h-1.7357v-0.73378h4.2827v0.73378h-1.7851v4.2051z"})),o.createElement("path",{transform:"rotate(32 15.881 -1.0183)",fillRule:"evenodd",d:"m11.03 3.2283a2.4814 2.526 7.3662e-7 0 0-0.30277 0.22149 1.9313 1.966 7.3662e-7 0 1 1.5991 1.936 1.9313 1.966 7.3662e-7 0 1-1.5988 1.9369 2.4814 2.526 7.3662e-7 0 0 1.5929 0.589 2.4814 2.526 7.3662e-7 0 0 2.4814-2.5255 2.4814 2.526 7.3662e-7 0 0-2.4815-2.526 2.4814 2.526 7.3662e-7 0 0-1.2903 0.36814zm-3.2345 2.2039c-0.18296 0.086815 0.49439 0.074836 3.0594 0.9212 0.46608 0.15383 0.88156-0.43345 0.88156-0.96766s-0.41546-1.1208-0.88154-0.96706l-2.9313 0.96698c-0.058262 0.019224-0.10199 0.034146-0.12813 0.046548z",fill:`url(#${t})`}))}var Ja="_meteor-1_eecxl_1",Qa="_meteor-2_eecxl_24",Ka="_meteor-3_eecxl_47",Za="_meteor-4_eecxl_70",Xa="_meteor-5_eecxl_93",el="_meteor-6_eecxl_116",tl="_meteor-7_eecxl_139";function nl(){return o.createElement(o.Fragment,null,o.createElement("div",{className:Ja}),o.createElement("div",{className:Qa}),o.createElement("div",{className:Ka}),o.createElement("div",{className:Za}),o.createElement("div",{className:Xa}),o.createElement("div",{className:el}),o.createElement("div",{className:tl}))}function rl(){let e=window.navigator.userAgent,t=window.navigator.platform,n=null;return-1!==["Macintosh","MacIntel","MacPPC","Mac68K"].indexOf(t)?n="Mac OS":-1!==["iPhone","iPad","iPod"].indexOf(t)?n="iOS":-1!==["Win32","Win64","Windows","WinCE"].indexOf(t)?n="Windows":/Android/.test(e)?n="Android":/Linux/.test(t)&&(n="Linux"),n}function al({children:e,header:t,rightSidebar:n,leftSidebar:r}){return o.createElement("div",{className:"flex flex-col flex-grow"},t,o.createElement("div",{className:"flex h-full",style:{maxHeight:t?"calc(100% - 3rem)":"100%"}},r,o.createElement("div",{className:"flex flex-col flex-grow"},e),n))}let ll=!1,sl=()=>{ll=!0};const ol={status:"connecting"};const il=()=>{const{data:e,loading:n}=function(e){const n={...Rn,...e};return t(Ia,n)}(),r=null==e?void 0:e.user;return i.exports.useEffect((()=>{r?h({id:r.id,email:r.email,username:r.username}):f((e=>e.setUser(null)))}),[r]),[r,(n||"connected"!==ol.status)&&!r]};var cl=i.exports.memo((function({children:e="You have reached the end!",className:t="h-48"}){return o.createElement("div",{className:"flex flex-col items-center justify-center text-primary pt-6"},o.createElement("img",{alt:"astronaut",src:"/astronaut.png",className:`object-contain opacity-50 animate-float select-none pointer-events-none ${t}`}),o.createElement("div",{className:"text-tertiary pt-3 text-lg font-semibold"},e))}));function ml(){return il(),o.createElement("div",{className:"relative h-full w-full dark:bg-gray-750 flex flex-col items-center justify-center p-6 text-center"},o.createElement("div",{className:"text-center space-y-3"},o.createElement(cl,null,"This page does not exist.",o.createElement(b,{to:"/",className:"block text-lg pt-3 text-accent font-medium cursor-pointer hover:underline"},"Return home"))))}var dl=i.exports.forwardRef((({avatarUrl:e,children:t,loading:n="eager",className:r="",size:a=12,style:l={}},s)=>o.createElement("div",{ref:s,className:`relative flex-shrink-0 flex items-center justify-center bg-cover bg-center ${r}`,style:{width:a/4+"rem",height:a/4+"rem",backgroundImage:e?`url(${e})`:void 0,...l}},t)));const ul={gray:x.gray,red:x.red,yellow:x.amber,green:x.emerald,blue:x.blue,indigo:x.indigo,purple:x.violet,pink:x.pink},pl={transparent:"transparent",current:"currentColor",black:x.black,white:x.white,...ul},gl={Red:pl.red[500],Yellow:pl.yellow[500],Green:pl.green[500],Blue:pl.blue[500],Indigo:pl.indigo[500],Purple:pl.purple[500],Pink:pl.pink[500]};var vl=i.exports.forwardRef((({user:e,loading:t="eager",size:n=12,showOnline:r=!1,className:a="",dotClassName:l=""},s)=>o.createElement(dl,{ref:s,avatarUrl:null==e?void 0:e.avatarUrl,loading:t,className:`${a} cursor-pointer rounded-full`,size:n,style:(null==e?void 0:e.avatarUrl)?{}:{backgroundColor:gl[null==e?void 0:e.color]}},r&&o.createElement("div",{className:`absolute bottom-0 right-0 rounded-full z-10 ${l} ${(null==e?void 0:e.isOnline)?"bg-green-500":"bg-gray-600"}`}),!(null==e?void 0:e.avatarUrl)&&o.createElement(E,{className:"text-primary w-2/3 h-2/3"}))));function hl({children:e,right:t=!1,show:n=!0}){return o.createElement("div",{className:`${n?"block":"hidden"} w-60 min-w-[15rem] bg-gray-200 dark:bg-gray-800 ${t?"":"rounded-tl-lg"}`},o.createElement("div",{className:"relative h-full w-full scrollbar-dark"},e))}const fl=y(((e,t)=>({friendsPage:"Online",setFriendsPage:t=>e({friendsPage:t}),inboxPage:"Unread",setInboxPage:t=>e({inboxPage:t}),postsSort:"Hot",setPostsSort:t=>e({postsSort:t}),postsTime:"Day",setPostsTime:t=>e({postsTime:t}),commentsSort:"Top",setCommentsSort:t=>e({commentsSort:t}),liveMode:!1,setLiveMode:t=>e({liveMode:t}),showFolders:!0,setShowFolders:t=>e({showFolders:t}),showUsers:!0,setShowUsers:t=>e({showUsers:t}),serverPages:{},setServerPage:(n,r)=>e({serverPages:{...t().serverPages,[n]:r}}),homePage:null,setHomePage:t=>e({homePage:t}),replyingCommentId:null,setReplyingCommentId:t=>e({replyingCommentId:t}),canGoBack:!1,setCanGoBack:t=>e({canGoBack:t}),exploreSort:"Top",setExploreSort:t=>e({exploreSort:t}),exploreCategory:null,setExploreCategory:t=>e({exploreCategory:t}),dialogUserId:null,setDialogUserId:t=>e({dialogUserId:t,userDialogOpen:!!t}),userDialogOpen:!1,setUserDialogOpen:t=>e({userDialogOpen:t}),folderSort:"Added",setFolderSort:t=>e({folderSort:t}),updateAvailable:!1,setUpdateAvailable:t=>e({updateAvailable:t}),loginDialog:!1,setLoginDialog:t=>e({loginDialog:t}),createAccount:!1,setCreateAccount:t=>e({createAccount:t})}))),bl="Post",xl=(e,t,n)=>N(`\n  ${e&&"h-11"}\n  ${t&&"h-9"}\n  ${!e&&!t&&"h-9"}\n  group\n  rounded\n  cursor-pointer\n  flex\n  items-center\n  text-base\n  font-medium\n  px-4\n  w-full\n  ${n?"dark:hover:bg-gray-725 dark:active:bg-gray-725":"dark:hover:bg-gray-775 dark:active:bg-gray-775"}\n  text-gray-600\n  dark:text-gray-400\n  select-none\n  focus:outline-none\n  relative\n  hover:text-gray-700\n  dark:hover:text-gray-300\n`),El=e=>N(`\n  text-gray-800\n  hover:text-gray-800\n  dark:text-gray-200\n  dark:hover:text-gray-200\n  ${e?"dark:bg-gray-700 dark:hover:bg-gray-700":"dark:bg-gray-750 dark:hover:bg-gray-750"}\n`);var yl=i.exports.forwardRef((({children:e,large:t=!1,small:n=!1,to:r,onClick:a,active:l,exact:s=!1,light:i=!1},c)=>r?o.createElement(w,{ref:c,to:r,className:`${xl(t,n,i)} ${l?El(i):""}`,activeClassName:null!=l?"":El(i),exact:s},e):o.createElement("button",{ref:c,onClick:a,className:`${xl(t,n,i)} ${l?El(i):""}`},e)));const wl=({server:e,permissions:t})=>i.exports.useMemo((()=>e?t.map((t=>{var n;return[...null!=(n=null==e?void 0:e.permissions)?n:[]].includes(t)})):t.map((e=>!1))),[t,e]),Nl=0,kl=2,Cl={disable:!1,holdToDisplay:1e3,posX:0,posY:0,mouseButton:kl,disableIfShiftIsPressed:!1,collect(){}};function $l(e,t){return t=>{const n=Object.assign({},Cl,t);i.exports.useRef(!1),i.exports.useRef(),i.exports.useRef();const r=t=>{t.ctrlKey||(t.preventDefault(),t.stopPropagation(),e(((e,t)=>["X","Y"].map((n=>(e[`client${n}`]||e.touches&&e.touches[0][`page${n}`])-t[`pos${n}`])))(t,n),{...n.collect(),href:t.target.href}))};return[{onContextMenu:e=>{e.button===n.mouseButton&&r(e)},onClick:e=>{e.button===n.mouseButton&&r(e)}}]}}const Il=27,Sl=13,Ul=38,Fl=40,Pl={position:"fixed",opacity:0,pointerEvents:"none"},Ml=e=>e.focus(),Rl=({rtl:e,handleElementSelect:t=Ml}={})=>{const n=i.exports.useRef(),r=i.exports.useRef([]),[a,l]=i.exports.useState(Pl),[s,o]=i.exports.useState(-1),[c,m]=i.exports.useState(!1),[d,u]=i.exports.useState([0,0]),[p,g]=i.exports.useState(),v=i.exports.useCallback((()=>m(!1)),[m]);i.exports.useCallback((()=>{c&&m(!1)}),[c,m]);const h=i.exports.useCallback(((e,t)=>{m(!0),u(e),g(t)}),[m,g]);i.exports.useEffect((()=>{const e=e=>{n.current.contains(e.target)||(o(-1),v())},a=e=>{switch(e.keyCode){case Il:e.preventDefault(),v();break;case Ul:e.preventDefault(),s>0&&(o((e=>e-1)),t(r.current[s-1]));break;case Fl:e.preventDefault(),s+1<r.current.length&&(o((e=>e+1)),t(r.current[s+1]));break;case Sl:-1!==s&&r.current[s].click(),v()}};return c&&(document.addEventListener("mousedown",e),document.addEventListener("touchstart",e),document.addEventListener("scroll",v),document.addEventListener("contextmenu",v),document.addEventListener("keydown",a)),()=>{document.removeEventListener("mousedown",e),document.removeEventListener("touchstart",e),document.removeEventListener("scroll",v),document.removeEventListener("contextmenu",v),document.removeEventListener("keydown",a)}}),[n,v,s,o,r,t,c]),i.exports.useLayoutEffect((()=>{if(c){const t=n.current.getBoundingClientRect(),{top:r,left:a}=e?((e,[t,n])=>{const r={top:n,left:t},{innerWidth:a,innerHeight:l}=window;return r.left=t-e.width,n+e.height>l&&(r.top-=e.height),r.left<0&&(r.left+=e.width),r.top<0&&(r.top=e.height<l?(l-e.height)/2:0),r.left+e.width>a&&(r.left=e.width<a?(a-e.width)/2:0),r})(t,d):((e,[t,n])=>{const r={top:n,left:t},{innerWidth:a,innerHeight:l}=window;return n+e.height>l&&(r.top-=e.height),t+e.width>a&&(r.left-=e.width),r.top<0&&(r.top=e.height<l?(l-e.height)/2:0),r.left<0&&(r.left=e.width<a?(a-e.width)/2:0),r})(t,d);l((e=>({...e,top:`${r}px`,left:`${a}px`,opacity:1,pointerEvents:"auto"})))}else l(Pl)}),[n,c,d]);return[{style:a,ref:n,role:"menu",tabIndex:-1},{ref:e=>r.current=null===e?[]:[...r.current,e],role:"menuitem",tabIndex:-1},$l(h),{data:p,isVisible:c,setVisible:m,coords:d,setCoords:u}]},Al=e=>N(`\n  active:text-white\n  dark:active:text-white\n  dark:hover:text-white\n  dark:focus:text-white\n  hover:text-white\n  select-none\n  cursor-pointer\n  w-full\n  px-2\n  h-8\n  flex\n  items-center\n  text-13\n  rounded-sm\n  font-medium\n  focus:outline-none\n  group\n  relative\n  ${e?"text-red-500 active:bg-red-600 hover:bg-red-500 focus:bg-red-500":"text-gray-600 dark:text-gray-400 active:bg-green-700 focus:bg-green-600 hover:bg-green-600"} \n`);function Ll({item:{bindMenuItem:e,hideMenu:t},onClick:n,red:r,checked:a=null,label:l,children:s}){return o.createElement("div",{...e,className:Al(r),onClick:e=>{t(),n&&n(e)}},l,null!==a&&o.createElement("input",{type:"checkbox",className:"ml-auto h-4 w-4 border-none rounded dark:checked:bg-green-600 dark:bg-gray-750 focus:outline-none cursor-pointer",checked:a,readOnly:!0}),s&&o.createElement(o.Fragment,null,o.createElement("div",{className:"ml-auto"},o.createElement(k,{className:"w-5 h-5 -mr-0.5"})),o.createElement("div",{className:"absolute left-full -top-2 -ml-2 hidden group-hover:block"},o.createElement("div",{className:"pl-2"},o.createElement("div",{className:"p-2 ml-3 dark:bg-gray-900 rounded w-48 shadow-lg"},s)))))}const Ol="User",Dl="Post",Tl="Comment",ql="Message",Hl="Server",jl="Folder",zl="Channel",Bl=e=>{const{t:t}=$(),[r]=function(e){const t={...Rn,...e};return n(Yr,t)}({optimisticResponse:{votePost:{...e,isVoted:!0,voteCount:e.voteCount+1}}}),[a]=function(e){const t={...Rn,...e};return n(Wr,t)}({optimisticResponse:{unvotePost:{...e,isVoted:!1,voteCount:e.voteCount-1}}}),[l]=wl({server:null==e?void 0:e.server,permissions:[nr.VotePost]});return i.exports.useCallback((()=>{const n={postId:e.id};l?e.isVoted?a({variables:{input:n}}):r({variables:{input:n}}):C.error(t("post.context.votePermission"))}),[e,l,r,a,t])},_l=e=>{const[t]=function(e){const t={...Rn,...e};return n(Jr,t)}(),[r]=function(e){const t={...Rn,...e};return n(Qr,t)}();return i.exports.useCallback((()=>{const n={postId:e.id};e.isPinned?r({variables:{input:n}}):t({variables:{input:n}})}),[e,t,r])},Vl=N("\n  select-none\n  w-full\n  px-2\n  h-8\n  flex\n  items-center\n  text-13\n  text-mid\n  cursor-default\n  rounded-sm\n  font-medium\n  focus:outline-none\n");function Gl({children:e}){return Yl(e)?o.createElement("div",{className:"space-y-0.5"},o.createElement("div",{className:Vl},"No actions available")):o.createElement("div",{className:"space-y-0.5"},e)}const Yl=e=>!I.renderToStaticMarkup(e);function Wl({post:e,ContextMenuItem:t}){var r,a,l,s,i,c;const{pathname:m}=S(),d=U(m,{path:"/folder/:folderId"}),u=U(m,{path:"/server/:serverId/folder/:folderId"}),p=(null==(r=null==d?void 0:d.params)?void 0:r.folderId)||(null==(a=null==u?void 0:u.params)?void 0:a.folderId),{t:g}=$(),[v]=wl({server:null==e?void 0:e.server,permissions:[nr.ManagePosts]}),h=F()[1],[f]=function(e){const t={...Rn,...e};return n(Gr,t)}(),b=Bl(e),x=_l(e),[E]=il(),y=(null==(l=null==e?void 0:e.author)?void 0:l.id)===E.id,w=y||v,N=null!=(s=null==E?void 0:E.folders)?s:[],k=null!=(c=null==(i=E.servers.find((t=>t.id===e.server.id)))?void 0:i.folders)?c:[],I=E.relatedUsers.filter((e=>"Friends"===e.relationshipStatus)),[P]=Ar(),[M]=function(e){const t={...Rn,...e};return n(Lr,t)}();return e?o.createElement(o.Fragment,null,o.createElement(Gl,null,o.createElement(t,{onClick:()=>b(),label:e.isVoted?g("post.context.unvote"):g("post.context.vote")}),N.length>0&&o.createElement(t,{label:g("post.context.addToUserFolder")},N.map((n=>o.createElement(t,{key:n.id,label:n.name,onClick:()=>P({variables:{input:{folderId:n.id,postId:e.id}}}).then((e=>{e.error||C.success(g("folder.added",{name:n.name}))}))})))),k.length>0&&o.createElement(t,{label:g("post.context.addToServerFolder")},k.map((n=>o.createElement(t,{key:n.id,label:n.name,onClick:()=>P({variables:{input:{folderId:n.id,postId:e.id}}}).then((e=>{e.error||C.success(g("folder.added",{name:n.name}))}))})))),I.length>0&&o.createElement(t,{label:g("post.context.sendToFriend")},I.map((e=>o.createElement(t,{key:e.id,label:e.name})))),y&&o.createElement(t,{label:g("post.context.edit")}),v&&o.createElement(t,{onClick:()=>x(),label:e.isPinned?g("post.context.unpin"):g("post.context.pin")}),o.createElement(t,{onClick:()=>{h(`${e.relativeUrl}`)},label:g("post.context.copyLink")}),p&&o.createElement(t,{label:g("post.context.removeFromFolder"),red:!0,onClick:()=>M({variables:{input:{folderId:p,postId:e.id}}})}),w&&o.createElement(t,{red:!0,onClick:()=>{f({variables:{input:{postId:e.id}}}),C.success(g("post.context.deleted"))},label:g("post.context.delete")}))):null}function Jl({user:e,server:t,isDm:r,ContextMenuItem:a}){const{t:l}=$(),[s]=il(),[i]=wl({server:t,permissions:[nr.ManageUsers]}),[c]=da(),[m]=ia(),[d]=function(e){const t={...Rn,...e};return n(ba,t)}(),[u]=function(e){const t={...Rn,...e};return n(xa,t)}();Zr(),sa();const p=fl((e=>e.setDialogUserId)),{push:g}=P();return e?o.createElement(o.Fragment,null,o.createElement(Gl,null,o.createElement(a,{label:l("user.context.viewProfile"),onClick:()=>{p(e.id)}}),r&&o.createElement(o.Fragment,null,!!e.unreadCount&&o.createElement(a,{label:l("user.context.markRead"),onClick:()=>{m({variables:{input:{userId:e.id}}})}}),o.createElement(a,{label:l("user.context.closeDm"),onClick:()=>{c({variables:{input:{userId:e.id}}})}})),e.id!==s.id?o.createElement(o.Fragment,null,!r&&o.createElement(a,{onClick:()=>g(`/dm/${e.id}`),label:l("user.context.sendMessage")})):o.createElement(o.Fragment,null),!!t&&i&&o.createElement(o.Fragment,null,o.createElement(a,{label:l("user.context.kickUser",{user:e}),red:!0,onClick:()=>{u({variables:{input:{serverId:t.id,userId:e.id}}}),C.success(l("user.context.kickedUser",{user:e}))}}),o.createElement(a,{label:l("user.context.banUser",{user:e}),red:!0,onClick:()=>{const n=window.prompt(l("user.context.banPrompt"));null!==n&&(d({variables:{input:{serverId:t.id,userId:e.id,reason:n}}}),C.success(l("user.context.bannedUser",{user:e})))}})))):null}function Ql({message:e,server:t,ContextMenuItem:r}){var a,l;const{pathname:s}=S(),c=U(s,{path:"/group/:groupId"}),m=U(s,{path:"/dm/:username"});null==(a=null==c?void 0:c.params)||a.groupId,null==(l=null==m?void 0:m.params)||l.username;const[d]=wl({server:t,permissions:[nr.ManageMessages]});F()[1],function(e){const t={...Rn,...e};n(qr,t)}(),jr(),Br(),(e=>{const[t]=jr(),[n]=Br();i.exports.useCallback((()=>{const r={messageId:e.id};e.isPinned?n({variables:{input:r}}):t({variables:{input:r}})}),[e,t,n])})(e);const{t:u}=$(),[p]=il(),g=e.author.id===p.id,v=d||g;return o.createElement(o.Fragment,null,o.createElement(Gl,null,g&&o.createElement(r,{label:u("message.context.edit")}),v&&o.createElement(r,{label:u("message.context.delete"),red:!0,onClick:()=>C.error(u("message.context.deleted"))})))}const Kl=e=>{const{t:t}=$(),[r]=function(e){const t={...Rn,...e};return n(Nr,t)}({optimisticResponse:{voteComment:{...e,isVoted:!0,voteCount:e.voteCount+1}}}),[a]=function(e){const t={...Rn,...e};return n(kr,t)}({optimisticResponse:{unvoteComment:{...e,isVoted:!1,voteCount:e.voteCount-1}}});return i.exports.useCallback((()=>{const t={commentId:e.id};e.isVoted?a({variables:{input:t}}):r({variables:{input:t}})}),[e,r,a,t])},Zl=e=>{const[t]=function(e){const t={...Rn,...e};return n(Cr,t)}(),[r]=function(e){const t={...Rn,...e};return n($r,t)}();return i.exports.useCallback((()=>{const n={commentId:e.id};e.isPinned?r({variables:{input:n}}):t({variables:{input:n}})}),[e,t,r])};function Xl({comment:e,post:t,ContextMenuItem:r}){const{t:a}=$(),[l]=il(),s=fl((e=>e.setReplyingCommentId)),[i,c,m]=wl({server:t.server,permissions:[nr.ManageComments,nr.VoteComment,nr.CreateComment]}),d=F()[1];!function(e){const t={...Rn,...e};n(wr,t)}();const u=Kl(e),p=Zl(e),g=e.author.id===l.id,v=i||g;return o.createElement(o.Fragment,null,o.createElement(Gl,null,c&&o.createElement(r,{label:e.isVoted?a("comment.context.unvote"):a("comment.context.vote"),onClick:()=>u()}),g&&o.createElement(r,{label:a("comment.context.edit")}),i&&o.createElement(r,{label:e.isPinned?a("comment.context.unpin"):a("comment.context.pin"),onClick:()=>p()}),m&&o.createElement(r,{onClick:()=>s(null==e?void 0:e.id),label:a("comment.context.reply")}),o.createElement(r,{onClick:()=>{d(`${e.id}`)},label:a("comment.context.copyLink")}),v&&o.createElement(r,{label:a("comment.context.delete"),red:!0,onClick:()=>C.error(a("comment.context.deleted"))})))}function es({server:e,ContextMenuItem:t}){const{t:r}=$(),[a]=il(),l=M(),[s]=function(e){const t={...Rn,...e};return n(fa,t)}(),{push:i}=P(),{pathname:c}=S();return o.createElement(o.Fragment,null,o.createElement(Gl,null,o.createElement(t,{label:r("server.context.markRead")}),o.createElement(t,{label:r("server.context.invite")}),e.owner.id!==a.id&&o.createElement(t,{label:r("server.context.leave"),red:!0,onClick:()=>{c.startsWith(`/+${e.id}`)&&i("/"),s({variables:{input:{serverId:e.id}}});const t=l.cache.readQuery({query:Ia});l.cache.writeQuery({query:Ia,data:{user:{...t.user,servers:t.user.servers.filter((t=>t.id!==e.id))}}});const n=l.cache.readFragment({fragment:ir,id:`Server:${e.id}`});l.cache.writeFragment({fragment:ir,id:`Server:${e.id}`,data:{...n,isJoined:!1}})}})))}function ts({channel:e,server:t,ContextMenuItem:r}){const{t:a}=$(),{push:l}=P(),{pathname:s}=S(),[i]=wl({server:t,permissions:[nr.ManageChannels]}),[c]=function(e){const t={...Rn,...e};return n(xr,t)}();return o.createElement(o.Fragment,null,o.createElement(Gl,null,o.createElement(r,{label:a("channel.context.markRead")}),o.createElement(r,{label:a("channel.context.edit")}),i&&o.createElement(r,{label:a("channel.context.delete"),red:!0,onClick:()=>{s===`/+${t.name}/#${e.name}`&&l(`/+${t.name}`),c({variables:{input:{channelId:e.id}}})}})))}function ns({folder:e,ContextMenuItem:t}){var r,a,l,s;const{t:i}=$(),[c]=il(),m=(null!=(r=null==c?void 0:c.folders)?r:[]).filter((e=>{var t;return(null==(t=e.owner)?void 0:t.id)!==c.id})).map((e=>e.id)).includes(e.id),d="Read Later"!==e.name&&"Favorites"!==e.name,[u]=Ur(),[p]=function(e){const t={...Rn,...e};return n(Pr,t)}(),[g]=function(e){const t={...Rn,...e};return n(Mr,t)}(),[v]=function(e){const t={...Rn,...e};return n(Fr,t)}(),{push:h}=P(),{pathname:f}=S(),b=U(f,{path:"/:server"}),x=null==(l=null==(a=null==b?void 0:b.params)?void 0:a.server)?void 0:l.substring(1);return o.createElement(o.Fragment,null,o.createElement(Gl,null,o.createElement(t,{label:i("folder.context.copyLink")}),(null==(s=e.owner)?void 0:s.id)!==c.id&&o.createElement(o.Fragment,null,m?o.createElement(t,{label:i("folder.context.unfollow"),onClick:()=>g({variables:{input:{folderId:e.id}}})}):o.createElement(t,{label:i("folder.context.follow"),onClick:()=>p({variables:{input:{folderId:e.id}}})})),d&&o.createElement(o.Fragment,null,o.createElement(t,{label:i("folder.context.edit")}),!x&&o.createElement(t,{label:i("folder.context.collaborative"),checked:e.isCollaborative,onClick:()=>u({variables:{input:{folderId:e.id,isCollaborative:!e.isCollaborative}}})}),o.createElement(t,{label:i("folder.context.changeVisibility")},o.createElement(t,{label:i("folder.context.visibility.public"),checked:e.visibility===Hn.Public,onClick:()=>u({variables:{input:{folderId:e.id,visibility:Hn.Public}}})}),o.createElement(t,{label:i("folder.context.visibility.friends"),checked:e.visibility===Hn.Friends,onClick:()=>u({variables:{input:{folderId:e.id,visibility:Hn.Friends}}})}),o.createElement(t,{label:i("folder.context.visibility.unlisted"),checked:e.visibility===Hn.Unlisted,onClick:()=>u({variables:{input:{folderId:e.id,visibility:Hn.Unlisted}}})}),o.createElement(t,{label:i("folder.context.visibility.private"),checked:e.visibility===Hn.Private,onClick:()=>u({variables:{input:{folderId:e.id,visibility:Hn.Private}}})})),o.createElement(t,{label:i("folder.context.delete"),red:!0,onClick:()=>{v({variables:{input:{folderId:e.id}}}),f.startsWith("/folder")?h("/"):f.startsWith(`/${x}/folder`)&&h(`/${x}`)}}))))}function rs(){return o.createElement("div",{className:"border-t dark:border-gray-800 mt-2 pb-2"})}const as=N("\n  p-2\n  w-48\n  dark:bg-gray-900\n  rounded\n  shadow-lg\n  outline-none\n");function ls({bindMenu:{style:e,ref:t,role:n,tabIndex:r},data:a,bindMenuItem:l,hideMenu:s}){const c=(m={bindMenuItem:l,hideMenu:s},i.exports.useCallback((({onClick:e,red:t,label:n,checked:r,children:a})=>o.createElement(Ll,{item:m,onClick:e,red:t,label:n,checked:r},a)),[m]));var m;const d=F()[1],u=(null==a?void 0:a.href)?new URL(a.href):null,p=u&&u.origin===window.location.origin,g="Mac OS"===rl();return o.createElement("div",{style:{...e,zIndex:999999},ref:t,role:n,tabIndex:r,className:as,onMouseDown:e=>{e.stopPropagation(),e.preventDefault()}},!!window.getSelection().toString()&&o.createElement(o.Fragment,null,o.createElement(c,{label:o.createElement("div",{className:"flex items-center w-full"},"Copy",o.createElement("div",{className:"ml-auto"},g?"⌘+C":"Ctrl+C")),onClick:()=>document.execCommand("copy")}),o.createElement(rs,null)),(null==a?void 0:a.type)===Dl&&o.createElement(Wl,{post:null==a?void 0:a.post,ContextMenuItem:c}),(null==a?void 0:a.type)===Ol&&o.createElement(Jl,{user:null==a?void 0:a.user,server:null==a?void 0:a.server,isDm:null==a?void 0:a.isDm,ContextMenuItem:c}),(null==a?void 0:a.type)===ql&&o.createElement(Ql,{message:null==a?void 0:a.message,server:null==a?void 0:a.server,ContextMenuItem:c}),(null==a?void 0:a.type)===Tl&&o.createElement(Xl,{comment:null==a?void 0:a.comment,ContextMenuItem:c}),(null==a?void 0:a.type)===Hl&&o.createElement(es,{server:null==a?void 0:a.server,ContextMenuItem:c}),(null==a?void 0:a.type)===zl&&o.createElement(ts,{channel:null==a?void 0:a.channel,ContextMenuItem:c}),(null==a?void 0:a.type)===jl&&o.createElement(ns,{folder:null==a?void 0:a.folder,ContextMenuItem:c}),!!(null==a?void 0:a.href)&&!p&&o.createElement(o.Fragment,null,o.createElement(rs,null),o.createElement(Gl,null,o.createElement(c,{label:"Copy Link",onClick:()=>d(a.href)}),o.createElement(c,{label:"Open Link",onClick:()=>window.open(a.href,"_blank")}))))}const ss=i.exports.createContext({useContextTrigger:e=>[{}]});function os({children:e}){const[t,n,r,{data:a,coords:l,setVisible:s}]=Rl();return o.createElement(o.Fragment,null,o.createElement(ss.Provider,{value:{useContextTrigger:r}},e,o.createElement(ls,{bindMenu:t,data:a,bindMenuItem:n,hideMenu:()=>s(!1)})))}function is({data:e,leftClick:t=!1,children:n,className:r}){const[a]=((e,t=!1)=>{const{useContextTrigger:n}=i.exports.useContext(ss);return n({collect:()=>e,mouseButton:t?Nl:kl})})(e,t);return o.createElement("div",{className:r,...a},n)}function cs({folder:e,server:t}){var n,r;const[a]=Ar(),[l]=wl({server:t,permissions:[nr.AddPostToFolder]}),[{isOver:s,canDrop:c},m]=R({accept:bl,drop:async(n,r)=>{!t||l?a({variables:{input:{folderId:e.id,postId:n.id}}}).then((t=>{t.error||C.success(u("folder.added",{name:e.name}))})):C.error(u("folder.noPermission"))},collect:e=>({isOver:e.isOver(),canDrop:e.canDrop()})}),d=s&&c,{t:u}=$(),p=(e=>{const{t:t}=$();return i.exports.useMemo((()=>"Favorites"===e.name?t("folder.favorites"):"Read Later"===e.name?t("folder.readLater"):e.name),[t,e.name])})(e),g=i.exports.useMemo((()=>e.avatarUrl?o.createElement(o.Fragment,null,o.createElement("div",{className:"rounded-full h-7 w-7 mr-3 bg-center bg-contain",style:{backgroundImage:`url(${e.avatarUrl})`}}),o.createElement("span",{className:"truncate"},p)):t||"Favorites"!==e.name?t||"Read Later"!==e.name?o.createElement(o.Fragment,null,o.createElement(O,{className:"w-5 h-5 ml-1 mr-4"}),o.createElement("span",{className:"truncate"},e.name)):o.createElement(o.Fragment,null,o.createElement(L,{className:"w-5 h-5 ml-1 mr-4 text-blue-500"}),o.createElement("span",{className:"truncate"},p)):o.createElement(o.Fragment,null,o.createElement(A,{className:"w-5 h-5 ml-1 mr-4 text-yellow-500"}),o.createElement("span",{className:"truncate"},p))),[t,e,p]);return o.createElement("div",null,o.createElement(is,{data:{type:jl,folder:e}},o.createElement(yl,{active:d,to:`${t||e.server?`/+${null!=(r=null==t?void 0:t.name)?r:null==(n=e.server)?void 0:n.name}`:""}/folder/${e.id}`,ref:m},g)))}const ms=e=>N(`\n  px-3\n  pt-4\n  pb-1\n  text-gray-500\n  dark:text-gray-500\n  uppercase\n  text-11\n  font-semibold\n  tracking-wide\n  flex\n  items-center\n  justify-between\n  select-none\n  ${e&&"hover:text-gray-600 dark:hover:text-gray-400"}\n`);function ds({children:e,plusLabel:t,onClick:n}){const r=t&&n;return o.createElement("div",{className:ms(r)},e,r&&o.createElement(D,{content:t},o.createElement("div",{onClick:n},o.createElement(T,{className:"w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"}))))}function us({isOpen:e,close:t,children:n,closeOnOverlayClick:r=!1}){return o.createElement(q,{show:e,as:i.exports.Fragment},o.createElement(H,{open:e,onClose:t,static:!0},o.createElement("div",{className:"fixed z-10 inset-0"},o.createElement("div",{className:"flex items-end justify-center min-h-screen text-center sm:block p-0"},o.createElement(q.Child,{enter:"ease-out duration-150",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-150",leaveFrom:"opacity-100",leaveTo:"opacity-0"},o.createElement(H.Overlay,{className:"fixed inset-0 transition-opacity"},o.createElement("div",{className:"absolute inset-0 bg-gray-500 dark:bg-black opacity-75"}))),o.createElement(q.Child,{enter:"ease-out transform duration-150",enterFrom:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",enterTo:"opacity-100 translate-y-0 sm:scale-100",leave:"ease-in transform duration-150",leaveFrom:"opacity-100 translate-y-0 sm:scale-100",leaveTo:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"},o.createElement("span",{className:"hidden sm:inline-block sm:align-middle sm:h-screen","aria-hidden":"true"},"​"),o.createElement("div",{onClick:()=>{r&&t()},className:"overflow-y-auto scrollbar dark:scrollbar-thumb-gray-800 dark:scrollbar-track-transparent inline-block h-screen transform transition-all align-middle w-full"},o.createElement("div",{className:"flex min-h-full w-full items-center justify-center"},n)))))))}var ps=H.Title;function gs({type:e="submit",disabled:t=!1,loading:n=!1,children:r,onClick:a}){return o.createElement("button",{onClick:a,disabled:t||n,type:e,className:"disabled:opacity-50 disabled:cursor-not-allowed w-full rounded space-x-3 flex items-center justify-center h-10 text-sm font-medium bg-blue-600 cursor-pointer select-none hover:bg-blue-600 transition focus:outline-none"},r,n&&o.createElement(Ga,{className:"ml-3 w-5 h-5"}))}function vs({server:e}){const{t:t}=$(),[r]=wl({server:e,permissions:[nr.ManagePosts]}),[a,l]=i.exports.useState(!1),{handleSubmit:s,register:c,reset:m,watch:d}=j(),u=d("name");i.exports.useEffect((()=>{a&&m()}),[a,m]);const[p,{loading:g}]=function(e){const t={...Rn,...e};return n(Ir,t)}(),v=e?t("folder.server.title",{name:null==e?void 0:e.name}):t("folder.user.title"),h=t(e?"folder.server.create":"folder.user.create");return e&&!r?o.createElement(ds,null,v):o.createElement(o.Fragment,null,o.createElement(ds,{onClick:()=>l(!0),plusLabel:h},v),o.createElement(us,{isOpen:a,close:()=>l(!1),closeOnOverlayClick:!0},o.createElement("div",{className:"rounded-lg dark:bg-gray-750 p-4 max-w-md w-full",onClick:e=>e.stopPropagation()},o.createElement(ps,{className:"title mb-4"},h),o.createElement("form",{onSubmit:s((({name:t})=>{p({variables:{input:{name:t,serverId:e.id}}}).then((({data:{createFolder:e}})=>{l(!1)}))}))},o.createElement("div",{className:"mb-4 w-full"},o.createElement("label",{className:"label",htmlFor:"name"},t("folder.name")),o.createElement("input",{...c("name",{required:!0,maxLength:300}),maxLength:300,className:"textbox px-3",id:"name"})),o.createElement(gs,{loading:g,disabled:"Read Later"===u||"Favorites"===u},t("continue"))))))}const hs=()=>fl((e=>[e.loginDialog,e.setLoginDialog,e.createAccount,e.setCreateAccount]));function fs(){var e;const t=fl((e=>e.showFolders)),[n]=il(),r=null!=(e=null==n?void 0:n.folders)?e:[],[a,l,s,i]=hs();return o.createElement(hl,{right:!0,show:t},o.createElement("div",{className:"px-1.5"},n?o.createElement(o.Fragment,null,o.createElement(vs,null),o.createElement("div",{className:"space-y-0.5"},!!r&&r.map((e=>o.createElement(cs,{key:e.id,folder:e}))))):o.createElement("div",{className:"px-1.5 py-3"},o.createElement("div",{className:"space-y-3 text-secondary rounded p-2 shadow-inner dark:bg-gray-850"},o.createElement("div",{className:"text-sm font-medium text-accent mb-3"},"Log in to use features"),o.createElement("div",{className:"flex items-center text-sm font-medium"},o.createElement("div",{className:"mr-3 rounded dark:bg-gray-900 p-1.5 flex items-center justify-center shadow-inner"},o.createElement(Va,{className:"w-5 h-5 text-green-400"})),"Join & Create Planets"),o.createElement("div",{className:"flex items-center text-sm font-medium"},o.createElement("div",{className:"mr-3 rounded dark:bg-gray-900 p-1.5 flex items-center justify-center shadow-inner"},o.createElement(z,{className:"w-5 h-5 text-blue-400"})),"Post & Comment"),o.createElement("div",{className:"flex items-center text-sm font-medium"},o.createElement("div",{className:"mr-3 rounded dark:bg-gray-900 p-1.5 flex items-center justify-center shadow-inner"},o.createElement(B,{className:"w-5 h-5 text-pink-400"})),"Chat"),o.createElement("div",{className:"flex items-center text-sm font-medium"},o.createElement("div",{className:"mr-3 rounded dark:bg-gray-900 p-1.5 flex items-center justify-center shadow-inner"},o.createElement(O,{className:"w-5 h-5 text-red-400"})),"Folders"),o.createElement("div",{className:"flex items-center text-sm font-medium"},o.createElement("div",{className:"mr-3 rounded dark:bg-gray-900 p-1.5 flex items-center justify-center shadow-inner"},o.createElement(_,{className:"w-5 h-5 text-purple-400"})),"Add Friends"),o.createElement("div",{className:"flex items-center text-sm font-medium"},o.createElement("div",{className:"mr-3 rounded dark:bg-gray-900 p-1.5 flex items-center justify-center shadow-inner"},o.createElement(V,{className:"w-5 h-5 text-mid"})),"And Much More"),o.createElement("button",{onClick:()=>{l(!0),i(!1)},className:"focus:outline-none w-full h-8 rounded cursor-pointer select-none border border-gray-750 text-blue-500 flex items-center justify-center text-sm font-medium"},"Log In"),o.createElement("button",{onClick:()=>{l(!0),i(!0)},className:"focus:outline-none w-full h-8 rounded cursor-pointer select-none bg-blue-600 text-white flex items-center justify-center text-sm font-medium"},"Create Account")))))}function bs(){return o.createElement("div",{className:"group relative w-full"},o.createElement("input",{onFocus:e=>{e.target.blur(),C.error("Search is coming soon!")},className:"w-full block h-7 min-w-0 rounded-md dark:bg-gray-850 placeholder-tertiary text-sm focus:outline-none focus:ring-1 ring-blue-600 transition"}),o.createElement(G,{className:"w-4 h-4 text-mid absolute top-1/2 transform -translate-y-1/2 left-3"}))}function xs({children:e,className:t,icon:n,title:r,showDivider:a=!1}){return o.createElement("header",{id:"header",className:"h-12 min-h-[3rem] items-center bg-white dark:bg-gray-750 border-b dark:border-gray-800 shadow flex"},o.createElement("div",{className:"flex items-center font-semibold text-base leading-5 text-primary pl-4 pr-4 "+(a?"border-r dark:border-gray-700 mr-4":"")},o.createElement("div",{className:"text-tertiary mr-3"},n),r),o.createElement("div",{className:"flex-grow flex items-center min-w-0 pr-4"},e),o.createElement("div",{className:"flex w-60 min-w-[15rem] pr-4"},o.createElement(bs,null)))}function Es({currentPage:e,setCurrentPage:t,page:n,green:r=!1,children:a}){return o.createElement("button",{onClick:()=>t(n),className:"text-base font-medium rounded px-1.5 py-0.5 cursor-pointer select-none flex flex-shrink-0 items-center focus:outline-none "+(n===e?r?"text-green-600 bg-green-900":"text-secondary dark:bg-gray-700":r?"text-secondary bg-green-600":"text-tertiary")},a||n)}function ys(){const[e,t]=fl((e=>[e.showFolders,e.setShowFolders])),{t:n}=$();return o.createElement(D,{content:n(e?"folder.hide":"folder.show")},o.createElement("div",{className:"highlightable",onClick:()=>t(!e)},o.createElement(O,{className:"w-5 h-5"})))}function ws({checked:e,onChange:t,children:n,green:r=!1,className:a}){return o.createElement(Y.Group,{as:"div",className:"flex items-center space-x-3"},n&&o.createElement(Y.Label,{className:a},n),o.createElement(Y,{as:"button",checked:e,onChange:t,className:(e?""+(r?"bg-green-600":"bg-blue-600"):"dark:bg-gray-500")+" relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-10 focus:outline-none focus:shadow-outline"},(({checked:e})=>o.createElement("span",{className:(e?"translate-x-4":"translate-x-0.5")+" bg-gray-100 inline-block relative translate-y-1px w-4.5 h-4.5 transition duration-200 ease-in-out transform rounded-full"},o.createElement(W,{className:`absolute inset-1/2 transform -translate-y-1/2 -translate-x-1/2 w-4 h-4 transition-opacity duration-200 ${e?"opacity-100":"opacity-0"} ${r?"text-green-600":"text-blue-600"}`}),o.createElement(J,{className:`absolute inset-1/2 transform -translate-y-1/2 -translate-x-1/2 w-4 h-4 transition-opacity duration-200 ${e?"opacity-0":"opacity-100"} text-gray-500`})))))}function Ns({refreshPosts:e}){const[t,n,r]=fl((e=>[e.postsSort,e.showFolders,e.liveMode])),{t:a}=$();let l;switch(t){case"Hot":l=o.createElement(X,{className:"w-5 h-5"});break;case"New":l=o.createElement(Z,{className:"w-5 h-5"});break;case"Top":l=o.createElement(K,{className:"w-5 h-5"})}return o.createElement(xs,{isRightSidebar:n,title:t,icon:l,showDivider:"Top"===t},"Top"===t&&o.createElement("div",{className:"flex items-center space-x-4"},o.createElement(ks,{time:"Hour"}),o.createElement(ks,{time:"Day"}),o.createElement(ks,{time:"Week"}),o.createElement(ks,{time:"Month"}),o.createElement(ks,{time:"Year"}),o.createElement(ks,{time:"All"})),o.createElement("div",{className:"ml-auto space-x-5 flex items-center"},o.createElement(D,{content:a("post.feed.refresh")},o.createElement("div",{className:"highlightable",onClick:e},o.createElement(Q,{className:"w-5 h-5"}))),o.createElement(ys,null)))}function ks({time:e}){const{t:t}=$(),[n,r]=fl((e=>[e.postsTime,e.setPostsTime]));return o.createElement(Es,{page:e,setCurrentPage:r,currentPage:n},t(`post.feed.time.${e.toLowerCase()}`))}const Cs=({serverId:e,folderId:n})=>{var r;const[a,l,s]=fl((e=>[e.postsSort,e.postsTime,e.folderSort])),[o,c]=i.exports.useState(0),m={sort:n?s:a,time:"Top"!==a||n?null:l,serverId:e,folderId:n},{data:d,loading:u,fetchMore:p}=function(e){const n={...Rn,...e};return t(Ma,n)}({variables:m,fetchPolicy:"network-only",nextFetchPolicy:"cache-first"}),g=null==d?void 0:d.posts.hasMore,v=null!=(r=null==d?void 0:d.posts.posts)?r:[];return[v,u,()=>{g&&0!==v.length&&(p({variables:{...m,offset:20*(o+1)},updateQuery:(e,{fetchMoreResult:t})=>({posts:{hasMore:t.posts.hasMore,posts:[...e.posts.posts,...t.posts.posts]}})}),c(o+1))},g]};var $s=i.exports.forwardRef((({server:e,loading:t="eager",size:n=12,className:r="",style:a={}},l)=>{var s;const c=(null!=(s=null==e?void 0:e.displayName)?s:"").split(" ").map((e=>e[0])).join("").toUpperCase(),m=i.exports.useMemo((()=>{const e=c;return e.length<=2?"18px":3===e.length?"16px":4===e.length?"14px":5===e.length?"12px":e.length>=6?"10px":void 0}),[c]);return e?o.createElement(dl,{ref:l,avatarUrl:e.avatarUrl,loading:t,className:`${r} cursor-pointer`,size:n,style:a},!e.avatarUrl&&o.createElement("svg",{width:"100%",height:"100%",viewBox:"0 0 48 48",className:"absolute top-0 left-0",overflow:"visible"},o.createElement("defs",null,o.createElement("g",null,o.createElement("path",{d:"M48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24Z"})),o.createElement("g",null,o.createElement("rect",{x:"28",y:"-4",width:"24",height:"24",rx:"12",ry:"12",transform:"translate(20 -20)"})),o.createElement("g",null,o.createElement("rect",{x:"28",y:"28",width:"24",height:"24",rx:"12",ry:"12",transform:"translate(20 20)"}))),o.createElement("foreignObject",{x:"0",y:"0",width:"48",height:"48"},o.createElement("div",{className:"flex items-center justify-center h-full",tabIndex:"-1","aria-label":e.name,style:{fontSize:m}},o.createElement("div",{className:"flex items-center justify-center whitespace-nowrap font-medium text-tertiary","aria-hidden":"true"},c))))):null}));function Is({children:e,render:t,className:n,placement:r="right"}){const[a,l]=i.exports.useState(!1),s=ee(8);const c={name:"hideOnPopperBlur",defaultValue:!0,fn:e=>({onCreate(){e.popper.addEventListener("focusout",(t=>{e.props.hideOnPopperBlur&&t.relatedTarget&&!e.popper.contains(t.relatedTarget)&&e.hide()}))}})};return o.createElement(o.Fragment,null,o.createElement(te,{render:e=>o.createElement(ne.div,{style:{x:s},...e,className:`hidden lg:block ${n}`},t((()=>l(!1)))),placement:r,interactive:!0,onMount:function(){l(!0),s.set(8),re(s,0,{ease:[.4,0,.2,1],duration:.15})},visible:a,onHide:()=>l(!1),onClickOutside:()=>l(!1),plugins:[c],zIndex:9999,appendTo:document.body},o.createElement("span",{className:"leading-none",onClick:()=>l(!0)},e)))}function Ss({user:e,roles:t,children:n,placement:r="right"}){const a=fl((e=>e.setDialogUserId));return o.createElement(o.Fragment,null,o.createElement(Is,{className:"w-64",placement:r,render:n=>o.createElement("div",{className:"w-full relative rounded-md shadow-lg duration-200 transform transition z-50 w-64"},o.createElement("div",{className:"p-3 flex flex-col items-center dark:bg-gray-850 rounded-t-md"},o.createElement("div",{className:"group relative"},o.createElement(vl,{user:e,size:20,showOnline:!0,className:"dark:bg-gray-700 cursor-pointer select-none",dotClassName:"ring-5 w-4 h-4 dark:ring-gray-850"}),o.createElement("div",{onClick:()=>{n(),a(e.id)},className:"cursor-pointer bg-black bg-opacity-50 transition rounded-full absolute whitespace-nowrap inset-0 flex items-center justify-center text-9 uppercase tracking-widest font-semibold opacity-0 group-hover:opacity-100"},"View Profile")),o.createElement("div",{className:"mt-3 text-base"},o.createElement("span",{className:"font-semibold text-primary"},e.username))),o.createElement("div",{className:"p-4 dark:bg-gray-800 rounded-b-md"},t&&o.createElement("div",null,o.createElement("div",{className:"text-11 font-semibold uppercase tracking-widest text-secondary pb-2"},"Roles"),o.createElement("div",{className:"flex space-x-1"},t.map((e=>o.createElement("div",{key:e.id,style:{color:e.color,borderColor:e.color},className:"text-xs font-medium px-2 h-5.5 rounded-full border inline-flex items-center "+(e.color?"":"dark:border-gray-700 text-secondary")},e.name))),o.createElement("div",{className:"text-xs font-medium h-5.5 w-5.5 rounded-full border inline-flex items-center justify-center dark:border-gray-700 text-secondary"},o.createElement(T,{className:"w-5 h-5"}))))))},n))}function Us(e){return ae(e).calendar()}function Fs(e){return ae(e).format("h:mm A")}ae.extend(le),ae.extend(se);const Ps=/^https?:\/\/twitter\.com\/(?:#!\/)?(?:\w+)\/status(?:es)?\/(\d+)/,Ms=/^https?:\/\/banned\.video\/watch\?id=((?:\w){24})/,Rs=/^https?:\/\/open\.(?:spotify\.com\/)(?:embed\/)?(track|playlist|album)\/((?:\w){22})/,As=/^https?:\/\/gfycat\.com\/(\w+)/,Ls=/^https?:\/\/www\.bitchute\.com\/video\/(\w+)/,Os=e=>oe.canPlay(e),Ds=e=>Ps.test(e),Ts=e=>Ms.test(e),qs=e=>Rs.test(e),Hs=e=>As.test(e),js=e=>Ls.test(e),zs=e=>e&&(Os(e)||Ds(e)||Ts(e)||qs(e)||Hs(e))||js(e),Bs=N("aspect-h-9 aspect-w-16 relative"),_s=N("w-full h-full");function Vs({url:e}){if(Os(e))return o.createElement("div",{className:Bs},o.createElement(oe,{url:e,className:"absolute top-0 left-0",width:"100%",height:"100%",config:{youtube:{playerVars:{controls:1}}}}));if(Ds(e)){const t=e.match(Ps)[1];return o.createElement(ie,{tweetId:t,options:{theme:"dark",align:"center",dnt:!0}})}if(Ts(e)){const t=e.match(Ms)[1];return o.createElement("div",{className:Bs},o.createElement("iframe",{src:`https://api.banned.video/embed/${t}?autoplay=false&amp;muted=false`,frameBorder:"0",allowFullScreen:!0,className:_s}))}if(qs(e)){const t=e.match(Rs),n=t[1],r=t[2];return o.createElement("div",{className:Bs},o.createElement("iframe",{src:`https://open.spotify.com/embed/${n}/${r}`,frameBorder:"0",allowTransparency:"true",allow:"encrypted-media",className:_s}))}if(Hs(e)){const t=e.match(As)[1];return o.createElement("div",{className:Bs},o.createElement("iframe",{src:`https://gfycat.com/ifr/${t}`,frameBorder:"0",scrolling:"no",allowFullScreen:!0,className:_s}))}if(js(e)){const t=e.match(Ls)[1];return o.createElement("div",{className:Bs},o.createElement("iframe",{src:`https://www.bitchute.com/embed/${t}/`,frameBorder:"0",allowFullScreen:!0,className:_s}))}return null}function Gs({linkUrl:e,metadata:t,dark:n=!1}){var r,a;const l=i.exports.useMemo((()=>{if(!e)return"domain.com";let t=new URL(e).hostname;return t.startsWith("www.")&&(t=t.substring(4)),t}),[e]);return e&&zs(e)?o.createElement(Vs,{url:e}):o.createElement("a",{href:e,rel:"noopener nofollow noreferrer",target:"_blank",className:"rounded-md flex transition "+(n?"dark:bg-gray-775 border dark:border-gray-825":"dark:bg-gray-750 dark:hover:bg-gray-725")},o.createElement("div",{className:"rounded-l-md dark:bg-gray-750 flex flex-shrink-0 items-center justify-center h-24 w-24 bg-contain bg-center",style:(null==t?void 0:t.image)?{backgroundImage:`url(${null==t?void 0:t.image})`}:{}},!(null==t?void 0:t.image)&&o.createElement(ce,{className:"w-1/2 h-1/2 text-mid"})),o.createElement("div",{className:"flex-grow rounded-r-md pl-4 pr-4 max-h-24 flex flex-col py-1.5"},o.createElement("div",{className:"text-base text-primary line-clamp-1"},null!=(r=null==t?void 0:t.title)?r:"No title"),o.createElement("div",{className:"text-13 text-secondary pt-0.5 line-clamp-2",dangerouslySetInnerHTML:{__html:null!=(a=null==t?void 0:t.description)?a:"No description"}}),o.createElement("div",{className:"mt-auto text-11 text-tertiary flex items-center"},(!t||(null==t?void 0:t.logo))&&o.createElement("div",{className:"h-4 w-4 mr-2 dark:bg-gray-725 bg-contain bg-center",style:(null==t?void 0:t.logo)?{backgroundImage:`url(${null==t?void 0:t.logo})`}:{}}),l)))}var Ys=i.exports.memo((function({post:e,isPostPage:t=!1,showServerName:n=!1,className:r="",index:a}){var l,s,c,m,d,u,p,g,v,h;const{push:f}=P(),x=Bl(e),[{opacity:E},y]=me({type:bl,item:e,collect:e=>({opacity:e.isDragging()?.4:1})}),w=de().getMonitor().isDragging(),[N,C]=i.exports.useState(!1);i.exports.useEffect((()=>{if(!w){const e=setTimeout((()=>C(!1)),300);return()=>clearTimeout(e)}C(!0)}),[w]);const $=i.exports.useMemo((()=>{var t,n;return e.text||!(e.text||e.linkUrl||e.images&&0!==e.images.length)?"Text":e.linkUrl?e.domain:1===(null==(t=e.images)?void 0:t.length)?"Image":(null==(n=e.images)?void 0:n.length)>1?"Image Album":void 0}),[e.domain,e.images,e.linkUrl,e.text]),I=e=>{e.stopPropagation(),e.preventDefault()},[S,U]=i.exports.useState(0);return o.createElement(is,{data:{type:Dl,post:e}},o.createElement("div",{ref:y,style:{opacity:E},className:`${r} cursor-pointer relative group hover:shadow dark:bg-gray-800 dark:hover:bg-gray-825 pt-3 px-3 pb-3 rounded flex`,onClick:()=>{N||f(e.relativeUrl)}},!t&&o.createElement("div",{className:"w-26 h-18 rounded dark:bg-gray-700 mr-3 flex items-center justify-center bg-center bg-cover bg-no-repeat",style:e.thumbnailUrl?{backgroundImage:`url(${e.thumbnailUrl})`}:{}},!e.thumbnailUrl&&o.createElement(o.Fragment,null,e.linkUrl?o.createElement(ce,{className:"w-8 h-8 text-tertiary"}):o.createElement(ue,{className:"w-8 h-8 text-tertiary"}))),o.createElement("div",{className:"pr-3 py-0.5 flex-grow flex flex-col"},o.createElement(b,{to:e.relativeUrl,className:"text-secondary font-medium"},e.title,o.createElement("span",{className:"text-xs text-mid"},"  ",$)),t&&$&&o.createElement("div",{className:"border-b dark:border-gray-750 mt-0.5 pb-2"},!!e.text&&o.createElement("div",{dangerouslySetInnerHTML:{__html:e.text},className:"prose prose-sm dark:prose-dark max-w-none pt-0.5"}),!!e.linkUrl&&o.createElement(o.Fragment,null,e.linkMetadata?o.createElement("div",{className:"max-w-screen-md w-full mt-2"},o.createElement(Gs,{linkUrl:e.linkUrl,metadata:e.linkMetadata})):o.createElement("a",{href:e.linkUrl,target:"_blank",rel:"noopener nofollow noreferrer",className:"text-sm text-blue-400 hover:underline cursor-pointer pt-0.5"},e.linkUrl)),(null==(l=e.images)?void 0:l.length)>=1&&o.createElement("div",{className:"max-w-screen-md w-full mt-2"},o.createElement("div",{className:"flex relative"},o.createElement("div",{className:"aspect-h-9 aspect-w-16 relative flex w-full dark:bg-gray-775"},e.images.map(((e,t)=>o.createElement("img",{key:t,alt:"",src:e.url,className:"w-full h-full object-contain select-none "+(t===S?"block":"hidden")})))),e.images.length>1&&o.createElement(o.Fragment,null,S>0&&o.createElement("div",{onClick:()=>U(S-1),className:"absolute left-3 top-1/2 transform -translate-y-1/2 rounded-full shadow flex items-center justify-center w-10 h-10 dark:bg-white"},o.createElement(pe,{className:"w-5 h-5 dark:text-black"})),S<e.images.length-1&&o.createElement("div",{onClick:()=>U(S+1),className:"absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full shadow flex items-center justify-center w-10 h-10 dark:bg-white"},o.createElement(k,{className:"w-5 h-5 dark:text-black"})))),o.createElement("div",{className:"h-12 dark:bg-gray-750 flex items-center px-5 text-13 select-none"},e.images[S].caption&&o.createElement("div",{className:"text-primary truncate pr-3",title:e.images[S].caption},e.images[S].caption),e.images[S].linkUrl&&o.createElement("a",{href:e.images[S].linkUrl,target:"_blank",rel:"noopener nofollow noreferrer",className:"ml-auto text-blue-400 hover:underline cursor-pointer"},e.images[S].linkUrl)))),o.createElement("div",{className:"flex items-center pt-2 mt-auto"},o.createElement("div",{className:"flex items-center",onClick:I},o.createElement(is,{data:{type:Ol,user:null==(s=e.author)?void 0:s.user}},o.createElement(Ss,{user:null==(c=e.author)?void 0:c.user,roles:null==(m=e.author)?void 0:m.roles},o.createElement(vl,{user:e.author.user,size:5}))),o.createElement(is,{data:{type:Ol,user:null==(d=e.author)?void 0:d.user}},o.createElement(Ss,{user:null==(u=e.author)?void 0:u.user,roles:null==(p=e.author)?void 0:p.roles},o.createElement("div",{className:"ml-2 hover:underline cursor-pointer text-tertiary text-xs font-medium leading-none",style:{color:null==(g=e.author)?void 0:g.color}},null!=(h=null==(v=e.author)?void 0:v.user.username)?h:"[deleted]"))),n&&o.createElement("div",{className:"ml-1 flex items-center",onClick:I},o.createElement(ge,{className:"w-4.5 h-4.5 text-mid mr-1"}),o.createElement(b,{to:`/+${e.server.name}`,className:"flex items-center"},o.createElement($s,{server:e.server,size:5,className:"dark:bg-gray-750 rounded-full"}),o.createElement("span",{className:"ml-2 text-xs font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"},e.server.name))),o.createElement("div",{className:"text-xs text-mid font-medium"},"  ·  ",o.createElement(D,{content:Us(e.createdAt)},o.createElement("span",null,(F=e.createdAt,ae(F).twitter()))))),o.createElement("div",{className:"flex items-center ml-auto",onClick:I},o.createElement("div",{className:"text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center cursor-pointer"},o.createElement(B,{className:"w-5 h-5"}),o.createElement("div",{className:"ml-2 text-xs font-medium"},e.commentCount)),o.createElement("div",{onClick:e=>{e.preventDefault(),x()},className:(e.isVoted?"text-red-400":"text-gray-500 hover:text-gray-700 dark:hover:text-gray-300")+" flex items-center cursor-pointer ml-6"},o.createElement(ve,{className:"w-4 h-4"}),o.createElement("div",{className:"ml-2 text-xs font-medium"},e.voteCount)),o.createElement(is,{data:{type:Dl,post:e},leftClick:!0},o.createElement("div",{className:"ml-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center cursor-pointer"},o.createElement(he,{className:"text-disabled w-4 h-4"}))))))));var F}));function Ws({folderId:e,serverId:t,showServerName:n,header:r}){const a=i.exports.useRef(null),[l,s,c,m]=Cs({folderId:e,serverId:t}),d=i.exports.useCallback(((e,t)=>{const r=e[t];return r?o.createElement("div",{className:"px-4 pb-1.5"},o.createElement(Ys,{post:r,showServerName:n,index:t})):o.createElement("div",{style:{height:"1px"}})}),[n]);return o.createElement(o.Fragment,null,o.createElement(fe,{className:"scrollbar-custom dark:bg-gray-750",components:{Header:r?()=>r:null,Footer:()=>m?o.createElement("div",{className:"flex items-center justify-center h-20"},o.createElement(Ga,null)):o.createElement(cl,null)},endReached:()=>{!s&&m&&c()},itemContent:e=>d(l,e),overscan:100,ref:a,style:{overflowX:"hidden"},totalCount:(null==l?void 0:l.length)||0}))}const Js=e=>{const t=fl((e=>e.setHomePage));i.exports.useEffect((()=>t(e)))},Qs=be.create({name:"spoiler",inclusive:!1,defaultOptions:{HTMLAttributes:{"data-spoiler":""}},addAttributes:()=>({"data-spoiler":{default:""}}),parseHTML:()=>[{tag:"span[data-spoiler]"}],renderHTML({HTMLAttributes:e}){return["span",xe(this.options.HTMLAttributes,e),0]},addCommands:()=>({setSpoiler:e=>({commands:t})=>t.setMark("spoiler",e),toggleSpoiler:e=>({commands:t})=>t.toggleMark("spoiler",e),unsetSpoiler:()=>({commands:e})=>e.unsetMark("spoiler")})});function Ks({text:e,setText:t}){var n;const r=Ee({extensions:[ye.configure({heading:{levels:[2,3]}}),we,Ne,Qs],content:e,editorProps:{attributes:{class:"prose prose-sm dark:prose-dark focus:outline-none max-w-none min-h-[7.5rem] p-4"}}}),a=null!=(n=null==r?void 0:r.getHTML())?n:"";return i.exports.useEffect((()=>{t("<p></p>"===a?"":a)}),[r,a,t]),o.createElement("div",{className:"dark:bg-gray-750 rounded"},o.createElement(no,{editor:r}),o.createElement(ke,{editor:r}))}const Zs=e=>N(`\n  p-1\n  rounded\n  dark:hover:bg-gray-600\n  cursor-pointer\n  ${e?"dark:bg-gray-600 dark:text-gray-300":"text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}\n`);function Xs({label:e,icon:t,small:n,onClick:r,active:a}){const l=t;return o.createElement(D,{content:e},o.createElement("div",{className:"h-9 flex items-center",onClick:r},o.createElement("div",{className:Zs(a)},o.createElement(l,{className:""+(n?"w-4 h-4 mt-0.5":"w-5 h-5")}))))}const eo=N("\n  flex\n  items-center\n  px-2\n  h-full\n  space-x-0.5\n");function to({children:e}){return o.createElement("div",{className:eo},e)}function no({editor:e}){return e?o.createElement("div",{className:"min-h-[2.25rem] border-b dark:border-gray-700 flex flex-wrap items-center divide-x dark:divide-gray-700"},o.createElement(to,null,o.createElement(Xs,{label:"Bold (Ctrl+B)",icon:Ce,onClick:()=>e.chain().focus().toggleBold().run(),active:e.isActive("bold")}),o.createElement(Xs,{label:"Italic (Ctrl+U)",icon:$e,onClick:()=>e.chain().focus().toggleItalic().run(),active:e.isActive("italic")}),o.createElement(Xs,{label:"Underline (Ctrl+I)",icon:Ie,onClick:()=>e.chain().focus().toggleUnderline().run(),active:e.isActive("underline")}),o.createElement(Xs,{label:"Strikethrough",icon:Se,onClick:()=>e.chain().focus().toggleStrike().run(),active:e.isActive("strike")})),o.createElement(to,null,o.createElement(Xs,{label:"Spoiler",icon:Ue,onClick:()=>e.chain().focus().toggleSpoiler().run(),active:e.isActive("spoiler")}),o.createElement(Xs,{label:"Inline Code",icon:Fe,onClick:()=>e.chain().focus().toggleCode().run(),active:e.isActive("code")})),o.createElement(to,null,o.createElement(Xs,{label:"Link",icon:Pe,onClick:()=>{const t=window.prompt("URL");e.chain().focus().setLink({href:t}).run()},active:e.isActive("link")}),e.isActive("link")&&o.createElement(Xs,{label:"Remove Link",icon:Me,onClick:()=>{e.chain().focus().unsetLink().run()}}),o.createElement(Xs,{label:"Divider",icon:Re,onClick:()=>e.chain().focus().setHorizontalRule().run()})),o.createElement(to,null,o.createElement(Xs,{label:"Bulleted List",icon:Ae,onClick:()=>e.chain().focus().toggleBulletList().run(),active:e.isActive("bulletList")}),o.createElement(Xs,{label:"Numbered List",icon:Le,onClick:()=>e.chain().focus().toggleOrderedList().run(),active:e.isActive("orderedList")})),o.createElement(to,null,o.createElement(Xs,{label:"Large Heading (Ctrl+[)",icon:Oe,onClick:()=>e.chain().focus().toggleHeading({level:2}).run(),active:e.isActive("heading",{level:2})}),o.createElement(Xs,{label:"Small Heading (Ctrl+])",icon:Oe,small:!0,onClick:()=>e.chain().focus().toggleHeading({level:3}).run(),active:e.isActive("heading",{level:3})})),o.createElement(to,null,o.createElement(Xs,{label:"Block Quote",icon:De,onClick:()=>e.chain().focus().toggleBlockquote().run(),active:e.isActive("blockquote")}),o.createElement(Xs,{label:"Code Block",icon:Te,onClick:()=>e.chain().focus().toggleCodeBlock().run(),active:e.isActive("codeBlock")})),o.createElement(to,null,o.createElement(Xs,{label:"Emoji",icon:qe}))):null}const ro=N("\n  relative\n  w-full\n  h-12\n  flex\n  items-center\n  pl-5\n  pr-10\n  text-left\n  bg-white\n  dark:bg-gray-800\n  dark:hover:bg-gray-775\n  cursor-pointer\n  focus:outline-none\n  text-sm\n  rounded-none\n  rounded-tl-xl\n"),ao=N("\n  scrollbar-dark\n  absolute\n  w-full\n  py-1\n  mt-1\n  overflow-auto\n  text-sm\n  text-primary\n  bg-white\n  dark:bg-gray-775\n  rounded-md\n  shadow-lg\n  max-h-60\n  focus:outline-none\n  space-y-0.5\n");function lo({servers:e=[],server:t,setServer:n}){return o.createElement("div",{className:"col-span-1 z-10"},o.createElement(He,{value:t,onChange:n},(({open:n})=>o.createElement(o.Fragment,null,o.createElement("div",{className:"relative"},o.createElement(He.Button,{className:ro},t?o.createElement(o.Fragment,null,o.createElement($s,{server:t,className:"dark:bg-gray-750 rounded-full",size:7}),o.createElement("span",{className:"block truncate pl-2"},t.name)):o.createElement("span",{className:"block truncate text-red-400"},"Select a planet"),o.createElement("span",{className:"absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none"},o.createElement(je,{className:"w-5 h-5 text-gray-400","aria-hidden":"true"}))),o.createElement(q,{show:n,as:i.exports.Fragment,leave:"transition ease-in duration-100",leaveFrom:"opacity-100",leaveTo:"opacity-0"},o.createElement(He.Options,{static:!0,className:ao},e.map((e=>o.createElement(He.Option,{key:e.id,className:({active:e})=>(e=>N(`\n  ${e?"dark:bg-gray-750":""}\n  cursor-pointer\n  select-none\n  relative\n  focus:outline-none\n`))(e),value:e},(({selected:t})=>o.createElement("div",{className:"flex items-center h-10 pl-5 pr-4 "+(t?"dark:bg-gray-750":"")},o.createElement($s,{server:e,size:7,className:"dark:bg-gray-725 rounded-full"}),o.createElement("span",{className:(t?"font-semibold":"font-normal")+" block truncate pl-2"},e.name)))))))))))))}const so=(e,t)=>{const n=i.exports.useRef(e);i.exports.useEffect((()=>{n.current=e}),null!=t?t:[e]);return i.exports.useCallback(((...e)=>{var t;null==(t=n.current)||t.call(n,...e)}),[])};var oo=i.exports.forwardRef((({onChange:e,onInput:t,onBlur:n,onKeyPress:r,onKeyDown:a,onPaste:l,...s},i)=>{const c=so(e),m=so(t),d=so(n),u=so(r),p=so(a),g=so(l);return o.createElement(ze,{...s,ref:i,onChange:c,onInput:m,onBlur:d,onKeyPress:u,onKeyDown:p,onPaste:g})}));const io=N("\n  block\n  text-11\n  pb-1.5\n  font-semibold\n  tracking-widest\n  uppercase\n  text-tertiary\n"),co=N("\n  text-base\n  text-primary\n  disabled:opacity-50\n  bg-green-600\n  rounded\n  px-5\n  h-9\n  flex\n  items-center\n  disabled:cursor-not-allowed\n  focus:outline-none\n  select-none\n"),mo=N("\n  text-base\n  text-tertiary\n  focus:outline-none\n  px-2\n  h-9\n  flex\n  items-center\n  select-none\n"),uo=e=>N(`\n  px-5\n  h-12\n  border-b-2\n  dark:hover:bg-gray-775\n  ${e?"dark:border-gray-100 text-primary dark:bg-gray-775":"border-transparent text-tertiary"}\n  flex\n  items-center\n  justify-center\n  select-none\n  cursor-pointer\n  text-sm\n  last:rounded-tr-xl\n`),po=N("\n  px-4\n  h-10\n  placeholder-tertiary\n  dark:bg-gray-750\n  rounded\n  text-sm\n  text-primary\n  w-full\n  focus:outline-none\n"),go="Text",vo="Link",ho="Image";function fo({open:e,setOpen:r,serverId:a}){var l,s,c,m,d,u,p,g,v,h;const[f,b]=i.exports.useState(""),[x,{loading:E}]=function(e){const t={...Rn,...e};return n(Vr,t)}(),{t:y}=$(),{push:w}=P(),[N]=il(),k=(null!=(l=null==N?void 0:N.servers)?l:[]).filter((e=>e.permissions.includes(nr.CreatePost))),[C,I]=i.exports.useState(a?null==k?void 0:k.find((e=>e.id===a)):null),[S,U]=i.exports.useState(go),{register:F,handleSubmit:M,reset:R,formState:A,watch:L,setValue:O,trigger:D}=j({mode:"onChange"}),q=L("linkUrl"),[H,z]=i.exports.useState("");Be((()=>{z(q)}),500,[q]);const B=L("title"),{data:_,loading:V}=function(e){const n={...Rn,...e};return t(Ua,n)}({variables:{linkUrl:H},skip:!H||!_e(H)}),G=null==_?void 0:_.getLinkMeta,[Y,W]=i.exports.useState([]);function Q(e){return new Promise((function(t,n){let r=new FileReader;r.onload=function(){t(r.result)},r.onerror=function(){n(r)},r.readAsDataURL(e)}))}const[K,Z]=i.exports.useState(0),X=()=>{r(!1),setTimeout((()=>{Z(0),W([]),U(go),R()}),300)};return o.createElement(us,{isOpen:e,close:X},o.createElement("form",{onSubmit:M((({title:e,linkUrl:t})=>{x({variables:{input:{title:e,text:f&&S===go?f:null,linkUrl:t&&S===vo?t:null,serverId:C.id,images:Y&&Y.length>0&&S===ho?Y.map((({file:e,caption:t,linkUrl:n})=>({file:e,caption:t,linkUrl:n}))):null}}}).then((({data:e})=>{const t=null==e?void 0:e.createPost;t&&(r(!1),R(),w(t.relativeUrl))}))})),className:"max-w-screen-md w-full dark:bg-gray-800 text-left rounded-xl"},o.createElement("div",{className:"grid grid-cols-4"},o.createElement(lo,{servers:k,server:C,setServer:I}),o.createElement("div",{className:uo(S===go),onClick:()=>{U(go),O("linkUrl",""),W([])}},o.createElement(ue,{className:"mr-2 w-5 h-5"}),"Text"),o.createElement("div",{className:uo(S===vo),onClick:()=>{U(vo),b(""),W([])}},o.createElement(Ve,{className:"mr-2 w-5 h-5"}),"Link"),o.createElement("div",{className:uo(S===ho),onClick:()=>{U(ho),O("linkUrl",""),D("linkUrl"),b("")}},o.createElement(Ge,{className:"mr-2 w-5 h-5"}),"Images")),o.createElement("div",{className:"p-5"},o.createElement("div",{className:"relative"},o.createElement("label",{htmlFor:"title",className:io},"Title",(null==B?void 0:B.length)>0&&` (${null==B?void 0:B.length}/300)`),o.createElement("input",{maxLength:300,className:po,...F("title",{required:!0}),id:"title"})),S===go&&o.createElement("div",{className:"pt-5"},o.createElement(Ks,{text:f,setText:b})),S===vo&&o.createElement(o.Fragment,null,o.createElement("div",{className:"pb-5 pt-1.5"},(null==G?void 0:G.title)&&B!==(null==G?void 0:G.title)&&o.createElement("span",{className:"text-xs text-blue-500 hover:underline cursor-pointer line-clamp-1",onClick:()=>{O("title",null==G?void 0:G.title),D("title")}},null==G?void 0:G.title)),o.createElement("label",{htmlFor:"linkUrl",className:"block text-11 pb-1.5 font-semibold tracking-widest uppercase text-tertiary"},"Link URL"),o.createElement("div",{className:"relative h-10"},o.createElement(Ve,{className:"top-1/2 left-2.5 transform -translate-y-1/2 absolute w-5 h-5 text-mid"}),o.createElement("input",{maxLength:2e3,className:"px-10 h-10 dark:bg-gray-750 rounded text-sm text-primary w-full focus:outline-none",...F("linkUrl",{validate:e=>!e||_e(e)}),id:"linkUrl"}),V&&o.createElement("div",{className:"top-1/2 right-2.5 transform -translate-y-1/2 absolute"},o.createElement(Ga,null))),q&&!_e(q)&&o.createElement("div",{className:"text-13 text-red-400 pt-1"},"Must be a valid URL"),H&&_e(H)&&(G||zs(H))&&o.createElement("div",{className:"mt-5"},o.createElement(Gs,{linkUrl:H,metadata:G}))),S===ho&&o.createElement("div",{className:"mt-5"},Y&&Y.length>0?o.createElement("div",null,o.createElement("div",{className:"flex"},o.createElement("div",{className:"flex scrollbar-custom items-center space-x-3 overflow-x-auto border dark:border-gray-700 rounded-md h-31 px-3 max-w-full w-full"},Y.map(((e,t)=>o.createElement("div",{key:t,onClick:()=>Z(t),className:"cursor-pointer group relative rounded border "+(K===t?"dark:border-gray-500":"dark:border-transparent")},o.createElement("div",{className:"max-w-25 max-h-25 min-w-[6.25rem] min-h-[6.25rem] transform "+(K===t?"scale-85":"")},o.createElement("div",{className:"absolute top-1 right-1 rounded-full bg-black p-0.5 hidden group-hover:block z-10",onClick:()=>{K>=t&&K>0&&setImmediate((()=>Z(K-1)));const e=Y.slice();e.splice(t,1),W(e)}},o.createElement(J,{className:"w-4.5 h-4.5 text-white"})),o.createElement("div",{className:"absolute inset-0 bg-black rounded bg-opacity-0 group-hover:bg-opacity-50"}),o.createElement("div",{style:{backgroundImage:`url(${e.data})`},className:"max-w-25 max-h-25 min-w-[6.25rem] min-h-[6.25rem] bg-cover bg-center select-none rounded"}))))),o.createElement("div",{className:"w-25 h-25 rounded relative flex items-center justify-center border dark:border-gray-700 border-dashed cursor-pointer transition dark:hover:bg-gray-775"},o.createElement("input",{type:"file",id:"file",accept:"image/png,image/jpeg,image/webp,image/gif",hidden:!0,multiple:!0,onChange:e=>{const t=e.target.files;if(t&&t.length>0){W([...Y,...Array.from(t).map((e=>({file:e,caption:"",linkUrl:""})))]);let e=[];for(let n=0;n<t.length;n++)e.push(Q(t[n]));Promise.all(e).then((e=>{W([...Y,...e.map(((e,n)=>({file:t[n],caption:"",linkUrl:"",data:e})))])}))}}}),o.createElement("label",{htmlFor:"file",className:"absolute inset-0 block cursor-pointer"}),o.createElement(T,{className:"w-1/2 h-1/2 text-tertiary"})))),Y&&(null==Y?void 0:Y.length)>0&&o.createElement("div",{className:"mt-5 flex space-x-5"},o.createElement("div",{className:"w-81 h-81 bg-contain bg-center bg-no-repeat dark:bg-gray-775 flex-shrink-0",style:{backgroundImage:`url(${null==(s=Y[K])?void 0:s.data})`}}),o.createElement("div",{className:"space-y-5 max-w-full flex-grow"},o.createElement("div",null,o.createElement("label",{htmlFor:"caption",className:io},"Caption",(null==(m=null==(c=Y[K])?void 0:c.caption)?void 0:m.length)>0&&` (${null==(u=null==(d=Y[K])?void 0:d.caption)?void 0:u.length}/180)`),o.createElement(oo,{id:"caption",className:"px-4 py-2.5 min-h-[2.5rem] dark:bg-gray-750 rounded text-sm text-primary focus:outline-none break-word",html:(null==(p=Y[K])?void 0:p.caption)||"",onChange:e=>{var t,n;if((null==(n=null==(t=Y[K])?void 0:t.caption)?void 0:n.length)>=180)return;const r=Y.slice();let a=e.target.value;a.length>180&&(a=a.substring(0,181)),r[K].caption=a,W(r)}})),o.createElement("div",null,o.createElement("label",{htmlFor:"link",className:io},"Link"),o.createElement("input",{id:"link",className:po,value:(null==(g=Y[K])?void 0:g.linkUrl)||"",onChange:e=>{const t=Y.slice();t[K].linkUrl=e.target.value,W(t)}}),(null==(v=Y[K])?void 0:v.linkUrl)&&!_e(null==(h=Y[K])?void 0:h.linkUrl)&&o.createElement("div",{className:"text-13 text-red-400 pt-1"},"Must be a valid URL"))))):o.createElement("div",{className:"relative"},o.createElement("input",{type:"file",id:"files",accept:"image/png,image/jpeg,image/webp,image/gif",hidden:!0,multiple:!0,onChange:e=>{const t=e.target.files;if(t&&t.length>0){W(Array.from(t).map((e=>({file:e,caption:"",linkUrl:""}))));let e=[];for(let n=0;n<t.length;n++)e.push(Q(t[n]));Promise.all(e).then((e=>W(e.map(((e,n)=>({file:t[n],caption:"",linkUrl:"",data:e}))))))}}}),o.createElement("label",{htmlFor:"files",className:"select-none cursor-pointer flex items-center justify-center text-base text-tertiary h-30 border border-dashed dark:border-gray-700 rounded-md transition dark:hover:bg-gray-775"},"Drag 'n' drop some images here, or click to select images"))),o.createElement("div",{className:"flex items-center pt-5"},o.createElement("div",{className:"ml-auto flex items-center space-x-3"},o.createElement("button",{type:"button",className:mo,onClick:()=>X()},y("post.create.cancel")),o.createElement("button",{type:"submit",className:co,disabled:!A.isValid||!C||E},y("post.create.submit"),E&&o.createElement(Ga,{className:"w-5 h-5 text-primary ml-3"})))))))}function bo({server:e}){const{t:t}=$(),[n,r]=i.exports.useState(!1),[a]=il();return o.createElement(o.Fragment,null,o.createElement(fo,{open:n,setOpen:r,serverId:null==e?void 0:e.id}),o.createElement("div",{className:"p-4"},o.createElement("div",{onClick:()=>r(!0),className:"dark:bg-gray-700 h-13 flex items-center rounded transition dark:hover:bg-gray-650 cursor-pointer"},o.createElement("div",{className:"px-3 border-r dark:border-gray-650 h-7"},o.createElement(vl,{user:a,size:7})),o.createElement("div",{className:"text-sm text-secondary px-3"},t("post.createPost")))))}function xo(){$();const e=fl((e=>e.showFolders)),[t]=il(),n=i.exports.useRef(null);return Js(null),i.exports.useEffect((()=>{"default"===Notification.permission&&Notification.requestPermission().then((function(e){"granted"===e&&(({onClick:e,title:t,body:n,icon:r,timestamp:a})=>{if("granted"!==Notification.permission)return;new Notification(t,{body:n,icon:r,timestamp:a,silent:!0}).onclick=e;const l=new Audio((window.electron?".":"")+"/notification.mp3");l.volume=.5,l.play()})({title:"Notifications enabled!",icon:"/icons/icon.png"})}))})),o.createElement(o.Fragment,null,o.createElement(Ye,null,o.createElement("title",null,"Home")),o.createElement(al,{header:o.createElement(Ns,{refreshPosts:()=>{n&&n.current&&n.current.refresh()}}),rightSidebar:o.createElement(fs,{show:e})},o.createElement(Ws,{showServerName:!0,header:t?o.createElement(bo,null):null})))}function Eo({friend:e,children:t}){const{t:n}=$(),{push:r}=P();return o.createElement("div",{className:"group px-2 dark:hover:bg-gray-725 rounded-lg"},o.createElement("div",{onClick:()=>r(`/dm/${e.id}`),className:"relative h-16 py-2 flex items-center cursor-pointer group border-t dark:border-gray-700"},o.createElement("div",{className:"flex"},o.createElement(vl,{user:e,size:9,showOnline:!0,dotClassName:"w-2.5 h-2.5 ring-3 dark:ring-gray-750"}),o.createElement("div",null,o.createElement("div",{className:"text-base text-secondary font-medium ml-3"},e.name,o.createElement("span",{className:"hidden group-hover:inline-block text-13 text-tertiary font-medium"},"#",e.tag)),o.createElement("div",{className:"text-13 text-tertiary font-medium ml-3 leading-5"},e.isOnline?n("user.online"):n("user.offline")))),o.createElement("div",{className:"ml-auto flex items-center space-x-3"},t)))}const yo=N("\n  rounded-full\n  dark:bg-gray-800\n  dark:group-hover:bg-gray-900\n  h-9 w-9\n  flex\n  items-center\n  justify-center\n  text-tertiary\n");function wo({children:e,label:t,onClick:n}){const{t:r}=$();return o.createElement(D,{content:r(t)},o.createElement("div",{onClick:n,className:yo},e))}function No({friend:e}){const{t:t}=$();return o.createElement(Eo,{friend:e},o.createElement(wo,{label:"friends.sendMessage"},o.createElement(B,{className:"w-5 h-5"})),o.createElement(D,{content:t("more")},o.createElement("button",{onClick:e=>{e.stopPropagation(),e.preventDefault()},className:yo},o.createElement(he,{className:"w-5 h-5"}))))}function ko({count:e}){return o.createElement("div",{className:"text-green-400"},e)}function Co({pendingCount:e=0}){return o.createElement(xs,{icon:o.createElement(_,{className:"h-5 w-5"}),title:"Friends",showDivider:!0},o.createElement("div",{className:"flex items-center space-x-4"},o.createElement($o,{page:"Online"}),o.createElement($o,{page:"All"}),o.createElement($o,{page:"Pending",pendingCount:e}),o.createElement($o,{page:"Blocked"}),o.createElement($o,{page:"Add Friend",green:!0})))}function $o({page:e,green:t=!1,pendingCount:n=0}){const[r,a]=fl((e=>[e.friendsPage,e.setFriendsPage]));return o.createElement(Es,{page:e,green:t,currentPage:r,setCurrentPage:a},e,!!n&&o.createElement("div",{className:"ml-2"},o.createElement(ko,{count:n})))}function Io({user:e}){const[t]=ea(),[n]=na();return o.createElement(is,{data:{type:Ol,user:e}},o.createElement(Eo,{friend:e},e.relationshipStatus===Zn.FriendRequestOutgoing?o.createElement(wo,{label:"Cancel",onClick:n=>{n.stopPropagation(),t({variables:{input:{userId:e.id}}})}},o.createElement(J,{className:"w-5 h-5"})):o.createElement(o.Fragment,null,o.createElement(wo,{label:"Accept",onClick:t=>{t.stopPropagation(),n({variables:{input:{userId:e.id,accept:!0}}})}},o.createElement(W,{className:"w-5 h-5"})),o.createElement(wo,{label:"Ignore",onClick:t=>{t.stopPropagation(),n({variables:{input:{userId:e.id,accept:!1}}})}},o.createElement(J,{className:"w-5 h-5"})))))}function So({children:e}){return o.createElement("div",{className:"max-h-full h-full dark:bg-gray-750 px-6 py-4 scrollbar-custom"},e)}const Uo=N("\n  px-2\n  pb-2\n  text-11\n  text-tertiary\n  uppercase\n  tracking-wide\n  font-semibold\n  select-none\n");function Fo(){const{friends:e,outgoingFriendRequests:t,incomingFriendRequests:n,blocking:r}=(()=>{var e,t,n,r,a;const[l]=il();return{friends:null!=(e=null==l?void 0:l.relatedUsers.filter((e=>e.relationshipStatus===Zn.Friends)))?e:[],blocking:null!=(t=null==l?void 0:l.relatedUsers.filter((e=>e.relationshipStatus===Zn.Blocking)))?t:[],blockedBy:null!=(n=null==l?void 0:l.relatedUsers.filter((e=>e.relationshipStatus===Zn.Blocked)))?n:[],outgoingFriendRequests:null!=(r=null==l?void 0:l.relatedUsers.filter((e=>e.relationshipStatus===Zn.FriendRequestOutgoing)))?r:[],incomingFriendRequests:null!=(a=null==l?void 0:l.relatedUsers.filter((e=>e.relationshipStatus===Zn.FriendRequestIncoming)))?a:[]}})(),a=e.filter((e=>e.isOnline)),l=t.concat(n),s=fl((e=>e.friendsPage)),[c,m]=i.exports.useState("");return Js("friends"),o.createElement(al,{header:o.createElement(Co,{pendingCount:n.length})},o.createElement(So,null,"Online"===s&&o.createElement(o.Fragment,null,o.createElement("div",{className:Uo},"Online - ",a.length),a.map((e=>o.createElement(No,{friend:e,key:e.id})))),"All"===s&&o.createElement(o.Fragment,null,o.createElement("div",{className:Uo},"All Friends - ",e.length),e.map((e=>o.createElement(No,{friend:e,key:e.id})))),"Pending"===s&&o.createElement(o.Fragment,null,o.createElement("div",{className:Uo},"Pending Requests - ",l.length),l.map((e=>o.createElement(Io,{user:e,key:`${e.relationshipStatus===Zn.FriendRequestOutgoing?"outgoing":"incoming"}-${e.id}`})))),"Blocked"===s&&o.createElement(o.Fragment,null,o.createElement("div",{className:Uo},"Blocked Users - ",r.length)),"Add Friend"===s&&o.createElement("div",null,o.createElement("div",{className:"font-bold uppercase text-base text-primary"},"Add Friend"),o.createElement("div",{className:"text-secondary text-sm mt-3 mb-4"},"You can add a friend with their Comet Tag. It's cAsE sEnSitIvE!"),o.createElement("div",{className:"relative"},o.createElement("input",{value:c,onChange:e=>m(e.target.value),placeholder:"Enter a Username#0000",className:"w-full h-14 rounded-xl px-4 dark:bg-gray-775 border dark:border-gray-850 placeholder-gray-400 dark:placeholder-gray-600 block focus:outline-none text-base text-secondary"}),o.createElement("button",{className:"absolute right-4 text-13 text-primary font-medium bg-blue-500 rounded h-8 px-4 top-1/2 transform -translate-y-1/2 disabled:opacity-50",disabled:!c},"Send Friend Request")))))}const Po=e=>{if(!e)return We;switch(e){case"Featured":return ot;case"Arts":return st;case"Business":return lt;case"Culture":return _;case"Discussion":return B;case"Entertainment":return at;case"Gaming":return rt;case"Health":return nt;case"Hobbies":return tt;case"Lifestyle":return et;case"Memes":return qe;case"Meta":return Xe;case"News":return Ze;case"Politics":return Ke;case"Programming":return Fe;case"Science":return Ba;case"Sports":return Qe;case"Technology":return _a;case"Other":return Je}};function Mo({category:e}){const{t:t}=$(),[n,r]=fl((e=>[e.exploreCategory,e.setExploreCategory])),a=Po(e);return o.createElement(yl,{onClick:()=>r(e),active:n===e},o.createElement(a,{className:"w-5 h-5 mr-3"}),t(e?`category.${e}`:"explore.all"))}function Ro({sort:e,label:t,icon:n}){const[r,a]=fl((e=>[e.exploreSort,e.setExploreSort])),l=n;return o.createElement(yl,{onClick:()=>a(e),active:r===e},o.createElement(l,{className:"w-5 h-5 mr-3"}),t)}function Ao(){const{t:e}=$(),t=i.exports.useMemo((()=>{let e=Object.keys(er);const t=e.splice(e.indexOf(er.Other),1);return e.push(...t),e}),[]);return o.createElement(hl,null,o.createElement("div",{className:"h-12 border-b dark:border-gray-850 shadow flex items-center px-5 text-base font-medium"},o.createElement(Wa,{className:"h-4"})),o.createElement("div",{className:"px-1.5"},o.createElement(ds,null,"Sort"),o.createElement("div",{className:"space-y-0.5"},o.createElement(Ro,{label:"Most Popular",sort:"Top",icon:K}),o.createElement(Ro,{label:"Recently Created",sort:"New",icon:Z})),o.createElement(ds,null,e("explore.categories")),o.createElement("div",{className:"space-y-0.5"},o.createElement(Mo,{category:"Featured"}),o.createElement(Mo,{category:null}),t.map((e=>o.createElement(Mo,{key:e,category:e}))))))}const Lo=N("\n  absolute\n  cursor-pointer\n  select-none\n  top-32\n  -mt-4\n  hover:shadow-md\n  z-10\n  right-3\n  transition\n  flex\n  items-center\n  px-4\n  h-8\n  rounded-md\n  text-13\n  font-semibold\n  bg-gray-200\n  border-2\n  border-gray-800\n  text-gray-900\n  transform\n  hover:scale-105\n  focus:outline-none\n");function Oo({server:e,shadow:t=!1,className:r=""}){var a,l;const[s]=il(),{t:i}=$(),[c,{loading:m}]=function(e){const t={...Rn,...e};return n(ha,t)}({update(e,{data:{joinServer:t}}){const n=e.readQuery({query:Ia});e.writeQuery({query:Ia,data:{user:{...n.user,servers:[t,...n.user.servers]}}})}}),{push:d}=P();return o.createElement(b,{to:`/+${e.name}`,className:`${r} relative relative flex flex-col w-full rounded-lg group dark:bg-gray-800 dark:hover:bg-gray-850 duration-200 transform transition hover:shadow-xl ${t?"shadow-lg":""}`},o.createElement("button",{type:"button",className:Lo,onClick:t=>{t.stopPropagation(),t.preventDefault(),s&&!e.isJoined?c({variables:{input:{serverId:e.id}}}):d(`/+${e.name}`)}},!s||e.isJoined?"View":"Join",m&&o.createElement(Ga,{className:"w-4 h-4 text-gray-900 ml-2"})),o.createElement("div",{className:"h-32 rounded-t-lg w-full bg-cover bg-center bg-no-repeat relative bg-gradient-to-br from-red-400 to-indigo-600",style:(null==e?void 0:e.bannerUrl)?{backgroundImage:`url(${null==e?void 0:e.bannerUrl})`}:void 0},o.createElement("div",{className:"absolute left-4 -bottom-3"},o.createElement($s,{size:10,server:e,className:"dark:bg-gray-750 rounded-xl ring-4 dark:ring-gray-800 transition dark:group-hover:ring-gray-850 group-hover:shadow-md"}))),o.createElement("div",{className:"flex flex-col flex-grow px-4 pt-7 pb-4 h-40"},o.createElement("div",{className:"text-base font-medium text-secondary"},null==e?void 0:e.name),o.createElement("div",{className:"text-13 text-tertiary line-clamp-3 pt-1"},(null==e?void 0:e.description)||"No description"),o.createElement("div",{className:"flex space-x-6 mt-auto text-xs"},o.createElement("div",{className:"inline-flex items-center"},o.createElement("div",{className:"w-1.5 h-1.5 bg-green-600 rounded-full"}),o.createElement("div",{className:"ml-1.5 text-green-600"},i("server.onlineCount",{count:null!=(a=null==e?void 0:e.onlineCount)?a:0}))),o.createElement("div",{className:"inline-flex items-center"},o.createElement("div",{className:"w-1.5 h-1.5 bg-gray-400 rounded-full"}),o.createElement("div",{className:"ml-1.5 text-tertiary"},i("server.memberCount",{count:null!=(l=null==e?void 0:e.userCount)?l:0}))))))}function Do(){var e;const[t,n]=i.exports.useState(0),[r,a]=fl((e=>[e.exploreCategory,e.exploreSort])),{data:l}=Aa({variables:{sort:a,category:r&&"Featured"!==r?r:null,featured:"Featured"===r,page:t,pageSize:20},fetchPolicy:"no-cache",nextFetchPolicy:"cache-first"}),s=null!=(e=null==l?void 0:l.publicServers)?e:[];return o.createElement(al,{leftSidebar:o.createElement(Ao,null)},o.createElement(So,null,o.createElement("div",{className:"px-8 py-8"},o.createElement("div",{className:"grid grid-cols-1 gap-4 lg:grid-cols-3 2xl:grid-cols-5"},s.map((e=>o.createElement(Oo,{server:e,key:e.id})))),!s.length&&o.createElement(cl,null,"Nothing here yet!"))))}function To(){return o.createElement(xs,{icon:o.createElement(it,{className:"h-5 w-5"}),title:"Inbox",showDivider:!0},o.createElement("div",{className:"flex items-center space-x-4"},o.createElement(qo,{page:"Unread"}),o.createElement(qo,{page:"All"})))}function qo({page:e}){const[t,n]=fl((e=>[e.inboxPage,e.setInboxPage]));return o.createElement(Es,{page:e,currentPage:t,setCurrentPage:n})}function Ho({reply:e}){const t=fl((e=>e.inboxPage)),{comment:r}=e,{parentComment:a,post:l}=r,[s]=il(),[i]=function(e){const t={...Rn,...e};return n(ua,t)}({optimisticResponse:{markReplyRead:{...e,isRead:!0}},update(e,{data:{markReplyRead:n}}){const r={query:La,variables:{input:{userId:s.id,unreadOnly:"Unread"===t}}},a=e.readQuery(r);a&&a.replies.map((e=>e.id)).includes(n.id)&&e.writeQuery({...r,data:{replies:a.replies.filter((e=>e.id!==n.id))}})}});return o.createElement(b,{to:`${l.relativeUrl}#${r.id}`,className:"block dark:bg-gray-800 dark:hover:bg-gray-825 rounded p-3 cursor-pointer relative"},o.createElement("div",{className:"flex"},o.createElement("div",{className:"text-13 hover:underline font-medium text-tertiary pr-5 leading-5"},l.title),o.createElement("div",{className:"flex items-center ml-auto h-5"},o.createElement("div",{className:"text-mid text-13 font-medium mr-2 leading-5"},l.server.name),o.createElement($s,{server:l.server,size:5,className:"rounded-full"}))),a?o.createElement("div",null,o.createElement(jo,{comment:a}),o.createElement("div",{className:"ml-7 mt-2 border-t dark:border-gray-750"},o.createElement(jo,{comment:r}))):o.createElement(jo,{comment:r}),o.createElement("div",{className:"flex items-center pt-3 border-t dark:border-gray-750 mt-2"},o.createElement("div",{className:"flex items-center highlightable",onClick:t=>{t.stopPropagation(),t.preventDefault(),i({variables:{input:{replyId:e.id}}})}},o.createElement(W,{className:"h-5 w-5"}),o.createElement("div",{className:"ml-2 text-xs font-medium"},"Mark Read"))))}function jo({comment:e}){var t,n,r,a,l;return o.createElement("div",{className:"flex space-x-3 pt-3"},o.createElement("div",{onClick:e=>{e.stopPropagation(),e.preventDefault()}},o.createElement(is,{data:{type:Ol,user:e.author.user}},o.createElement(Ss,{user:e.author.user,roles:e.author.roles},o.createElement(vl,{user:e.author.user,size:7})))),o.createElement("div",null,o.createElement("div",{className:"flex items-end pb-1.5"},o.createElement("div",{onClick:e=>{e.stopPropagation(),e.preventDefault()}},o.createElement(is,{data:{type:Ol,user:e.author}},o.createElement(Ss,{user:null==(t=e.author)?void 0:t.user,roles:null==(n=e.author)?void 0:n.roles},o.createElement("div",{className:"text-sm font-medium cursor-pointer hover:underline leading-none "+(e.author.color?"":"text-primary"),style:{color:e.author.color}},null!=(l=null==(a=null==(r=e.author)?void 0:r.user)?void 0:a.username)?l:"[deleted]")))),o.createElement("div",{className:"text-11 text-mid font-medium pl-2 leading-none"},Us(e.createdAt))),o.createElement("div",{className:"prose prose-sm dark:prose-dark",dangerouslySetInnerHTML:{__html:e.text}})))}const zo="px-2 pb-2 text-11 text-tertiary uppercase tracking-widest font-semibold";function Bo(){var e;const t=fl((e=>e.inboxPage));Js("inbox");const[n]=il(),{data:r}=Oa({variables:{input:{unreadOnly:"Unread"===t}},skip:!n}),a=null!=(e=null==r?void 0:r.replies)?e:[];return o.createElement(al,{header:o.createElement(To,null)},o.createElement(So,null,"Unread"===t&&o.createElement(o.Fragment,null,o.createElement("div",{className:zo},"Unread - ",a.length)),"All"===t&&o.createElement(o.Fragment,null,o.createElement("div",{className:zo},"All - ",a.length)),0===a.length&&o.createElement(cl,null,"You are all caught up!"),o.createElement("div",{className:"space-y-1.5"},a.map((e=>o.createElement(Ho,{reply:e,key:e.id}))))))}function _o({server:e,children:t}){return o.createElement(Is,{className:"w-96",render:t=>o.createElement(Oo,{server:e,shadow:!0,className:"rounded-b-none lg:rounded-b-lg"})},t)}function Vo({folder:e}){const{t:t}=$(),n=i.exports.useMemo((()=>!e||e.avatarUrl?null:"Favorites"===e.name?o.createElement(A,{className:"w-1/2 h-1/2 text-yellow-500"}):"Read Later"===e.name?o.createElement(L,{className:"w-1/2 h-1/2 text-blue-500"}):o.createElement(O,{className:"w-1/2 h-1/2 text-gray-500"})),[e,t]),r="Favorites"!==(null==e?void 0:e.name)&&"Read Later"!==(null==e?void 0:e.name),[a]=Ur(),[l,s]=i.exports.useState(null);return i.exports.useEffect((()=>{if(!l)return null;a({variables:{input:{avatarFile:l,folderId:e.id}}})}),[l,a]),e?o.createElement("div",{className:"p-4"},o.createElement(is,{data:{type:jl,folder:e}},o.createElement("div",{className:"dark:bg-gray-800 p-4 flex rounded"},o.createElement("div",{className:"w-32 h-32 dark:bg-gray-750 flex items-center justify-center group relative bg-center bg-contain",style:e.avatarUrl?{backgroundImage:`url(${e.avatarUrl})`}:{}},n,r&&o.createElement(o.Fragment,null,o.createElement("input",{hidden:!0,name:"avatarFile",id:"avatarFile",type:"file",accept:"image/png,image/jpeg,image/webp,image/gif",onChange:e=>s(e.target.files[0])}),o.createElement("label",{htmlFor:"avatarFile",className:"absolute inset-0 items-center justify-center hidden bg-black bg-opacity-50 hidden group-hover:flex cursor-pointer"},o.createElement(ct,{className:"w-1/2 h-1/2 text-primary"})))),o.createElement("div",{className:"ml-6 flex flex-col py-0.5"},o.createElement("div",{className:"text-tertiary text-13 pb-1"},e.owner?t("folder.userFolder"):t("folder.serverFolder"),e.isCollaborative&&o.createElement(o.Fragment,null," · ",t("folder.collaborative"))),o.createElement("div",{className:"text-4xl font-bold text-primary"},e.name),e.description&&o.createElement("div",{className:"text-tertiary text-sm pt-2"},e.description),o.createElement("div",{className:"text-tertiary text-13 pt-3 mt-auto flex items-center"},e.owner?o.createElement(o.Fragment,null,t("folder.createdBy")," ",o.createElement(is,{data:{type:Ol,user:e.owner}},o.createElement("div",{className:"flex items-center"},o.createElement(Ss,{user:e.owner},o.createElement(vl,{user:e.owner,size:5})),o.createElement(Ss,{user:e.owner},o.createElement("span",{className:"ml-1.5 text-primary cursor-pointer hover:underline font-medium"},e.owner.name))))):o.createElement("div",{className:"flex items-center"},o.createElement(_o,{server:e.server},o.createElement($s,{className:"rounded-full",size:5,server:e.server})),o.createElement(_o,{server:e.server},o.createElement("span",{className:"ml-1.5 text-primary cursor-pointer hover:underline font-medium"},e.server.name)))," ·"," ",t("folder.postCount",{count:e.postCount}),o.createElement(is,{leftClick:!0,data:{type:jl,folder:e}},o.createElement(V,{className:"highlightable w-5 h-5 ml-2.5"}))))))):null}function Go({folder:e}){return o.createElement(xs,{showDivider:!0,title:null==e?void 0:e.name,icon:o.createElement(O,{className:"w-5 h-5"})},o.createElement("div",{className:"flex items-center space-x-4"},o.createElement(Yo,{page:"Added"},"Recently Added"),o.createElement(Yo,{page:"Top"},"Top"),o.createElement(Yo,{page:"New"},"New")),o.createElement("div",{className:"ml-auto"},o.createElement(ys,null)))}function Yo({page:e,children:t}){const[n,r]=fl((e=>[e.folderSort,e.setFolderSort]));return o.createElement(Es,{page:e,currentPage:n,setCurrentPage:r},t)}function Wo({folderId:e}){const n=fl((e=>e.showFolders)),{data:r}=function(e){const n={...Rn,...e};return t(Sa,n)}({variables:{id:e}}),a=null==r?void 0:r.folder;return Js(`folder/${e}`),o.createElement(al,{rightSidebar:o.createElement(fs,{show:n}),header:o.createElement(Go,{folder:a})},o.createElement(Ws,{showServerName:!0,folderId:e,header:o.createElement(Vo,{folder:a})}))}function Jo({user:e}){var t;return $(),o.createElement(xs,{icon:o.createElement(mt,{className:"w-5 h-5"}),title:o.createElement(o.Fragment,null,null!=(t=null==e?void 0:e.name)?t:"",o.createElement("div",{className:"w-2.5 h-2.5 ml-3 rounded-full "+((null==e?void 0:e.isOnline)?"bg-green-500":"bg-gray-600")}))})}const Qo=["application/vnd.rar","application/x-tar","application/zip","application/x-7z-compressed","application/java-archive","application/x-bzip","application/x-bzip2","application/gzip","application/x-freearc"],Ko=["application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/x-abiword","application/rtf","application/vnd.oasis.opendocument.text"],Zo=["application/xhtml+xml","application/xml","text/xml","application/json","application/ld+json","text/css","application/x-csh","text/html","text/javascript","application/x-httpd-php","application/x-sh","application/vnd.mozilla.xul+xml"],Xo=["application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.oasis.opendocument.spreadsheet"],ei=["application/vnd.ms-powerpoint","application/vnd.openxmlformats-officedocument.presentationml.presentation","application/vnd.oasis.opendocument.presentation"],ti=e=>i.exports.useMemo((()=>e?e.startsWith("audio")?dt:e.startsWith("image")?ut:e.startsWith("video")?pt:"text/csv"===e?gt:"application/pdf"===e?vt:Ko.includes(e)?ht:Xo.includes(e)?ft:ei.includes(e)?bt:Qo.includes(e)?xt:Zo.includes(e)?Et:yt:null),[e]);function ni({message:e}){const[t,n]=i.exports.useState(!1);return e.image?o.createElement("div",{className:"pt-1"},o.createElement("img",{onClick:()=>n(!0),src:e.image.smallUrl,alt:"",className:"rounded cursor-pointer",width:e.image.smallWidth,height:e.image.smallHeight}),o.createElement(us,{closeOnOverlayClick:!0,close:()=>n(!1),isOpen:t},o.createElement("div",{className:"mx-auto"},o.createElement("div",{className:"text-left"},o.createElement("img",{onClick:e=>e.stopPropagation(),src:e.image.popupUrl,alt:"",width:e.image.popupWidth,height:e.image.popupHeight}),o.createElement("div",{className:"pt-1"},o.createElement("a",{href:e.image.originalUrl,className:"hover:underline cursor-pointer text-mid font-semibold text-13 focus:outline-none",target:"_blank",rel:"noreferrer noopener",onClick:e=>e.stopPropagation()},"Open original")))))):null}var ri=i.exports.memo((function({index:e,message:t,prevMessage:n,server:r}){var a,l,s,c,m;const[d]=il(),u=t.isEveryoneMentioned||t.mentionedUsers.map((e=>e.id)).includes(null==d?void 0:d.id),p=ti(null==(a=null==t?void 0:t.file)?void 0:a.mime),g=i.exports.useCallback((e=>{var t,n;const r=null==(n=null==(t=e.target)?void 0:t.dataset)?void 0:n.mention;r&&r.substring(2,r.length-1)}),[t]),v=0===e||n&&(!n.text||n.author.id!==t.author.id);return"Join"===t.type?o.createElement(is,{className:(null==n?void 0:n.text)?"pt-4":"",data:{type:ql,message:t}},o.createElement("div",{className:"flex dark:hover:bg-gray-775 py-1 px-4"},o.createElement("div",{className:"w-10 flex justify-center"},o.createElement(wt,{className:"w-5 h-5 text-green-500"})),o.createElement("div",{className:"pl-4 text-base text-tertiary"},o.createElement(is,{className:"inline-block",data:{type:Ol,user:t.author}},o.createElement(Ss,{user:t.author,roles:null==(l=t.serverUser)?void 0:l.roles},o.createElement("span",{className:"text-white cursor-pointer hover:underline"},t.author.username)))," ","has joined the ",t.serverUser?"planet":"group",o.createElement("span",{className:"pl-2 text-11 whitespace-nowrap text-mid cursor-default leading-5 select-none"},Fs(t.createdAt))))):o.createElement("div",{className:""+(v?"pt-4":"")},o.createElement(is,{data:{type:ql,message:t,server:r}},o.createElement("div",{className:"flex py-1 px-4 dark:hover:bg-gray-775 group relative"},u&&o.createElement("div",{className:"bg-gray-500 group-hover:bg-opacity-30 bg-opacity-10 absolute inset-0 pointer-events-none border-l-2 border-gray-500"}),v?o.createElement(is,{data:{type:Ol,user:t.author}},o.createElement(Ss,{user:t.author,roles:null==(s=t.serverUser)?void 0:s.roles},o.createElement(vl,{user:t.author,size:10,className:"dark:bg-gray-700 cursor-pointer"}))):o.createElement("div",{className:"w-10 text-11 whitespace-nowrap text-mid group-hover:opacity-100 opacity-0 cursor-default select-none leading-6.5"},Fs(t.createdAt)),o.createElement("div",{className:"pl-4 w-full"},v&&o.createElement("div",{className:"flex items-end pb-0.5"},o.createElement(is,{data:{type:Ol,user:t.author}},o.createElement(Ss,{user:t.author,roles:null==(c=t.serverUser)?void 0:c.roles},o.createElement("div",{className:"text-base font-medium cursor-pointer hover:underline leading-none"},t.author.username))),o.createElement("div",{className:"text-11 text-mid pl-2 leading-none cursor-default select-none"},Us(t.createdAt))),!!t.text&&o.createElement("div",{onClick:g,className:"prose prose-sm dark:prose-dark focus:outline-none max-w-none",dangerouslySetInnerHTML:{__html:t.text}}),!!(null==(m=t.linkMetadatas)?void 0:m.length)&&o.createElement(o.Fragment,null,t.linkMetadatas.map(((e,t)=>o.createElement("div",{key:t,className:"py-1.5 max-w-screen-sm w-full"},o.createElement(Gs,{dark:!0,metadata:e,linkUrl:e.url}))))),o.createElement(ni,{message:t}),!!t.file&&o.createElement("div",{className:"pt-1 max-w-screen-sm w-full"},o.createElement("div",{className:"flex border dark:border-gray-850 dark:bg-gray-800 p-3 rounded w-full items-center"},o.createElement(p,{className:"w-8 h-8 dark:text-white"}),o.createElement("div",{className:"pl-3"},o.createElement("a",{href:t.file.url,target:"_blank",rel:"noreferrer noopener",className:"block text-base text-accent hover:underline cursor-pointer truncate"},t.file.filename),o.createElement("div",{className:"text-mid text-xs"},function(e,t=2){if(0===e)return"0 Bytes";const n=t<0?0:t,r=Math.floor(Math.log(e)/Math.log(1024));return parseFloat((e/Math.pow(1024,r)).toFixed(n))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][r]}(t.file.size))),o.createElement("a",{className:"block ml-auto",href:t.file.url,target:"_blank",rel:"noreferrer noopener"},o.createElement(Nt,{className:"h-6 w-6 highlightable"}))))))))}));const ai=({channelId:e,groupId:n,userId:r})=>{var a;const l={channelId:e,groupId:n,userId:r},{data:s,fetchMore:o,loading:i}=function(e){const n={...Rn,...e};return t(Fa,n)}({variables:{...l,cursor:null},fetchPolicy:"network-only",nextFetchPolicy:"cache-first"}),c=null==s?void 0:s.messages.hasMore,m=null!=(a=null==s?void 0:s.messages.messages)?a:[];return[m,i,()=>{c&&0!==m.length&&o({variables:{...l,cursor:m[0].id},updateQuery:(e,{fetchMoreResult:t})=>({messages:{hasMore:t.messages.hasMore,messages:[...t.messages.messages,...e.messages.messages]}})})},c]},li=e=>N(`\n  ${e?"scale-100":"scale-0"}\n  transform\n  transition\n  bg-gradient-to-br\n  from-red-400\n  to-indigo-600\n  rounded-xl\n  p-3\n  max-w-sm\n  w-full\n  relative\n`);function si({placeholder:e,setFiles:t}){const[n,r]=(()=>{const[e,t]=i.exports.useState(null),[n,r]=i.exports.useState(!1),a=i.exports.useRef(0),l=i.exports.useCallback((e=>{e.preventDefault(),e.stopPropagation()}),[]),s=i.exports.useCallback((e=>{e.preventDefault(),e.stopPropagation(),a.current++,e.dataTransfer.items&&e.dataTransfer.items.length>0&&r(!0)}),[]),o=i.exports.useCallback((e=>{e.preventDefault(),e.stopPropagation(),a.current--,a.current>0||r(!1)}),[]),c=i.exports.useCallback((e=>{e.preventDefault(),e.stopPropagation(),r(!1),e.dataTransfer.files&&e.dataTransfer.files.length>0&&(a.current=0,t(e.dataTransfer.files),e.dataTransfer.clearData())}),[]);return i.exports.useEffect((()=>(window.addEventListener("dragenter",s),window.addEventListener("dragleave",o),window.addEventListener("dragover",l),window.addEventListener("drop",c),function(){window.removeEventListener("dragenter",s),window.removeEventListener("dragleave",o),window.removeEventListener("dragover",l),window.removeEventListener("drop",c)}))),[e,n]})();return i.exports.useEffect((()=>t(n)),[n,t]),o.createElement(o.Fragment,null,o.createElement("div",{className:(a=r,N(`\n  fixed\n  inset-0\n  transition-all\n  bg-black\n  ${a?"visible bg-opacity-75":"invisible bg-opacity-0"}\n  flex\n  items-center\n  justify-center\n`)),style:{zIndex:999999}},o.createElement("div",{className:li(r)},o.createElement("div",{className:"flex absolute left-1/2 transform top-0 -translate-x-1/2 -translate-y-1/2 transition delay-75 "+(r?"scale-100":"scale-0")},o.createElement("div",{className:"relative transform translate-x-6 translate-y-3 -rotate-12"},o.createElement("div",{className:"absolute left-5 top-9 w-14 h-14 bg-red-400",style:{zIndex:-1}}),o.createElement(Et,{className:"w-24 h-24"})),o.createElement("div",{className:"relative"},o.createElement("div",{className:"absolute left-5 top-9 w-14 h-14 bg-red-400",style:{zIndex:-1}}),o.createElement(pt,{className:"w-24 h-24 "})),o.createElement("div",{className:"relative transform -translate-x-6 translate-y-3 rotate-12"},o.createElement("div",{className:"absolute left-5 top-8 w-14 h-14 bg-red-400",style:{zIndex:-1}}),o.createElement(ut,{className:"w-24 h-24"}))),o.createElement("div",{className:"rounded-xl border-dashed border-white border-2 px-4 pb-4 pt-16 text-center"},o.createElement("div",{className:"text-xl font-bold text-primary"},"Upload to ",o.createElement("span",{className:"text-white"},e))))));var a}const oi=e=>new Promise(((t,n)=>{const r=new FileReader;r.onload=e=>t(e.target.result),r.onerror=e=>n(e),r.readAsDataURL(e)})),ii=N("\n  text-sm\n  text-primary\n  h-10\n  px-7\n  hover:underline\n  focus:outline-none\n  select-none\n  disabled:opacity-50\n  disabled:no-underline\n  disabled:cursor-not-allowed\n"),ci=N("\n  text-sm\n  text-primary\n  transition\n  bg-blue-500\n  hover:bg-blue-600\n  flex\n  items-center\n  justify-center\n  rounded\n  px-7\n  h-10\n  focus:outline-none\n  select-none\n  disabled:opacity-50\n  disabled:cursor-not-allowed\n");function mi({createMessage:e,variables:t,file:n,setFileIndex:r,placeholder:a,multiple:l,cancelAll:s}){var c;const[m,d]=i.exports.useState(""),u=(e=>{const[t,n]=i.exports.useState(null);return i.exports.useEffect((()=>{e&&(e.type.startsWith("image")?oi(e).then((e=>n(e))).catch((()=>n(null))):n(null))}),[e]),t})(n),[p,g]=i.exports.useState(!1),v=i.exports.useCallback((()=>{p||r((e=>e+1))}),[r,p]),h=i.exports.useCallback((()=>{g(!0),e({variables:{input:{text:m||null,file:n,...t}}}).then((()=>{g(!1),v()}))}),[v,m,n,t,e]);i.exports.useEffect((()=>d("")),[n]);const f=i.exports.useCallback((e=>{"Enter"===e.key&&n&&h()}),[h,n]);i.exports.useEffect((()=>(document.body.addEventListener("keydown",f),()=>{document.body.removeEventListener("keydown",f)})),[f]);const b=ti(null==n?void 0:n.type);return o.createElement(us,{close:v,isOpen:!!n},o.createElement("div",{className:"text-left relative w-full rounded-xl dark:bg-gray-750 max-w-lg mx-auto"},o.createElement("div",{className:"absolute left-5 -top-20 flex w-46 h-40"},u&&o.createElement("img",{alt:"",src:u,className:"absolute max-w-full max-h-full bottom-0 left-0 rounded shadow-md object-cover"}),!u&&b&&o.createElement(b,{className:"h-full w-full text-white absolute bottom-0 left-0 transform -translate-x-8"})),o.createElement("div",{className:"px-5 pt-24 pb-5"},o.createElement(ps,{className:"truncate text-left text-xl text-primary font-semibold select-none"},null!=(c=null==n?void 0:n.name)?c:""),o.createElement("div",{className:"text-tertiary text-13 pb-5 pt-0.5 select-none"},"Upload to"," ",o.createElement("span",{className:"font-medium text-secondary"},a)),o.createElement("label",{htmlFor:"comment",className:"block uppercase text-xs font-medium text-secondary pb-1.5"},"Add a Comment ",o.createElement("span",{className:"text-tertiary"},"(Optional)")),o.createElement("input",{className:"h-10 rounded-lg dark:bg-gray-700 w-full focus:outline-none px-4 text-secondary text-base",id:"comment",value:m,onChange:e=>{const t=e.target.value;d(t)}})),o.createElement("div",{className:"flex p-4 dark:bg-gray-775 rounded-b-xl"},o.createElement("div",{className:"ml-auto"}),l&&o.createElement("button",{className:ii,onClick:()=>{s()},disabled:p},"Cancel All"),o.createElement("button",{className:ii,onClick:v,disabled:p},"Cancel"),o.createElement("button",{className:ci,disabled:!n||p,onClick:h},"Upload",p&&o.createElement("div",{className:"ml-3"},o.createElement(Ga,null))))))}const di=({channel:e,group:t,user:a,users:l})=>{const{t:s}=$(),[o]=il(),[c,m]=i.exports.useState(new Set),[d]=function(e){const t={...Rn,...e};return n(_r,t)}(),u={userId:null==a?void 0:a.id,groupId:null==t?void 0:t.id,channelId:null==e?void 0:e.id};!function(e){const t={...Rn,...e};r(ja,t)}({variables:u,skip:!e&&!t&&!a,onSubscriptionData({subscriptionData:{data:{typingUpdated:{typingUserId:e,isTyping:t}}}}){t?(m((t=>new Set(t.add(e)))),setTimeout((()=>m((t=>new Set([...t].filter((t=>t!==e)))))),3e3)):m((t=>new Set([...t].filter((t=>t!==e)))))}});return[()=>d({variables:{input:u}}),i.exports.useMemo((()=>{const e=[...c].filter((e=>e!==o.id)).map((e=>{var t;return null==(t=a.find((t=>t.id===e)))?void 0:t.name})).filter((e=>!!e)).map((e=>`<span style="font-weight: 600" class="text-primary">\n          &nbsp;${e}&nbsp;\n        </span>`));return 0===e.length?null:1===e.length?s("message.typing.one",{name:e[0]}):2===e.length?s("message.typing.two",{name1:e[0],name2:e[1]}):3===e.length?s("message.typing.three",{name1:e[0],name2:e[1],name3:e[2]}):s("message.typing.several")}),[c,o,s])]},ui=kt.create({name:"mention",defaultOptions:{HTMLAttributes:{},suggestion:{char:"@",command:({editor:e,range:t,props:n})=>{e.chain().focus().replaceRange(t,"mention",n).insertContent(" ").run()},allow:({editor:e,range:t})=>e.can().replaceRange(t,"mention")}},group:"inline",inline:!0,selectable:!1,atom:!0,addAttributes:()=>({id:{default:null,parseHTML:e=>({id:e.getAttribute("data-mention")}),renderHTML:e=>e.id?{"data-mention":e.id}:{}},name:{default:null,parseHTML:e=>({name:e.getAttribute("data-mention")}),renderHTML:()=>({})}}),parseHTML:()=>[{tag:"span[data-mention]"}],renderHTML({node:e,HTMLAttributes:t}){return["span",xe(this.options.HTMLAttributes,t),`@${e.attrs.name}`]},renderText:({node:e})=>`@${e.attrs.name}`,addKeyboardShortcuts(){return{Backspace:()=>this.editor.commands.command((({tr:e,state:t})=>{let n=!1;const{selection:r}=t,{empty:a,anchor:l}=r;return!!a&&(t.doc.nodesBetween(l-1,l,((t,r)=>{if("mention"===t.type.name)return n=!0,e.insertText(this.options.suggestion.char||"",r,r+t.nodeSize),!1})),n)}))}},addProseMirrorPlugins(){return[Ct({editor:this.editor,...this.options.suggestion})]}});class pi extends i.exports.Component{constructor(e){super(e),this.state={selectedIndex:0}}componentDidUpdate(e){this.props.users!==e.users&&this.setState({selectedIndex:0})}onKeyDown({event:e}){return"ArrowUp"===e.key?(this.upHandler(),!0):"ArrowDown"===e.key?(this.downHandler(),!0):"Enter"===e.key&&(e.stopPropagation(),this.enterHandler(),!0)}upHandler(){this.setState({selectedIndex:(this.state.selectedIndex+this.props.users.length-1)%this.props.users.length})}downHandler(){this.setState({selectedIndex:(this.state.selectedIndex+1)%this.props.users.length})}enterHandler(){this.selectItem(this.state.selectedIndex)}selectItem(e){const t=this.props.users[e];t&&this.props.command("string"==typeof t?{id:`<${t}>`,name:t.substring(1)}:{id:`<@${t.user.id}>`,name:t.name})}render(){return o.createElement("div",{className:"relative w-full w-72 rounded dark:bg-gray-800 text-primary overflow-hidden text-sm shadow-md"},this.props.users.filter((e=>("string"==typeof e?e.substring(1):e.username).toLowerCase().startsWith(this.props.query.toLowerCase()))).slice(0,5).map(((e,t)=>o.createElement("button",{className:"block w-full text-left bg-transparent border-none px-2 py-2 dark:hover:bg-gray-775 focus:outline-none "+(t===this.state.selectedIndex?"dark:bg-gray-775":""),key:"string"==typeof e?e:e.id,onClick:()=>this.selectItem(t)},"string"==typeof e?e:e.username))))}}function gi({channel:e,group:t,user:n,users:r}){const{t:a}=$(),l=(({channel:e,group:t,user:n})=>i.exports.useMemo((()=>e?`#${e.name}`:t?`${t.name}`:n?`@${n.name}`:""),[e,t,n]))({channel:e,group:t,user:n}),s=Ee({autofocus:!0,extensions:[ye.configure({horizontalRule:!1,bulletList:!1,orderedList:!1,listItem:!1,heading:!1}),we,$t.configure({placeholder:`${a("message.message")} ${l}`}),It.create({addKeyboardShortcuts:()=>({Enter:({editor:e})=>{let t=e.getHTML();if(!(0===e.state.doc.textContent.length)){const n=/^<p>|<\/p>$/gi,r=/^\s*(?:<br\s*\/?\s*>)+|(?:<br\s*\/?\s*>)+\s*$/gi;t=t.replace(n,""),t=t.replace(r,""),f({variables:{input:{text:t,...b}}}),e.commands.clearContent()}return!0}})}),ui.configure({suggestion:{allowSpaces:!0,render:()=>{let e,t;return{onStart:n=>{e=new St(pi,{props:{...n,users:["@everyone"].concat(r)},editor:n.editor}),t=Ut("body",{getReferenceClientRect:n.clientRect,appendTo:()=>document.body,content:e.element,showOnCreate:!0,interactive:!0,trigger:"manual",placement:"bottom-start",render(e){const t=document.createElement("div"),n=document.createElement("div");return t.appendChild(n),n.innerHTML="",n.appendChild(e.props.content),{popper:t,onUpdate:function(e,t){e.content!==t.content&&(n.innerHTML="",n.appendChild(t.content))}}}})},onUpdate(n){e.updateProps(n),t[0].setProps({getReferenceClientRect:n.clientRect})},onKeyDown(t){var n;return null==(n=e.ref)?void 0:n.onKeyDown(t)},onExit(){t[0].destroy(),e.destroy()}}}}})],content:"",editorProps:{attributes:{class:"prose prose-sm dark:prose-dark focus:outline-none max-w-none"}}}),[c,m]=di({channel:e,group:t,user:n,users:r}),[d,u]=i.exports.useState(null),[p,g]=i.exports.useState(null),[v,h]=i.exports.useState(0),[f]=Tr({update(r,{data:{createMessage:a}}){const l=null==e?void 0:e.id,s=null==t?void 0:t.id,o=null==n?void 0:n.id,i={query:Fa,variables:{userId:o,groupId:s,channelId:l,cursor:null}},c=r.readQuery(i);c&&!c.messages.messages.map((e=>e.id)).includes(a.id)&&r.writeQuery({...i,data:{messages:{...c.messages,messages:[...c.messages.messages,a]}}})}}),b={channelId:null==e?void 0:e.id,groupId:null==t?void 0:t.id,userId:null==n?void 0:n.id},x=i.exports.useCallback((e=>{const t=e.clipboardData.files;if(t&&t.length>0)u(t),e.preventDefault();else{e.clipboardData.getData("text")&&(null==s||s.commands.focus())}}),[s]);i.exports.useEffect((()=>(document.body.addEventListener("paste",x),()=>{document.body.removeEventListener("paste",x)})),[x]),i.exports.useEffect((()=>{d&&(g(d[0]),h(0))}),[d]),i.exports.useEffect((()=>{if(!d)return;let e;return v>=d.length?(u(null),g(null),h(0)):(g(null),e=setTimeout((()=>g(d[v])),300)),()=>{e&&clearTimeout(e)}}),[v]);const E=i.exports.useCallback((()=>{u(null),g(null),h(0)}),[u,g,h]);return i.exports.useEffect((()=>{setTimeout((()=>{var e;return null==(e=null==s?void 0:s.commands)?void 0:e.clearContent()}))}),[n,t,e]),o.createElement(o.Fragment,null,o.createElement(si,{placeholder:l,setFiles:u}),o.createElement(mi,{createMessage:f,variables:b,file:p,setFileIndex:h,placeholder:l,multiple:d&&d.length>1,cancelAll:E}),o.createElement("div",{className:"px-4 dark:bg-gray-750 relative",onKeyPress:()=>c()},o.createElement("div",{className:"relative"},o.createElement(D,{content:a("message.upload")},o.createElement("div",{className:"block absolute left-4.5 top-1/2 transform -translate-y-1/2"},o.createElement("input",{className:"hidden",id:"file",name:"file",type:"file",onChange:e=>u(e.target.files),multiple:!0}),o.createElement("label",{htmlFor:"file",className:"text-tertiary highlightable"},o.createElement(Ft,{className:"w-5 h-5"})))),o.createElement("div",{className:"px-14 min-h-[3rem] max-h-[20rem] overflow-y-auto scrollbar-light py-3 w-full dark:bg-gray-700 rounded-lg text-base focus:outline-none text-secondary border-none"},o.createElement(ke,{editor:s}))),o.createElement("div",{className:"h-6 flex items-center text-secondary text-xs",dangerouslySetInnerHTML:{__html:m}})))}function vi({user:e,channel:t,group:n,show:r=!1}){return o.createElement("div",{className:"px-4 flex items-end messages-start "+(r?"opacity-100":"opacity-0")},o.createElement("div",null,!!e&&o.createElement(o.Fragment,null,o.createElement(vl,{user:e,size:20}),o.createElement("div",{className:"text-3xl font-bold pt-4 text-primary"},e.name),o.createElement("div",{className:"pt-2 text-tertiary select-none text-base"},"This is the beginning of your direct message history with"," ",o.createElement("span",{className:"font-semibold"},"@",e.name))),!!t&&o.createElement(o.Fragment,null,o.createElement("div",{className:"rounded-full flex items-center justify-center w-20 h-20 dark:bg-gray-700"},o.createElement(Ya,{className:"w-2/3 h-2/3 text-primary"})),o.createElement("div",{className:"text-3xl font-bold pt-4 text-primary"},"Welcome to #",t.name,"!"),o.createElement("div",{className:"pt-2 text-tertiary select-none text-base"},"This is the start of the #",t.name," channel.")),!!n&&o.createElement(o.Fragment,null,o.createElement("div",{className:"rounded-full flex items-center justify-center w-20 h-20 dark:bg-gray-700"},o.createElement(Pt,{className:"w-2/3 h-2/3 text-primary"})),o.createElement("div",{className:"text-3xl font-bold pt-4 text-primary"},n.name),o.createElement("div",{className:"pt-2 text-tertiary select-none text-base"},"Welcome to the beginning of the"," ",o.createElement("span",{className:"font-semibold"},n.displayName)," group."))))}function hi({channel:e,server:t,user:r,group:a,users:l}){const[s]=il(),[c]=ia(),[m]=function(e){const t={...Rn,...e};return n(Or,t)}(),[d]=function(e){const t={...Rn,...e};return n(Er,t)}(),u=i.exports.useRef(null),[p,g,v,h]=ai({channelId:null==e?void 0:e.id,userId:null==r?void 0:r.id,group:null==a?void 0:a.id}),[f,b]=i.exports.useState((null==p?void 0:p.length)||0),x=Mt(f);i.exports.useEffect((()=>{b((null==p?void 0:p.length)||0),0===x&&u.current.scrollBy({top:1e7}),s&&(e&&d({variables:{input:{channelId:e.id}},optimisticResponse:{readChannel:{...e,isUnread:!1}}}),a&&m({variables:{input:{groupId:a.id}},optimisticResponse:{readGroup:{...a,unreadCount:0}}}),r&&c({variables:{input:{userId:r.id}},optimisticResponse:{readDm:{...r,unreadCount:0}}}))}),[e,r,a]);const{atBottom:E,newMessagesNotification:y,setNewMessagesNotification:w}=function(e){const[t]=il(),[n,r]=i.exports.useState(!1),a=i.exports.useRef(""),l=i.exports.useRef(!1);return i.exports.useEffect((()=>{var n;if(!(null==e?void 0:e.length))return;const s=e[e.length-1],o=a.current;a.current=s.id||"",s.id!==o&&(l.current||(null==(n=s.author)?void 0:n.id)!==t.id&&r(!0))}),[t,e]),{atBottom:l,newMessagesNotification:n,setNewMessagesNotification:r}}(p),N=function(e){var t;const n=null==(t=null==e?void 0:e[0])?void 0:t.id,r=i.exports.useRef(n),a=i.exports.useRef(n),l=i.exports.useRef(0);return i.exports.useMemo((()=>{if(!e||!e.length)return 0;if(n===a.current)return l.current;r.current||(r.current=n),a.current=n;for(let t=l.current;t<e.length;t+=1)if(e[t].id===r.current)return l.current=t,t;return 0}),[e,null==e?void 0:e.length])}(p),k=function(e){const[t]=il(),n=i.exports.useRef(""),r=i.exports.useRef(!1);function a(){var r;if(e&&e.length>0){const a=e[e.length-1];if((null==(r=a.author)?void 0:r.id)===(null==t?void 0:t.id)&&n.current!==a.id)return n.current=a.id,!0}return!1}return i.exports.useEffect((()=>{e&&e.length&&!r.current&&(r.current=!0,a())}),[e,null==e?void 0:e.length]),a}(p),C=i.exports.useCallback(((e,n)=>{const r=n+N-1e7,a=e[r],l=r>0?e[r-1]:null;return a?o.createElement(ri,{server:t,message:a,index:r,prevMessage:l}):o.createElement("div",{style:{height:"1px"}})}),[N]);return o.createElement(o.Fragment,null,o.createElement("div",{className:"relative flex-1 overflow-x-hidden overflow-y-auto dark:bg-gray-750 w-full h-full"},o.createElement(fe,{className:"scrollbar-custom",alignToBottom:!0,atBottomStateChange:e=>{E.current=e,e&&y&&w(!1)},components:{Header:()=>o.createElement(vi,{user:r,group:a,channel:e,show:!h}),Footer:()=>o.createElement("div",{className:"h-5.5"})},firstItemIndex:1e7-N,followOutput:e=>(k()||!!e)&&"auto",initialTopMostItemIndex:p&&p.length>0?p.length-1:0,itemContent:e=>C(p,e),overscan:0,ref:u,startReached:()=>{!g&&h&&v()},style:{overflowX:"hidden"},totalCount:(null==p?void 0:p.length)||0})),!!l&&o.createElement(gi,{channel:e,user:r,group:a,users:l}))}function fi({username:e}){const{data:t}=Ha({variables:{username:e}}),[r]=function(e){const t={...Rn,...e};return n(ca,t)}(),a=null==t?void 0:t.user;i.exports.useEffect((()=>{a&&(a.showChat||r({variables:{input:{userId:a.id}}}))}),[a]),Js(`dm/@${e}`);const[l]=il();return o.createElement(al,{header:o.createElement(Jo,{user:a})},!!a&&o.createElement(hi,{user:a,users:[a,l]}))}function bi({user:e,color:t,roles:n=[]}){return o.createElement(is,{data:{type:Ol,user:e}},o.createElement(Ss,{user:e,roles:n,placement:"left"},o.createElement(yl,{small:!0},o.createElement(vl,{user:e,size:6,showOnline:!0,dotClassName:"w-2 h-2 ring-2 dark:ring-gray-800"}),o.createElement("div",{className:"ml-3 font-medium text-tertiary"},e.username))))}var xi=i.exports.forwardRef((({users:e},t)=>{const n=fl((e=>e.showUsers));return o.createElement(hl,{right:!0,ref:t,show:n},o.createElement("div",{className:"px-1.5"},o.createElement(ds,null,"IN THIS GROUP"),e.map((e=>o.createElement(bi,{key:e.id,user:e})))))}));function Ei(){const[e,t]=fl((e=>[e.showUsers,e.setShowUsers])),{t:n}=$();return o.createElement(D,{content:n(e?"user.hideUsers":"user.showUsers")},o.createElement("div",{className:"highlightable",onClick:()=>t(!e)},o.createElement(Pt,{className:"w-5 h-5"})))}function yi(){const{groupId:e}=Rt();Js(`group/${e}`);const[t]=il(),n=t.groups.find((t=>t.id===e));return o.createElement(al,{header:o.createElement(xs,{icon:o.createElement(Pt,{className:"w-5 h-5 text-primary"}),title:n.displayName},o.createElement(Ei,null)),rightSidebar:o.createElement(xi,{users:n.users})},!!n&&o.createElement(hi,{group:n,users:n.users}))}function wi({server:e}){var t,n;const[r]=il(),a=null!=(t=null==r?void 0:r.folders)?t:[],l=null!=(n=null==e?void 0:e.folders)?n:[],s=fl((e=>e.showFolders));return o.createElement(hl,{right:!0,show:s},o.createElement("div",{className:"px-1.5"},o.createElement(vs,{server:e}),l.length>0&&o.createElement("div",{className:"space-y-0.5"},!!l&&l.map((t=>o.createElement(cs,{key:t.id,folder:t,server:e})))),o.createElement(vs,null),o.createElement("div",{className:"space-y-0.5"},a.map((e=>o.createElement(cs,{key:e.id,folder:e}))))))}const Ni=e=>{const{serverId:t}=Rt(),n=fl((e=>e.setServerPage));i.exports.useEffect((()=>n(t,e)))};function ki({server:e}){const t=i.exports.useRef(null);return Ni("posts"),o.createElement(al,{header:o.createElement(Ns,{refreshPosts:()=>{t&&t.current&&t.current.refresh()}}),rightSidebar:o.createElement(wi,{server:e})},o.createElement(Ws,{serverId:null==e?void 0:e.id,header:o.createElement(bo,{server:e})}))}function Ci({server:e,folder:t}){return Ni(`folder/${t.id}`),o.createElement(al,{rightSidebar:o.createElement(wi,{server:e}),header:o.createElement(Go,{folder:t})},o.createElement(Ws,{folderId:t.id,header:o.createElement(Vo,{folder:t})}))}function $i({post:e,users:t=[]}){var n,r,a;const{t:l}=$(),s=fl((e=>e.showUsers));return o.createElement(hl,{right:!0,show:s},o.createElement("div",{className:"px-1"},(null==e?void 0:e.author)&&o.createElement(o.Fragment,null,o.createElement(ds,null,l("post.creator")),o.createElement(bi,{user:null==(n=e.author)?void 0:n.user,color:null==(r=e.author)?void 0:r.color,roles:null==(a=e.author)?void 0:a.roles})),t&&t.length>0&&o.createElement(o.Fragment,null,o.createElement(ds,null,l("post.participantCount",{count:t.length})),t.map((e=>o.createElement(bi,{key:e.user.id,user:e.user,color:e.color,roles:e.roles}))))))}const Ii=e=>{if(!e.childComments||0===e.childComments.length)return 0;let t=0;return e.childComments.forEach((e=>{t++,e.childCount=Ii(e),t+=e.childCount})),t},Si=e=>((e=(e=>{const t=Object.create(null);e.forEach((e=>t[e.id]={...e,childComments:[]}));const n=[];return e.forEach((e=>{e.parentComment?t[e.parentComment.id].childComments.push(t[e.id]):n.push(t[e.id])})),n})(e)).forEach((e=>e.childCount=Ii(e))),e),Ui=N("\n  text-base\n  text-primary\n  disabled:opacity-50\n  dark:disabled:bg-gray-600\n  bg-green-600\n  rounded\n  px-3\n  h-8\n  flex\n  items-center\n  disabled:cursor-not-allowed\n  focus:outline-none\n"),Fi=N("\n  text-base\n  text-tertiary\n  focus:outline-none\n  px-2\n  h-8\n  flex\n  items-center\n");function Pi({postId:e,parentCommentId:t,setOpen:r}){const[a,l]=i.exports.useState(""),[s,{loading:c}]=function(e){const t={...Rn,...e};return n(yr,t)}({update(t,{data:{createComment:n}}){const r=t.readQuery({query:$a,variables:{postId:e}});t.writeQuery({query:$a,variables:{postId:e},data:{comments:[n,...r.comments]}})}}),{t:m}=$();return o.createElement("div",{className:"max-w-screen-md w-full"},o.createElement(Ks,{text:a,setText:l}),o.createElement("div",{className:"flex justify-end space-x-3 items-center pt-3"},o.createElement("button",{className:Fi,onClick:()=>{r(!1),l("")}},m("comment.create.cancel")),o.createElement("button",{className:Ui,disabled:!a||c,onClick:()=>{s({variables:{input:{postId:e,text:a,parentCommentId:t}}}).then((()=>{r(!1),l("")}))}},m("comment.create.submit"),c&&o.createElement(Ga,{className:"w-5 h-5 text-primary ml-3"}))))}const Mi=N("\n  ml-4\n  text-xs\n  text-gray-500\n  hover:text-gray-700\n  dark:hover:text-gray-300\n  font-medium\n  leading-none\n  select-none\n  cursor-pointer\n");function Ri({comment:e,post:t,level:n=0,setParentComment:r,isLast:a}){var l,s,c,m,d,u,p,g;const{t:v}=$(),[h,f]=wl({server:t.server,permissions:[nr.CreateComment,nr.VoteComment]}),[b,x]=i.exports.useState(!1),[E,y]=fl((e=>[e.replyingCommentId,e.setReplyingCommentId])),w=E===e.id;return o.createElement("div",{className:"relative rounded dark:bg-gray-800 "+(0===n?"":"pl-4")},o.createElement("div",{id:e.id}),o.createElement(is,{data:{type:Tl,comment:e}},o.createElement("div",{className:"flex px-3 pt-3"},o.createElement(is,{data:{type:Ol,user:e.author}},o.createElement(Ss,{user:null==(l=e.author)?void 0:l.user,roles:null==(s=e.author)?void 0:s.roles},o.createElement(vl,{size:7,className:"cursor-pointer transition hover:opacity-90",user:null==(c=e.author)?void 0:c.user}))),o.createElement("div",{className:"pl-3 pb-3 w-full "+(!e.childComments.length&&!a||b?"":"border-b dark:border-gray-750")},o.createElement("div",{className:"flex items-end pb-1.5"},o.createElement(is,{data:{type:Ol,user:e.author}},o.createElement(Ss,{user:null==(m=e.author)?void 0:m.user,roles:null==(d=e.author)?void 0:d.roles},o.createElement("div",{className:"text-sm font-medium cursor-pointer hover:underline leading-none "+(e.author.color?"":"text-primary"),style:{color:e.author.color}},null!=(g=null==(p=null==(u=e.author)?void 0:u.user)?void 0:p.username)?g:"[deleted]"))),o.createElement("div",{className:"text-11 text-mid font-medium pl-2 leading-none"},Us(e.createdAt))),o.createElement("div",{className:"prose prose-sm dark:prose-dark max-w-none",dangerouslySetInnerHTML:{__html:e.text}}),o.createElement("div",{className:"flex items-center pt-2"},o.createElement(Ai,{comment:e,canVote:f}),h&&o.createElement("div",{className:Mi,onClick:()=>{y(w?null:e.id)}},v(w?"comment.cancelReply":"comment.reply")),!!e.childCount&&o.createElement("div",{className:Mi,onClick:()=>x(!b)},b?`${v("comment.showReplies")} (${e.childCount})`:v("comment.hideReplies")),o.createElement("div",{className:"ml-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center cursor-pointer"},o.createElement(V,{className:"w-5 h-5"}))),w&&o.createElement("div",{className:"pt-3 max-w-screen-md w-full"},o.createElement(Pi,{postId:t.id,parentCommentId:e.id,setOpen:()=>y(null)}))))),o.createElement("div",{className:"pl-3"},!b&&e.childComments.map(((a,l)=>o.createElement(Ri,{key:a.id,comment:a,level:n+1,setParentComment:r,post:t,isLast:l<e.childComments.length-1})))))}function Ai({comment:e,canVote:t}){const n=Kl(e),{t:r}=$();return o.createElement("div",{onClick:e=>{e.stopPropagation(),t?n():C.error(r("comment.context.votePermission"))},className:(e.isVoted?"text-red-400":"text-gray-500 hover:text-gray-700 dark:hover:text-gray-300")+" flex items-center cursor-pointer"},o.createElement(ve,{className:"w-4 h-4"}),o.createElement("div",{className:"ml-2 text-xs font-medium"},e.voteCount))}function Li({postId:e}){const[t,n]=i.exports.useState(!1),[r]=il(),{t:a}=$();return o.createElement(o.Fragment,null,t?o.createElement("div",{className:"dark:bg-gray-800 pt-3 pb-3 px-3 rounded flex"},o.createElement("div",{className:"pr-3 mr-3 border-r dark:border-gray-750 inline-block h-7"},o.createElement(vl,{user:r,size:7})),o.createElement(Pi,{postId:e,setOpen:n})):o.createElement("div",{onClick:()=>n(!0),className:"dark:bg-gray-700 h-13 flex items-center rounded transition dark:hover:bg-gray-650 cursor-pointer"},o.createElement("div",{className:"px-3 border-r dark:border-gray-650 h-7"},o.createElement(vl,{user:r,size:7})),o.createElement("div",{className:"text-sm text-secondary px-3"},a("post.createComment"))))}function Oi({post:e}){const t=fl((e=>e.canGoBack)),{push:n,goBack:r}=P();return o.createElement("header",{id:"header",className:"h-12 min-h-[3rem] items-center bg-white dark:bg-gray-750 border-b dark:border-gray-800 shadow flex items-center"},o.createElement("div",{className:"flex items-center font-semibold text-base text-primary pl-4"},o.createElement("div",{className:"highlightable mr-3 cursor-pointer",onClick:()=>{t?r():n(`/+${null==e?void 0:e.server.name}`)}},o.createElement(At,{className:"w-5 h-5"})),o.createElement("span",{className:"line-clamp-1"},null==e?void 0:e.title)),o.createElement("div",{className:"ml-auto pl-6 pr-4"},o.createElement(Ei,null)),o.createElement("div",{className:"flex w-60 min-w-[15rem] pr-4"},o.createElement(bs,null)))}function Di({server:e,postId:n}){const[r]=wl({server:e,permissions:[nr.CreateComment]}),{data:a}=function(e){const n={...Rn,...e};return t(Pa,n)}({variables:{id:n}}),l=null==a?void 0:a.post,{data:s}=function(e){const n={...Rn,...e};return t($a,n)}({variables:{postId:n}}),c=i.exports.useMemo((()=>{var e;return Si(null!=(e=null==s?void 0:s.comments)?e:[])}),[null==s?void 0:s.comments]),m=i.exports.useMemo((()=>c.filter((e=>!!e.author)).map((e=>e.author)).filter(((e,t,n)=>n.findIndex((t=>t.id===e.id))===t))),[c]);return o.createElement(al,{header:o.createElement(Oi,{post:l}),rightSidebar:o.createElement($i,{post:l,users:m})},o.createElement("div",{className:"max-h-full h-full scrollbar-custom dark:bg-gray-750"},o.createElement("div",{className:"pt-4 px-4"},!!l&&o.createElement(Ys,{post:l,isPostPage:!0})),r&&o.createElement("div",{className:"pt-4 px-4"},o.createElement(Li,{postId:n})),o.createElement("div",{className:"space-y-2 px-4 pt-4 pb-96"},c.map(((e,t)=>o.createElement(Ri,{key:e.id,comment:e,post:l,isLast:t<c.length-1}))))))}function Ti({name:e,icon:t}){const[n,r]=fl((e=>[e.postsSort,e.setPostsSort])),{server:a}=Rt(),{pathname:l}=S(),{push:s}=P(),i=n===e&&("/"===l||l===`/${a}`),c=t;return o.createElement(yl,{onClick:()=>{r(e),s(a?`/${a}`:"/")},active:i},o.createElement(c,{className:"w-5 h-5 mr-3 text-tertiary"}),e)}function qi(){const{t:e}=$();return o.createElement("div",{className:"space-y-0.5"},o.createElement(Ti,{name:e("post.feed.sort.hot"),icon:X}),o.createElement(Ti,{name:e("post.feed.sort.new"),icon:Z}),o.createElement(Ti,{name:e("post.feed.sort.top"),icon:K}))}function Hi(){var e,t,n,r;const{t:a}=$(),[l]=il(),s=null!=(e=null==l?void 0:l.groups)?e:[],i=null!=(n=null==(t=null==l?void 0:l.relatedUsers)?void 0:t.filter((e=>e.showChat)))?n:[],c=s.concat(i).sort(((e,t)=>(e.lastMessageAt?new Date(e.lastMessageAt).getTime():0)-(t.lastMessageAt?new Date(t.lastMessageAt).getTime():0))),{data:m}=Oa({variables:{input:{unreadOnly:!0}},skip:!l}),d=null!=(r=null==m?void 0:m.replies)?r:[];return o.createElement(o.Fragment,null,o.createElement(hl,null,o.createElement("div",{className:"h-12 border-b dark:border-gray-850 shadow flex items-center px-5 text-base font-medium"},o.createElement(Wa,{className:"h-4"})),o.createElement("div",{className:"px-1.5"},!!l&&o.createElement("div",{className:"space-y-0.5 pt-3"},o.createElement(yl,{to:"/friends"},o.createElement(_,{className:"mr-3 h-5 w-5"}),a("user.friends.title")),o.createElement(yl,{to:"/inbox"},o.createElement(it,{className:"mr-3 h-5 w-5"}),a("inbox.title"),o.createElement("div",{className:"ml-auto"},o.createElement(ko,{count:d.length})))),o.createElement(ds,null,"Posts"),o.createElement(qi,null),!!l&&o.createElement(o.Fragment,null,o.createElement(ds,{plusLabel:"Create DM"},a("dm.title")),o.createElement("div",{className:"space-y-0.5"},!!c&&c.map((e=>{if("Group"===e.__typename)return o.createElement("div",null,"Group");if("User"===e.__typename){const t=e;return o.createElement(ji,{user:t,key:`user-${t.id}`})}})))))))}function ji({user:e}){$();const[t]=da(),{push:n}=P(),{pathname:r}=S(),[a]=Tr(),[{isOver:l,canDrop:s},i]=R({accept:bl,drop:(t,r)=>{n(`/dm/${e.id}`),a({variables:{input:{userId:e.id,text:`${location.origin}${t.relativeUrl}`}}})},collect:e=>({isOver:e.isOver(),canDrop:e.canDrop()})});return o.createElement("div",null,o.createElement(is,{data:{type:Ol,user:e,isDm:!0}},o.createElement(yl,{ref:i,large:!0,to:`/dm/${e.id}`,key:`user-${e.id}`},o.createElement(vl,{size:9,showOnline:!0,user:e,dotClassName:"ring-3 w-2.5 h-2.5 dark:ring-gray-800"}),o.createElement("span",{className:"ml-3"},e.name),o.createElement("div",{className:"ml-auto"}),o.createElement("div",{className:"pr-2"},!!e.unreadCount&&o.createElement(ko,{count:e.unreadCount})),o.createElement(J,{onClick:a=>{a.stopPropagation(),a.preventDefault(),t({variables:{input:{userId:e.id}}}),r===`/dm/${e.id}`&&n("/friends")},className:"group-hover:visible invisible w-5 h-5 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}))))}const zi=e=>N(`\n  w-12\n  h-12\n  object-cover\n  inline-flex\n  items-center\n  justify-center\n  hover:rounded-2xl\n  ${e?"rounded-2xl":"rounded-3xl"}\n  transform\n  transition-all\n  relative\n  group\n  cursor-pointer\n`),Bi=(e,t)=>N(`\n  absolute\n  left-0\n  w-1\n  dark:bg-white\n  rounded-r-2xl\n  top-1/2\n  -translate-y-1/2\n  transform\n  transition\n  duration-250\n  group-hover:-translate-x-3\n  ${e?"-translate-x-3 h-10":t?"-translate-x-3 h-2.5 group-hover:h-5":"-translate-x-4 h-5"}\n`);var _i=i.exports.forwardRef((({name:e,children:t,to:n,onClick:r,className:a="dark:bg-gray-800 bg-gray-200",active:l=!1,unread:s=!1},i)=>o.createElement(D,{content:e,placement:"right",ref:i,offset:[0,22]},n?o.createElement(w,{to:n,className:`${zi(l)} ${a}`},o.createElement("div",{className:Bi(l,s)}),t):o.createElement("div",{onClick:r,className:`${zi(l)} ${a}`},o.createElement("div",{className:Bi(l,s)}),t))));const Vi=N("\n  relative\n  flex\n  items-center\n  pl-3\n  pr-10\n  text-left\n  bg-white\n  cursor-pointer\n  focus:outline-none\n  text-13\n  rounded\n  border\n  h-10\n  dark:bg-gray-800\n  dark:border-gray-700\n  border-b\n  border-t-0\n  border-r-0\n  border-l-0\n  rounded-none\n  focus:outline-none\n  transition\n  px-4\n  text-secondary\n"),Gi=N("\n  scrollbar-thin\n  dark:scrollbar-thumb-gray-750\n  dark:scrollbar-track-gray-850\n  scrollbar-thumb-rounded-md\n  absolute\n  py-1\n  mt-1\n  overflow-auto\n  text-13\n  text-secondary\n  bg-white\n  dark:bg-gray-850\n  rounded-md\n  shadow-lg\n  max-h-60\n  focus:outline-none\n  space-y-0.5\n  font-medium\n");function Yi({category:e,setCategory:t}){const n=Object.values(er),r=Po(e);return o.createElement("div",{className:"min-w-full relative z-50"},o.createElement(He,{value:e,onChange:t},(({open:t})=>o.createElement(o.Fragment,null,o.createElement("div",{className:"relative"},o.createElement(He.Button,{className:Vi},e?o.createElement(o.Fragment,null,o.createElement(r,{className:"w-5 h-5 text-secondary"}),o.createElement("span",{className:"block truncate pl-3"},e)):o.createElement("span",{className:"block truncate text-tertiary"},"Category"),o.createElement("span",{className:"absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none"},o.createElement(je,{className:"w-5 h-5 text-gray-400","aria-hidden":"true"}))),o.createElement(q,{show:t,as:i.exports.Fragment,leave:"transition ease-in duration-100",leaveFrom:"opacity-100",leaveTo:"opacity-0"},o.createElement(He.Options,{static:!0,className:Gi},n.map((e=>o.createElement(He.Option,{key:e,className:({active:e})=>(e=>N(`\n  ${e?"dark:bg-gray-775":""}\n  cursor-pointer\n  select-none\n  relative\n  focus:outline-none\n`))(e),value:e},(({selected:t})=>o.createElement("div",{className:"flex items-center h-10 pl-3 pr-3 "+(t?"dark:bg-gray-775":"")},(()=>{const t=Po(e);return o.createElement(t,{className:"w-5 h-5 text-secondary"})})(),o.createElement("span",{className:"block truncate pl-2"},e)))))))))))))}const Wi=N("\n  disabled:opacity-50\n  focus:outline-none\n  shadow\n  rounded\n  bg-green-600\n  w-20\n  h-9\n  flex\n  items-center\n  justify-center\n  disabled:cursor-not-allowed\n"),Ji=N("\n  disabled:opacity-50\n  focus:outline-none\n  shadow\n  rounded\n  bg-red-500\n  w-20\n  h-9\n  flex\n  items-center\n  justify-center\n  disabled:cursor-not-allowed\n");function Qi({open:e,setOpen:t,server:r}){var a,l;const[s]=il(),[c,{loading:m}]=function(e){const t={...Rn,...e};return n(pa,t)}({update(e,{data:{createServer:t}}){const n=e.readQuery({query:Ia});e.writeQuery({query:Ia,data:{user:{...n.user,servers:[t,...n.user.servers]}}})}}),[d,{loading:u}]=function(e){const t={...Rn,...e};return n(ga,t)}(),[p,g]=i.exports.useState(null!=(a=null==r?void 0:r.category)?a:er.Other),{handleSubmit:v,register:h,watch:f,reset:b,setValue:x}=j({shouldUnregister:!0,defaultValues:r?{displayName:r.displayName,description:r.description}:{}}),E=f("avatarFile"),y=f("bannerFile"),w=f("name"),N=f("displayName"),[k,C]=i.exports.useState(!1);i.exports.useEffect((()=>{k||null==N||x("name",N.replace(" ","_").replace(/[^A-Za-z0-9_]/i,""))}),[N]),i.exports.useEffect((()=>{w||C(!1)}),[w]);const[$,I]=i.exports.useState(null==r?void 0:r.avatarUrl),[S,U]=i.exports.useState(null==r?void 0:r.bannerUrl);i.exports.useEffect((()=>{r?(I(r.avatarUrl),U(r.bannerUrl),b(),x("displayName",r.displayName),g(r.category)):(I(null),U(null),b(),g(er.Other))}),[r]),i.exports.useEffect((()=>{E&&E[0]&&oi(E[0]).then((e=>I(e)))}),[E]),i.exports.useEffect((()=>{y&&y[0]&&oi(y[0]).then((e=>U(e)))}),[y]);const{push:F}=P(),M=(N||"").split(" ").map((e=>e[0])).join("").toUpperCase(),[R,A]=i.exports.useState(!1);return o.createElement(us,{isOpen:e,close:()=>t(!1),closeOnOverlayClick:!0},o.createElement("form",{onSubmit:v((({name:e,displayName:n,description:a,avatarFile:l,bannerFile:s})=>{r?d({variables:{input:{serverId:r.id,displayName:n,description:a,category:p,avatarFile:l?l[0]:null,bannerFile:s?s[0]:null}}}).then((()=>{t(!1)})):c({variables:{input:{name:e,displayName:n,description:a,category:p,avatarFile:l?l[0]:null,bannerFile:s?s[0]:null}}}).then((({data:{createServer:e}})=>{t(!1),F(`/+${e.name}`)}))})),className:"rounded-lg dark:bg-gray-800 max-w-lg w-full relative",onClick:e=>e.stopPropagation()},o.createElement("input",{type:"file",...h("bannerFile"),className:"hidden",id:"bannerFile",accept:"image/png,image/jpeg,image/webp,image/gif"}),o.createElement("label",{htmlFor:"bannerFile",className:"h-24 block relative rounded-t-lg group cursor-pointer bg-center bg-cover "+(S?"":"bg-gradient-to-br from-red-400 to-indigo-600"),style:S?{backgroundImage:`url(${S})`}:{}},o.createElement("div",{className:"rounded-t-lg absolute inset-0 transition bg-black opacity-0 group-hover:opacity-50 flex items-center justify-center"},o.createElement(Lt,{className:"w-10 h-10"}))),o.createElement("input",{type:"file",...h("avatarFile"),className:"hidden",id:"avatarFile",accept:"image/png,image/jpeg,image/webp,image/gif"}),o.createElement("label",{htmlFor:"avatarFile",className:"flex items-center justify-center cursor-pointer rounded-3xl h-24 w-24 absolute left-3 top-24 transform -translate-y-1/2 dark:bg-gray-700 shadow group bg-center bg-cover",style:$?{backgroundImage:`url(${$})`}:{}},!$&&o.createElement("div",{className:"text-tertiary text-3xl font-medium overflow-hidden"},M),o.createElement("div",{className:"absolute rounded-3xl inset-0 transition bg-black opacity-0 group-hover:opacity-50 flex items-center justify-center"},o.createElement(Lt,{className:"w-10 h-10"}))),o.createElement("div",{className:"pl-30 pr-5 pt-2 text-left"},o.createElement("input",{...h("displayName",{maxLength:100,required:!0}),placeholder:"Display Name",className:"h-9 px-1.5 rounded-none w-full text-primary font-medium bg-transparent focus:outline-none border-b dark:border-gray-700 dark:focus:border-blue-500 transition",maxLength:100})),o.createElement("div",{className:"pb-5 space-y-3 pt-3 px-5 text-left"},o.createElement("div",{className:"text-sm text-accent flex items-center pt-3"},o.createElement("span",{className:"h-7 flex items-center"},"joincomet.app/+",null!=(l=null==r?void 0:r.name)?l:""),!r&&o.createElement("input",{...h("name"),placeholder:"Name",className:"bg-transparent h-7 w-full border-b dark:border-gray-700 focus:outline-none transition dark:focus:border-blue-500",onKeyPress:()=>C(!0)})),o.createElement("textarea",{...h("description",{maxLength:500}),placeholder:"Description",className:"resize-none bg-transparent dark:border-gray-700 transition dark:focus:border-blue-500 border-b border-r-0 border-l-0 border-t-0 text-sm w-full focus:ring-0 px-0 scrollbar-custom text-primary",maxLength:500}),o.createElement("div",{className:"flex items-center"},o.createElement("div",{className:"text-13 font-medium text-tertiary pr-1.5"},"Category"),o.createElement(Yi,{category:p,setCategory:g}))),o.createElement("div",{className:"dark:bg-gray-800 rounded absolute right-5 bottom-9 transform translate-y-1/2"},o.createElement("div",{className:"flex items-center space-x-3"},!!r&&r.owner.id===(null==s?void 0:s.id)&&o.createElement(D,{content:"Delete Planet"},o.createElement("button",{type:"button",onClick:()=>A(!0),className:Ji},o.createElement(Ot,{className:"w-5 h-5 text-primary"}))),r?o.createElement(D,{content:"Save Changes"},o.createElement("button",{type:"submit",className:Wi,disabled:!N||u||(null==N?void 0:N.length)<2},u?o.createElement(Ga,{className:"w-5 h-5 text-primary"}):o.createElement(W,{className:"w-5 h-5 text-primary"}))):o.createElement("button",{type:"submit",className:Wi,disabled:!N||!w||(null==N?void 0:N.length)<2||(null==w?void 0:w.length)<3||m},m?o.createElement(Ga,{className:"w-5 h-5 text-primary"}):o.createElement(ge,{className:"w-5 h-5 text-primary"})))),o.createElement("div",{className:"rounded-b-lg dark:bg-gray-750 h-9"})),!!r&&o.createElement(Ki,{open:R,setOpen:A,server:r}))}function Ki({open:e,setOpen:t,server:r}){const[a,l]=i.exports.useState(""),[s,{loading:c}]=function(e){const t={...Rn,...e};return n(va,t)}(),{push:m}=P();return o.createElement(us,{isOpen:e,close:()=>t(!1)},o.createElement("div",{className:"max-w-md w-full rounded-md dark:bg-gray-800 shadow-lg p-4"},o.createElement("div",{className:"text-red-400 text-2xl font-semibold"},"Delete ",r.name),o.createElement("div",{className:"text-secondary pb-5 pt-3 text-base"},"You will not be able to restore this planet."),o.createElement("div",{className:"text-left"},o.createElement("label",{htmlFor:"confirmPassword",className:"label"},"Password"),o.createElement("input",{id:"confirmPassword",name:"confirmPassword",className:"textbox",value:a,onChange:e=>l(e.target.value),type:"password"})),o.createElement("div",{className:"flex items-center justify-end space-x-4 pt-4"},o.createElement("button",{className:"cancel-button",type:"button",onClick:()=>t(!1)},"Cancel"),o.createElement("button",{className:"delete-button",type:"button",disabled:!a||c,onClick:()=>{s({variables:{input:{password:a,serverId:r.id}}}).then((()=>{t(!1),m("/")}))}},"Delete ",r.name,c&&o.createElement(Ga,{className:"w-5 h-5 text-primary ml-3"})))))}function Zi(){const[e,t]=i.exports.useState(!1),{t:n}=$();return o.createElement(o.Fragment,null,o.createElement(_i,{name:n("server.create.title"),onClick:()=>t(!0),className:"dark:bg-gray-800 bg-gray-200 hover:bg-purple-600 dark:hover:bg-purple-600"},o.createElement(Va,{className:"w-5 h-5 text-purple-500 group-hover:text-white transition"})),o.createElement(Qi,{open:e,setOpen:t}))}function Xi(){var e;const{pathname:t}=S(),{t:n}=$(),r=fl((e=>e.homePage)),a="/explore"!==t&&!t.startsWith("/+"),l=t.startsWith("/explore"),s="Mac OS"===rl()&&window.electron,[i]=il(),{data:c}=Aa({variables:{featured:!0}}),m=i?i.servers:null!=(e=null==c?void 0:c.publicServers)?e:[];return o.createElement(o.Fragment,null,o.createElement("div",{className:"flex flex-col items-center min-w-[4.5rem] w-18 bg-white dark:bg-gray-900 overflow-y-auto scrollbar-none"},s&&o.createElement("div",{className:"h-5"}),o.createElement("div",{className:"h-full flex flex-col items-center w-full divide-y dark:divide-gray-800 divide-gray-200"},o.createElement("div",{className:"space-y-2 flex flex-col items-center py-2"},o.createElement(_i,{name:n("home"),to:""+(r?`/${r}`:"/"),active:a,className:""+(a?"bg-blue-600":"dark:bg-gray-800 bg-gray-200 hover:bg-blue-600 dark:hover:bg-blue-600")},o.createElement(Dt,{className:"w-5 h-5 group-hover:text-white transition "+(a?"text-white":"text-blue-500")})),o.createElement(_i,{name:n("explore.title"),to:"/explore",active:l,className:l?"bg-green-600":"dark:bg-gray-800 bg-gray-200 hover:bg-green-600 dark:hover:bg-green-600"},o.createElement(Tt,{className:"w-5 h-5 group-hover:text-white transition "+(l?"text-white":"text-green-500")})),!!i&&o.createElement(Zi,null)),!!m&&m.length>0&&o.createElement("div",{className:"space-y-2 flex flex-col items-center py-2"},m.map((e=>o.createElement(ec,{server:e,key:e.id})))))))}function ec({server:e}){var t,n,r;const{pathname:a}=S(),l=U(a,{path:"/:server"}),s=null==(n=null==(t=null==l?void 0:l.params)?void 0:t.server)?void 0:n.substring(1),i=fl((e=>e.serverPages)),[c]=wl({server:e,permissions:[nr.PrivateChannels]}),m=!!(null!=(r=e.channels)?r:[]).filter((e=>e.type!==An.Private||c)).find((e=>e.isUnread)),d=s===e.name;return o.createElement(is,{className:"h-12",data:{type:Hl,server:e}},o.createElement(_i,{to:`/+${e.name}${i[e.id]?`/${i[e.id]}`:""}`,name:e.displayName,active:d,unread:m},o.createElement($s,{server:e,size:12,className:"bg-gray-200 h-12 w-12 dark:bg-gray-800 group-hover:rounded-2xl transition-all "+(d?"rounded-2xl":"rounded-3xl")})))}function tc({open:e,setOpen:t}){const[r]=il(),[a,l]=i.exports.useState(!1),{register:s,handleSubmit:c,watch:m,reset:d,formState:{errors:u}}=j({mode:"onChange"}),p=m("password"),g=m("currentPassword"),[v,{loading:h}]=function(e){const t={...Rn,...e};return n(ya,t)}(),[f]=function(e){const t={...Rn,...e};return n(wa,t)}(),b=M(),x=()=>{t(!1),setTimeout((()=>d()),300)};return o.createElement(o.Fragment,null,o.createElement(us,{isOpen:e,close:x},o.createElement("div",{className:"min-w-full h-full min-h-full h-screen dark:bg-gray-800 scrollbar-custom",onClick:e=>e.stopPropagation()},o.createElement("div",{className:"w-full relative flex"},o.createElement("button",{className:"absolute top-3 right-3 focus:outline-none rounded-full transition dark:hover:bg-gray-700 p-2",onClick:x},o.createElement(qt,{className:"w-6 h-6 text-tertiary"})),o.createElement("div",{className:"w-1/3 min-w-[14rem] dark:bg-gray-800 flex justify-end px-4 py-12"},o.createElement("div",{className:"w-56"},o.createElement(ds,null,"User Settings"),o.createElement(yl,null,"My Account"),o.createElement(yl,{onClick:()=>{t(!1),localStorage.removeItem("token"),b.resetStore(),sl()}},o.createElement("span",{className:"text-red-500"},"Log Out")))),o.createElement("div",{className:"w-2/3 px-10 py-16 dark:bg-gray-750 min-h-screen"},o.createElement("div",{className:"max-w-screen-sm text-left"},o.createElement("div",{className:"font-semibold text-primary uppercase mb-6"},"My Account"),o.createElement("form",{onSubmit:c((({password:e,currentPassword:t})=>{v({variables:{input:{password:e,currentPassword:t}}}).then((()=>{C.success("Saved changes!"),d()}))})),className:"rounded-lg dark:bg-gray-800 p-4"},o.createElement("div",{className:"flex items-center"},o.createElement("input",{type:"file",accept:"image/png,image/jpeg,image/webp,image/gif",name:"avatarFile",id:"avatarFile",hidden:!0,onChange:e=>{const t=e.target.files[0];t&&f({variables:{input:{avatarFile:t}}})}}),o.createElement("label",{htmlFor:"avatarFile",className:"relative group"},o.createElement(vl,{user:r,size:20}),o.createElement("div",{className:"absolute rounded-full cursor-pointer inset-0 bg-black opacity-0 group-hover:opacity-100 bg-opacity-50 z-10 transition flex items-center justify-center"},o.createElement(Lt,{className:"w-1/2 h-1/2"}))),o.createElement("div",{className:"flex items-end ml-6"},o.createElement("div",{className:"font-semibold text-xl text-primary"},r.username))),o.createElement("div",{className:"mt-5 space-y-5"},o.createElement("div",null,o.createElement("label",{htmlFor:"password",className:"label"},"New Password"),o.createElement("input",{className:"textbox",id:"password",...s("password",{minLength:6,required:!0}),type:"password",minLength:6}),u.password&&o.createElement("div",{className:"error"},"Password must be at least 6 characters")),o.createElement("div",null,o.createElement("label",{htmlFor:"currentPassword",className:"label"},"Current Password"),o.createElement("input",{className:"textbox",id:"currentPassword",...s("currentPassword",{required:!0}),type:"password"}))),o.createElement("div",{className:"flex items-center mt-5"},o.createElement("div",{className:"ml-auto"}),o.createElement("button",{type:"submit",disabled:h||!g||!p||(null==p?void 0:p.length)<6,className:"disabled:opacity-50 disabled:cursor-not-allowed rounded px-4 h-9 text-sm text-primary bg-green-600 focus:outline-none flex items-center"},"Save Changes",h&&o.createElement(Ga,{className:"w-5 h-5 text-primary ml-3"})))),o.createElement("div",{className:"mt-10 flex items-center justify-end"},o.createElement("button",{type:"button",onClick:()=>l(!0),className:"delete-button"},"Delete Account")))))),o.createElement(nc,{deleteOpen:a,setDeleteOpen:l})))}function nc({deleteOpen:e,setDeleteOpen:t}){const[r,a]=i.exports.useState(""),[l,{loading:s}]=function(e){const t={...Rn,...e};return n(Na,t)}(),{push:c}=P(),m=M();return o.createElement(us,{isOpen:e,close:()=>t(!1)},o.createElement("div",{className:"max-w-md w-full rounded-md dark:bg-gray-800 shadow-lg p-4"},o.createElement("div",{className:"text-red-400 text-2xl font-semibold"},"Delete Account"),o.createElement("div",{className:"text-secondary pb-5 pt-3 text-base"},"You will not be able to recover your account."),o.createElement("div",{className:"text-left"},o.createElement("label",{htmlFor:"confirmPassword",className:"label"},"Password"),o.createElement("input",{id:"confirmPassword",name:"confirmPassword",className:"textbox",value:r,onChange:e=>a(e.target.value),type:"password"})),o.createElement("div",{className:"flex items-center justify-end space-x-4 pt-4"},o.createElement("button",{className:"cancel-button",type:"button",onClick:()=>t(!1)},"Cancel"),o.createElement("button",{className:"delete-button",type:"button",disabled:!r||s,onClick:()=>{l({variables:{input:{password:r}}}).then((()=>{t(!1),c("/"),m.resetStore()}))}},"Delete Account",s&&o.createElement(Ga,{className:"w-5 h-5 text-primary ml-3"})))))}function rc(){const[e]=il(),t=[0,14],[r,a]=i.exports.useState(!1),[l,s]=fl((e=>[e.updateAvailable,e.setUpdateAvailable]));i.exports.useEffect((()=>{window.electron&&window.electron.on("updateAvailable",(()=>{s(!0)}))}),[]);const[c]=function(e){const t={...Rn,...e};return n(Ca,t)}();i.exports.useEffect((()=>{if(e){const t=setInterval((()=>{c({variables:{input:{onlineStatus:e.onlineStatus}}})}),15e3);return()=>clearInterval(t)}}),[e]);const m=(()=>{const e=rl();return"Windows"===e?"https://github.com/joincomet/comet/releases/download/0.0.65/Comet-Setup-0.0.65.exe":"Mac OS"===e?"https://github.com/joincomet/comet/releases/download/0.0.65/Comet-0.0.65.dmg":"Linux"===e?"https://github.com/joincomet/comet/releases/download/0.0.65/Comet-0.0.65.AppImage":void 0})(),[d,u,p,g]=hs();return o.createElement(o.Fragment,null,!!e&&o.createElement(tc,{open:r,setOpen:a}),o.createElement("div",{className:"flex items-center shadow-md px-3 bottom-0 h-5.5 bg-gray-700 z-50"},e?o.createElement(o.Fragment,null,o.createElement(vl,{size:4.5,className:"mr-2",user:e}),o.createElement("div",{className:"text-primary text-13 font-medium cursor-pointer"},e.username),o.createElement("div",{className:"w-2 h-2 rounded-full bg-green-500 ml-2"})):o.createElement("div",{className:"flex items-center text-primary text-13 font-medium"},o.createElement("div",{className:"cursor-pointer hover:underline",onClick:()=>{g(!1),u(!0)}},"Log In"),"  ·  ",o.createElement("div",{className:"cursor-pointer hover:underline",onClick:()=>{g(!0),u(!0)}},"Create account")),o.createElement("div",{className:"ml-auto flex items-center space-x-4 text-primary"},o.createElement(D,{content:""+(window.electron?l?"Update available":"Up to date!":"Download Desktop App")},o.createElement("div",{className:"flex items-center cursor-pointer",onClick:()=>{window.electron&&l?window.electron.restart():window.electron||window.open(m,"_blank")}},o.createElement("div",{className:"text-xs font-medium "+(l||!window.electron?"text-green-500":"text-tertiary")},"v","0.0.65"),(window.electron&&l||!window.electron)&&o.createElement("div",{className:"pl-2"},o.createElement(Ht,{className:"w-4.5 h-4.5 text-green-500 cursor-pointer"})))),!!e&&o.createElement(o.Fragment,null,o.createElement(D,{content:"Notifications",offset:t},o.createElement(b,{to:"/inbox"},o.createElement(jt,{className:"w-4.5 h-4.5 cursor-pointer"}))),o.createElement(D,{content:"Settings",offset:t},o.createElement("div",{onClick:()=>a(!0)},o.createElement(zt,{className:"w-4.5 h-4.5 cursor-pointer"})))))))}function ac({channel:e,server:t}){const{t:n}=$(),[r]=wl({server:t,permissions:[nr.ManageChannels]}),{hash:a}=S(),l=`/+${null==t?void 0:t.name}/#${e.name}`,s=a.substring(1)===e.name;return o.createElement(is,{data:{type:zl,channel:e}},o.createElement(yl,{to:l,active:s},e.isUnread&&!s&&o.createElement("div",{className:"absolute -left-1.5 top-1/2 transform -translate-y-1/2 rounded-r-full dark:bg-gray-100 h-2 w-1"}),o.createElement(Ya,{className:"w-5 h-5 mr-3 text-tertiary"}),o.createElement("span",{className:""+(e.isUnread?"text-primary":"")},e.name),o.createElement("div",{className:"ml-auto"}),!!e.mentionCount&&o.createElement("div",{className:"pr-2"},o.createElement(ko,{count:e.mentionCount})),r&&o.createElement(D,{content:n("channel.edit")},o.createElement("div",{className:"group-hover:visible invisible"},o.createElement(zt,{className:"w-4 h-4 text-tertiary"})))))}function lc({server:e}){const{t:t}=$(),[r]=wl({server:e,permissions:[nr.ManageChannels]}),{handleSubmit:a}=j({mode:"onChange"}),[l,s]=i.exports.useState(!1),[c,m]=i.exports.useState(!1),[d,u]=i.exports.useState("");i.exports.useEffect((()=>{" "!==d&&"-"!==d||u(""),u(d.toLowerCase().replace(" ","-")),d.endsWith("--")&&u(d.substring(0,d.length-1))}),[d]);const{push:p}=P(),[g,{loading:v}]=function(e){const t={...Rn,...e};return n(br,t)}({update(e,{data:{createChannel:t}}){const n=e.readQuery({query:Ia}),r=JSON.parse(JSON.stringify(n)),a=r.user.servers.find((e=>e.id===a.id));a.channels=[t].concat(a.channels),e.writeQuery({query:Ia,data:r})}});return r?o.createElement(o.Fragment,null,o.createElement(ds,{onClick:()=>s(!0),plusLabel:t("channel.create")},"Channels"),o.createElement(us,{isOpen:l,close:()=>s(!1),closeOnOverlayClick:!0},o.createElement("div",{className:"rounded-lg dark:bg-gray-750 p-4 max-w-md w-full",onClick:e=>e.stopPropagation()},o.createElement(ps,{className:"title mb-4"},t("channel.create")),o.createElement("form",{onSubmit:a((()=>{d.endsWith("-")&&u(d.substring(0,d.length-1)),g({variables:{input:{name:d,serverId:e.id,isPrivate:c}}}).then((({data:{createChannel:t}})=>{s(!1),u(""),p(`/+${e.name}/#${t.name}`)}))}))},o.createElement("div",{className:"mb-4 w-full"},o.createElement("label",{className:"label",htmlFor:"name"},"Channel Name"),o.createElement("div",{className:"relative"},o.createElement("input",{name:"name",maxLength:100,className:"textbox pl-9 pr-3 lowercase",spellCheck:!1,autoCapitalize:"none",id:"name",value:d,onChange:e=>u(e.target.value)}),o.createElement("div",{className:"absolute left-0 top-0 bottom-0 flex items-center w-10 justify-center pointer-events-none"},o.createElement(Ya,{className:"w-5 h-5 text-tertiary"})))),o.createElement(gs,{disabled:!d,loading:v,type:"submit"},t("continue")),o.createElement("div",{className:"pt-4"},o.createElement(ws,{checked:c,onChange:()=>m(!c)},t("channel.togglePrivate"))))))):o.createElement(ds,null,"Channels")}function sc({server:e}){const[t,n]=i.exports.useState(!1);i.exports.useState(!1);const[r,a]=wl({server:e,permissions:[nr.ManageServer,nr.PrivateChannels]}),l=Po(null==e?void 0:e.category);return e?o.createElement(o.Fragment,null,o.createElement(Qi,{open:t,setOpen:n,server:e}),o.createElement(hl,null,e.bannerUrl?o.createElement("div",{className:"h-20 relative bg-center bg-cover bg-no-repeat "+(e.bannerUrl?"":"bg-gradient-to-br from-red-400 to-indigo-600"),style:e.bannerUrl?{backgroundImage:`url(${e.bannerUrl})`}:{}}):o.createElement("div",{className:"h-12 border-b dark:border-gray-850 shadow flex items-center px-5 text-base font-medium"},o.createElement(Wa,{className:"h-4"})),o.createElement("div",{className:"px-1.5 pt-4"},o.createElement("div",{className:"shadow-inner dark:bg-gray-850 p-2.5 space-y-2.5 rounded"},o.createElement("div",{className:"flex items-center"},o.createElement($s,{server:e,size:6,className:"rounded-md mr-2"}),o.createElement("div",{className:"font-semibold text-primary pr-2.5 truncate"},e.displayName),o.createElement("button",{className:(s=e.isJoined,N(`\n  ml-auto\n  px-3\n  h-6\n  rounded\n  text-13\n  font-medium\n  ${s?"border border-gray-700 text-blue-500":"bg-blue-500 text-primary"}\n`))},e.isJoined?"Leave":"Join")),o.createElement("div",{className:"text-13 text-secondary pb-1.5"},e.description||"No description"),o.createElement("div",{className:"flex items-center justify-between"},o.createElement("div",{className:"text-xs font-medium flex items-center text-tertiary"},o.createElement(Pt,{className:"w-4 h-4 mr-2.5"}),e.userCount," Member",1===e.userCount?"":"s"),o.createElement("div",{className:"text-xs font-medium flex items-center text-tertiary"},o.createElement(l,{className:"w-4 h-4 mr-2.5"}),e.category))),o.createElement(ds,{plusLabel:"Create Post"},"Posts"),o.createElement(qi,null),o.createElement(lc,{server:e}),o.createElement("div",{className:"space-y-0.5"},e.channels.filter((e=>e.type!==An.Private||a)).map((t=>o.createElement(ac,{key:t.id,channel:t,server:e})))),r&&o.createElement(o.Fragment,null,o.createElement(ds,null,"Admin"),o.createElement("div",{className:"space-y-0.5"},o.createElement(yl,{onClick:()=>n(!0)},o.createElement(zt,{className:"mr-3 w-5 h-5"}),"Edit Planet"),o.createElement(yl,null,o.createElement(Bt,{className:"mr-3 w-5 h-5"}),"Manage Roles")))))):null;var s}function oc({server:e,serverUsers:t}){const n=i.exports.useMemo((()=>{var n;const r=[];for(const s of(null!=(n=null==e?void 0:e.roles)?n:[]).filter((e=>e.permissions.includes(nr.DisplayRoleSeparately)))){const e=t.filter((e=>e.isOnline&&e.roles.map((e=>e.id)).includes(s.id)&&!r.includes(e)));e.length&&(r.push(`${s.name} — ${e.length}`),r.push(...e))}const a=t.filter((e=>e.user.isOnline));a.length&&(r.push(`Online — ${a.length}`),r.push(...a));const l=t.filter((e=>!e.user.isOnline));return l.length&&(r.push(`Offline — ${l.length}`),r.push(...l)),r}),[t,e]),r=i.exports.useRef(),a=fl((e=>e.showUsers));return o.createElement(hl,{right:!0,show:a},o.createElement(fe,{className:"scrollbar-dark",ref:r,style:{height:"100%",width:"100%"},data:n,itemContent:(e,t)=>o.createElement("div",{className:"px-1.5 pb-0.5"},"string"==typeof t?o.createElement(ds,null,t):o.createElement("div",{className:""+(t.user.isOnline?"":"opacity-35")},o.createElement(bi,{user:t.user,roles:t.roles,color:t.color})))}))}function ic({channel:e}){var t;return o.createElement(xs,{icon:o.createElement(Ya,{className:"w-5 h-5"}),title:`${null!=(t=null==e?void 0:e.name)?t:""}`},(null==e?void 0:e.description)&&o.createElement("div",{className:"text-13 text-tertiary font-medium leading-5"},"Description"),o.createElement("div",{className:"ml-auto pl-6 flex items-center space-x-5"},o.createElement(Ei,null)))}function cc({server:e,channel:n}){var r;Ni(`channel/${null==n?void 0:n.id}`);const{data:a}=function(e){const n={...Rn,...e};return t(Ta,n)}({variables:{serverId:null==e?void 0:e.id},skip:!e,fetchPolicy:"cache-and-network"}),l=null!=(r=null==a?void 0:a.serverUsers)?r:[];return o.createElement(al,{header:o.createElement(ic,{channel:n}),rightSidebar:o.createElement(oc,{channel:n,serverUsers:l,server:e})},!!n&&o.createElement(hi,{server:e,channel:n,users:l.map((e=>e.user))}))}const mc="\\+[A-Za-z0-9_]+";function dc(){var e,t,n,r;il();const{pathname:a}=S(),l=U(a,{path:"/group/:groupId"}),s=null==(e=null==l?void 0:l.params)?void 0:e.groupId,i=U(a,{path:"/folder/:folderId"}),c=null==(t=null==i?void 0:i.params)?void 0:t.folderId,m=U(a,{path:"/dm/:username"}),d=null==(r=null==(n=null==m?void 0:m.params)?void 0:n.username)?void 0:r.substring(1);return o.createElement(_t,null,o.createElement(Vt,{path:"/"},o.createElement(_t,null,o.createElement(Vt,{path:["/","/friends","/inbox","/folder/:folderId","/dm/:username(@[A-Za-z0-9-_]+)","/group/:groupId",`/:server(${mc})`,`/:server(${mc})/folder/:folderId`,`/:server(${mc})/post/:postId`,"/explore"],exact:!0},o.createElement("div",{className:"flex-grow"},o.createElement("div",{className:"flex h-full",style:{height:"calc(100% - 1.375rem)"}},o.createElement(Xi,null),o.createElement(Vt,{path:"/explore"},o.createElement(Do,null)),o.createElement(Vt,{path:`/:server(${mc})`},o.createElement(uc,null)),o.createElement(Vt,{exact:!0,path:["/","/friends","/inbox","/folder/:folderId","/dm/:username(@[A-Za-z0-9-_]+)","/group/:groupId"]},o.createElement(Hi,null),o.createElement(Vt,{path:"/",exact:!0},o.createElement(xo,null)),o.createElement(Vt,{path:"/friends"},o.createElement(Fo,null)),o.createElement(Vt,{path:"/inbox"},o.createElement(Bo,null)),o.createElement(Vt,{path:"/folder/:folderId"},o.createElement(Wo,{folderId:c})),o.createElement(Vt,{path:"/dm/:username(@[A-Za-z0-9-_]+)"},o.createElement(fi,{username:d})),o.createElement(Vt,{path:"/group/:groupId"},o.createElement(yi,{groupId:s})))),o.createElement(rc,null))),o.createElement(Vt,null,o.createElement(ml,null)))))}function uc(){var e,n,r,a;const{server:l}=Rt(),s=l.substring(1),{data:i}=function(e){const n={...Rn,...e};return t(Da,n)}({variables:{name:s}}),c=null==i?void 0:i.server,{hash:m,pathname:d}=S(),u=m.substring(1),p=(null!=(e=null==c?void 0:c.channels)?e:[]).find((e=>e.name===u)),g=U(d,{path:"/:server/folder/:folderId"}),v=null==(n=null==g?void 0:g.params)?void 0:n.folderId,h=(null!=(r=null==c?void 0:c.folders)?r:[]).find((e=>e.id===v)),f=U(d,{path:"/:server/post/:postId"}),b=null==(a=null==f?void 0:f.params)?void 0:a.postId;return o.createElement(o.Fragment,null,o.createElement(sc,{server:c}),o.createElement(Vt,{path:`/:server(${mc})`,exact:!0,render:({location:e})=>e.hash?o.createElement(cc,{server:c,channel:p}):o.createElement(ki,{server:c})}),o.createElement(Vt,{path:`/:server(${mc})/folder/:folderId`},o.createElement(Ci,{server:c,folder:h})),o.createElement(Vt,{path:`/:server(${mc})/post/:postId`},o.createElement(Di,{server:c,postId:b})))}function pc(){return Gt("(min-width: 1024px)"),o.createElement(Yt,{position:"bottom-center",toastOptions:{className:"toast",success:{className:"toast",iconTheme:{primary:"#059669"}},error:{className:"toast",iconTheme:{primary:"#EF4444"}}}})}function gc({post:e,show:t}){const n=e?e.title.split(" "):[],r=`${n.slice(0,9).join(" ")}${n.length>=9?"...":""}`;return o.createElement("div",null,o.createElement(Wt,null,t&&o.createElement(ne.div,{initial:{scale:.75,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.75,opacity:0},transition:{duration:.15,ease:"easeInOut"},className:"bg-blue-500 bg-opacity-75 truncate w-64 rounded-md shadow-lg text-white text-sm font-medium h-10 px-2 flex items-center"},o.createElement("div",{className:"truncate"},r))))}const vc={position:"fixed",pointerEvents:"none",zIndex:100,left:0,top:0};function hc(e,t,n,r){e||(e={x:0,y:0});let a=n.x-e.x,l=n.y-e.y,{x:s,y:o}=t||{x:r.x-e.x,y:r.y-e.y};const i=`translate(${s+a}px, ${o+l}px)`;return{transform:i,WebkitTransform:i}}var fc=i.exports.memo((function(){const[e,t]=i.exports.useState({x:0,y:0}),[n,r]=i.exports.useState({x:0,y:0}),a=e=>t({x:e.clientX,y:e.clientY}),l=e=>t({x:e.clientX,y:e.clientY});i.exports.useEffect((()=>(window.addEventListener("mousedown",a),window.addEventListener("mouseup",l),()=>{window.removeEventListener("mousedown",a),window.removeEventListener("mouseup",l)})));const{itemType:s,isDragging:c,item:m,initialOffset:d,currentOffset:u}=Jt((e=>({item:e.getItem(),itemType:e.getItemType(),initialOffset:e.getInitialSourceClientOffset(),currentOffset:e.getSourceClientOffset(),isDragging:e.isDragging()})));return o.createElement("div",{style:vc},o.createElement("div",{style:hc(d,u,e,n)},s===bl&&o.createElement(gc,{post:m,show:c})))}));const bc="_window-button_19ru1_11",xc="_window-button-icon_19ru1_18";function Ec(){const{close:e,minimize:t,maximize:n,unmaximize:r,isMaximized:a}=window.electron,[l,s]=i.exports.useState(a()),c=()=>s(a());return o.createElement("header",{className:"_titlebar_19ru1_1"},o.createElement(Wa,{className:"h-3 text-tertiary"}),o.createElement("div",{className:"_window-controls_19ru1_6"},o.createElement("div",{className:`${bc} flex`,onClick:()=>{t(),c()}},o.createElement("img",{className:`${xc} hidden dark:block`,srcSet:"./icons/titlebar/min-w-10.png 1x, ./icons/titlebar/min-w-12.png 1.25x, ./icons/titlebar/min-w-15.png 1.5x, ./icons/titlebar/min-w-15.png 1.75x, ./icons/titlebar/min-w-20.png 2x, ./icons/titlebar/min-w-20.png 2.25x, ./icons/titlebar/min-w-24.png 2.5x, ./icons/titlebar/min-w-30.png 3x, ./icons/titlebar/min-w-30.png 3.5x",draggable:"false"}),o.createElement("img",{className:`${xc} block dark:hidden`,srcSet:"./icons/titlebar/min-k-10.png 1x, ./icons/titlebar/min-k-12.png 1.25x, ./icons/titlebar/min-k-15.png 1.5x, ./icons/titlebar/min-k-15.png 1.75x, ./icons/titlebar/min-k-20.png 2x, ./icons/titlebar/min-k-20.png 2.25x, ./icons/titlebar/min-k-24.png 2.5x, ./icons/titlebar/min-k-30.png 3x, ./icons/titlebar/min-k-30.png 3.5x",draggable:"false"})),o.createElement("div",{className:`${bc} ${l?"hidden":"flex"}`,onClick:()=>{n(),c()}},o.createElement("img",{className:`${xc} hidden dark:block`,srcSet:"./icons/titlebar/max-w-10.png 1x, ./icons/titlebar/max-w-12.png 1.25x, ./icons/titlebar/max-w-15.png 1.5x, ./icons/titlebar/max-w-15.png 1.75x, ./icons/titlebar/max-w-20.png 2x, ./icons/titlebar/max-w-20.png 2.25x, ./icons/titlebar/max-w-24.png 2.5x, ./icons/titlebar/max-w-30.png 3x, ./icons/titlebar/max-w-30.png 3.5x",draggable:"false"}),o.createElement("img",{className:`${xc} block dark:hidden`,srcSet:"./icons/titlebar/max-k-10.png 1x, ./icons/titlebar/max-k-12.png 1.25x, ./icons/titlebar/max-k-15.png 1.5x, ./icons/titlebar/max-k-15.png 1.75x, ./icons/titlebar/max-k-20.png 2x, ./icons/titlebar/max-k-20.png 2.25x, ./icons/titlebar/max-k-24.png 2.5x, ./icons/titlebar/max-k-30.png 3x, ./icons/titlebar/max-k-30.png 3.5x",draggable:"false"})),o.createElement("div",{className:`${bc} ${l?"flex":"hidden"}`,onClick:()=>{r(),c()}},o.createElement("img",{className:`${xc} hidden dark:block`,srcSet:"./icons/titlebar/restore-w-10.png 1x, ./icons/titlebar/restore-w-12.png 1.25x, ./icons/titlebar/restore-w-15.png 1.5x, ./icons/titlebar/restore-w-15.png 1.75x, ./icons/titlebar/restore-w-20.png 2x, ./icons/titlebar/restore-w-20.png 2.25x, ./icons/titlebar/restore-w-24.png 2.5x, ./icons/titlebar/restore-w-30.png 3x, ./icons/titlebar/restore-w-30.png 3.5x",draggable:"false"}),o.createElement("img",{className:`${xc} block dark:hidden`,srcSet:"./icons/titlebar/restore-k-10.png 1x, ./icons/titlebar/restore-k-12.png 1.25x, ./icons/titlebar/restore-k-15.png 1.5x, ./icons/titlebar/restore-k-15.png 1.75x, ./icons/titlebar/restore-k-20.png 2x, ./icons/titlebar/restore-k-20.png 2.25x, ./icons/titlebar/restore-k-24.png 2.5x, ./icons/titlebar/restore-k-30.png 3x, ./icons/titlebar/restore-k-30.png 3.5x",draggable:"false"})),o.createElement("div",{className:`${bc} _close-button_19ru1_32 flex`,onClick:()=>{e(),c()}},o.createElement("img",{className:`${xc} hidden dark:block`,srcSet:"./icons/titlebar/close-w-10.png 1x, ./icons/titlebar/close-w-12.png 1.25x, ./icons/titlebar/close-w-15.png 1.5x, ./icons/titlebar/close-w-15.png 1.75x, ./icons/titlebar/close-w-20.png 2x, ./icons/titlebar/close-w-20.png 2.25x, ./icons/titlebar/close-w-24.png 2.5x, ./icons/titlebar/close-w-30.png 3x, ./icons/titlebar/close-w-30.png 3.5x",draggable:"false"}),o.createElement("img",{className:`${xc} block dark:hidden`,srcSet:"./icons/titlebar/close-k-10.png 1x, ./icons/titlebar/close-k-12.png 1.25x, ./icons/titlebar/close-k-15.png 1.5x, ./icons/titlebar/close-k-15.png 1.75x, ./icons/titlebar/close-k-20.png 2x, ./icons/titlebar/close-k-20.png 2.25x, ./icons/titlebar/close-k-24.png 2.5x, ./icons/titlebar/close-k-30.png 3x, ./icons/titlebar/close-k-30.png 3.5x",draggable:"false"}))))}const{hasOwnProperty:yc}=Object.prototype;const wc=(e,t)=>{let n;try{n=JSON.stringify(e)}catch(r){const e=new Kt(`Network request failed. ${t} is not serializable: ${r.message}`);throw e.parseError=r,e}return n};function Nc(e,t,n){e.append(t,n,n.name)}const kc=(e={})=>{let{uri:t="/graphql",fetch:n,includeExtensions:r,useGETForQueries:a,isExtractableFile:l=tn,formDataAppendFile:s=Nc,...o}=e;nn(n),n||(n=fetch);const i={http:{includeExtensions:r},options:o.fetchOptions,credentials:o.credentials,headers:o.headers};return new c((e=>{let r=Zt(e,t);const o=e.getContext(),c={};if(o.clientAwareness){const{name:e,version:t}=o.clientAwareness;e&&(c["apollographql-client-name"]=e),t&&(c["apollographql-client-version"]=t)}const m={...c,...o.headers},d={http:o.http,options:o.fetchOptions,credentials:o.credentials,headers:m},{options:u,body:g}=((e,t,...n)=>{let r={...t.options,headers:t.headers,credentials:t.credentials},a=t.http||{};n.forEach((e=>{r={...r,...e.options,headers:{...r.headers,...e.headers}},e.credentials&&(r.credentials=e.credentials),a={...a,...e.http}}));const{operationName:l,extensions:s,variables:o,query:i}=e,c={operationName:l,variables:o};return a.includeExtensions&&(c.extensions=s),a.includeQuery&&(c.query=v(i)),{options:r,body:c}})(e,rn,i,d),{clone:h,files:f}=Xt(g,"",l),b=wc(h,"Payload");let x;if(!u.signal){const{controller:e,signal:t}=(()=>{if("undefined"==typeof AbortController)return{controller:!1,signal:!1};const e=new AbortController;return{controller:e,signal:e.signal}})();x=e,x&&(u.signal=t)}if(a&&!e.query.definitions.some((e=>"OperationDefinition"===e.kind&&"mutation"===e.operation))&&(u.method="GET"),"GET"===u.method){const{newURI:e,parseError:t}=function(e,n){const r=[],a=(e,t)=>{r.push(`${e}=${encodeURIComponent(t)}`)};if("query"in n&&a("query",n.query),n.operationName&&a("operationName",n.operationName),n.variables){let e;try{e=wc(n.variables,"Variables map")}catch(t){return{parseError:t}}a("variables",e)}if(n.extensions){let e;try{e=wc(n.extensions,"Extensions map")}catch(t){return{parseError:t}}a("extensions",e)}let l="",s=e;const o=e.indexOf("#");-1!==o&&(l=e.substr(o),s=e.substr(0,o));const i=-1===s.indexOf("?")?"?":"&";return{newURI:s+i+r.join("&")+l}}(r,g);if(t)return en(t);r=e}else if(f.size){delete u.headers["content-type"];const e=new FormData;e.append("operations",b);const t={};let n=0;f.forEach((e=>{t[++n]=e})),e.append("map",JSON.stringify(t)),n=0,f.forEach(((t,r)=>{s(e,++n,r)})),u.body=e}else try{u.body=wc(g,"Payload")}catch(E){return en(E)}return new p((t=>{var a;return n(r,u).then((t=>(e.setContext({response:t}),t))).then((a=e,e=>e.text().then((t=>{try{return JSON.parse(t)}catch(n){const r=n;throw r.name="ServerParseError",r.response=e,r.statusCode=e.status,r.bodyText=t,r}})).then((t=>(e.status>=300&&Qt(e,t,`Response not successful: Received status code ${e.status}`),Array.isArray(t)||yc.call(t,"data")||yc.call(t,"errors")||Qt(e,t,`Server response was missing for query '${Array.isArray(a)?a.map((e=>e.operationName)):a.operationName}'.`),t))))).then((e=>(t.next(e),t.complete(),e))).catch((e=>{"AbortError"!==e.name&&(e.result&&e.result.errors&&e.result.data&&t.next(e.result),t.error(e))})),()=>{x&&x.abort()}}))}))};const Cc=dn((({graphQLErrors:e,networkError:t})=>{e&&e.map((({message:e,locations:t,path:n})=>{console.log(`[GraphQL error]: Message: ${e}, Location: ${t}, Path: ${n}`),"Access denied! You need to be authorized to perform this action!"!==e&&C.error(a.t(e))})),t&&(console.log(`[Network error]: ${t}`),C.error(t.message))})),$c=new class extends c{constructor(e={}){super(kc(e).request),this.options=e}}({uri:"https://api.joincomet.app/graphql",headers:{token:localStorage.getItem("token")}}),Ic=un(((e,{headers:t})=>{const n=localStorage.getItem("token");return{headers:n?{...t,token:n}:t}})),Sc=new class extends c{constructor(){super(),this.client=m({url:"wss://api.joincomet.app/graphql",lazy:!1,connectionParams:()=>{const e=localStorage.getItem("token");return e?{token:e}:{}},on:{connected:e=>{ol.status="connected",sl=()=>{e.readyState===WebSocket.OPEN&&e.close(4205,"Client Restart")},ll&&(ll=!1,sl())},error:()=>{ol.status="error"},closed:()=>{ol.status="closed"},connecting:()=>{ol.status="connecting"}}})}wsFetcher(e){return d((t=>this.client.subscribe(e,t)))}request(e){const t=u();return new p((n=>g(t(this.wsFetcher({operationName:e.operationName,query:v(e.query),variables:e.variables})),n)))}},Uc=new cn({link:on([Cc,(new an).split((({query:e})=>{const t=ln(e);return"OperationDefinition"===t.kind&&("subscription"===t.operation||sn(t))}),Sc,Ic.concat($c))]),cache:new mn});function Fc(){return o.createElement("div",{className:"relative h-full w-full dark:bg-gray-750 flex flex-col items-center justify-center lg:hidden p-6 text-center"},o.createElement(nl,null),o.createElement("div",{className:"z-10 flex flex-col items-center"},o.createElement(Wa,{className:"w-48"}),o.createElement("img",{alt:"astronaut",src:"/astronaut.png",className:"object-contain opacity-75 h-48 animate-float mt-5"}),o.createElement("div",{className:"pt-5 font-medium text-primary text-lg"},"Support for mobile devices is coming soon!"),o.createElement("div",{className:"text-tertiary text-base pt-2 font-medium"},"Please visit"," ",o.createElement(b,{to:"/",className:"text-accent hover:underline"},"joincomet.app")," ","from a laptop or desktop computer."),o.createElement("div",{className:"text-tertiary text-base pt-5 font-medium"},"Stay updated:"),o.createElement("div",{className:"space-y-4 text-tertiary text-sm font-medium pt-5"},o.createElement("a",{href:"https://discord.gg/NPCMGSm",target:"_blank",rel:"noopener noreferrer",className:"flex items-center"},o.createElement(pn,{className:"h-6 w-6 mr-4 text-tertiary"}),"Discord"),o.createElement("a",{href:"https://github.com/joincomet/comet",target:"_blank",rel:"noopener noreferrer",className:"flex items-center"},o.createElement(gn,{className:"h-6 w-6 mr-4 text-tertiary"}),"GitHub"),o.createElement("a",{href:"https://twitter.com/joincometapp",target:"_blank",rel:"noopener noreferrer",className:"flex items-center"},o.createElement(vn,{className:"h-6 w-6 mr-4 text-tertiary"}),"Twitter"))))}const Pc=N("\n  border-0\n  border-b\n  focus:ring-0\n  dark:border-gray-700\n  bg-transparent\n  w-full\n  h-10\n  text-sm\n  px-1.5\n  focus:outline-none\n  transition\n  dark:focus:border-blue-500\n  text-primary\n"),Mc=N("\n  absolute\n  left-1.5\n  top-1/2\n  transform\n  -translate-y-1/2\n  w-5\n  h-5\n  text-tertiary\n"),Rc=N("\n  text-red-400\n  text-xs\n  pt-2.5\n  pl-1.5\n"),Ac=N("\n  disabled:opacity-50\n  focus:outline-none\n  shadow\n  rounded\n  bg-green-600\n  w-20\n  h-9\n  flex\n  items-center\n  justify-center\n  disabled:cursor-not-allowed\n"),Lc=N("\n  highlightable\n  absolute\n  right-1.5\n  top-1/2\n  transform\n  -translate-y-1/2\n"),Oc=/^[A-Za-z0-9-_]+$/gi;function Dc(){var e,t,r,a;const[l,s,c,m]=hs(),[d,u]=i.exports.useState(!1),{handleSubmit:p,register:g,watch:v,reset:h,getValues:f,formState:{errors:b}}=j({mode:"onChange",shouldUnregister:!0}),x=v("email"),y=v("username"),w=v("usernameOrEmail"),N=v("password"),k=v("confirmPassword"),[C,{loading:$}]=function(e){const t={...Rn,...e};return n(Ea,t)}(),[I,{loading:S}]=function(e){const t={...Rn,...e};return n(ka,t)}(),U=M(),F=()=>{h(),s(!1)},P=!(c?y&&y.length>=3&&y.length<=20&&Oc.test(y)&&(!x||x&&hn(x))&&N&&N.length>=6&&k&&k===N:w&&N);return o.createElement(us,{close:F,isOpen:l},o.createElement("form",{onSubmit:p((({usernameOrEmail:e,email:t,username:n,password:r})=>{if(c)C({variables:{input:{username:n,password:r,email:t||null}}}).then((({data:{createAccount:{accessToken:e,user:t}}})=>{localStorage.setItem("token",e),U.resetStore(),U.cache.writeQuery({query:Ia,data:t}),sl(),s(!1),m(!1)}));else{const t=hn(e)?{email:e}:{username:e};I({variables:{input:{...t,password:r}}}).then((({data:{login:{accessToken:e,user:t}}})=>{localStorage.setItem("token",e),U.resetStore(),U.cache.writeQuery({query:Ia,data:t}),sl(),s(!1),m(!1)}))}})),className:"rounded-lg dark:bg-gray-800 max-w-lg w-full relative"},o.createElement("div",{className:"rounded-t-lg bg-gradient-to-r from-red-400 to-indigo-600 h-2"}),o.createElement("div",{className:"px-5 pt-2 pb-9 text-left"},o.createElement("div",{className:"pb-4 flex items-center"},o.createElement("div",{onClick:()=>{c&&(m(!1),h())},className:"text-sm cursor-pointer mr-3 py-3 border-b-2 inline-flex items-center justify-center px-3 "+(c?"border-transparent text-secondary":"dark:border-gray-300 text-primary")},"Log In"),o.createElement("div",{onClick:()=>{c||(m(!0),h())},className:"text-sm cursor-pointer py-3 border-b-2 inline-flex items-center justify-center px-3 "+(c?"dark:border-gray-300 text-primary":"border-transparent text-secondary")},"Create Account"),o.createElement("div",{className:"ml-auto"},o.createElement(Wa,{className:"h-3.5 text-secondary"})),o.createElement(J,{className:"ml-5 w-5 h-5 text-tertiary highlightable",onClick:()=>F()})),o.createElement("div",{className:"space-y-4"},c?o.createElement(o.Fragment,null,o.createElement("div",null,o.createElement("div",{className:"relative"},o.createElement("input",{id:"username",...g("username",{required:!0,pattern:Oc,maxLength:20,minLength:3}),className:`${Pc} pl-9`,placeholder:"Username",minLength:3,maxLength:20}),o.createElement(E,{className:Mc})),"minLength"===(null==(e=b.username)?void 0:e.type)&&o.createElement("div",{className:Rc},"Username must be between 3 and 20 characters"),"pattern"===(null==(t=b.username)?void 0:t.type)&&o.createElement("div",{className:Rc},"Letters, numbers, dashes, and underscores only")),o.createElement("div",null,o.createElement("div",{className:"relative"},o.createElement("input",{id:"email",...g("email",{validate:{email:e=>!e||hn(e)||"Invalid email"}}),className:`${Pc} pl-9`,placeholder:"Email (Optional)",type:"email"}),o.createElement(fn,{className:Mc})),"email"===(null==(r=b.email)?void 0:r.type)&&o.createElement("div",{className:Rc},b.email.message))):o.createElement("input",{id:"usernameOrEmail",...g("usernameOrEmail",{required:!0,shouldUnregister:!0}),className:Pc,placeholder:"Username or email"}),c?o.createElement(o.Fragment,null,o.createElement("div",null,o.createElement("div",{className:"relative"},o.createElement("input",{id:"password",...g("password",{required:!0,minLength:6}),className:Pc,placeholder:"Password",type:d?"text":"password",minLength:6}),o.createElement(Tc,{showPassword:d,setShowPassword:u})),"minLength"===(null==(a=b.password)?void 0:a.type)&&o.createElement("div",{className:Rc},"Password must be at least 6 characters")),o.createElement("div",null,o.createElement("div",{className:"relative"},o.createElement("input",{id:"confirmPassword",...g("confirmPassword",{required:!0,validate:{matchesPreviousPassword:e=>{const{password:t}=f();return t===e||"Passwords do not match"}}}),className:Pc,placeholder:"Confirm Password",type:d?"text":"password"}),o.createElement(Tc,{showPassword:d,setShowPassword:u})),!!N&&!!k&&N!==k&&o.createElement("div",{className:Rc},"Passwords do not match"))):o.createElement("div",{className:"relative"},o.createElement("input",{id:"password",...g("password",{required:!0}),className:Pc,placeholder:"Password",type:d?"text":"password"}),o.createElement(Tc,{showPassword:d,setShowPassword:u})))),o.createElement("div",{className:"dark:bg-gray-800 rounded absolute right-5 bottom-9 transform translate-y-1/2"},o.createElement("button",{type:"submit",className:Ac,disabled:P},c&&$||!c&&S?o.createElement(Ga,{className:"w-5 h-5 text-primary"}):o.createElement(ge,{className:"w-5 h-5 text-primary"}))),o.createElement("div",{className:"rounded-b-lg dark:bg-gray-750 h-9"})))}function Tc({showPassword:e,setShowPassword:t}){return o.createElement(D,{content:e?"Hide Password":"Show Password"},o.createElement("div",{className:Lc},e?o.createElement(bn,{onClick:()=>t(!1),className:"w-5 h-5"}):o.createElement(xn,{onClick:()=>t(!0),className:"w-5 h-5"})))}const qc=e=>N(`\n  h-full\n  cursor-pointer\n  select-none\n  focus:outline-none\n  text-13\n  border-b-4\n  flex\n  items-center\n  box-content\n  ${e?"text-gray-900 dark:text-gray-100 dark:border-white":"text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 border-transparent"}\n`),Hc=e=>N(`\n  px-4\n  h-8\n  flex\n  items-center\n  rounded\n  ${e?"bg-green-600":"bg-gray-500"}\n  disabled:opacity-50\n  disabled:cursor-not-allowed\n  text-primary\n  select-none\n  cursor-pointer\n  text-13\n  focus:outline-none\n`),jc=N("\n  flex\n  w-full\n  items-center\n  dark:hover:bg-gray-725\n  px-2\n  py-1\n  h-12\n  rounded\n  cursor-pointer\n"),zc="MutualServers",Bc="MutualFriends",_c="Folders";var Vc=i.exports.memo((function(){var e,t,r,a,l,s;const[c]=il(),[m,d,u,p]=fl((e=>[e.dialogUserId,e.setDialogUserId,e.userDialogOpen,e.setUserDialogOpen])),{t:g}=$(),[v,h]=i.exports.useState(zc),{data:f}=Ha({variables:{id:m},skip:!m}),x=null==f?void 0:f.user,[E]=Zr(),[y]=ea(),[w]=na();!function(e){const t={...Rn,...e};n(ra,t)}();const[N]=function(e){const t={...Rn,...e};return n(aa,t)}();sa();const k=null!=(t=null==(e=null==f?void 0:f.user)?void 0:e.relatedUsers)?t:[],C=null!=(a=null==(r=null==f?void 0:f.user)?void 0:r.servers)?a:[],I=null!=(s=null==(l=null==f?void 0:f.user)?void 0:l.folders)?s:[],S=i.exports.useCallback((()=>{p(!1)}),[p]),U=i.exports.useMemo((()=>(null==x?void 0:x.relationshipStatus)===Zn.FriendRequestIncoming?o.createElement(o.Fragment,null,o.createElement("button",{className:Hc(!0),onClick:()=>w({variables:{input:{userId:m,accept:!0}}})},g("user.context.accept")),o.createElement("button",{className:Hc(!1),onClick:()=>w({variables:{input:{userId:m,accept:!0}}})},g("user.context.ignore"))):(null==x?void 0:x.relationshipStatus)===Zn.FriendRequestOutgoing?o.createElement("button",{className:Hc(!1),onClick:()=>y({variables:{input:{userId:m}},optimisticResponse:{deleteFriendRequest:{...x,relationshipStatus:Zn.None}}})},g("user.context.revoke")):(null==x?void 0:x.relationshipStatus)===Zn.Friends?o.createElement(b,{to:`/dm/${m}`,onClick:()=>S(),className:Hc(!0)},g("user.context.sendMessage")):(null==x?void 0:x.relationshipStatus)===Zn.Blocking?o.createElement("button",{className:Hc(!1),onClick:()=>N({variables:{input:{userId:m}}})},g("user.context.unblock")):(null==x?void 0:x.relationshipStatus)===Zn.Blocked?o.createElement("button",{disabled:!0,className:Hc(!1)},g("user.context.blockingYou")):o.createElement("button",{className:Hc(!0),onClick:()=>E({variables:{input:{userId:m}},optimisticResponse:{createFriendRequest:{...x,relationshipStatus:Zn.FriendRequestOutgoing}}})},g("user.context.sendFriendRequest"))),[x,g,m,w,y,S,N,E]);return o.createElement(us,{closeOnOverlayClick:!0,isOpen:u,close:S},o.createElement("div",{onClick:e=>e.stopPropagation(),className:"rounded-lg max-w-xl w-full dark:bg-gray-850"},o.createElement("div",{className:"flex p-5"},o.createElement(vl,{user:x,size:20,showOnline:!0,dotClassName:"ring-5 dark:ring-gray-850 w-4 h-4"}),o.createElement("div",{className:"ml-5 flex w-full pt-5"},o.createElement("div",{className:"font-semibold text-lg text-primary"},null==x?void 0:x.username),m!==(null==c?void 0:c.id)&&o.createElement(o.Fragment,null,o.createElement("div",{className:"ml-auto"}),o.createElement("div",{className:"flex items-center space-x-2.5 h-8"},U),o.createElement(is,{data:{type:Ol,user:x},leftClick:!0},o.createElement("button",{className:"h-8 cursor-pointer highlightable ml-3 focus:outline-none"},o.createElement(he,{className:"w-5 h-5"})))))),o.createElement("div",{className:"px-5 dark:border-gray-775 border-t h-14 flex items-center space-x-10"},o.createElement("button",{className:qc(v===zc),onClick:()=>h(zc)},o.createElement("div",{className:"transform translate-y-0.5"},"Mutual Planets")),o.createElement("button",{className:qc(v===Bc),onClick:()=>h(Bc)},o.createElement("div",{className:"transform translate-y-0.5"},"Mutual Friends")),o.createElement("button",{className:qc(v===_c),onClick:()=>h(_c)},o.createElement("div",{className:"transform translate-y-0.5"},"Folders"))),o.createElement("div",{className:"rounded-b-lg dark:bg-gray-750 p-2 max-h-[15rem] min-h-[15rem] h-full scrollbar-custom"},v===zc&&(C.length>0?C.map((e=>o.createElement(b,{to:`/+${e.name}`,key:e.id,className:jc,onClick:()=>S()},o.createElement($s,{server:e,size:10,className:"dark:bg-gray-800 rounded-full"}),o.createElement("div",{className:"pl-2.5 text-base text-secondary font-medium"},e.name)))):o.createElement(cl,{className:"h-36"},"No mutual planets")),v===Bc&&(k.length>0?k.map((e=>o.createElement("div",{key:e.id,className:jc,onClick:()=>d(e.id)},o.createElement(vl,{user:e,size:10,showOnline:!0,dotClassName:"ring-3 dark:ring-gray-750 w-2.5 h-2.5"}),o.createElement("div",{className:"pl-2.5"},o.createElement("div",{className:"text-base text-secondary font-medium"},e.name,o.createElement("span",{className:"text-13 text-tertiary font-normal"},"#",e.tag)))))):o.createElement(cl,{className:"h-36"},"No mutual friends")),v===_c&&(I.length>0?I.map((e=>o.createElement(b,{to:`/folder/${e.id}`,key:e.id,className:jc,onClick:()=>S()},e.avatarUrl?o.createElement("div",{className:"h-10 w-10 rounded-full bg-cover bg-no-repeat bg-center",style:{backgroundImage:`url(${e.avatarUrl})`}}):o.createElement(O,{className:"text-gray-500 w-6 h-6 mx-2"}),o.createElement("div",{className:"pl-2.5 text-base text-secondary font-medium"},e.name)))):o.createElement(cl,{className:"h-36"},"No visible folders")))))}));var Gc=En((function({history:e}){const t="Mac OS"===rl();return o.createElement(yn,{client:Uc},o.createElement(wn,null,o.createElement(Ye,{titleTemplate:"%s – Comet"},o.createElement("meta",{charSet:"UTF-8"}),o.createElement("link",{rel:"icon",type:"image/svg+xml",href:"/logos/logo_icon.svg"}),o.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"})),o.createElement(Nn,{history:e},o.createElement(os,null,o.createElement(kn,{backend:Cn,options:{enableTouchEvents:!1,enableMouseEvents:!0}},o.createElement(Fc,null),o.createElement(pc,null),o.createElement(fc,null),window.electron&&!t&&o.createElement(Ec,null),o.createElement(Dc,null),o.createElement(Vc,null),o.createElement("div",{style:window.electron?{height:t?"100%":"calc(100% - 1.375rem)"}:{height:"100%"},className:"hidden lg:flex"},o.createElement(dc,null)))))))}));const Yc=$n();In({dsn:"https://1cff6f3dfcb844e8bd098e35a0498e5a@o683674.ingest.sentry.io/5771326",integrations:[new Sn.BrowserTracing({routingInstrumentation:Un(Yc)})],release:"web@0.0.65",tracesSampleRate:1,enabled:{}.PROD&&"https://1cff6f3dfcb844e8bd098e35a0498e5a@o683674.ingest.sentry.io/5771326"}),window.electron&&document.documentElement.classList.add("electron"),Fn.render(o.createElement(Gc,{history:Yc}),document.getElementById("root"));
