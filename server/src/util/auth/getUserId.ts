import { verify } from 'jsonwebtoken'

export const getUserId = (token: string) => {
  if (!token) return null

  try {
    const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET)
    return payload.userId
  } catch {
    return null
  }
}
