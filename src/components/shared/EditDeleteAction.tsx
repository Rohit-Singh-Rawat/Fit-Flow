"use client";

import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import { usePathname, useRouter } from "next/navigation";
import EditIcon from "../Icons/EditIcon";
import DeleteIcon from "../Icons/DeleteIcon";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
interface Props {
  type: string;
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/questions/edit/${JSON.parse(itemId)}`);
  };

  const handleDelete = async () => {
    if (type === "Question") {
      // Delete question
      await deleteQuestion({
        questionId: JSON.parse(itemId),
        path: pathname,
      });
      toast.success("Question deleted successfully");
    } else if (type === "Answer") {
      await deleteAnswer({
        answerId: JSON.parse(itemId),
        path: pathname,
      });
      toast.success("Answer deleted successfully");
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-end gap-3 max-sm:w-full">
      {type === "Question" && (
        <button
          className="flex size-7 items-center justify-center"
          onClick={handleEdit}
        >
          <EditIcon className="stroke-black dark:stroke-white/50" />
        </button>
      )}

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="size-7 bg-transparent">
            <DeleteIcon className="size-5 stroke-red-600 dark:fill-white" />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="rounded-lg bg-white p-6 text-black shadow-lg dark:bg-black dark:text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground mt-2">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4 flex justify-end">
            <AlertDialogCancel className="mr-2 rounded border border-black bg-white px-4 py-2 text-black dark:border-white dark:bg-black dark:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="rounded bg-black px-4 py-2 text-white dark:bg-white dark:text-black"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EditDeleteAction;
