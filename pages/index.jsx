import Head from 'next/head'
import { Sidebar, Center } from '@components'

function Home() {
  return (
    <div className={style.wrapper}>
      <Head>
        <title>Spotify 2.0</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main className={style.content}>
        <Sidebar />
        <Center />
      </main>

      <div>{/* Player */}</div>
    </div>
  )
}

export default Home

const style = {
  wrapper: `h-screen overflow-y-hidden bg-[#202020]`,
  content: `flex`,
}
