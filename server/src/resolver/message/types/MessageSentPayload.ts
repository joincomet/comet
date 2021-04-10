export interface MessageSentPayload {
  messageId: string
  fromUserId?: string
  toUserId?: string
  groupId?: string
  channelId?: string
  serverId?: string
}
