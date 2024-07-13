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
  };
};
const UserCard = async ({ user }: Props) => {
  return (
    <div className="shadow-light100-darknone w-full max-xs:min-w-full xs:w-[260px]">
      <article className="background-background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <Link href={`/profile/${user.clerkId}`} className="flex flex-col justify-center items-center">
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
            <p className="body-regular text-dark500_light700 mt-2">
              @{user.username}
            </p>
          </div>
        </Link>

        <div className="mt-5">
          <div className="flex items-center gap-2">
            {" "}
            {["tag1", "tag2", "tag3"].map((tag, index) => (
              <RenderTag name={tag} _id={String(index)} key={index} />
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};
export default UserCard;
