/* eslint-disable import/prefer-default-export */

const generateRandomDate = (from, to) =>
  new Date(from.getTime() + Math.random() * (to.getTime() - from.getTime()))

export const getRandomEventDate = () =>
  generateRandomDate(new Date(), new Date(2024, 12, 30))
