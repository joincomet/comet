import { request } from '../network/request'
import { gql } from 'graphql-request'
import { useMutation } from 'react-query'

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
