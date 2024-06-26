import Link from 'next/link'

const MobileIconLinkButton = ({ path = '', ariaLabel = '', icon }) => (
  <Link href={path} passHref>
    <button
      type="button"
      aria-label={ariaLabel}
      className="bg-neutral-50f flex h-11 w-11 flex-shrink-0 cursor-pointer select-none items-center justify-center overflow-hidden bg-neutral-100 rounded-full text-sm transition-shadow hover:bg-neutral-200 xs:flex md:hidden"
    >
      {icon}
    </button>
  </Link>
)

export default MobileIconLinkButton
