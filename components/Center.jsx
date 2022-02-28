import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRecoilState, useRecoilValue } from 'recoil'
import { shuffle } from 'lodash'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { playlistIdState, playlistState } from '@atoms/playlistAtom'
import useSpotify from '@hooks/useSpotify'
import { Songs } from '@components'

import profileImg from '@images/profile.svg'
import playlistImg from '@images/playlist.svg'

const style = {
  wrapper: `h-screen flex-grow overflow-y-scroll scrollbar-hide`,
  header: `absolute top-5 right-8`,
  profileContainer: `flex cursor-pointer items-center space-x-3 rounded-full bg-[#202020] p-1 pr-2 text-white opacity-90 hover:opacity-80`,
  profile: `rounded-full`,
  playlistContainer: `flex h-80 items-end space-x-7 bg-gradient-to-b to-[#202020] p-8 text-white`,
  playlistImg: `shadow-2xl`,
  playlistName: `text-3xl font-bold md:text-4xl xl:text-5xl`,
}

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
]

function Center() {
  const [color, setColor] = useState()
  const playlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist] = useRecoilState(playlistState)
  const { data: session } = useSession()
  const spotifyApi = useSpotify()

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlistId])

  useEffect(() => {
    if (!(spotifyApi && playlistId)) return
    ;(async () => {
      try {
        const { body } = await spotifyApi.getPlaylist(playlistId)
        setPlaylist(body)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [spotifyApi, playlistId])

  return (
    <div className={style.wrapper}>
      <header className={style.header}>
        <div className={style.profileContainer}>
          {session?.user.image ? (
            <Image
              className={style.profile}
              src={session.user.image}
              alt="Profile image"
              height={40}
              width={40}
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#535353]">
              <Image
                className={style.profile}
                src={profileImg}
                alt="Profile image"
                height={30}
                width={30}
              />
            </div>
          )}
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section className={`${style.playlistContainer} ${color}`}>
        {playlist?.images?.[0]?.url ? (
          <Image
            className={style.playlistImg}
            src={playlist?.images?.[0]?.url}
            alt="Playlist image"
            height={176}
            width={176}
          />
        ) : (
          <div className="flex h-44 w-44 items-center justify-center bg-[#535353]">
            <Image
              className={style.playlistImg}
              src={playlistImg}
              alt="Playlist image"
              height={50}
              width={50}
            />
          </div>
        )}

        <div>
          <p>PLAYLIST</p>
          <h1 className={style.playlistName}>{playlist?.name}</h1>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  )
}

export default Center
