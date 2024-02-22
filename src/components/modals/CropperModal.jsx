import { XLg } from 'react-bootstrap-icons'
import Dialog from '@mui/material/Dialog'
import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import Slider from '@mui/material/Slider'
// import { Slider } from '@mui/base/Slider';
import getCroppedImg from './CropperModal/cropImage'

/* eslint-disable no-console */
// make titles and messages not selectable
const CropperModal = ({
  imageToCrop,
  showCropperModal,
  hideCropperModal,
  updateCroppedImage
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [myCroppedAreaPixels, setMyCroppedAreaPixels] = useState(null)
  const [cropAspectRatio, setCropAspectRatio] = useState(3 / 2)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setMyCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const saveCroppedImage = async () => {
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

  const cropAspectRatios = [
    {
      value: 1,
      label: '1:1'
    },
    {
      value: 4 / 3,
      label: '4:3'
    },
    {
      value: 3 / 2,
      label: '3:2'
    },
    {
      value: 16 / 9,
      label: '16:9'
    },
    {
      value: 2 / 1,
      label: '2:1'
    }
  ]

  return (
    <Dialog
      fullWidth
      maxWidth="md"
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
          aspect={cropAspectRatio}
          showGrid={false}
          objectFit="contain"
          onCropChange={setCrop}
          // restrictPosition
          classes={{
            containerClassName: 'bg-blue-200f min-w-[20rem] object-cover m-0',
            mediaClassName: 'm-0',
            cropAreaClassName: 'm-0'
          }}
          className="w-96 rounded-full bg-red-600"
          onCropComplete={onCropComplete}
        />
      </div>
      <div className="bg-slate-100f pr-10f   flex w-full items-center  gap-x-2 border-b py-5 pl-5">
        <div className="mr-5 text-sm font-semibold">Size</div>

        {/* Aspect ratios */}
        {cropAspectRatios.map((ratio) => (
          <button
            key={`cropper-aspect-ratio-${ratio.label}`}
            type="button"
            aria-label="Crop image"
            onClick={() => {
              setCropAspectRatio(ratio.value)
            }}
            className={`${ratio.value === cropAspectRatio ? 'border-accent-main bg-accent-main text-accent-main' : 'hover:bg-neutral-100'} base_button_styles bg-neutral-100f border bg-opacity-5 px-4`}
          >
            {ratio.label}
          </button>
        ))}
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
          onClick={saveCroppedImage}
          className="base_button_styles button_min_width button_colors--filled text-center"
        >
          Done
        </button>
      </div>
    </Dialog>
  )
}

export default CropperModal
