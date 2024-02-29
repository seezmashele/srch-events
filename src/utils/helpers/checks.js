/* eslint-disable import/prefer-default-export */

export const checkEventSubmitData = (data) => {
  if (data) {
    const {
      authorUsername,
      eventTitle,
      resizedCover,
      resizedThumbnail,
      startDate,
      startTime,
      venueName,
      tagsArray
    } = data
    if (
      authorUsername &&
      eventTitle &&
      resizedCover &&
      resizedThumbnail &&
      startDate &&
      startTime &&
      venueName &&
      tagsArray &&
      tagsArray.length > 0
    ) {
      return true
    }
  }
  return false
}
