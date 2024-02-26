const ProfileSettings = () => {
  const displayName = 'Yello Kittyz'

  const images = [
    '/avatars/image-1.png',
    '/avatars/image-2.png',
    '/avatars/image-3.png',
    '/avatars/image-4.png',
    '/avatars/image-5.png',
    '/avatars/image-6.png',
    '/avatars/image-7.png',
    '/avatars/image-8.png',
    '/avatars/image-9.png',
    '/avatars/image-10.png',
    '/avatars/image-11.png',
    '/avatars/image-12.png',
    '/avatars/image-13.png',
    '/avatars/image-14.png',
    '/avatars/image-15.png',
    '/avatars/image-16.png',
    '/avatars/image-17.png',
    '/avatars/image-18.png',
    '/avatars/image-19.png',
    '/avatars/image-20.png'
  ]

  const authorImage = images[Math.floor(Math.random() * 20)]

  return (
    <div>
      <h1 className="text-base font-semibold">Profile</h1>
      <div className="my-3 w-full border-t" />

      <div className="bg-neutral-100f h-80f pb-4f box_radius px-4f w-full ">
        <div className="bg-green-100f pt-2f mt-6 flex items-center">
          <div className="-mt-10f mr-4 h-24 w-24 flex-shrink-0 overflow-hidden rounded-full bg-neutral-100">
            <img
              src={authorImage}
              className="h-full w-full object-cover"
              alt=""
            />
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="text-lg font-semibold">{displayName}</div>
            <button
              type="button"
              className="button_radius bg-accent-mainf bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-accent-main-hover"
            >
              Edit User Profile
            </button>
          </div>
        </div>

        {/* section: User Details ------------------------- */}
        <div className="main_border_color my-6 w-full border-t" />
        <div className="mt-3">
          <div className="flex">
            <div className=" w-full">
              <div className="text-xs font-semibold uppercase text-neutral-400">
                Display Name
              </div>
              <div className="mt-1.5 font-semibold">{displayName}</div>
            </div>
            <div className="">
              <button
                type="button"
                className="button_radius bg-neutral-400 px-4 py-2 text-sm font-semibold text-white"
              >
                Edit
              </button>
            </div>
          </div>
          <div className="mt-6 flex">
            <div className=" w-full">
              <div className="text-xs font-semibold uppercase text-neutral-400">
                Username
              </div>
              <div className="mt-1.5 font-semibold">hello_kitty_crew</div>
            </div>
            <div className="">
              <button
                type="button"
                className="button_radius bg-neutral-400 px-4 py-2 text-sm font-semibold text-white"
              >
                Edit
              </button>
            </div>
          </div>
          <div className="mt-6 flex">
            <div className=" w-full">
              <div className="text-xs font-semibold uppercase text-neutral-400">
                Email
              </div>
              <div className="mt-1.5 font-semibold">h******@gmail.com</div>
            </div>
            <div className="">
              <button
                type="button"
                className="button_radius bg-neutral-400 px-4 py-2 text-sm font-semibold text-white"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* section: Password and Auth ------------------------- */}
      <div className="main_border_color my-6 w-full border-t" />
      <h1 className="text-lg font-semibold">Password and Authentication</h1>

      {/* <p className="mt-3">{displayName}</p> */}
    </div>
  )
}
export default ProfileSettings
