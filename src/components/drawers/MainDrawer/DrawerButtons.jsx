import Link from 'next/link'

const DrawerButtons = ({
  title,
  drawerItems,
  selectedItemIndex,
  hidden = false,
  showDividerAbove = false
}) => (
  <>
    {showDividerAbove && (
      <div className="main_border_color my-2 w-full border-b" />
    )}
    {title && (
      <div className="drawer_section_title xs:hidden lg:block">{title}</div>
    )}
    <div className={`${hidden && 'hidden'}`}>
      {drawerItems &&
        drawerItems.map((item, index) => {
          const itemKey = `main-drawer-button${item.title}${index}`
          // if (item.divider) {
          //   return (
          //     <div
          //       className="main_border_color my-2 w-full border-b"
          //       key={itemKey}
          //     />
          //   )
          // }
          if (item.link) {
            return (
              <Link
                href={item.link}
                key={itemKey}
                className={`box_radius mt-0 flex cursor-pointer select-none flex-nowrap overflow-hidden px-2.5 py-1.5 hover:bg-neutral-100 ${
                  selectedItemIndex === index && 'bg-neutral-100'
                }`}
              >
                <div className="mr-4 flex h-7 w-7 flex-shrink-0 items-center justify-center text-base">
                  {item.icon}
                </div>
                <div className="flex flex-nowrap items-center px-1">
                  <div
                    className={`text-nowrap text-sm ${
                      selectedItemIndex === index && 'font-semibold'
                    }`}
                  >
                    {item.title}
                  </div>
                </div>
              </Link>
            )
          }
          if (item.action) {
            return (
              <button
                key={itemKey}
                type="button"
                onClick={item.action}
                className={`box_radius mt-0 flex cursor-pointer select-none flex-nowrap items-center px-2.5 py-1.5 hover:bg-neutral-100  ${
                  selectedItemIndex === index && 'bg-neutral-100'
                }`}
              >
                <div className="mr-4 flex h-7 w-7 flex-shrink-0 items-center justify-center text-base">
                  {item.icon}
                </div>
                <div className="flex flex-nowrap items-center px-1">
                  <div
                    className={`text-nowrap text-sm ${
                      selectedItemIndex === index && 'font-semibold'
                    }`}
                  >
                    {item.title}
                  </div>
                </div>
              </button>
            )
          }
          return null
        })}
    </div>
  </>
)

export default DrawerButtons
