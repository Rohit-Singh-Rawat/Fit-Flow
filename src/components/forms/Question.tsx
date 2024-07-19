"use client";
import { KeyboardEvent, useRef } from "react";
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
import { Input } from "@/components/ui/input";
import { QuestionsSchema } from "@/lib/validations";
import { Files, Loader, X } from "lucide-react";
import { Badge } from "../ui/badge";
import { resolve } from "path";
import { createQuestion } from "@/lib/actions/question.action";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = { userId: string };

const Question = ({ userId }: Props) => {
  const router = useRouter();
  const pathName = usePathname();

  const form = useForm<z.infer<typeof QuestionsSchema>>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: {
      explanation: "",
      tags: [],
      title: "",
    },
  });
  const editorRef = useRef(null);

  async function onSubmit(values: z.infer<typeof QuestionsSchema>) {
    try {
      await createQuestion({
        authorId: userId,
        title: values.title,
        content: values.explanation,
        tags: values.tags,
        path: pathName,
      });
      toast.success("Question created successfully");
      router.push("/");
    } catch (error) {
      toast.error("Error Occurred");}
  }
  const handleInputKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    field: any,
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();
      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim().toLowerCase();
      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tag must be less than 15 characters.",
          });
        }
        if (!field.value.includes(tagValue)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = " ";
          form.clearErrors("tags");
        } else {
          form.trigger();
        }
      }
    }
  };
  const handleTagRemove = (tag: any, field: any) => {
    const newFields = field.value.filter((t: string) => t !== tag);
    form.setValue(field.name, newFields);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center justify-center gap-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800 font-semibold">
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  {...field}
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light900 min-h-[56px] border-2"
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-dark-100 dark:text-light-500">
                Be specific and imagine you're asking a question to another
                person
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800 font-semibold">
                What are the details of your problem?
                <span className="text-primary-500">*</span>
              </FormLabel>
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
              <FormDescription className="body-regular mt-2.5 text-dark-100 dark:text-light-500">
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800 font-semibold">
                Tags <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <>
                  <Input
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light900 min-h-[56px] border-2"
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                  {field.value.length > 0 && (
                    <div className="flex-start mt-2.5 gap-2.5">
                      {field.value.map((tag: any) => {
                        return (
                          <Badge
                            key={tag}
                            className="subt1e-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-[#C9CED6] px-4 py-2 capitalize dark:border-[#564545]"
                          >
                            {tag}
                            <X
                              className="size-3 cursor-pointer fill-black object-contain dark:fill-white"
                              onClick={() => handleTagRemove(tag, field)}
                            />
                          </Badge>
                        );
                      })}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-dark-100 dark:text-light-500">
                Add up to 5 tags to describe what your question is about. Start
                typing to see suggestions.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
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
  );
};
export default Question;