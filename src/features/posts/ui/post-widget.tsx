import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deletePost } from "@/entities/posts/db/delete-post";
import { editPost } from "@/entities/posts/db/edit-post";
import type { PostSelectWithId } from "@/entities/posts/schema";
import { useAuth } from "@/shared/auth/use-auth";
import { formatRelativeTime } from "@/shared/time/format-relative-time";
import { UserAvatar } from "@/shared/user-avatar/ui/user-avatar";
import { MoreHorizontalIcon } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router";
import { PostEditor } from "./post-editor";

export function PostWidget(props: PostSelectWithId) {
  const auth = useAuth(true);
  const isMyPost = auth.uid === props.author.uid;
  const [isEditingText, setIsEditingText] = useState(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const profileUrl = `/users/${props.author.uid}`;
  return (
    <article
      key={props.id}
      className="grid grid-cols-[max-content_1fr] gap-2 p-2 not-last:border-b"
    >
      <Link to={profileUrl}>
        <UserAvatar src={props.author.photoURL} />
      </Link>
      <div className="flex flex-col">
        <div className="flex flex-wrap gap-1 items-center">
          <Link to={profileUrl} className="font-bold">
            {props.author.displayName ?? "삭제된 계정"}
          </Link>
          <time
            className="text-muted-foreground text-xs"
            dateTime={props.createdAt.toDate().toISOString()}
          >
            {formatRelativeTime(props.createdAt.toDate())}
          </time>
          <span className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {isMyPost && (
                  <>
                    {isEditingText ? (
                      <DropdownMenuItem
                        onClick={() => {
                          setIsEditingText(false);
                        }}
                      >
                        편집 취소
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem
                        onClick={() => {
                          setIsEditingText(true);
                          setTimeout(() => {
                            editorRef.current?.focus();
                          }, 200);
                        }}
                      >
                        편집
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={() => {
                        deletePost(props.id);
                      }}
                    >
                      삭제
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </span>
        </div>
        {isEditingText ? (
          <PostEditor
            ref={editorRef}
            defaultValue={props.content}
            onSubmit={async ({ content }) => {
              await editPost(props.id, {
                content,
              });
              setIsEditingText(false);
            }}
            reset
            onReset={() => {
              setIsEditingText(false);
            }}
          />
        ) : (
          <div className="whitespace-pre-line">{props.content}</div>
        )}
      </div>
    </article>
  );
}
