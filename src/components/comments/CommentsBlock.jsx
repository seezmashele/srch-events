const CommentsBlock = () => (
  <div className="mt-12 w-full">
    <div className="flex w-full">
      <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-rose-500 text-lg font-semibold text-white">
        S
      </div>
      <div className="flex w-full flex-col">
        <input
          placeholder="Add a comment"
          type="text"
          className="w-full border-b pb-1 focus:border-black focus:outline-none"
        />
        <div className="mt-2.5 flex justify-end">
          <button
            type="button"
            className="mr-2.5 px-4 py-2.5 text-sm font-semibold"
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-full bg-neutral-100 px-4 py-2.5 text-sm font-semibold text-neutral-500"
          >
            Comment
          </button>
        </div>
      </div>
    </div>

    <div className="mt-7">
      <div className="mb-8 flex w-full">
        <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500 text-lg font-semibold text-white">
          T
        </div>
        <div className="flex w-full flex-col">
          <div className="flex items-center text-sm">
            <div className="font-semibold">@thecoolkidchris</div>
            <div className="mx-1.5 mt-0.5 h-[2px] w-[2px] rounded-full bg-neutral-500" />
            <div className="select-none text-xs text-neutral-500">
              1 day ago
            </div>
          </div>
          <p className="text-smf mt-2">
            MyAnimeList, often abbreviated as MAL, is an anime and manga social
            networking and social cataloging application website run by
            volunteers. The site provides its users with a list-like system to
            organize and score anime and manga. Wikipedia
          </p>
        </div>
      </div>
      <div className="flex w-full">
        <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500 text-lg font-semibold text-white">
          M
        </div>
        <div className="flex w-full flex-col">
          <div className="flex items-center text-sm">
            <div className="font-semibold">@mariahsonfire69</div>
            <div className="mx-1.5 mt-0.5 h-[2px] w-[2px] rounded-full bg-neutral-500" />
            <div className="select-none text-xs text-neutral-500">
              2 day ago
            </div>
          </div>
          <p className="text-smf mt-2">
            If you liked previous seasons of Kaguya, just go ahead and watch
            this one, youll like it. If you werent too fond of the previous
            seasons, id argue to still give it a try, because the format of
            ultimately irrelevant mini stories changes this season more towards
            bigger arcs that actually drive the story forward. Its a good mix
            between comedy, romance and wholesomeness. Recommended.
          </p>
        </div>
      </div>
    </div>
  </div>
)

export default CommentsBlock
