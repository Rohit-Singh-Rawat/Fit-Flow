import Link from "next/link";
import React from "react";
import RenderTag from "./RenderTag";
import Metric from "./Metric";
import { Dot, MessageCircleMore, ThumbsUp, View } from "lucide-react";
import Avatar from "./Avatar";
import { getCompactNumber, getTime } from "@/lib/utils";

interface Tag {
  _id: number;
  name: string;
}
interface author {
  _id: string;
  name: string;
  picture: string;
}

interface QuestionProps {
  id: number;
  title: string;
  tags: Tag[];
  author: author;
  upvotes: number;
  views: number;
  answers: Array<object>;
  createdAt: string;
}

const QuestionCard = ({
  id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: QuestionProps) => {
  return (
    <div className="card-wrapper rounded-[15px] border p-9 dark:border-[#282626] sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        {" "}
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTime(createdAt)}
          </span>
          <Link href={`question/${id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-2 flex-1 sm:line-clamp-3">
              {title}
            </h3>
          </Link>
        </div>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag _id={String(tag._id)} name={tag.name} key={tag._id} />
        ))}
      </div>
      <div className="flex-between ga mt-6 flex w-full items-center">
        <div className="flex-between flex gap-2">
          <Avatar
            altText={author.name}
            imageUrl={author.picture}
            id={author._id}
          />
          <div className="flex items-center justify-center">
            <span className="small-medium text-[#676F75]">{author.name}</span>
            <Dot className="stroke-white max-sm:hidden" />
            <span className="small-medium line-clamp-1 text-[#676F75] max-sm:hidden">
              asked {getTime(createdAt)}
            </span>
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <Metric
            icon={<ThumbsUp className="size-4 stroke-[#676F75]" />}
            title="votes"
            value={getCompactNumber(upvotes)}
            textStyles="small-medium  text-[#676F75]"
          />
          <Metric
            icon={<View className="size-4 stroke-[#676F75]" />}
            title="Views"
            value={getCompactNumber(views)}
            textStyles="small-medium  text-[#676F75]"
          />
          <Metric
            icon={<MessageCircleMore className="size-4 stroke-[#676F75]" />}
            title="Answers"
            value={getCompactNumber(answers.length)}
            textStyles="small-medium  text-[#676F75]"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
