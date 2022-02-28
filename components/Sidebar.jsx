import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  HeartIcon,
} from '@heroicons/react/outline'

const style = {
  wrapper: `border-r border-gray-900 p-5 text-sm text-gray-500`,
  container: `space-y-4`,
  iconContainer: `flex items-center space-x-2 hover:text-white`,
  icon: `h-5 w-5`,
  divider: `border-t-[0.1px] border-gray-900`,
  playlistContainer: `cursor-pointer hover:text-white`,
}

function Sidebar() {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <button className={style.iconContainer}>
          <HomeIcon className={style.icon} />
          <p>Home</p>
        </button>
        <button className={style.iconContainer}>
          <SearchIcon className={style.icon} />
          <p>Search</p>
        </button>
        <button className={style.iconContainer}>
          <LibraryIcon className={style.icon} />
          <p>Your Library</p>
        </button>

        <hr className={style.divider} />

        <button className={style.iconContainer}>
          <PlusCircleIcon className={style.icon} />
          <p>Create Playlist</p>
        </button>
        <button className={style.iconContainer}>
          <HeartIcon className={style.icon} />
          <p>Liked Songs</p>
        </button>
        <button className={style.iconContainer}>
          <RssIcon className={style.icon} />
          <p>Your Episodes</p>
        </button>

        <hr className={style.divider} />

        {/* {playlist} */}
        <p className={style.playlistContainer}>Playlist name...</p>
      </div>
    </div>
  )
}

export default Sidebar
