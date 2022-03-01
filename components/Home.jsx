import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ExternalLinkIcon,
} from '@heroicons/react/outline'
import { Albums } from '@components'

import profileImg from '@images/profile.svg'

const style = {
  wrapper: `h-screen  overflow-y-scroll scrollbar-hide`,
  header: `absolute top-5 right-8`,
  profileContainer: `flex cursor-pointer items-center space-x-3 rounded-full bg-[#202020] pr-2 text-white hover:opacity-80`,
  profile: `rounded-full`,
  playlistContainer: `flex h-80 items-end space-x-7 bg-gradient-to-b to-[#202020] p-8 text-white`,
  playlistImg: `shadow-2xl`,
  playlistName: `text-3xl font-bold md:text-4xl xl:text-5xl`,
}

function Home() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState()

  return (
    <div className={style.wrapper}>
      <header
        className={style.header}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className={style.profileContainer}>
          {session?.user.image ? (
            <Image
              className={style.profile}
              src={session.user.image}
              alt="Profile image"
              height={40}
              width={40}
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#282828]">
              <Image
                className={style.profile}
                src={profileImg}
                alt="Profile image"
                height={30}
                width={30}
              />
            </div>
          )}
          <h2>{session?.user.name}</h2>
          {isOpen ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </div>
        {isOpen && (
          <ul
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-[#282828] text-sm font-light text-white  shadow-[0_6px_8px_rgb(0,0,0,0.2)] focus:outline-none"
            id="options"
            role="listbox"
          >
            <li className="relative cursor-default select-none py-3 pl-3 pr-9 hover:bg-[#3E3E3E] ">
              <span className="block truncate">Account</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 ">
                <ExternalLinkIcon className="h-5 w-5" />
              </span>
            </li>
            <li className="relative cursor-default select-none py-3 pl-3 pr-9 hover:bg-[#3E3E3E]">
              <span className="block truncate">Profile</span>
            </li>
            <li
              className="relative cursor-default select-none py-3 pl-3 pr-9 hover:bg-[#3E3E3E]"
              onClick={() => signOut()}
            >
              <span className="block truncate">Log out</span>
            </li>
          </ul>
        )}
      </header>
      <div>
        <Albums />
      </div>
    </div>
  )
}

export default Home
