import { Button } from "@/components/ui/button";
import { getUser } from "@/entities/users/db/get-user";
import { PostListWidget } from "@/features/posts/ui/post-list-widget";
import { useAuth } from "@/shared/auth/use-auth";
import { withAuthGuard } from "@/shared/auth/with-auth-guard";
import { UserAvatar } from "@/shared/user-avatar/ui/user-avatar";
import { where } from "firebase/firestore";
import { Suspense, use } from "react";
import { Link, useParams } from "react-router";

export const UserPage = withAuthGuard(() => {
  const { userId } = useParams();
  if (userId == null) return "should not reach here";

  return (
    <div className="max-w-sm w-full h-dvh grid grid-rows-[max-content_1fr] border-x">
      <Suspense fallback={<UserFallback />}>
        <UserWidget userId={userId} />
      </Suspense>
    </div>
  );
});

interface UserWidgetProps {
  userId: string;
}
function UserWidget({ userId }: UserWidgetProps) {
  const user = use(getUser(userId));
  const auth = useAuth(true);
  if (user == null) throw 53;
  const isMyProfile = auth.uid === user.uid;
  return (
    <>
      <div className="border-b">
        {user.bannerURL ? (
          <img
            className="w-full h-20 object-cover bg-primary-foreground"
            src={user.bannerURL}
            alt=""
          />
        ) : (
          <div className="h-20 bg-primary-foreground"></div>
        )}
        <div className="m-2 relative flex flex-col gap-2">
          <UserAvatar
            src={user.photoURL}
            className="w-15 h-15 absolute bottom-full left-0 translate-y-1/2"
          />
          <div className="flex justify-between">
            <div className="ml-17 font-bold text-lg">{user.displayName}</div>
            {isMyProfile && (
              <Button size="sm" variant="secondary" asChild>
                <Link to="/settings/profile">프로필 수정</Link>
              </Button>
            )}
          </div>
          {user.bio && <p>{user.bio}</p>}
        </div>
      </div>
      <PostListWidget constraints={[where("author.uid", "==", userId)]} />
    </>
  );
}

function UserFallback() {
  return (
    <div className="flex justify-center items-center text-center text-muted-foreground">
      불러오는 중...
    </div>
  );
}
