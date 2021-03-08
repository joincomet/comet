import { verify } from 'jsonwebtoken'

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
