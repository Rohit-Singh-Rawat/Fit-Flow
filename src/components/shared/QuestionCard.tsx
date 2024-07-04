import Link from "next/link";
import React from "react";
import RenderTag from "./RenderTag";

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
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        {" "}
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {String(createdAt)}
          </span>
          <Link href={`question/${id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-2 flex-1 sm:line-clamp-3">
              {title}
            </h3>
          </Link>
        </div>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2 ">
        {tags.map((tag) => (
          <RenderTag _id={String(tag._id)} name={tag.name} key={tag._id} />
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3"></div>
    </div>
  );
};

export default QuestionCard;
