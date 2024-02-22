const FormTextInput = ({
  type = '',
  title,
  value,
  setValue,
  placeholder = '',
  required = false,
  error
}) => (
  <>
    {title && (
      <div className="mt-5 w-full text-sm font-semibold">
        {title}
        {required && <span className="text-red-500"> *</span>}
      </div>
    )}
    <input
      value={value}
      onChange={(e) => {
        setValue(e.target.value)
      }}
      type={type}
      placeholder={placeholder}
      className="input_radius login_input_styling mt-1.5 w-full"
    />
    {error && (
      <div className="mt-2 w-full text-sm text-red-500">
        This field is required
      </div>
    )}
  </>
)

export default FormTextInput
