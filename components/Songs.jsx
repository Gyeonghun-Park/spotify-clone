import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistIdState, playlistState } from '@atoms/playlistAtom'
import { Song } from '@components'

const style = {
  wrapper: `flex flex-col space-y-1 px-8 pb-28 text-white`,
}

function Songs() {
  const playlist = useRecoilValue(playlistState)
  return (
    <div className={style.wrapper}>
      {playlist?.tracks.items.map(({ track }, i) => (
        <Song key={track.id} track={track} order={i} />
      ))}
    </div>
  )
}

export default Songs
