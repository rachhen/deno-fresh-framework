/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";
import { tw } from "@twind";
import PostForm, { PostFormProps } from "../components/PostForm.tsx";

function UpdatePost(props: PostFormProps) {
  const [isUpdate, setIsUpdate] = useState(false);

  const handleDelete = async (
    e: h.JSX.TargetedMouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!confirm("Are you sure?")) {
      return false;
    }

    const res = await fetch(window.location.href, { method: "DELETE" });

    if (res.ok) {
      return (window.location.href = "/");
    }

    alert("Failed to delete post");
  };

  return (
    <div class={tw`mt-5`}>
      <div class={tw`flex flex-row pb-5`}>
        <button
          onClick={handleDelete}
          class={tw`bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600`}
        >
          Delete
        </button>
        <button
          onClick={() => setIsUpdate(!isUpdate)}
          class={tw`bg-blue-500 text-white px-5 py-2 ml-3 rounded hover:bg-blue-600`}
        >
          Update
        </button>
      </div>
      {isUpdate && <PostForm {...props} />}
    </div>
  );
}

export default UpdatePost;
