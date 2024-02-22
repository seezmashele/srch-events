import Link from 'next/link'

const DesktopLinkButton = ({ label = '', ariaLabel = '', path = '' }) => (
  <Link href={path}>
    <button
      type="button"
      aria-label={ariaLabel}
      className=" base_button_styles font-normal hover:bg-neutral-100 xs:hidden md:flex"
    >
      {label}
    </button>
  </Link>
)

export default DesktopLinkButton
