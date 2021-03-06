import { Server, User } from '@/entity'

export interface UserServerPayload {
  user: User
  server: Server
}
