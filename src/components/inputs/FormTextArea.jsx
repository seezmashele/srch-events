const FormTextInput = ({
  type = '',
  title,
  value,
  setValue,
  required = false,
  error
}) => (
  <>
    <div className="w-full text-sm font-semibold">
      {title}
      {required && <span className="text-red-500"> *</span>}
    </div>
    <input
      value={value}
      onChange={(e) => {
        setValue(e.target.value)
      }}
      type={type}
      className="input_radius login_input_styling mt-1.5f w-full py-2"
    />
    {error && (
      <div className="mt-2 w-full text-sm text-red-500">
        This field is required
      </div>
    )}
  </>
)

export default FormTextInput
