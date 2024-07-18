import Link from "next/link"
import { ReactNode } from "react"

type Props = {href?:string,title:string, icon :ReactNode}
const ProfileLink = ({icon,title,href}: Props) => {
  return (
    <div className="flex-center gap-1">
      {icon}
      {href ? (
        <Link href={href} className="paragraph-medium text-blue-500">
          {title}
        </Link>
      ) : (
        <p className="paragraph-medium text-dark400_light700">{title}</p>
      )}
    </div>
  );
}
export default ProfileLink