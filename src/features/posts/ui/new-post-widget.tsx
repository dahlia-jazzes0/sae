import { addPost } from "@/entities/posts/db/add-post";
import { PostEditor } from "./post-editor";

export function NewPostWidget() {
  return (
    <PostEditor
      placeholder="무슨 일이 일어나고 있나요?"
      onSubmit={async ({ content }) => {
        await addPost({
          content,
        });
      }}
    />
  );
}
