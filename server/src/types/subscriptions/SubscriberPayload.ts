export interface SubscriberPayload<TPayload = any> {
  subscriberId: string

  payload: TPayload
}
