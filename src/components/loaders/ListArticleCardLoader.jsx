const ListArticleCardLoader = ({ isLastItem = false }) => (
  <div className="card_container relative mb-7 w-full flex-grow animate-pulse overflow-hidden">
    <div className="flex w-full select-none space-x-5 pr-10">
      <div className="relative inline-block w-1/2 flex-grow overflow-hidden">
        <div className="mb-2.5 flex items-center text-sm">
          <div className="loader_bg_color mr-2 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full text-white" />
          <span className="box_radius loader_bg_color h-4 w-72" />
        </div>
        <div className="box_radius box_radius loader_bg_color h-4 overflow-hidden" />
        <div className="box_radius box_radius loader_bg_color mt-2 h-4 overflow-hidden" />
      </div>
      <div className="loader_bg_color box_radius w64 relative top-0 left-0 inline-block h-32 w-52 overflow-hidden" />
    </div>
    {!isLastItem && <div className="border_color--main mt-7 w-full border-b" />}
  </div>
)

export default ListArticleCardLoader
