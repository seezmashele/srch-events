const FormTextInput = ({
  title,
  value,
  setValue,
  placeholder,
  required = false,
  error
}) => (
  <>
    {title && (
      <div className="mb-2 w-full text-sm font-semibold">
        {title}
        {required && <span className="text-red-500"> *</span>}
      </div>
    )}
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      className="input_radius login_input_styling mt-1.5f w-full py-2 placeholder:font-normal"
      onChange={(e) => {
        if (setValue) setValue(e.target.value)
      }}
    />
    {error && (
      <div className="mt-2 w-full text-sm text-red-500">
        This field is required
      </div>
    )}
  </>
)

export default FormTextInput
