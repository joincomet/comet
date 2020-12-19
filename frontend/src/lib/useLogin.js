import { useRouter } from 'next/router'

export const useLogin = () => {
  const { pathname, query, push } = useRouter()
  return {
    openLogin: () => push({ pathname, query: { ...query, login: 'true' } })
  }
}
