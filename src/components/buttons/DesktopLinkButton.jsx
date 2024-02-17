import Link from 'next/link'

const DesktopLinkButton = ({ label = '', ariaLabel = '', path = '' }) => (
  <Link href={path}>
    <button
      type="button"
      aria-label={ariaLabel}
      className="box_radius h-full flex-shrink-0 cursor-pointer select-none items-center space-x-2 overflow-hidden whitespace-nowrap px-4 py-2 text-sm transition-shadow hover:bg-neutral-100 xs:hidden md:flex"
    >
      {label}
    </button>
  </Link>
)

export default DesktopLinkButton
