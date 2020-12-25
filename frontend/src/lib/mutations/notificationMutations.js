import { request } from '@/lib/Request'
import { gql } from 'graphql-request'
import { useMutation } from 'react-query'

const markNotificationRead = async variables => {
  await request(
    null,
    gql`
      mutation markNotificationRead($id: ID!) {
        markNotificationRead(id: $id)
      }
    `,
    variables
  )
}

export const useMarkNotificationReadMutation = options =>
  useMutation(markNotificationRead, options)

const markAllNotificationsRead = async () => {
  await request(
    null,
    gql`
      mutation markAllNotificationsRead {
        markAllNotificationsRead
      }
    `
  )
}

export const useMarkAllNotificationsReadMutation = options =>
  useMutation(markAllNotificationsRead, options)
