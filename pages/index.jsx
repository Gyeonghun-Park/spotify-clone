import Modal from 'react-modal'
import { useRecoilValue } from 'recoil'
import { modalState } from '@atoms/modalAtom'
import { Sidebar, Center, Player, PremiumModal } from '@components'
import Head from 'next/head'

Modal.setAppElement('#__next')

const style = {
  wrapper: `h-screen overflow-y-hidden bg-[#202020]`,
  main: `flex`,
  player: `sticky bottom-0`,
}

const customStyles = {
  content: {
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '',
    padding: 0,
    border: 'none',
  },
  overlay: {
    backgroundColor: '#334250a7',
  },
}

function Home() {
  const modal = useRecoilValue(modalState)

  return (
    <div className={style.wrapper}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Gyeonghun Park" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link
          rel="shortcut icon"
          sizes="32x32"
          href="/logo.png"
          type="image/png"
        />
        <meta property="og:site_name" content="Spotify Clone" />
        <meta property="og:type" content="website" />
        <title>Spotify Clone</title>
      </Head>

      <main className={style.main}>
        <Sidebar />
        <Center />
      </main>

      <div className={style.player}>
        <Player />
      </div>

      <Modal isOpen={modal} style={customStyles}>
        <PremiumModal />
      </Modal>
    </div>
  )
}

export default Home
