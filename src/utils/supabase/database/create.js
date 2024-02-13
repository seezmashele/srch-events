/* eslint-disable import/prefer-default-export */

import supabase from '../../config/supabase'
import { stringToSlug } from '../../helpers/strings'
import { uploadSupabaseImage } from '../storage/images'

const convertDateToISO = (date) => {
  if (date && date.toISOString) {
    return date.toISOString()
  }
  return null
}

const formatEventSubmitData = async (data) => {
  if (data) {
    const {
      eventType,
      eventTitle,
      startDateWithTime,
      eventEndDate,
      authorProfileColor,
      tagsArray,
      resizedCover,
      resizedThumbnail,
      editorContent,
      authorUsername,
      authorDisplayName,
      authorImageSmall
    } = data
    const slug = stringToSlug(eventTitle)

    const coverPath = await uploadSupabaseImage(
      resizedCover,
      `${slug}cover`,
      'event-images'
    )
    const thumbnailPath = await uploadSupabaseImage(
      resizedThumbnail,
      `${slug}thumb`,
      'event-images'
    )
    const startDateISO = convertDateToISO(startDateWithTime)
    const endDateISO = convertDateToISO(eventEndDate)

    return {
      event_ending_date: endDateISO,
      event_starting_date: startDateISO,
      author_displayname: authorDisplayName,
      author_image_small: authorImageSmall,
      author_profile_color: authorProfileColor,
      author_username: authorUsername,
      cover_image: coverPath,
      editor_content_html: editorContent || '',
      event_type: eventType,
      slug,
      tags_array: tagsArray,
      thumbnail_image: thumbnailPath,
      title: eventTitle
    }
  }
  return null
}

export const createUserProfile = async (
  sbuid,
  username,
  accountName,
  profileImage
) => {
  const fileName = stringToSlug(accountName)
  const profileImagePath = await uploadSupabaseImage(
    profileImage,
    `${fileName}large`,
    'user-images'
  )
  const { error } = await supabase.from('profiles').upsert({
    sbuid,
    username,
    display_name: accountName,
    profile_image: profileImagePath,
    profile_image_small: profileImagePath
  })
  if (error) return { error }
  return { success: true }
}

const findSlugId = async (slug) => {
  const { data, error } = await supabase
    .from('events_sorted_by_tag')
    .select()
    .eq('slug', slug)
    .limit(1)
    .maybeSingle()
  if (data) return data.id
  if (error) return null
  return null
}

export const uploadSortedEvents = async (events) => {
  if (events) {
    try {
      const slug = 'all'
      const title = 'All'
      const slugId = await findSlugId(slug)

      if (slugId) {
        const { error } = await supabase
          .from('events_sorted_by_tag')
          .update({ events })
          .eq('id', slugId)
        if (!error) {
          return { success: true }
        }
      } else {
        const { error } = await supabase.from('events_sorted_by_tag').upsert({
          slug,
          title,
          events
        })

        if (error) return { error }

        return { success: true }
      }
      return { success: true }
    } catch (error) {
      return { error }
    }
  }
  return { error: { message: 'no data' } }
}

export const uploadSupabaseEvent = async (data) => {
  if (data) {
    try {
      const formattedData = await formatEventSubmitData(data)
      const { error } = await supabase.from('events').insert(formattedData)

      if (error) return { error }

      return { success: true }
    } catch (error) {
      return { error }
    }
  }
  return { error: { message: 'no data' } }
}
