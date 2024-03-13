/* eslint-disable no-underscore-dangle */
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 8)
const nanoidLong = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 24)

export const shortenFileName = (filename) => {
  if (filename) {
    const dotIndex = filename.lastIndexOf('.')
    return filename
      .substring(0, dotIndex > -1 && dotIndex < 8 ? dotIndex : 8)
      .replace(/\s/g, '')
  }
  return ''
}

export const getProfileImageSlug = (string) => {
  if (string && string.replace) {
    const removeApostrophes = string.replace(/'|\u2019/g, '')
    const normalString = removeApostrophes
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
    const string2 = normalString.replace(/[^a-zA-Z0-9]/g, ' ')
    const string3 = string2.replace(/\s+/g, ' ').substring(0, 50).trim()
    const string4 = `${string3.replace(/\s/g, '-').toLowerCase()}${nanoidLong()}`
    return string4
  }
  return null
}

export const stringToSlug = (string) => {
  if (string) {
    const removeApostrophes = string.replace(/'|\u2019/g, '')
    const normalString = removeApostrophes
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
    const string2 = normalString.replace(/[^a-zA-Z0-9]/g, ' ')
    const string3 = string2.replace(/\s+/g, ' ').substring(0, 50).trim()
    const string4 = `${string3.replace(/\s/g, '-').toLowerCase()}-${nanoid()}`
    return string4
  }
  return null
}

export const stringToUsername = (string) => {
  if (string && string.substring) {
    const normalString = string.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const string2 = normalString.replace(/[^a-zA-Z0-9]/g, ' ')
    const string3 = string2.replace(/\s+/g, ' ').substring(0, 50).trim()
    const string4 = string3.replace(/\s/g, '-').toLowerCase()
    return string4
  }
  return null
}
