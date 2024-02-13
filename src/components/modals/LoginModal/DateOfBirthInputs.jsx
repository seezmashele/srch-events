import Select from 'react-select'
import {
  dayOptions,
  monthOptions,
  yearOptions
} from '../../../utils/constants/time'

/* eslint-disable no-unused-vars */
const DateOfBirthSelector = ({
  setBirthDay,
  setBirthMonth,
  setBirthYear,
  dateOfBirthError
}) => (
  <>
    {/* section: date of birth ------------------------- */}

    <div className="mt-5 text-sm font-semibold">
      Date of birth<span className="text-red-500"> *</span>
    </div>
    <div className="mt-1.5 flex flex-nowrap gap-2 text-sm">
      <Select
        className="w-3/5"
        placeholder="Day"
        options={dayOptions}
        components={{ DropdownIndicator: null }}
        classNames={{
          control: () =>
            'force_rounded_lg border-neutral-500 w-full hover:border-neutral-500',
          input: () => 'px-1.5',
          option: () => 'px-1.5 py-1.5',
          singleValue: () => 'px-1.5',
          placeholder: () => 'px-1.5',
          valueContainer: () => 'force_rounded_lg'
        }}
        onChange={(values) => {
          setBirthDay(values)
        }}
      />
      <Select
        className="w-full"
        placeholder="Month"
        options={monthOptions}
        components={{ DropdownIndicator: null }}
        classNames={{
          control: () =>
            'force_rounded_lg border-neutral-500 w-full hover:border-neutral-500',
          input: () => 'px-1.5',
          option: () => 'px-1.5 py-1.5',
          singleValue: () => 'px-1.5',
          placeholder: () => 'px-1.5',
          valueContainer: () => 'force_rounded_lg'
        }}
        onChange={(values) => {
          setBirthMonth(values)
        }}
      />
      <Select
        className="w-3/5"
        placeholder="Year"
        options={yearOptions}
        components={{ DropdownIndicator: null }}
        classNames={{
          control: () =>
            'force_rounded_lg border-neutral-500 w-full hover:border-neutral-500',
          input: () => 'px-1.5',
          option: () => 'px-1.5 py-1.5',
          singleValue: () => 'px-1.5',
          placeholder: () => 'px-1.5',
          valueContainer: () => 'force_rounded_lg'
        }}
        onChange={(values) => {
          setBirthYear(values)
        }}
      />
    </div>
    {dateOfBirthError && (
      <div className="mt-2 w-full text-sm text-red-500">
        This field is required
      </div>
    )}
  </>
)

export default DateOfBirthSelector
