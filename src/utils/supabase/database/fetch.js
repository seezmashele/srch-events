/* eslint-disable import/prefer-default-export */

import { format } from 'date-fns'
import supabase from '../../config/supabase'

export const getCurrentUserProfile = async (uid) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('id', uid)
      .limit(1)
      .maybeSingle()

    if (data) {
      return {
        id: data.id,
        username: data.username,
        displayName: data.display_name,
        profileImage: data.profile_image_small,
        profileImageSmall: data.profile_image_small,
        profileColor: data.profile_color
      }
    }
    if (error) return null
  } catch (error) {
    return error
  }
  return null
}

export const fetchAllEvents = async () => {
  const { data, error } = await supabase.from('events').select()
  if (data) return data
  if (error) return null
  return null
}

export const fetchEventBySlug = async (slug) => {
  const { data, error } = await supabase
    .from('events')
    .select()
    .eq('slug', slug)
    .limit(1)
    .maybeSingle()

  if (data) {
    return {
      authorDisplayName: data.author_displayname,
      authorImageSmall: data.author_image_small,
      authorUsername: data.author_username,
      authorProfileColor: data.author_profile_color,
      coverImage: data.cover_image,
      dateCreated: data.created_at,
      city: data.city,
      startDate: data.start_date,
      startTime: data.start_time,
      endDate: data.end_date,
      endTime: data.end_time,
      eventType: data.event_type,
      ageRequirements: data.age_requirements,
      editorContent: data.editor_content_html,
      venue: data.venue,
      tags: data.tags_array,
      id: data.id,
      title: data.title
    }
  }
  if (error) return { error }
  return null
}

export const fetchProfileBySlug = async (slug) => {
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('username', slug)
    .limit(1)
    .maybeSingle()

  if (data) {
    return {
      id: data.id,
      bio: data.bio,
      username: data.username,
      displayName: data.display_name,
      profileImage: data.profile_image,
      dateCreated: data.created_at,
      eventsId: data.events_id,
      profileColor: data.profile_color
    }
  }
  if (error) return null
  return null
}

const formatEventDate = (date, currentYear) => {
  // check if date is valid
  if (date) {
    if (date.getFullYear() !== currentYear)
      return format(date, 'eee, MMM d, yyyy')

    return format(date, 'eee, MMM d')
  }
  return null
}

const formatEvents = (events) =>
  events.map((event) => {
    const startingDate = event.startDate
    const date1 = new Date(startingDate)
    const currentYear = new Date().getFullYear()
    const formattedStartingDate = formatEventDate(date1, currentYear)

    return {
      slug: event.slug,
      title: event.title,
      city: event.city,
      thumbnailImage: event.thumbnailImage,
      authorUsername: event.authorUsername,
      authorDisplayName: event.authorDisplayName,
      authorImageSmall: event.authorImageSmall,
      startDate: formattedStartingDate,
      canAttendOnline: event.canAttendOnline
    }
  })

export const fetchEventsByTag = async (tag) => {
  const { data, error } = await supabase
    .from('events_sorted_by_tag')
    .select()
    .eq('slug', tag)
    .limit(1)
    .maybeSingle()

  if (data) return { events: formatEvents(data.events) }
  if (error) return { error }
  return null
}

export const fetchRecommendedTags = async () => {
  const { data, error } = await supabase
    .from('recommended_tags')
    .select()
    .eq('slug', 'home_page_recommended_tags')
    .limit(1)
    .maybeSingle()

  if (data) return { tags: JSON.parse(data.tags) }
  if (error) return { error }
  return null
}
