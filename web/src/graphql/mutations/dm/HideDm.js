import { gql } from '@urql/core'
import { useMutation } from 'urql'

export const HIDE_DM = gql`
  mutation HideDm($userId: ID!) {
    hideDm(userId: $userId)
  }
`

export const useHideDmMutation = () => useMutation(HIDE_DM)
