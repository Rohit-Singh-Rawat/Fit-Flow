import Question from "@/components/forms/Question";

type Props = {};
const page = (props: Props) => {
  return (
    <div className="">
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <Question />
      </div>
    </div>
  );
};
export default page;
