/* eslint-disable import/prefer-default-export */

export const checkEventSubmitData = (data) => {
  if (data) {
    const {
      authorUsername,
      startDateWithTime,
      eventTitle,
      resizedCover,
      resizedThumbnail,
      tagsArray
    } = data
    if (
      authorUsername &&
      startDateWithTime &&
      eventTitle &&
      resizedCover &&
      resizedThumbnail &&
      tagsArray &&
      tagsArray.length > 0
    ) {
      return true
    }
  }
  return false
}
