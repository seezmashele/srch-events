import { XLg } from 'react-bootstrap-icons'
import Dialog from '@mui/material/Dialog'
import { useState } from 'react'

/* eslint-disable no-console */
// make titles and messages not selectable
// limit videos to 5 per event

const YoutubeLinkModal = ({
  editor,
  showYoutubeLinkModal,
  hideYoutubeLinkModal
}) => {
  const [videoLink, setVideoLink] = useState('')
  const [videoLinkError, setVideoLinkError] = useState('')

  const embedVideo = () => {
    console.log('embedding video link', videoLink)
    if (videoLink) {
      const result = editor.commands.setYoutubeVideo({
        src: videoLink
      })
      if (result) {
        hideYoutubeLinkModal(true)
        setVideoLink('')
        setVideoLinkError('')
      } else {
        setVideoLinkError('Please enter a valid YouTube link')
      }
    } else {
      setVideoLinkError('Please enter a valid YouTube link')
    }
  }

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      scroll="body"
      onClose={null}
      open={showYoutubeLinkModal}
      className="select-none"
    >
      <div className="flex w-full items-start justify-between p-1">
        <div className="pl-3 pt-3 ">
          <h3 className="text-lg font-semibold">Embed YouTube Video</h3>
          <p className="mt-1 text-sm">
            Copy and paste a YouTube link to add to your event
          </p>
        </div>
        <button
          type="button"
          aria-label="Close"
          className="box_radius p-3 hover:bg-neutral-100"
          onClick={() => {
            hideYoutubeLinkModal()
            setVideoLink('')
            setVideoLinkError('')
          }}
        >
          <XLg />
        </button>
      </div>
      <div className="relative w-full p-3">
        <input
          type="text"
          value={videoLink}
          className="box_radius login_input_styling mt-1.5 w-full"
          onChange={(e) => {
            setVideoLink(e.target.value)
          }}
        />
      </div>
      {videoLinkError && (
        <div className="mt-2 w-full px-3">
          <div className="box_radius w-full bg-red-100 p-3 text-center text-sm text-red-500 ">
            {videoLinkError}
          </div>
        </div>
      )}
      <div className="relative w-full p-3">
        <button
          type="button"
          aria-label="set link"
          onClick={embedVideo}
          className="button_styles right-0 ml-auto px-4"
        >
          Embed video
        </button>
      </div>
    </Dialog>
  )
}

export default YoutubeLinkModal
