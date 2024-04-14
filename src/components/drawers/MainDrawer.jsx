import { Gear, QuestionCircle } from 'react-bootstrap-icons'
import { CalendarRange, Gamepad2, Home, Tv, User } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useAuth } from '../../context/AuthContext'
import DrawerButtons from './MainDrawer/DrawerButtons'
// import LocationButtons from './MainDrawer/LocationButtons'
import RecommendedButtons from './MainDrawer/RecommendedButtons'

const MainDrawer = ({ selectedPageIndex = -1, selectedPageTitle = '' }) => {
  const { showDesktopDrawer } = useApp()
  const { accountUsername } = useAuth()
  const userProfileLink = `/profile/${accountUsername}`
  const savedEventsLink = `/profile/${accountUsername}/saved`

  const drawerItemsTop = [
    {
      icon: <Home className="icon_size--base" />,
      title: 'Home',
      link: '/'
    },
    // {
    //   icon: <Sparkle className="icon_size--base" />,
    //   title: 'Promotions',
    //   link: '/promotions'
    // },
    {
      icon: <CalendarRange className="icon_size--base" />,
      title: 'Saved events',
      link: accountUsername ? savedEventsLink : ''
    },
    {
      icon: <User className="icon_size--base" />,
      title: 'Your profile',
      link: accountUsername ? userProfileLink : ''
    }
  ]

  const drawerItemsOnline = [
    { divider: true },
    {
      icon: <Gamepad2 className="icon_size--base" />,
      title: 'Tournaments',
      link: '/online/tournaments'
    },
    {
      icon: <Tv className="icon_size--base" />,
      title: 'Live streams',
      link: '/online/live-streams'
    }
  ]

  const drawerItemsBottom = [
    { divider: true },
    {
      icon: <Gear className="icon_size--base" />,
      title: 'Settings',
      link: '/settings'
    },
    {
      icon: <QuestionCircle className="icon_size--base" />,
      title: 'Help',
      link: '/settings/help'
    }
  ]

  // const topLocations = [
  //   { title: 'Online', path: '/place/online', count: 204 },
  //   { title: 'In Person', path: '/place/inperson', count: 89 }
  // ]

  const recommendedProfiles = [
    {
      title: 'Squeezie',
      slug: 'squeezie',
      image: '/img/profiles/Squeezie.png'
    },
    {
      title: 'TazerCraft',
      slug: 'tazercraft',
      image: '/img/profiles/TazerCraft.png'
    },
    {
      title: 'jadedphoenix_',
      slug: 'jadedphoenix',
      image: '/img/profiles/jadedphoenix_.png'
    },
    { title: 'Stripp', slug: 'stripp', image: '/img/profiles/Stripp.png' },
    {
      title: 'Bumfluffski',
      slug: 'bumfluffski',
      image: '/img/profiles/Bumfluffski.png'
    },
    {
      title: 'mansayasama',
      slug: 'mansayasama',
      image: '/img/profiles/mansayasama.png'
    },
    { title: 'Zemie', slug: 'zemie', image: '/img/profiles/zemie.png' }
  ]

  // ! use consistent top spacing throughout the app

  return (
    <nav
      className={`drawer_transition prevent_overscroll hide_scrollbar_thumb fixedf mt-16f -bottom-4f mr-2f bg-whitef bg-neutral-100f sticky bottom-0 left-0 top-14 max-h-screen flex-shrink-0 select-none flex-col overflow-y-hidden pt-[1.1rem] ${
        showDesktopDrawer
          ? 'main_drawer_open xs:overflow-hidden lg:overflow-scroll'
          : 'main_drawer_minimized overflow-hidden'
      }`}
    >
      <div className="flex w-full flex-shrink-0 flex-col px-3 pb-6 text-base">
        {/* top options ---------------------------------------- */}

        <DrawerButtons
          drawerItems={drawerItemsTop}
          selectedPageTitle={selectedPageTitle}
          selectedItemIndex={selectedPageIndex}
        />

        {/* locations ---------------------------------------- */}

        {/* <LocationButtons
          hidden={!showDesktopDrawer}
          locationsArray={topLocations}
          selectedItemIndex={-1}
        /> */}

        {/* online options ---------------------------------------- */}

        <DrawerButtons
          title="Online"
          showDividerAbove
          drawerItems={drawerItemsOnline}
          selectedItemIndex={selectedPageIndex}
        />

        {/* recommended ---------------------------------------- */}

        <RecommendedButtons
          showDividerAbove
          hideTitle={!showDesktopDrawer}
          recommendedProfiles={recommendedProfiles}
        />

        {/* bottom options ---------------------------------------- */}

        <DrawerButtons
          hidden
          drawerItems={drawerItemsBottom}
          selectedItemIndex={selectedPageIndex}
        />
      </div>
    </nav>
  )
}

export default MainDrawer
