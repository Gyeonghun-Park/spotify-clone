import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import useSpotify from '@hooks/useSpotify'
import { Album } from '@components'

const style = {
  wrapper: `pt-12 pb-24 px-8 text-white`,
  container: `flex flex-col space-y-2 my-10`,
  albums: `grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-3 lg:grid-cols-5 xl:gap-x-8`,
}

function Albums() {
  const spotifyApi = useSpotify()
  const { data: session } = useSession()
  const [newReleases, setNewReleases] = useState()
  const [playlistsForCategory, setPlaylistsForCategory] = useState()
  const [recommendations, setRecommendations] = useState()

  const getNewReleases = async () => {
    await spotifyApi.setAccessToken(session.user.accessToken)
    const { body } = await spotifyApi.getNewReleases({
      limit: 5,
      offset: 0,
      country: 'KR',
    })
    setNewReleases(body)
  }

  const getPlaylistsForCategory = async () => {
    await spotifyApi.setAccessToken(session.user.accessToken)
    const { body } = await spotifyApi.getPlaylistsForCategory('party', {
      limit: 5,
      offset: 0,
      country: 'KR',
    })
    setPlaylistsForCategory(body)
  }

  const getRecommendations = async () => {
    await spotifyApi.setAccessToken(session.user.accessToken)
    const { body } = await spotifyApi.getNewReleases({
      limit: 5,
      offset: 0,
      country: 'CA',
    })
    setRecommendations(body)
  }

  useEffect(() => {
    if (!(spotifyApi && session)) return
    ;(async () => {
      try {
        await getNewReleases()
        await getPlaylistsForCategory()
        await getRecommendations()
      } catch (err) {
        console.log(err)
      }
    })()
  }, [spotifyApi, session])

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <p className="mb-5 text-3xl font-bold">Popular new releases</p>
        <div className={style.albums}>
          {newReleases?.albums.items.map((track) => (
            <Album key={track.id} track={track} mode="newReleases" />
          ))}
        </div>
      </div>

      <div className={style.container}>
        <p className="mb-5 text-3xl font-bold">{`Made For ${session?.user.name}`}</p>

        <div className={style.albums}>
          {playlistsForCategory?.playlists.items.map((track) => (
            <Album key={track.id} track={track} mode="playlistsForCategory" />
          ))}
        </div>
      </div>

      <div className={style.container}>
        <p className="mb-5 text-3xl font-bold">
          Find your favorite new song today!
        </p>
        <div className={style.albums}>
          {recommendations?.albums.items.map((track) => (
            <Album key={track.id} track={track} mode="newReleases" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Albums
