import { NewPostWidget } from "@/features/posts/ui/new-post-widget";
import { PostListWidget } from "@/features/posts/ui/post-list-widget";
import { useAuth } from "@/shared/auth/use-auth";
import { withAuthGuard } from "@/shared/auth/with-auth-guard";
import { UserAvatar } from "@/shared/user-avatar/ui/user-avatar";

export const IndexPage = withAuthGuard(() => {
  const auth = useAuth();
  return (
    <div className="max-w-sm h-dvh grid grid-rows-[max-content_1fr] border-x">
      <div className="grid grid-cols-[max-content_1fr] gap-2 p-2 border-b">
        <UserAvatar src={auth?.photoURL} />
        <NewPostWidget />
      </div>
      <PostListWidget />
    </div>
  );
});
