import FormTextArea from '../../../components/inputs/FormTextArea'
import FormTextInput from '../../../components/inputs/FormTextInput'
import { useAuth } from '../../../context/AuthContext'

const ProfileSettings = () => {
  const {
    currentUser,
    accountColor,
    accountImage,
    accountUsername,
    accountDisplayName
  } = useAuth()

  return (
    <div className="select-none">
      <h1 className="text-base font-semibold">Edit Profile</h1>
      <div className="border-tf my-3 w-full" />

      <div className="bg-neutral-100f h-80f box_radius px-4f w-full pb-20 ">
        <div className="bg-green-100f pt-2f mt-6 flex items-center">
          <div
            style={{
              backgroundColor: accountImage ? '#eee' : accountColor
            }}
            className="border-4f border-whitef z-10 mr-6 flex h-24 w-24  flex-shrink-0 items-center justify-center overflow-hidden rounded-full text-4xl text-white"
          >
            {!accountImage &&
              currentUser &&
              accountDisplayName &&
              accountDisplayName[0]}
            {accountImage && (
              <img
                src={accountImage}
                className="h-full w-full overflow-hidden rounded-full object-cover"
                alt="profile"
              />
            )}
          </div>
          <div className="">
            <div className="text-nowrap text-lg font-semibold">
              {accountDisplayName}
            </div>
            <div className="text-nowrap text-sm text-neutral-500">
              @{accountUsername}
            </div>
          </div>
          <div className="flex w-full items-center justify-end">
            <button
              type="button"
              className="base_button_styles button_colors--filled"
            >
              Change photo
            </button>
          </div>
        </div>

        {/* section: User Details ------------------------- */}
        <h3 className="mb-2 mt-6 text-sm font-semibold">Name</h3>
        <FormTextInput placeholder={accountDisplayName} />
        <p className="mt-2 text-xs text-neutral-400">
          Names can only be changed once a month.
        </p>

        <h3 className="mb-2 mt-5 text-sm font-semibold">Username</h3>
        <FormTextInput placeholder={accountUsername} />
        <p className="mt-2 text-xs text-neutral-400">
          Usernames can only be changed once a month.
        </p>

        {/* section: User Details ------------------------- */}
        {/* <div className="main_border_color my-6 w-full border-t" />
        <h3 className="mb-2 text-sm font-semibold">Website</h3>
        <FormTextInput /> */}

        <h3 className="mb-2 mt-5 text-sm font-semibold">Bio</h3>
        <FormTextArea />
        <p className="mt-1 text-xs text-neutral-400">Tell us about yourself.</p>

        <div className="mt-6 flex w-full items-center justify-end">
          <button
            type="button"
            className="base_button_styles button_colors--filled"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  )
}
export default ProfileSettings
