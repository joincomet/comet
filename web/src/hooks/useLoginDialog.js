import { useStore } from '@/hooks/useStore'

export const useLoginDialog = () =>
  useStore(s => [
    s.loginDialog,
    s.setLoginDialog,
    s.createAccount,
    s.setCreateAccount
  ])
