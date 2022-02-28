import { useState, useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  HeartIcon,
} from '@heroicons/react/outline'
import useSpotify from '@hooks/useSpotify'

const style = {
  wrapper: `h-screen overflow-y-scroll border-r border-gray-900 bg-black p-5 text-sm text-gray-500 scrollbar-hide`,
  container: `space-y-4`,
  iconContainer: `flex items-center space-x-2 hover:text-white`,
  icon: `h-5 w-5`,
  divider: `border-t-[0.1px] border-gray-900`,
  playlistContainer: `cursor-pointer hover:text-white`,
}

function Sidebar() {
  const [playlists, setPlaylists] = useState([])
  const { data: session, status } = useSession()
  const spotifyApi = useSpotify()

  useEffect(() => {
    if (!session) return
    ;(async () => {
      if (spotifyApi.getAccessToken()) {
        try {
          const {
            body: { items },
          } = await spotifyApi.getUserPlaylists()
          setPlaylists(items)
        } catch (err) {
          console.log(err)
        }
      }
    })()
  }, [session, spotifyApi])

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <button className={style.iconContainer} onClick={() => signOut()}>
          <p>Log out</p>
        </button>
        <button className={style.iconContainer}>
          <HomeIcon className={style.icon} />
          <p>Home</p>
        </button>
        <button className={style.iconContainer}>
          <SearchIcon className={style.icon} />
          <p>Search</p>
        </button>
        <button className={style.iconContainer}>
          <LibraryIcon className={style.icon} />
          <p>Your Library</p>
        </button>

        <hr className={style.divider} />

        <button className={style.iconContainer}>
          <PlusCircleIcon className={style.icon} />
          <p>Create Playlist</p>
        </button>
        <button className={style.iconContainer}>
          <HeartIcon className={style.icon} />
          <p>Liked Songs</p>
        </button>
        <button className={style.iconContainer}>
          <RssIcon className={style.icon} />
          <p>Your Episodes</p>
        </button>

        <hr className={style.divider} />

        {playlists.map((playlist) => (
          <p key={playlist.id} className={style.playlistContainer}>
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
