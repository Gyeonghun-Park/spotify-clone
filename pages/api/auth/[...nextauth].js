import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
import spotifyApi, { LOGIN_URL } from '@lib/spotify'

async function refreshAccessToken(token) {
  try {
    spotifyApi.setAccessToken(token.accessToken)
    spotifyApi.setRefreshToken(token.refreshToken)

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken()

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      refreshToken: refreshedToken.refresh_token ?? token.refresh_token,
    }
  } catch (error) {
    console.error(error)
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
        }
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token
      }

      // Access token has expired, so we need to refresh it...
      return await refreshAccessToken(token)
    },

    async session({session, token}) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username; 

      return session;
    }
  },
})
