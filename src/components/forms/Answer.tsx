"use client";
import {  useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AnswerSchema } from "@/lib/validations";
import { Loader } from "lucide-react";
import { usePathname } from "next/navigation";
import { createAnswer } from "@/lib/actions/answer.action";

type Props = { question: string; questionId: string; authorId?: string };

const Answer =({ question, questionId, authorId }: Props) => {
  const pathName = usePathname();

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });
  const editorRef = useRef(null);

  const handleCreateAnswer = async (values: z.infer<typeof AnswerSchema>) => {
    if (!authorId) {
      form.setError("answer", { type: "custom", message: "sign in to asnwer" });
      return;
    }
    try {
      await createAnswer({
        content: values.answer,
        authorId: authorId,
        questionId: questionId,
        path: pathName,
      });

      form.reset();

      if (editorRef.current) {
        const editor = editorRef.current as any;

        editor.setContent("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="mt-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write your answer here
        </h4>
        <Button>Generate an AI Answer</Button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateAnswer)}
          className="flex w-full flex-col items-center justify-center gap-10"
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  {(
                    <Editor
                      apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                      //@ts-ignore
                      onInit={(_evt, editor) => (editorRef.current = editor)}
                      initialValue=""
                      onBlur={field.onBlur}
                      onEditorChange={(content) => field.onChange(content)}
                      init={{
                        height: 350,
                        menubar: false,
                        plugins: [
                          "advlist",
                          "autolink",
                          "lists",
                          "link",
                          "image",
                          "charmap",
                          "preview",
                          "anchor",
                          "searchreplace",
                          "visualblocks",
                          "codesample",
                          "fullscreen",
                          "insertdatetime",
                          "media",
                          "table",
                          "code",
                          "help",
                          "wordcount",
                        ],
                        codesample_languages: [
                          { text: "HTML/XML", value: "markup" },
                          { text: "JavaScript", value: "javascript" },
                          { text: "CSS", value: "css" },
                          { text: "PHP", value: "php" },
                          { text: "Ruby", value: "ruby" },
                          { text: "Python", value: "python" },
                          { text: "Java", value: "java" },
                          { text: "C", value: "c" },
                          { text: "C#", value: "csharp" },
                          { text: "C++", value: "cpp" },
                          { text: "Other", value: "other" },
                        ],
                        toolbar:
                          "undo redo | blocks | " +
                          "codesample image | bold italic forecolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat | help",
                        file_picker_types: "image",
                        file_picker_callback: (callback, value, meta) => {
                          // Provide file and text for the link dialog
                          if (meta.filetype == "file") {
                            callback("mypage.html", { text: "My text" });
                          }

                          // Provide image and alt text for the image dialog
                          if (meta.filetype == "image") {
                            callback("myimage.jpg", { alt: "My alt text" });
                          }

                          // Provide alternative source and posted for the media dialog
                          if (meta.filetype == "media") {
                            callback("movie.mp4", {
                              source2: "alt.ogg",
                              poster: "image.jpg",
                            });
                          }
                        },

                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
                      }}
                    />
                  ) ?? (
                    <Loader className="size-5 w-full animate-spin text-center" />
                  )}
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />{" "}
          <Button
            type="submit"
            className="w-56 bg-gradient-to-r from-[#00A7FF] to-[#63CAFD] font-medium text-white"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader className="x animate-spin text-center" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Answer;
