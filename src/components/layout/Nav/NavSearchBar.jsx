import { Search } from 'react-bootstrap-icons'

const NavSearchBar = () => (
  <div className="box_radius main_border_color border-neutral-200f mx-5 w-full max-w-sm items-center rounded-full bg-neutral-100 text-neutral-600 dark:bg-neutral-900 xs:hidden md:flex">
    <input
      placeholder="Search"
      className="z-[100] h-9 w-full rounded-l-full bg-neutral-100 px-4 py-2 pb-2.5 text-sm  focus:border-none focus:outline-accent-main focus:ring-0"
    />
    <div className="z-[99] h-full">
      <Search className="h-9 w-14 cursor-pointer rounded-r-full border-neutral-200 bg-neutral-100 p-2.5 hover:bg-neutral-200" />
    </div>
  </div>
)

export default NavSearchBar
