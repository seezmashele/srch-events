import { useState } from 'react'
import imageCompression from 'browser-image-compression'
import FormTextArea from '../../../components/inputs/FormTextArea'
import FormTextInput from '../../../components/inputs/FormTextInput'
import { useAuth } from '../../../context/AuthContext'
import UserImageCropper from '../../../components/modals/UserImageCropper'
// import PreviewImages from '../../add-new-event/components/PreviewImages'
import { uploadProfileImages } from '../../../utils/supabase/storage/images'
import { getProfileImageSlug } from '../../../utils/helpers/strings'

const ProfileSettings = () => {
  const {
    currentUser,
    accountColor,
    accountImage,
    accountUsername,
    accountDisplayName
  } = useAuth()

  const [imageToCrop, setImageToCrop] = useState(null)
  // const [croppedImage, setCroppedImage] = useState(null)
  const [resizedProfileImage, setResizedProfileImage] = useState(null)
  const [showCropperModal, setShowCropperModal] = useState(false)
  // const [resizedCoverURL, setResizedCoverURL] = useState(null)

  const clearSelectedImageFile = () => {
    const fileButton = document.getElementById('profile_image_file_input')
    if (fileButton) fileButton.value = null
  }

  const hideCropperModal = () => {
    setShowCropperModal(false)
    clearSelectedImageFile()
  }

  // TODO: make cropped image round
  // TODO: make small profile image

  const handleProfileImageUpload = async () => {
    if (!resizedProfileImage) return null

    const imageSlug = getProfileImageSlug(accountUsername || '')
    const result = await uploadProfileImages(
      imageSlug,
      resizedProfileImage,
      resizedProfileImage
    )

    if (result && result.success) {
      // console.log('profile images uploaded', result)
      // TODO: update supabase user profile
      return { success: true }
    }
    return null
  }

  async function createResizedImages(croppedImageURL) {
    if (croppedImageURL) {
      fetch(croppedImageURL)
        .then((response) => response.blob())
        .then(async (blob) => {
          const imageFile = blob
          const coverOptions = {
            maxSizeMB: 0.3,
            maxWidthOrHeight: 150,
            initialQuality: 0.8,
            fileType: 'image/webp',
            useWebWorker: true
          }

          try {
            const compressedCoverFile = await imageCompression(
              imageFile,
              coverOptions
            )

            // const coverURL = URL.createObjectURL(compressedCoverFile)

            setResizedProfileImage(compressedCoverFile)

            // these are only used in dev to show the images
            // setResizedCoverURL(coverURL)
          } catch (error) {
            return error
          }
          return null
        })
    }
    return null
  }

  const createImageURL = (e) => {
    if (e && e.target) {
      try {
        const imageURL = URL.createObjectURL(e.target.files[0])
        if (imageURL) {
          setImageToCrop(imageURL)
          setShowCropperModal(true)
        }
      } catch (error) {
        return { error }
      }
    }
    return null
  }

  const updateCroppedImage = (img) => {
    if (img) {
      // setCroppedImage(img)
      createResizedImages(img)
    }
  }

  return (
    <>
      <UserImageCropper
        imageToCrop={imageToCrop}
        updateCroppedImage={updateCroppedImage}
        showCropperModal={showCropperModal}
        hideCropperModal={hideCropperModal}
      />
      <div className="select-none pt-1">
        <h1 className="text-base font-semibold">Edit Profile</h1>
        <div className="border-tf my-3 w-full" />

        <div className="bg-neutral-100f h-80f box_radius px-4f w-full pb-16 ">
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
                onClick={() => {
                  const fileButton = document.getElementById(
                    'profile_image_file_input'
                  )
                  if (fileButton) fileButton.click()
                }}
              >
                Change photo
              </button>
            </div>
          </div>

          <div className="w-full bg-blue-200">
            <input
              id="profile_image_file_input"
              type="file"
              className="file:box_radius file:border_color--main pointer-events-none hidden w-full select-none border-none text-sm text-neutral-500 file:mr-2.5 file:hidden file:border-0 file:border-solid file:pb-2.5 file:shadow-none focus:outline-none dark:text-neutral-500"
              onChange={(event) => {
                createImageURL(event)
              }}
            />
          </div>

          {/* <PreviewImages
            // croppedImage={croppedImage}
            image1URL={resizedCoverURL}
          /> */}

          {resizedProfileImage && (
            <div className="flexf hidden justify-end">
              <button
                type="button"
                className="base_button_styles button_colors--filled"
                onClick={handleProfileImageUpload}
              >
                upload image
              </button>
            </div>
          )}

          {/* <div className='w-full my-6 border-t' /> */}

          {/* section: User Details ------------------------- */}
          <h3 className="mb-2 mt-8 text-sm font-semibold">Name</h3>
          <FormTextInput placeholder={accountDisplayName} />
          <p className="mt-2 text-xs text-neutral-400">
            Name can only be changed once a month.
          </p>

          <h3 className="mb-2 mt-5 text-sm font-semibold">Username</h3>
          <FormTextInput placeholder={`@${accountUsername}`} />
          <p className="mt-2 text-xs text-neutral-400">
            Username can only be changed once a month.
          </p>

          {/* section: User Details ------------------------- */}
          {/* <div className="main_border_color my-6 w-full border-t" />
        <h3 className="mb-2 text-sm font-semibold">Website</h3>
        <FormTextInput /> */}

          <h3 className="mb-2 mt-5 text-sm font-semibold">Bio</h3>
          <FormTextArea />
          <p className="mt-1 text-xs text-neutral-400">
            Tell us about yourself.
          </p>

          <div className="mt-6 flex w-full items-center justify-end">
            <button
              type="button"
              className="base_button_styles button_colors--filled min-w-36"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default ProfileSettings
