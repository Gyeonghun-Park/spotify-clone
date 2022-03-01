import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  HeartIcon,
} from '@heroicons/react/outline'
import useSpotify from '@hooks/useSpotify'
import { playlistIdState } from '@atoms/playlistAtom'

import spotifyImg from '@images/spotify.svg'
import Link from 'next/link'

const style = {
  wrapper: `h-screen overflow-y-scroll border-r border-gray-900 bg-black p-5 text-xs lg:text-sm text-gray-400 scrollbar-hide sm:min-w-[12rem] lg:min-w-[15rem] hidden md:inline-flex`,
  container: `space-y-4`,
  iconContainer: `flex items-center space-x-2 hover:text-white`,
  icon: `h-5 w-5`,
  divider: `border-t-[0.1px] border-gray-900`,
  playlistItem: `cursor-pointer hover:text-white`,
}

function Sidebar() {
  const [playlists, setPlaylists] = useState([])
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)
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
        <Image
          src={spotifyImg}
          alt="Spotify image"
          height={50}
          width={100}
          onClick={() => setPlaylistId(null)}
        />
        <button
          className={style.iconContainer}
          onClick={() => setPlaylistId(null)}
        >
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
          <p
            key={playlist.id}
            onClick={() => setPlaylistId(playlist.id)}
            className={style.playlistItem}
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
