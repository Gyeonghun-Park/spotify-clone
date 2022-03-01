import Image from 'next/image'
import { useRecoilState } from 'recoil'
import useSpotify from '@hooks/useSpotify'
import { millisToMinutesAndSeconds } from '@lib/time'
import { currentTrackIdState } from '@atoms/songAtom'

const style = {
  wrapper: `grid cursor-pointer grid-cols-2 rounded-lg py-4 px-5 text-[#949494] hover:bg-[#2A2A2A]`,
  trackLeft: `flex items-center space-x-4`,
  trackRight: `ml-auto flex items-center justify-center md:ml-0`,
}

function Song({ order, track }) {
  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)

  const clickSong = async () => {
    setCurrentTrackId(track.id)
  }

  return (
    <div className={style.wrapper} onClick={clickSong}>
      <div className={style.trackLeft}>
        <p>{order + 1}</p>
        <div>
          <Image
            src={track?.album?.images[0].url}
            alt="Track image"
            height={50}
            width={50}
          />
        </div>
        <div>
          <p className="w-36 truncate text-white lg:w-64">{track?.name}</p>
          <p className="w-40">{track?.artists[0]?.name}</p>
        </div>
      </div>

      <div className={style.trackRight}>
        <p className="hidden w-40 md:inline">{track?.album?.name}</p>
        <p>{millisToMinutesAndSeconds(track?.duration_ms)}</p>
      </div>
    </div>
  )
}

export default Song
