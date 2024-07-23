import Image from "next/image";
import Link from "next/link";
import RenderTag from "../shared/RenderTag";

type Props = {
  user: {
    id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
    topTags: {
      id: string;
      name: string;
      description: string | null;
      createdAt: Date;
    }[];
  };
};
const UserCard = async ({ user }: Props) => {
  return (
    <div className="shadow-light100-darknone w-full max-xs:min-w-full xs:w-[260px]">
      <article className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-[#F0F0F0] bg-gradient-to-br dark: from-white from-50% via-slate-300/20 via-70% to-white px-5 py-8 dark:border-dark-300 dark:bg-dark-200 dark:from-dark-200  dark:to-dark-200">
        <Link
          href={`/profile/${user.clerkId}`}
          className="flex flex-col items-center justify-center"
        >
          {" "}
          <Image
            src={user.picture}
            alt={user.name}
            width={70}
            height={70}
            className="rounded-full border-2"
          />
          <div className="mt-4 text-center">
            <h3 className="h3-bold text-dark200_light900 line-clamp-1">
              {user.name}
            </h3>
            <p className="body-regular text-blue_light500 mt-2">
              @{user.username}
            </p>
          </div>
        </Link>

        <div className="mt-5 w-full">
          <div className="flex w-full flex-wrap items-center justify-center gap-2">
            {" "}
            {user.topTags && user.topTags.length > 0 ? (
              user.topTags.map((tag, index) => (
                <RenderTag
                  maxWidthClass=""
                  name={tag.name}
                  _id={tag.id}
                  key={index}
                />
              ))
            ) : (
              <RenderTag
                maxWidthClass="flex-1"
                name="No tags yet"
                _id="no-tags"
                key="no-tags"
              />
            )}
          </div>
        </div>
      </article>
    </div>
  );
};
export default UserCard;
