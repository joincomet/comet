import { sign, verify } from 'jsonwebtoken'
import { User } from '@/user/User.Entity'

export const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '7d'
  })
}

export const getUser = (accessToken: string) => {
  if (!accessToken) return null

  try {
    const payload: any = verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    return { userId: payload.userId }
  } catch {
    return null
  }
}
