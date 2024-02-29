import { formatDistance } from 'date-fns'

export const getDateDiff = (date) =>
  formatDistance(new Date(date), new Date(), { addSuffix: true })

export const getPostAge = (item) => {
  if (item) {
    if (item.placeholder) return null
    if (item.date_updated) return getDateDiff(item.date_updated)
    if (item.date_created) return getDateDiff(item.date_created)
  }
  return null
}

// export const addTimeToDate = (date, hours, minutes, ampm) => {
//   if (!date || !hours || !ampm) return null

//   const newDate = new Date(date)
//   let hoursToSet

//   if (ampm === 'AM') {
//     hoursToSet = hours === 12 ? 0 : hours
//   } else {
//     hoursToSet = hours === 12 ? 12 : hours + 12
//   }
//   newDate.setHours(hoursToSet, minutes)

//   return newDate
// }

export const addTimeToDate = (date, hours, minutes) => {
  if (!date) return null

  const newDate = new Date(date)

  if (hours !== null && minutes !== null) newDate.setHours(hours, minutes)

  return newDate
}
