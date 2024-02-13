'use client'

/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useState, useEffect } from 'react'

import {
  placeholderArray4,
  placeholderArray5,
  placeholderArray6,
  placeholderArray12,
} from '../utils/constants/placeholders'
import { fetchSortedEvents } from '../utils/supabase/database/fetch'

const DatabaseContext = createContext()

export const useDatabase = () => useContext(DatabaseContext)

// use state to store the fetched doc
// use memo to store the usable arrays for each page, i.e home events 1

export const DatabaseProvider = ({ children }) => {
  const [homePageEvents, setHomePageEvents] = useState(null)
  const [homePageEvents1, setHomePageEvents1] = useState(placeholderArray12)
  const [homePageEvents2, setHomePageEvents2] = useState(placeholderArray12)
  const [homePageEvents3, setHomePageEvents3] = useState(placeholderArray12)
  const [homePageArticles, setHomePageArticles] = useState(null)
  const [homePageArticles1, setHomePageArticles1] = useState(placeholderArray6)
  const [homePageArticles2, setHomePageArticles2] = useState(placeholderArray6)
  const [homePageArticles3, setHomePageArticles3] = useState(placeholderArray6)
  const [eventsPageEvents, setEventsPageEvents] = useState(null)
  const [eventsPageEvents1, setEventsPageEvents1] = useState(placeholderArray12)
  const [eventsPageEvents2, setEventsPageEvents2] = useState(placeholderArray4)
  const [trendingBarStories, setTrendingBarStories] =
    useState(placeholderArray5)

  const useTrendingBarStories = () => {
    const error = null
    const data = null
    useEffect(() => {
      // use useReducer to prevent re-renders
      if (data && data.articles) {
        const newArray1 = Array.from(data.articles)
        newArray1.splice(4)
        setTrendingBarStories(newArray1)
      }
    }, [data])

    return { trendingBarStories, trendingBarStoriesError: error }
  }

  const useHomePageEvents = () => {
    useEffect(() => {
      const fetchData = async () => {
        const items = await fetchSortedEvents()
        if (items) setHomePageEvents(items)
      }
      if (!homePageEvents) fetchData()
      if (homePageEvents) {
        const newArray1 = Array.from(homePageEvents)
        const newArray2 = Array.from(homePageEvents)
        const newArray3 = Array.from(homePageEvents)
        newArray2.reverse()
        newArray3.sort(() => Math.random() - 0.5)
        setHomePageEvents1(newArray1)
        setHomePageEvents2(newArray2)
        setHomePageEvents3(newArray3)
      }
    }, [homePageEvents])

    return {
      homePageEvents1,
      homePageEvents2,
      homePageEvents3,
      homePageEventsError: null,
    }
  }

  const useHomePageArticles = () => {
    const error = null
    const data = null

    useEffect(() => {
      // use useReducer to prevent re-renders
      if (data && data.articles) setHomePageArticles(data.articles)
    }, [data])

    useEffect(() => {
      if (homePageArticles) {
        const newArray1 = Array.from(homePageArticles).reverse()
        const newArray2 = newArray1.splice(6)
        const newArray3 = newArray2.splice(8)
        newArray3.splice(8)
        setHomePageArticles1(newArray1)
        setHomePageArticles2(newArray2)
        setHomePageArticles3(newArray3)
      }
    }, [homePageArticles])

    return {
      homePageArticles1,
      homePageArticles2,
      homePageArticles3,
      homePageArticlesError: error,
    }
  }

  const useEventsPageEvents = () => {
    const error = null
    const data = null

    useEffect(() => {
      // use useReducer to prevent re-renders
      if (data && data.events) setEventsPageEvents(data.events)
    }, [data])

    useEffect(() => {
      if (eventsPageEvents) {
        const newArray1 = Array.from(eventsPageEvents).reverse()
        const newArray2 = newArray1.splice(20)
        newArray2.splice(20)
        setEventsPageEvents1(newArray1)
        setEventsPageEvents2(newArray2)
      }
    }, [eventsPageEvents])

    return {
      eventsPageEvents1,
      eventsPageEvents2,
      eventsPageEventsError: error,
    }
  }

  return (
    <DatabaseContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        useHomePageEvents,
        useHomePageArticles,
        useEventsPageEvents,
        useTrendingBarStories,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  )
}
