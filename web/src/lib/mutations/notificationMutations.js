

import { useMutation, gql } from '@apollo/client'

const markNotificationRead = async variables => {
  await request(
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
    gql`
      mutation markAllNotificationsRead {
        markAllNotificationsRead
      }
    `
  )
}

export const useMarkAllNotificationsReadMutation = options =>
  useMutation(markAllNotificationsRead, options)
