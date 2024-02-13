import { XLg } from 'react-bootstrap-icons'
import Dialog from '@mui/material/Dialog'
import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import Slider from '@mui/material/Slider'
import getCroppedImg from './CropperModal/cropImage'

/* eslint-disable no-console */
// make titles and messages not selectable
const UserImageCropper = ({
  imageToCrop,
  showCropperModal,
  hideCropperModal,
  updateCroppedImage,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [myCroppedAreaPixels, setMyCroppedAreaPixels] = useState(null)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setMyCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedResult = async () => {
    try {
      const img = await getCroppedImg(imageToCrop, myCroppedAreaPixels, 0)
      updateCroppedImage(img)
      hideCropperModal()
    } catch (error) {
      console.log('err', error)
    }
  }

  const handleSliderChange = (event, newValue) => {
    setZoom(1 + newValue)
  }

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      scroll="body"
      onClose={null}
      open={showCropperModal}
      className="select-none"
    >
      <div className="flex w-full items-center justify-between p-1">
        <h3 className="pl-3 font-semibold">Crop your image</h3>
        <button
          type="button"
          aria-label="Close"
          className="box_radius p-3 hover:bg-neutral-100"
          onClick={() => {
            hideCropperModal()
          }}
        >
          <XLg />
        </button>
      </div>
      <div className="relative h-96 w-full bg-neutral-400">
        <Cropper
          image={imageToCrop}
          crop={crop}
          zoom={zoom}
          aspect={1 / 1}
          showGrid={false}
          cropShape="round"
          objectFit="contain"
          onCropChange={setCrop}
          // restrictPosition
          classes={{
            containerClassName: 'bg-blue-200f min-w-[20rem] object-cover m-0',
            mediaClassName: 'm-0',
            cropAreaClassName: 'm-0',
          }}
          className="w-96 rounded-full bg-red-600"
          onCropComplete={onCropComplete}
        />
      </div>
      <div className="flex justify-end p-5">
        <div className="flex flex-grow items-center">
          <div className="mr-7 text-sm font-semibold">Zoom</div>
          <Slider
            min={0}
            max={1}
            onChange={handleSliderChange}
            step={0.1}
            marks
            className="w-full max-w-[15rem] text-accent-main"
          />
        </div>
        <button
          type="button"
          aria-label="Crop image"
          onClick={showCroppedResult}
          className="button_styles px-4"
        >
          Crop Image
        </button>
      </div>
    </Dialog>
  )
}

export default UserImageCropper
