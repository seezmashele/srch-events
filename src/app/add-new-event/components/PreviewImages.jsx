const PreviewImages = ({ croppedImage, image1URL, image2URL }) => (
  <div className="mb-50 flex flex-col gap-6 p-6">
    {croppedImage && (
      <div className="box_radius bg-neutral-100 p-6">
        {/* <div>Cropped</div> */}
        <img src={croppedImage} alt="resized cover" />
      </div>
    )}
    {image1URL && (
      <div className="box_radius bg-neutral-100 p-6">
        {/* <div>image 1</div> */}
        <img src={image1URL} alt="resized cover" />
      </div>
    )}
    {image2URL && (
      <div className="box_radius bg-neutral-100 p-6">
        {/* <div>image 2</div> */}
        <img src={image2URL} alt="resized thumbnail" />
      </div>
    )}
  </div>
)

export default PreviewImages
