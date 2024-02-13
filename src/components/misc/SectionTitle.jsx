const SectionTitle = ({ title = '' }) => (
  <div className="pb-5 pt-5">
    <h3 className="pointer-events-none select-none truncate whitespace-nowrap align-middle text-xl font-semibold leading-7">
      {title}
    </h3>
    {/* <div className="border_color--main border-bF mb-4 w-full" /> */}
  </div>
)

export default SectionTitle
