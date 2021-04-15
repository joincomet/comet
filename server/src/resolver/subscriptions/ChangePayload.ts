import { ChangeType } from '@/resolver/subscriptions/ChangeType'

export interface ChangePayload {
  id: string
  type: ChangeType
}
