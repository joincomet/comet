import { verify } from 'jsonwebtoken'

export function getUserFromToken(token: string): TokenUser {
  if (!token) return null

  try {
    return verify(token, process.env.ACCESS_TOKEN_SECRET) as TokenUser
  } catch {
    return null
  }
}

export interface TokenUser {
  id: string
  email: string
  username: string
}
