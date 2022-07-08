/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { postCollection } from "../../utils/db.ts";
import PostForm from "../../components/PostForm.tsx";

type ErrorData = {
  title: string | null;
  content: string | null;
};

type Props = {
  errors?: ErrorData;
  formData?: {
    title: string;
    content: string;
  };
};

export const handler: Handlers<Props> = {
  async POST(req, ctx) {
    const formData = await req.formData();
    const title = formData.get("title");
    const content = formData.get("content");

    if (typeof title !== "string") {
      throw new Error("Title must a string");
    }

    if (typeof content !== "string") {
      throw new Error("Content must a string");
    }

    const errors: ErrorData = {
      title: title ? null : "Title is required",
      content: content ? null : "Content is required",
    };
    const hasErrors = Object.values(errors).some((e) => e !== null);

    if (hasErrors) {
      return ctx.render({ errors, formData: { title, content } });
    }

    const postId = await postCollection.insertOne({
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return new Response(undefined, {
      status: 302,
      headers: {
        Location: `/posts/${postId.toString()}`,
      },
    });
  },
};

export default function NewPost({ data }: PageProps<Props>) {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <title>New Post</title>
      <h1 class={tw`font-bold text-3xl my-3`}>New Post</h1>
      <PostForm formData={data?.formData} errors={data?.errors} />
    </div>
  );
}
