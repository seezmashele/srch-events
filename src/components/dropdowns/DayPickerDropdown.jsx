/* eslint-disable no-console */
import { Menu } from '@headlessui/react'
import { Calendar4 } from 'react-bootstrap-icons'
import { DayPicker } from 'react-day-picker'
import { format } from 'date-fns'

const DayPickerDropdown = ({ setEventDate, selectedDate }) => {
  const formatEventDate = (date) => {
    // TODO check if date is valid
    if (date) {
      const day = format(date, 'eee')
      const mainDate = format(date, 'PP')

      return `${day}, ${mainDate}`
    }
    return null
  }

  return (
    <Menu as="div" className="relative w-full">
      {() => (
        <>
          <Menu.Button className="input_radius editor_border_color flex w-full items-center border bg-white p-2.5 text-sm ">
            <Calendar4 className="ml-1.5 mr-3.5" />
            <span
              className={`${selectedDate ? 'font-semibold' : 'text-neutral-400'}`}
            >
              {(selectedDate && `${formatEventDate(selectedDate)}`) ||
                'Pick a date'}
            </span>
          </Menu.Button>
          <Menu.Items className="dropdown_bg  dropdown_shadow input_radius editor_border_color absolute right-0 z-20 mt-3 origin-top-right divide-y divide-neutral-100 border bg-white px-0 text-black focus:outline-none dark:text-white">
            <Menu.Item>
              {({ close }) => (
                <DayPicker
                  mode="single"
                  onSelect={(value) => {
                    console.log('value', value, typeof value)
                    setEventDate(value || null)
                    close()
                  }}
                />
              )}
            </Menu.Item>
          </Menu.Items>
        </>
      )}
    </Menu>
  )
}

export default DayPickerDropdown
