const range = (start, end) =>
  Array(end - start + 1)
    .fill()
    .map((unused, index) => start + index)

const currentYear = new Date().getFullYear()

const daysArray = range(1, 31)
const yearsArray = range(1900, currentYear || 2023).reverse()

export const dayOptions = daysArray.map((val) => ({ value: val, label: val }))
export const yearOptions = yearsArray.map((val) => ({ value: val, label: val }))
export const monthOptions = [
  { label: 'January', value: 'jan' },
  { label: 'February', value: 'feb' },
  { label: 'March', value: 'mar' },
  { label: 'April', value: 'apr' },
  { label: 'May', value: 'may' },
  { label: 'June', value: 'jun' },
  { label: 'July', value: 'jul' },
  { label: 'August', value: 'aug' },
  { label: 'September', value: 'sep' },
  { label: 'October', value: 'oct' },
  { label: 'November', value: 'nov' },
  { label: 'December', value: 'dec' }
]

export const timePickerAMPM = [
  {
    label: 'am',
    value: 'AM'
  },
  {
    label: 'pm',
    value: 'PM'
  }
]

export const timePickerHours = [
  {
    label: '00',
    value: 0
  },
  {
    label: '01',
    value: 1
  },
  {
    label: '02',
    value: 2
  },
  {
    label: '03',
    value: 3
  },
  {
    label: '04',
    value: 4
  },
  {
    label: '05',
    value: 5
  },
  {
    label: '06',
    value: 6
  },
  {
    label: '07',
    value: 7
  },
  {
    label: '08',
    value: 8
  },
  {
    label: '09',
    value: 9
  },
  {
    label: '10',
    value: 10
  },
  {
    label: '11',
    value: 11
  },
  {
    label: '12',
    value: 12
  },
  {
    label: '13',
    value: '13'
  },
  {
    label: '14',
    value: '14'
  },
  {
    label: '15',
    value: '15'
  },
  {
    label: '16',
    value: '16'
  },
  {
    label: '17',
    value: '17'
  },
  {
    label: '18',
    value: '18'
  },
  {
    label: '19',
    value: '19'
  },
  {
    label: '20',
    value: '20'
  },
  {
    label: '21',
    value: '21'
  },
  {
    label: '22',
    value: '22'
  },
  {
    label: '23',
    value: '23'
  }
]

export const timePickerMinutes = [
  {
    label: '00',
    value: 0
  },
  {
    label: '05',
    value: 5
  },
  {
    label: '10',
    value: 10
  },
  {
    label: '15',
    value: 15
  },
  {
    label: '20',
    value: 20
  },
  {
    label: '25',
    value: 25
  },
  {
    label: '30',
    value: 30
  },
  {
    label: '35',
    value: 35
  },
  {
    label: '40',
    value: 40
  },
  {
    label: '45',
    value: 45
  },
  {
    label: '50',
    value: 50
  },
  {
    label: '55',
    value: 55
  }
]
