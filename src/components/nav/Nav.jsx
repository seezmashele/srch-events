// import Image from 'next/image'
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

const Nav = ({
  hideSearch = true,
  showLoginButton = false,
  showEventSubmitButton = false,
  hideCreateEventButton = false,
  handleEventUpload
}) => {
  // const { theme } = useTheme()
  const theme = 'light'
  const { currentUser } = useAuth()
  const { showDrawer, changeShowDrawer } = useApp()
  const [openLoginModal, setOpenLoginModal] = useState(false)
  const [signupMode, setSignupMode] = useState(false)
  const [openTempDrawer, setOpenTempDrawer] = useState(false)

  const closeLoginModal = () => {
    setOpenLoginModal(false)
  }

  const toggleTempDrawer = (value) => {
    setOpenTempDrawer(value)
  }

  return (
    <>
      <nav className="main_border_color container_bg_color--primary fixed top-0 z-50 w-full border-b">
        <div className="app_max_width nav_padding_x relative mx-auto h-14">
          <div className="align-center flex h-full w-full items-center justify-between">
            <div className="flex h-10 w-48 items-center">
              {/* permanent drawer button */}
              <button
                type="button"
                aria-label="Toggle drawer"
                onClick={() => {
                  changeShowDrawer(!showDrawer)
                }}
                className="ml-1 mr-4 h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full hover:bg-neutral-100 xs:hidden lg:flex"
              >
                <List className="icon_size--lg" />
              </button>

              {/* temp drawer button */}
              <button
                type="button"
                aria-label="Toggle drawer"
                onClick={() => {
                  setOpenTempDrawer(!openTempDrawer)
                }}
                className="ml-1 mr-4 h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full hover:bg-neutral-100 xs:hidden md:flex lg:hidden"
              >
                <List className="icon_size--lg" />
              </button>

              {/* nav logo */}
              <Link href="/" passHref>
                <div className="flex h-5 w-44 flex-shrink-0 cursor-pointer select-none py-[.075rem]">
                  <img
                    draggable="false"
                    className="h-full w-full object-contain object-left"
                    src={theme === 'dark' ? '/logo.svg' : '/logo.png'}
                    alt="website logo"
                  />
                </div>
              </Link>
            </div>

            {!hideSearch && (
              <div className="box_radius main_border_color border-neutral-200f mx-5 w-full max-w-sm items-center rounded-full bg-neutral-100 text-neutral-600 dark:bg-neutral-900 xs:hidden md:flex">
                <input
                  placeholder="Search"
                  className="z-[100] h-9 w-full rounded-l-full bg-neutral-100 px-4 py-2 pb-2.5 text-sm  focus:border-none focus:outline-accent-main focus:ring-0"
                />
                <div className="z-[99] h-full">
                  <Search className="h-9 w-14 cursor-pointer rounded-r-full border-neutral-200 bg-neutral-100 p-2.5 hover:bg-neutral-200" />
                </div>
              </div>
            )}

            <div className="relative flex h-9 w-48 flex-shrink select-none justify-end space-x-2.5 text-sm">
              {!hideSearch && (
                <button
                  type="button"
                  aria-label="Create event"
                  className="main_border_color flex h-full flex-shrink-0 cursor-pointer select-none items-center overflow-hidden rounded-full bg-neutral-50 p-4 text-sm transition-shadow hover:bg-neutral-100 xs:flex md:hidden"
                >
                  <Search className="h-4 w-4 flex-shrink-0" />
                </button>
              )}
              {currentUser && showEventSubmitButton && (
                <div className="flex items-center pr-3">
                  <button
                    type="button"
                    aria-label="upload event"
                    onClick={handleEventUpload}
                    className="button_styles box_radius ml-auto mr-0 flex gap-1 space-x-0 whitespace-nowrap px-5 py-2"
                  >
                    Upload
                  </button>
                </div>
              )}
              {currentUser && (
                <>
                  {!hideCreateEventButton && (
                    <Link href="/create" className="mr-3" passHref>
                      <button
                        type="button"
                        aria-label="Create event"
                        className="main_border_color box_radius h-full flex-shrink-0 cursor-pointer select-none items-center space-x-2 overflow-hidden px-4 text-sm transition-shadow hover:bg-neutral-100  xs:hidden md:flex"
                      >
                        {/* <Plus className="h-4 w-4 flex-shrink-0" /> */}
                        <div className="font-semiboldF whitespace-nowrap pb-0.5">
                          Add event
                        </div>
                      </button>
                      <button
                        type="button"
                        aria-label="Create event"
                        className="main_border_color flex h-full flex-shrink-0 cursor-pointer select-none items-center overflow-hidden rounded-full bg-neutral-50 p-4 text-sm transition-shadow hover:bg-neutral-100 xs:flex md:hidden"
                      >
                        <Plus className="h-4 w-4 flex-shrink-0" />
                      </button>
                    </Link>
                  )}
                  <AccountMenu />
                </>
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
      <Drawer
        className=""
        anchor="left"
        open={openTempDrawer}
        onClose={() => {
          toggleTempDrawer(false)
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
                setOpenTempDrawer(!openTempDrawer)
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
