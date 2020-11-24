import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const providers = [
  Providers.Credentials({
    name: 'Credentials',
    credentials: {
      username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
      password: { label: 'Password', type: 'password' }
    },
    authorize: async credentials => {
      const user = credentials => {
        return {
          id: 1,
          username: 'jsmith',
          name: 'J Smith',
          email: 'jsmith@example.com'
        }
      }
      if (user) {
        return Promise.resolve(user)
      } else {
        return Promise.resolve(null)
      }
    }
  }),
  Providers.Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  }),
  Providers.Twitter({
    clientId: process.env.TWITTER_CLIENT_ID,
    clientSecret: process.env.TWITTER_CLIENT_SECRET
  }),
  /*Providers.Reddit({
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET
  }),*/
  Providers.Discord({
    clientId: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET
  }),
  Providers.GitHub({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET
  })
]

const callbacks = {
  signIn: async (user, account, profile) => {
    if (account.provider === 'discord') {
      const discordUser = {
        id: profile.id,
        login: profile.login,
        name: profile.name,
        avatar: user.image
      }

      user.accessToken = await getTokenFromYourAPIServer('discord', discordUser)
      return true
    }

    return false
  },
  session: async (session, user) => {
    session.accessToken = user.accessToken
    session.user = await getUserFromTheAPIServer(session.accessToken)
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
