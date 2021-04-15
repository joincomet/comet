import { ChangeType } from '@/resolver/subscriptions/ChangeType'

export interface BulkChangePayload {
  ids: string[]
  type: ChangeType
}
