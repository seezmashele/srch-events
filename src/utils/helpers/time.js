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
