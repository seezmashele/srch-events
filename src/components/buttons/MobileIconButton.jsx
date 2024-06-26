const MobileIconButton = ({ ariaLabel = '', onClick, icon }) => (
  <button
    type="button"
    aria-label={ariaLabel}
    onClick={() => {
      if (onClick) onClick()
    }}
    className=" flex h-10 w-10 flex-shrink-0 cursor-pointer select-none items-center justify-center overflow-hidden rounded-full bg-neutral-100 text-sm transition-shadow hover:bg-neutral-200 xs:flex md:hidden"
  >
    {icon}
  </button>
)

export default MobileIconButton
