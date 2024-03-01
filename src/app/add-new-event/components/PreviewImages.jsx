const PreviewImages = ({
  croppedImage,
  resizedCoverURL,
  resizedThumbnailURL
}) => (
  <div className="mb-50 flex flex-col gap-6 p-6">
    {croppedImage && (
      <div className="box_radius bg-neutral-100 p-6">
        <div>Cropped</div>
        <img src={croppedImage} alt="resized cover" />
      </div>
    )}
    {resizedCoverURL && (
      <div className="box_radius bg-neutral-100 p-6">
        <div>Cover</div>
        <img src={resizedCoverURL} alt="resized cover" />
      </div>
    )}
    {resizedThumbnailURL && (
      <div className="box_radius bg-neutral-100 p-6">
        <div>thumbnail</div>
        <img src={resizedThumbnailURL} alt="resized thumbnail" />
      </div>
    )}
  </div>
)

export default PreviewImages
