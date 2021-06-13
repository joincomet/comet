import{g as e,u as t,a as n,b as r,i as a,B as l,c as s,A as o,d as i,m as c,e as m,z as d,f as u,p,r as g,s as v,h,R as f,L as b,j as E,k as x,N as y,l as w,H as N,n as k,o as C,q as $,t as U,v as S,w as I,x as P,y as F,F as M,C as R,D as A,E as D,G as T,I as L,J as O,K as z,M as q,O as H,P as B,Q as _,S as j,T as G,U as V,V as Y,W,X as Z,Y as Q,Z as J,_ as K,$ as X,a0 as ee,a1 as te,a2 as ne,a3 as re,a4 as ae,a5 as le,a6 as se,a7 as oe,a8 as ie,a9 as ce,aa as me,ab as de,ac as ue,ad as pe,ae as ge,af as ve,ag as he,ah as fe,ai as be,aj as Ee,ak as xe,al as ye,am as we,an as Ne,ao as ke,ap as Ce,aq as $e,ar as Ue,as as Se,at as Ie,au as Pe,av as Fe,aw as Me,ax as Re,ay as Ae,az as De,aA as Te,aB as Le,aC as Oe,aD as ze,aE as qe,aF as He,aG as Be,aH as _e,aI as je,aJ as Ge,aK as Ve,aL as Ye,aM as We,aN as Ze,aO as Qe,aP as Je,aQ as Ke,aR as Xe,aS as et,aT as tt,aU as nt,aV as rt,aW as at,aX as lt,aY as st,aZ as ot,a_ as it,a$ as ct,b0 as mt,b1 as dt,b2 as ut,b3 as pt,b4 as gt,b5 as vt,b6 as ht,b7 as ft,b8 as bt,b9 as Et,ba as xt,bb as yt,bc as wt,bd as Nt,be as kt,bf as Ct,bg as $t,bh as Ut,bi as St,bj as It,bk as Pt,bl as Ft,bm as Mt,bn as Rt,bo as At,bp as Dt,bq as Tt,br as Lt,bs as Ot,bt as zt,bu as qt,bv as Ht,bw as Bt,bx as _t,by as jt,bz as Gt,bA as Vt,bB as Yt,bC as Wt,bD as Zt,bE as Qt,bF as Jt,bG as Kt,bH as Xt,bI as en,bJ as tn,bK as nn,bL as rn,bM as an,bN as ln,bO as sn,bP as on,bQ as cn,bR as mn,bS as dn,bT as un,bU as pn,bV as gn,bW as vn,bX as hn,bY as fn,bZ as bn,b_ as En,b$ as xn,c0 as yn,c1 as wn,c2 as Nn,c3 as kn,c4 as Cn,c5 as $n,c6 as Un,c7 as Sn,c8 as In,c9 as Pn,ca as Fn,cb as Mn,cc as Rn}from"./vendor.74bbc3a5.js";const An={entityNotFound:"{{replace}} not found!",invalidUserAuth:"'USER' authorization can only be used on User entity",notLoggedIn:"Not logged in",fileSize:"File size must be less than {{replace}}MB",channelPermissions:"(useChannelPermissions) channelPermissions and serverPermissions must have same length",folder:{deleted:"Folder has been deleted",notOwner:"You do not own this folder",nameTooLong:"Name cannot be longer than 300 characters",alreadyExists:"You already have a folder with that name",noPermission:"You do not have permission to modify this folder.",alreadyAdded:"This post is already in this folder.",cannotEdit:"Cannot edit Read Later or Favorites folders.",cannotDelete:"Cannot delete Read Later or Favorites folders.",cannotCreate:"Cannot create Read Later or Favorites folders.",notCollaborative:"This folder is not collaborative.",notInFolder:"That post is not in this folder.",owner:"You are the owner of this folder",private:"That folder is private.",friends:"Must be friends with this folder's owner"},message:{notAuthor:"You are not the author of this message",missingArgs:"Must provide channelId, groupId, or userId",notSentInChannel:"Message was not sent in a channel",empty:"Message cannot be empty",textOrFile:"Must provide text or a file"},comment:{notAuthor:"You are not the author of this comment",empty:"Comment cannot be empty",alreadyDeleted:"Comment already deleted",alreadyVoted:"You have already voted this comment"},post:{notAuthor:"You are not the author of this post",alreadyVoted:"You have already voted this post",alreadyPinned:"Post is already pinned",notPinned:"Post is not pinned"},group:{maxSize:"Max group size is 10 users",notJoined:"You are not in this group"},server:{notJoined:"You have not joined this planet",banned:"You are banned from this planet",alreadyJoined:"You have already joined this planet",missingPermission:"Missing planet permission {{replace}}",notOwner:"Must be planet owner",inviteRequired:"Invite required to join this planet",inviteExpired:"This invite has expired."},channel:{missingPermission:"Missing channel permission {{replace}}"},user:{blocking:"You are blocking this user",blocked:"This user has blocked you",friendRequestNotSent:"You have not sent a friend request to this user",friendRequestNotReceived:"You have not received a friend request from this user",notFriends:"You are not friends with this user",alreadyBlocking:"You are already blocking this user",notBlocking:"You are not blocking this user"},upload:{invalidMime:"Image must be PNG or JPEG"},login:{invalid:"Invalid login",invalidEmail:"Invalid email address",emailInUse:"Email already in use",illegalName:"Name cannot contain {{replace}}",nameLength:"Name must be 2-32 characters",banned:"Banned{{replace}}",wrongPassword:"Incorrect password",usernameTaken:"Username taken"},notif:{notYours:"This is not your notification"}},Dn={hide:"Hide Folders",show:"Show Folders",favorites:"Favorites",readLater:"Read Later",added:"Added to {{name}}!",name:"Name",postCount:"{{count}} Post",postCount_plural:"{{count}} Posts",createdBy:"Created by",userFolder:"User Folder",serverFolder:"Planet Folder",collaborative:"Collaborative",user:{title:"Your Folders",create:"Create Folder"},server:{title:"{{name}}'s Folders",create:"Create Planet Folder"},context:{follow:"Follow Folder",unfollow:"Unfollow Folder",delete:"Delete Folder",copyLink:"Copy Folder Link",edit:"Edit Folder",collaborative:"Collaborative",changeVisibility:"Change Visibility",visibility:{public:"Public",friends:"Friends Only",private:"Private",unlisted:"Unlisted"}}},Tn={};var Ln,On,zn,qn,Hn,Bn,_n,jn,Gn,Vn,Yn,Wn,Zn,Qn,Jn,Kn,Xn,er,tr,nr,rr,ar,lr,sr,or,ir,cr,mr;(On=Ln||(Ln={})).Private="Private",On.Public="Public",On.Restricted="Restricted",(qn=zn||(zn={})).Blue="Blue",qn.Green="Green",qn.Indigo="Indigo",qn.Pink="Pink",qn.Purple="Purple",qn.Red="Red",qn.Yellow="Yellow",(Bn=Hn||(Hn={})).New="New",Bn.Top="Top",(jn=_n||(_n={})).Friends="Friends",jn.Private="Private",jn.Public="Public",jn.Unlisted="Unlisted",(Vn=Gn||(Gn={})).FriendRequestReceived="FriendRequestReceived",Vn.Initial="Initial",Vn.Join="Join",Vn.Left="Left",Vn.Normal="Normal",(Wn=Yn||(Yn={})).Away="Away",Wn.DoNotDisturb="DoNotDisturb",Wn.Offline="Offline",Wn.Online="Online",(Qn=Zn||(Zn={})).All="All",Qn.Featured="Featured",Qn.Joined="Joined",(Kn=Jn||(Jn={})).Added="Added",Kn.Hot="Hot",Kn.New="New",Kn.Top="Top",(er=Xn||(Xn={})).All="All",er.Day="Day",er.Hour="Hour",er.Month="Month",er.Week="Week",er.Year="Year",(nr=tr||(tr={})).New="New",nr.Top="Top",(ar=rr||(rr={})).Blocked="Blocked",ar.Blocking="Blocking",ar.FriendRequestIncoming="FriendRequestIncoming",ar.FriendRequestOutgoing="FriendRequestOutgoing",ar.Friends="Friends",ar.None="None",(sr=lr||(lr={})).Arts="Arts",sr.Business="Business",sr.Culture="Culture",sr.Discussion="Discussion",sr.Entertainment="Entertainment",sr.Gaming="Gaming",sr.Health="Health",sr.Hobbies="Hobbies",sr.Lifestyle="Lifestyle",sr.Memes="Memes",sr.Meta="Meta",sr.News="News",sr.Other="Other",sr.Politics="Politics",sr.Programming="Programming",sr.Science="Science",sr.Sports="Sports",sr.Technology="Technology",(ir=or||(or={})).AddPostToFolder="AddPostToFolder",ir.Admin="Admin",ir.DisplayRoleSeparately="DisplayRoleSeparately",ir.ManageChannels="ManageChannels",ir.ManageComments="ManageComments",ir.ManageFolders="ManageFolders",ir.ManageMessages="ManageMessages",ir.ManagePosts="ManagePosts",ir.ManageServer="ManageServer",ir.ManageUsers="ManageUsers",ir.PrivateChannels="PrivateChannels",ir.RestrictedChannels="RestrictedChannels",ir.SendMessages="SendMessages",(mr=cr||(cr={})).Down="Down",mr.None="None",mr.Up="Up";const dr=e`
    fragment Channel on Channel {
  id
  name
  description
  isUnread
  mentionCount
  type
}
    `,ur=e`
    fragment Image on Image {
  originalUrl
  popupUrl
  popupWidth
  popupHeight
  smallUrl
  smallWidth
  smallHeight
}
    `,pr=e`
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
    ${ur}`,gr=e`
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
    ${pr}`,vr=e`
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
    `,hr=e`
    fragment Group on Group {
  id
  name
  displayName
  avatarUrl
  unreadCount
  lastMessageAt
}
    `,fr=e`
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
    ${vr}
${hr}`,br=e`
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
    `,Er=e`
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
    ${ur}
${pr}`,xr=e`
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
    ${pr}
${ur}`,yr=e`
    fragment RelatedUser on User {
  ...User
  showChat
  unreadCount
  lastMessageAt
}
    ${vr}`,wr=e`
    fragment Role on Role {
  id
  name
  color
  permissions
  isDefault
}
    `,Nr=e`
    fragment ServerUser on ServerUser {
  id
  role {
    ...Role
  }
  user {
    ...User
  }
}
    ${wr}
${vr}`,kr=e`
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
    ${vr}
${Nr}`,Cr=e`
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
    `,$r=e`
    mutation createChannel($input: CreateChannelInput!) {
  createChannel(input: $input) {
    ...Channel
  }
}
    ${dr}`;const Ur=e`
    mutation updateChannel($input: UpdateChannelInput!) {
  updateChannel(input: $input) {
    ...Channel
  }
}
    ${dr}`;const Sr=e`
    mutation deleteChannel($input: DeleteChannelInput!) {
  deleteChannel(input: $input)
}
    `;e`
    mutation moveChannel($input: MoveChannelInput!) {
  moveChannel(input: $input) {
    ...Channel
  }
}
    ${dr}`;const Ir=e`
    mutation readChannel($input: ReadChannelInput!) {
  readChannel(input: $input) {
    ...Channel
  }
}
    ${dr}`;const Pr=e`
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
    ${gr}
${vr}
${Nr}`;e`
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
    ${gr}
${vr}
${Nr}`;const Fr=e`
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
    ${gr}
${vr}
${Nr}`;const Mr=e`
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
    ${gr}
${vr}
${Nr}`;const Rr=e`
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
    ${gr}
${vr}
${Nr}`;const Ar=e`
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
    ${gr}
${vr}
${Nr}`;e`
    mutation createFolder($input: CreateFolderInput!) {
  createFolder(input: $input) {
    ...Folder
  }
}
    ${br}`;const Dr=e`
    mutation updateFolder($input: UpdateFolderInput!) {
  updateFolder(input: $input) {
    ...Folder
  }
}
    ${br}`;const Tr=e`
    mutation deleteFolder($input: DeleteFolderInput!) {
  deleteFolder(input: $input)
}
    `;e`
    mutation moveServerFolder($input: MoveServerFolderInput!) {
  moveServerFolder(input: $input) {
    ...Folder
  }
}
    ${br}`,e`
    mutation moveUserFolder($input: MoveUserFolderInput!) {
  moveUserFolder(input: $input) {
    ...Folder
  }
}
    ${br}`;const Lr=e`
    mutation followFolder($input: FollowFolderInput!) {
  followFolder(input: $input) {
    ...Folder
  }
}
    ${br}`;const Or=e`
    mutation unfollowFolder($input: UnfollowFolderInput!) {
  unfollowFolder(input: $input) {
    ...Folder
  }
}
    ${br}`;e`
    mutation addPostToFolder($input: AddPostToFolderInput!) {
  addPostToFolder(input: $input) {
    ...Folder
  }
}
    ${br}`,e`
    mutation removePostFromFolder($input: RemovePostFromFolderInput!) {
  removePostFromFolder(input: $input) {
    ...Folder
  }
}
    ${br}`,e`
    mutation createGroup($input: CreateGroupInput!) {
  createGroup(input: $input) {
    ...Group
  }
}
    ${hr}`,e`
    mutation updateGroup($input: UpdateGroupInput!) {
  updateGroup(input: $input) {
    ...Group
  }
}
    ${hr}`,e`
    mutation leaveGroup($input: LeaveGroupInput!) {
  leaveGroup(input: $input)
}
    `;const zr=e`
    mutation readGroup($input: ReadGroupInput!) {
  readGroup(input: $input) {
    ...Group
  }
}
    ${hr}`;e`
    mutation addUserToGroup($input: AddUserToGroupInput!) {
  addUserToGroup(input: $input) {
    ...Group
  }
}
    ${hr}`,e`
    mutation removeUserFromGroup($input: RemoveUserFromGroupInput!) {
  removeUserFromGroup(input: $input) {
    ...Group
  }
}
    ${hr}`;const qr=e`
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
    ${Er}
${vr}
${Nr}`;function Hr(e){const n={...Tn,...e};return t(qr,n)}e`
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
    ${Er}
${vr}
${Nr}`;const Br=e`
    mutation deleteMessage($input: DeleteMessageInput!) {
  deleteMessage(input: $input)
}
    `;const _r=e`
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
    ${Er}
${vr}
${Nr}`;function jr(e){const n={...Tn,...e};return t(_r,n)}const Gr=e`
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
    ${Er}
${vr}
${Nr}`;function Vr(e){const n={...Tn,...e};return t(Gr,n)}const Yr=e`
    mutation updateTyping($input: TypingInput!) {
  updateTyping(input: $input)
}
    `;const Wr=e`
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
    ${xr}
${vr}
${Nr}`;e`
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
    ${xr}
${vr}
${Nr}`;const Zr=e`
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
    ${xr}
${vr}
${Nr}`;const Qr=e`
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
    ${xr}
${vr}
${Nr}`;e`
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
    ${xr}
${vr}
${Nr}`,e`
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
    ${xr}
${vr}
${Nr}`;const Jr=e`
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
    ${vr}
${yr}`;e`
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
    ${vr}
${yr}`,e`
    mutation answerFriendRequest($input: AnswerFriendRequestInput!) {
  answerFriendRequest(input: $input) {
    ...RelatedUser
  }
}
    ${yr}`,e`
    mutation blockUser($input: BlockUserInput!) {
  blockUser(input: $input) {
    ...RelatedUser
  }
}
    ${yr}`,e`
    mutation unblockUser($input: UnblockUserInput!) {
  unblockUser(input: $input) {
    ...RelatedUser
  }
}
    ${yr}`;const Kr=e`
    mutation removeFriend($input: RemoveFriendInput!) {
  removeFriend(input: $input) {
    ...RelatedUser
  }
}
    ${yr}`;const Xr=e`
    mutation readDm($input: ReadDmInput!) {
  readDm(input: $input) {
    ...RelatedUser
  }
}
    ${yr}`;function ea(e){const n={...Tn,...e};return t(Xr,n)}const ta=e`
    mutation openDm($input: OpenDmInput!) {
  openDm(input: $input) {
    ...RelatedUser
  }
}
    ${yr}`;const na=e`
    mutation closeDm($input: CloseDmInput!) {
  closeDm(input: $input) {
    ...RelatedUser
  }
}
    ${yr}`;function ra(e){const n={...Tn,...e};return t(na,n)}const aa=e`
    mutation markReplyRead($input: MarkReplyReadInput!) {
  markReplyRead(input: $input) {
    ...Reply
  }
}
    ${kr}`;const la=e`
    mutation markReplyUnread($input: MarkReplyUnreadInput!) {
  markReplyUnread(input: $input) {
    ...Reply
  }
}
    ${kr}`;const sa=e`
    mutation createRole($input: CreateRoleInput!) {
  createRole(input: $input) {
    ...Role
  }
}
    ${wr}`;const oa=e`
    mutation updateRole($input: UpdateRoleInput!) {
  updateRole(input: $input) {
    ...Role
  }
}
    ${wr}`;const ia=e`
    mutation deleteRole($input: DeleteRoleInput!) {
  deleteRole(input: $input)
}
    `;const ca=e`
    mutation setUserRole($input: SetUserRoleInput!) {
  setUserRole(input: $input) {
    ...ServerUser
  }
}
    ${Nr}`;const ma=e`
    mutation createServer($input: CreateServerInput!) {
  createServer(input: $input) {
    ...Server
    roles {
      ...Role
    }
  }
}
    ${Cr}
${wr}`;const da=e`
    mutation updateServer($input: UpdateServerInput!) {
  updateServer(input: $input) {
    ...Server
  }
}
    ${Cr}`;const ua=e`
    mutation deleteServer($input: DeleteServerInput!) {
  deleteServer(input: $input)
}
    `;e`
    mutation moveServer($input: MoveServerInput!) {
  moveServer(input: $input)
}
    `;const pa=e`
    mutation joinServer($input: JoinServerInput!) {
  joinServer(input: $input) {
    ...Server
  }
}
    ${Cr}`;const ga=e`
    mutation leaveServer($input: LeaveServerInput!) {
  leaveServer(input: $input) {
    ...Server
  }
}
    ${Cr}`;function va(e){const n={...Tn,...e};return t(ga,n)}e`
    mutation readServer($input: ReadServerInput!) {
  readServer(input: $input) {
    ...Server
  }
}
    ${Cr}`;const ha=e`
    mutation banUserFromServer($input: BanUserFromServerInput!) {
  banUserFromServer(input: $input)
}
    `;e`
    mutation unbanUserFromServer($input: UnbanUserFromServerInput!) {
  unbanUserFromServer(input: $input)
}
    `;const fa=e`
    mutation kickUserFromServer($input: KickUserFromServerInput!) {
  kickUserFromServer(input: $input)
}
    `;const ba=e`
    mutation featureServer($input: FeatureServerInput!) {
  featureServer(input: $input) {
    ...Server
  }
}
    ${Cr}`;const Ea=e`
    mutation unfeatureServer($input: UnfeatureServerInput!) {
  unfeatureServer(input: $input) {
    ...Server
  }
}
    ${Cr}`;const xa=e`
    mutation createAccount($input: CreateAccountInput!) {
  createAccount(input: $input) {
    accessToken
    user {
      ...CurrentUser
    }
  }
}
    ${fr}`;const ya=e`
    mutation changePassword($input: ChangePasswordInput!) {
  changePassword(input: $input) {
    ...CurrentUser
  }
}
    ${fr}`;const wa=e`
    mutation changeUserAvatar($input: ChangeUserAvatarInput!) {
  changeUserAvatar(input: $input) {
    ...CurrentUser
  }
}
    ${fr}`;const Na=e`
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
    ${fr}`;const Ca=e`
    mutation changeOnlineStatus($input: ChangeOnlineStatusInput!) {
  changeOnlineStatus(input: $input) {
    ...CurrentUser
  }
}
    ${fr}`;const $a=e`
    mutation globalBan($input: GlobalBanInput!) {
  globalBan(input: $input)
}
    `;const Ua=e`
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
    ${gr}
${vr}
${Nr}`;const Sa=e`
    query currentUser @live {
  user {
    ...CurrentUser
  }
}
    ${fr}`;e`
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
    ${br}
${vr}`;const Ia=e`
    query getLinkMeta($linkUrl: String!) {
  getLinkMeta(linkUrl: $linkUrl) {
    ...Metadata
  }
}
    ${pr}`;const Pa=e`
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
    ${Er}
${vr}
${Nr}`;const Fa=e`
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
    ${xr}
${vr}
${Nr}`;const Ma=e`
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
    ${xr}
${vr}
${Nr}`;const Ra=e`
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
    `;function Aa(e){const t={...Tn,...e};return n(Ra,t)}const Da=e`
    query replies {
  replies {
    ...Reply
  }
}
    ${kr}`;function Ta(e){const t={...Tn,...e};return n(Da,t)}const La=e`
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
    ${Cr}
${dr}
${wr}`;const Oa=e`
    query serverUsers($serverId: ID!) @live {
  serverUsers(serverId: $serverId) {
    ...ServerUser
  }
}
    ${Nr}`;const za=e`
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
    ${vr}`;function qa(e){const t={...Tn,...e};return n(za,t)}e`
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
    ${gr}`;const Ha=e`
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
    ${Er}
${vr}
${Nr}`;e`
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
    ${xr}`,e`
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
    ${kr}`;const Ba=e`
    subscription typingUpdated($userId: ID, $groupId: ID, $channelId: ID) {
  typingUpdated(userId: $userId, groupId: $groupId, channelId: $channelId) {
    typingUserId
    isTyping
  }
}
    `;const _a={en:{translation:{home:"Home",copyId:"Copy ID",markRead:"Mark As Read",continue:"Continue",more:"More",updateAvailable:"Update Available!",auth:{login:"Login",createAccount:"Create an Account",welcomeBack:"Welcome Back!",name:"Name",password:"Password",email:"Email",alreadyHaveAccount:"Already have an account?",register:"Register",needAccount:"Need an account?"},category:{Featured:"Featured",Arts:"Arts",Business:"Business",Culture:"Culture",Discussion:"Discussion",Entertainment:"Entertainment",Gaming:"Gaming",Health:"Health",Hobbies:"Hobbies",Lifestyle:"Lifestyle",Memes:"Memes",Meta:"Meta",News:"News",Politics:"Politics",Programming:"Programming",Science:"Science",Sports:"Sports",Technology:"Technology",Other:"Other"},channel:{title:"Channels",togglePrivate:"Private Channel",hideUsers:"Hide Users",showUsers:"Show Users",create:"Create Channel",edit:"Edit Channel",context:{markRead:"Mark As Read",delete:"Delete Channel",edit:"Edit Channel",mute:"Mute Channel"}},comment:{noPermission:"You do not have permission to view comments.",reply:"Reply",cancelReply:"Cancel Reply",hideReplies:"Hide Replies",showReplies:"Show Replies",create:{submit:"Comment",cancel:"Cancel"},context:{copyLink:"Copy Comment Link",delete:"Delete Comment",reply:"Reply",vote:"Add Rocket",unvote:"Remove Rocket",votePermission:"This planet does not allow you to rocket comments.",pin:"Pin Comment",unpin:"Unpin Comment",edit:"Edit Comment"}},dm:{title:"Direct Messages",create:"Create DM",markRead:"Mark Read",shared:"Shared with {{user.username}}!"},error:An,explore:{title:"Explore",categories:"Categories",all:"All"},folder:Dn,inbox:{title:"Inbox",tab:{all:"All",unread:"Unread"}},infinity:{comingSoon:"Comet Infinity is coming soon!",title:"Infinity"},message:{message:"Message",pinned:"Pinned Messages",upload:"Upload a File",typing:{one:"{{name}} is typing...",two:"{{name1}} and {{name2}} are typing...",three:"{{name1}}, {{name2}}, and {{name3}} are typing...",several:"Several people are typing..."},context:{copyLink:"Copy Message Link",pin:"Pin Message",unpin:"Unpin Message",edit:"Edit Message",delete:"Delete Message"}},permissions:{server:{[or.ManageChannels]:{title:"Manage Channels",description:"Allows members to create, edit, or delete channels."},[or.ManageServer]:{title:"Manage Roles",description:"Allows members to create new roles and edit or delete roles lower than their highest role. Also allows members to change permissions of individual channels that they have access to."},[or.ManageServer]:{title:"Manage Planet",description:"Allows members to change this planet's name, description, icon, and banner image."},[or.SendMessages]:{title:"Send Messages",description:"Allows members to send messages in text channels."},[or.RestrictedChannels]:{title:"Send Messages in Restricted Channels",description:"Allows members to send messages in restricted text channels."},[or.PrivateChannels]:{title:"Use Private Channels",description:"Allows members to view and send messages in private text channels."},[or.ManageMessages]:{title:"Manage Messages",description:"Allows members to remove messages by other members or pin any message."},[or.ManagePosts]:{title:"Manage Posts",description:"Allows members to pin and remove posts."},[or.ManageComments]:{title:"Manage Comments",description:"Allows members to pin and remove comments."},[or.ManageFolders]:{title:"Manage Folders",description:"Allows members to create, delete, and edit folders."},[or.AddPostToFolder]:{title:"Add Posts to Folders",description:"Allows members to add and remove posts from folders."},[or.DisplayRoleSeparately]:{title:"Display Role Separately",description:"Members with this role will appear separately in the users list"},[or.Admin]:{title:"Administrator",description:"Members with this role have every permission"},[or.ManageUsers]:{title:"Manage Users",description:"Ban and kick users"}}},post:{createPost:"Create a post",create:{submit:"Post",cancel:"Cancel"},type:{text:"Text Post",link:"Link Post",image:"Image Post",album:"Image Album"},createComment:"Write a comment",commentCount:"{{count}} Comment",commentCount_plural:"{{count}} Comments",participantCount:"{{count}} Participant",participantCount_plural:"{{count}} Participants",creator:"Creator",context:{pin:"Pin Post",pinned:"Post pinned!",unpin:"Unpin Post",unpinned:"Post unpinned!",removeFromFolder:"Remove from Folder",addToUserFolder:"Add to Folder",addToServerFolder:"Add to Planet Folder",edit:"Edit Post",delete:"Delete Post",deleted:"Post deleted!",copyLink:"Copy Post Link",sendToFriend:"Send to Friend",vote:"Add Rocket",unvote:"Remove Rocket",votePermission:"This planet does not allow you to rocket posts."},hideParticipants:"Hide Participants",showParticipants:"Show Participants",pinnedTo:"Pinned to {{server.name}}",expand:"Show Details",collapse:"Hide Details",feed:{title:"Your Feed",refresh:"Refresh Posts",sort:{hot:"Hot",top:"Top",new:"New"},time:{hour:"Hour",day:"Day",week:"Week",month:"Month",year:"Year",all:"All"},liveMode:{title:"Live Mode",description:"Automatically add new posts to feed",comingSoon:"Live Mode is coming soon!"},subscriptions:{show:"Show Subscriptions",hide:"Hide Subscriptions",comingSoon:"Planet subscriptions are coming soon!"}}},search:{comingSoon:"Search is coming soon!"},server:{loading:"Loading planet...",feed:"Feed",invitePeople:"Invite People",onlineCount:"{{count}} online",memberCount:"{{count}} Member",memberCount_plural:"{{count}} Members",context:{markRead:"Mark As Read",mute:"Mute Planet",invite:"Invite People",leave:"Leave Planet"},create:{title:"Create Planet",name:"Planet Name",upload:"Upload",requireInvite:"Require Invite to Join"}},settings:{title:"Settings"},user:{hideUsers:"Hide Users",showUsers:"Show Users",context:{viewProfile:"Profile",closeDm:"Close DM",block:"Block",unblock:"Unblock",addFriend:"Add Friend",removeFriend:"Remove Friend",sendMessage:"Send Message",message:"Message",kickUser:"Kick {{user.username}}",banUser:"Ban {{user.username}}",banPrompt:"Reason (Optional)",ignore:"Ignore",accept:"Accept",revoke:"Revoke Friend Request",sendFriendRequest:"Send Friend Request",blockingYou:"Blocking You",markRead:"Mark as Read"},profile:{sentFriendRequest:"Request Sent",receivedFriendRequest:"Accept Request",mutualServers:"Mutual Planets",mutualFriends:"Mutual Friends",sendMessage:"Send Message"},offline:"Offline",online:"Online",friends:{title:"Friends",sendMessage:"Message",revokeRequest:"Cancel",acceptRequest:"Accept",rejectRequest:"Ignore",tab:{online:"Online",all:"All",pending:"Pending",blocked:"Blocked",add:"Add Friend"}}}}}};a.use(l).use(s).init({resources:_a,fallbackLng:"en",debug:!1,load:"languageOnly",interpolation:{escapeValue:!1}});const ja={status:"connecting"};const Ga=g.exports.createContext({user:null,loading:!0});function Va({children:e}){const{data:t,loading:r}=function(e){const t={...Tn,...e};return n(Sa,t)}({fetchPolicy:"cache-and-network",nextFetchPolicy:"cache-first"}),a=null==t?void 0:t.user;return g.exports.useEffect((()=>{a?v({id:a.id,email:a.email,username:a.username}):h((e=>e.setUser(null)))}),[a]),f.createElement(Ga.Provider,{value:{user:a,loading:(r||"connected"!==ja.status)&&!a}},e)}const Ya=()=>{const{user:e,loading:t}=g.exports.useContext(Ga);return[e,t]};var Wa=g.exports.memo((function({children:e="No more posts loaded!",className:t="h-48"}){return f.createElement("div",{className:"flex flex-col items-center justify-center text-primary py-6"},f.createElement("img",{alt:"astronaut",src:"/astronaut.png",className:`object-contain opacity-50 animate-float select-none pointer-events-none ${t}`}),f.createElement("div",{className:"text-tertiary pt-3 text-lg font-semibold"},e))}));function Za(){return Ya(),f.createElement("div",{className:"relative h-full w-full dark:bg-gray-750 flex flex-col items-center justify-center p-6 text-center"},f.createElement("div",{className:"text-center space-y-3"},f.createElement(Wa,null,"This page does not exist.",f.createElement(b,{to:"/",className:"block text-lg pt-3 text-accent font-medium cursor-pointer hover:underline"},"Return home"))))}function Qa(){let e=window.navigator.userAgent,t=window.navigator.platform,n=null;return-1!==["Macintosh","MacIntel","MacPPC","Mac68K"].indexOf(t)?n="Mac OS":-1!==["iPhone","iPad","iPod"].indexOf(t)?n="iOS":-1!==["Win32","Win64","Windows","WinCE"].indexOf(t)?n="Windows":/Android/.test(e)?n="Android":/Linux/.test(t)&&(n="Linux"),n}const Ja=E(((e,t)=>({friendsPage:"Online",setFriendsPage:t=>e({friendsPage:t}),inboxPage:"Unread",setInboxPage:t=>e({inboxPage:t}),postsSort:"Hot",setPostsSort:t=>e({postsSort:t}),postsTime:"Day",setPostsTime:t=>e({postsTime:t}),postsFeed:"Joined",setPostsFeed:t=>e({postsFeed:t}),commentsSort:"Top",setCommentsSort:t=>e({commentsSort:t}),liveMode:!1,setLiveMode:t=>e({liveMode:t}),serverPages:{},setServerPage:(n,r)=>e({serverPages:{...t().serverPages,[n]:r}}),homePage:null,setHomePage:t=>e({homePage:t}),replyingCommentId:null,setReplyingCommentId:t=>e({replyingCommentId:t}),canGoBack:!1,setCanGoBack:t=>e({canGoBack:t}),exploreSort:"Top",setExploreSort:t=>e({exploreSort:t}),exploreCategory:null,setExploreCategory:t=>e({exploreCategory:t}),dialogUserId:null,setDialogUserId:t=>e({dialogUserId:t,userDialogOpen:!!t}),userDialogOpen:!1,setUserDialogOpen:t=>e({userDialogOpen:t}),folderSort:"Added",setFolderSort:t=>e({folderSort:t}),updateAvailable:!1,setUpdateAvailable:t=>e({updateAvailable:t}),loginDialog:!1,setLoginDialog:t=>e({loginDialog:t}),createAccount:!1,setCreateAccount:t=>e({createAccount:t}),showLeftSidebar:!1,setShowLeftSidebar:t=>e({showLeftSidebar:t}),showRightSidebar:!["iOS","Android"].includes(Qa()),setShowRightSidebar:t=>e({showRightSidebar:t})})));function Ka({className:e}){return f.createElement("svg",{className:e,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor"},f.createElement("path",{fillRule:"evenodd",d:"M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z",clipRule:"evenodd"}))}function Xa({className:e}){return f.createElement("svg",{className:e,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor"},f.createElement("path",{d:"M13 7H7v6h6V7z"}),f.createElement("path",{fillRule:"evenodd",d:"M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z",clipRule:"evenodd"}))}function el({className:e}){return f.createElement("svg",{className:e,viewBox:"0 0 24 24"},f.createElement("path",{fill:"currentColor",d:"M17 14H19V17H22V19H19V22H17V19H14V17H17V14M20 12C20 8.64 17.93 5.77 15 4.59V5C15 6.1 14.1 7 13 7H11V9C11 9.55 10.55 10 10 10H8V12H14C14.5 12 14.9 12.35 15 12.81C13.2 13.85 12 15.79 12 18C12 19.5 12.54 20.85 13.44 21.9L12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12L21.9 13.44C21.34 12.96 20.7 12.59 20 12.34L20 12M11 19.93V18C9.9 18 9 17.1 9 16V15L4.21 10.21C4.08 10.78 4 11.38 4 12C4 16.08 7.06 19.44 11 19.93Z"}))}function tl({className:e="h-5 w-5 text-primary"}){return f.createElement("svg",{className:`animate-spin ${e}`,xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24"},f.createElement("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),f.createElement("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"}))}function nl({className:e}){return f.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:e,viewBox:"0 0 20 20",fill:"currentColor"},f.createElement("path",{d:"M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"}),f.createElement("path",{d:"M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"}))}function rl({className:e}){return f.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:e,viewBox:"0 0 20 20",fill:"currentColor"},f.createElement("path",{fillRule:"evenodd",d:"M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z",clipRule:"evenodd"}))}var al=g.exports.forwardRef((({avatarUrl:e,children:t,loading:n="eager",className:r="",size:a=12,style:l={}},s)=>f.createElement("div",{ref:s,className:`relative flex-shrink-0 flex items-center justify-center bg-cover bg-center ${r}`,style:{width:a/4+"rem",height:a/4+"rem",backgroundImage:e?`url(${e})`:void 0,...l}},t))),ll=g.exports.forwardRef((({server:e,loading:t="eager",size:n=12,className:r="",style:a={}},l)=>{var s;const o=(null!=(s=null==e?void 0:e.displayName)?s:"").split(" ").map((e=>e[0])).join("").toUpperCase(),i=g.exports.useMemo((()=>{const e=o;return e.length<=2?"18px":3===e.length?"16px":4===e.length?"14px":5===e.length?"12px":e.length>=6?"10px":void 0}),[o]);return e?f.createElement(al,{ref:l,avatarUrl:e.avatarUrl,loading:t,className:`${r} cursor-pointer`,size:n,style:a},!e.avatarUrl&&f.createElement("svg",{width:"100%",height:"100%",viewBox:"0 0 48 48",className:"absolute top-0 left-0",overflow:"visible"},f.createElement("defs",null,f.createElement("g",null,f.createElement("path",{d:"M48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24Z"})),f.createElement("g",null,f.createElement("rect",{x:"28",y:"-4",width:"24",height:"24",rx:"12",ry:"12",transform:"translate(20 -20)"})),f.createElement("g",null,f.createElement("rect",{x:"28",y:"28",width:"24",height:"24",rx:"12",ry:"12",transform:"translate(20 20)"}))),f.createElement("foreignObject",{x:"0",y:"0",width:"48",height:"48"},f.createElement("div",{className:"flex items-center justify-center h-full",tabIndex:"-1","aria-label":e.name,style:{fontSize:i}},f.createElement("div",{className:"flex items-center justify-center whitespace-nowrap font-medium text-tertiary","aria-hidden":"true"},o))))):null}));const sl=e=>w(`\n  w-12\n  h-12\n  object-cover\n  inline-flex\n  items-center\n  justify-center\n  hover:rounded-2xl\n  ${e?"rounded-2xl":"rounded-3xl"}\n  transform\n  transition-all\n  relative\n  group\n  cursor-pointer\n`),ol=(e,t)=>w(`\n  absolute\n  left-0\n  w-1\n  dark:bg-white\n  rounded-r-2xl\n  top-1/2\n  -translate-y-1/2\n  transform\n  transition\n  duration-250\n  group-hover:-translate-x-3\n  ${e?"-translate-x-3 h-10":t?"-translate-x-3 h-2.5 group-hover:h-5":"-translate-x-4 h-5"}\n`);var il=g.exports.forwardRef((({name:e,children:t,to:n,onClick:r,className:a="dark:bg-gray-800 bg-gray-200",active:l=!1,unread:s=!1},o)=>f.createElement(x,{content:e,placement:"right",ref:o,offset:[0,22]},n?f.createElement(y,{to:n,className:`${sl(l)} ${a}`},f.createElement("div",{className:ol(l,s)}),t):f.createElement("div",{onClick:r,className:`${sl(l)} ${a}`},f.createElement("div",{className:ol(l,s)}),t))));const cl=0,ml=2,dl={disable:!1,holdToDisplay:1e3,posX:0,posY:0,mouseButton:ml,disableIfShiftIsPressed:!1,collect(){}};function ul(e,t){return t=>{const n=Object.assign({},dl,t);g.exports.useRef(!1),g.exports.useRef(),g.exports.useRef();const r=t=>{t.ctrlKey||(t.preventDefault(),t.stopPropagation(),e(((e,t)=>["X","Y"].map((n=>(e[`client${n}`]||e.touches&&e.touches[0][`page${n}`])-t[`pos${n}`])))(t,n),{...n.collect(),href:t.target.href}))};return[{onContextMenu:e=>{e.button===n.mouseButton&&r(e)},onClick:e=>{e.button===n.mouseButton&&r(e)}}]}}const pl=27,gl=13,vl=38,hl=40,fl={position:"fixed",opacity:0,pointerEvents:"none"},bl=e=>e.focus(),El=({handleElementSelect:e=bl}={})=>{const t=g.exports.useRef(),n=g.exports.useRef([]),[r,a]=g.exports.useState(fl),[l,s]=g.exports.useState(-1),[o,i]=g.exports.useState(!1),[c,m]=g.exports.useState([0,0]),[d,u]=g.exports.useState(),p=g.exports.useCallback((()=>i(!1)),[i]);g.exports.useCallback((()=>{o&&i(!1)}),[o,i]);const v=g.exports.useCallback(((e,t)=>{i(!0),m(e),u(t)}),[i,u]);g.exports.useEffect((()=>{const r=e=>{t.current.contains(e.target)||(s(-1),p())},a=t=>{switch(t.keyCode){case pl:t.preventDefault(),p();break;case vl:t.preventDefault(),l>0&&(s((e=>e-1)),e(n.current[l-1]));break;case hl:t.preventDefault(),l+1<n.current.length&&(s((e=>e+1)),e(n.current[l+1]));break;case gl:-1!==l&&n.current[l].click(),p()}};return o&&(document.addEventListener("mousedown",r),document.addEventListener("touchstart",r),document.addEventListener("scroll",p),document.addEventListener("contextmenu",p),document.addEventListener("keydown",a)),()=>{document.removeEventListener("mousedown",r),document.removeEventListener("touchstart",r),document.removeEventListener("scroll",p),document.removeEventListener("contextmenu",p),document.removeEventListener("keydown",a)}}),[t,p,l,s,n,e,o]);const[h,f]=g.exports.useState(!1);g.exports.useLayoutEffect((()=>{if(o){const e=t.current.getBoundingClientRect(),{top:n,left:r,isRight:l}=((e,[t,n])=>{const r={top:n,left:t,isRight:!1},{innerWidth:a,innerHeight:l}=window;return n+e.height>l&&(r.top-=e.height),t+e.width>a&&(r.left-=e.width),t+2*e.width>a&&(r.isRight=!0),r.top<0&&(r.top=e.height<l?(l-e.height)/2:0),r.left<0&&(r.left=e.width<a?(a-e.width)/2:0),r})(e,c);f(l),a((e=>({...e,top:`${n}px`,left:`${r}px`,opacity:1,pointerEvents:"auto"})))}else a(fl)}),[t,o,c]);return[{style:r,ref:t,role:"menu",tabIndex:-1},{ref:e=>n.current=null===e?[]:[...n.current,e],role:"menuitem",tabIndex:-1},ul(v),{data:d,isVisible:o,setVisible:i,coords:c,setCoords:m,isRight:h}]},xl=e=>w(`\n  active:text-white\n  dark:active:text-white\n  dark:hover:text-white\n  dark:focus:text-white\n  hover:text-white\n  select-none\n  cursor-pointer\n  w-full\n  px-2\n  py-1.5\n  leading-5\n  flex\n  items-center\n  text-13\n  rounded-sm\n  font-medium\n  focus:outline-none\n  group\n  relative\n  ${e?"text-red-500 active:bg-red-600 hover:bg-red-500 focus:bg-red-500":"text-gray-600 dark:text-gray-400 active:bg-green-700 focus:bg-green-600 hover:bg-green-600"} \n`);function yl({item:{bindMenuItem:e,hideMenu:t,isRight:n},onClick:r,red:a,checked:l=null,label:s,children:o}){return f.createElement("div",{...e,className:xl(a),onClick:e=>{t(),r&&r(e)}},s,null!==l&&f.createElement("input",{type:"checkbox",className:"ml-auto h-4 w-4 border-none rounded dark:checked:bg-green-600 dark:bg-gray-750 focus:outline-none cursor-pointer",checked:l,readOnly:!0}),o&&f.createElement(f.Fragment,null,f.createElement("div",{className:"ml-auto"},f.createElement(N,{className:"w-5 h-5 -mr-0.5"})),f.createElement("div",{className:"absolute -top-2 hidden group-hover:block "+(n?"right-full -mr-2":"left-full -ml-2")},f.createElement("div",{className:""+(n?"pr-2":"pl-2")},f.createElement("div",{className:(n?"mr-3":"ml-3")+" p-2 dark:bg-gray-900 rounded w-48 shadow-lg"},o)))))}const wl="User",Nl="Post",kl="Comment",Cl="Message",$l="Server",Ul="Folder",Sl="Channel",Il=({server:e,permissions:t})=>g.exports.useMemo((()=>e?t.map((t=>{var n;return[...null!=(n=null==e?void 0:e.permissions)?n:[]].includes(t)})):t.map((e=>!1))),[t,e]),Pl=w("\n  select-none\n  w-full\n  px-2\n  h-8\n  flex\n  items-center\n  text-13\n  text-mid\n  cursor-default\n  rounded-sm\n  font-medium\n  focus:outline-none\n");function Fl({children:e}){return Ml(e)?f.createElement("div",{className:"space-y-0.5"},f.createElement("div",{className:Pl},"No actions available")):f.createElement("div",{className:"space-y-0.5"},e)}const Ml=e=>!k.renderToStaticMarkup(e);function Rl({post:e,ContextMenuItem:n}){const{t:r}=C(),[a]=Il({server:null==e?void 0:e.server,permissions:[or.ManagePosts]}),l=$()[1],[s]=function(e){const n={...Tn,...e};return t(Zr,n)}(),[o]=Ya(),i=!!e.author&&!!o&&e.author.id===o.id,c=i||a;return e?f.createElement(f.Fragment,null,f.createElement(Fl,null,i&&f.createElement(n,{label:r("post.context.edit")}),f.createElement(n,{onClick:()=>{l(`${location.origin}${e.relativeUrl}`)},label:r("post.context.copyLink")}),c&&f.createElement(n,{red:!0,onClick:()=>{s({variables:{input:{postId:e.id}},optimisticResponse:{...e,isDeleted:!0,author:null,serverUser:null}}),U.success(r("post.context.deleted"))},label:r("post.context.delete")}))):null}function Al({user:e,server:n,role:r,isDm:a,ContextMenuItem:l}){const{t:s}=C(),[o]=Ya(),[i]=Il({server:n,permissions:[or.ManageUsers]}),[c]=ra(),[m]=ea(),[d]=function(e){const n={...Tn,...e};return t(ha,n)}(),[u]=function(e){const n={...Tn,...e};return t(fa,n)}();!function(e){const n={...Tn,...e};t($a,n)}(),function(e){const n={...Tn,...e};t(Jr,n)}(),function(e){const n={...Tn,...e};t(Kr,n)}();const[p]=function(e){const n={...Tn,...e};return t(ca,n)}(),g=Ja((e=>e.setDialogUserId)),{push:v}=S();return e?f.createElement(f.Fragment,null,f.createElement(Fl,null,f.createElement(l,{label:s("user.context.viewProfile"),onClick:()=>{g(e.id)}}),a&&f.createElement(f.Fragment,null,!!e.unreadCount&&f.createElement(l,{label:s("user.context.markRead"),onClick:()=>{m({variables:{input:{userId:e.id}}})}}),f.createElement(l,{label:s("user.context.closeDm"),onClick:()=>{c({variables:{input:{userId:e.id}}})}})),o&&e.id!==o.id?f.createElement(f.Fragment,null,!a&&f.createElement(l,{onClick:()=>v(`/dm/@${e.username}`),label:s("user.context.sendMessage")})):f.createElement(f.Fragment,null),!!n&&i&&f.createElement(f.Fragment,null,f.createElement(l,{label:"Set Role"},n.roles.map((t=>f.createElement(l,{key:t.id,checked:r&&r.id===t.id,label:f.createElement("div",{className:"flex items-center "},f.createElement("div",{className:"w-3 h-3 rounded-full mr-2.5 "+(t.color?"":"dark:bg-gray-700"),style:{backgroundColor:t.color}}),t.name),onClick:()=>{p({variables:{input:{userId:e.id,roleId:t.id}}})}})))),f.createElement(l,{label:s("user.context.kickUser",{user:e}),red:!0,onClick:()=>{u({variables:{input:{serverId:n.id,userId:e.id}}}),U.success(s("user.context.kickedUser",{user:e}))}}),f.createElement(l,{label:s("user.context.banUser",{user:e}),red:!0,onClick:()=>{window.confirm(`Are you sure you want to ban ${e.username} from +${n.name}?`)&&(d({variables:{input:{serverId:n.id,userId:e.id}}}),U.success(`Banned ${e.username} from +${n.name}!`))}}),o.isAdmin&&f.createElement(l,{label:`Global ban ${e.username}`,red:!0,onClick:()=>{window.confirm(`Are you sure you want to global ban ${e.username}?`)&&(d({variables:{input:{serverId:n.id,userId:e.id}}}),U.success(`Global banned ${e.username}!`))}})))):null}function Dl({message:e,server:n,ContextMenuItem:r}){var a,l;const{pathname:s}=I(),o=P(s,{path:"/group/:groupId"}),i=P(s,{path:"/dm/:username"});null==(a=null==o?void 0:o.params)||a.groupId,null==(l=null==i?void 0:i.params)||l.username;const[c]=Il({server:n,permissions:[or.ManageMessages]});$()[1];const[m]=function(e){const n={...Tn,...e};return t(Br,n)}();jr(),Vr(),(e=>{const[t]=jr(),[n]=Vr();g.exports.useCallback((()=>{const r={messageId:e.id};e.isPinned?n({variables:{input:r}}):t({variables:{input:r}})}),[e,t,n])})(e);const{t:d}=C(),[u]=Ya(),p=!!u&&e.author.id===u.id,v=(c||p)&&e.type===Gn.Normal;return p&&(e.type,Gn.Normal),f.createElement(f.Fragment,null,f.createElement(Fl,null,v&&f.createElement(r,{label:d("message.context.delete"),red:!0,onClick:()=>{m({variables:{input:{messageId:e.id}}}),U.error(d("Message deleted!"))}})))}const Tl=e=>{const[n]=function(e){const n={...Tn,...e};return t(Rr,n)}(),[r]=function(e){const n={...Tn,...e};return t(Ar,n)}();return g.exports.useCallback((()=>{const t={commentId:e.id};e.isPinned?r({variables:{input:t}}):n({variables:{input:t}})}),[e,n,r])};function Ll({comment:e,post:n,ContextMenuItem:r}){const{t:a}=C(),[l]=Ya(),s=Ja((e=>e.setReplyingCommentId)),[o]=Il({server:n.server,permissions:[or.ManageComments]});$()[1];const[i]=function(e){const n={...Tn,...e};return t(Fr,n)}();Tl(e);const c=!!e.author&&!!l&&e.author.id===l.id,m=o||c;return f.createElement(f.Fragment,null,f.createElement(Fl,null,c&&f.createElement(r,{label:a("comment.context.edit")}),!!l&&!e.isDeleted&&f.createElement(r,{onClick:()=>s(null==e?void 0:e.id),label:a("comment.context.reply")}),m&&f.createElement(r,{label:a("comment.context.delete"),red:!0,onClick:()=>{i({variables:{input:{commentId:e.id}},optimisticResponse:{...e,isDeleted:!0,text:"[deleted]",author:null,serverUser:null}}),U.success("Comment deleted!")}})))}function Ol({server:e,enableFeatured:n,openDelete:r,ContextMenuItem:a}){const{t:l}=C(),[s]=Ya(),o=F(),[i]=va(),{push:c}=S(),{pathname:m}=I(),d=Ja((e=>e.exploreSort)),u=[{query:Ra,variables:{featured:!0,sort:d}}],[p]=function(e){const n={...Tn,...e};return t(ba,n)}({refetchQueries:u}),[g]=function(e){const n={...Tn,...e};return t(Ea,n)}({refetchQueries:u});return f.createElement(f.Fragment,null,f.createElement(Fl,null,(null==s?void 0:s.isAdmin)&&f.createElement(f.Fragment,null,!!n&&f.createElement(a,{label:e.isFeatured?"Remove from Featured":"Make Featured",onClick:()=>{e.isFeatured?g({variables:{input:{serverId:e.id}}}):p({variables:{input:{serverId:e.id}}})}})),!!s&&!!e.owner&&e.owner.id!==s.id&&f.createElement(a,{label:l("server.context.leave"),red:!0,onClick:()=>{m.startsWith(`/+${e.id}`)&&c("/"),i({variables:{input:{serverId:e.id}}});const t=o.cache.readQuery({query:Sa});o.cache.writeQuery({query:Sa,data:{user:{...t.user,servers:t.user.servers.filter((t=>t.id!==e.id))}}});const n=o.cache.readFragment({fragment:Cr,id:`Server:${e.id}`});o.cache.writeFragment({fragment:Cr,id:`Server:${e.id}`,data:{...n,isJoined:!1}})}}),!!s&&!!e.owner&&!!r&&(s.isAdmin||e.owner.id===s.id)&&f.createElement(a,{label:"Delete Planet",red:!0,onClick:()=>r()})))}function zl({channel:e,server:t,openDelete:n,openEdit:r,ContextMenuItem:a}){const{t:l}=C(),[s]=Il({server:t,permissions:[or.ManageChannels]});return f.createElement(f.Fragment,null,f.createElement(Fl,null,s&&f.createElement(f.Fragment,null,f.createElement(a,{label:l("channel.context.edit"),onClick:()=>{r()}}),f.createElement(a,{label:l("channel.context.delete"),red:!0,onClick:()=>{n()}}))))}function ql({folder:e,ContextMenuItem:n}){var r,a,l,s;const{t:o}=C(),[i]=Ya(),c=null!=(r=null==i?void 0:i.folders)?r:[],m=!!i&&c.filter((e=>{var t;return(null==(t=e.owner)?void 0:t.id)!==i.id})).map((e=>e.id)).includes(e.id),d="Read Later"!==e.name&&"Favorites"!==e.name,[u]=function(e){const n={...Tn,...e};return t(Dr,n)}(),[p]=function(e){const n={...Tn,...e};return t(Lr,n)}(),[g]=function(e){const n={...Tn,...e};return t(Or,n)}(),[v]=function(e){const n={...Tn,...e};return t(Tr,n)}(),{push:h}=S(),{pathname:b}=I(),E=P(b,{path:"/:server"}),x=null==(l=null==(a=null==E?void 0:E.params)?void 0:a.server)?void 0:l.substring(1);return f.createElement(f.Fragment,null,f.createElement(Fl,null,f.createElement(n,{label:o("folder.context.copyLink")}),!!i&&(null==(s=e.owner)?void 0:s.id)!==i.id&&f.createElement(f.Fragment,null,m?f.createElement(n,{label:o("folder.context.unfollow"),onClick:()=>g({variables:{input:{folderId:e.id}}})}):f.createElement(n,{label:o("folder.context.follow"),onClick:()=>p({variables:{input:{folderId:e.id}}})})),d&&f.createElement(f.Fragment,null,f.createElement(n,{label:o("folder.context.edit")}),!x&&f.createElement(n,{label:o("folder.context.collaborative"),checked:e.isCollaborative,onClick:()=>u({variables:{input:{folderId:e.id,isCollaborative:!e.isCollaborative}}})}),f.createElement(n,{label:o("folder.context.changeVisibility")},f.createElement(n,{label:o("folder.context.visibility.public"),checked:e.visibility===_n.Public,onClick:()=>u({variables:{input:{folderId:e.id,visibility:_n.Public}}})}),f.createElement(n,{label:o("folder.context.visibility.friends"),checked:e.visibility===_n.Friends,onClick:()=>u({variables:{input:{folderId:e.id,visibility:_n.Friends}}})}),f.createElement(n,{label:o("folder.context.visibility.unlisted"),checked:e.visibility===_n.Unlisted,onClick:()=>u({variables:{input:{folderId:e.id,visibility:_n.Unlisted}}})}),f.createElement(n,{label:o("folder.context.visibility.private"),checked:e.visibility===_n.Private,onClick:()=>u({variables:{input:{folderId:e.id,visibility:_n.Private}}})})),f.createElement(n,{label:o("folder.context.delete"),red:!0,onClick:()=>{v({variables:{input:{folderId:e.id}}}),b.startsWith("/folder")?h("/"):b.startsWith(`/${x}/folder`)&&h(`/${x}`)}}))))}function Hl(){return f.createElement("div",{className:"border-t dark:border-gray-800 mt-2 pb-2"})}const Bl=w("\n  p-2\n  w-48\n  dark:bg-gray-900\n  rounded\n  shadow-lg\n  outline-none\n");function _l({bindMenu:{style:e,ref:t,role:n,tabIndex:r},data:a,bindMenuItem:l,hideMenu:s,isRight:o}){const i=(c={bindMenuItem:l,hideMenu:s,isRight:o},g.exports.useCallback((({onClick:e,red:t,label:n,checked:r,children:a})=>f.createElement(yl,{item:c,onClick:e,red:t,label:n,checked:r},a)),[c]));var c;const m=$()[1],d=(null==a?void 0:a.href)?new URL(a.href):null,u=d&&d.origin===window.location.origin,p="Mac OS"===Qa(),v={...null!=a?a:{},ContextMenuItem:i};return f.createElement("div",{style:{...e,zIndex:999999},ref:t,role:n,tabIndex:r,className:Bl,onMouseDown:e=>{e.stopPropagation(),e.preventDefault()}},!!window.getSelection().toString()&&f.createElement(f.Fragment,null,f.createElement(i,{label:f.createElement("div",{className:"flex items-center w-full"},"Copy",f.createElement("div",{className:"ml-auto"},p?"⌘+C":"Ctrl+C")),onClick:()=>document.execCommand("copy")}),f.createElement(Hl,null)),(null==a?void 0:a.type)===Nl&&f.createElement(Rl,{...v}),(null==a?void 0:a.type)===wl&&f.createElement(Al,{...v}),(null==a?void 0:a.type)===Cl&&f.createElement(Dl,{...v}),(null==a?void 0:a.type)===kl&&f.createElement(Ll,{...v}),(null==a?void 0:a.type)===$l&&f.createElement(Ol,{...v}),(null==a?void 0:a.type)===Sl&&f.createElement(zl,{...v}),(null==a?void 0:a.type)===Ul&&f.createElement(ql,{...v}),!!(null==a?void 0:a.href)&&!u&&f.createElement(f.Fragment,null,f.createElement(Hl,null),f.createElement(Fl,null,f.createElement(i,{label:"Copy Link",onClick:()=>m(a.href)}),f.createElement(i,{label:"Open Link",onClick:()=>window.open(a.href,"_blank")}))))}const jl=g.exports.createContext({useContextTrigger:e=>[{}]});function Gl({children:e}){const[t,n,r,{data:a,coords:l,setVisible:s,isRight:o}]=El();return f.createElement(f.Fragment,null,f.createElement(jl.Provider,{value:{useContextTrigger:r}},e,f.createElement(_l,{bindMenu:t,data:a,bindMenuItem:n,hideMenu:()=>s(!1),isRight:o})))}function Vl({data:e,leftClick:t=!1,children:n,className:r}){const[a]=((e,t=!1)=>{const{useContextTrigger:n}=g.exports.useContext(jl);return n({collect:()=>e,mouseButton:t?cl:ml})})(e,t);return f.createElement("div",{className:r,...a},n)}const Yl=e=>new Promise(((t,n)=>{const r=new FileReader;r.onload=e=>t(e.target.result),r.onerror=e=>n(e),r.readAsDataURL(e)})),Wl=e=>{if(!e)return M;switch(e){case"Featured":return Z;case"Arts":return W;case"Business":return Y;case"Culture":return V;case"Discussion":return G;case"Entertainment":return j;case"Gaming":return _;case"Health":return B;case"Hobbies":return H;case"Lifestyle":return q;case"Memes":return z;case"Meta":return O;case"News":return L;case"Politics":return T;case"Programming":return D;case"Science":return Ka;case"Sports":return A;case"Technology":return Xa;case"Other":return R}},Zl=w("\n  relative\n  flex\n  items-center\n  pl-3\n  pr-10\n  text-left\n  bg-white\n  cursor-pointer\n  focus:outline-none\n  text-13\n  rounded\n  border\n  h-10\n  dark:bg-gray-800\n  dark:border-gray-700\n  border-b\n  border-t-0\n  border-r-0\n  border-l-0\n  rounded-none\n  focus:outline-none\n  transition\n  px-4\n  text-secondary\n"),Ql=w("\n  scrollbar-thin\n  dark:scrollbar-thumb-gray-750\n  dark:scrollbar-track-gray-850\n  scrollbar-thumb-rounded-md\n  absolute\n  py-1\n  mt-1\n  overflow-auto\n  text-13\n  text-secondary\n  bg-white\n  dark:bg-gray-850\n  rounded-md\n  shadow-lg\n  max-h-60\n  focus:outline-none\n  space-y-0.5\n  font-medium\n");function Jl({category:e,setCategory:t}){const n=Object.values(lr),r=Wl(e);return f.createElement("div",{className:"min-w-full relative z-50"},f.createElement(Q,{value:e,onChange:t},(({open:t})=>f.createElement(f.Fragment,null,f.createElement("div",{className:"relative"},f.createElement(Q.Button,{className:Zl},e?f.createElement(f.Fragment,null,f.createElement(r,{className:"w-5 h-5 text-secondary"}),f.createElement("span",{className:"block truncate pl-3"},e)):f.createElement("span",{className:"block truncate text-tertiary"},"Category"),f.createElement("span",{className:"absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none"},f.createElement(J,{className:"w-5 h-5 text-gray-400","aria-hidden":"true"}))),f.createElement(K,{show:t,as:g.exports.Fragment,leave:"transition ease-in duration-100",leaveFrom:"opacity-100",leaveTo:"opacity-0"},f.createElement(Q.Options,{static:!0,className:Ql},n.map((e=>f.createElement(Q.Option,{key:e,className:({active:e})=>(e=>w(`\n  ${e?"dark:bg-gray-775":""}\n  cursor-pointer\n  select-none\n  relative\n  focus:outline-none\n`))(e),value:e},(({selected:t})=>f.createElement("div",{className:"flex items-center h-10 pl-3 pr-3 "+(t?"dark:bg-gray-775":"")},(()=>{const t=Wl(e);return f.createElement(t,{className:"w-5 h-5 text-secondary"})})(),f.createElement("span",{className:"block truncate pl-2"},e)))))))))))))}function Kl({isOpen:e,close:t,children:n,closeOnOverlayClick:r=!1}){return f.createElement(K,{show:e,as:g.exports.Fragment},f.createElement(X,{open:e,onClose:t,static:!0},f.createElement("div",{className:"fixed z-10 inset-0"},f.createElement("div",{className:"flex items-end justify-center min-h-screen text-center sm:block p-0"},f.createElement(K.Child,{enter:"ease-out duration-150",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-150",leaveFrom:"opacity-100",leaveTo:"opacity-0"},f.createElement(X.Overlay,{className:"fixed inset-0 transition-opacity"},f.createElement("div",{className:"absolute inset-0 bg-gray-500 dark:bg-black opacity-75"}))),f.createElement(K.Child,{enter:"ease-out transform duration-150",enterFrom:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",enterTo:"opacity-100 translate-y-0 sm:scale-100",leave:"ease-in transform duration-150",leaveFrom:"opacity-100 translate-y-0 sm:scale-100",leaveTo:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"},f.createElement("span",{className:"hidden sm:inline-block sm:align-middle sm:h-screen","aria-hidden":"true"},"​"),f.createElement("div",{onClick:()=>{r&&t()},className:"overflow-y-auto scrollbar dark:scrollbar-thumb-gray-800 dark:scrollbar-track-transparent inline-block h-screen transform transition-all align-middle w-screen"},f.createElement("div",{className:"flex min-h-full w-full items-center justify-center"},n)))))))}function Xl({children:e,buttons:t,open:n,close:r,closeOnOverlayClick:a,onSubmit:l,small:s=!1,large:o=!1}){return f.createElement(Kl,{isOpen:n,close:r,closeOnOverlayClick:a},f.createElement("form",{onSubmit:l,className:`md:rounded-lg dark:bg-gray-800 min-w-screen w-full relative text-left ${s||o?"":"md:max-w-lg"} ${s?"md:max-w-sm":""} ${o?"md:max-w-screen-lg":""}`,onClick:e=>e.stopPropagation()},e,!!t&&f.createElement(f.Fragment,null,f.createElement("div",{className:"md:rounded-b-lg dark:bg-gray-750 h-9"}),f.createElement("div",{className:"absolute right-5 bottom-9 transform translate-y-1/2 flex items-center space-x-3 justify-end h-9"},(t.type===g.exports.Fragment?t.props.children:[t]).map(((e,t)=>f.createElement("div",{key:t,className:"dark:bg-gray-800 rounded"},e)))))))}function es({checked:e,onChange:t,children:n,green:r=!1,className:a,disabled:l}){return f.createElement(ee.Group,{as:"div",className:"flex items-center space-x-3"},n&&f.createElement(ee.Label,{className:a},n),f.createElement(ee,{disabled:l,as:"button",checked:e,onChange:t,className:(e?""+(r?"bg-green-600":"bg-blue-600"):"dark:bg-gray-500")+" relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-10 focus:outline-none focus:shadow-outline"},(({checked:e})=>f.createElement("span",{className:(e?"translate-x-4":"translate-x-0.5")+" bg-gray-100 inline-block relative translate-y-1px w-4.5 h-4.5 transition duration-200 ease-in-out transform rounded-full"},f.createElement(te,{className:`absolute inset-1/2 transform -translate-y-1/2 -translate-x-1/2 w-4 h-4 transition-opacity duration-200 ${e?"opacity-100":"opacity-0"} ${r?"text-green-600":"text-blue-600"}`}),f.createElement(ne,{className:`absolute inset-1/2 transform -translate-y-1/2 -translate-x-1/2 w-4 h-4 transition-opacity duration-200 ${e?"opacity-0":"opacity-100"} text-gray-500`})))))}const ts=/^[A-Za-z0-9_]+$/i;function ns({open:e,setOpen:n,server:r}){var a,l,s,o;const[i,c]=g.exports.useState(null!=(a=null==r?void 0:r.isDownvotesEnabled)&&a),[m,{loading:d}]=function(e){const n={...Tn,...e};return t(ma,n)}({update(e,{data:{createServer:t}}){const n=e.readQuery({query:Sa});e.writeQuery({query:Sa,data:{user:{...n.user,servers:[t,...n.user.servers]}}})}}),[u,{loading:p}]=function(e){const n={...Tn,...e};return t(da,n)}(),[v,h]=g.exports.useState(null!=(l=null==r?void 0:r.category)?l:lr.Other),{handleSubmit:b,register:E,watch:y,reset:w,setValue:N,formState:{errors:k,isValid:C}}=re({mode:"onChange"});y(((e,{type:t,value:n,name:r})=>{if("avatarFile"===r){const{avatarFile:t}=e;if(!t||!t[0])return;Yl(t[0]).then((e=>M(e)))}else if("bannerFile"===r){const{bannerFile:t}=e;if(!t||!t[0])return;Yl(t[0]).then((e=>A(e)))}}));const $=y("name"),U=y("displayName"),[I,P]=g.exports.useState(!1);g.exports.useEffect((()=>{I||null==U||N("name",U.replace(" ","_").replace(/[^A-Za-z0-9_]/i,""))}),[U]),g.exports.useEffect((()=>{$||P(!1)}),[$]);const[F,M]=g.exports.useState(null==r?void 0:r.avatarUrl),[R,A]=g.exports.useState(null==r?void 0:r.bannerUrl);g.exports.useEffect((()=>{r?(M(r.avatarUrl),A(r.bannerUrl),N("displayName",r.displayName),N("description",r.description||""),h(r.category),c(r.isDownvotesEnabled)):(w(),M(null),A(null),h(lr.Other),c(!1))}),[r]);const{push:D}=S(),T=(U||"").split(" ").map((e=>e[0])).join("").toUpperCase();return f.createElement(Xl,{open:e,close:()=>{n(!1)},closeOnOverlayClick:!0,onSubmit:b((({name:e,displayName:t,description:a,avatarFile:l,bannerFile:s})=>{r?u({variables:{input:{serverId:r.id,displayName:t,description:a,category:v,avatarFile:l?l[0]:null,bannerFile:s?s[0]:null,isDownvotesEnabled:i}}}).then((()=>{n(!1)})):m({variables:{input:{name:e,displayName:t,description:a,category:v,avatarFile:l?l[0]:null,bannerFile:s?s[0]:null,isDownvotesEnabled:i}}}).then((({data:{createServer:e}})=>{n(!1),D(`/+${e.name}`)}))})),buttons:r?f.createElement(x,{content:"Save Changes"},f.createElement("button",{type:"submit",className:"form-button-submit",disabled:!U||p||(null==U?void 0:U.length)<2},p?f.createElement(tl,{className:"w-5 h-5 text-primary"}):f.createElement(te,{className:"w-5 h-5 text-primary"}))):f.createElement("button",{type:"submit",className:"form-button-submit",disabled:!U||!$||(null==U?void 0:U.length)<2||(null==$?void 0:$.length)<3||d||!ts.test($)},d?f.createElement(tl,{className:"w-5 h-5 text-primary"}):f.createElement(ae,{className:"w-5 h-5 text-primary"}))},f.createElement("input",{type:"file",...E("bannerFile"),className:"hidden",id:"bannerFile",accept:"image/png,image/jpeg,image/webp,image/gif"}),f.createElement("label",{htmlFor:"bannerFile",className:"h-24 block relative rounded-t-lg group cursor-pointer bg-center bg-cover "+(R?"":"bg-gradient-to-br from-red-400 to-indigo-600"),style:R?{backgroundImage:`url(${R})`}:{}},f.createElement("div",{className:"rounded-t-lg absolute inset-0 transition bg-black opacity-0 group-hover:opacity-50 flex items-center justify-center"},f.createElement(le,{className:"w-10 h-10"}))),f.createElement("input",{type:"file",...E("avatarFile"),className:"hidden",id:"avatarFile",accept:"image/png,image/jpeg,image/webp,image/gif"}),f.createElement("label",{htmlFor:"avatarFile",className:"flex items-center justify-center cursor-pointer rounded-3xl h-24 w-24 absolute left-3 top-24 transform -translate-y-1/2 dark:bg-gray-700 shadow group bg-center bg-cover",style:F?{backgroundImage:`url(${F})`}:{}},!F&&f.createElement("div",{className:"text-tertiary text-3xl font-medium overflow-hidden"},T),f.createElement("div",{className:"absolute rounded-3xl inset-0 transition bg-black opacity-0 group-hover:opacity-50 flex items-center justify-center"},f.createElement(le,{className:"w-10 h-10"}))),f.createElement("div",{className:"pl-30 pr-5 pt-2 text-left"},f.createElement("input",{...E("displayName",{maxLength:100,required:!0}),placeholder:"Display Name",className:"form-input-lg",maxLength:100})),f.createElement("div",{className:"pb-5 space-y-3 pt-3 px-5 text-left"},f.createElement("div",null,f.createElement("div",{className:"text-sm text-accent flex items-center pt-3"},f.createElement("span",{className:"h-7 flex items-center"},"joincomet.app/+",null!=(s=null==r?void 0:r.name)?s:""),!r&&f.createElement("input",{...E("name",{pattern:ts,required:!0,minLength:3,maxLength:21}),minLength:3,maxLength:21,placeholder:"Name",className:"bg-transparent h-7 w-full border-b dark:border-gray-700 focus:outline-none transition dark:focus:border-blue-500",onKeyPress:()=>P(!0)})),"pattern"===(null==(o=k.name)?void 0:o.type)&&f.createElement("div",{className:"form-error"},"Letters, numbers and underscores only")),f.createElement("textarea",{...E("description",{maxLength:500}),placeholder:"Description",className:"form-textarea",maxLength:500}),f.createElement("div",{className:"flex items-center"},f.createElement("div",{className:"text-13 font-medium text-tertiary pr-1.5"},"Category"),f.createElement(Jl,{category:v,setCategory:h})),f.createElement("div",{className:"pt-2"},f.createElement(es,{checked:i,onChange:()=>c(!i),green:!0},f.createElement("div",{className:"text-13 font-medium text-tertiary"},"Downvotes enabled")))))}function rs(){const[e,t]=g.exports.useState(!1),{t:n}=C();return f.createElement(f.Fragment,null,f.createElement(il,{name:n("server.create.title"),onClick:()=>t(!0),className:"dark:bg-gray-800 bg-gray-200 hover:bg-purple-600 dark:hover:bg-purple-600"},f.createElement(el,{className:"w-5 h-5 text-purple-500 group-hover:text-white transition"})),f.createElement(ns,{open:e,setOpen:t}))}function as({showPassword:e,setShowPassword:t}){return f.createElement(x,{content:e?"Hide Password":"Show Password"},f.createElement("div",{className:"form-show-password-button"},e?f.createElement(se,{onClick:()=>t(!1),className:"w-5 h-5"}):f.createElement(oe,{onClick:()=>t(!0),className:"w-5 h-5"})))}function ls({count:e}){return f.createElement("div",{className:"rounded-full bg-red-500 w-4 h-4 flex items-center justify-center"},f.createElement("div",{className:"leading-none text-11 font-medium text-primary",style:{marginLeft:"-1px"}},e))}function ss({hide:e=!1}){var t;const{pathname:n}=I(),{t:r}=C(),a=Ja((e=>e.homePage)),l="/explore"!==n&&!n.startsWith("/+"),s=n.startsWith("/explore"),o="Mac OS"===Qa()&&window.electron,[i]=Ya(),{data:c}=Aa({variables:{featured:!0},fetchPolicy:"cache-and-network",nextFetchPolicy:"cache-first"}),m=i?i.servers:null!=(t=null==c?void 0:c.publicServers)?t:[];return f.createElement(f.Fragment,null,f.createElement("div",{className:(e?"hidden md:flex":"flex")+" h-full flex-col items-center min-w-[4.5rem] w-18 bg-white dark:bg-gray-900 overflow-y-auto scrollbar-none"},o&&f.createElement("div",{className:"h-5"}),f.createElement("div",{className:"h-full flex flex-col items-center w-full divide-y dark:divide-gray-800 divide-gray-200"},f.createElement("div",{className:"space-y-2 flex flex-col items-center py-2"},f.createElement(il,{name:r("home"),to:""+(a?`/${a}`:"/"),active:l,className:""+(l?"bg-blue-600":"dark:bg-gray-800 bg-gray-200 hover:bg-blue-600 dark:hover:bg-blue-600")},f.createElement(ie,{className:"w-5 h-5 group-hover:text-white transition "+(l?"text-white":"text-blue-500")})),f.createElement(il,{name:r("explore.title"),to:"/explore",active:s,className:s?"bg-green-600":"dark:bg-gray-800 bg-gray-200 hover:bg-green-600 dark:hover:bg-green-600"},f.createElement(ce,{className:"w-5 h-5 group-hover:text-white transition "+(s?"text-white":"text-green-500")})),!!i&&f.createElement(rs,null)),!!m&&m.length>0&&f.createElement("div",{className:"space-y-2 flex flex-col items-center py-2"},m.map((e=>f.createElement(os,{server:e,key:e.id})))))))}function os({server:e}){var t,n,r,a;const{pathname:l}=I(),s=P(l,{path:"/:server"}),o=null==(n=null==(t=null==s?void 0:s.params)?void 0:t.server)?void 0:n.substring(1),i=Ja((e=>e.serverPages)),[c]=Il({server:e,permissions:[or.PrivateChannels]}),m=(null!=(r=e.channels)?r:[]).filter((e=>e.type!==Ln.Private||c)),d=!!m.find((e=>e.isUnread)),u=m.length>0?m.map((e=>e.mentionCount)).reduce(((e,t)=>e+t)):0,p=o===e.name,[v,h]=g.exports.useState(!1);return f.createElement(f.Fragment,null,f.createElement(is,{open:v,setOpen:h,server:e}),f.createElement(Vl,{className:"h-12",data:{type:$l,server:e,openDelete:()=>h(!0)}},f.createElement(il,{to:`/+${e.name}${null!=(a=i[e.name])?a:""}`,name:e.displayName,active:p,unread:d},f.createElement(ll,{server:e,size:12,className:"bg-gray-200 h-12 w-12 dark:bg-gray-800 group-hover:rounded-2xl transition-all "+(p?"rounded-2xl":"rounded-3xl")}),!!u&&f.createElement("div",{className:"absolute -bottom-1 -right-1 rounded-full border-3 dark:border-gray-900"},f.createElement(ls,{count:u})))))}function is({open:e,setOpen:n,server:r}){const[a,l]=g.exports.useState(""),[s,o]=g.exports.useState(!1),[i,{loading:c}]=function(e){const n={...Tn,...e};return t(ua,n)}(),{push:m}=S();return f.createElement(Xl,{open:e,close:()=>n(!1),closeOnOverlayClick:!0,small:!0,buttons:f.createElement(f.Fragment,null,f.createElement("button",{className:"form-button-cancel",type:"button",onClick:()=>n(!1)},"Cancel"),f.createElement("button",{className:"form-button-delete",type:"button",disabled:!a||c,onClick:()=>{i({variables:{input:{password:a,serverId:r.id}}}).then((()=>{n(!1),m("/")}))}},"Delete",c&&f.createElement(tl,{className:"w-5 h-5 text-primary ml-3"})))},f.createElement("div",{className:"max-w-md w-full rounded-md dark:bg-gray-800 shadow-lg px-5 pt-5 pb-10"},f.createElement("div",{className:"text-red-400 text-lg font-semibold"},"Delete ",r.name),f.createElement("div",{className:"text-tertiary pb-3 pt-3 text-sm"},"All posts, comments, and messages will be lost. Enter your password to continue."),f.createElement("div",{className:"relative"},f.createElement("input",{id:"confirmPassword",name:"confirmPassword",className:"form-input-password",placeholder:"Password",value:a,onChange:e=>l(e.target.value),type:s?"text":"password"}),f.createElement(as,{showPassword:s,setShowPassword:o}))))}const cs=w("\n  transition\n  md:transition-none\n  fixed\n  md:relative\n  md:translate-x-0\n  top-0\n  bottom-0\n  bg-gray-200\n  dark:bg-gray-800\n  transform\n  z-50\n  md:z-0\n"),ms=e=>w(`\n  left-0\n  md:rounded-tl-lg\n  ${e?"translate-x-0":"-translate-x-full md:translate-x-0"}\n  flex\n  md:w-60\n  md:min-w-[15rem]\n  w-78\n  min-w-[19.5rem]\n`),ds=w("\n  bg-black\n  bg-opacity-75\n  md:hidden\n  fixed\n  inset-0\n  z-40\n");function us({children:e,right:t=!1}){const[n,r,a,l]=Ja((e=>[e.showLeftSidebar,e.setShowLeftSidebar,e.showRightSidebar,e.setShowRightSidebar]));return f.createElement(f.Fragment,null,f.createElement(me,null,(t?a:n)&&f.createElement(de.div,{initial:{opacity:0},animate:{opacity:.75},exit:{opacity:0},transition:{duration:.15,ease:[.4,0,.2,1]},className:ds,onClick:()=>{t&&a?l(!1):!t&&n&&r(!1)}})),f.createElement("div",{className:`${cs} ${t?(s=a,w(`\n  right-0\n  ${s?"translate-x-0":"translate-x-full"}\n  ${s?"md:block":"md:hidden"}\n  w-60\n  min-w-[15rem]\n`)):ms(n)}`},!t&&f.createElement("div",{className:"md:hidden",onClick:()=>r(!1)},f.createElement(ss,null)),f.createElement("div",{className:"relative h-full w-full scrollbar-dark overflow-y-auto",onClick:()=>{t||r(!1)}},e)));var s}const ps="Post",gs=(e,t,n)=>w(`\n  ${e&&"h-11"}\n  ${t&&"h-9"}\n  ${!e&&!t&&"h-9"}\n  group\n  rounded\n  cursor-pointer\n  flex\n  items-center\n  text-base\n  font-medium\n  px-4\n  w-full\n  ${n?"dark:hover:bg-gray-725 dark:active:bg-gray-725":"dark:hover:bg-gray-775 dark:active:bg-gray-775"}\n  text-gray-600\n  dark:text-gray-400\n  select-none\n  focus:outline-none\n  relative\n  hover:text-gray-700\n  dark:hover:text-gray-300\n`),vs=e=>w(`\n  text-gray-800\n  hover:text-gray-800\n  dark:text-gray-200\n  dark:hover:text-gray-200\n  ${e?"dark:bg-gray-700 dark:hover:bg-gray-700":"dark:bg-gray-750 dark:hover:bg-gray-750"}\n`);var hs=g.exports.forwardRef((({children:e,large:t=!1,small:n=!1,to:r,onClick:a,active:l,exact:s=!1,light:o=!1},i)=>r?f.createElement(y,{ref:i,to:r,className:`${gs(t,n,o)} ${l?vs(o):""}`,activeClassName:null!=l?"":vs(o),exact:s},e):f.createElement("button",{ref:i,onClick:a,className:`${gs(t,n,o)} ${l?vs(o):""}`,type:"button"},e)));const fs=e=>w(`\n  px-3\n  pt-4\n  pb-1\n  text-gray-500\n  dark:text-gray-500\n  uppercase\n  text-11\n  font-semibold\n  tracking-wide\n  flex\n  items-center\n  justify-between\n  select-none\n  ${e&&"hover:text-gray-600 dark:hover:text-gray-400"}\n`);function bs({children:e,plusLabel:t,onClick:n}){const r=t&&n;return f.createElement("div",{className:fs(r)},e,r&&f.createElement(x,{content:t},f.createElement("div",{onClick:n},f.createElement(ue,{className:"w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"}))))}var Es=X.Title;const xs=()=>Ja((e=>[e.loginDialog,e.setLoginDialog,e.createAccount,e.setCreateAccount])),ys=()=>{const e=xs()[1];return()=>e(!0)};function ws({children:e,className:t,icon:n,title:r,showDivider:a=!1}){const[l]=Ja((e=>[e.setShowLeftSidebar]));return f.createElement("header",{id:"header",className:"h-12 min-h-[3rem] items-center bg-white dark:bg-gray-750 border-b dark:border-gray-800 shadow flex"},f.createElement("div",{className:"flex items-center font-semibold text-base leading-5 text-primary pl-4 pr-4 "+(a?"border-r dark:border-gray-700 mr-4":"")},f.createElement(pe,{className:"md:hidden mr-3 w-5 h-5 text-tertiary",onClick:()=>l(!0)}),f.createElement("div",{className:"text-tertiary mr-3"},n),r),f.createElement("div",{className:"flex-grow flex items-center min-w-0 pr-4"},e))}function Ns({currentPage:e,setCurrentPage:t,page:n,green:r=!1,children:a}){return f.createElement("button",{onClick:()=>t(n),className:"text-base font-medium rounded px-1.5 py-0.5 cursor-pointer select-none flex flex-shrink-0 items-center focus:outline-none "+(n===e?r?"text-green-600 bg-green-900":"text-secondary dark:bg-gray-700":r?"text-secondary bg-green-600":"text-tertiary")},a||n)}function ks(){const[e,t]=Ja((e=>[e.showRightSidebar,e.setShowRightSidebar])),{t:n}=C();return f.createElement(x,{content:n(e?"user.hideUsers":"user.showUsers")},f.createElement("div",{className:"highlightable",onClick:()=>t(!e)},f.createElement(ge,{className:"w-5 h-5"})))}function Cs(){const[e]=Ja((e=>[e.postsSort]));let t;switch(e){case"Hot":t=f.createElement(fe,{className:"w-5 h-5"});break;case"New":t=f.createElement(he,{className:"w-5 h-5"});break;case"Top":t=f.createElement(ve,{className:"w-5 h-5"})}return f.createElement(ws,{title:e,icon:t,showDivider:"Top"===e},"Top"===e&&f.createElement("div",{className:"flex items-center space-x-4"},f.createElement($s,{time:"Hour"}),f.createElement($s,{time:"Day"}),f.createElement($s,{time:"Week"}),f.createElement($s,{time:"Month"}),f.createElement($s,{time:"Year"}),f.createElement($s,{time:"All"})),f.createElement("div",{className:"ml-auto space-x-5 flex items-center"},f.createElement(ks,null)))}function $s({time:e}){const{t:t}=C(),[n,r]=Ja((e=>[e.postsTime,e.setPostsTime]));return f.createElement(Ns,{page:e,setCurrentPage:r,currentPage:n},t(`post.feed.time.${e.toLowerCase()}`))}const Us=({serverId:e,folderId:t})=>{var r;const[a]=Ya(),[l,s,o,i]=Ja((e=>[e.postsSort,e.postsTime,e.folderSort,e.postsFeed])),[c,m]=g.exports.useState(0),d={sort:t?o:l,time:"Top"!==l||t?null:s,serverId:e,folderId:t,feed:a||"Joined"!==i?i:"Featured"},{data:u,loading:p,fetchMore:v}=function(e){const t={...Tn,...e};return n(Ma,t)}({variables:d,fetchPolicy:"cache-and-network",nextFetchPolicy:"cache-first"}),h=null==u?void 0:u.posts.hasMore,f=null!=(r=null==u?void 0:u.posts.posts)?r:[];return[f,p,()=>{h&&0!==f.length&&(v({variables:{...d,offset:20*(c+1)},updateQuery:(e,{fetchMoreResult:t})=>({posts:{hasMore:t.posts.hasMore,posts:[...e.posts.posts,...t.posts.posts]}})}),m(c+1))},h]};function Ss({children:e,render:t,className:n,placement:r="right"}){const[a,l]=g.exports.useState(!1),s=be(8);const o={name:"hideOnPopperBlur",defaultValue:!0,fn:e=>({onCreate(){e.popper.addEventListener("focusout",(t=>{e.props.hideOnPopperBlur&&t.relatedTarget&&!e.popper.contains(t.relatedTarget)&&e.hide()}))}})};return f.createElement(f.Fragment,null,f.createElement(Ee,{render:e=>f.createElement(de.div,{style:{x:s},...e,className:`hidden lg:block ${n}`},t((()=>l(!1)))),placement:r,interactive:!0,onMount:function(){l(!0),s.set(8),xe(s,0,{ease:[.4,0,.2,1],duration:.15})},visible:a,onHide:()=>l(!1),onClickOutside:()=>l(!1),plugins:[o],zIndex:9999,appendTo:document.body},f.createElement("span",{className:"leading-none",onClick:()=>l(!0)},e)))}const Is={gray:ye.gray,red:ye.red,yellow:ye.amber,green:ye.emerald,blue:ye.blue,indigo:ye.indigo,purple:ye.violet,pink:ye.pink},Ps={transparent:"transparent",current:"currentColor",black:ye.black,white:ye.white,...Is},Fs={Red:Ps.red[500],Yellow:Ps.yellow[500],Green:Ps.green[500],Blue:Ps.blue[500],Indigo:Ps.indigo[500],Purple:Ps.purple[500],Pink:Ps.pink[500]};var Ms=g.exports.forwardRef((({user:e,loading:t="eager",size:n=12,showOnline:r=!1,className:a="",dotClassName:l=""},s)=>f.createElement(al,{ref:s,avatarUrl:null==e?void 0:e.avatarUrl,loading:t,className:`${a} cursor-pointer rounded-full`,size:n,style:(null==e?void 0:e.avatarUrl)?{}:{backgroundColor:Fs[null==e?void 0:e.color]}},r&&f.createElement("div",{className:`absolute bottom-0 right-0 rounded-full z-10 ${l} ${(null==e?void 0:e.isOnline)?"bg-green-500":"bg-gray-600"}`}),!(null==e?void 0:e.avatarUrl)&&f.createElement(we,{className:"text-primary w-2/3 h-2/3"}))));function Rs({user:e,role:t,children:n,placement:r="right"}){const a=Ja((e=>e.setDialogUserId));return e?f.createElement(f.Fragment,null,f.createElement(Ss,{className:"w-64",placement:r,render:n=>f.createElement("div",{className:"w-full relative rounded-md shadow-lg duration-200 transform transition z-50 w-64"},f.createElement("div",{className:"p-3 flex flex-col items-center dark:bg-gray-850 rounded-t-md"},f.createElement("div",{className:"group relative"},f.createElement(Ms,{user:e,size:20,showOnline:!0,className:"dark:bg-gray-700 cursor-pointer select-none",dotClassName:"ring-5 w-4 h-4 dark:ring-gray-850"}),f.createElement("div",{onClick:()=>{n(),a(e.id)},className:"cursor-pointer bg-black bg-opacity-50 transition rounded-full absolute whitespace-nowrap inset-0 flex items-center justify-center text-9 uppercase tracking-widest font-semibold opacity-0 group-hover:opacity-100"},"View Profile")),f.createElement("div",{className:"mt-3 text-base"},f.createElement("span",{className:"font-semibold text-primary"},e.username))),f.createElement("div",{className:"p-4 dark:bg-gray-800 rounded-b-md"},t&&f.createElement("div",null,f.createElement("div",{className:"text-11 font-semibold uppercase tracking-widest text-secondary pb-2"},"Roles"),f.createElement("div",{style:{borderColor:t.color},className:"text-xs text-secondary font-medium pl-1 py-1 pr-2 leading-none rounded-full border inline-flex items-center "+(t.color?"":"dark:border-gray-700")},f.createElement("div",{className:"w-3 h-3 rounded-full mr-1 "+(t.color?"":"dark:bg-gray-700"),style:{backgroundColor:t.color}}),t.name))))},n)):n}const As=/^https?:\/\/twitter\.com\/(?:#!\/)?(?:\w+)\/status(?:es)?\/(\d+)/,Ds=/^https?:\/\/banned\.video\/watch\?id=((?:\w){24})/,Ts=/^https?:\/\/open\.(?:spotify\.com\/)(?:embed\/)?(track|playlist|album)\/((?:\w){22})/,Ls=/^https?:\/\/gfycat\.com\/(\w+)/,Os=/^https?:\/\/www\.bitchute\.com\/video\/(\w+)/,zs=/^https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,qs=/^https?:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/,Hs=/^https?:\/\/www\.twitch\.tv\/([a-zA-Z0-9_-]+)/,Bs=/^https?:\/\/www\.twitch\.tv\/videos\/(\d+)/,_s=/^https?:\/\/clips\.twitch\.tv\/([a-zA-Z0-9_-]+)/,js=e=>As.test(e),Gs=e=>Ds.test(e),Vs=e=>Ts.test(e),Ys=e=>Ls.test(e),Ws=e=>Os.test(e),Zs=e=>zs.test(e),Qs=e=>Hs.test(e),Js=e=>Bs.test(e),Ks=e=>_s.test(e),Xs=w("aspect-h-9 aspect-w-16 relative"),eo=w("w-full h-full");function to({url:e}){if(js(e)){const t=e.match(As)[1];return f.createElement(Ne,{tweetId:t,options:{theme:"dark",align:"center",dnt:!0}})}if(Gs(e)){const t=e.match(Ds)[1];return f.createElement("div",{className:Xs},f.createElement("iframe",{src:`https://api.banned.video/embed/${t}?autoplay=false&amp;muted=false`,frameBorder:"0",allowFullScreen:!0,className:eo}))}if(Vs(e)){const t=e.match(Ts),n=t[1],r=t[2];return f.createElement("div",{className:Xs},f.createElement("iframe",{src:`https://open.spotify.com/embed/${n}/${r}`,frameBorder:"0",allowTransparency:"true",allow:"encrypted-media",className:eo}))}if(Ys(e)){const t=e.match(Ls)[1];return f.createElement("div",{className:Xs},f.createElement("iframe",{src:`https://gfycat.com/ifr/${t}`,frameBorder:"0",scrolling:"no",allowFullScreen:!0,className:eo}))}if(Ws(e)){const t=e.match(Os)[1];return f.createElement("div",{className:Xs},f.createElement("iframe",{src:`https://www.bitchute.com/embed/${t}/`,frameBorder:"0",allowFullScreen:!0,className:eo}))}if(Zs(e)||(e=>qs.test(e))(e)){const t=Zs(e)?e.match(zs)[1]:e.match(qs)[1];return f.createElement(ke,{videoId:t,containerClassName:"relative w-full h-0 aspect-h-9 aspect-w-16 overflow-hidden youtube",opts:{playerVars:{autoplay:1,controls:1}}})}if(Qs(e)){const t=e.match(Hs)[1];return f.createElement(Ce,{channel:t,layout:"video",theme:"dark",targetClass:Xs})}if(Js(e)){const t=e.match(Bs)[1];return f.createElement(Ce,{video:t,layout:"video",theme:"dark",targetClass:Xs})}if(Ks(e)){const t=e.match(_s)[1];return f.createElement("div",{className:Xs},f.createElement("iframe",{src:`https://clips.twitch.tv/embed?clip=${t}&parent=localhost&parent=joincomet.app`,frameBorder:"0",allowFullScreen:!0,scrolling:"no",className:eo}))}return null}function no({image:e,width:t,height:n,rounded:r=!0}){const[a,l]=g.exports.useState(!1);return f.createElement("div",null,f.createElement("img",{onClick:()=>l(!0),src:e.smallUrl,alt:"",className:(r?"rounded":"")+" cursor-pointer max-w-full",width:t||e.smallWidth,height:n||e.smallHeight}),f.createElement(Kl,{closeOnOverlayClick:!0,close:()=>l(!1),isOpen:a},f.createElement("div",{className:"mx-auto"},f.createElement("div",{className:"text-left"},f.createElement("img",{onClick:e=>e.stopPropagation(),src:e.popupUrl,alt:"",width:e.popupWidth,height:e.popupHeight}),f.createElement("div",{className:"pt-1"},f.createElement("a",{href:e.originalUrl,className:"hover:underline cursor-pointer text-mid font-semibold text-13 focus:outline-none",target:"_blank",rel:"noreferrer noopener",onClick:e=>e.stopPropagation()},"Open original"))))))}function ro({metadata:e,dark:t=!1}){var n,r,a;const[l,s]=g.exports.useState(!1),o=(i=e.url)&&(js(i)||Gs(i)||Vs(i)||Ys(i)||Ws(i)||Zs(i)||Qs(i)||Js(i)||Ks(i));var i;const c=null==(n=e.themeColor)?void 0:n.replaceAll(" ","").trim().toLowerCase(),m=!c||c.startsWith("rgb(255,255,255")||c.startsWith("rgba(255,255,255")||c.startsWith("#")&&![...c.substring(1)].find((e=>"f"!==e));return f.createElement("div",null,f.createElement("div",{className:`rounded inline-flex transition ${t?"dark:bg-gray-850 "+(m?"dark:border-gray-950":""):"dark:bg-gray-800 "+(m?"dark:border-gray-900":"")} pt-4 border-l-4`,style:m?{}:{borderColor:e.themeColor}},f.createElement("div",{className:"flex-grow rounded-r-md pl-4 pr-4 pb-4 flex flex-col"},f.createElement("div",{className:"max-w-[400px] space-y-3"},e.publisher&&f.createElement("div",{className:"text-xs text-secondary"},e.publisher),f.createElement("div",{className:"leading-none"},f.createElement("a",{href:e.url,rel:"noopener nofollow noreferrer",target:"_blank",className:"text-sm font-semibold text-blue-400 hover:underline"},null!=(r=e.title)?r:"No title")),e.description&&!o&&f.createElement("div",{className:"text-13 text-secondary line-clamp-9",dangerouslySetInnerHTML:{__html:null!=(a=e.description)?a:"No description"}}),(o||e.image&&"summary_large_image"===e.twitterCard)&&f.createElement("div",{className:"pt-1 "+(l?"min-w-[400px]":"")},l?f.createElement(to,{url:e.url}):f.createElement("div",{className:"max-w-[400px] w-full relative rounded cursor-pointer",onClick:()=>{o&&s(!0)}},o?f.createElement(f.Fragment,null,f.createElement("img",{alt:"Thumbnail",src:e.image.smallUrl,className:"rounded select-none",height:e.image.smallHeight,width:e.image.smallWidth}),f.createElement("div",{className:"absolute inset-0 flex items-center justify-center"},f.createElement("div",{className:"text-tertiary rounded-full bg-black bg-opacity-75 flex space-x-3 p-3"},f.createElement($e,{className:"w-6 h-6 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition"}),f.createElement(Ue,{onClick:t=>{t.stopPropagation(),t.preventDefault(),window.open(e.url,"_blank")},className:"w-6 h-6 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition"})))):f.createElement(no,{image:e.image}))))),!!e.image&&"summary_large_image"!==e.twitterCard&&!o&&f.createElement("div",{className:"pr-4"},f.createElement(no,{width:80,height:80,image:e.image}))))}var ao=g.exports.memo((function({post:e,isPostPage:n=!1,showServerName:r=!1,className:a="",index:l}){var s,o,i,c,m;const{push:d}=S(),[u]=function(e){const n={...Tn,...e};return t(Qr,n)}(),[{opacity:p},v]=Se({type:ps,item:e,collect:e=>({opacity:e.isDragging()?.4:1})}),h=Ie().getMonitor().isDragging(),[E,x]=g.exports.useState(!1);g.exports.useEffect((()=>{if(!h){const e=setTimeout((()=>x(!1)),300);return()=>clearTimeout(e)}x(!0)}),[h]);const y=g.exports.useMemo((()=>{var t,n;return e.text||!(e.text||e.linkUrl||e.images&&0!==e.images.length)?"text post":e.linkUrl?e.domain:1===(null==(t=e.images)?void 0:t.length)?"image post":(null==(n=e.images)?void 0:n.length)>1?"image album":void 0}),[e.domain,e.images,e.linkUrl,e.text]),[w,k]=g.exports.useState(0),[C]=Ya(),$=ys();return f.createElement(Vl,{data:{type:Nl,post:e}},f.createElement("div",{style:{opacity:p},className:`${a} cursor-pointer relative group hover:shadow dark:bg-gray-800 dark:hover:bg-gray-825 px-2 py-3 md:rounded flex`,onClick:()=>{E||d(e.relativeUrl)}},f.createElement("div",{className:"flex flex-col items-center pr-2"},f.createElement("button",{type:"button",className:"focus:outline-none p-1 rounded-full dark:hover:bg-gray-750 transition cursor-pointer "+(e.voteType===cr.Up?"text-red-400":"text-mid"),onClick:t=>{if(t.stopPropagation(),t.preventDefault(),!C)return void $();let n=e.voteCount;e.voteType===cr.Up?n--:e.voteType===cr.None?n++:e.voteType===cr.Down&&(n+=2),u({variables:{input:{postId:e.id,type:e.voteType===cr.Up?cr.None:cr.Up}},optimisticResponse:{...e,voteType:e.voteType===cr.Up?cr.None:cr.Up,voteCount:n}})}},f.createElement(Pe,{className:"w-5 h-5"})),f.createElement("div",{className:`text-13 leading-none font-semibold ${e.voteType===cr.Up?"text-red-400":""} ${e.voteType===cr.Down?"text-blue-400":""} ${e.voteType===cr.None?"text-tertiary":""}`},e.voteCount<0?0:e.voteCount),e.server.isDownvotesEnabled&&f.createElement("button",{type:"button",className:"focus:outline-none p-1 rounded-full dark:hover:bg-gray-750 transition cursor-pointer "+(e.voteType===cr.Down?"text-blue-400":"text-mid"),onClick:t=>{if(t.stopPropagation(),t.preventDefault(),!C)return void $();let n=e.voteCount;e.voteType===cr.Down?n++:e.voteType===cr.None?n--:e.voteType===cr.Up&&(n-=2),u({variables:{input:{postId:e.id,type:e.voteType===cr.Down?cr.None:cr.Down}},optimisticResponse:{...e,voteType:e.voteType===cr.Down?cr.None:cr.Down,voteCount:n}})}},f.createElement(J,{className:"w-5 h-5"}))),!n&&f.createElement("div",{className:"w-26 min-w-[6.5rem] h-18 min-h-[4.5rem] rounded dark:bg-gray-750 mr-4 flex items-center justify-center bg-center bg-cover bg-no-repeat",style:e.thumbnailUrl?{backgroundImage:`url(${e.thumbnailUrl})`}:{}},!e.thumbnailUrl&&f.createElement(f.Fragment,null,e.linkUrl?f.createElement(Fe,{className:"w-8 h-8 text-mid"}):f.createElement(Me,{className:"w-8 h-8 text-mid"}))),f.createElement("div",{className:"pr-4 flex-grow flex flex-col"},f.createElement("div",{className:"flex flex-wrap items-center pb-1.5",onClick:e=>{e.stopPropagation(),e.preventDefault()}},f.createElement(b,{to:`/+${e.server.name}`,className:"flex items-center"},f.createElement(ll,{server:e.server,size:5,className:"dark:bg-gray-750 rounded-full"}),f.createElement("span",{className:"ml-1.5 text-xs font-medium text-secondary"},e.server.displayName)),f.createElement("span",{className:"text-xs text-tertiary"}," · ",Re(new Date(e.createdAt))," ago by"),f.createElement(Vl,{data:{type:wl,user:e.author}},f.createElement(Rs,{user:e.author,role:null==(s=e.serverUser)?void 0:s.role},f.createElement("div",{className:"ml-1 cursor-pointer text-tertiary text-xs font-medium leading-none",style:{color:null==(i=null==(o=e.serverUser)?void 0:o.role)?void 0:i.color}},null!=(m=null==(c=e.author)?void 0:c.username)?m:"[deleted]"))),f.createElement("div",{className:"text-xs text-mid font-medium"}," · ",f.createElement("span",{className:"text-xs text-mid"},"(",y,")"))),f.createElement("div",{className:"text-secondary font-medium text-base"},e.title),n&&y&&(!!e.text||!!e.linkUrl||!!e.images.length)&&f.createElement("div",{className:"mt-0.5 pb-2"},!!e.text&&f.createElement("div",{dangerouslySetInnerHTML:{__html:e.text},className:"prose prose-sm dark:prose-dark max-w-none pt-0.5"}),!!e.linkUrl&&f.createElement(f.Fragment,null,e.linkMetadata?f.createElement("div",{className:"max-w-screen-sm w-full mt-2"},f.createElement(ro,{dark:!0,metadata:e.linkMetadata})):f.createElement("a",{href:e.linkUrl,target:"_blank",rel:"noopener nofollow noreferrer",className:"text-sm text-blue-400 hover:underline cursor-pointer pt-0.5"},e.linkUrl)),!!e.images.length&&f.createElement("div",{className:"mt-2 max-w-[400px]"},f.createElement("div",{className:"flex relative"},f.createElement("div",{className:"w-full h-[300px] relative flex items-center justify-center dark:bg-gray-775"},e.images.map(((e,t)=>f.createElement("div",{key:t,className:"select-none "+(t===w?"block":"hidden")},f.createElement(no,{rounded:!1,image:e.image,key:t}))))),e.images.length>1&&f.createElement(f.Fragment,null,w>0&&f.createElement("div",{onClick:()=>k(w-1),className:"absolute left-3 top-1/2 transform -translate-y-1/2 rounded-full shadow flex items-center justify-center w-10 h-10 dark:bg-white"},f.createElement(Ae,{className:"w-5 h-5 dark:text-black"})),w<e.images.length-1&&f.createElement("div",{onClick:()=>k(w+1),className:"absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full shadow flex items-center justify-center w-10 h-10 dark:bg-white"},f.createElement(N,{className:"w-5 h-5 dark:text-black"})))),!!e.images.find((e=>e.caption||e.linkUrl))&&f.createElement("div",{className:"h-12 dark:bg-gray-750 flex items-center px-5 text-sm select-none"},e.images[w].caption&&f.createElement("div",{className:"text-primary truncate pr-3",title:e.images[w].caption},e.images[w].caption),e.images[w].linkUrl&&f.createElement("a",{href:e.images[w].linkUrl,target:"_blank",rel:"noopener nofollow noreferrer",className:"ml-auto text-blue-400 hover:underline cursor-pointer"},e.images[w].linkUrl)))),f.createElement("div",{className:"flex items-center pt-1.5"},f.createElement("div",{className:"select-none text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center cursor-pointer"},f.createElement(G,{className:"w-5 h-5"}),f.createElement("div",{className:"ml-2 text-xs font-medium"},e.commentCount)),f.createElement(Vl,{data:{type:Nl,post:e},leftClick:!0},f.createElement("div",{className:"ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center cursor-pointer"},f.createElement(De,{className:"text-disabled w-4 h-4"})))))))}));function lo({folderId:e,serverId:t,showServerName:n,header:r}){const a=g.exports.useRef(null),[l,s,o,i]=Us({folderId:e,serverId:t}),c=g.exports.useCallback(((e,t)=>{const r=e[t];return r?f.createElement("div",{className:"md:px-4 pb-1.5 px-0"},f.createElement(ao,{post:r,showServerName:n,index:t})):f.createElement("div",{style:{height:"1px"}})}),[n]);return f.createElement(f.Fragment,null,f.createElement(Te,{className:"scrollbar-custom dark:bg-gray-750",components:{Header:r?()=>r:null,Footer:()=>i?f.createElement("div",{className:"flex items-center justify-center h-20"},f.createElement(tl,null)):f.createElement(Wa,null)},endReached:()=>{!s&&i&&o()},itemContent:e=>c(l,e),overscan:100,ref:a,style:{overflowX:"hidden"},totalCount:(null==l?void 0:l.length)||0}))}const so=e=>{const t=Ja((e=>e.setHomePage));g.exports.useEffect((()=>t(e)))};function oo({children:e,header:t,rightSidebar:n,leftSidebar:r}){return f.createElement("div",{className:"flex flex-grow"},r,f.createElement("div",{className:"flex flex-col flex-grow"},t,f.createElement("div",{className:"h-full"},e)),n)}const io=/(https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,}\b(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)(?:[-a-zA-Z0-9@:%._+~#=?!&/]*))[\s\n]$/gi,co=/(?:\()https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,}\b(?:[-a-zA-Z0-9@:%._+~#=?!&/()]*)(?:\))[\s\n]$/gi;function mo(e,t,n){const r=Be(e,t,n);return new Oe(e,((e,t,n,a)=>{const l=r.handler(e,t,n,a);return l&&l.insertText(t[0].slice(-1),a),l}))}var uo=Le.extend({addProseMirrorPlugins(){const e=[mo(io,this.type,(e=>({href:e[1]}))),mo(co,this.type,(e=>({href:e[1]})))],t=ze({rules:e}),n=t.props.handleTextInput;return t.props.handleKeyDown=(e,t)=>{if("Enter"!==t.key)return!1;const{$cursor:r}=e.state.selection;return!!r&&n(e,r.pos,r.pos,"\n")},[t,new qe({key:new He("handlePaste"),props:{handlePaste:()=>!0}})]}});const po=_e.create({name:"spoiler",inclusive:!1,defaultOptions:{HTMLAttributes:{"data-spoiler":""}},addAttributes:()=>({"data-spoiler":{default:""}}),parseHTML:()=>[{tag:"span[data-spoiler]"}],renderHTML({HTMLAttributes:e}){return["span",je(this.options.HTMLAttributes,e),0]},addCommands:()=>({setSpoiler:e=>({commands:t})=>t.setMark("spoiler",e),toggleSpoiler:e=>({commands:t})=>t.toggleMark("spoiler",e),unsetSpoiler:()=>({commands:e})=>e.unsetMark("spoiler")})});function go({text:e,setText:t}){var n;const r=Ge({extensions:[Ve.configure({heading:{levels:[2,3]}}),uo,Ye,po],content:e,editorProps:{attributes:{class:"prose prose-sm dark:prose-dark focus:outline-none max-w-none min-h-[7.5rem] p-4"}}}),a=null!=(n=null==r?void 0:r.getHTML())?n:"";g.exports.useEffect((()=>{t("<p></p>"===a?"":a)}),[r,a,t]);const l=/https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,}\b(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)/i,s=g.exports.useCallback((e=>{var t;const n=null==(t=e.clipboardData)?void 0:t.getData("text/plain");n&&(l.test(n)?null==r||r.commands.insertContent(`<a href="${n}" target="_blank" rel="noopener noreferrer nofollow">${n}</a>`):null==r||r.commands.insertContent(n),null==r||r.commands.focus())}),[r]);return g.exports.useEffect((()=>(document.body.addEventListener("paste",s),()=>{document.body.removeEventListener("paste",s)})),[s]),f.createElement("div",{className:"dark:bg-gray-750 rounded"},f.createElement(Eo,{editor:r}),f.createElement(We,{editor:r}))}const vo=e=>w(`\n  p-1\n  rounded\n  dark:hover:bg-gray-600\n  cursor-pointer\n  ${e?"dark:bg-gray-600 dark:text-gray-300":"text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}\n`);function ho({label:e,icon:t,small:n,onClick:r,active:a}){const l=t;return f.createElement(x,{content:e},f.createElement("div",{className:"h-9 flex items-center",onClick:r},f.createElement("div",{className:vo(a)},f.createElement(l,{className:""+(n?"w-4 h-4 mt-0.5":"w-5 h-5")}))))}const fo=w("\n  flex\n  items-center\n  px-2\n  h-full\n  space-x-0.5\n");function bo({children:e}){return f.createElement("div",{className:fo},e)}function Eo({editor:e}){return e?f.createElement("div",{className:"min-h-[2.25rem] border-b dark:border-gray-700 flex flex-wrap items-center divide-x dark:divide-gray-700"},f.createElement(bo,null,f.createElement(ho,{label:"Bold (Ctrl+B)",icon:Ze,onClick:()=>e.chain().focus().toggleBold().run(),active:e.isActive("bold")}),f.createElement(ho,{label:"Italic (Ctrl+U)",icon:Qe,onClick:()=>e.chain().focus().toggleItalic().run(),active:e.isActive("italic")}),f.createElement(ho,{label:"Underline (Ctrl+I)",icon:Je,onClick:()=>e.chain().focus().toggleUnderline().run(),active:e.isActive("underline")}),f.createElement(ho,{label:"Strikethrough",icon:Ke,onClick:()=>e.chain().focus().toggleStrike().run(),active:e.isActive("strike")})),f.createElement(bo,null,f.createElement(ho,{label:"Spoiler",icon:Xe,onClick:()=>e.chain().focus().toggleSpoiler().run(),active:e.isActive("spoiler")}),f.createElement(ho,{label:"Inline Code",icon:D,onClick:()=>e.chain().focus().toggleCode().run(),active:e.isActive("code")})),f.createElement(bo,null,f.createElement(ho,{label:"Link",icon:et,onClick:()=>{const t=window.prompt("URL");e.chain().focus().setLink({href:t}).run()},active:e.isActive("link")}),e.isActive("link")&&f.createElement(ho,{label:"Remove Link",icon:tt,onClick:()=>{e.chain().focus().unsetLink().run()}}),f.createElement(ho,{label:"Divider",icon:nt,onClick:()=>e.chain().focus().setHorizontalRule().run()})),f.createElement(bo,null,f.createElement(ho,{label:"Bulleted List",icon:rt,onClick:()=>e.chain().focus().toggleBulletList().run(),active:e.isActive("bulletList")}),f.createElement(ho,{label:"Numbered List",icon:at,onClick:()=>e.chain().focus().toggleOrderedList().run(),active:e.isActive("orderedList")})),f.createElement(bo,null,f.createElement(ho,{label:"Large Heading (Ctrl+[)",icon:lt,onClick:()=>e.chain().focus().toggleHeading({level:2}).run(),active:e.isActive("heading",{level:2})}),f.createElement(ho,{label:"Small Heading (Ctrl+])",icon:lt,small:!0,onClick:()=>e.chain().focus().toggleHeading({level:3}).run(),active:e.isActive("heading",{level:3})})),f.createElement(bo,null,f.createElement(ho,{label:"Block Quote",icon:st,onClick:()=>e.chain().focus().toggleBlockquote().run(),active:e.isActive("blockquote")}),f.createElement(ho,{label:"Code Block",icon:ot,onClick:()=>e.chain().focus().toggleCodeBlock().run(),active:e.isActive("codeBlock")})),f.createElement(bo,null,f.createElement(ho,{label:"Emoji",icon:z}))):null}const xo=w("\n  relative\n  w-full\n  h-12\n  flex\n  items-center\n  pl-5\n  pr-10\n  text-left\n  bg-white\n  dark:bg-gray-800\n  dark:hover:bg-gray-775\n  cursor-pointer\n  focus:outline-none\n  text-sm\n  rounded-none\n  rounded-tl-xl\n"),yo=w("\n  scrollbar-dark\n  absolute\n  w-full\n  py-1\n  mt-1\n  overflow-auto\n  text-sm\n  text-primary\n  bg-white\n  dark:bg-gray-775\n  rounded-md\n  shadow-lg\n  max-h-60\n  focus:outline-none\n  space-y-0.5\n");function wo({servers:e=[],server:t,setServer:n}){return f.createElement("div",{className:"col-span-1 z-10"},f.createElement(Q,{value:t,onChange:n},(({open:n})=>f.createElement(f.Fragment,null,f.createElement("div",{className:"relative"},f.createElement(Q.Button,{className:xo},t?f.createElement(f.Fragment,null,f.createElement(ll,{server:t,className:"dark:bg-gray-750 rounded-full",size:7}),f.createElement("span",{className:"block truncate pl-2"},t.name)):f.createElement("span",{className:"block truncate text-red-400"},"Select a planet"),f.createElement("span",{className:"absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none"},f.createElement(J,{className:"w-5 h-5 text-gray-400","aria-hidden":"true"}))),f.createElement(K,{show:n,as:g.exports.Fragment,leave:"transition ease-in duration-100",leaveFrom:"opacity-100",leaveTo:"opacity-0"},f.createElement(Q.Options,{static:!0,className:yo},e.map((e=>f.createElement(Q.Option,{key:e.id,className:({active:e})=>(e=>w(`\n  ${e?"dark:bg-gray-750":""}\n  cursor-pointer\n  select-none\n  relative\n  focus:outline-none\n`))(e),value:e},(({selected:t})=>f.createElement("div",{className:"flex items-center h-10 pl-5 pr-4 "+(t?"dark:bg-gray-750":"")},f.createElement(ll,{server:e,size:7,className:"dark:bg-gray-725 rounded-full"}),f.createElement("span",{className:(t?"font-semibold":"font-normal")+" block truncate pl-2"},e.name)))))))))))))}const No=(e,t)=>{const n=g.exports.useRef(e);g.exports.useEffect((()=>{n.current=e}),null!=t?t:[e]);return g.exports.useCallback(((...e)=>{var t;null==(t=n.current)||t.call(n,...e)}),[])};var ko=g.exports.forwardRef((({onChange:e,onInput:t,onBlur:n,onKeyPress:r,onKeyDown:a,onPaste:l,...s},o)=>{const i=No(e),c=No(t),m=No(n),d=No(r),u=No(a),p=No(l);return f.createElement(it,{...s,ref:o,onChange:i,onInput:c,onBlur:m,onKeyPress:d,onKeyDown:u,onPaste:p})}));const Co=w("\n  block\n  text-11\n  pb-1.5\n  font-semibold\n  tracking-widest\n  uppercase\n  text-tertiary\n"),$o=w("\n  text-base\n  text-primary\n  disabled:opacity-50\n  bg-green-600\n  rounded\n  px-5\n  h-9\n  flex\n  items-center\n  disabled:cursor-not-allowed\n  focus:outline-none\n  select-none\n"),Uo=w("\n  text-base\n  text-tertiary\n  focus:outline-none\n  px-2\n  h-9\n  flex\n  items-center\n  select-none\n"),So=e=>w(`\n  px-5\n  h-12\n  border-b-2\n  dark:hover:bg-gray-775\n  ${e?"dark:border-gray-100 text-primary dark:bg-gray-775":"border-transparent text-tertiary"}\n  flex\n  items-center\n  justify-center\n  select-none\n  cursor-pointer\n  text-sm\n  last:rounded-tr-xl\n`),Io=w("\n  px-4\n  h-10\n  placeholder-tertiary\n  dark:bg-gray-750\n  rounded\n  text-sm\n  text-primary\n  w-full\n  focus:outline-none\n"),Po="Text",Fo="Link",Mo="Image";function Ro({open:e,setOpen:r,serverId:a}){var l,s,o,i,c,m,d,u,p,v;const[h,b]=g.exports.useState(""),[E,{loading:x}]=function(e){const n={...Tn,...e};return t(Wr,n)}(),{t:y}=C(),{push:w}=S(),[N]=Ya(),k=null!=(l=null==N?void 0:N.servers)?l:[],[$,U]=g.exports.useState(a?null==k?void 0:k.find((e=>e.id===a)):null),[I,P]=g.exports.useState(Po),{register:F,handleSubmit:M,reset:R,formState:A,watch:D,setValue:T,trigger:L}=re({mode:"onChange"}),O=D("linkUrl"),[z,q]=g.exports.useState("");ct((()=>{q(O)}),500,[O]);const H=D("title"),{data:B,loading:_}=function(e){const t={...Tn,...e};return n(Ia,t)}({variables:{linkUrl:z},skip:!z||!mt(z)}),j=null==B?void 0:B.getLinkMeta,[G,V]=g.exports.useState([]);function Y(e){return new Promise((function(t,n){let r=new FileReader;r.onload=function(){t(r.result)},r.onerror=function(){n(r)},r.readAsDataURL(e)}))}const[W,Z]=g.exports.useState(0),Q=()=>{r(!1),setTimeout((()=>{Z(0),V([]),P(Po),R()}),300)};return f.createElement(Kl,{isOpen:e,close:Q},f.createElement("form",{onSubmit:M((({title:e,linkUrl:t})=>{E({variables:{input:{title:e,text:h&&I===Po?h:null,linkUrl:t&&I===Fo?t:null,serverId:$.id,images:G&&G.length>0&&I===Mo?G.map((({file:e,caption:t,linkUrl:n})=>({file:e,caption:t,linkUrl:n}))):null}}}).then((({data:e})=>{const t=null==e?void 0:e.createPost;t&&(r(!1),R(),w(t.relativeUrl))}))})),className:"max-w-screen-md w-full dark:bg-gray-800 text-left rounded-xl"},f.createElement("div",{className:"grid grid-cols-4"},f.createElement(wo,{servers:k,server:$,setServer:U}),f.createElement("div",{className:So(I===Po),onClick:()=>{P(Po),T("linkUrl",""),V([])}},f.createElement(Me,{className:"mr-2 w-5 h-5"}),"Text"),f.createElement("div",{className:So(I===Fo),onClick:()=>{P(Fo),b(""),V([])}},f.createElement(dt,{className:"mr-2 w-5 h-5"}),"Link"),f.createElement("div",{className:So(I===Mo),onClick:()=>{P(Mo),T("linkUrl",""),L("linkUrl"),b("")}},f.createElement(ut,{className:"mr-2 w-5 h-5"}),"Images")),f.createElement("div",{className:"p-5"},f.createElement("div",{className:"relative"},f.createElement("label",{htmlFor:"title",className:Co},"Title",(null==H?void 0:H.length)>0&&` (${null==H?void 0:H.length}/300)`),f.createElement("input",{maxLength:300,className:Io,...F("title",{required:!0}),id:"title"})),I===Po&&f.createElement("div",{className:"pt-5"},f.createElement(go,{text:h,setText:b})),I===Fo&&f.createElement(f.Fragment,null,f.createElement("div",{className:"pb-5 pt-1.5"},(null==j?void 0:j.title)&&H!==(null==j?void 0:j.title)&&f.createElement("span",{className:"text-xs text-blue-500 hover:underline cursor-pointer line-clamp-1",onClick:()=>{T("title",null==j?void 0:j.title),L("title")}},null==j?void 0:j.title)),f.createElement("label",{htmlFor:"linkUrl",className:"block text-11 pb-1.5 font-semibold tracking-widest uppercase text-tertiary"},"Link URL"),f.createElement("div",{className:"relative h-10"},f.createElement(dt,{className:"top-1/2 left-2.5 transform -translate-y-1/2 absolute w-5 h-5 text-mid"}),f.createElement("input",{maxLength:2e3,className:"px-10 h-10 dark:bg-gray-750 rounded text-sm text-primary w-full focus:outline-none",...F("linkUrl",{validate:e=>!e||mt(e)}),id:"linkUrl"}),_&&f.createElement("div",{className:"top-1/2 right-2.5 transform -translate-y-1/2 absolute"},f.createElement(tl,null))),O&&!mt(O)&&f.createElement("div",{className:"text-13 text-red-400 pt-1"},"Must be a valid URL"),z&&mt(z)&&!!j&&f.createElement("div",{className:"mt-5"},f.createElement(ro,{dark:!0,metadata:j}))),I===Mo&&f.createElement("div",{className:"mt-5"},G&&G.length>0?f.createElement("div",null,f.createElement("div",{className:"flex"},f.createElement("div",{className:"flex scrollbar-custom items-center space-x-3 overflow-x-auto border dark:border-gray-700 rounded-md h-31 px-3 max-w-full w-full"},G.map(((e,t)=>f.createElement("div",{key:t,onClick:()=>Z(t),className:"cursor-pointer group relative rounded border "+(W===t?"dark:border-gray-500":"dark:border-transparent")},f.createElement("div",{className:"max-w-25 max-h-25 min-w-[6.25rem] min-h-[6.25rem] transform "+(W===t?"scale-85":"")},f.createElement("div",{className:"absolute top-1 right-1 rounded-full bg-black p-0.5 hidden group-hover:block z-10",onClick:()=>{W>=t&&W>0&&setImmediate((()=>Z(W-1)));const e=G.slice();e.splice(t,1),V(e)}},f.createElement(ne,{className:"w-4.5 h-4.5 text-white"})),f.createElement("div",{className:"absolute inset-0 bg-black rounded bg-opacity-0 group-hover:bg-opacity-50"}),f.createElement("div",{style:{backgroundImage:`url(${e.data})`},className:"max-w-25 max-h-25 min-w-[6.25rem] min-h-[6.25rem] bg-cover bg-center select-none rounded"}))))),f.createElement("div",{className:"w-25 h-25 rounded relative flex items-center justify-center border dark:border-gray-700 border-dashed cursor-pointer transition dark:hover:bg-gray-775"},f.createElement("input",{type:"file",id:"file",accept:"image/png,image/jpeg,image/webp,image/gif",hidden:!0,multiple:!0,onChange:e=>{const t=e.target.files;if(t&&t.length>0){V([...G,...Array.from(t).map((e=>({file:e,caption:"",linkUrl:""})))]);let e=[];for(let n=0;n<t.length;n++)e.push(Y(t[n]));Promise.all(e).then((e=>{V([...G,...e.map(((e,n)=>({file:t[n],caption:"",linkUrl:"",data:e})))])}))}}}),f.createElement("label",{htmlFor:"file",className:"absolute inset-0 block cursor-pointer"}),f.createElement(ue,{className:"w-1/2 h-1/2 text-tertiary"})))),G&&(null==G?void 0:G.length)>0&&f.createElement("div",{className:"mt-5 flex space-x-5"},f.createElement("div",{className:"w-81 h-81 bg-contain bg-center bg-no-repeat dark:bg-gray-775 flex-shrink-0",style:{backgroundImage:`url(${null==(s=G[W])?void 0:s.data})`}}),f.createElement("div",{className:"space-y-5 max-w-full flex-grow"},f.createElement("div",null,f.createElement("label",{htmlFor:"caption",className:Co},"Caption",(null==(i=null==(o=G[W])?void 0:o.caption)?void 0:i.length)>0&&` (${null==(m=null==(c=G[W])?void 0:c.caption)?void 0:m.length}/180)`),f.createElement(ko,{id:"caption",className:"px-4 py-2.5 min-h-[2.5rem] dark:bg-gray-750 rounded text-sm text-primary focus:outline-none break-word",html:(null==(d=G[W])?void 0:d.caption)||"",onChange:e=>{var t,n;if((null==(n=null==(t=G[W])?void 0:t.caption)?void 0:n.length)>=180)return;const r=G.slice();let a=e.target.value;a.length>180&&(a=a.substring(0,181)),r[W].caption=a,V(r)}})),f.createElement("div",null,f.createElement("label",{htmlFor:"link",className:Co},"Link"),f.createElement("input",{id:"link",className:Io,value:(null==(u=G[W])?void 0:u.linkUrl)||"",onChange:e=>{const t=G.slice();t[W].linkUrl=e.target.value,V(t)}}),(null==(p=G[W])?void 0:p.linkUrl)&&!mt(null==(v=G[W])?void 0:v.linkUrl)&&f.createElement("div",{className:"text-13 text-red-400 pt-1"},"Must be a valid URL"))))):f.createElement("div",{className:"relative"},f.createElement("input",{type:"file",id:"files",accept:"image/png,image/jpeg,image/webp,image/gif",hidden:!0,multiple:!0,onChange:e=>{const t=e.target.files;if(t&&t.length>0){V(Array.from(t).map((e=>({file:e,caption:"",linkUrl:""}))));let e=[];for(let n=0;n<t.length;n++)e.push(Y(t[n]));Promise.all(e).then((e=>V(e.map(((e,n)=>({file:t[n],caption:"",linkUrl:"",data:e}))))))}}}),f.createElement("label",{htmlFor:"files",className:"select-none cursor-pointer flex items-center justify-center text-base text-tertiary h-30 border border-dashed dark:border-gray-700 rounded-md transition dark:hover:bg-gray-775"},"Drag 'n' drop some images here, or click to select images"))),f.createElement("div",{className:"flex items-center pt-5"},f.createElement("div",{className:"ml-auto flex items-center space-x-3"},f.createElement("button",{type:"button",className:Uo,onClick:()=>Q()},y("post.create.cancel")),f.createElement("button",{type:"submit",className:$o,disabled:!A.isValid||!$||x},y("post.create.submit"),x&&f.createElement(tl,{className:"w-5 h-5 text-primary ml-3"})))))))}function Ao({server:e}){const{t:t}=C(),[n,r]=g.exports.useState(!1),[a]=Ya();return f.createElement(f.Fragment,null,f.createElement(Ro,{open:n,setOpen:r,serverId:null==e?void 0:e.id}),f.createElement("div",{className:"p-4"},f.createElement("div",{onClick:()=>r(!0),className:"dark:bg-gray-700 h-13 flex items-center rounded transition dark:hover:bg-gray-650 cursor-pointer"},f.createElement("div",{className:"px-3 border-r dark:border-gray-650 h-7"},f.createElement(Ms,{user:a,size:7})),f.createElement("div",{className:"text-sm text-secondary px-3"},t("post.createPost")))))}const Do=()=>"Notification"in window&&"serviceWorker"in navigator&&"PushManager"in window,To=({onClick:e,title:t,body:n,icon:r,timestamp:a})=>{if(!Do())return;if("granted"!==Notification.permission)return;new Notification(t,{body:n,icon:r,timestamp:a,silent:!0}).onclick=e;const l=new Audio((window.electron?".":"")+"/notification.mp3");l.volume=.5,l.play()},Lo=w("\n  cursor-pointer\n  hover:underline\n"),Oo="bc1q85hzedw8wr29ylyh329z9e5dhz4yuqnc2830wc",zo="0x119b5129D730156017a69BD21e2ce774143C845b";function qo(){const e=$()[1];return f.createElement(us,{right:!0},f.createElement("div",{className:"px-2.5 py-2.5 flex flex-col"},f.createElement("div",{className:"mt-auto"}),f.createElement("div",{className:"dark:border-gray-750 border rounded p-2.5 text-xs text-tertiary leading-5"},f.createElement("div",{className:"space-x-3"},f.createElement(b,{to:"/help/terms",target:"_blank",className:Lo},"Terms"),f.createElement(b,{to:"/help/privacy",target:"_blank",className:Lo},"Privacy Policy"),f.createElement(b,{to:"/help/content",target:"_blank",className:Lo},"Content Policy"),f.createElement("a",{href:"https://github.com/joincomet/comet",target:"_blank",rel:"noopener noreferrer",className:Lo},"GitHub"),f.createElement("a",{href:"https://discord.gg/NPCMGSm",target:"_blank",rel:"noopener noreferrer",className:Lo},"Discord")),f.createElement("div",{className:"pt-1.5"},"© ",(new Date).getFullYear()," CometX, LLC")),f.createElement("div",{className:"space-y-0.5 text-xs text-tertiary leading-5 pt-1.5 break-all"},f.createElement("div",null,"Donations appreciated!"),f.createElement(x,{content:"Click to copy"},f.createElement("div",{className:"cursor-pointer",onClick:()=>{e(Oo),U.success("BTC donation address copied!")}},f.createElement("span",{className:"select-none"},"BTC: "),f.createElement("span",{className:"highlightable"},Oo))),f.createElement(x,{content:"Click to copy"},f.createElement("div",{className:"cursor-pointer",onClick:()=>{e(zo),U.success("ETH/BSC/MATIC donation address copied!")}},f.createElement("span",{className:"select-none"},"ETH/BSC/MATIC: "),f.createElement("span",{className:"highlightable"},zo))))))}function Ho(){const[e]=Ya();return so(null),g.exports.useEffect((()=>{Do()&&"default"===Notification.permission&&Notification.requestPermission().then((function(e){"granted"===e&&To({title:"Notifications enabled!",icon:"/icons/icon.png"})}))}),[]),f.createElement(f.Fragment,null,f.createElement(pt,null,f.createElement("title",null,"Home – Comet")),f.createElement(oo,{header:f.createElement(Cs,null),rightSidebar:f.createElement(qo,null)},f.createElement(lo,{showServerName:!0,header:e?f.createElement(Ao,null):f.createElement("div",{className:"h-4"})})))}function Bo({className:e}){return f.createElement("svg",{className:e,version:"1.1",viewBox:"0 0 6.3938 6.3938",xmlns:"http://www.w3.org/2000/svg"},f.createElement("defs",null,f.createElement("linearGradient",{id:"linearGradient971",x1:"7.7677",x2:"14.802",y1:"5.3857",y2:"5.3857",gradientTransform:"rotate(32 322.69 255.38)",gradientUnits:"userSpaceOnUse"},f.createElement("stop",{stopColor:"#6875f5",offset:"0"}),f.createElement("stop",{stopColor:"#f98080",offset:"1"}))),f.createElement("g",{transform:"translate(-188.06 124.29)"},f.createElement("path",{d:"m192.01-123.61a2.4814 2.526 32 0 0-0.37414 0.0274 1.9313 1.966 32 0 1 0.33022 2.4892 1.9313 1.966 32 0 1-2.3823 0.7953 2.4814 2.526 32 0 0 1.0387 1.3436 2.4814 2.526 32 0 0 3.4427-0.82683 2.4814 2.526 32 0 0-0.76584-3.4572 2.4814 2.526 32 0 0-1.2893-0.37155zm-3.9109 0.15503c-0.20116-0.0233 0.37961 0.32545 2.1063 2.4024 0.31374 0.37744 0.9773 0.0996 1.2604-0.35346 0.28309-0.45304 0.24162-1.1707-0.23513-1.2873l-2.9983-0.73329c-0.0596-0.0146-0.10458-0.0251-0.13332-0.0284z",fill:"url(#linearGradient971)"})))}function _o({className:e}){const[t]=g.exports.useState((new Date).getTime().toString());return f.createElement("svg",{className:e,fill:"currentColor",viewBox:"0 0 30.327 5.0518"},f.createElement("defs",null,f.createElement("linearGradient",{id:t,x1:"7.7677",x2:"14.802",y1:"5.3857",y2:"5.3857",gradientTransform:"translate(1.0113e-4,1.6184e-4)",gradientUnits:"userSpaceOnUse"},f.createElement("stop",{stopColor:"#6875f5",offset:"0"}),f.createElement("stop",{stopColor:"#f98080",offset:"1"}))),f.createElement("g",{transform:"translate(-56.423 -63.81)",strokeWidth:".26458"},f.createElement("path",{d:"m61.235 68.093q-0.18344 0.16933-0.50094 0.34572t-0.72672 0.30339q-0.40922 0.11994-0.87489 0.11994-0.5715 0-1.0654-0.17639-0.49389-0.18344-0.86783-0.51506-0.36689-0.33161-0.5715-0.79728-0.20461-0.47272-0.20461-1.0513 0-0.54328 0.21167-1.0019 0.21872-0.45861 0.59972-0.79728t0.87489-0.52211q0.49389-0.1905 1.0442-0.1905 0.45156 0 0.86783 0.127 0.41628 0.11994 0.74083 0.31044 0.33161 0.1905 0.52917 0.39511l-0.47272 0.61383q-0.34572-0.30339-0.76906-0.49389-0.42333-0.19756-0.9525-0.19756-0.35983 0-0.6985 0.11994t-0.61383 0.35278q-0.26811 0.22578-0.43039 0.55033-0.15522 0.32456-0.15522 0.73378 0 0.59267 0.28222 0.99483 0.28222 0.39511 0.74083 0.59972 0.46567 0.19756 0.98778 0.19756 0.381 0 0.68439-0.09878 0.30339-0.10583 0.54328-0.254t0.43039-0.29633z"}),f.createElement("path",{d:"m70.164 63.853 1.9826 2.6317 1.9826-2.6317h0.73378v4.9389h-0.762v-2.0743q0-0.45861 0.01411-0.86783 0.02117-0.40922 0.0635-0.81844l-1.8062 2.3424h-0.46567l-1.8062-2.3354q0.04939 0.40217 0.0635 0.81139t0.01411 0.86783v2.0743h-0.762v-4.9389z"}),f.createElement("path",{d:"m77.106 63.853h3.8241v0.73378h-3.0621v1.3053h2.6741v0.73378h-2.6741v1.4323h3.0621v0.73378h-3.8241z"}),f.createElement("path",{d:"m84.203 68.792v-4.2051h-1.7357v-0.73378h4.2827v0.73378h-1.7851v4.2051z"})),f.createElement("path",{transform:"rotate(32 15.881 -1.0183)",fillRule:"evenodd",d:"m11.03 3.2283a2.4814 2.526 7.3662e-7 0 0-0.30277 0.22149 1.9313 1.966 7.3662e-7 0 1 1.5991 1.936 1.9313 1.966 7.3662e-7 0 1-1.5988 1.9369 2.4814 2.526 7.3662e-7 0 0 1.5929 0.589 2.4814 2.526 7.3662e-7 0 0 2.4814-2.5255 2.4814 2.526 7.3662e-7 0 0-2.4815-2.526 2.4814 2.526 7.3662e-7 0 0-1.2903 0.36814zm-3.2345 2.2039c-0.18296 0.086815 0.49439 0.074836 3.0594 0.9212 0.46608 0.15383 0.88156-0.43345 0.88156-0.96766s-0.41546-1.1208-0.88154-0.96706l-2.9313 0.96698c-0.058262 0.019224-0.10199 0.034146-0.12813 0.046548z",fill:`url(#${t})`}))}function jo({category:e}){const{t:t}=C(),[n,r]=Ja((e=>[e.exploreCategory,e.setExploreCategory])),a=Wl(e);return f.createElement(hs,{onClick:()=>r(e),active:n===e},f.createElement(a,{className:"w-5 h-5 mr-3"}),t(e?`category.${e}`:"explore.all"))}function Go({sort:e,label:t,icon:n}){const[r,a]=Ja((e=>[e.exploreSort,e.setExploreSort])),l=n;return f.createElement(hs,{onClick:()=>a(e),active:r===e},f.createElement(l,{className:"w-5 h-5 mr-3"}),t)}function Vo(){const{t:e}=C(),t=g.exports.useMemo((()=>{let e=Object.keys(lr);const t=e.splice(e.indexOf(lr.Other),1);return e.push(...t),e}),[]);return f.createElement(us,null,f.createElement("div",{className:"h-12 border-b dark:border-gray-850 shadow flex items-center px-5 text-base font-medium"},f.createElement(_o,{className:"h-4"})),f.createElement("div",{className:"px-1.5"},f.createElement(bs,null,"Sort"),f.createElement("div",{className:"space-y-0.5"},f.createElement(Go,{label:"Most Popular",sort:"Top",icon:ve}),f.createElement(Go,{label:"Recently Created",sort:"New",icon:he})),f.createElement(bs,null,e("explore.categories")),f.createElement("div",{className:"space-y-0.5"},f.createElement(jo,{category:"Featured"}),f.createElement(jo,{category:null}),t.map((e=>f.createElement(jo,{key:e,category:e}))))))}function Yo({server:e,shadow:t=!1,className:n=""}){var r;const{t:a}=C(),l=Wl(e.category);return Ja((e=>e.exploreCategory)),f.createElement(Vl,{data:{type:$l,server:e,enableFeatured:!0}},f.createElement(b,{to:`/+${e.name}`,className:`${n} relative relative flex flex-col w-full rounded-lg group dark:bg-gray-800 dark:hover:bg-gray-850 duration-200 transform transition hover:shadow-xl ${t?"shadow-lg":""}`},f.createElement("div",{className:"h-32 rounded-t-lg w-full bg-cover bg-center bg-no-repeat relative bg-gradient-to-br from-red-400 to-indigo-600",style:(null==e?void 0:e.bannerUrl)?{backgroundImage:`url(${null==e?void 0:e.bannerUrl})`}:void 0},f.createElement("div",{className:"absolute left-4 -bottom-3"},f.createElement(ll,{size:10,server:e,className:"dark:bg-gray-750 rounded-xl ring-4 dark:ring-gray-800 transition dark:group-hover:ring-gray-850 group-hover:shadow-md"}))),f.createElement("div",{className:"flex flex-col flex-grow px-4 pt-5 pb-4 h-40"},f.createElement("div",{className:"text-lg font-semibold text-secondary"},null==e?void 0:e.displayName),f.createElement("div",{className:"text-13 text-tertiary line-clamp-3 pt-1"},(null==e?void 0:e.description)||"No description"),f.createElement("div",{className:"flex mt-auto text-xs"},f.createElement("div",{className:"inline-flex items-center"},f.createElement(ge,{className:"w-4 h-4 text-tertiary"}),f.createElement("div",{className:"ml-2 text-tertiary"},a("server.memberCount",{count:null!=(r=null==e?void 0:e.userCount)?r:0}))),f.createElement("div",{className:"ml-auto inline-flex items-center"},f.createElement(l,{className:"w-4 h-4 text-tertiary"}),f.createElement("div",{className:"ml-2 text-tertiary"},e.category))))))}function Wo({children:e}){return f.createElement("div",{className:"max-h-full h-full dark:bg-gray-750 px-6 py-4 scrollbar-custom overflow-y-auto"},e)}function Zo(){var e;const[t,n]=Ja((e=>[e.exploreCategory,e.exploreSort])),{data:r}=Aa({variables:{sort:n,category:t&&"Featured"!==t?t:null,featured:"Featured"===t},fetchPolicy:"cache-and-network"}),a=null!=(e=null==r?void 0:r.publicServers)?e:[];return f.createElement(oo,{leftSidebar:f.createElement(Vo,null),header:f.createElement(ws,{title:"Explore",icon:f.createElement(ce,{className:"w-5 h-5"})})},f.createElement(pt,null,f.createElement("title",null,"Explore Planets – Comet")),f.createElement(Wo,null,f.createElement("div",{className:"md:px-8 md:py-8 px-0 py-0"},f.createElement("div",{className:"grid grid-cols-1 gap-4 lg:grid-cols-3 2xl:grid-cols-5"},a.map((e=>f.createElement(Yo,{server:e,key:e.id})))),!a.length&&f.createElement(Wa,null,"Nothing here yet!"))))}function Qo(){return f.createElement(ws,{icon:f.createElement(gt,{className:"h-5 w-5"}),title:"Inbox",showDivider:!0},f.createElement("div",{className:"flex items-center space-x-4"},f.createElement(Jo,{page:"Unread"}),f.createElement(Jo,{page:"All"})))}function Jo({page:e}){const[t,n]=Ja((e=>[e.inboxPage,e.setInboxPage]));return f.createElement(Ns,{page:e,currentPage:t,setCurrentPage:n})}function Ko(e){return vt(e).calendar()}function Xo(e){return vt(e).format("h:mm A")}function ei({reply:e}){const{comment:n}=e,{parentComment:r,post:a}=n,[l]=function(e){const n={...Tn,...e};return t(aa,n)}({optimisticResponse:{markReplyRead:{...e,isRead:!0}}}),[s]=function(e){const n={...Tn,...e};return t(la,n)}({optimisticResponse:{markReplyUnread:{...e,isRead:!1}}});return f.createElement(b,{to:`${a.relativeUrl}#${n.id}`,className:"block dark:bg-gray-800 dark:hover:bg-gray-825 rounded p-3 cursor-pointer relative"},f.createElement("div",{className:"flex"},f.createElement("div",{className:"text-13 hover:underline font-medium text-tertiary pr-5 leading-5"},a.title),f.createElement("div",{className:"flex items-center ml-auto h-5"},f.createElement("div",{className:"text-mid text-13 font-medium mr-2 leading-5"},a.server.name),f.createElement(ll,{server:a.server,size:5,className:"rounded-full"}))),r?f.createElement("div",null,f.createElement(ti,{comment:r}),f.createElement("div",{className:"ml-7 mt-2 border-t dark:border-gray-750"},f.createElement(ti,{comment:n}))):f.createElement(ti,{comment:n}),f.createElement("div",{className:"flex items-center pt-3 border-t dark:border-gray-750 mt-2"},f.createElement("div",{className:"flex items-center highlightable",onClick:t=>{t.stopPropagation(),t.preventDefault(),e.isRead?s({variables:{input:{replyId:e.id}}}):l({variables:{input:{replyId:e.id}}})}},f.createElement(te,{className:"h-5 w-5"}),f.createElement("div",{className:"ml-2 text-xs font-medium"},e.isRead?"Mark Unread":"Mark Read"))))}function ti({comment:e}){var t,n,r,a,l,s,o,i;return f.createElement("div",{className:"flex space-x-3 pt-3"},f.createElement("div",{onClick:e=>{e.stopPropagation(),e.preventDefault()}},f.createElement(Vl,{data:{type:wl,user:e.author}},f.createElement(Rs,{user:e.author,role:null==(t=e.serverUser)?void 0:t.role},f.createElement(Ms,{user:e.author,size:7})))),f.createElement("div",null,f.createElement("div",{className:"flex items-end pb-1.5"},f.createElement("div",{onClick:e=>{e.stopPropagation(),e.preventDefault()}},f.createElement(Vl,{data:{type:wl,user:e.author}},f.createElement(Rs,{user:e.author,role:null==(n=e.serverUser)?void 0:n.role},f.createElement("div",{className:"text-sm font-medium cursor-pointer hover:underline leading-none "+((null==(a=null==(r=e.serverUser)?void 0:r.role)?void 0:a.color)?"":"text-primary"),style:{color:null==(s=null==(l=e.serverUser)?void 0:l.role)?void 0:s.color}},null!=(i=null==(o=e.author)?void 0:o.username)?i:"[deleted]")))),f.createElement("div",{className:"text-11 text-mid font-medium pl-2 leading-none"},Ko(e.createdAt))),f.createElement("div",{className:"prose prose-sm dark:prose-dark",dangerouslySetInnerHTML:{__html:e.text}})))}vt.extend(ht),vt.extend(ft);const ni="px-2 pb-2 text-11 text-tertiary uppercase tracking-widest font-semibold";function ri(){var e;const t=Ja((e=>e.inboxPage));so("inbox");const[n]=Ya(),{data:r}=Ta({skip:!n,fetchPolicy:"cache-and-network"}),a=(null!=(e=null==r?void 0:r.replies)?e:[]).filter((e=>"Unread"!==t||!e.isRead));return f.createElement(oo,{header:f.createElement(Qo,null)},f.createElement(pt,null,f.createElement("title",null,`(${a.length}) Inbox – Comet`)),f.createElement(Wo,null,"Unread"===t&&f.createElement(f.Fragment,null,f.createElement("div",{className:ni},"Unread - ",a.length)),"All"===t&&f.createElement(f.Fragment,null,f.createElement("div",{className:ni},"All - ",a.length)),0===a.length&&f.createElement(Wa,null,"You are all caught up!"),f.createElement("div",{className:"space-y-1.5"},a.map((e=>f.createElement(ei,{reply:e,key:e.id}))))))}function ai({user:e}){var t;return f.createElement(ws,{icon:f.createElement(bt,{className:"w-5 h-5"}),title:f.createElement(f.Fragment,null,null!=(t=null==e?void 0:e.username)?t:"",f.createElement("div",{className:"w-2.5 h-2.5 ml-3 rounded-full "+((null==e?void 0:e.isOnline)?"bg-green-500":"bg-gray-600")}))})}const li=["application/vnd.rar","application/x-tar","application/zip","application/x-7z-compressed","application/java-archive","application/x-bzip","application/x-bzip2","application/gzip","application/x-freearc"],si=["application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/x-abiword","application/rtf","application/vnd.oasis.opendocument.text"],oi=["application/xhtml+xml","application/xml","text/xml","application/json","application/ld+json","text/css","application/x-csh","text/html","text/javascript","application/x-httpd-php","application/x-sh","application/vnd.mozilla.xul+xml"],ii=["application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.oasis.opendocument.spreadsheet"],ci=["application/vnd.ms-powerpoint","application/vnd.openxmlformats-officedocument.presentationml.presentation","application/vnd.oasis.opendocument.presentation"],mi=e=>g.exports.useMemo((()=>e?e.startsWith("audio")?Et:e.startsWith("image")?xt:e.startsWith("video")?yt:"text/csv"===e?wt:"application/pdf"===e?Nt:si.includes(e)?kt:ii.includes(e)?Ct:ci.includes(e)?$t:li.includes(e)?Ut:oi.includes(e)?St:It:null),[e]);function di({user:e,channel:t,group:n}){return f.createElement("div",{className:"px-4 py-5.5 flex items-end"},f.createElement("div",null,!!e&&f.createElement(f.Fragment,null,f.createElement(Ms,{user:e,size:20}),f.createElement("div",{className:"text-3xl font-semibold pt-4 text-primary"},e.username),f.createElement("div",{className:"pt-2 text-tertiary select-none text-base"},"This is the beginning of your direct message history with"," ",f.createElement("span",{className:"font-semibold"},"@",e.username))),!!t&&f.createElement(f.Fragment,null,f.createElement("div",{className:"rounded-full flex items-center justify-center w-20 h-20 dark:bg-gray-700"},f.createElement(nl,{className:"w-2/3 h-2/3 text-primary"})),f.createElement("div",{className:"text-3xl font-semibold pt-4 text-primary"},"Welcome to #",t.name,"!"),f.createElement("div",{className:"pt-2 text-tertiary select-none text-base"},"This is the start of the #",t.name," channel.")),!!n&&f.createElement(f.Fragment,null,f.createElement("div",{className:"rounded-full flex items-center justify-center w-20 h-20 dark:bg-gray-700"},f.createElement(ge,{className:"w-2/3 h-2/3 text-primary"})),f.createElement("div",{className:"text-3xl font-semibold pt-4 text-primary"},n.name),f.createElement("div",{className:"pt-2 text-tertiary select-none text-base"},"Welcome to the beginning of the"," ",f.createElement("span",{className:"font-semibold"},n.displayName)," group."))))}var ui=g.exports.memo((function({index:e,message:t,prevMessage:n,server:r,channel:a,group:l,user:s}){var o,i,c,m,d,u,p,v,h,b,E,x;const[y]=Ya(),w=t.isEveryoneMentioned||t.mentionedUsers.map((e=>e.id)).includes(null==y?void 0:y.id),N=mi(null==(o=null==t?void 0:t.file)?void 0:o.mime),k=g.exports.useCallback((e=>{var t,n;const r=null==(n=null==(t=e.target)?void 0:t.dataset)?void 0:n.mention;r&&r.substring(2,r.length-1)}),[t]),C=0===e||n&&(!n.text||n.author.id!==t.author.id);return t.type===Gn.Initial?f.createElement(di,{channel:a,group:l,user:s}):t.type===Gn.Join?f.createElement(Vl,{className:(null==n?void 0:n.text)?"pt-4":"",data:{type:Cl,message:t,server:r}},f.createElement("div",{className:"flex dark:hover:bg-gray-775 py-1 px-4"},f.createElement("div",{className:"w-10 flex justify-center"},f.createElement(Pt,{className:"w-5 h-5 text-green-500"})),f.createElement("div",{className:"pl-4 text-base text-tertiary flex items-center"},f.createElement(Vl,{className:"inline-block",data:{type:wl,user:t.author,server:r,role:null==(i=t.serverUser)?void 0:i.role}},f.createElement(Rs,{user:t.author,role:null==(c=t.serverUser)?void 0:c.role},f.createElement(Ms,{user:t.author,size:5}))),f.createElement(Vl,{className:"inline-block",data:{type:wl,user:t.author,server:r,role:null==(m=t.serverUser)?void 0:m.role}},f.createElement(Rs,{user:t.author,role:null==(d=t.serverUser)?void 0:d.role},f.createElement("span",{className:"ml-2 text-white cursor-pointer hover:underline"},t.author.username)))," has joined the ",t.serverUser?"planet":"group",f.createElement("span",{className:"pl-2 text-11 whitespace-nowrap text-mid cursor-default leading-5 select-none"},Xo(t.createdAt))))):t.type===Gn.Normal?f.createElement("div",{className:""+(C?"pt-4":"")},f.createElement(Vl,{data:{type:Cl,message:t,server:r}},f.createElement("div",{className:"flex py-1 pl-4 pr-18 dark:hover:bg-gray-775 group relative"},w&&f.createElement("div",{className:"bg-gray-500 group-hover:bg-opacity-30 bg-opacity-10 absolute inset-0 pointer-events-none border-l-2 border-gray-500"}),C?f.createElement(Vl,{data:{type:wl,user:t.author,server:r,role:null==(u=t.serverUser)?void 0:u.role}},f.createElement(Rs,{user:t.author,role:null==(p=t.serverUser)?void 0:p.role},f.createElement(Ms,{user:t.author,size:10,className:"dark:bg-gray-700 cursor-pointer"}))):f.createElement("div",{className:"w-10 text-11 whitespace-nowrap text-mid group-hover:opacity-100 opacity-0 cursor-default select-none leading-6.5"},Xo(t.createdAt)),f.createElement("div",{className:"pl-4 w-full"},C&&f.createElement("div",{className:"flex items-end pb-0.5"},f.createElement(Vl,{data:{type:wl,user:t.author,server:r,role:null==(v=t.serverUser)?void 0:v.role}},f.createElement(Rs,{user:t.author,role:null==(h=t.serverUser)?void 0:h.role},f.createElement("div",{className:"text-base font-medium cursor-pointer hover:underline leading-none",style:{color:null==(E=null==(b=t.serverUser)?void 0:b.role)?void 0:E.color}},t.author.username))),f.createElement("div",{className:"text-11 text-mid pl-2 leading-none cursor-default select-none"},Ko(t.createdAt))),!!t.text&&f.createElement("div",{onClick:k,className:"prose prose-sm dark:prose-dark focus:outline-none max-w-none",dangerouslySetInnerHTML:{__html:t.text}}),!!(null==(x=t.linkMetadatas)?void 0:x.length)&&f.createElement("div",{className:"space-y-1 pt-1"},t.linkMetadatas.map(((e,t)=>f.createElement(ro,{key:t,metadata:e,linkUrl:e.url})))),t.images.map(((e,t)=>f.createElement("div",{key:t,className:"pt-1"},f.createElement(no,{image:e})))),!!t.file&&f.createElement("div",{className:"pt-1 max-w-screen-sm w-full"},f.createElement("div",{className:"flex border dark:border-gray-850 dark:bg-gray-800 p-3 rounded w-full items-center"},f.createElement(N,{className:"w-8 h-8 dark:text-white"}),f.createElement("div",{className:"pl-3"},f.createElement("a",{href:t.file.url,target:"_blank",rel:"noreferrer noopener",className:"block text-base text-accent hover:underline cursor-pointer truncate"},t.file.filename),f.createElement("div",{className:"text-mid text-xs"},function(e,t=2){if(0===e)return"0 Bytes";const n=t<0?0:t,r=Math.floor(Math.log(e)/Math.log(1024));return parseFloat((e/Math.pow(1024,r)).toFixed(n))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][r]}(t.file.size))),f.createElement("a",{className:"block ml-auto",href:t.file.url,target:"_blank",rel:"noreferrer noopener"},f.createElement(Ft,{className:"h-6 w-6 highlightable"})))))))):null}));const pi=({channelId:e,groupId:t,userId:r})=>{const a={channelId:e,groupId:t,userId:r},{data:l,fetchMore:s,loading:o}=function(e){const t={...Tn,...e};return n(Pa,t)}({variables:{...a,cursor:null},fetchPolicy:"cache-and-network",nextFetchPolicy:"cache-first"}),i=null==l?void 0:l.messages.hasMore,c=null==l?void 0:l.messages.messages;return[c,o,()=>{c&&i&&0!==c.length&&s({variables:{...a,cursor:c[0].id},updateQuery:(e,{fetchMoreResult:t})=>({messages:{hasMore:t.messages.hasMore,messages:[...t.messages.messages,...e.messages.messages]}})})},i]},gi=e=>w(`\n  ${e?"scale-100":"scale-0"}\n  transform\n  transition\n  bg-gradient-to-br\n  from-red-400\n  to-indigo-600\n  rounded-xl\n  p-3\n  max-w-sm\n  w-full\n  relative\n`);function vi({channel:e,user:t,group:n,setFiles:r}){const[a,l]=(()=>{const[e,t]=g.exports.useState(null),[n,r]=g.exports.useState(!1),a=g.exports.useRef(0),l=g.exports.useCallback((e=>{e.preventDefault(),e.stopPropagation()}),[]),s=g.exports.useCallback((e=>{e.preventDefault(),e.stopPropagation(),a.current++,e.dataTransfer.items&&e.dataTransfer.items.length>0&&r(!0)}),[]),o=g.exports.useCallback((e=>{e.preventDefault(),e.stopPropagation(),a.current--,a.current>0||r(!1)}),[]),i=g.exports.useCallback((e=>{e.preventDefault(),e.stopPropagation(),r(!1),e.dataTransfer.files&&e.dataTransfer.files.length>0&&(a.current=0,t(e.dataTransfer.files),e.dataTransfer.clearData())}),[]);return g.exports.useEffect((()=>(window.addEventListener("dragenter",s),window.addEventListener("dragleave",o),window.addEventListener("dragover",l),window.addEventListener("drop",i),function(){window.removeEventListener("dragenter",s),window.removeEventListener("dragleave",o),window.removeEventListener("dragover",l),window.removeEventListener("drop",i)}))),[e,n]})();g.exports.useEffect((()=>r(a)),[a,r]);const s=g.exports.useMemo((()=>e?`#${e.name}`:t?`@${t.username}`:n?`${n.displayName}`:void 0),[e,t,n]);return f.createElement(f.Fragment,null,f.createElement("div",{className:(o=l,w(`\n  fixed\n  inset-0\n  transition-all\n  bg-black\n  ${o?"visible bg-opacity-75":"invisible bg-opacity-0"}\n  flex\n  items-center\n  justify-center\n`)),style:{zIndex:999999}},f.createElement("div",{className:gi(l)},f.createElement("div",{className:"flex absolute left-1/2 transform top-0 -translate-x-1/2 -translate-y-1/2 transition delay-75 "+(l?"scale-100":"scale-0")},f.createElement("div",{className:"relative transform translate-x-6 translate-y-3 -rotate-12"},f.createElement("div",{className:"absolute left-5 top-9 w-14 h-14 bg-red-400",style:{zIndex:-1}}),f.createElement(St,{className:"w-24 h-24"})),f.createElement("div",{className:"relative"},f.createElement("div",{className:"absolute left-5 top-9 w-14 h-14 bg-red-400",style:{zIndex:-1}}),f.createElement(yt,{className:"w-24 h-24 "})),f.createElement("div",{className:"relative transform -translate-x-6 translate-y-3 rotate-12"},f.createElement("div",{className:"absolute left-5 top-8 w-14 h-14 bg-red-400",style:{zIndex:-1}}),f.createElement(xt,{className:"w-24 h-24"}))),f.createElement("div",{className:"rounded-xl border-dashed border-white border-2 px-4 pb-4 pt-16 text-center"},f.createElement("div",{className:"text-xl font-bold text-primary"},"Upload to ",f.createElement("span",{className:"text-white"},s))))));var o}const hi=w("\n  text-sm\n  text-primary\n  h-10\n  px-7\n  hover:underline\n  focus:outline-none\n  select-none\n  disabled:opacity-50\n  disabled:no-underline\n  disabled:cursor-not-allowed\n"),fi=w("\n  text-sm\n  text-primary\n  transition\n  bg-blue-500\n  hover:bg-blue-600\n  flex\n  items-center\n  justify-center\n  rounded\n  px-7\n  h-10\n  focus:outline-none\n  select-none\n  disabled:opacity-50\n  disabled:cursor-not-allowed\n");function bi({createMessage:e,variables:t,file:n,setFileIndex:r,placeholder:a,multiple:l,cancelAll:s}){var o;const[i,c]=g.exports.useState(""),m=(e=>{const[t,n]=g.exports.useState(null);return g.exports.useEffect((()=>{e&&(e.type.startsWith("image")?Yl(e).then((e=>n(e))).catch((()=>n(null))):n(null))}),[e]),t})(n),[d,u]=g.exports.useState(!1),p=g.exports.useCallback((()=>{d||r((e=>e+1))}),[r,d]),v=g.exports.useCallback((()=>{u(!0),e({variables:{input:{text:i||null,file:n,...t}}}).then((()=>{u(!1),p()}))}),[p,i,n,t,e]);g.exports.useEffect((()=>c("")),[n]);const h=g.exports.useCallback((e=>{"Enter"===e.key&&n&&v()}),[v,n]);g.exports.useEffect((()=>(document.body.addEventListener("keydown",h),()=>{document.body.removeEventListener("keydown",h)})),[h]);const b=mi(null==n?void 0:n.type);return f.createElement(Kl,{close:p,isOpen:!!n},f.createElement("div",{className:"text-left relative w-full rounded-xl dark:bg-gray-750 max-w-lg mx-auto"},f.createElement("div",{className:"absolute left-5 -top-20 flex w-46 h-40"},m&&f.createElement("img",{alt:"",src:m,className:"absolute max-w-full max-h-full bottom-0 left-0 rounded shadow-md object-cover"}),!m&&b&&f.createElement(b,{className:"h-full w-full text-white absolute bottom-0 left-0 transform -translate-x-8"})),f.createElement("div",{className:"px-5 pt-24 pb-5"},f.createElement(Es,{className:"truncate text-left text-xl text-primary font-semibold select-none"},null!=(o=null==n?void 0:n.name)?o:""),f.createElement("div",{className:"text-tertiary text-13 pb-5 pt-0.5 select-none"},"Upload to"," ",f.createElement("span",{className:"font-medium text-secondary"},a)),f.createElement("label",{htmlFor:"comment",className:"block uppercase text-xs font-medium text-secondary pb-1.5"},"Add a Comment ",f.createElement("span",{className:"text-tertiary"},"(Optional)")),f.createElement("input",{className:"h-10 rounded-lg dark:bg-gray-700 w-full focus:outline-none px-4 text-secondary text-base",id:"comment",value:i,onChange:e=>{const t=e.target.value;c(t)}})),f.createElement("div",{className:"flex p-4 dark:bg-gray-775 rounded-b-xl"},f.createElement("div",{className:"ml-auto"}),l&&f.createElement("button",{className:hi,onClick:()=>{s()},disabled:d},"Cancel All"),f.createElement("button",{className:hi,onClick:p,disabled:d},"Cancel"),f.createElement("button",{className:fi,disabled:!n||d,onClick:v},"Upload",d&&f.createElement("div",{className:"ml-3"},f.createElement(tl,null))))))}const Ei=({channel:e,group:n,user:a,users:l})=>{C();const[s]=Ya(),[o,i]=g.exports.useState([]),[c]=function(e){const n={...Tn,...e};return t(Yr,n)}(),m={userId:null==a?void 0:a.id,groupId:null==n?void 0:n.id,channelId:null==e?void 0:e.id};!function(e){const t={...Tn,...e};r(Ba,t)}({variables:m,skip:!e&&!n&&!a,onSubscriptionData({subscriptionData:{data:{typingUpdated:{typingUserId:e,isTyping:t}}}}){if(t){const t=o.find((t=>t.id===e));if(t){const e=o.indexOf(t),n=[...o];n[e]={id:t.id,time:(new Date).getTime()},i(n)}else i([...o,{id:e,time:(new Date).getTime()}])}else i(o.filter((({id:t})=>t!==e)))}});const[d,u]=g.exports.useState(0);g.exports.useEffect((()=>{const e=setInterval((()=>{u(d+1)}),1e3);return()=>clearInterval(e)}),[d,u]);return[()=>c({variables:{input:m}}),o.filter((({id:e,time:t})=>(!s||e!==s.id)&&(new Date).getTime()-t<=1500)).map((({id:e})=>{var t;return null==(t=l.find((t=>t.id===e)))?void 0:t.username})).filter((e=>!!e))]},xi=Mt.create({name:"mention",defaultOptions:{HTMLAttributes:{},suggestion:{char:"@",command:({editor:e,range:t,props:n})=>{e.chain().focus().insertContentAt(t,[{type:"mention",attrs:n},{type:"text",text:" "}]).run()},allow:({editor:e,range:t})=>e.can().insertContentAt(t,{type:"mention"})}},group:"inline",inline:!0,selectable:!1,atom:!0,addAttributes:()=>({id:{default:null,parseHTML:e=>({id:e.getAttribute("data-mention")}),renderHTML:e=>e.id?{"data-mention":e.id}:{}},name:{default:null,parseHTML:e=>({name:e.getAttribute("data-mention")}),renderHTML:()=>({})}}),parseHTML:()=>[{tag:"span[data-mention]"}],renderHTML({node:e,HTMLAttributes:t}){return["span",je(this.options.HTMLAttributes,t),`${this.options.suggestion.char}${e.attrs.name}`]},renderText({node:e}){return`${this.options.suggestion.char}${e.attrs.name}`},addKeyboardShortcuts(){return{Backspace:()=>this.editor.commands.command((({tr:e,state:t})=>{let n=!1;const{selection:r}=t,{empty:a,anchor:l}=r;return!!a&&(t.doc.nodesBetween(l-1,l,((t,r)=>{if("mention"===t.type.name)return n=!0,e.insertText(this.options.suggestion.char||"",r,r+t.nodeSize),!1})),n)}))}},addProseMirrorPlugins(){return[Rt({editor:this.editor,...this.options.suggestion})]}});class yi extends g.exports.Component{constructor(e){super(e),this.state={selectedIndex:0}}componentDidUpdate(e){e.users.length<this.props.selectedIndex+1&&this.setState({selectedIndex:e.users.length-1})}users(){return this.props.users.filter((e=>("string"==typeof e?e.substring(1):e.username).toLowerCase().startsWith(this.props.query.toLowerCase()))).slice(0,5)}onKeyDown({event:e}){return"ArrowUp"===e.key?(this.upHandler(),!0):"ArrowDown"===e.key?(this.downHandler(),!0):"Enter"===e.key?(e.stopPropagation(),this.enterHandler(),!0):!(" "!==e.key||!this.props.query)&&(e.stopPropagation(),this.spaceHandler(),!0)}upHandler(){let e=this.state.selectedIndex-1;e<0&&(e=this.users().length-1),this.setState({selectedIndex:e})}downHandler(){let e=this.state.selectedIndex+1;e>=this.users().length&&(e=0),this.setState({selectedIndex:e})}enterHandler(){this.selectItem(this.state.selectedIndex)}spaceHandler(){this.selectItem(this.state.selectedIndex)}selectItem(e){const t=this.users()[e];t&&this.props.command("string"==typeof t?{id:`<${t}>`,name:t.substring(1)}:{id:`<@${t.id}>`,name:t.username})}render(){return f.createElement("div",{className:"relative w-full w-72 rounded-md dark:bg-gray-800 overflow-hidden shadow-lg p-2 border dark:border-gray-850"},this.users().map(((e,t)=>f.createElement("button",{className:"flex items-center rounded w-full text-left text-primary text-base bg-transparent border-none px-2 h-10 focus:outline-none "+(t===this.state.selectedIndex?"dark:bg-gray-775":""),key:"string"==typeof e?e:e.id,onClick:()=>this.selectItem(t),onMouseMove:()=>this.setState({selectedIndex:t})},"string"==typeof e?e:f.createElement(f.Fragment,null,f.createElement(Ms,{user:e,size:6,className:"mr-2"}),e.username)))))}}const wi="_typing__dot_1o677_5";function Ni(){return f.createElement("div",{className:"_typing_1o677_1"},f.createElement("div",{className:wi}),f.createElement("div",{className:wi}),f.createElement("div",{className:wi}))}function ki({channel:e,server:t,group:n,user:r,users:a}){const l={channelId:null==e?void 0:e.id,groupId:null==n?void 0:n.id,userId:null==r?void 0:r.id},{t:s}=C(),[o]=Ya(),i=!!r&&r.relationshipStatus===rr.Blocked,c=!!r&&r.relationshipStatus===rr.Blocking,[m,d,u]=Il({server:t,permissions:[or.SendMessages,or.RestrictedChannels,or.PrivateChannels]}),p=!!e&&m&&(e.type===Ln.Public||e.type===Ln.Restricted&&d||e.type===Ln.Private&&u),v=!!o&&(!!r&&(!!r&&!i&&!c)||!!e&&p||!!n),h=g.exports.useMemo((()=>o?e?p?`Message #${e.name}`:"You do not have permission to send messages in this channel":n?`Message ${n.name}`:r?i?"This user has blocked you":c?"You are blocking this user":`Message @${r.username}`:"":"Must log in to send messages"),[o,e,n,r,p,i,c]),b={autofocus:!0,extensions:[Ve.configure({horizontalRule:!1,bulletList:!1,orderedList:!1,listItem:!1,heading:!1}),uo,At.configure({placeholder:`${h}`,showOnlyWhenEditable:!1}),Dt.create({addKeyboardShortcuts:()=>({Enter:({editor:e})=>{let t=e.getHTML();if(!(0===e.state.doc.textContent.length)){const n=/^<p>|<\/p>$/gi,r=/^\s*(?:<br\s*\/?\s*>)+|(?:<br\s*\/?\s*>)+\s*$/gi;t=t.replace(n,""),t=t.replace(r,""),M({variables:{input:{text:t,...l}}}),e.commands.clearContent()}return!0}})}),xi.configure({suggestion:{allowSpaces:!1,render:()=>{let e,t;return{onStart:n=>{e=new Tt(yi,{props:{...n,users:["@everyone"].concat(a)},editor:n.editor}),t=Lt("body",{getReferenceClientRect:n.clientRect,appendTo:()=>document.body,content:e.element,showOnCreate:!0,interactive:!0,trigger:"manual",placement:"bottom-start",render(e){const t=document.createElement("div"),n=document.createElement("div");return t.appendChild(n),n.innerHTML="",n.appendChild(e.props.content),{popper:t,onUpdate:function(e,t){e.content!==t.content&&(n.innerHTML="",n.appendChild(t.content))}}}})},onUpdate(n){e.updateProps(n),t[0].setProps({getReferenceClientRect:n.clientRect})},onKeyDown(t){var n;return null==(n=e.ref)?void 0:n.onKeyDown(t)},onExit(){t[0].destroy(),e.destroy()}}}}})],content:"",editorProps:{attributes:{class:"prose prose-sm dark:prose-dark focus:outline-none max-w-none"}},editable:v},[E,y]=g.exports.useState(null),w=function(){const[,e]=g.exports.useState(0);return()=>e((e=>e+1))}();g.exports.useEffect((()=>{E&&E.destroy();const e=new Ot(b);return y(e),e.on("transaction",w),()=>{e.destroy()}}),[v,h,null==l?void 0:l.channelId,null==l?void 0:l.groupId,null==l?void 0:l.userId]);const[N,k]=Ei({channel:e,group:n,user:r,users:a}),[$,U]=g.exports.useState(null),[S,I]=g.exports.useState(null),[P,F]=g.exports.useState(0),[M]=Hr({update(t,{data:{createMessage:a}}){const l=null==e?void 0:e.id,s=null==n?void 0:n.id,o=null==r?void 0:r.id,i={query:Pa,variables:{userId:o,groupId:s,channelId:l,cursor:null}},c=t.readQuery(i);c&&!c.messages.messages.map((e=>e.id)).includes(a.id)&&t.writeQuery({...i,data:{messages:{...c.messages,messages:[...c.messages.messages,a]}}})}}),R=ys(),A=/https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,}\b(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)/i,D=g.exports.useCallback((e=>{var t;if(!v)return;const n=e.clipboardData.files;if(e.preventDefault(),n&&n.length>0)U(n);else{const n=null==(t=e.clipboardData)?void 0:t.getData("text/plain");n&&(A.test(n)?null==E||E.commands.insertContent(`<a href="${n}" target="_blank" rel="noopener noreferrer nofollow">${n}</a>`):null==E||E.commands.insertContent(n),null==E||E.commands.focus())}}),[E]);g.exports.useEffect((()=>(document.body.addEventListener("paste",D),()=>{document.body.removeEventListener("paste",D)})),[D]);const[T,L]=g.exports.useState(null),O=g.exports.useCallback((e=>{if(!v)return;const t=(new Date).getTime();T?t-T>500&&(N(),L(t)):L(t),null==E||E.commands.focus()}),[E]);g.exports.useEffect((()=>(document.body.addEventListener("keypress",O),()=>{document.body.removeEventListener("keypress",O)})),[D]),g.exports.useEffect((()=>{$&&(I($[0]),F(0))}),[$]),g.exports.useEffect((()=>{if(!$)return;let e;return P>=$.length?(U(null),I(null),F(0)):(I(null),e=setTimeout((()=>I($[P])),300)),()=>{e&&clearTimeout(e)}}),[P]);const z=g.exports.useCallback((()=>{U(null),I(null),F(0)}),[U,I,F]);return f.createElement(f.Fragment,null,!!o&&f.createElement(f.Fragment,null,f.createElement(vi,{placeholder:h,setFiles:U}),f.createElement(bi,{createMessage:M,variables:l,file:S,setFileIndex:F,placeholder:h,multiple:$&&$.length>1,cancelAll:z})),f.createElement("div",{className:"px-4 dark:bg-gray-750 relative"},f.createElement("div",{className:"relative"},v&&f.createElement(x,{content:s("message.upload")},f.createElement("div",{className:"block absolute left-4.5 top-1/2 transform -translate-y-1/2"},f.createElement("input",{className:"hidden",id:"file",name:"file",type:"file",onChange:e=>U(e.target.files),multiple:!0}),f.createElement("label",{htmlFor:"file",className:"text-tertiary highlightable"},f.createElement(zt,{className:"w-5 h-5"})))),f.createElement("div",{onClick:()=>{o||R()},className:`${v?"px-14":"px-4 opacity-50"} ${o?"":"cursor-pointer"} min-h-[3rem] max-h-[20rem] overflow-y-auto scrollbar-light dark:bg-gray-700 py-3 w-full rounded-lg text-base focus:outline-none text-secondary border-none`},!(null==E?void 0:E.isDestroyed)&&f.createElement(We,{editor:E}))),f.createElement("div",{className:"h-6 flex items-center text-secondary text-13 font-medium"},k.length>0&&f.createElement(Ni,null),1===k.length&&f.createElement(f.Fragment,null,f.createElement("span",{className:"font-bold text-primary"},k[0])," is typing..."),2===k.length&&f.createElement(f.Fragment,null,f.createElement("span",{className:"font-bold text-primary"},k[0])," and ",f.createElement("span",{className:"font-bold text-primary"},k[1])," are typing..."),3===k.length&&f.createElement(f.Fragment,null,f.createElement("span",{className:"font-bold text-primary"},k[0]),", ",f.createElement("span",{className:"font-bold text-primary"},k[1]),", and ",f.createElement("span",{className:"font-bold text-primary"},k[2])," are typing..."),k.length>3&&f.createElement(f.Fragment,null,"Several people are typing..."))))}function Ci({channel:e,server:n,user:r,group:a,users:l}){const s=g.exports.useRef(null),[o,i,c,m]=pi({channelId:null==e?void 0:e.id,userId:null==r?void 0:r.id,group:null==a?void 0:a.id}),[d,u]=g.exports.useState((null==o?void 0:o.length)||0);g.exports.useEffect((()=>{var e;u((null==o?void 0:o.length)||0),null==(e=null==s?void 0:s.current)||e.scrollToIndex(d+1e7)}),[e,r,a,s]);const{atBottom:p,newMessagesNotification:v,setNewMessagesNotification:h}=function(e){const[t]=Ya(),[n,r]=g.exports.useState(!1),a=g.exports.useRef(""),l=g.exports.useRef(!1);return g.exports.useEffect((()=>{var n;if(!(null==e?void 0:e.length))return;const s=e[e.length-1],o=a.current;a.current=s.id||"",s.id!==o&&(l.current||t&&(null==(n=s.author)?void 0:n.id)!==t.id&&r(!0))}),[t,e]),{atBottom:l,newMessagesNotification:n,setNewMessagesNotification:r}}(o),b=function(e){var t;const n=null==(t=null==e?void 0:e[0])?void 0:t.id,r=g.exports.useRef(n),a=g.exports.useRef(n),l=g.exports.useRef(0);return g.exports.useMemo((()=>{if(!e||!e.length)return 0;if(n===a.current)return l.current;r.current||(r.current=n),a.current=n;for(let t=l.current;t<e.length;t+=1)if(e[t].id===r.current)return l.current=t,t;return 0}),[e,null==e?void 0:e.length])}(o),E=function(e){const[t]=Ya(),n=g.exports.useRef(""),r=g.exports.useRef(!1);function a(){var r;if(e&&e.length>0){const a=e[e.length-1];if((null==(r=a.author)?void 0:r.id)===(null==t?void 0:t.id)&&n.current!==a.id)return n.current=a.id,!0}return!1}return g.exports.useEffect((()=>{e&&e.length&&!r.current&&(r.current=!0,a())}),[e,null==e?void 0:e.length]),a}(o),x=g.exports.useCallback(((t,l)=>{const s=l+b-1e7,o=t[s],i=s>0?t[s-1]:null;return o?f.createElement(ui,{server:n,channel:e,group:a,user:r,message:o,index:s,prevMessage:i}):f.createElement("div",{style:{height:"1px"}})}),[b,n,e,a,r]),[y]=function(e){const n={...Tn,...e};return t(Ir,n)}(),[w]=function(e){const n={...Tn,...e};return t(zr,n)}(),[N]=ea(),[k]=Ya();return g.exports.useEffect((()=>{k&&(null==o?void 0:o.length)&&(e?y({variables:{input:{channelId:e.id}},optimisticResponse:{readChannel:{...e,isUnread:!1}}}):a?w({variables:{input:{groupId:a.id}},optimisticResponse:{readGroup:{...a,unreadCount:0}}}):r&&N({variables:{input:{userId:r.id}},optimisticResponse:{readDm:{...r,unreadCount:0}}}))}),[null==e?void 0:e.id,null==a?void 0:a.id,null==r?void 0:r.id,null==k?void 0:k.id,null==o?void 0:o.length]),f.createElement("div",{className:"flex flex-col h-full"},!!o&&f.createElement(Te,{className:"scrollbar-custom dark:bg-gray-750",alignToBottom:!0,atBottomStateChange:e=>{p.current=e,e&&v&&h(!1)},components:{Footer:()=>f.createElement("div",{className:"h-5.5"})},firstItemIndex:1e7-b,followOutput:e=>(E()||!!e)&&"auto",initialTopMostItemIndex:o.length>0?o.length-1:0,itemContent:e=>x(o,e),overscan:0,ref:s,startReached:()=>{!i&&m&&c()},style:{overflowX:"hidden"},totalCount:o.length||0}),!!l&&(!!e||!!r||!!a)&&f.createElement(ki,{server:n,channel:e,user:r,group:a,users:l}))}function $i({username:e}){const{data:n}=qa({variables:{username:e},fetchPolicy:"cache-and-network",nextFetchPolicy:"cache-first"}),[r]=function(e){const n={...Tn,...e};return t(ta,n)}(),a=null==n?void 0:n.user;g.exports.useEffect((()=>{a&&(a.showChat||r({variables:{input:{userId:a.id}}}))}),[null==a?void 0:a.id]),so(`dm/@${e}`);const[l]=Ya();return f.createElement(oo,{header:f.createElement(ai,{user:a})},!!a&&f.createElement(Ci,{user:a,users:[a,l]}))}const Ui=e=>{const{server:t}=qt(),n=Ja((e=>e.setServerPage));g.exports.useEffect((()=>{null!=e&&n(t.substring(1),e)}),[e,t,n])};function Si({user:e,role:t,server:n}){return f.createElement(Vl,{data:{type:wl,user:e,server:n,role:t}},f.createElement(Rs,{user:e,role:t,placement:"left"},f.createElement(hs,{small:!0},f.createElement(Ms,{user:e,size:6,showOnline:!0,dotClassName:"w-2 h-2 ring-2 dark:ring-gray-800"}),f.createElement("div",{className:"ml-3 font-medium text-tertiary",style:{color:null==t?void 0:t.color}},e.username))))}function Ii({server:e,serverUsers:t}){const n=g.exports.useMemo((()=>{var n;const r=[];for(const s of(null!=(n=null==e?void 0:e.roles)?n:[]).filter((e=>e.permissions.includes(or.DisplayRoleSeparately)))){const e=t.filter((e=>e.isOnline&&e.roles.map((e=>e.id)).includes(s.id)&&!r.includes(e)));e.length&&(r.push(`${s.name} — ${e.length}`),r.push(...e))}const a=t.filter((e=>e.user.isOnline));a.length&&(r.push(`Online — ${a.length}`),r.push(...a));const l=t.filter((e=>!e.user.isOnline));return l.length&&(r.push(`Offline — ${l.length}`),r.push(...l)),r}),[t,e]),r=g.exports.useRef(),a=Ja((e=>e.showUsers));return f.createElement(us,{right:!0,show:a},f.createElement(Te,{className:"scrollbar-dark",ref:r,style:{height:"100%",width:"100%"},data:n,itemContent:(t,n)=>f.createElement("div",{className:"px-1.5 pb-0.5"},"string"==typeof n?f.createElement(bs,null,n):f.createElement("div",{className:""+(n.user.isOnline?"":"opacity-35")},f.createElement(Si,{user:n.user,role:n.role,server:e})))}))}const Pi=g.exports.createContext({server:null,loading:!0,users:[]});function Fi({children:e,name:t}){var r;const{data:a,loading:l}=function(e){const t={...Tn,...e};return n(La,t)}({variables:{name:t},skip:!t,fetchPolicy:"network-only"}),s=null==a?void 0:a.server,{data:o}=function(e){const t={...Tn,...e};return n(Oa,t)}({variables:{serverId:null==s?void 0:s.id},skip:!s,fetchPolicy:"network-only"}),i=null!=(r=null==o?void 0:o.serverUsers)?r:[];return f.createElement(Pi.Provider,{value:{server:s,loading:l&&!s,users:i}},e)}const Mi=()=>{const{server:e,loading:t,users:n}=g.exports.useContext(Pi);return{server:e,loading:t,users:n}};function Ri(){const{server:e,users:t}=Mi(),[n]=Ya();return Ui(""),f.createElement(oo,{header:f.createElement(Cs,null),rightSidebar:f.createElement(Ii,{server:e,serverUsers:t})},f.createElement(pt,null,f.createElement("title",null,null==e?void 0:e.displayName)),f.createElement(lo,{serverId:null==e?void 0:e.id,header:n?f.createElement(Ao,{server:e}):f.createElement("div",{className:"h-4"})}))}function Ai({post:e,users:t=[]}){var n,r,a;const{t:l}=C(),s=Ja((e=>e.showUsers));return f.createElement(us,{right:!0,show:s},f.createElement("div",{className:"px-1"},(null==e?void 0:e.author)&&f.createElement(f.Fragment,null,f.createElement(bs,null,l("post.creator")),f.createElement(Si,{user:e.author,color:null==(r=null==(n=e.serverUser)?void 0:n.role)?void 0:r.color,role:null==(a=e.serverUser)?void 0:a.role})),t&&t.length>0&&f.createElement(f.Fragment,null,f.createElement(bs,null,l("post.participantCount",{count:t.length})),t.map((e=>{var t,n,r;return f.createElement(Si,{key:e.user.id,user:e.user,color:null==(n=null==(t=e.serverUser)?void 0:t.role)?void 0:n.color,role:null==(r=e.serverUser)?void 0:r.role})})))))}const Di=e=>{if(!e.childComments||0===e.childComments.length)return 0;let t=0;return e.childComments.forEach((e=>{e.isDeleted||t++,e.childCount=Di(e),t+=e.childCount})),t},Ti=e=>((e=(e=>{const t=Object.create(null);e.forEach((e=>t[e.id]={...e,childComments:[]}));const n=[];return e.forEach((e=>{e.parentComment?t[e.parentComment.id].childComments.push(t[e.id]):n.push(t[e.id])})),n})(e)).forEach((e=>e.childCount=Di(e))),e),Li=w("\n  text-base\n  text-primary\n  disabled:opacity-50\n  dark:disabled:bg-gray-600\n  bg-green-600\n  rounded\n  px-3\n  h-8\n  flex\n  items-center\n  disabled:cursor-not-allowed\n  focus:outline-none\n"),Oi=w("\n  text-base\n  text-tertiary\n  focus:outline-none\n  px-2\n  h-8\n  flex\n  items-center\n");function zi({postId:e,parentCommentId:n,setOpen:r}){const[a,l]=g.exports.useState(""),[s,{loading:o}]=function(e){const n={...Tn,...e};return t(Pr,n)}({update(t,{data:{createComment:n}}){const r=t.readQuery({query:Ua,variables:{postId:e}});t.writeQuery({query:Ua,variables:{postId:e},data:{comments:[n,...r.comments]}})}}),{t:i}=C();return f.createElement("div",{className:"max-w-screen-md w-full"},f.createElement(go,{text:a,setText:l}),f.createElement("div",{className:"flex justify-end space-x-3 items-center pt-3"},f.createElement("button",{className:Oi,onClick:()=>{r(!1),l("")}},i("comment.create.cancel")),f.createElement("button",{className:Li,disabled:!a||o,onClick:()=>{s({variables:{input:{postId:e,text:a,parentCommentId:n}}}).then((()=>{r(!1),l("")}))}},i("comment.create.submit"),o&&f.createElement(tl,{className:"w-5 h-5 text-primary ml-3"}))))}const qi=w("\n  ml-2\n  text-13\n  text-gray-500\n  hover:text-gray-700\n  dark:hover:text-gray-300\n  font-medium\n  leading-none\n  select-none\n  cursor-pointer\n");function Hi({comment:e,post:n,level:r=0,setParentComment:a}){var l,s,o,i,c,m,d,u;const{t:p}=C(),[v]=Ya(),h=ys(),[b]=function(e){const n={...Tn,...e};return t(Mr,n)}(),[E,x]=g.exports.useState(!1),[y,w]=Ja((e=>[e.replyingCommentId,e.setReplyingCommentId])),N=y===e.id;return e.isDeleted&&!e.childCount?null:f.createElement("div",{className:"relative md:rounded dark:bg-gray-800 "+(0===r?"":"pl-4")},f.createElement("div",{id:e.id}),f.createElement(Vl,{data:{type:kl,comment:e,post:n}},f.createElement("div",{className:"flex px-3 pt-3"},f.createElement(Vl,{data:{type:wl,user:e.author}},f.createElement(Rs,{user:e.author,role:null==(l=e.serverUser)?void 0:l.role},f.createElement(Ms,{size:7,className:"cursor-pointer transition "+(e.author?"hover:opacity-90":"opacity-40 dark:bg-gray-700"),user:e.author}))),f.createElement("div",{className:"pl-3 pb-3 w-full "+(e.childCount&&!E?"border-b dark:border-gray-750":"")},f.createElement("div",{className:"flex items-end pb-1.5"},f.createElement(Vl,{data:{type:wl,user:e.author}},f.createElement(Rs,{user:e.author,role:null==(s=e.serverUser)?void 0:s.role},f.createElement("div",{className:"text-sm font-medium cursor-pointer hover:underline leading-none "+((null==(i=null==(o=e.serverUser)?void 0:o.role)?void 0:i.color)?"":"text-primary"),style:{color:null==(m=null==(c=e.serverUser)?void 0:c.role)?void 0:m.color}},null!=(u=null==(d=e.author)?void 0:d.username)?u:f.createElement("span",{className:"text-mid"},"[deleted]")))),f.createElement("div",{className:"text-11 text-mid font-medium pl-2 leading-none"},Re(new Date(e.createdAt))," ago")),f.createElement("div",{className:"prose prose-sm dark:prose-dark max-w-none",dangerouslySetInnerHTML:{__html:e.text}}),f.createElement("div",{className:"flex items-center pt-1 -ml-2"},f.createElement("div",{className:"flex items-center"},f.createElement("button",{type:"button",className:"focus:outline-none p-1 rounded-full dark:hover:bg-gray-750 transition cursor-pointer "+(e.voteType===cr.Up?"text-red-400":"text-mid"),onClick:()=>{if(!v)return void h();let t=e.voteCount;e.voteType===cr.Up?t--:e.voteType===cr.None?t++:e.voteType===cr.Down&&(t+=2),b({variables:{input:{commentId:e.id,type:e.voteType===cr.Up?cr.None:cr.Up}},optimisticResponse:{...e,voteType:e.voteType===cr.Up?cr.None:cr.Up,voteCount:t}})}},f.createElement(Pe,{className:"w-5 h-5"})),f.createElement("div",{className:`text-13 leading-none font-semibold ${e.voteType===cr.Up?"text-red-400":""} ${e.voteType===cr.Down?"text-blue-400":""} ${e.voteType===cr.None?"text-tertiary":""}`},e.voteCount),n.server.isDownvotesEnabled&&f.createElement("button",{type:"button",className:"focus:outline-none p-1 rounded-full dark:hover:bg-gray-750 transition cursor-pointer "+(e.voteType===cr.Down?"text-blue-400":"text-mid"),onClick:()=>{if(!v)return void h();let t=e.voteCount;e.voteType===cr.Down?t++:e.voteType===cr.None?t--:e.voteType===cr.Up&&(t-=2),b({variables:{input:{commentId:e.id,type:e.voteType===cr.Down?cr.None:cr.Down}},optimisticResponse:{...e,voteType:e.voteType===cr.Down?cr.None:cr.Down,voteCount:t}})}},f.createElement(J,{className:"w-5 h-5"}))),!e.isDeleted&&f.createElement("div",{className:qi,onClick:()=>{w(N?null:e.id)}},p(N?"comment.cancelReply":"comment.reply")),!!e.childCount&&f.createElement("div",{className:qi,onClick:()=>x(!E)},E?`${p("comment.showReplies")} (${e.childCount})`:p("comment.hideReplies")),f.createElement(Vl,{leftClick:!0,data:{type:kl,comment:e,post:n}},f.createElement("div",{className:"ml-2 text-disabled flex items-center cursor-pointer"},f.createElement(De,{className:"w-4 h-4"})))),N&&f.createElement("div",{className:"pt-3 max-w-screen-md w-full"},f.createElement(zi,{postId:n.id,parentCommentId:e.id,setOpen:()=>w(null)}))))),f.createElement("div",{className:"pl-3"},!E&&e.childComments.map((e=>f.createElement(Hi,{key:e.id,comment:e,level:r+1,setParentComment:a,post:n})))))}function Bi({postId:e}){const[t,n]=g.exports.useState(!1),[r]=Ya(),{t:a}=C();return f.createElement(f.Fragment,null,t?f.createElement("div",{className:"dark:bg-gray-800 pt-3 pb-3 px-3 rounded flex"},f.createElement("div",{className:"pr-3 mr-3 border-r dark:border-gray-750 inline-block h-7"},f.createElement(Ms,{user:r,size:7})),f.createElement(zi,{postId:e,setOpen:n})):f.createElement("div",{onClick:()=>n(!0),className:"dark:bg-gray-700 h-13 flex items-center rounded transition dark:hover:bg-gray-650 cursor-pointer"},f.createElement("div",{className:"px-3 border-r dark:border-gray-650 h-7"},f.createElement(Ms,{user:r,size:7})),f.createElement("div",{className:"text-sm text-secondary px-3"},a("post.createComment"))))}function _i({post:e}){const t=Ja((e=>e.canGoBack)),{push:n,goBack:r}=S();return f.createElement("header",{id:"header",className:"h-12 min-h-[3rem] items-center bg-white dark:bg-gray-750 border-b dark:border-gray-800 shadow flex items-center"},f.createElement("div",{className:"flex items-center font-semibold text-base text-primary pl-4"},f.createElement("div",{className:"highlightable mr-3 cursor-pointer",onClick:()=>{t?r():n(`/+${null==e?void 0:e.server.name}`)}},f.createElement(Ht,{className:"w-5 h-5"})),f.createElement("span",{className:"line-clamp-1"},null==e?void 0:e.title)),f.createElement("div",{className:"ml-auto pl-6 pr-4"},f.createElement(ks,null)))}function ji({postId:e}){const[t]=Ya(),{data:r}=function(e){const t={...Tn,...e};return n(Fa,t)}({variables:{id:e},fetchPolicy:"cache-and-network"}),a=null==r?void 0:r.post,{data:l}=function(e){const t={...Tn,...e};return n(Ua,t)}({variables:{postId:e}}),s=g.exports.useMemo((()=>{var e;return Ti(null!=(e=null==l?void 0:l.comments)?e:[])}),[null==l?void 0:l.comments]),o=g.exports.useMemo((()=>((e,t)=>e.filter((e=>{var n;return!!e.author&&e.author.id!==(null==(n=null==t?void 0:t.author)?void 0:n.id)})).map((e=>({user:e.author,serverUser:e.serverUser}))).filter(((e,t,n)=>n.findIndex((t=>t.user.id===e.user.id))===t)))(s,a)),[s]);return f.createElement(oo,{header:a?f.createElement(_i,{post:a}):null,rightSidebar:a?f.createElement(Ai,{post:a,users:o}):null},f.createElement(pt,null,f.createElement("title",null,a?`${a.title} – ${a.server.displayName}`:null)),a?f.createElement("div",{className:"max-h-full h-full scrollbar-custom dark:bg-gray-750 overflow-y-auto"},f.createElement("div",{className:"md:pt-4 md:px-4 px-0 pt-0"},!!a&&f.createElement(ao,{post:a,isPostPage:!0})),!!t&&f.createElement("div",{className:"pt-4 px-4"},f.createElement(Bi,{postId:e})),f.createElement("div",{className:"space-y-2 md:px-4 pt-4 px-0 pb-96"},s.map((e=>f.createElement(Hi,{key:e.id,comment:e,post:a}))))):f.createElement(Za,null))}function Gi({name:e,icon:t}){const[n,r]=Ja((e=>[e.postsSort,e.setPostsSort])),{server:a}=qt(),{pathname:l}=I(),{push:s}=S(),o=n===e&&("/"===l||l===`/${a}`),i=t;return f.createElement(hs,{onClick:()=>{r(e),s(a?`/${a}`:"/")},active:o},f.createElement(i,{className:"w-5 h-5 mr-3 text-tertiary"}),e)}function Vi(){const{t:e}=C();return f.createElement("div",{className:"space-y-0.5"},f.createElement(Gi,{name:e("post.feed.sort.hot"),icon:fe}),f.createElement(Gi,{name:e("post.feed.sort.new"),icon:he}),f.createElement(Gi,{name:e("post.feed.sort.top"),icon:ve}))}function Yi(){var e,t,n,r;const{t:a}=C(),[l]=Ya(),s=null!=(e=null==l?void 0:l.groups)?e:[],o=null!=(n=null==(t=null==l?void 0:l.relatedUsers)?void 0:t.filter((e=>e.showChat)))?n:[],i=s.concat(o).sort(((e,t)=>(e.lastMessageAt?new Date(e.lastMessageAt).getTime():0)-(t.lastMessageAt?new Date(t.lastMessageAt).getTime():0))),{data:c}=Ta({skip:!l,fetchPolicy:"cache-and-network"}),m=(null!=(r=null==c?void 0:c.replies)?r:[]).filter((e=>!e.isRead)).length,[d,u]=Ja((e=>[e.postsFeed,e.setPostsFeed])),{pathname:p}=I(),{push:g}=S();return f.createElement(f.Fragment,null,f.createElement(us,null,f.createElement("div",{className:"h-12 border-b dark:border-gray-850 shadow flex items-center px-5 text-base font-medium"},f.createElement(_o,{className:"h-4"})),f.createElement("div",{className:"px-1.5"},!!l&&f.createElement("div",{className:"space-y-0.5 pt-3"},f.createElement(hs,{to:"/inbox"},f.createElement(gt,{className:"mr-3 h-5 w-5"}),a("inbox.title"),!!m&&f.createElement("div",{className:"ml-auto"},f.createElement(ls,{count:m})))),f.createElement(bs,null,"Feed"),f.createElement("div",{className:"space-y-0.5"},!!l&&f.createElement(hs,{active:"Joined"===d&&"/"===p,onClick:()=>{u("Joined"),"/"!==p&&g("/")}},f.createElement(ie,{className:"mr-3 h-5 w-5"}),"Your Feed"),f.createElement(hs,{active:("Featured"===d||!l&&"Joined"===d)&&"/"===p,onClick:()=>{u("Featured"),"/"!==p&&g("/")}},f.createElement(Z,{className:"mr-3 h-5 w-5"}),"Featured"),f.createElement(hs,{active:"All"===d&&"/"===p,onClick:()=>{u("All"),"/"!==p&&g("/")}},f.createElement(Bt,{className:"mr-3 h-5 w-5"}),"Universe")),f.createElement(bs,null,"Posts"),f.createElement(Vi,null),!!l&&f.createElement(f.Fragment,null,f.createElement(bs,{plusLabel:"Create DM"},a("dm.title")),f.createElement("div",{className:"space-y-0.5"},!!i&&i.map((e=>{if("Group"===e.__typename)return f.createElement("div",null,"Group");if("User"===e.__typename){const t=e;return f.createElement(Wi,{user:t,key:`user-${t.id}`})}})))))))}function Wi({user:e}){C();const[t]=ra(),{push:n}=S(),{pathname:r}=I(),[a]=Hr(),[{isOver:l,canDrop:s},o]=_t({accept:ps,drop:(t,r)=>{n(`/dm/@${e.username}`),a({variables:{input:{userId:e.id,text:`${location.origin}${t.relativeUrl}`}}})},collect:e=>({isOver:e.isOver(),canDrop:e.canDrop()})});return f.createElement("div",null,f.createElement(Vl,{data:{type:wl,user:e,isDm:!0}},f.createElement(hs,{ref:o,large:!0,to:`/dm/@${e.username}`,key:`user-${e.id}`},f.createElement(Ms,{size:9,showOnline:!0,user:e,dotClassName:"ring-3 w-2.5 h-2.5 dark:ring-gray-800"}),f.createElement("span",{className:"ml-3"},e.username),f.createElement("div",{className:"ml-auto"}),f.createElement("div",{className:"pr-2"},!!e.unreadCount&&f.createElement(ls,{count:e.unreadCount})),f.createElement(ne,{onClick:a=>{a.stopPropagation(),a.preventDefault(),t({variables:{input:{userId:e.id}}}),r===`/dm/@${e.username}`&&n("/")},className:"group-hover:visible invisible w-5 h-5 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}))))}function Zi({open:e,setOpen:n}){const[r]=Ya(),[a,l]=g.exports.useState(!1),[s,o]=g.exports.useState(!1),{register:i,handleSubmit:c,watch:m,reset:d,formState:{errors:u}}=re({mode:"onChange"}),p=m("password"),v=m("currentPassword"),[h,{loading:b}]=function(e){const n={...Tn,...e};return t(ya,n)}(),[E]=function(e){const n={...Tn,...e};return t(wa,n)}(),x=()=>{n(!1),setTimeout((()=>d()),300)};return f.createElement(f.Fragment,null,f.createElement(Xl,{onSubmit:c((({password:e,currentPassword:t})=>{h({variables:{input:{password:e,currentPassword:t}}}).then((()=>{U.success("Saved changes!"),d()}))})),open:e,close:x,closeOnOverlayClick:!0,buttons:f.createElement(f.Fragment,null,f.createElement("button",{onClick:()=>(localStorage.removeItem("token"),void location.reload()),className:"form-button-delete"},"Log Out",f.createElement(jt,{className:"ml-2 w-5 h-5"})),f.createElement("button",{onClick:()=>x(),className:"form-button-submit"},"Done",f.createElement(te,{className:"ml-2 w-5 h-5"})))},f.createElement(Qi,{deleteOpen:a,setDeleteOpen:l}),f.createElement("div",{className:"px-5 pt-5 pb-10"},f.createElement("div",{className:"flex items-center font-semibold text-primary"},f.createElement(Ms,{user:r,size:6,className:"rounded-md mr-2"}),"User Settings  –  ",f.createElement("div",{className:"truncate"},r.username),f.createElement(ne,{className:"h-5 w-5 highlightable ml-auto",onClick:()=>x()})),f.createElement("div",{className:"py-5 flex items-center"},f.createElement(Ms,{user:r,size:20}),f.createElement("input",{type:"file",accept:"image/png,image/jpeg,image/webp,image/gif",name:"avatarFile",id:"avatarFile",hidden:!0,onChange:e=>{const t=e.target.files[0];t&&E({variables:{input:{avatarFile:t}}})}}),f.createElement("label",{htmlFor:"avatarFile",className:"h-9 transition hover:bg-gray-200 cursor-pointer flex items-center justify-center text-sm font-medium border rounded dark:border-gray-600 px-3 bg-gray-300 text-gray-800 ml-3"},f.createElement(rl,{className:"w-5 h-5 mr-2"}),"Upload Avatar")),f.createElement("div",{className:"border dark:border-gray-750 rounded space-y-3 p-3"},f.createElement("div",{className:"text-xs font-medium text-tertiary"},"Change Password"),f.createElement("div",null,f.createElement("div",{className:"relative"},f.createElement("input",{className:"form-input-password",placeholder:"New Password",id:"password",...i("password",{minLength:6,required:!0}),type:s?"text":"password",minLength:6}),f.createElement(as,{setShowPassword:o,showPassword:s})),!!p&&u.password&&f.createElement("div",{className:"form-error"},"Password must be at least 6 characters")),f.createElement("div",null,f.createElement("div",{className:"relative"},f.createElement("input",{className:"form-input-password",placeholder:"Current Password",id:"currentPassword",...i("currentPassword",{required:!0}),type:s?"text":"password"}),f.createElement(as,{setShowPassword:o,showPassword:s}))),f.createElement("button",{disabled:b||!v||!p||(null==p?void 0:p.length)<6,className:"form-button-submit ml-auto"},"Change Password",b&&f.createElement(tl,{className:"w-5 h-5 ml-2"}))),f.createElement("div",{className:"mt-3"},f.createElement("button",{type:"button",onClick:()=>l(!0),className:"form-button-delete"},"Delete Account",f.createElement(Gt,{className:"ml-2 w-5 h-5"}))))))}function Qi({deleteOpen:e,setDeleteOpen:n}){const[r,a]=g.exports.useState(""),[l,{loading:s}]=function(e){const n={...Tn,...e};return t(Na,n)}();return f.createElement(Kl,{isOpen:e,close:()=>n(!1)},f.createElement("div",{className:"max-w-md w-full rounded-md dark:bg-gray-800 shadow-lg p-4"},f.createElement("div",{className:"text-red-400 text-2xl font-semibold"},"Delete Account"),f.createElement("div",{className:"text-secondary pb-5 pt-3 text-base"},"You will not be able to recover your account."),f.createElement("div",{className:"text-left"},f.createElement("label",{htmlFor:"confirmPassword",className:"label"},"Password"),f.createElement("input",{id:"confirmPassword",name:"confirmPassword",className:"textbox",value:r,onChange:e=>a(e.target.value),type:"password"})),f.createElement("div",{className:"flex items-center justify-end space-x-4 pt-4"},f.createElement("button",{className:"form-button-cancel",type:"button",onClick:()=>n(!1)},"Cancel"),f.createElement("button",{className:"form-button-delete",type:"button",disabled:!r||s,onClick:()=>{l({variables:{input:{password:r}}}).then((()=>{localStorage.removeItem("token"),location.reload()}))}},"Delete Account",s&&f.createElement(tl,{className:"w-5 h-5 text-primary ml-3"})))))}function Ji(){const[e]=Ya(),n=[0,14],[r,a]=g.exports.useState(!1),[l,s]=Ja((e=>[e.updateAvailable,e.setUpdateAvailable]));g.exports.useEffect((()=>{window.electron&&window.electron.on("updateAvailable",(()=>{s(!0)}))}),[]);const[o]=function(e){const n={...Tn,...e};return t(Ca,n)}();g.exports.useEffect((()=>{if(e){const e=setInterval((()=>{o({variables:{input:{onlineStatus:Yn.Online}}})}),15e3);return()=>clearInterval(e)}}),[e]),(()=>{const e=Qa()})(),Qa();const[i,c,m,d]=xs();return f.createElement(f.Fragment,null,!!e&&f.createElement(Zi,{open:r,setOpen:a}),f.createElement("div",{className:"flex items-center shadow-md px-3 bottom-0 h-5.5 bg-gray-700 z-50"},e?f.createElement(f.Fragment,null,f.createElement(Ms,{size:4.5,className:"mr-2",user:e}),f.createElement("div",{className:"text-primary text-13 font-medium cursor-pointer"},e.username),f.createElement("div",{className:"w-2 h-2 rounded-full bg-green-500 ml-2"})):f.createElement("div",{className:"flex items-center text-primary text-13 font-medium"},f.createElement("div",{className:"cursor-pointer hover:underline",onClick:()=>{d(!1),c(!0)}},"Log In"),"  ·  ",f.createElement("div",{className:"cursor-pointer hover:underline",onClick:()=>{d(!0),c(!0)}},"Create account")),f.createElement("div",{className:"ml-auto flex items-center space-x-4 text-primary"},f.createElement(x,{content:""+(window.electron&&l?"Update available":"Up to date!")},f.createElement("div",{className:"flex items-center "+(window.electron&&l?"cursor-pointer":""),onClick:()=>{window.electron&&l&&window.electron.restart()}},f.createElement("div",{className:"text-xs font-medium "+(l&&window.electron?"text-green-500":"text-tertiary")},"Comet v","0.0.94"),window.electron&&l&&f.createElement("div",{className:"pl-2"},f.createElement(Vt,{className:"w-4.5 h-4.5 text-green-500 cursor-pointer"})))),!!e&&f.createElement(f.Fragment,null,f.createElement(x,{content:"Notifications",offset:n},f.createElement(b,{to:"/inbox"},f.createElement(Yt,{className:"w-4.5 h-4.5 cursor-pointer"}))),f.createElement(x,{content:"Settings",offset:n},f.createElement("div",{onClick:()=>a(!0)},f.createElement(Wt,{className:"w-4.5 h-4.5 cursor-pointer"})))))))}const Ki=e=>w(`\n  h-1.5\n  w-1.5\n  rounded-full\n  dark:bg-gray-100\n  mr-2\n  ${e?"opacity-100":"opacity-0"}\n`),Xi=e=>w(`\n  flex\n  items-center\n  cursor-pointer\n  ${e?"text-primary":"text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}\n`);function ec({open:e,setOpen:n,server:r,channel:a}){var l;const{handleSubmit:s,register:o,setValue:i,watch:c,reset:m}=re({mode:"onChange"}),d=c("name");g.exports.useEffect((()=>{d&&i("name",d.toLowerCase().replace(" ","-").replace(/[^a-z0-9-_]+/,""))}),[d]);const[u,p]=g.exports.useState(null!=(l=null==a?void 0:a.type)?l:Ln.Public),{push:v}=S(),[h,{loading:b}]=function(e){const n={...Tn,...e};return t($r,n)}({update(e,{data:{createChannel:t}}){e.writeQuery({query:La,variables:{name:r.name},data:{server:{...r,channels:[...r.channels,t]}}})}}),[E,{loading:y}]=function(e){const n={...Tn,...e};return t(Ur,n)}(),w=()=>{n(!1)};g.exports.useEffect((()=>{a?(i("name",a.name),i("description",a.description||""),p(a.type)):(m(),p(Ln.Public))}),[a]);const N=!a&&!!d&&r.channels.map((e=>e.name)).includes(d);return f.createElement(Xl,{onSubmit:s((({name:e,description:t})=>{a?E({variables:{input:{description:t,channelId:a.id,type:u}}}).then((()=>{w()})):h({variables:{input:{name:e,description:t,serverId:r.id,type:u}}}).then((({data:{createChannel:e}})=>{w(),v(`/+${r.name}/#${e.name}`),m(),p(Ln.Public)}))})),open:e,close:w,closeOnOverlayClick:!0,buttons:f.createElement("button",{type:"submit",className:"form-button-submit",disabled:!a&&!d||N||b||y},b||y?f.createElement(tl,{className:"w-5 h-5"}):f.createElement(te,{className:"w-5 h-5"}))},f.createElement("div",{className:"p-5 space-y-4 w-full text-left"},f.createElement("div",{className:"flex items-center font-semibold text-primary"},f.createElement(ll,{server:r,size:6,className:"rounded-md mr-2"}),f.createElement("div",{className:"truncate"},r.displayName),"  ·  ",a?"Edit":"Create"," Channel",f.createElement(ne,{className:"h-5 w-5 highlightable ml-auto",onClick:()=>w()})),f.createElement("div",null,f.createElement("div",{className:"relative"},f.createElement("input",{...o("name",{required:!0,maxLength:100}),maxLength:100,className:"form-input-icon",spellCheck:!1,autoCapitalize:"none",id:"name",placeholder:"Channel name",disabled:!!a}),f.createElement(nl,{className:"form-input-icon-icon"})),N&&f.createElement("div",{className:"form-error"},"Channel already exists")),f.createElement("textarea",{placeholder:"Description",...o("description"),className:"form-textarea"}),f.createElement("div",{className:"flex items-center space-x-4 text-sm text-tertiary"},f.createElement(x,{content:"Anyone can view and send messages"},f.createElement("div",{onClick:()=>p(Ln.Public),className:Xi(u===Ln.Public)},f.createElement("div",{className:Ki(u===Ln.Public)}),"Public")),f.createElement(x,{content:"Anyone can view, but only members with permission can send messages"},f.createElement("div",{onClick:()=>p(Ln.Restricted),className:Xi(u===Ln.Restricted)},f.createElement("div",{className:Ki(u===Ln.Restricted)}),"Restricted")),f.createElement(x,{content:"Only members with permission can view and send messages"},f.createElement("div",{onClick:()=>p(Ln.Private),className:Xi(u===Ln.Private)},f.createElement("div",{className:Ki(u===Ln.Private)}),"Private")))))}function tc({channel:e,server:t}){const{t:n}=C(),[r]=Il({server:t,permissions:[or.ManageChannels]}),{hash:a}=I(),l=`/+${null==t?void 0:t.name}/#${e.name}`,s=a.substring(1)===e.name,[o,i]=g.exports.useState(!1),[c,m]=g.exports.useState(!1);return f.createElement(f.Fragment,null,f.createElement(ec,{open:c,setOpen:m,channel:e,server:t}),f.createElement(Vl,{data:{type:Sl,channel:e,server:t,openDelete:()=>i(!0),openEdit:()=>m(!0)}},f.createElement(hs,{to:l,active:s},e.isUnread&&!s&&f.createElement("div",{className:"absolute -left-1.5 top-1/2 transform -translate-y-1/2 rounded-r-full dark:bg-gray-100 h-2 w-1"}),f.createElement(nl,{className:"w-5 h-5 mr-3 text-tertiary"}),f.createElement("span",{className:""+(e.isUnread?"text-primary":"")},e.name),f.createElement("div",{className:"ml-auto"}),!!e.mentionCount&&f.createElement("div",{className:r?"group-hover:hidden block":""},f.createElement(ls,{count:e.mentionCount})),r&&f.createElement(x,{content:n("channel.edit")},f.createElement("div",{className:"group-hover:block hidden",onClick:e=>{e.stopPropagation(),e.preventDefault(),m(!0)}},f.createElement(Wt,{className:"w-4 h-4 text-tertiary"}))))),f.createElement(nc,{open:o,setOpen:i,channel:e,server:t}))}function nc({server:e,channel:n,open:r,setOpen:a}){const[l,{loading:s}]=function(e){const n={...Tn,...e};return t(Sr,n)}(),{push:o}=S(),{pathname:i,hash:c}=I();return f.createElement(Xl,{closeOnOverlayClick:!0,small:!0,open:r,close:()=>a(!1),buttons:f.createElement(f.Fragment,null,f.createElement("button",{className:"form-button-cancel",onClick:()=>a(!1),type:"button"},"Cancel"),f.createElement("button",{className:"form-button-delete",disabled:s,onClick:()=>{l({variables:{input:{channelId:n.id}},update(t,{data:{deleteChannel:n}}){t.writeQuery({query:La,variables:{name:e.name},data:{server:{...e,channels:e.channels.filter((e=>e.id!==n))}}})}}).then((()=>{a(!1),i===`/+${e.name}/`&&c===`#${n.name}`&&o(`/+${e.name}`)}))},type:"button"},s?f.createElement(tl,null):"Delete"))},f.createElement("div",{className:"px-4 pt-4 pb-10"},f.createElement("div",{className:"text-lg font-medium text-secondary"},"Delete ",f.createElement("span",{className:"text-primary"},"#",n.name),"?"),f.createElement("div",{className:"text-tertiary pt-3 text-sm"},"Messages in this channel will be lost.")))}function rc({server:e}){const{t:t}=C(),[n,r]=g.exports.useState(!1),[a]=Il({server:e,permissions:[or.ManageChannels]});return a?f.createElement(f.Fragment,null,f.createElement(bs,{onClick:()=>r(!0),plusLabel:t("channel.create")},"Channels"),f.createElement(ec,{open:n,setOpen:r,server:e})):f.createElement(bs,null,"Channels")}function ac({open:e,setOpen:n,server:r}){var a;const{t:l}=C(),[s,o]=g.exports.useState(null==(a=r.roles.find((e=>e.isDefault)))?void 0:a.id),i=r.roles.find((e=>e.id===s)),[c,m]=g.exports.useState(i.color),[d,u]=g.exports.useState(i.name),[p,v]=g.exports.useState(i.permissions);g.exports.useEffect((()=>{v(i.permissions),u(i.name),m(i.color)}),[i]);const[h]=function(e){const n={...Tn,...e};return t(ia,n)}({update(e,{data:{deleteRole:t}}){e.writeQuery({query:La,variables:{name:r.name},data:{server:{...r,roles:r.roles.filter((e=>e.id!==t))}}})}}),[b,{loading:E}]=function(e){const n={...Tn,...e};return t(oa,n)}(),y=!((e,t)=>{if(e.length!==t.length)return!1;for(const n of e)if(!t.includes(n))return!1;for(const n of t)if(!e.includes(n))return!1;return!0})(p,i.permissions)||d!==i.name||c!==i.color,w=[or.SendMessages,or.RestrictedChannels,or.PrivateChannels,or.ManageChannels,or.ManageServer,or.ManagePosts,or.ManageComments,or.DisplayRoleSeparately,or.Admin],[N,k]=g.exports.useState(!1),[$,U]=g.exports.useState(""),[S,{loading:I}]=function(e){const n={...Tn,...e};return t(sa,n)}({update(e,{data:{createRole:t}}){e.writeQuery({query:La,variables:{name:r.name},data:{server:{...r,roles:[t,...r.roles]}}})}}),P=()=>{$?S({variables:{input:{serverId:r.id,name:$}}}).then((e=>{U(""),k(!1),o(e.data.createRole.id)})):k(!1)};return f.createElement(Xl,{open:e,close:()=>{n(!1)},closeOnOverlayClick:!0,large:!0},f.createElement("div",{className:"flex"},f.createElement("div",{className:"h-[40rem] max-h-screen w-60 dark:bg-gray-750 rounded-l-lg space-y-0.5 overflow-y-auto scrollbar-custom p-1.5"},N?f.createElement("div",{className:"relative py-1 px-1.5"},f.createElement("input",{className:"form-input-password",placeholder:"Name",autoFocus:!0,value:$,onChange:e=>U(e.target.value),onKeyDown:e=>{"Enter"===e.code&&d&&P()},type:"text",maxLength:100}),I?f.createElement(tl,{className:"form-show-password-button"}):f.createElement(te,{onClick:P,className:"form-show-password-button"})):f.createElement(hs,{light:!0,onClick:()=>k(!0)},"Add Role",f.createElement(ue,{className:"w-5 h-5 ml-auto"})),null==r?void 0:r.roles.map((e=>f.createElement(hs,{key:e.id,light:!0,active:s===e.id,onClick:()=>o(e.id)},f.createElement("span",{style:{color:e.color}},e.name),!e.isDefault&&f.createElement(x,{content:"Delete Role"},f.createElement("div",{onClick:()=>{h({variables:{input:{roleId:e.id}}}),s===e.id&&o(r.roles.find((e=>e.isDefault)))},className:"group-hover:visible invisible ml-auto highlightable"},f.createElement(Gt,{className:"w-4 h-4"}))))))),f.createElement("div",{className:"relative py-5 px-7 w-full h-[40rem] overflow-y-auto max-h-screen scrollbar-thin dark:scrollbar-thumb-gray-850 scrollbar-track-transparent scrollbar-thumb-rounded-md rounded-tr-lg"},f.createElement("div",{className:"flex items-center justify-between pb-5"},f.createElement("div",{className:"text-primary text-base font-semibold"},"Edit Role - ",i.name,!!(null==i?void 0:i.isDefault)&&" (Default)")),f.createElement("div",{className:"mb-6"},f.createElement("label",{className:"label"},"Name"),f.createElement("input",{className:"form-input",placeholder:"Name",value:d,onChange:e=>u(e.target.value),id:"name"})),f.createElement("div",{className:"label"},"Color"),f.createElement("div",{className:"grid grid-cols-4 gap-2 mb-10 w-60"},Object.keys(Is).map((e=>f.createElement("div",{key:e,className:"h-6 rounded relative cursor-pointer",style:{backgroundColor:Is[e][500]},onClick:()=>{c===Is[e][500]?m(null):m(Is[e][500])}},c===Is[e][500]&&f.createElement("div",{className:"inset-0 absolute flex items-center justify-center"},f.createElement(te,{className:"w-4 h-4 text-white"})))))),f.createElement("div",{className:"label"},"Permissions"),f.createElement("div",{className:"space-y-0.5 divide-y divide-gray-700"},w.map((e=>f.createElement("div",{key:e,className:"flex w-full py-4 text-base cursor-pointer "+(p.includes(or.Admin)&&e!==or.Admin?"opacity-50":""),onClick:()=>{p.includes(or.Admin)&&e!==or.Admin||(p.includes(e)?v(p.filter((t=>t!==e))):v([...p,e]))}},f.createElement("div",null,f.createElement("div",{className:"font-medium"},l(`permissions.server.${e}.title`)),!!l(`permissions.server.${e}.description`)&&f.createElement("div",{className:"text-13 text-tertiary pt-1"},l(`permissions.server.${e}.description`))),f.createElement("div",{className:"pl-6 ml-auto"},f.createElement(es,{disabled:p.includes(or.Admin)&&e!==or.Admin,green:!0,checked:p.includes(e),onChange:()=>{p.includes(e)?v(p.filter((t=>t!==e))):v([...p,e])}})))))),f.createElement("div",{className:"h-16"}),f.createElement(me,null,!!y&&f.createElement(de.div,{initial:{y:"500px"},animate:{y:0},exit:{y:"500px"},transition:{ease:[.4,0,.2,1],duration:.15},className:"sticky z-50 flex items-center rounded-lg shadow-lg bottom-0 w-full dark:bg-gray-725 pr-3 pl-6 h-14 transform transition "},f.createElement("div",{className:"text-secondary text-sm"},"Changes not saved"),f.createElement("div",{className:"flex items-center space-x-3 ml-auto"},f.createElement("button",{type:"button",className:"form-button-cancel",onClick:()=>{u(i.name),m(i.color),v(i.permissions)}},"Discard"),f.createElement("button",{type:"button",disabled:!d||!y||E,className:"form-button-submit",onClick:()=>b({variables:{input:{roleId:s,name:d,color:c,permissions:p}}})},"Save",E&&f.createElement(tl,{className:"w-5 h-5 text-primary ml-3"}))))))))}function lc(){const{server:e}=Mi(),[n]=Ya(),[r,a]=g.exports.useState(!1),[l,s]=g.exports.useState(!1),[o,i]=Il({server:e,permissions:[or.ManageServer,or.PrivateChannels]}),[c,{loading:m}]=function(e){const n={...Tn,...e};return t(pa,n)}(),[d,{loading:u}]=va(),p=Wl(null==e?void 0:e.category);return e?f.createElement(f.Fragment,null,f.createElement(ns,{open:r,setOpen:a,server:e}),f.createElement(ac,{open:l,setOpen:s,server:e,key:e.id}),f.createElement(us,null,e.bannerUrl?f.createElement("div",{className:"h-20 relative bg-center bg-cover bg-no-repeat "+(e.bannerUrl?"":"bg-gradient-to-br from-red-400 to-indigo-600"),style:e.bannerUrl?{backgroundImage:`url(${e.bannerUrl})`}:{}}):f.createElement("div",{className:"h-12 border-b dark:border-gray-850 shadow flex items-center px-5 text-base font-medium"},f.createElement(_o,{className:"h-4"})),f.createElement("div",{className:"px-1.5 pt-4"},f.createElement("div",{className:"shadow-inner dark:bg-gray-850 p-2.5 space-y-2.5 rounded"},f.createElement("div",{className:"flex items-center"},f.createElement(ll,{server:e,size:6,className:"rounded-md mr-2 dark:bg-gray-750"}),f.createElement("div",{className:"font-semibold text-primary pr-2.5 truncate"},e.displayName),!!n&&n.id!==e.owner.id&&f.createElement("button",{className:(v=e.isJoined,h=m||u,w(`\n  ml-auto\n  px-3\n  h-6\n  rounded\n  text-13\n  font-medium\n  focus:outline-none\n  ${v?"border border-gray-700 text-blue-500":"bg-blue-500 text-primary"}\n  ${h?"opacity-50":"opacity-100"}\n`)),type:"button",onClick:()=>{m||u||(e.isJoined?d({variables:{input:{serverId:e.id}}}):c({variables:{input:{serverId:e.id}}}))}},e.isJoined?"Leave":"Join")),f.createElement("div",{className:"text-13 text-secondary pb-1.5"},e.description||"No description"),f.createElement("div",{className:"flex items-center justify-between"},f.createElement("div",{className:"text-xs font-medium flex items-center text-tertiary"},f.createElement(ge,{className:"w-4 h-4 mr-2.5"}),e.userCount," Member",1===e.userCount?"":"s"),f.createElement("div",{className:"text-xs font-medium flex items-center text-tertiary"},f.createElement(p,{className:"w-4 h-4 mr-2.5"}),e.category))),f.createElement(bs,{plusLabel:"Create Post"},"Posts"),f.createElement(Vi,null),f.createElement(rc,{server:e}),f.createElement("div",{className:"space-y-0.5"},e.channels.filter((e=>e.type!==Ln.Private||i)).map((t=>f.createElement(tc,{key:t.id,channel:t,server:e})))),o&&f.createElement(f.Fragment,null,f.createElement(bs,null,"Admin"),f.createElement("div",{className:"space-y-0.5"},f.createElement(hs,{onClick:()=>a(!0)},f.createElement(Wt,{className:"mr-3 w-5 h-5"}),"Edit Planet"),f.createElement(hs,{onClick:()=>s(!0)},f.createElement(Zt,{className:"mr-3 w-5 h-5"}),"Manage Roles")))))):null;var v,h}function sc({channel:e}){var t;return f.createElement(ws,{showDivider:!!(null==e?void 0:e.description),icon:f.createElement(nl,{className:"w-5 h-5"}),title:`${null!=(t=null==e?void 0:e.name)?t:""}`},(null==e?void 0:e.description)&&f.createElement("div",{className:"text-13 text-tertiary font-medium leading-5 truncate"},null==e?void 0:e.description),f.createElement("div",{className:"ml-auto pl-6 flex items-center space-x-5"},f.createElement(ks,null)))}function oc({channelName:e}){var t;const{server:n,users:r}=Mi(),a=(null!=(t=null==n?void 0:n.channels)?t:[]).find((t=>t.name===e));return Ui(a?`/#${e}`:null),f.createElement(oo,{header:f.createElement(sc,{channel:a}),rightSidebar:f.createElement(Ii,{channel:a,serverUsers:r,server:n})},f.createElement(pt,null,f.createElement("title",null,a&&n?`#${null==a?void 0:a.name} – ${null==n?void 0:n.displayName}`:null)),!!a&&f.createElement(Ci,{server:n,channel:a,users:r.map((e=>e.user))}))}const ic=()=>{var e,t,n,a;const[l]=Ya(),{push:s}=S(),{pathname:o,hash:i}=I(),c=P(o,{path:"/:server"}),m=null==(e=null==c?void 0:c.params)?void 0:e.server.substring(1),d=m&&i?i.substring(1):null,u=P(o,{path:"/dm/:username"}),p=null==(n=null==(t=null==u?void 0:u.params)?void 0:t.username)?void 0:n.substring(1),v=P(o,{path:"/group/:groupId"}),h=null==(a=null==v?void 0:v.params)?void 0:a.groupId,[f,b]=g.exports.useState(!0);g.exports.useEffect((()=>{window.electron&&(window.electron.on("windowOpened",(()=>b(!0))),window.electron.on("windowClosed",(()=>b(!1))))}),[]),function(e){const t={...Tn,...e};r(Ha,t)}({skip:!l,onSubscriptionData({client:e,subscriptionData:t}){var n,r,a,o,i,c,u,g;if(t.data){const v=t.data.messageChanged,b=null==v?void 0:v.added,E=null==v?void 0:v.deleted;let x;if(null==v||v.updated,b){x=b;const t=null==(n=x.channel)?void 0:n.id,c=null==(r=x.group)?void 0:r.id,u=x.toUser?null==(a=x.author)?void 0:a.id:void 0,g={query:Pa,variables:{userId:u,groupId:c,channelId:t,cursor:null}},v=e.cache.readQuery(g);v&&!v.messages.messages.map((e=>e.id)).includes(x.id)&&e.cache.writeQuery({...g,data:{messages:{...v.messages,messages:[...v.messages.messages,x]}}});const E=p&&x.toUser&&p===x.toUser.username,y=h&&x.group&&h===x.group.id,w=d&&x.channel&&x.channel.server.name===m&&d===x.channel.name;if(x.toUser&&!E){const t=e.cache.readFragment({fragment:vr,id:`User:${x.author.id}`});t&&e.cache.writeFragment({fragment:vr,id:`User:${x.author.id}`,data:{...t,unreadCount:t.unreadCount+1}})}else if(x.group&&!y){const t=e.cache.readFragment({fragment:hr,id:`User:${x.group.id}`});t&&e.cache.writeFragment({fragment:hr,id:`Group:${x.group.id}`,data:{...t,unreadCount:t.unreadCount+1}})}else if(x.channel&&!w){const t=e.cache.readFragment({fragment:dr,id:`Channel:${x.channel.id}`});if(t){console.log(t);const n={...t,isUnread:!0};(x.isEveryoneMentioned||l&&x.mentionedUsers.map((e=>e.id)).includes(l.id))&&(n.mentionCount=t.mentionCount+1),e.cache.writeFragment({fragment:dr,id:`Channel:${x.channel.id}`,data:n})}}if(x.author.id!==l.id){if((!window.electron||window.electron&&f)&&(y||E||w))return;if(x.type===Gn.Normal&&x.text&&(x.toUser||x.group||x.isEveryoneMentioned||l&&x.mentionedUsers.map((e=>e.id)).includes(l.id))){let e=`@${x.author.username}`;x.channel&&(e+=` · #${x.channel.name}`),x.group&&(e+=` · #${x.group.displayName}`),To({title:e,body:cc(x.text),icon:null!=(o=x.author.avatarUrl)?o:(window.electron?".":"")+"/icons/icon.png",timestamp:x.createdAt,onClick:()=>{u?s(`/dm/@${x.author.username}`):c?s(`/group/${c}`):t&&s(`/+${x.server.name}/#${x.channel.name}`),window.electron&&window.electron.show()}})}else x.type===Gn.FriendRequestReceived&&To({title:`@${x.author.username}`,body:"Sent a friend request",icon:null!=(i=x.author.avatarUrl)?i:(window.electron?".":"")+"/icons/icon.png",timestamp:x.createdAt,onClick:()=>{s("/friends"),window.electron&&window.electron.show()}})}}else if(E){x=E;const t=null==(c=x.channel)?void 0:c.id,n=null==(u=x.group)?void 0:u.id,r=x.toUser?null==(g=x.author)?void 0:g.id:void 0,a={query:Pa,variables:{userId:r,groupId:n,channelId:t,cursor:null}},l=e.cache.readQuery(a);l&&l.messages.messages.map((e=>e.id)).includes(x.id)&&e.cache.writeQuery({...a,data:{messages:{...l.messages,messages:l.messages.messages.filter((e=>e.id!==x.id))}}})}}}})};function cc(e){let t=document.createElement("DIV");return t.innerHTML=e,t.textContent||t.innerText||""}function mc(){var e,t;ic();const{pathname:n}=I(),r=P(n,{path:"/dm/:username"}),a=null==(t=null==(e=null==r?void 0:r.params)?void 0:e.username)?void 0:t.substring(1);return f.createElement(Qt,null,f.createElement(Jt,{path:"/"},f.createElement(Qt,null,f.createElement(Jt,{path:["/","/inbox","/dm/:username(@[A-Za-z0-9-_]+)","/:server(\\+[A-Za-z0-9_]+)","/:server(\\+[A-Za-z0-9_]+)/post/:postId","/:server(\\+[A-Za-z0-9_]+)/post/:postId/:slug","/explore"],exact:!0},f.createElement("div",{className:"flex-grow"},f.createElement("div",{className:"flex items-stretch",style:{height:"calc(100% - 1.375rem)"}},f.createElement(ss,{hide:!0}),f.createElement(Jt,{path:"/explore"},f.createElement(Zo,null)),f.createElement(Jt,{path:"/:server(\\+[A-Za-z0-9_]+)"},f.createElement(dc,null)),f.createElement(Jt,{exact:!0,path:["/","/inbox","/dm/:username(@[A-Za-z0-9-_]+)"]},f.createElement(Yi,null),f.createElement(Jt,{path:"/",exact:!0},f.createElement(Ho,null)),f.createElement(Jt,{path:"/inbox"},f.createElement(ri,null)),f.createElement(Jt,{path:"/dm/:username(@[A-Za-z0-9-_]+)"},f.createElement($i,{username:a})))),f.createElement(Ji,null))),f.createElement(Jt,null,f.createElement(Za,null)))))}function dc(){const{server:e}=qt(),t=e.substring(1);return f.createElement(Fi,{name:t},f.createElement(uc,null))}function uc(){var e;const{server:t,loading:n}=Mi(),{hash:r,pathname:a}=I(),l=r.substring(1),s=P(a,{path:"/:server/post/:postId"}),o=null==(e=null==s?void 0:s.params)?void 0:e.postId;return t||n?f.createElement(f.Fragment,null,f.createElement(lc,null),f.createElement(Jt,{path:"/:server(\\+[A-Za-z0-9_]+)",exact:!0,render:({location:e})=>e.hash?f.createElement(oc,{channelName:l}):f.createElement(Ri,null)}),f.createElement(Jt,{path:["/:server(\\+[A-Za-z0-9_]+)/post/:postId","/:server(\\+[A-Za-z0-9_]+)/post/:postId/:slug"]},f.createElement(ji,{postId:o}))):f.createElement(Za,null)}function pc(){return Kt("(min-width: 1024px)"),f.createElement(Xt,{position:"bottom-center",toastOptions:{className:"toast",success:{className:"toast",iconTheme:{primary:"#059669"}},error:{className:"toast",iconTheme:{primary:"#EF4444"}}}})}function gc({post:e,show:t}){const n=e?e.title.split(" "):[],r=`${n.slice(0,9).join(" ")}${n.length>=9?"...":""}`;return f.createElement("div",null,f.createElement(me,null,t&&f.createElement(de.div,{initial:{scale:.75,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.75,opacity:0},transition:{duration:.15,ease:"easeInOut"},className:"bg-blue-500 bg-opacity-75 truncate w-64 rounded-md shadow-lg text-white text-sm font-medium h-10 px-2 flex items-center"},f.createElement("div",{className:"truncate"},r))))}const vc={position:"fixed",pointerEvents:"none",zIndex:100,left:0,top:0};function hc(e,t,n,r){e||(e={x:0,y:0});let a=n.x-e.x,l=n.y-e.y,{x:s,y:o}=t||{x:r.x-e.x,y:r.y-e.y};const i=`translate(${s+a}px, ${o+l}px)`;return{transform:i,WebkitTransform:i}}var fc=g.exports.memo((function(){const[e,t]=g.exports.useState({x:0,y:0}),[n,r]=g.exports.useState({x:0,y:0}),a=e=>t({x:e.clientX,y:e.clientY}),l=e=>t({x:e.clientX,y:e.clientY});g.exports.useEffect((()=>(window.addEventListener("mousedown",a),window.addEventListener("mouseup",l),()=>{window.removeEventListener("mousedown",a),window.removeEventListener("mouseup",l)})));const{itemType:s,isDragging:o,item:i,initialOffset:c,currentOffset:m}=en((e=>({item:e.getItem(),itemType:e.getItemType(),initialOffset:e.getInitialSourceClientOffset(),currentOffset:e.getSourceClientOffset(),isDragging:e.isDragging()})));return f.createElement("div",{style:vc},f.createElement("div",{style:hc(c,m,e,n)},s===ps&&f.createElement(gc,{post:i,show:o})))}));const bc="_window-button_19ru1_11",Ec="_window-button-icon_19ru1_18";function xc(){const{close:e,minimize:t,maximize:n,unmaximize:r,isMaximized:a}=window.electron,[l,s]=g.exports.useState(a()),o=()=>s(a());return f.createElement("header",{className:"_titlebar_19ru1_1"},f.createElement(_o,{className:"h-3 text-tertiary"}),f.createElement("div",{className:"_window-controls_19ru1_6"},f.createElement("div",{className:`${bc} flex`,onClick:()=>{t(),o()}},f.createElement("img",{className:`${Ec} hidden dark:block`,srcSet:"./icons/titlebar/min-w-10.png 1x, ./icons/titlebar/min-w-12.png 1.25x, ./icons/titlebar/min-w-15.png 1.5x, ./icons/titlebar/min-w-15.png 1.75x, ./icons/titlebar/min-w-20.png 2x, ./icons/titlebar/min-w-20.png 2.25x, ./icons/titlebar/min-w-24.png 2.5x, ./icons/titlebar/min-w-30.png 3x, ./icons/titlebar/min-w-30.png 3.5x",draggable:"false"}),f.createElement("img",{className:`${Ec} block dark:hidden`,srcSet:"./icons/titlebar/min-k-10.png 1x, ./icons/titlebar/min-k-12.png 1.25x, ./icons/titlebar/min-k-15.png 1.5x, ./icons/titlebar/min-k-15.png 1.75x, ./icons/titlebar/min-k-20.png 2x, ./icons/titlebar/min-k-20.png 2.25x, ./icons/titlebar/min-k-24.png 2.5x, ./icons/titlebar/min-k-30.png 3x, ./icons/titlebar/min-k-30.png 3.5x",draggable:"false"})),f.createElement("div",{className:`${bc} ${l?"hidden":"flex"}`,onClick:()=>{n(),o()}},f.createElement("img",{className:`${Ec} hidden dark:block`,srcSet:"./icons/titlebar/max-w-10.png 1x, ./icons/titlebar/max-w-12.png 1.25x, ./icons/titlebar/max-w-15.png 1.5x, ./icons/titlebar/max-w-15.png 1.75x, ./icons/titlebar/max-w-20.png 2x, ./icons/titlebar/max-w-20.png 2.25x, ./icons/titlebar/max-w-24.png 2.5x, ./icons/titlebar/max-w-30.png 3x, ./icons/titlebar/max-w-30.png 3.5x",draggable:"false"}),f.createElement("img",{className:`${Ec} block dark:hidden`,srcSet:"./icons/titlebar/max-k-10.png 1x, ./icons/titlebar/max-k-12.png 1.25x, ./icons/titlebar/max-k-15.png 1.5x, ./icons/titlebar/max-k-15.png 1.75x, ./icons/titlebar/max-k-20.png 2x, ./icons/titlebar/max-k-20.png 2.25x, ./icons/titlebar/max-k-24.png 2.5x, ./icons/titlebar/max-k-30.png 3x, ./icons/titlebar/max-k-30.png 3.5x",draggable:"false"})),f.createElement("div",{className:`${bc} ${l?"flex":"hidden"}`,onClick:()=>{r(),o()}},f.createElement("img",{className:`${Ec} hidden dark:block`,srcSet:"./icons/titlebar/restore-w-10.png 1x, ./icons/titlebar/restore-w-12.png 1.25x, ./icons/titlebar/restore-w-15.png 1.5x, ./icons/titlebar/restore-w-15.png 1.75x, ./icons/titlebar/restore-w-20.png 2x, ./icons/titlebar/restore-w-20.png 2.25x, ./icons/titlebar/restore-w-24.png 2.5x, ./icons/titlebar/restore-w-30.png 3x, ./icons/titlebar/restore-w-30.png 3.5x",draggable:"false"}),f.createElement("img",{className:`${Ec} block dark:hidden`,srcSet:"./icons/titlebar/restore-k-10.png 1x, ./icons/titlebar/restore-k-12.png 1.25x, ./icons/titlebar/restore-k-15.png 1.5x, ./icons/titlebar/restore-k-15.png 1.75x, ./icons/titlebar/restore-k-20.png 2x, ./icons/titlebar/restore-k-20.png 2.25x, ./icons/titlebar/restore-k-24.png 2.5x, ./icons/titlebar/restore-k-30.png 3x, ./icons/titlebar/restore-k-30.png 3.5x",draggable:"false"})),f.createElement("div",{className:`${bc} _close-button_19ru1_32 flex`,onClick:()=>{e(),o()}},f.createElement("img",{className:`${Ec} hidden dark:block`,srcSet:"./icons/titlebar/close-w-10.png 1x, ./icons/titlebar/close-w-12.png 1.25x, ./icons/titlebar/close-w-15.png 1.5x, ./icons/titlebar/close-w-15.png 1.75x, ./icons/titlebar/close-w-20.png 2x, ./icons/titlebar/close-w-20.png 2.25x, ./icons/titlebar/close-w-24.png 2.5x, ./icons/titlebar/close-w-30.png 3x, ./icons/titlebar/close-w-30.png 3.5x",draggable:"false"}),f.createElement("img",{className:`${Ec} block dark:hidden`,srcSet:"./icons/titlebar/close-k-10.png 1x, ./icons/titlebar/close-k-12.png 1.25x, ./icons/titlebar/close-k-15.png 1.5x, ./icons/titlebar/close-k-15.png 1.75x, ./icons/titlebar/close-k-20.png 2x, ./icons/titlebar/close-k-20.png 2.25x, ./icons/titlebar/close-k-24.png 2.5x, ./icons/titlebar/close-k-30.png 3x, ./icons/titlebar/close-k-30.png 3.5x",draggable:"false"}))))}const{hasOwnProperty:yc}=Object.prototype;const wc=(e,t)=>{let n;try{n=JSON.stringify(e)}catch(r){const e=new nn(`Network request failed. ${t} is not serializable: ${r.message}`);throw e.parseError=r,e}return n};function Nc(e,t,n){e.append(t,n,n.name)}const kc=(e={})=>{let{uri:t="/graphql",fetch:n,includeExtensions:r,useGETForQueries:a,isExtractableFile:l=sn,formDataAppendFile:s=Nc,...i}=e;on(n),n||(n=fetch);const c={http:{includeExtensions:r},options:i.fetchOptions,credentials:i.credentials,headers:i.headers};return new o((e=>{let r=rn(e,t);const o=e.getContext(),i={};if(o.clientAwareness){const{name:e,version:t}=o.clientAwareness;e&&(i["apollographql-client-name"]=e),t&&(i["apollographql-client-version"]=t)}const m={...i,...o.headers},u={http:o.http,options:o.fetchOptions,credentials:o.credentials,headers:m},{options:g,body:v}=((e,t,...n)=>{let r={...t.options,headers:t.headers,credentials:t.credentials},a=t.http||{};n.forEach((e=>{r={...r,...e.options,headers:{...r.headers,...e.headers}},e.credentials&&(r.credentials=e.credentials),a={...a,...e.http}}));const{operationName:l,extensions:s,variables:o,query:i}=e,c={operationName:l,variables:o};return a.includeExtensions&&(c.extensions=s),a.includeQuery&&(c.query=p(i)),{options:r,body:c}})(e,cn,c,u),{clone:h,files:f}=an(v,"",l),b=wc(h,"Payload");let E;if(!g.signal){const{controller:e,signal:t}=(()=>{if("undefined"==typeof AbortController)return{controller:!1,signal:!1};const e=new AbortController;return{controller:e,signal:e.signal}})();E=e,E&&(g.signal=t)}if(a&&!e.query.definitions.some((e=>"OperationDefinition"===e.kind&&"mutation"===e.operation))&&(g.method="GET"),"GET"===g.method){const{newURI:e,parseError:t}=function(e,n){const r=[],a=(e,t)=>{r.push(`${e}=${encodeURIComponent(t)}`)};if("query"in n&&a("query",n.query),n.operationName&&a("operationName",n.operationName),n.variables){let e;try{e=wc(n.variables,"Variables map")}catch(t){return{parseError:t}}a("variables",e)}if(n.extensions){let e;try{e=wc(n.extensions,"Extensions map")}catch(t){return{parseError:t}}a("extensions",e)}let l="",s=e;const o=e.indexOf("#");-1!==o&&(l=e.substr(o),s=e.substr(0,o));const i=-1===s.indexOf("?")?"?":"&";return{newURI:s+i+r.join("&")+l}}(r,v);if(t)return ln(t);r=e}else if(f.size){delete g.headers["content-type"];const e=new FormData;e.append("operations",b);const t={};let n=0;f.forEach((e=>{t[++n]=e})),e.append("map",JSON.stringify(t)),n=0,f.forEach(((t,r)=>{s(e,++n,r)})),g.body=e}else try{g.body=wc(v,"Payload")}catch(x){return ln(x)}return new d((t=>{var a;return n(r,g).then((t=>(e.setContext({response:t}),t))).then((a=e,e=>e.text().then((t=>{try{return JSON.parse(t)}catch(n){const r=n;throw r.name="ServerParseError",r.response=e,r.statusCode=e.status,r.bodyText=t,r}})).then((t=>(e.status>=300&&tn(e,t,`Response not successful: Received status code ${e.status}`),Array.isArray(t)||yc.call(t,"data")||yc.call(t,"errors")||tn(e,t,`Server response was missing for query '${Array.isArray(a)?a.map((e=>e.operationName)):a.operationName}'.`),t))))).then((e=>(t.next(e),t.complete(),e))).catch((e=>{"AbortError"!==e.name&&(e.result&&e.result.errors&&e.result.data&&t.next(e.result),t.error(e))})),()=>{E&&E.abort()}}))}))};const Cc="https://api.joincomet.app/graphql",$c=fn((({graphQLErrors:e,networkError:t})=>{e&&e.forEach((e=>{const{message:t,locations:n,path:r}=e;En(e),console.log(`[GraphQL error]: Message: ${t}, Location: ${n}, Path: ${r}`),"Access denied! You need to be authorized to perform this action!"!==t&&U.error(a.t(t))})),t&&(console.log(`[Network error]: ${t}`),U.error(t.message))})),Uc=new class extends o{constructor(e={}){super(kc(e).request),this.options=e}}({uri:Cc,headers:{token:localStorage.getItem("token")}}),Sc=bn(((e,{headers:t})=>{const n=localStorage.getItem("token");return{headers:n?{...t,token:n}:t}})),Ic=new class extends o{constructor(){super(),this.client=i({url:"wss://api.joincomet.app/graphql",lazy:!1,connectionParams:()=>{const e=localStorage.getItem("token");return e?{token:e}:{}},on:{connected:()=>{ja.status="connected"},error:()=>{ja.status="error"},closed:()=>{ja.status="closed"},connecting:()=>{ja.status="connecting"}}})}wsFetcher(e){return c((t=>this.client.subscribe(e,t)))}request(e){const t=m();return new d((n=>u(t(this.wsFetcher({operationName:e.operationName,query:p(e.query),variables:e.variables})),n)))}},Pc=(new mn).split((({query:e})=>{const t=dn(e);return"OperationDefinition"===t.kind&&("subscription"===t.operation||un(t))}),Ic,Sc.concat(Uc));function Fc(e,t){return e||t}const Mc=new vn({link:gn([new pn.SentryLink({uri:Cc}),$c,Pc]),cache:new hn({typePolicies:{User:{fields:{servers:{merge:!1},folders:{merge:!1},relatedUsers:{merge:!1}}},Server:{fields:{channels:{merge:!1},folders:{merge:!1},owner:{merge:!0},permissions:{merge:!1},roles:{merge:!1}}},Post:{fields:{author:{merge:Fc},serverUser:{merge:Fc},server:{merge:Fc}}},Comment:{fields:{author:{merge:Fc},serverUser:{merge:Fc}}},Message:{fields:{author:{merge:Fc},serverUser:{merge:Fc},channel:{merge:Fc},group:{merge:Fc},toUser:{merge:Fc}}},Query:{fields:{serverUsers:{merge:!1},user:{merge:!0},server:{merge:!0},folder:{merge:!0},publicServers:{merge:!1}}}}})});const Rc=/^[A-Za-z0-9-_]+$/gi;function Ac(){var e,n,r,a;const[l,s,o,i]=xs(),[c,m]=g.exports.useState(!1),{handleSubmit:d,register:u,watch:p,reset:v,getValues:h,formState:{errors:b}}=re({mode:"onChange",shouldUnregister:!0}),E=p("email"),x=p("username"),y=p("usernameOrEmail"),w=p("password"),N=p("confirmPassword"),[k,{loading:C}]=function(e){const n={...Tn,...e};return t(xa,n)}(),[$,{loading:U}]=function(e){const n={...Tn,...e};return t(ka,n)}(),S=()=>{v(),s(!1)},I=!(o?x&&x.length>=3&&x.length<=20&&Rc.test(x)&&(!E||E&&xn(E))&&w&&w.length>=6&&N&&N===w:y&&w);return f.createElement(Xl,{close:S,open:l,onSubmit:d((({usernameOrEmail:e,email:t,username:n,password:r})=>{if(o)k({variables:{input:{username:n,password:r,email:t||null}}}).then((({data:{createAccount:{accessToken:e,user:t}}})=>{localStorage.setItem("token",e),location.reload()}));else{const t=xn(e)?{email:e}:{username:e};$({variables:{input:{...t,password:r}}}).then((({data:{login:{accessToken:e,user:t}}})=>{localStorage.setItem("token",e),location.reload()}))}})),buttons:f.createElement("button",{type:"submit",className:"form-button-submit",disabled:I},o&&C||!o&&U?f.createElement(tl,{className:"w-5 h-5"}):f.createElement(ae,{className:"w-5 h-5"}))},f.createElement("div",{className:"rounded-t-lg bg-gradient-to-r from-red-400 to-indigo-600 h-2"}),f.createElement("div",{className:"px-5 pt-2 pb-9 text-left"},f.createElement("div",{className:"pb-4 flex items-center"},f.createElement("div",{onClick:()=>{o&&(i(!1),v())},className:"text-sm cursor-pointer mr-3 py-3 border-b-2 inline-flex items-center justify-center px-3 "+(o?"border-transparent text-secondary":"dark:border-gray-300 text-primary")},"Log In"),f.createElement("div",{onClick:()=>{o||(i(!0),v())},className:"text-sm cursor-pointer py-3 border-b-2 inline-flex items-center justify-center px-3 "+(o?"dark:border-gray-300 text-primary":"border-transparent text-secondary")},"Create Account"),f.createElement("div",{className:"ml-auto"},f.createElement(_o,{className:"h-3.5 text-secondary"})),f.createElement(ne,{className:"ml-5 w-5 h-5 text-tertiary highlightable",onClick:()=>S()})),f.createElement("div",{className:"space-y-4"},o?f.createElement(f.Fragment,null,f.createElement("div",null,f.createElement("div",{className:"relative"},f.createElement("input",{id:"username",...u("username",{required:!0,pattern:Rc,maxLength:20,minLength:3}),className:"form-input-icon",placeholder:"Username",minLength:3,maxLength:20}),f.createElement(we,{className:"form-input-icon-icon"})),"minLength"===(null==(e=b.username)?void 0:e.type)&&f.createElement("div",{className:"form-error"},"Username must be between 3 and 20 characters"),"pattern"===(null==(n=b.username)?void 0:n.type)&&f.createElement("div",{className:"form-error"},"Letters, numbers, dashes, and underscores only")),f.createElement("div",null,f.createElement("div",{className:"relative"},f.createElement("input",{id:"email",...u("email",{validate:{email:e=>!e||xn(e)||"Invalid email"}}),className:"form-input-icon",placeholder:"Email (Optional)",type:"email"}),f.createElement(yn,{className:"form-input-icon-icon"})),"email"===(null==(r=b.email)?void 0:r.type)&&f.createElement("div",{className:"form-error"},b.email.message))):f.createElement("input",{id:"usernameOrEmail",...u("usernameOrEmail",{shouldUnregister:!0}),className:"form-input",placeholder:"Username or email"}),o?f.createElement(f.Fragment,null,f.createElement("div",null,f.createElement("div",{className:"relative"},f.createElement("input",{id:"password",...u("password",{required:!0,minLength:6}),className:"form-input-password",placeholder:"Password",type:c?"text":"password",minLength:6}),f.createElement(as,{showPassword:c,setShowPassword:m})),"minLength"===(null==(a=b.password)?void 0:a.type)&&f.createElement("div",{className:"form-error"},"Password must be at least 6 characters")),f.createElement("div",null,f.createElement("div",{className:"relative"},f.createElement("input",{id:"confirmPassword",...u("confirmPassword",{required:!0,validate:{matchesPreviousPassword:e=>{const{password:t}=h();return t===e||"Passwords do not match"}}}),className:"form-input-password",placeholder:"Confirm Password",type:c?"text":"password"}),f.createElement(as,{showPassword:c,setShowPassword:m})),!!w&&!!N&&w!==N&&f.createElement("div",{className:"form-error"},"Passwords do not match"))):f.createElement("div",{className:"relative"},f.createElement("input",{id:"password",...u("password",{required:!0}),className:"form-input",placeholder:"Password",type:c?"text":"password"}),f.createElement(as,{showPassword:c,setShowPassword:m})))))}const Dc=w("\n  flex\n  w-full\n  items-center\n  dark:hover:bg-gray-725\n  px-2\n  py-1\n  h-12\n  rounded\n  cursor-pointer\n"),Tc="MutualServers";var Lc=g.exports.memo((function(){var e,t;const[n]=Ya(),[r,a,l,s]=Ja((e=>[e.dialogUserId,e.setDialogUserId,e.userDialogOpen,e.setUserDialogOpen]));C();const[o,i]=g.exports.useState(Tc),{data:c}=qa({variables:{id:r},skip:!r}),m=null==c?void 0:c.user,d=null!=(t=null==(e=null==c?void 0:c.user)?void 0:e.servers)?t:[],u=g.exports.useCallback((()=>{s(!1)}),[s]);return f.createElement(Kl,{closeOnOverlayClick:!0,isOpen:l,close:u},f.createElement("div",{onClick:e=>e.stopPropagation(),className:"rounded-lg max-w-xl w-full dark:bg-gray-850"},f.createElement("div",{className:"flex p-5"},f.createElement(Ms,{user:m,size:20,showOnline:!0,dotClassName:"ring-5 dark:ring-gray-850 w-4 h-4"}),f.createElement("div",{className:"ml-5 flex w-full pt-5"},f.createElement("div",{className:"font-semibold text-lg text-primary leading-none"},null==m?void 0:m.username),(null==m?void 0:m.isStaff)&&f.createElement(x,{content:"Staff"},f.createElement("div",{className:"cursor-pointer ml-3 h-5 w-5"},f.createElement(Bo,{className:"w-5 h-5"}))),(null==m?void 0:m.isOg)&&f.createElement(x,{content:"Early Adopter"},f.createElement("div",{className:"cursor-pointer ml-3 h-5 w-5"},f.createElement(wn,{className:"w-5 h-5 text-blue-500"}))),r!==(null==n?void 0:n.id)&&f.createElement(f.Fragment,null,f.createElement("div",{className:"ml-auto"}),f.createElement(Vl,{data:{type:wl,user:m},leftClick:!0},f.createElement("button",{className:"h-8 cursor-pointer highlightable ml-3 focus:outline-none"},f.createElement(De,{className:"w-5 h-5"})))))),n&&(null==m?void 0:m.id)===n.id?f.createElement("div",{className:"h-36 dark:bg-gray-750 rounded-b-lg p-5 flex items-center justify-center"},f.createElement("button",{className:"h-0 w-0 overflow-hidden"}),f.createElement("div",{className:"text-lg font-medium text-tertiary"},"Improved profile coming soon!")):f.createElement(f.Fragment,null,f.createElement("div",{className:"px-5 dark:border-gray-775 border-t h-14 flex items-center space-x-10"},f.createElement("button",{className:(p=o===Tc,w(`\n  h-full\n  cursor-pointer\n  select-none\n  focus:outline-none\n  text-13\n  border-b-4\n  flex\n  items-center\n  box-content\n  ${p?"text-gray-900 dark:text-gray-100 dark:border-white":"text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 border-transparent"}\n`)),onClick:()=>i(Tc)},f.createElement("div",{className:"transform translate-y-0.5"},"Mutual Planets"))),f.createElement("div",{className:"rounded-b-lg dark:bg-gray-750 p-2 max-h-[15rem] min-h-[15rem] h-full scrollbar-custom"},o===Tc&&(d.length>0?d.map((e=>f.createElement(b,{to:`/+${e.name}`,key:e.id,className:Dc,onClick:()=>u()},f.createElement(ll,{server:e,size:10,className:"dark:bg-gray-800 rounded-full"}),f.createElement("div",{className:"pl-2.5 text-base text-secondary font-medium"},e.name)))):f.createElement(Wa,{className:"h-36"},"No mutual planets"))))));var p}));var Oc=Nn((function({history:e}){const t="Mac OS"===Qa();return f.createElement(kn,{client:Mc},f.createElement(Cn,null,f.createElement(pt,null,f.createElement("meta",{charSet:"UTF-8"}),f.createElement("link",{rel:"icon",type:"image/svg+xml",href:"/logos/logo_icon.svg"}),f.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),f.createElement("title",null,"Comet – All-in-one chat & forums for communities")),f.createElement(Va,null,f.createElement($n,{history:e},f.createElement(Gl,null,f.createElement(Un,{backend:Sn,options:{enableTouchEvents:!1,enableMouseEvents:!0}},f.createElement(pc,null),f.createElement(fc,null),window.electron&&!t&&f.createElement(xc,null),f.createElement(Ac,null),f.createElement(Lc,null),f.createElement("div",{style:window.electron?{height:t?"100%":"calc(100% - 1.375rem)"}:{height:"100%"},className:"flex"},f.createElement(mc,null))))))))}));const zc=In();Pn({dsn:"https://1cff6f3dfcb844e8bd098e35a0498e5a@o683674.ingest.sentry.io/5771326",integrations:[new Fn.BrowserTracing({routingInstrumentation:Mn(zc),traceFetch:!1})],release:"web@0.0.94",tracesSampleRate:1,beforeBreadcrumb:pn.excludeGraphQLFetch}),window.electron&&document.documentElement.classList.add("electron"),Rn.render(f.createElement(Oc,{history:zc}),document.getElementById("root"));