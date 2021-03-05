import { sign, verify } from 'jsonwebtoken'
import { User } from '@/entity/User'

export const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '7d'
  })
}

export const getUserId = (authorization: string) => {
  if (!authorization) return null

  const accessToken = authorization.split('Bearer ')[1]

  if (!accessToken) return null

  try {
    const payload: any = verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    return payload.userId
  } catch {
    return null
  }
}
