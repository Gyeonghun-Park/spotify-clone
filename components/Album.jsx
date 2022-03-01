import Image from 'next/image'
import { useRecoilState } from 'recoil'
import useSpotify from '@hooks/useSpotify'
import { currentTrackIdState } from '@atoms/songAtom'

const truncateString = (str, num = 30) => {
  if (str?.length > num) {
    return str.slice(0, num) + '...'
  } else {
    return str
  }
}

function Album({ track, mode }) {
  const style = {
    wrapper: `aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg sm:aspect-w-2 sm:aspect-h-2`,
    name: `mt-2  truncate `,
  }

  const handler = {
    newReleases: (
      <>
        <p className="mt-4 font-bold text-white">
          {truncateString(track.artists?.[0]?.name)}
        </p>
        <p className="mt-1 text-xs font-light text-gray-400">
          {truncateString(track.name)}
        </p>
      </>
    ),
    playlistsForCategory: (
      <>
        <p className="mt-4 font-bold text-white">
          {truncateString(track.name)}
        </p>
        <p className="mt-1 text-xs font-light text-gray-400">
          {truncateString(track.description)}
        </p>
      </>
    ),
  }

  return (
    <a
      className="group cursor-pointer bg-[#181818] p-4 hover:bg-[#292929]"
      href={track?.['external_urls']['spotify']}
    >
      <div className={style.wrapper}>
        <img
          className="h-full w-full object-cover object-center"
          src={track?.images[0].url}
          alt="Track image"
        />
      </div>

      {handler[mode]}
    </a>
  )
}

export default Album
