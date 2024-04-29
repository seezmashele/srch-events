import { CircleUser, Globe, User } from 'lucide-react'

const SettingsDrawer = ({ currentPage = -1, setCurrentPage }) => {
  const settingsOptions = [
    {
      title: 'Profile',
      icon: <User />,
      link: '/settings'
    },
    {
      title: 'Links and socials',
      icon: <Globe />,
      link: '/settings/links'
    },
    {
      title: 'Account',
      icon: <CircleUser />,
      link: '/settings/account'
    }
  ]

  return (
    <div className="bg-neutral-50f relative h-full min-h-screen w-60 top-7  flex-shrink-0 select-none border-r pr-3 pt-1 pb-7">
      <div className="mb-5 px-3 font-semibold">Settings</div>
      {/* <div className="border-tf my-3 w-full" /> */}
      {settingsOptions.map((item, index) => {
        const itemKey = `settings-item${item.title}${index}`
        if (item.sectionTitle) {
          return (
            <div
              key={itemKey}
              className="my-1 flex w-full items-center p-2.5 text-left text-xs font-semibold uppercase tracking-wider"
            >
              <p>{item.sectionTitle}</p>
            </div>
          )
        }
        if (item.divider) {
          return (
            <div className="mb-3 mt-3" key={itemKey}>
              <div className="main_border_color w-full border-b" />
            </div>
          )
        }
        return (
          <button
            key={itemKey}
            type="button"
            onClick={() => {
              setCurrentPage(index)
            }}
            className={`box_radius mb-1f flex w-full cursor-pointer items-center p-2.5 text-left text-sm hover:bg-neutral-100 ${
              index === currentPage && 'bg-neutral-100 font-semibold'
            }`}
          >
            <div className="ml-0.5 mr-2.5 flex h-5 w-5 items-center justify-center">
              {item.icon}
            </div>
            <p>{item.title}</p>
          </button>
        )
      })}
    </div>
  )
}

export default SettingsDrawer
