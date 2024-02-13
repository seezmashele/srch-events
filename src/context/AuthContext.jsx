/* eslint-disable no-unused-vars */

'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { getCurrentUserProfile } from '../utils/supabase/database/fetch'
import supabase from '../utils/config/supabase'
import { accountColorsList } from '../utils/constants/colors'

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  const [accountUsername, setAccountUsername] = useState('')
  const [accountDisplayName, setAccountDisplayName] = useState('')
  const [accountImage, setAccountImage] = useState('')
  const [accountImageSmall, setAccountImageSmall] = useState('')
  const [accountColor, setAccountColor] = useState(accountColorsList[0])
  const [accountColorNumber, setAccountColorNumber] = useState(0)

  useEffect(() => {
    const getUserData = async (uid) => {
      const data = await getCurrentUserProfile(uid)

      if (data) {
        setAccountImage(data.profileImageSmall)
        setAccountImageSmall(data.profileImageSmall)
        setAccountUsername(data.username)
        setAccountDisplayName(data.displayName)
        setAccountColor(accountColorsList[data.profileColor || 0])
        setAccountColorNumber(data.profileColor || 0)
      }
    }

    const clearAccountDetails = () => {
      setAccountImage('')
      setAccountImageSmall('')
      setAccountUsername('')
      setAccountDisplayName('')
      setAccountColorNumber(0)
    }

    const subscription = supabase.auth.onAuthStateChange((event, session) => {
      // console.log('event', event, 'session', session)

      if (session && session.user) {
        setCurrentUser(true)
      } else {
        setCurrentUser(null)
      }

      if (event === 'INITIAL_SESSION') {
        if (session && session.user) getUserData(session.user.id)
      } else if (event === 'SIGNED_IN') {
        if (session && session.user) getUserData(session.user.id)
      } else if (event === 'SIGNED_OUT') {
        clearAccountDetails()
      } else if (event === 'PASSWORD_RECOVERY') {
        // handle password recovery event
      } else if (event === 'TOKEN_REFRESHED') {
        // handle token refreshed event
      } else if (event === 'USER_UPDATED') {
        // handle user updated event
      }
    })
  }, [])

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    accountColor,
    accountColorNumber,
    accountDisplayName,
    accountImage,
    accountImageSmall,
    accountUsername,
    currentUser
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
