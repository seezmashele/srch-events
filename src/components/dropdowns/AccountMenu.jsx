import Link from 'next/link'
import { Menu } from '@headlessui/react'
import {
  Gear,
  Search,
  Person,
  QuestionCircle,
  BoxArrowInRight,
  PlusCircle
} from 'react-bootstrap-icons'
import { useAuth } from '../../context/AuthContext'
import { signOut } from '../../utils/supabase/auth/session'

const AccountMenu = () => {
  const {
    currentUser,
    accountColor,
    accountImage,
    accountUsername,
    accountDisplayName
  } = useAuth()

  const signUserOut = async () => {
    const result = await signOut()
    if (result && result.success) window.location.reload()
  }

  const menuItems = [
    {
      icon: <Person className="icon_size--base" />,
      title: 'Your profile',
      link: `/profile/${accountUsername}`
    },
    {
      icon: <PlusCircle className="icon_size--base" />,
      title: 'Create event',
      link: '/add-new-event'
    },
    {
      icon: <Gear className="icon_size--base" />,
      title: 'Settings',
      link: '/settings'
    },
    {
      icon: <Search className="icon_size--base" />,
      title: 'Search',
      link: '/search'
    },
    {
      icon: <QuestionCircle className="icon_size--base" />,
      title: 'Help',
      link: '/settings/help'
    },
    { divider: true },
    {
      icon: <BoxArrowInRight className="icon_size--base" />,
      title: 'Logout',
      action: signUserOut
    }
  ]

  return (
    <Menu>
      {() => (
        <>
          <Menu.Button className="flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full hover:bg-neutral-100">
            <div
              style={{
                backgroundColor: accountImage ? 'transparent' : accountColor
              }}
              className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full text-base text-white"
            >
              {!accountImage &&
                currentUser &&
                accountDisplayName &&
                accountDisplayName[0]}
              {accountImage && (
                <img
                  src={accountImage}
                  className="h-full w-full overflow-hidden rounded-full object-cover"
                  alt="profile"
                />
              )}
            </div>
          </Menu.Button>
          <Menu.Items className="dropdown_bg dropdown_shadow box_radius absolute right-0 mt-14 w-72 origin-top-right divide-y divide-neutral-100 bg-white p-2 text-black focus:outline-none dark:text-white">
            <div className="">
              <div className="mt-1 flex items-center px-1.5 py-0.5">
                <div
                  style={{
                    backgroundColor: accountColor
                  }}
                  className="mr-2.5 flex h-10 w-10 items-center justify-center rounded-full text-xl text-white"
                >
                  {!accountImage &&
                    currentUser &&
                    accountDisplayName &&
                    accountDisplayName[0]}
                  {accountImage && (
                    <img
                      draggable="false"
                      src={accountImage}
                      className="h-full w-full overflow-hidden rounded-full object-cover"
                      alt="profile"
                    />
                  )}
                </div>
                <div className="">
                  <div className=" text-base">{accountDisplayName}</div>
                  <div className="text-neutral-500">@{accountUsername}</div>
                </div>
              </div>
              <div className="mb-1.5 mt-3">
                <div className="border_color--main w-full border-b dark:border-neutral-500" />
              </div>
              {menuItems &&
                menuItems.map((item, index) => {
                  const itemKey = `menuDropdown${item.title}${index}`
                  if (item.divider) {
                    return (
                      <div
                        key={itemKey}
                        className="border_color--main my-1.5 w-full border-b dark:border-neutral-500"
                      />
                    )
                  }
                  if (item.link) {
                    return (
                      <Link href={item.link} key={itemKey} passHref>
                        <Menu.Item>
                          {() => (
                            <div className="hover_color--neutral box_radius flex w-full select-none items-center py-2.5 pr-2.5 text-sm">
                              <div className="mx-4">{item.icon}</div>
                              <div className="overflow-hidden">
                                <div
                                  className={`${
                                    item.semibold && 'font-semibold'
                                  } w-full`}
                                >
                                  {item.title}
                                </div>
                              </div>
                            </div>
                          )}
                        </Menu.Item>
                      </Link>
                    )
                  }
                  if (item.action) {
                    return (
                      <Menu.Item key={itemKey}>
                        {() => (
                          <button
                            onClick={item.action}
                            type="button"
                            className="hover_color--neutral box_radius flex w-full select-none items-center py-2.5 pr-2.5 text-sm"
                          >
                            <div className="icon_size--base mx-4">
                              {item.icon}
                            </div>
                            <div className="flex flex-col justify-start">
                              <div className="text-left">{item.title}</div>
                              <div className="mt-0.5 text-left text-xs opacity-70">
                                {item.description}
                              </div>
                            </div>
                          </button>
                        )}
                      </Menu.Item>
                    )
                  }
                  return null
                })}
            </div>
          </Menu.Items>
        </>
      )}
    </Menu>
  )
}

export default AccountMenu
