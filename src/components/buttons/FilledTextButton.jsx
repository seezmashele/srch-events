const FilledTextButton = ({ label = '', ariaLabel = '', onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={ariaLabel}
    className="button_styles box_radius ml-auto mr-0 flex gap-1 space-x-0 whitespace-nowrap px-5 py-2"
  >
    {label}
  </button>
)

export default FilledTextButton
