import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { getUserFromToken, login } from '@/hooks/useLogin'

const providers = [
  Providers.Credentials({
    name: 'Credentials',
    credentials: {
      username: { label: 'Username', type: 'text' },
      password: { label: 'Password', type: 'password' }
    },
    authorize: async ({ username, password }) => {
      const { accessToken, user } = await login({ username, password })
      user.accessToken = accessToken
      return user
    }
  })
  /*Providers.Google({
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  }),
  Providers.Twitter({
    clientId: process.env.TWITTER_CLIENT_ID,
    clientSecret: process.env.TWITTER_CLIENT_SECRET
  }),
  Providers.Discord({
    clientId: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET
  }),
  Providers.GitHub({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET
  })*/
]

const callbacks = {
  signIn: async (user, account, profile) => {
    return !!user
  },
  session: async (session, user) => {
    session.accessToken = user.accessToken
    session.user = await getUserFromToken(session.accessToken)
    return session
  },
  jwt: (token, user, account, profile, isNewUser) => {
    if (user) {
      token = { accessToken: user.accessToken }
    }

    return token
  }
}

const options = {
  providers,
  callbacks
}

export default (req, res) => NextAuth(req, res, options)
