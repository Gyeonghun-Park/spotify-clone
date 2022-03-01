import { useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
})

function useSpotify() {
  const { data: session } = useSession()

  useEffect(() => {
    if (!session) return
    ;(async () => {
      try {
        if (session.error === 'RefreshAccessTokenError') {
          signIn()
        }

        await spotifyApi.setAccessToken(session.user.accessToken)
        await spotifyApi.getMe()
      } catch (err) {
        if (err.body.error.message === 'The access token expired')
          return signOut()

        console.log(JSON.stringify(err))
      }
    })()
  }, [session])

  return spotifyApi
}

export default useSpotify
