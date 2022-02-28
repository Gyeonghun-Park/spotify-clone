import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { shuffle } from 'lodash'

import profileImg from '@images/profile.png'

const style = {
  wrapper: `flex-grow`,
  header: `absolute top-5 right-8`,
  profileContainer: `flex cursor-pointer items-center space-x-3 rounded-full bg-[#202020] p-1 pr-2 text-white opacity-90 hover:opacity-80`,
  profile: `rounded-full`,
  heroContainer: `space-x7 flex h-80 items-end bg-gradient-to-b to-[#202020]`,
}

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
]

function Center() {
  const [color, setColor] = useState()
  const { data: session } = useSession()

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [])

  return (
    <div className={style.wrapper}>
      <header className={style.header}>
        <div className={style.profileContainer}>
          {session?.user.image ? (
            <Image
              src={session.user.image}
              alt="Profile image"
              height={40}
              width={40}
              className={style.profile}
            />
          ) : (
            <Image
              src={profileImg}
              alt="Profile image"
              height={40}
              width={40}
              className={style.profile}
            />
          )}
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section className={`${style.heroContainer} ${color}`}></section>
    </div>
  )
}

export default Center
