const Button = ({ label = '', ariaLabel = '', onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={ariaLabel}
    className="ml-0 mr-4 h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full hover:bg-neutral-100 xs:hidden lg:flex"
  >
    {label}
  </button>
)

export default Button
