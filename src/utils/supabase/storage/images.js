/* eslint-disable import/prefer-default-export */
import supabase from '../../config/supabase'

const getImageUrl = async (bucket, path) => {
  if (bucket && path) {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path)
    if (data) return data.publicUrl
  }
  return null
}

export const uploadSupabaseImage = async (img, filename, bucket) => {
  if (!img || !filename || !bucket) return null
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(`images/${filename}`, img, {
      upsert: false
    })
  if (data && data.path) {
    const imageUrl = await getImageUrl(bucket, data.path)
    return imageUrl
  }
  if (error) return error
  return null
}

export const uploadProfileImages = async (slug, image, smallImage) => {
  if (slug && image && smallImage) {
    const imagePath = await uploadSupabaseImage(
      image,
      `${slug}profile`,
      'user-images'
    )
    const smallImagePath = await uploadSupabaseImage(
      smallImage,
      `${slug}profile-thumb`,
      'user-images'
    )
    if (
      (imagePath && imagePath.error) ||
      (smallImagePath && smallImagePath.error)
    )
      return null
    return { success: true, imagePath, smallImagePath }
  }
  return null
}
