/* eslint-disable no-unused-vars */

'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Calendar3, GeoAltFill } from 'react-bootstrap-icons'
import Nav from '../../../components/layout/Nav'
import PageHead from '../../../components/misc/PageHead'
import MainDrawer from '../../../components/drawers/MainDrawer'
import BodyWrapper from '../../../components/wrappers/BodyWrapper'
import EventSidebar from '../../../components/sidebars/EventSidebar'
import { useApp } from '../../../context/AppContext'
import { fetchEventBySlug } from '../../../utils/supabase/database/fetch'
import TiptapViewer from '../../../components/tiptap/TiptapViewer'
// import CommentsBlock from '../../../components/comments/CommentsBlock'
import { accountColorsList } from '../../../utils/constants/colors'

const EventPage = ({ params }) => {
  const { showDesktopDrawer } = useApp()
  const [coverImage, setCoverImage] = useState(null)
  const [postTitle, setPostTitle] = useState(null)
  const [coverIsLoading, setCoverIsLoading] = useState(true)
  const [startingDate, setStartingDate] = useState(null)
  const [endingDate, setEndingDate] = useState(null)
  const [authorDisplayName, setAuthorDisplayName] = useState('')
  const [authorUsername, setAuthorUsername] = useState('')
  const [authorImage, setAuthorImage] = useState('')
  const [dateCreated, setDateCreated] = useState('')
  const [eventType, setEventType] = useState(null)
  const [authorProfileLink, setAuthorProfileLink] = useState('')
  const [editorContent, setEditorContent] = useState('')
  const [accountColor, setAccountColor] = useState(accountColorsList[0])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const getEvent = async (slug) => {
      const event = await fetchEventBySlug(slug)
      if (event) {
        setAuthorDisplayName(event.authorDisplayName)
        setAuthorImage(event.authorImageSmall)
        setAuthorUsername(event.authorUsername)
        setCoverImage(event.coverImage)
        setDateCreated(event.dateCreated)
        setEditorContent(event.editorContent)
        setEventType(event.eventType)
        setPostTitle(event.title)
        setAuthorProfileLink(
          event.authorUsername ? `/profile/${event.authorUsername}` : ''
        )
        setAccountColor(accountColorsList[event.authorProfileColor || 0])
      }
    }
    if (params && params.slug) getEvent(params.slug)
  }, [params])

  return (
    <>
      <PageHead title="" />
      <Nav />

      <BodyWrapper>
        <MainDrawer />
        <main className="event_page_padding_x w-full">
          <div className="mx-auto xs:mt-3 md:mt-5">
            {/* wide cover image */}
            <div className="box_radius flex h-96 flex-col items-center justify-center overflow-hidden">
              <div className="h-0 w-full">
                <div className="h-96 w-full overflow-hidden opacity-40 blur-3xl">
                  <img
                    draggable="false"
                    className={`absolute left-0 h-full w-full object-cover transition-opacity duration-500 ${
                      coverIsLoading ? 'opacity-0f' : 'opacity-100f'
                    }`}
                    src={coverImage}
                    alt={postTitle}
                  />
                </div>
              </div>
              <div className="relative left-0 top-0 inline-block h-full w-full overflow-hidden">
                <img
                  draggable="false"
                  className={`absolute left-0 h-full w-full object-contain transition-opacity duration-500 ${
                    coverIsLoading ? 'opacity-0f' : 'opacity-100f'
                  }`}
                  src={coverImage}
                  alt={postTitle}
                  onLoad={() => {
                    setCoverIsLoading(false)
                  }}
                />
              </div>
            </div>

            <div className="mx-auto flex w-full max-w-5xl flex-row">
              <div className="w-full max-w-2xl xs:mr-0 lg:mr-7">
                {/* cover image */}

                <div className=" xs:px-4 md:px-0">
                  {/* event title */}
                  <div className="card_title mt-7 select-text font-bold hover:cursor-default hover:no-underline xs:text-3xl md:text-3xl">
                    {postTitle}
                  </div>

                  {/* <div className="content_divider_styles darker_border_color my-5f mb-3 mt-5" /> */}

                  <div className="mt-6 flex flex-grow items-center text-sm">
                    <Link
                      href={authorProfileLink}
                      passHref
                      style={{
                        backgroundColor: authorImage ? '#eee' : accountColor
                      }}
                      className="card_author_image mr-2 flex h-9 w-9 select-none items-center justify-center overflow-hidden text-lg text-white"
                    >
                      {!authorImage &&
                        authorDisplayName &&
                        authorDisplayName[0]}
                      {authorImage && (
                        <img
                          src={authorImage}
                          alt=""
                          className="pointer-events-none h-full w-full select-none"
                        />
                      )}
                    </Link>
                    <div>
                      <div className="flex items-center">
                        <Link
                          href={authorProfileLink}
                          passHref
                          className="font-semibold"
                        >
                          {authorDisplayName}
                        </Link>
                        <div className="mx-2.5 mt-0.5 h-[2px] w-[2px] rounded-full bg-neutral-500" />
                        <div className="select-none text-neutral-500">
                          posted 3d ago
                        </div>
                      </div>
                      <div className="-mt-0.5 text-neutral-500">
                        {authorUsername}
                      </div>
                    </div>
                  </div>

                  <div className="darker_border_color mt-5 w-full border-b" />

                  <div className="my-5 flex w-full gap-3.5">
                    <div className="flex w-1/2 items-center">
                      <div>
                        <Calendar3 className="mr-5 h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">
                          12 - 15 Mar, 2024
                        </div>
                        <p className="mt-0.5 text-sm font-semibold text-orange-600">
                          8:00 - 17:00 (UTC+2)
                        </p>
                      </div>
                    </div>

                    <div className="mx-3 h-10 w-1 border-r" />

                    <div className="flex w-1/2 items-center">
                      <div>
                        <GeoAltFill className="mr-5 h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">
                          The Glen Country Club Field
                        </div>
                        <p className="mt-0.5 text-sm font-semibold text-orange-600">
                          Clifton, Cape Town
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="darker_border_color my-0 w-full border-b" />

                  <div className="py-1f mt-9 block w-full flex-grow pr-3">
                    <div className="ml-auto mr-0 block w-full">
                      {editorContent && (
                        <TiptapViewer content={editorContent} />
                      )}
                    </div>
                  </div>

                  {/* <div className="content_divider_styles darker_border_color mt-12" /> */}

                  {/* <CommentsBlock /> */}

                  <div className="h-32" />
                </div>
              </div>

              {/* if the main drawer is open i.e showDesktopDrawer make the hide the sidebar sooner */}
              <EventSidebar />
            </div>
          </div>
        </main>
      </BodyWrapper>
    </>
  )
}

export default EventPage
