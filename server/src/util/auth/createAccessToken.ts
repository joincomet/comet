import { User } from '@/entity'
import { sign } from 'jsonwebtoken'

export const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '7d'
  })
}
