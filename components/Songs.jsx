import { useRecoilState, useRecoilValue } from 'recoil'
import { ClockIcon } from '@heroicons/react/outline'
import { playlistIdState, playlistState } from '@atoms/playlistAtom'
import { Song } from '@components'

const style = {
  wrapper: `flex flex-col space-y-1 text-white`,
  test: `grid cursor-pointer grid-cols-2 rounded-lg py-4 px-5 text-[#949494]`,
  divider: `border-t-[0.1px] border-[#2D3532]`,
  trackLeft: `flex items-center space-x-4`,
  trackRight: `ml-auto flex items-center justify-center md:ml-0`,
}

function Songs() {
  const playlist = useRecoilValue(playlistState)
  return (
    <div className="px-8 pb-28">
      <div className={style.test}>
        <div className={style.trackLeft}>
          <p>#</p>
          <p>TITLE</p>
        </div>
        <div className={style.trackRight}>
          <p className="hidden w-40 md:inline">ALBUM</p>
          <ClockIcon className="h-5" />
        </div>
      </div>

      <hr className={style.divider} />

      <div className={style.wrapper}>
        {playlist?.tracks.items.map(({ track }, i) => (
          <Song key={track.id} track={track} order={i} />
        ))}
      </div>
    </div>
  )
}

export default Songs
