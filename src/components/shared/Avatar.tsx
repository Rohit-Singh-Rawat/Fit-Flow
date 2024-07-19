import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

type Props = {
  imageUrl: string;
  altText: string;
  size?: string;
  id?: string;
};

const Avatar: React.FC<Props> = ({
  imageUrl,
  altText,
  size = "size-8",
  id,
}) => {
  const avatarClass = cn(
    "border-2 dark:border-[#3A3D3E] border-black   size-7 rounded-full ",
    size,
  );

  return (
    <Link href={`/profile/${id}`}>
      <div className={avatarClass}>
        <Image
          src={imageUrl}
          alt={altText}
          className="h-full w-full rounded-full"
          width={20}
          height={20}
          id={id}
        />
      </div>
    </Link>
  );
};

export default Avatar;
