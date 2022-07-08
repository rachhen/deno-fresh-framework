/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { postCollection, IPost } from "../utils/db.ts";

export const handler: Handlers<IPost[]> = {
  async GET(req, ctx) {
    const posts = await postCollection.find().toArray();

    return ctx.render(posts);
  },
};

export default function Home({ data }: PageProps<IPost[]>) {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <title>Post List</title>
      <a href="/posts/new" class={tw`text-red-500 text-xl hover:underline`}>
        Create Post
      </a>
      <ul class={tw`mt-5`}>
        {data.map((post) => (
          <li key={post._id.toString()}>
            <a
              href={`/posts/${post._id.toString()}`}
              class={tw`border p-3 mb-3 block rounded hover:opacity-75`}
            >
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
