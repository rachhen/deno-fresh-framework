/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export type PostFormProps = {
  formData?: { title: string; content: string };
  errors?: { title: string | null; content: string | null };
};

function PostForm({ formData, errors }: PostFormProps) {
  return (
    <form method="post" class={tw`block`}>
      <div class={tw`flex mb-3 flex-col`}>
        <label for="title" class={tw`block text-gray-600`}>
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          defaultValue={formData?.title}
          class={tw`w-full border rounded py-2 px-3`}
        />
        {errors?.title && (
          <span class={tw`text-red-500 text-sm`}>{errors.title}</span>
        )}
      </div>
      <div class={tw`flex mb-3 flex-col`}>
        <label for="content" class={tw`block text-gray-600`}>
          Content
        </label>
        <textarea
          name="content"
          id="content"
          cols={30}
          rows={10}
          defaultValue={formData?.content}
          class={tw`w-full border rounded py-2 px-3`}
        ></textarea>
        {errors?.content && (
          <span class={tw`text-red-500 text-sm`}>{errors.content}</span>
        )}
      </div>
      <button
        type="submit"
        class={tw`bg-blue-500 px-5 py-2 text-white rounded hover:bg-blue-600`}
      >
        Submit
      </button>
    </form>
  );
}

export default PostForm;
