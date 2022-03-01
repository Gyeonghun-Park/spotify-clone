import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { XIcon } from '@heroicons/react/solid'
import { modalState } from '@atoms/modalAtom'

import spotifyLogo from '@images/logo.png'

const style = {
  wrapper: `flex h-[20rem] w-[35rem] flex-col justify-between rounded-3xl bg-[#202020] p-10 text-white`,
  container: `flex justify-between items-center`,
  logoContainer: `flex flex-1 items-center space-x-2 self-center`,
  text: `text-center text-2xl font-bold`,
  mintButton: `w-52 cursor-pointer self-center rounded-full bg-[#1DB954] px-3 py-2 text-center text-white hover:bg-[#18D860]`,
}

function PremiumModal() {
  const [modal, setModal] = useRecoilState(modalState)

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.logoContainer}>
          <Image src={spotifyLogo} alt="Spotify logo" width={30} height={30} />
          <p>Spotify</p>
        </div>
        <XIcon className="button ml-auto" onClick={() => setModal(false)} />
      </div>
      <p className={style.text}>
        You need a Spotify premium account to play the song.
      </p>
      <a
        className={style.mintButton}
        target="_blank"
        rel="noreferrer"
        href={`https://www.spotify.com/kr-en/premium/`}
        onClick={() => setModal(false)}
      >
        Get Started
      </a>
    </div>
  )
}

export default PremiumModal
