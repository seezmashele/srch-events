const DesktopTextButton = ({ label = '', ariaLabel = '', onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={ariaLabel}
    className="base_button_styles text-center button_colors--filled button_min_width xs:hidden md:block"
  >
    {label}
  </button>
)

export default DesktopTextButton
