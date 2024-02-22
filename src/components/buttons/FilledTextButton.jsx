const FilledTextButton = ({ label = '', ariaLabel = '', onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={ariaLabel}
    className="base_button_styles button_colors--filled button_min_width ml-auto mr-0 text-center"
  >
    {label}
  </button>
)

export default FilledTextButton
