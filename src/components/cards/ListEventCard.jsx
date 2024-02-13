import Link from 'next/link'
import ListArticleCardLoader from '../loaders/ListArticleCardLoader'
// import { getPostAge } from '../../utils/helpers/time'

const ListEventCard = ({ data, isLastItem = false }) => {
  const cardTitle = data.title
  const cardImage = data.thumbnailImage
  const cardLink = data.slug ? `/event/${data.slug}` : '/'
  const cardStartingDate = data.eventStartingDate || ''
  const authorProfileLink = data.authorUsername
    ? `/profile/${data.authorUsername}`
    : '/'
  const cardAuthor = data.authorDisplayName ? data.authorDisplayName : ''
  const upvotes = data.upvotes || ''
  // const [isLoading, setIsLoading] = useState(true)

  return data.placeholder ? (
    <ListArticleCardLoader isLastItem={isLastItem} />
  ) : (
    <div className="card_container w-fullf relative mb-5 w-1/2 flex-grow overflow-hidden">
      <div className="flex w-full select-none space-x-5  pr-5">
        <Link
          href={cardLink}
          passHref
          className="card_radius relative left-0 top-0 inline-block aspect-video w-40 flex-shrink-0 flex-grow-0 cursor-pointer overflow-hidden"
        >
          <div>
            <img
              draggable="false"
              className="image_bg absolute left-0 h-full w-full object-cover"
              src={cardImage}
              alt={cardTitle}
            />
          </div>
        </Link>
        <div className="relative inline-block w-1/2 flex-grow">
          <div className="relative inline-block flex-grow">
            <div className="mt-2 text-sm">
              <Link href={cardLink} passHref>
                <div className="card_title max-h-12 select-text overflow-hidden pt-0 text-lg leading-snug text-black">
                  {cardTitle}
                </div>
              </Link>
              <div className="mt-2.5 w-full text-neutral-600">
                <div>{cardStartingDate}</div>
                <div className="flex items-center">
                  <Link
                    href={authorProfileLink}
                    passHref
                    className="cursor-pointer hover:underline"
                  >
                    {cardAuthor}
                  </Link>
                  <div className="mx-1.5 mt-0.5 h-0.5 w-0.5 rounded-full bg-neutral-500" />
                  <p>{upvotes} upvotes</p>
                </div>
              </div>
              {/* <div className="mt-0.5f font-medium">Free</div> */}
            </div>
          </div>
        </div>
      </div>
      {!isLastItem && (
        <div className="border_color--main mt-4 w-full border-b" />
      )}
    </div>
  )
}

export default ListEventCard
