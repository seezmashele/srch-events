// import { Person, PersonFill, Tag, TagFill } from 'react-bootstrap-icons'
import { useApp } from '../../context/AppContext'

const EventSidebar = ({
  prices,
  eventTags,
  ageRequirements,
  authorDisplayName
}) => {
  const { showDesktopDrawer } = useApp()

  // TODO: show trending tags under event details like twitter

  return (
    <aside
      className={`${showDesktopDrawer && 'md:hidden lg:block'} box_radius sticky top-[4.75rem] mb-10 ml-5 mt-5 h-full w-80 flex-shrink-0 bg-neutral-100 p-5 pb-10 text-sm xs:hidden md:block`}
    >
      {eventTags && (
        <div className="mt-2f flex select-none space-x-1.5 text-sm">
          {eventTags.map((tag) => (
            <div className="sidebar_tag tag_radius">{tag}</div>
          ))}
        </div>
      )}

      <div className="mt-5">
        <div className="text-base font-bold">{authorDisplayName}</div>
        <div className="mt-2">
          Imagine a Place... where you can belong to a school club, a gaming
          group, or a worldwide art community. Where just you and handful of
        </div>
      </div>

      {prices && (
        <>
          <div className="my-5 w-full border-b" />
          <div className="mt-5">
            <div className="sidebar_title font-semiboldf mb-0">Prices</div>
            <div className="mt-2 flex items-center">
              <div className="h-1 w-5">
                <div className="ml-1 h-1 w-1 rounded-full bg-black" />
              </div>
              <div className="text-smf">R10000000000</div>
            </div>
          </div>
        </>
      )}

      <div className="my-5 w-full border-b" />

      <div className="mt-5">
        <div className="sidebar_title font-semiboldf mb-0">
          Age requirements
        </div>
        <div className="mt-2 flex items-center">
          <div className="h-1 w-5">
            <div className="ml-1 h-1 w-1 rounded-full bg-black" />
          </div>
          <div className="text-smf">{ageRequirements || 'Not specified'}</div>
        </div>
      </div>
    </aside>
  )
}

export default EventSidebar
