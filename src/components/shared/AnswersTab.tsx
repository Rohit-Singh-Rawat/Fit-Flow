import { getUserAnswers } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types'
import AnswerCard from '../cards/AnswerCard';

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswersTab = async ({ searchParams, userId, clerkId }: Props) => {
  const {answers} = await getUserAnswers({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  })

  return (
    <>
      {answers.map((item) => (
        <AnswerCard
          key={item.id}
          clerkId={clerkId}
          id={item.id}
          question={{title:item.question!.title, id:item.question!.id}}
          author={item.author}
          upvotes={item.upvotes.length}
          createdAt={item.createdAt}
        />  
      ))}

      {/* <div className="mt-10">
        <Pagination 
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNextAnswer}
        />
      </div> */}
    </>
  )
}

export default AnswersTab