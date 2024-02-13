import Link from 'next/link'
import ListArticleCardLoader from '../loaders/ListArticleCardLoader'
// import { getPostAge } from '../../utils/helpers/time'

const ListEventCard = ({ data, isLastItem = false }) => {
  const cardTitle = data.title
  const cardImage = data.thumbnailImage
  const cardLink = data.slug ? `/event/${data.slug}` : '/'
  const cardAuthor = data.author ? data.author : 'missdiablo'

  return data.placeholder ? (
    <ListArticleCardLoader isLastItem={isLastItem} />
  ) : (
    <div className="card_container w-1/2f relative mb-5 w-full flex-grow overflow-hidden">
      <div className="flex w-full select-none space-x-5  pr-5">
        <Link
          href={cardLink}
          passHref
          className="card_radius relative left-0 top-0 inline-block aspect-3/2 w-60 cursor-pointer overflow-hidden"
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
            <div className="mt-2 flex text-sm">
              <div className="">
                <Link href={cardLink} passHref>
                  <div className="card_title max-h-14 overflow-hidden pt-0 text-lg leading-snug text-black">
                    {cardTitle}
                  </div>
                </Link>
                <div className="mt-4 text-sm font-semibold">
                  Sat, Sep 9, 5:00 PM
                </div>
                <div className="mt-1 flex select-none items-center text-sm text-neutral-500">
                  <p className="">{cardAuthor}</p>
                  <div className="mx-1.5 mt-0.5 h-0.5 w-0.5 rounded-full bg-neutral-500" />
                  <p>8k views</p>
                </div>
              </div>
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
