// import { Person, PersonFill, Tag, TagFill } from 'react-bootstrap-icons'
import { useApp } from '../../context/AppContext'

const EventSidebar = () => {
  const { showDesktopDrawer } = useApp()

  return (
    <aside
      className={`${showDesktopDrawer && 'md:hidden lg:block'} box_radius sticky top-[4.75rem] mb-10 mt-5 h-full w-80 flex-shrink-0 bg-neutral-100 p-5 text-sm xs:hidden md:block`}
    >
      <div className="mt-2f flex select-none space-x-1.5 text-sm">
        <div className="sidebar_tag tag_radius">gaming</div>
        <div className="sidebar_tag tag_radius">anime</div>
      </div>

      <div className="mt-5">
        <div className="text-base font-bold">Basic Seez</div>
        <div className="mt-2">
          Imagine a Place... where you can belong to a school club, a gaming
          group, or a worldwide art community. Where just you and handful of
        </div>
      </div>

      <div className="my-5 w-full border-b" />

      {/* <div className="mt-4f">
        <div className="flex items-center">
          <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-md bg-white p-0.5 shadow">
            <Calendar4Event className="h-3.5 w-3.5" />
          </div>
          <div className="sidebar_title mb-0">Date</div>
        </div>
        <div className="mt-2 flex items-center">
          <div className="h-1 w-7">
            <div className="ml-1.5 h-1 w-1 rounded-full bg-black" />
          </div>
          <div className="text-smf">Thur, 24 July</div>
        </div>
        <div className="flex items-center">
          <div className="h-1 w-7" />
          <div className="mt-0.5 text-sm">10AM - 2PM</div>
        </div>
      </div> */}

      {/* <div className="my-7 w-full border-b" /> */}

      {/* <div className="mt-5">
        <div className="flex items-center">
          <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-md bg-white p-0.5 shadow">
            <GeoAlt className="h-3.5 w-3.5" />
          </div>
          <div className="sidebar_title mb-0">Venue</div>
        </div>
        <div className="mt-2 flex items-center">
          <div className="h-1 w-7">
            <div className="ml-1.5 h-1 w-1 rounded-full bg-black" />
          </div>
          <div className="text-smf">Johannesburg</div>
        </div>
        <div className="flex items-center">
          <div className="h-1 w-7">
            <div className="ml-1.5 h-1 w-1 rounded-full bg-black" />
          </div>
          <div className="mt-0.5">www.twitch.tv/smegatron</div>
        </div>
      </div> */}
      <div className="mt-5">
        <div className="flex items-center">
          {/* <div className="shadowf bg-whitef mr-3 flex h-6 w-6 items-center justify-center rounded-full p-0.5">
            <Tag className="h-4 w-4" />
          </div> */}
          <div className="sidebar_title font-semiboldf mb-0">Prices</div>
        </div>
        <div className="mt-2 flex items-center">
          <div className="h-1 w-5">
            <div className="ml-1 h-1 w-1 rounded-full bg-black" />
          </div>
          <div className="text-smf">Free</div>
        </div>
      </div>

      <div className="my-5 w-full border-b" />

      <div className="mt-5">
        <div className="flex items-center">
          {/* <div className="shadowf bg-whitef mr-3 flex h-6 w-6 items-center justify-center rounded-full p-0.5">
            <Person className="h-4 w-4" />
          </div> */}
          <div className="sidebar_title font-semiboldf mb-0">
            Age restriction
          </div>
        </div>
        <div className="mt-2 flex items-center">
          <div className="h-1 w-5">
            <div className="ml-1 h-1 w-1 rounded-full bg-black" />
          </div>
          <div className="text-smf">16+</div>
        </div>
      </div>

      <div className="mt-5  ">
        {/* <div className="flex items-center">
          <div className="box_radius bg-neutral-100f mr-3 flex h-4 w-4 items-center justify-center rounded-full">
            <Tag className="h-4 w-4" />
          </div>
          <div className="sidebar_title mb-0">Tags</div>
        </div> */}
        {/* <div className="flex items-center">
          <div className="ml-3.5 mr-4 h-1 w-1 rounded-full bg-black" />
          <div className="mt-0.5 text-sm">
            <span>Gaming, </span>
            <span>Meet up, </span>
            <span>Pop culture, </span>
            <span>Entertainment </span>
          </div>
        </div> */}
      </div>
    </aside>
  )
}

export default EventSidebar
