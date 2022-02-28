import Image from 'next/image'
import { getProviders, signIn } from 'next-auth/react'
import spotifyLogo from '@images/logo.png'

const style = {
  wrapper: `flex min-h-screen w-full flex-col items-center justify-center bg-[#202020]`,
  logoContainer: `mb-5 w-52`,
  loginButton: `rounded-full bg-[#18D860] p-5 text-white`,
}

function Login({ providers }) {
  return (
    <div className={style.wrapper}>
      <div className={style.logoContainer}>
        <Image src={spotifyLogo} alt="Spotify logo" />
      </div>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className={style.loginButton}
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export default Login

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}
