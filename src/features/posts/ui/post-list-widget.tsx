import { ScrollArea } from "@/components/ui/scroll-area";
import { postsCollection } from "@/entities/posts/db/posts-collection";
import type { PostSelectWithId } from "@/entities/posts/schema";
import { getUser } from "@/entities/users/db/get-user";
import {
  limit,
  onSnapshot,
  orderBy,
  query,
  QueryConstraint,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { PostWidget } from "./post-widget";

interface PostListWidgetProps {
  constraints?: QueryConstraint[];
}
export function PostListWidget({ constraints }: PostListWidgetProps) {
  const [posts, setPosts] = useState<PostSelectWithId[]>();
  useEffect(() => {
    const q = query(
      postsCollection,
      ...(constraints ?? []),
      orderBy("createdAt", "desc"),
      limit(10)
    );
    return onSnapshot(q, async (snapshot) => {
      const posts = await Promise.all(
        snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .map(async (data) => {
            try {
              const author = await getUser(data.author.uid);
              return {
                ...data,
                author,
              };
            } catch (error) {
              console.error(error);
              return data;
            }
          })
      );
      setPosts(posts);
    });
  }, [constraints]);
  return (
    <ScrollArea className="min-h-0">
      {posts?.map((post) => (
        <PostWidget key={post.id} {...post} />
      ))}
    </ScrollArea>
  );
}
