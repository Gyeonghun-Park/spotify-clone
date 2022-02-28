import { Sidebar, Center, Player } from '@components'

const style = {
  wrapper: `h-screen overflow-y-hidden bg-[#202020]`,
  main: `flex`,
  player: `sticky bottom-0`,
}

function Home() {
  return (
    <div className={style.wrapper}>
      <main className={style.main}>
        <Sidebar />
        <Center />
      </main>

      <div className={style.player}>
        <Player />
      </div>
    </div>
  )
}

export default Home
