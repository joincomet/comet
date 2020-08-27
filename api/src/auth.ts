import { sign, verify } from 'jsonwebtoken'
import { User } from './entities/User'

export const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '7d'
  })
}

export const getUser = (req: any): string | null => {
  const authorization = req.headers['authorization']

  if (!authorization) return null

  const token = authorization.split(' ')[1]

  if (!token) return null

  try {
    const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!)
    return payload.userId as string
  } catch (err) {
    //console.error(err)
    return null
  }
}
