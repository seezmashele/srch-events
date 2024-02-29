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
      ageRequirements,
      authorDisplayName,
      authorImageSmall,
      authorProfileColor,
      authorUsername,
      canAttendOnline,
      city,
      editorContent,
      endDate,
      endTime,
      eventTitle,
      pricesStartAt,
      resizedCover,
      resizedThumbnail,
      startDate,
      startTime,
      tagsArray,
      venueName
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
    const startDateISO = convertDateToISO(startDate)
    const endDateISO = convertDateToISO(endDate)

    return {
      age_requirements: ageRequirements,
      author_displayname: authorDisplayName,
      author_image_small: authorImageSmall,
      author_profile_color: authorProfileColor,
      author_username: authorUsername,
      can_attend_online: canAttendOnline,
      city,
      cover_image: coverPath,
      editor_content_html: editorContent || '',
      end_date: endDateISO,
      end_time: endTime,
      prices_start_at: pricesStartAt,
      slug,
      start_date: startDateISO,
      start_time: startTime,
      tags_array: tagsArray,
      thumbnail_image: thumbnailPath,
      title: eventTitle,
      venue: venueName
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

const findSlugId = async (tableName, slug) => {
  const { data, error } = await supabase
    .from(tableName)
    .select()
    .eq('slug', slug)
    .limit(1)
    .maybeSingle()
  if (data) return data.id
  if (error) return null
  return null
}

export const uploadRecommendedTags = async (jsonTags) => {
  if (jsonTags) {
    try {
      const tableName = 'recommended_tags'
      const slug = 'home_page_recommended_tags'
      const slugId = await findSlugId(tableName, slug)

      if (slugId) {
        const { error } = await supabase
          .from(tableName)
          .update({ tags: jsonTags })
          .eq('id', slugId)
        if (!error) {
          return { success: true }
        }
      } else {
        const { error } = await supabase.from(tableName).upsert({
          slug,
          tags: jsonTags
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

export const uploadSortedEvents = async (events, selectedTag) => {
  if (events) {
    try {
      const slug = selectedTag
      const title = selectedTag
      const slugId = await findSlugId('events_sorted_by_tag', slug)

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
