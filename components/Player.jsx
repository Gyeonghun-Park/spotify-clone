import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'
import { debounce } from 'lodash'
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RewindIcon,
  SwitchHorizontalIcon,
  VolumeUpIcon,
} from '@heroicons/react/solid'
import { VolumeUpIcon as VolumeDownIcon } from '@heroicons/react/outline'
import useSpotify from '@hooks/useSpotify'
import useSongInfo from '@hooks/useSongInfo'
import { currentTrackIdState, isPlayingState } from '@atoms/songAtom'
import { modalState } from '@atoms/modalAtom'

const style = {
  wrapper: `grid h-24 grid-cols-3 border-t border-gray-700 bg-gradient-to-b from-[#202020] to-black px-2 text-xs text-white md:px-8 md:text-base`,
  songImage: `hidden md:inline`,
}

function Player() {
  const { data: session, status } = useSession()
  const spotifyApi = useSpotify()
  const songInfo = useSongInfo()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [volume, setVolume] = useState(50)
  const [modal, setModal] = useRecoilState(modalState)

  const fetchCurrentSong = async () => {
    if (songInfo) return

    try {
      const response = await spotifyApi.getMyCurrentPlayingTrack()
      setCurrentTrackId(response.body?.item?.id)

      const response2 = await spotifyApi.getMyCurrentPlaybackState()
      setIsPlaying(response2.body?.is_playing)
    } catch (err) {
      console.log(err)
    }
  }

  const handlePlayPause = async () => {
    try {
      const response = await spotifyApi.getMyCurrentPlaybackState()
      if (response.statusCode === 204) {
        await spotifyApi.play({
          uris: [songInfo.album.uri],
        })
        setIsPlaying(true)
        return
      }

      if (response.body.is_playing) {
        await spotifyApi.pause()
        setIsPlaying(false)
      } else {
        await spotifyApi.play()
        setIsPlaying(true)
      }
    } catch (err) {
      console.log(err)
      if (err.body.error.reason !== 'PREMIUM_REQUIRED') return console.log(err)

      setModal(true)
    }
  }

  const debouncedAdjustVolume = useCallback(
    debounce(async (volume) => {
      try {
        await spotifyApi.setVolume(volume)
      } catch (err) {
        if (err.body.error.reason === 'PREMIUM_REQUIRED') return

        console.log(err)
      }
    }, 500),
    []
  )

  useEffect(() => {
    fetchCurrentSong()
    setVolume(50)
  }, [session, currentTrackId, session])

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume)
    }
  }, [volume])

  return (
    <div className={style.wrapper}>
      <div className="flex items-center space-x-4">
        {songInfo?.album.images?.[0].url && (
          <Image
            className={style.songImage}
            src={songInfo?.album.images?.[0].url}
            alt="Song image"
            height={40}
            width={40}
          />
        )}
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon className="button" />
        {isPlaying ? (
          <PauseIcon className="button h-10 w-10" onClick={handlePlayPause} />
        ) : (
          <PlayIcon className="button h-10 w-10" onClick={handlePlayPause} />
        )}
        <FastForwardIcon className="button" />
        <ReplyIcon className="button" />
      </div>

      <div className="flex items-center justify-end space-x-3 pr-5 md:space-x-4">
        <VolumeDownIcon
          className="button"
          onClick={() => volume > 0 && setVolume(volume - 10)}
        />
        <input
          className="w-14 md:w-28"
          type="range"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          min={0}
          max={100}
        />
        <VolumeUpIcon
          className="button"
          onClick={() => volume < 100 && setVolume(volume + 10)}
        />
      </div>
    </div>
  )
}

export default Player
