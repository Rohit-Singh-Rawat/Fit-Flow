import Link from 'next/link';
import React from 'react'
import { Badge } from "@/components/ui/badge"

interface Props {
  _id: string;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
  maxWidthClass?:string
}

const RenderTag = ({ _id, name, totalQuestions, showCount ,maxWidthClass}: Props) => {
  return (
    <Link
      href={`/tags/${_id}`}
      className="flex items-baseline justify-between gap-2 "
    >
      <Badge
        className={`${maxWidthClass} subtle-medium background-light400_dark300 text-blue_light500 rounded-md border-[#99B8FF] px-4 py-2 uppercase shadow-light-500 dark:border-light-500/20`}
      >
        <p className='truncate'>{name}</p>
      </Badge>

      {showCount && (
        <p className="small-medium text-dark500_light700">{totalQuestions}</p>
      )}
    </Link>
  );
}

export default RenderTag