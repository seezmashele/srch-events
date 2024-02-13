import Link from 'next/link'
import {
  HouseDoor,
  HouseDoorFill,
  Gear,
  GearFill,
  Person,
  PersonFill,
  Collection,
  CollectionFill,
} from 'react-bootstrap-icons'
import { useApp } from '../../context/AppContext'

const MainDrawer = ({ selectedPageIndex = -1 }) => {
  const { showDrawer } = useApp()

  const drawerItems = [
    {
      icon: <HouseDoor className="icon_size--base" />,
      iconFilled: <HouseDoorFill className="icon_size--base" />,
      title: 'Home',
      link: '/',
    },
    {
      icon: <Collection className="icon_size--base" />,
      iconFilled: <CollectionFill className="icon_size--base" />,
      title: 'Saved',
      link: '/profile/thisguy?saved',
    },
    { divider: true },
    {
      icon: <Person className="icon_size--base" />,
      iconFilled: <PersonFill className="icon_size--base" />,
      title: 'Profile',
      link: '/profile/randomjeans',
    },
    {
      icon: <Gear className="icon_size--base" />,
      iconFilled: <GearFill className="icon_size--base" />,
      title: 'Settings',
      link: '/settings',
    },
    { divider: true },
  ]

  const profiles = [
    { title: 'Zemie', image: '/img/profiles/zemie.png' },
    { title: '1PVCS', image: '/img/profiles/1PVCS.png' },
    { title: 'Robbaz', image: '/img/profiles/Robbaz.png' },
    { title: 'Bumfluffski', image: '/img/profiles/Bumfluffski.png' },
    { title: 'Call of Duty', image: '/img/profiles/Call of Duty.png' },
    { title: 'CookSux', image: '/img/profiles/CookSux.png' },
    { title: 'CYR', image: '/img/profiles/CYR.png' },
    { title: 'ESLCSb', image: '/img/profiles/ESLCSb.jpeg' },
    { title: 'jadedphoenix_', image: '/img/profiles/jadedphoenix_.png' },
    { title: 'KillerQueenr', image: '/img/profiles/KillerQueenr.png' },
    { title: 'kingsleague', image: '/img/profiles/kingsleague.png' },
    { title: 'mansayasama', image: '/img/profiles/mansayasama.png' },
    { title: 'QuarterJade', image: '/img/profiles/QuarterJade.png' },
    { title: 'SolaryHS', image: '/img/profiles/SolaryHS.jpeg' },
    { title: 'Squeezie', image: '/img/profiles/Squeezie.png' },
    { title: 'Stripp', image: '/img/profiles/Stripp.png' },
    { title: 'TazerCraft', image: '/img/profiles/TazerCraft.png' },
    { title: 'VernNotice', image: '/img/profiles/VernNotice.png' },
  ]

  // ! use consistent top spacing throughout the app
  return (
    <nav
      className={`border_color--main drawer_transition top-[3.875rem]f fixed left-0 top-14 flex min-h-screen flex-shrink-0 select-none flex-col overflow-hidden bg-white pt-[1.1rem] ${
        showDrawer ? ' w-[14.5rem]' : 'w-14'
      }`}
    >
      <div className="w-fullf flex w-[14.5rem] flex-shrink-0 flex-col px-3 text-base">
        {drawerItems &&
          drawerItems.map((item, index) => {
            const itemKey = `maindrawerbutton${item.title}${index}`
            if (item.divider) {
              return (
                <div
                  className="main_border_color my-2 w-full border-b"
                  key={itemKey}
                />
              )
            }
            if (item.link) {
              return (
                <Link href={item.link} passHref key={itemKey}>
                  <div
                    className={`mt-0 flex cursor-pointer select-none rounded-lg px-2.5 py-1.5 hover:bg-neutral-100  ${
                      selectedPageIndex === index && 'bg-neutral-100'
                    }`}
                  >
                    <div className="mr-4 flex h-7 w-7 items-center justify-center text-base">
                      {selectedPageIndex === index
                        ? item.iconFilled
                        : item.icon}
                    </div>
                    <div className="flex items-center px-1">
                      <div
                        className={`text-sm ${
                          selectedPageIndex === index && 'font-semibold'
                        }`}
                      >
                        {item.title}
                      </div>
                    </div>
                  </div>
                </Link>
              )
            }
            if (item.action) {
              return (
                <button
                  key={itemKey}
                  type="button"
                  onClick={item.action}
                  className={`mt-0 flex cursor-pointer select-none items-center rounded-lg px-2.5 py-1.5 hover:bg-neutral-100  ${
                    selectedPageIndex === index && 'bg-neutral-100'
                  }`}
                >
                  <div className="mr-4 flex h-7 w-7 items-center justify-center text-base">
                    {selectedPageIndex === index ? item.iconFilled : item.icon}
                  </div>
                  <div className="flex items-center px-1">
                    <div
                      className={`text-sm ${
                        selectedPageIndex === index && 'font-semibold'
                      }`}
                    >
                      {item.title}
                    </div>
                  </div>
                </button>
              )
            }
            return null
          })}
        <div className="mt-3 pb-3 pl-2 text-xs font-semibold uppercase tracking-widest text-neutral-500">
          Recommended
        </div>
        {profiles.map((item, index) => (
          <div
            key={`drawerprofile${index}`}
            className="box_radius flex cursor-pointer items-center p-2 hover:bg-neutral-100"
          >
            <div className="mr-5 h-7 w-7 overflow-hidden rounded-full">
              <img src={item.image} alt="recommended profile" />
            </div>
            <div className="text-sm">{item.title}</div>
          </div>
        ))}
      </div>
    </nav>
  )
}

export default MainDrawer
