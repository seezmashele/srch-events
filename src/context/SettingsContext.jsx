'use client'

import { createContext, useContext, useState } from 'react'

const SettingsContext = createContext()
export const useSettings = () => useContext(SettingsContext)

export const SettingsProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState()

  const changeDarkMode = (value) => {
    setDarkMode(value)
  }

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    darkMode,
    changeDarkMode
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}
