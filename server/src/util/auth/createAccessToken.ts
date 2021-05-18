import { User } from '@/entity'
import { sign } from 'jsonwebtoken'

export const createAccessToken = (user: User) => {
  return sign(
    { id: user.id, email: user.email, username: user.username },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '7d'
    }
  )
}
