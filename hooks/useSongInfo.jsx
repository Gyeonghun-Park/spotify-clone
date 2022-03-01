import { useState, useEffect } from 'react'
import useSpotify from '@hooks/useSpotify'
import { useRecoilState } from 'recoil'
import { currentTrackIdState } from '@atoms/songAtom'

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
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        ).then((res) => res.json())

        setSongInfo(trackInfo)
        console.log(songInfo)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [spotifyApi, currentTrackId])

  return songInfo
}

export default useSongInfo
