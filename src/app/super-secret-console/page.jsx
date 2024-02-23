'use client'

import { useState } from 'react'
import Nav from '../../components/layout/Nav'
import PageHead from '../../components/misc/PageHead'
import {
  uploadSortedEvents,
  uploadRecommendedTags
} from '../../utils/supabase/database/create'
import { fetchAllEvents } from '../../utils/supabase/database/fetch'

const ConsolePage = () => {
  // const [docSlug, setDocSlug] = useState('all')
  const [dataError, setDataError] = useState(false)
  const [fetchError, setFetchError] = useState('')
  const [fetchedEvents, setFetchedEvents] = useState(null)
  const [isEventsMode, setIsEventsMode] = useState(true)
  const [tagsFound, setTagsFound] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [filteredEvents, setFilteredEvents] = useState(null)

  const getAllTags = (events) => {
    const allTags = new Set()
    events
      .flatMap((event) => event.tags_array)
      .forEach((tag) => allTags.add(tag))

    return Array.from(allTags)
  }

  const getFilteredEvents = (events, tag) => {
    if (!events) return null
    if (tag === 'all') return events

    return events.filter((event) => event.tags_array.includes(tag))
  }

  const sortTagsList = (tags) => {
    if (!tags) return null
    const newTags = Array.from(tags)

    newTags.push('all')
    newTags.sort()

    return newTags
  }

  const fetchEventsFromSupabase = async () => {
    const events = await fetchAllEvents()
    if (events) {
      const allTags = getAllTags(events)
      const sortedTags = sortTagsList(allTags)
      const reversedEvents = events.reverse()

      setTagsFound(sortedTags)
      setSelectedCategory('all')
      setFetchedEvents(reversedEvents)
      setFilteredEvents(reversedEvents)
      setFetchError(null)
    } else {
      setTagsFound(null)
      setFetchedEvents(null)
      setFilteredEvents(null)
      setSelectedCategory(null)
      setFetchError('no events')
    }
  }

  const randomizeFilteredEvents = () => {
    if (filteredEvents) {
      const newArr = Array.from(filteredEvents)
      newArr.sort(() => Math.random() - 0.5)
      setFilteredEvents(newArr)
    }
  }

  const reverseFilteredEvents = () => {
    if (filteredEvents) {
      const newArr = Array.from(filteredEvents)
      newArr.reverse()
      setFilteredEvents(newArr)
    }
  }

  const formatEventsToUpload = (events) => {
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

  const formatAndUploadSortedEvents = async (events, category) => {
    if (events) {
      const formattedEvents = formatEventsToUpload(events)
      const result = await uploadSortedEvents(formattedEvents, category)
      if (result) return result
    } else {
      setDataError(true)
      setTimeout(() => {
        setDataError(false)
      }, 1000)
    }
    return null
  }

  const tagsToJson = (tags) => {
    if (!tags) return null
    const tagsArray = tags.map((tag) => ({ title: tag, slug: tag }))
    return JSON.stringify(tagsArray)
  }

  const uploadTagsFound = async () => {
    if (tagsFound && tagsFound.length > 1) {
      const jsonTags = tagsToJson(tagsFound)
      const result = await uploadRecommendedTags(jsonTags)
      if (result) return result
    }
    return { error: 'tags not uploaded' }
  }

  const uploadEventsByTags = async () => {
    if (fetchedEvents && tagsFound) {
      tagsFound.forEach((tag) => {
        const newEvents = getFilteredEvents(fetchedEvents, tag)
        // console.log('new events', tag, newEvents)
        formatAndUploadSortedEvents(newEvents, tag)
      })
    }
  }

  const changeSelectedTag = (events, tag) => {
    const newEvents = getFilteredEvents(events, tag)

    setFilteredEvents(newEvents)
    setSelectedCategory(tag)
  }

  return (
    <>
      <PageHead title="Console" />
      <Nav hideSearch showLoginButton />

      <div className="page_padding_x max_page_width--narrow z-10 mx-auto flex w-full select-none flex-col pt-16">
        {fetchError && (
          <div
            className="mt-4 bg-red-50 text-center
                "
          >
            {fetchError}
          </div>
        )}
        <div className="box_radius mx-auto mt-4 w-full max-w-xl border">
          <div className="flex flex-col p-5 text-sm">
            <div className="flex w-full justify-end pb-5">
              <div className="flex gap-1 overflow-hidden">
                <button
                  type="button"
                  aria-label="fetch events"
                  className={`${
                    !isEventsMode && 'text-accent-main'
                  } box_radius px-2 py-1.5 font-semibold hover:bg-neutral-50`}
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
                    isEventsMode && 'text-accent-main'
                  } box_radius px-2 py-1.5 font-semibold hover:bg-neutral-50`}
                  onClick={() => {
                    setIsEventsMode(true)
                  }}
                >
                  Events mode
                </button>
              </div>
            </div>
            <div className="flex w-full justify-end gap-2">
              <button
                type="button"
                aria-label="fetch events"
                className="box_radius bg-neutral-100 px-3 py-2 font-semibold hover:bg-neutral-200"
                onClick={fetchEventsFromSupabase}
              >
                Fetch events
              </button>
              <button
                type="button"
                aria-label="randomize"
                className="box_radius bg-neutral-100 px-3 py-2 font-semibold hover:bg-neutral-200"
                onClick={randomizeFilteredEvents}
              >
                Randomize
              </button>
              <button
                type="button"
                aria-label="randomize"
                className="box_radius bg-neutral-100 px-3 py-2 font-semibold hover:bg-neutral-200"
                onClick={reverseFilteredEvents}
              >
                Reverse
              </button>
              <button
                type="button"
                aria-label="upload"
                className="box_radius bg-accent-main px-3 py-2 font-semibold text-white hover:bg-accent-main-hover"
                onClick={() => {
                  formatAndUploadSortedEvents(filteredEvents, selectedCategory)
                }}
              >
                Upload selected category
              </button>
            </div>
            <div className="mt-4 w-full border-b" />
            <div className="mt-4 flex items-center">
              <div className="mr-3 whitespace-nowrap">
                <b>Save to:</b> events_sorted_by_tag
              </div>
              <p className="box_radius w-full select-none bg-neutral-100 px-3 py-2">
                {selectedCategory}
              </p>
            </div>
            <div className="mt-4 w-full border-b" />
            <div className="mt-4 flex flex-col items-center">
              <div className="flex w-full items-center justify-end gap-2">
                {/* <div className="w-full whitespace-nowrap">Tags found</div> */}
                <button
                  type="button"
                  aria-label="upload"
                  className="box_radius text-nowrap bg-accent-main px-3 py-2 font-semibold text-white hover:bg-accent-main-hover"
                  onClick={uploadTagsFound}
                >
                  Upload tags
                </button>
                <button
                  type="button"
                  aria-label="upload"
                  className="box_radius text-nowrap bg-accent-main px-3 py-2 font-semibold text-white hover:bg-accent-main-hover"
                  onClick={uploadEventsByTags}
                >
                  Upload all events by category
                </button>
              </div>
              <div className="mt-2.5 flex w-full flex-wrap">
                {tagsFound &&
                  tagsFound.map((item, index) => (
                    <button
                      type="button"
                      key={`console-tag${item}${index}`}
                      onClick={() => {
                        changeSelectedTag(fetchedEvents, item)
                      }}
                      className={`${selectedCategory === item ? 'bg-black text-white' : 'bg-neutral-100 hover:bg-neutral-200'} box_radius mb-1.5 mr-1.5 cursor-pointer px-2 py-1.5 `}
                    >
                      {item}
                    </button>
                  ))}
              </div>
            </div>

            <div
              className={`box_radius mt-4 min-h-[20rem] w-full border-2 bg-neutral-100 p-4 ${
                dataError ? 'border-red-400' : 'border-transparent'
              }`}
            >
              <pre className=" overflow-hidden">
                {filteredEvents && JSON.stringify(filteredEvents, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConsolePage
