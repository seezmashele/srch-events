/* eslint-disable import/prefer-default-export */
import countries from 'countries-list/minimal/countries.en.min.json'

const countriesArray = Object.values(countries)
const mappedCountries = countriesArray.sort().map((item) => ({
  label: item,
  value: item
}))
// const mappedCountries = countriesArray.map(([key, value]) => ({
//     label: value,
//     value: key
//   }))

export const countriesList = mappedCountries
