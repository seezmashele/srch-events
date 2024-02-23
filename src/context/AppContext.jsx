'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { fetchRecommendedTags } from '../utils/supabase/database/fetch'

const AppContext = createContext()
export const useApp = () => useContext(AppContext)

export const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState()
  const [showDesktopDrawer, setShowDrawer] = useState(true)
  const [showEventModal, setShowEventModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [homePageCategory, setHomePageCategory] = useState('all')
  const [recommendedHomePageTags, setRecommendedHomePageTags] = useState(null)

  const useRecommendedHomePageTags = () => {
    useEffect(() => {
      const getTags = async () => {
        const tags = await fetchRecommendedTags()
        setRecommendedHomePageTags(tags || null)
      }
      getTags()
    }, [])

    return {
      recommendedHomePageTags
    }
  }

  const changeDarkMode = (value) => {
    setDarkMode(value)
  }

  const changeHomePageCategory = (value) => {
    setHomePageCategory(value)
  }

  const changeShowDesktopDrawer = (value) => {
    setShowDrawer(value)
  }

  const changeShowEventModal = (value) => {
    setShowEventModal(value)
  }

  const changeShowLoginModal = (value) => {
    setShowLoginModal(value)
  }

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    changeDarkMode,
    changeHomePageCategory,
    changeShowDesktopDrawer,
    changeShowEventModal,
    changeShowLoginModal,
    useRecommendedHomePageTags,
    darkMode,
    homePageCategory,
    recommendedHomePageTags,
    showDesktopDrawer,
    showEventModal,
    showLoginModal
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
