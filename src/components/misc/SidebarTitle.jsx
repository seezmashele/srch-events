const SidebarTitle = ({ title = "" }) => (
  <div className="flex flex-col px-5">
    <h2 className="uppercaseF text-[.75rem]F tracking-widerF pointer-events-none mb-3 select-none truncate align-middle font-semibold leading-7">
      {title}
    </h2>
    {/* <div className="border_color--main border-bF mb-4 w-full" /> */}
    <div className="border_color--main border-bF mb-1 w-full" />
  </div>
)

export default SidebarTitle
