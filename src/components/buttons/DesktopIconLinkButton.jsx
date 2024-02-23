import Link from 'next/link'

const DesktopIconLinkButton = ({ path = '', ariaLabel = '', icon }) => (
  <Link href={path} passHref>
    <button
      type="button"
      aria-label={ariaLabel}
      className="bg-neutral-50f flex h-11 w-11 flex-shrink-0 cursor-pointer select-none items-center justify-center overflow-hidden rounded-xl text-sm transition-shadow hover:bg-neutral-100  xs:hidden md:flex"
    >
      {icon}
    </button>
  </Link>
)

export default DesktopIconLinkButton