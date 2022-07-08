/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";

import { postCollection, ObjectId, IPost } from "../../utils/db.ts";
import UpdatePost from "../../islands/UpdatePost.tsx";

type PostData = {
  formData?: { title: string; content: string };
  errors?: { title: string | null; content: string | null };
};

export const handler: Handlers<PostData> = {
  async GET(_, ctx) {
    const id = ctx.params.id;

    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid id");
    }

    const post = await postCollection.findOne({ _id: new ObjectId(id) });

    if (!post) {
      throw new Error("Post not found");
    }

    return ctx.render({ formData: post });
  },
  async POST(req, ctx) {
    const id = ctx.params.id;

    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid id");
    }

    const post = await postCollection.findOne({ _id: new ObjectId(id) });

    if (!post) {
      throw new Error("Post not found");
    }

    const formData = await req.formData();
    const title = formData.get("title");
    const content = formData.get("content");

    if (typeof title !== "string") {
      throw new Error("Title must a string");
    }

    if (typeof content !== "string") {
      throw new Error("Content must a string");
    }

    const errors: PostData["errors"] = {
      title: title ? null : "Title is required",
      content: content ? null : "Content is required",
    };
    const hasErrors = Object.values(errors).some((e) => e !== null);

    if (hasErrors) {
      return ctx.render({ errors, formData: { title, content } });
    }

    await postCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, content, updatedAt: new Date() } }
    );

    return ctx.render({ formData: { title, content } });
  },
  async DELETE(req, ctx) {
    const id = ctx.params.id;

    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid id");
    }

    const post = await postCollection.findOne({ _id: new ObjectId(id) });

    if (!post) {
      throw new Error("Post not found");
    }

    await postCollection.deleteOne({ _id: new ObjectId(id) });

    return new Response(undefined, { status: 200 });
  },
};

export default function Page({ data, params }: PageProps<PostData>) {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <title>{data?.formData?.title}</title>
      <a href="/" class={tw`hover:underline`}>
        {"<"} Back
      </a>
      <h2 class={tw`font-bold text-2xl my-3`}>{data?.formData?.title}</h2>
      <p>{data?.formData?.content}</p>
      <UpdatePost formData={data?.formData} errors={data?.errors} />
    </div>
  );
}
