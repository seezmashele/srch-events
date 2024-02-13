import Select from 'react-select'

const SelectInput = ({ options, setValue, placeholder }) => (
  <Select
    className="w-full text-sm"
    placeholder={placeholder}
    options={options}
    components={{ DropdownIndicator: null }}
    classNames={{
      control: () =>
        'force_rounded_lg border-neutral-500 w-full hover:border-neutral-500',
      input: () => 'px-2',
      option: () => 'px-5 py-1.5',
      singleValue: () => 'px-2 py-2 font-semibold',
      placeholder: () => 'px-2 py-2',
      valueContainer: () => 'force_rounded_lg'
    }}
    onChange={(selected) => {
      if (selected) setValue(selected.value)
    }}
  />
)

export default SelectInput
