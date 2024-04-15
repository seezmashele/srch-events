import Link from 'next/link'

const DesktopIconLinkButton = ({ path = '', ariaLabel = '' }) => (
  <Link href={path} passHref>
    <button
      type="button"
      aria-label={ariaLabel}
      className="bg-neutral-50f h-11f w-11f flex flex-shrink-0 cursor-pointer select-none items-center justify-center overflow-hidden text-nowrap rounded-xl p-2 px-3 text-sm transition-shadow hover:bg-neutral-100 xs:hidden md:flex"
    >
      {/* <PlusCircle className="icon_size--base flex-shrink-0" /> */}
      Create event
    </button>
  </Link>
)

export default DesktopIconLinkButton
