'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  // BoxArrowUpRight,
  Globe,
  Instagram,
  Twitch,
  Twitter,
  Youtube
} from 'react-bootstrap-icons'
import PageHead from '../../../components/misc/PageHead'
import EventsBlock from '../../../components/blocks/EventsBlock'
import { useDatabase } from '../../../context/DatabaseContext'
import MainDrawer from '../../../components/drawers/MainDrawer'
import Nav from '../../../components/layout/Nav'
import BodyWrapper from '../../../components/wrappers/BodyWrapper'
import { fetchProfileBySlug } from '../../../utils/supabase/database/fetch'
import EventsListBlock from '../../../components/blocks/EventsListBlock'
import { accountColorsList } from '../../../utils/constants/colors'
import CoverText from './components/CoverText'

// export const generateMetadata = async ({ params }, parent) => {
//   const {id} = params

//   return {
//     title: product.title,
//     openGraph: {
//       images: ['/some-specific-page-image.jpg', ...previousImages]
//     }
//   }
// }

const HomePage = ({ params }) => {
  const { useHomePageEvents } = useDatabase()
  const { homePageEvents3 } = useHomePageEvents()
  const [profileDisplayName, setProfileDisplayName] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const [profileBio, setProfileBio] = useState('')
  const [profileUsername, setProfileUsername] = useState('')
  const [selectedView, setSelectedView] = useState('')
  const [accountColor, setAccountColor] = useState(accountColorsList[0])

  const isUsersProfile = true

  /* eslint-disable no-console */
  /* eslint-disable no-unused-vars */

  useEffect(() => {
    const getEvent = async (slug) => {
      const profile = await fetchProfileBySlug(slug)
      console.log('fetched profile', profile)
      if (profile) {
        setProfileBio(profile.bio)
        setProfileImage(profile.profileImage)
        setProfileUsername(profile.username)
        setProfileDisplayName(profile.displayName)
        setAccountColor(accountColorsList[profile.profileColor || 0])
      }
    }
    if (params && params.slug) {
      const tempSlug = params.slug
      if (tempSlug.length > 1 && tempSlug[1]) {
        setSelectedView(tempSlug[1])
      } else {
        setSelectedView('events')
      }
      if (tempSlug.length > 0 && tempSlug[0]) getEvent(tempSlug[0])
    }
  }, [params])

  const usersLinks = [
    {
      icon: <Globe className="" />,
      title: 'tailwindcss.com',
      tooltip: 'twitch.tv/tailwindcss',
      color: '#3b82f6',
      link: '/'
    },
    {
      icon: <Twitch className="" />,
      title: 'twitch',
      tooltip: 'twitch.tv/tailwindcss',
      color: '#8b5cf6',
      link: '/'
    },
    {
      icon: <Twitter className="" />,
      title: 'twitter',
      tooltip: 'twitch.tv/tailwindcss',
      color: '#0ea5e9',
      link: '/'
    },
    {
      icon: <Youtube className="" />,
      title: 'youtube',
      tooltip: 'twitch.tv/tailwindcss',
      color: '#ff0000',
      link: '/'
    },
    {
      icon: <Instagram className="" />,
      title: 'instagram',
      tooltip: 'twitch.tv/tailwindcss',
      color: '#ec4899',
      link: '/'
    }
  ]

  return (
    <>
      <PageHead title="" />
      <Nav />

      <BodyWrapper>
        <MainDrawer selectedPageIndex={isUsersProfile ? 3 : -1} />
        <div className="main_content_container content_padding_x">
          <div
            style={{
              backgroundColor: profileImage ? '#f8f8f8' : '#f8f8f8'
            }}
            className="box_radius text -z-10 mt-2.5 h-36 w-full overflow-hidden text-white"
          >
            <CoverText text={`${profileUsername} `} />
          </div>
          <div className="z-0 mx-auto -mt-5 flex h-full w-full justify-end space-x-7">
            <div className="space-between items-centerF max-w-4xlF flex w-full">
              <div className="mx-auto flex w-full max-w-4xl flex-grow flex-col">
                <div className="flex  items-start text-sm">
                  <div
                    style={{
                      backgroundColor: profileImage ? '#eee' : accountColor
                    }}
                    className="z-10 ml-4 mr-7 flex h-36 w-36 flex-shrink-0 items-center  justify-center overflow-hidden rounded-full border-4 border-white text-7xl text-white"
                  >
                    {!profileImage &&
                      profileDisplayName &&
                      profileDisplayName[0]}
                    {profileImage && (
                      <img
                        src={profileImage}
                        className="h-full w-full object-cover"
                        draggable="false"
                        alt="temp profile pic"
                      />
                    )}
                  </div>
                  <div className="mt-10 flex-grow text-sm">
                    <h3 className="text-3xl font-semibold">
                      {profileDisplayName}
                    </h3>
                    <div className="mt-2 flex items-center text-neutral-500">
                      <p className="mr-2.5 font-semibold">@{profileUsername}</p>
                      {/* <p className="mr-2.5">6.2k followers</p> */}
                      {/* <div className="mt-1.5f mx-2 h-0.5 w-0.5 rounded-full bg-neutral-500" /> */}
                      <p className="select-none">37 events</p>
                    </div>
                    <p className="mt-3 leading-relaxed">
                      {profileBio && profileBio}
                      {!profileBio &&
                        profileDisplayName &&
                        `Someday ${profileDisplayName} will write something amazing here.`}
                      {/* {!profileBio &&
                          profileDisplayName &&
                          `We've got nothing but great things to say about ${profileDisplayName}.`} */}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="box_radius mt-5 flex flex-grow-0 flex-wrap justify-end overflow-hidden bg-neutral-100 pr-3 text-sm">
              {usersLinks.map((item, index) => (
                <div className="box_radiusf my-1f hover:bg-neutral-200f flex cursor-pointer items-center bg-opacity-50 px-3 py-2 hover:underline">
                  <div style={{ color: item.color }} className="mr-1.5">
                    {item.icon}
                  </div>
                  <div>{item.title}</div>
                </div>
              ))}
            </div> */}

          <div className="main_border_color justify-centerf mb-8 mt-6 flex select-none border-b text-sm font-semibold uppercase text-neutral-500">
            <Link
              href={`/profile/${profileUsername}`}
              className={`${
                selectedView === 'events'
                  ? 'profile_tab--selected'
                  : 'profile_tab'
              }`}
            >
              Events
            </Link>
            {/* <Link
                href={`/profile/${profileUsername}/saved`}
                className={`${
                  selectedView === 'saved'
                    ? 'profile_tab--selected'
                    : 'profile_tab'
                }`}
              >
                Saved
              </Link> */}
            {/* <Link
                href={`/profile/${profileUsername}/promotions`}
                className={`${
                  selectedView === 'promos'
                    ? 'profile_tab--selected'
                    : 'profile_tab'
                }`}
              >
                Promotions (12)
              </Link> */}
          </div>

          <div className="main_content_container main_border_color">
            {selectedView === 'events' && (
              <EventsBlock events={homePageEvents3} />
            )}
            {selectedView === 'saved' && (
              <EventsListBlock events={homePageEvents3} />
            )}
            {selectedView === 'promos' && (
              <EventsBlock events={homePageEvents3} />
            )}
          </div>
        </div>
      </BodyWrapper>
    </>
  )
}

export default HomePage
