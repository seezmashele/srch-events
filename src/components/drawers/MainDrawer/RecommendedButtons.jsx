import Link from 'next/link'

const RecommendedButtons = ({ recommendedProfiles, hideTitle = false }) => (
  <>
    <div
      className={`${!hideTitle && 'lg:block'} drawer_section_title xs:hidden`}
    >
      Recommended
    </div>
    {recommendedProfiles.map((item, index) => (
      <Link
        href={item.slug ? `/profile/${item.slug}` : ''}
        passHref
        key={`drawer-profile${item.title}${index}`}
        className="box_radius flex cursor-pointer items-center overflow-hidden py-2 pl-3 pr-2.5 hover:bg-neutral-100"
      >
        <div className="mr-5 h-6 w-6 flex-shrink-0 overflow-hidden rounded-full">
          <img src={item.image} alt="recommended profile" />
        </div>
        <div className="whitespace-nowrap pl-0.5 text-sm">{item.title}</div>
      </Link>
    ))}
  </>
)

export default RecommendedButtons
