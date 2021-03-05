import { AdminResolver } from '@/modules/admin/AdminResolver'
import { AuthResolver } from '@/modules/auth/AuthResolver'
import { ChatResolver } from '@/modules/chat'
import { CommentResolver } from '@/modules/comment/CommentResolver'
import { FolderResolver } from '@/modules/folder/FolderResolver'
import { ModerationResolver } from '@/modules/moderation/ModerationResolver'
import { NotificationResolver } from '@/modules/notification/NotificationResolver'
import { ServerResolver } from '@/modules/server/ServerResolver'
import { PostResolver } from '@/modules/post/PostResolver'
import { UserResolver } from '@/modules/user/UserResolver'
import { authChecker } from '@/modules/auth/AuthChecker'
import { getPubSub } from '@/modules/subscriptions'
import { BuildSchemaOptions } from 'type-graphql'

export default {
  resolvers: [
    AdminResolver,
    AuthResolver,
    ChatResolver,
    CommentResolver,
    FolderResolver,
    ModerationResolver,
    NotificationResolver,
    ServerResolver,
    PostResolver,
    UserResolver
  ],
  emitSchemaFile: false,
  validate: true,
  authChecker: authChecker,
  pubSub: getPubSub()
} as BuildSchemaOptions
