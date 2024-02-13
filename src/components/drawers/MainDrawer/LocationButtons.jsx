import Link from 'next/link'
import { Circle, RecordCircleFill } from 'react-bootstrap-icons'

const LocationButtons = ({
  locationsArray,
  selectedItemIndex = -1,
  hidden = false
}) => (
  <div className={`${!hidden && 'lg:block'} w-full xs:hidden`}>
    <div className="main_border_color mb-5 mt-2 w-full border-b" />
    <div className="drawer_section_title">Popular</div>
    {locationsArray.map((item, index) => (
      <Link
        href={item.path || ''}
        passHref
        className={`${
          selectedItemIndex === index && 'bg-neutral-100'
        } box_radius flex cursor-pointer items-center overflow-hidden px-2.5 py-2 hover:bg-neutral-100`}
        key={`drawer-location-button${item.title}${index}`}
      >
        <div className="mr-5 flex h-7 w-7 flex-shrink-0 items-center justify-center">
          {selectedItemIndex === index ? (
            <RecordCircleFill className="text-accent-main" />
          ) : (
            <Circle />
          )}
        </div>
        <div className="whitespace-nowrap text-sm">
          {item.title} ({item.count})
        </div>
      </Link>
    ))}
  </div>
)

export default LocationButtons
