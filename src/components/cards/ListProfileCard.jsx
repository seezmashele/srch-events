import Link from 'next/link'
import { SuitHeart, ChevronDown } from 'react-bootstrap-icons'

const ListProfileCard = ({ data }) => {
  const tempTags = [
    'Valorant',
    'Apex Legends',
    'Twitch',
    'YouTube',
    'Overwatch',
    'MMO',
    'Fifa',
    'Sandbox',
    'Indie',
    'Tournament',
    'Guide',
    'Rocket League',
    'Sea of Thieves',
    'Minecraft',
    'Dota',
    'Rust',
    'GTA',
    'V Rising',
    'Vanguard',
    'Cyberpunk',
    'Skyrim',
    'Announcement',
    'Cosplay',
  ].sort(() => Math.random() - 0.5)
  tempTags.splice(4)

  const cardTitle = data.title
  const cardImage = data.coverImage
  const cardLink = data.slug ? `/profile/${data.slug}` : '/'
  const cardTags = data.tags || tempTags
  const cardOverview = data.overview

  return (
    <div className="card_container border_color--main relative w-full min-w-sm flex-grow overflow-hidden border-b pb-3">
      <div className="flex w-full select-none items-center space-x-8">
        <Link href={cardLink} passHref>
          <div className="image_bg relative left-0 top-0 inline-block h-28 w-28 cursor-pointer overflow-hidden rounded-full">
            <img
              draggable="false"
              className="absolute left-0 h-full w-full object-cover"
              src={cardImage}
              alt={cardTitle}
            />
          </div>
        </Link>
        <div className="relative inline-block w-1/2 flex-grow pb-0">
          <Link href={cardLink} passHref>
            <div className="card_title table max-h-14 font-normal">
              {cardTitle}
            </div>
          </Link>
          <div className="mt-3 flex items-center text-sm text-neutral-600">
            <span className="inline_publish_time text-sm">@{data.slug}</span>
            {/* <div className="mx-1.5 h-0.5 w-0.5 rounded-full bg-neutral-500" /> */}
            {/* <span className="inline_publish_time text-xs">309 Followers</span> */}
            {/* <div className="box_radius dark:bg bg-neutral-50F px-1 pb-0.5 text-xs">
              gaming, meetup
            </div> */}
          </div>
          <div className="mt-1 max-h-14 w-full max-w-xl overflow-hidden truncate text-sm">
            {cardOverview}
          </div>
          <div className="card_tags_container flexF mt-4 hidden space-x-2">
            {cardTags &&
              cardTags.map((item, index) => (
                <div
                  key={`articleCard${item.slug}${index}`}
                  className="darkmode_transition box_radius bg-neutral-100 px-2 pb-0.5 text-sm text-neutral-700 dark:bg-opacity-20 dark:text-neutral-100"
                >
                  {item}
                  {/* {index < cardTags.length - 1 && ','} */}
                </div>
              ))}
          </div>
        </div>
        <div className="text-whiteF flex h-9 cursor-pointer items-center justify-center rounded-full bg-neutral-100 px-3.5 text-sm font-semibold hover:bg-neutral-200">
          <SuitHeart className="mr-2.5" />
          <span>Saved</span>
          <ChevronDown className="ml-2.5" />
        </div>
      </div>
    </div>
  )
}

export default ListProfileCard
