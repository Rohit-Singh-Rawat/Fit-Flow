import Link from 'next/link';
import React from 'react'
import { Badge } from "@/components/ui/badge"

interface Props {
  _id: string;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
}

const RenderTag = ({ _id, name, totalQuestions, showCount }: Props) => {
  return (
    <Link href={`/tags/${_id}`} className="flex justify-between gap-2">
      <Badge className="subtle-medium background-light700_dark300 text-dark500_light500 rounded-md border-x-light-500 shadow-light-500  px-4 py-2 uppercase dark:border-transparent">
        {name}
      </Badge>

      {showCount && (
        <p className="small-medium text-dark500_light700">{totalQuestions}</p>
      )}
    </Link>
  );
}

export default RenderTag