import { List } from 'react-bootstrap-icons'

const DesktopDrawerButton = ({ changeValue, value }) => (
  <button
    type="button"
    aria-label="Toggle drawer"
    onClick={() => {
      changeValue(!value)
    }}
    className="ml-1 mr-4 h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full hover:bg-neutral-100 xs:hidden lg:flex"
  >
    <List className="icon_size--lg" />
  </button>
)

export default DesktopDrawerButton
