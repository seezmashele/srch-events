'use client'

import { createContext, useContext, useState } from 'react'

const AppContext = createContext()
export const useApp = () => useContext(AppContext)

export const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState()
  const [showDrawer, setShowDrawer] = useState(true)
  const [showEventModal, setShowEventModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const changeDarkMode = (value) => {
    setDarkMode(value)
  }

  const changeShowDrawer = (value) => {
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
    changeShowDrawer,
    changeShowEventModal,
    changeShowLoginModal,
    darkMode,
    showDrawer,
    showEventModal,
    showLoginModal
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}