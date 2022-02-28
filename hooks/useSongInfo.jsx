import { useState, useEffect } from 'react'
import useSpotify from '@hooks/useSpotify'
import { useRecoilState } from 'recoil'
import { currentTrackIdState, isPlayingState } from '@atoms/songAtom'

function useSongInfo() {
  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [songInfo, setSongInfo] = useState()

  useEffect(() => {
    if (!(spotifyApi && currentTrackId)) return
    ;(async () => {
      try {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentIdTrack}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        ).then((res) => res.json())

        setSongInfo(trackInfo)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [spotifyApi, currentTrackId])

  console.log(songInfo)
  return songInfo
}

export default useSongInfo
