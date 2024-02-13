/* eslint-disable import/prefer-default-export */

export const formatLikesNumber = (num) => {
  const shortenedNum = Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(num)
  return shortenedNum
}
