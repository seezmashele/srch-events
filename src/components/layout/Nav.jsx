// import { useTheme } from 'next-themes'
import Link from 'next/link'
import Drawer from '@mui/material/Drawer'
import { useState } from 'react'
import { Search, List, Plus } from 'react-bootstrap-icons'
import { useAuth } from '../../context/AuthContext'
import { useApp } from '../../context/AppContext'
import AccountMenu from '../dropdowns/AccountMenu'
import LoginModal from '../modals/LoginModal'
import MainDrawerContent from '../drawers/MainDrawer/MainDrawerContent'
import ToggleDesktopDrawer from '../buttons/nav/ToggleDesktopDrawer'
import ToggleMobileDrawer from '../buttons/nav/ToggleMobileDrawer'
import NavSearchBar from './Nav/NavSearchBar'
import FilledTextButton from '../buttons/FilledTextButton'
import MobileIconButton from '../buttons/MobileIconButton'
import MobileIconLinkButton from '../buttons/MobileIconLinkButton'
import DesktopLinkButton from '../buttons/DesktopLinkButton'

const Nav = ({
  hideSearch = true,
  showLoginButton = false,
  showEventSubmitButton = false,
  hideCreateEventButton = false,
  handleEventUpload
}) => {
  const theme = 'light'
  const { currentUser } = useAuth()
  // const { theme } = useTheme()
  const { showDesktopDrawer, changeShowDesktopDrawer } = useApp()
  const [openLoginModal, setOpenLoginModal] = useState(false)
  const [signupMode, setSignupMode] = useState(false)
  const [openMobileDrawer, setOpenMobileDrawer] = useState(false)

  const closeLoginModal = () => {
    setOpenLoginModal(false)
  }

  return (
    <>
      <nav className="main_border_color container_bg_color--primary fixed top-0 z-50 w-full border-b">
        <div className="app_max_width nav_padding_x relative mx-auto h-14">
          <div className="align-center flex h-full w-full items-center justify-between">
            {/* -------------------------------------------------- */}

            <div className="flex h-10 w-48 items-center">
              <ToggleDesktopDrawer
                changeValue={changeShowDesktopDrawer}
                value={showDesktopDrawer}
              />
              <ToggleMobileDrawer
                changeValue={setOpenMobileDrawer}
                value={openMobileDrawer}
              />

              {/* nav logo */}
              <Link
                href="/"
                passHref
                className="flex h-5 w-44 flex-shrink-0 cursor-pointer select-none"
              >
                <img
                  draggable="false"
                  className="h-full w-full object-contain object-left"
                  src={theme === 'dark' ? '/logo.png' : '/logo.png'}
                  alt="website logo"
                />
              </Link>
            </div>

            {/* -------------------------------------------------- */}

            {!hideSearch && <NavSearchBar />}

            {/* -------------------------------------------------- */}

            <div className="relative flex h-9 w-48 flex-shrink select-none items-center justify-end space-x-1 text-sm">
              {!hideSearch && (
                <MobileIconButton
                  icon={<Search className="h-4 w-4 flex-shrink-0" />}
                  ariaLabel="Create event"
                />
              )}

              {currentUser && showEventSubmitButton && (
                <div className="pr-3">
                  <FilledTextButton
                    label="Upload"
                    ariaLabel="upload event"
                    onClick={handleEventUpload}
                  />
                </div>
              )}

              {currentUser && !hideCreateEventButton && (
                <>
                  <DesktopLinkButton
                    path="/create"
                    label="Add event"
                    ariaLabel="Create event"
                  />
                  <MobileIconLinkButton
                    path="/create"
                    ariaLabel="Create event"
                    icon={<Plus className="h-4 w-4 flex-shrink-0" />}
                  />
                </>
              )}

              {currentUser && (
                <div className="flex pl-2.5">
                  <AccountMenu />
                </div>
              )}

              <LoginModal
                openLoginModal={openLoginModal}
                signupMode={signupMode}
                closeLoginModal={closeLoginModal}
                setSignupMode={setSignupMode}
              />

              {showLoginButton && !currentUser && (
                <div className="text-[.9375rem]f flex font-semibold">
                  <button
                    type="button"
                    aria-label="Login"
                    onClick={() => {
                      setSignupMode(false)
                      setOpenLoginModal(true)
                    }}
                    className="box_radius mr-2f cursor-pointer bg-accent-main px-4 py-1.5 text-white hover:bg-accent-main-hover"
                  >
                    Log in
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* -------------------------------------------------- */}
      <Drawer
        className=""
        anchor="left"
        open={openMobileDrawer}
        onClose={() => {
          setOpenMobileDrawer(false)
        }}
      >
        <nav
          className="temp_drawer_width relative max-h-screen min-h-screen flex-shrink-0 select-none flex-col overflow-hidden bg-white
          "
        >
          <div className="temp_drawer_width border-bf absolute top-0 flex h-14 items-center pl-4">
            {/* temp drawer button */}
            <button
              type="button"
              aria-label="Toggle drawer"
              onClick={() => {
                setOpenMobileDrawer(!openMobileDrawer)
              }}
              className="text-accent-mainF ml-0 mr-4 flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full hover:bg-neutral-100"
            >
              <List className="icon_size--lg" />
            </button>
            <Link href="/" passHref>
              <div className="h-8 w-36 flex-shrink-0 cursor-pointer select-none">
                <img
                  draggable="false"
                  className="h-full w-full object-contain object-left"
                  src={theme === 'dark' ? '/logo.svg' : '/logo.png'}
                  alt="website logo"
                />
              </div>
            </Link>
          </div>
          <div className="absolute top-14 w-full border-b " />
          <div className="hide_scrollbar_thumb absolute bottom-0 top-14 mt-0.5 w-full overflow-auto py-4">
            <MainDrawerContent />
          </div>
        </nav>
      </Drawer>
    </>
  )
}

export default Nav
