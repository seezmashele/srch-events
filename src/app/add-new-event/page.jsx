'use client'

import { useState, useCallback } from 'react'
import { Image } from 'react-bootstrap-icons'
import Select from 'react-select'
import { useDropzone } from 'react-dropzone'
import imageCompression from 'browser-image-compression'
import { TextareaAutosize } from '@mui/base/TextareaAutosize'
import { ToastContainer, toast, Flip } from 'react-toastify'
import { useEditor, EditorContent } from '@tiptap/react'
import 'react-day-picker/dist/style.css'
import Nav from '../../components/layout/Nav'
import PageHead from '../../components/misc/PageHead'
import MainDrawer from '../../components/drawers/MainDrawer'
import BodyWrapper from '../../components/wrappers/BodyWrapper'
import CropperModal from '../../components/modals/CropperModal'
import DayPickerDropdown from '../../components/dropdowns/DayPickerDropdown'
import EditorSectionTitle from '../../components/editor/EditorSectionTitle'
import SelectInput from './components/SelectInput'
import TiptapToolbar from '../../components/tiptap/Toolbar'
import YoutubeLinkModal from '../../components/modals/YoutubeLinkModal'
import categoriesList from '../../utils/constants/categories'
import extensions from '../../components/tiptap/extensions/editor'
import { checkEventSubmitData } from '../../utils/helpers/checks'
import { uploadSupabaseEvent } from '../../utils/supabase/database/create'
import { useApp } from '../../context/AppContext'
import { useAuth } from '../../context/AuthContext'
import { addTimeToDate } from '../../utils/helpers/time'
import {
  timePickerAMPM,
  timePickerHours,
  timePickerMinutes
} from '../../utils/constants/time'
import { countriesList } from '../../utils/constants/countries'
import FormNumberInput from '../../components/inputs/FormNumberInput'
// import PreviewImages from './page/PreviewImages'

// import { DatePicker } from '@mui/x-date-pickers'
// import Flatpickr from 'react-flatpickr'
// import 'flatpickr/dist/themes/light.css'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
// import enGB from 'date-fns/locale/en-GB'
// import * as Tooltip from '@radix-ui/react-tooltip';

/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

// ! pop up a success modal asking if they want to check out intro stuff or browser so we can do some kind or page refresh or redirect

const CreatePage = () => {
  const { showDesktopDrawer } = useApp()
  const {
    accountUsername,
    accountDisplayName,
    accountImageSmall,
    accountColorNumber
  } = useAuth()
  const [imageToCrop, setImageToCrop] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)
  const [resizedCover, setResizedCover] = useState(null)
  const [resizedThumbnail, setResizedThumbnail] = useState(null)
  const [titleError, setTitleError] = useState('')
  const [eventTitle, setEventTitle] = useState('')
  const [venueName, setVenueName] = useState('')
  const [eventStartDate, setEventStartDate] = useState(null)
  const [eventEndDate, setEventEndDate] = useState(null)
  const [resizedCoverURL, setResizedCoverURL] = useState(null)
  const [resizedThumbnailURL, setResizedThumbnailURL] = useState(null)
  const [selectedCategories, setSelectedCategories] = useState(null)
  const [selectedEventType, setSelectedEventType] = useState(0)
  const [showCropperModal, setShowCropperModal] = useState(false)
  const [showYoutubeLinkModal, setShowYoutubeLinkModal] = useState(false)
  const [startingTimeAMPM, setStartingTimeAMPM] = useState('AM')
  const [startingTimeHours, setStartingTimeHours] = useState(null)
  const [startingTimeMinutes, setStartingTimeMinutes] = useState(0)
  const [endTimeAMPM, setEndTimeAMPM] = useState('AM')
  const [endTimeHours, setEndTimeHours] = useState(null)
  const [endTimeMinutes, setEndTimeMinutes] = useState(0)
  const [targetAudience, setTargetAudience] = useState(null)
  const [ageRestriction, setAgeRestriction] = useState(0)
  const [country, setCountry] = useState('')
  const [lowestPrice, setLowestPrice] = useState(0)

  const eventTypes = [
    {
      label: 'Online',
      value: 1
    },
    {
      label: 'In person',
      value: 2
    },
    {
      label: 'Hybrid',
      value: 3
    }
  ]

  const content = ''

  const editor = useEditor({
    content,
    extensions,
    editable: true
  })

  const notifyError = () =>
    toast.error('Check missing details', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light'
    })

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles[0]) {
      const imageURL = URL.createObjectURL(acceptedFiles[0])
      setImageToCrop(imageURL)
      setShowCropperModal(true)
    }
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  // const removeImage = () => {
  //   setImageToCrop(null)
  //   setShowCropperModal(false)
  //   setImageToCrop(null)
  //   setCroppedImage(null)
  //   setResizedCover(null)
  //   setResizedThumbnail(null)
  //   setResizedCoverURL(null)
  //   setResizedThumbnailURL(null)
  // }

  // console.log('countriesList', typeof countriesList, countriesList)

  async function createResizedImages(croppedImageURL) {
    if (croppedImageURL) {
      fetch(croppedImageURL)
        .then((response) => response.blob())
        .then(async (blob) => {
          const imageFile = blob
          const coverOptions = {
            maxSizeMB: 0.3,
            maxWidthOrHeight: 672,
            initialQuality: 0.8,
            fileType: 'image/webp',
            useWebWorker: true
          }
          const thumbnailOptions = {
            maxSizeMB: 0.1,
            maxWidthOrHeight: 360,
            initialQuality: 0.8,
            fileType: 'image/webp',
            useWebWorker: true
          }
          try {
            const compressedCoverFile = await imageCompression(
              imageFile,
              coverOptions
            )
            const compressedThumbnailFile = await imageCompression(
              imageFile,
              thumbnailOptions
            )
            const coverURL = URL.createObjectURL(compressedCoverFile)
            const thumbnailURL = URL.createObjectURL(compressedThumbnailFile)

            setResizedCover(compressedCoverFile)
            setResizedThumbnail(compressedThumbnailFile)

            // these are only used in dev to show the images
            setResizedCoverURL(coverURL)
            setResizedThumbnailURL(thumbnailURL)
          } catch (error) {
            console.log(error)
          }
        })
    }
  }

  const createImageURL = (event) => {
    if (event && event.target) {
      try {
        const imageURL = URL.createObjectURL(event.target.files[0])
        if (imageURL) {
          setImageToCrop(imageURL)
          setShowCropperModal(true)
        }
      } catch (error) {
        console.log('create image error', error)
      }
    }
  }

  const updateCroppedImage = (img) => {
    if (img) {
      setCroppedImage(img)
      createResizedImages(img)
    }
  }

  const clearSelectedImageFile = () => {
    const fileButton = document.getElementById('post_image_file_input')
    if (fileButton) fileButton.value = null
  }

  const hideCropperModal = () => {
    setShowCropperModal(false)
    clearSelectedImageFile()
  }

  const hideYoutubeLinkModal = () => {
    setShowYoutubeLinkModal(false)
  }

  const createTagsArray = (categories) => {
    if (!categories) return null
    const tags = categories.map((item) => (item && item.value) || null)
    return tags
  }

  // submit the event here
  const handleEventUpload = async () => {
    const editorData = {
      eventTitle,
      resizedCover,
      resizedThumbnail,
      eventEndDate,
      targetAudience,
      startDateWithTime: addTimeToDate(
        eventStartDate,
        startingTimeHours,
        startingTimeMinutes,
        startingTimeAMPM
      ),
      editorContent: editor.getHTML(),
      eventType: selectedEventType,
      authorUsername: accountUsername,
      authorDisplayName: accountDisplayName,
      authorImageSmall: accountImageSmall,
      authorProfileColor: accountColorNumber,
      tagsArray: createTagsArray(selectedCategories)
    }

    // console.log('handle event upload', editorData)

    const dataIsValid = checkEventSubmitData(editorData)
    if (dataIsValid) {
      const toastId = toast.loading('Uploading event...')
      const result = await uploadSupabaseEvent(editorData)

      if (result && result.success) {
        toast.update(toastId, {
          render: 'Event created! 👌',
          type: 'success',
          autoClose: 2500,
          hideProgressBar: false,
          pauseOnHover: false,
          isLoading: false,
          draggable: false,
          progress: undefined,
          theme: 'light'
        })
      } else {
        toast.update(toastId, {
          render: 'Something went wrong 🤯',
          type: 'error',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          isLoading: false
        })
      }
    } else {
      notifyError()
    }
  }

  return (
    <>
      <PageHead title="" />

      {/* place account menu above toast */}
      <ToastContainer
        limit={3}
        transition={Flip}
        className="mt-12 select-none"
        position="top-right"
      />
      <Nav
        hideSearch
        showEventSubmitButton
        hideCreateEventButton
        handleEventUpload={handleEventUpload}
      />
      <CropperModal
        imageToCrop={imageToCrop}
        updateCroppedImage={updateCroppedImage}
        showCropperModal={showCropperModal}
        hideCropperModal={hideCropperModal}
      />
      <YoutubeLinkModal
        editor={editor}
        showYoutubeLinkModal={showYoutubeLinkModal}
        hideYoutubeLinkModal={hideYoutubeLinkModal}
      />

      <BodyWrapper>
        <MainDrawer />
        {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
        <main
          className={`content_padding_x mb-24 w-full ${
            showDesktopDrawer ? 'max-w-[56rem]' : 'max-w-[76rem]'
          }`}
        >
          <div className="mx-auto w-full max-w-[43rem] select-none pt-4">
            {/* section: Page Title ------------------------- */}
            <div className="mt-4 flex select-none items-center px-6">
              <div className="editor_divider_styles main_border_color my-0 border-dashed" />
              <div className="whitespace-nowrap px-6 text-base font-semibold">
                Create an event
              </div>
              <div className="editor_divider_styles main_border_color my-0 border-dashed" />
            </div>

            {/* section: Details ------------------------- */}
            <div className="mt-4 w-full" />
            <EditorSectionTitle title="1. Details" />

            {/* ------------------------- */}
            <div className="box_radius box_radius editor_box_styles w-full p-6">
              <div className="text-sm font-semibold">
                Name<span className="text-red-500"> *</span>
              </div>
              <div className="pt-2.5">
                <TextareaAutosize
                  placeholder="Name"
                  value={eventTitle}
                  maxRows={8}
                  className="input_radius editor_border_color w-full border px-2.5 py-2 text-base font-semibold leading-normal"
                  onChange={(e) => {
                    setEventTitle(e.target.value)
                  }}
                />
                {titleError && (
                  <div className="mt-2 w-full text-sm text-red-500">
                    This field is required
                  </div>
                )}
              </div>

              <div className="my-6 w-full border-b" />

              {/* ------------------------- */}

              <div className="mt-4f flex w-full flex-col gap-x-5">
                {/* dates ------------------------- */}
                <div className="flex w-full flex-row gap-5">
                  <div className="w-1/2">
                    <div className="pb-2.5 text-sm font-semibold">
                      Starting date <span className="text-red-500">*</span>
                    </div>
                    <div className="w-full">
                      <DayPickerDropdown
                        selectedDate={eventStartDate}
                        setEventDate={setEventStartDate}
                      />
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="pb-2.5 text-sm font-semibold">End date</div>
                    <div className="w-full">
                      <DayPickerDropdown
                        selectedDate={eventEndDate}
                        setEventDate={setEventEndDate}
                      />
                    </div>
                  </div>
                </div>

                {/* times ------------------------- */}
                <div className="my-6 w-full border-b" />

                <div className="flex w-full flex-row gap-5">
                  <div className="w-1/2">
                    <div className="pb-2.5 text-sm font-semibold">
                      Starts at <span className="text-red-500">*</span>
                    </div>
                    <div className="flex w-full items-center">
                      <SelectInput
                        placeholder="0"
                        options={timePickerHours}
                        setValue={setStartingTimeHours}
                      />
                      <div className="mx-2.5 font-semibold">:</div>
                      <SelectInput
                        placeholder="00"
                        options={timePickerMinutes}
                        setValue={setStartingTimeMinutes}
                      />
                      <div className="mx-2.5 font-semibold">:</div>
                      <SelectInput
                        placeholder="am"
                        options={timePickerAMPM}
                        setValue={setStartingTimeAMPM}
                      />
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="pb-2.5 text-sm font-semibold">Ends at</div>
                    <div className="flex w-full items-center">
                      <SelectInput
                        placeholder="0"
                        options={timePickerHours}
                        setValue={setEndTimeHours}
                      />
                      <div className="mx-2.5 font-semibold">:</div>
                      <SelectInput
                        placeholder="00"
                        options={timePickerMinutes}
                        setValue={setEndTimeMinutes}
                      />
                      <div className="mx-2.5 font-semibold">:</div>
                      <SelectInput
                        placeholder="am"
                        options={timePickerAMPM}
                        setValue={setEndTimeAMPM}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* section: Details ------------------------- */}
            <div className="box_radius box_radius editor_box_styles mt-6 w-full p-6">
              {/* <div className="w-full">
                <div className="pb-2.5 text-sm font-semibold">Location</div>

                <div className="">
                  <TextareaAutosize
                    type="text"
                    maxRows={8}
                    placeholder="Select a city"
                    className="box_radius w-full border border-black px-2 py-2 font-semibold"
                  />
                  {titleError && (
                    <div className="mt-2 w-full text-sm text-red-500">
                      This field is required
                    </div>
                  )}
                </div>
              </div> */}

              <div className="flex flex-row gap-5">
                <div className="w-1/2">
                  <div className="pb-2.5 text-sm font-semibold">
                    Type of event
                  </div>
                  <SelectInput
                    placeholder="Select a type"
                    options={eventTypes}
                    setValue={setSelectedEventType}
                  />
                </div>
                <div className="w-1/2">
                  <div className="pb-2.5 text-sm font-semibold">
                    Prices start at
                  </div>
                  <FormNumberInput
                    placeholder="No cost"
                    setValue={setLowestPrice}
                  />
                </div>
              </div>

              <div className="my-6 w-full border-b" />

              <div className="flex flex-row gap-5">
                <div className="w-1/2">
                  <div className="pb-2.5 text-sm font-semibold">Country</div>
                  <SelectInput
                    placeholder="Select a country"
                    options={countriesList}
                    setValue={setCountry}
                  />
                </div>
                <div className="w-1/2">
                  <div className="pb-2.5 text-sm font-semibold">
                    Age restriction
                  </div>
                  <FormNumberInput
                    placeholder="None"
                    setValue={setAgeRestriction}
                  />
                </div>
              </div>

              <div className="my-6 w-full border-b" />

              <div className="text-sm font-semibold">
                Venue<span className="text-red-500"> *</span>
              </div>
              <div className="pt-2.5">
                <TextareaAutosize
                  placeholder="Enter venue name"
                  value={venueName}
                  maxRows={8}
                  className="input_radius editor_border_color w-full border px-2.5 py-2.5 text-sm font-semibold leading-normal placeholder:font-normal"
                  onChange={(e) => {
                    setVenueName(e.target.value)
                  }}
                />
                {titleError && (
                  <div className="mt-2 w-full text-sm text-red-500">
                    This field is required
                  </div>
                )}
              </div>

              <div className="my-6 w-full border-b" />

              <div className="mt-6f pb-2.5 text-sm font-semibold">
                Categories<span className="text-red-500"> *</span>
              </div>
              <Select
                isMulti
                className=" text-sm"
                placeholder="Select"
                options={categoriesList}
                closeMenuOnSelect={false}
                classNames={{
                  control: () => 'force_rounded_md editor_border_color',
                  input: () => 'p-1.5',
                  placeholder: () => 'p-1.5 py-2',
                  singleValue: () => 'px-1.5 py-2',
                  multiValue: () => 'force_rounded_md p-1 text-base',
                  multiValueLabel: () => 'text-black mr-0.5 font-semibold',
                  multiValueRemove: () => 'force_rounded_md px-1.5',
                  option: () => 'px-3 py-1.5',
                  valueContainer: () => 'force_rounded_lg p-1'
                }}
                onChange={(values) => {
                  setSelectedCategories(values)
                }}
                isOptionDisabled={() =>
                  selectedCategories && selectedCategories.length >= 5
                }
              />
            </div>

            {/* section: Image Select ------------------------- */}
            <div className="mt-10 w-full" />
            <EditorSectionTitle title="2. Cover image" />

            <div className="w-full">
              <div className="box_radius editor_box_styles p-6 pb-3">
                <div className="input_radius duration-100f hover:border-blue-600f editor_border_color flex aspect-[2/1] w-full flex-col overflow-hidden border border-dashed bg-white">
                  <div className="pointer-events-none relative h-0 w-full">
                    <div className="aspect-[2/1] w-full opacity-30 blur-xl">
                      <img
                        draggable="false"
                        className="pointer-events-none h-full w-full overflow-hidden object-cover"
                        src={croppedImage || null}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className=" h-0 w-full">
                    <div
                      {...getRootProps()}
                      className="flex aspect-[2/1] w-full cursor-pointer flex-col items-center justify-center transition-colors hover:border-accent-main"
                    >
                      <Image
                        className={`h-12 w-12 text-neutral-200 ${
                          croppedImage && 'opacity-0f'
                        }`}
                      />
                      <p
                        className={`mt-2 text-sm font-semibold text-neutral-300 ${
                          croppedImage && 'opacity-0f'
                        }`}
                      >
                        Drop image here or click to select
                      </p>
                    </div>
                  </div>
                  <div className="pointer-events-none relative h-0 w-full">
                    <div className="aspect-[2/1] w-full">
                      <img
                        draggable="false"
                        className="input_radiusf pointer-events-none h-full w-full overflow-hidden object-contain"
                        src={croppedImage || null}
                        alt=""
                      />
                    </div>
                  </div>
                  <input {...getInputProps()} />
                </div>

                {/* Image select buttons */}

                <div className="mt-3 flex w-full justify-end gap-5 pb-0 text-sm text-black">
                  <button
                    type="button"
                    onClick={() => {
                      if (imageToCrop) setShowCropperModal(true)
                    }}
                    className="focus:outline- main_border_color flex items-center p-1 hover:underline"
                  >
                    Resize image
                  </button>
                  <button
                    type="button"
                    className="box_radius focus:outline- main_border_color flex min-w-[5rem] items-center p-1 hover:underline"
                    onClick={() => {
                      const fileButton = document.getElementById(
                        'post_image_file_input'
                      )
                      if (fileButton) fileButton.click()
                    }}
                  >
                    Select from device
                  </button>
                </div>
              </div>

              {/* <div className="editor_divider_styles main_border_color my-0" /> */}

              <div className="w-full">
                <input
                  id="post_image_file_input"
                  type="file"
                  className="file:box_radius file:border_color--main pointer-events-none hidden w-full select-none border-none text-sm text-neutral-500 file:mr-2.5 file:hidden file:border-0 file:border-solid file:pb-2.5 file:shadow-none focus:outline-none dark:text-neutral-500"
                  onChange={(event) => {
                    createImageURL(event)
                  }}
                />
              </div>
            </div>

            {/* section: Post & details ------------------------- */}
            <div className="mt-10 w-full" />
            <EditorSectionTitle title="3. Write about your event" />

            <div className="flex select-none justify-center">
              {/* section: Post ------------------------- */}
              <div className="w-full max-w-3xl">
                {editor && (
                  <div className="box_radius editor_box_styles tiptap_editor flex flex-col overflow-hidden">
                    <TiptapToolbar
                      editor={editor}
                      setShowYoutubeLinkModal={setShowYoutubeLinkModal}
                    />
                    <div className="w-full px-3 pb-3">
                      <div className="input_radius editor_border_color w-full border bg-white">
                        <EditorContent className="w-full" editor={editor} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* <PreviewImages
          croppedImage={croppedImage}
          resizedCoverURL={resizedCoverURL}
          resizedThumbnailURL={resizedThumbnailURL}
        /> */}
      </BodyWrapper>
    </>
  )
}

export default CreatePage
