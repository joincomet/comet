import { sign, verify } from 'jsonwebtoken'
import { User } from '@/entities/User'

export const createAccessToken = (user: User) => {
  return sign(
    { userId36: user.id.toString(36), userId: user.id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '7d'
    }
  )
}

export const getUser = (req: any) => {
  const token = req.cookies.token

  if (!token) return null

  try {
    const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET)
    return { userId36: payload.userId36, userId: payload.userId }
  } catch (err) {
    //console.error(err)
    return null
  }
}
