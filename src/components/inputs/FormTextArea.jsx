import { TextareaAutosize } from '@mui/base/TextareaAutosize'

const FormTextArea = ({
  title,
  value,
  setValue,
  maxRows = 5,
  placeholder = '',
  required = false,
  error
}) => (
  <>
    <div className="w-full text-sm font-semibold">
      {title}
      {required && <span className="text-red-500"> *</span>}
    </div>
    <TextareaAutosize
      value={value}
      maxRows={maxRows}
      placeholder={placeholder}
      className="input_radius editor_border_color font-semiboldf w-full border px-3 py-2 text-base leading-normal"
      onChange={(e) => {
        setValue(e.target.value)
      }}
    />
    {error && (
      <div className="mt-2 w-full text-sm text-red-500">
        This field is required
      </div>
    )}
  </>
)

export default FormTextArea
