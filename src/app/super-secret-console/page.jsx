'use client'

import { useState } from 'react'
import Nav from '../../components/nav/Nav'
import PageHead from '../../components/misc/PageHead'
import { uploadSortedEvents } from '../../utils/supabase/database/create'
import { fetchAllEvents } from '../../utils/supabase/database/fetch'

const ConsolePage = () => {
  const [docSlug, setDocSlug] = useState('all')
  const [dataError, setDataError] = useState(false)
  const [fetchError, setFetchError] = useState('')
  const [smoothies, setSmoothies] = useState(null)
  const [isEventsMode, setIsEventsMode] = useState(true)

  const fetchSmoothies = async () => {
    const events = await fetchAllEvents()
    if (events) {
      setSmoothies(events.reverse())
      setFetchError(null)
    } else {
      setSmoothies(null)
      setFetchError('no events')
    }
  }

  const randomizeSmoothies = () => {
    if (smoothies) {
      const newArr = Array.from(smoothies)
      newArr.sort(() => Math.random() - 0.5)
      setSmoothies(newArr)
    }
  }

  const reverseSmoothies = () => {
    if (smoothies) {
      const newArr = Array.from(smoothies)
      newArr.reverse()
      setSmoothies(newArr)
    }
  }

  const formatSmoothies = (events) => {
    const newEvents = events.map((event) => ({
      slug: event.slug,
      title: event.title,
      thumbnailImage: event.thumbnail_image,
      authorUsername: event.author_username,
      authorDisplayName: event.author_displayname,
      authorImageSmall: event.author_image_small,
      eventStartingDate: event.event_starting_date,
      eventType: event.event_type
    }))
    return newEvents
  }

  const uploadSortedSupabaseEvents = async () => {
    if (smoothies) {
      const newSmoothies = formatSmoothies(smoothies)
      const result = await uploadSortedEvents(newSmoothies, 'All', 'all')
      if (result) return result
    } else {
      setDataError(true)
      setTimeout(() => {
        setDataError(false)
      }, 500)
    }
    return null
  }

  const randomTags = ['hello', 'this', 'is', 'my', 'random', 'list']

  return (
    <>
      <PageHead title="Console" />
      <Nav hideSearch showLoginButton />

      <div className="page_padding_x max_page_width--narrow z-10 mx-auto flex w-full flex-col">
        <div
          className="text-lgf mt-20 text-center
        "
        >
          Fetch items, filter and save somewhere else
        </div>
        {fetchError && (
          <div
            className="mt-5 bg-red-50 text-center
                "
          >
            {fetchError}
          </div>
        )}
        <div className="box_radius mx-auto mt-5 w-full max-w-xl border">
          <div className="flex flex-col p-5 text-sm">
            <div className="flex w-full justify-end pb-5">
              <div className="box_radius overflow-hidden border">
                <button
                  type="button"
                  aria-label="fetch events"
                  className={`${
                    !isEventsMode && 'underline'
                  } border-r p-3 font-semibold underline-offset-2 hover:bg-neutral-50`}
                  onClick={() => {
                    setIsEventsMode(false)
                  }}
                >
                  Users mode
                </button>
                <button
                  type="button"
                  aria-label="randomize"
                  className={`${
                    isEventsMode && 'underline'
                  } p-3 font-semibold underline-offset-2 hover:bg-neutral-50`}
                  onClick={() => {
                    setIsEventsMode(true)
                  }}
                >
                  Events mode
                </button>
              </div>
            </div>
            <div className="flex w-full justify-end">
              <button
                type="button"
                aria-label="fetch events"
                className="box_radius mr-3 bg-neutral-100 p-3 font-semibold hover:bg-neutral-200"
                onClick={fetchSmoothies}
              >
                Fetch all events
              </button>
              <button
                type="button"
                aria-label="randomize"
                className="box_radius mr-3 bg-neutral-100 p-3 font-semibold hover:bg-neutral-200"
                onClick={randomizeSmoothies}
              >
                Randomize
              </button>
              <button
                type="button"
                aria-label="randomize"
                className="box_radius mr-3 bg-neutral-100 p-3 font-semibold hover:bg-neutral-200"
                onClick={reverseSmoothies}
              >
                Reverse
              </button>
              <button
                type="button"
                aria-label="upload"
                className="box_radius bg-accent-main p-3 font-semibold text-white hover:bg-accent-main-hover"
                onClick={uploadSortedSupabaseEvents}
              >
                Upload new events
              </button>
            </div>
            <div className="mt-5 w-full border-b" />
            <div className="mt-5 flex flex-col items-center py-1">
              <div className="w-full whitespace-nowrap">Tags found</div>
              <div className="mt-2.5 flex w-full">
                {randomTags.map((item, index) => (
                  <div
                    key={`consoletag${item}${index}`}
                    className="box_radius mr-1.5 cursor-pointer bg-neutral-100 px-4 py-2 hover:bg-neutral-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 w-full border-b" />
            <div className="mt-5 flex items-center py-1">
              <div className="mr-3 whitespace-nowrap">
                <b>Save to:</b> events_sorted_by_tag
              </div>
              <input
                value={docSlug}
                onChange={(e) => {
                  setDocSlug(e.target.value)
                }}
                placeholder="document name"
                className="box_radius w-full bg-neutral-100 p-3"
              />
            </div>
            <div
              className={`box_radius mt-5 min-h-[20rem] w-full border-2 bg-neutral-100 p-4 ${
                dataError ? 'border-red-400' : 'border-transparent'
              }`}
            >
              <pre className=" overflow-hidden">
                {smoothies && JSON.stringify(smoothies, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConsolePage
